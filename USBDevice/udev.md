# udev 原理与使用

1、systemd 原理与使用；
2、udev 原理与使用；
3、x11 原理与使用；
4、openbox 相关；
5、debian 系统相关；
6、sh脚本、js、C++、python、Makefile；

## 1、udev概要
更多资料参考：https://blog.csdn.net/li_wen01/article/details/89435306

在传统的Linux系统中，/dev目录下的设备节点为一系列静态存在的文件，而udev则动态提供了在系统中实际存在的设备节点。虽然devfs提供了类似功能，但udev有比devfs更加好的地方：
- udev支持设备的固定命名，而并不依赖于设备插入系统的顺序。默认的udev设置提供了存储设备的固定命名。可以使用其vid（vendor）、pid（device）、设备名称（model）等属性或其父设备的对应属性来确认某一设备。
- udev完全在用户空间执行，而不是像devfs在内核空间一样执行。结果就是udev将命名策略从内核中移走，并可以在节点创建前用任意程序在设备属性中为设备命名。

udev在维基百科中的定义是：udev是Linux内核的设备管理器。作为devfsd和hotplug的继承者，udev主要管理/dev目录中的设备节点。同时，udev还处理在系统中添加或删除硬件设备时引发的所有用户空间事件，包括某些设备所需的固件加载。

## 2、udev运行方式
udev是一个通用的内核设备管理器。它以守护进程的方式运行于Linux系统，并监听在新设备初始化或设备从系统中移除时，内核（通过netlink socket）所发出的uevent。

系统提供了一套规则用于匹配可发现的设备事件和属性的导出值。匹配规则可能命名并创建设备节点，并运行配置程序来对设备进行设置。udev规则可以匹配像内核子系统、内核设备名称、设备的物理等属性，或设备序列号的属性。规则也可以请求外部程序提供信息来命名设备，或指定一个永远一样的自定义名称来命名设备，而不管设备什么时候被系统发现。

NetLink被用于在内核和应用之间传输信息，在用户空间编程使用标准的socket相关的API接口，在内核空间使用kernel内部的API接口。
NetLink是一个面向数据报的服务，socket_type 可以是SOCK_RAW也可以是SOCK_DGRAM ，在netlink协议中不做区分。
netlink_family最常用的就是NETLINK_ROUTE用于网络相关的配置和NETLINK_KOBJECT_UEVENT用于设备热插拔监测。
Netlink套接字是用以实现用户进程与内核进程通信的一种特殊的进程间通信(IPC) ,也是网络应用程序与内核通信的最常用的接口。

## 3、udev系统架构
udev系统可以分为三个部分：
- libudev函数库，可以用来获取设备的信息。
- udevd守护进程，处于用户空间，用于管理虚拟/dev
- 管理命令udevadm，用来诊断出错情况。

系统获取内核通过netlink socket发出的信息。早期的版本使用hotplug，并在/etc/hotplug.d/default添加一个链接到自身来达到目的。

## 4、udevadm 命令介绍
在Linux man page 中它是这么描述的。udevadm - udev management tool 。也就是说udevadm命令是管理udev的一个工具。实际我们如果要实现设备的重命名或是设备的自动挂载，我们也是使用udevadm来查看和跟踪udev的信息。
udevadm可以用来监视和控制udev运行时的行为，请求内核事件，管理事件队列，以及提供简单的调试机制。

### 4-1、udevadm命令选项
info     查询sysfs或者udev的数据库
trigger  从内核请求events
settle   查看udev事件队列，如果所有的events已处理则退出
control  修改udev后台的内部状态信息
monitor  监控内核的uevents
hwdb     处理硬件数据库索引
test     调试

