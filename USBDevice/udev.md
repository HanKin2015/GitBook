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






















