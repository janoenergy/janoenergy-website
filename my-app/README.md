# JanoEnergy Website

江能集团官方网站 - 新能源开发、投资、建设、运营全产业链服务商

## 技术栈

- **框架**: Next.js 14 + TypeScript
- **样式**: Tailwind CSS
- **部署**: Cloudflare Pages
- **数据库**: Cloudflare D1 (待接入)

## 项目结构

```
src/
├── app/
│   ├── (site)/          # 前台网站
│   │   ├── page.tsx     # 首页
│   │   ├── about/       # 关于我们
│   │   ├── business/    # 业务板块
│   │   ├── projects/    # 项目案例
│   │   ├── news/        # 新闻中心
│   │   └── contact/     # 联系我们
│   ├── admin/           # 后台管理
│   │   ├── dashboard/   # 控制台
│   │   ├── projects/    # 项目管理
│   │   ├── content/     # 内容管理
│   │   ├── media/       # 媒体库
│   │   └── users/       # 用户管理
│   └── api/             # API 路由
├── components/          # 组件
├── lib/                 # 工具函数
├── types/               # TypeScript 类型
└── data/                # 静态数据
```

## 开发

```bash
npm install
npm run dev
```

## 部署

```bash
npm run build
# 部署到 Cloudflare Pages
```

## 功能特性

### 前台
- 响应式设计
- 首页展示
- 业务板块介绍
- 项目案例展示（风电/光伏/储能）
- 新闻中心
- 联系表单

### 后台
- 控制台概览
- 项目管理（增删改查）
- 内容管理（文章发布）
- 媒体库（文件上传）
- 用户管理（权限控制）
