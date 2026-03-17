import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  // 可选：允许的域名列表，逗号分隔
  ALLOWED_ORIGINS?: string;
}

const app = new Hono<{ Bindings: Env }>();

// ========== 速率限制配置 ==========
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

// 存储请求记录（简单内存存储，生产环境建议用 Redis）
const requestStore = new Map<string, { count: number; resetTime: number }>();

// 清理过期的记录
function cleanupExpiredRecords() {
  const now = Date.now();
  for (const [key, value] of requestStore.entries()) {
    if (now > value.resetTime) {
      requestStore.delete(key);
    }
  }
}

// 每 5 分钟清理一次

function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60 * 1000, maxRequests: 100 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = requestStore.get(identifier);

  if (!record || now > record.resetTime) {
    requestStore.set(identifier, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
    };
  }

  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  record.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

function getClientIP(c: any): string {
  const forwarded = c.req.header('x-forwarded-for');
  const realIP = c.req.header('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// 速率限制中间件
function rateLimitMiddleware(config: RateLimitConfig = { windowMs: 60 * 1000, maxRequests: 100 }) {
  return async (c: any, next: any) => {
    const identifier = getClientIP(c);
    const result = checkRateLimit(identifier, config);
    
    // 添加速率限制响应头
    c.header('X-RateLimit-Limit', config.maxRequests.toString());
    c.header('X-RateLimit-Remaining', result.remaining.toString());
    c.header('X-RateLimit-Reset', result.resetTime.toString());
    
    if (!result.allowed) {
      return c.json({ 
        error: 'Rate limit exceeded',
        message: 'Too many requests, please try again later',
        resetTime: result.resetTime 
      }, 429);
    }
    
    await next();
  };
}

// ========== CORS 配置 ==========
// 根据环境变量动态设置允许的域名
function getCorsConfig(env: Env) {
  const allowedOrigins = env.ALLOWED_ORIGINS 
    ? env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : ['https://www.janoenergy.com', 'https://janoenergy.com'];
  
  return {
    origin: (origin: string) => {
      // 开发环境允许 localhost
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return origin || '*';
      }
      // 检查是否在允许列表中
      if (allowedOrigins.includes(origin)) {
        return origin;
      }
      // 默认拒绝
      return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400,
  };
}

// CORS 中间件
app.use('/*', (c, next) => {
  const corsMiddleware = cors(getCorsConfig(c.env));
  return corsMiddleware(c, next);
});

// 获取 Prisma Client
function getPrisma(env: Env) {
  const client = new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  });
  return client.$extends(withAccelerate());
}

// 验证 JWT 中间件
async function authMiddleware(c: any, next: any) {
  const auth = c.req.header('Authorization');
  if (!auth?.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  const token = auth.slice(7);
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    c.set('user', payload);
    await next();
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
}

// ========== 项目管理 ==========

// 获取项目列表 - 应用速率限制
app.get('/api/projects', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(projects);
  } catch (error: any) {
    console.error('Projects error:', error);
    return c.json({ 
      error: 'Database error', 
      message: error?.message 
    }, 500);
  }
});

// 获取单个项目
app.get('/api/projects/:id', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 100 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const project = await prisma.project.findUnique({
      where: { id },
    });
    
    if (!project) {
      return c.json({ error: 'Project not found' }, 404);
    }
    
    return c.json(project);
  } catch (error: any) {
    console.error('Get project error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建项目 - 需要认证，更严格的速率限制
app.post('/api/projects', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    const project = await prisma.project.create({
      data: {
        title: body.title,
        titleEn: body.titleEn,
        category: body.category,
        location: body.location,
        locationEn: body.locationEn,
        capacity: body.capacity,
        description: body.description,
        descriptionEn: body.descriptionEn,
        status: body.status || 'planning',
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      }
    });
    return c.json(project, 201);
  } catch (error: any) {
    console.error('Create project error:', error);
    return c.json({ error: 'Failed to create project', message: error?.message }, 500);
  }
});

// 更新项目
app.put('/api/projects/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        category: body.category,
        location: body.location,
        locationEn: body.locationEn,
        capacity: body.capacity,
        description: body.description,
        descriptionEn: body.descriptionEn,
        status: body.status,
        startDate: body.startDate ? new Date(body.startDate) : null,
        endDate: body.endDate ? new Date(body.endDate) : null,
      }
    });
    
    return c.json(project);
  } catch (error: any) {
    console.error('Update project error:', error);
    return c.json({ error: 'Failed to update project', message: error?.message }, 500);
  }
});

// 删除项目
app.delete('/api/projects/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.project.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete project error:', error);
    return c.json({ error: 'Failed to delete project', message: error?.message }, 500);
  }
});

