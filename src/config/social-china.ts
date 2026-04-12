/**
 * 中国本土化社交媒体源配置
 * China-specific Social Media Source Configuration
 * 
 * 本文件包含中国社交媒体平台的配置，用于替代需要VPN访问的国外平台
 * This file contains configurations for Chinese social media platforms,
 * replacing foreign platforms that require VPN access
 */

// ============================================
// 社交媒体平台类型定义
// ============================================

export interface SocialMediaSource {
  /** 平台ID */
  id: string;
  
  /** 平台名称 */
  name: string;
  
  /** 平台英文名 */
  nameEn: string;
  
  /** 平台类型 */
  type: 'weibo' | 'wechat' | 'douyin' | 'xiaohongshu' | 'zhihu' | 'bilibili' | 'toutiao';
  
  /** 平台Logo URL */
  logoUrl?: string;
  
  /** 平台主域名 */
  domain: string;
  
  /** API基础URL */
  apiUrl?: string;
  
  /** 是否需要API Key */
  requiresApiKey: boolean;
  
  /** 是否需要代理（国内直接访问） */
  needsProxy: boolean;
  
  /** API申请地址 */
  apiKeyApplyUrl?: string;
  
  /** 免费额度说明 */
  freeQuota?: string;
  
  /** RSS订阅支持 */
  rssSupport: boolean;
  
  /** RSS URL模板（如果支持） */
  rssUrlTemplate?: string;
  
  /** 数据获取方式 */
  fetchMethod: 'api' | 'rss' | 'scraping' | 'rsshub';
  
  /** RSSHub路由（如果支持） */
  rsshubRoute?: string;
  
  /** 状态：active | deprecated | testing */
  status: 'active' | 'deprecated' | 'testing';
  
  /** 备注 */
  notes?: string;
}

// ============================================
// 中国社交媒体平台配置
// ============================================

/**
 * 微博（Weibo）
 * 中国最大的社交媒体平台之一
 */
export const WEIBO_CONFIG: SocialMediaSource = {
  id: 'weibo',
  name: '微博',
  nameEn: 'Weibo',
  type: 'weibo',
  domain: 'weibo.com',
  apiUrl: 'https://api.weibo.com/2/',
  requiresApiKey: true,
  needsProxy: false,
  apiKeyApplyUrl: 'https://open.weibo.com/wiki/%E6%96%B0%E6%89%8B%E6%8C%87%E5%BC%95',
  freeQuota: '每日10万次调用（测试版）',
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/weibo/user/:uid',
  status: 'active',
  notes: '通过RSSHub可以无需API Key获取公开内容',
};

/**
 * 微信公众号（WeChat Official Accounts）
 * 中国最流行的内容发布平台
 */
export const WECHAT_CONFIG: SocialMediaSource = {
  id: 'wechat',
  name: '微信公众号',
  nameEn: 'WeChat Official Accounts',
  type: 'wechat',
  domain: 'mp.weixin.qq.com',
  requiresApiKey: true,
  needsProxy: false,
  apiKeyApplyUrl: 'https://mp.weixin.qq.com/',
  freeQuota: '需要企业认证',
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/wechat/mp/msgalbum/:username',
  status: 'active',
  notes: '需要配置微信公众号后台服务器，或使用RSSHub第三方服务',
};

/**
 * 抖音（Douyin/TikTok China）
 * 中国最大的短视频平台
 */
export const DOUYIN_CONFIG: SocialMediaSource = {
  id: 'douyin',
  name: '抖音',
  nameEn: 'Douyin',
  type: 'douyin',
  domain: 'douyin.com',
  apiUrl: 'https://developer.open-douyin.com/',
  requiresApiKey: true,
  needsProxy: false,
  apiKeyApplyUrl: 'https://developer.open-douyin.com/docs/resource/zh-CN/mini-app/develop/server/introduction',
  freeQuota: '有限免费额度',
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/douyin/user/:uid',
  status: 'active',
  notes: '通过RSSHub可获取公开用户内容',
};

/**
 * 小红书（Xiaohongshu/Little Red Book）
 * 中国流行的社交电商平台
 */
export const XIAOHONGSHU_CONFIG: SocialMediaSource = {
  id: 'xiaohongshu',
  name: '小红书',
  nameEn: 'Xiaohongshu',
  type: 'xiaohongshu',
  domain: 'xiaohongshu.com',
  requiresApiKey: false,
  needsProxy: false,
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/xiaohongshu/user/:userId',
  status: 'active',
  notes: '通过RSSHub获取公开内容',
};

/**
 * 知乎（Zhihu）
 * 中国最大的问答社区
 */
export const ZHIHU_CONFIG: SocialMediaSource = {
  id: 'zhihu',
  name: '知乎',
  nameEn: 'Zhihu',
  type: 'zhihu',
  domain: 'zhihu.com',
  apiUrl: 'https://www.zhihu.com/api/',
  requiresApiKey: false,
  needsProxy: false,
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/zhihu/people/activities/:peopleId',
  status: 'active',
  notes: '知乎有公开API，但建议通过RSSHub获取',
};

