/**
 * 中国本土化直播源配置
 * China-specific Live Streaming Configuration
 * 
 * 本文件包含中国本土直播源配置，用于替代需要VPN访问的YouTube直播
 * This file contains configurations for Chinese live streaming sources,
 * replacing YouTube streams that require VPN access
 */

import type { LiveChannel } from '@/components/LiveNewsPanel';

// ============================================
// 中国直播源类型定义
// ============================================

export interface ChinaLiveChannel extends LiveChannel {
  /** 直播源类型 */
  sourceType: 'cctv' | 'satellite' | 'local' | 'web' | 'custom';
  
  /** HLS直播流地址（国内可直接访问） */
  hlsUrl?: string;
  
  /** FLV直播流地址（部分平台使用） */
  flvUrl?: string;
  
  /** 平台标识 */
  platform?: 'cctv' | 'btv' | 'smg' | 'hunan' | 'zhejiang' | 'jiangsu' | 'custom';
  
  /** 清晰度选项 */
  qualities?: {
    hd?: string;    // 高清
    sd?: string;    // 标清
    uhd?: string;   // 超高清（4K）
  };
  
  /** 是否需要代理 */
  needsProxy?: boolean;
  
  /** 备用源 */
  backupUrls?: string[];
}

// ============================================
// CCTV 中央电视台直播源
// ============================================

/**
 * CCTV 官方直播源
 * 使用 IPTV 标准源，稳定性较高
 * 
 * 数据来源：央视网、各地IPTV
 * 注意：部分源可能需要更新
 */
export const CCTV_CHANNELS: ChinaLiveChannel[] = [
  {
    id: 'cctv1',
    name: 'CCTV-1 综合',
    handle: '@cctv1',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV1HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV1HD/playlist.m3u8',
    },
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225816/index.m3u8',
      'http://39.134.66.66/PLTV/88888888/224/3221225955/index.m3u8',
    ],
  },
  {
    id: 'cctv13',
    name: 'CCTV-13 新闻',
    handle: '@cctv13',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV13HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV13HD/playlist.m3u8',
    },
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225812/index.m3u8',
      'http://39.134.66.66/PLTV/88888888/224/3221226011/index.m3u8',
    ],
  },
  {
    id: 'cctv2',
    name: 'CCTV-2 财经',
    handle: '@cctv2',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV2HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV2HD/playlist.m3u8',
    },
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225819/index.m3u8',
    ],
  },
  {
    id: 'cctv4',
    name: 'CCTV-4 中文国际',
    handle: '@cctv4',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV4HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV4HD/playlist.m3u8',
    },
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225820/index.m3u8',
    ],
  },
  {
    id: 'cctv5',
    name: 'CCTV-5 体育',
    handle: '@cctv5',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV5HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV5HD/playlist.m3u8',
    },
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225818/index.m3u8',
    ],
  },
  {
    id: 'cctv9',
    name: 'CCTV-9 纪录',
    handle: '@cctv9',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV9HD/playlist.m3u8',
    qualities: {
      hd: 'https://node1.olelive.com/live/CCTV9HD/playlist.m3u8',
    },
  },
  {
    id: 'cgtn',
    name: 'CGTN 中国国际',
    handle: '@cgtn',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
    qualities: {
      hd: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
    },
  },
];

// ============================================
// 卫星电视台直播源
// ============================================

/**
 * 省级卫视直播源
 * Provincial Satellite TV Live Streams
 */
