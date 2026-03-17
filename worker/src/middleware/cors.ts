import { cors } from 'hono/cors';

export function getCorsConfig(env: any) {
  const allowedOrigins = env.ALLOWED_ORIGINS 
    ? env.ALLOWED_ORIGINS.split(',').map((o: string) => o.trim())
    : ['https://www.janoenergy.com', 'https://janoenergy.com', 'http://localhost:3000'];
  
  return {
    origin: (origin: string) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return origin;
      }
      return null;
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
}

export function corsMiddleware(env: any) {
  return async (c: any, next: any) => {
    const corsConfig = getCorsConfig(env);
    const corsHandler = cors(corsConfig);
    return corsHandler(c, next);
  };
}
