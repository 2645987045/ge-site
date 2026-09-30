# 项目启动指南

## 第一步：安装依赖

打开命令行，进入项目目录：

```bash
cd D:\community\wuyzhang-gaoshi-website
```

安装依赖（使用国内镜像源加速）：

```bash
npm install --registry=https://registry.npmmirror.com
```

## 第二步：启动开发服务器

```bash
npm run dev
```

浏览器会自动打开 `http://localhost:3000`，你就能看到网站了！

## 第三步：准备素材

### 必须准备的图片

1. **主海报**：`public/images/posters/main-poster.jpg`
   - 尺寸：1200x1600px
   - 用于首页 Banner 背景

2. **角色照片**：`public/images/characters/` 目录
   - 每个角色一张，800x1000px
   - 命名与 `characters.json` 中的 `image` 字段对应

3. **幕后照片**：`public/images/behind/` 目录
   - 排练照片、幕后故事配图
   - 1200x800px

### 必须准备的视频

1. **宣传片**：`public/videos/promo.mp4`
   - 建议 H.264 编码
   - 分辨率：1920x1080
   - 大小：建议 < 100MB

## 第四步：修改内容

### 修改演出日期

编辑 `src/scripts/home.js`，找到这一行：

```javascript
const showDate = new Date('2026-05-16T19:00:00').getTime();
```

改为实际的演出日期。

### 添加角色

编辑 `src/data/characters.json`，按照现有格式添加新角色。

### 添加视频

编辑 `src/data/videos.json`，按照现有格式添加新视频。

## 第五步：构建生产版本

```bash
npm run build
```

构建后的文件在 `dist/` 目录，可以上传到服务器部署。

## 常见问题

### Q: npm install 很慢怎么办？

使用国内镜像源：

```bash
npm install --registry=https://registry.npmmirror.com
```

### Q: 图片不显示怎么办？

1. 检查图片路径是否正确
2. 检查图片文件是否存在
3. 检查浏览器控制台是否有错误

### Q: 视频无法播放怎么办？

1. 检查视频格式是否为 MP4（H.264 编码）
2. 检查视频文件路径是否正确
3. 尝试用其他浏览器打开

### Q: 如何部署到服务器？

1. 运行 `npm run build` 构建
2. 将 `dist/` 目录上传到服务器
3. 配置服务器指向 `dist/` 目录

## 下一步

- 准备所有图片素材
- 准备视频文件
- 填充角色数据
- 修改演出信息
- 测试所有功能
- 部署上线

---

祝你使用顺利！如有问题，随时联系。
