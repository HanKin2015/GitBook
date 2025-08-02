# linux驱动编程

## 1、学习资料
资料（强烈推荐，但是只有前三节有代码讲解）：https://blog.csdn.net/feixiaoxing/article/details/79913476
不错的linux驱动博客：https://blog.csdn.net/qq_44814825/article/details/129107911

## 2、linux加载insmod和卸载rmmod驱动

### 2-1、加载驱动模块
方法一： 
进入SHT21.ko驱动模块文件所在的目录，然后直接 insmod SHT21.ko 即可

方法二： 
将SHT21.ko文件拷贝到/lib/module/#uname -r#/目录下，这里，#uname -r#意思是，在终端中输入 
uname -r后显示的内核版本及名称，例如mini2440中#uname -r#就是2.6.32.2-FriendlyARM。

然后 depmod（会在/lib/modules/#uname -r#/目录下生成modules.dep和modules.dep.bb文件，表明模块的依赖关系） 
最后 modprobe SHT21（注意这里无需输入.ko后缀） 即可

两种方法的区别：
modprobe和insmod类似，都是用来动态加载驱动模块的，区别在于modprobe可以解决load module时的依赖关系，它是通过/lib/modules/#uname -r/modules.dep(.bb)文件来查找依赖关系的；而insmod不能解决依赖问题。

也就是说，如果你确定你要加载的驱动模块不依赖其他驱动模块的话，既可以insmod也可以modprobe，当然insmod可以在任何目录下执行，更方便一些。而如果你要加载的驱动模块还依赖其他ko驱动模块的话，就只能将模块拷贝到上述的特定目录，depmod后再modprobe。

### 2-2、卸载驱动模块
rmmod 模块名称
lsmod显示的模块名称，而不是对应的ko文件名

发现rmmod usbip_core和rmmod usbip-core都能卸载成功，好神奇。

### 2-3、加载驱动失败：insmod error: disagrees about version of symbol module_layout
```
[root@ubuntu0006:/media] #modinfo psmouse
filename:       /lib/modules/4.4.0-210-generic/kernel/drivers/input/mouse/psmouse.ko
license:        GPL
description:    PS/2 mouse driver
author:         Vojtech Pavlik <vojtech@suse.cz>
srcversion:     4A9614D16F58BF8FB9A8468
alias:          serio:ty05pr*id*ex*
alias:          serio:ty01pr*id*ex*
depends:
retpoline:      Y
intree:         Y
vermagic:       4.4.0-210-generic SMP mod_unload modversions
parm:           proto:Highest protocol extension to probe (bare, imps, exps, any). Useful for KVM switches. (proto_abbrev)
parm:           resolution:Resolution, in dpi. (uint)
parm:           rate:Report rate, in reports per second. (uint)
parm:           smartscroll:Logitech Smartscroll autorepeat, 1 = enabled (default), 0 = disabled. (bool)
parm:           resetafter:Reset device after so many bad packets (0 = never). (uint)
parm:           resync_time:How long can mouse stay idle before forcing resync (in seconds, 0 = never). (uint)
```
原来是驱动编译环境与当前系统内核不匹配导致。
网上怀疑是GCC的版本不同导致，可能性不大。

## 3、例如抓取usbvideo驱动数据包
```
insmod /system/lib/modules/usbmon.ko
modprobe usbmon

lsusb
cat /sys/kernel/debug/usb/usbmon/2u | grep "003:"
```

## 4、depmod命令
在linux桌面系统中，当你编译了新的驱动，为了能够用modprobe ***加载模块, 你需要先将模块拷贝到/lib/modules /2.6.31-20-generic目录下，然后运行sudo depmod -a将模块信息写入modules.dep、modules.dep.bin、modules.alias.bin、modules.alias和modules.pcimap文件中。

如，我编译了一个新的wifi驱动r8192se_pci.ko，将其拷贝到/lib/modules/2.6.31-20-generic/wireless下，然后到/lib/modules/2.6.31-20-generic运行depmod -a，之后可以在任意目录运行modprobe r8192se_pci。

https://ywnz.com/linux/depmod/

## 5、linux驱动编写（入门）
在linux上，所有的设备都可以看成是文件。我们对设备的所有操作基本上都可以简化成open、close、read、write、io control这几个操作。

- vmware软件安装ubuntu24.04虚拟机，window11使用mobaxterm连接或者使用vscode软件开发；
- uname -r获取的linux kernel版本，在www.kernel.org上下载解压安装（安装的Ubuntu24.04/lib/modules自带）；
- 用tar解压内核版本，将boot下config文件拷贝到本地，输入make menuconfig，直接保存即可；
- 输入make -j2 & make modules_install & make install即可，系统重启；
- 在linux系统起来后，注意在grub启动的时候选择刚刚编译的内核版本，这样就可以在linux上开发kernel驱动了；
- 入门编译测试demo：D:\interview\Storage\c++\kernel\linux驱动编写\01、入门\hello.c

