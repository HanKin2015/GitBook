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
环境要求：安装 **Node.js ≥18**（推荐 20LTS），包管理器 npm /pnpm 均可
最终效果：本地实时预览 Markdown，push 代码自动构建并发布到 GitHub Pages

## 一、初始化项目

### 1. 创建项目文件夹

```
mkdir rk-docs
cd rk-docs
```

### 2. 安装 VitePress

```
# npm
npm install -D vitepress
# pnpm（推荐更快）
pnpm add -D vitepress
```

### 3. 交互式初始化（最简单）

```
pnpm vitepress init
```

按下面配置填写：

```
Where should VitePress initialize the config?
> ./docs

Where should VitePress look for your markdown files?
> ./docs

Site title:
> RK Android 技术文档

Site description:
> 瑞芯微Android内核、驱动、系统调试文档

Theme:
> Default Theme

Use TypeScript? 【No】（直接用js，降低门槛）
Add VitePress npm scripts? Yes
```

执行完成后自动生成目录结构：

```
rk-docs/
├── docs/
│   ├── .vitepress/
│   │   └── config.js      # 核心配置文件
│   ├── index.md           # 网站首页
│   ├── android/           # 自己新建：Android文档目录
│   ├── rk/                # 自己新建：RK芯片文档
│   └── debug/             # 调试笔记
└── package.json
```

### 4. package.json 内置脚本（已经自动生成）

```
{
  "scripts": {
    "docs:dev": "vitepress dev docs",     # 本地开发预览
    "docs:build": "vitepress build docs", # 构建静态页面
    "docs:preview": "vitepress preview docs" # 本地预览打包结果
  }
}
```

## 二、本地启动开发

```
pnpm docs:dev
```

打开浏览器访问：`http://localhost:5173`
✅ 保存 md 文件**秒热更新**，写文档体验极佳。

## 三、核心配置 docs/.vitepress/config.js（直接复制使用）

> 
> 重点适配：中文文档、代码行号、暗黑模式、自动侧边栏、GitHub 部署

```
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 【关键】GitHub Pages必须配置！
  // 仓库名：https://github.com/你的用户名/rk-docs
  // base = '/仓库名/'，末尾斜杠不能丢！
  base: '/rk-docs/',

  lang: 'zh-CN',
  title: 'RK Android 技术文档',
  description: '瑞芯微Android、内核、驱动调试笔记',

  // 暗黑模式自动切换
  appearance: true,

  markdown: {
    lineNumbers: true, // 代码块显示行号（写驱动日志必备）
  },

  themeConfig: {
    // 右上角导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: 'Android', link: '/android/' },
      { text: 'RK芯片', link: '/rk/' },
      { text: '调试笔记', link: '/debug/' }
    ],

    // ✅ 自动侧边栏（无需手动维护！新版vitepress支持 sidebar: "auto"）
    sidebar: 'auto',

    // 右侧文章目录层级
    outline: {
      level: [2, 4],
      label: '目录'
    },

    // 上一页/下一页中文
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 右上角github跳转链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/你的用户名/rk-docs' }
    ],

    // 内置本地全文搜索（中文开箱即用，不需要Algolia）
    search: {
      provider: 'local'
    }
  }
})
```

> 
> ⚠️ 修改 `base`：仓库名称改成你自己的仓库名！
> 如果你仓库名称是 `hejian-rk-notes`，则 `base: '/hejian-rk-notes/'`

## 四、如何新建文档

举例子：

1. 在 `docs/android/` 新建 `readme.md`
内容第一行：

```
# Android Shell 调试笔记
```

访问地址：`/android/`

2. 新建 `docs/android/kernel-log.md`
访问地址：`/android/kernel-log`

> 
> 文件路径 = 访问路由，非常直观。

### Markdown 增强语法（写技术文档高频）

```
# 标题

## 代码块（支持shell、c、cpp、java）
```shell
dmesg | grep rga
cat /sys/fs/pstore/console-ramoops-0
```

```
int res_create_display_surface()
{
    return 0;
}
```

// 提示框
::: tip 小提示
RK 平台内核 panic 日志优先查看 /sys/fs/pstore
:::

::: warning 注意
正常关机不会保存 ramoops 日志，只有异常重启才有
:::

```

## 五、部署 GitHub Pages（自动CI，一次配置永久生效）
### 步骤1：创建github仓库
仓库名和 `base` 配置保持一致，示例：`rk-docs`
上传当前全部代码。

### 步骤2：新建CI工作流文件
路径：`.github/workflows/deploy.yml`（**完整复制下面内容**）
```yaml
name: Deploy VitePress Docs
on:
  push:
    branches: [main]  # 你的主分支，如果是master就改成master
  workflow_dispatch: # 允许手动触发构建

permissions:
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: 拉取代码
        uses: actions/checkout@v4

      - name: 配置Node环境
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: 安装pnpm
        uses: pnpm/action-setup@v4

      - name: 安装依赖
        run: pnpm install

      - name: 构建文档
        run: pnpm docs:build

      - name: 上传构建产物
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: 部署到Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 步骤 3：仓库后台设置（关键，否则部署失败）

1. 打开仓库 → Settings → Pages
2. Build and deployment → Source 选择 **GitHub Actions**
3. Settings → Actions → General → Workflow permissions
勾选：**Read and write permissions**

### 步骤 4：推送代码触发自动部署

```
git add .
git commit -m "init vitepress文档"
git push origin main
```

推送完成后，进入仓库 Actions 页面，等待执行完成。
访问地址格式：
`https://用户名.github.io/仓库名/`

## 六、常见踩坑清单（重点！）

1. **网页打开空白、样式丢失**
✅ 原因：`base` 配置错误，必须 `/仓库名/`，前后斜杠不能少。
2. **侧边栏不自动生成**
✅ VitePress 1.0+ 才支持 `sidebar:"auto"`；不要使用老旧版本。
3. **搜索无法检索中文**
✅ 配置 `search.provider:"local"`，不要用旧版第三方搜索。
4. **CI 构建失败**
✅ Node 版本 ≥18；优先使用 pnpm 缓存，避免依赖超时。
5. `.gitignore` 推荐添加

```
node_modules
docs/.vitepress/cache
docs/.vitepress/dist
*.log
```

## 七、可选进阶需求（你后续大概率用到）

1. **自定义域名**：在 `docs/public/CNAME` 写入域名
2. **代码块一键复制**：默认自带开启
3. **嵌入 Vue 组件**：适合放工具、交互脚本
4. **多版本文档切换**（Android12/14 文档并存）：需要插件实现

项目	config.ts	config.js
语言	TypeScript	JavaScript
类型提示	完整类型校验、IDE 自动补全	没有类型校验
defineConfig	强烈建议导入使用	也可以导入，只是做 IDE 提示
运行行为	完全一模一样	完全一模一样