import { Hono } from 'hono';
import { corsMiddleware } from './middleware/cors';
import { rateLimitMiddleware } from './middleware/rateLimit';
import { getPrisma } from './lib/prisma';

// 导入路由
import authRoutes from './routes/auth';
import projectRoutes from './routes/projects';
import newsRoutes from './routes/news';
import companyRoutes from './routes/company';

export interface Env {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ALLOWED_ORIGINS?: string;
}

const app = new Hono<{ Bindings: Env }>();

// 全局中间件
app.use('*', (c, next) => corsMiddleware(c.env)(c, next));

// 健康检查
app.get('/health', (c) => c.json({ status: 'ok', timestamp: new Date().toISOString() }));

// 注册路由
app.route('/api/auth', authRoutes);
app.route('/api/projects', projectRoutes);
app.route('/api/news', newsRoutes);
app.route('/api/company', companyRoutes);

// 获取统计数据（用于仪表盘）
app.get('/api/stats', rateLimitMiddleware({ windowMs: 60000, maxRequests: 60 }), async (c) => {
  try {
    const prisma = getPrisma(c.env);
    
    const [projectCount, newsCount, userCount] = await Promise.all([
      prisma.project.count(),
      prisma.news.count(),
      prisma.user.count(),
    ]);
    
    return c.json({
      projects: projectCount,
      news: newsCount,
      users: userCount,
    });
  } catch (error: any) {
    console.error('Get stats error:', error);
    return c.json({ error: 'Database error', message: error?.message }, 500);
  }
});

// 404 处理
app.notFound((c) => c.json({ error: 'Not found' }, 404));

// 错误处理
app.onError((err, c) => {
  console.error('Error:', err);
  return c.json({ error: 'Internal server error', message: err.message }, 500);
});

export default app;
