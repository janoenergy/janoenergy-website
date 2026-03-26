// 错误上报工具
// 生产环境使用，开发环境打印到控制台

const isDevelopment = process.env.NODE_ENV === 'development';

export function logError(message: string, error?: unknown) {
  if (isDevelopment) {
    console.error(message, error);
  } else {
    // 生产环境：可接入 Sentry 或其他错误上报服务
    // 例如：Sentry.captureException(error);
    // 目前静默处理，避免暴露错误信息
  }
}

export function logWarn(message: string, data?: unknown) {
  if (isDevelopment) {
    console.warn(message, data);
  }
}

export function logInfo(message: string, data?: unknown) {
  if (isDevelopment) {
    console.log(message, data);
  }
}
