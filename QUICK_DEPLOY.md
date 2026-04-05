# 🚀 World Monitor 快速部署指南

## 📋 部署流程概览

```
本地代码 → GitHub → Vercel (API) → 阿里云前端连接 Vercel API
```

---

## 第一步：推送代码到 GitHub

### 1.1 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `worldmonitor`
   - **Description**: `实时全球情报仪表板`
   - **Visibility**: Public（公开，Vercel 免费版需要）
3. 点击 **Create repository**

### 1.2 推送代码到 GitHub

在本地终端执行以下命令：

```powershell
# 添加远程仓库（替换为你的 GitHub 用户名）
git remote add origin https://github.com/你的用户名/worldmonitor.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

---

## 第二步：部署到 Vercel

### 2.1 导入项目到 Vercel

1. 访问 https://vercel.com/new
2. 点击 **Import Git Repository**
3. 选择你刚才创建的 `worldmonitor` 仓库
4. 点击 **Import**

### 2.2 配置项目

在 Vercel 配置页面：

| 配置项 | 值 |
|--------|-----|
| **Framework Preset** | Vite |
| **Root Directory** | `./` |
| **Build Command** | `npm run build:full` |
| **Output Directory** | `dist` |
| **Install Command** | `npm ci` |

### 2.3 配置环境变量

在 **Environment Variables** 部分添加以下变量：

#### 必需变量（推荐）

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `GROQ_API_KEY` | 你的 Groq API Key | AI 摘要功能 |
| `UPSTASH_REDIS_REST_URL` | 你的 Redis URL | 缓存服务 |
| `UPSTASH_REDIS_REST_TOKEN` | 你的 Redis Token | 缓存服务 |

#### 可选变量

| 变量名 | 说明 | 获取地址 |
|--------|------|---------|
| `FINNHUB_API_KEY` | 股票数据 | https://finnhub.io/ |
| `EIA_API_KEY` | 能源数据 | https://www.eia.gov/opendata/ |
| `FRED_API_KEY` | 经济数据 | https://fred.stlouisfed.org/ |
| `NASA_FIRMS_API_KEY` | 火灾检测 | https://firms.modaps.eosdis.nasa.gov/ |
| `ACLED_ACCESS_TOKEN` | 冲突数据 | https://acleddata.com/ |

### 2.4 部署

1. 点击 **Deploy**
2. 等待部署完成（约 2-5 分钟）
3. 部署成功后，Vercel 会提供一个 URL：
   ```
   https://worldmonitor-xxx.vercel.app
   ```

---

## 第三步：更新前端配置

### 3.1 修改环境变量

编辑 `.env.production` 文件：

```bash
# 将 VITE_WS_API_URL 改为你的 Vercel URL
VITE_WS_API_URL=https://worldmonitor-xxx.vercel.app
```

### 3.2 重新构建前端

```powershell
# 安装依赖
npm ci --include=dev

# 构建
npm run build:full

# 安装生产依赖
npm ci --only=production
npm install vite
```

### 3.3 上传到阿里云服务器

```powershell
# 上传 dist 目录
scp -r dist root@8.130.55.194:/opt/worldmonitor/

# 重启服务
ssh root@8.130.55.194 "pm2 restart worldmonitor"
```

---

## 第四步：验证部署

### 4.1 测试 API

访问你的 Vercel URL：
```
https://worldmonitor-xxx.vercel.app/api/news/v1/list-feed-digest
```

如果返回 JSON 数据，说明 API 部署成功。

### 4.2 测试前端

访问阿里云前端：
```
http://8.130.55.194:3000
```

检查：
- ✅ 新闻数据是否正常加载
- ✅ 市场数据是否正常显示
- ✅ AI 摘要功能是否可用

---

## 🔧 常见问题

### Q1: Vercel 部署失败

**解决方案**：
1. 检查 Build Command 是否正确
2. 查看 Vercel 构建日志
3. 确保所有依赖都在 package.json 中

### Q2: API 请求跨域错误

**解决方案**：
- Vercel 会自动处理 CORS，无需额外配置

### Q3: 环境变量不生效

**解决方案**：
1. 在 Vercel Dashboard → Settings → Environment Variables 中添加
2. 重新部署项目

### Q4: 前端无法连接 API

**解决方案**：
1. 检查 `VITE_WS_API_URL` 是否正确
2. 确保 Vercel 项目正常运行
3. 检查浏览器控制台是否有错误

---

## 📊 成本估算

| 服务 | 费用 | 说明 |
|------|------|------|
| Vercel | 免费 | Hobby 计划 |
| Upstash Redis | 免费 | 10,000 请求/天 |
| Groq API | 免费 | 14,400 请求/天 |
| 阿里云服务器 | ¥24/月 | 轻量应用服务器 |
| **总计** | **¥24/月** | |

---

## ✅ 部署检查清单

- [ ] GitHub 仓库创建完成
- [ ] 代码推送到 GitHub
- [ ] Vercel 项目导入完成
- [ ] 环境变量配置完成
- [ ] Vercel 部署成功
- [ ] 前端环境变量更新
- [ ] 前端重新构建
- [ ] 前端上传到阿里云
- [ ] 服务重启
- [ ] 功能验证通过

---

## 🎯 下一步

部署完成后，你可以：

1. **配置自定义域名**（可选）
   - Vercel: `api.yourdomain.com`
   - 阿里云: `www.yourdomain.com`

2. **配置 HTTPS**（推荐）
   - Vercel 自动提供 HTTPS
   - 阿里云使用 Let's Encrypt 免费证书

3. **监控和维护**
   - Vercel Dashboard 查看日志
   - PM2 监控前端服务

---

**需要帮助？**
- Vercel 文档: https://vercel.com/docs
- 项目 Issues: https://github.com/koala73/worldmonitor/issues
