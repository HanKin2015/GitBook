# 单片机入门

## 1、资料
[蓝桥杯嵌入式之 Keil 仿真与调试](https://blog.csdn.net/wuyiyu_/article/details/128554122)

## 2、零基础快速上手STM32开发（手把手保姆级教程）
正点原子资料下载中心：http://www.openedv.com/docs/boards/stm32/zdyz_stm32f103_jingyingV2.html
正点原子论坛：http://www.openedv.com/forum.php

https://zhuanlan.zhihu.com/p/666604170

STM32 是一款由 STMicroelectronics 公司开发的 32 位微控制器，由于其强大的处理能力和广泛的应用领域，如嵌入式系统、物联网设备、机器人等，而受到了广泛的欢迎。

现在做 STM32 开发板比较有名的是正点原子和野火。

### 2-1、例程下载
stm32f103精英开发板V2 ：开发板资料A盘： https://pan.baidu.com/s/1iebOVd87jBVtoudMijboIg 提取码：1ypa

### 2-2、烧录环境搭建
安装MDK5收费版mdk525.exe（MDK-ARM V5.25 837MB）：
鼠标双击安装固件包，也可以在uVision5中import（Keil.STM32F1xx_DFP.2.4.1.pack）：https://www.keil.arm.com/packs/
安装STM32CubeMX（这步可省略，不深入了解不安装也可以）
J-Link驱动安装（JLink_Windows_V798c_x86_64.exe）：https://www.segger.com/downloads/jlink/

### 2-3、例程烧录
Options for Target 'BEEP'选择Debug中的J-LINK/J-TRACE Cortex（不清楚为何还需要点击一下Settings，否则烧录会报错）
Build（F7）-编译
Download（F8）-烧录

调试模式：
Start/Stop Debug Session（ctrl+F5）EVALUATION MODE Running with Code Size Limit: 32K
Reset-Run-Stop

备注：要停止设备运行，则需要烧录一下解决

### 2-4、模拟USB设备

模拟U盘：https://blog.csdn.net/qq_36347513/article/details/128001270

## 3、FPGA入门
JTAG 接口：大多数 FPGA 开发板，包括基于 Xilinx Artix-7 的板子，通常使用 JTAG 接口进行编程和调试。