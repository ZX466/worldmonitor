/**
 * 中国风主题管理器
 * 天下观 · 中国风主题切换和配置
 */

import { registerChineseDecoration } from '@/components/ChineseDecoration';
import { applyChineseMapStyle, getChineseMapStyle } from '@/config/chinese-map-style';
import { chineseTitle } from '@/config/chinese-titles';

/**
 * 主题配置接口
 */
export interface ChineseThemeConfig {
  // 主题名称
  name: string;
  
  // 是否启用中国风
  enabled: boolean;
  
  // 样式配置
  styles: {
    // 颜色方案
    colorScheme: 'ink-painting' | 'traditional-blue-green' | 'vermilion-ink';
    
    // 字体设置
    fonts: {
      body: string;
      title: string;
      mono: string;
    };
    
    // 装饰元素
    decorations: {
      showSeals: boolean;
      showCloudPatterns: boolean;
      showBorders: boolean;
    };
  };
  
  // 地图配置
  map: {
    style: string;
    showChineseLabels: boolean;
    showProvinceBorders: boolean;
    highlightChinaBorder: boolean;
  };
  
  // 内容配置
  content: {
    useChineseTitles: boolean;
    translateLabels: boolean;
    showTraditionalCharacters: boolean;
  };
}

/**
 * 默认主题配置
 */
export const DEFAULT_CHINESE_THEME_CONFIG: ChineseThemeConfig = {
  name: '水墨丹青',
  enabled: true,
  
  styles: {
    colorScheme: 'ink-painting',
    fonts: {
      body: 'Noto Serif SC, 思源宋体, PingFang SC, Microsoft YaHei, sans-serif',
      title: 'Ma Shan Zheng, 马善政毛笔楷体, Noto Serif SC, serif',
      mono: 'Noto Serif SC, 思源宋体, 宋体, SimSun, SF Mono, monospace',
    },
    decorations: {
      showSeals: true,
      showCloudPatterns: true,
      showBorders: true,
    },
  },
  
  map: {
    style: 'ink-painting',
    showChineseLabels: true,
    showProvinceBorders: true,
    highlightChinaBorder: true,
  },
  
  content: {
    useChineseTitles: true,
    translateLabels: true,
    showTraditionalCharacters: false,
  },
};

/**
 * 主题管理器类
 */
export class ChineseThemeManager {
  private config: ChineseThemeConfig;
  private observers: Array<(config: ChineseThemeConfig) => void> = [];
  private isApplied = false;
  
  constructor(initialConfig?: Partial<ChineseThemeConfig>) {
    this.config = {
      ...DEFAULT_CHINESE_THEME_CONFIG,
      ...initialConfig,
      styles: {
        ...DEFAULT_CHINESE_THEME_CONFIG.styles,
        ...initialConfig?.styles,
        fonts: {
          ...DEFAULT_CHINESE_THEME_CONFIG.styles.fonts,
          ...initialConfig?.styles?.fonts,
        },
        decorations: {
          ...DEFAULT_CHINESE_THEME_CONFIG.styles.decorations,
          ...initialConfig?.styles?.decorations,
        },
      },
      map: {
        ...DEFAULT_CHINESE_THEME_CONFIG.map,
        ...initialConfig?.map,
      },
      content: {
        ...DEFAULT_CHINESE_THEME_CONFIG.content,
        ...initialConfig?.content,
      },
    };
  }
  
  /**
   * 获取当前配置
   */
  getConfig(): ChineseThemeConfig {
    return { ...this.config };
  }
  
  /**
   * 更新配置
   */
  updateConfig(updates: Partial<ChineseThemeConfig>): void {
    // 深度合并配置
    this.config = {
      ...this.config,
      ...updates,
      styles: {
        ...this.config.styles,
        ...updates.styles,
        fonts: {
          ...this.config.styles.fonts,
          ...updates.styles?.fonts,
        },
        decorations: {
          ...this.config.styles.decorations,
          ...updates.styles?.decorations,
        },
      },
      map: {
        ...this.config.map,
        ...updates.map,
      },
      content: {
        ...this.config.content,
        ...updates.content,
      },
    };
    
    // 通知观察者
    this.notifyObservers();
    
    // 如果主题已应用，重新应用
    if (this.isApplied) {
      this.applyTheme();
    }
  }
  
  /**
   * 启用中国风主题
   */
  enable(): void {
    this.updateConfig({ enabled: true });
  }
  
  /**
   * 禁用中国风主题
   */
  disable(): void {
    this.updateConfig({ enabled: false });
    this.removeTheme();
  }
  
  /**
   * 切换主题启用状态
   */
  toggle(): boolean {
    const newEnabled = !this.config.enabled;
    this.updateConfig({ enabled: newEnabled });
    return newEnabled;
  }
  
