#!/usr/bin/env python3
"""
企业微信群机器人 Webhook 推送脚本
使用官方群机器人接口，不依赖 OpenClaw 插件
文档: https://open.work.weixin.qq.com/help/wap/detail?docid=21657
"""

import json
import urllib.request
import sys
import os

# 默认使用环境变量或配置文件中的 Key
DEFAULT_BOT_KEY = os.getenv('WECOM_BOT_KEY', '')

def send_wecom_text(content, key=None, mentioned_list=None, mentioned_mobile_list=None):
    """
    发送文本消息到企业微信群
    
    Args:
        content: 消息内容，最长不超过2048个字节
        key: 群机器人 webhook key
        mentioned_list: @用户ID列表
        mentioned_mobile_list: @手机号列表
    """
    key = key or DEFAULT_BOT_KEY
    
    if not key:
        print("❌ 错误: 未配置群机器人 Key")
        print("请设置环境变量 WECOM_BOT_KEY 或在调用时传入 key 参数")
        return False
    
    webhook_url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key}"
    
    data = {
        "msgtype": "text",
        "text": {
            "content": content
        }
    }
    
    if mentioned_list:
        data["text"]["mentioned_list"] = mentioned_list
    if mentioned_mobile_list:
        data["text"]["mentioned_mobile_list"] = mentioned_mobile_list
    
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

def send_wecom_markdown(content, key=None):
    """
    发送 Markdown 消息到企业微信群
    
    Args:
        content: Markdown 格式消息内容
        key: 群机器人 webhook key
    """
    key = key or DEFAULT_BOT_KEY
    
    if not key:
        print("❌ 错误: 未配置群机器人 Key")
        return False
    
    webhook_url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={key}"
    
    data = {
        "msgtype": "markdown",
        "markdown": {
            "content": content
        }
    }
    
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
                print("✅ Markdown 消息发送成功")
                return True
            else:
                print(f"❌ 发送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 发送异常: {e}")
        return False

def main():
    """命令行入口"""
    import argparse
    
    parser = argparse.ArgumentParser(description='企业微信群机器人消息推送')
    parser.add_argument('message', nargs='?', help='消息内容')
    parser.add_argument('--key', '-k', help='群机器人 Key')
    parser.add_argument('--markdown', '-m', action='store_true', help='使用 Markdown 格式')
    parser.add_argument('--at', '-a', nargs='+', help='@用户ID列表')
    parser.add_argument('--at-mobile', nargs='+', help='@手机号列表')
    
    args = parser.parse_args()
    
    # 默认测试消息
    message = args.message or """🤖 小白测试消息

这是一条从 OpenClaw 发送到企业微信的测试消息。

时间：2026-03-15 23:11
状态：推送功能正常 ✅"""
    
    if args.markdown:
        send_wecom_markdown(message, args.key)
    else:
        send_wecom_text(message, args.key, args.at, args.at_mobile)

if __name__ == '__main__':
    main()
