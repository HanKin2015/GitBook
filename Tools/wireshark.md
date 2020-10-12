# wireshark

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


