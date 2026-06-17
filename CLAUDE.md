# Incarnation

AI 助手技能与命令集合（Skills & Commands Pack），为 Claude Code 提供可复用的工作流。

## 可用命令

| 命令 | 用途 |
|---|---|
| `/eq:analyze-frontend` | 前端项目全面深度分析（9 章报告） |
| `/eq:restriction-code` | 向项目注入 4 条核心代码约束规则 |
| `/eq:ux-review` | 页面/组件 UX 体验审查（7 维度排查） |

## 目录结构

```
skills/    — 技能实现（每个 skill 一个目录，含 SKILL.md）
commands/  — 命令入口（挂载为 / 前缀的可调用命令）
```

## 使用方式

将此仓库克隆到任意项目后，Claude Code 会自动发现 `commands/` 和 `skills/` 下的所有 skill。
