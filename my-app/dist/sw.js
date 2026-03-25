// ============================================
// Service Worker
// 实现静态资源缓存，支持离线访问
// ============================================

const CACHE_NAME = 'janoenergy-v1';
const STATIC_ASSETS = [
  '/',
  '/zh',
  '/en',
  '/manifest.json',
  '/fonts/main.woff2',
  '/images/projects/wind-farm.jpg',
  '/images/projects/solar-farm.jpg',
  '/images/projects/storage-facility.jpg',
];

// 安装时缓存静态资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活时清理旧缓存
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求，优先使用缓存
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 跳过非 GET 请求
  if (request.method !== 'GET') return;

  // 跳过 API 请求
  if (url.pathname.startsWith('/api/')) return;

  // 跳过外部请求
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(request).then((response) => {
      // 缓存命中，直接返回
      if (response) {
        return response;
      }

      // 未命中，网络请求并缓存
      return fetch(request).then((networkResponse) => {
        // 只缓存成功的响应
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      });
    })
  );
});
