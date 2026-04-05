/**
 * 中国风主题快速启动
 * 提供简单的方法来启用和管理中国风主题
 */

import { enableChineseTheme, disableChineseTheme, toggleChineseTheme, getChineseThemeManager } from './chinese-theme-manager';

/**
 * 控制台命令接口
 */
declare global {
  interface Window {
    chineseTheme?: {
      enable: () => void;
      disable: () => void;
      toggle: () => boolean;
      status: () => { enabled: boolean; config: any };
      setStyle: (style: 'ink-painting' | 'traditional-blue-green' | 'vermilion-ink') => void;
      help: () => void;
    };
  }
}

/**
 * 安装控制台命令
 */
export function installConsoleCommands(): void {
  const manager = getChineseThemeManager();
  
  window.chineseTheme = {
    enable: () => {
      enableChineseTheme();
      console.log('🎨 中国风主题已启用');
    },
    
    disable: () => {
      disableChineseTheme();
      console.log('🎨 中国风主题已禁用');
    },
    
    toggle: () => {
      const enabled = toggleChineseTheme();
      console.log(`🎨 中国风主题已${enabled ? '启用' : '禁用'}`);
      return enabled;
    },
    
    status: () => {
      const config = manager.getConfig();
      console.log('🎨 中国风主题状态:');
      console.log(`  启用状态: ${config.enabled ? '✅ 已启用' : '❌ 已禁用'}`);
      console.log(`  主题名称: ${config.name}`);
      console.log(`  颜色方案: ${config.styles.colorScheme}`);
      console.log(`  地图样式: ${config.map.style}`);
      console.log(`  中文标题: ${config.content.useChineseTitles ? '启用' : '禁用'}`);
      return { enabled: config.enabled, config };
    },
    
    setStyle: (style: 'ink-painting' | 'traditional-blue-green' | 'vermilion-ink') => {
      manager.updateConfig({
        styles: {
          colorScheme: style,
          fonts: {
            body: 'Noto Serif SC, serif',
            title: 'Ma Shan Zheng, serif',
            mono: 'monospace'
          },
          decorations: {
            showSeals: true,
            showCloudPatterns: true,
            showBorders: true
          }
        },
        map: {
          style,
          showChineseLabels: true,
          showProvinceBorders: true,
          highlightChinaBorder: true
        }
      });
      console.log(`🎨 中国风样式已切换为: ${style}`);
    },
    
    help: () => {
      console.log(`
🎨 中国风主题控制台命令:

  chineseTheme.enable()      - 启用中国风主题
  chineseTheme.disable()     - 禁用中国风主题  
  chineseTheme.toggle()      - 切换启用状态
  chineseTheme.status()      - 查看主题状态
  chineseTheme.setStyle('ink-painting')          - 切换为水墨风格
  chineseTheme.setStyle('traditional-blue-green') - 切换为丹青风格
  chineseTheme.setStyle('vermilion-ink')         - 切换为朱砂风格
  chineseTheme.help()        - 显示帮助信息

快捷方式:
  ct = chineseTheme
  ct.enable()  // 启用主题
      `);
    },
  };
  
  // 添加别名
  (window as any).ct = window.chineseTheme;
  
  console.log(`
🎨 中国风主题控制台命令已安装!
输入 'chineseTheme.help()' 或 'ct.help()' 查看可用命令
  `);
}

/**
 * 添加主题切换按钮到页面
 */
