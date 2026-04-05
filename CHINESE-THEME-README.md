# 天下观 - 中国风主题指南

## 概述

本项目为 World Monitor 全球情报仪表盘添加了完整的中国风（中式）主题支持，将现代科技界面与中国传统文化美学完美结合。

## 特色功能

### 🎨 核心特性

1. **水墨丹青色彩体系** - 基于传统中国画色彩设计
   - 朱红（强调色）
   - 藏青（背景色）
   - 米黄（文字色）
   - 宣纸白（面板色）

2. **传统字体系统**
   - 标题：马善政毛笔楷体
   - 正文：思源宋体
   - 代码：宋体/SimSun

3. **中式装饰元素**
   - 印章效果（各面板角标）
   - 祥云纹理背景
   - 朱红装饰线条
   - 回字纹边框

### 🗺️ 地图特色

1. **三种地图风格**
   - **水墨风格** - 传统水墨画效果
   - **丹青风格** - 青绿山水效果
   - **朱砂风格** - 红黑对比效果

2. **中文标注**
   - 中国主要城市中文标注
   - 省级行政区划颜色区分
   - 中国边界高亮显示

### 🎭 交互体验

1. **直角设计** - 传统印章般的直角边框
2. **动态效果** - 朱红渐变装饰线
3. **响应式布局** - 完美适配各种屏幕尺寸

## 使用方法

### 自动启用

中国风主题默认自动启用。启动应用时，主题会自动应用。

### 手动控制

#### 控制台命令

在浏览器开发者工具中，可以使用以下命令：

```javascript
// 启用主题
chineseTheme.enable()

// 禁用主题
chineseTheme.disable()

// 切换状态
chineseTheme.toggle()

// 查看状态
chineseTheme.status()

// 切换样式
chineseTheme.setStyle('ink-painting')          // 水墨风格
chineseTheme.setStyle('traditional-blue-green') // 丹青风格
chineseTheme.setStyle('vermilion-ink')         // 朱砂风格

// 帮助信息
chineseTheme.help()

// 快捷别名
ct.enable()  // 等同于 chineseTheme.enable()
```

#### 页面按钮

页面右下角提供两个控制按钮：

1. **🎨 中国风** - 切换主题启用/禁用
2. **🎨 切换样式** - 选择不同的中国风样式

### 编程接口

```typescript
// 导入主题管理器
import { 
  enableChineseTheme, 
  disableChineseTheme,
  toggleChineseTheme,
  getChineseThemeManager 
} from './utils/chinese-theme-manager';

// 快速启用
enableChineseTheme();

// 获取管理器
const manager = getChineseThemeManager();

// 更新配置
manager.updateConfig({
  name: '自定义主题',
  styles: {
    colorScheme: 'vermilion-ink',
  },
  map: {
    showChineseLabels: true,
    highlightChinaBorder: true,
  },
});

// 应用主题
manager.applyTheme();
```

## 文件结构

```
worldmonitor/
├── src/
│   ├── styles/
│   │   └── chinese-theme.css          # 中国风核心样式
│   ├── components/
│   │   └── ChineseDecoration.ts       # 中国风装饰组件
│   ├── config/
│   │   ├── chinese-titles.ts          # 中文标题映射
│   │   └── chinese-map-style.ts       # 地图样式配置
│   └── utils/
│       ├── chinese-theme-manager.ts   # 主题管理器
│       └── chinese-theme-quick-start.ts # 快速启动工具
├── index.html                         # 已更新为中文元信息
└── test-chinese-theme.html            # 主题测试页面
```

## 技术实现

### CSS 变量系统

使用 CSS 变量定义完整的中国风色彩体系：

```css
:root {
  --bg: #0d0a0a;                    /* 墨色背景 */
  --bg-secondary: #1a1215;          /* 藏红底色 */
  --surface: #1e1515;               /* 朱砂面板色 */
  --border: #8b3a3a;                /* 朱红边框 */
  --text: #f7efe6;                  /* 宣纸白文字 */
  --accent: #d42c20;                /* 朱红强调色 */
  
  --font-body: 'Noto Serif SC', ...; /* 思源宋体 */
  --font-title: 'Ma Shan Zheng', ...; /* 毛笔楷体 */
}
```

### 动态主题切换

通过 JavaScript 动态修改 CSS 变量和应用装饰元素：

```typescript
// 设置字体
document.documentElement.style.setProperty('--font-body', fontFamily);

// 添加中国风CSS类
document.documentElement.classList.add('chinese-theme');
```

### 装饰元素生成

使用 SVG 和内联样式创建中国风装饰：

```typescript
// 创建印章
function createChineseSeal(text: string) {
  return `<div class="chinese-seal">${text}</div>`;
}

// 创建祥云背景
function createCloudPattern() {
  return `background-image: url('data:image/svg+xml,...')`;
}
```

## 自定义配置

### 主题配置选项

```typescript
interface ChineseThemeConfig {
  name: string;                    // 主题名称
  enabled: boolean;                // 是否启用
  
  styles: {
    colorScheme: 'ink-painting' | 'traditional-blue-green' | 'vermilion-ink';
    fonts: {
      body: string;
      title: string;
      mono: string;
    };
    decorations: {
      showSeals: boolean;          // 显示印章
      showCloudPatterns: boolean;  // 显示祥云
      showBorders: boolean;        // 显示中式边框
    };
  };
  
  map: {
    style: string;                 // 地图样式
    showChineseLabels: boolean;    // 显示中文标注
    showProvinceBorders: boolean;  // 显示省份边界
    highlightChinaBorder: boolean; // 高亮中国边界
  };
  
  content: {
    useChineseTitles: boolean;     // 使用中文标题
    translateLabels: boolean;      // 翻译标签
    showTraditionalCharacters: boolean; // 显示繁体字
  };
}
```

### 本地存储

主题配置会自动保存到 `localStorage`，下次访问时自动恢复。

## 测试页面

项目包含一个完整的测试页面，展示所有中国风元素：

```
file:///D:/aidevelop/project6/worldmonitor/test-chinese-theme.html
```

## 浏览器兼容性

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 性能考虑

1. **字体加载** - 使用 Google Fonts CDN，异步加载
2. **CSS 变量** - 使用原生 CSS 变量，性能优秀
3. **SVG 装饰** - 内联 SVG，减少 HTTP 请求
4. **懒加载** - 装饰元素按需加载

## 扩展建议

### 未来可添加的功能

1. **更多中国风样式**
   - 青花瓷风格
   - 剪纸风格
   - 年画风格

2. **文化元素**
   - 十二生肖图标
   - 传统节气主题
   - 古诗词引用

3. **交互增强**
   - 毛笔书写动画
   - 古琴音效
   - 传统节日主题

### 开发者扩展

```typescript
// 添加自定义装饰
import { ChineseThemeManager } from './utils/chinese-theme-manager';

class CustomChineseTheme extends ChineseThemeManager {
  addCustomDecoration() {
    // 实现自定义装饰
  }
}
```

## 贡献指南

欢迎提交 Pull Request 来改进中国风主题：

1. 保持与传统美学的一致性
2. 确保与现代科技界面的兼容性
3. 提供充分的测试用例
4. 更新相关文档

## 许可证

中国风主题遵循与主项目相同的 AGPL-3.0 许可证。

## 联系方式

如有问题或建议，请通过项目 Issues 页面提交。

---

**天下观 · 全球态势感知平台**  
*水墨丹青，科技之美*
