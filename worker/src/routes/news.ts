import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取新闻列表
app.get('/', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const news = await prisma.news.findMany({
      orderBy: { publishDate: 'desc' },
    });
    return c.json(news);
  } catch (error: any) {
    console.error('Get news error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个新闻
app.get('/:id', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const news = await prisma.news.findUnique({ where: { id } });
    
    if (!news) {
      return c.json({ error: 'News not found' }, 404);
    }
    
    return c.json(news);
  } catch (error: any) {
    console.error('Get news error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建新闻
app.post('/', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const news = await prisma.news.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        content: data.content,
        contentEn: data.contentEn,
        summary: data.summary,
        summaryEn: data.summaryEn,
        category: data.category,
        imageUrl: data.imageUrl,
        publishDate: data.publishDate || new Date(),
        isPublished: data.isPublished ?? true,
      },
    });
    
    return c.json(news, 201);
  } catch (error: any) {
    console.error('Create news error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新新闻
app.put('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const news = await prisma.news.update({
      where: { id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        content: data.content,
        contentEn: data.contentEn,
        summary: data.summary,
        summaryEn: data.summaryEn,
        category: data.category,
        imageUrl: data.imageUrl,
        publishDate: data.publishDate,
        isPublished: data.isPublished,
        updatedAt: new Date(),
      },
    });
    
    return c.json(news);
  } catch (error: any) {
    console.error('Update news error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除新闻
app.delete('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.news.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete news error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
