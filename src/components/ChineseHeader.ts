/**
 * 中国风头部组件
 * 天下观 · 全球态势感知平台
 */

import { chineseTitle, getChinesePanelTitle } from '@/config/chinese-titles';
import { html } from '@/utils';
import { createChineseTitle, createChineseSeal, createChineseDivider } from './ChineseDecoration';

export interface ChineseHeaderOptions {
  title?: string;
  subtitle?: string;
  showSeal?: boolean;
  showDivider?: boolean;
  variant?: 'full' | 'tech' | 'finance' | 'happy';
}

/**
 * 创建中国风应用标题
 */
export function createChineseAppHeader(options: ChineseHeaderOptions = {}) {
  const title = options.title || '天下观';
  const subtitle = options.subtitle || '全球态势感知平台';
  const showSeal = options.showSeal !== false;
  const showDivider = options.showDivider !== false;
  const variant = options.variant || 'full';
  
  // 根据变体选择颜色和文案
  let variantConfig = {
    sealText: '观',
    primaryColor: '#c41e3a', // 朱红
    secondaryColor: '#d4a017', // 金黄
    bgColor: 'rgba(196, 30, 58, 0.1)',
  };
  
  switch (variant) {
    case 'tech':
      variantConfig = {
        sealText: '技',
        primaryColor: '#1e90ff', // 科技蓝
        secondaryColor: '#00ced1', // 青色
        bgColor: 'rgba(30, 144, 255, 0.1)',
      };
      break;
    case 'finance':
      variantConfig = {
        sealText: '财',
        primaryColor: '#32cd32', // 金融绿
        secondaryColor: '#daa520', // 金黄
        bgColor: 'rgba(50, 205, 50, 0.1)',
      };
      break;
    case 'happy':
      variantConfig = {
        sealText: '喜',
        primaryColor: '#ff69b4', // 粉色
        secondaryColor: '#ffd700', // 金色
        bgColor: 'rgba(255, 105, 180, 0.1)',
      };
      break;
  }
  
  return html`
    <div class="chinese-app-header" style="
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
      border-bottom: 2px solid var(--border);
      padding: 12px 20px;
      position: relative;
    ">
      <!-- 左侧标题区域 -->
      <div style="
        display: flex;
        align-items: center;
        gap: 16px;
        flex: 1;
      ">
        ${showSeal ? createChineseSeal(variantConfig.sealText, {
          size: 48,
          color: variantConfig.primaryColor,
          bgColor: variantConfig.bgColor
        }) : ''}
        
        <div>
          <div style="
            display: flex;
            align-items: baseline;
            gap: 12px;
          ">
            <h1 style="
              font-family: 'Ma Shan Zheng', 'Noto Serif SC', serif;
              font-size: 1.8rem;
              font-weight: 400;
              letter-spacing: 6px;
              color: var(--text);
              margin: 0;
              position: relative;
            ">
              ${title}
              <div style="
                position: absolute;
                bottom: -4px;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, 
                  transparent 0%, 
                  ${variantConfig.primaryColor} 30%, 
                  ${variantConfig.secondaryColor} 70%, 
                  transparent 100%
                );
              "></div>
            </h1>
            
            <div style="
              font-family: var(--font-body);
              font-size: 0.9rem;
              color: var(--text-dim);
              letter-spacing: 1px;
            ">
              ${subtitle}
            </div>
          </div>
        </div>
      </div>
      
      <!-- 右侧时间显示 -->
      <div id="chinese-datetime-display" style="
        font-family: var(--font-title);
        color: var(--text);
        text-align: right;
        min-width: 160px;
      ">
        <div style="
          font-size: 0.9rem;
          color: var(--text-dim);
          margin-bottom: 2px;
        ">
          加载中...
        </div>
        <div style="
          font-size: 1.2rem;
          font-weight: 600;
          color: ${variantConfig.primaryColor};
        ">
          --:--:--
        </div>
      </div>
      
      ${showDivider ? html`
        <div style="
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            transparent 0%, 
            ${variantConfig.primaryColor} 50%, 
            transparent 100%
          );
        "></div>
      ` : ''}
    </div>
  `;
}

