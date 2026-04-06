# API 层代码迁移指南

## 背景

当前 `api/` 目录混合使用 `.js` 和 `.ts`，需要统一迁移到 TypeScript。

## 迁移步骤

### 1. 文件重命名

```bash
# 将 .js 文件重命名为 .ts
mv api/example.js api/example.ts
```

### 2. 添加类型定义

```typescript
// api/example.ts

interface RequestContext {
  url: string;
  headers: Headers;
}

interface ResponseData {
  items: NewsItem[];
  meta: {
    cached: boolean;
    timestamp: number;
  };
}

export const config = { runtime: 'edge' };

export async function handler(req: Request): Promise<Response> {
  // 实现...
}
```

### 3. 更新导入

```javascript
// Before (api/example.js)
import { getCorsHeaders } from './_cors.js';
import { validateApiKey } from './_api-key.js';
```

```typescript
// After (api/example.ts)
import { getCorsHeaders } from './_cors.js';
import type { ApiKeyValidator } from './_api-key.js';
```

### 4. 类型安全的错误处理

```typescript
// Before
try {
  const data = JSON.parse(text);
  return data;
} catch (e) {
  console.error(e);
  return null;
}

// After
try {
  const data = JSON.parse(text) as ExpectedType;
  return data;
} catch (e) {
  if (e instanceof SyntaxError) {
    console.error('Invalid JSON:', e.message);
  }
  throw e; // Re-throw for proper error handling
}
```

## 优先级

### 高优先级（生产环境关键）

- [ ] `api/rss-proxy.ts`
- [ ] `api/story.ts`
- [ ] `api/_rate-limit.ts`
- [ ] `api/_cors.ts`

### 中优先级

- [ ] `api/bootstrap.ts`
- [ ] `api/telegram-feed.ts`
- [ ] `api/download.ts`

### 低优先级

- [ ] `api/version.ts`
- [ ] `api/register-interest.ts`

## 检查清单

- [ ] 所有函数有返回类型标注
- [ ] try-catch 有具体错误类型
- [ ] 导入使用绝对路径或相对路径
- [ ] 没有 `any` 类型
- [ ] 运行 `tsc --noEmit -p tsconfig.api.json`
