#!/usr/bin/env python3
"""
Cloudflare 访问日志分析脚本
功能：解析 Cloudflare API 返回的 JSON 日志，提取 IP、地理位置、访问时间
"""

import json
import sys
import os
from datetime import datetime, timedelta
from collections import defaultdict
import urllib.request
import urllib.error

# 配置
CF_API_TOKEN = os.getenv('CF_API_TOKEN', '')  # 从环境变量读取
ZONE_ID = os.getenv('CF_ZONE_ID', '')  # 从环境变量读取
LOG_FILE = os.path.expanduser('~/.openclaw/logs/cloudflare-access.json')
REPORT_DIR = os.path.expanduser('~/.openclaw/workspace/memory')

class CloudflareLogAnalyzer:
    def __init__(self, api_token=None, zone_id=None):
        self.api_token = api_token
        self.zone_id = zone_id
        self.logs = []
        self.ip_stats = defaultdict(lambda: {'count': 0, 'countries': set(), 'cities': set(), 'times': []})
        self.country_stats = defaultdict(int)
        self.hourly_stats = defaultdict(int)
        
    def fetch_logs_from_api(self, hours=24):
        """从 Cloudflare API 获取访问日志"""
        if not self.api_token or not self.zone_id:
            print("错误: 需要设置 CF_API_TOKEN 和 CF_ZONE_ID 环境变量")
            return False
            
        # GraphQL 查询获取日志
        query = """
        query GetLogs($zoneTag: String!, $start: Time!, $end: Time!) {
          viewer {
            zones(filter: { zoneTag: $zoneTag }) {
              httpRequestsAdaptive(
                filter: { datetime_geq: $start, datetime_leq: $end }
                limit: 10000
              ) {
                datetime
                clientIP
                clientCountryName
                clientCityName
                clientRequestHTTPHost
                clientRequestPath
                edgeResponseStatus
              }
            }
          }
        }
        """
        
        end_time = datetime.utcnow()
        start_time = end_time - timedelta(hours=hours)
        
        variables = {
            "zoneTag": self.zone_id,
            "start": start_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "end": end_time.strftime("%Y-%m-%dT%H:%M:%SZ")
        }
        
        data = {
            "query": query,
            "variables": variables
        }
        
        req = urllib.request.Request(
            "https://api.cloudflare.com/client/v4/graphql",
            data=json.dumps(data).encode(),
            headers={
                "Authorization": f"Bearer {self.api_token}",
                "Content-Type": "application/json"
            },
            method="POST"
        )
        
        try:
            with urllib.request.urlopen(req, timeout=30) as response:
                result = json.loads(response.read().decode())
                zones = result.get('data', {}).get('viewer', {}).get('zones', [])
                if zones:
                    self.logs = zones[0].get('httpRequestsAdaptive', [])
                    return True
        except Exception as e:
            print(f"API 请求失败: {e}")
            return False
            
        return False
    
    def load_logs_from_file(self, filepath):
        """从本地文件加载日志（用于测试或离线分析）"""
        try:
            with open(filepath, 'r') as f:
                data = json.load(f)
                if isinstance(data, list):
                    self.logs = data
                elif isinstance(data, dict):
                    self.logs = data.get('logs', [])
            return True
        except Exception as e:
            print(f"读取文件失败: {e}")
            return False
    
    def parse_logs(self):
        """解析日志数据，提取统计信息"""
        for entry in self.logs:
            ip = entry.get('clientIP', 'unknown')
            country = entry.get('clientCountryName', '未知')
            city = entry.get('clientCityName', '未知')
            timestamp = entry.get('datetime', '')
            host = entry.get('clientRequestHTTPHost', '')
            path = entry.get('clientRequestPath', '')
            status = entry.get('edgeResponseStatus', 0)
            
            # IP 统计
            self.ip_stats[ip]['count'] += 1
            self.ip_stats[ip]['countries'].add(country)
            self.ip_stats[ip]['cities'].add(city)
            self.ip_stats[ip]['times'].append(timestamp)
            
            # 国家统计
            self.country_stats[country] += 1
            
            # 小时统计（用于分析访问模式）
            if timestamp:
                try:
                    hour = timestamp[:13]  # 提取到小时
                    self.hourly_stats[hour] += 1
                except:
                    pass
    
    def detect_anomalies(self):
        """检测异常访问模式"""
        anomalies = []
        
        # 检测高频访问 IP
        for ip, stats in self.ip_stats.items():
            if stats['count'] > 100:
                anomalies.append({
                    'type': '高频访问',
                    'ip': ip,
                    'count': stats['count'],
                    'description': f'该 IP 访问次数异常高 ({stats["count"]} 次)'
                })
        
        # 检测多国家访问（可能使用代理/VPN）
        for ip, stats in self.ip_stats.items():
            if len(stats['countries']) > 2:
                anomalies.append({
                    'type': '多国家访问',
                    'ip': ip,
                    'countries': list(stats['countries']),
                    'description': f'该 IP 从 {len(stats["countries"])} 个不同国家访问'
                })
        
        # 检测异常时间段（如凌晨访问）
        for hour, count in self.hourly_stats.items():
            try:
                hour_int = int(hour[11:13])
                if (0 <= hour_int <= 5) and count > 10:
                    anomalies.append({
                        'type': '深夜访问',
                        'hour': hour,
                        'count': count,
                        'description': f'凌晨 {hour_int}:00 有 {count} 次访问'
                    })
            except:
                pass
        
        return anomalies
    
    def generate_report(self, output_file=None):
        """生成分析报告"""
        if not output_file:
            date_str = datetime.now().strftime('%Y-%m-%d')
            output_file = f"{REPORT_DIR}/cf-access-report-{date_str}.md"
        
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        anomalies = self.detect_anomalies()
        
        report = f"""# Cloudflare 访问日志分析报告

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
**分析条目数**: {len(self.logs)}

## 总体统计

| 指标 | 数值 |
|------|------|
| 总请求数 | {len(self.logs)} |
| 独立 IP 数 | {len(self.ip_stats)} |
| 涉及国家 | {len(self.country_stats)} |

## IP 访问排行 (Top 10)

| 排名 | IP 地址 | 访问次数 | 国家 | 城市 |
|------|---------|----------|------|------|
"""
        
        sorted_ips = sorted(self.ip_stats.items(), key=lambda x: x[1]['count'], reverse=True)[:10]
        for rank, (ip, stats) in enumerate(sorted_ips, 1):
            countries = ', '.join(stats['countries']) if stats['countries'] else '未知'
            cities = ', '.join(stats['cities']) if stats['cities'] else '未知'
            report += f"| {rank} | `{ip}` | {stats['count']} | {countries} | {cities} |\n"
        
        report += f"""
## 国家分布

| 国家 | 请求数 | 占比 |
|------|--------|------|
"""
        total = len(self.logs) or 1
        for country, count in sorted(self.country_stats.items(), key=lambda x: x[1], reverse=True)[:10]:
            pct = count / total * 100
            report += f"| {country} | {count} | {pct:.1f}% |\n"
        
        report += f"""
## 异常检测

"""
        if anomalies:
            report += f"发现 {len(anomalies)} 个异常:\n\n"
            for a in anomalies:
                report += f"- **{a['type']}**: {a['description']}\n"
        else:
            report += "✅ 未发现明显异常\n"
        
        report += f"""
## 原始数据样本 (最近 5 条)

```json
"""
        report += json.dumps(self.logs[:5], indent=2, ensure_ascii=False)
        report += "\n```\n"
        
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(report)
        
        return output_file
    
    def export_ip_list(self, output_file=None):
        """导出 IP 列表（用于进一步分析或封禁）"""
        if not output_file:
            date_str = datetime.now().strftime('%Y-%m-%d')
            output_file = f"{REPORT_DIR}/cf-ip-list-{date_str}.json"
        
        ip_data = []
        for ip, stats in self.ip_stats.items():
            ip_data.append({
                'ip': ip,
                'count': stats['count'],
                'countries': list(stats['countries']),
                'cities': list(stats['cities']),
                'first_seen': min(stats['times']) if stats['times'] else None,
                'last_seen': max(stats['times']) if stats['times'] else None
            })
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(ip_data, f, indent=2, ensure_ascii=False)
        
        return output_file