// ========== 新闻管理 ==========

// 获取新闻列表
app.get('/api/news', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(news);
  } catch (error: any) {
    console.error('News error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单条新闻
app.get('/api/news/:id', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 100 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    const news = await prisma.news.findUnique({
      where: { id },
    });
    
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
app.post('/api/news', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    const news = await prisma.news.create({
      data: {
        title: body.title,
        titleEn: body.titleEn,
        summary: body.summary,
        summaryEn: body.summaryEn,
        content: body.content,
        contentEn: body.contentEn,
        imageUrl: body.imageUrl,
        category: body.category || 'company',
        isPublished: body.isPublished ?? false,
        publishedAt: body.isPublished ? new Date() : null,
      }
    });
    return c.json(news, 201);
  } catch (error: any) {
    console.error('Create news error:', error);
    return c.json({ error: 'Failed to create news', message: error?.message }, 500);
  }
});

// 更新新闻
app.put('/api/news/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const news = await prisma.news.update({
      where: { id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        summary: body.summary,
        summaryEn: body.summaryEn,
        content: body.content,
        contentEn: body.contentEn,
        imageUrl: body.imageUrl,
        category: body.category,
        isPublished: body.isPublished,
        publishedAt: body.isPublished && !body.publishedAt ? new Date() : body.publishedAt,
      }
    });
    
    return c.json(news);
  } catch (error: any) {
    console.error('Update news error:', error);
    return c.json({ error: 'Failed to update news', message: error?.message }, 500);
  }
});

// 删除新闻
app.delete('/api/news/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.news.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete news error:', error);
    return c.json({ error: 'Failed to delete news', message: error?.message }, 500);
  }
});

// ========== 用户管理 ==========

// 获取用户列表
app.get('/api/users', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 30 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
      }
    });
    return c.json(users);
  } catch (error: any) {
    console.error('Users error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建用户
app.post('/api/users', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 5 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const passwordHash = await hash(body.password || '123456', 10);
    
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        passwordHash,
        name: body.name,
        role: body.role || 'employee',
        department: body.department,
        isActive: true,
      }
    });
    
    return c.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
    }, 201);
  } catch (error: any) {
    console.error('Create user error:', error);
    return c.json({ error: 'Failed to create user', message: error?.message }, 500);
  }
});

// 更新用户
app.put('/api/users/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const updateData: any = {
      username: body.username,
      email: body.email,
      name: body.name,
      role: body.role,
      department: body.department,
      isActive: body.isActive,
    };
    
    if (body.password) {
      updateData.passwordHash = await hash(body.password, 10);
    }
    
    const user = await prisma.user.update({
      where: { id },
      data: updateData,
    });
    
    return c.json(user);
  } catch (error: any) {
    console.error('Update user error:', error);
    return c.json({ error: 'Failed to update user', message: error?.message }, 500);
  }
});

// 删除用户
app.delete('/api/users/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 5 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.user.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete user error:', error);
    return c.json({ error: 'Failed to delete user', message: error?.message }, 500);
  }
});

// ========== 认证 ==========

// 登录 - 更严格的速率限制防止暴力破解
app.post('/api/auth/login', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 5 }), async (c) => {
  try {
    const { username, password } = await c.req.json();
    
    if (!username || !password) {
      return c.json({ error: 'Missing credentials' }, 400);
    }
    
    const prisma = getPrisma(c.env);
    
    const user = await prisma.user.findUnique({
      where: { username },
    });
    
    if (!user || !user.isActive) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const isValid = await compare(password, user.passwordHash);
    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const token = await sign(
      { 
        id: user.id, 
        username: user.username, 
        role: user.role,
        department: user.department 
      },
      c.env.JWT_SECRET
    );
    
    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
      }
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error', message: error?.message }, 500);
  }
});

// 验证 token
app.get('/api/auth/session', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 30 }), async (c) => {
  try {
    const auth = c.req.header('Authorization');
    if (!auth?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const token = auth.slice(7);
    const payload = await verify(token, c.env.JWT_SECRET);
    
    return c.json({ user: payload });
  } catch {
    return c.json({ error: 'Invalid token' }, 401);
  }
});

