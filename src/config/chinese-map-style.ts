/**
 * 中国风地图样式配置
 * 天下观 · 山河图样式
 */

/**
 * 中国风地图样式配置
 */
export interface ChineseMapStyleConfig {
  // 地图样式
  styleUrl: string;
  
  // 颜色方案
  colors: {
    land: string;
    water: string;
    countryBorder: string;
    disputedBorder: string;
    coastline: string;
    roads: string;
    labels: string;
  };
  
  // 文字样式
  fonts: {
    label: string;
    title: string;
    annotation: string;
  };
  
  // 图层样式
  layers: {
    // 国界样式
    countryBorders: {
      lineWidth: number;
      lineColor: string;
      lineDasharray?: number[];
    };
    
    // 中国边界样式
    chinaBorder: {
      lineWidth: number;
      lineColor: string;
    };
    
    // 省份边界样式
    provinceBorders: {
      lineWidth: number;
      lineColor: string;
      lineOpacity: number;
    };
    
    // 主要河流样式
    rivers: {
      lineWidth: number;
      lineColor: string;
    };
    
    // 主要山脉样式
    mountains: {
      fillColor: string;
      strokeColor: string;
    };
  };
}

/**
 * 水墨风格地图样式
 */
export const INK_PAINTING_STYLE: ChineseMapStyleConfig = {
  styleUrl: '/map-styles/chinese-ink-style.json',
  
  colors: {
    land: '#f5f2e8', // 宣纸色
    water: '#e8f0f8', // 淡青
    countryBorder: '#8b3a3a', // 朱红
    disputedBorder: '#c44536', // 亮朱红
    coastline: '#6b8c9c', // 石青
    roads: '#a67c52', // 赭石
    labels: '#1a0a0a', // 墨黑
  },
  
  fonts: {
    label: 'Noto Serif SC, SimSun, serif',
    title: 'Ma Shan Zheng, Noto Serif SC, serif',
    annotation: 'Noto Serif SC, serif',
  },
  
  layers: {
    countryBorders: {
      lineWidth: 1.5,
      lineColor: '#8b3a3a',
      lineDasharray: [5, 3], // 虚线样式
    },
    
    chinaBorder: {
      lineWidth: 3,
      lineColor: '#c41e3a', // 中国红
    },
    
    provinceBorders: {
      lineWidth: 1,
      lineColor: '#3a2828',
      lineOpacity: 0.5,
    },
    
    rivers: {
      lineWidth: 1,
      lineColor: '#4a708b', // 灰蓝
    },
    
    mountains: {
      fillColor: '#e6d9c8', // 米黄
      strokeColor: '#c7a985', // 赭石
    },
  },
};

/**
 * 传统丹青风格地图样式
 */
export const TRADITIONAL_BLUE_GREEN_STYLE: ChineseMapStyleConfig = {
  styleUrl: '/map-styles/traditional-blue-green-style.json',
  
  colors: {
    land: '#f0e8d8', // 淡黄
    water: '#d8e8f0', // 淡青
    countryBorder: '#1e4d6b', // 靛青
    disputedBorder: '#2e8b57', // 石绿
    coastline: '#8a6c4a', // 浅棕
    roads: '#664f37', // 深棕
    labels: '#1a1212', // 深灰
  },
  
  fonts: {
    label: 'Noto Serif SC, serif',
    title: 'Ma Shan Zheng, Noto Serif SC, serif',
    annotation: 'Noto Serif SC, serif',
  },
  
  layers: {
    countryBorders: {
      lineWidth: 2,
      lineColor: '#1e4d6b',
    },
    
    chinaBorder: {
      lineWidth: 4,
      lineColor: '#2e8b57', // 竹绿
    },
    
    provinceBorders: {
      lineWidth: 1,
      lineColor: '#8a6c4a',
      lineOpacity: 0.6,
    },
    
    rivers: {
      lineWidth: 1.5,
      lineColor: '#36648b', // 石青
    },
    
    mountains: {
      fillColor: '#d4e6c3', // 淡绿
      strokeColor: '#8baa6c', // 草绿
    },
  },
};

/**
 * 朱砂墨风格地图样式
 */
