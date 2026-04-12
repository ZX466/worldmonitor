/**
 * 中国本土化地理配置
 * China-specific geographic configuration
 * 
 * 本文件包含中国地图服务提供商的配置，用于替代需要VPN访问的国外服务
 * This file contains configurations for Chinese map service providers,
 * replacing foreign services that require VPN access
 */

// ============================================
// 地图瓦片服务配置 Map Tile Service Configuration
// ============================================

/**
 * 中国地图瓦片服务提供商
 * Chinese Map Tile Service Providers
 * 
 * 推荐使用顺序（按免费额度和稳定性）：
 * 1. 天地图（国家测绘局官方服务，免费额度充足）
 * 2. 高德地图（国内服务稳定，需申请API Key）
 * 3. 腾讯地图（国内服务稳定，需申请API Key）
 */
export const CHINA_MAP_TILE_PROVIDERS = {
  /**
   * 天地图（国家测绘地理信息局）
   * Tianditu (National Geomatics Center of China)
   * 
   * 免费额度：每日100万次调用
   * 申请地址：https://console.tianditu.gov.cn/api/key
   * 支持矢量、影像、地形等多种图层
   */
  tianditu: {
    name: '天地图',
    nameEn: 'Tianditu',
    
    // 矢量底图 Vector Base Map
    vec: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 18,
      minZoom: 1,
    },
    
    // 矢量注记 Vector Labels
    cva: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 18,
    },
    
    // 影像底图 Satellite Imagery
    img: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 18,
    },
    
    // 影像注记 Satellite Labels
    cia: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 18,
    },
    
    // 地形底图 Terrain
    ter: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 14,
    },
    
    // 地形注记 Terrain Labels
    cta: {
      url: 'https://t{0-7}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk={key}',
      attribution: '天地图 | 国家测绘地理信息局',
      maxZoom: 14,
    },
    
    // 申请Key的地址
    keyApplyUrl: 'https://console.tianditu.gov.cn/api/key',
  },

  /**
   * 高德地图
   * Amap (Gaode Map)
   * 
   * 免费额度：每日30万次调用（个人开发者）
   * 申请地址：https://lbs.amap.com/api/javascript-api/guide/abc/prepare
   * 支持矢量、卫星、路网等多种图层
   */
  amap: {
    name: '高德地图',
    nameEn: 'Amap',
    
    // 矢量地图 Vector Map
    normal: {
      url: 'https://webrd0{1-3}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
      attribution: '高德地图',
      maxZoom: 18,
    },
    
    // 卫星图 Satellite
    satellite: {
      url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      attribution: '高德地图',
      maxZoom: 18,
    },
    
    // 卫星混合（带路网） Satellite with Roads
    satelliteHybrid: {
      url: 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
      labelUrl: 'https://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
      attribution: '高德地图',
      maxZoom: 18,
    },
    
    // 申请Key的地址（高德Web端JS API需要Key，瓦片不需要）
    keyApplyUrl: 'https://lbs.amap.com/api/javascript-api/guide/abc/prepare',
  },

  /**
   * 腾讯地图
   * Tencent Map
   * 
   * 免费额度：每日10万次调用
   * 申请地址：https://lbs.qq.com/console/mykey.html
   */
  tencent: {
    name: '腾讯地图',
    nameEn: 'Tencent Map',
    
    // 矢量地图
    normal: {
      url: 'https://p{0-3}.map.gtimg.com/sitemapTiles/z={z}/x={x}/{y={y}}.png',
      attribution: '腾讯地图',
      maxZoom: 18,
    },
    
    // 卫星图
    satellite: {
      url: 'https://p{0-3}.map.gtimg.com/sateTiles/z={z}/x={x}/{y={y}}.png',
      attribution: '腾讯地图',
      maxZoom: 18,
    },
    
    keyApplyUrl: 'https://lbs.qq.com/console/mykey.html',
  },

  /**
   * 百度地图
   * Baidu Map
   * 
   * 注意：百度地图使用独特的坐标系统（BD-09），需要坐标转换
   * 免费额度：每日5万次调用
   * 申请地址：https://lbsyun.baidu.com/apiconsole/key
   */
  baidu: {
    name: '百度地图',
    nameEn: 'Baidu Map',
    
    // 注意：百度瓦片URL格式与其他不同，需要特殊处理
    normal: {
      url: 'https://online{0-3}.map.bdimg.com/onlinelabel/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&p=1',
      attribution: '百度地图',
      maxZoom: 19,
      // 百度使用BD-09坐标系，需要转换
      coordinateSystem: 'BD-09',
    },
    
    satellite: {
      url: 'https://shangetu{0-3}.map.bdimg.com/it/u=x={x};y={y};z={z};v=009;type=sate&fm=46',
      attribution: '百度地图',
      maxZoom: 19,
      coordinateSystem: 'BD-09',
    },
    
    keyApplyUrl: 'https://lbsyun.baidu.com/apiconsole/key',
    // 坐标转换工具
    coordinateConvertUrl: 'https://api.map.baidu.com/geoconv/v1/',
  },

  /**
   * GeoQ（智图）
   * GeoQ (China Geo-Q)
   * 
   * 国内彩色版地图，无需申请Key
   * 适合快速开发和测试
   */
  geoq: {
    name: '智图',
    nameEn: 'GeoQ',
    
    // 彩色版（无需Key）
    normal: {
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}',
      attribution: '智图GeoQ',
      maxZoom: 16,
    },
    
    // 灰色版
    gray: {
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}',
      attribution: '智图GeoQ',
      maxZoom: 16,
    },
    
    // 深蓝夜色版
    dark: {
      url: 'https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}',
      attribution: '智图GeoQ',
      maxZoom: 16,
    },
  },
};

