#!/usr/bin/env python3
"""
企业微信 AI Bot 平台消息推送脚本
使用 WebSocket 连接，支持主动推送消息
"""

import json
import urllib.request
import sys
import os

# 从 OpenClaw 配置读取
CONFIG_FILE = os.path.expanduser("~/.openclaw/openclaw.json")

def load_config():
    """加载配置"""
    try:
        with open(CONFIG_FILE, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"读取配置失败: {e}")
        return None

def get_ai_bot_config():
    """获取 AI Bot 配置"""
    config = load_config()
    if not config:
        return None
    
    wecom = config.get('channels', {}).get('wecom', {})
    return {
        'botId': wecom.get('botId'),
        'secret': wecom.get('secret')
    }

def get_access_token(bot_id, secret):
    """
    获取 AI Bot access_token
    文档: https://developer.work.weixin.qq.com/document/path/90369
    """
    url = f"https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid={bot_id}&corpsecret={secret}"
    
    try:
        with urllib.request.urlopen(url, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('errcode') == 0:
                return result.get('access_token')
            else:
                print(f"获取 token 失败: {result}")
                return None
    except Exception as e:
        print(f"请求异常: {e}")
        return None

def send_message(access_token, user_id, content):
    """
    发送消息给用户
    文档: https://developer.work.weixin.qq.com/document/path/90236
    """
    url = f"https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token={access_token}"
    
    data = {
        "touser": user_id,
        "msgtype": "text",
        "text": {
            "content": content
        }
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data, ensure_ascii=False).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('errcode') == 0:
                print(f"✅ 消息发送成功")
                return True
            else:
                print(f"❌ 发送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 请求异常: {e}")
        return False

def main():
    """主函数"""
    # 获取配置
    config = get_ai_bot_config()
    if not config:
        print("❌ 无法读取配置")
        return
    
    bot_id = config.get('botId')
    secret = config.get('secret')
    
    if not bot_id or not secret:
        print("❌ 配置不完整，需要 botId 和 secret")
        return
    
    print(f"Bot ID: {bot_id[:10]}...")
    
    # 获取 access_token
    print("正在获取 access_token...")
    token = get_access_token(bot_id, secret)
    if not token:
        print("❌ 获取 access_token 失败")
        return
    
    print(f"✅ 获取 token 成功: {token[:10]}...")
    
    # 发送测试消息
    user_id = "LiHua"  # 或从命令行参数传入
    content = """🤖 小白测试消息

这是一条通过 AI Bot 平台发送的测试消息。

时间：2026-03-15 23:17
状态：推送功能正常 ✅"""
    
    if len(sys.argv) > 1:
        content = sys.argv[1]
    
    print(f"正在发送消息给 {user_id}...")
    send_message(token, user_id, content)

if __name__ == '__main__':
    main()
