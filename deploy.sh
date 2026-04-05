#!/bin/bash

# ============================================
# World Monitor - 阿里云轻量应用服务器部署脚本
# Ubuntu 24.04 系统
# ============================================

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
    log_error "请使用 sudo 运行此脚本"
    exit 1
fi

# 配置变量
APP_NAME="worldmonitor"
APP_DIR="/opt/$APP_NAME"
APP_USER="worldmonitor"
APP_GROUP="worldmonitor"
NODE_VERSION="20"

# 步骤 1: 系统更新
log_info "更新系统包..."
apt update && apt upgrade -y

# 步骤 2: 安装必要工具
log_info "安装必要工具..."
apt install -y curl wget git build-essential

# 步骤 3: 安装 Node.js
log_info "安装 Node.js $NODE_VERSION..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_$NODE_VERSION.x | bash -
    apt install -y nodejs
fi

node --version
npm --version

# 步骤 4: 安装 PM2
log_info "安装 PM2..."
npm install -g pm2

# 步骤 5: 创建应用用户
log_info "创建应用用户..."
if ! id "$APP_USER" &>/dev/null; then
    useradd -r -s /bin/false $APP_USER
fi

# 步骤 6: 创建应用目录
log_info "创建应用目录..."
mkdir -p $APP_DIR
mkdir -p $APP_DIR/logs

# 步骤 7: 复制应用文件
log_info "复制应用文件..."
# 假设当前目录是项目根目录
cp -r ./* $APP_DIR/
cp .env.production $APP_DIR/.env

# 步骤 8: 设置权限
log_info "设置文件权限..."
chown -R $APP_USER:$APP_GROUP $APP_DIR
chmod -R 755 $APP_DIR

# 步骤 9: 安装依赖
log_info "安装应用依赖..."
cd $APP_DIR
npm ci --include=dev

# 步骤 10: 构建应用
log_info "构建应用..."
npm run build:full

# 步骤 11: 安装生产依赖和 vite
log_info "安装生产依赖..."
npm ci --only=production
npm install vite

# 步骤 12: 配置防火墙
log_info "配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 3000/tcp
    ufw allow 22/tcp
    ufw --force enable
    log_info "防火墙已配置，端口 3000 已开放"
fi

# 步骤 13: 启动应用
log_info "启动应用..."
cd $APP_DIR
sudo -u $APP_USER pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup systemd -u $APP_USER --hp /home/$APP_USER

# 步骤 14: 验证部署
log_info "验证部署..."
sleep 5
if curl -s http://localhost:3000 > /dev/null; then
    log_info "✓ 应用已成功启动在 http://localhost:3000"
else
    log_error "✗ 应用启动失败，请检查日志"
    pm2 logs $APP_NAME
    exit 1
fi

# 步骤 15: 显示状态
log_info "部署完成！"
log_info "=========================================="
log_info "应用名称: $APP_NAME"
log_info "应用目录: $APP_DIR"
log_info "访问地址: http://服务器IP:3000"
log_info "=========================================="
log_info "常用命令:"
log_info "  查看状态: pm2 status"
log_info "  查看日志: pm2 logs $APP_NAME"
log_info "  重启应用: pm2 restart $APP_NAME"
log_info "  停止应用: pm2 stop $APP_NAME"
log_info "=========================================="

# 显示服务器 IP
SERVER_IP=$(curl -s ifconfig.me || curl -s icanhazip.com || echo "未知")
log_info "服务器 IP: $SERVER_IP"
log_info "访问地址: http://$SERVER_IP:3000"
