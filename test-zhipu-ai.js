/**
 * 智谱 AI 测试脚本
 * 测试 GLM-4.5-Air 模型集成
 */

import { readFileSync, existsSync } from 'fs';

// 加载环境变量
function loadEnv() {
  const envPath = '.env.production';
  if (existsSync(envPath)) {
    const content = readFileSync(envPath, 'utf-8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...values] = trimmed.split('=');
        if (key && values.length > 0) {
          process.env[key] = values.join('=').replace(/^["']|["']$/g, '');
        }
      }
    });
  }
}
loadEnv();

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 测试智谱 AI API
async function testZhipuAI() {
  log('cyan', '========================================');
  log('cyan', '智谱 AI (GLM-4.5-Air) 测试');
  log('cyan', '========================================\n');

  const apiKey = process.env.ZHIPU_API_KEY;
  const model = process.env.ZHIPU_MODEL || 'glm-4.5-air';

  if (!apiKey) {
    log('red', '✗ ZHIPU_API_KEY 未配置');
    log('yellow', '\n请按以下步骤获取 API Key:');
    log('blue', '1. 访问 https://open.bigmodel.cn/');
    log('blue', '2. 注册并登录账号');
    log('blue', '3. 在控制台创建 API Key');
    log('blue', '4. 在 .env.production 中设置 ZHIPU_API_KEY=your_api_key');
    return false;
  }

  log('green', `✓ ZHIPU_API_KEY 已配置 (${apiKey.slice(0, 10)}...)`);
  log('blue', `  模型: ${model}`);

  // 测试 API 连接
  log('cyan', '\n[1/2] 测试 API 连接...');

  try {
    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: '你好，请用一句话介绍你自己。' }
        ],
        max_tokens: 100,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    log('green', '✓ API 连接成功');

    // 显示响应
    const content = data.choices?.[0]?.message?.content || '';
    if (content) {
      log('blue', `  响应: ${content.slice(0, 100)}...`);
    }

  } catch (error) {
    log('red', `✗ API 连接失败: ${error.message}`);
    return false;
  }

  // 测试摘要功能
  log('cyan', '\n[2/2] 测试摘要功能...');

  const testHeadlines = [
    '全球股市因经济数据波动',
    '科技巨头发布新产品',
    '国际局势持续紧张',
  ];

  try {
    const prompt = `请用2-3句话总结以下新闻标题的关键信息：

${testHeadlines.join('\n')}`;

    const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'user', content: prompt }
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(30000),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content || '';

    if (summary) {
      log('green', '✓ 摘要功能测试成功');
      log('blue', `  摘要结果: ${summary.slice(0, 150)}...`);
      return true;
    } else {
      throw new Error('摘要为空');
    }

  } catch (error) {
    log('red', `✗ 摘要功能测试失败: ${error.message}`);
    return false;
  }
}

// 主函数
async function main() {
  const success = await testZhipuAI();

  log('cyan', '\n========================================');
  if (success) {
    log('green', '✓ 智谱 AI 集成测试通过');
    log('cyan', '\n下一步:');
    log('blue', '1. 在 Vercel 环境变量中添加 ZHIPU_API_KEY');
    log('blue', '2. 部署项目到 Vercel');
    log('blue', '3. 测试前端摘要功能');
  } else {
    log('red', '✗ 智谱 AI 集成测试失败');
    log('yellow', '\n请检查:');
    log('blue', '1. API Key 是否正确');
    log('blue', '2. 网络连接是否正常');
    log('blue', '3. API 配额是否充足');
  }
  log('cyan', '========================================');
}

main().catch(console.error);
