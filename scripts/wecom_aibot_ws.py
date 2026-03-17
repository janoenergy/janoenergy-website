#!/usr/bin/env python3
"""
企业微信 AI Bot 平台 WebSocket 客户端
使用长连接接收和发送消息
"""

import json
import websocket
import threading
import time
import sys

# AI Bot 配置
BOT_ID = "aibRWtB6zEf3yTbvemlKoYNySTYHzGobHz5"
SECRET = "D2rR1CDyoRurHTrSRpFCUQuP9i5MCAKzyDX6LEILk20"

# WebSocket URL
WS_URL = f"wss://open.work.weixin.qq.com/api/aibot/ws?botid={BOT_ID}&secret={SECRET}"

class WeComAIBot:
    def __init__(self):
        self.ws = None
        self.connected = False
        self.message_queue = []
        
    def on_message(self, ws, message):
        """接收消息"""
        try:
            data = json.loads(message)
            print(f"📥 收到消息: {json.dumps(data, indent=2, ensure_ascii=False)}")
            
            # 处理消息并回复
            if data.get('msgtype') == 'text':
                self.handle_text_message(data)
                
        except json.JSONDecodeError:
            print(f"📥 收到原始消息: {message}")
    
    def on_error(self, ws, error):
        """错误处理"""
        print(f"❌ WebSocket 错误: {error}")
        
    def on_close(self, ws, close_status_code, close_msg):
        """连接关闭"""
        print(f"🔌 连接关闭: {close_status_code} - {close_msg}")
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
        print("📤 发送订阅消息")
        
        # 发送测试消息
        self.send_test_message()
    
    def handle_text_message(self, data):
        """处理文本消息"""
        from_user = data.get('from')
        content = data.get('text', {}).get('content', '')
        
        print(f"💬 来自 {from_user}: {content}")
        
        # 自动回复
        reply = f"收到消息: {content}"
        self.send_text_message(from_user, reply)
    
    def send_text_message(self, to_user, content):
        """发送文本消息"""
        if not self.connected or not self.ws:
            print("❌ 未连接，无法发送消息")
            return False
        
        message = {
            "cmd": "aibot_response",
            "reqid": f"resp_{int(time.time())}",
            "touser": to_user,
            "msgtype": "text",
            "text": {
                "content": content
            }
        }
        
        try:
            self.ws.send(json.dumps(message, ensure_ascii=False))
            print(f"📤 发送消息给 {to_user}: {content}")
            return True
        except Exception as e:
            print(f"❌ 发送失败: {e}")
            return False
    
    def send_test_message(self):
        """发送测试消息"""
        time.sleep(2)  # 等待连接稳定
        
        # 注意：AI Bot 平台通常需要用户先发送消息才能回复
        # 这里只是演示，实际推送需要知道用户的 openid
        print("""
🤖 AI Bot 已连接

注意：
1. 用户需要先在企业微信中 @机器人 发送消息
2. 机器人才能通过 WebSocket 回复
3. 主动推送需要用户先与机器人交互过

等待用户消息中...
        """)
    
    def run(self):
        """启动 WebSocket 客户端"""
        print(f"正在连接 AI Bot: {BOT_ID[:10]}...")
        print(f"WebSocket URL: {WS_URL[:60]}...")
        
        self.ws = websocket.WebSocketApp(
            WS_URL,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close
        )
        
        # 启动心跳线程
        def ping():
            while True:
                time.sleep(30)
                if self.connected and self.ws:
                    try:
                        self.ws.send(json.dumps({"cmd": "ping"}))
                    except:
                        break
        
        threading.Thread(target=ping, daemon=True).start()
        
        # 运行 WebSocket
        self.ws.run_forever()

def main():
    """主函数"""
    print("=" * 50)
    print("企业微信 AI Bot WebSocket 客户端")
    print("=" * 50)
    
    bot = WeComAIBot()
    
    try:
        bot.run()
    except KeyboardInterrupt:
        print("\n👋 用户中断")
        if bot.ws:
            bot.ws.close()

if __name__ == '__main__':
    main()
