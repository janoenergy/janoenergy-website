import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 获取公司简介
app.get('/info', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    let info = await prisma.companyInfo.findFirst();
    
    if (!info) {
      info = await prisma.companyInfo.create({
        data: {
          intro: '江能新能源集团有限公司成立于2018年，总部位于中国·天津。公司专注于新能源领域的开发、投资、建设和运营，致力于成为行业领先的全产业链服务商。',
          introEn: 'JanoEnergy New Energy Group Co., Ltd. was founded in 2018, headquartered in Tianjin, China. The company focuses on the development, investment, construction, and operation of new energy, committed to becoming an industry-leading full-chain service provider.',
        }
      });
    }
    
    return c.json(info);
  } catch (error: any) {
    console.error('Get company info error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新公司简介
app.put('/info', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    let info = await prisma.companyInfo.findFirst();
    
    if (info) {
      info = await prisma.companyInfo.update({
        where: { id: info.id },
        data: {
          intro: data.intro,
          introEn: data.introEn,
          updatedAt: new Date(),
        },
      });
    } else {
      info = await prisma.companyInfo.create({
        data: {
          intro: data.intro,
          introEn: data.introEn,
        },
      });
    }
    
    return c.json(info);
  } catch (error: any) {
    console.error('Update company info error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取发展历程
app.get('/milestones', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const milestones = await prisma.milestone.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return c.json(milestones);
  } catch (error: any) {
    console.error('Get milestones error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建发展历程
app.post('/milestones', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const milestone = await prisma.milestone.create({
      data: {
        year: data.year,
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        sortOrder: data.sortOrder || 0,
      },
    });
    
    return c.json(milestone, 201);
  } catch (error: any) {
    console.error('Create milestone error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新发展历程
app.put('/milestones/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const milestone = await prisma.milestone.update({
      where: { id },
      data: {
        year: data.year,
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        sortOrder: data.sortOrder,
      },
    });
    
    return c.json(milestone);
  } catch (error: any) {
    console.error('Update milestone error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除发展历程
app.delete('/milestones/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.milestone.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete milestone error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取价值观
app.get('/values', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const values = await prisma.companyValue.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return c.json(values);
  } catch (error: any) {
    console.error('Get values error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建价值观
app.post('/values', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const value = await prisma.companyValue.create({
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        icon: data.icon,
        sortOrder: data.sortOrder || 0,
      },
    });
    
    return c.json(value, 201);
  } catch (error: any) {
    console.error('Create value error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新价值观
app.put('/values/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const data = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const value = await prisma.companyValue.update({
      where: { id },
      data: {
        title: data.title,
        titleEn: data.titleEn,
        description: data.description,
        descriptionEn: data.descriptionEn,
        icon: data.icon,
        sortOrder: data.sortOrder,
      },
    });
    
    return c.json(value);
  } catch (error: any) {
    console.error('Update value error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 删除价值观
app.delete('/values/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.companyValue.delete({ where: { id } });
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete value error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

export default app;
