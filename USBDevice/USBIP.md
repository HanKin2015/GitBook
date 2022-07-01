# USB/IP

参考资料：
不容易理解：https://blog.csdn.net/weixin_43891775/article/details/111680304
推荐：http://www.usbzh.com/article/detail-320.html

## 1、介绍
​在资源管理的机制之中， 使用的关键的技术就是网络透明的设备共享机制， 通过该机制， 可以和其他计算机的设备进行无缝交互。

在之前的技术之中，已经提出了很多的设备的共享技术，但是设备访问接口的网络透明性并没有得到充分的解决
注：网络的透明性：指的是不关注内部的具体的传输的细节，只关注两端。

透明的设备共享机制是USB/IP， 这个机制的主要的组件是虚拟主机控制器接口驱动器， 它是作为外围总线的驱动器， 由于大多数应用程序或者是设备驱动程序在访问这些外部设备的时候， 也都是通过接口来访问的， 而且接口一般都是位于操作系统的最底层。

​USB/IP的设备共享技术相比于传统的方法， 具有如下的一些的优点：
- 计算机可以访问共享设备的全部的功能
- 只需要几个额外的驱动程序即可
- 不同操作系统的设备也可以相互共享设备
在usb2.0规范之中， 主机以3种传输速度 —— 分别是1.5Mb/s， 12Mb/s， 480Mb/s和4种传输的类型 —— 控制， 批量， 中断和同步， 这些传输都是由一个硬件 —— usb host controller进行控制。

## 2、架构
关键的设计是：usb主机控制器和usb hcd（usb 主机控制器驱动）将为usb pdd提供输入输出数据，尽管一个usb和usb pdd是使用buffer去传输一些数据以及一些回复的数据， 但是usb hcd并不会去区分这2种数据。

​在usb设备驱动之中， usb request block（即URB）是以一种独立于控制器的形式去提供usb的输入和输出， 这些输入和输出包括：
- 缓冲区
- 方向
- 速度
- 类型
- 目标的地址
- 完成处理器

PDD：perdevice driver

在Linux内核中，USBIP的源码写在drivers/usb/usbip目录下，在这些文件中，以stub开头的都是server端的代码，vhci开头的是client端的代码，其余是公共部分的代码。

## 3、官网
http://usbip.sourceforge.net/
终于找到源代码地址：https://sourceforge.net/projects/usbip/files/
在linux内核中找到源码不足：
```
[root@ubuntu0006:/media/hankin/vdb/kernel/linux-5.15.4/drivers/usb/usbip] #ll
总用量 248
drwxrwxr-x  2 root root  4096 11月 21  2021 ./
drwxrwxr-x 27 root root  4096 11月 21  2021 ../
-rw-rw-r--  1 root root  2176 11月 21  2021 Kconfig
-rw-rw-r--  1 root root   496 11月 21  2021 Makefile
-rw-rw-r--  1 root root 12272 11月 21  2021 stub_dev.c
-rw-rw-r--  1 root root  2414 11月 21  2021 stub.h
-rw-rw-r--  1 root root  9085 11月 21  2021 stub_main.c
-rw-rw-r--  1 root root 16985 11月 21  2021 stub_rx.c
-rw-rw-r--  1 root root 11668 11月 21  2021 stub_tx.c
-rw-rw-r--  1 root root 18851 11月 21  2021 usbip_common.c
-rw-rw-r--  1 root root 11044 11月 21  2021 usbip_common.h
-rw-rw-r--  1 root root  4033 11月 21  2021 usbip_event.c
-rw-rw-r--  1 root root  3601 11月 21  2021 vhci.h
-rw-rw-r--  1 root root 39647 11月 21  2021 vhci_hcd.c
-rw-rw-r--  1 root root  6308 11月 21  2021 vhci_rx.c
-rw-rw-r--  1 root root 12450 11月 21  2021 vhci_sysfs.c
-rw-rw-r--  1 root root  6041 11月 21  2021 vhci_tx.c
-rw-rw-r--  1 root root 12887 11月 21  2021 vudc_dev.c
-rw-rw-r--  1 root root  3650 11月 21  2021 vudc.h
-rw-rw-r--  1 root root  2562 11月 21  2021 vudc_main.c
-rw-rw-r--  1 root root  5539 11月 21  2021 vudc_rx.c
-rw-rw-r--  1 root root  6124 11月 21  2021 vudc_sysfs.c
-rw-rw-r--  1 root root 11936 11月 21  2021 vudc_transfer.c
-rw-rw-r--  1 root root  6461 11月 21  2021 vudc_tx.c
```
原来还有其他地方的代码：
```
[root@ubuntu0006:/media/hankin/vdb/kernel/linux-5.15.4/tools/usb/usbip/src] #ll
总用量 100
drwxrwxr-x 2 root root  4096 11月 21  2021 ./
drwxrwxr-x 6 root root  4096 11月 21  2021 ../
-rw-rw-r-- 1 root root   440 11月 21  2021 Makefile.am
-rw-rw-r-- 1 root root  4802 11月 21  2021 usbip_attach.c
-rw-rw-r-- 1 root root  4567 11月 21  2021 usbip_bind.c
-rw-rw-r-- 1 root root  3804 11月 21  2021 usbip.c
-rw-rw-r-- 1 root root 14481 11月 21  2021 usbipd.c
-rw-rw-r-- 1 root root  2320 11月 21  2021 usbip_detach.c
-rw-rw-r-- 1 root root   693 11月 21  2021 usbip.h
-rw-rw-r-- 1 root root  9190 11月 21  2021 usbip_list.c
-rw-rw-r-- 1 root root  5998 11月 21  2021 usbip_network.c
-rw-rw-r-- 1 root root  5092 11月 21  2021 usbip_network.h
-rw-rw-r-- 1 root root  1078 11月 21  2021 usbip_port.c
-rw-rw-r-- 1 root root  2892 11月 21  2021 usbip_unbind.c
-rw-rw-r-- 1 root root  1028 11月 21  2021 utils.c
-rw-rw-r-- 1 root root   264 11月 21  2021 utils.h
```
https://github.com/torvalds/linux/tree/master/tools/usb/usbip/src

