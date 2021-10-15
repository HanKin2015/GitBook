# wmi库

## 1、PPI 和 DPI
PPI (Pixels Per Inch) : 即每一英寸长度上有多少个像素点；
DPI (Dots Per Inch): 即每一英寸上有多少个点；

这里一个是像素点（Pixel），一个是点（Dot），区别就在这里。像素点（Pixel）是一个最小的基本单位，是固定不变的。而点(Dot) 则不同，它可以根据输出或者显示需要来改变的，可以是 1Dot = 1Pixel，也可以是 1Dot = N Pixel。

在电脑里，分辩率是可以调节的，这里用的就是Dot ，密度用DPI描述；只有当使用屏幕最大分辩率的时候（即 1Dot = 1Pixel），这个时候 DPI = PPI。

## 2、安装必须库
1、安装wmi模块: pip install wmi
2、wmi依赖win32com模块: pip install pywin32