### 4-2、命令应用
（a）查看设备信息：
udevadm info --query=all --name=sda  查询sda的所有信息
udevadm info --query=path --name=sda 查看sda的path
udevadm info --attribute-walk --name=/dev/nvme0n1  查看nvme0n1的所有父设备一直到sysfs的根节点
--query=type　　　　　从数据库中查询指定类型的设备。需要--path和--name来指定设备。合法的查询文件是：设备名，链接，路径，属性
--path=devpath　　　  设备的路径
--name=file　　　　　 设备节点或者链接
--attribute-walk　　　打印指定设备的所有sysfs记录的属性，以用来udev规则匹配特殊的设备。该选项打印链上的所有设备信息，最大可能到sys目录。
--device-id-of-file=file　打印主/从设备号
--export-db　　　　　 输出udev数据库中的内容

（b）监控设备事件：
udevadm monitor [options] 监听内核事件和udev发送的events事件。打印事件发出的设备。可以通过比较内核或者udev事件的时间戳来分析事件时序。

udevadm monitor --property   输出事件的属性
udevadm monitor --kernel --property --subsystem-match=usb    过滤监听符合条件的时间
--kernel　　输出内核事件
--udev　　输出udev规则执行时的udev事件
--property　　输出事件的属性
--subsystem-match=string　　通过子系统或者设备类型过滤事件。只有匹配了子系统值的udev设备事件通过。
--tag-match=string　　通过属性过滤事件，只有匹配了标签的udev事件通过。

(c)模拟一个udev事件
udevadm test [options] devpath　　模拟一个udev事件，打印出debug信息。
```
[root@ubuntu0006:/] #udevadm info --query=all --name=vda
P: /devices/pci0000:00/0000:00:0a.0/virtio4/block/vda
N: vda
S: disk/by-id/virtio-5003913368062-0
S: disk/by-path/virtio-pci-0000:00:0a.0
E: DEVLINKS=/dev/disk/by-path/virtio-pci-0000:00:0a.0 /dev/disk/by-id/virtio-5003913368062-0
E: DEVNAME=/dev/vda
E: DEVPATH=/devices/pci0000:00/0000:00:0a.0/virtio4/block/vda
E: DEVTYPE=disk
E: ID_PART_TABLE_TYPE=dos
E: ID_PART_TABLE_UUID=68831a34
E: ID_PATH=virtio-pci-0000:00:0a.0
E: ID_PATH_TAG=virtio-pci-0000_00_0a_0
E: ID_SERIAL=5003913368062-0
E: MAJOR=253
E: MINOR=0
E: SUBSYSTEM=block
E: TAGS=:systemd:
E: USEC_INITIALIZED=2295717

[root@ubuntu0006:/] #udevadm info --query=path --name=vda
/devices/pci0000:00/0000:00:0a.0/virtio4/block/vda
[root@ubuntu0006:/] #udevadm info --attribute-walk --name=/dev/vda
Udevadm info starts with the device specified by the devpath and then
walks up the chain of parent devices. It prints for every device
found, all possible attributes in the udev rules key format.
```

## 5、udev 重命名设备节点名 自动挂载、卸载存储设备分区
对U盘、SD卡、硬盘、操作的时候，需要对设备热拔插以及设备自动挂载自动卸载进行处理。有些时候我们需要对设备名进行固定，比如：SD卡卡槽1插入的设备固定它的设备名为sd_card1。 设备插入时将sd_card1的各个分区自动挂载固定的目录上去，设备拔出的时候又可自动的卸载之前的挂载信息。这些需求在linux2.6以后的系统都可以通过udev来处理。udev的详细介绍可以上维基百科查看：https://zh.wikipedia.org/wiki/Udev。

### 5-1、查看设备信息
查看/dev/vda 设备节点信息：
```
udevadm info -a /dev/vda
udevadm info -a  --name=vda
```
 
