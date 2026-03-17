import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取荣誉列表
app.get('/', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const honors = await prisma.honor.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return c.json(honors);
  } catch (error: any) {
    console.error('Get honors error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个荣誉
app.get('/:id', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const honor = await prisma.honor.findUnique({ where: { id } });
    
    if (!honor) {
      return c.json({ error: 'Honor not found' }, 404);
    }
    
    return c.json(honor);
  } catch (error: any) {
    console.error('Get honor error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建荣誉
app.post('/', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const honor = await prisma.honor.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        issuer: data.issuer,
        issuerEn: data.issuerEn,
        year: data.year,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder || 0,
      },
    });
    
    return c.json(honor, 201);
  } catch (error: any) {
    console.error('Create honor error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新荣誉
app.put('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const honor = await prisma.honor.update({
      where: { id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        issuer: data.issuer,
        issuerEn: data.issuerEn,
        year: data.year,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
      },
    });
    
    return c.json(honor);
  } catch (error: any) {
    console.error('Update honor error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除荣誉
app.delete('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.honor.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete honor error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
