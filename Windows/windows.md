# windows相关

## 1、20210201
发现一个非常牛批的bug。

在2560x1440分辨率,100%推荐文本大小模式下,使用mobaxterm无法进行sftp文件拖曳,会有禁止图标问题.google查询无果.

## 2、D3D中的DXGI是做什么用的
举个例子，在以前图形子系统都归D3D，结果D3D8/D3D9分别有一套代码用来管理swap chain。在Vista+里，图形API越来越多，D3D9/D3D10/D3D11/D3D12，都来一套swap chain太没意义了。于是重构成所有API可以共享一份swap chain的代码，这就放在DXGI。除此之外，窗口全屏化之类的事情也都归DXGI了，你可以认为屏幕输出的部分都归DXGI。后来DXGI又加了一些底层的功能，用来跟DWM打交道，比如拷贝混合后的屏幕，设备旋转，跨屏幕窗口。。。还有些未公开的，我就不说了。归根到底，你写个程序，甚至看看sample代码，就知道DXGI做什么用了。

不论是 OGL 还是 D3D，都没有包含与窗口（HWND，安卓下的 View 啥的）打交道的函数，光是程序里画好是不够滴，还得拷贝到屏幕上呢！所以 OGL 需要 EGL、WGL、GLX 等在窗口和 API 之间交流交流。类似的 D3D （10 之后）需要 DXGI 来做这件事情。Vulkan 也有一个 WSI（Windows System Interface）

## 3、D3D
D3D，全称为Direct3D，是微软为提高3D游戏在Windows中的显示性能而开发的显示程序接口，目前已经升级到12版本，它提供了丰富的3D功能库，是游戏广泛采用的标准。
D3D的作用在于只需要调用D3D提供的接口函数和功能就能实现显示功能，通过分工合作，极大的降低了软件开发周期和成本。

3D加速卡就是硬件，也就是我们常说的显卡。
而操作系统和应用软件通常不能直接去使用显卡和其中的3D加速功能，必须通过系统中的一个接口去调用，这就是OPENGL和D3D的作用了。

## 4、查看电脑.NET Framework版本
地址栏中直接输入地址，C:\Windows\Microsoft.NET\Framework回车最高版本。
控制面板左侧打开或关闭windows功能按钮。

## 5、如何将exe应用程序添加到鼠标右键应用程序打开
https://www.cnblogs.com/cn2018/p/10273261.html
```sublime_addright.reg
Windows Registry Editor Version 5.00
[HKEY_CLASSES_ROOT\*\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\*\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3]
@="用 SublimeText3 打开"
"Icon"="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe,0"
[HKEY_CLASSES_ROOT\Directory\shell\SublimeText3\command]
@="C:\\Program Files (x86)\\Sublime Text3\\sublime_text.exe %1"
```

## 6、DX基础 | DXGI(DirectX Graphics Infrastructure)
https://www.pianshen.com/article/40881199723/

ntoskenl 是 Windows 的内核进程，负责 Windows 核心部分的操作，也就是负责操作系统核心的五大任务：处理机管理、存储管理、设备管理、文件管理、接口，这从它的 PID = 4 就能看出来它的地位是操作系统最先启动的进程。操作系统（四）操作系统的主要功能 - 魏亚林 - 博客园​www.cnblogs.com因此它是接管整个电脑硬件的程序，具有最高权限，或者说它要运行在硬件的环境上。而我们日常使用的其他程序都是在 ntoskrnl 的掌管下运行的，而且运行方式是调用 Windows 的接口。如果你在 Windows 环境下直接运行它，那么就变成了 Windows 的环境，所以提示无法在 Win32 模式下运行。注意 win32 是指 Windows NT 系列内核，而不是指 32 位 Windows。64 位 Windows 同样也叫 Win32。应用程序在调用 Windows 接口时，功能的执行需要由 ntoskrnl 进行。因此当某些程序在大量调用系统接口或者系统功能时，会造成 ntoskrnl 的高占用。由于没有便捷的方式可以排查问题，你可以尝试逐个结束其他进程。这不会造成系统损坏。

## 7、给软件添加开机启动项
- 给软件创建桌面快捷方式
- 将桌面快捷方式剪切到C:\ProgramData\Microsoft\Windows\Start Menu\Programs\StartUp
- cmd输入msconfig就可以在启动项中看见






















