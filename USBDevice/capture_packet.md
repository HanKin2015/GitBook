[TOC]
# 数据包抓取工具

参考：https://blog.csdn.net/zcshoucsdn/article/details/81448023
介绍的比较详细，几乎是现在主流的一些抓包工具。

# 1、常用工具的安装
[USB 之三 常用抓包/协议分析工具（Bus Hound、USBlyzer、USBTrace、USB Monitor Pro等）](https://blog.csdn.net/ZCShouCSDN/article/details/81448023/)

## 1-1、winrar
个人一直使用的解压软件。7zip也不错，免费开源。其他不建议：快压、360、winzip、bandizip。

## 1-2、BusHound
不再更新：最新版6.01
sn码破解：49940

缺点：
- 对于某些USB报文无法抓取，这是个硬伤。
- 其也不具备USB协议分析功能。
- 需要重启，否则无法读取usb接口。

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

## 1-3、AMCap-ok.exe
小型摄像头使用软件。设备-选项-预览。

## 1-4、usbmon
https://blog.csdn.net/u013550000/article/details/105263603
前面一顿操作猛如虎，一看结果就modprobe usbmon才是王道。

insmod /system/lib/modules/usbmon.ko

监听全部bus上的USB数据包，cat /sys/kernel/debug/usb/usbmon/0u
监听Bus=2上的USB数据包，cat /sys/kernel/debug/usb/usbmon/2u

------

抓包工具通过命令行，没有找到软件。估计只有Linux软件。

insmod命令：Linux insmod(install module)命令用于载入模块。Linux有许多功能是通过模块的方式，在需要时才载入kernel。如此可使kernel较为精简，进而提高效率，以及保有较大的弹性。这类可载入的模块，通常是设备驱动程序。

modprobe usbmon命令：Linux modprobe命令用于自动处理可载入模块。modprobe可载入指定的个别模块，或是载入一组相依的模块。modprobe会根据depmod所产生的相依关系，决定要载入哪些模块。若在载入过程中发生错误，在modprobe会卸载整组的模块。

------

lsusb命令 
> /dev/bus/usb/003/008 046d:081b 

总线号：003
总线下的设备ID（插拔设备ID会变）:008
VID:PID=046d:081b

> cat /sys/kernel/debug/usb/usbmon/3u | grep "009:"
抓普通usb数据包：总线号，设备ID
抓设备枚举包：不需要grep管道。

------
```
d891c280 2116911208 S Ci:3:006:0 s 80 06 0100 0000 0012 18 <
d891c280 2116956319 C Ci:3:006:0 0 18 = 12011001 00000040 831407c0 00010102 0001
d891c280 2116956346 S Ci:3:006:0 s 80 06 0200 0000 0009 9 <
d891c280 2116958194 C Ci:3:006:0 0 9 = 09022200 01010080 32
d891c280 2116958214 S Ci:3:006:0 s 80 06 0200 0000 0022 34 <
d891c280 2116960692 C Ci:3:006:0 0 34 = 09022200 01010080 32090400 00010300 00000921 10010001 22210107 05830308
d891c280 2116960740 S Ci:3:006:0 s 80 06 0300 0000 00ff 255 <
d891c280 2116961318 C Ci:3:006:0 0 4 = 04030904
d891c280 2116961333 S Ci:3:006:0 s 80 06 0302 0409 00ff 255 <
d891c280 2116962192 C Ci:3:006:0 0 12 = 0c035400 6f006b00 65006e00
d891c280 2116962208 S Ci:3:006:0 s 80 06 0301 0409 00ff 255 <
d891c280 2116962942 C Ci:3:006:0 0 8 = 08035500 53004200
d891c280 2116963464 S Co:3:006:0 s 00 09 0001 0000 0000 0
d891c280 2116963822 C Co:3:006:0 0 0
d891c280 2116964267 S Co:3:006:0 s 21 0a 0000 0000 0000 0
d891c280 2116964442 C Co:3:006:0 0 0
d891c280 2116964481 S Ci:3:006:0 s 81 06 2200 0000 0121 289 <
d891c280 2116974580 C Ci:3:006:0 0 289 = 06a8ff09 00a10115 0026ff00 75088501 95070901 b1828502 950f0901 b1828503
```
前面的S和C代表状态，Send和Complete，Ci代表是Control In，即控制In包（设备到虚拟机），Co代表是Control Out，即控制Out包（虚拟机到设备）。

S 是向设备请求数据长度（IN包）或者是发送数据（OUT包）
C 是设备响应 发送数据（IN包）或者接收数据状态（OUT包）

### 部分linux系统无usbmon
https://www.kernel.org/doc/html/latest/usb/usbmon.html
需要安装内核包。
```
root@user-W515-PGUV-WBY0:/home/user# modprobe usbmon
modprobe: FATAL: Module usbmon not found in directory /lib/modules/4.19.71+
```
usbmon 即 usb monitor，是 linux 内置的 usb 抓包工具。
当前使用的是ubuntu18.04，驱动模块的位置：/lib/modules/5.3.0-40-generic/kernel/drivers/usb/mon/usbmon.ko
如果不确定当前内核的版本，可以先输入uname -r命令查看。
https://cloud.tencent.com/developer/article/1935522

我找了一个正常的环境，在/lib/modules/4.4.0-210-generic/kernel/drivers/usb/mon/usbmon.ko。
```
[root@ubuntu0006:/lib/modules/4.4.0-210-generic] #apt-file search /lib/modules/4.4.0-210-generic/kernel/drivers/usb/mon/usbmon.ko
linux-modules-extra-4.4.0-210-generic: /lib/modules/4.4.0-210-generic/kernel/drivers/usb/mon/usbmon.ko

root@user-W515-PGUV-WBY0:/home/user# uname -r
4.19.71+
root@user-W515-PGUV-WBY0:/home/user# apt search linux-modules
正在排序... 完成
全文搜索... 完成
linux-modules-5.4.0-1001-raspi2/10.1 5.4.0-1001.1 arm64
  Linux kernel extra modules for version 5.4.0 on ARMv8 SMP

linux-modules-5.4.0-26-generic/10.1 5.4.0-26.30 arm64
  Linux kernel extra modules for version 5.4.0 on ARMv8 SMP

linux-modules-5.4.18-17-biv/10.1 5.4.18-17.3b1 arm64
  Linux kernel extra modules for version 5.4.18 on ARMv8 SMP

linux-modules-5.4.18-17-generic/10.1 5.4.18-17.3b1 arm64
  Linux kernel extra modules for version 5.4.18 on ARMv8 SMP
```
猜测应该在linux-modules-x.x.x-xxx-generic，搜索只有高版本内核的，先安装再说。安装失败了。
不要猜测，可以通过apt-file命令来找到ko文件来源。
我安装了linux-modules-extra-5.4.18-17-generic后发现有usbmon.ko文件了，哈哈，虽然总体安装失败了。
```
root@user-W515-PGUV-WBY0:/lib/modules/5.4.18-17-generic/kernel/drivers/usb/mon# ll
总用量 76
drwxr-xr-x  2 root root  4096 10月 11 17:15 ./
drwxr-xr-x 23 root root  4096 10月 11 17:15 ../
-rw-r--r--  1 root root 66865 1月  17  2021 usbmon.ko
root@user-W515-PGUV-WBY0:/lib/modules/5.4.18-17-generic/kernel/drivers/usb/mon# insmod usbmon.ko
insmod: ERROR: could not insert module usbmon.ko: Required key not available
```
https://blog.csdn.net/m0_38066161/article/details/81812816
根据上面的教程可能很复杂，意思是说内核不准安装其他文件，权限问题。

## 1-5、USBTrace
crack：破裂 、裂缝、优秀的
替换打开的exe执行文件进行破解。
根集线器hub：15个port端口。无论将usb插进那个接口，端口号都是最后一个？？？
capture：捕获、攻占
摄像头时时刻刻在传输数据，就会不停的在抓包。
抓取usb枚举数据包：开启热插拔监听。

---
usbtrace抓包数据更加详细，能看见每个包的大小；但是可能有些包没有抓取到
bus hound抓包数据更加完整，但是内容不是很详细

## 1-6、adb工具
adb工具即Android Debug Bridge（安卓调试桥） tools，它就是一个命令行窗口。
发现：前面是路径，永远在后面的是目标路径。
把解压出来的文件直接复制到‘C:\Windows’文件夹下，这样，每次你进入cmd就可以直接使用adb命令了很方便的。
```
adb devices	#查看已连接的设备
adb push path1 path2	#推送文件
adb pull path1 path2	#拉取文件
adb shell screencap path	#截屏
-v 显示日志格式  -v time 以时间为显示格式
```

## 1-7、USBlyzer
具备分析功能，需重启计算机
不再更新：最新版2.2

## 1-8、DebugView
https://blog.csdn.net/baidu_37503452/article/details/87599038
https://blog.csdn.net/baidu_37503452/article/details/87598982


# 2、usb协议学习
《圈圈教你USB》
《cypress_USB2.0简介》

## ACPI
ACPI表示高级配置和电源管理接口（Advanced Configuration and Power Management Interface）。对于Windows2000，ACPI定义了Windows 2000、BIOS和系统硬件之间的新型工作接口。这些新接口包括允许Windows 2000控制电源管理和设备配置的机制。

## PCI （定义局部总线的标准）
PCI(Peripheral Component Interconnect)是 一种由英特尔（Intel）公司1991年推出的用于定义局部总线的标准。此标准允许在计算机内安装多达10个遵从PCI标准的扩展卡。
PCI总线取代了早先的ISA总线。当然与在PCI总线后面出现专门用于显卡的AGP总线，与现在PCI Express总线相比，速度要慢，但是PCI能从1992用到现在，说明他有许多优点，比如即插即用(Plug and Play)、中断共享等。

Peripheral：次要的，外围的，周边设备
Interconnect：相互连接

## ATA 
高技术配置（英语：Advanced Technology Attachment，简称“ATA”）与由集成驱动电子设备（英语：Integrated Drive Electronics，简称IDE）技术实现的磁盘驱动器关系最密切。

硬盘技术、全球硬盘标准

## DPI （每英寸点数）
图像每英寸长度内的像素点数。
DPI（Dots Per Inch，每英寸点数）是一个量度单位，用于点阵数码影像，指每一英寸长度中，取样、可显示或输出点的数目。
DPI是打印机、鼠标等设备分辨率的度量单位。是衡量打印机打印精度的主要参数之一，一般来说，DPI值越高，表明打印机的打印精度越高。
DPI是指每英寸的像素，也就是扫描精度。DPI越低，扫描的清晰度越低，由于受网络传输速度的影响，web上使用的图片都是72dpi，但是冲洗照片不能使用这个参数，必须是300dpi或者更高350dpi。例如要冲洗4*6英寸的照片，扫描精度必须是300dpi，那么文件尺寸应该是(4*300)*(6*300)=1200像素*1800像素。

## ISO传输方式
USB支持两种类型的数据传输：大数据块(bulk)传输方式，对不能容差的数据进行移动;同步(isochronous，ISO)传输方式，对不允许时延的数据进行移动。数据块传输可确保数据能可靠传输，不会丢失或干扰数据，但不能确保给定时间内的数据传输量。在没有其他数据流量时，块数据即指那些仅使用总线的填充数据。同步传输是以主机PC与设备相互协调确定的速率来进行的，但数据可能会受到干扰，而且不能持续传输。

选择同步传输还是选择块数据传输是非常简单的。如果数据的完整性是最重要的，就采用块数据传输;但如果准时传输数据比准确率更重要的话，还是选择ISO传输。虽然乍看起来选择ISO并不合乎逻辑，因为ISO是用准时发送的受干扰数据来代替晚发的正确数据，但在某些不能及时传送数据的区域可能会存在数据根本不能到达的情况。电话里的音频流就是一个简单例子，丢失了几小片数据总比让受话方一直落后乃至不能赶上要好。在视频中也是如此，用户还是宁愿选择丢失一个帧以保持图像的实时传输。

USB带宽被分为每秒1000帧。

Windows支持的USB基于分层结构，可使所需的常规设备驱动降至最少，甚至无需常规设备驱动。分层结构的最底层是USBD，即通用串行总线驱动。位于USBD之上的是类驱动(class drivers)，这种驱动对于具有类似特性的设备是通用的。要支持ISO，类驱动必须采用流类驱动程序(Stream Class Driver，stream.sys)。音频和视频驱动则位于stream.sys之上。

## USB人体学输入设备 
人体工程学又叫人类工学或人类工程学，是第二次世界大战后发展起来的一门新学科。它以人－机关系为研究的对象。

## Hi-Fi
Hi-Fi是英语High-Fidelity的缩写，翻译为“高保真”，其定义是：与原来的声音高度相似的重放声音。
评价一个音响系统或设备是否符合高保真要求，一般应采用主观听音评价和客观指标测试相结合的方式来进行，并以客观测试指标为主要依据。因为采用仪器测试设备的性能指标，能得到很直观的可供参考比较的定量结果，无疑是最科学而值得信赖的。

## 什么是OTG？

OTG是USB On-The-Go的缩写，是近年发展起来的技术，2001年12月18日由USB Implementers Forum公布，2014年左右在市场普及。主要应用于各种不同的设备或移动设备间的联接，进行数据交换。特别是PDA、移动电话、消费类设备。平时我们在遇到没有电脑设备的情况下，可以直接将手机等移动设备连接连接U盘、读卡器、数码相机等外部设备，来进行数据传输或充电等操作。

## uvc 
UVC全称为USB Video Class，即：USB视频类，是一种为USB视频捕获设备定义的协议标准。是Microsoft与另外几家设备厂商联合推出的为USB视频捕获设备定义的协议标准，已成为USB org标准之一。
如今的主流操作系统(如Windows XP SP2 and later, Linux 2.4.6 and later, MacOS 10.5 and later)都已提供UVC设备驱动，因此符合UVC规格的硬件设备在不需要安装任何的驱动程序下即可在主机中正常使用。使用UVC技术的包括摄像头、数码相机、类比影像转换器、电视棒及静态影像相机等设备。

## org（organizations）
org有组织、团体的意思。ORG，在汇编语言中也是一条指令，其作用是告诉汇编程序，在开始执行的时候，将某段机器语言装载到内存中的哪个地址。

分辨率，指的是图像或者显示屏在长和宽上各拥有的像素个数。比如一张照片分辨率为1920x1080，意思是这张照片是由横向1920个像素点和纵向1080个像素点构成，一共包含了1920x1080个像素点。

## 分辨率和DPI
dpi是分辨率的表示单位之一。它是英文Dot Per Inch的缩写，意思是“每英寸的点数”。上文中我们说的1920x1080或者800x600，是没加度量单位的简写，如果写全度量单位，完整的分辨率写法应该是1920x1080dpi或者800x600dpi。

分辨率确实跟屏幕dpi有关系，但这个dpi跟屏幕大小直接影响到显示效果，比如说6寸的1080p绝对没有4寸的1080p好，同样分辨率，大了就降低了dpi。但这只是在同一种材质的屏幕上，换到电脑显示器，哪就不一样了，这个分辨率就跟dpi没有多大关系了，这个只是单纯的指可支持的图片事情分辨率大小了，分辨率可以调的。
描述分辨率的单位有：（dpi点每英寸）、lpi（线每英寸）和ppi（像素每英寸）。但只有lpi是描述光学分辨率的尺度的。虽然dpi和ppi也属于分辨率范畴内的单位，但是他们的含义与lpi不同。而且lpi与dpi无法换算，只能凭经验估算。

另外，ppi和dpi经常都会出现混用现象。但是他们所用的领域也存在区别。从技术角度说，“像素”只存在于电脑显示领域，而“点”只出现于打印或印刷领域。

分辨率和DPI之间的关系，可以通过以下举例来理解：一台显示器，屏幕大小是固定的，但是屏幕分辨率是可以调整的，调小分辨率的时候DPI增大，直观视觉上就是图片和字体都放大了，而当分辨率调大时，字体和图像都会看着变小。但是只要尺寸固定，已有DPI固定，那么最高分辨率就固定了。





MIDI(Musical Instrument Digital Interface)乐器数字接口
声卡 (Sound Card)也叫音频卡（港台称之为声效卡），是计算机多媒体系统中最基本的组成部分，是实现声波/数字信号相互转换的一种硬件。声卡的基本功能是把来自话筒、磁带、光盘的原始声音信号加以转换，输出到耳机、扬声器、扩音机、录音机等声响设备，或通过音乐设备数字接口(MIDI)发出合成乐器的声音。
调制解调器（英文名Modem），俗称“猫”，是一种计算机硬件。
它能把计算机的数字信号翻译成可沿普通电话线传送的脉冲信号，而这些脉冲信号又可被线路另一端的另一个调制解调器接收，并译成计算机可懂的语言。
计算机内的信息是由“0”和“1”组成数字信号，而在电话线上传递的却只能是模拟电信号。于是，当两台计算机要通过电话线进行数据传输时，就需要一个设备负责数模的转换。

# 3、Bus Hound
phase：阶段、时期
人体学输入设备可以理解为HID设备吗？？？但可以肯定的是HID设备属于人体学输入设备。

一个比较轻量级纯软件工具，软件界面看着就像上一个世纪的风格。官网为http://perisoft.net/index.htm。使用上也不是很麻烦，但是在实际使用中发现，对于某些USB报文无法抓取，这是个硬伤。而且，其也不具备USB协议分析功能。拿到报文后需要自行进行分析。安装后需要重启计算机才可用！
  这是一个收费工具，目前不怎么更新了，最新版为 6.01。但是网上放出去了其最新版的注册码。还有个简单的中文使用说明。

# 4、udevadm monitor
Linux下实时监控usb设备的拔插情况。

# 5、tcpdump抓包工具+wireshark
查看端口：tcpdump -D
tcpdump -i usbmon2 > xxxx.pcap

低版本无法使用tcpdump抓usb数据包
`0` 代表所有的USB总线，`1，2` 代表不同USB总线，`t` 代表 `text api`，`u`代表 `binary api`。如果不需要完整的数据，可以通过cat这些文件获得；

https://www.cnblogs.com/ggjucheng/archive/2012/01/14/2322659.html

## strace命令
https://www.cnblogs.com/bangerlee/archive/2012/02/20/2356818.html

## mknod
创建块设备或者字符设备文件。此命令的适用范围：RedHat、RHEL、Ubuntu、CentOS、SUSE、openSUSE、Fedora。


# 6、USBLzyer2.2
软件功能
1、USB协议分析仪的窗口，提供了一个完整而简单的理解分析USB主机控制器、USB集线器和USB设备活动器
2、可以查看所有USB设备和子组件的详细信息
3、可通过USB驱动器使用URB请求和相关的结构
4、可捕获、解码和显示USB的重要信息
5、由PnP子系统使用IRP，内核模式和用户模式I/O控制要求的USB客户端驱动程序和用户模式应用程序的使用
6、可以帮助你测试和解决硬件和软件
软件特点
1、可以提供所有与USB设备相关的资料
2、可以对USB Hubs的活动进行全面周详的分析
3、可以对USB Devices的活动进行全面周详的分析
4、可以对USB Host Controllers的活动进行全面周详的分析
5、一个完整的软件解决方案，所以你不需要安装任何额外的软件或硬件

# 7、使用tcpdump抓取网络数据包
tcpdump -i eth0 host 10.70.55.130 -s 0 -w hj.pcap

抓取的文件可以使用wireshark软件打开分析。

iftop -nNpP