### 5-2、udevadm规则（固定设备节点名字）
对于可热拔插的设备，比如说U盘，SD卡，最开始插入的设备设备节点名是sda,接着是sdb,也就是说只从dev下面的设备节点名是不能区分我们插入的是那个设备，这时我们可以通过udev 将设备节点与设备绑定，方法就是通过内核名字建立连接，连接到设备节点上。
```
root@kylin03260002:/etc/udev/rules.d# udevadm monitor | grep sd
KERNEL[404959.937713] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda (block)
KERNEL[404959.937750] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda/sda1 (block)
UDEV  [404960.094914] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda (block)
UDEV  [404960.206351] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda/sda1 (block)


KERNEL[404982.354244] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb (block)
UDEV  [404982.501710] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb (block)
root@kylin03260002:/etc/udev/rules.d# ll /dev/sd*
brw-rw---- 1 root disk 8,  0 11月  7 08:08 /dev/sda
brw-rw---- 1 root disk 8,  1 11月  7 08:08 /dev/sda1
brw-rw---- 1 root disk 8, 16 11月  7 08:09 /dev/sdb

交换插入顺序，不改变插入接口
root@kylin03260002:/etc/udev/rules.d# udevadm monitor | grep sd
KERNEL[405116.367111] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda (block)
UDEV  [405116.525532] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-1/12-1:1.0/host0/target0:0:0/0:0:0:0/block/sda (block)

KERNEL[405120.777992] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb (block)
KERNEL[405120.778029] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb/sdb1 (block)
UDEV  [405120.923414] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb (block)
UDEV  [405121.023382] add      /devices/pci0000:00/0000:00:02.0/0000:01:19.0/usb12/12-2/12-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb/sdb1 (block)
root@kylin03260002:/etc/udev/rules.d# ll /dev/sd*
brw-rw---- 1 root disk 8,  0 11月  7 08:11 /dev/sda
brw-rw---- 1 root disk 8, 16 11月  7 08:11 /dev/sdb
brw-rw---- 1 root disk 8, 17 11月  7 08:11 /dev/sdb1
```
可以看见一个U盘是sda和sda1，一个U盘是sdb。如果交换插入顺序，则设备节点名进行了替换。

修改配置：
```/etc/udev/udev.conf
root@kylinos0001:/etc/udev# cat udev.conf
# see udev.conf(5) for details
#
# udevd is started in the initramfs, so when this file is modified the
# initramfs should be rebuilt.

udev_log="info"
udev_root="/dev/"
udev_rules="/etc/udev/rules.d"
```

这个居然真的没有成功：
```/etc/udev/rules.d/01-rename.rules
KERNEL=="sd*",KERNELS=="*:0:0:0",ATTRS{scsi_level}=="7" ,ATTRS{product}=="DataTraveler 3.0",ATTRS{idVendor}=="0951",ATTRS{idProduct}=="1666",SYMLINK+="usbsda%n",OPTIONS="ignore_remove"
```

这个算是半成功了，参考https://blog.csdn.net/li_wen01/article/details/89435306，但不知道为啥是这样：
```
KERNEL=="sd*",KERNELS=="*:0:0:0",ATTRS{scsi_level}=="7" GOTO="hisi_end"
ATTRS{product}=="DataTraveler 3.0",ATTRS{idVendor}=="0951",ATTRS{idProduct}=="1666",SYMLINK+="usbsda%n",OPTIONS="ignore_remove"
LABEL="hisi_end"

root@kylinos0001:/etc/udev/rules.d# ll /dev/usb*
总用量 0
drwxr-xr-x  2 root root     60 11月  7 15:14 ./
drwxr-xr-x 18 root root   3940 11月  7 15:30 ../
crw-------  1 root root 180, 0 11月  7 15:14 hiddev0
root@kylinos0001:/etc/udev/rules.d# ll /dev/usb*
lrwxrwxrwx 1 root root 11 11月  7 15:30 /dev/usbsda0 -> bsg/9:0:0:0
lrwxrwxrwx 1 root root 15 11月  7 15:30 /dev/usbsda1 -> bus/usb/012/009

/dev/usb:
总用量 0
drwxr-xr-x  2 root root     60 11月  7 15:14 ./
drwxr-xr-x 19 root root   4040 11月  7 15:30 ../
crw-------  1 root root 180, 0 11月  7 15:14 hiddev0
```

