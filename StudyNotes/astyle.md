# 使用Astyle 帮助整理代码

Astyle 的全称是Artistic Style，某种程度是目前最好用的代码整理工具，很多所谓的代码整理工具其实都是拿这个东东改进，开发的。其网址在，http://astyle.sourceforge.net/，最新版本是2.02，基本已经稳定，最近升级很少了。

Astyle好在那儿呢，一方面他支持大部分代码格式，一方面他支持C, C++, C#, and Java等语言，一方面他可以编译成LINUX版本，直接用命令行方式，一方面也可以和大部分IDE环境集成。所以其是编写代码处理的利器。

另外，虽然很多IDE环境有自己的一些代码格式化方法，比如visual studio下选择代码，快捷键Ctrl +KF（或者Alt +F8，Ctrl+E,F，Ctrl+E,D之类），就可以格式化整理代码。但是还是术有专攻，visual studio的代码格式化不会自动帮我将代码中间的旧有tab 替换成空格，在分析某些稍微复杂的语法（特别是模版）时，经常会出现换行对齐错误的问题，而且visual studio不同版本下，自己默认的某些对齐方式也有所不同。

所以我个人还是推荐定期用Astyle整理一下自己的代码，可以让自己的代码更加养眼。从网站下载回来的Astyle有Windows编译版本，也有源代码。在Linux下你可以自己编译。整日骇客帝国的兄弟也可以使用。

我们先介绍一下Astyle如何集成到IDE开放工具中，

如果单独是命令行，Astyle的使用比较简单，我一般都将选项放入到配置文件里面。当然如果你记忆力超凡，可以直接输入参数另说。

astyle --options=astyle.conf  文件名称   [生成文件名称]


http://astyle.sourceforge.net/astyle.html

这里的源代码本来是一片,后来变成了一大片,经过几代人的手之后,成了原始森林,各种风格,各种旁逸斜出.不敢直视.一个switch语句几千万行,一眼望不到边.今天突然有种冲动,想整一下.然后就找到了Astyle(Artistic Style) 
查看了官方文档  http://astyle.sourceforge.net/astyle.html









