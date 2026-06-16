<div align="center">

# 🤗 eq skills

#### 我自己每天在用的一些前端开发 Skill

[![License](https://img.shields.io/badge/License-MIT-3B82F6?style=for-the-badge)](./LICENSE)
[![Skills](https://img.shields.io/badge/Skills-4-10B981?style=for-the-badge)](#-skills)

![Claude Code](https://img.shields.io/badge/Claude_Code-Skill-D97706?style=flat-square&logo=anthropic&logoColor=white)
![Kilo](https://img.shields.io/badge/codex-Skill-000000?style=flat-square)
![Cursor](https://img.shields.io/badge/Cursor-Skill-3B82F6?style=flat-square)
![Windsurf](https://img.shields.io/badge/Windsurf-Skill-8B5CF6?style=flat-square)

</div>

都是在自己项目里使用和测试过的，主打的就是一个实用。

这里的每个 Skill 都会配置对应command(通过npx 方式按照时)，所以大部分时候直接使用 `/` 调用最方便

---

## 📋 目录

| 名字 | 一句话 |
|---|---|
| 🔍 [**analyze-frontend（前端分析）**](#-analyze-frontend前端项目深度分析) | 全面扫描前端项目，出具包含架构分层、文件树、Git审计等九个章节的万字体检报告 |
| 🛡️ [**restriction-code（限制代码行为）**](#-restriction-code限制代码行为) | 给 AI 注入代码纪律（大道至简、谋定而后动等），防止它乱改代码、过度设计 |
| 🇨🇳 [**setup-chinese-global（一键中文配置）**](#-setup-chinese-global一键中文配置) | 一键检测当前 AI 工具，并强制把它调教成全中文输出（且不改业务逻辑和变量名） |
| 🎨 [**ux-review（UX 体验审查）**](#-ux-reviewux-体验审查) | 敲完代码跑一下，只针对本次修改的文件（或指定范围），从 7 个维度进行体验修复，绝不动核心业务逻辑 |

---

## 📦 安装方式

**方式一：交给 Agent 安装**

在支持 Skill 的 Agent 里（比如 Codex 或 Claude Code），直接说：

```
帮我安装这个 skill：https://github.com/eq1024/skills
```


**方式二：通过 NPM 安装**

在任意项目目录下执行：

```bash
npx eq-skills
```

或者

```bash
npx skills add eq-skills
```

---

## ✨ Skills

<a id="-skills"></a>

<table>
<tr><td>

### 🔍 analyze-frontend（前端项目深度分析）

> *"每次接手一坨屎山前端项目，都不知道从哪下手。不如让 Agent 先给我出一份万字体检报告。"*

随口跟 Agent 说一句"帮我分析一下前端项目"，它会读取内置配置并执行全面扫描，最后给你出一份详尽的分析报告。

**它包含九个章节**

从项目概览、文件树、Git 审计，到架构分层、公共封装、配置分析、风险清单、重构路线图，乃至战略分析与最佳实践对标。每条结论都会基于实际文件内容而非猜测，附带代码证据。

**怎么触发**

```
分析一下这个前端项目
生成前端深度分析报告
加载 analyze-frontend
```

→ [SKILL.md](./skills/analyze-frontend/SKILL.md)

</td></tr>
</table>

<table>
<tr><td>

### 🛡️ restriction-code（限制代码行为）

> *"AI 写代码总喜欢过度设计、乱加注释、重构没坏的东西。得给它上个紧箍咒。"*

这个 skill 的作用就是将一套**铁血纪律**强制注入到当前项目 AI 助手的系统提示词里。

**它会注入这四条规矩**

- **谋定而后动**：不确定就问，不盲目乱猜业务逻辑
- **大道至简**：用最少的代码解决问题，拒绝过度设计
- **外科手术式修改**：只改该改的地方，不乱清死代码或格式
- **目标驱动执行**：修改前先定义成功标准，写验证用例

写完之后，它还会智能联动 `analyze-frontend` 顺手分析一波前端代码薄弱点，给出针对性的定制约束建议。

**怎么触发**

```
帮我注入代码约束
写入代码行为限制规则
加载 restriction-code
```

→ [SKILL.md](./skills/restriction-code/SKILL.md)

</td></tr>
</table>

<table>
<tr><td>

### 🇨🇳 setup-chinese-global（一键中文配置）

> *"懒得每次开新会话都跟 Agent 强调‘请用中文回复’了，直接写进它的 DNA 里。"*

一键自动检测你当前用的到底是 Kilo、Claude Code 还是 Cursor、Windsurf。然后直接把**中文输出优先**的规则死死写进它的全局配置或记忆系统里。

**它的核心原则**

- 面向用户的对话、解释、报告必须是中文
- 文档文件（如 README、注释）优先使用中文
- 代码内部（变量名、函数名、commit 前缀）仍然保持英文，绝不动业务逻辑的命名规范
- 技术术语支持中英混编，追求表达准确

**怎么触发**

```
配置一下全局中文
以后全用中文回复
加载 setup-chinese-global
```

→ [SKILL.md](./skills/setup-chinese-global/SKILL.md)

</td></tr>
</table>

<table>
<tr><td>

### 🎨 ux-review（UX 体验审查）

> *"功能做完了，但体验很糙？加载没动画、报错就白屏。让 Agent 最后把关，统一给本次改动做个体验质检。"*

只专注于前端交互体验，**绝对不碰任何底层核心业务逻辑**。它的定位是“做完一系列功能后的统一检查站”。

它会优先提取**本次对话中修改过的所有前端文件**作为审查范围，当然，你也可以在调用时直接补充需要检查的文件。然后它会像个强迫症产品经理一样，从 7 个维度把代码审视一遍。

**审查哪 7 大维度**

1. **加载态**：有无骨架屏？会不会白屏？
2. **错误态**：报错有兜底吗？局部错误隔离了吗？
3. **空态**：缺数据有没有友好的占位符？
4. **边界与守卫**：有没有空值保护、可选链兜底？
5. **响应式与渲染**：解构丢没丢失响应性？重复渲染了吗？
6. **细节打磨**：图片有没有 fallback？长文本截断、防抖节流做了吗？
7. **网络与性能**：有没有并发请求优化空间？

干完之后给你一份带状态指示灯的汇总报表。

**怎么触发**

```
审查一下这个页面的 UX
看下前端体验哪里能优化
加载 ux-review
```

→ [SKILL.md](./skills/ux-review/SKILL.md)

</td></tr>
</table>

---

## 🌟 关于

这是我自己前端平时开发过程中遇到的痛点解决方案集，后续会持续更新内容，如果能有任何一个skill帮助到你

欢迎给个 ⭐。

