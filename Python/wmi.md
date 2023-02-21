# wmi库

## 1、PPI和DPI
PPI (Pixels Per Inch) : 即每一英寸长度上有多少个像素点；
DPI (Dots Per Inch): 即每一英寸上有多少个点；

这里一个是像素点（Pixel），一个是点（Dot），区别就在这里。像素点（Pixel）是一个最小的基本单位，是固定不变的。而点(Dot) 则不同，它可以根据输出或者显示需要来改变的，可以是 1Dot = 1Pixel，也可以是 1Dot = N Pixel。

在电脑里，分辩率是可以调节的，这里用的就是Dot ，密度用DPI描述；只有当使用屏幕最大分辩率的时候（即 1Dot = 1Pixel），这个时候 DPI = PPI。

## 2、wmi库
具体请看微软官网对[WMI的介绍](https://docs.microsoft.com/zh-cn/windows/win32/wmisdk/wmi-start-page?redirectedfrom=MSDN)。这里简单说明下，WMI的全称是Windows Management Instrumentation，即Windows管理规范。它是Windows操作系统上管理数据和操作的基础设施。我们可以使用WMI脚本或者应用自动化管理任务等。

很遗憾，WMI并不原生支持Python。不过没有关系，它支持VB，而Python中的两个第三方库wmi和win32com，均能以类似VB的用法来使用。

## 3、使用WMI
https://blog.csdn.net/AlanGuoo/article/details/87984540

## 3-1、安装必须库
1、安装wmi模块: pip install wmi
2、wmi依赖win32com模块: pip install pywin32

### 3-2、使用wmi库操作WMI
详情见：D:\Github\Storage\python\wmi\wmi_example.py

### 3-3、使用win32com库操作WMI

## 4、WMI的名称空间
通用的名称空间的简单介绍：

root 是名称空间层次结构的最高级。
CIMV2 名称空间存放着和系统管理域相关（比如计算机以及它们的操作系统）的对象。
DEFAULT 名称空间存放着默认被创建而不指定名称空间的类。
directory 目录服务的通用名称空间，WMI 创建了名为LDAP的子名称空间。
SECURITY 用来支持Windows 9x计算机上的WMI的名称空间。

WMI 使用Windows Driver Model providers的类所在的名称空间。这是为了避免和CIMV2名称空间中类名冲突。

其中，root/CIMV2可以说是最为基本和常用的名称空间了。它的作用主要是提供关于计算机、磁盘、外围设备、文件、文件夹、文件系统、网络组件、操作系统、打印机、进程、安全性、服务、共享、SAM 用户及组，以及更多资源的信息；管理 Windows 事件日志，如读取、备份、清除、复制、删除、监视、重命名、压缩、解压缩和更改事件日志设置。

## 5、类/实例和属性/值
Windows提供了一个WMI测试器，使得查询这些内容变得尤为方便。按下”win+R”，输入wbemtest，从而打开WMI测试器。

## 6、实战，以IIS为例
了解了这么多内容，咱们就拿个对象练练手。现在有这么个需求，我们想要获取IIS的版本号以及它所有的站点名称，怎么办？

在微软官网上比较容易的找到IIS WMI的说明，根据直觉，我们要查询的信息可能会是在类名中包含setting的类中，那么看起来比较有可能的有IIsSetting (WMI), IIsWebServerSetting (WMI), IIsWebInfoSetting (WMI)。
代码见：D:\Github\Storage\python\wmi\wmi_example.py

## 7、利用wmi可以进行usb设备检测
需求设计检测当前电脑系统的所有usb设备信息。
代码见：D:\Github\Storage\python\wmi\udev_detect\udev_detect.py

https://blog.csdn.net/13011803189/article/details/122698978



