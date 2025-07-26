# 📰 Verge News MCP Server

**[中文版](./README_ZH.md)** | **English**

> A streamlined MCP server for accessing The Verge tech news through RSS feeds

## 🎯 Overview

A Model Context Protocol (MCP) server that provides easy access to The Verge's latest technology news. Built with TypeScript and RSS parsing capabilities, this server delivers clean, formatted news content directly to your AI assistant or MCP-compatible application.

## ✨ Features

- 📈 **Daily News**: Get today's latest tech news from The Verge
- 🔍 **News Search**: Search articles by keywords with customizable time ranges
- ⏱️ **Time Filtering**: Filter news by days back (1-30 days)
- 📊 **Smart Formatting**: Clean, readable news summaries with key information
- 🚀 **Fast Performance**: Efficient RSS parsing with minimal overhead
- 🔧 **TypeScript**: Full type safety and reliable error handling
- 📡 **Real-time**: Fresh content directly from The Verge's RSS feed

## 📦 Installation

```bash
npm install verge-news-mcp
```

Or use directly with npx:

```bash
npx verge-news-mcp
```

## 🔧 Configuration

### Claude Desktop

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

### Cursor IDE

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

### VS Code with GitHub Copilot

```json
{
  "mcp.servers": {
    "verge-news": {
      "command": "npx",
      "args": ["verge-news-mcp"],
      "transport": "stdio"
    }
  }
}
```

### Local Development

```json
{
  "mcpServers": {
    "verge-news": {
      "command": "node",
      "args": ["path/to/verge-news-mcp/dist/index.js"]
    }
  }
}
```

## 🛠️ Available Tools

### `get-daily-news`
Get the latest news from The Verge published today.

**Parameters:**
- None required

**Example Usage:**
```
"What's the latest tech news from The Verge today?"
"Show me today's headlines from The Verge"
"Get the current tech news"
```

**Returns:**
- Article titles and publication dates
- Direct links to full articles
- Content summaries (150 characters)
- Formatted in an easy-to-read layout

**Example Response:**
```
# The Verge - Today's News

1. Apple announces new MacBook Pro with M4 chip
   Published: Wed, 26 Jul 2025 14:30:00 GMT
   Link: https://www.theverge.com/...
   Summary: Apple's latest MacBook Pro features the new M4 processor with enhanced performance and battery life...

---

2. Google's AI updates reshape search experience
   Published: Wed, 26 Jul 2025 12:15:00 GMT
   Link: https://www.theverge.com/...
   Summary: Google introduces new AI-powered search features that provide more contextual and accurate results...
```

### `search-news`
Search for news articles from The Verge by keyword within a specified time range.

**Parameters:**
- `keyword` (required): Search term to find in article titles and content
- `days` (optional): Number of days to look back (default: 7, range: 1-30)

**Example Usage:**
```
"Search for articles about 'artificial intelligence' from the past 5 days"
"Find news about 'iPhone' from The Verge this week"
"Look for 'Tesla' articles from the past month"
```

**Returns:**
- Filtered articles matching the keyword
- Articles from the specified time range
- Same detailed format as daily news
- Relevance-based content matching

**Example Response:**
```
# The Verge - Search Results for "artificial intelligence"

1. OpenAI releases new GPT model with improved reasoning
   Published: Tue, 25 Jul 2025 16:45:00 GMT
   Link: https://www.theverge.com/...
   Summary: The latest iteration of GPT shows significant improvements in logical reasoning and code generation...

---

2. Microsoft integrates AI across Office suite
   Published: Mon, 24 Jul 2025 10:20:00 GMT
   Link: https://www.theverge.com/...
   Summary: Microsoft announces comprehensive AI integration across Word, Excel, and PowerPoint applications...
```

## 🎮 Usage Examples

### Daily Tech Updates
```
"Give me today's tech news summary from The Verge"
"What are the top stories in tech today?"
```

### Topic Research
```
"Find articles about 'quantum computing' from the past 2 weeks"
"Search for news about 'electric vehicles' from the last month"
```

