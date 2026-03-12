import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sign, verify } from 'hono/jwt';
import { compare, hash } from 'bcryptjs';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

const app = new Hono<{ Bindings: Env }>();

// CORS
app.use('/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// 获取 Prisma Client
function getPrisma(env: Env) {
  return new PrismaClient({
    datasourceUrl: env.DATABASE_URL,
  }).$extends(withAccelerate());
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

// ========== 认证 ==========

// 登录
app.post('/api/auth/login', async (c) => {
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
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// 验证 token
app.get('/api/auth/session', async (c) => {
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

// ========== 用户管理 ==========

// 获取用户列表
app.get('/api/users', async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        role: true,
        department: true,
        isActive: true,
        createdAt: true,
      }
    });
    return c.json(users);
  } catch (error) {
    console.error('Users error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 创建用户
app.post('/api/users', async (c) => {
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
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      isActive: user.isActive,
    }, 201);
  } catch (error) {
    console.error('Create user error:', error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// 更新用户
app.put('/api/users/:id', async (c) => {
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
  } catch (error) {
    console.error('Update user error:', error);
    return c.json({ error: 'Failed to update user' }, 500);
  }
});

// 删除用户
app.delete('/api/users/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.user.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Delete user error:', error);
    return c.json({ error: 'Failed to delete user' }, 500);
  }
});

// ========== 项目管理 ==========

// 获取项目列表
app.get('/api/projects', async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(projects);
  } catch (error) {
    console.error('Projects error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 获取单个项目
app.get('/api/projects/:id', async (c) => {
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
  } catch (error) {
    console.error('Get project error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 创建项目
app.post('/api/projects', async (c) => {
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
  } catch (error) {
    console.error('Create project error:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

// 更新项目
app.put('/api/projects/:id', async (c) => {
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
  } catch (error) {
    console.error('Update project error:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

// 删除项目
app.delete('/api/projects/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.project.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Delete project error:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// ========== 新闻管理 ==========

// 获取新闻列表
app.get('/api/news', async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const news = await prisma.news.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(news);
  } catch (error) {
    console.error('News error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 获取单条新闻
app.get('/api/news/:id', async (c) => {
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
  } catch (error) {
    console.error('Get news error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 创建新闻
app.post('/api/news', async (c) => {
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
        category: body.category || 'company',
        isPublished: body.isPublished || false,
        publishedAt: body.isPublished ? new Date() : null,
      }
    });
    return c.json(news, 201);
  } catch (error) {
    console.error('Create news error:', error);
    return c.json({ error: 'Failed to create news' }, 500);
  }
});

// 更新新闻
app.put('/api/news/:id', async (c) => {
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
        category: body.category,
        isPublished: body.isPublished,
        publishedAt: body.isPublished && !body.publishedAt ? new Date() : body.publishedAt,
      }
    });
    
    return c.json(news);
  } catch (error) {
    console.error('Update news error:', error);
    return c.json({ error: 'Failed to update news' }, 500);
  }
});

// 删除新闻
app.delete('/api/news/:id', async (c) => {
  try {
    const id = parseInt(c.req.param('id'));
    const prisma = getPrisma(c.env);
    
    await prisma.news.delete({
      where: { id },
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.error('Delete news error:', error);
    return c.json({ error: 'Failed to delete news' }, 500);
  }
});

// ========== 审批流程 ==========

// 获取流程列表
app.get('/api/workflows', async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        applicant: {
          select: { name: true }
        }
      }
    });
    return c.json(workflows);
  } catch (error) {
    console.error('Workflows error:', error);
    return c.json({ error: 'Database error' }, 500);
  }
});

// 健康检查
app.get('/api/health', (c) => c.json({ status: 'ok', time: new Date().toISOString() }));

export default app;
