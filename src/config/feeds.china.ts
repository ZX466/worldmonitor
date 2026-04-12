/**
 * China-specific news feed configuration
 * 中国本土化新闻源配置
 * 
 * This configuration replaces international sources with Chinese alternatives
 * for better accessibility and stability in China's network environment.
 */

import type { Feed } from '@/types';

// Helper to create RSS proxy URL (same as feeds.ts)
const rss = (url: string) => `/api/rss-proxy?url=${encodeURIComponent(url)}`;

/**
 * China-specific source tier system
 * 中国本土新闻源分级系统
 * 
 * Tier 1: 国家级通讯社 - 最权威、最快速
 * Tier 2: 主流媒体 - 高质量新闻报道
 * Tier 3: 专业媒体 - 领域专业性强
 * Tier 4: 聚合平台 - 信息丰富但权威性较低
 */
export const CHINA_SOURCE_TIERS: Record<string, number> = {
  // Tier 1 - 国家级通讯社
  '新华社': 1,
  '中新社': 1,
  '人民日报': 1,
  '央视新闻': 1,
  '光明日报': 1,

  // Tier 2 - 主流财经媒体
  '财新网': 2,
  '第一财经': 2,
  '经济观察报': 2,
  '财经网': 2,
  '证券时报': 2,

  // Tier 2 - 科技媒体
  '36氪': 2,
  '虎嗅': 2,
  '钛媒体': 2,
  'IT之家': 2,
  '雷锋网': 2,

  // Tier 2 - 主流门户
  '新浪新闻': 2,
  '网易新闻': 2,
  '腾讯新闻': 2,
  '搜狐新闻': 2,
  '凤凰新闻': 2,

  // Tier 3 - 专业领域媒体
  '观察者网': 3,
  '澎湃新闻': 3,
  '界面新闻': 3,
  '21世纪经济报道': 3,
  '中国经营报': 3,

  // Tier 3 - 科技博客
  '科技美学': 3,
  '差评': 3,
  '爱范儿': 3,
  '少数派': 3,
  '机器之心': 3,

  // Tier 4 - 聚合平台
  '今日头条': 4,
  '百家号': 4,
  '大鱼号': 4,
  '知乎': 4,
};

export function getChinaSourceTier(sourceName: string): number {
  return CHINA_SOURCE_TIERS[sourceName] ?? 4;
}

/**
 * China-specific source types
 * 中国本土新闻源类型
 */
export type ChinaSourceType = 'wire' | 'gov' | 'mainstream' | 'market' | 'tech' | 'other';

export const CHINA_SOURCE_TYPES: Record<string, ChinaSourceType> = {
  // 国家级通讯社 - Wire services
  '新华社': 'wire',
  '中新社': 'wire',
  '人民日报': 'gov',
  '央视新闻': 'gov',
  '光明日报': 'gov',

  // 财经媒体 - Market/Finance
  '财新网': 'market',
  '第一财经': 'market',
  '经济观察报': 'market',
  '财经网': 'market',
  '证券时报': 'market',
  '21世纪经济报道': 'market',
  '中国经营报': 'market',

  // 科技媒体 - Tech
  '36氪': 'tech',
  '虎嗅': 'tech',
  '钛媒体': 'tech',
  'IT之家': 'tech',
  '雷锋网': 'tech',
  '机器之心': 'tech',
  '科技美学': 'tech',
  '差评': 'tech',
  '爱范儿': 'tech',
  '少数派': 'tech',

  // 主流门户 - Mainstream
  '新浪新闻': 'mainstream',
  '网易新闻': 'mainstream',
  '腾讯新闻': 'mainstream',
  '搜狐新闻': 'mainstream',
  '凤凰新闻': 'mainstream',

  // 专业媒体 - Mainstream/Specialty
  '观察者网': 'mainstream',
  '澎湃新闻': 'mainstream',
  '界面新闻': 'mainstream',
};

export function getChinaSourceType(sourceName: string): ChinaSourceType {
  return CHINA_SOURCE_TYPES[sourceName] ?? 'other';
}

/**
 * China-specific propaganda risk assessment
 * 中国本土新闻源宣传风险评估
 * 
 * Note: Chinese state media is marked as 'high' risk to maintain editorial neutrality
 * and alert users to potential government narrative alignment
 */
