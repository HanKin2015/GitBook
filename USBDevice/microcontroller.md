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
我的网盘地址有软件：全部文件 >我的资源 >嵌入式场景 >STM32烧录仿真

### 2-3、操作教程
Options for Target 'BEEP'选择Debug中的J-LINK/J-TRACE Cortex（不清楚为何还需要点击一下Settings，否则烧录会报错）
Build（F7）-编译
Download（F8）-烧录

调试模式：
Start/Stop Debug Session（ctrl+F5）EVALUATION MODE Running with Code Size Limit: 32K
Reset-Run-Stop

备注：要停止设备运行，则需要烧录一下解决

### 2-4、例程烧录
选择《实验44 USB虚拟串口实验》项目进行烧录，结果报错The code size of this image (43192 bytes) exceeds the maximum allowed for this version of the linker.
意味着您使用的编译器或链接器的版本存在代码大小限制。这种情况在使用免费版本的编译器（如 Keil MDK-Lite）时比较常见，因为这些版本通常对生成的可执行文件大小有一定的限制。
Keil MDK uVision5 的免费版本（MDK-Lite）对生成的可执行文件大小有 32 KB 的限制。

查看软件版本信息时发现：Toolchain:        MDK-Lite  Version: 5.25.2.0
启用编译器优化：点击菜单栏中的 Project，然后选择 Options for Target 'target_name'，找到 Optimization 设置。在这里，您可以选择不同的优化级别：
- Level 0 (No Optimization)：不进行优化，适合调试。
- Level 1 (Optimize for Size)：进行基本优化，主要减少代码大小。
- Level 2 (High Optimization)：更高的优化级别，平衡代码大小和执行速度。
- Level 3 (Optimize for Speed)：最高优化级别，优先提高执行速度。
启用编译器优化后确实有些效果，但是还是超过了32KB的限制（35692 bytes），只能通过破解来解决这个问题了。

### 2-5、MDK5破解
https://blog.csdn.net/qq_56897450/article/details/143242455
找到License Management选项，这个东西居然没有在Help菜单里面，然而却在File菜单，通过注册机直接破解起飞。

### 2-6、模拟USB设备
模拟U盘：https://blog.csdn.net/qq_36347513/article/details/128001270
选择《实验44 USB虚拟串口实验》项目可以参考使用，因为只有2个实验项目包含usbd_desc.c文件，这个是写描述符信息的文件。
然鹅，usbd_desc.c文件只有设备描述符信息，后面问chatgpt才在usbd_cdc.c文件（ CDC 类）中找到，配置描述符、接口描述符和端点描述符通常在其他地方定义和初始化，特别是在 USB 类的实现中。

修改代码注意：
USBD_CDC_CfgHSDesc和USBD_CDC_CfgFSDesc分别用于高速（High-Speed, HS）和全速（Full-Speed, FS）模式下的配置。另外还有USBD_CDC_OtherSpeedCfgDesc配置描述，最好所有地方都进行修改。

要严格按照USB_CDC_CONFIG_DESC_SIZ大小来写配置描述符，否则编译不过。写了一个接口描述符中端口数量为0，并且端点地址为0x80的串口设备。
测试代码见：

### 2-7、模拟设备测试
注意：不能插着JTAG设备进行测试，否则会枚举失败，并且会把Windows系统卡死。（把JTAG设备也同时插在任意一个usb口，设备会枚举成功，但是也不可取）
```
[Wed Nov  6 17:22:54 2024] usb 1-3.1: new full-speed USB device number 55 using xhci_hcd
[Wed Nov  6 17:22:54 2024] usb 1-3.1: device descriptor read/64, error -32
[Wed Nov  6 17:22:54 2024] usb 1-3.1: device descriptor read/64, error -32
[Wed Nov  6 17:22:54 2024] usb 1-3.1: new full-speed USB device number 56 using xhci_hcd
[Wed Nov  6 17:22:54 2024] usb 1-3.1: device descriptor read/64, error -32
[Wed Nov  6 17:22:54 2024] usb 1-3.1: device descriptor read/64, error -32
[Wed Nov  6 17:22:55 2024] usb 1-3.1: new full-speed USB device number 57 using xhci_hcd
[Wed Nov  6 17:22:55 2024] usb 1-3.1: Device not responding to setup address.
[Wed Nov  6 17:22:55 2024] usb 1-3.1: Device not responding to setup address.
[Wed Nov  6 17:22:55 2024] usb 1-3.1: device not accepting address 57, error -71
[Wed Nov  6 17:22:55 2024] usb 1-3.1: new full-speed USB device number 58 using xhci_hcd
[Wed Nov  6 17:22:55 2024] usb 1-3.1: Device not responding to setup address.
[Wed Nov  6 17:22:55 2024] usb 1-3.1: Device not responding to setup address.
[Wed Nov  6 17:22:56 2024] usb 1-3.1: device not accepting address 58, error -71
[Wed Nov  6 17:22:56 2024] usb 1-3-port1: unable to enumerate USB device
```

因此正确的做法是要拔掉JTAG设备，即从JTAG接口去掉设备：
```
[Wed Nov  6 17:30:59 2024] usb 1-3.1: new full-speed USB device number 92 using xhci_hcd
[Wed Nov  6 17:30:59 2024] usb 1-3.1: config 1 interface 1 altsetting 0 has an invalid endpoint with address 0x80, skipping
[Wed Nov  6 17:30:59 2024] usb 1-3.1: config 1 interface 1 altsetting 0 has 1 endpoint descriptor, different from the interface descriptor's value: 0
[Wed Nov  6 17:30:59 2024] usb 1-3.1: New USB device found, idVendor=0483, idProduct=5740
[Wed Nov  6 17:30:59 2024] usb 1-3.1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[Wed Nov  6 17:30:59 2024] usb 1-3.1: Product: STM32 Virtual ComPort in FS Mode
[Wed Nov  6 17:30:59 2024] usb 1-3.1: Manufacturer: STMicroelectronics
[Wed Nov  6 17:30:59 2024] usb 1-3.1: SerialNumber: 48FC613E3953
[Wed Nov  6 17:30:59 2024] usb 1-3.1: cannot find UAC_HEADER
[Wed Nov  6 17:30:59 2024] snd-usb-audio: probe of 1-3.1:1.1 failed with error -22
```
可以看见两个异常不符合usb标准协议被Linux系统给处理，需要参考此兼容性进行产品修改。

## 3、FPGA入门
JTAG 接口：大多数 FPGA 开发板，包括基于 Xilinx Artix-7 的板子，通常使用 JTAG 接口进行编程和调试。