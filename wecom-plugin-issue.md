## 问题描述

OpenClaw 加载插件时产生 ID 不一致警告：

```
企业微信插件 ID 警告 - 这是插件本身包名和内部 ID 不一致导致的
```

## 根本原因

存在两处 ID 命名不一致：

| 位置 | 当前值 |
|------|--------|
| `package.json` 中的 `name` | `@wecom/wecom-openclaw-plugin` |
| `openclaw.plugin.json` 中的 `id` | `wecom-openclaw-plugin` |

OpenClaw 加载插件时会校验这两个 ID，不一致即触发警告。

## 影响

- **功能**：无影响，插件工作正常
- **体验**：日志中出现警告信息，可能造成用户困惑

## 建议修复方案

**方案1（推荐）**：统一使用带作用域的完整包名

修改 `openclaw.plugin.json`：
```json
{
  "id": "@wecom/wecom-openclaw-plugin",
  "channels": ["wecom"]
}
```

**方案2**：统一使用短 ID

修改 `package.json`，添加明确的插件 ID 声明：
```json
"openclaw": {
  "plugin": {
    "id": "wecom-openclaw-plugin"
  },
  "channel": { ... }
}
```

## 环境信息

- 插件版本：1.0.6
- OpenClaw 版本：2026.3.8-beta.1

---

感谢维护这个插件！如有需要我可以提供更多信息。
