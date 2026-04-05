#!/usr/bin/env pwsh
# ============================================
# World Monitor - 更新前端配置脚本
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "World Monitor - 更新前端配置" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 获取 Vercel URL
$vercelUrl = Read-Host "请输入你的 Vercel 应用 URL (例如: https://worldmonitor-xxx.vercel.app)"

if ([string]::IsNullOrWhiteSpace($vercelUrl)) {
    Write-Host "错误: Vercel URL 不能为空" -ForegroundColor Red
    exit 1
}

# 移除末尾的斜杠
$vercelUrl = $vercelUrl.TrimEnd('/')

Write-Host "`n[1/4] 更新 .env.production 文件..." -ForegroundColor Yellow

$envFile = ".env.production"
$content = Get-Content $envFile -Raw

# 更新 VITE_WS_API_URL
if ($content -match "VITE_WS_API_URL=.*") {
    $content = $content -replace "VITE_WS_API_URL=.*", "VITE_WS_API_URL=$vercelUrl"
} else {
    $content += "`nVITE_WS_API_URL=$vercelUrl"
}

Set-Content $envFile $content -NoNewline
Write-Host "✓ 已更新 VITE_WS_API_URL=$vercelUrl" -ForegroundColor Green

Write-Host "`n[2/4] 安装开发依赖..." -ForegroundColor Yellow
npm ci --include=dev

Write-Host "`n[3/4] 构建前端..." -ForegroundColor Yellow
npm run build:full

Write-Host "`n[4/4] 安装生产依赖..." -ForegroundColor Yellow
npm ci --only=production
npm install vite

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✓ 前端配置更新完成!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`n下一步:" -ForegroundColor Yellow
Write-Host "1. 上传 dist 目录到阿里云服务器:" -ForegroundColor White
Write-Host "   scp -r dist root@8.130.55.194:/opt/worldmonitor/" -ForegroundColor Cyan
Write-Host "`n2. 重启服务:" -ForegroundColor White
Write-Host "   ssh root@8.130.55.194 'pm2 restart worldmonitor'" -ForegroundColor Cyan
