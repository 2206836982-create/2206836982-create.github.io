# 个人简历网站

纯静态的个人主页：**双击即可打开**，也能**一键部署到 GitHub Pages**。
不依赖任何框架、构建工具或外部 CDN，**完全离线可用**。

## 目录结构

```
personal-website/
├── index.html               # 主页（单页滚动：关于/教育/科研/技能/荣誉/笔记/联系）
├── resume.html              # 打印版简历（浏览器"打印 → 存为 PDF"）
├── blog/
│   └── template.html        # 新文章模板（复制它来写新笔记）
├── assets/
│   ├── css/style.css        # 全部样式（含主题色变量）
│   ├── js/main.js           # 交互脚本
│   └── img/avatar.jpg       # 头像照片
├── 如何修改.md              # 自己改内容的操作说明
├── .nojekyll                # GitHub Pages 用，别删
└── README.md
```

## 怎么改成你自己的

最常改的内容都在 `index.html` 和 `resume.html` 里，用编辑器打开、`Ctrl+F` 搜对应文字即可。

1. **姓名 / 定位 / 一句话介绍**：`index.html` 的 Hero 区（`id="top"`）。
2. **联系方式**：`index.html` 底部「联系我」区（邮箱、GitHub）。
3. **教育 / 科研 / 项目 / 技能 / 荣誉**：`index.html` 对应的各 section。
4. **打印版简历**：`resume.html`。
5. **头像**：把你的照片命名为 `avatar.png` 放进 `assets/img/`，然后把 `index.html` 里
   `<img src="assets/img/avatar.svg" ...>` 改成 `assets/img/avatar.png`。
6. **主题色**：改 `assets/css/style.css` 最上面的 `--accent-1`（青色）和 `--accent-2`（紫色）。
   例如换成蓝色系：`--accent-1:#38bdf8; --accent-2:#6366f1;`

## 怎么发一篇学习笔记

1. 复制 `blog/template.html`，改名为英文短名（如 `resnet-notes.html`）。
2. 改里面的 `<title>`、标题、日期、标签，写正文。
3. 打开 `index.html`，在「学习笔记」区复制一张卡片，把链接指向你的新文章。

## 本地预览

直接双击 `index.html` 即可（`file://` 方式也正常）。

## 最快的上线方式（约 3 分钟，无需会代码）

**方式 A：Netlify Drop（最快，拖一下就出网址）**
1. 打开 https://app.netlify.com/drop
2. 把整个 `personal-website` 文件夹**拖进网页**
3. 等十几秒，页面顶部会出现一个形如 `https://xxxx.netlify.app` 的网址
4. 这个网址**任何人都能打开**了（不需要你一直开机）

> 想长期保留、以后好更新，注册一个免费账号再拖，就能得到固定的站点名。

**方式 B：GitHub Pages（推荐，长期、可绑定自己的仓库）**
见下方步骤。

---

## 部署到 GitHub Pages

**方式一：用户主页（推荐，网址最短）**
1. 新建仓库，仓库名必须是 `你的用户名.github.io`。
2. 把本目录里的**所有文件**推到该仓库的 `main` 分支（`index.html` 要在仓库根目录）。
3. 打开仓库 Settings → Pages，Source 选 `Deploy from a branch`，分支选 `main` / `root`，保存。
4. 稍等 1–2 分钟，访问 `https://你的用户名.github.io`。

**方式二：项目页**
1. 新建任意仓库，把本目录所有文件推到仓库根目录。
2. Settings → Pages → 分支 `main` / `root`。
3. 访问 `https://你的用户名.github.io/仓库名/`。

> 站点内部全部使用**相对路径**，所以上面两种方式都能正常显示。

## 兼容 Vercel

把仓库导入 Vercel，Framework 选 **Other**，Build Command 留空，Output Directory 填 `.`（或直接留默认），即可上线。

## 说明

- 无后端、无统计、无评论、无外部字体，纯静态、可离线运行。
- 主题默认深色，右上角可切换浅色，偏好会保存在浏览器本地。
