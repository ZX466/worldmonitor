/**
 * World Monitor - 简化版入口文件
 * 移除大型功能以减小体积
 */

import './styles/base-layer.css';
import './styles/happy-theme.css';
import 'maplibre-gl/dist/maplibre-gl.css';

// 中国风主题支持
import { initChineseTheme } from './utils/chinese-theme-manager';
import { App } from './App';

// 禁用 Sentry（如果定义了 VITE_DISABLE_ANALYTICS）
const sentryDsn = import.meta.env.VITE_SENTRY_DSN?.trim();
if (sentryDsn && !import.meta.env.VITE_DISABLE_ANALYTICS) {
  import('@sentry/browser').then(Sentry => {
    // 初始化 Sentry（如果不禁用）
    Sentry.init({
      dsn: sentryDsn,
      release: `worldmonitor@${__APP_VERSION__}`,
      environment: location.hostname === 'worldmonitor.app' ? 'production'
        : location.hostname.includes('vercel.app') ? 'preview'
        : 'development',
      enabled: Boolean(sentryDsn) && !location.hostname.startsWith('localhost') && !('__TAURI_INTERNALS__' in window),
      sendDefaultPii: true,
      tracesSampleRate: 0.1,
      // 简化错误过滤
      ignoreErrors: [
        'Invalid WebGL2RenderingContext',
        'WebGL context lost',
        /ResizeObserver loop/,
        /^TypeError: Load failed/,
        /^TypeError: Failed to fetch/,
        /^TypeError: cancelled$/,
        /^TypeError: NetworkError/,
      ]
    });
  });
}

// 禁用 Vercel Analytics（如果定义了 VITE_DISABLE_ANALYTICS）
if (!import.meta.env.VITE_DISABLE_ANALYTICS) {
  import('@vercel/analytics').then(({ inject }) => {
    inject();
  });
}

// 初始化应用
const app = new App('root');
app.init().catch(error => {
  console.error('Failed to initialize app:', error);
});

// 初始化中国风主题（如果可用）
initChineseTheme();

// 简化版本检查和更新
if ('serviceWorker' in navigator && !location.hostname.startsWith('localhost')) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// 页面可见性优化
document.addEventListener('visibilitychange', () => {
  // 处理页面可见性变化
});

// 简化内存管理
window.addEventListener('pagehide', () => {
  // 清理资源
  if (typeof app.destroy === 'function') {
    app.destroy();
  }
});

export { App };