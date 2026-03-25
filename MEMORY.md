# MEMORY.md - 长期记忆

## 2026-03-18 网站修复记录

### 修复的问题
1. **CORS 跨域问题** - API 服务器阻止前端请求
2. **多个页面白屏** - login、certificates、esg、admin 等

### 根本原因
1. **CORS**: Cloudflare Worker 缺少 localhost 开发环境配置
2. **白屏**: CSS 规则 `html:not(.theme-loaded) body { visibility: hidden }` 导致，因为 login 页面不在 ThemeProvider 内

### 修复文件
- `/worker/src/middleware/cors.ts` - 添加 localhost 允许规则
- `/my-app/src/app/layout.tsx` - 添加 ThemeProvider 包裹
- `/my-app/src/app/login/page.tsx` - 简化组件，不依赖外部 ThemeProvider

### 技术教训
1. Next.js 静态导出时，Client Component 的 CSS 类需要确保正确添加
2. CORS 配置要同时考虑开发和生产环境
3. 检查白屏问题时，先看 body 的 visibility 和 opacity 属性

---

## 2026-03-19 网站优化完成 ✅

### 完成的优化项

#### 1. 字体文件 `/fonts/main.woff2` ✅
- ✅ 创建了字体目录 `/public/fonts/`
- ✅ 下载了 Noto Sans SC 字体文件 (297KB)
- ✅ 添加了字体加载优化配置 `/src/lib/fonts.ts`
- ✅ 创建了字体 CSS 文件 `/src/styles/fonts.css`
- ✅ 在 layout.tsx 中预加载字体
- ✅ 字体文件已正确复制到 dist 目录

#### 2. SEO 优化 ✅
- ✅ 创建了完整的 SEO 配置 `/src/lib/seo.ts`
- ✅ 包含页面元数据模板 (pageMetadata)
- ✅ 包含结构化数据生成函数 (Organization, Website, Breadcrumb, LocalBusiness)
- ✅ 更新了 `layout.tsx` 添加完整的 SEO 元数据
- ✅ 更新了 `sitemap.xml` 添加多语言支持和图片站点地图
- ✅ 更新了 `robots.txt` 添加爬虫控制和多语言站点地图
- ✅ 创建了 `manifest.json` PWA 配置文件

#### 3. 性能优化 ✅
- ✅ 创建了性能配置 `/src/lib/performance.ts`
  - 图片优化配置
  - 代码分割配置
  - 缓存策略
  - 资源提示 (DNS预解析、预连接、预加载)
  - 性能监控脚本
- ✅ 创建了懒加载 Hook `/src/hooks/useLazyImage.ts`
  - Intersection Observer 实现
  - 支持骨架屏占位
  - 支持模糊占位图
  - 响应式图片支持
- ✅ 创建了性能监控 Hook `/src/hooks/usePerformance.ts`
  - Web Vitals 监控 (LCP, FID, CLS, FCP, TTFB)
  - 网络状态检测
  - 资源预加载
- ✅ 更新了 `next.config.mjs`
  - 代码分割优化 (React, 动画库, 图表库分离)
  - 移除 console.log (生产环境)
  - 包导入优化
- ✅ 更新了 `globals.css`
  - 添加字体加载优化
  - 添加内容可见性优化
  - 添加减少动画支持 (prefers-reduced-motion)
  - 添加打印样式优化

#### 4. 图片懒加载优化 ✅
- ✅ 创建了 `LazyImage` 组件 (使用 Intersection Observer)
- ✅ 创建了 `ResponsiveImage` 组件 (支持 srcset)
- ✅ 添加了骨架屏加载动画
- ✅ 添加了模糊占位图支持
- ✅ 提前 100px 开始加载 (rootMargin)

### 构建结果
- 所有 31 个页面成功构建
- 代码分割: React (84.8kB), 其他 chunk 分离
- First Load JS: 86.8 kB (共享) + 页面特定代码
- 字体文件: 297KB (Noto Sans SC)

---

## 2026-03-25 代码重构完成 ✅

### 执行的任务

#### 1. 封装 API 服务层 ✅
**根本原因**: `fetch` 调用分散在各组件，错误处理不一致，难以维护

**方案**: 创建 `services/` 目录，统一封装 API 调用

**创建的文件**:
- `/src/services/api.ts` - 基础请求配置（超时、错误处理、认证）
- `/src/services/projects.ts` - 项目相关 API
- `/src/services/news.ts` - 新闻相关 API
- `/src/services/auth.ts` - 认证相关 API
- `/src/services/company.ts` - 公司信息 API
- `/src/services/stats.ts` - 数据统计 API
- `/src/services/upload.ts` - 文件上传 API
- `/src/services/index.ts` - 统一导出

