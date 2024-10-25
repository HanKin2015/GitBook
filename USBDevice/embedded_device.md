# 嵌入式设备

## 1、高云烧录
https://www.gowinsemi.com.cn/down.aspx?FId=n14:14:26

## 2、仿真器
JLINK仿真器:(也称之为JTAG仿真器)一个小型USB到JTAG的转换盒，实现电脑到JTAG开发板的连接与协议转换，主要用于ARM开发。搭配IAR EWAR，ADS，Keil，WINARM，RealView等开发软件
ULINK仿真器：ARM/Keil公司推出的仿真器，配合Keil软件实现仿真功能，增加支持SWD协议。仅支持Keil，不支持ADS、IAR
STLink仿真器：意法半导体ST推出的专门针对STM8和STM32的芯片仿真器，支持SWIM标注接口的JTAG\SWD。支持ST-Link Utility、IAR EWAR、Keil等
赛灵思：赛灵思XILINX推出的JTAG仿真器，支持FPGAs。支持Vivado、EDK

上面三种都是ARM仿真器。大多数国内厂家默认使用JLINK仿真器，或部分厂家会提供自己的仿真器，如右侧图片。在日常项目中，我们可以支持上面三种大厂家的，部分非常小众厂家的不会主动去做适配Telink

## 3、`timescale时间精度对仿真时间的影响
timescale包含时间单位和时间精度两部分。设定格式为`timescale timeunit / timeprecision
timeunit和timeprecision由值1、10、和100以及单位s、ms、us、ns、ps和fs组成。

`timescale的时间精度设置是会影响仿真时间的，以下面几种设置。最后一种设置多是第一种的一倍还多，而且占用更多的内存，因此若是没有必要，应尽可能将时间精度设置得更大一些。
```
`timescale 1ns / 1ns
`timescale 1ns / 100ps
`timescale 1ns / 10ps
`timescale 1ns / 1ps
```
https://zhuanlan.zhihu.com/p/486525352

在数字电路仿真中，timescale 关键字用于设置仿真时间的精度。它由两个参数组成，分别是时间单位和时间精度。
对于时间单位，常见的选项包括纳秒（ns）、微秒（us）、毫秒（ms）等。这些选项表示了仿真时间的基本单位。
对于时间精度，常见的选项包括纳秒（1ns）、皮秒（1ps）、飞秒（1fs）等。这些选项表示了仿真时间的最小可分辨单位。

在实际应用中，timescale 的设置取决于仿真工具的支持和设计需求。大多数仿真工具支持的时间精度范围通常是从纳秒级别到飞秒级别。具体的最大设置取决于仿真工具的实现和硬件资源的限制。

一般来说，较小的时间精度可以提供更准确的仿真结果，但也会增加仿真的计算量和时间。因此，在选择 timescale 时间精度时，需要根据具体的仿真需求和资源限制进行权衡和选择。

## 4、数字电路的仿真是什么
数字电路的仿真是通过计算机软件或硬件工具对数字电路进行模拟和验证的过程。它是一种用于验证电路设计的方法，可以在实际制造之前评估电路的功能和性能。

在数字电路仿真中，电路被表示为逻辑门和触发器等基本元件的组合。仿真工具会根据电路的逻辑功能和时序特性，模拟电路中信号的传输和变化过程。通过对输入信号的激励和观察输出信号的响应，可以评估电路的正确性、时序性能、功耗等方面的指标。

数字电路仿真可以帮助设计人员发现和解决电路设计中的问题，例如逻辑错误、时序冲突、电路延迟等。它可以提供准确的仿真结果，帮助设计人员验证电路的功能和性能是否符合预期。同时，仿真还可以节省时间和成本，避免在实际制造之前发现和修复电路设计中的问题。

常见的数字电路仿真工具包括ModelSim、VCS、Xilinx ISE等。这些工具提供了丰富的仿真功能和调试工具，可以帮助设计人员进行全面的电路验证和优化。

## 5、汽车行业烧录
https://www.sohu.com/a/495778211_236020
https://zhuanlan.zhihu.com/p/148017247

客户是bootloader decipher发现没有找到该软件下载地址，大概率是自研的。

周立功、广成

## 6、Keil5软件使用
https://blog.csdn.net/u012749085/article/details/125597424
https://www.keil.com/demo/eval/arm.htm
Keil提供了包括C编译器、宏汇编、链接器、库管理和一个功能强大的仿真调试器等在内的完整开发方案，通过一个集成开发环境（μVision）将这些部分组合在一起。
目前软件对中文的支持不友好，不建议安装网上的一些汉化包之类的。另外建立的工程文件路径也尽量不要存在中文，否则可能会出现一些异常。

## 7、烧录和仿真的区别
烧录和仿真是两种不同的技术过程，用于开发和测试电子设备和系统。它们的主要区别如下：