// 健康检查
app.get('/api/health', (c) => {
  return c.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

export default app;

// ========== 公司内容管理 API ==========

// 获取公司简介
app.get('/api/company/info', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    let info = await prisma.companyInfo.findFirst();
    
    if (!info) {
      // 创建默认数据
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
app.put('/api/company/info', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    let info = await prisma.companyInfo.findFirst();
    
    if (info) {
      info = await prisma.companyInfo.update({
        where: { id: info.id },
        data: {
          intro: body.intro,
          introEn: body.introEn,
        }
      });
    } else {
      info = await prisma.companyInfo.create({
        data: {
          intro: body.intro,
          introEn: body.introEn,
        }
      });
    }
    
    return c.json(info);
  } catch (error: any) {
    console.error('Update company info error:', error);
    return c.json({ error: 'Failed to update company info', message: error?.message }, 500);
  }
});

// ========== 发展历程 ==========

// 获取发展历程列表
app.get('/api/company/milestones', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const milestones = await prisma.milestone.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    return c.json(milestones);
  } catch (error: any) {
    console.error('Get milestones error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建发展历程
app.post('/api/company/milestones', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const milestone = await prisma.milestone.create({
      data: {
        year: body.year,
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        sortOrder: body.sortOrder || 0,
      }
    });
    
    return c.json(milestone, 201);
  } catch (error: any) {
    console.error('Create milestone error:', error);
    return c.json({ error: 'Failed to create milestone', message: error?.message }, 500);
  }
});

// 更新发展历程
app.put('/api/company/milestones/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const milestone = await prisma.milestone.update({
      where: { id },
      data: {
        year: body.year,
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        sortOrder: body.sortOrder,
      }
    });
    
    return c.json(milestone);
  } catch (error: any) {
    console.error('Update milestone error:', error);
    return c.json({ error: 'Failed to update milestone', message: error?.message }, 500);
  }
});

// 删除发展历程
app.delete('/api/company/milestones/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.milestone.delete({ where: { id } });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete milestone error:', error);
    return c.json({ error: 'Failed to delete milestone', message: error?.message }, 500);
  }
});

// ========== 核心价值观 ==========

// 获取价值观列表
app.get('/api/company/values', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const values = await prisma.companyValue.findMany({
      orderBy: { sortOrder: 'asc' }
    });
    return c.json(values);
  } catch (error: any) {
    console.error('Get company values error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建价值观
app.post('/api/company/values', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const value = await prisma.companyValue.create({
      data: {
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        icon: body.icon,
        sortOrder: body.sortOrder || 0,
      }
    });
    
    return c.json(value, 201);
  } catch (error: any) {
    console.error('Create company value error:', error);
    return c.json({ error: 'Failed to create company value', message: error?.message }, 500);
  }
});

// 更新价值观
app.put('/api/company/values/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const value = await prisma.companyValue.update({
      where: { id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        icon: body.icon,
        sortOrder: body.sortOrder,
      }
    });
    
    return c.json(value);
  } catch (error: any) {
    console.error('Update company value error:', error);
    return c.json({ error: 'Failed to update company value', message: error?.message }, 500);
  }
});

// 删除价值观
app.delete('/api/company/values/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.companyValue.delete({ where: { id } });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete company value error:', error);
    return c.json({ error: 'Failed to delete company value', message: error?.message }, 500);
  }
});

// ========== 管理团队 ==========

// 获取团队成员列表
app.get('/api/team/members', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    return c.json(members);
  } catch (error: any) {
    console.error('Get team members error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建团队成员
app.post('/api/team/members', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        nameEn: body.nameEn,
        title: body.title,
        titleEn: body.titleEn,
        imageUrl: body.imageUrl,
        education: body.education,
        educationEn: body.educationEn,
        experience: body.experience,
        experienceEn: body.experienceEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        sortOrder: body.sortOrder || 0,
        isActive: body.isActive ?? true,
      }
    });
    
    return c.json(member, 201);
  } catch (error: any) {
    console.error('Create team member error:', error);
    return c.json({ error: 'Failed to create team member', message: error?.message }, 500);
  }
});

// 更新团队成员
app.put('/api/team/members/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const member = await prisma.teamMember.update({
      where: { id },
      data: {
        name: body.name,
        nameEn: body.nameEn,
        title: body.title,
        titleEn: body.titleEn,
        imageUrl: body.imageUrl,
        education: body.education,
        educationEn: body.educationEn,
        experience: body.experience,
        experienceEn: body.experienceEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        sortOrder: body.sortOrder,
        isActive: body.isActive,
      }
    });
    
    return c.json(member);
  } catch (error: any) {
    console.error('Update team member error:', error);
    return c.json({ error: 'Failed to update team member', message: error?.message }, 500);
  }
});

// 删除团队成员
app.delete('/api/team/members/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.teamMember.delete({ where: { id } });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete team member error:', error);
    return c.json({ error: 'Failed to delete team member', message: error?.message }, 500);
  }
});

// ========== 业务板块 ==========