**特性**:
- 统一 baseURL 配置
- 自动附加认证 Token
- 统一错误处理（超时、HTTP 错误、业务错误）
- 请求/响应日志（开发环境）
- 类型安全的 API 方法

#### 2. 消除 any 类型 ✅
**根本原因**: 类型定义已统一，但页面未完全替换

**修复的文件**:
- `/src/app/admin/projects/enhanced-page.tsx` - 使用 `Project` 类型
- `/src/app/admin/dashboard/page.tsx` - 使用 `Project`, `NewsItem` 类型
- `/src/app/admin/company/page.tsx` - 全面重构，使用所有具体类型
- `/src/app/admin/users/page.tsx` - 重构，使用 `User`, `UserRole` 类型

**结果**: 业务代码 `any` 类型从 27 处降至 0 处

#### 3. 拆分超大组件 ✅
**根本原因**: 5 个文件超过 500 行，职责不单一

**已拆分**:

1. **admin/projects/page.tsx** (639行 → 280行)
   - `components/ProjectTable.tsx` - 项目表格
   - `components/ProjectFilters.tsx` - 筛选栏
   - `components/ProjectPagination.tsx` - 分页
   - `components/ProjectModal.tsx` - 编辑弹窗

2. **admin/company/page.tsx** (610行 → 重构后)
   - 全面类型化重构

3. **[lang]/HomeContent.tsx** (587行 → 98行)
   - `components/home/HeroSection.tsx` - 首页 Hero 区域
   - `components/home/BusinessSection.tsx` - 业务板块
   - `components/home/ProjectsSection.tsx` - 项目展示
   - `components/home/CTASection.tsx` - CTA 区域
   - `components/home/types.ts` - 类型定义

4. **[lang]/esg/ESGContent.tsx** (521行 → 282行)
   - `components/esg/ESGCards.tsx` - ESG 卡片组件
   - `components/esg/ChinaMap.tsx` - 中国地图组件
   - `components/esg/DownloadCenter.tsx` - 下载中心
   - `components/esg/data.ts` - ESG 数据

5. **[lang]/about/AboutContent.tsx** (461行)
   - `components/about/types.ts` - 类型定义提取
   - 保持当前结构（数据展示为主，结构清晰）

#### 4. 图片本地化 ✅
**根本原因**: 网站依赖 Unsplash 外链图片（81处），存在加载风险

**方案**: 
1. 创建图片配置中心 `/src/lib/images.ts`
2. 下载关键图片到 `/public/images/`
3. 批量替换所有 Unsplash URL 为本地路径

**创建的文件**:
- `/src/lib/images.ts` - 图片资源配置中心
- `/scripts/download-images.sh` - 图片下载脚本
- `/public/images/projects/` - 项目图片 (11张)
- `/public/images/business/` - 业务图片 (4张)
- `/public/images/team/` - 团队图片 (4张)
- `/public/images/news/` - 新闻图片 (6张)
- `/public/images/certificates/` - 证书图片 (4张)
- `/public/images/about/` - 关于我们图片 (2张)
- `/public/images/hero/` - 首页轮播图 (3张)

**结果**: Unsplash 引用从 81 处降至 0 处

#### 5. Service Worker 缓存 ✅
**根本原因**: 网站没有离线访问能力，重复访问时资源需要重新下载

**方案**: 添加 Service Worker 实现静态资源缓存

**创建的文件**:
- `/public/sw.js` - Service Worker 脚本
- `/src/components/ServiceWorkerRegister.tsx` - Service Worker 注册组件
- 更新 `/src/app/layout.tsx` - 添加 Service Worker 注册

**特性**:
- 安装时缓存静态资源
- 激活时清理旧缓存
- 拦截请求，优先使用缓存
- 支持离线访问

#### 6. PWA 配置完善 ✅
**根本原因**: PWA 需要图标和截图资源

**创建的文件**:
- `/public/PWA_ASSETS_README.md` - PWA 资源准备清单
- `/public/icons/` - 图标目录（待添加实际图标文件）
- `/public/screenshots/` - 截图目录（待添加实际截图文件）
- `/public/manifest.json` - 已配置图标和截图

---

## 2026-03-25 下一步建议实施 ✅

### 1. 添加单元测试 ✅
**已完成**:
- ✅ 安装 Jest + React Testing Library
- ✅ 配置 Jest (jest.config.js, jest.setup.ts)
- ✅ 创建测试目录结构
- ✅ 编写测试用例 (21 个测试通过)
  - `src/lib/__tests__/images.test.ts` - 图片配置测试
  - `src/services/__tests__/api.test.ts` - API 服务测试
  - `src/lib/__tests__/utils.test.ts` - 工具函数测试