/**
 * 创建中国风导航菜单
 */
export function createChineseNavigation(items: Array<{
  id: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}>) {
  return html`
    <nav class="chinese-navigation" style="
      display: flex;
      gap: 2px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 0;
      padding: 2px;
      overflow-x: auto;
    ">
      ${items.map(item => html`
        <button class="chinese-nav-item" style="
          flex: 1;
          min-width: 80px;
          padding: 8px 16px;
          background: ${item.active ? 'var(--surface-active)' : 'transparent'};
          border: 1px solid ${item.active ? 'var(--border-strong)' : 'transparent'};
          color: ${item.active ? 'var(--accent)' : 'var(--text-secondary)'};
          font-family: var(--font-body);
          font-size: 0.9rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          position: relative;
          overflow: hidden;
        " onclick="${item.onClick || ''}">
          ${getChinesePanelTitle(item.id) || chineseTitle(item.label)}
          
          ${item.active ? html`
            <div style="
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 60%;
              height: 2px;
              background: var(--accent);
            "></div>
          ` : ''}
        </button>
      `)}
    </nav>
  `;
}

/**
 * 创建中国风标签页
 */
export function createChineseTabs(items: Array<{
  id: string;
  label: string;
  active?: boolean;
  badge?: number | string;
}>, onClick?: (id: string) => void) {
  return html`
    <div class="chinese-tabs" style="
      display: flex;
      border-bottom: 2px solid var(--border);
      margin-bottom: 16px;
    ">
      ${items.map(item => html`
        <button class="chinese-tab" style="
          padding: 10px 20px;
          background: ${item.active ? 'var(--surface)' : 'transparent'};
          border: 1px solid ${item.active ? 'var(--border)' : 'transparent'};
          border-bottom: ${item.active ? '2px solid var(--surface)' : 'none'};
          color: ${item.active ? 'var(--accent)' : 'var(--text-secondary)'};
          font-family: var(--font-body);
          font-weight: ${item.active ? '600' : '400'};
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          margin-bottom: ${item.active ? '-2px' : '0'};
          display: flex;
          align-items: center;
          gap: 8px;
        " onclick="${onClick ? `window.dispatchEvent(new CustomEvent('chinese-tab-click', { detail: '${item.id}' }))` : ''}">
          <span>${getChinesePanelTitle(item.id) || chineseTitle(item.label)}</span>
          
          ${item.badge ? html`
            <span style="
              background: var(--accent);
              color: var(--surface);
              font-size: 0.7rem;
              padding: 2px 6px;
              border-radius: 10px;
              min-width: 20px;
              text-align: center;
            ">
              ${item.badge}
            </span>
          ` : ''}
          
          ${item.active ? html`
            <div style="
              position: absolute;
              bottom: -2px;
              left: 0;
              right: 0;
              height: 2px;
              background: var(--border-strong);
            "></div>
          ` : ''}
        </button>
      `)}
    </div>
  `;
}

/**
 * 创建中国风面包屑导航
 */
export function createChineseBreadcrumb(paths: Array<{
  label: string;
  id?: string;
}>) {
  return html`
    <div class="chinese-breadcrumb" style="
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-body);
      font-size: 0.9rem;
      color: var(--text-dim);
      padding: 8px 0;
    ">
      <span style="color: var(--accent);">位置：</span>
      
      ${paths.map((path, index) => html`
        ${index > 0 ? html`
          <span style="color: var(--text-faint);">/</span>
        ` : ''}
        
        <span style="
          color: ${index === paths.length - 1 ? 'var(--text)' : 'var(--text-secondary)'};
          ${index === paths.length - 1 ? 'font-weight: 500;' : ''}
        ">
          ${getChinesePanelTitle(path.id || '') || chineseTitle(path.label)}
        </span>
      `)}
    </div>
  `;
}

