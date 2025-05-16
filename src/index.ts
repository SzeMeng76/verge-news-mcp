import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Parser from "rss-parser";

// 初始化RSS解析器
const parser = new Parser();
const VERGE_RSS_URL = "https://www.theverge.com/rss/index.xml";

// 创建MCP服务器，简化配置与第一个例子类似
const server = new McpServer({
  name: "verge-news",
  version: "1.0.0"
});

// 定义接口
interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
}

// 辅助函数：获取并解析RSS订阅
async function fetchVergeNews() {
  try {
    const feed = await parser.parseURL(VERGE_RSS_URL);
    return feed.items;
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    return null;
  }
}

// 辅助函数：按日期筛选新闻
function filterNewsByDate(items, daysBack) {
  const now = new Date();
  const cutoffDate = new Date(now.setDate(now.getDate() - daysBack));
  
  return items.filter((item) => {
    if (!item.pubDate) return false;
    const pubDate = new Date(item.pubDate);
    return pubDate >= cutoffDate;
  });
}

// 辅助函数：按关键词筛选新闻
function filterNewsByKeyword(items, keyword) {
  const lowerKeyword = keyword.toLowerCase();
  
  return items.filter((item) => {
    const title = (item.title || "").toLowerCase();
    const content = (item.contentSnippet || item.content || "").toLowerCase();
    
    return title.includes(lowerKeyword) || content.includes(lowerKeyword);
  });
}

// 辅助函数：格式化新闻项
function formatNewsItems(items) {
  return items.map((item) => {
    return {
      title: item.title || "No title",
      link: item.link || "#",
      pubDate: item.pubDate || "Unknown date",
      creator: item.creator || "Unknown author",
      content: item.contentSnippet || item.content || "No content available",
    };
  });
}

// 辅助函数：将新闻格式化为简要摘要
function formatNewsAsBriefSummary(items, limit = 10) {
  if (!items || items.length === 0) {
    return "No news articles found for the specified time period.";
  }
  
  // 限制项目数量
  const limitedItems = items.slice(0, limit);
  
  return limitedItems.map((item, index) => {
    // 提取简短摘要(前150个字符)
    const summary = item.content.substring(0, 150).trim() + (item.content.length > 150 ? "..." : "");
    
    return `
${index + 1}. ${item.title}
   Link: ${item.link}
   Summary: ${summary}
   `;
  }).join("\n---\n");
}

// 注册工具：获取每日新闻
server.tool(
  "get-daily-news",
  "Get the latest news from The Verge for today",
  {},
  async () => {
    const allNews = await fetchVergeNews();
    if (!allNews) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve news data"
          }
        ]
      };
    }
    
    const todayNews = filterNewsByDate(allNews, 1); // 过去24小时
    const formattedNews = formatNewsItems(todayNews);
    const newsText = formatNewsAsBriefSummary(formattedNews, 10);
    
    return {
      content: [
        {
          type: "text",
          text: `# The Verge - Today's News\n\n${newsText}`
        }
      ]
    };
  }
);

// 注册工具：搜索新闻
server.tool(
  "search-news",
  "Search for news articles from The Verge by keyword",
  {
    keyword: z.string(),
    days: z.number().optional().default(30)
  },
  async ({ keyword, days = 30 }) => {
    const allNews = await fetchVergeNews();
    if (!allNews) {
      return {
        content: [
          {
            type: "text",
            text: "Failed to retrieve news data"
          }
        ]
      };
    }
    
    const filteredByDate = filterNewsByDate(allNews, days);
    const filteredByKeyword = filterNewsByKeyword(filteredByDate, keyword);
    const formattedNews = formatNewsItems(filteredByKeyword);
    const newsText = formatNewsAsBriefSummary(formattedNews, 10);
    
    return {
      content: [
        {
          type: "text",
          text: `# The Verge - Search Results for "${keyword}"\n\n${newsText}`
        }
      ]
    };
  }
);

// 主函数：启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log('Verge News MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