  /**
   * 应用中国风主题
   */
  applyTheme(): void {
    if (!this.config.enabled) {
      this.removeTheme();
      return;
    }
    
    try {
      // 1. 设置CSS变量
      this.setCssVariables();
      
      // 2. 注册装饰组件
      registerChineseDecoration();
      
      // 3. 应用字体
      this.applyFonts();
      
      // 4. 更新页面标题
      this.updatePageTitles();
      
      // 5. 添加装饰元素
      this.addDecorations();
      
      // 6. 标记已应用
      this.isApplied = true;
      
      console.log('中国风主题已应用:', this.config.name);
    } catch (error) {
      console.error('应用中国风主题时出错:', error);
    }
  }
  
  /**
   * 移除中国风主题
   */
  removeTheme(): void {
    if (!this.isApplied) return;
    
    try {
      // 移除CSS变量
      this.removeCssVariables();
      
      // 移除装饰元素
      this.removeDecorations();
      
      // 重置页面标题
      this.resetPageTitles();
      
      this.isApplied = false;
      
      console.log('中国风主题已移除');
    } catch (error) {
      console.error('移除中国风主题时出错:', error);
    }
  }
  
  /**
   * 设置CSS变量
   */
  private setCssVariables(): void {
    const root = document.documentElement;
    
    // 设置字体变量
    root.style.setProperty('--font-body', this.config.styles.fonts.body);
    root.style.setProperty('--font-title', this.config.styles.fonts.title);
    root.style.setProperty('--font-mono', this.config.styles.fonts.mono);
    
    // 添加中国风CSS类
    root.classList.add('chinese-theme');
    root.classList.add(`chinese-theme-${this.config.styles.colorScheme}`);
    
    // 根据是否使用繁体字添加类
    if (this.config.content.showTraditionalCharacters) {
      root.classList.add('chinese-traditional');
    } else {
      root.classList.add('chinese-simplified');
    }
  }
  
  /**
   * 移除CSS变量
   */
  private removeCssVariables(): void {
    const root = document.documentElement;
    
    // 移除CSS变量
    root.style.removeProperty('--font-body');
    root.style.removeProperty('--font-title');
    root.style.removeProperty('--font-mono');
    
    // 移除中国风CSS类
    root.classList.remove('chinese-theme');
    root.classList.remove('chinese-theme-ink-painting');
    root.classList.remove('chinese-theme-traditional-blue-green');
    root.classList.remove('chinese-theme-vermilion-ink');
    root.classList.remove('chinese-traditional');
    root.classList.remove('chinese-simplified');
  }
  
  /**
   * 应用字体
   */
  private applyFonts(): void {
    // 创建字体样式表
    const styleId = 'chinese-theme-fonts';
    let style = document.getElementById(styleId) as HTMLStyleElement;
    
    if (!style) {
      style = document.createElement('style');
      style.id = styleId;
      document.head.appendChild(style);
    }
    
    // 设置字体样式
    style.textContent = `
      .chinese-theme {
        font-family: var(--font-body) !important;
      }
      
      .chinese-theme h1,
      .chinese-theme h2,
      .chinese-theme h3,
      .chinese-theme .panel-title,
      .chinese-theme .window-title {
        font-family: var(--font-title) !important;
        letter-spacing: 2px;
      }
      
      .chinese-theme code,
      .chinese-theme pre {
        font-family: var(--font-mono) !important;
      }
    `;
  }
  
  /**
   * 更新页面标题
   */
  private updatePageTitles(): void {
    if (!this.config.content.useChineseTitles) return;
    
    // 更新页面标题
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      const originalTitle = pageTitle.textContent || '';
      pageTitle.textContent = chineseTitle(originalTitle);
    }
    
