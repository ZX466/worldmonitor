#!/bin/bash
set -e

# ============================================
# World Monitor - 极简部署脚本
# 只部署 dist 目录，不需要在服务器上安装依赖
# ============================================

PROJECT_DIR="/var/www/worldmonitor"

echo "=========================================="
echo "🚀 部署 World Monitor (极简版)"
echo "=========================================="

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_step() {
    echo -e "${YELLOW}➜ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查 dist 目录是否存在
if [ ! -d "$PROJECT_DIR/dist" ]; then
    print_error "dist 目录不存在: $PROJECT_DIR/dist"
    echo ""
    echo "请先在本地运行 'npm run build' 构建项目"
    echo "然后上传 dist 目录到服务器"
    exit 1
fi

# 验证 index.html
if [ ! -f "$PROJECT_DIR/dist/index.html" ]; then
    print_error "index.html 不存在！"
    exit 1
fi
print_success "dist 目录验证通过"

# 1. 配置 Nginx
print_step "配置 Nginx..."
cat > /etc/nginx/sites-available/worldmonitor << 'NGINX_CONF'
server {
    listen 3000;
    server_name _;

    root /var/www/worldmonitor/dist;
    index index.html;

    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json application/javascript;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        try_files $uri $uri/ /index.html;
        
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
NGINX_CONF

# 启用配置
ln -sf /etc/nginx/sites-available/worldmonitor /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default 2>/dev/null || true
print_success "Nginx 配置完成"

# 2. 设置权限
print_step "设置文件权限..."
chown -R www-data:www-data $PROJECT_DIR
chmod -R 755 $PROJECT_DIR
print_success "权限设置完成"

# 3. 测试并重载 Nginx
print_step "测试 Nginx 配置..."
nginx -t
if [ $? -ne 0 ]; then
    print_error "Nginx 配置错误！"
    exit 1
fi
print_success "Nginx 配置正确"

print_step "重载 Nginx..."
systemctl reload nginx
systemctl enable nginx >/dev/null 2>&1
print_success "Nginx 已重载"

echo ""
echo "=========================================="
echo "🎉 部署成功！"
echo "=========================================="
echo ""
echo "访问地址："
echo "  http://你的公网IP:3000"
echo ""
print_success "部署完成！"