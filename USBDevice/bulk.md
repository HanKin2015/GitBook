# USB Mass Storage大容量存储的基本知识
参考：http://t.zoukankan.com/shangdawei-p-3133526.html
其他：D:\Github\Storage\udev\bulk_only

友情链接：
D:\Github\Storage\c++\udev\bulk_only\README.md
D:\Github\GitBook\gitbook\USBDevice\FAT32.md

## 1、LBA(logical block address)
存储类设备可以看做一个个固定大小逻辑块，我们可以对其每一个逻辑块进行编号方便进行寻址定位。
第一个逻辑块的 LBA 为 0，最后一块逻辑块的 LBA 为 n1，其中 n 为逻辑块的总数。一般而言，逻辑块又称之为扇区。逻辑块的大小一般为 512 字节。

## 2、数据传输方向
Host, 主机，一般指拥有主控的物理机器。Device，指普通的 USB 设备。数据的传输方向，以主机为主。即
- 数据从设备传输到主机，我们称之为 Datain;
- 数据从主机传输到设备，我们称之为 Dataout;

## 3、Command Block Wrapper (CBW)
包含命令块的 USB 报文，固定长度为 31 字节，一些读写命令操作都封装成 CBW 发送给设备，结构如下：
![](http://images0.cnblogs.com/blog/268182/201306/13100353-70e0663726254ee2bb6f917b54a1572b.jpg)

## 4、Command Status Wrapper (CSW)
包含命令块的执行状态，固定长度 13 字节。可以用来表示上一个 CBW 中的命令是否被正常执行。
![](http://images0.cnblogs.com/blog/268182/201306/13100604-83c7e71311054c478d9bef1b10ac0c59.jpg)

## 5、READ(10) 指令
LOGICAL BLOCK ADDRESS 表示起始扇区号，TRANSFER LENGTH 表示要连续读取的扇区数目。
整个 READ(10) 指令的意思是，从 LOGICAL BLOCK ADDRESS 扇区连续读取 TRANSFER LENGTH个扇区，从设备发送给主控。

## 6、READ CAPACITY (10) 指令
表示主控请求获取 USB 设备的容量信息，设备返回最后一个逻辑块的 LBA 和每个逻辑块的大小。

## 7、FAT（文件分配表）
FAT（文件分配表）是位于磁盘0扇区上的一个特殊的文件，它包含了磁盘上的文件的大小以及文件存放的簇的位置等信息。
FAT即File Allocation Table，文件分配表。

## 8、USB MSC Control/Bulk/Interrupt (CBI) Transport
我们所关注的U盘，就是所谓的MSC设备，大容量存储设备。

U盘的功能，就是数据存储。而对应的数据传输，用的是USB中的Bulk Transfer。而Control Transfer是用来发送Class-Specific的信息和Clear Stall。而其他方面的信息交换，是用Bulk-only协议。

而对于CBI，算是Bulk-only的替代品，也可以用来信息交换，
但是只能用于，full-speed的软盘（Floppy drive），也不推荐将CBI用于其它新出的MSC设备上。
对于普通U盘的内部结构，则是一个USB物理接口，加上对应的控制芯片（微控制器（含Nand Flash的控制器）+ USB设备控制器）和一个Nand Flash芯片。

USB MSC Control/Bulk/Interrupt (CBI) 主要用于Floppy设备，对于我们关心的U盘，用不到，不需要太关心，可以忽略之。

## 9、USB MSC Bulk-Only (BBB) Transport
如上所述，Bulk-only是USB设备端，此处的U盘和USB Host端，即普通PC，之间信息交换的协议。
Bulk Only Transport，也被简称为BOT。

USB MSC中的Bulk-Only 常被叫做BBB，是相对于前面所说的CBI来说的。
看起来，USB MSC的CBI，是Control/Bulk/Interrupt的简写。

和CBI中的用三种不同的端点来传送三种类型的信息，而不同的是，Bulk-only传送这些全部的信息，都只用Bulk端点。

即用Bulk端点来传送命令块，数据，状态，因此，才类似于Control/Bulk/Interrupt被简称为CBI一样，而Bulk/Bulk/Bulk被简称为BBB。 

USB MSC传输协议分CBI和BOT，而BOT又称为BBB。

## 10、USB MSC UFI Command Specification
UFI，即Universal Floppy Interface，因此看名字就知道，是关于软盘的。

此USB MSC UFI规范，定义了UFI命令集合（Command Set），设计出来此规范，就是用于软盘的。此UFI命令集合，是基于SCSI-2 和SFF-8070i命令集合的。

U盘是USB Flash Memory类型的，不是Floppy Disk类型的，所以，此处也可以不关心，暂忽略之。

## 11、USB MSC USB Attached SCSI Protocol (UASP)
“Attached”顾名思义，是附在某个上面的，此处即附在SCSI协议的上面的，即SCSI协议的补充部分。
UASP是作为USB3.0标准的一部分引入的，但如果使用兼容的硬件、固件和驱动程序，也可以与符合较慢 USB 2.0 标准的设备一起使用。
尽管 UAS 已添加到USB 3.0标准中，但如果硬件兼容，也可以在 USB 2.0 速度下使用。

https://www.leixue.com/ask/what-is-uasp
https://www.usbzh.com/article/detail-818.html

BOT加速模式虽然可以有效的增加传输速度，不过还是没有在根本上解决无法多工处理的问题，所以USB-IF (USB Implementers Forum) 一个为开发USB 规格的企业共同成立的非营利性机构，为了让传输效能更好，制定了UASP（USB Attached SCSI Protocol）传输架构，让USB3.0 也能像SCSI 传输协定的方式传输资料，不需等待上一笔资料传输完成后再进行传输资料的动作，并改善了在CPU 的使用率、数据延迟及等待时间。

原先的BOT（Bulk Only Transport），虽然协议简单已实现，适合用于大容量存储设备中，但其就像一个单线程，不能同时并行执行多个传输。
即，对于BOT，每一个由Host发起数据传输（transaction），都必须等待设备完成，然后设备再返回对应的已完成状态信息，然后才能开始下一次数据传输。这样的话，对于整个数据传输过程的话，就造成了一个很大（大概有20%）的浪费（overhead）。

而对于USB 3.0来说，速度从USB 2.0的480Mb/s变成了 5.0Gb/s，而如果继续用BOT的话，那么相对来说CPU性能的利用率很低，USB传输速度也不太高，例如，有研究表明，2.4 GHz Core Duo™的CPU，利用率只要大概12%，CPU传输速度只有大约250MB/s，而USB 3.0的理论速度是5.0Gb/s=640MB/s，即还不到理论最大速度的一半。

因此，才有了这个UASP，对于SCSI协议进行了补充，以提高USB 2.0的USB总线利用率，和充分利用USB 3.0的全双工能力，可以使得传输速度达到大约400MB/s。此新的协议UASP的实现，也需要对应的新的Host端的软件，新的Device端的固件（Firmware）。

为了实现设备的向后兼容性，Device同时支持BOT和UAS。
而此UASP规范，定义了就是如何在USB 2.0和USB 3.0上实现对应的UAS协议。

当Host和Device都实现了此UAS协议的话，那么Host将通过Host端的SCSI Software Stack去访问Device，而USB的Interface也将从功能上看，变成Host Stack中的另外一个SCSI Host Adapter。Device需要实现SAM4的架构模型，这样Host也就可以查询（Queue）Device中的命令了，以及对应性能的提升。

为了克服旧的BOT协议的总线利用率不高的缺点，所以定义了新的UAS协议，即UASP，来提升USB的传输效率，提升USB速度。

## 12、USB MSC的各个协议之间关系总结
全称USB Mass Storage Class。

- 最需要关心的是BOT，即Host和Device间数据通讯的协议
★★★ ②USB Mass Storage Class Bulk-Only (BBB) Transport

- 其次，需要关心USB Device内部和数据存储介质之间通信的协议
★★ SCSI - Small Computer System Interface

- 最后，对于，如果要实现更好的性能，那么需要关心BOT的升级版
★⑦USB Mass Storage Class USB Attached SCSI Protocol (UASP)

## 13、U盘与USB中的Class，Subclass和Protocol的对应关系
bInterfaceClass=0x08=Mass Storage Class就是USB Mass Storage Class
bInterfaceSubClass=0x06=SCSI Transparent Subclass
bInterfaceProtocol=0x50=Bulk Only Transport Protocol

Mass Storage设备所使用的SCSI命令集
0x00    TestUnitReady
0x03    RequestSense
0x12    Inquiry
0x1A    ModeSense6
0x1B    StartStop
0x1E    MediumRemoval
0x23    ReadFormatCapacity
0x25    ReadCapacity
0x28    Read(10)
0x2A    Write(10)
0x2F    Verify
0x5A    ModeSense10

## 14、USB bulk streams
https://www.kernel.org/doc/html/latest/driver-api/usb/bulk-streams.html

USB 3.0 则增加了一种 Bulk Streams 传输模式，USB 2.0 的 Bulk 模式只支持 1 个数据流，而 Bulk Streams 传输模式则可以支持多个数据流，每个数据流被分配一个 Stream ID（SID），每个 SID 与一个主机缓冲区对应。

该协议是针对USB Attached SCSI Protocol Device Class而定的。
bulk streaming协议太复杂，而USB Attached SCSI Protocol相对于USB Mass Storage Device Class也复杂了很多。
造成的结果就是，类似USB-IF提出的USB 2.5 Wireless USB, USB Audio/Video Class一样，USB Attached SCSI Protocol是一个失败的协议，没有人陪你玩，没有市场，没有产品，或者说有几个试水的产品，赚不到钱之后，就默默地消失在历史的尘埃当中了！

复杂是一个方面
USB Attached SCSI Protocol是针对于机械硬盘应用而产生的，减少磁头在轨道间的移动次数。
另外，USB Attached SCSI Protocol是针对数量众多的分散在机械硬盘上不同轨道上的小文件而产生的。
目前，SSD已经渐渐地取代了HDD，所以，USB Attached SCSI Protocol的失败也是历史的必然了。

usbredir库：https://www.spice-space.org/usbredir.html
在系统中完全禁用掉uas：
```
vim  /etc/modprobe.d/blacklist.conf
blacklist uas

为这些设备直接指定使用更基础的 usb-storage 模块作为驱动，同时禁用掉uas 
vim /etc/modprobe.d/disable-uas.conf
options usb-storage quirks=05e3:0610:u,05e3:0626:u,152d:0578:u,1d6b:0001:u,1d6b:0002:u,1d6b:0003:u
sudo update-initramfs -u
sudo reboot

其他机器：
vim /boot/cmdline.txt
usb-storage quirks=05e3:0610:u,05e3:0626:u,152d:0578:u,152d:9561:u,1d6b:0001:u,1d6b:0002:u,1d6b:0003:u
```