    // 更新所有面板标题
    setTimeout(() => {
      const panelTitles = document.querySelectorAll('.panel-title, .window-title, .modal-title');
      panelTitles.forEach(titleElement => {
        const originalText = titleElement.textContent || '';
        titleElement.textContent = chineseTitle(originalText);
      });
      
      // 更新所有按钮和标签
      if (this.config.content.translateLabels) {
        this.translateLabels();
      }
    }, 100);
  }
  
  /**
   * 重置页面标题
   */
  private resetPageTitles(): void {
    // 重置页面标题
    const pageTitle = document.querySelector('title');
    if (pageTitle) {
      pageTitle.textContent = 'World Monitor - Global Situation with AI Insights';
    }
  }
  
  /**
   * 翻译标签
   */
  private translateLabels(): void {
    // 这里可以实现标签的自动翻译
    // 由于时间关系，暂时留空
    console.log('标签翻译功能待实现');
  }
  
  /**
   * 添加装饰元素
   */
  private addDecorations(): void {
    if (!this.config.styles.decorations.showCloudPatterns) return;
    
    // 添加祥云背景
    const patternId = 'chinese-cloud-pattern';
    let pattern = document.getElementById(patternId);
    
    if (!pattern) {
      pattern = document.createElement('div');
      pattern.id = patternId;
      pattern.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 5c-5 0-9 4-9 9 0-3-2-5-5-5s-5 2-5 5 2 5 5 5c-5 0-9 4-9 9s4 9 9 9c-3 0-5 2-5 5s2 5 5 5 5-2 5-5c0 5 4 9 9 9s9-4 9-9c0 3 2 5 5 5s5-2 5-5-2-5-5-5c5 0 9-4 9-9s-4-9-9-9c3 0 5-2 5-5s-2-5-5-5-5 2-5 5c0-5-4-9-9-9z" fill="%238b3a3a" fill-opacity="0.03"/%3E%3C/svg%3E');
        z-index: 9999;
        opacity: 0.05;
      `;
      document.body.appendChild(pattern);
    }
  }
  
  /**
   * 移除装饰元素
   */
  private removeDecorations(): void {
    // 移除祥云背景
    const pattern = document.getElementById('chinese-cloud-pattern');
    if (pattern) {
      pattern.remove();
    }
  }
  
  /**
   * 应用中国风地图样式
   */
  applyChineseMapStyle(map: any): void {
    if (!this.config.enabled || !this.config.map.showChineseLabels) return;
    
    try {
      const styleConfig = getChineseMapStyle(this.config.map.style);
      applyChineseMapStyle(map, styleConfig);
    } catch (error) {
      console.error('应用中国风地图样式时出错:', error);
    }
  }
  
  /**
   * 注册观察者
   */
  subscribe(observer: (config: ChineseThemeConfig) => void): () => void {
    this.observers.push(observer);
    
    // 返回取消订阅函数
    return () => {
      const index = this.observers.indexOf(observer);
      if (index > -1) {
        this.observers.splice(index, 1);
      }
    };
  }
  
  /**
   * 通知观察者
   */
  private notifyObservers(): void {
    this.observers.forEach(observer => {
      try {
        observer({ ...this.config });
      } catch (error) {
        console.error('通知观察者时出错:', error);
      }
    });
  }
  
  /**
   * 保存配置到本地存储
   */
  saveToLocalStorage(): void {
    try {
      localStorage.setItem('worldmonitor-chinese-theme', JSON.stringify(this.config));
    } catch (error) {
      console.error('保存主题配置到本地存储时出错:', error);
    }
  }
  
  /**
   * 从本地存储加载配置
   */
  loadFromLocalStorage(): ChineseThemeConfig | null {
    try {
      const saved = localStorage.getItem('worldmonitor-chinese-theme');
      if (saved) {
        const config = JSON.parse(saved) as ChineseThemeConfig;
        this.updateConfig(config);
        return config;
      }
    } catch (error) {
      console.error('从本地存储加载主题配置时出错:', error);
    }
    
    return null;
  }
  
  /**
   * 重置为默认配置
   */
  resetToDefaults(): void {
    this.updateConfig(DEFAULT_CHINESE_THEME_CONFIG);
  }
}

/**
 * 全局主题管理器实例
 */
let globalThemeManager: ChineseThemeManager | null = null;

/**
 * 获取全局主题管理器实例
 */
export function getChineseThemeManager(): ChineseThemeManager {
  if (!globalThemeManager) {
    globalThemeManager = new ChineseThemeManager();
    
    // 尝试从本地存储加载配置
    globalThemeManager.loadFromLocalStorage();
    
    // 自动保存配置更改
    globalThemeManager.subscribe(() => {
      globalThemeManager?.saveToLocalStorage();
    });
  }
  
  return globalThemeManager;
}

/**
 * 初始化中国风主题
 */
export function initChineseTheme(autoApply: boolean = true): ChineseThemeManager {
  const manager = getChineseThemeManager();
  
  if (autoApply) {
    // 延迟应用主题，确保DOM已加载
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        manager.applyTheme();
      });
    } else {
      manager.applyTheme();
    }
  }
  
  return manager;
}

/**
 * 快速启用中国风主题
 */
export function enableChineseTheme(): void {
  const manager = getChineseThemeManager();
  manager.enable();
  manager.applyTheme();
}

/**
 * 快速禁用中国风主题
 */
export function disableChineseTheme(): void {
  const manager = getChineseThemeManager();
  manager.disable();
}

/**
 * 切换中国风主题
 */
export function toggleChineseTheme(): boolean {
  const manager = getChineseThemeManager();
  const isEnabled = manager.toggle();
  
  if (isEnabled) {
    manager.applyTheme();
  } else {
    manager.removeTheme();
  }
  
  return isEnabled;
}

export default {
  ChineseThemeManager,
  DEFAULT_CHINESE_THEME_CONFIG,
  getChineseThemeManager,
  initChineseTheme,
  enableChineseTheme,
  disableChineseTheme,
  toggleChineseTheme,
};
