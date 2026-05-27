---
name: "EQ: Analyze Frontend"
description: 对前端项目进行全面深度分析，包含项目概览、文件树、Git审计、架构分层、公共封装、配置分析、风险清单、重构路线图、战略分析与最佳实践对标。
category: Analysis
tags: [frontend, analysis, architecture]
---

对当前前端项目执行全面深度分析，使用 `analyze-frontend` skill。

## 执行

1. 使用 Agent 工具启动分析代理，`subagent_type` 设为 `general-purpose`。
2. 如果用户指定了项目路径，在 prompt 中告知代理；否则默认分析当前工作目录。

```
对以下项目执行全面深度分析：[用户指定的路径或当前工作目录]
```

## 输出

分析代理返回的报告**必须完整呈现**给用户，不得省略、压缩或改写任何章节。报告包含九个章节，用户期望看到完整内容。
