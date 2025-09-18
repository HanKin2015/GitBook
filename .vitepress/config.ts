export default {
  lang: 'zh-CN',
  title: '学习笔记wiki',
  description: 'Simple, light-weight and easy-to-use components',
  base: '/Gitbook/',
  lastUpdated: true,
  ignoreDeadLinks: false,
  outDir: "public",
  locales: {
    "/": {
      lang: 'zh-CN',
      title: '学习笔记wiki',
      description: 'Simple, light-weight and easy-to-use components',
    },
  },
  head: [],

  themeConfig: {
    nav: nav(),

    sidebar: {
      "/": sidebarGuide(),
    },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/hankin2015/Gitbook'}
    ],

    footer: {
      message: 'This website is released under the MIT License.',
      copyright: 'Copyright © 2025 hankin2015 contributors'
    },

    editLink: {
      pattern: 'https://github.com/hankin2015/Gitbook/edit/main/:path'
    }
  }
}

function nav() {
  return [
    {text: 'Guide', link: '/', activeMatch: '/guide/'},
    {
      text: "Language",
      items: [
        {
          text: "English", link: "/"
        },
        {
          text: "简体中文", link: '/'
        }
      ]
    },
    {
      text: 'Github Issues',
      link: 'https://github.com/hankin2015/Gitbook/issues'
    }
  ]
}

function sidebarGuide() {
  return [ {
      text: '学习笔记',
      collapsible: true,    // 启用折叠
      collapsed: true,      // 默认折叠
      items: [
        {
          text: 'Quick Start',
          collapsible: true,
          collapsed: true,
          items: [
            {text: 'Get Started', link: '/GetStarted'},
            {text: 'Stackless Coroutine', link: '/StacklessCoroutine'},
            {text: 'Lazy', link: '/Lazy'},
            {text: 'Debugging Lazy', link: '/DebuggingLazy'},
            {text: 'Stackless Coroutine and Future', link: '/StacklessCoroutineAndFuture'},
            {text: 'Try', link: '/Try'},
            {text: 'Executor', link: '/Executor'},
            {text: 'Signal And Cancellation', link: '/SignalAndCancellation'},
            {text: 'Uthread', link: '/Uthread'},
            {text: 'Interacting with Stackless Coroutine', link: '/InteractingWithStacklessCoroutine'},
            {text: 'HybridCoro', link: '/HybridCoro'},
            {text: 'Improve NetLib', link: '/ImproveNetLibWithAsyncSimple'},
          ]
        },
        {
          text: 'Utils',
          collapsible: true,
          collapsed: true,
          items: [
            {text: 'Future', link: '/Future'},
            {text: 'Lock', link: '/Lock'},
            {text: 'Latch', link: '/Latch'},
            {text: 'ConditionVariable', link: '/ConditionVariable'},
            {text: 'Semaphore', link: '/Semaphore'},
          ]
        },
        {
          text: 'Performance',
          collapsible: true,
          collapsed: true,
          items: [
            {text: 'Performance', link: '/Performance'},
            {text: 'Quantitative Analysis of Performance', link: '/QuantitativeAnalysisReportOfCoroutinePerformance'},
          ]
        },
      ]
    },
    {
      text: 'my blog',
      link: 'https://hankin2015.github.io'
    },
    {
      text: 'github',
      link: 'https://github.com/HanKin2015'
    },
    {
      text: '知乎',
      link: 'https://github.com/HanKin2015'
    }
  ]
}