# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

---

## 系统账号配置

### 综合管理平台 (janoenergy OA)
- **URL**: https://www.janoenergy.com/oa/login
- **账号**: `jano`
- **密码**: `jano`
- **备注**: 2026-03-11 更新，原账号 employee001 已废弃

### 开发环境控制面板
- **URL**: https://dev.janoenergy.com
- **访问**: 本地 + 远程白名单

---

## 数据库配置

### Railway PostgreSQL
- **平台**: Railway (https://railway.app)
- **类型**: PostgreSQL
- **连接字符串**: `postgresql://postgres:DXTDPGtJnhsJOqvuvgpdvVwaioDOaNqU@trolley.proxy.rlwy.net:43925/railway`
- **主机**: `trolley.proxy.rlwy.net`
- **端口**: `43925`
- **数据库**: `railway`
- **用户名**: `postgres`
- **项目 ID**: `999fb1d8-7fd0-4d10-8600-f10a427a8750`
- **用途**: 江能集团网站数据库（项目、新闻、用户）
- **配置日期**: 2026-03-11

### 数据库表结构
- **projects** - 项目表（风电/光伏/储能项目）
- **news** - 新闻表
- **users** - 用户表（后台管理）

---

## API Keys 配置

### Tavily Search
- **Key**: `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`
- **用途**: AI 搜索、技术调研
- **配置日期**: 2026-03-16
- **环境变量**: `export TAVILY_API_KEY="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"`

### Cloudflare (janoenergy-website)
- **API Token**: `iPRjVf9h4BMCB-uM56jdQ77yl7pPfadcw39pjhIh`
- **Account ID**: `52a6e8955a00cb1d3f177d2bc1b15971`
- **用途**: Cloudflare Pages + Workers 部署
- **配置日期**: 2026-03-12
- **环境变量**: `export CLOUDFLARE_API_TOKEN="iPRjVf9h4BMCB-uM56jdQ77yl7pPfadcw39pjhIh"`

---

## 网站部署流程 (janoenergy-website)

### 技术栈
- **前端**: Next.js 14 + TypeScript + Tailwind CSS
- **部署**: Cloudflare Pages
- **后端**: Cloudflare Workers + Hono
- **数据库**: Prisma Postgres (via Accelerate)

### 部署步骤
1. 代码修改 → `git add .` → `git commit -m "xxx"` → `git push origin main`
2. 本地构建: `cd my-app && npm run build`
3. 直接部署:
   ```bash
   cd my-app
   CLOUDFLARE_API_TOKEN="iPRjVf9h4BMCB-uM56jdQ77yl7pPfadcw39pjhIh" npx wrangler pages deploy dist --project-name=janoenergy-website
   ```
4. GitHub Actions 也会自动部署，但直接部署更快

### 默认统计数据
- **capacity**: 1135+ MW
- **projects**: 12+
- **provinces**: 12
- **year**: 2018

---

## 已安装技能清单

### 核心必备
| 工具 | 技能 | 状态 |
|------|------|------|
| agent-browser | OpenClaw 内置 | ✅ |
| playwright-automation | OpenClaw 内置 | ✅ |
| github | gh CLI + gh-issues skill | ✅ |
| coding-agent | 我本身 | ✅ |
| web-scraper | firecrawl-scraper | ✅ 2026-03-16 |

### 进阶扩展
| 工具 | 技能 | 状态 |
|------|------|------|
| Tavily-search | search | ✅ 2026-03-16 |
| api-gateway | api-gateway | ✅ 2026-03-16 |
| workflow-automation | cicd-automation-workflow-automate | ✅ 2026-03-16 |
| summarize | summarize | ✅ |
| microsoft-graph | microsoft-graph | ✅ |
| obsidian-cli | obsidian-cli | ✅ |
| obsidian-markdown | obsidian-markdown | ✅ |
| obsidian-bases | obsidian-bases | ✅ |

### 其他技能
| 技能 | 用途 | 状态 |
|------|------|------|
| find-skills | 技能发现 | ✅ |
| task-management | 任务管理 | ✅ |
| desktop-control | 桌面控制 | ✅ |
| ai-humanizer | AI内容人性化 | ✅ |
| self-improving | 自我改进 | ✅ |
| skill-vetter | 技能安全检查 | ✅ |
| office | Excel/Word/PPT | ✅ |
| weather | 天气查询 | ✅ |
| healthcheck | 系统安全 | ✅ |
| github | GitHub 操作 | ✅ |
| gh-issues | GitHub Issue 处理 | ✅ |
| clawhub | 技能管理 | ✅ |
| skill-creator | 技能创建 | ✅ |
