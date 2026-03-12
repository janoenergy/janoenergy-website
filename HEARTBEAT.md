# HEARTBEAT.md - 定期检查任务

## 记忆维护（每天）
- [ ] 检查今日 memory 文件是否存在，不存在则创建
- [ ] 回顾昨日记忆，提炼要点
- [ ] 每周日整理到 MEMORY.md

## 系统检查（每天）
- [ ] 检查 cron 任务状态
- [ ] 检查通道健康状态
- [ ] **检查 dev.janoenergy.com 访问日志** — 运行 `bash ~/.openclaw/workspace/scripts/check-access.sh`
- [ ] **分析 Cloudflare 访问日志并推送告警** — 运行 `python3 ~/.openclaw/workspace/scripts/cf-monitor.py`

## 主动工作（可选）
- [ ] 整理 workspace 文件
- [ ] 更新文档

## Self-Reflection Check（每次心跳）
运行 `self-reflection check` 检查是否需要反思。
如果返回 ALERT：读取过往教训，进行反思，然后记录新洞察。

---

## 访问监控说明

### 检查脚本
- **位置**: `~/.openclaw/workspace/scripts/check-access.sh`
- **功能**: 统计 dev.janoenergy.com 访问次数和独立 IP
- **报告**: 生成在 `memory/access-report-YYYY-MM-DD.md`

### Cloudflare 监控脚本
- **位置**: `~/.openclaw/workspace/scripts/cf-monitor.py`
- **功能**: 
  - 解析 Cloudflare 访问日志
  - 提取 IP、地理位置、访问时间
  - 检测异常（高频访问、多国家、深夜访问）
  - 推送告警到企业微信
- **环境变量**:
  ```bash
  export CF_API_TOKEN="你的 Cloudflare API Token"
  export CF_ZONE_ID="你的 Zone ID"
  export WECOM_BOT_KEY="企业微信机器人 Key"
  ```
- **告警规则**:
  - 单日访问 > 100 次 → 高频告警
  - 同一 IP 从 >2 个国家访问 → VPN/代理告警
  - 0-5 点访问 >10 次 → 深夜访问提醒
  - 每天早上 9 点发送日报

### 手动运行
```bash
# 测试推送
export WECOM_BOT_KEY="你的key"
export FORCE_NOTIFY=1
python3 ~/.openclaw/workspace/scripts/cf-monitor.py

# 仅分析不推送
python3 ~/.openclaw/workspace/scripts/cf-monitor.py
```

### 定时任务（cron）
如需更频繁的检查，可以添加 cron：
```bash
# 每 6 小时检查一次
0 */6 * * * /usr/bin/env python3 /Users/jano/.openclaw/workspace/scripts/cf-monitor.py >> /tmp/cf-monitor.log 2>&1
```