export const SATELLITE_CHANNELS: ChinaLiveChannel[] = [
  // 湖南卫视
  {
    id: 'hunantv',
    name: '湖南卫视',
    handle: '@hunantv',
    sourceType: 'satellite',
    platform: 'hunan',
    hlsUrl: 'https://node1.olelive.com/live/HNS/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225977/index.m3u8',
    ],
  },
  
  // 浙江卫视
  {
    id: 'zjtv',
    name: '浙江卫视',
    handle: '@zjtv',
    sourceType: 'satellite',
    platform: 'zhejiang',
    hlsUrl: 'https://node1.olelive.com/live/ZJS/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225959/index.m3u8',
    ],
  },
  
  // 江苏卫视
  {
    id: 'jstv',
    name: '江苏卫视',
    handle: '@jstv',
    sourceType: 'satellite',
    platform: 'jiangsu',
    hlsUrl: 'https://node1.olelive.com/live/JSS/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225974/index.m3u8',
    ],
  },
  
  // 东方卫视
  {
    id: 'dragon',
    name: '东方卫视',
    handle: '@dragon',
    sourceType: 'satellite',
    platform: 'smg',
    hlsUrl: 'https://node1.olelive.com/live/DFS/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225972/index.m3u8',
    ],
  },
  
  // 北京卫视
  {
    id: 'btv',
    name: '北京卫视',
    handle: '@btv',
    sourceType: 'satellite',
    platform: 'btv',
    hlsUrl: 'https://node1.olelive.com/live/BJTVHD/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225975/index.m3u8',
    ],
  },
  
  // 深圳卫视
  {
    id: 'sztv',
    name: '深圳卫视',
    handle: '@sztv',
    sourceType: 'satellite',
    hlsUrl: 'https://node1.olelive.com/live/SHENZNEWS/playlist.m3u8',
  },
  
  // 广东卫视
  {
    id: 'gdtv',
    name: '广东卫视',
    handle: '@gdtv',
    sourceType: 'satellite',
    hlsUrl: 'https://node1.olelive.com/live/GDS/playlist.m3u8',
  },
  
  // 凤凰卫视资讯台
  {
    id: 'phoenix_info',
    name: '凤凰资讯',
    handle: '@phoenix',
    sourceType: 'satellite',
    hlsUrl: 'https://node1.olelive.com/live/PHOENIXINFONEWS/playlist.m3u8',
  },
];

// ============================================
// 新闻直播源（24小时）
// ============================================

/**
 * 24小时新闻直播源
 * 24/7 News Live Streams
 */
export const NEWS_CHANNELS_24_7: ChinaLiveChannel[] = [
  {
    id: 'cctv13_news',
    name: 'CCTV-13 新闻',
    handle: '@cctv13',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV13HD/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225812/index.m3u8',
    ],
  },
  {
    id: 'cctv4_news',
    name: 'CCTV-4 中文国际',
    handle: '@cctv4',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV4HD/playlist.m3u8',
    backupUrls: [
      'http://39.134.66.66/PLTV/88888888/224/3221225820/index.m3u8',
    ],
  },
  {
    id: 'cgtn_news',
    name: 'CGTN 国际新闻',
    handle: '@cgtn',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://news.cgtn.com/resource/live/english/cgtn-news.m3u8',
  },
  {
    id: 'phoenix_info_news',
    name: '凤凰资讯',
    handle: '@phoenix',
    sourceType: 'satellite',
    hlsUrl: 'https://node1.olelive.com/live/PHOENIXINFONEWS/playlist.m3u8',
  },
  {
    id: 'xinhua',
    name: '新华社',
    handle: '@xinhua',
    sourceType: 'web',
    hlsUrl: 'https://live.xinhua.net/tvworld/playlist.m3u8',
  },
];

// ============================================
// 财经直播源
// ============================================

/**
 * 财经直播源
 * Finance/Business Live Streams
 */
export const FINANCE_CHANNELS: ChinaLiveChannel[] = [
  {
    id: 'cctv2_finance',
    name: 'CCTV-2 财经',
    handle: '@cctv2',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV2HD/playlist.m3u8',
  },
  {
    id: 'cctv13_finance',
    name: 'CCTV-13 新闻',
    handle: '@cctv13',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV13HD/playlist.m3u8',
  },
  {
    id: 'shanghai_finance',
    name: '上海第一财经',
    handle: '@yicai',
    sourceType: 'local',
    platform: 'smg',
    hlsUrl: 'https://node1.olelive.com/live/DYCJ/playlist.m3u8',
  },
];

// ============================================
// 科技直播源
// ============================================

/**
 * 科技相关直播源
 * Technology-related Live Streams
 */
export const TECH_CHANNELS: ChinaLiveChannel[] = [
  {
    id: 'cctv9_doc',
    name: 'CCTV-9 纪录',
    handle: '@cctv9',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV9HD/playlist.m3u8',
  },
  {
    id: 'cctv10_science',
    name: 'CCTV-10 科教',
    handle: '@cctv10',
    sourceType: 'cctv',
    platform: 'cctv',
    hlsUrl: 'https://node1.olelive.com/live/CCTV10HD/playlist.m3u8',
  },
];

