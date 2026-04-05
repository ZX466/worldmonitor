/**
 * 中国风标题映射
 * 天下观 · 全球态势感知平台
 */

export interface ChineseTitleMap {
  [key: string]: {
    title: string;
    description?: string;
    subtitle?: string;
  };
}

/**
 * 面板中文标题映射
 */
export const CHINESE_PANEL_TITLES: Record<string, string> = {
  // 核心面板
  'world-monitor': '天下观',
  'tech-monitor': '科技观',
  'finance-monitor': '财经观',
  'happy-monitor': '喜乐观',
  
  // 地图相关
  'map': '山河图',
  '3d-globe': '天地图',
  'deckgl-map': '地球仪',
  
  // 新闻面板
  'news': '天下要闻',
  'live-news': '实时新闻',
  'news-panel': '新闻摘要',
  'breaking-news': '紧急新闻',
  'rss-feeds': '新闻聚合',
  
  // 军事情报
  'military': '军事情报',
  'military-bases': '军事基地',
  'military-flights': '军事航班',
  'military-vessels': '军舰追踪',
  'usni-fleet': '美海军舰队',
  
  // 地缘政治
  'geopolitical': '地缘政治',
  'conflict': '冲突监控',
  'unrest': '抗议活动',
  'protests': '社会动态',
  'displacement': '人口迁徙',
  
  // 基础设施
  'infrastructure': '基础设施',
  'undersea-cables': '海底电缆',
  'pipelines': '能源管道',
  'nuclear-facilities': '核设施',
  'datacenters': '数据中心',
  'ai-datacenters': 'AI数据中心',
  
  // 自然灾害
  'natural-disasters': '自然灾害',
  'earthquakes': '地震监测',
  'wildfires': '山火追踪',
  'climate-anomalies': '气候异常',
  
  // 网络威胁
  'cyber': '网络威胁',
  'cyber-threats': '网络攻击',
  'gps-jamming': 'GPS干扰',
  'security-advisories': '安全通告',
  
  // 经济金融
  'economic': '经济数据',
  'markets': '全球市场',
  'stock-exchanges': '股票市场',
  'finance': '财经数据',
  'central-banks': '央行动态',
  'trade': '贸易数据',
  'gulf-fdi': '海湾投资',
  
  // AI/智能
  'ai': '人工智能',
  'ai-insights': 'AI洞察',
  'ai-summarization': 'AI摘要',
  'intelligence': '情报聚合',
  'gdelt-intel': 'GDELT情报',
  
  // 交通物流
  'aviation': '航空运输',
  'flight-tracking': '航班追踪',
  'ais-ships': '船舶追踪',
  'ports': '港口动态',
  'trade-routes': '贸易路线',
  
  // 数据面板
  'data': '数据面板',
  'counters': '数据统计',
  'status': '系统状态',
  'service-status': '服务状态',
  'runtime-config': '运行配置',
  
  // 国家情报
  'country-intel': '国家情报',
  'country-brief': '国家简报',
  'cii-panel': '国家稳定指数',
  'strategic-posture': '战略态势',
  'strategic-risk': '战略风险',
  
  // 环境生态
  'climate': '气候环境',
  'satellite-fires': '卫星火情',
  'renewable-energy': '可再生能源',
  'conservation': '生态保护',
  
  // 科技信息
  'tech': '科技动态',
  'tech-events': '科技事件',
  'tech-hubs': '科技中心',
  'ai-research': 'AI研究',
  'tech-readiness': '科技准备度',
  
  // 正面新闻
  'positive': '正面新闻',
  'good-news': '好消息',
  'hero-spotlight': '英雄事迹',
  'breakthroughs': '突破进展',
  'species-comeback': '物种恢复',
  'progress': '发展进展',
  
  // 预测分析
  'prediction': '预测分析',
  'polymarket': '预测市场',
  'deduction': 'AI推理',
  'focal-point': '焦点检测',
  'trending-keywords': '趋势关键词',
  
  // 设置面板
  'settings': '设置',
  'unified-settings': '统一设置',
  'panel-layout': '面板布局',
  'search': '搜索',
  'download': '下载',
  'community': '社区',
};