说明一下参数是怎么设置的：
```
KERNEL=="sd*"      来源目录路径名
KERNELS=="*:0:0:0" 来源目录路径名
ATTRS{scsi_level}=="7" 来源目录下scsi_level文件内容
product、idVendor、idProduct 来源dmesg -wT中内容

root@kylinos0001:/sys/bus/scsi/drivers/sd/9:0:0:0# pwd
/sys/bus/scsi/drivers/sd/9:0:0:0
root@kylinos0001:/sys/bus/scsi/drivers/sd/9:0:0:0# cat max_sectors
2048
root@kylinos0001:/sys/bus/scsi/drivers/sd/9:0:0:0# cat scsi_level
7

[一 11月  7 15:30:56 2022] usb 12-1: new SuperSpeed USB device number 9 using xhci_hcd
[一 11月  7 15:30:56 2022] usb 12-1: New USB device found, idVendor=0951, idProduct=1666
[一 11月  7 15:30:56 2022] usb 12-1: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[一 11月  7 15:30:56 2022] usb 12-1: Product: DataTraveler 3.0
[一 11月  7 15:30:56 2022] usb 12-1: Manufacturer: Kingston
[一 11月  7 15:30:56 2022] usb 12-1: SerialNumber: 1C1B0D6A8ADF21B16954P637
[一 11月  7 15:30:56 2022] usb-storage 12-1:1.0: USB Mass Storage device detected
[一 11月  7 15:30:56 2022] scsi host9: usb-storage 12-1:1.0
[一 11月  7 15:30:57 2022] scsi 9:0:0:0: Direct-Access     Kingston DataTraveler 3.0 1100 PQ: 0 ANSI: 6
[一 11月  7 15:30:57 2022] sd 9:0:0:0: Attached scsi generic sg0 type 0
[一 11月  7 15:30:57 2022] sd 9:0:0:0: [sda] 60463659 512-byte logical blocks: (31.0 GB/28.8 GiB)
[一 11月  7 15:30:57 2022] sd 9:0:0:0: [sda] Write Protect is off
[一 11月  7 15:30:57 2022] sd 9:0:0:0: [sda] Mode Sense: 43 00 00 00
[一 11月  7 15:30:57 2022] sd 9:0:0:0: [sda] Write cache: enabled, read cache: enabled, doesn't support DPO or FUA
[一 11月  7 15:30:58 2022]  sda:
[一 11月  7 15:30:58 2022] sd 9:0:0:0: [sda] Attached SCSI removable disk
[一 11月  7 15:30:58 2022] FAT-fs (sda): Volume was not properly unmounted. Some data may be corrupt. Please run fsck.
```

### 5-3、U盘拔插的时候执行脚本
U盘插入的时候执行创建文件脚本
U盘拔出的时候执行删除文件脚本
```/etc/udev/rules.d/79-exec_shell.rules
失败
ACTION=="add",KERNELS=="*:0:0:0",ATTRS{idVendor}=="0dd8",ATTRS{idProduct}=="2300",RUN+="/home/admin/create_file.sh"
ACTION=="remove",KERNELS=="*:0:0:0",ATTRS{idVendor}=="0dd8",ATTRS{idProduct}=="2300",RUN+="/home/admin/delete_file.sh"

失败
ACTION=="add",SUBSYSTEM=="usb",ENV{ID_VENDOR_ID}=="0dd8",ENV{ID_MODEL_ID}=="2300",RUN+="/home/admin/create_file.sh"
ACTION=="remove",SUBSYSTEM=="usb",ENV{ID_VENDOR_ID}=="0dd8",ENV{ID_MODEL_ID}=="2300",RUN+="/home/admin/delete_file.sh"

成功
ACTION=="add",SUBSYSTEM=="usb",ENV{PRODUCT}=="dd8/2300/100",RUN+="/home/admin/create_file.sh"
ACTION=="remove",SUBSYSTEM=="usb",ENV{PRODUCT}=="dd8/2300/100",RUN+="/home/admin/delete_file.sh"
```

```/root/create_file.sh
#!/bin/bash
#
# 文 件 名: create_file.sh
# 文件描述: 创建一个文件
# 作    者: HanKin
# 创建日期: 2022.11.09
# 修改日期：2022.11.09
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#

touch /home/admin/test.txt
```

