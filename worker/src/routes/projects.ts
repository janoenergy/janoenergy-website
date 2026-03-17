import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取项目列表
app.get('/', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return c.json(projects);
  } catch (error: any) {
    console.error('Get projects error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个项目
app.get('/:id', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const project = await prisma.project.findUnique({ where: { id } });
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    
    return c.json(project);
  } catch (error: any) {
    console.error('Get project error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建项目
app.post('/', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const project = await prisma.project.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        type: data.type,
        capacity: data.capacity,
        location: data.location,
        status: data.status,
        completionDate: data.completionDate,
        imageUrl: data.imageUrl,
      },
    });
    
    return c.json(project, 201);
  } catch (error: any) {
    console.error('Create project error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新项目
app.put('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        type: data.type,
        capacity: data.capacity,
        location: data.location,
        status: data.status,
        completionDate: data.completionDate,
        imageUrl: data.imageUrl,
        updatedAt: new Date(),
      },
    });
    
    return c.json(project);
  } catch (error: any) {
    console.error('Update project error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除项目
app.delete('/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.project.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