export const VERMILION_INK_STYLE: ChineseMapStyleConfig = {
  styleUrl: '/map-styles/vermilion-ink-style.json',
  
  colors: {
    land: '#f7efe6', // 宣纸白
    water: '#f0e8e0', // 淡米
    countryBorder: '#c41e3a', // 中国红
    disputedBorder: '#e65c00', // 柿红
    coastline: '#8b3a3a', // 朱红
    roads: '#a67c52', // 赭石
    labels: '#1a0a0a', // 墨黑
  },
  
  fonts: {
    label: 'Noto Serif SC, SimSun, serif',
    title: 'Ma Shan Zheng, Noto Serif SC, serif',
    annotation: 'Noto Serif SC, serif',
  },
  
  layers: {
    countryBorders: {
      lineWidth: 2,
      lineColor: '#c41e3a',
      lineDasharray: [8, 4],
    },
    
    chinaBorder: {
      lineWidth: 5,
      lineColor: '#8b0000', // 暗红
    },
    
    provinceBorders: {
      lineWidth: 1,
      lineColor: '#8b3a3a',
      lineOpacity: 0.4,
    },
    
    rivers: {
      lineWidth: 1,
      lineColor: '#8b3a3a', // 朱红
    },
    
    mountains: {
      fillColor: '#e6d9c8',
      strokeColor: '#c7a985',
    },
  },
};

/**
 * 地图样式选择器
 */
export function getChineseMapStyle(styleName: string = 'ink-painting'): ChineseMapStyleConfig {
  switch (styleName.toLowerCase()) {
    case 'traditional-blue-green':
    case 'blue-green':
      return TRADITIONAL_BLUE_GREEN_STYLE;
    case 'vermilion-ink':
    case 'vermilion':
      return VERMILION_INK_STYLE;
    case 'ink-painting':
    default:
      return INK_PAINTING_STYLE;
  }
}

/**
 * 创建中国风地图水印
 */
export function createChineseMapWatermark(): string {
  const watermarkSvg = `
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="paperTexture">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.1 0" />
        </filter>
      </defs>
      
      <!-- 外方内圆图案 -->
      <rect x="10" y="10" width="100" height="100" fill="none" stroke="#8b3a3a" stroke-width="2" stroke-opacity="0.2" />
      <circle cx="60" cy="60" r="40" fill="none" stroke="#8b3a3a" stroke-width="1" stroke-opacity="0.2" />
      
      <!-- 八卦图案 -->
      <path d="M60,20 A40,40 0 0,1 60,100" fill="none" stroke="#8b3a3a" stroke-width="1" stroke-opacity="0.2" />
      <path d="M60,100 A40,40 0 0,1 60,20" fill="none" stroke="#8b3a3a" stroke-width="1" stroke-opacity="0.2" />
      
      <!-- 观字 -->
      <text x="60" y="65" text-anchor="middle" fill="#8b3a3a" fill-opacity="0.3" 
            font-family="Ma Shan Zheng, serif" font-size="48" font-weight="bold">
        观
      </text>
      
      <!-- 宣纸纹理 -->
      <rect x="0" y="0" width="120" height="120" filter="url(#paperTexture)" opacity="0.05" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(watermarkSvg)}`;
}

/**
 * 创建中国风地图标注样式
 */
export function createChineseMapLabelStyle(): Record<string, any> {
  return {
    'text-color': '#1a0a0a',
    'text-halo-color': '#f7efe6',
    'text-halo-width': 2,
    'text-font': ['Noto Serif SC', 'SimSun', 'serif'],
    'text-size': 12,
    'text-letter-spacing': 0.1,
    'text-transform': 'none',
    'text-field': ['coalesce', ['get', 'name_zh'], ['get', 'name']],
  };
}

/**
 * 创建中国风地图图标
 */
export function createChineseMapIcons(): Record<string, string> {
  return {
    // 军事图标
    'military-base': '🏯', // 城堡
    'military-ship': '🚢', // 船
    'military-plane': '✈️', // 飞机
    
    // 基础设施图标
    'nuclear': '☢️', // 核
    'datacenter': '🏢', // 大楼
    'cable': '🔌', // 插头
    
    // 自然灾害图标
    'earthquake': '🌋', // 火山
    'wildfire': '🔥', // 火
    'flood': '💧', // 水滴
    
    // 经济图标
    'stock-market': '📈', // 上升图
    'bank': '🏦', // 银行
    'port': '⚓', // 锚
    
    // 政治图标
    'capital': '🏛️', // 政府大楼
    'protest': '📢', // 喇叭
    'conflict': '⚔️', // 交叉剑
    
    // 中国风图标
    'china': '🐉', // 龙
    'great-wall': '🏯', // 长城
    'temple': '🛕', // 寺庙
  };
}

/**
 * 中国省级行政区划颜色方案
 */
