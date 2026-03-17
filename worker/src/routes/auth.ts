import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { compare, hash } from 'bcryptjs';
import { rateLimitMiddleware } from '../middleware/rateLimit';
import { getPrisma } from '../lib/prisma';

const app = new Hono();

// 登录
app.post('/login', rateLimitMiddleware({ windowMs: 60000, maxRequests: 5 }), async (c) => {
  try {
    const { username, password } = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const user = await prisma.user.findUnique({ where: { username } });
    
    if (!user || !user.isActive) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const isValid = await compare(password, user.passwordHash);
    
    if (!isValid) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }
    
    const token = await sign(
      { 
        userId: user.id, 
        username: user.username, 
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 
      },
      c.env.JWT_SECRET
    );
    
    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed', message: error?.message }, 500);
  }
});

// 注册（仅管理员可用）
app.post('/register', rateLimitMiddleware({ windowMs: 60000, maxRequests: 3 }), async (c) => {
  try {
    const { username, password, email, name, role = 'employee' } = await c.req.json();
    const prisma = getPrisma(c.env);
    
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ username }, { email }] },
    });
    
    if (existingUser) {
      return c.json({ error: 'Username or email already exists' }, 400);
    }
    
    const passwordHash = await hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        name,
        role,
      },
    });
    
    return c.json({
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
    }, 201);
  } catch (error: any) {
    console.error('Register error:', error);
    return c.json({ error: 'Registration failed', message: error?.message }, 500);
  }
});

export default app;
