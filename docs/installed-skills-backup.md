# 已安装技能备份清单
# 生成时间: 2026-03-10
# 备份说明: 此文件记录所有已安装的技能，用于系统恢复或迁移

## 工作区技能 (workspace/skills/)

| 技能名称 | 路径 | 状态 | 说明 |
|---------|------|------|------|
| ai-humanizer | ~/.openclaw/workspace/skills/ai-humanizer | ✅ 已启用 | AI去人性化，消除AI生成内容的可检测特征 |
| desktop-control | ~/.openclaw/workspace/skills/desktop-control | ✅ 已启用 | 桌面自动化（鼠标、键盘、截图） |
| find-skills | ~/.openclaw/workspace/skills/find-skills | ✅ 已启用 | 技能搜索 |
| self-improving | ~/.openclaw/workspace/skills/self-improving | ✅ 已启用 | 自我反思与改进 |
| skill-vetter | ~/.openclaw/workspace/skills/skill-vetter | ✅ 已启用 | 技能安全审查 |
| summarize | ~/.openclaw/workspace/skills/summarize | ✅ 已启用 | 内容摘要（URL/文件/音视频） |
| task-management | ~/.openclaw/workspace/skills/task-management | ✅ 已启用 | 任务管理 |

## 全局技能 (npm-global/lib/node_modules/openclaw/skills/)

### 核心技能
| 技能名称 | 路径 | 状态 | 说明 |
|---------|------|------|------|
| skill-creator | ~/.npm-global/lib/node_modules/openclaw/skills/skill-creator | ✅ 已启用 | 技能创建工具 |
| summarize | ~/.npm-global/lib/node_modules/openclaw/skills/summarize | ✅ 已启用 | 内容摘要（CLI版本） |
| github | ~/.npm-global/lib/node_modules/openclaw/skills/github | ✅ 已启用 | GitHub操作 |
| gh-issues | ~/.npm-global/lib/node_modules/openclaw/skills/gh-issues | ✅ 已启用 | GitHub Issues自动化 |
| healthcheck | ~/.npm-global/lib/node_modules/openclaw/skills/healthcheck | ✅ 已启用 | 系统安全检查 |
| weather | ~/.npm-global/lib/node_modules/openclaw/skills/weather | ✅ 已启用 | 天气查询 |

### 其他可用技能（未主动使用）
- 1password, apple-notes, apple-reminders, bear-notes
- blogwatcher, blucli, bluebubbles, camsnap
- canvas, clawhub, coding-agent, discord
- eightctl, gemini, gifgrep, gog, goplaces
- himalaya, imsg, mcporter, model-usage
- nano-banana-pro, nano-pdf, notion, obsidian
- openai-image-gen, openai-whisper, openai-whisper-api
- openhue, oracle, ordercli, peekaboo, sag
- session-logs, sherpa-onnx-tts, slack, songsee
- sonoscli, spotify-player, things-mac, tmux
- trello, video-frames, voice-call, wacli, xurl

## 飞书技能 (feishu/)

| 技能名称 | 路径 | 状态 | 说明 |
|---------|------|------|------|
| feishu-doc | ~/.openclaw/extensions/feishu/skills/feishu-doc | ⚠️ 通道已禁用 | 飞书文档读写 |
| feishu-drive | ~/.openclaw/extensions/feishu/skills/feishu-drive | ⚠️ 通道已禁用 | 飞书云盘管理 |
| feishu-wiki | ~/.openclaw/extensions/feishu/skills/feishu-wiki | ⚠️ 通道已禁用 | 飞书知识库 |
| feishu-perm | ~/.openclaw/extensions/feishu/skills/feishu-perm | ⚠️ 通道已禁用 | 飞书权限管理 |

## Microsoft Graph 技能

| 技能名称 | 路径 | 状态 | 说明 |
|---------|------|------|------|
| microsoft-graph | ~/.agents/skills/microsoft-graph/ | ✅ 已启用 | Microsoft 365集成（邮件/日历/OneDrive） |

## 恢复命令

如需重新安装技能，使用以下命令：

```bash
# 核心技能
clawhub install self-improving
clawhub install find-skills
clawhub install skill-vetter
clawhub install desktop-control
clawhub install ai-humanizer
clawhub install summarize
clawhub install task-management

# 其他技能
clawhub install skill-creator
clawhub install github
clawhub install gh-issues
clawhub install healthcheck
clawhub install weather
```

## 配置文件备份

重要配置文件位置：
- `~/.openclaw/openclaw.json` - 主配置
- `~/.openclaw/config/channels.yaml` - 通道配置
- `~/.openclaw/extensions/` - 插件目录
- `~/self-improving/` - 自我改进记忆

## 备注

- 生成日期: 2026-03-10
- 当前活跃通道: 企业微信 (wecom)
- 已禁用通道: 飞书 (feishu)
- 桌面控制依赖: pyautogui, pillow, pyobjc
