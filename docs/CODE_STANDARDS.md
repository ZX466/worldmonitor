# World Monitor 代码规范

## 📋 目录

- [TypeScript 规范](#typescript-规范)
- [命名约定](#命名约定)
- [组件规范](#组件规范)
- [服务层规范](#服务层规范)
- [API 规范](#api-规范)
- [测试规范](#测试规范)
- [Git 提交规范](#git-提交规范)

---

## TypeScript 规范

### 严格模式

项目启用严格 TypeScript 检查：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### 类型导入

优先使用 `type` 导入：

```typescript
// ✅ 推荐
import type { NewsItem, Feed } from '@/types';
import { someFunc } from './utils';

// ❌ 避免
import { type NewsItem } from '@/types';
```

### 接口 vs 类型别名

优先使用 `interface`：

```typescript
// ✅ 推荐
interface NewsItem {
  title: string;
  link: string;
  pubDate: Date;
}

// ❌ 避免
type NewsItem = {
  title: string;
  link: string;
  pubDate: Date;
};
```

### Null 检查

使用可选链和空值合并：

```typescript
// ✅ 推荐
const title = item?.title ?? 'Untitled';

// ❌ 避免
const title = item && item.title ? item.title : 'Untitled';
```

---

## 命名约定

### 文件命名

| 类型 | 约定 | 示例 |
|------|------|------|
| 组件 | PascalCase | `ThreatMap.tsx` |
| 服务 | camelCase | `rss.ts`, `analytics.ts` |
| 工具函数 | camelCase | `proxy.ts`, `sanitize.ts` |
| 类型定义 | PascalCase | `NewsItem.ts` |
| 常量 | SCREAMING_SNAKE | `MAX_RETRY_COUNT` |
| 测试 | `.test.ts` | `rss.test.ts` |

### 变量命名

```typescript
// ✅ 推荐
const isLoading = false;
const hasError = true;
const userList: User[] = [];
const maxRetries = 3;

// ❌ 避免
const flag = false;
const list: User[] = [];
const retry = 3;
```

### 布尔值命名

使用 `is`, `has`, `can`, `should` 前缀：

```typescript
const isActive = true;
const hasPermission = false;
const canEdit = true;
const shouldRender = false;
```

---

## 组件规范

### 组件结构

```typescript
// 1. 类型定义
interface Props {
  title: string;
  onClose?: () => void;
}

// 2. 子组件（如果需要）
function ChildComponent() {
  return <div>...</div>;
}

// 3. 主组件
export function Panel({ title, onClose }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {
    // cleanup
  }, []);

  // Handlers
  const handleClick = () => {
    onClose?.();
  };

  // Render
  return (
    <div className="panel">
      <h2>{title}</h2>
      <ChildComponent />
    </div>
  );
}
```

### Props 传递

使用解构并标注类型：

```typescript
// ✅ 推荐
function MapPopup({ lat, lon, title, description }: MapPopupProps) {

// ❌ 避免
function MapPopup(props: any) {
  const { lat, lon } = props;
```

---

## 服务层规范

### 服务职责

每个服务文件应该：

1. **单一职责** - 专注于一个功能领域
2. **明确导出** - 清晰的公共 API
3. **错误处理** - 优雅的降级策略
4. **类型安全** - 完整的类型定义

### 缓存策略

```typescript
// 使用已建立的缓存模式
import { cachedFetchJson } from '@/server/_shared/redis';

// 示例：带 TTL 的缓存获取
async function getData(): Promise<Data> {
  return cachedFetchJson('key:v1', 300, async () => {
    const response = await fetchFromAPI();
    return response;
  });
}
```

### 错误处理

```typescript
// ✅ 推荐：结构化错误处理
export async function fetchData(): Promise<Result> {
  try {
    const data = await api.fetch();
    return { data, error: null };
  } catch (e) {
    console.error('Fetch failed:', e);
    return {
      data: null,
      error: {
        code: 'FETCH_ERROR',
        message: e instanceof Error ? e.message : 'Unknown error'
      }
    };
  }
}

// ❌ 避免：裸 throw
export async function fetchData(): Promise<Data> {
  const data = await api.fetch();
  return data; // 如果失败会 throw
}
```

---

## API 规范

### RESTful 端点

使用标准 HTTP 方法和状态码：

| 方法 | 用途 | 成功码 |
|------|------|--------|
| GET | 获取资源 | 200 |
| POST | 创建资源 | 201 |
| PUT | 更新资源 | 200 |
| DELETE | 删除资源 | 204 |

### 响应格式

```typescript
// 成功响应
{
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T12:00:00Z",
    "cached": true
  }
}

// 错误响应
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}
```

---

## 测试规范

### 测试金字塔

```
        /\
       /E2E\        <- 少量关键流程
      /------\
     /Integr. \     <- API 和服务集成
    /----------\
   /  Unit Tests \  <- 大量基础测试
  /--------------\
```

### 单元测试模板

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ModuleName', () => {
  beforeEach(() => {
    // Setup
  });

  describe('functionName', () => {
    it('should do X when Y', () => {
      const result = functionName(input);
      expect(result).toEqual(expected);
    });

    it('should handle error case', () => {
      expect(() => functionName(invalidInput)).toThrow();
    });
  });
});
```

### 测试命名

使用描述性测试名称：

```typescript
// ✅ 推荐
it('should return empty array when feed list is empty')
it('should coalesce concurrent requests to single upstream call')
it('should fallback to stale cache when Redis is unavailable')

// ❌ 避免
it('works')
it('test case 1')
it('handles empty')
```

---

## Git 提交规范

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 类型

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式（不影响功能） |
| refactor | 重构 |
| test | 测试相关 |
| chore | 构建/工具相关 |

### 示例

```
feat(rss): add support for Atom feed format

- Parse <entry> elements as items
- Handle published/updated dates
- Extract image URLs from content

Closes #123
```

```
fix(cache): prevent sentinel collision with real null values

Negative results are now stored with a special prefix to avoid
conflicts with legitimate cached null values.

Fixes #456
```

---

## 代码审查清单

### PR 提交前自检

- [ ] TypeScript 编译无错误
- [ ] 所有新函数有类型标注
- [ ] 关键逻辑有单元测试
- [ ] 无 `console.log`（调试代码已移除）
- [ ] 代码格式符合 Prettier 规范
- [ ] 提交信息符合规范
- [ ] 没有意外的大文件变更

### 审查者检查

- [ ] 逻辑正确性
- [ ] 边界情况处理
- [ ] 性能影响
- [ ] 安全性（XSS、注入等）
- [ ] 可访问性
- [ ] 文档更新
