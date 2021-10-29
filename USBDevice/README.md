# 外设
USB基础知识概论: https://www.crifan.com/files/doc/docbook/usb_basic/release/webhelp/index.html

# USB协议

闩：1.门关上后，插在门内使门推不开的木棍或铁棍。 2.用闩插上。 3.姓。

# PS2键盘/鼠标
也是键盘和鼠标，但是接bai口不一du样，我们现在一般用的是USB接口zhi的。但是最早用的就是PS2接口。
两种接口各dao有优缺点。
PS2接口，不支持热插拔，接口使用不便（不懂得人可能插都插不进去，有方向的。），但是他的不冲突性能非常好（全键无冲突），所以现在一些高速要求的键盘设备或者游戏玩家还会用PS2 接口的键盘。
USB接口就不用多讲啦，即插即用，接口使用方便。而且各类设备（笔记本，台式机，一体机）通用。

otg是英文on the go 的缩写。意思是bai能够随地播放影du音文件，不需要将文件复zhi制到播放器里边，只需要用一根连线共享另dao外的存储器即可。otg连线一般是MP4的，一般用标准usb接口，能够接到MP3MP4或者移动硬盘上，播放里边的文件。在外旅行拍摄很方便的。

# 透传
透传，即透明传输（pass-through），指的是在通讯中不管传输的业务内容如何，只负责将传输的内容由源地址传输到目的地址，而不对业务数据内容做任何改变

# HCD
hcd是主机控制器的驱动程序。它位于USB主机控制器与USB系统软件之间。

一个USB控制器的实
现者必须提供一个支持它自己的控制器的主机控制器驱动器(HCD)实现
HCD是Hydraulic component design library的简称，即为液压元件设计库。

## 内存屏障
https://www.jianshu.com/p/08a0a8c984ab

## MMIO
在MMIO中，内存和I/O设备共享同一个地址空间。 MMIO是应用得最为广泛的一种IO方法，它使用相同的地址总线来处理内存和I/O设备，I/O设备的内存和寄存器被映射到与之相关联的地址。当CPU访问某个内存地址时，它可能是物理内存，也可以是某个I/O设备的内存。因此，用于访问内存的CPU指令也可来访问I/O设备。每个I/O设备监视CPU的地址总线，一旦CPU访问分配给它的地址，它就做出响应，将数据总线连接到需要访问的设备硬件寄存器。为了容纳I/O设备，CPU必须预留给I/O一个地址区域，该地址区域不能给物理内存使用。

https://www.cnblogs.com/idorax/p/7691334.html


常常看见human interface device，结果才发现是HID的全拼，人机接口设备。

## U盘只读相关
mount命令可以看见u盘设备当前是可读可写rw，可读不可写ro。
dmesg -w也能看见write protect is on。
银河麒麟出现界面无法写入，报错目标是只读的。但是终端和日志查看write protect is off，并且可以写入。
解决：echo $DESKTOP_SESSION获取session类型，然后ps查找相关session进程，killall杀死进程，这时候界面重启，这时候就能正常写入了。

## ioctl
在计算机中，ioctl(input/output control)是一个专用于设备输入输出操作的系统调用,该调用传入一个跟设备有关的请求码，系统调用的功能完全取决于请求码。举个例子，CD-ROM驱动程序可以弹出光驱，它就提供了一个对应的Ioctl请求码。设备无关的请求码则提供了内核调用权限。ioctl这名字第一次出现在Unix第七版中，他在很多类unix系统（比如Linux、Mac OSX等）都有提供，不过不同系统的请求码对应的设备有所不同。Microsoft Windows在Win32 API里提供了相似的函数，叫做DeviceIoControl。

## 会谈边界控制器
会谈边界控制器（Session Border Controller, SBC），一种NAT穿透的方式。SBC可确保VoIP 安全，又可提供媒体代理服务器的套件。
SBC架构于IMS网络之上，可作为IMS网络的SIP和RTSP的 Proxy Server，所有的SIP与RTSP讯息都会透过SBC来处理，SBC更具备NAT穿透的功能。思科与 Kagoor 对会谈边界控制技术有突破性的发展。

SBC可以理解为远程应用。