### Product Launches
```
"Look for recent news about 'Samsung Galaxy' announcements"
"Find articles about 'Meta' or 'VR' from the past 10 days"
```

### Industry Trends
```
"Search for 'cryptocurrency' news from The Verge this week"
"Find recent articles about 'sustainable technology'"
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

# Start the server
npm start
```

### Project Structure

```
verge-news-mcp/
├── src/
│   └── index.ts          # Main MCP server implementation
├── dist/                 # Compiled JavaScript files
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md            # Documentation
```

### Core Dependencies

- **@modelcontextprotocol/sdk**: Official MCP server framework
- **rss-parser**: Reliable RSS feed parsing library
- **zod**: Runtime type validation and schema definition

## 🔧 Technical Details

### RSS Feed Processing
- Connects to The Verge's official RSS feed: `https://www.theverge.com/rss/index.xml`
- Real-time parsing with efficient caching
- Automatic content cleaning and formatting
- Robust error handling for network issues

### Content Filtering
- **Time-based filtering**: Articles filtered by publication date
- **Keyword searching**: Case-insensitive search across titles and content
- **Content truncation**: Summaries limited to 150 characters for readability
- **Duplicate handling**: Efficient processing of RSS feed items

### Error Management
- Comprehensive error logging for debugging
- Graceful degradation when RSS feeds are unavailable
- User-friendly error messages
- Process-level error handling for stability

### Data Structure
```typescript
interface NewsItem {
  title: string;        // Article headline
  link: string;         // Direct URL to full article
  pubDate: string;      // Publication timestamp
  creator: string;      // Article author
  content: string;      // Article summary/snippet
}
```

## ⚠️ Important Notes

### Content Limitations
- Provides article summaries, not full content
- Summaries are limited to 150 characters
- Full articles require visiting The Verge website
- Content is subject to The Verge's RSS feed updates

### Rate Considerations
- RSS feeds are cached and updated periodically by The Verge
- No additional rate limiting required on client side
- Respects The Verge's server resources
- Efficient parsing minimizes processing time

### Content Accuracy
- Content comes directly from The Verge's official RSS feed
- Publication dates and authors are as provided by The Verge
- Links direct to official Verge articles
- No content modification or editorial changes

## 🚀 Common Use Cases

### News Monitoring
- **Daily Briefings**: Get morning tech news summaries
- **Topic Tracking**: Monitor specific technology trends
- **Industry Updates**: Stay current with tech industry developments

### Research and Analysis
- **Market Research**: Track product announcements and reviews
- **Competitive Intelligence**: Monitor competitor coverage
- **Trend Analysis**: Identify emerging technology patterns

### Content Curation
- **Newsletter Content**: Source material for tech newsletters
- **Social Media**: Find interesting tech stories to share
- **Blog Research**: Gather information for tech writing

### Personal Productivity
- **Information Diet**: Curated tech news without noise
- **Learning**: Stay informed about technology developments
- **Decision Making**: Access current information for tech decisions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes with proper TypeScript types
4. Test with various keywords and time ranges
5. Ensure error handling works correctly
6. Submit a pull request with clear description

### Development Guidelines

- Maintain TypeScript strict mode compliance
- Add comprehensive error handling for new features
- Test with both common and niche search terms
- Respect The Verge's RSS feed structure
- Document any new parameters or return formats

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## ⚖️ Legal and Ethics

- **Content Source**: All content is sourced from The Verge's public RSS feed
- **Attribution**: Proper attribution to The Verge and article authors
- **Usage Rights**: Respects The Verge's content usage policies
- **No Modification**: Content summaries are truncated but not altered
- **Direct Linking**: All links direct users to original Verge articles

## 🙏 Acknowledgments

- **The Verge**: For providing excellent technology journalism and RSS feeds
- **Vox Media**: Parent company supporting The Verge's operations
- **RSS Parser maintainers**: For reliable RSS parsing functionality
- **MCP Community**: For the standardized protocol
- **Contributors**: Everyone who helps improve this project

---

*Built for staying current with technology news and trends* 📰⚡
