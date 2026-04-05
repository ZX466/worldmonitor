/**
 * AI 模块测试脚本
 * 测试 Ollama -> Groq -> OpenRouter -> Browser T5 回退链
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

// 测试结果
const results = {
  ollama: { available: false, error: null },
  groq: { available: false, error: null },
  openrouter: { available: false, error: null },
  summarization: { available: false, error: null },
};

// 1. 测试 Ollama 本地连接
async function testOllama() {
  log('cyan', '\n[1/4] 测试 Ollama 本地连接...');
  
  const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
  
  try {
    const response = await fetch(`${ollamaUrl}/api/tags`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    
    if (response.ok) {
      const data = await response.json();
      const models = data.models || [];
      log('green', `✓ Ollama 可用，找到 ${models.length} 个模型`);
      if (models.length > 0) {
        log('blue', `  模型列表: ${models.map(m => m.name).join(', ')}`);
      }
      results.ollama.available = true;
    } else {
      throw new Error(`HTTP ${response.status}`);
    }
  } catch (error) {
    log('yellow', `✗ Ollama 不可用: ${error.message}`);
    results.ollama.error = error.message;
  }
}

// 2. 测试 Groq API
async function testGroq() {
  log('cyan', '\n[2/4] 测试 Groq API...');
  
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    log('yellow', '✗ Groq API Key 未配置');
    results.groq.error = 'API Key 未配置';
    return;
  }
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(10000),
    });
    
    if (response.ok) {
      const data = await response.json();
      log('green', `✓ Groq API 可用，找到 ${data.data?.length || 0} 个模型`);
      results.groq.available = true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }
  } catch (error) {
    log('red', `✗ Groq API 测试失败: ${error.message}`);
    results.groq.error = error.message;
  }
}

// 3. 测试 OpenRouter API
async function testOpenRouter() {
  log('cyan', '\n[3/4] 测试 OpenRouter API...');
  
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    log('yellow', '✗ OpenRouter API Key 未配置');
    results.openrouter.error = 'API Key 未配置';
    return;
  }
  
  try {
    const response = await fetch('https://openrouter.ai/api/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: AbortSignal.timeout(10000),
    });
    
    if (response.ok) {
      const data = await response.json();
      log('green', `✓ OpenRouter API 可用，找到 ${data.data?.length || 0} 个模型`);
      results.openrouter.available = true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
    }
  } catch (error) {
    log('red', `✗ OpenRouter API 测试失败: ${error.message}`);
    results.openrouter.error = error.message;
  }
}

// 4. 测试摘要功能
async function testSummarization() {
  log('cyan', '\n[4/4] 测试摘要功能...');
  
  const testHeadlines = [
    '全球股市因经济数据波动',
    '科技巨头发布新产品',
    '国际局势持续紧张',
  ];
  
  // 优先使用可用的提供商
  let provider = null;
  let providerName = '';
  let apiKey = '';
  let apiUrl = '';
  let model = '';
  
  if (results.groq.available) {
    provider = 'groq';
    providerName = 'Groq';
    apiKey = process.env.GROQ_API_KEY;
    apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    model = 'llama-3.1-8b-instant';
  } else if (results.openrouter.available) {
    provider = 'openrouter';
    providerName = 'OpenRouter';
    apiKey = process.env.OPENROUTER_API_KEY;
    apiUrl = 'https://openrouter.ai/api/v1/chat/completions';
    model = 'meta-llama/llama-3.1-8b-instruct';
  } else if (results.ollama.available) {
    provider = 'ollama';
    providerName = 'Ollama';
    const ollamaUrl = process.env.OLLAMA_API_URL || 'http://localhost:11434';
    apiUrl = `${ollamaUrl}/api/chat`;
    model = process.env.OLLAMA_MODEL || 'llama3';
  }
  
  if (!provider) {
    log('yellow', '✗ 没有可用的 AI 提供商，跳过摘要测试');
    results.summarization.error = '没有可用的提供商';
    return;
  }
  
  log('blue', `使用 ${providerName} 进行摘要测试...`);
  
  try {
    const prompt = `请用2-3句话总结以下新闻标题的关键信息：\n\n${testHeadlines.join('\n')}`;
    
    let response;
    
    if (provider === 'ollama') {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: 'user', content: prompt }
          ],
          stream: false,
        }),
        signal: AbortSignal.timeout(30000),
      });
      
      if (response.ok) {
        const data = await response.json();
        const summary = data.message?.content || '';
        
        if (summary) {
          log('green', '✓ 摘要测试成功');
          log('blue', `  摘要结果: ${summary.slice(0, 150)}...`);
          results.summarization.available = true;
        } else {
          throw new Error('摘要为空');
        }
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } else {
      response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
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
      
      if (response.ok) {
        const data = await response.json();
        const summary = data.choices?.[0]?.message?.content || '';
        
        if (summary) {
          log('green', '✓ 摘要测试成功');
          log('blue', `  摘要结果: ${summary.slice(0, 150)}...`);
          results.summarization.available = true;
        } else {
          throw new Error('摘要为空');
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.error?.message || 'Unknown error'}`);
      }
    }
  } catch (error) {
    log('red', `✗ 摘要测试失败: ${error.message}`);
    results.summarization.error = error.message;
  }
}

// 打印测试报告
function printReport() {
  log('cyan', '\n========================================');
  log('cyan', 'AI 模块测试报告');
  log('cyan', '========================================\n');
  
  const providers = [
    { name: 'Ollama (本地)', result: results.ollama },
    { name: 'Groq (云端)', result: results.groq },
    { name: 'OpenRouter (云端)', result: results.openrouter },
    { name: '摘要功能', result: results.summarization },
  ];
  
  providers.forEach(p => {
    const status = p.result.available 
      ? `${colors.green}✓ 可用${colors.reset}` 
      : `${colors.red}✗ 不可用${colors.reset}`;
    console.log(`${p.name}: ${status}`);
    if (p.result.error) {
      console.log(`  原因: ${p.result.error}`);
    }
  });
  
  log('cyan', '\n========================================');
  
  // 推荐配置
  if (!results.groq.available && !results.openrouter.available && !results.ollama.available) {
    log('yellow', '\n推荐操作:');
    log('blue', '1. 配置 Groq API Key (免费): https://console.groq.com/');
    log('blue', '2. 或配置 OpenRouter API Key: https://openrouter.ai/');
    log('blue', '3. 或安装 Ollama 本地运行: https://ollama.com/');
  } else if (results.summarization.available) {
    log('green', '\n✓ AI 模块配置正常，可以使用摘要功能');
  }
}

// 主函数
async function main() {
  log('cyan', '========================================');
  log('cyan', 'World Monitor AI 模块测试');
  log('cyan', '========================================');
  
  await testOllama();
  await testGroq();
  await testOpenRouter();
  await testSummarization();
  
  printReport();
}

main().catch(console.error);