## 6、驱动概念
驱动与底层硬件直接打交道，充当了硬件与应用软件中间的桥梁。

### 具体任务
读写设备寄存器（实现控制的方式）
完成设备的轮询、中断处理、DMA通信（CPU与外设通信的方式）
进行物理内存向虚拟内存的映射（在开启硬件MMU的情况下）

### 说明：设备驱动的两个任务方向
操作硬件（向下）
将驱动程序通入内核，实现面向操作系统内核的接口内容，接口由操作系统实现（向上）
（驱动程序按照操作系统给出的独立于设备的接口设计，应用程序使用操作系统统一的系统调用接口来访问设备）
Linux系统主要部分：内核、shell、文件系统、应用程序

内核、shell和文件系统一起形成了基本的操作系统结构，它们使得用户可以运行程序、管理文件并使用系统
分层设计的思想让程序间松耦合，有助于适配各种平台
驱动的上面是系统调用，下面是硬件

## 7、驱动分类
Linux驱动分为三个基础大类：字符设备驱动，块设备驱动，网络设备驱动。

字符设备(Char Device)
字符(char)设备是个能够像字节流（类似文件）一样被访问的设备。
对字符设备发出读/写请求时，实际的硬件I/O操作一般紧接着发生。
字符设备驱动程序通常至少要实现open、close、read和write系统调用。
比如我们常见的lcd、触摸屏、键盘、led、串口等等，他们一般对应具体的硬件都是进行出具的采集、处理、传输。

块设备(Block Device)
一个块设备驱动程序主要通过传输固定大小的数据（一般为512或1k）来访问设备。
块设备通过buffer cache(内存缓冲区)访问，可以随机存取，即：任何块都可以读写，不必考虑它在设备的什么地方。
块设备可以通过它们的设备特殊文件访问，但是更常见的是通过文件系统进行访问。
只有一个块设备可以支持一个安装的文件系统。
比如我们常见的电脑硬盘、SD卡、U盘、光盘等。

网络设备(Net Device)
任何网络事务都经过一个网络接口形成，即一个能够和其他主机交换数据的设备。
访问网络接口的方法仍然是给它们分配一个唯一的名字（比如eth0），但这个名字在文件系统中不存在对应的节点。
内核和网络设备驱动程序间的通信，完全不同于内核和字符以及块驱动程序之间的通信，内核调用一套和数据包传输相关的函（socket函数）而不是read、write等。
比如我们常见的网卡设备、蓝牙设备。

## 8、驱动程序的功能
对设备初始化和释放
把数据从内核传送到硬件和从硬件读取数据
读取应用程序传送给设备文件的数据和回送应用程序请求的数据
检测和处理设备出现的错误

## 9、驱动开发前提知识

### 9.1 内核态和用户态
Kernel Mode（内核态）
内核模式下（执行内核空间的代码），代码具有对硬件的所有控制权限。可以执行所有CPU指令，可以访问任意地址的内存
User Mode（用户态）
在用户模式下（执行用户空间的代码），代码没有对硬件的直接控制权限，也不能直接访问地址的内存。
只能访问映射其地址空间的页表项中规定的在用户态下可访问页面的虚拟地址。
程序是通过调用系统接口(System Call APIs)来达到访问硬件和内存
Linux利用CPU实现内核态和用户态

ARM：内核态（svc模式），用户态（usr模式）
x86 : 内核态（ring 0 ），用户态（ring 3）// x86有ring 0 - ring3四种特权等级
Linux实现内核态和用户态切换

ARM Linux的系统调用实现原理是采用swi软中断从用户态切换至内核态

X86是通过int 0x80中断进入内核态

Linux只能通过系统调用和硬件中断从用户空间进入内核空间

执行系统调用的内核代码运行在进程上下文中，他代表调用进程执行操作，因此能够访问进程地址空间的所有数据
处理硬件中断的内核代码运行在中断上下文中，他和进程是异步的，与任何一个特定进程无关通常，一个驱动程序模块中的某些函数作为系统调用的一部分，而其他函数负责中断处理

### 9.2 Linux下应用程序调用驱动程序流程
Linux下进行驱动开发，完全将驱动程序与应用程序隔开，中间通过C标准库函数以及系统调用完成驱动层和应用层的数据交换。
驱动加载成功以后会在“/dev”目录下生成一个相应的文件，应用程序通过对“/dev/xxx” (xxx 是具体的驱动文件名字) 的文件进行相应的操作即可实现对硬件的操作。
用户空间不能直接对内核进行操作，因此必须使用一个叫做 “系统调用”的方法 来实现从用户空间“陷入” 到内核空间，这样才能实现对底层驱动的操作
每一个系统调用，在驱动中都有与之对应的一个驱动函数，在 Linux 内核文件 include/linux/fs.h 中有个叫做 file_operations 的结构体，此结构体就是 Linux 内核驱动操作函数集合。