这个地址不是：https://coral.googlesource.com/linux-imx/+/refs/heads/master/tools/usb/usbip/src/usbip_unbind.c

这个github的usbip似乎是本项目的代码：
https://github.com/realthunder/usbip
不能说一模一样，简直是一个模子刻出来的。
看提交记录说提取linux3.10.10版本，下载该版本看看是不是同样的文件：https://mirrors.edge.kernel.org/pub/linux/kernel/v3.x/
下下来一看，简直就是一模一样，原来项目就是使用的linux开源代码。。。。。。

结论就是：usbip代码已经合入linux代码中进行维护。

## 4、个人理解
USB/IP协议的主要功能：将A机器上的一个USB设备映射到B机器上使用。

USBIP是用于将Linux系统上所识别到的USB设备通过以太网共享出来的一个工具，它可以使得USB外接设备可以跨电脑或跨服务器进行访问。在USBIP基本架构中，分服务端（Server）和客户端（Client）两种，其中服务端是指插入USB设备并将其共享出来的一端，而客户端则是连接共享USB的一端，目前USBIP已经是Linux内核的一个分支，Windows平台下也有相应的工具。
服务端的USB设备被USBIP共享出来后，如果有客户端连接这个共享USB设备成功，在网络层面上建立一个TCP连接，以满足对信令和数据的传输。

USBIP工具的相关安装包目前是已经集成在debian的软件仓库中的，并且没有其他的Linux依赖，因此我们可以直接通过“apt install usbip”命令进行安装，倘若网络环境与互联网隔离，且没有部署相应的离线仓库，也可以将外网拉取的USBIP安装包直接通过dpkg的方式进行离线安装。

将USBIP安装完成后，进入/lib/modules/5.10.101-amd64-desktop/kernel/drivers/usb/usbip（具体路径视具体的Linux内核版本为准），可以看到此时USBIP生成了四个内核模块，分别为usbip-core.ko、usbip-host.ko、usbip-vudc.ko和vhci-hcd.ko。

!()[https://img-blog.csdnimg.cn/9746a4d2bd734a94b1ddaee90382fa7f.png#pic_center]

## 5、实战

### 5-1、新的命令
```
[root@ubuntu0006:/media/] #apt-file search usb-devices
linux-doc: /usr/share/doc/linux-doc/ABI/testing/sysfs-bus-usb-devices-usbsevseg
usbutils: /usr/bin/usb-devices
usbutils: /usr/share/man/man1/usb-devices.1.gz
```
默认有usb-device、usbhid-dump、usb_modeswitch、usb_modeswitch_dispatcher、usbmuxd等命令。

新大陆usb-device真的很好用。
```
root@admin-CE3000F:~# usbhid-dump
001:005:001:DESCRIPTOR         1656402199.703653
 05 0C 09 01 A1 01 85 01 19 00 2A 3C 02 15 00 26
 3C 02 95 01 75 10 81 00 C0 05 01 09 80 A1 01 85
 02 19 81 29 83 25 01 75 01 95 03 81 02 95 05 81
 01 C0

其他命令有机会研究研究
```

apt install usbip后多了：usbip、usbip_bind_driver、usbipd命令。

额外的：
```
root@admin-CE3000F:~# usbreset
Usage:
  usbreset PPPP:VVVV - reset by product and vendor id
  usbreset BBB/DDD   - reset by bus and device number
  usbreset "Product" - reset by product name

Devices:
  Number 002/002  ID 045b:0210
  Number 001/005  ID 1a2c:2124  USB Keyboard
  Number 001/002  ID 045b:0209
  Number 001/003  ID 05e3:0610  USB2.0 Hub
  Number 001/004  ID 093a:2532  Gaming Mouse
  Number 002/003  ID 05e3:0612  USB3.0 Hub
root@admin-CE3000F:~# usb_printerid
Error: usage: usb_printerid /dev/usb/lp0
```

### 5-2、内核模块
```
root@admin-CE3000F:/lib/modules/5.4.18-35-generic/kernel/drivers/usb/usbip# ll
总用量 288
drwxr-xr-x  2 root root   4096 7月  22  2021 ./
drwxr-xr-x 23 root root   4096 7月  22  2021 ../
-rw-r--r--  1 root root  65009 7月  20  2021 usbip-core.ko
-rw-r--r--  1 root root  63417 7月  20  2021 usbip-host.ko
-rw-r--r--  1 root root  52841 7月  20  2021 usbip-vudc.ko
-rw-r--r--  1 root root 101817 7月  20  2021 vhci-hcd.ko
root@admin-CE3000F:/lib/modules/5.4.18-35-generic/kernel/drivers/usb/usbip# date
2022年 06月 28日 星期二 15:48:12 CST
```

### 5-3、可以使用USBIP工具使用远程USB设备
参考：https://blog.csdn.net/muxia_jhy/article/details/124952561

https://www.right.com.cn/forum/thread-1074227-1-1.html

usbipd -D
usbip list -l

## 6、libsysfs2库
在使用apt install usbip时，这个libsysfs2库也一起安装。

在sysfsutils项目中找到libsysfs2库的源代码。

2.1.0版本：https://github.com/Distrotech/sysfsutils
2.1.1版本：https://github.com/linux-ras/sysfsutils



























