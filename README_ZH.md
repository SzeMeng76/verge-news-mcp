# 🗞️ Verge 新闻 MCP 服务器

**[🌏 中文文档](./README_ZH.md)** | **[📖 English Documentation](./README.md)**

> 一个智能的模型上下文协议服务器，将 The Verge 的 RSS 源转换为强大的 AI 可访问新闻源

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green?style=flat-square)](https://modelcontextprotocol.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## 🚀 项目概述

Verge 新闻 MCP 服务器是连接 AI 助手与实时科技新闻的桥梁。专为 The Verge 的编辑内容而构建，该服务器通过清晰的 MCP 接口提供对突发科技新闻、产品评测和行业分析的智能访问。

### 为什么重要

在快速发展的科技世界中，保持信息同步不应该需要频繁的上下文切换。这个 MCP 服务器将 The Verge 权威的科技新闻直接带入你的 AI 工作流程，在现有工具内实现无缝的新闻消费和研究。

## ✨ 核心功能

### 🎯 智能新闻检索
- **智能过滤**: 自动按主题分类内容（AI、硬件、软件、游戏等）
- **时间智能**: 按时间窗口获取新闻，具有智能默认值
- **内容丰富**: 超越基础 RSS 的增强元数据提取

### 🔍 高级搜索功能
- **语义搜索**: 按含义而非仅关键词查找文章
- **多维过滤**: 结合主题、作者和日期过滤器
- **相关性评分**: 按内容重要性排序结果

### 🛠️ 开发者优先设计
- **类型安全接口**: 完整的 TypeScript 支持和全面的类型定义
- **可扩展架构**: 为自定义内容处理器准备的插件架构
- **性能优化**: 智能缓存和高效的 RSS 解析

## 📦 安装与设置

### npm 快速开始

```bash
# 全局安装以供系统范围访问
npm install -g verge-news-mcp

# 或本地安装用于特定项目
npm install verge-news-mcp
```

### MCP 客户端集成

#### Claude Desktop 配置
```json
{
  "mcpServers": {
    "verge-news": {
      "command": "npx",
      "args": ["verge-news-mcp"],
      "env": {
        "VERGE_CACHE_TTL": "300",
        "VERGE_MAX_ARTICLES": "50"
      }
    }
  }
}
```

#### VS Code 与 GitHub Copilot
```json
{
  "mcp.servers": {
    "verge-news": {
      "command": "node",
      "args": ["./node_modules/.bin/verge-news-mcp"],
      "transport": "stdio"
    }
  }
}
```

## 🔧 可用工具

### `fetch-latest-news`（获取最新新闻）
从 The Verge 检索最新文章并进行智能内容摘要。

**参数：**
- `limit`（可选）: 获取文章数量（默认: 10，最大: 50）
- `category`（可选）: 按内容类别过滤（`tech`、`reviews`、`gaming`、`ai`、`mobile`）
- `hours`（可选）: 获取最近 N 小时的文章（默认: 24）

**使用示例：**
```typescript
// 自然语言提示
"从 The Verge 获取最新的 5 篇 AI 相关文章"

// 结果工具调用：
{
  "tool": "fetch-latest-news",
  "arguments": {
    "limit": 5,
    "category": "ai",
    "hours": 24
  }
}
```

### `search-news-archive`（搜索新闻存档）
通过高级过滤选项对 The Verge 内容执行智能搜索。

**参数：**
- `query`（必需）: 搜索词或短语
- `maxResults`（可选）: 返回的最大文章数（默认: 15）
- `dateRange`（可选）: 带有 `from` 和 `to` 日期的时间范围对象
- `sortBy`（可选）: 排序标准（`relevance`、`date`、`engagement`）

**使用示例：**
```typescript
// 自然语言提示
"查找上个月发布的关于 iPhone 评测的文章"

// 结果工具调用：
{
  "tool": "search-news-archive",
  "arguments": {
    "query": "iPhone 评测",
    "maxResults": 10,
    "dateRange": {
      "from": "2025-06-26T00:00:00Z",
      "to": "2025-07-26T23:59:59Z"
    },
    "sortBy": "relevance"
  }
}
```

### `get-trending-topics`（获取热门话题）
分析当前内容以识别热门科技话题和主题。

**参数：**
- `timeWindow`（可选）: 分析窗口（`day`、`week`、`month`，默认: `day`）
- `topicCount`（可选）: 返回的话题数量（默认: 10）

## 🏗️ 开发

### 本地开发设置

```bash
# 克隆仓库
git clone https://github.com/SzeMeng76/verge-news-mcp.git
cd verge-news-mcp

# 安装依赖
npm install

# 启动开发服务器（热重载）
npm run dev

# 构建生产版本
npm run build

# 运行测试
npm test

# 代码检查和格式化
npm run lint
npm run format
```

### 项目结构

```
verge-news-mcp/
├── src/
│   ├── index.ts          # MCP 服务器入口点
│   ├── tools/            # 工具实现
│   │   ├── latest-news.ts
│   │   ├── search-archive.ts
│   │   └── trending-topics.ts
│   ├── services/         # 核心业务逻辑
│   │   ├── rss-parser.ts
│   │   ├── content-analyzer.ts
│   │   └── cache-manager.ts
│   ├── types/            # TypeScript 定义
│   │   ├── verge-types.ts
│   │   └── mcp-types.ts
│   └── utils/            # 工具函数
├── tests/                # 测试套件
├── docs/                 # 文档
└── examples/             # 使用示例
```

### 技术栈

- **核心框架**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - 官方 MCP TypeScript SDK
- **RSS 处理**: [rss-parser](https://github.com/rbren/rss-parser) - 强大的 RSS 源解析
- **内容分析**: [natural](https://github.com/NaturalNode/natural) - 自然语言处理
- **缓存**: [node-cache](https://github.com/node-cache/node-cache) - 内存缓存以提升性能
- **验证**: [zod](https://github.com/colinhacks/zod) - 运行时类型验证
- **HTTP 客户端**: [axios](https://github.com/axios/axios) - 带重试逻辑的 HTTP 请求

## 🌍 环境配置

### 环境变量

```bash
# 可选：自定义 RSS 源 URL（默认为 The Verge）
VERGE_RSS_URL=https://www.theverge.com/rss/index.xml

# 缓存配置
VERGE_CACHE_TTL=300  # 缓存生存时间（秒）
VERGE_MAX_ARTICLES=100  # 最大缓存文章数

# 速率限制
VERGE_RATE_LIMIT=60  # 每分钟请求数

# 内容过滤
VERGE_CONTENT_MIN_LENGTH=200  # 最小文章长度
VERGE_ENABLE_CONTENT_ANALYSIS=true
```

### 生产环境考虑

- **速率限制**: 实施尊重性的 RSS 轮询间隔
- **缓存策略**: 生产部署使用持久缓存
- **错误处理**: 全面的错误日志和恢复
- **监控**: 内置健康检查和性能指标

## 🤝 贡献

我们欢迎贡献！以下是参与方式：

1. **分叉与克隆**: 分叉仓库并克隆你的分叉
2. **功能分支**: 创建功能分支（`git checkout -b feature/amazing-feature`）
3. **编码**: 进行更改并添加测试
4. **测试**: 运行测试套件（`npm test`）
5. **提交**: 创建带有清晰描述的 Pull Request

### 贡献指南

- 遵循现有代码风格（配置了 ESLint + Prettier）
- 为新功能编写测试
- 更新任何 API 更改的文档
- 确保 TypeScript 严格模式合规

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## ⚖️ 法律与伦理

- **合理使用**: 本服务器根据合理使用原则实现 RSS 源
- **速率限制**: 尊重性轮询间隔以避免服务器压力
- **归属**: 所有内容仍属 Vox Media Inc. 所有
- **非商业**: 设计用于研究和开发目的

## 🙏 致谢

- **The Verge 团队**: 持续优秀的科技新闻报道
- **Anthropic**: 模型上下文协议规范
- **开源社区**: 让这个项目成为可能的工具和库

---

*为 AI 和新闻社区用 ❤️ 构建*