// ============================================
// 娱乐直播源
// ============================================

/**
 * 娱乐直播源
 * Entertainment Live Streams
 */
export const ENTERTAINMENT_CHANNELS: ChinaLiveChannel[] = [
  {
    id: 'hunantv_ent',
    name: '湖南卫视',
    handle: '@hunantv',
    sourceType: 'satellite',
    platform: 'hunan',
    hlsUrl: 'https://node1.olelive.com/live/HNS/playlist.m3u8',
  },
  {
    id: 'zjtv_ent',
    name: '浙江卫视',
    handle: '@zjtv',
    sourceType: 'satellite',
    platform: 'zhejiang',
    hlsUrl: 'https://node1.olelive.com/live/ZJS/playlist.m3u8',
  },
  {
    id: 'jstv_ent',
    name: '江苏卫视',
    handle: '@jstv',
    sourceType: 'satellite',
    platform: 'jiangsu',
    hlsUrl: 'https://node1.olelive.com/live/JSS/playlist.m3u8',
  },
];

// ============================================
// IPTV 源地址列表
// ============================================

/**
 * 国内IPTV源地址
 * China IPTV Source URLs
 * 
 * 这些是常用的IPTV源，稳定性可能随时间变化
 */
export const IPTV_SOURCES = {
  /**
   * 央视源
   * CCTV Official Source
   */
  cctv: {
    baseUrl: 'http://39.134.66.66/PLTV/88888888/224/',
    channels: {
      cctv1: '3221225816/index.m3u8',
      cctv2: '3221225819/index.m3u8',
      cctv4: '3221225820/index.m3u8',
      cctv5: '3221225818/index.m3u8',
      cctv5plus: '3221225875/index.m3u8',
      cctv13: '3221225812/index.m3u8',
      cctv9: '3221225821/index.m3u8',
      cctv10: '3221225854/index.m3u8',
    },
  },

  /**
   * OleLive源
   * OleLive Source
   */
  olelive: {
    baseUrl: 'https://node1.olelive.com/live/',
    channels: {
      cctv1: 'CCTV1HD/playlist.m3u8',
      cctv2: 'CCTV2HD/playlist.m3u8',
      cctv4: 'CCTV4HD/playlist.m3u8',
      cctv5: 'CCTV5HD/playlist.m3u8',
      cctv13: 'CCTV13HD/playlist.m3u8',
      hunantv: 'HNS/playlist.m3u8',
      zjtv: 'ZJS/playlist.m3u8',
      jstv: 'JSS/playlist.m3u8',
      dragon: 'DFS/playlist.m3u8',
    },
  },

  /**
   * 自定义源（用户可自行添加）
   * Custom Sources (User-defined)
   */
  custom: [] as string[],
};

// ============================================
// 播放器配置
// ============================================

/**
 * 直播播放器配置
 * Live Player Configuration
 */
export const CHINA_LIVE_PLAYER_CONFIG = {
  /**
   * 默认播放器类型
   * Default Player Type
   * 
   * - hls: 使用HLS.js播放m3u8
   * - native: 使用浏览器原生HLS支持（Safari）
   * - flv: 使用flv.js播放FLV流
   */
  defaultPlayerType: 'hls' as 'hls' | 'native' | 'flv',

  /**
   * HLS.js 配置
   * HLS.js Configuration
   */
  hlsConfig: {
    enableWorker: true,
    lowLatencyMode: true,
    backBufferLength: 90,
    maxBufferLength: 30,
    maxMaxBufferLength: 60,
    startLevel: -1, // 自动选择清晰度
    capLevelToPlayerSize: true,
  },

  /**
   * 重连配置
   * Reconnection Settings
   */
  reconnect: {
    enabled: true,
    maxAttempts: 3,
    delayMs: 2000,
  },

  /**
   * 错误处理
   * Error Handling
   */
  errorHandling: {
    fallbackToBackup: true,  // 主源失败时切换备用源
    showErrorMessage: true,   // 显示错误信息
    autoRetryDelay: 5000,     // 自动重试延迟
  },
};