## oa系统办公
办公自动化(OA: OFFICE AUTOMATION)就是采用Internet/Intranet技术，基于工作流概念，使企业内部人员方便快捷地共享信息，高效协同工作；改变过去复杂、低效的手工办公方式，实现迅速、全方位的信息采集、处理，为企业管理和决策提供科学依据。企业实现办公自动化程度也是衡量其实现现代化管理的标准。办公自动化不仅兼顾个人办公效率提高，更重要的是可实现群体协同工作。凭借网络，这种交流与协调几乎可以在瞬间完成。这里所说的群体工作，可以包括在地理上分布很广，甚至在全球上各个地方，以至于工作时间都不一样的一群工作人员。

## TWAIN
TWAIN（全写：Technology Without An Interesting Name）是一个软件和数码相机、扫描仪等图像输入设备之间的通讯标准。


# 主引导记录
主引导记录（MBR，Master Boot Record）是位于磁盘最前边的一段引导（Loader）代码。它负责磁盘操作系统(DOS)对磁盘进行读写时分区合法性的判别、分区引导信息的定位，它由磁盘操作系统(DOS)在对硬盘进行初始化时产生的。



SCSI：是小型计算机系统接口的意思，就是早期硬盘或者光驱的接口类型，多用在服务器电脑上。数据线有50芯或者68芯的
SATA：是现在的硬盘或者光驱接口，是串行接口。现在的电脑一般都用这种类型，数据线是7芯的。


仅批量传输协议中，数据传输的结构和过程：命令阶段、数据阶段和状态阶段。
命令块封包CBW：Command Block Wrapper
命令状态封包CSW：Command Status Wrapper
CDB：Command Block？？？





SE(System Engineer)




# 什么是Quickstart?

Quickstart，97年开发，首次被引入Pentium III处理器，它主要是通过监测CPU的工作负荷，当CPU处于空闲状态时，就把CPU置于休眠状态，到需要时再迅速恢复工作状态。处于休眠状态的CPU功耗，甚至能低到0.5W，以达到有效管理电源以获得更长的。



Serial ATA (SATA) or Parallel
串行

vertical垂直的

# 字符设备
字符设备是指在I/O传输过程中以字符为单位进行传输的设备，例如键盘，打印机等。在UNIX系统中，字符设备以特别文件方式在文件目录树中占据位置并拥有相应的结点。
字符设备可以使用与普通文件相同的文件操作命令对字符设备文件进行操作，例如打开、关闭、读、写等。

# 块设备
块设备是i/o设备中的一类，是将信息存储在固定大小的块中，每个块都有自己的地址，还可以在设备的任意位置读取一定长度的数据，例如硬盘,U盘，SD卡等。

# libusb源代码
https://github.com/libusb/libusb

# 中断请求
同义词 IRQ一般指中断请求
“紧急事件”须向处理器提出申请（发一个电脉冲信号），要求“中断”，即要求处理器先停下“自己手头的工作”先去处理“我的急件”，这一“申请”过程，称——中断请求。

IRQ为 Interrupt ReQuest的缩写，中文可译为中断请求。因为计算机中每个组成组件都会拥有一个独立的IRQ，除了使用PCI总线的PCI卡之外，每一组件都会单独占用一个 IRQ，且不能重复使用。
由于在计算机运行中，CPU是持续处于忙碌状态，而当硬件接口设备开始或结束收发信息，需要CPU处理信息运算时，便会透过IRQ对CPU送出中断请求讯号，让CPU储存正在进行的工作，然后暂停手边的工作，先行处理周边硬件提出的需求，这便是中断请求的作用。

# 分辨率1080HFD是什么意思
HFD ，是“高清屏”的英文缩写， 意思是支持1920X1080以上分辨率的显示屏。
和1080p类似，就是全高清，FHD意思是全高清，即FULL HD，全称为Full High Definition。



USB设备文件对应路径为：“/dev/bus/usb/xxx/xxx”，使用了udev文件系统。
可以使用 cat /sys/bus/usb/devices/2-2.1/speed 来获取usb速度。
由于目录/sys/bus/usb/devices/经常被使用，在libusb源码中有以下宏定义：
#define SYSFS_DEVICE_PATH "/sys/bus/usb/devices"

dmidecode -t 1输出硬件设备序列号

https://zhuanlan.zhihu.com/p/37664732

BIOS EHCI Hand-Off Hand-Off是接手的意思，是否让BIOS接管EHCI控制。当操作系统不支持EHCI时，就要让BIOS来控制。EHCI是USB HiSpeed控制器的一种实现规范。

BIOS是英文"Basic Input Output System"的缩略词，直译过来后中文名称就是"基本输入输出系统"。在IBM PC兼容系统上，是一种业界标准的固件接口。计算机在运行时，首先会进入BIOS，它在计算机系统中起着非常重要的作用。








