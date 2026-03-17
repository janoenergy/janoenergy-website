#!/usr/bin/env python3
"""
企业微信消息发送脚本
直接调用企业微信 Webhook API，绕过 OpenClaw 插件限制
"""

import json
import urllib.request
import sys
import os

# 从 OpenClaw 配置读取企业微信配置
CONFIG_FILE = os.path.expanduser("~/.openclaw/openclaw.json")

def load_config():
    """加载 OpenClaw 配置"""
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"读取配置失败: {e}")
        return None

def get_wecom_config():
    """获取企业微信配置"""
    config = load_config()
    if not config:
        return None
    
    wecom_config = config.get('channels', {}).get('wecom', {})
    return wecom_config

def send_wecom_message(text, bot_id=None, secret=None):
    """
    发送企业微信消息
    
    Args:
        text: 消息内容
        bot_id: 机器人 ID（可选，从配置读取）
        secret: 机器人密钥（可选，从配置读取）
    """
    # 获取配置
    if not bot_id or not secret:
        config = get_wecom_config()
        if not config:
            print("错误: 无法读取企业微信配置")
            return False
        
        bot_id = bot_id or config.get('botId')
        secret = secret or config.get('secret')
    
    if not bot_id:
        print("错误: 未配置 botId")
        return False
    
    # 构建 Webhook URL
    webhook_url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={bot_id}"
    
    # 构建消息体
    data = {
        "msgtype": "markdown",
        "markdown": {
            "content": text
        }
    }
    
    # 发送请求
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(data, ensure_ascii=False).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('errcode') == 0:
                print("✅ 消息发送成功")
                return True
            else:
                print(f"❌ 发送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 发送异常: {e}")
        return False

def main():
    """主函数"""
    if len(sys.argv) < 2:
        # 默认发送测试消息
        text = """🤖 小白测试消息

这是一条从 OpenClaw 发送到企业微信的测试消息。

时间：2026-03-15 23:06
状态：推送功能正常 ✅"""
    else:
        text = sys.argv[1]
    
    send_wecom_message(text)

if __name__ == '__main__':
    main()
