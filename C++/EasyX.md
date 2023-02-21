# EasyX

## 1、EasyX是什么
官网：https://easyx.cn/

EasyX Graphics Library 是针对 Visual C++ 的免费绘图库，支持 VC6.0 ~ VC2022，简单易用，学习成本极低，应用领域广泛。目前已有许多大学将 EasyX 应用在教学当中。
EasyX 是针对 C/C++ 的图形库，可以帮助使用C/C++语言的程序员快速上手图形和游戏编程。
比如，可以用 VC + EasyX 很快的用几何图形画一个房子，或者一辆移动的小车，可以编写俄罗斯方块、贪吃蛇、黑白棋等小游戏，可以练习图形学的各种算法，等等。

## 2、安装
官方下载最新版355KB左右，双击安装没有检测本机的Microsoft Visual Studio Community 2019 (2)，版本 16.10.2。
另外一个环境可以，EasyX 安装程序会检测到当前操作系统中安装的 Visual Studio 版本。在对应的 VS 版本右侧点击“安装”即可。

安装程序为 7z 自解压缩包，不会在系统注册表中留下任何信息，请放心使用。
卸载时，同样需要执行安装程序，并点击对应的 VS 版本右侧的“卸载”即可。

### 2-1、VS和VC的区别
VS是Visual Studio，它是微软提供的一个工具集，由各种各样的工具组成。VS可以支持C/C++、VB、JAVA、C#编程。然了一次只能支持一种编程方式。在VS安装完成，第一次运行的时候会让你选择常用语言，如果你选择C/C++，那么他就成了能够进行C/C++编程的平台也许就是你所说的VC了。如果不想用C/C++的话，只需要修改一下他的初始化设置，选择别的编程语言，就成为了另一种的语言的编程环境了。

VC是Visual C++，是一个独立的C/C++的开发工具，比较著名的是VC6.0，现在的VC2010其实就是VC10.0。

再通俗一点，以VS2010和VC2010为例，VS2010相当与Office2010，包括了World2010、Excel2010等，而VC2010就相当于是World2010.

### 2-2、测试其他环境能正常检测到VC2010/2012/2013/2015

### 2-3、打开VS2019运行HelloWorld报错
丢失MSVCP140D.dll
可以使用修复工具，以及下载vc++库进行修复，win10自带修复工具dxdiag命令，但是DirectX修复工具太大了不划算。

不能直接拷贝C:\Windows\System32到C:\Windows\SysWOW64目录下，解决不了问题。

最终发现是C:\Windows\SysWOW64目录下丢失文件，在另外一个系统拷贝后解决。

丢失VCRUNTIME140D.dll
拷贝完后丢失ucrtbase.dll文件，结果两个目录都有这个文件，莫非是文件不兼容导致。

### 2-4、使用修复工具
http://www.dllzj.com/            居然搜索不到我要的dll文件。

安装DLL Suite软件提示电脑没有内存，发现D:\Users\Administrator\My Document\WeChat Files\wxid_2gh9d5knc6th21\FileStorage\Video这个目录居然有65G，删删删！
不靠谱，还下载了注册机，说好的免费呢。。。

最终发现还是DirectXRepair.exe程序爽，免费好用，能修复运行库（管理员运行），但是由于占用可能需要重启电脑修复。

按Win+R打开运行，输入regsvr32 msvcp140d.dll，点击回车，注册dll。没什么用。

等下次重启电脑的时候再看，可以先用另外一个环境进行下一步。https://qa.codebus.cn/question/155

## 3、测试
正常执行控制台程序即可。
```
// HelloControlApplication.cpp : 定义控制台应用程序的入口点。
//

#include "stdafx.h"
#include <graphics.h>		// 引用 EasyX 绘图库头文件
#include <conio.h>

int _tmain(int argc, _TCHAR* argv[])
{
	initgraph(640, 480);	// 创建绘图窗口，分辨率 640x480
	circle(320, 240, 100);	// 画圆，圆心 (320, 240)，半径 100
	_getch();				// 按任意键继续
	closegraph();			// 关闭图形界面
	return 0;
}
```
EasyX 含有一些简单的函数集合，几乎不用学习，直接翻看参考手册就可以直接使用。在线参考手册地址 https://docs.easyx.cn