// 获取业务板块列表
app.get('/api/business/sections', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const sections = await prisma.businessSection.findMany({
      orderBy: { sectionId: 'asc' }
    });
    return c.json(sections);
  } catch (error: any) {
    console.error('Get business sections error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 获取单个业务板块
app.get('/api/business/sections/:id', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const sectionId = c.req.param('id');
    const prisma = getPrisma(c.env);
    
    const section = await prisma.businessSection.findUnique({
      where: { sectionId }
    });
    
    if (!section) {
      return c.json({ error: 'Section not found' }, 404);
    }
    
    return c.json(section);
  } catch (error: any) {
    console.error('Get business section error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 更新业务板块
app.put('/api/business/sections/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const sectionId = c.req.param('id');
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const section = await prisma.businessSection.update({
      where: { sectionId },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        subtitle: body.subtitle,
        subtitleEn: body.subtitleEn,
        description: body.description,
        descriptionEn: body.descriptionEn,
        features: body.features,
        featuresEn: body.featuresEn,
        imageUrl: body.imageUrl,
      }
    });
    
    return c.json(section);
  } catch (error: any) {
    console.error('Update business section error:', error);
    return c.json({ error: 'Failed to update business section', message: error?.message }, 500);
  }
});

// ========== 资质证书 ==========

// 获取证书列表
app.get('/api/certificates', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const certificates = await prisma.certificate.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
    return c.json(certificates);
  } catch (error: any) {
    console.error('Get certificates error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建证书
app.post('/api/certificates', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const certificate = await prisma.certificate.create({
      data: {
        title: body.title,
        titleEn: body.titleEn,
        issuer: body.issuer,
        issuerEn: body.issuerEn,
        issueDate: body.issueDate,
        imageUrl: body.imageUrl,
        sortOrder: body.sortOrder || 0,
        isActive: body.isActive ?? true,
      }
    });
    
    return c.json(certificate, 201);
  } catch (error: any) {
    console.error('Create certificate error:', error);
    return c.json({ error: 'Failed to create certificate', message: error?.message }, 500);
  }
});

// 更新证书
app.put('/api/certificates/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const certificate = await prisma.certificate.update({
      where: { id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        issuer: body.issuer,
        issuerEn: body.issuerEn,
        issueDate: body.issueDate,
        imageUrl: body.imageUrl,
        sortOrder: body.sortOrder,
        isActive: body.isActive,
      }
    });
    
    return c.json(certificate);
  } catch (error: any) {
    console.error('Update certificate error:', error);
    return c.json({ error: 'Failed to update certificate', message: error?.message }, 500);
  }
});

// 删除证书
app.delete('/api/certificates/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.certificate.delete({ where: { id } });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete certificate error:', error);
    return c.json({ error: 'Failed to delete certificate', message: error?.message }, 500);
  }
});

// ========== 荣誉奖项 ==========

// 获取荣誉列表
app.get('/api/honors', rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const honors = await prisma.honor.findMany({
      where: { isActive: true },
      orderBy: { year: 'desc' }
    });
    return c.json(honors);
  } catch (error: any) {
    console.error('Get honors error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 创建荣誉
app.post('/api/honors', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const honor = await prisma.honor.create({
      data: {
        title: body.title,
        titleEn: body.titleEn,
        issuer: body.issuer,
        issuerEn: body.issuerEn,
        year: body.year,
        imageUrl: body.imageUrl,
        sortOrder: body.sortOrder || 0,
        isActive: body.isActive ?? true,
      }
    });
    
    return c.json(honor, 201);
  } catch (error: any) {
    console.error('Create honor error:', error);
    return c.json({ error: 'Failed to create honor', message: error?.message }, 500);
  }
});

// 更新荣誉
app.put('/api/honors/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const body = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const honor = await prisma.honor.update({
      where: { id },
      data: {
        title: body.title,
        titleEn: body.titleEn,
        issuer: body.issuer,
        issuerEn: body.issuerEn,
        year: body.year,
        imageUrl: body.imageUrl,
        sortOrder: body.sortOrder,
        isActive: body.isActive,
      }
    });
    
    return c.json(honor);
  } catch (error: any) {
    console.error('Update honor error:', error);
    return c.json({ error: 'Failed to update honor', message: error?.message }, 500);
  }
});

// 删除荣誉
app.delete('/api/honors/:id', authMiddleware, rateLimitMiddleware({ windowMs: 60 * 1000, maxRequests: 10 }), async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.honor.delete({ where: { id } });
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Delete honor error:', error);
    return c.json({ error: 'Failed to delete honor', message: error?.message }, 500);
  }
});
