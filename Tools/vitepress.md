# vitepress

## 1、简介
官网：https://vitejs.cn/vitepress/

VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。

## 2、成功的案例
正在阅读的这个页面以及 Vite、Rollup、Pinia、VueUse、Vitest、D3、UnoCSS、Iconify 等文档都是基于这个主题的。
Vue.js 官方文档也是基于 VitePress 的。
Vue.js 官方博客是一个简单的博客页面，它根据本地内容生成其索引页面。

## 3、在线尝试
可以直接在 [StackBlitz](https://stackblitz.com/edit/vite-prpglub3?file=docs%2Findex.md) 上进行在线尝试。

## 4、对比
GitBook 不推荐新项目使用；VitePress 是当下个人 / 开源项目 GitHub Pages 首选之一。
Just the Docs ≠ 独立 SSG，它是【Jekyll 专用文档主题】，主打 GitHub Pages 原生支持；适合极简文档。（默认搜索 **原生不支持中文分词**和侧边栏**不能自动扫描目录生成**）


框架|技术栈|最大亮点|短板|适合人群
：---|：---|：---|：---|：---
**VitePress**|Vue3 + Vite|开发速度快、默认文档主题精致、内置本地搜索|无内置版本文档|个人开源项目、技术手册、Linux/Android 驱动文档（你当前场景首选）
**Docusaurus**|React|内置**文档版本管理、博客、i18n**，生态最强|构建速度一般，React 栈|大型开源项目、需要维护多版本文档、团队项目
**MkDocs + Material**|Python|**上手最简单**，配置极简，不需要前端知识|无法嵌入交互式组件|后端、嵌入式、不想折腾 JS 的工程师
**Docsify**|Vue|**不用预构建！** 直接托管 md 文件，开箱即用|纯前端渲染，SEO 差，无静态 HTML|内部临时文档、本地 wiki，不适合公开项目
**Starlight（Astro）**|Astro|极致性能、干净现代 UI、PageFind 本地搜索|较新，社区体量中等|追求极简高性能文档站

方案	底层	侧边栏自动生成	中文搜索	本地预览	上手难度	推荐指数
VitePress	Vite+Vue	✅ 支持	✅ 原生支持	极速热更	中	⭐⭐⭐⭐⭐（首选）
MkDocs Material	Python	✅ 支持	✅ 原生支持	流畅	极低	⭐⭐⭐⭐（零前端首选）
Just the Docs	Jekyll(Ruby)	❌ 必须手动排序	❌ 需要改造	一般	低，但环境坑多	⭐⭐⭐（小型极简英文文档）
Docusaurus	React	❌	✅	较慢	偏高	⭐⭐⭐⭐（需要多版本文档）
GitBook (旧 CLI)	废弃	❌	一般	经常构建失败	不推荐	❌

## 5、安装nodejs
nodejs官网：https://nodejs.org/en/download

Windows 7 官方正式支持的 Node.js 最高版本是 ‌v13.14.0‌。从 v14.0.0 开始，Node.js 官方不再保证对 Win7 的兼容性，安装包会提示最低要求 Win8.1。‌‌‌

但是vitepress需要 Node.js 18 及以上版本。

解决方案：https://blog.csdn.net/hjs_xxq/article/details/145590883

### 下载13.14版本
node-v13.14.0-x64.msi：https://nodejs.org/download/release/v13.14.0/

### 安装node-v13.14.0-x64.msi
不用做其它配置，默认安装成功就可以，默认路径在C:\Program Files\nodejs。
```
C:\Users\HanKin>npm --version
6.14.4

C:\Users\HanKin>node --version
v13.14.0
```

### 下载node-v18.20.8-win-x64.zip
解压后直接覆盖文件夹C:\Program Files\nodejs，然后报错：
```
C:\Users\HanKin>node --version
Node.js is only supported on Windows 8.1, Windows Server 2012 R2, or higher.
Setting the NODE_SKIP_PLATFORM_CHECK environment variable to 1 skips this
check, but Node.js might not execute correctly. Any issues encountered on
unsupported platforms will not be fixed.
```

新增系统变量NODE_SKIP_PLATFORM_CHECK 值为 1：
```
C:\Users\HanKin>node --version
v18.20.8

C:\Users\HanKin>npm --version
C:\Program Files\nodejs\node_modules\npm\lib\cli\validate-engines.js:31
    throw err
    ^

TypeError: Class extends value undefined is not a constructor or null
    at Object.<anonymous> (C:\Program Files\nodejs\node_modules\npm\node_modules
\fs-minipass\lib\index.js:136:4)
    at Module._compile (node:internal/modules/cjs/loader:1364:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)
    at Module.load (node:internal/modules/cjs/loader:1203:32)
    at Module._load (node:internal/modules/cjs/loader:1019:12)
    at Module.require (node:internal/modules/cjs/loader:1231:19)
    at require (node:internal/modules/helpers:177:18)
    at Object.<anonymous> (C:\Program Files\nodejs\node_modules\npm\lib\utils\lo
g-file.js:3:20)
    at Module._compile (node:internal/modules/cjs/loader:1364:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1422:10)

Node.js v18.20.8
```

## 6、本地调试