### 9.3 内核模块
Linux 驱动有两种运行方式

将驱动编译进 Linux 内核中，当 Linux 内核启动的时就会自动运行驱动程序。
将驱动编译成模块(Linux 下模块扩展名为.ko)，在Linux 内核启动以后使用相应命令加载驱动模块。
    内核模块是Linux内核向外部提供的一个插口
    内核模块是具有独立功能的程序，他可以被单独编译，但不能单独运行。他在运行时被链接到内核作为内核的一部分在内核空间运行
    内核模块便于驱动、文件系统等的二次开发

内核模块组成
printk 可以根据日志级别对消息进行分类，一共有 8 个日志级别
```
#define KERN_SOH  "\001" 
#define KERN_EMERG KERN_SOH "0"  /* 紧急事件，一般是内核崩溃 */
#define KERN_ALERT KERN_SOH "1"  /* 必须立即采取行动 */
#define KERN_CRIT  KERN_SOH "2"  /* 临界条件，比如严重的软件或硬件错误*/
#define KERN_ERR  KERN_SOH "3"  /* 错误状态，一般设备驱动程序中使用KERN_ERR 报告硬件错误 */
#define KERN_WARNING KERN_SOH "4"  /* 警告信息，不会对系统造成严重影响 */
#define KERN_NOTICE  KERN_SOH "5"  /* 有必要进行提示的一些信息 */
#define KERN_INFO  KERN_SOH "6"  /* 提示性的信息 */
#define KERN_DEBUG KERN_SOH "7"  /* 调试信息 */
```

查看当前日志级别
```
cat /proc/sys/kernel/printk
# 输出示例：4 4 1 7
# 四个数值分别代表：
# - 当前控制台日志级别（只显示≤此级别的消息）
# - 默认的日志级别
# - 最低允许设置的日志级别
# - 引导时的日志级别
```

修改/etc/sysctl.conf文件，添加或修改以下行：
```
kernel.printk = 3 4 1 7  # 分别对应：当前级别、默认级别、最低级别、引导级别
```

sysctl 是 Linux 系统中用于在运行时动态调整内核参数的命令行工具。它允许管理员修改 **/proc/sys/** 目录下的内核参数，无需重启系统即可生效。这些参数控制着操作系统的各种行为，如网络性能、内存管理、安全设置等。

- insmod
- rmmod
- modprobe
- depmod
- lsmod
- modinfo

### 9.4 设备号
Linux 中每个设备都有一个设备号，设备号由主设备号和次设备号两部分组成
主设备号表示某一个具体的驱动，次设备号表示使用这个驱动的各个设备。
Linux 提供了一个名为 dev_t 的数据类型表示设备号其中高 12 位为主设备号， 低 20 位为次设备
使用"cat /proc/devices"命令即可查看当前系统中所有已经使用了的设备号（主）

### 9.5 地址映射
MMU(Memory Manage Unit)内存管理单元
完成虚拟空间到物理空间的映射
内存保护，设置存储器的访问权限，设置虚拟存储空间的缓冲特性
对于 32 位的处理器来说，虚拟地址(VA,Virtual Address)范围是 2^32=4GB

内存映射函数
CPU只能访问虚拟地址，不能直接向寄存器地址写入数据，必须得到寄存器物理地址在Linux系统中对应的虚拟地址。

物理内存和虚拟内存之间的转换，需要用到： ioremap 和 iounmap两个函数

ioremap，用于获取指定物理地址空间对应的虚拟地址空间

## 10、设备树
Device Tree是一种描述硬件的数据结构，以便于操作系统的内核可以管理和使用这些硬件，包括CPU或CPU，内存，总线和其他一些外设。

Linux内核从3.x版本之后开始支持使用设备树，可以实现驱动代码与设备的硬件信息相互的隔离，减少了代码中的耦合性

引入设备树之前：一些与硬件设备相关的具体信息都要写在驱动代码中，如果外设发生相应的变化，那么驱动代码就需要改动。

引入设备树之后：通过设备树对硬件信息的抽象，驱动代码只要负责处理逻辑，而关于设备的具体信息存放到设备树文件中。如果只是硬件接口信息的变化而没有驱动逻辑的变化，开发者只需要修改设备树文件信息，不需要改写驱动代码。

## 11、GPIO
GPIO（General-Purpose Input/Output，通用输入输出）子系统 是 Linux 内核中用于控制硬件引脚的框架，允许用户空间程序或内核驱动通过标准化接口访问和操作物理 GPIO 引脚。它为嵌入式系统、单板计算机（如 Raspberry Pi）和工业控制设备提供了基础的 I/O 控制能力。