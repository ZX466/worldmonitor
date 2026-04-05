#!/bin/bash
set -e

# ============================================
# World Monitor - 轻量化构建脚本
# 生成最小化的构建版本，适用于轻量服务器
# ============================================

echo "=========================================="
echo "🚀 轻量化构建 World Monitor"
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

# 1. 备份原始配置
print_step "备份原始配置..."
if [ -f ".env.local" ]; then
    cp .env.local .env.local.backup
fi

# 2. 使用轻量化配置
print_step "应用轻量化配置..."
cp .env.minimal .env.local

# 3. 构建项目
print_step "构建轻量化版本..."
npm run build

# 4. 恢复原始配置
print_step "恢复原始配置..."
if [ -f ".env.local.backup" ]; then
    mv .env.local.backup .env.local
fi

print_success "轻量化构建完成！"
echo ""
echo "构建产物在 dist/ 目录下"
echo "可以上传到服务器部署"