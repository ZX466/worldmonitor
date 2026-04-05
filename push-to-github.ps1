#!/usr/bin/env pwsh
# ============================================
# World Monitor - GitHub 推送脚本
# ============================================

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "World Monitor - 推送到 GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# 检查是否有 GitHub 用户名
$githubUser = Read-Host "请输入你的 GitHub 用户名"

if ([string]::IsNullOrWhiteSpace($githubUser)) {
    Write-Host "错误: GitHub 用户名不能为空" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$githubUser/worldmonitor.git"

Write-Host "`n[1/4] 检查 Git 状态..." -ForegroundColor Yellow
git status

Write-Host "`n[2/4] 检查远程仓库..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "添加远程仓库: $repoUrl" -ForegroundColor Green
    git remote add origin $repoUrl
} else {
    Write-Host "远程仓库已存在: $remote" -ForegroundColor Green
}

Write-Host "`n[3/4] 切换到 main 分支..." -ForegroundColor Yellow
git branch -M main

Write-Host "`n[4/4] 推送代码到 GitHub..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "✓ 推送成功!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "GitHub 仓库: https://github.com/$githubUser/worldmonitor" -ForegroundColor Cyan
    Write-Host "`n下一步:" -ForegroundColor Yellow
    Write-Host "1. 访问 https://vercel.com/new" -ForegroundColor White
    Write-Host "2. 导入 GitHub 仓库: $githubUser/worldmonitor" -ForegroundColor White
    Write-Host "3. 配置环境变量并部署" -ForegroundColor White
} else {
    Write-Host "`n========================================" -ForegroundColor Red
    Write-Host "✗ 推送失败" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "请检查:" -ForegroundColor Yellow
    Write-Host "1. GitHub 用户名是否正确" -ForegroundColor White
    Write-Host "2. 是否已在 GitHub 上创建仓库" -ForegroundColor White
    Write-Host "3. 是否有推送权限" -ForegroundColor White
}
