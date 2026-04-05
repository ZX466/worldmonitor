# 🇨🇳 World Monitor 中国网络环境配置指南

本指南帮助你在中国网络环境下顺利运行 World Monitor。

---

## 🚀 快速开始

### 1. 配置 npm 镜像源

```powershell
# 使用淘宝 npm 镜像（推荐）
npm config set registry https://registry.npmmirror.com

# 验证配置
npm config get registry
```

### 2. 安装依赖

```powershell
cd D:\aidevelop\project6\worldmonitor
npm install
```

### 3. 启动开发服务器

```powershell
npm run dev
```

访问 http://localhost:5173 即可看到应用！

---

## 🗺️ 地图数据源配置

### 方案对比

| 方案 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **本地瓦片** | 完全离线，速度快 | 需要下载瓦片 | ⭐⭐⭐⭐⭐ |
| **高德地图** | 国内访问快 | 需要 API Key | ⭐⭐⭐⭐ |
| **百度地图** | 国内访问快 | 需要 API Key | ⭐⭐⭐⭐ |
| **OpenStreetMap 镜像** | 免费 | 速度一般 | ⭐⭐⭐ |

### 方案 A：使用高德地图（推荐）

1. 注册高德开放平台：https://lbs.amap.com/
2. 创建应用，获取 API Key
3. 修改 `.env.local`：

```env
VITE_MAP_STYLE_URL=https://webrd02.is.autonavi.com/style/amap://styles/normal?key=你的API_KEY
```

### 方案 B：使用本地离线地图（最佳）

1. 下载 OpenStreetMap 中国区域瓦片
2. 放在 `public/tiles/` 目录
3. 修改配置使用本地瓦片

### 方案 C：使用 OSM 国内镜像

```env
VITE_MAP_STYLE_URL=https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

---

## 📰 新闻源配置

项目默认包含 150+ RSS 源，其中部分在中国可能无法访问。

### 已有的中文新闻源

项目已配置以下中文源：
- 工信部 (MIIT)
- 商务部 (MOFCOM)
- 以及更多...

### 添加更多中文新闻源

编辑 `src/config/feeds.ts`，在相应分类中添加：

```typescript
{
  id: 'my-chinese-source',
  name: '中文新闻源',
  url: 'https://example.com/rss',
  lang: 'zh',
  category: 'geopolitics',
  tier: 1,
  enabled: true,
}
```

---

## 🤖 AI 功能配置

### 使用本地 Ollama（推荐，完全免费）

1. 下载安装 Ollama：https://ollama.com/
2. 拉取模型：
   ```powershell
   ollama pull llama3.1:8b
   ```
3. 启动 Ollama 服务
4. 在 World Monitor 设置中配置：
   - Ollama 地址：`http://localhost:11434`
   - 模型：`llama3.1:8b`

### 使用国内 AI 服务

可以配置以下国内 AI 服务替代 Groq/OpenRouter：

| 服务 | 说明 |
|------|------|
| **智谱 AI** | 支持 OpenAI 兼容接口 |
| **通义千问** | 阿里出品 |
| **文心一言** | 百度出品 |
| **讯飞星火** | 科大讯飞 |

配置示例（使用智谱 AI）：

```env
# 在设置中配置
LLM_API_URL=https://open.bigmodel.cn/api/paas/v4/
LLM_MODEL=glm-4
```

---

## 📹 视频流配置

YouTube 直播流在中国无法访问，建议：

### 方案 A：使用国内直播源

在 `src/config/live-channels-main.ts` 中添加国内直播源：

```typescript
{
  id: 'cctv-news',
  name: '央视新闻',
  youtubeId: '', // 留空
  hlsUrl: 'https://example.com/cctv-news.m3u8',
  region: 'asia',
  enabled: true,
}
```

### 方案 B：禁用视频功能

如果不需要视频，可以在设置中隐藏直播面板。

---

## 🔧 常见问题解决

### 问题 1：npm install 很慢

**解决方案**：使用淘宝镜像源（已在第一步配置）

### 问题 2：地图加载不出来

**解决方案**：
1. 检查网络连接
2. 尝试使用国内地图源（高德/百度）
3. 或使用离线地图瓦片

### 问题 3：某些新闻源无法加载

**解决方案**：
1. 在设置中禁用无法访问的源
2. 添加替代的中文新闻源

### 问题 4：AI 功能无法使用

**解决方案**：
1. 使用本地 Ollama（推荐）
2. 或配置国内 AI 服务

---

## 🚀 部署到国内服务器

如果需要部署到国内服务器（阿里云/腾讯云等）：

### 1. 构建项目

```powershell
npm run build
```

### 2. 部署到静态托管

可以部署到：
- 阿里云 OSS + CDN
- 腾讯云 COS + CDN
- Vercel 中国区
- Netlify 中国区

### 3. 后端服务部署

如果需要完整功能，建议：
- API 服务部署到国内服务器
- Redis 使用阿里云 Redis 或腾讯云 Redis
- 使用国内 CDN 加速静态资源

---

## 📚 进阶配置

### 配置本地代理（开发时）

如果需要访问国外资源，可以配置代理：

```powershell
# 设置 npm 代理
npm config set proxy http://127.0.0.1:7890
npm config set https-proxy http://127.0.0.1:7890

# 设置 git 代理
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
```

### 使用桌面应用（推荐）

Tauri 桌面应用在中国体验更好：

```powershell
# 构建桌面应用
npm run desktop:build:full
```

桌面应用优势：
- 可以更好地集成本地 Ollama
- 可以配置系统级代理
- 离线功能更强大

---

## 🎉 总结

在中国使用 World Monitor 的最佳实践：

1. ✅ 使用淘宝 npm 镜像
2. ✅ 使用国内地图服务（高德/百度）或离线地图
3. ✅ 使用本地 Ollama 进行 AI 处理
4. ✅ 添加中文新闻源
5. ✅ 考虑使用桌面应用版本

---

## 🆘 需要帮助？

如果遇到问题，可以：
1. 查看项目 README.md
2. 检查浏览器控制台错误
3. 查看网络请求状态

祝你使用愉快！🎉
