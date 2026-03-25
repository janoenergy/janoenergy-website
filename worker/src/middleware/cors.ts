import { cors } from 'hono/cors';

export function getCorsConfig(env: any) {
  // 从环境变量读取允许的域名，支持逗号分隔
  const allowedOrigins = env.ALLOWED_ORIGINS 
    ? env.ALLOWED_ORIGINS.split(',').map((o: string) => o.trim())
    : [
        'https://www.janoenergy.com', 
        'https://janoenergy.com',
        'https://*.janoenergy.com',
      ];
  
  return {
    origin: (origin: string) => {
      // 开发环境：允许所有 localhost 端口
      if (origin && origin.match(/^http:\/\/localhost:\d+$/)) {
        return origin;
      }
      if (origin && origin.match(/^http:\/\/127\.0\.0\.1:\d+$/)) {
        return origin;
      }
      
      // 生产环境：允许配置的域名
      if (!origin || allowedOrigins.includes(origin)) {
        return origin;
      }
      
      // 允许子域名
      if (origin && allowedOrigins.some((o: string) => 
        o.includes('*') && origin.match(new RegExp(o.replace('*', '.*')))
      )) {
        return origin;
      }
      
      return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24小时缓存预检请求
  };
}

export function corsMiddleware(env: any) {
  return async (c: any, next: any) => {
    const corsConfig = getCorsConfig(env);
    const corsHandler = cors(corsConfig);
    return corsHandler(c, next);
  };
}
