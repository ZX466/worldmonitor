#!/bin/bash
set -e
echo "🚀 World Monitor 中国风主题部署脚本（Ubuntu 24.04 + 3000端口）"
echo "===================================================="
# 检查root权限
if [ "$EUID" -ne 0 ]; then
  echo "❌ 请使用sudo运行：sudo bash deploy-local.sh"
  exit 1
fi
# 检查是否在项目根目录
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
  echo "❌ 请在worldmonitor项目根目录运行此脚本"
  exit 1
fi
# 1. 安装系统依赖
echo "📦 安装系统依赖..."
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs nginx
npm install -g pm2
# 2. 配置国内npm源，加速安装
echo "⚡ 配置淘宝npm镜像源..."
npm config set registry https://registry.npmmirror.com
# 3. 清理旧依赖（避免冲突）
echo "🗑️  清理旧依赖..."
rm -rf node_modules package-lock.json
# 4. 安装项目依赖
echo "🔧 安装项目依赖（使用国内源加速）..."
npm install --force --legacy-peer-deps
# 5. 构建项目（中国风主题完整版）
echo "🏗️  构建中国风主题项目（完整版）..."
if [ -f ".env" ]; then
  echo "✅ 加载自定义.env配置"
else
  echo "ℹ️  使用默认官方API配置（无需申请密钥即可直接使用）"
  echo "VITE_API_BASE_URL=https://worldmonitor.app/api" > .env
fi
npm run build:full
# 6. 部署静态文件到Nginx
echo "🌐 部署到Nginx..."
mkdir -p /var/www/worldmonitor
cp -r dist/* /var/www/worldmonitor/
# 7. 配置Nginx 3000端口
echo "🔌 配置Nginx监听3000端口..."
cat > /etc/nginx/sites-available/worldmonitor << EOF
server {
    listen 3000;
    server_name _;
    root /var/www/worldmonitor;
    index index.html;
    # 前端路由支持
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    # 自托管API反代（如果开启后端服务，取消注释并修改地址）
    # location /api/ {
    #     proxy_pass http://127.0.0.1:3001/;
    #     proxy_http_version 1.1;
    #     proxy_set_header Upgrade \$http_upgrade;
    #     proxy_set_header Connection "upgrade";
    #     proxy_set_header Host \$host;
    # }
    client_max_body_size 100M;
}
EOF
# 启用配置
ln -sf /etc/nginx/sites-available/worldmonitor /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default 2>/dev/null
# 验证配置并重启
nginx -t
systemctl restart nginx
# 8. 配置开机自启
systemctl enable nginx
pm2 startup
# 完成
PUBLIC_IP=$(curl -s ifconfig.me)
echo ""
echo "✅ 中国风主题部署成功！"
echo "===================================================="
echo "🎨 主题特色：墨黑底色、朱红边框、宣纸纹理、水墨地图、宋体印刷质感"
echo "🌍 访问地址：http://$PUBLIC_IP:3000"
echo "   【重要】访问时请强制刷新浏览器（Ctrl+F5）清除缓存"
echo "📝 配置修改：编辑项目根目录.env后重新执行npm run build:full即可生效"
echo "🔄 重新构建：npm run build:full（重新构建中国风主题）"
echo "   其他版本：npm run build:tech/finance/happy（注意：其他版本需要单独适配主题）"
echo "📊 服务状态：systemctl status nginx"
echo "🗑️  卸载服务：rm /etc/nginx/sites-enabled/worldmonitor && systemctl restart nginx && rm -rf /var/www/worldmonitor"
