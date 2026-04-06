# 性能优化指南

## 概述

World Monitor 是一个数据密集型应用，需要处理大量实时数据。本指南涵盖前端、后端和数据处理的性能最佳实践。

---

## 前端性能

### 1. React 渲染优化

#### 使用 `useMemo` 缓存计算结果

```typescript
// ✅ 推荐
const filteredItems = useMemo(() => {
  return items.filter(item => item.category === activeCategory);
}, [items, activeCategory]);

// ❌ 避免
const filteredItems = items.filter(item => item.category === activeCategory);
```

#### 使用 `useCallback` 稳定函数引用

```typescript
// ✅ 推荐
const handleClick = useCallback((id: string) => {
  setSelectedId(id);
}, []);

// ❌ 避免
const handleClick = (id: string) => {
  setSelectedId(id);
};
```

#### 组件拆分

```typescript
// ✅ 推荐：拆分为小组件
function FeedList({ items }: { items: NewsItem[] }) {
  return (
    <div>
      {items.map(item => (
        <FeedItem key={item.id} item={item} />
      ))}
    </div>
  );
}

// ❌ 避免：大组件导致不必要的重渲染
function FeedPage({ items }: { items: NewsItem[] }) {
  return (
    <div>
      <Header />
      {items.map(item => (
        <div key={item.id} className="item">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          {/* ... 更多内容 */}
        </div>
      ))}
    </div>
  );
}
```

### 2. 图片优化

```typescript
// ✅ 推荐：懒加载 + 正确的尺寸
<img
  src={item.imageUrl}
  loading="lazy"
  srcSet={`${item.imageUrl} 1x, ${item.imageUrl2x} 2x`}
  alt={item.title}
/>

// ✅ 使用 WebP
<picture>
  <source srcSet={`${url}.webp`} type="image/webp" />
  <img src={`${url}.jpg`} alt="..." />
</picture>
```

### 3. 列表虚拟化

对于长列表，使用虚拟化：

```typescript
import { VirtualList } from '@/components/VirtualList';

// ✅ 推荐：只渲染可见项
<VirtualList
  items={allItems}
  itemHeight={80}
  overscan={5}
  renderItem={(item) => <NewsItem item={item} />}
/>
```

### 4. Deck.gl 性能

```typescript
// ✅ 推荐：数据聚合
const data = useMemo(() => {
  // 聚合数据以减少点数
  return aggregatePoints(rawData, { granularity: 'grid' });
}, [rawData]);

// ✅ 推荐：使用合适的图层属性
new ScatterplotLayer({
  id: 'points',
  data,
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 2,
  radiusMaxPixels: 10,
  getPosition: d => [d.lon, d.lat],
  getRadius: d => Math.sqrt(d.value),
  updateTriggers: {
    getRadius: [aggregationLevel],
  },
});
```

---

## 后端性能

### 1. 缓存策略

#### 多层缓存

```
用户请求
    ↓
  CDN 缓存 (静态资源)
    ↓
  Edge 缓存 (API 响应)
    ↓
  Redis 缓存 (热点数据)
    ↓
  数据库/上游 API (源数据)
```

#### Redis 缓存最佳实践

```typescript
// ✅ 推荐：使用 pipeline 减少网络往返
const results = await redis.pipeline()
  .get(`key1`)
  .get(`key2`)
  .get(`key3`)
  .exec();

// ✅ 推荐：设置合理的 TTL
const CACHE_TTL = {
  HOT: 60,        // 1分钟 - 频繁更新的热点数据
  NORMAL: 300,    // 5分钟 - 一般数据
  COLD: 3600,     // 1小时 - 稳定的配置数据
  STALE: 86400,   // 24小时 - 极冷数据（用于降级）
};
```

### 2. 并发处理

```typescript
// ✅ 推荐：Promise.all 并行获取
const [items, metadata, userPrefs] = await Promise.all([
  fetchItems(),
  fetchMetadata(),
  fetchUserPrefs(),
]);

// ✅ 推荐：分批处理避免过载
const BATCH_SIZE = 10;
for (let i = 0; i < items.length; i += BATCH_SIZE) {
  const batch = items.slice(i, i + BATCH_SIZE);
  await Promise.all(batch.map(processItem));
}
```

### 3. 请求合并

```typescript
// ✅ 推荐：合并并发相同请求
// 当前实现：redis.ts 中的 cachedFetchJson
const [a, b, c] = await Promise.all([
  fetchData('key'),
  fetchData('key'),  // 合并为 1 次实际请求
  fetchData('key'),
]);
```

---

## 数据处理性能

### 1. 大数组处理

```typescript
// ✅ 推荐：使用 Web Worker 处理大数组
// workers/data-processor.worker.ts
self.onmessage = ({ data }) => {
  const result = processLargeDataset(data);
  self.postMessage(result);
};

// ✅ 推荐：分块处理
function* chunkProcess<T, R>(
  items: T[],
  chunkSize: number,
  processor: (chunk: T[]) => R
): Generator<R> {
  for (let i = 0; i < items.length; i += chunkSize) {
    yield processor(items.slice(i, i + chunkSize));
  }
}
```

### 2. 避免内存泄漏

```typescript
// ✅ 推荐：及时清理定时器
useEffect(() => {
  const interval = setInterval(fetchData, 5000);
  return () => clearInterval(interval);
}, []);

// ✅ 推荐：清理事件监听
useEffect(() => {
  const handler = () => handleResize();
  window.addEventListener('resize', handler);
  return () => window.removeEventListener('resize', handler);
}, []);
```

---

## 监控指标

### 关键性能指标 (KPIs)

| 指标 | 目标 | 告警阈值 |
|------|------|---------|
| LCP (Largest Contentful Paint) | < 2.5s | > 4s |
| FID (First Input Delay) | < 100ms | > 300ms |
| CLS (Cumulative Layout Shift) | < 0.1 | > 0.25 |
| Time to First Byte | < 200ms | > 500ms |
| API 响应时间 (p95) | < 500ms | > 1s |

### 性能监控

```typescript
// ✅ 使用 Sentry 进行性能监控
import * as Sentry from '@sentry/browser';

Sentry.init({
  tracesSampleRate: 0.1, // 采样 10% 的交易
  replaysSessionSampleRate: 0.1,
});

// 标记关键交易
const transaction = Sentry.startTransaction({ name: 'fetch-news' });
try {
  const data = await fetchNews();
  transaction.setTag('result', 'success');
} catch (e) {
  transaction.setTag('result', 'error');
  throw e;
} finally {
  transaction.finish();
}
```

---

## 性能检查清单

### 开发阶段

- [ ] 避免不必要的重渲染
- [ ] 使用 `useMemo`/`useCallback` 优化
- [ ] 大列表使用虚拟化
- [ ] 图片懒加载
- [ ] 正确设置缓存策略

### 代码审查

- [ ] 检查 `console.log` 性能影响
- [ ] 检查大型数据结构的复制
- [ ] 检查网络请求数量
- [ ] 检查重复计算

### 发布前

- [ ] Lighthouse 性能评分 > 90
- [ ] Core Web Vitals 达标
- [ ] 压力测试通过
- [ ] 生产环境性能监控已配置