/**
 * 状态和标签中文映射
 */
export const CHINESE_STATUS_LABELS: Record<string, string> = {
  'live': '实时',
  'cached': '缓存',
  'unavailable': '不可用',
  'loading': '加载中',
  'success': '成功',
  'error': '错误',
  'warning': '警告',
  'info': '信息',
  
  'critical': '严重',
  'high': '高',
  'medium': '中',
  'low': '低',
  'normal': '正常',
  
  'buy': '买入',
  'sell': '卖出',
  'hold': '持有',
  'cash': '现金',
  
  'bullish': '看涨',
  'bearish': '看跌',
  'neutral': '中性',
  
  'in-progress': '进行中',
  'completed': '已完成',
  'pending': '待处理',
  'failed': '失败',
  
  'online': '在线',
  'offline': '离线',
  'connected': '已连接',
  'disconnected': '已断开',
  
  'active': '活跃',
  'inactive': '非活跃',
  'expired': '已过期',
  'valid': '有效',
};

/**
 * 威胁级别中文映射
 */
export const CHINESE_THREAT_LEVELS: Record<string, string> = {
  'critical': '极度危险',
  'high': '高度危险', 
  'medium': '中度危险',
  'low': '轻度危险',
  'info': '情报信息',
};

/**
 * DEFCON级别中文映射
 */
export const CHINESE_DEFCON_LEVELS: Record<string, string> = {
  'defcon-1': '一级战备',
  'defcon-2': '二级战备',
  'defcon-3': '三级战备',
  'defcon-4': '四级战备',
  'defcon-5': '五级战备',
};

/**
 * 区域中文名称
 */
export const CHINESE_REGIONS: Record<string, string> = {
  'global': '全球',
  'americas': '美洲',
  'europe': '欧洲',
  'mena': '中东北非',
  'asia': '亚洲',
  'africa': '非洲',
  'oceania': '大洋洲',
  'latin-america': '拉丁美洲',
  'north-america': '北美洲',
  'south-america': '南美洲',
  'east-asia': '东亚',
  'southeast-asia': '东南亚',
  'south-asia': '南亚',
  'central-asia': '中亚',
  'middle-east': '中东',
  'north-africa': '北非',
  'sub-saharan-africa': '撒哈拉以南非洲',
};

/**
 * 时间范围中文映射
 */
export const CHINESE_TIME_RANGES: Record<string, string> = {
  '1h': '1小时',
  '6h': '6小时',
  '24h': '24小时',
  '48h': '48小时',
  '7d': '7天',
  '30d': '30天',
  'all': '全部',
  'today': '今日',
  'yesterday': '昨日',
  'week': '本周',
  'month': '本月',
  'year': '本年',
};

/**
 * 货币中文名称
 */
export const CHINESE_CURRENCIES: Record<string, string> = {
  'USD': '美元',
  'EUR': '欧元',
  'GBP': '英镑',
  'JPY': '日元',
  'CNY': '人民币',
  'AUD': '澳元',
  'CAD': '加元',
  'CHF': '瑞士法郎',
  'HKD': '港元',
  'SGD': '新加坡元',
  'KRW': '韩元',
  'INR': '印度卢比',
  'RUB': '俄罗斯卢布',
  'BRL': '巴西雷亚尔',
  'ZAR': '南非兰特',
  'MXN': '墨西哥比索',
};

/**
 * 国家中文名称
 */
