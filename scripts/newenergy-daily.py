#!/usr/bin/env python3
"""
新能源政策日报 - 企业微信推送
每日 9:00 推送新能源政策信息源链接
"""

import json
import os
import urllib.request
from datetime import datetime

WECOM_BOT_KEY = os.getenv('WECOM_BOT_KEY', '')

def send_wecom_message(bot_key, content):
    """发送企业微信消息"""
    if not bot_key:
        print("错误: 未设置 WECOM_BOT_KEY 环境变量")
        return False
    
    webhook_url = f"https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key={bot_key}"
    
    data = {
        "msgtype": "markdown",
        "markdown": {"content": content}
    }
    
    req = urllib.request.Request(
        webhook_url,
        data=json.dumps(data).encode(),
        headers={"Content-Type": "application/json"},
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            result = json.loads(response.read().decode())
            if result.get('errcode') == 0:
                print("✅ 企业微信推送成功")
                return True
            else:
                print(f"❌ 推送失败: {result}")
                return False
    except Exception as e:
        print(f"❌ 推送异常: {e}")
        return False


def main():
    today = datetime.now().strftime('%Y-%m-%d')
    
    message = f"""📊 **{today} 新能源政策与电价早报**

🏛️ **天津**
• [天津市发改委](https://fzgg.tj.gov.cn/) - 新能源政策
• [天津电力交易中心](https://tjpmos.tjptc.com/) - 市场化交易

🏛️ **广东**
• [广东省发改委](https://drc.gd.gov.cn/) - 新能源政策
• [广东电力交易中心](https://www.gdptc.com/) - 市场化交易

🏛️ **四川**
• [四川省发改委](https://fgw.sc.gov.cn/) - 新能源政策
• [四川电力交易中心](https://www.scjydl.com/) - 市场化交易

🏛️ **全国**
• [国家能源局](https://www.nea.gov.cn/) - 新能源政策
• [北京电力交易中心](https://www.bjptc.com/) - 省间交易
• [广州电力交易中心](https://www.gzptc.com/) - 南方区域交易

---
💡 提示：以上为常用信息源链接，每日更新请关注官网最新公告"""

    print(f"[{datetime.now()}] 开始推送新能源日报...")
    
    success = send_wecom_message(WECOM_BOT_KEY, message)
    
    if success:
        print(f"[{datetime.now()}] 推送完成")
    else:
        print(f"[{datetime.now()}] 推送失败")
        return 1
    
    return 0


if __name__ == '__main__':
    exit(main())
