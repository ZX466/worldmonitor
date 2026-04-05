/**
 * 中国风装饰组件
 * 天下观 · 全球态势感知平台 - 中国风UI元素
 */

import { html } from '@/utils';

/**
 * 创建中国风印章元素
 */
export function createChineseSeal(text: string = "观", options?: {
  size?: number;
  color?: string;
  bgColor?: string;
}) {
  const size = options?.size || 40;
  const color = options?.color || '#c41e3a';
  const bgColor = options?.bgColor || 'rgba(196, 30, 58, 0.1)';
  
  const template = html`
    <div class="chinese-seal" 
         style="width: ${size}px; height: ${size}px; border-color: ${color}; background: ${bgColor}; color: ${color}">
      <span style="font-family: 'Ma Shan Zheng', 'Noto Serif SC'; font-size: ${size * 0.4}px">
        ${text}
      </span>
    </div>
  `;
  
  return template;
}

/**
 * 创建祥云装饰背景
 */
export function createCloudPatternBackground(options?: {
  color?: string;
  opacity?: number;
}) {
  const color = options?.color || '#8b3a3a';
  const opacity = options?.opacity || 0.03;
  
  return html`
    <div class="chinese-pattern-bg" style="
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M30 5c-5 0-9 4-9 9 0-3-2-5-5-5s-5 2-5 5 2 5 5 5c-5 0-9 4-9 9s4 9 9 9c-3 0-5 2-5 5s2 5 5 5 5-2 5-5c0 5 4 9 9 9s9-4 9-9c0 3 2 5 5 5s5-2 5-5-2-5-5-5c5 0 9-4 9-9s-4-9-9-9c3 0 5-2 5-5s-2-5-5-5-5 2-5 5c0-5-4-9-9-9z" fill="${color.replace('#', '%23')}" fill-opacity="${opacity}"/%3E%3C/svg%3E');
      z-index: 1;
    "></div>
  `;
}

/**
 * 创建中国风边框
 */
export function createChineseBorder(content: string | HTMLElement, options?: {
  className?: string;
  outerBorderColor?: string;
  innerBorderColor?: string;
}) {
  const outerBorderColor = options?.outerBorderColor || '#8b3a3a';
  const innerBorderColor = options?.innerBorderColor || '#3a2828';
  
  const template = html`
    <div class="chinese-border" style="
      border-color: ${outerBorderColor};
      position: relative;
      padding: 8px;
    ">
      <div style="
        position: absolute;
        top: 4px;
        left: 4px;
        right: 4px;
        bottom: 4px;
        border: 1px solid ${innerBorderColor};
        pointer-events: none;
      "></div>
      ${typeof content === 'string' ? html`<div>${content}</div>` : content}
    </div>
  `;
  
  return template;
}

/**
 * 创建中国风分隔线
 */
export function createChineseDivider(options?: {
  type?: 'solid' | 'dashed' | 'gradient';
  color?: string;
}) {
  const type = options?.type || 'gradient';
  const color = options?.color || '#8b3a3a';
  
  if (type === 'gradient') {
    return html`
      <div class="chinese-divider" style="
        height: 1px;
        background: linear-gradient(90deg, 
          transparent 0%, 
          ${color} 20%, 
          #c44536 50%, 
          ${color} 80%, 
          transparent 100%
        );
        margin: 16px 0;
      "></div>
    `;
  } else if (type === 'dashed') {
    return html`
      <div class="chinese-divider" style="
        height: 1px;
        border: none;
        border-top: 1px dashed ${color};
        margin: 12px 0;
        opacity: 0.5;
      "></div>
    `;
  } else {
    return html`
      <div class="chinese-divider" style="
        height: 1px;
        background: ${color};
        margin: 16px 0;
      "></div>
    `;
  }
}

/**
 * 创建中国风标题
 */
export function createChineseTitle(text: string, level: 1 | 2 | 3 | 4 = 1) {
  const fontSize = level === 1 ? '1.8rem' : level === 2 ? '1.4rem' : level === 3 ? '1.2rem' : '1rem';
  const margin = level === 1 ? '0 0 24px' : level === 2 ? '0 0 20px' : level === 3 ? '0 0 16px' : '0 0 12px';
  
  return html`
    <h${level} class="chinese-title" style="
      font-family: 'Ma Shan Zheng', 'Noto Serif SC', serif;
      font-size: ${fontSize};
      font-weight: 400;
      letter-spacing: 4px;
      color: var(--text);
      margin: ${margin};
      position: relative;
      display: inline-block;
      padding-bottom: 8px;
    ">
      ${text}
      <div style="
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 60px;
        height: 2px;
        background: var(--border-strong);
      "></div>
    </h${level}>
  `;
}

