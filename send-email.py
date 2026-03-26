#!/usr/bin/env python3
"""
使用 Outlook SMTP 发送邮件 - 交互式版本
"""
import smtplib
import os
import getpass
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from datetime import datetime

# 配置
SMTP_SERVER = "smtp.office365.com"
SMTP_PORT = 587
FROM_EMAIL = "lihua@janoenergy.cn"
TO_EMAIL = "lihua@janoenergy.cn"
ZIP_FILE = "/Users/jano/.openclaw/workspace/images.zip"

# 检查文件
if not os.path.exists(ZIP_FILE):
    print(f"❌ 错误: 找不到文件 {ZIP_FILE}")
    exit(1)

print("=" * 50)
print("Outlook 邮件发送工具")
print("=" * 50)
print("")
print(f"发件人: {FROM_EMAIL}")
print(f"收件人: {TO_EMAIL}")
print(f"附件: images.zip ({os.path.getsize(ZIP_FILE) / 1024 / 1024:.1f}MB)")
print("")

# 获取密码
print("⚠️  注意: 需要使用应用密码，不是登录密码")
print("获取方式: https://account.live.com/proofs/AppPassword")
print("")
password = getpass.getpass("请输入应用密码: ")

if not password:
    print("❌ 密码不能为空")
    exit(1)

# 创建邮件
msg = MIMEMultipart()
msg['From'] = FROM_EMAIL
msg['To'] = TO_EMAIL
msg['Subject'] = f"网站图片资源 - {datetime.now().strftime('%Y%m%d')}"

# 邮件正文
body = """你好，

附件是网站图片资源包，包含 39 张图片：

📁 项目图片 (12张) - 风电/光伏/储能
📁 业务板块图片 (4张)
📁 团队图片 (8张)
📁 新闻图片 (6张)
📁 证书图片 (4张)
📁 关于我们图片 (2张)
📁 首页轮播图 (3张)

总计: 5.5MB

---
此邮件由系统自动发送
"""

msg.attach(MIMEText(body, 'plain', 'utf-8'))

# 添加附件
print("正在添加附件...")
with open(ZIP_FILE, 'rb') as f:
    attachment = MIMEBase('application', 'zip')
    attachment.set_payload(f.read())
    encoders.encode_base64(attachment)
    attachment.add_header(
        'Content-Disposition',
        f'attachment; filename="images.zip"'
    )
    msg.attach(attachment)

# 发送邮件
try:
    print(f"连接到 {SMTP_SERVER}...")
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    
    print("登录中...")
    server.login(FROM_EMAIL, password)
    
    print("发送邮件...")
    server.send_message(msg)
    server.quit()
    
    print("")
    print("=" * 50)
    print("✅ 邮件发送成功!")
    print("=" * 50)
    
except Exception as e:
    print("")
    print("=" * 50)
    print(f"❌ 发送失败: {e}")
    print("=" * 50)
    print("")
    print("常见错误:")
    print("1. 需要使用应用密码，而不是登录密码")
    print("2. 账号需要开启 SMTP 访问")
    print("3. 密码输入错误")
    exit(1)
