# wmi库

## 1、PPI 和 DPI
PPI (Pixels Per Inch) : 即每一英寸长度上有多少个像素点；
DPI (Dots Per Inch): 即每一英寸上有多少个点；

这里一个是像素点（Pixel），一个是点（Dot），区别就在这里。像素点（Pixel）是一个最小的基本单位，是固定不变的。而点(Dot) 则不同，它可以根据输出或者显示需要来改变的，可以是 1Dot = 1Pixel，也可以是 1Dot = N Pixel。

在电脑里，分辩率是可以调节的，这里用的就是Dot ，密度用DPI描述；只有当使用屏幕最大分辩率的时候（即 1Dot = 1Pixel），这个时候 DPI = PPI。

## 2、安装必须库
1、安装wmi模块: pip install wmi
2、wmi依赖win32com模块: pip install pywin32

## 3、wmi库
具体请看微软官网对[WMI的介绍](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/wmi-start-page?redirectedfrom=MSDN)。这里简单说明下，WMI的全称是Windows Management Instrumentation，即Windows管理规范。它是Windows操作系统上管理数据和操作的基础设施。我们可以使用WMI脚本或者应用自动化管理任务等。

很遗憾，WMI并不原生支持Python。不过没有关系，它支持VB，而Python中的两个第三方库wmi和win32com，均能以类似VB的用法来使用。

## 4、使用WMI
https://blog.csdn.net/AlanGuoo/article/details/87984540