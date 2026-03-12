#!/usr/bin/env python3
"""
Cloudflare 访问日志分析 + 告警推送脚本
功能：解析日志，检测异常，推送告警到企业微信
"""

import json
import sys
import os
from datetime import datetime, timedelta
from collections import defaultdict
import urllib.request
import urllib.error

# 配置
CF_API_TOKEN = os.getenv('CF_API_TOKEN', '')
ZONE_ID = os.getenv('CF_ZONE_ID', '')
WECOM_BOT_KEY = os.getenv('WECOM_BOT_KEY', '')  # 企业微信机器人 key
LOG_FILE = os.path.expanduser('~/.openclaw/logs/cloudflare-access.json')
REPORT_DIR = os.path.expanduser('~/.openclaw/workspace/memory')
STATE_FILE = os.path.expanduser('~/.openclaw/workspace/memory/cf-monitor-state.json')

class CloudflareLogAnalyzer:
    def __init__(self, api_token=None, zone_id=None):
        self.api_token = api_token
        self.zone_id = zone_id
        self.logs = []
        self.ip_stats = defaultdict(lambda: {'count': 0, 'countries': set(), 'cities': set(), 'times': []})
        self.country_stats = defaultdict(int)
        self.hourly_stats = defaultdict(int)
        self.alerts = []
        
    def fetch_logs_from_api(self, hours=24):
        """从 Cloudflare API 获取访问日志"""
        if not self.api_token or not self.zone_id:
            print("错误: 需要设置 CF_API_TOKEN 和 CF_ZONE_ID 环境变量")
            return False
            
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
        
        data = {"query": query, "variables": variables}
        
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
        """从本地文件加载日志"""
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
        """解析日志数据"""
        for entry in self.logs:
            ip = entry.get('clientIP', 'unknown')
            country = entry.get('clientCountryName', '未知')
            city = entry.get('clientCityName', '未知')
            timestamp = entry.get('datetime', '')
            
            self.ip_stats[ip]['count'] += 1
            self.ip_stats[ip]['countries'].add(country)
            self.ip_stats[ip]['cities'].add(city)
            self.ip_stats[ip]['times'].append(timestamp)
            
            self.country_stats[country] += 1
            
            if timestamp:
                try:
                    hour = timestamp[:13]
                    self.hourly_stats[hour] += 1
                except:
                    pass
    
    def detect_anomalies(self):
        """检测异常访问模式"""
        anomalies = []
        
        # 高频访问 IP
        for ip, stats in self.ip_stats.items():
            if stats['count'] > 100:
                anomalies.append({
                    'type': 'high_traffic',
                    'level': 'warning',
                    'ip': ip,
                    'count': stats['count'],
                    'description': f'高频访问: {ip} 访问 {stats["count"]} 次'
                })
        
        # 多国家访问
        for ip, stats in self.ip_stats.items():
            if len(stats['countries']) > 2:
                anomalies.append({
                    'type': 'multi_country',
                    'level': 'warning',
                    'ip': ip,
                    'countries': list(stats['countries']),
                    'description': f'多国家访问: {ip} 从 {len(stats["countries"])} 个国家访问'
                })
        
        # 深夜访问
        for hour, count in self.hourly_stats.items():
            try:
                hour_int = int(hour[11:13])
                if (0 <= hour_int <= 5) and count > 10:
                    anomalies.append({
                        'type': 'night_access',
                        'level': 'info',
                        'hour': hour,
                        'count': count,
                        'description': f'深夜访问: {hour_int}:00 有 {count} 次访问'
                    })
            except:
                pass
        
        self.alerts = anomalies
        return anomalies
    
    def generate_summary(self):
        """生成摘要信息"""
        total = len(self.logs)
        unique_ips = len(self.ip_stats)
        countries = len(self.country_stats)
        
        # Top 3 IPs
        top_ips = sorted(self.ip_stats.items(), key=lambda x: x[1]['count'], reverse=True)[:3]
        
        summary = {
            'total_requests': total,
            'unique_ips': unique_ips,
            'countries': countries,
            'top_ips': [
                {'ip': ip, 'count': stats['count'], 'country': list(stats['countries'])[0] if stats['countries'] else '未知'}
                for ip, stats in top_ips
            ],
            'alerts': self.alerts
        }
        return summary


