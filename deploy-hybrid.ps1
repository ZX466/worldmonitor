#!/usr/bin/env pwsh
# World Monitor - Hybrid Deployment Script

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "World Monitor - Hybrid Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nThis script will help you:" -ForegroundColor Yellow
Write-Host "1. Push code to GitHub" -ForegroundColor White
Write-Host "2. Configure Vercel API URL" -ForegroundColor White
Write-Host "3. Build and upload frontend to Aliyun" -ForegroundColor White

$continue = Read-Host "`nContinue? (y/n)"
if ($continue -ne "y") {
    Write-Host "Cancelled" -ForegroundColor Yellow
    exit 0
}

# Step 1: GitHub Push
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Step 1: Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$githubUser = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($githubUser)) {
    Write-Host "Error: GitHub username required" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$githubUser/worldmonitor.git"

Write-Host "`n[1/3] Checking remote..." -ForegroundColor Yellow
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Adding remote: $repoUrl" -ForegroundColor Green
    git remote add origin $repoUrl
} else {
    Write-Host "Remote exists" -ForegroundColor Green
}

Write-Host "`n[2/3] Switching to main branch..." -ForegroundColor Yellow
git branch -M main

Write-Host "`n[3/3] Pushing code..." -ForegroundColor Yellow
git push -u origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Push failed. Create repo at https://github.com/new" -ForegroundColor Red
    exit 1
}

Write-Host "Code pushed to GitHub" -ForegroundColor Green

# Step 2: Vercel Config
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Step 2: Vercel Configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nPlease follow these steps:" -ForegroundColor Yellow
Write-Host "1. Visit https://vercel.com/new" -ForegroundColor White
Write-Host "2. Import repo: $githubUser/worldmonitor" -ForegroundColor White
Write-Host "3. Add environment variables (see below)" -ForegroundColor White
Write-Host "4. Click Deploy" -ForegroundColor White

Write-Host "`nRequired environment variables:" -ForegroundColor Yellow
Write-Host "  GROQ_API_KEY = your_groq_api_key" -ForegroundColor White
Write-Host "  UPSTASH_REDIS_REST_URL = your_redis_url" -ForegroundColor White
Write-Host "  UPSTASH_REDIS_REST_TOKEN = your_redis_token" -ForegroundColor White

Write-Host "`nGet API Keys:" -ForegroundColor Yellow
Write-Host "  Groq: https://console.groq.com/ (free)" -ForegroundColor Cyan
Write-Host "  Redis: https://upstash.com/ (free)" -ForegroundColor Cyan

$vercelUrl = Read-Host "`nAfter deployment, enter your Vercel URL"
if ([string]::IsNullOrWhiteSpace($vercelUrl)) {
    Write-Host "Error: Vercel URL required" -ForegroundColor Red
    exit 1
}

$vercelUrl = $vercelUrl.TrimEnd('/')

# Step 3: Update Frontend
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Step 3: Update Frontend Config" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`n[1/3] Updating .env.production..." -ForegroundColor Yellow
$envFile = ".env.production"
$content = Get-Content $envFile -Raw
if ($content -match "VITE_WS_API_URL=.*") {
    $content = $content -replace "VITE_WS_API_URL=.*", "VITE_WS_API_URL=$vercelUrl"
} else {
    $content += "`nVITE_WS_API_URL=$vercelUrl"
}
Set-Content $envFile $content -NoNewline
Write-Host "Updated VITE_WS_API_URL=$vercelUrl" -ForegroundColor Green

Write-Host "`n[2/3] Building frontend..." -ForegroundColor Yellow
npm ci --include=dev
npm run build:full
npm ci --only=production
npm install vite

Write-Host "`n[3/3] Upload to Aliyun server..." -ForegroundColor Yellow

$serverIP = "8.130.55.194"
Write-Host "Server IP: $serverIP" -ForegroundColor Cyan

Write-Host "`nRun these commands to upload:" -ForegroundColor Yellow
Write-Host "  scp -r dist root@$serverIP`:/opt/worldmonitor/" -ForegroundColor Cyan
Write-Host "  ssh root@$serverIP 'pm2 restart worldmonitor'" -ForegroundColor Cyan

$upload = Read-Host "`nAuto upload? (requires SSH key) (y/n)"
if ($upload -eq "y") {
    Write-Host "Uploading files..." -ForegroundColor Yellow
    scp -r dist root@${serverIP}:/opt/worldmonitor/
    
    Write-Host "Restarting service..." -ForegroundColor Yellow
    ssh root@${serverIP} "pm2 restart worldmonitor"
    
    Write-Host "Frontend deployed to Aliyun" -ForegroundColor Green
}

# Done
Write-Host "`n========================================" -ForegroundColor Green
Write-Host "Deployment Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`nAccess URLs:" -ForegroundColor Yellow
Write-Host "  Frontend: http://$serverIP`:3000" -ForegroundColor Cyan
Write-Host "  API: $vercelUrl" -ForegroundColor Cyan

Write-Host "`nTest API:" -ForegroundColor Yellow
Write-Host "  $vercelUrl/api/news/v1/list-feed-digest" -ForegroundColor Cyan

Write-Host "`n========================================" -ForegroundColor Cyan
