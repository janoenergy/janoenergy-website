#!/usr/bin/env node
/**
 * 企业微信 AI Bot 消息推送测试
 * 使用 @wecom/aibot-node-sdk
 */

const { WSClient } = require('@wecom/aibot-node-sdk');

// AI Bot 配置
const BOT_ID = "aibRWtB6zEf3yTbvemlKoYNySTYHzGobHz5";
const SECRET = "D2rR1CDyoRurHTrSRpFCUQuP9i5MCAKzyDX6LEILk20";

async function main() {
    console.log("=".repeat(50));
    console.log("企业微信 AI Bot 消息推送测试");
    console.log("=".repeat(50));
    
    console.log(`\nBot ID: ${BOT_ID.substring(0, 15)}...`);
    console.log("正在连接 WebSocket...\n");
    
    const wsClient = new WSClient({
        botId: BOT_ID,
        secret: SECRET,
        logger: {
            log: (msg) => console.log(`[SDK] ${msg}`),
            error: (msg) => console.error(`[SDK Error] ${msg}`)
        }
    });
    
    // 等待连接
    await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("连接超时"));
        }, 10000);
        
        wsClient.on('open', () => {
            clearTimeout(timeout);
            console.log("✅ WebSocket 连接成功\n");
            resolve();
        });
        
        wsClient.on('error', (err) => {
            clearTimeout(timeout);
            reject(err);
        });
        
        wsClient.connect();
    });
    
    // 发送测试消息
    const userId = process.argv[2] || "LiHua";
    const content = process.argv[3] || `🤖 小白测试消息

这是一条通过 AI Bot 平台发送的测试消息。

时间：${new Date().toLocaleString('zh-CN')}
状态：推送功能正常 ✅`;
    
    console.log(`正在发送消息给 ${userId}...`);
    
    try {
        // 使用 replyStream 发送消息
        const reqId = `test_${Date.now()}`;
        await wsClient.replyStream({
            from: userId,
            reqid: reqId
        }, reqId, content, true);
        
        console.log("✅ 消息发送成功！");
    } catch (err) {
        console.error("❌ 发送失败:", err.message);
    }
    
    // 关闭连接
    setTimeout(() => {
        wsClient.close();
        console.log("\n👋 连接已关闭");
        process.exit(0);
    }, 2000);
}

main().catch(err => {
    console.error("❌ 错误:", err.message);
    process.exit(1);
});
