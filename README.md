```markdown
# Verge News MCP

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A Model Context Protocol (MCP) server for retrieving and searching news articles from The Verge.

## Features

- **Daily News**: Fetch the latest news from The Verge for the current day
- **News Search**: Search for articles by keyword across a customizable time period
- **Fast & Lightweight**: Minimal dependencies with efficient news retrieval
- **TypeScript Support**: Fully typed for better developer experience

## Installation

### Global Installation

```bash
npm install -g verge-news-mcp
```

### Using with npx (no installation required)

```bash
npx verge-news-mcp
```

## Usage

### Standalone

Run the MCP server directly to test it:

```bash
verge-news-mcp
```

### Integration with MCP Clients

This package implements an MCP server that can be used with any MCP client. Here's an example of how to integrate it with a client using the `ai` package:

```javascript
import { experimental_createMCPClient as createMCPClient } from 'ai';
import { Experimental_StdioMCPTransport as MCPStdioTransport } from 'ai/mcp-stdio';

// Configure the MCP client to use verge-news-mcp
const mcpTransport = new MCPStdioTransport({
  command: 'npx',
  args: ['verge-news-mcp'],
  env: process.env,
  cwd: process.cwd()
});

// Create the MCP client
const mcpClient = await createMCPClient({
  name: 'verge-news',
  transport: mcpTransport
});

// Get available tools
const tools = await mcpClient.tools();

// Use the tools
const dailyNews = await tools['get-daily-news'].call({});
console.log(dailyNews.content[0].text);

const searchResults = await tools['search-news'].call({ keyword: 'AI', days: 7 });
console.log(searchResults.content[0].text);
```

## Available Tools

### 1. get-daily-news

Get the latest news from The Verge for today.

**Parameters**: None

**Returns**: A formatted text list of today's news articles.

### 2. search-news

Search for news articles from The Verge by keyword.

**Parameters**:
- `keyword` (string): Keyword to search for in news articles
- `days` (number, optional): Number of days to look back (default: 7)

**Returns**: A formatted text list of matching news articles.

## Example Output

```
# The Verge - Today's News

1. The latest iPhone update finally lets you set Google Maps as default
   Published: Tue, 14 May 2025 16:30:00 GMT
   Link: https://www.theverge.com/example-link
   Summary: Apple has finally allowed iOS users to set Google Maps as their default navigation app in the latest update...

---

2. Tesla announces new home battery system with double the capacity
   Published: Tue, 14 May 2025 14:15:00 GMT
   Link: https://www.theverge.com/another-example
   Summary: Tesla's new home battery system offers twice the storage capacity of previous models at a lower price point...
```

## Development

### Prerequisites

- Node.js 16.x or higher
- TypeScript 4.9.x or higher

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/verge-news-mcp.git
   cd verge-news-mcp
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Build the project
   ```bash
   npm run build
   ```

4. Run locally
   ```bash
   npm start
   ```

### Testing

```bash
npm test
```

## License

MIT

## Acknowledgements

- [The Verge](https://www.theverge.com/) for providing the RSS feed
- [Model Context Protocol](https://modelcontextprotocol.github.io/) for the MCP specification
```
