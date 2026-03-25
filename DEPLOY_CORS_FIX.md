# API CORS 修复部署指南

## 问题
API 服务器缺少 CORS 配置，导致前端无法访问。

## 修复内容
已更新 `/worker/src/middleware/cors.ts`：
1. 允许所有 localhost 开发环境
2. 允许配置的域名列表
3. 支持通配符子域名
4. 添加 maxAge 缓存预检请求

## 部署步骤

### 方法 1: 使用 Wrangler CLI 部署

```bash
cd /Users/jano/.openclaw/workspace/worker

# 设置 Cloudflare API Token
export CLOUDFLARE_API_TOKEN=你的_token

# 部署
npm run deploy
```

获取 Token: https://dash.cloudflare.com/profile/api-tokens
- 需要权限: Cloudflare Workers Edit, Account Read

### 方法 2: 通过 Cloudflare Dashboard 部署

1. 登录 https://dash.cloudflare.com
2. 进入 Workers & Pages
3. 找到 `janoenergy-api` 项目
4. 点击 "Edit Code"
5. 替换 `src/middleware/cors.ts` 文件内容
6. 点击 "Deploy"

### 方法 3: 配置环境变量（推荐）

在 Cloudflare Dashboard 中设置环境变量：

```
ALLOWED_ORIGINS = https://www.janoenergy.com,https://janoenergy.com,http://localhost:3000
```

这样无需修改代码即可控制允许的域名。

## 验证修复

部署后测试：

```bash
# 测试 OPTIONS 请求
curl -I -X OPTIONS \
  -H "Origin: http://localhost:3456" \
  -H "Access-Control-Request-Method: GET" \
  https://api.janoenergy.com/api/projects

# 应该返回:
# access-control-allow-origin: http://localhost:3456
# access-control-allow-methods: GET,POST,PUT,DELETE,OPTIONS
```

## 白屏页面问题

白屏页面可能是其他问题，需要检查：

1. 浏览器控制台错误
2. JavaScript 运行时错误
3. 缺少的环境变量

检查命令：
```bash
cd /Users/jano/.openclaw/workspace/my-app
npm run build 2>&1 | grep -i error
```
