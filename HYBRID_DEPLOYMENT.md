# World Monitor 混合部署指南

## 📋 部署架构

```
┌─────────────────┐          ┌─────────────────┐
│   阿里云服务器    │          │    Vercel       │
│  (前端静态文件)   │  ──API──▶│   (API 服务)    │
│   IP:3000       │          │  免费托管       │
└─────────────────┘          └─────────────────┘
```

**优势**：
- ✅ 前端部署在国内，访问速度快
- ✅ API 部署在 Vercel，免费且稳定
- ✅ 全球 CDN 加速 API 请求
- ✅ 无需维护后端服务器

---

## 🚀 部署步骤

### 第一步：部署 API 到 Vercel

#### 1.1 准备工作

1. **注册 Vercel 账号**
   - 访问：https://vercel.com/
   - 使用 GitHub 账号登录（推荐）

2. **安装 Vercel CLI**（可选）
   ```bash
   npm install -g vercel
   ```

#### 1.2 部署方式

**方式一：通过 GitHub 自动部署（推荐）**

1. 将项目推送到 GitHub
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/worldmonitor.git
   git push -u origin main
   ```

2. 在 Vercel 导入项目
   - 访问：https://vercel.com/new
   - 选择 GitHub 仓库
   - 点击 "Import"

3. 配置项目
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build:full`
   - **Output Directory**: `dist`

4. 配置环境变量
   在 Vercel Dashboard → Settings → Environment Variables 中添加：
   
   ```
   GROQ_API_KEY=your_groq_api_key
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

5. 点击 "Deploy"

**方式二：通过 CLI 部署**

```bash
# 登录 Vercel
vercel login

# 部署项目
vercel --prod

# 设置环境变量
vercel env add GROQ_API_KEY
vercel env add UPSTASH_REDIS_REST_URL
vercel env add UPSTASH_REDIS_REST_TOKEN
```

#### 1.3 获取 API 地址

部署完成后，Vercel 会提供一个 URL：
```
https://worldmonitor-api.vercel.app
```

---

### 第二步：配置前端连接 Vercel API

#### 2.1 修改环境变量

编辑 `.env.production` 文件：

```bash
# Vercel API 地址
VITE_WS_API_URL=https://worldmonitor-api.vercel.app
```

#### 2.2 重新构建前端

```bash
# 安装依赖
npm ci --include=dev

# 构建
npm run build:full

# 安装生产依赖
npm ci --only=production
npm install vite
```

---

### 第三步：部署前端到阿里云

#### 3.1 上传项目

```bash
# 排除 node_modules 上传
scp -r --exclude='node_modules' d:\aidevelop\project6\worldmonitor root@你的服务器IP:/root/
```

#### 3.2 运行部署脚本

```bash
# SSH 连接服务器
ssh root@你的服务器IP

# 进入项目目录
cd /root/worldmonitor

# 运行部署脚本
chmod +x deploy.sh
sudo ./deploy.sh
```

#### 3.3 验证部署

访问：`http://你的服务器IP:3000`

---

## 🔧 配置说明

### Vercel 环境变量

| 变量名 | 必需 | 说明 | 获取方式 |
|--------|------|------|---------|
| `GROQ_API_KEY` | ✅ 推荐 | AI 摘要服务 | https://console.groq.com/ |
| `UPSTASH_REDIS_REST_URL` | ⚠️ 可选 | 缓存服务 | https://upstash.com/ |
| `UPSTASH_REDIS_REST_TOKEN` | ⚠️ 可选 | 缓存令牌 | https://upstash.com/ |
| `FINNHUB_API_KEY` | ⚠️ 可选 | 股票数据 | https://finnhub.io/ |
| `EIA_API_KEY` | ⚠️ 可选 | 能源数据 | https://www.eia.gov/opendata/ |
| `FRED_API_KEY` | ⚠️ 可选 | 经济数据 | https://fred.stlouisfed.org/ |

### 前端环境变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `VITE_WS_API_URL` | Vercel API 地址 | `https://worldmonitor-api.vercel.app` |
| `HOST` | 服务器监听地址 | `0.0.0.0` |
| `PORT` | 服务器端口 | `3000` |

---

## 🌐 域名配置（可选）

### 配置自定义域名

#### Vercel API 域名

1. 在 Vercel Dashboard → Settings → Domains
2. 添加域名：`api.yourdomain.com`
3. 配置 DNS CNAME 记录：
   ```
   api.yourdomain.com → cname.vercel-dns.com
   ```

#### 阿里云前端域名

1. 在阿里云域名解析中添加 A 记录：
   ```
   www.yourdomain.com → 你的服务器IP
   ```

2. 配置 Nginx（如需 HTTPS）：
   ```bash
   # 安装 certbot
   sudo apt install certbot python3-certbot-nginx
   
   # 申请 SSL 证书
   sudo certbot --nginx -d www.yourdomain.com
   ```

---

## 📊 监控与维护

### Vercel 监控

- **访问日志**：Vercel Dashboard → Logs
- **性能监控**：Vercel Dashboard → Analytics
- **错误追踪**：Vercel Dashboard → Deployments

### 阿里云监控

```bash
# 查看应用状态
pm2 status

# 查看日志
pm2 logs worldmonitor

# 查看系统资源
htop
```

---

## 🔄 更新部署

### 更新 API（Vercel）

```bash
# 方式一：推送代码到 GitHub（自动部署）
git add .
git commit -m "Update API"
git push

# 方式二：使用 CLI
vercel --prod
```

### 更新前端（阿里云）

```bash
# 本地构建
npm run build:full

# 上传到服务器
scp -r dist root@你的服务器IP:/opt/worldmonitor/

# 重启服务
ssh root@你的服务器IP
pm2 restart worldmonitor
```

---

## 🚨 故障排除

### API 请求失败

**问题**：前端无法连接到 Vercel API

**解决方案**：
1. 检查 `VITE_WS_API_URL` 是否正确
2. 检查 Vercel 项目是否正常运行
3. 检查 CORS 配置

### Vercel 部署失败

**问题**：Vercel 部署报错

**解决方案**：
1. 检查 Build Command 是否正确
2. 检查环境变量是否配置
3. 查看 Vercel 构建日志

### 性能问题

**问题**：API 响应慢

**解决方案**：
1. 配置 Upstash Redis 缓存
2. 检查 Vercel 函数执行时间
3. 优化 API 请求频率

---

## 💰 成本估算

| 服务 | 费用 | 说明 |
|------|------|------|
| Vercel | 免费 | Hobby 计划，足够个人使用 |
| Upstash Redis | 免费 | 免费层 10,000 请求/天 |
| Groq API | 免费 | 免费层 14,400 请求/天 |
| 阿里云服务器 | ¥24/月起 | 轻量应用服务器 |
| **总计** | **¥24/月起** | |

---

## ✅ 部署检查清单

- [ ] Vercel 账号注册完成
- [ ] API 部署到 Vercel 成功
- [ ] Vercel 环境变量配置完成
- [ ] 前端环境变量 `VITE_WS_API_URL` 配置正确
- [ ] 前端部署到阿里云成功
- [ ] 可以通过 IP:3000 访问前端
- [ ] API 请求正常工作
- [ ] AI 摘要功能正常

---

## 📞 获取帮助

- **Vercel 文档**：https://vercel.com/docs
- **项目 Issues**：https://github.com/koala73/worldmonitor/issues
- **部署文档**：[DEPLOYMENT.md](DEPLOYMENT.md)

---

**恭喜！混合部署配置完成！** 🎉
