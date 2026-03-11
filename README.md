# 门店私域实战系统

一个纯静态的互动培训网页，用来把《门店私域-实战培训手册》的章节、SOP、工具表和案例整理成一个可筛选、可复制、可下载的知识库。

## 本地使用

直接双击 [index.html](C:/CodexData/store-growth-content-factory/store-private-domain-training-kb/index.html) 即可打开。

如果你要用本地服务预览，也可以在当前目录启动一个静态服务器。

## 目录结构

```text
store-private-domain-training-kb/
├─ index.html
├─ styles.css
├─ content.js
├─ app.js
├─ vercel.json
└─ assets/
   ├─ all-raw-tables.zip
   ├─ previews/
   └─ tables/
```

## 内容来源

- 老板培训版 `.docx` 手册
- 门店私域培训资料语料库
- 门店私域案例与打法素材池

## 部署

这是一个不依赖构建链的静态站点，适合直接部署到 Vercel、Netlify 或 GitHub Pages。

仓库内已经包含 GitHub Pages 工作流：

```text
.github/workflows/pages.yml
```

推送到 `main` 分支后，GitHub Actions 会自动发布静态内容。
