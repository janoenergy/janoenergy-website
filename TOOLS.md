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
