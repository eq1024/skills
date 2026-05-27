# EQ Skills

EQ 前端分析技能包 — 支持 `npx` 直接运行与 `npx skills` 库安装，为 Claude Code、Cursor 等十余种主流 AI Agent 编程助手提供命令行式的技能扩展。

## 支持的 AI 助手

当前支持通过交互式向导快速注入 Skills 和 Commands 至以下平台（支持全局与项目级配置）：

- Claude Code
- Cursor
- Codex
- GitHub Copilot
- OpenCode
- Windsurf
- Gemini CLI
- Antigravity
- Cline
- RooCode
- Kilo Code
- Qoder
- CodeBuddy

## 使用

**方式一：免安装直接运行（推荐）**

在任意项目目录下执行：

```bash
npx eq-skills
# 或
npx eq-skills init
```

**方式二：全局安装**

```bash
npm install -g eq-skills
```

全局安装后，在任意目录下均可直接使用 `eq` 命令：

```bash
eq          # 直接回车，进入交互式向导
eq init     # 触发初始化向导（同上）
eq list     # 列出当前支持的分析包
eq help     # 查看帮助
```

**方式三：通过 Vercel Skills 安装**

```bash
npx skills add eq-skills
```

执行后，按照命令行提示选择你要支持的 AI Agent（可多选）以及安装范围（全局 Global 或 当前项目 Local）。

## 包含的技能

### analyze-frontend

对前端项目进行全面深度分析，生成包含九个章节的完整报告：

1. 项目概览
2. 完整文件树
3. Git 同步分析
4. 架构分层与依赖关系
5. 公共封装分析
6. 配置与依赖分析
7. 风险清单（P0-P3）
8. 优化建议与重构路线图
9. 战略分析与最佳实践对标

## 命令

| 命令 | 说明 |
|------|------|
| `eq init` | 初始化 — 安装 skills 到当前项目 |
| `eq list` | 列出包内包含的所有 skills |
| `eq help` | 帮助 |

## 开发

### 添加新 Skill

1. 在 `skills/<name>/SKILL.md` 创建 skill 文件
2. 在 `commands/eq/<name>.md` 创建对应的 command 入口
3. 发布新版本

### 发布

```bash
npm publish
```

## License

MIT
