#!/bin/bash
# 发送图片邮件脚本
# 使用方法: ./send-images-email.sh <你的邮箱>

EMAIL="${1:-lihua@janoenergy.cn}"
ZIP_FILE="/Users/jano/.openclaw/workspace/images.zip"

# 检查文件
if [ ! -f "$ZIP_FILE" ]; then
    echo "错误: 找不到文件 $ZIP_FILE"
    exit 1
fi

# 方案 A: 使用 mail 命令（macOS 自带）
if command -v mail &> /dev/null; then
    echo "使用 mail 命令发送..."
    echo "网站图片资源包，包含 56 张图片" | mail -s "网站图片资源 - $(date +%Y%m%d)" -a "$ZIP_FILE" "$EMAIL"
    echo "✅ 邮件已发送到 $EMAIL"
    exit 0
fi

# 方案 B: 使用 Python + smtplib
if command -v python3 &> /dev/null; then
    echo "使用 Python 发送..."
    python3 << EOF
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders

# 配置你的 SMTP 信息
SMTP_SERVER = "smtp.qq.com"  # 或其他 SMTP 服务器
SMTP_PORT = 587
SMTP_USER = "your-email@qq.com"  # 修改为你的邮箱
SMTP_PASS = "your-password"      # 修改为你的密码

msg = MIMEMultipart()
msg['From'] = SMTP_USER
msg['To'] = "$EMAIL"
msg['Subject'] = "网站图片资源 - $(date +%Y%m%d)"

body = """你好，

附件是网站图片资源包，包含：
- 项目图片 (风电/光伏/储能)
- 业务板块图片
- 团队照片
- 新闻配图
- 证书图片
- 首页轮播图

共 56 张图片，5.5MB。

---
此邮件由系统自动发送
"""
msg.attach(MIMEText(body, 'plain', 'utf-8'))

# 添加附件
with open("$ZIP_FILE", 'rb') as f:
    attachment = MIMEBase('application', 'zip')
    attachment.set_payload(f.read())
    encoders.encode_base64(attachment)
    attachment.add_header('Content-Disposition', f'attachment; filename="images.zip"')
    msg.attach(attachment)

try:
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    server.login(SMTP_USER, SMTP_PASS)
    server.send_message(msg)
    server.quit()
    print(f"✅ 邮件已发送到 $EMAIL")
except Exception as e:
    print(f"❌ 发送失败: {e}")
EOF
    exit 0
fi

echo "❌ 未找到可用的邮件发送工具"
echo "请手动发送文件: $ZIP_FILE"
