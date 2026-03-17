import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取证书列表
app.get('/', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const certificates = await prisma.certificate.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return c.json(certificates);
  } catch (error: any) {
    console.error('Get certificates error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个证书
app.get('/:id', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const certificate = await prisma.certificate.findUnique({ where: { id } });
    
    if (!certificate) {
      return c.json({ error: 'Certificate not found' }, 404);
    }
    
    return c.json(certificate);
  } catch (error: any) {
    console.error('Get certificate error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建证书
app.post('/', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const certificate = await prisma.certificate.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        issuer: data.issuer,
        issuerEn: data.issuerEn,
        issueDate: data.issueDate,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder || 0,
        isActive: true,
      },
    });
    
    return c.json(certificate, 201);
  } catch (error: any) {
    console.error('Create certificate error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新证书
app.put('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        issuer: data.issuer,
        issuerEn: data.issuerEn,
        issueDate: data.issueDate,
        imageUrl: data.imageUrl,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
    
    return c.json(certificate);
  } catch (error: any) {
    console.error('Update certificate error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除证书
app.delete('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.certificate.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete certificate error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
