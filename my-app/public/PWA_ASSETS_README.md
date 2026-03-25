# PWA 资源准备清单

## 图标 (icons/)

需要准备以下尺寸的 PNG 图标：

| 文件名 | 尺寸 | 用途 |
|--------|------|------|
| icon-72x72.png | 72x72 | 安卓启动图标 |
| icon-96x96.png | 96x96 | 安卓启动图标 |
| icon-128x128.png | 128x128 | Chrome 商店 |
| icon-144x144.png | 144x144 | 安卓启动图标 |
| icon-152x152.png | 152x152 | iOS 主屏幕 |
| icon-192x192.png | 192x192 | 安卓启动图标 |
| icon-384x384.png | 384x384 | 安卓启动图标 |
| icon-512x512.png | 512x512 | 安卓启动图标、PWA 安装 |
| apple-touch-icon.png | 180x180 | iOS 主屏幕 |
| favicon-16x16.png | 16x16 | 浏览器标签 |
| favicon-32x32.png | 32x32 | 浏览器标签 |

## 截图 (screenshots/)

需要准备以下截图用于 PWA 安装提示：

| 文件名 | 尺寸 | 用途 |
|--------|------|------|
| screenshot-wide.png | 1280x720 | 宽屏展示 |
| screenshot-narrow.png | 720x1280 | 移动端展示 |

## 设计建议

### 图标设计
- 使用公司 Logo
- 背景色：#10b981 ( emerald-500 )
- 图标主体：白色
- 圆角：20%
- 格式：PNG (透明背景)

### 截图内容
- 首页 Hero 区域
- 项目展示页面
- 数据统计区域
- 确保展示网站核心功能

## 生成工具

可以使用以下工具生成：
1. **Figma** - 设计图标和导出
2. **PWA Asset Generator** - 自动生成各种尺寸
3. **RealFaviconGenerator** - 生成 favicon

## 安装 PWA Asset Generator

```bash
npm install -g pwa-asset-generator

# 使用示例
pwa-asset-generator logo.png ./public/icons --background "#10b981"
```
