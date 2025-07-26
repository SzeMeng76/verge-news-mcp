# 📰 Verge News MCP Server

**[中文版](./README_ZH.md)** | **English**

> A simple and effective MCP server for accessing The Verge news RSS feed

## 🎯 What is this?

This is a lightweight Model Context Protocol (MCP) server that allows AI assistants to fetch and search news articles from The Verge's RSS feed. Perfect for staying up-to-date with tech news directly through your AI tools.

## ✨ Features

- 📡 **Fetch Daily News**: Get the latest articles from The Verge
- 🔍 **Search Articles**: Find specific news by keywords
- 🚀 **Easy Setup**: Simple installation and configuration
- ⚡ **Lightweight**: Single-file implementation, no complex dependencies

## 📦 Installation

```bash
npm install verge-news-mcp
```

## 🔧 Configuration

### Claude Desktop

Add this to your Claude Desktop MCP configuration:

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

### Other MCP Clients

For development or other MCP clients:

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

## 🛠️ Available Tools

### `get-daily-news`
Get the latest news articles from The Verge published in the last 24 hours.

**Example usage:**
```
"What's in the tech news today from The Verge?"
```

### `search-news`
Search for news articles by keywords within a specified time period.

**Parameters:**
- `keyword`: Search term
- `days`: Number of days to look back (optional, default: 7)

**Example usage:**
```
"Find articles about AI from The Verge in the past week"
```

## 🏗️ Development

### Local Setup

```bash
# Clone the repository
git clone https://github.com/SzeMeng76/verge-news-mcp.git
cd verge-news-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Test the server
npm start
```

### Project Structure

```
verge-news-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── package.json          # Project dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # This file
```

### Dependencies

The project uses these main dependencies:
- `@modelcontextprotocol/sdk` - MCP server framework
- `rss-parser` - For parsing The Verge's RSS feed
- `zod` - Input validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit: `git commit -am 'Add feature'`
5. Push: `git push origin feature-name`
6. Create a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This is an unofficial tool. All news content belongs to Vox Media Inc. (The Verge). This server simply provides access to their public RSS feed in an MCP-compatible format.
