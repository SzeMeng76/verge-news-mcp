#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import Parser from "rss-parser";

// 定义接口
interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
}

// 初始化RSS解析器
const parser = new Parser();
const VERGE_RSS_URL = "https://www.theverge.com/rss/index.xml";

// 调试日志函数
function log(message: string): void {
  console.error(`[VERGE-NEWS-MCP] ${message}`);
}

// 创建MCP服务器
const server = new McpServer({
  name: "verge-news",
  version: "1.0.0"
});

// 获取新闻函数
async function getNews(daysBack: number = 7, keyword: string | null = null): Promise<NewsItem[]> {
  try {
    // 获取RSS feed
    const feed = await parser.parseURL(VERGE_RSS_URL);
    if (!feed || !feed.items || feed.items.length === 0) {
      return [];
    }
    
    // 按日期过滤
    const now = new Date();
    const cutoffDate = new Date(now.setDate(now.getDate() - daysBack));
    
    let filteredItems = feed.items.filter((item: Parser.Item) => {
      if (!item.pubDate) return false;
      return new Date(item.pubDate) >= cutoffDate;
    });
    
    // 按关键词过滤（如果提供）
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filteredItems = filteredItems.filter((item: Parser.Item) => {
        const title = (item.title || "").toLowerCase();
        const content = (item.contentSnippet || item.content || "").toLowerCase();
        return title.includes(lowerKeyword) || content.includes(lowerKeyword);
      });
    }
    
    // 格式化结果
    return filteredItems.map((item: Parser.Item) => ({
      title: item.title || "No title",
      link: item.link || "#",
      pubDate: item.pubDate || "Unknown date",
      creator: item.creator || "Unknown author",
      content: item.contentSnippet || item.content || "No content available",
    }));
  } catch (error) {
    log(`Error fetching news: ${error instanceof Error ? error.message : String(error)}`);
    return [];
  }
}

// 格式化为文本
function formatNewsText(items: NewsItem[], limit: number = 5): string {
  if (items.length === 0) {
    return "No news articles found for the specified criteria.";
  }
  
  const limitedItems = items.slice(0, limit);
  
  return limitedItems.map((item: NewsItem, index: number) => {
    const summary = item.content.substring(0, 150).trim() + 
                    (item.content.length > 150 ? "..." : "");
    
    return `
${index + 1}. ${item.title}
   Published: ${item.pubDate}
   Link: ${item.link}
   Summary: ${summary}
   `;
  }).join("\n---\n");
}

// 注册工具 - 获取每日新闻
server.tool(
  "get-daily-news",
  "Get the latest news from The Verge for today",
  {},
  async () => {
    try {
      const news = await getNews(1); // 最近1天的新闻
      const text = formatNewsText(news);
      
      return {
        content: [
          {
            type: "text",
            text: `# The Verge - Today's News\n\n${text}`
          }
        ]
      };
    } catch (error) {
      log(`Error in get-daily-news: ${error instanceof Error ? error.message : String(error)}`);
      return {
        content: [
          {
            type: "text",
            text: "Error fetching daily news."
          }
        ]
      };
    }
  }
);

// 注册工具 - 搜索新闻
server.tool(
  "search-news",
  "Search for news articles from The Verge by keyword",
  {
    keyword: z.string(),
    days: z.number().optional().default(7)
  },
  async ({ keyword, days = 7 }: { keyword: string; days?: number }) => {
    try {
      const news = await getNews(days, keyword);
      const text = formatNewsText(news);
      
      return {
        content: [
          {
            type: "text",
            text: `# The Verge - Search Results for "${keyword}"\n\n${text}`
          }
        ]
      };
    } catch (error) {
      log(`Error in search-news: ${error instanceof Error ? error.message : String(error)}`);
      return {
        content: [
          {
            type: "text",
            text: "Error searching news."
          }
        ]
      };
    }
  }
);

// 启动服务器
async function main(): Promise<void> {
  try {
    log("Starting Verge News MCP Server...");
    
    // 捕获未处理的错误
    process.on('uncaughtException', (err: Error) => {
      log(`Uncaught exception: ${err.message}`);
    });
    
    process.on('unhandledRejection', (reason: any) => {
      log(`Unhandled rejection: ${String(reason)}`);
    });
    
    // 创建传输
    const transport = new StdioServerTransport();
    
    // 连接
    await server.connect(transport);
    log("Server running on stdio");
    
  } catch (error) {
    log(`Startup error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

main().catch((error: Error) => {
  log(`Fatal error: ${error.message}`);
  process.exit(1);
});
