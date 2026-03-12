# CI/CD 配置说明

## GitHub Secrets 配置

在 GitHub 仓库设置中添加以下 Secrets：

### 必需 Secrets

1. **CLOUDFLARE_API_TOKEN**
   - 获取方式: Cloudflare Dashboard → My Profile → API Tokens → Create Token
   - 权限: Cloudflare Pages (Edit), Workers Scripts (Edit)

2. **CLOUDFLARE_ACCOUNT_ID**
   - 获取方式: Cloudflare Dashboard 右侧栏
   - 格式: 32位字符串

### 可选 Secrets

3. **SLACK_WEBHOOK_URL** (监控告警用)
   - 获取方式: Slack App → Incoming Webhooks

## 配置步骤

1. 打开 GitHub 仓库: https://github.com/[username]/janoenergy-website
2. 进入 Settings → Secrets and variables → Actions
3. 点击 "New repository secret"
4. 依次添加上述 Secrets

## 验证部署

配置完成后，推送代码到 main 分支将自动触发部署：

```bash
git push origin main
```

在 GitHub Actions 页面查看部署状态：
https://github.com/[username]/janoenergy-website/actions

## 监控告警

- 每 5 分钟自动检查网站可用性
- 异常时发送 Slack 通知
- 手动检查: GitHub Actions → Health Check → Run workflow