// ============================================
// 频道区域分组
// ============================================

/**
 * 频道区域分组
 * Channel Region Groups
 */
export const CHINA_CHANNEL_REGIONS = [
  {
    key: 'cctv',
    labelKey: '央视频道',
    channelIds: CCTV_CHANNELS.map(c => c.id),
  },
  {
    key: 'satellite',
    labelKey: '卫视频道',
    channelIds: SATELLITE_CHANNELS.map(c => c.id),
  },
  {
    key: 'news',
    labelKey: '新闻直播',
    channelIds: NEWS_CHANNELS_24_7.map(c => c.id),
  },
  {
    key: 'finance',
    labelKey: '财经频道',
    channelIds: FINANCE_CHANNELS.map(c => c.id),
  },
  {
    key: 'tech',
    labelKey: '科教频道',
    channelIds: TECH_CHANNELS.map(c => c.id),
  },
  {
    key: 'entertainment',
    labelKey: '娱乐频道',
    channelIds: ENTERTAINMENT_CHANNELS.map(c => c.id),
  },
];

// ============================================
// 变体配置
// ============================================

/**
 * 根据项目变体返回默认直播频道
 * Get Default Live Channels by Variant
 */
export function getDefaultChinaLiveChannels(variant: string): ChinaLiveChannel[] {
  switch (variant) {
    case 'tech':
      return [...TECH_CHANNELS, ...NEWS_CHANNELS_24_7.slice(0, 2)];
    case 'finance':
      return [...FINANCE_CHANNELS, ...NEWS_CHANNELS_24_7.slice(0, 2)];
    case 'happy':
      return [...ENTERTAINMENT_CHANNELS.slice(0, 3)];
    case 'full':
    default:
      return [...NEWS_CHANNELS_24_7, ...SATELLITE_CHANNELS.slice(0, 3)];
  }
}

/**
 * 获取所有可选的中国直播频道
 * Get All Optional China Live Channels
 */
export function getAllOptionalChinaLiveChannels(): ChinaLiveChannel[] {
  return [
    ...CCTV_CHANNELS,
    ...SATELLITE_CHANNELS,
    ...NEWS_CHANNELS_24_7,
    ...FINANCE_CHANNELS,
    ...TECH_CHANNELS,
    ...ENTERTAINMENT_CHANNELS,
  ];
}

// ============================================
// 直播源状态检测
// ============================================

/**
 * 检测直播源是否可用
 * Check if Live Source is Available
 * 
 * @param url 直播源URL
 * @param timeout 超时时间（毫秒）
 * @returns 是否可用
 */
export async function checkLiveSourceAvailable(
  url: string,
  timeout: number = 5000
): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    await fetch(url, {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'no-cors', // 对于跨域资源
    });
    
    clearTimeout(timeoutId);
    return true;
  } catch {
    return false;
  }
}

/**
 * 批量检测直播源可用性
 * Batch Check Live Sources Availability
 * 
 * @param channels 频道列表
 * @returns 可用频道ID列表
 */
export async function batchCheckChannels(
  channels: ChinaLiveChannel[]
): Promise<string[]> {
  const results = await Promise.allSettled(
    channels.map(async (channel) => {
      const url = channel.hlsUrl || channel.backupUrls?.[0];
      if (!url) return null;
      
      const available = await checkLiveSourceAvailable(url);
      return available ? channel.id : null;
    })
  );
  
  return results
    .filter((r): r is PromiseFulfilledResult<string | null> => 
      r.status === 'fulfilled' && r.value !== null
    )
    .map(r => r.value as string);
}

export default {
  CCTV_CHANNELS,
  SATELLITE_CHANNELS,
  NEWS_CHANNELS_24_7,
  FINANCE_CHANNELS,
  TECH_CHANNELS,
  ENTERTAINMENT_CHANNELS,
  IPTV_SOURCES,
  CHINA_LIVE_PLAYER_CONFIG,
  CHINA_CHANNEL_REGIONS,
  getDefaultChinaLiveChannels,
  getAllOptionalChinaLiveChannels,
  checkLiveSourceAvailable,
  batchCheckChannels,
};