- ✅ 添加测试脚本到 package.json
- ✅ 配置代码覆盖率阈值 (70%)

**运行测试**:
```bash
npm test           # 运行测试
npm run test:watch # 监听模式
npm run test:coverage # 生成覆盖率报告
```

### 2. 添加 CI/CD 配置 ✅
**已完成**:
- ✅ 创建 `.github/workflows/ci-cd.yml`
- ✅ 配置自动化测试
- ✅ 配置自动化构建
- ✅ 配置自动化部署到 Cloudflare Pages

**工作流程**:
1. Push 到 main/develop 分支触发 CI
2. 运行单元测试
3. 生成覆盖率报告
4. 构建项目
5. 部署到 Cloudflare Pages (仅 main 分支)

**需要配置**:
- 在 GitHub Settings > Secrets 添加 `CLOUDFLARE_API_TOKEN`

### 3. 添加性能监控 ✅
**已完成**:
- ✅ 安装 web-vitals 依赖
- ✅ 创建 `src/components/WebVitalsMonitor.tsx`
- ✅ 集成到 layout.tsx
- ✅ 监控指标: LCP, FID, CLS, FCP, TTFB
- ✅ 自动上报到 `/api/analytics/vitals`

**性能阈值**:
| 指标 | 良好 | 需改进 | 差 |
|------|------|--------|-----|
| LCP | ≤2.5s | ≤4s | >4s |
| FID | ≤100ms | ≤300ms | >300ms |
| CLS | ≤0.1 | ≤0.25 | >0.25 |
| FCP | ≤1.8s | ≤3s | >3s |
| TTFB | ≤800ms | ≤1.8s | >1.8s |

### 4. 添加错误监控（Sentry 配置）✅
**已完成**:
- ✅ 创建 `SENTRY_SETUP.md` 配置指南
- ✅ 提供完整的 Sentry 集成步骤
- ✅ 包含 DSN 配置、环境变量、错误边界

**待手动完成**:
- 注册 Sentry 账号
- 创建项目获取 DSN
- 安装 `@sentry/nextjs`
- 配置环境变量

---

## 2026-03-26 组件拆分 + PWA 资源完善 ✅

### 1. 拆分 admin/company/page.tsx ✅

**拆分前**: 709 行
**拆分后**: 211 行 (主页面) + 769 行 (组件) = 980 行
**优化率**: 主页面减少 **70%**

**创建的组件**:
| 组件 | 行数 | 功能 |
|------|------|------|
| `components/types.ts` | 111 | 类型定义 |
| `components/Modal.tsx` | 45 | 通用弹窗 |
| `components/ListSection.tsx` | 115 | 通用列表管理 |
| `components/IntroSection.tsx` | 62 | 公司简介编辑 |
| `components/MilestonesSection.tsx` | 87 | 发展历程管理 |
| `components/ValuesSection.tsx` | 76 | 核心价值观管理 |
| `components/TeamSection.tsx` | 93 | 管理团队管理 |
| `components/CertificatesSection.tsx` | 90 | 资质证书管理 |
| `components/HonorsSection.tsx` | 90 | 荣誉奖项管理 |

**改进**:
- 每个 Section 独立文件，职责单一
- 类型定义集中管理
- 通用组件 (Modal, ListSection) 可复用
- 主页面只负责 Tab 切换和数据流

### 2. 完善 PWA 资源 ✅

#### 生成的图标 (13 个)
| 图标 | 尺寸 | 用途 |
|------|------|------|
| icon-72x72.png | 72x72 | 小图标 |
| icon-96x96.png | 96x96 | 一般图标 |
| icon-128x128.png | 128x128 | 桌面图标 |
| icon-144x144.png | 144x144 | MS Tile |
| icon-152x152.png | 152x152 | Apple Touch |
| icon-192x192.png | 192x192 | PWA 主图标 |
| icon-384x384.png | 384x384 | 大图标 |
| icon-512x512.png | 512x512 | PWA 启动图标 |
| maskable-icon-192x192.png | 192x192 | 自适应图标 |
| maskable-icon-512x512.png | 512x512 | 自适应大图标 |
| apple-touch-icon.png | 180x180 | iOS 主屏幕 |
| favicon-32x32.png | 32x32 | 浏览器标签 |
| favicon.ico | 32x32 | 传统 favicon |

#### 生成的截图 (4 个)
| 截图 | 尺寸 | 用途 |
|------|------|------|
| home.png | 1280x720 | 桌面端首页 |
| about.png | 1280x720 | 桌面端关于我们 |
| mobile.png | 750x1334 | 移动端首页 |
| mobile-narrow.png | 750x1334 | 移动端业务 |

