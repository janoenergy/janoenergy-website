interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const requestStore = new Map<string, { count: number; resetTime: number }>();

export function rateLimitMiddleware(config: RateLimitConfig) {
  return async (c: any, next: any) => {
    const key = `${c.req.ip}:${c.req.path}`;
    const now = Date.now();
    
    // 清理过期记录（每次请求时检查）
    for (const [k, v] of requestStore.entries()) {
      if (now > v.resetTime) {
        requestStore.delete(k);
      }
    }
    
    let record = requestStore.get(key);
    if (!record || now > record.resetTime) {
      record = { count: 1, resetTime: now + config.windowMs };
      requestStore.set(key, record);
    } else {
      record.count++;
    }
    
    if (record.count > config.maxRequests) {
      return c.json({ error: 'Too many requests' }, 429);
    }
    
    await next();
  };
}