export const CHINESE_COUNTRIES: Record<string, string> = {
  'US': '美国',
  'CN': '中国',
  'JP': '日本',
  'DE': '德国',
  'GB': '英国',
  'FR': '法国',
  'IN': '印度',
  'BR': '巴西',
  'RU': '俄罗斯',
  'CA': '加拿大',
  'AU': '澳大利亚',
  'KR': '韩国',
  'MX': '墨西哥',
  'ID': '印度尼西亚',
  'TR': '土耳其',
  'SA': '沙特阿拉伯',
  'ZA': '南非',
  'EG': '埃及',
  'NG': '尼日利亚',
  'AR': '阿根廷',
};

/**
 * 获取面板中文标题
 */
export function getChinesePanelTitle(panelId: string): string {
  return CHINESE_PANEL_TITLES[panelId] || panelId;
}

/**
 * 获取状态中文标签
 */
export function getChineseStatusLabel(status: string): string {
  return CHINESE_STATUS_LABELS[status] || status;
}

/**
 * 获取威胁级别中文标签
 */
export function getChineseThreatLevel(threatLevel: string): string {
  return CHINESE_THREAT_LEVELS[threatLevel] || threatLevel;
}

/**
 * 获取DEFCON级别中文标签
 */
export function getChineseDefconLevel(defconLevel: string): string {
  return CHINESE_DEFCON_LEVELS[defconLevel] || defconLevel;
}

/**
 * 获取区域中文名称
 */
export function getChineseRegion(region: string): string {
  return CHINESE_REGIONS[region] || region;
}

/**
 * 获取时间范围中文标签
 */
export function getChineseTimeRange(timeRange: string): string {
  return CHINESE_TIME_RANGES[timeRange] || timeRange;
}

/**
 * 获取货币中文名称
 */
export function getChineseCurrency(currency: string): string {
  return CHINESE_CURRENCIES[currency] || currency;
}

/**
 * 获取国家中文名称
 */
export function getChineseCountry(countryCode: string): string {
  return CHINESE_COUNTRIES[countryCode] || countryCode;
}

/**
 * 应用中文标题的函数包装器
 */
export function chineseTitle(originalTitle: string): string {
  // 尝试在映射表中查找
  const mapped = getChinesePanelTitle(originalTitle.toLowerCase().replace(/\s+/g, '-'));
  if (mapped && mapped !== originalTitle.toLowerCase().replace(/\s+/g, '-')) {
    return mapped;
  }
  
  // 如果是英文标题，直接返回中文翻译
  const translations: Record<string, string> = {
    'World Monitor': '天下观',
    'Tech Monitor': '科技观',
    'Finance Monitor': '财经观',
    'Happy Monitor': '喜乐观',
    'Global Situation': '全球态势',
    'AI Insights': 'AI洞察',
    'Real-time': '实时',
    'Dashboard': '仪表盘',
    'News': '新闻',
    'Military': '军事',
    'Infrastructure': '基础设施',
    'Climate': '气候',
    'Economic': '经济',
    'Markets': '市场',
    'Intelligence': '情报',
    'Monitoring': '监控',
    'Tracking': '追踪',
    'Analysis': '分析',
    'Prediction': '预测',
    'Settings': '设置',
    'Search': '搜索',
    'Status': '状态',
    'Config': '配置',
  };
  
  // 尝试翻译整个标题
  let result = originalTitle;
  for (const [en, cn] of Object.entries(translations)) {
    result = result.replace(new RegExp(en, 'gi'), cn);
  }
  
  return result;
}

export default {
  CHINESE_PANEL_TITLES,
  CHINESE_STATUS_LABELS,
  CHINESE_THREAT_LEVELS,
  CHINESE_DEFCON_LEVELS,
  CHINESE_REGIONS,
  CHINESE_TIME_RANGES,
  CHINESE_CURRENCIES,
  CHINESE_COUNTRIES,
  getChinesePanelTitle,
  getChineseStatusLabel,
  getChineseThreatLevel,
  getChineseDefconLevel,
  getChineseRegion,
  getChineseTimeRange,
  getChineseCurrency,
  getChineseCountry,
  chineseTitle,
};