export type PropagandaRisk = 'low' | 'medium' | 'high';

export interface ChinaSourceRiskProfile {
  risk: PropagandaRisk;
  stateAffiliated?: string;
  knownBiases?: string[];
  note?: string;
}

export const CHINA_SOURCE_PROPAGANDA_RISK: Record<string, ChinaSourceRiskProfile> = {
  // High risk - State-controlled media
  '新华社': { risk: 'high', stateAffiliated: 'China', note: 'Official CCP news agency (中国国家通讯社)' },
  '中新社': { risk: 'high', stateAffiliated: 'China', note: 'State-run news agency (中国新闻社)' },
  '人民日报': { risk: 'high', stateAffiliated: 'China', note: 'CCP official newspaper (中共中央机关报)' },
  '央视新闻': { risk: 'high', stateAffiliated: 'China', note: 'State broadcaster (中国中央电视台)' },
  '光明日报': { risk: 'high', stateAffiliated: 'China', note: 'CCP newspaper (中共中央主办)' },

  // Medium risk - Semi-official or editorial bias
  '观察者网': { risk: 'medium', knownBiases: ['Nationalist perspective', 'Pro-government'], note: 'Private but nationalist-leaning' },
  '环球时报': { risk: 'medium', stateAffiliated: 'China', note: 'People\'s Daily subsidiary, nationalist tabloid' },

  // Low risk - Independent journalism
  '财新网': { risk: 'low', note: 'Independent business journalism, known for investigative reporting' },
  '第一财经': { risk: 'low', note: 'Business media, editorially independent' },
  '经济观察报': { risk: 'low', note: 'Independent business newspaper' },
  '澎湃新闻': { risk: 'low', note: 'Digital news platform with investigative focus' },
  '界面新闻': { risk: 'low', note: 'Business and finance news platform' },
  '36氪': { risk: 'low', note: 'Tech startup media, independent' },
  '虎嗅': { risk: 'low', note: 'Tech and business media, independent' },
  '钛媒体': { risk: 'low', note: 'Tech media, independent' },
};

export function getChinaSourcePropagandaRisk(sourceName: string): ChinaSourceRiskProfile {
  return CHINA_SOURCE_PROPAGANDA_RISK[sourceName] ?? { risk: 'low' };
}

/**
 * China-specific news feeds configuration
 * 中国本土化新闻源配置
 */
