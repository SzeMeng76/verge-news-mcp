```markdown
# verge-news-mcp-server

**Important Note: This is an unofficial MCP server.**

A Model Context Protocol (MCP) server for accessing The Verge news data. This server provides a simple interface to retrieve and search news articles from The Verge through their RSS feed.

## Features

- Get daily news from The Verge with brief summaries
- Search for news articles by keywords across customizable time periods
- Format news results in an easy-to-read format
- Easy to use with any MCP client
- Built with TypeScript for type safety and better developer experience

## Usage

Example MCP Client Configuration:

```json
{
  "mcpServers": {
    "verge-news": {
      "command": "npx",
      "args": [
        "verge-news-mcp"
      ]
    }
  }
}
```

### get-daily-news

Retrieves the latest news articles from The Verge published in the last 24 hours.

Parameters:
- None required

Example MCP request:
```markdown
> (Request)
Please use the `get-daily-news` tool to fetch today's headlines from The Verge.

> (Response Example)
I'll fetch today's news from The Verge for you:

# The Verge - Today's News

1. Apple's iOS 18 brings more customization to your home screen
   Published: Tue, 14 May 2025 08:30:15 GMT
   Link: https://www.theverge.com/example-link-1
   Summary: Apple's iOS 18 update will finally give users more freedom to arrange their home screen icons and widgets, according to sources familiar with the changes...

---

2. Tesla unveils new entry-level EV starting at $25,000
   Published: Tue, 14 May 2025 09:15:42 GMT
   Link: https://www.theverge.com/example-link-2
   Summary: Elon Musk revealed Tesla's long-awaited affordable electric vehicle at a special event on Tuesday. The compact car boasts a range of 300 miles and...

---

3. Google's AI search features are rolling out globally
   Published: Tue, 14 May 2025 07:45:30 GMT
   Link: https://www.theverge.com/example-link-3
   Summary: After testing in select markets, Google's AI-powered search experience is now available to users worldwide. The new interface provides direct answers...
```

### search-news

Searches for news articles from The Verge by keyword within a specified time period.

Parameters:
- `keyword` (required): Keyword to search for in news articles
- `days` (optional): Number of days to look back (default: 7)

Example MCP request:
```markdown
> (Request)
Use the `search-news` tool to find recent articles about "cryptocurrency" from the past 14 days.

> (Response Example)
I'll search for recent articles about cryptocurrency:

# The Verge - Search Results for "cryptocurrency"

1. SEC approves new crypto ETFs amid regulatory shifts
   Link: https://www.theverge.com/example-crypto-1
   Summary: The Securities and Exchange Commission has approved a new batch of cryptocurrency exchange-traded funds, signaling a potential warming of regulatory...

---

2. Major banks launch blockchain-based payment system
   Link: https://www.theverge.com/example-crypto-2
   Summary: A consortium of international banks announced the launch of a new payment system built on blockchain technology, aimed at reducing transaction fees and...

---

3. Bitcoin mining's environmental impact reduced by 30%, study finds
   Link: https://www.theverge.com/example-crypto-3
   Summary: A new research paper shows that cryptocurrency mining operations have significantly reduced their carbon footprint over the past year, thanks to...
```

## Development

To set up the development environment:

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Build the project:
```bash
npm run build
```
4. Start the server:
```bash
npm start
```

## Technical Details

The server uses the following main dependencies:
- `@modelcontextprotocol/sdk`: Core MCP server implementation
- `rss-parser`: For fetching and parsing The Verge's RSS feed
- `zod`: For runtime type validation of parameters

The server connects via stdio by default, making it compatible with most MCP client implementations.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
```