def send_wecom_alert(bot_key, summary, is_alert=False):
    """发送企业微信通知"""
    if not bot_key:
        print("未配置企业微信机器人，跳过推送")
        return False
    
    webhook_url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={bot_key}"
    
    # 构建消息内容
    if is_alert and summary['alerts']:
        # 告警消息
        alert_text = "🚨 **Cloudflare 访问异常告警**\n\n"
        for alert in summary['alerts']:
            emoji = "⚠️" if alert['level'] == 'warning' else "ℹ️"
            alert_text += f"{emoji} {alert['description']}\n"
        alert_text += f"\n---\n📊 今日统计: {summary['total_requests']} 请求 | {summary['unique_ips']} IP | {summary['countries']} 国家"
    else:
        # 日常报告
        alert_text = f"📊 **Cloudflare 访问日报** ({datetime.now().strftime('%m-%d %H:%M')})\n\n"
        alert_text += f"总请求: {summary['total_requests']}\n"
        alert_text += f"独立 IP: {summary['unique_ips']}\n"
        alert_text += f"涉及国家: {summary['countries']}\n\n"
        alert_text += "**Top 3 访问 IP:**\n"
        for i, ip_info in enumerate(summary['top_ips'], 1):
            alert_text += f"{i}. `{ip_info['ip']}` - {ip_info['count']}次 ({ip_info['country']})\n"
        
        if summary['alerts']:
            alert_text += "\n⚠️ **发现异常:**\n"
            for alert in summary['alerts'][:3]:
                alert_text += f"- {alert['description']}\n"
        else:
            alert_text += "\n✅ 访问正常，无异常"
    
    data = {
        "msgtype": "markdown",
        "markdown": {"content": alert_text}
    }
    
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('errcode') == 0:
                print("✅ 企业微信推送成功")
                return True
            else:
                print(f"❌ 推送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 推送异常: {e}")
        return False


def load_state():
    """加载上次状态"""
    try:
        with open(STATE_FILE, 'r') as f:
            return json.load(f)
    except:
        return {'last_alert_time': None, 'alerted_ips': []}


def save_state(state):
    """保存状态"""
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f)


def main():
    analyzer = CloudflareLogAnalyzer(
        api_token=os.getenv('CF_API_TOKEN'),
        zone_id=os.getenv('CF_ZONE_ID')
    )
    
    # 获取日志
    if analyzer.fetch_logs_from_api(hours=24):
        print("✅ 从 API 获取日志成功")
    else:
        print("⚠️ API 失败，使用本地文件")
        if not analyzer.load_logs_from_file(LOG_FILE):
            print("❌ 无日志数据")
            sys.exit(1)
    
    # 解析和检测
    analyzer.parse_logs()
    anomalies = analyzer.detect_anomalies()
    summary = analyzer.generate_summary()
    
    # 加载状态
    state = load_state()
    
    # 判断是否需要推送
    should_alert = False
    if anomalies:
        # 检查是否有新的异常 IP
        current_alert_ips = [a['ip'] for a in anomalies if 'ip' in a]
        new_ips = set(current_alert_ips) - set(state.get('alerted_ips', []))
        if new_ips:
            should_alert = True
            state['alerted_ips'] = list(set(state.get('alerted_ips', []) + list(new_ips)))
    
    # 每天发送一次日报（早上9点）
    now = datetime.now()
    if now.hour == 9 and now.minute < 30:
        should_alert = True  # 强制发送日报
    
    # 推送通知
    if should_alert or os.getenv('FORCE_NOTIFY'):
        send_wecom_alert(
            bot_key=os.getenv('WECOM_BOT_KEY'),
            summary=summary,
            is_alert=len(anomalies) > 0
        )
    
    # 保存状态
    state['last_check'] = now.isoformat()
    save_state(state)
    
    # 输出摘要
    print(f"\n📈 访问摘要: {summary['total_requests']} 请求 | {summary['unique_ips']} IP | {summary['countries']} 国家")
    if anomalies:
        print(f"⚠️  发现 {len(anomalies)} 个异常")


if __name__ == '__main__':
    main()