// ============================================
// 地图样式配置（MapLibre GL Style）
// ============================================

/**
 * 中国地图样式配置
 * China Map Style Configuration
 * 
 * 用于 DeckGLMap.ts 和 MapLibre GL
 */
export const CHINA_MAP_STYLES = {
  /**
   * 天地图矢量样式（推荐）
   * Tianditu Vector Style (Recommended)
   */
  tiandituVector: {
    name: '天地图矢量',
    nameEn: 'Tianditu Vector',
    style: {
      version: 8,
      name: 'Tianditu Vector',
      sources: {
        'tianditu-vec': {
          type: 'raster',
          tiles: ['https://t{0-7}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=YOUR_KEY'],
          tileSize: 256,
          attribution: '天地图',
        },
        'tianditu-cva': {
          type: 'raster',
          tiles: ['https://t{0-7}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=YOUR_KEY'],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'tianditu-vec-layer',
          type: 'raster',
          source: 'tianditu-vec',
          minzoom: 0,
          maxzoom: 18,
        },
        {
          id: 'tianditu-cva-layer',
          type: 'raster',
          source: 'tianditu-cva',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    },
  },

  /**
   * 天地图影像样式
   * Tianditu Satellite Style
   */
  tiandituSatellite: {
    name: '天地图影像',
    nameEn: 'Tianditu Satellite',
    style: {
      version: 8,
      name: 'Tianditu Satellite',
      sources: {
        'tianditu-img': {
          type: 'raster',
          tiles: ['https://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=YOUR_KEY'],
          tileSize: 256,
          attribution: '天地图',
        },
        'tianditu-cia': {
          type: 'raster',
          tiles: ['https://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=YOUR_KEY'],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'tianditu-img-layer',
          type: 'raster',
          source: 'tianditu-img',
          minzoom: 0,
          maxzoom: 18,
        },
        {
          id: 'tianditu-cia-layer',
          type: 'raster',
          source: 'tianditu-cia',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    },
  },

  /**
   * 高德地图样式
   * Amap Style
   */
  amapNormal: {
    name: '高德地图',
    nameEn: 'Amap Normal',
    style: {
      version: 8,
      name: 'Amap Normal',
      sources: {
        'amap-normal': {
          type: 'raster',
          tiles: ['https://webrd0{1-3}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'],
          tileSize: 256,
          attribution: '高德地图',
        },
      },
      layers: [
        {
          id: 'amap-normal-layer',
          type: 'raster',
          source: 'amap-normal',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    },
  },

  /**
   * 高德卫星图样式
   * Amap Satellite Style
   */
  amapSatellite: {
    name: '高德卫星',
    nameEn: 'Amap Satellite',
    style: {
      version: 8,
      name: 'Amap Satellite',
      sources: {
        'amap-satellite': {
          type: 'raster',
          tiles: ['https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'],
          tileSize: 256,
          attribution: '高德地图',
        },
        'amap-road': {
          type: 'raster',
          tiles: ['https://webst0{1-4}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'],
          tileSize: 256,
        },
      },
      layers: [
        {
          id: 'amap-satellite-layer',
          type: 'raster',
          source: 'amap-satellite',
          minzoom: 0,
          maxzoom: 18,
        },
        {
          id: 'amap-road-layer',
          type: 'raster',
          source: 'amap-road',
          minzoom: 0,
          maxzoom: 18,
        },
      ],
    },
  },

  /**
   * 智图深色样式（无需Key，适合开发测试）
   * GeoQ Dark Style (No Key Required, Good for Development)
   */
  geoqDark: {
    name: '智图深蓝',
    nameEn: 'GeoQ Dark',
    style: {
      version: 8,
      name: 'GeoQ Dark',
      sources: {
        'geoq-dark': {
          type: 'raster',
          tiles: ['https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'],
          tileSize: 256,
          attribution: '智图GeoQ',
        },
      },
      layers: [
        {
          id: 'geoq-dark-layer',
          type: 'raster',
          source: 'geoq-dark',
          minzoom: 0,
          maxzoom: 16,
        },
      ],
    },
  },
};

// ============================================
// 世界地图数据源（国内CDN镜像）
// ============================================

/**
 * 国内可访问的世界地图数据URL
 * China-accessible World Map Data URLs
 * 
 * 使用国内CDN或镜像源替代 jsDelivr
 */
export const CHINA_MAP_URLS = {
  // 使用 BootCDN 镜像（推荐）
  world: 'https://cdn.bootcdn.net/ajax/libs/topojson/3.0.2/topojson.min.js',
  
  // 或者使用本地部署（更稳定）
  // 将数据文件放到 public/data/ 目录下
  worldLocal: '/data/countries-50m.json',
  usLocal: '/data/states-10m.json',
  
  // 备选：使用 unpkg（国内访问可能不稳定）
  worldUnpkg: 'https://unpkg.com/world-atlas@2/countries-50m.json',
  usUnpkg: 'https://unpkg.com/us-atlas@3/states-10m.json',
};

// ============================================
// 中国地理数据
// ============================================

/**
 * 中国重要城市坐标
 * Major Chinese Cities Coordinates
 */
export const CHINA_CITIES = {
  beijing: { name: '北京', lat: 39.9042, lon: 116.4074 },
  shanghai: { name: '上海', lat: 31.2304, lon: 121.4737 },
  guangzhou: { name: '广州', lat: 23.1291, lon: 113.2644 },
  shenzhen: { name: '深圳', lat: 22.5431, lon: 114.0579 },
  hongkong: { name: '香港', lat: 22.3193, lon: 114.1694 },
  taipei: { name: '台北', lat: 25.0330, lon: 121.5654 },
  chengdu: { name: '成都', lat: 30.5728, lon: 104.0668 },
  wuhan: { name: '武汉', lat: 30.5928, lon: 114.3055 },
  xian: { name: '西安', lat: 34.3416, lon: 108.9398 },
  nanjing: { name: '南京', lat: 32.0603, lon: 118.7969 },
  hangzhou: { name: '杭州', lat: 30.2741, lon: 120.1551 },
  chongqing: { name: '重庆', lat: 29.4316, lon: 106.9123 },
  tianjin: { name: '天津', lat: 39.3434, lon: 117.3616 },
  suzhou: { name: '苏州', lat: 31.2989, lon: 120.5853 },
  qingdao: { name: '青岛', lat: 36.0671, lon: 120.3826 },
};

/**
 * 中国重要港口
 * Major Chinese Ports
 */
export const CHINA_PORTS = [
  { id: 'shanghai_port', name: '上海港', lat: 31.3614, lon: 121.5878, type: 'container', throughput: 47.03, unit: 'million_teu' },
  { id: 'ningbo_zhoushan', name: '宁波舟山港', lat: 29.8683, lon: 122.1018, type: 'container', throughput: 33.35, unit: 'million_teu' },
  { id: 'shenzhen_port', name: '深圳港', lat: 22.4797, lon: 113.9062, type: 'container', throughput: 28.77, unit: 'million_teu' },
  { id: 'guangzhou_port', name: '广州港', lat: 22.9452, lon: 113.5205, type: 'container', throughput: 24.58, unit: 'million_teu' },
  { id: 'qingdao_port', name: '青岛港', lat: 36.0671, lon: 120.3826, type: 'container', throughput: 26.51, unit: 'million_teu' },
  { id: 'tianjin_port', name: '天津港', lat: 38.9804, lon: 117.7812, type: 'container', throughput: 21.01, unit: 'million_teu' },
  { id: 'dalian_port', name: '大连港', lat: 38.9140, lon: 121.6147, type: 'container', throughput: 5.35, unit: 'million_teu' },
  { id: 'yingkou_port', name: '营口港', lat: 40.6739, lon: 122.1362, type: 'container', throughput: 5.47, unit: 'million_teu' },
  { id: 'xiamen_port', name: '厦门港', lat: 24.4798, lon: 118.0894, type: 'container', throughput: 12.49, unit: 'million_teu' },
  { id: 'lianvgang_port', name: '连云港', lat: 34.7300, lon: 119.2236, type: 'container', throughput: 5.41, unit: 'million_teu' },
];

/**
 * 中国重要机场
 * Major Chinese Airports
 */
export const CHINA_AIRPORTS = [
  { id: 'pek', name: '北京首都国际机场', icao: 'ZBAA', iata: 'PEK', lat: 40.0801, lon: 116.5846, passengers: 100.01, unit: 'million' },
  { id: 'pvg', name: '上海浦东国际机场', icao: 'ZSPD', iata: 'PVG', lat: 31.1443, lon: 121.8083, passengers: 76.15, unit: 'million' },
  { id: 'can', name: '广州白云国际机场', icao: 'ZGGG', iata: 'CAN', lat: 23.3924, lon: 113.2988, passengers: 73.36, unit: 'million' },
  { id: 'szx', name: '深圳宝安国际机场', icao: 'ZGSZ', iata: 'SZX', lat: 22.6393, lon: 113.8107, passengers: 52.93, unit: 'million' },
  { id: 'ctu', name: '成都双流国际机场', icao: 'ZUUU', iata: 'CTU', lat: 30.5785, lon: 103.9471, passengers: 52.42, unit: 'million' },
  { id: 'ckg', name: '重庆江北国际机场', icao: 'ZUCK', iata: 'CKG', lat: 29.7192, lon: 106.6417, passengers: 44.99, unit: 'million' },
  { id: 'kmg', name: '昆明长水国际机场', icao: 'ZPPP', iata: 'KMG', lat: 25.1019, lon: 102.9291, passengers: 44.87, unit: 'million' },
  { id: 'xiy', name: '西安咸阳国际机场', icao: 'ZLXY', iata: 'XIY', lat: 34.4471, lon: 108.7516, passengers: 41.13, unit: 'million' },
  { id: 'hgh', name: '杭州萧山国际机场', icao: 'ZSHC', iata: 'HGH', lat: 30.2295, lon: 120.4344, passengers: 40.83, unit: 'million' },
  { id: 'nkg', name: '南京禄口国际机场', icao: 'ZSNJ', iata: 'NKG', lat: 31.7420, lon: 118.8620, passengers: 30.58, unit: 'million' },
  { id: 'wuh', name: '武汉天河国际机场', icao: 'ZHHH', iata: 'WUH', lat: 30.7838, lon: 114.2081, passengers: 27.15, unit: 'million' },
  { id: 'tsn', name: '天津滨海国际机场', icao: 'ZBTJ', iata: 'TSN', lat: 39.1244, lon: 117.3463, passengers: 23.58, unit: 'million' },
];

// ============================================
// 中国数据中心和科技园区
// ============================================

/**
 * 中国AI数据中心
 * Chinese AI Data Centers
 */
export const CHINA_AI_DATACENTERS = [
  { id: 'aliyun_beijing', name: '阿里云北京数据中心', lat: 40.0, lon: 116.4, operator: 'Alibaba Cloud', capacity: 'high' },
  { id: 'aliyun_hangzhou', name: '阿里云杭州数据中心', lat: 30.3, lon: 120.2, operator: 'Alibaba Cloud', capacity: 'high' },
  { id: 'tencent_guangzhou', name: '腾讯云广州数据中心', lat: 23.1, lon: 113.3, operator: 'Tencent Cloud', capacity: 'high' },
  { id: 'tencent_shanghai', name: '腾讯云上海数据中心', lat: 31.2, lon: 121.5, operator: 'Tencent Cloud', capacity: 'high' },
  { id: 'huawei_shenzhen', name: '华为云深圳数据中心', lat: 22.5, lon: 114.1, operator: 'Huawei Cloud', capacity: 'high' },
  { id: 'huawei_beijing', name: '华为云北京数据中心', lat: 40.0, lon: 116.4, operator: 'Huawei Cloud', capacity: 'high' },
  { id: 'baidu_beijing', name: '百度云北京数据中心', lat: 40.0, lon: 116.4, operator: 'Baidu Cloud', capacity: 'medium' },
  { id: 'jd_beijing', name: '京东云北京数据中心', lat: 40.0, lon: 116.4, operator: 'JD Cloud', capacity: 'medium' },
];

/**
 * 中国科技园区
 * Chinese Tech Parks
 */
export const CHINA_TECH_PARKS = [
  { id: 'zhongguancun', name: '中关村', city: '北京', lat: 39.9841, lon: 116.3074, focus: '综合科技' },
  { id: 'zhangjiang', name: '张江高科技园区', city: '上海', lat: 31.1968, lon: 121.5878, focus: '生物医药/芯片' },
  { id: 'shenzhen_park', name: '深圳高新区', city: '深圳', lat: 22.5431, lon: 114.0579, focus: '硬件/通信' },
  { id: 'chengdu_park', name: '成都高新区', city: '成都', lat: 30.5728, lon: 104.0668, focus: '软件/游戏' },
  { id: 'hangzhou_park', name: '杭州高新区', city: '杭州', lat: 30.2741, lon: 120.1551, focus: '电商/互联网' },
  { id: 'nanjing_park', name: '南京高新区', city: '南京', lat: 32.0603, lon: 118.7969, focus: '软件/通信' },
  { id: 'wuhan_park', name: '武汉光谷', city: '武汉', lat: 30.5928, lon: 114.3055, focus: '光电/通信' },
  { id: 'xian_park', name: '西安高新区', city: '西安', lat: 34.3416, lon: 108.9398, focus: '航空航天/软件' },
  { id: 'suzhou_park', name: '苏州工业园区', city: '苏州', lat: 31.2989, lon: 120.5853, focus: '制造/生物医药' },
  { id: 'hefei_park', name: '合肥高新区', city: '合肥', lat: 31.8206, lon: 117.2272, focus: '量子计算/AI' },
];

// ============================================
// 默认推荐配置
// ============================================

/**
 * 推荐的中国地图配置
 * Recommended China Map Configuration
 * 
 * 根据使用场景推荐最佳配置
 */
export const RECOMMENDED_CHINA_MAP_CONFIG = {
  /**
   * 开发测试环境（无需申请Key）
   * Development/Testing (No Key Required)
   */
  development: {
    provider: 'geoq',
    style: 'geoqDark',
    reason: '智图无需申请Key，开箱即用，深色主题适合数据可视化',
  },

  /**
   * 生产环境（推荐天地图）
   * Production (Tianditu Recommended)
   */
  production: {
    provider: 'tianditu',
    style: 'tiandituVector',
    reason: '天地图是国家官方服务，免费额度充足（每日100万次），数据权威可靠',
  },

  /**
   * 高性能场景（推荐高德）
   * High Performance (Amap Recommended)
   */
  performance: {
    provider: 'amap',
    style: 'amapNormal',
    reason: '高德地图响应速度快，国内CDN覆盖好',
  },

  /**
   * 卫星图场景
   * Satellite Imagery
   */
  satellite: {
    provider: 'tianditu',
    style: 'tiandituSatellite',
    reason: '天地图卫星影像清晰度高，配中文标注',
  },
};

// ============================================
// 环境变量配置
// ============================================

/**
 * 需要配置的环境变量
 * Required Environment Variables
 */
export const CHINA_MAP_ENV_VARS = {
  // 天地图 API Key（推荐）
  VITE_TIANDITU_KEY: {
    required: false,
    description: '天地图API密钥',
    applyUrl: 'https://console.tianditu.gov.cn/api/key',
    freeQuota: '每日100万次调用',
  },

  // 高德地图 API Key（可选，瓦片不需要）
  VITE_AMAP_KEY: {
    required: false,
    description: '高德地图API密钥（用于JS API，瓦片不需要）',
    applyUrl: 'https://lbs.amap.com/api/javascript-api/guide/abc/prepare',
    freeQuota: '每日30万次调用',
  },

  // 腾讯地图 API Key（可选）
  VITE_TENCENT_KEY: {
    required: false,
    description: '腾讯地图API密钥',
    applyUrl: 'https://lbs.qq.com/console/mykey.html',
    freeQuota: '每日10万次调用',
  },
};

// ============================================
// 使用指南
// ============================================

/**
 * 快速开始指南
 * Quick Start Guide
 * 
 * 1. 开发测试：直接使用 GeoQ（无需申请Key）
 *    style: CHINA_MAP_STYLES.geoqDark
 * 
 * 2. 生产部署：申请天地图Key
 *    - 访问 https://console.tianditu.gov.cn/api/key
 *    - 注册账号并创建应用
 *    - 获取Key后替换样式中的 YOUR_KEY
 *    - 将 VITE_TIANDITU_KEY 添加到 .env 文件
 * 
 * 3. 高性能需求：使用高德地图
 *    - 瓦片服务无需Key
 *    - 如需JS API功能，再申请Key
 * 
 * 4. 坐标系注意：
 *    - 天地图/高德/腾讯：使用 GCJ-02 坐标系
 *    - 百度地图：使用 BD-09 坐标系（需转换）
 *    - 国际标准：WGS-84 坐标系
 *    - 注意进行坐标转换
 */

export default {
  CHINA_MAP_TILE_PROVIDERS,
  CHINA_MAP_STYLES,
  CHINA_MAP_URLS,
  CHINA_CITIES,
  CHINA_PORTS,
  CHINA_AIRPORTS,
  CHINA_AI_DATACENTERS,
  CHINA_TECH_PARKS,
  RECOMMENDED_CHINA_MAP_CONFIG,
  CHINA_MAP_ENV_VARS,
};