定义：
烧录（Programming）是将软件或固件代码加载到目标设备的非易失性存储器（如闪存、EPROM等）中的过程。烧录通常是一次性的，将代码永久地存储在设备中，以便设备在启动时能够正确运行。
仿真（Simulation）是使用计算机模型或仿真器来模拟设备或系统的行为。仿真可以用于验证和调试硬件和软件设计，而无需实际的物理设备。

目的：
烧录的目的是将代码加载到设备中，使其能够独立运行。烧录后，设备可以在没有连接到开发环境的情况下执行代码。
仿真的目的是通过模拟设备或系统的行为来评估其性能、功能和可靠性。仿真可以在开发早期阶段进行，以验证设计的正确性，并在硬件制造之前进行系统级测试。

过程：
烧录通常需要使用专门的烧录器或编程器，将代码通过编程接口（如JTAG、SWD等）加载到目标设备的存储器中。这个过程是一次性的，一旦完成，代码将永久存储在设备中。
仿真使用仿真器或软件工具来创建设备或系统的虚拟模型。通过在模型中运行代码，可以模拟设备的行为并进行各种测试和调试操作。

应用：
烧录通常用于将软件、固件或操作系统加载到嵌入式系统、微控制器、单片机等设备中。
仿真广泛应用于电子设计自动化（EDA）、系统级设计（SLD）和硬件描述语言（HDL）开发中，用于验证和调试电路和系统设计。

总的来说，烧录是将代码加载到设备中，使其能够独立运行，而仿真是通过模拟设备的行为来评估其性能和功能。烧录是一次性的，而仿真可以在开发早期进行，并且不需要实际的物理设备。

烧录：就是将程序刻录在rom中
仿真：临时将程序刻录在ram中，方便调试使用，实时查看寄存器或者地址中的值，类似debug

## 8、J-link仿真器
驱动下载：https://www.segger.com/downloads/jlink/
https://blog.csdn.net/qq_48938498/article/details/139387709

JLink_Windows_V798c_x86_64.exe，安装驱动的时候需要注意主动勾选安装驱动（install legacy USB Driver for J-Link），默认不安装驱动（JLinkx64.sys）。
安装完后点击J-Link Commander V7.98c即可：
```
SEGGER J-Link Commander V7.98c (Compiled Aug  7 2024 15:41:14)
DLL version V7.98c, compiled Aug  7 2024 15:40:25

Connecting to J-Link via USB...O.K.
Firmware: J-Link V9 compiled May  7 2021 16:26:12
Hardware version: V9.40
J-Link uptime (since boot): N/A (Not supported by this model)
S/N: 69409340
License(s): RDI, GDB, FlashDL, FlashBP, JFlash
VTref=3.295V


Type "connect" to establish a target connection, '?' for help
J-Link>
```

## 9、stm32单片机
[openedv论坛]http://www.openedv.com/forum-2-1.html)
[良许嵌入式-知乎](https://zhuanlan.zhihu.com/p/666604170)
[良许嵌入式](https://www.lxlinux.net/e/stm32/stm32-quick-start-for-beginner.html)
[单片机在线编程网](http://www.mcuisp.com/)
更多详情见：D:\Github\GitBook\gitbook\USBDevice\microcontroller.md

## 10、FTDI串口
驱动：https://ftdichip.com/drivers/vcp-drivers/

## 11、如何处理Keil uVision5注释无法输入汉字且输入汉字变成问号的问题
KEIL点击edit,找到最下方的Configuration
编辑Configuration页面的Editor项
在General Editor Settings常规编辑器设置：下方Encoding编码框内将Encode in ANSI更改为：Chinese GB2312(Simplified)即可

## 12、C语言开发单片机为什么大多数都采用全局变量的形式
https://www.zhihu.com/question/396710272/answer/3533232116
资源限制：在嵌入式系统中，包括单片机，资源是有限的。全局变量可以减少函数调用和局部变量带来的空间占用，避免由于过深的函数调用或过多的变量导致的内存溢出。在单片机资源有限的时期，全局变量的使用可以更有效地管理内存资源。

访问速度：全局变量在所有函数内部都可以使用，这减少了参数传递的需要，避免了不必要的数据拷贝，从而提高了访问速度。在嵌入式系统中，数据的访问速度对程序的性能至关重要。

方便性：全局变量可以方便地在程序中进行数据共享。在单片机开发中，有些数据需要在不同的函数之间进行传递，全局变量提供了这种方便性，减少了代码的冗余。

方便调试：全局变量可以方便地进行调试。由于单片机没有屏幕和键盘，无法进行人机交互，使用全局变量可以方便地在所有函数中共享数据，从而简化调试过程。

中断服务函数的交互：中断服务函数是单片机程序的重要组成部分，但中断服务函数是不能传参的。因此，使用全局结构体变量可以方便中断服务函数与主函数线程任务进行交互。

综上所述，C语言开发单片机时大多数都采用全局变量的形式，这主要是基于资源限制、访问速度、方便性、调试方便性和中断服务函数的交互等方面的考虑。
