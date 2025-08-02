# spice
官方仓库：https://gitlab.freedesktop.org/spice/spice
光标通道协议：
https://blog.csdn.net/sjin_1314/article/details/42029607

[国内VDI市场之乱象分析，第一篇：市场分析篇](https://blog.csdn.net/weixin_33982670/article/details/92509613?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.channel_param)

## 1、自定义多功能键盘缺失按键
spice-0.12.6已经不存在red_key.h文件，并且也没有看见client代码了。

https://tool.ip138.com/
https://www.usb.org/document-library/hid-usage-tables-15  这篇文章里面只有键盘的keycode
鼠标和键盘的输入处理方式有所不同，因此鼠标通常没有像键盘那样的keycode。鼠标的输入事件主要包括移动、点击和滚轮滚动等，这些事件通过不同的方式传递给操作系统和应用程序。