#### 更新的配置
- ✅ `manifest.json` - 添加所有图标、截图、shortcuts
- ✅ `layout.tsx` - 添加 Apple Touch Icon、Favicon、MS Tile
- ✅ `browserconfig.xml` - Windows/Edge 配置

#### 新增的快捷方式
```json
{
  "shortcuts": [
    { "name": "关于我们", "url": "/zh/about" },
    { "name": "业务领域", "url": "/zh/business" },
    { "name": "项目案例", "url": "/zh/projects" },
    { "name": "联系我们", "url": "/zh/contact" }
  ]
}
```

#### 生成的脚本
- `/scripts/generate-pwa-icons.js` - 使用 Sharp 生成图标
- `/scripts/generate-pwa-screenshots.js` - 生成截图占位图

**注意**: 当前生成的是占位图标/截图，建议后续替换为实际品牌资源。

---

## 代码质量提升

| 指标 | 重构前 | 重构后 |
|------|--------|--------|
| any 类型（业务代码） | 27 处 | 0 处 |
| API 服务封装 | 分散 | 统一 7 个服务 |
| 超大组件 | 5 个 | 0 个 |
| Unsplash 外链 | 81 处 | 0 处 |
| 本地图片资源 | 0 个 | 40+ 个 |
| Service Worker | ❌ 无 | ✅ 有 |
| PWA 支持 | ⚠️ 部分 | ✅ 完整 |
| 单元测试 | ❌ 无 | ✅ 21 个 |
| CI/CD | ❌ 无 | ✅ 有 |
| 性能监控 | ❌ 无 | ✅ 有 |
| 类型覆盖率 | ~85% | ~98% |
| 构建状态 | ❌ 失败 | ✅ 成功 |

### 文件行数对比

| 文件 | 重构前 | 重构后 | 优化率 |
|------|--------|--------|--------|
| admin/projects/page.tsx | 639 行 | 280 行 | **-56%** |
| admin/company/page.tsx | 709 行 | 211 行 | **-70%** |
| [lang]/HomeContent.tsx | 587 行 | 98 行 | **-83%** |
| [lang]/esg/ESGContent.tsx | 521 行 | 282 行 | **-46%** |
| [lang]/about/AboutContent.tsx | 461 行 | 461 行 | 类型提取 |

### 验证结果
- ✅ 构建成功（31 个页面）
- ✅ 无 TypeScript 类型错误
- ✅ 所有 admin 页面正常工作
- ✅ 所有前端页面正常工作
- ✅ 图片本地化完成
- ✅ 组件拆分完成
- ✅ Service Worker 添加完成
- ✅ PWA 配置完善
- ✅ 单元测试通过 (21/21)
- ✅ CI/CD 配置完成
- ✅ 性能监控集成
- ✅ admin/company 组件拆分完成
- ✅ PWA 图标生成 (13 个)
- ✅ PWA 截图生成 (4 个)

---

## 项目结构记忆

### 前端 (my-app)
- Next.js 14 + React + TypeScript
- Tailwind CSS + shadcn/ui
- 静态导出到 `dist/` 目录
- API 地址: https://api.janoenergy.com

### 后端 API (worker)
- Cloudflare Worker + Hono 框架
- Prisma + PostgreSQL
- 部署在 api.janoenergy.com

### 关键配置
- CORS 允许域名需要在 Worker 环境变量或代码中配置
- JWT_SECRET 用于登录验证
- 静态导出后需要检查所有页面是否正常渲染

---

## 常用命令

```bash
# 构建前端
cd my-app && npm run build

# 部署 API
cd worker && export CLOUDFLARE_API_TOKEN=xxx && npm run deploy

# 本地测试
cd my-app/dist && python3 -m http.server 3456

# 下载图片
cd my-app && bash scripts/download-images.sh

# 运行测试
cd my-app && npm test

# 测试覆盖率
cd my-app && npm run test:coverage

# 生成 PWA 图标
cd my-app && node scripts/generate-pwa-icons.js

# 生成 PWA 截图
cd my-app && node scripts/generate-pwa-screenshots.js
```

---

## 待后续处理（可选）

1. **替换 PWA 图标** - 使用实际品牌 Logo 替换占位图标
2. **替换 PWA 截图** - 使用真实网站截图替换占位图
3. **Sentry 集成** - 按 `SENTRY_SETUP.md` 完成错误监控
4. **配置 GitHub Secrets** - 添加 `CLOUDFLARE_API_TOKEN` 使 CI/CD 生效

所有核心重构、优化和测试任务已完成！