```/root/delete_file.sh
#!/bin/bash
#
# 文 件 名: delete_file.sh
# 文件描述: 删除一个文件
# 作    者: HanKin
# 创建日期: 2022.11.09
# 修改日期：2022.11.09
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#

rm -rf /home/admin/test.txt
```

## 6、获取插入设备的VPID
```
成功
ACTION=="add", SUBSYSTEM=="usb", ATTRS{bInterfaceClass}=="08", RUN+="/home/admin/create_file.sh"

失败
ACTION=="remove", SUBSYSTEM=="usb", ATTRS{bInterfaceClass}=="08", RUN+="/home/admin/delete_file.sh"
```

使用命令udevadm monitor --property分析：
```
UDEV  [74953.640940] remove   /devices/pci0000:00/0000:00:18.7/usb1/1-4/1-4:1.0 (usb)
ACTION=remove
DEVPATH=/devices/pci0000:00/0000:00:18.7/usb1/1-4/1-4:1.0
SUBSYSTEM=usb
DEVTYPE=usb_interface
PRODUCT=dd8/2300/100
TYPE=0/0/0
INTERFACE=8/6/80
MODALIAS=usb:v0DD8p2300d0100dc00dsc00dp00ic08isc06ip50in00
SEQNUM=21697
USEC_INITIALIZED=74921486460
ID_PATH=pci-0000:00:18.7-usb-0:4:1.0
ID_PATH_TAG=pci-0000_00_18_7-usb-0_4_1_0

UDEV  [74980.348190] add      /devices/pci0000:00/0000:00:18.7/usb1/1-4/1-4:1.0 (usb)
ACTION=add
DEVPATH=/devices/pci0000:00/0000:00:18.7/usb1/1-4/1-4:1.0
SUBSYSTEM=usb
DEVTYPE=usb_interface
PRODUCT=dd8/2300/100
TYPE=0/0/0
INTERFACE=8/6/80
MODALIAS=usb:v0DD8p2300d0100dc00dsc00dp00ic08isc06ip50in00
SEQNUM=21731
USEC_INITIALIZED=74980333853
ID_VENDOR_FROM_DATABASE=Netac Technology Co., Ltd
ID_PATH=pci-0000:00:18.7-usb-0:4:1.0
ID_PATH_TAG=pci-0000_00_18_7-usb-0_4_1_0
DRIVER=usb-storage
```

则获取VPID可以尝试使用脚本：
```/etc/udev/rules/03-get_udev_vpid.rules
ACTION=="add", SUBSYSTEM=="usb", ATTRS{bInterfaceClass}=="08", RUN+="/home/admin/get_udev_vpid.sh $product"
```

```/home/admin/get_udev_vpid.sh
#!/bin/bash
#
# 文 件 名: get_udev_vpid.sh
# 文件描述: 获取插入设备的VPID
# 作    者: HanKin
# 创建日期: 2022.11.09
# 修改日期：2022.11.09
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#

product=$1
echo ${product} > /home/admin/vpid.txt
```

找了很久才发现，udevadm info -ap /devices/pci0000:00/0000:00:18.7/usb1/1-4/1-4:1.0/host2/target2:0:0/2:0:0:0/block/sda。
可以使用bInterfaceClass属性，原来是我在前面把属性限制死了，导致查找的块没有idProduct属性值，修改之后就可以了。
```
#!/bin/bash
#
# 文 件 名: get_udev_vpid.sh
# 文件描述: 获取插入设备的VPID
# 作    者: HanKin
# 创建日期: 2022.11.09
# 修改日期：2022.11.09
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#

idVendor=$1
idProduct=$2
echo -e "idVendor = ${idVendor} \nidProduct = ${idProduct}" > /home/admin/vpid.txt

ACTION=="add", SUBSYSTEM=="usb", DRIVERS=="usb", RUN+="/home/admin/get_udev_vpid.sh %s{idVendor} $sysfs{idProduct}"
```

