import { defineConfig } from 'vitepress'
import { generateSidebar } from 'vitepress-sidebar'

const autoSidebar = generateSidebar({ documentRootPath:"/" })

// 在自动生成的侧边栏后面追加自定义外部链接分组
const sidebar = [
  autoSidebar,
  {
    text: "外部链接",
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'my blog', link: 'https://hankin2015.github.io' },
      { text: 'github', link: 'https://github.com/hankin2015' }
    ]
  }
]

export default defineConfig({
  lang: 'zh-CN',
  title: '学习笔记wiki',
  description: '个人技术学习笔记Wiki，RK芯片、Android、协程等技术文档',

  // 【关键】GitHub Pages必须配置！
  // 仓库名：https://github.com/你的用户名/rk-docs
  // base = '/仓库名/'，末尾斜杠不能丢
  base: '/Gitbook/',

  lastUpdated: !!process.env.CI,
  ignoreDeadLinks: false,

  outDir: "public", // 如无特殊需求注释掉，使用默认输出目录，当前在static.yml写public

  // 暗黑模式自动切换
  appearance: true,

  markdown: {
    lineNumbers: true, // 代码块显示行号（写驱动日志必备）
  },

  head: [],

  themeConfig: {
    // 右上角导航栏
    nav: nav(),

    // 自动侧边栏
    sidebar: sidebar,

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

    // 内置本地全文搜索（中文开箱即用，不需要Algolia）
    search: {
      provider: 'local'
    },

    // 右上角github跳转链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hankin2015/Gitbook' }
    ],

    footer: {
      message: 'This website is released under the MIT License.',
      copyright: 'Copyright © 2026 hankin2015 contributors'
    },

    editLink: {
      pattern: 'https://github.com/hankin2015/Gitbook/edit/main/:path'
    }
  }
})

function nav() {
  return [
    { text: '首页', link: '/', activeMatch: '^/$|^/' },
    { text: '个人简介', link: '/README' },
    { text: '关于', link: '/Linux/cut' },
    { text: '梦想', link: '/ML/ML' },
    {
      text: 'Github Issues',
      link: 'https://github.com/hankin2015/Gitbook/issues'
    }
  ]
}
