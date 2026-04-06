# MEMORY.md - World Monitor 项目长期记忆

## 项目概述

World Monitor 是一个复杂的全栈应用，用于监控全球各类事件（军事、气候、经济、地缘政治等）。

### 技术栈

- **前端**: TypeScript + Vite + deck.gl + MapLibre GL + D3
- **后端**: Node.js (sebuf protobuf 框架) + Vercel Edge Functions
- **缓存**: Upstash Redis
- **桌面**: Tauri (Rust)
- **测试**: Vitest + Playwright
- **部署**: Vercel + Railway

## 2026-04-06 技术提升工作

### 创建的配置文件

| 文件 | 说明 |
|------|------|
| `.eslintrc.json` | ESLint TypeScript 配置 |
| `.prettierrc` | 代码格式化配置 |
| `eslint.config.mjs` | ESLint 9 flat config |
| `.gitignore` | Git 忽略文件 |
| `vitest.config.ts` | 单元测试配置 |
| `.github/workflows/ci.yml` | GitHub Actions CI 配置 |

### 创建的测试文件

| 文件 | 说明 |
|------|------|
| `tests/unit/utils.test.ts` | formatTime 单元测试 |
| `tests/unit/utils-functions.test.ts` | 工具函数单元测试 |
| `tests/unit/rss.test.ts` | RSS 服务测试 |

### 创建的文档

| 文档 | 说明 |
|------|------|
| `docs/CODE_STANDARDS.md` | 完整代码规范 |
| `docs/CODE_REVIEW_GUIDE.md` | 代码审查指南 |
| `docs/API_MIGRATION_GUIDE.md` | API 迁移指南 |
| `docs/PERFORMANCE_GUIDE.md` | 性能优化指南 |
| `docs/LEARNING_PATH.md` | 团队学习路径 |
| `docs/README.md` | 文档索引 |

### package.json 更新

添加的脚本：
- `lint` / `lint:fix` - ESLint 检查和修复
- `format` / `format:check` - Prettier 格式化和检查
- `test:unit` - 单元测试
- `test:coverage` - 带覆盖率的测试
- `test:ci` - CI 环境测试

添加的依赖：
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@vitest/coverage-v8`
- `eslint`
- `eslint-import-resolver-typescript`
- `eslint-plugin-import`
- `prettier`
- `vitest`

## 团队技术提升建议

### 短期目标（1-2周）
1. 安装新依赖并运行测试
2. 启用 CI/CD 工作流
3. 建立代码审查流程

### 中期目标（1-2月）
1. API 层迁移到 TypeScript
2. 增加单元测试覆盖率
3. 建立性能基线监控

### 长期目标（持续）
1. 完善文档和培训材料
2. 定期技术分享
3. 持续优化代码质量

## 项目特性

### 做得好的地方
- TypeScript 严格模式配置完善
- protobuf 代码生成使用 sebuf
- 缓存策略设计合理（Redis + 内存缓存）
- 有完整的集成测试
- 错误处理和降级策略完善

### 需要改进的地方
- 缺少 ESLint/Prettier
- 缺少单元测试
- 缺少 CI/CD
- API 层混合 JS/TS
- 文档不够完善
