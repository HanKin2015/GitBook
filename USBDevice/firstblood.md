[TOC]

# 1、常用工具的安装

## winrar

个人一直使用的解压软件。7zip也不错，免费开源。其他不建议：快压、360、winzip、bandizip。

## BusHound

sn码破解：4**40

需要重启，否则无法读取usb接口。

- 枚举数据包
- 普通usb数据包



ICH9：Intel推出了全新的3系列[芯片组](https://baike.baidu.com/item/芯片组/305749)，与其搭载的是一款全新的[南桥芯片](https://baike.baidu.com/item/南桥芯片/329208)，这就是ICH9。ICH9将包含四种版本：普通版本ICH9、RAID加强型ICH9R、针对数字家庭的ICH9DH、针对数字办公的ICH9DO。

Enhanced和Universal

Composite Device复合设备。

megabit：百万位，兆位(约100万比特)

volts：伏特

milliamps：毫安

microampere：微安

Endpoint端点：CTL和INT、Class\SubClass\Protocol\MaxPacket

Hardware ID：VID和PID

数据读取：2KB@392KB/Sec      @什么鬼？in/out？

---

抓包参数配置。

勾选自动选择热插拔设备，然后插拔设备就完成抓包了。

保存文件需将软件最大化。

## AMCap-ok.exe

小型摄像头使用软件。设备-选项-预览。



## usbmon

抓包工具通过命令行，没有找到软件。估计只有Linux软件。

insmod命令：Linux insmod(install module)命令用于载入模块。Linux有许多功能是通过模块的方式，在需要时才载入kernel。如此可使kernel较为精简，进而提高效率，以及保有较大的弹性。这类可载入的模块，通常是设备驱动程序。

modprobe usbmon命令：Linux modprobe命令用于自动处理可载入模块。modprobe可载入指定的个别模块，或是载入一组相依的模块。modprobe会根据depmod所产生的相依关系，决定要载入哪些模块。若在载入过程中发生错误，在modprobe会卸载整组的模块。

---

lsusb命令 

> /dev/bus/usb/003/008 046d:081b 

总线号：003

总线下的设备ID（插拔设备ID会变）:008

VID:PID=046d:081b

> cat /sys/kernel/debug/usb/usbmon/3u | grep 009:

抓普通usb数据包：总线号，设备ID

抓设备枚举包：不需要grep管道

## USBTrace

crack：破裂 、裂缝、优秀的

替换打开的exe执行文件进行破解。

根集线器hub：15个port端口。无论将usb插进那个接口，端口号都是最后一个？？？

capture：捕获、攻占

摄像头时时刻刻在传输数据，就会不停的在抓包。

抓取usb枚举数据包：开启热插拔监听。

# 2、usb协议学习

《圈圈教你USB》

《cypress_USB2.0简介》

