// API 限流配置
export interface RateLimitConfig {
  // 时间窗口（毫秒）
  windowMs: number;
  // 最大请求数
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
setInterval(cleanupExpiredRecords, 5 * 60 * 1000);

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { windowMs: 60 * 1000, maxRequests: 100 }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = requestStore.get(identifier);

  if (!record || now > record.resetTime) {
    // 新窗口或窗口已过期
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

  // 检查是否超过限制
  if (record.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
    };
  }

  // 增加计数
  record.count++;
  return {
    allowed: true,
    remaining: config.maxRequests - record.count,
    resetTime: record.resetTime,
  };
}

// 获取客户端 IP
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  // 从 URL 获取（Cloudflare Workers 环境）
  const url = new URL(request.url);
  return url.hostname || 'unknown';
}
