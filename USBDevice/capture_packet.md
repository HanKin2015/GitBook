# 数据包抓取工具

参考：https://blog.csdn.net/zcshoucsdn/article/details/81448023
介绍的比较详细，几乎是现在主流的一些抓包工具。

## 1、常用工具的安装
[USB 之三 常用抓包/协议分析工具（Bus Hound、USBlyzer、USBTrace、USB Monitor Pro等）](https://blog.csdn.net/ZCShouCSDN/article/details/81448023/)

### 1-1、winrar
个人一直使用的解压软件。7zip也不错，免费开源。其他不建议：快压、360、winzip、bandizip。

### 1-2、BusHound
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

### 1-3、AMCap-ok.exe
小型摄像头使用软件。设备-选项-预览。

### 1-4、usbmon
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

### 1-5、USBTrace
crack：破裂 、裂缝、优秀的
替换打开的exe执行文件进行破解。
根集线器hub：15个port端口。无论将usb插进那个接口，端口号都是最后一个？？？
capture：捕获、攻占
摄像头时时刻刻在传输数据，就会不停的在抓包。
抓取usb枚举数据包：开启热插拔监听。

---
usbtrace抓包数据更加详细，能看见每个包的大小；但是可能有些包没有抓取到
bus hound抓包数据更加完整，但是内容不是很详细

最新版版本：D:\将要上传到百度网盘\程序员工具箱(已更新待上传)\usb数据包抓取\SysNucleusUSBTracepjbxz.zip

### 1-7、USBlyzer
具备分析功能，需重启计算机
不再更新：最新版2.2

### 1-8、DebugView
https://blog.csdn.net/baidu_37503452/article/details/87599038
https://blog.csdn.net/baidu_37503452/article/details/87598982

## 2、wireshark

### 2-1、wireshark安装包详解
历史版本：https://www.wireshark.org/docs/relnotes/
32位仓库：https://2.na.dl.wireshark.org/win32/all-versions/
64位仓库：https://2.na.dl.wireshark.org/win64/all-versions/
win7支持的最高版本是4.0.17，但是我是32位系统，则最高版本是3.6.24，但是这个版本又需要安装Windows补丁包，因此建议安装3.0.14版本。

4.4.0_x64版本似乎有问题，安装了usbcap但是不显示，使用不了。

### 2-1、安装wireshark
windows系统安装需要勾选安装USBPcap软件，可以在C:\Program Files\USBPcap\USBPcapCMD.exe软件查找当前设备的连接情况。

ubuntu安装wireshark使用，apt install wireshark，设置时勾选是即可。到这一步基本上就能直接使用了，运行命令wireshark即可。

GUI：
出于安全方面的考虑，普通用户不能够打开网卡设备进行抓包，Wireshark不建议用户通过sudo在root权限下运行。
如果没有或者勾选了否，就安装好之后，运行下面命令行，出现上述页面选择“是”即可。
```
dpkg-reconfigure wireshark-common

vim /etc/group
在最后的一行wireshark:x:129:hankin
```

### 2-2、wireshark抓网络数据包
- tcp连接的三次握手：客户端发送连接SYN-》服务端收到回复SYN/ACK-》客户端收到ACK
- tcp断开的四次协商：服务端主动关闭FIN/ACK-》客户端收到ACK=》客户端关闭等待回复FIN/ACK=》服务端收到ACK
- 数据包分片TCP segment of a reassembled PDU (TCP数据包重组的一部分)
- 窗口更新:TCP Window Full/TCP ZeroWindow/TCP Keep-Alive/TCP Womdow Update
- TCP DUP ACK （重复的ACK）
- 乱序（TCP out-of-order）
- 重传（TCP Restransmission ）
- 丢片（TCP previous segment not captured ）

## 3、Bus Hound
phase：阶段、时期
人体学输入设备可以理解为HID设备吗？？？但可以肯定的是HID设备属于人体学输入设备。

一个比较轻量级纯软件工具，软件界面看着就像上一个世纪的风格。官网为http://perisoft.net/index.htm。使用上也不是很麻烦，但是在实际使用中发现，对于某些USB报文无法抓取，这是个硬伤。而且，其也不具备USB协议分析功能。拿到报文后需要自行进行分析。安装后需要重启计算机才可用！
这是一个收费工具，目前不怎么更新了，最新版为 6.01。但是网上放出去了其最新版的注册码。还有个简单的中文使用说明。

## 4、udevadm monitor
Linux下实时监控usb设备的拔插情况。

## 5、tcpdump抓包工具
https://www.cnblogs.com/ggjucheng/archive/2012/01/14/2322659.html

### 5-1、使用tcpdump抓取网络数据包
```
tcpdump -i eth0 host 10.70.55.130 -s 0 -w hj.pcap
```
抓取的文件可以使用wireshark软件打开分析。

```
nohup bash tcpdump_monitor.sh -c "pcapif1 icmp -c 10" -f "/var/log/today" 1>/dev/null 2>&1 &
tcpdump -i eth0 -s0 host 172.22.18.156 -C 100 -W 3 -w ./vdi_server.pcap
循环抓取eth0口，客户端IP为172.22.18.156 的数据包，并按照大小为100M，保留最新3个文件的方式保存到当前目录。
```

### 5-2、使用tcpdump抓取usb数据包
查看流量使用情况：iftop -nNpP
查看usbmon设备：tcpdump -D
抓取usb数据包：tcpdump -i usbmon2 > /tmp/xxxx.pcap
注意一定要使用-w参数输出，否则就会出现后面一系列问题：tcpdump -i usbmon2 -w /tmp/xxxx.pcap

看着是抓取成功了：
```
root@hankin:/tmp# tcpdump -D
1.eth0 [Up, Running]
2.any (Pseudo-device that captures on all interfaces) [Up, Running]
3.lo [Up, Running, Loopback]
4.nflog (Linux netfilter log (NFLOG) interface)
5.nfqueue (Linux netfilter queue (NFQUEUE) interface)
6.usbmon1 (USB bus number 1)
root@hankin:/var/log# tcpdump -i usbmon1 > /tmp/usbmon.pcap
tcpdump: verbose output suppressed, use -v or -vv for full protocol decode
listening on usbmon1, link-type USB_LINUX_MMAPPED (USB with padded Linux header), capture size 262144 bytes
1558 packets captured
1558 packets received by filter
0 packets dropped by kernel
```
`0` 代表所有的USB总线，`1，2` 代表不同USB总线，`t` 代表 `text api`，`u`代表 `binary api`。如果不需要完整的数据，可以通过cat这些文件获得；

但是在Windows系统上打开pcap文件报错：The capture file appears to be damaged or corrupt.(stanag4607: File has 976238906d-byte packet, bigger than maximum of 262144)

使用vim命令查看应该是抓取失败了：
```
21:09:39.398361 CONTROL SUBMIT to 1:19:0
21:09:39.398563 CONTROL COMPLETE from 1:19:0
21:09:39.398599 CONTROL SUBMIT to 1:15:0
21:09:39.399427 CONTROL COMPLETE from 1:15:0
21:09:39.399452 CONTROL SUBMIT to 1:14:0
21:09:39.399677 CONTROL COMPLETE from 1:14:0
21:09:39.399700 CONTROL SUBMIT to 1:3:0
21:09:39.401682 CONTROL COMPLETE from 1:3:0
21:09:39.401725 CONTROL SUBMIT to 1:2:0
21:09:39.401805 CONTROL COMPLETE from 1:2:0
21:09:39.401842 CONTROL SUBMIT to 1:1:0
21:09:39.401857 CONTROL COMPLETE from 1:1:0
21:09:41.649188 INTERRUPT COMPLETE to 1:14:1
21:09:41.649216 INTERRUPT SUBMIT from 1:14:1
21:09:41.651186 INTERRUPT COMPLETE to 1:14:1
```

低版本无法使用tcpdump抓usb数据包，更新tcpdump文件，结果还是不行，原因是命令执行错误:
tcpdump依赖libpcap库，因此需要先编译libpcap库，然后再编译tcpdump，直接configure和make即可。
```
root@hankin:/tmp# ./tcpdump --help
tcpdump version 4.9.2
libpcap version 1.8.1
root@hankin:/tmp# tcpdump --version
tcpdump version 4.6.2
libpcap version 1.6.2
OpenSSL 1.0.1k 8 Jan 2015
```

## 6、USBLzyer2.2
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

## 7、USB Packet Viewer 简介
https://www.usbzh.com/article/detail-768.html

USB Packet Viewer是一款便携式USB协议分析仪，能够捕捉USB通讯的底层数据包以及总线事件。它由USB 数据包抓包设备和配套的协议解析软件组成，能够对 USB 通讯数据进行可视化分析。

## 8、对于数据包返回值-2的思考
有被理解为输超时的情况。但是，这个错误码通常是由USB主机控制器或USB设备驱动程序返回的，用于指示在传输数据时发生了超时错误。
但是这样理解也是有道理的，详情可见：https://www.cnblogs.com/erhu-67786482/p/13456667.html

https://www.kernel.org/doc/Documentation/usb/error-codes.txt
linux-5.13.7/Documentation/driver-api/usb/error-codes.rst
/usr/include/asm-generic/errno-base.h
/usr/include/asm-generic/errno.h






