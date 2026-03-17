#!/usr/bin/env python3
"""
企业微信 AI Bot 平台消息推送
使用 aibot-node-sdk 的 HTTP 接口
"""

import json
import urllib.request
import sys
import os

# AI Bot 配置
BOT_ID = "aibRWtB6zEf3yTbvemlKoYNySTYHzGobHz5"
SECRET = "D2rR1CDyoRurHTrSRpFCUQuP9i5MCAKzyDX6LEILk20"

def get_token():
    """获取 AI Bot access_token"""
    url = "https://open.work.weixin.qq.com/api/aibot/gettoken"
    
    data = {
        "botid": BOT_ID,
        "secret": SECRET
    }
    
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode('utf-8'),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            print(f"Token response: {result}")
            if result.get('errcode') == 0:
                return result.get('access_token')
            else:
                print(f"获取 token 失败: {result}")
                return None
    except Exception as e:
        print(f"请求异常: {e}")
        return None

def send_message(token, user_id, content):
    """发送消息"""
    url = f"https://open.work.weixin.qq.com/api/aibot/send?access_token={token}"
    
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
            print(f"Send response: {result}")
            if result.get('errcode') == 0:
                print("✅ 消息发送成功")
                return True
            else:
                print(f"❌ 发送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 请求异常: {e}")
        return False

def main():
    print("正在获取 AI Bot token...")
    token = get_token()
    if not token:
        return
    
    print(f"✅ 获取 token 成功")
    
    # 发送测试消息
    user_id = "LiHua"
    content = """🤖 小白测试消息

这是一条通过 AI Bot 平台发送的测试消息。

时间：2026-03-16 00:14
状态：推送功能正常 ✅"""
    
    if len(sys.argv) > 1:
        content = sys.argv[1]
    
    print(f"正在发送消息给 {user_id}...")
    send_message(token, user_id, content)

if __name__ == '__main__':
    main()
