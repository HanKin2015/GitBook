# USB3.0

## 1、win7默认无USB3.0主控驱动
百度amd ven 1022 7814下载了两个驱动（不好用）：
https://wwe.lanzouo.com/b01p0mlje
密码:7thy

忽然想起，驱动精灵已开启收费模式，下载速度慢的跟狗一样，所以推荐选择360驱动大师。神！！！
瞬间秒解决USB3.0主控驱动问题，通用串行USB控制器感叹号就是因为USB3.0主控驱动没有安装导致。

对于无网卡驱动，不清楚360驱动大师有没有网卡版本。

另外发现驱动人生7.1版本也是不好用，安装USB3.0主控失败，并且也没有其他驱动版本可供选择，但是360驱动大师就是不一样，有各种各样的版本供安装。

注意有架构的区分：
AMD USB 3.0 Host Controller版本最新是1.1.0.0249（20170505）
Advanced Micro Devices, INC.
amdhub30.sys  amdxhc.sys

Intel(R) Corporation版本最新是5.0.4.24（20170505）
iusb3xhc.sys

Microsoft Corporation版本
USBHUB3.sys  USBXHCI.SYS  

装完后还有AMD USB 3.0 Root Hub版本最新是1.1.0.0249（20170505）

## 2、USB3.0为什么要叫USB3.1 Gen1 
USB 3.1 Gen1就是USB 3.0。而USB 3.1 Gen2才是真正的USB3.1。USB 2.0的最大传输带宽为480Mbps（即60MB/s），USB 3.0（即USB 3.1 Gen1）的最大传输带宽为5.0Gbps（625MB/s），USB 3.1 Gen2的最大传输带宽为10.0Gbps。

虽然USB 3.1标称的接口理论速率是10Gbps，但是其还保留了部分带宽用以支持其他功能，因此其实际的有效带宽大约为7.2Gbps。USB 2.0为四针接口，USB 3.0和USB 3.1为九针接口。


USB3.2 Gen1（SuperSpeed USB） = USB3.1 Gen1 = USB 3.0 : (625MB/s)
USB3.2 Gen2（SuperSpeed USB 10Gbps） = USB3.1 Gen2 : (1250MB/s)
USB 3.2 Gen 2（SuperSpeed USB 20Gbps） = USB 3.1 Gen 2 x 2 = USB4 20 : (2500MB/s)
USB4 40 = 雷电3 = 雷电4 : 40Gbps (5000MB/s)

![USB家族](https://pic2.zhimg.com/v2-4468b539cd2f238b85acab3ae130b1ea_r.jpg?source=1940ef5c)

## 3、正确识别USB3.0接口
USB3.0接口一定是蓝色的吗？

答案是否定的。

USB3.0规范中并没有规定接口必须使用什么颜色，使用蓝色或其他颜色只是为了更直观的和2.0接口作区分，突出产品特点（或卖点）。因此不能直接简单地以蓝色接口来区分USB3.0。

联想电脑中，USB3.0除了蓝色的，也可能是红色（或桔红色）或者黑色（和USB2.0一样）。

## 4、USB3.X、USB4与雷电4的区别


