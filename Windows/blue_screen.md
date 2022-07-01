# 蓝屏调试

以自身写的Windows驱动蓝屏为例，发现写Windows驱动不要拿物理机来开玩笑。

## 1、下载工具
windbg(x64).msi
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/debugger/debugger-download-tools
http://www.windbg.org/

## 2、系统蓝屏dump文件位置
‪C:\Windows\MEMORY.DMP

## 3、管理员运行windbg工具（调试）
加载符号表：File->Symbol File Path (D:\Users\User\My Document\Visual Studio 2015\Projects\KMDFUSBDriver\x64\Debug)
加载源代码（注意是到cpp文件目录）：File->Source File Path(D:\Users\User\My Document\Visual Studio 2015\Projects\KMDFUSBDriver\KMDFUSBDriver)
使用Windbg打开dump分析，File->OpenCrashDump打开指定的dump文件

先在最下方命令行敲入命令!sym noisy。
再执行高级命令!analyze -v 就能得到蓝屏大部分关键信息

kb命令查看堆栈信息。
```
0: kd> kb
RetAddr           : Args to Child                                                           : Call Site
fffff802`48e86729 : 00000000`00000050 fffff40b`32f47000 00000000`00000000 fffff40b`32f4d170 : nt!KeBugCheckEx
fffff802`48ceeb80 : 00000000`00000000 00000000`00000000 fffff40b`32f4d1f0 00000000`00000000 : nt!memset+0x7f6a9
fffff802`48e0205e : fffff40b`32f4d214 fffff40b`32f4d270 00000000`00000000 fffff40b`32f4d270 : nt!SeAccessCheckWithHint+0x3710
fffff802`48dfc966 : ffff970c`a8cdfd70 ffff970c`aa3da1e4 fffff802`5eef383f fffff802`5eef3d72 : nt!setjmpex+0x446e
fffff802`5eef383f : fffff802`5eef3d72 000068f3`53330a88 fffff802`5eef8400 fffff802`5eef8950 : nt!_chkstk+0x36
fffff802`5eef3d72 : 000068f3`53330a88 fffff802`5eef8400 fffff802`5eef8950 00000000`0000035f : KMDFUSBDriver!HelpInitConfigDesc+0xf [d:\users\user\my document\visual studio 2015\projects\mycamera\mycamera\camera.c @ 999]
fffff802`5eef2cd6 : 000068f3`53330a88 00000000`00000004 fffff40b`32f4d408 fffff40b`32f4d410 : KMDFUSBDriver!HelpInitDevice+0x82 [d:\users\user\my document\visual studio 2015\projects\mycamera\mycamera\camera.c @ 872]
fffff802`5eef1a12 : 000068f3`55e12d08 000068f3`59b461c8 00000000`00000004 00000000`00000104 : KMDFUSBDriver!GetDeviceDesc+0x326 [d:\users\user\my document\visual studio 2015\projects\mycamera\mycamera\camera.c @ 1233]
fffff802`4b1a8f93 : 000068f3`55e12d08 000068f3`59b461c8 00000000`00000004 00000000`00000104 : KMDFUSBDriver!DeviceControlDef+0xd2 [d:\users\user\my document\visual studio 2015\projects\mycamera\mycamera\camera.c @ 1589]
(Inline Function) : --------`-------- --------`-------- --------`-------- --------`-------- : Wdf01000!FxIoQueueIoDeviceControl::Invoke+0x42 [minkernel\wdf\framework\shared\inc\private\common\FxIoQueueCallbacks.hpp @ 226]
fffff802`4b1a8960 : 00000000`00001001 00000000`00000f00 ffff970c`00000000 00000000`000000a0 : Wdf01000!FxIoQueue::DispatchRequestToDriver+0x163 [minkernel\wdf\framework\shared\irphandlers\io\fxioqueue.cpp @
```
增加源代码能告诉代码行数，即@后面的数字，并且包含文件名。
增加符号表可以告知函数名。

## 4、其他dump文件
例如自己写驱动或者是程序，可以将自己的dump文件放在C:\Users\User\AppData\Local\Temp目录下，即%tmp%。

```
1.管理员打开WinDbg
2.加载符号表：
srv*c:\Symbols*http://310.370.348.340/symbols;srv*c:\Symbols*http://310.370.347.347/symbols;D:\tmp
4.下载符号表加载：.reload /f
5.分析堆栈：!analyze -v
```


