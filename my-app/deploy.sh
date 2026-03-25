#!/bin/bash
# 部署脚本 - 需要设置 CLOUDFLARE_API_TOKEN 环境变量

# 检查环境变量
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
  echo "❌ 错误: CLOUDFLARE_API_TOKEN 环境变量未设置"
  echo ""
  echo "请按以下步骤操作:"
  echo "1. 登录 Cloudflare Dashboard: https://dash.cloudflare.com"
  echo "2. 进入 'My Profile' > 'API Tokens'"
  echo "3. 点击 'Create Token'"
  echo "4. 选择 'Custom token' 模板"
  echo "5. 设置权限:"
  echo "   - Zone:Read (用于读取域名信息)"
  echo "   - Page:Edit (用于部署 Pages)"
  echo "6. 创建后复制 token"
  echo "7. 设置环境变量: export CLOUDFLARE_API_TOKEN=your_token"
  echo ""
  echo "或者使用以下命令部署:"
  echo "CLOUDFLARE_API_TOKEN=your_token npm run deploy"
  exit 1
fi

# 构建
echo "=== 构建项目 ==="
npm run build

# 部署到 Cloudflare Pages
echo "=== 部署到 Cloudflare Pages ==="
npx wrangler pages deploy dist --project-name=janoenergy-website

echo "=== 部署完成 ==="