def main():
    analyzer = CloudflareLogAnalyzer(
        api_token=os.getenv('CF_API_TOKEN'),
        zone_id=os.getenv('CF_ZONE_ID')
    )
    
    # 尝试从 API 获取日志
    if analyzer.fetch_logs_from_api(hours=24):
        print("✅ 从 Cloudflare API 获取日志成功")
    else:
        print("⚠️ API 获取失败，尝试从本地文件加载...")
        if not analyzer.load_logs_from_file(LOG_FILE):
            print("❌ 无法获取日志数据")
            sys.exit(1)
    
    # 解析日志
    analyzer.parse_logs()
    
    # 生成报告
    report_file = analyzer.generate_report()
    ip_file = analyzer.export_ip_list()
    
    print(f"📊 报告已生成: {report_file}")
    print(f"📋 IP 列表已导出: {ip_file}")
    
    # 输出摘要
    print(f"\n📈 访问摘要:")
    print(f"   - 总请求: {len(analyzer.logs)}")
    print(f"   - 独立 IP: {len(analyzer.ip_stats)}")
    print(f"   - 国家数: {len(analyzer.country_stats)}")
    
    anomalies = analyzer.detect_anomalies()
    if anomalies:
        print(f"\n⚠️  发现 {len(anomalies)} 个异常")


if __name__ == '__main__':
    main()