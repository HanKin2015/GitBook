# wireshark

## 1、基础知识
UART或者Universal Asynchronous Receiver/Transmitter。这种方式下，设备只是简单的将USB用于接受和发射数据，除此之外就再没有其他通讯功能了。

HID是人性化的接口。这一类通讯适用于交互式，有这种功能的设备有：键盘，鼠标，游戏手柄和数字显示设备。

最后是USB Memory，或者说是数据存储。External HDD, thumb drive / flash drive,等都是这一类的。

其中使用的最广的不是USB HID 就是USB Memory了。

每一个USB设备（尤其是HID或者Memory）都有一个供应商ID（Vendor Id）和产品识别码（Product Id）。Vendor Id是用来标记哪个厂商生产了这个USB设备。Product Id用来标记不同的产品，他并不是一个特殊的数字，当然最好不同。
 
 
数据包的各个字段进行解释。

No:代表数据包标号。
Time：在软件启动的多长时间内抓到。
Source：来源ip。
Destination: 目的ip。
Protocol：协议。
Length:数据包长度。
info：数据包信息。

## 2、wireshark长时间抓包分多个文件
一般使用wireshark不需要长时间抓包的，但是有时候遇到网络通信中非常棘手的问题，例如一个小时出现一次或者几个小时出现一次问题的情况，这种情况下就必须长时间抓包了。但是如果在wireshark中开始抓包之后等上几个小时肯定会出问题，因为这个时候抓包的内容都是存放在内存中的，几个小时的数据包，特别是如果涉及到音视频的数据包是很大的，几个小时可能会达到几个G的大小，这种情况下wireshark会内存溢出，程序直接异常。

这个时候就需要使用wireshark提供的自动分文件存储的功能了。

捕获-》选项-》输出     设置自动创建文件，并且设置文件名头部
捕获-》选项-》输出     开启使用环形缓冲器

https://www.cnblogs.com/wangqiguo/p/5068602.html

## 3、使用wireshark抓取USB数据包
安装wireshark时需要点击安装USBPcap。

可以在安装文件夹中查看USB设备在哪条线上，‪C:\Program Files\USBPcap\USBPcapCMD.exe。可以使用命令抓取，选择序列号，然后输入文件名即可。








