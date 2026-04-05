# World Monitor 部署说明

## 项目概述

World Monitor 是一个实时全球情报仪表板，提供 AI 驱动的新闻聚合、地缘政治监控和基础设施跟踪。

## 快速部署

### 阿里云轻量应用服务器 (Ubuntu 24.04)

```bash
# 1. 上传项目（排除 node_modules）
scp -r --exclude='node_modules' ./worldmonitor root@你的服务器IP:/root/

# 2. 运行部署脚本
ssh root@你的服务器IP
cd /root/worldmonitor
chmod +x deploy.sh
sudo ./deploy.sh

# 3. 访问应用
# http://你的服务器IP:3000
```

## 文件说明

| 文件 | 说明 |
|------|------|
| `deploy.sh` | 一键部署脚本 |
| `ecosystem.config.js` | PM2 进程管理配置 |
| `worldmonitor.service` | Systemd 服务配置 |
| `nginx.conf` | Nginx 反向代理配置（可选） |
| `.env.production` | 生产环境变量配置 |

## 环境变量配置

编辑 `.env.production` 文件，配置必要的 API 密钥：

```bash
# AI 摘要（可选）
GROQ_API_KEY=your_key

# 缓存（可选）
UPSTASH_REDIS_REST_URL=your_url
UPSTASH_REDIS_REST_TOKEN=your_token
```

## 常用命令

```bash
# 查看状态
pm2 status

# 查看日志
pm2 logs worldmonitor

# 重启应用
pm2 restart worldmonitor

# 停止应用
pm2 stop worldmonitor
```

## 项目大小限制

- **源码大小**: 约 15-20 MB
- **限制要求**: 项目修改后总大小不超过 100 MB
- **注意**: `node_modules` 目录不计入项目大小

## 目录结构

```
worldmonitor/
├── src/              # 前端源代码
├── server/           # 服务端代码
├── public/           # 静态资源
├── deploy.sh         # 部署脚本
├── ecosystem.config.js
├── nginx.conf
├── worldmonitor.service
└── .env.production
```

## 故障排除

### 应用无法启动
```bash
pm2 logs worldmonitor
```

### 端口被占用
```bash
sudo lsof -i :3000
```

### 防火墙问题
```bash
sudo ufw allow 3000/tcp
```

## 技术栈

- 前端: TypeScript, Vite, MapLibre GL JS, deck.gl
- 后端: Node.js, Vite 插件
- 进程管理: PM2
- 反向代理: Nginx（可选）

## 许可证

AGPL-3.0
