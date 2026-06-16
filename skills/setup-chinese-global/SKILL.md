---
name: "setup-chinese-global"
description: "一键全局中文配置 — 检测当前 AI 助手并将中文输出规则写入其全局级系统提示词文件"
---

# 一键中文配置 (setup-chinese-global)

将中文输出偏好写入当前 AI 助手的全局配置文件中，使所有对话、文档、注释默认使用中文。

## 核心规则内容

需要写入的中文规则如下（根据目标配置文件格式自动适配）：

1. 所有面向用户的文本输出（对话回复、解释、报告）以中文为主
2. 所有文档文件（CLAUDE.md、README、注释、变更说明）以中文编写
3. 代码审查、PR/Issue 描述以中文输出
4. 技术术语可中英混用，以表达准确优先
5. 不适用范围：代码标识符、变量名、函数名保持英文；commit 标题可保持 feat: fix: 惯例

## 执行步骤

### 第一步：检测当前 AI 助手

检查当前工作区及用户主目录中是否存在以下 AI 助手的专属配置文件或目录：

| 特征 | 对应助手 |
|---|---|
| `~/.claude/CLAUDE.md`、`CLAUDE.md`、`.claude/` | Claude Code |
| `~/.config/kilo/`、`~/.kilo/`、`.kilo/` | Kilo |
| `.cursorrules`、`.cursor/rules/` | Cursor |
| `.windsurfrules` | Windsurf |
| `~/.gemini/`、`.gemini/` | Gemini CLI |
| `~/.codex/`、`.codex/` | OpenAI Codex CLI |

> 注意：`~` 代表用户主目录（Windows 下为 `$env:USERPROFILE`）。

如果检测到多个助手特征，优先选择当前项目目录下存在其配置文件的助手。如果以上均无法确定，向用户提问："无法确定您当前使用的 AI 助手，请告诉我您使用的是哪款（Claude Code / Kilo / Cursor / Windsurf / Gemini / Codex）？"

### 第二步：写入全局配置

直接写入全局配置，无需询问项目级。

按助手类型写入对应文件：

| 助手 | 全局配置文件 |
|---|---|
| Claude Code | `~/.claude/CLAUDE.md` |
| Kilo | `~/.config/kilo/CLAUDE.md`（或 `~/.config/kilo/AGENTS.md`） |
| Cursor | `~/.cursorrules`（用户目录） |
| Windsurf | `~/.windsurfrules`（用户目录） |
| Gemini CLI | `~/.gemini/GEMINI.md` |
| OpenAI Codex CLI | `~/.codex/CODEX.md` |

对不支持的助手，直接输出等效规则文本供用户手动粘贴。

### 第三步：补写 memory（仅 Claude Code）

若当前助手为 Claude Code，在 `~/.claude/memory/` 下确保以下两个文件存在：

- `user_language.md` — 语言偏好
- `feedback_language.md` — 全局中文输出规则

若非 Claude Code，跳过此步。

### 第四步：验证

读取被写入的配置文件，确认规则已成功追加。

## 安全规则

- 如果目标文件已存在且包含中文规则，询问是追加还是替换
- 绝不覆盖文件中已有的非中文相关规则
- 写入前展示将要添加的内容，请求用户确认
