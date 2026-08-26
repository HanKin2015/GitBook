# AI工具

## 1、知识问答
豆包：https://www.doubao.com/chat/
kimi：https://www.kimi.com/
文心一言：https://wenxin.baidu.com/
deepseek：https://chat.deepseek.com/
秘塔AI搜索:https://metaso.cn/
即梦：https://jimeng.jianying.com/ai-tool/
通义千问：https://www.qianwen.com
可灵：https://klingai.com/app
通义听悟：https://tingwu.aliyun.com/home
gamma：https://tgamma.zpp
cursor：
trae：

## 2、对比
我在开发安卓14的充电动画UI的时候，会用到一个叫做res_create_display_surface函数，分别在多个AI工具上问询，发现文心一言和kimi回答的挺好的。

**Android 图形栈 / SurfaceFlinger / RenderEngine（RE）相关函数**
归属：`renderengine`（硬件渲染引擎，SurfaceFlinger 内部渲染模块）
头文件路径一般：
`frameworks/native/services/surfaceflinger/renderengine/`

> 配套上下文：RenderEngine 负责合成图层、输出到显示设备；`res_create_display_surface` 用于**创建面向显示输出的渲染 Surface**。

### vitepress侧栏目录
豆包一直告诉我说`sidebar: "auto"` **不是版本低的问题**，VitePress `1.x` 就已经支持这个语法。，然后询问kimi直接给出答案。
豆包说澄清：VitePress **1.x 确实支持 `sidebar: "auto"`**，但是它有严格的官方定义行为
关键纠正：Kimi 说的是对的
**VitePress 官方原生，没有 `sidebar: "auto"` 这个字符串语法！！！**VitePress
`sidebar: 'auto'` 是 **VuePress2 的原生语法**，VitePress 完全不兼容这个写法

kimi说：
```
VitePress 官方 sidebar 的类型定义是：
export type Sidebar = SidebarItem[] | SidebarMulti

export interface SidebarMulti {
  [path: string]: SidebarItem[] | { items: SidebarItem[]; base: string }
}

也就是说，sidebar 的值只能是：
数组：SidebarItem[]（单侧边栏）
对象：{ [path: string]: SidebarItem[] | { items, base } }（多侧边栏，按路径匹配）
不支持 'auto' 字符串。'auto' 是 VuePress 的语法，VitePress 原生不兼容。

VitePress 官方没有内置自动生成侧边栏的功能，需要借助社区插件。
```