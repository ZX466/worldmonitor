// ============================================
// World Monitor - PM2 进程管理配置
// 阿里云轻量应用服务器部署
// ============================================

module.exports = {
  apps: [
    {
      name: 'worldmonitor',
      script: 'npx',
      args: 'vite preview --host 0.0.0.0 --port 3000',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production',
        HOST: '0.0.0.0',
        PORT: 3000
      },
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      // 优雅关闭
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      // 自动重启策略
      restart_delay: 1000,
      max_restarts: 10,
      min_uptime: '10s',
      // 环境变量文件
      env_file: '.env.production'
    }
  ]
};
