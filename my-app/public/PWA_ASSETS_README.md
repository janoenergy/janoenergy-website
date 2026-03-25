# PWA 资源生成完成

## ✅ 已生成的资源

### 图标 (public/icons/)
| 文件 | 尺寸 | 用途 |
|------|------|------|
| icon-72x72.png | 72x72 | 基础图标 |
| icon-96x96.png | 96x96 | 基础图标 |
| icon-128x128.png | 128x128 | 基础图标 |
| icon-144x144.png | 144x144 | 基础图标 |
| icon-152x152.png | 152x152 | iOS 图标 |
| icon-192x192.png | 192x192 | PWA 图标 |
| icon-384x384.png | 384x384 | PWA 图标 |
| icon-512x512.png | 512x512 | PWA 图标 |
| maskable-icon-192x192.png | 192x192 | 自适应图标 |
| maskable-icon-512x512.png | 512x512 | 自适应图标 |
| apple-touch-icon.png | 180x180 | iOS 主屏幕 |
| favicon-32x32.png | 32x32 | 浏览器标签 |

### 截图 (public/screenshots/)
| 文件 | 尺寸 | 用途 |
|------|------|------|
| home.png | 1280x720 | 桌面端展示 |
| mobile.png | 750x1334 | 移动端展示 |
| about.png | 1280x720 | 关于页面 |
| mobile-narrow.png | 750x1334 | 移动端窄屏 |

### Manifest 更新
- ✅ 添加了 maskable 图标支持
- ✅ 添加了 shortcuts (快捷入口)
- ✅ 截图配置完整

## 📝 后续建议

### 1. 替换为实际品牌图标
当前生成的图标是占位符（显示"江"字），建议替换为：
- 品牌 Logo SVG
- 使用设计工具导出各尺寸 PNG

### 2. 添加更多截图
建议添加以下页面的截图：
- 业务领域 (/zh/business)
- 项目案例 (/zh/projects)
- 新闻中心 (/zh/news)
- ESG页面 (/zh/esg)

### 3. 测试 PWA 安装
```bash
# 本地测试
npm run build
npx serve dist

# 打开 Chrome DevTools → Lighthouse
# 运行 PWA 审计
```

### 4. 验证清单
- [ ] Chrome 地址栏出现安装图标
- [ ] 移动端可以添加到主屏幕
- [ ] 离线状态下可以访问缓存页面
- [ ] PWA 启动画面正常显示

## 🔧 重新生成图标

如需重新生成图标：
```bash
# 使用脚本
cd my-app
bash scripts/generate-pwa-icons.sh

# 或使用 Node.js
cd my-app
node scripts/generate-icons.js
```

---
生成时间: 2026-03-26
