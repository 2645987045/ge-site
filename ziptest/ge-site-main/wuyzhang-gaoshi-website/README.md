# 《吴玉章在高师》话剧官方网站

四川大学吴玉章学院话剧《吴玉章在高师》官方网站。

## 设计体系

视觉基于 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 的
**Runwayml DESIGN.md**（电影感编辑风格），规范见项目根目录 `DESIGN.md`，
并已作为技能安装至 `~/.codex/skills/design-md-runwayml`。

核心设计语言：

- 暗色影院基底（`#000000` / `#0c0c0c` / `#1a1a1a`）+ 纸白阅读带交替
- 零阴影、极简描边（`#27272a`），深度来自光影与分区而非 box-shadow
- 电影片名式标题排版（衬线展示字体 + 紧凑行高 + 字距）
- 朱砂印章红 `#b3242a` 仅出现在海报、印章、引号等"艺术品"元素上
- 所有媒体位均为「占位层 + 真实素材」双层结构：素材缺失时展示排版占位，
  素材放入 `public/` 后自动接管

## 技术栈

- 构建：Vite 5.x
- 语言：原生 HTML5 + CSS3 + JavaScript (ES Modules)
- 数据：`src/data/*.json`（构建时打包，静态部署可用）

## 快速开始

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # 产物在 dist/
npm run preview
```

## 页面结构

| 页面 | 文件 | 内容 |
|------|------|------|
| 首页 | `index.html` | 舞台光幕英雄区、演出信息、剧目简介、引言、探索导航 |
| 影像 | `videos.html` | 特辑大画幅 + 视频网格（`src/data/videos.json`） |
| 角色 | `characters.html` | 角色档案卡 + 详情模态框（`src/data/characters.json`） |
| 幕后 | `behind.html` | 照片墙 + 灯箱 + 幕后故事（`src/data/behind.json`） |
| 关于 | `about.html` | 剧目简介、生平时间线、创作背景、制作团队 |

## 内容管理

- 视频：编辑 `src/data/videos.json`（字段：title / description / src / poster / duration / category）
- 角色：编辑 `src/data/characters.json`（字段：name / actor / image / brief / history / quote）
- 幕后：编辑 `src/data/behind.json`（photos + stories）
- 演出日期：编辑 `src/scripts/home.js` 顶部 `shows` 数组；全部过期后首页自动显示"已落幕"

### 素材放置

- 角色照片：`public/images/characters/`（建议 800x1000 竖版）
- 幕后照片：`public/images/behind/`（建议 1200x800 横版）
- 海报：`public/images/posters/`（main-poster.jpg / promo-poster.jpg）
- 视频：`public/videos/`（promo.mp4 等）

素材缺失时页面自动显示排版占位，不会破损。

## 部署

`npm run build` 后将 `dist/` 部署到任意静态托管（Vercel / 阿里云 OSS / 腾讯云 COS 等）。

## 浏览器支持

Chrome 90+ · Firefox 88+ · Safari 14+ · Edge 90+

---

© 2026 四川大学吴玉章学院