/**
 * 哔哩哔哩（Bilibili）
 * 中国最大的视频弹幕网站
 */
export const BILIBILI_CONFIG: SocialMediaSource = {
  id: 'bilibili',
  name: '哔哩哔哩',
  nameEn: 'Bilibili',
  type: 'bilibili',
  domain: 'bilibili.com',
  apiUrl: 'https://api.bilibili.com/',
  requiresApiKey: false,
  needsProxy: false,
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/bilibili/user/dynamic/:uid',
  status: 'active',
  notes: 'B站有公开API，支持RSS订阅',
};

/**
 * 今日头条（Toutiao）
 * 中国最大的新闻资讯平台
 */
export const TOUTIAO_CONFIG: SocialMediaSource = {
  id: 'toutiao',
  name: '今日头条',
  nameEn: 'Toutiao',
  type: 'toutiao',
  domain: 'toutiao.com',
  apiUrl: 'https://developer.toutiao.com/',
  requiresApiKey: true,
  needsProxy: false,
  apiKeyApplyUrl: 'https://developer.toutiao.com/',
  freeQuota: '有限免费额度',
  rssSupport: true,
  fetchMethod: 'rsshub',
  rsshubRoute: '/toutiao/user/:uid',
  status: 'active',
  notes: '通过RSSHub获取公开内容',
};

// ============================================
// 所有中国社交媒体平台
// ============================================

export const CHINA_SOCIAL_PLATFORMS: SocialMediaSource[] = [
  WEIBO_CONFIG,
  WECHAT_CONFIG,
  DOUYIN_CONFIG,
  XIAOHONGSHU_CONFIG,
  ZHIHU_CONFIG,
  BILIBILI_CONFIG,
  TOUTIAO_CONFIG,
];

// ============================================
// RSSHub 配置
// ============================================

/**
 * RSSHub 公共实例列表
 * RSSHub Public Instances
 */
export const RSSHUB_INSTANCES = [
  {
    url: 'https://rsshub.app',
    location: 'Global',
    latency: 'Medium',
    rateLimit: '有',
  },
  {
    url: 'https://rsshub.liumingye.cn',
    location: 'China',
    latency: 'Low',
    rateLimit: '无',
  },
  {
    url: 'https://rsshub.rssforever.com',
    location: 'China',
    latency: 'Low',
    rateLimit: '有',
  },
];

/**
 * 获取 RSSHub 实例 URL
 */
export function getRsshubUrl(): string {
  // 优先使用环境变量配置的实例
  const customUrl = import.meta.env.VITE_RSSHUB_URL;
  if (customUrl) return customUrl;
  
  // 国内环境优先使用国内实例
  const isChinaNetwork = navigator.language.includes('zh-CN');
  if (isChinaNetwork) {
    return RSSHUB_INSTANCES.find(i => i.location === 'China')?.url || RSSHUB_INSTANCES[0].url;
  }
  
  return RSSHUB_INSTANCES[0].url;
}

// ============================================
// 社交媒体源获取函数
// ============================================

/**
 * 构建 RSSHub 订阅 URL
 * Build RSSHub subscription URL
 */
export function buildRsshubUrl(route: string, params?: Record<string, string>): string {
  const baseUrl = getRsshubUrl();
  let url = `${baseUrl}${route}`;
  
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }
  
  return url;
}

/**
 * 获取微博用户动态
 * Get Weibo user timeline
 */
export function getWeiboUserTimeline(uid: string): string {
  return buildRsshubUrl(`/weibo/user/${uid}`);
}

/**
 * 获取微信公众号文章
 * Get WeChat official account articles
 */
export function getWeChatMpArticles(username: string): string {
  return buildRsshubUrl(`/wechat/mp/msgalbum/${username}`);
}

/**
 * 获取抖音用户视频
 * Get Douyin user videos
 */
export function getDouyinUserVideos(uid: string): string {
  return buildRsshubUrl(`/douyin/user/${uid}`);
}

/**
 * 获取小红书用户笔记
 * Get Xiaohongshu user notes
 */
export function getXiaohongshuUserNotes(userId: string): string {
  return buildRsshubUrl(`/xiaohongshu/user/${userId}`);
}

/**
 * 获取知乎用户动态
 * Get Zhihu user activities
 */
export function getZhihuUserActivities(peopleId: string): string {
  return buildRsshubUrl(`/zhihu/people/activities/${peopleId}`);
}

/**
 * 获取B站用户动态
 * Get Bilibili user dynamics
 */
export function getBilibiliUserDynamic(uid: string): string {
  return buildRsshubUrl(`/bilibili/user/dynamic/${uid}`);
}

/**
 * 获取今日头条用户文章
 * Get Toutiao user articles
 */
export function getToutiaoUserArticles(uid: string): string {
  return buildRsshubUrl(`/toutiao/user/${uid}`);
}

// ============================================
// 热门账号配置（示例）
// ============================================

/**
 * 热门新闻媒体微博账号
 * Popular news media Weibo accounts
 */