/**
 * 创建中国风按钮
 */
export function createChineseButton(text: string, options?: {
  type?: 'primary' | 'secondary' | 'gold';
  onClick?: () => void;
  disabled?: boolean;
}) {
  const type = options?.type || 'primary';
  const isDisabled = options?.disabled || false;
  
  let styles = '';
  if (type === 'primary') {
    styles = `
      background: linear-gradient(135deg, var(--accent) 0%, #a02020 100%);
      border: 2px solid var(--border-strong);
      color: var(--text);
      font-family: 'Ma Shan Zheng', 'Noto Serif SC';
      letter-spacing: 2px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    `;
  } else if (type === 'gold') {
    styles = `
      background: transparent;
      border: 1px solid var(--accent-gold);
      color: var(--accent-gold);
    `;
  } else {
    styles = `
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-secondary);
    `;
  }
  
  const disabledStyle = isDisabled ? 'opacity: 0.5; cursor: not-allowed;' : '';
  
  return html`
    <button class="chinese-button" style="
      ${styles}
      ${disabledStyle}
      padding: 8px 20px;
      font-family: var(--font-body);
      cursor: ${isDisabled ? 'not-allowed' : 'pointer'};
      transition: all 0.2s;
      border-radius: 0;
      outline: none;
      position: relative;
      overflow: hidden;
    " onclick="${isDisabled ? '' : (options?.onClick || '')}">
      ${text}
      ${!isDisabled ? html`<div style="
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        opacity: 0;
        transition: opacity 0.2s;
      "></div>` : ''}
    </button>
  `;
}

/**
 * 创建中国风卡片
 */
export function createChineseCard(content: string | HTMLElement, options?: {
  title?: string;
  showSeal?: boolean;
  showBorder?: boolean;
}) {
  const showSeal = options?.showSeal !== false;
  const showBorder = options?.showBorder !== false;
  
  const borderStyle = showBorder ? `
    border: 1px solid var(--border);
    position: relative;
    padding: 16px;
    background: var(--surface);
    box-shadow: 0 4px 20px rgba(139, 58, 58, 0.2);
  ` : `
    position: relative;
    padding: 16px;
    background: var(--surface);
  `;
  
  return html`
    <div class="chinese-card" style="${borderStyle}">
      ${showSeal ? createChineseSeal("观", { size: 24 }) : ''}
      
      ${options?.title ? createChineseTitle(options.title, 3) : ''}
      
      <div style="margin-top: ${options?.title ? '12px' : '0'}">
        ${typeof content === 'string' ? html`<div>${content}</div>` : content}
      </div>
      
      ${createChineseDivider({ type: 'gradient' })}
    </div>
  `;
}

/**
 * 创建中国风进度条
 */
export function createChineseProgress(percentage: number, options?: {
  height?: number;
  showLabel?: boolean;
  color?: string;
}) {
  const height = options?.height || 4;
  const showLabel = options?.showLabel !== false;
  const color = options?.color || 'var(--accent)';
  
  return html`
    <div style="
      display: flex;
      align-items: center;
      gap: 12px;
    ">
      <div class="chinese-progress" style="
        flex: 1;
        height: ${height}px;
        background: var(--surface);
        border: 1px solid var(--border-subtle);
        border-radius: 0;
        overflow: hidden;
        position: relative;
      ">
        <div class="chinese-progress-fill" style="
          height: 100%;
          width: ${Math.min(Math.max(percentage, 0), 100)}%;
          background: linear-gradient(90deg, ${color} 0%, var(--accent-gold) 100%);
          transition: width 0.3s;
        "></div>
      </div>
      
      ${showLabel ? html`
        <div style="
          font-family: var(--font-body);
          font-size: 0.9em;
          color: var(--text-dim);
          min-width: 40px;
          text-align: right;
        ">
          ${Math.round(percentage)}%
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * 创建中国风标签
 */
export function createChineseTag(text: string, options?: {
  type?: 'info' | 'warning' | 'success' | 'danger';
  size?: 'small' | 'medium' | 'large';
}) {
  const type = options?.type || 'info';
  const size = options?.size || 'medium';
  
  const sizeMap = {
    small: '0.75em',
    medium: '0.85em',
    large: '1em'
  };
  
  const colorMap = {
    info: 'var(--semantic-info)',
    warning: 'var(--semantic-elevated)',
    success: 'var(--semantic-positive)',
    danger: 'var(--semantic-critical)'
  };
  
  return html`
    <span class="chinese-tag" style="
      display: inline-block;
      padding: 2px 8px;
      font-size: ${sizeMap[size]};
      font-weight: 600;
      letter-spacing: 1px;
      border: 1px solid ${colorMap[type]};
      background: ${colorMap[type]}22;
      color: ${colorMap[type]};
      border-radius: 0;
      font-family: var(--font-body);
    ">
      ${text}
    </span>
  `;
}

/**
 * 创建太极图加载器
 */
export function createTaiChiLoader(size: number = 32) {
  return html`
    <div class="tai-chi-loader" style="
      width: ${size}px;
      height: ${size}px;
      position: relative;
      animation: rotate 2s linear infinite;
    ">
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 2px solid var(--border);
        border-top-color: var(--accent);
        border-right-color: var(--accent-gold);
        border-radius: 50%;
      "></div>
      <div style="
        position: absolute;
        top: 0;
        left: 50%;
        width: 50%;
        height: 100%;
        background: var(--accent);
        border-radius: 100% 0 0 100% / 50% 0 0 50%;
        transform-origin: right center;
      "></div>
      <div style="
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: var(--bg);
        border-radius: 0 100% 100% 0 / 0 50% 50% 0;
        transform-origin: left center;
      "></div>
    </div>
  `;
}

/**
 * 创建中国风时间显示
 */
export function createChineseDateTime(date: Date = new Date()) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  
  const chineseMonth = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month - 1];
  
  return html`
    <div class="chinese-datetime" style="
      font-family: var(--font-title);
      color: var(--text);
      text-align: center;
      letter-spacing: 1px;
    ">
      <div style="
        font-size: 0.9em;
        color: var(--text-dim);
        margin-bottom: 4px;
      ">
        ${year}年${chineseMonth}月${day}日
      </div>
      <div style="
        font-size: 1.4em;
        font-weight: 600;
        color: var(--accent);
      ">
        ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}
      </div>
    </div>
  `;
}

/**
 * 创建中国风数据仪表
 */
export function createChineseGauge(value: number, max: number = 100, options?: {
  label?: string;
  unit?: string;
}) {
  const percentage = (value / max) * 100;
  const color = percentage > 70 ? 'var(--semantic-critical)' : 
                percentage > 40 ? 'var(--semantic-elevated)' : 'var(--semantic-positive)';
  
  return html`
    <div class="chinese-gauge" style="
      position: relative;
      width: 80px;
      height: 80px;
    ">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <!-- 背景圆 -->
        <circle cx="40" cy="40" r="36" fill="none" 
                stroke="var(--surface)" stroke-width="8" />
        
        <!-- 进度弧 -->
        <circle cx="40" cy="40" r="36" fill="none" 
                stroke="${color}" stroke-width="8" 
                stroke-linecap="butt"
                stroke-dasharray="${2 * Math.PI * 36}"
                stroke-dashoffset="${2 * Math.PI * 36 * (1 - percentage / 100)}"
                transform="rotate(-90 40 40)" />
        
        <!-- 中心数值 -->
        <text x="40" y="45" text-anchor="middle" 
              fill="var(--text)" 
              font-family="var(--font-title)"
              font-size="16"
              font-weight="600">
          ${Math.round(value)}
        </text>
      </svg>
      
      ${options?.label ? html`
        <div style="
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.8em;
          color: var(--text-dim);
        ">
          ${options.label}
        </div>
      ` : ''}
      
      ${options?.unit ? html`
        <div style="
          position: absolute;
          top: 52px;
          left: 0;
          right: 0;
          text-align: center;
          font-family: var(--font-body);
          font-size: 0.7em;
          color: var(--text-muted);
        ">
          ${options.unit}
        </div>
      ` : ''}
    </div>
  `;
}

/**
 * 注册中国风主题组件
 */
export function registerChineseDecoration() {
  // 添加全局CSS样式
  if (!document.querySelector('#chinese-decoration-styles')) {
    const style = document.createElement('style');
    style.id = 'chinese-decoration-styles';
    style.textContent = `
      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
}

export default {
  createChineseSeal,
  createCloudPatternBackground,
  createChineseBorder,
  createChineseDivider,
  createChineseTitle,
  createChineseButton,
  createChineseCard,
  createChineseProgress,
  createChineseTag,
  createTaiChiLoader,
  createChineseDateTime,
  createChineseGauge,
  registerChineseDecoration
};
