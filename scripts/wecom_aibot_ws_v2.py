#!/usr/bin/env python3
"""
企业微信 AI Bot 平台 WebSocket 客户端
正确的 WebSocket 地址: wss://openws.work.weixin.qq.com
"""

import json
import websocket
import threading
import time
import sys

# AI Bot 配置
BOT_ID = "aibRWtB6zEf3yTbvemlKoYNySTYHzGobHz5"
SECRET = "D2rR1CDyoRurHTrSRpFCUQuP9i5MCAKzyDX6LEILk20"

# 正确的 WebSocket URL
WS_URL = f"wss://openws.work.weixin.qq.com/?botid={BOT_ID}&secret={SECRET}"

class WeComAIBot:
    def __init__(self):
        self.ws = None
        self.connected = False
        
    def on_message(self, ws, message):
        """接收消息"""
        try:
            data = json.loads(message)
            print(f"📥 收到: {json.dumps(data, indent=2, ensure_ascii=False)}")
        except json.JSONDecodeError:
            print(f"📥 收到: {message}")
    
    def on_error(self, ws, error):
        """错误处理"""
        print(f"❌ 错误: {error}")
        
    def on_close(self, ws, close_status_code, close_msg):
        """连接关闭"""
        print(f"🔌 关闭: {close_status_code} - {close_msg}")
        self.connected = False
        
    def on_open(self, ws):
        """连接成功"""
        print("✅ WebSocket 连接成功")
        self.connected = True
        
        # 发送订阅消息
        subscribe_msg = {
            "cmd": "aibot_subscribe",
            "reqid": f"sub_{int(time.time())}"
        }
        ws.send(json.dumps(subscribe_msg))
        print("📤 已订阅")
    
    def run(self):
        """启动客户端"""
        print(f"连接: {WS_URL[:50]}...")
        
        self.ws = websocket.WebSocketApp(
            WS_URL,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close
        )
        
        # 心跳
        def ping():
            while True:
                time.sleep(30)
                if self.connected and self.ws:
                    try:
                        self.ws.send(json.dumps({"cmd": "ping"}))
                        print("💓 心跳")
                    except:
                        break
        
        threading.Thread(target=ping, daemon=True).start()
        self.ws.run_forever()

def main():
    print("=" * 50)
    print("企业微信 AI Bot WebSocket 客户端")
    print("=" * 50)
    
    bot = WeComAIBot()
    try:
        bot.run()
    except KeyboardInterrupt:
        print("\n👋 中断")
        if bot.ws:
            bot.ws.close()

if __name__ == '__main__':
    main()