export const CHINESE_PROVINCE_COLORS: Record<string, string> = {
  // 直辖市
  'Beijing': '#c41e3a', // 北京红
  'Shanghai': '#1e90ff', // 上海蓝
  'Tianjin': '#ff6347', // 天津橙
  'Chongqing': '#32cd32', // 重庆绿
  
  // 华北
  'Hebei': '#8b0000', // 河北暗红
  'Shanxi': '#8b4513', // 山西棕色
  'Inner Mongolia': '#2e8b57', // 内蒙古绿
  
  // 东北
  'Liaoning': '#4682b4', // 辽宁钢蓝
  'Jilin': '#228b22', // 吉林森林绿
  'Heilongjiang': '#1e4d6b', // 黑龙江靛青
  
  // 华东
  'Jiangsu': '#4169e1', // 江苏宝蓝
  'Zhejiang': '#0000cd', // 浙江中蓝
  'Anhui': '#008b8b', // 安徽深青
  'Fujian': '#008080', // 福建青绿
  'Jiangxi': '#20b2aa', // 江西浅海绿
  'Shandong': '#b22222', // 山东火砖红
  
  // 华中
  'Henan': '#daa520', // 河南金黄
  'Hubei': '#ff8c00', // 湖北橙黄
  'Hunan': '#ff4500', // 湖南橙红
  
  // 华南
  'Guangdong': '#dc143c', // 广东猩红
  'Guangxi': '#ff1493', // 广西深粉红
  'Hainan': '#00ced1', // 海南深天蓝
  
  // 西南
  'Sichuan': '#8b008b', // 四川暗紫
  'Guizhou': '#4b0082', // 贵州靛青
  'Yunnan': '#ff00ff', // 云南洋红
  'Tibet': '#7cfc00', // 西藏草绿
  
  // 西北
  'Shaanxi': '#d2691e', // 陕西巧克力色
  'Gansu': '#b8860b', // 甘肃暗金
  'Qinghai': '#00fa9a', // 青海中春绿
  'Ningxia': '#ff69b4', // 宁夏热粉红
  'Xinjiang': '#ffd700', // 新疆金色
  
  // 特别行政区
  'Hong Kong': '#ff0000', // 香港红
  'Macau': '#00ff00', // 澳门绿
};

/**
 * 获取中国省级行政区颜色
 */
export function getChineseProvinceColor(provinceName: string): string {
  return CHINESE_PROVINCE_COLORS[provinceName] || '#8b3a3a';
}

/**
 * 中国主要城市坐标
 */
export const CHINESE_MAJOR_CITIES: Array<{
  name: string;
  nameZh: string;
  lat: number;
  lng: number;
  type: 'capital' | 'major' | 'regional' | 'special' | 'historical' | 'scenic';
}> = [
  { name: 'Beijing', nameZh: '北京', lat: 39.9042, lng: 116.4074, type: 'capital' },
  { name: 'Shanghai', nameZh: '上海', lat: 31.2304, lng: 121.4737, type: 'major' },
  { name: 'Guangzhou', nameZh: '广州', lat: 23.1291, lng: 113.2644, type: 'major' },
  { name: 'Shenzhen', nameZh: '深圳', lat: 22.5431, lng: 114.0579, type: 'major' },
  { name: 'Chongqing', nameZh: '重庆', lat: 29.5630, lng: 106.5516, type: 'major' },
  { name: 'Tianjin', nameZh: '天津', lat: 39.3434, lng: 117.3616, type: 'major' },
  { name: 'Wuhan', nameZh: '武汉', lat: 30.5928, lng: 114.3055, type: 'regional' },
  { name: 'Chengdu', nameZh: '成都', lat: 30.5728, lng: 104.0668, type: 'regional' },
  { name: 'Xi\'an', nameZh: '西安', lat: 34.3416, lng: 108.9398, type: 'historical' },
  { name: 'Nanjing', nameZh: '南京', lat: 32.0603, lng: 118.7969, type: 'historical' },
  { name: 'Hangzhou', nameZh: '杭州', lat: 30.2741, lng: 120.1551, type: 'scenic' },
  { name: 'Suzhou', nameZh: '苏州', lat: 31.2989, lng: 120.5853, type: 'scenic' },
  { name: 'Hong Kong', nameZh: '香港', lat: 22.3193, lng: 114.1694, type: 'special' },
  { name: 'Macau', nameZh: '澳门', lat: 22.1987, lng: 113.5439, type: 'special' },
];

/**
 * 中国历史名城坐标
 */