/**
 * 创建中国风状态栏
 */
export function createChineseStatusBar(items: Array<{
  label: string;
  value: string | number;
  status?: 'success' | 'warning' | 'error' | 'info';
}>) {
  const statusColors = {
    success: '#32cd32',
    warning: '#daa520',
    error: '#c41e3a',
    info: '#4a708b',
  };
  
  return html`
    <div class="chinese-status-bar" style="
      display: flex;
      gap: 20px;
      padding: 8px 16px;
      background: var(--surface);
      border: 1px solid var(--border-subtle);
      border-radius: 0;
      flex-wrap: wrap;
    ">
      ${items.map(item => html`
        <div class="status-item" style="
          display: flex;
          align-items: center;
          gap: 8px;
        ">
          <div class="status-dot" style="
            width: 8px;
            height: 8px;
            border-radius: 0;
            background: ${item.status ? statusColors[item.status] : 'var(--text-dim)'};
          "></div>
          
          <span style="
            font-family: var(--font-body);
            font-size: 0.85rem;
            color: var(--text-dim);
          ">
            ${item.label}：
          </span>
          
          <span style="
            font-family: var(--font-body);
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--text);
          ">
            ${item.value}
          </span>
        </div>
      `)}
    </div>
  `;
}

/**
 * 创建中国风页面头部组件
 */
export function createChinesePageHeader(options: {
  title: string;
  subtitle?: string;
  breadcrumb?: Array<{ label: string; id?: string }>;
  actions?: Array<{ label: string; onClick: () => void }>;
}) {
  return html`
    <div class="chinese-page-header" style="
      margin-bottom: 24px;
    ">
      ${options.breadcrumb && options.breadcrumb.length > 0 ? 
        createChineseBreadcrumb(options.breadcrumb) : ''}
      
      <div style="
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 8px;
      ">
        <div>
          ${createChineseTitle(options.title, 1)}
          
          ${options.subtitle ? html`
            <div style="
              font-family: var(--font-body);
              font-size: 1rem;
              color: var(--text-secondary);
              margin-top: 4px;
              max-width: 600px;
              line-height: 1.6;
            ">
              ${options.subtitle}
            </div>
          ` : ''}
        </div>
        
        ${options.actions && options.actions.length > 0 ? html`
          <div style="
            display: flex;
            gap: 8px;
          ">
            ${options.actions.map(action => html`
              <button style="
                padding: 8px 16px;
                background: var(--surface);
                border: 1px solid var(--border);
                color: var(--text-secondary);
                font-family: var(--font-body);
                cursor: pointer;
                transition: all 0.2s;
              " onclick="${action.onClick}">
                ${action.label}
              </button>
            `)}
          </div>
        ` : ''}
      </div>
      
      ${createChineseDivider({ type: 'gradient' })}
    </div>
  `;
}

/**
 * 初始化中文头部功能
 */
export function initChineseHeader() {
  // 更新时间显示
  function updateDateTime() {
    const display = document.getElementById('chinese-datetime-display');
    if (!display) return;
    
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    
    const chineseMonth = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month - 1];
    
    const dateElement = display.querySelector('div:nth-child(1)');
    const timeElement = display.querySelector('div:nth-child(2)');
    
    if (dateElement) {
      dateElement.textContent = `${year}年${chineseMonth}月${day}日`;
    }
    if (timeElement) {
      timeElement.textContent = `${hour}:${minute}:${second}`;
    }
  }
  
  // 开始更新时间
  updateDateTime();
  setInterval(updateDateTime, 1000);
  
  // 监听标签页点击事件
  window.addEventListener('chinese-tab-click', (event: any) => {
    const tabId = event.detail;
    console.log('Chinese tab clicked:', tabId);
  });
}

export default {
  createChineseAppHeader,
  createChineseNavigation,
  createChineseTabs,
  createChineseBreadcrumb,
  createChineseStatusBar,
  createChinesePageHeader,
  initChineseHeader,
};
