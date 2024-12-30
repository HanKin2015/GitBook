# USB驱动学习
(Linux-USB驱动框架 | usb核心)[https://mp.weixin.qq.com/s/tvgiegCxCY8T-1JHzNyFmg]

## 1、zadig
官网：https://zadig.akeo.ie/
介绍：Zadig is a Windows application that installs generic USB drivers, such as WinUSB, libusb-win32/libusb0.sys or libusbK, to help you access USB devices.

Zadig 是一个用于 Windows 的开源工具，主要用于安装和管理 USB 驱动程序。它特别适用于那些需要使用 USB 设备（如开发板、调试器、摄像头等）而不想使用 Windows 默认驱动程序的用户。

## 2、libusb-1.0.dll
这个文件版本一般只改变最后一位，其代表的数字无规律，注意版本一致即可。
https://cdn.gowinsemi.com.cn/UG1008-1.0_GWU2X_Cable%E9%A9%B1%E5%8A%A8%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97.pdf

## 3、导出操作系统上的驱动
- 360驱动大师，然后不怎么行，只能导出识别的极少驱动
- https://zhuanlan.zhihu.com/p/667295598

先手动创建driverbak文件夹，然后CMD管理员权限运行：
```
dism /online /export-driver /destination:"D:\driverbak"
```
最后使用everythin软件搜索需要的驱动找到对应的文件夹。

发现usbhub3.sys驱动没法进行备份，我直接找到一些临时文件夹进行安装也不行，要么直接替换文件，要么重装系统呗。

## 4、Windows开发
usb返回码：https://learn.microsoft.com/en-us/previous-versions/windows/hardware/usb/ff539136(v=vs.85)