export function addThemeToggleButton(): void {
  // 检查是否已存在按钮
  if (document.getElementById('chinese-theme-toggle-btn')) {
    return;
  }
  
  const button = document.createElement('button');
  button.id = 'chinese-theme-toggle-btn';
  button.innerHTML = '🎨 中国风';
  button.title = '点击切换中国风主题';
  
  // 设置按钮样式
  button.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 10000;
    padding: 8px 16px;
    background: linear-gradient(135deg, #c41e3a 0%, #8b0000 100%);
    border: 2px solid #8b3a3a;
    color: white;
    font-family: 'Noto Serif SC', '思源宋体', sans-serif;
    font-size: 14px;
    cursor: pointer;
    border-radius: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  `;
  
  // 点击事件
  button.addEventListener('click', () => {
    const enabled = toggleChineseTheme();
    
    // 更新按钮文本
    button.innerHTML = enabled ? '🎨 中国风 ON' : '🎨 中国风 OFF';
    button.style.background = enabled 
      ? 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)'
      : 'linear-gradient(135deg, #666 0%, #444 100%)';
    
    // 添加点击反馈
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 100);
  });
  
  // 悬停效果
  button.addEventListener('mouseenter', () => {
    button.style.boxShadow = '0 4px 12px rgba(196, 30, 58, 0.5)';
    button.style.transform = 'translateY(-2px)';
  });
  
  button.addEventListener('mouseleave', () => {
    button.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    button.style.transform = 'translateY(0)';
  });
  
  document.body.appendChild(button);
  
  // 初始状态
  const manager = getChineseThemeManager();
  const isEnabled = manager.getConfig().enabled;
  button.innerHTML = isEnabled ? '🎨 中国风 ON' : '🎨 中国风 OFF';
  button.style.background = isEnabled 
    ? 'linear-gradient(135deg, #c41e3a 0%, #8b0000 100%)'
    : 'linear-gradient(135deg, #666 0%, #444 100%)';
}

/**
 * 添加主题样式选择器
 */
export function addThemeStyleSelector(): void {
  // 检查是否已存在选择器
  if (document.getElementById('chinese-theme-style-selector')) {
    return;
  }
  
  const container = document.createElement('div');
  container.id = 'chinese-theme-style-selector';
  container.style.cssText = `
    position: fixed;
    bottom: 70px;
    right: 20px;
    z-index: 10000;
    background: #1e1515;
    border: 1px solid #8b3a3a;
    padding: 10px;
    display: none;
    flex-direction: column;
    gap: 8px;
    min-width: 150px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  `;
  
  const styles = [
    { id: 'ink-painting', name: '水墨风格', color: '#8b3a3a' },
    { id: 'traditional-blue-green', name: '丹青风格', color: '#1e4d6b' },
    { id: 'vermilion-ink', name: '朱砂风格', color: '#c41e3a' },
  ];
  
  styles.forEach(style => {
    const button = document.createElement('button');
    button.textContent = style.name;
    button.dataset.style = style.id;
    
    button.style.cssText = `
      padding: 6px 12px;
      background: #1e1515;
      border: 1px solid ${style.color};
      color: ${style.color};
      font-family: 'Noto Serif SC', '思源宋体', sans-serif;
      font-size: 12px;
      cursor: pointer;
      text-align: left;
      transition: all 0.2s;
      border-radius: 0;
    `;
    
    button.addEventListener('click', () => {
      const manager = getChineseThemeManager();
      manager.updateConfig({
        styles: {
          colorScheme: style.id as any,
          fonts: {
            body: 'Noto Serif SC, serif',
            title: 'Ma Shan Zheng, serif',
            mono: 'monospace'
          },
          decorations: {
            showSeals: true,
            showCloudPatterns: true,
            showBorders: true
          }
        },
        map: {
          style: style.id,
          showChineseLabels: true,
          showProvinceBorders: true,
          highlightChinaBorder: true
        }
      });
      
      // 更新所有按钮状态
      document.querySelectorAll('#chinese-theme-style-selector button').forEach(btn => {
        const btnStyle = btn.getAttribute('data-style');
        const btnColor = styles.find(s => s.id === btnStyle)?.color || '#8b3a3a';
        (btn as HTMLElement).style.background = '#1e1515';
        (btn as HTMLElement).style.color = btnColor;
        (btn as HTMLElement).style.borderColor = btnColor;
      });
      
      // 高亮当前选中
      button.style.background = style.color;
      button.style.color = '#fff';
      
      // 隐藏选择器
      container.style.display = 'none';
    });
    
    container.appendChild(button);
  });
  
  // 创建样式切换按钮
  const styleToggleBtn = document.createElement('button');
  styleToggleBtn.id = 'chinese-theme-style-toggle-btn';
  styleToggleBtn.innerHTML = '🎨 切换样式';
  styleToggleBtn.title = '切换中国风样式';
  
  styleToggleBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 110px;
    z-index: 10000;
    padding: 8px 16px;
    background: linear-gradient(135deg, #1e4d6b 0%, #2e8b57 100%);
    border: 2px solid #1e4d6b;
    color: white;
    font-family: 'Noto Serif SC', '思源宋体', sans-serif;
    font-size: 14px;
    cursor: pointer;
    border-radius: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
  `;
  
  styleToggleBtn.addEventListener('click', () => {
    const isVisible = container.style.display === 'flex';
    container.style.display = isVisible ? 'none' : 'flex';
    
    // 点击反馈
    styleToggleBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      styleToggleBtn.style.transform = 'scale(1)';
    }, 100);
  });
  
  // 悬停效果
  styleToggleBtn.addEventListener('mouseenter', () => {
    styleToggleBtn.style.boxShadow = '0 4px 12px rgba(30, 77, 107, 0.5)';
    styleToggleBtn.style.transform = 'translateY(-2px)';
  });
  
  styleToggleBtn.addEventListener('mouseleave', () => {
    styleToggleBtn.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
    styleToggleBtn.style.transform = 'translateY(0)';
  });
  
  document.body.appendChild(styleToggleBtn);
  document.body.appendChild(container);
  
  // 初始选中当前样式
  const manager = getChineseThemeManager();
  const currentStyle = manager.getConfig().styles.colorScheme;
  const currentButton = container.querySelector(`button[data-style="${currentStyle}"]`);
  if (currentButton) {
    const styleConfig = styles.find(s => s.id === currentStyle);
    if (styleConfig) {
      (currentButton as HTMLElement).style.background = styleConfig.color;
      (currentButton as HTMLElement).style.color = '#fff';
    }
  }
}

/**
 * 初始化中国风主题增强功能
 */
export function initChineseThemeEnhancements(): void {
  // 安装控制台命令
  installConsoleCommands();
  
  // 添加主题切换按钮
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addThemeToggleButton();
      addThemeStyleSelector();
    });
  } else {
    addThemeToggleButton();
    addThemeStyleSelector();
  }
  
  console.log('🎨 中国风主题增强功能已初始化');
}

/**
 * 快速启用中国风主题
 */
export function quickEnableChineseTheme(): void {
  const manager = getChineseThemeManager();
  
  if (!manager.getConfig().enabled) {
    enableChineseTheme();
    console.log('🎨 中国风主题已快速启用');
  }
  
  initChineseThemeEnhancements();
}

export default {
  installConsoleCommands,
  addThemeToggleButton,
  addThemeStyleSelector,
  initChineseThemeEnhancements,
  quickEnableChineseTheme,
};
