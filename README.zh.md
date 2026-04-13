# 天下观 - 全球态势感知平台

## 🚀 项目介绍
天下观（原World Monitor）是一个AI驱动的实时全球情报仪表盘，汇集新闻、市场、军事追踪、基础设施监控和地缘政治数据，一览全球态势。

## ✨ 特性
- 🧠 AI驱动的情报合成
- 📰 实时新闻聚合
- 📈 股票市场追踪
- ✈️ 军用飞行监控
- 🚢 船舶AIS追踪
- 🌍 地震警报
- 📢 抗议活动追踪
- ⚡ 电力中断监控
- 🛢️ 油价分析
- 💰 政府支出数据
- 🎯 预测市场
- 🏗️ 基础设施监控
- 🌐 地缘政治情报

## 🎨 版本变体
- 🌍 完整版：所有功能
- 🔬 科技版：科技相关情报
- 💰 金融版：金融市场数据
- 😊 快乐版：正面新闻为主

## 🛠️ 本地运行
### 安装依赖
```bash
# 解决sharp安装超时问题
npm config set sharp_binary_host "https://npmmirror.com/mirrors/sharp"
npm config set sharp_libvips_binary_host "https://npmmirror.com/mirrors/sharp-libvips"
npm install
```

### 开发模式
```bash
# 完整版
npm run dev

# 科技版
npm run dev:tech

# 金融版
npm run dev:finance

# 快乐版
npm run dev:happy
```

### 构建生产版本
```bash
npm run build
```

## 🇨🇳 中国特化修改
- ✅ 全界面中文本地化，App名称改为"天下观"
- ✅ 字体资源替换为国内镜像，访问速度大幅提升
- ✅ 适配国内网络环境，解决资源加载超时问题
- ✅ 增加国内数据源支持（新闻、经济、突发事件）
- ✅ 中国风主题优化，更符合国内用户审美
- ✅ 完善中文翻译，修复未翻译的英文术语
