# World Monitor 技术文档

## 📚 文档索引

### 开发指南

| 文档 | 说明 |
|------|------|
| [代码规范](./CODE_STANDARDS.md) | TypeScript、命名约定、组件规范、测试规范 |
| [代码审查指南](./CODE_REVIEW_GUIDE.md) | PR 审查流程、检查清单、反馈模板 |
| [API 迁移指南](./API_MIGRATION_GUIDE.md) | 将 api/ 目录从 JS 迁移到 TS |
| [性能优化指南](./PERFORMANCE_GUIDE.md) | 前端、后端、数据处理性能优化 |
| [团队学习路径](./LEARNING_PATH.md) | 技能提升计划、学习资源、成长路径 |

### 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行类型检查
npm run typecheck

# 运行测试
npm run test
```

### 常用命令

```bash
# 代码质量
npm run lint          # ESLint 检查
npm run lint:fix      # 自动修复 ESLint 问题
npm run format        # Prettier 格式化

# 测试
npm run test          # 单元测试
npm run test:unit     # 单元测试
npm run test:coverage # 带覆盖率报告

# 构建
npm run build:full    # 构建全量版本
npm run build:tech    # 构建技术版本
npm run build:finance # 构建金融版本

# 桌面应用
npm run desktop:dev   # 开发桌面版
npm run desktop:build # 构建桌面版
```

### 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | TypeScript + Vite |
| UI 组件 | 自定义 + deck.gl |
| 状态管理 | 模块化服务 |
| 后端 | Node.js + Edge Functions |
| 缓存 | Upstash Redis |
| 桌面 | Tauri (Rust) |
| 测试 | Vitest + Playwright |

### 代码组织

```
src/
├── app/           # 应用入口
├── components/    # UI 组件
├── config/        # 配置文件
├── services/      # 业务逻辑服务
├── types/         # 类型定义
├── utils/         # 工具函数
└── workers/       # Web Workers

server/
├── worldmonitor/  # protobuf 生成的服务
└── _shared/       # 共享模块

api/
├── rss-proxy.ts   # RSS 代理
├── story.ts       # 新闻故事
└── _cors.ts       # CORS 配置
```

### 学习资源

1. [TypeScript Handbook](https://www.typescriptlang.org/docs/)
2. [deck.gl Documentation](https://deck.gl/docs/)
3. [Vite Guide](https://vitejs.dev/guide/)
4. [Vitest Guide](https://vitest.dev/guide/)

### 获取帮助

- 查看现有代码了解模式
- 提交 Issue 描述问题
- 参与代码审查学习
- 加入技术讨论
