/**
 * 字体加载优化配置
 * 使用系统字体栈 + 预加载关键字体
 */

// 系统字体栈 - 确保快速渲染
export const fontFamily = {
  // 中文优先使用系统字体
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans SC"',
    '"PingFang SC"',
    '"Microsoft YaHei"',
    '"Hiragino Sans GB"',
    'sans-serif',
  ].join(','),
  // 等宽字体
  mono: [
    'ui-monospace',
    'SFMono-Regular',
    '"SF Mono"',
    'Menlo',
    'Consolas',
    '"Liberation Mono"',
    'monospace',
  ].join(','),
};

// 字体显示策略
export const fontDisplay = 'swap';

// 预加载的字体列表
export const preloadFonts = [
  // 如果需要自定义字体，取消注释并修改路径
  // '/fonts/main.woff2',
];

// 字体加载优化脚本
export const fontLoadingScript = `
  // 字体加载优化：使用 CSS 字体加载 API
  if ('fonts' in document) {
    // 等待字体加载完成
    Promise.all([
      document.fonts.load('1em -apple-system'),
      document.fonts.load('1em BlinkMacSystemFont'),
    ]).then(() => {
      document.documentElement.classList.add('fonts-loaded');
    });
  } else {
    // 回退：直接添加类
    document.documentElement.classList.add('fonts-loaded');
  }
`;