export const CHINA_FEEDS: Record<string, Feed[]> = {
  // 时政要闻 - Politics & Breaking News
  politics: [
    { 
      name: '新华社', 
      url: rss('http://www.xinhuanet.com/politics/news_politics.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '中新社', 
      url: rss('http://www.chinanews.com.cn/rss/scroll-news.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '人民日报', 
      url: rss('http://www.people.com.cn/rss/politics.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '央视新闻', 
      url: rss('https://news.cctv.com/data/news.json'),
      lang: 'zh-CN'
    },
    { 
      name: '澎湃新闻', 
      url: rss('https://www.thepaper.cn/rss/politics.xml'),
      lang: 'zh-CN'
    },
  ],

  // 财经新闻 - Finance & Economy
  finance: [
    { 
      name: '财新网', 
      url: rss('https://rsshub.app/caixin/finance'),
      lang: 'zh-CN'
    },
    { 
      name: '第一财经', 
      url: rss('https://rsshub.app/yicai/brief'),
      lang: 'zh-CN'
    },
    { 
      name: '经济观察报', 
      url: rss('http://www.eeo.com.cn/rss/finance.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '证券时报', 
      url: rss('http://www.stcn.com/rss/rss_news.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '21世纪经济报道', 
      url: rss('https://rsshub.app/21jingji'),
      lang: 'zh-CN'
    },
    { 
      name: '界面新闻', 
      url: rss('https://rsshub.app/jiemian/realtime'),
      lang: 'zh-CN'
    },
  ],

  // 科技新闻 - Technology
  tech: [
    { 
      name: '36氪', 
      url: rss('https://rsshub.app/36kr/newsflashes'),
      lang: 'zh-CN'
    },
    { 
      name: '虎嗅', 
      url: rss('https://rsshub.app/huxiu/tag/1024'),
      lang: 'zh-CN'
    },
    { 
      name: '钛媒体', 
      url: rss('https://rsshub.app/tmtpost'),
      lang: 'zh-CN'
    },
    { 
      name: 'IT之家', 
      url: rss('https://rsshub.app/ithome/ranking/7days'),
      lang: 'zh-CN'
    },
    { 
      name: '雷锋网', 
      url: rss('https://rsshub.app/leiphone'),
      lang: 'zh-CN'
    },
    { 
      name: '机器之心', 
      url: rss('https://rsshub.app/jiqizhixin'),
      lang: 'zh-CN'
    },
  ],

  // 国际新闻 - International
  world: [
    { 
      name: '新华社国际', 
      url: rss('http://www.xinhuanet.com/world/news_world.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '中新社国际', 
      url: rss('http://www.chinanews.com.cn/rss/gj.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '环球时报', 
      url: rss('https://rsshub.app/huanqiu'),
      lang: 'zh-CN'
    },
    { 
      name: '观察者网', 
      url: rss('https://rsshub.app/guancha/headline'),
      lang: 'zh-CN'
    },
  ],

  // 社会新闻 - Society
  society: [
    { 
      name: '澎湃新闻社会', 
      url: rss('https://www.thepaper.cn/rss/news.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '中新社社会', 
      url: rss('http://www.chinanews.com.cn/rss/sh.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '光明日报', 
      url: rss('http://www.gmw.cn/rss/politics.xml'),
      lang: 'zh-CN'
    },
  ],

  // 商业新闻 - Business
  business: [
    { 
      name: '财新商业', 
      url: rss('https://rsshub.app/caixin/economy'),
      lang: 'zh-CN'
    },
    { 
      name: '第一财经商业', 
      url: rss('https://rsshub.app/yicai/economy'),
      lang: 'zh-CN'
    },
    { 
      name: '界面商业', 
      url: rss('https://rsshub.app/jiemian/business'),
      lang: 'zh-CN'
    },
  ],

  // 科技商业 - Tech Business
  tech_business: [
    { 
      name: '36氪融资', 
      url: rss('https://rsshub.app/36kr/invest'),
      lang: 'zh-CN'
    },
    { 
      name: '虎嗅商业', 
      url: rss('https://rsshub.app/huxiu/business'),
      lang: 'zh-CN'
    },
    { 
      name: '钛媒体商业', 
      url: rss('https://rsshub.app/tmtpost/business'),
      lang: 'zh-CN'
    },
  ],
};

/**
 * Tech-specific feeds for China variant
 * 中国科技版专用新闻源
 */
export const CHINA_TECH_FEEDS: Record<string, Feed[]> = {
  // AI & Machine Learning
  ai: [
    { 
      name: '机器之心', 
      url: rss('https://rsshub.app/jiqizhixin'),
      lang: 'zh-CN'
    },
    { 
      name: '雷锋网AI', 
      url: rss('https://rsshub.app/leiphone/ai'),
      lang: 'zh-CN'
    },
    { 
      name: '36氪AI', 
      url: rss('https://rsshub.app/36kr/motif/811'),
      lang: 'zh-CN'
    },
    { 
      name: '钛媒体AI', 
      url: rss('https://rsshub.app/tmtpost/ai'),
      lang: 'zh-CN'
    },
  ],

  // Startups & Venture Capital
  startups: [
    { 
      name: '36氪', 
      url: rss('https://rsshub.app/36kr/newsflashes'),
      lang: 'zh-CN'
    },
    { 
      name: '虎嗅创业', 
      url: rss('https://rsshub.app/huxiu/startup'),
      lang: 'zh-CN'
    },
    { 
      name: '钛媒体创投', 
      url: rss('https://rsshub.app/tmtpost/startup'),
      lang: 'zh-CN'
    },
    { 
      name: '投中网', 
      url: rss('https://rsshub.app/chinaventure'),
      lang: 'zh-CN'
    },
  ],

  // Hardware & Devices
  hardware: [
    { 
      name: 'IT之家', 
      url: rss('https://rsshub.app/ithome/ranking/7days'),
      lang: 'zh-CN'
    },
    { 
      name: '科技美学', 
      url: rss('https://rsshub.app/kjmhw'),
      lang: 'zh-CN'
    },
    { 
      name: '差评', 
      url: rss('https://rsshub.app/chaping'),
      lang: 'zh-CN'
    },
  ],

  // Software & Apps
  software: [
    { 
      name: '少数派', 
      url: rss('https://rsshub.app/sspai'),
      lang: 'zh-CN'
    },
    { 
      name: '爱范儿', 
      url: rss('https://rsshub.app/ifanr'),
      lang: 'zh-CN'
    },
    { 
      name: 'IT之家软件', 
      url: rss('https://rsshub.app/ithome/soft'),
      lang: 'zh-CN'
    },
  ],
};

/**
 * Finance-specific feeds for China variant
 * 中国财经版专用新闻源
 */
export const CHINA_FINANCE_FEEDS: Record<string, Feed[]> = {
  // A-Share Market (A股市场)
  stock: [
    { 
      name: '证券时报', 
      url: rss('http://www.stcn.com/rss/rss_news.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '中国证券报', 
      url: rss('https://rsshub.app/chinasecurities/stock'),
      lang: 'zh-CN'
    },
    { 
      name: '上海证券报', 
      url: rss('https://rsshub.app/shsecurities'),
      lang: 'zh-CN'
    },
    { 
      name: '财新股市', 
      url: rss('https://rsshub.app/caixin/stock'),
      lang: 'zh-CN'
    },
  ],

  // Macro Economy (宏观经济)
  macro: [
    { 
      name: '财新宏观', 
      url: rss('https://rsshub.app/caixin/economy'),
      lang: 'zh-CN'
    },
    { 
      name: '第一财经宏观', 
      url: rss('https://rsshub.app/yicai/macro'),
      lang: 'zh-CN'
    },
    { 
      name: '经济观察报', 
      url: rss('http://www.eeo.com.cn/rss/finance.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '21世纪经济报道', 
      url: rss('https://rsshub.app/21jingji'),
      lang: 'zh-CN'
    },
  ],

  // Banking & Finance (银行金融)
  banking: [
    { 
      name: '财新金融', 
      url: rss('https://rsshub.app/caixin/finance'),
      lang: 'zh-CN'
    },
    { 
      name: '第一财经金融', 
      url: rss('https://rsshub.app/yicai/finance'),
      lang: 'zh-CN'
    },
    { 
      name: '界面金融', 
      url: rss('https://rsshub.app/jiemian/finance'),
      lang: 'zh-CN'
    },
  ],
};

/**
 * Happy variant feeds for China (positive news)
 * 中国"开心"版专用新闻源(正能量新闻)
 */
export const CHINA_HAPPY_FEEDS: Record<string, Feed[]> = {
  positive: [
    { 
      name: '新华社正能量', 
      url: rss('http://www.xinhuanet.com/local/news_local.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '人民日报暖新闻', 
      url: rss('http://www.people.com.cn/rss/society.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '央视暖新闻', 
      url: rss('https://news.cctv.com/society/data/society.json'),
      lang: 'zh-CN'
    },
    { 
      name: '澎湃暖闻', 
      url: rss('https://www.thepaper.cn/rss/warm.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '光明日报好人', 
      url: rss('http://www.gmw.cn/rss/society.xml'),
      lang: 'zh-CN'
    },
  ],

  science: [
    { 
      name: '新华社科技', 
      url: rss('http://www.xinhuanet.com/tech/news_tech.xml'),
      lang: 'zh-CN'
    },
    { 
      name: '中科院之声', 
      url: rss('https://rsshub.app/cas'),
      lang: 'zh-CN'
    },
    { 
      name: '科技日报', 
      url: rss('https://rsshub.app/stdaily'),
      lang: 'zh-CN'
    },
  ],
};

/**
 * Get all China feeds merged for a specific variant
 * 获取特定版本的所有中国新闻源
 */
export function getChinaFeeds(variant: 'full' | 'tech' | 'finance' | 'happy'): Record<string, Feed[]> {
  switch (variant) {
    case 'tech':
      return { ...CHINA_FEEDS, ...CHINA_TECH_FEEDS };
    case 'finance':
      return { ...CHINA_FEEDS, ...CHINA_FINANCE_FEEDS };
    case 'happy':
      return CHINA_HAPPY_FEEDS;
    case 'full':
    default:
      return CHINA_FEEDS;
  }
}
