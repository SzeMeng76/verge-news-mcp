# 📰 Verge 新闻 MCP 服务器

**中文版** | **[English](./README.md)**

> 一个简单高效的 MCP 服务器，用于访问 The Verge 新闻 RSS 源

## 🎯 这是什么？

这是一个轻量级的模型上下文协议（MCP）服务器，允许 AI 助手从 The Verge 的 RSS 源获取和搜索新闻文章。通过你的 AI 工具直接了解最新科技新闻的完美选择。

## ✨ 功能特性

- 📡 **获取每日新闻**: 获取 The Verge 的最新文章
- 🔍 **搜索文章**: 按关键词查找特定新闻
- 🚀 **简单设置**: 安装和配置简单
- ⚡ **轻量级**: 单文件实现，无复杂依赖

## 📦 安装

```bash
npm install verge-news-mcp
```

## 🔧 配置

### Claude Desktop

将以下内容添加到你的 Claude Desktop MCP 配置中：

```json
{
  "mcpServers": {
    "verge-news": {
      "command": "npx",
      "args": ["verge-news-mcp"]
    }
  }
}
```

### 其他 MCP 客户端

用于开发或其他 MCP 客户端：

```json
{
  "mcpServers": {
    "verge-news": {
      "command": "node",
      "args": ["path/to/verge-news-mcp/build/index.js"]
    }
  }
}
```

## 🛠️ 可用工具

### `get-daily-news`
获取 The Verge 在过去 24 小时内发布的最新新闻文章。

**使用示例：**
```
"今天 The Verge 有什么科技新闻？"
```

### `search-news`
在指定时间段内按关键词搜索新闻文章。

**参数：**
- `keyword`: 搜索词
- `days`: 回溯天数（可选，默认: 7）

**使用示例：**
```
"查找 The Verge 过去一周关于 AI 的文章"
```

## 🏗️ 开发

### 本地设置

```bash
# 克隆仓库
git clone https://github.com/SzeMeng76/verge-news-mcp.git
cd verge-news-mcp

# 安装依赖
npm install

# 构建项目
npm run build

# 测试服务器
npm start
```

### 项目结构

```
verge-news-mcp/
├── src/
│   └── index.ts          # 主 MCP 服务器实现
├── package.json          # 项目依赖和脚本
├── tsconfig.json         # TypeScript 配置
└── README.md            # 本文件
```

### 依赖

项目使用这些主要依赖：
- `@modelcontextprotocol/sdk` - MCP 服务器框架
- `rss-parser` - 用于解析 The Verge 的 RSS 源
- `zod` - 输入验证

## 🤝 贡献

1. Fork 仓库
2. 创建功能分支：`git checkout -b feature-name`
3. 进行更改
4. 提交：`git commit -am 'Add feature'`
5. 推送：`git push origin feature-name`
6. 创建 Pull Request

## 📄 许可证

MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## ⚠️ 免责声明

这是一个非官方工具。所有新闻内容归 Vox Media Inc.（The Verge）所有。本服务器只是以 MCP 兼容格式提供对其公共 RSS 源的访问。
