# World Monitor 阿里云轻量应用服务器部署指南

## 📋 部署概述

本指南将帮助您在阿里云轻量应用服务器（Ubuntu 24.04）上部署 World Monitor，通过 IP:3000 端口访问。

## 🚀 快速部署（推荐）

### 一键部署脚本

1. **上传项目文件到服务器**
   ```bash
   # 在本地机器上
   scp -r /path/to/worldmonitor root@your-server-ip:/root/
   ```

2. **运行部署脚本**
   ```bash
   # SSH 连接到服务器
   ssh root@your-server-ip
   
   # 进入项目目录
   cd /root/worldmonitor
   
   # 添加执行权限
   chmod +x deploy.sh
   
   # 运行部署脚本
   sudo ./deploy.sh
   ```

3. **访问应用**
   ```
   http://your-server-ip:3000
   ```

## 📝 详细部署步骤

### 1. 服务器准备

#### 1.1 连接服务器
```bash
ssh root@your-server-ip
```

#### 1.2 更新系统
```bash
sudo apt update && sudo apt upgrade -y
```

#### 1.3 安装必要工具
```bash
sudo apt install -y curl wget git build-essential
```

### 2. 安装 Node.js

```bash
# 安装 Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo bash -
sudo apt install -y nodejs

# 验证安装
node --version
npm --version
```

### 3. 安装 PM2（进程管理器）

```bash
sudo npm install -g pm2
```

### 4. 上传项目文件

```bash
# 方法一：使用 scp（在本地机器上执行）
scp -r /path/to/worldmonitor root@your-server-ip:/opt/

# 方法二：使用 git clone
cd /opt
git clone https://github.com/koala73/worldmonitor.git
cd worldmonitor
```

### 5. 配置环境变量

```bash
# 复制环境变量模板
cp .env.production .env

# 编辑环境变量
nano .env
```

**重要配置项：**
```bash
# 服务器配置
HOST=0.0.0.0
PORT=3000
NODE_ENV=production

# AI 摘要配置（可选）
GROQ_API_KEY=your_groq_api_key
OPENROUTER_API_KEY=your_openrouter_api_key

# 缓存配置（可选）
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### 6. 安装依赖并构建

```bash
# 进入项目目录
cd /opt/worldmonitor

# 安装开发依赖（用于构建）
npm ci --include=dev

# 构建应用
npm run build:full

# 安装生产依赖
npm ci --only=production

# 安装 vite（用于 preview 服务）
npm install vite
```

### 7. 启动应用

#### 方法一：使用 PM2（推荐）

```bash
# 创建日志目录
mkdir -p logs

# 启动应用
pm2 start ecosystem.config.js --env production

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup systemd
```

#### 方法二：使用 systemd

```bash
# 复制服务文件
sudo cp worldmonitor.service /etc/systemd/system/

# 重载 systemd
sudo systemctl daemon-reload

# 启用开机自启
sudo systemctl enable worldmonitor

# 启动服务
sudo systemctl start worldmonitor
```

### 8. 配置防火墙

```bash
# 开放 3000 端口
sudo ufw allow 3000/tcp

# 开放 SSH 端口（如果还没开放）
sudo ufw allow 22/tcp

# 启用防火墙
sudo ufw enable

# 查看防火墙状态
sudo ufw status
```

### 9. 验证部署

```bash
# 检查应用状态
pm2 status

# 或
sudo systemctl status worldmonitor

# 测试访问
curl http://localhost:3000
```

## 🔧 可选配置

### 配置 Nginx 反向代理（推荐）

Nginx 可以提供更好的性能、安全性和静态文件服务。

1. **安装 Nginx**
   ```bash
   sudo apt install -y nginx
   ```

2. **配置 Nginx**
   ```bash
   # 复制配置文件
   sudo cp nginx.conf /etc/nginx/sites-available/worldmonitor
   
   # 创建软链接
   sudo ln -s /etc/nginx/sites-available/worldmonitor /etc/nginx/sites-enabled/
   
   # 删除默认配置
   sudo rm /etc/nginx/sites-enabled/default
   
   # 测试配置
   sudo nginx -t
   
   # 重启 Nginx
   sudo systemctl restart nginx
   ```

3. **配置防火墙**
   ```bash
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   ```

4. **访问应用**
   ```
   http://your-server-ip
   ```

### 配置 Redis（可选）

如果不想使用 Upstash Redis，可以安装本地 Redis。

```bash
# 安装 Redis
sudo apt install -y redis-server

