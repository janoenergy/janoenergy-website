#!/bin/bash
# 主任务脚本 - 抓取并推送新能源信息

set -e

echo "[$(date)] ===== 开始每日新能源信息任务 ====="

# 1. 抓取信息
"$HOME/.openclaw/workspace/scripts/fetch_energy_news.sh"

# 2. 推送到企业微信
python3 "$HOME/.openclaw/workspace/scripts/newenergy-daily.py"

echo "[$(date)] ===== 任务完成 ====="
