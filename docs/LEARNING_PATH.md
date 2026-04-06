# 团队学习路径

## 概述

本学习路径帮助团队成员系统性地提升技术能力，涵盖前端、后端、性能优化和软技能。

---

## 学习阶段

### 阶段 1：基础知识（1-2 周）

#### 必须掌握

| 技能 | 学习资源 | 验证方式 |
|------|---------|---------|
| TypeScript 高级特性 | [TypeScript Handbook](https://www.typescriptlang.org/docs/) | 通过 `tsc --strict` 检查 |
| ES2020+ 新特性 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) | 能在项目中实际使用 |
| Git 高级操作 | [Pro Git](https://git-scm.com/book/en/v2) | 熟练使用 rebase, cherry-pick |
| 命令行熟练度 | Linux 常用命令速查表 | 能在终端高效工作 |

#### 实践任务

- [ ] 完成 1 个功能模块的重构
- [ ] 提交 5 个 PR 并通过审查
- [ ] 编写 3 个单元测试

---

### 阶段 2：前端深度（2-4 周）

#### 必须掌握

| 技能 | 学习资源 | 验证方式 |
|------|---------|---------|
| Vite 构建原理 | [Vite 官方文档](https://vitejs.dev/guide/) | 能配置自定义插件 |
| Deck.gl 进阶 | [Deck.gl 文档](https://deck.gl/docs/) | 实现自定义图层 |
| WebGL 基础 | [WebGL 教程](https://webglfundamentals.org/) | 理解着色器原理 |
| 性能优化 | [前端性能清单](https://github.com/thedaviddias/Front-End-Performance-Checklist) | Lighthouse > 90 |

#### 进阶主题

```typescript
// 1. 自定义 Deck.gl 图层
import { Layer } from '@deck.gl/core';

export class CustomMarkerLayer extends Layer {
  static layerName = 'CustomMarkerLayer';

  getShaders() {
    return {
      ...super.getShaders(),
      glsl: {
        vertex: `
          precision highp float;
          attribute vec3 position;
          attribute vec3 instancePosition;
          attribute float instanceRadius;

          uniform mat4 projection;
          uniform mat4 view;
          uniform float zoom;

          varying vec2 vOffset;

          void main() {
            vec4 offset = vec4(position.xy * instanceRadius / zoom + instancePosition.xy, 0, 1);
            gl_Position = projection * view * offset;
            vOffset = position.xy;
          }
        `,
      },
    };
  }
}
```

#### 实践任务

- [ ] 实现一个新的 Map 图层
- [ ] 优化一个页面的渲染性能
- [ ] 添加 Web Vitals 监控

---

### 阶段 3：后端与服务（2-4 周）

#### 必须掌握

| 技能 | 学习资源 | 验证方式 |
|------|---------|---------|
| Node.js 异步模式 | [Node.js 异步编程](https://nodejs.org/en/learn/asynchronous-work/) | 正确使用 Promise/async-await |
| Redis 缓存策略 | [Redis 最佳实践](https://redis.io/docs/optimize/) | 设计多层缓存方案 |
| Edge Functions | [Vercel Edge](https://vercel.com/docs/functions/edge-functions) | 迁移一个 API 到 Edge |
| Protobuf/gRPC | [Protobuf 教程](https://developers.google.com/protocol-buffers) | 理解 sebuf 代码生成 |

#### 实践任务

- [ ] 优化一个 API 的缓存策略
- [ ] 实现一个新的 Edge Function
- [ ] 编写 API 集成测试

---

### 阶段 4：架构与设计（持续）

#### 设计原则

1. **SOLID 原则**
   - Single Responsibility (单一职责)
   - Open/Closed (开闭原则)
   - Liskov Substitution (里氏替换)
   - Interface Segregation (接口隔离)
   - Dependency Inversion (依赖反转)

2. **DRY/KISS/YAGNI**
   - Don't Repeat Yourself
   - Keep It Simple, Stupid
   - You Aren't Gonna Need It

#### 系统设计

```typescript
// 示例：设计一个可扩展的服务模块

// 1. 定义接口
interface DataFetcher<T> {
  fetch(): Promise<T>;
  getCacheKey(): string;
  getTTL(): number;
}

// 2. 实现基础类
abstract class BaseFetcher<T> implements DataFetcher<T> {
  abstract fetch(): Promise<T>;
  abstract getCacheKey(): string;
  getTTL(): number { return 300; }

  async fetchWithCache(): Promise<T> {
    return cachedFetchJson(
      this.getCacheKey(),
      this.getTTL(),
      () => this.fetch()
    );
  }
}

// 3. 具体实现
class MilitaryFlightFetcher extends BaseFetcher<MilitaryFlights> {
  getCacheKey(): string {
    return `military:flights:${this.region}`;
  }

  getTTL(): number {
    return 60; // 实时数据，TTL 较短
  }
}
```

#### 实践任务

- [ ] 设计一个功能的架构方案
- [ ] 编写技术设计文档
- [ ] 进行代码审查

---

## 学习资源

### 在线课程

| 课程 | 平台 | 费用 |
|------|------|------|
| TypeScript 进阶 | TypeScript 官网 | 免费 |
| WebGL 入门 | WebGL Fundamentals | 免费 |
| 系统设计 | Designing Data-Intensive Applications | 付费 |
| 性能优化 | Web.dev | 免费 |

### 书籍推荐

| 书名 | 主题 | 难度 |
|------|------|------|
| 《Effective TypeScript》 | TypeScript 最佳实践 | 中级 |
| 《高性能网站建设指南》 | 前端性能 | 初级 |
| 《Designing Data-Intensive Applications》 | 分布式系统 | 高级 |
| 《Clean Code》 | 代码质量 | 中级 |

### 技术博客

- [Vercel Blog](https://vercel.com/blog)
- [deck.gl Blog](https://deck.gl/docs/)
- [Web.dev](https://web.dev/blog)
- [Sentry Blog](https://blog.sentry.io/)

---

## 内部知识分享

### 每周技术分享

每两周一次 30 分钟的内部分享会：

1. **闪电演讲** (10 min)
   - 最近解决的一个技术问题
   - 发现的一个新工具

2. **深度分享** (20 min)
   - 一个技术主题的深入讲解
   - 项目架构讨论

### 代码实验室

每周五下午 2-4 点：

- 自由探索新技术
- 结对编程
- 重构遗留代码

---

## 技能评估

### 评估维度

| 维度 | 说明 | 评估方法 |
|------|------|---------|
| 理解力 | 理解现有代码和架构 | 代码审查参与度 |
| 实现力 | 独立完成任务 | PR 合并率 |
| 优化力 | 发现并解决性能问题 | Lighthouse 分数变化 |
| 教导力 | 帮助他人成长 | 指导其他成员 |

### 成长路径

```
初级开发者
    ↓
能够独立完成功能模块
    ↓
高级开发者
    ↓
能够设计系统架构
    ↓
技术负责人
    ↓
架构师/技术专家
```

---

## 持续学习

### 技术跟进

- 订阅技术周刊（JavaScript Weekly, CSS Weekly）
- 关注 TypeScript 博客和 Release Notes
- 参与开源项目

### 实践项目

- 每月一个小工具/脚本
- 每季度一个 Side Project
- 每年参与一个开源贡献

---

## 学习路线图

```
Q1: 打好基础
├── TypeScript 进阶
├── 测试驱动开发
└── 代码审查入门

Q2: 深入前端
├── Deck.gl 高级应用
├── WebGL 入门
└── 性能优化实战

Q3: 扩展后端
├── Edge Functions
├── Redis 高级特性
└── API 设计

Q4: 系统设计
├── 架构模式
├── 安全性
└── 可扩展性
```
