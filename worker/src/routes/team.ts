import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取团队成员列表
app.get('/members', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    return c.json(members);
  } catch (error: any) {
    console.error('Get team members error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个团队成员
app.get('/members/:id', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const member = await prisma.teamMember.findUnique({ where: { id } });
    
    if (!member) {
      return c.json({ error: 'Team member not found' }, 404);
    }
    
    return c.json(member);
  } catch (error: any) {
    console.error('Get team member error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建团队成员
app.post('/members', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const member = await prisma.teamMember.create({
      data: {
        name: data.name,
        nameEn: data.nameEn,
        title: data.title,
        titleEn: data.titleEn,
        imageUrl: data.imageUrl,
        education: data.education,
        educationEn: data.educationEn,
        experience: data.experience,
        experienceEn: data.experienceEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        sortOrder: data.sortOrder || 0,
        isActive: true,
      },
    });
    
    return c.json(member, 201);
  } catch (error: any) {
    console.error('Create team member error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新团队成员
app.put('/members/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: data.name,
        nameEn: data.nameEn,
        title: data.title,
        titleEn: data.titleEn,
        imageUrl: data.imageUrl,
        education: data.education,
        educationEn: data.educationEn,
        experience: data.experience,
        experienceEn: data.experienceEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        sortOrder: data.sortOrder,
        isActive: data.isActive,
      },
    });
    
    return c.json(member);
  } catch (error: any) {
    console.error('Update team member error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除团队成员
app.delete('/members/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.teamMember.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete team member error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
