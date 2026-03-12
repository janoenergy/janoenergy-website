# 江能集团网站 - Next.js Full Stack 升级

## 技术栈
- Next.js 14 (App Router)
- TypeScript
- Prisma ORM
- PostgreSQL
- NextAuth.js
- Tailwind CSS

## 项目结构
```
my-app/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (auth)/            # 认证相关页面
│   ├── admin/             # 后台管理
│   ├── oa/                # OA系统
│   └── ...
├── lib/                   # 工具函数
│   ├── prisma.ts         # Prisma Client
│   └── auth.ts           # NextAuth配置
├── prisma/                # Prisma Schema
│   └── schema.prisma
├── components/            # 组件
└── public/               # 静态资源
```

## 数据库配置
- 数据库: PostgreSQL
- ORM: Prisma
- 连接: 环境变量 DATABASE_URL

## 认证
- NextAuth.js
- Credentials Provider
- JWT Session

## 部署
- 平台: Vercel / Railway
- 数据库: Railway PostgreSQL / Supabase
