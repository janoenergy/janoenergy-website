#!/bin/bash
# 检查 dev.janoenergy.com 访问日志 - 增强版（含 IP 和地理位置）

LOG_FILE="$HOME/.openclaw/logs/gateway.log"
STATE_FILE="$HOME/.openclaw/workspace/memory/access-monitor-state.json"
REPORT_FILE="$HOME/.openclaw/workspace/memory/access-report-$(date +%Y-%m-%d).md"
IP_LOG_FILE="$HOME/.openclaw/workspace/memory/access-ip-$(date +%Y-%m-%d).log"

# 读取上次检查时间
if [ -f "$STATE_FILE" ]; then
    LAST_CHECK=$(cat "$STATE_FILE" | grep -o '"lastCheck":[0-9]*' | cut -d: -f2)
else
    LAST_CHECK=0
fi

CURRENT_TIME=$(date +%s)

# 检查日志文件是否存在
if [ ! -f "$LOG_FILE" ]; then
    echo '{"lastCheck":'$CURRENT_TIME',"error":"Log file not found"}' > "$STATE_FILE"
    exit 1
fi

# 提取访问记录
ACCESS_COUNT=$(grep -c "dev.janoenergy.com\|controlUi" "$LOG_FILE" 2>/dev/null || echo "0")

# 提取 IP 地址（从日志中多种格式）
# 尝试提取 X-Forwarded-For、X-Real-IP 或远程地址
extract_ips() {
    # 从 gateway.log 中提取 IP 地址
    grep "dev.janoenergy.com" "$LOG_FILE" 2>/dev/null | \
    grep -oE '[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+' | \
    sort | uniq -c | sort -rn
}

# 获取 IP 地理位置（使用 ip-api.com，免费版）
get_ip_location() {
    local ip=$1
    # 跳过私有 IP
    if [[ "$ip" =~ ^(10\.|172\.(1[6-9]|2[0-9]|3[01])\.|192\.168\.|127\.|0\.|255\.) ]]; then
        echo "内网/本地地址"
        return
    fi
    
    # 查询 ip-api（缓存结果避免重复请求）
    local cache_file="$HOME/.openclaw/workspace/memory/ip-cache/${ip}.json"
    mkdir -p "$HOME/.openclaw/workspace/memory/ip-cache"
    
    if [ -f "$cache_file" ] && [ $(($(date +%s) - $(stat -f%m "$cache_file" 2>/dev/null || stat -c%Y "$cache_file" 2>/dev/null || echo 0))) -lt 86400 ]; then
        # 使用缓存（24小时内）
        cat "$cache_file" | grep -o '"country":"[^"]*"' | cut -d'"' -f4
        cat "$cache_file" | grep -o '"city":"[^"]*"' | cut -d'"' -f4
    else
        # 查询 API（限制 45 请求/分钟）
        local response=$(curl -s "http://ip-api.com/json/${ip}?fields=country,city,status" 2>/dev/null)
        if [ -n "$response" ]; then
            echo "$response" > "$cache_file"
            echo "$response" | grep -o '"country":"[^"]*"' | cut -d'"' -f4
            echo "$response" | grep -o '"city":"[^"]*"' | cut -d'"' -f4
        else
            echo "未知"
        fi
    fi
}

# 提取所有 IP
IP_LIST=$(extract_ips)
UNIQUE_IPS=$(echo "$IP_LIST" | wc -l | tr -d ' ')

# 记录 IP 详情到日志
{
echo "=== 访问日志 $(date '+%Y-%m-%d %H:%M:%S') ==="
echo ""
echo "IP 地址统计:"
echo "$IP_LIST"
echo ""
echo "地理位置详情:"
} > "$IP_LOG_FILE"

# 为每个 IP 查询地理位置（限制前 10 个，避免 API 限制）
echo "$IP_LIST" | head -10 | while read -r line; do
    count=$(echo "$line" | awk '{print $1}')
    ip=$(echo "$line" | awk '{print $2}')
    if [ -n "$ip" ]; then
        location=$(get_ip_location "$ip" 2>/dev/null | tr '\n' ' ')
        echo "- $ip | 访问 $count 次 | 位置: $location" >> "$IP_LOG_FILE"
    fi
done

# 生成报告
{
echo "# 访问监控报告 - $(date '+%Y-%m-%d %H:%M')"
echo ""
echo "## 统计信息"
echo "- **检查时间**: $(date '+%Y-%m-%d %H:%M:%S')"
echo "- **访问次数**: $ACCESS_COUNT"
echo "- **独立 IP 数**: $UNIQUE_IPS"
echo ""
echo "## IP 访问详情"
echo '```'
cat "$IP_LOG_FILE"
echo '```'
echo ""
echo "## 最近访问记录"
echo '```'
grep "dev.janoenergy.com" "$LOG_FILE" 2>/dev/null | tail -5
echo '```'
echo ""
echo "## 异常检测"
} > "$REPORT_FILE"

# 检查是否有异常
if [ "$ACCESS_COUNT" -gt 100 ]; then
    echo "⚠️ 警告：今日访问量异常高 ($ACCESS_COUNT 次)" >> "$REPORT_FILE"
    ALERT="high_traffic"
elif [ "$UNIQUE_IPS" -gt 5 ]; then
    echo "⚠️ 警告：检测到多个不同 IP 访问 ($UNIQUE_IPS 个)" >> "$REPORT_FILE"
    ALERT="multiple_ips"
else
    echo "✅ 访问正常" >> "$REPORT_FILE"
    ALERT="normal"
fi

# 保存状态
echo '{"lastCheck":'$CURRENT_TIME',"accessCount":'$ACCESS_COUNT',"uniqueIps":'$UNIQUE_IPS',"alert":"'$ALERT'","reportFile":"'$REPORT_FILE'","ipLogFile":"'$IP_LOG_FILE'"}' > "$STATE_FILE"

# 输出结果
echo '{"accessCount":'$ACCESS_COUNT',"uniqueIps":'$UNIQUE_IPS',"alert":"'$ALERT'","reportFile":"'$REPORT_FILE'","ipLogFile":"'$IP_LOG_FILE'"}'