export const POPULAR_NEWS_WEIBO_ACCOUNTS = [
  { uid: '1618051664', name: '新华社' },
  { uid: '1699432410', name: '人民日报' },
  { uid: '2656274875', name: '央视新闻' },
  { uid: '1642088277', name: '中国新闻网' },
  { uid: '1893892941', name: '环球时报' },
  { uid: '1653689003', name: '澎湃新闻' },
  { uid: '1887344341', name: '第一财经' },
  { uid: '1640601392', name: '财新网' },
];

/**
 * 热门科技媒体微博账号
 * Popular tech media Weibo accounts
 */
export const POPULAR_TECH_WEIBO_ACCOUNTS = [
  { uid: '1644114654', name: '36氪' },
  { uid: '1837752123', name: '虎嗅APP' },
  { uid: '1792938765', name: '爱范儿' },
  { uid: '1735116017', name: '雷锋网' },
  { uid: '1680236513', name: 'IT之家' },
];

/**
 * 热门财经媒体微博账号
 * Popular finance media Weibo accounts
 */
export const POPULAR_FINANCE_WEIBO_ACCOUNTS = [
  { uid: '1887344341', name: '第一财经' },
  { uid: '1640601392', name: '财新网' },
  { uid: '1638782947', name: '财经网' },
  { uid: '1902522631', name: '证券时报' },
];

/**
 * 热门B站UP主（科技类）
 * Popular Bilibili uploaders (Tech)
 */
export const POPULAR_TECH_BILIBILI_UPLOADER = [
  { uid: '16322037', name: '老师好我叫何同学' },
  { uid: '10330740', name: '极客湾Geekerwan' },
  { uid: '21692055', name: '小约翰可汗' },
  { uid: '37663947', name: '科技美学' },
];

// ============================================
// 数据获取服务
// ============================================

/**
 * 社交媒体数据获取选项
 */
export interface SocialMediaFetchOptions {
  /** 平台类型 */
  platform: SocialMediaSource['type'];
  
  /** 用户ID */
  userId: string;
  
  /** 获取数量 */
  limit?: number;
  
  /** 是否包含转发 */
  includeReposts?: boolean;
  
  /** 过滤关键词 */
  filterKeywords?: string[];
}

/**
 * 获取社交媒体数据
 * Fetch social media data
 */
export async function fetchSocialMediaData(options: SocialMediaFetchOptions): Promise<Response> {
  const { platform, userId, limit = 20 } = options;
  
  let url = '';
  switch (platform) {
    case 'weibo':
      url = getWeiboUserTimeline(userId);
      break;
    case 'douyin':
      url = getDouyinUserVideos(userId);
      break;
    case 'xiaohongshu':
      url = getXiaohongshuUserNotes(userId);
      break;
    case 'zhihu':
      url = getZhihuUserActivities(userId);
      break;
    case 'bilibili':
      url = getBilibiliUserDynamic(userId);
      break;
    case 'toutiao':
      url = getToutiaoUserArticles(userId);
      break;
    default:
      throw new Error(`Unsupported platform: ${platform}`);
  }
  
  // 使用 RSS 代理获取
  const proxyUrl = `/api/rss-proxy?url=${encodeURIComponent(url)}&limit=${limit}`;
  return fetch(proxyUrl);
}

// ============================================
// 使用指南
// ============================================

/**
 * 使用指南
 * Usage Guide
 * 
 * 1. RSSHub 配置：
 *    - 默认使用公共实例 rsshub.app
 *    - 可通过 VITE_RSSHUB_URL 配置私有实例
 *    - 推荐在国内部署私有 RSSHub 实例
 * 
 * 2. 微博数据获取：
 *    - 公开账号可通过 RSSHub 获取
 *    - 无需 API Key
 *    - 有频率限制，建议缓存
 * 
 * 3. 微信公众号：
 *    - 需要配置服务器
 *    - 或使用 RSSHub 的第三方服务
 *    - 适合获取公开公众号内容
 * 
 * 4. 其他平台：
 *    - 都支持通过 RSSHub 获取公开内容
 *    - 无需 API Key
 *    - 建议遵守平台使用条款
 * 
 * 5. 合规性：
 *    - 仅获取公开内容
 *    - 遵守平台API使用条款
 *    - 商业使用请获得授权
 * 
 * 6. 部署私有 RSSHub：
 *    - GitHub: https://github.com/DIYgod/RSSHub
 *    - Docker: docker pull diygod/rsshub
 *    - 文档: https://docs.rsshub.app/
 */

export default {
  CHINA_SOCIAL_PLATFORMS,
  RSSHUB_INSTANCES,
  POPULAR_NEWS_WEIBO_ACCOUNTS,
  POPULAR_TECH_WEIBO_ACCOUNTS,
  POPULAR_FINANCE_WEIBO_ACCOUNTS,
  POPULAR_TECH_BILIBILI_UPLOADER,
  getRsshubUrl,
  buildRsshubUrl,
  getWeiboUserTimeline,
  getWeChatMpArticles,
  getDouyinUserVideos,
  getXiaohongshuUserNotes,
  getZhihuUserActivities,
  getBilibiliUserDynamic,
  getToutiaoUserArticles,
  fetchSocialMediaData,
};
