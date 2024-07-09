# 嵌入式设备

## 1、高云烧录
https://www.gowinsemi.com.cn/down.aspx?FId=n14:14:26

## 2、仿真器
JLINK仿真器:(也称之为JTAG仿真器)一个小型USB到JTAG的转换盒，实现电脑到JTAG开发板的连接与协议转换，主要用于ARM开发。搭配IAR EWAR，ADS，Keil，WINARM，RealView等开发软件
ULINK仿真器：ARM/Keil公司推出的仿真器，配合Keil软件实现仿真功能，增加支持SWD协议。仅支持Keil，不支持ADS、IAR
STLink仿真器：意法半导体ST推出的专门针对STM8和STM32的芯片仿真器，支持SWIM标注接口的JTAG\SWD。支持ST-Link Utility、IAR EWAR、Keil等
赛灵思：赛灵思XILINX推出的JTAG仿真器，支持FPGAs。支持Vivado、EDK

上面三种都是ARM仿真器。大多数国内厂家默认使用JLINK仿真器，或部分厂家会提供自己的仿真器，如右侧图片。在日常项目中，我们可以支持上面三种大厂家的，部分非常小众厂家的不会主动去做适配Telink