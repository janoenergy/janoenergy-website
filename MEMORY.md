# MEMORY.md - 长期记忆

## BOSS
- **姓名**: 励华
- **身份**: 新能源行业（开发、投资、EPC、运营）全链条管理者及决策者
- **称呼**: BOSS

## 核心规则

### Shell 执行授权
- 所有 `exec` / shell 命令必须经过 BOSS 明确授权
- 流程：方案 → 同意 → 执行
- 禁止擅自执行任何 shell 命令

### 记忆系统
- 每日记录到 `memory/YYYY-MM-DD.md`
- 定期整理关键信息到本文件
- 每周回顾一次

### 邮件默认设置
- **默认收件人**: lihua@janoenergy.cn (励华)
- **规则**: 发送邮件时无需输入地址，自动使用默认收件人

## 我的身份
- **名字**: 小白
- **Emoji**: 🤖
- **风格**: 干练直接，不废话

## 重要事件时间线

### 2026-03-08
- 首次上线，建立身份和规则
- 配置飞书通道
- 建立记忆系统

### 2026-03-09
- 记忆系统优化完成
- 配置每日 9 点新能源信息推送
- dev.janoenergy.com 控制面板访问权限配置

### 2026-03-10
- Microsoft Graph API 完整配置
- 邮件/日历/OneDrive 权限全部开通
- 邮件发送功能测试成功
- 建立文件存档规范（OneDrive共享文件夹）
- **设置默认邮件收件人: lihua@janoenergy.cn**

### 2026-03-11
- **网站全栈升级完成**
- Cloudflare Workers + Pages 部署
- 后台管理系统完善（仪表盘、项目/新闻/用户管理、系统设置）
- **www.janoenergy.com 访问异常**（待修复）

### 2026-03-12
- **江能集团网站正式发布** 🎉
- 域名：https://www.janoenergy.com
- 前台8个页面 + 后台5个模块全部上线
- 技术栈：Next.js 14 + Cloudflare Workers + Prisma Postgres
- 核心数据：12个项目、1135+ MW装机、覆盖12省份

### 2026-03-13
- 网站显示问题全面修复
- 统一表单组件样式（输入框48px、按钮44px、字体16px）
- 关于页面补充完整发展历程（2018-2025）
- 项目管理/新闻管理弹窗功能修复

## 系统配置

### 网站架构
| 组件 | 技术 |
|------|------|
| 前端 | Next.js 14 + TypeScript + Tailwind CSS |
| 部署 | Cloudflare Pages |
| 后端 | Cloudflare Workers + Hono |
| 数据库 | Prisma Postgres (via Accelerate) |
| 仓库 | https://github.com/janoenergy/janoenergy-website |

### 自动化任务
| 任务 | 频率 | 说明 |
|------|------|------|
| 新能源信息推送 | 每日 9:00 | 抓取天津/广东/四川政策和电价信息 |
| 网站健康检查 | 每5分钟 | 检查网站和API可用性 |
| 访问日志分析 | 每周一 9:00 | 分析 dev.janoenergy.com 访问情况 |
| Cloudflare监控 | 每周一 9:00 | 检测异常访问并推送告警 |

### 监控告警规则
- 单日访问 > 100 次 → 高频告警
- 同一 IP 从 >2 个国家访问 → VPN/代理告警
- 0-5 点访问 >10 次 → 深夜访问提醒

## 技能清单

### 已安装
- weather - 天气查询
- summarize - 内容摘要
- gh-issues - GitHub Issue 处理
- github - GitHub 操作
- healthcheck - 系统安全加固
- skill-creator - 技能创建
- clawhub - 技能管理
- microsoft-graph - Microsoft 365 集成
- task-management - 任务管理
- find-skills - 技能发现
- self-improving - 自我改进
- skill-vetter - 技能安全检查
- ai-humanizer - AI内容人性化
- desktop-control - 桌面控制

### 待安装
- whisper/语音转文字（需配置API）

## 联系方式

### 飞书
- 已配置，可推送消息

### 邮件
- 默认收件人：lihua@janoenergy.cn
- 通过 Microsoft Graph API 发送

## 待办事项

### 高优先级
- [ ] 修复 www.janoenergy.com 访问问题
- [ ] 配置语音转文字功能

### 中优先级
- [ ] 网站内容持续更新
- [ ] 监控告警规则调优

### 低优先级
- [ ] 企业微信接入（需备案域名）

---

*最后更新：2026-03-15 周日*
