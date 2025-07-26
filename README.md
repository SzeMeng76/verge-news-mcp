# 🗞️ Verge News MCP Server

**[🌏 中文文档](./README_ZH.md)** | **[📖 English Documentation](./README.md)**

> An intelligent Model Context Protocol server that transforms The Verge's RSS feed into a powerful AI-accessible news source

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-Compatible-green?style=flat-square)](https://modelcontextprotocol.io/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](./LICENSE)

## 🚀 Overview

The Verge News MCP Server bridges the gap between AI assistants and real-time tech journalism. Built specifically for The Verge's editorial content, this server provides intelligent access to breaking tech news, product reviews, and industry analysis through a clean MCP interface.

### Why This Matters

In the fast-moving world of technology, staying informed shouldn't require constant context switching. This MCP server brings The Verge's authoritative tech journalism directly into your AI workflow, enabling seamless news consumption and research within your existing tools.

## ✨ Core Features

### 🎯 Intelligent News Retrieval
- **Smart Filtering**: Automatically categorizes content by topic (AI, hardware, software, gaming, etc.)
- **Temporal Intelligence**: Fetch news by time windows with smart defaults
- **Content Enrichment**: Enhanced metadata extraction beyond basic RSS

### 🔍 Advanced Search Capabilities
- **Semantic Search**: Find articles by meaning, not just keywords
- **Multi-dimensional Filtering**: Combine topic, author, and date filters
- **Relevance Scoring**: Results ranked by content significance

### 🛠️ Developer-First Design
- **Type-Safe Interface**: Full TypeScript support with comprehensive type definitions
- **Extensible Architecture**: Plugin-ready design for custom content processors
- **Performance Optimized**: Intelligent caching and efficient RSS parsing

## 📦 Installation & Setup

### Quick Start with npm

```bash
# Install globally for system-wide access
npm install -g verge-news-mcp

# Or install locally for project-specific use
npm install verge-news-mcp
```

### MCP Client Integration

#### Claude Desktop Configuration
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

#### VS Code with GitHub Copilot
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

## 🔧 Available Tools

### `fetch-latest-news`
Retrieves the most recent articles from The Verge with intelligent content summarization.

**Parameters:**
- `limit` (optional): Number of articles to fetch (default: 10, max: 50)
- `category` (optional): Filter by content category (`tech`, `reviews`, `gaming`, `ai`, `mobile`)
- `hours` (optional): Fetch articles from last N hours (default: 24)

**Example Usage:**
```typescript
// Natural language prompt
"Get me the latest 5 AI-related articles from The Verge"

// Results in tool call:
{
  "tool": "fetch-latest-news",
  "arguments": {
    "limit": 5,
    "category": "ai",
    "hours": 24
  }
}
```

### `search-news-archive`
Performs intelligent search across The Verge's content with advanced filtering options.

**Parameters:**
- `query` (required): Search terms or phrases
- `maxResults` (optional): Maximum articles to return (default: 15)
- `dateRange` (optional): Time range object with `from` and `to` dates
- `sortBy` (optional): Sort criteria (`relevance`, `date`, `engagement`)

**Example Usage:**
```typescript
// Natural language prompt
"Find articles about iPhone reviews published in the last month"

// Results in tool call:
{
  "tool": "search-news-archive",
  "arguments": {
    "query": "iPhone review",
    "maxResults": 10,
    "dateRange": {
      "from": "2025-06-26T00:00:00Z",
      "to": "2025-07-26T23:59:59Z"
    },
    "sortBy": "relevance"
  }
}
```

### `get-trending-topics`
Analyzes current content to identify trending technology topics and themes.

**Parameters:**
- `timeWindow` (optional): Analysis window (`day`, `week`, `month`, default: `day`)
- `topicCount` (optional): Number of topics to return (default: 10)

## 🏗️ Development

### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/SzeMeng76/verge-news-mcp.git
cd verge-news-mcp

# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint and format
npm run lint
npm run format
```

### Project Structure

```
verge-news-mcp/
├── src/
│   ├── index.ts          # MCP server entry point
│   ├── tools/            # Tool implementations
│   │   ├── latest-news.ts
│   │   ├── search-archive.ts
│   │   └── trending-topics.ts
│   ├── services/         # Core business logic
│   │   ├── rss-parser.ts
│   │   ├── content-analyzer.ts
│   │   └── cache-manager.ts
│   ├── types/            # TypeScript definitions
│   │   ├── verge-types.ts
│   │   └── mcp-types.ts
│   └── utils/            # Utility functions
├── tests/                # Test suites
├── docs/                 # Documentation
└── examples/             # Usage examples
```

### Technology Stack

- **Core Framework**: [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk) - Official MCP TypeScript SDK
- **RSS Processing**: [rss-parser](https://github.com/rbren/rss-parser) - Robust RSS feed parsing
- **Content Analysis**: [natural](https://github.com/NaturalNode/natural) - Natural language processing
- **Caching**: [node-cache](https://github.com/node-cache/node-cache) - In-memory caching for performance
- **Validation**: [zod](https://github.com/colinhacks/zod) - Runtime type validation
- **HTTP Client**: [axios](https://github.com/axios/axios) - HTTP requests with retry logic

## 🌍 Environment Configuration

### Environment Variables

```bash
# Optional: Custom RSS feed URL (defaults to The Verge)
VERGE_RSS_URL=https://www.theverge.com/rss/index.xml

# Cache configuration
VERGE_CACHE_TTL=300  # Cache time-to-live in seconds
VERGE_MAX_ARTICLES=100  # Maximum articles to cache

# Rate limiting
VERGE_RATE_LIMIT=60  # Requests per minute

# Content filtering
VERGE_CONTENT_MIN_LENGTH=200  # Minimum article length
VERGE_ENABLE_CONTENT_ANALYSIS=true
```

### Production Considerations

- **Rate Limiting**: Implement respectful RSS polling intervals
- **Caching Strategy**: Use persistent cache for production deployments
- **Error Handling**: Comprehensive error logging and recovery
- **Monitoring**: Built-in health checks and performance metrics

## 🤝 Contributing

We welcome contributions! Here's how to get involved:

1. **Fork & Clone**: Fork the repository and clone your fork
2. **Feature Branch**: Create a feature branch (`git checkout -b feature/amazing-feature`)
3. **Code**: Make your changes with tests
4. **Test**: Run the test suite (`npm test`)
5. **Submit**: Create a Pull Request with a clear description

### Contribution Guidelines

- Follow the existing code style (ESLint + Prettier configured)
- Write tests for new features
- Update documentation for any API changes
- Ensure TypeScript strict mode compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚖️ Legal & Ethics

- **Fair Use**: This server implements RSS feeds in accordance with fair use principles
- **Rate Limiting**: Respectful polling intervals to avoid server strain
- **Attribution**: All content remains property of Vox Media Inc.
- **Non-Commercial**: Designed for research and development purposes

## 🙏 Acknowledgments

- **The Verge Team**: For consistently excellent tech journalism
- **Anthropic**: For the Model Context Protocol specification
- **Open Source Community**: For the tools and libraries that make this possible

---

*Built with ❤️ for the AI and journalism communities*