export const CHINESE_HISTORICAL_CITIES: Array<{
  name: string;
  nameZh: string;
  lat: number;
  lng: number;
  dynasty: string;
}> = [
  { name: 'Luoyang', nameZh: '洛阳', lat: 34.6836, lng: 112.4536, dynasty: '汉唐古都' },
  { name: 'Kaifeng', nameZh: '开封', lat: 34.7961, lng: 114.3055, dynasty: '北宋都城' },
  { name: 'Anyang', nameZh: '安阳', lat: 36.0960, lng: 114.3928, dynasty: '商朝古都' },
  { name: 'Dunhuang', nameZh: '敦煌', lat: 40.1449, lng: 94.6609, dynasty: '丝绸之路' },
  { name: 'Quanzhou', nameZh: '泉州', lat: 24.9139, lng: 118.5859, dynasty: '宋元海港' },
  { name: 'Pingyao', nameZh: '平遥', lat: 37.1890, lng: 112.1786, dynasty: '明清古城' },
  { name: 'Lijiang', nameZh: '丽江', lat: 26.8550, lng: 100.2280, dynasty: '纳西古城' },
];

/**
 * 应用中国风地图样式
 */
export function applyChineseMapStyle(map: any, styleConfig: ChineseMapStyleConfig = INK_PAINTING_STYLE): void {
  if (!map) return;
  
  // 设置地图样式
  map.setStyle(styleConfig.styleUrl);
  
  // 等待地图加载完成后设置图层
  map.once('styledata', () => {
    // 设置中国边界高亮
    map.addLayer({
      id: 'china-border-highlight',
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [73.5, 18.0], [135.0, 18.0], [135.0, 53.5], [73.5, 53.5], [73.5, 18.0]
            ]]
          }
        }
      },
      paint: {
        'line-color': styleConfig.layers.chinaBorder.lineColor,
        'line-width': styleConfig.layers.chinaBorder.lineWidth,
        'line-opacity': 0.3,
        'line-dasharray': [2, 2],
      },
    });
    
    // 添加中文标签图层
    map.addLayer({
      id: 'chinese-labels',
      type: 'symbol',
      source: 'composite',
      'source-layer': 'place_label',
      layout: {
        'text-field': ['coalesce', ['get', 'name_zh'], ['get', 'name']],
        'text-font': styleConfig.fonts.label.split(',').map(f => f.trim()),
        'text-size': 12,
        'text-transform': 'none',
        'text-letter-spacing': 0.1,
      },
      paint: {
        'text-color': styleConfig.colors.labels,
        'text-halo-color': styleConfig.colors.land,
        'text-halo-width': 2,
      },
    });
    
    // 添加中国城市标注
    CHINESE_MAJOR_CITIES.forEach(city => {
      map.addSource(`city-${city.name}`, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [city.lng, city.lat],
          },
          properties: {
            name: city.name,
            name_zh: city.nameZh,
            type: city.type,
          },
        },
      });
      
      map.addLayer({
        id: `city-${city.name}`,
        type: 'symbol',
        source: `city-${city.name}`,
        layout: {
          'text-field': city.nameZh,
          'text-font': styleConfig.fonts.label.split(',').map(f => f.trim()),
          'text-size': city.type === 'capital' ? 14 : city.type === 'major' ? 12 : 10,
          'text-anchor': 'top',
          'text-offset': [0, 1],
        },
        paint: {
          'text-color': city.type === 'capital' ? '#c41e3a' : 
                       city.type === 'major' ? '#8b3a3a' : '#664f37',
          'text-halo-color': styleConfig.colors.land,
          'text-halo-width': 1,
        },
      });
    });
    
    // 添加中国风水印
    const watermark = createChineseMapWatermark();
    map.addImage('chinese-watermark', watermark, { sdf: false });
    
    map.addLayer({
      id: 'chinese-watermark',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [105, 35], // 中国中部
          },
        },
      },
      layout: {
        'icon-image': 'chinese-watermark',
        'icon-size': 0.05,
        'icon-opacity': 0.1,
      },
    });
  });
}

export default {
  INK_PAINTING_STYLE,
  TRADITIONAL_BLUE_GREEN_STYLE,
  VERMILION_INK_STYLE,
  getChineseMapStyle,
  createChineseMapWatermark,
  createChineseMapLabelStyle,
  createChineseMapIcons,
  CHINESE_PROVINCE_COLORS,
  getChineseProvinceColor,
  CHINESE_MAJOR_CITIES,
  CHINESE_HISTORICAL_CITIES,
  applyChineseMapStyle,
};
