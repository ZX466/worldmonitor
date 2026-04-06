# 代码审查指南

## 目的

代码审查是保证代码质量、分享知识和防止 bug 的关键环节。本指南旨在帮助团队进行高效、一致的代码审查。

## 审查者职责

### 必须检查

1. **功能正确性**
   - 代码是否实现了需求？
   - 边界情况是否处理？
   - 错误处理是否完善？

2. **类型安全**
   - 所有类型定义是否正确？
   - 是否有 `any` 类型逃逸？
   - 类型推断是否合理？

3. **性能**
   - 是否有明显的性能问题？
   - 是否正确使用了缓存？
   - 是否有不必要的重复计算？

4. **安全性**
   - 用户输入是否正确验证？
   - 是否有 XSS 风险？
   - 敏感信息是否泄露？

### 应该检查

5. **代码风格**
   - 是否符合项目规范？
   - 命名是否清晰？
   - 注释是否必要？

6. **测试覆盖**
   - 新代码是否有测试？
   - 测试是否覆盖边界情况？
   - 测试是否可维护？

7. **文档**
   - 公共 API 是否有文档？
   - 复杂逻辑是否有解释？

## PR 审查流程

### 1. 理解变更

```
□ 阅读 PR 描述，理解目的
□ 查看关联的 Issue/Ticket
□ 理解变更范围
```

### 2. 逐文件审查

```markdown
## 文件: src/services/rss.ts

### 优点
- 缓存策略设计合理
- 错误处理完善

### 问题
- [ ] 第 45 行: 缺少类型标注
- [ ] 第 78 行: `console.log` 应该移除
- [ ] 第 120 行: 可以用 Optional Chain 简化

### 建议
- 考虑将 XX 提取为独立函数
```

### 3. 测试验证

```
□ 本地运行测试
□ 构建项目
□ 手动测试关键功能（如果适用）
```

### 4. 反馈

使用标准前缀：

| 前缀 | 含义 | 必须修复 |
|------|------|---------|
| `nit:` | 风格偏好，可忽略 | ❌ |
| `suggestion:` | 改进建议 | ❌ |
| `question:` | 需要澄清 | ❓ |
| `issue:` | 问题需要修复 | ✅ |
| `blocker:` | 阻塞性问题 | ✅❌ |

## 常见问题清单

### 类型相关

- [ ] `any` 类型使用是否合理？
- [ ] 类型断言是否必要？
- [ ] 是否正确使用了 `strict` 模式？

### 错误处理

- [ ] 是否捕获了所有可能的异常？
- [ ] 错误日志是否包含足够信息？
- [ ] 是否有降级策略？

### 性能

- [ ] 是否有不必要的重新渲染？
- [ ] 是否正确使用了 `useMemo`/`useCallback`？
- [ ] 是否有大数组/对象的不必要复制？
- [ ] 是否正确使用了缓存？

### 安全

- [ ] 用户输入是否验证？
- [ ] 是否有 SQL/XSS 注入风险？
- [ ] API 密钥是否安全处理？

## 审查示例

### PR 描述

```
feat: Add RSS feed deduplication

Prevents duplicate news items from appearing in the feed by:
- Tracking seen URLs in a Set
- Skipping items with duplicate URLs
- Adding cache key based on feed URL
```

### 审查评论

---

**src/services/rss.ts**

**issue:** L45 - `urlSet` never gets cleared, could cause memory leak

```typescript
// 当前代码
const urlSet = new Set<string>();
```

**suggestion:** Consider using a TTL-based cache instead of a permanent Set

**issue:** L78 - Missing error handling for parse failure

```typescript
// 当前代码
const doc = parser.parseFromString(text, 'text/xml');
```

**blocker:** No try-catch around parseFromString. Malformed XML will throw.

---

**tests/rss.test.ts**

**question:** Are there tests for the deduplication logic?

---

### 审查总结

```
Reviewed-by: Reviewer Name
LGTM with comments
Issues: 2 (1 blocker)
Suggestions: 1
```

## 自审查清单

提交 PR 前，自己先检查：

- [ ] 代码编译通过
- [ ] 所有测试通过
- [ ] 没有 `console.log`（调试代码）
- [ ] 注释已更新（如有必要）
- [ ] PR 描述清晰
- [ ] 变更范围最小化
