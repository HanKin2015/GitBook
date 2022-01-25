# 蓝屏调试

以自身写的Windows驱动蓝屏为例，发现写Windows驱动不要拿物理机来开玩笑。

## 1、下载工具
windbg(x64).msi
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/debugger/debugger-download-tools
http://www.windbg.org/

## 2、系统蓝屏dump文件位置
‪C:\Windows\MEMORY.DMP

## 3、管理员运行windbg工具
File->Symbol File Path(D:\Users\User\My Document\Visual Studio 2015\Projects\KMDFUSBDriver\x64\Debug)
File->Source File Path(D:\Users\User\My Document\Visual Studio 2015\Projects\KMDFUSBDriver\KMDFUSBDriver)
使用Windbg打开dump分析，File->OpenCrashDump打开指定的dump文件

先在最下方命令行敲入命令!sym noisy。
再执行高级命令!analyze -v 就能得到蓝屏大部分关键信息






