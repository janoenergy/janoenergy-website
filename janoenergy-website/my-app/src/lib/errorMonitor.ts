// 简单的错误监控工具
interface ErrorInfo {
  message: string;
  stack?: string;
  url: string;
  timestamp: number;
  userAgent: string;
}

class ErrorMonitor {
  private errors: ErrorInfo[] = [];
  private maxErrors = 50;
  private endpoint: string;

  constructor(endpoint: string = '') {
    this.endpoint = endpoint;
    this.init();
  }

  private init() {
    if (typeof window !== 'undefined') {
      // 捕获全局错误
      window.addEventListener('error', (event) => {
        this.captureError({
          message: event.message,
          stack: event.error?.stack,
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        });
      });

      // 捕获 Promise 错误
      window.addEventListener('unhandledrejection', (event) => {
        this.captureError({
          message: String(event.reason),
          stack: event.reason?.stack,
          url: window.location.href,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
        });
      });
    }
  }

  captureError(error: ErrorInfo) {
    this.errors.push(error);
    
    // 限制存储数量
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // 发送到服务端（如果有配置）
    if (this.endpoint) {
      this.sendError(error);
    }

    // 控制台输出
    console.error('[ErrorMonitor]', error);
  }

  private async sendError(error: ErrorInfo) {
    try {
      await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(error),
      });
    } catch (e) {
      // 静默失败
    }
  }

  getErrors(): ErrorInfo[] {
    return [...this.errors];
  }

  clearErrors() {
    this.errors = [];
  }
}

// 导出单例
export const errorMonitor = new ErrorMonitor(
  process.env.NEXT_PUBLIC_ERROR_ENDPOINT
);

export default ErrorMonitor;
