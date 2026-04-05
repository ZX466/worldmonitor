# 🚀 World Monitor 体积优化指南

## 📊 项目体积分析

当前构建后：
- 文件数量：132 个
- 总体积：10.01 MB

### 大型文件分析
| 文件 | 大小 | 说明 |
|------|------|------|
| panels-CXl65K7u.js | 1.22 MB | 面板功能模块 |
| deck-stack-BPZ27_H4.js | 0.98 MB | Deck.gl 堆叠图层 |
| maplibre-BFL4jrZu.js | 0.97 MB | MapLibre 地图库 |
| ml.worker-DcQY624c.js | 0.79 MB | 机器学习 Worker |
| main-KSr88Kga.js | 0.59 MB | 主应用逻辑 |

## 🔧 体积优化策略

### 1. 环境变量优化
使用 `.env.minimal` 配置：
```env
VITE_DISABLE_ML_WORKER=true
VITE_SIMPLE_MAP_LAYERS=true
VITE_DISABLE_ANALYTICS=true
VITE_MINIMAL_FEEDS=true
```

### 2. 功能裁剪

#### 机器学习功能
- ML Worker 占用 0.79 MB
- 通过 `VITE_DISABLE_ML_WORKER` 环境变量禁用

#### 地图功能
- 使用简化地图样式
- 移除复杂图层

#### 分析功能
- 禁用 Sentry 错误追踪
- 禁用 Vercel Analytics

### 3. 依赖优化

#### 可选依赖移除
- @sentry/browser (错误追踪)
- @vercel/analytics (分析)

## 📦 轻量化构建

### 构建命令
```bash
# 使用轻量化配置
cp .env.minimal .env.local
npm run build
```

### 或使用脚本
```bash
./build-minimal.sh
```

## 🎯 预期效果

优化后预计：
- 文件数量：~80 个
- 总体积：~4-6 MB
- 减少约 40-60% 体积

## 🚀 部署建议

对轻量服务器的部署建议：
1. 使用轻量化构建
2. 只部署 dist 目录
3. 使用 Nginx 作为静态文件服务器
4. 启用 Gzip/Brotli 压缩

## 💡 其他优化选项

### 更激进的优化
如果需要更小的体积：
- 完全移除地图功能
- 只保留基础 UI
- 使用更简单的地图库

### 按需加载
- 实现懒加载功能模块
- 动态导入非必需组件

---

通过这些优化，项目应该更适合在轻量服务器上部署！