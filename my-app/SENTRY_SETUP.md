# Sentry 错误监控配置指南

## 安装 Sentry

```bash
cd my-app
npm install @sentry/nextjs --legacy-peer-deps
```

## 配置 Sentry

### 1. 创建 Sentry 配置文件

创建 `sentry.client.config.ts`:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // 调整采样率
  tracesSampleRate: 1.0,
  
  // 调试模式（开发环境）
  debug: process.env.NODE_ENV === 'development',
  
  // 环境
  environment: process.env.NODE_ENV,
  
  // 发布版本
  release: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
  
  // 启用性能监控
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  
  // Session Replay 采样率
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

创建 `sentry.server.config.ts`:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV,
});
```

创建 `sentry.edge.config.ts`:
```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development',
  environment: process.env.NODE_ENV,
});
```

### 2. 更新 next.config.mjs

```javascript
const { withSentryConfig } = require('@sentry/nextjs');

const nextConfig = {
  // ... 现有配置
};

module.exports = withSentryConfig(nextConfig, {
  // Sentry webpack 插件选项
  silent: true,
  org: 'your-org',
  project: 'janoenergy-website',
}, {
  // Sentry 上传选项
  widenClientFileUpload: true,
  transpileClientSDK: true,
  tunnelRoute: '/monitoring',
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
```

### 3. 添加环境变量

在 `.env.local` 中添加：
```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

### 4. 创建错误边界组件

创建 `src/components/ErrorBoundary.tsx`:
```typescript
'use client';

import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import React from 'react';

export default function GlobalError({ error }: { error: Error }) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <Error statusCode={500} />
      </body>
    </html>
  );
}
```

## 获取 Sentry DSN

1. 访问 https://sentry.io
2. 创建新项目
3. 选择 Next.js 平台
4. 复制 DSN

## 测试 Sentry

在页面中添加测试错误：
```typescript
<button onClick={() => {
  throw new Error('Test Sentry Error');
}}>
  Test Error
</button>
```
