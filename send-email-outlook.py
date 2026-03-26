#!/usr/bin/env python3
"""
使用 Outlook SMTP 发送邮件
"""
import smtplib
import os
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
from datetime import datetime

# 配置
SMTP_SERVER = "smtp.office365.com"
SMTP_PORT = 587
FROM_EMAIL = "lihua@janoenergy.cn"  # 你的 Outlook 邮箱
TO_EMAIL = "lihua@janoenergy.cn"    # 收件人
ZIP_FILE = "/Users/jano/.openclaw/workspace/images.zip"

# 从环境变量获取密码，或手动输入
# 注意：这里应该使用应用密码，而不是登录密码
# 在 Outlook 设置中生成应用密码: https://account.live.com/proofs/AppPassword
PASSWORD = os.environ.get("OUTLOOK_PASSWORD", "")

if not PASSWORD:
    print("请设置 OUTLOOK_PASSWORD 环境变量")
    print("例如: export OUTLOOK_PASSWORD='你的应用密码'")
    print("")
    print("获取应用密码步骤:")
    print("1. 访问 https://account.live.com/proofs/AppPassword")
    print("2. 登录你的 Microsoft 账号")
    print("3. 创建新的应用密码")
    print("4. 复制生成的密码")
    exit(1)

# 检查文件
if not os.path.exists(ZIP_FILE):
    print(f"错误: 找不到文件 {ZIP_FILE}")
    exit(1)

# 创建邮件
msg = MIMEMultipart()
msg['From'] = FROM_EMAIL
msg['To'] = TO_EMAIL
msg['Subject'] = f"网站图片资源 - {datetime.now().strftime('%Y%m%d')}"

# 邮件正文
body = """你好，

附件是网站图片资源包，包含：

📁 项目图片 (12张)
   - 风电: wind-farm.jpg, wind-turbine.jpg, wind-offshore.jpg, wind-installation.jpg
   - 光伏: solar-farm.jpg, solar-rooftop.jpg, solar-desert.jpg, solar-closeup.jpg
   - 储能: storage-facility.jpg, storage-battery.jpg, storage-substation.jpg

📁 业务板块图片 (4张)
   - development.jpg, investment.jpg, epc.jpg, operation.jpg

📁 团队图片 (8张)
   - member-1~4.jpg, ceo.jpg, cfo.jpg, cto.jpg, coo.jpg

📁 新闻图片 (6张)
   - news-1~6.jpg

📁 证书图片 (4张)
   - cert-1~4.jpg

📁 关于我们图片 (2张)
   - company.jpg, team.jpg

📁 首页轮播图 (3张)
   - hero-1.jpg, hero-2.jpg, hero-3.jpg

总计: 39 张图片，5.5MB

---
此邮件由系统自动发送
"""

msg.attach(MIMEText(body, 'plain', 'utf-8'))

# 添加附件
print(f"正在添加附件: {ZIP_FILE}")
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
    print(f"连接到 {SMTP_SERVER}:{SMTP_PORT}...")
    server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
    server.starttls()
    
    print(f"登录 {FROM_EMAIL}...")
    server.login(FROM_EMAIL, PASSWORD)
    
    print(f"发送邮件到 {TO_EMAIL}...")
    server.send_message(msg)
    server.quit()
    
    print(f"✅ 邮件发送成功!")
    print(f"   发件人: {FROM_EMAIL}")
    print(f"   收件人: {TO_EMAIL}")
    print(f"   附件: images.zip ({os.path.getsize(ZIP_FILE) / 1024 / 1024:.1f}MB)")
    
except Exception as e:
    print(f"❌ 发送失败: {e}")
    print("")
    print("常见错误:")
    print("1. 需要使用应用密码，而不是登录密码")
    print("2. 账号需要开启 SMTP 访问")
    print("3. 检查邮箱地址是否正确")
    exit(1)