# 启动 Redis
sudo systemctl start redis-server
sudo systemctl enable redis-server

# 配置环境变量
# 在 .env 文件中设置：
UPSTASH_REDIS_REST_URL=http://localhost:6379
UPSTASH_REDIS_REST_TOKEN=
```

## 📊 监控和维护

### 查看应用状态

```bash
# PM2 方式
pm2 status
pm2 logs worldmonitor
pm2 monit

# systemd 方式
sudo systemctl status worldmonitor
sudo journalctl -u worldmonitor -f
```

### 重启应用

```bash
# PM2 方式
pm2 restart worldmonitor

# systemd 方式
sudo systemctl restart worldmonitor
```

### 更新应用

```bash
# 进入项目目录
cd /opt/worldmonitor

# 拉取最新代码（如果使用 git）
git pull

# 安装开发依赖
npm ci --include=dev

# 重新构建
npm run build:full

# 安装生产依赖
npm ci --only=production
npm install vite

# 重启应用
pm2 restart worldmonitor
# 或
sudo systemctl restart worldmonitor
```

### 查看日志

```bash
# PM2 方式
pm2 logs worldmonitor

# systemd 方式
sudo journalctl -u worldmonitor -f

# Nginx 日志
sudo tail -f /var/log/nginx/worldmonitor-access.log
sudo tail -f /var/log/nginx/worldmonitor-error.log
```

## 🛡️ 安全建议

1. **修改 SSH 端口**
   ```bash
   sudo nano /etc/ssh/sshd_config
   # 修改 Port 22 为其他端口
   sudo systemctl restart sshd
   ```

2. **配置防火墙规则**
   ```bash
   # 只允许特定 IP 访问
   sudo ufw allow from your-ip to any port 3000
   ```

3. **定期更新系统**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

4. **配置 fail2ban**
   ```bash
   sudo apt install -y fail2ban
   sudo systemctl enable fail2ban
   sudo systemctl start fail2ban
   ```

## 🚨 故障排除

### 应用无法启动

```bash
# 检查日志
pm2 logs worldmonitor
# 或
sudo journalctl -u worldmonitor -n 50

# 检查端口占用
sudo lsof -i :3000

# 检查文件权限
ls -la /opt/worldmonitor
```

### 无法访问应用

```bash
# 检查应用是否运行
pm2 status
# 或
sudo systemctl status worldmonitor

# 检查防火墙
sudo ufw status

# 检查端口监听
sudo netstat -tlnp | grep 3000
```

### 性能问题

```bash
# 查看系统资源
htop

# 查看 Node.js 内存使用
pm2 monit

# 调整 PM2 配置
# 编辑 ecosystem.config.js
# 调整 max_memory_restart
```

## 📞 获取帮助

- **项目文档**: [README.md](README.md)
- **GitHub Issues**: https://github.com/koala73/worldmonitor/issues
- **API 文档**: [docs/API_REFERENCE.md](docs/API_REFERENCE.md)

## 🎉 部署完成

恭喜！您已成功在阿里云轻量应用服务器上部署了 World Monitor。

**访问地址**: `http://your-server-ip:3000`

**默认功能**:
- 全球情报监控
- 实时新闻聚合
- 3D 地球仪可视化
- AI 智能分析（需要配置 API 密钥）

**下一步**:
1. 配置必要的 API 密钥以启用完整功能
2. 根据需要调整应用配置
3. 设置监控和备份策略
4. 考虑配置域名和 HTTPS（可选）
