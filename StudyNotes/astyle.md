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

## 1、AStyle简介
AStyle，即Artistic Style，是一个可用于C, C++, C++/CLI, Objective‑C, C# 和Java编程语言格式化和美化的工具。我们在使用编辑器的缩进（TAB）功能时，由于不同编辑器的差别，有的插入的是制表符，有的是2个空格，有的是4个空格。这样如果别人用另一个编辑器来阅读程序时，可能会由于缩进的不同，导致阅读效果一团糟。为了解决这个问题，使用C++开发了一个插件，它可以自动重新缩进，并手动指定空格的数量，自动格式化源文件。它是可以通过命令行使用，也可以作为插件，在其他IDE中使用。

## 2、基本使用
下载完成后，解压，然后在环境变量PATH，添加AStyle.exe的路径。

基本命令行格式：

astyle [参数] [文件路径]
如在我的电脑E盘下有一个文件main.c，现在是这样的，可以看出很不规范，多个语句写在同一行，没有合理缩进，运算符两边没有空格等等。
```
#include "sys.h"
#include "delay.h"
#include "usart.h"
#include "led.h"

int main(void)
{
	delay_init();       //延时函数初始化
	LED_Init();         //初始化与LED连接的硬件接口
	while(1)
	{
		LED0=0;LED1=1;
		delay_ms(300);  //延时300ms
		LED0= 1;LED1 =0;
		delay_ms(300);  //延时300ms
	}
}
```

打开CMD命令窗口，输入以下命令：

AStyle --style=ansi E:\main.c

## 3、BAT命令格式化目录下的源文件
下面这个bat命令可以格式化当前目录及子目录下的所有源文件。

新建bat文件，以记事本打开，输入以下命令：

for /R %%f in (*.c;*.h) do AStyle.exe --style=allman --indent=spaces=4 --pad-oper --pad-header --unpad-paren --suffix=none --align-pointer=name --lineend=windows --convert-tabs --verbose %%f
pause

## 4、字体
作为一枚不成熟的前端开发，深知我敲的每一行不是代码，是Bug！呸，是艺术和禅学！

连字为什么好？这里引用Jetbrains Mono页面上的一段话：
连字是由两个或多个连接符号组成的字符。传统上，它是作为节省空间的技术引入印刷文本中的。在代码中，此技术用于显示运算符，主要用于两个目的：
1. 通过合并符号和删除细节来减少噪声，从而减少了眼睛的劳损。
2. 在某些情况下，通过移动字形可以更有效地平衡空白。

选择文件夹中的所有字体文件，右键单击其中任何一个，然后从菜单中选择 “Install”。







