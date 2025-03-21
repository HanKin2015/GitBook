# FAT32

友情链接：
D:\Github\Storage\c++\udev\bulk_only\README.md
D:\Github\GitBook\gitbook\USBDevice\bulk.md

## 1、磁盘文件系统格式

### 1-1、**FAT32**
大多说用户使用的U盘格式都是FAT32格式，因为它的兼容性相对好一些，几乎可以完美应对所有操作系统，并且快速的进行读写工作。但是它的缺点是不能设置权限，安全等级较低。并且最关键的一点就是它最高只能支持4G以下的单个文件传输。随着文件越来越大，一个高清的电影就已经达到了好几个G的大小，相比之下FAT32已经属于落后“产品”。

### 1-2、**NTFS**
目前来说，NTFS格式的U盘或者硬盘来说，都是使用最广泛的一种。相比之下我们可以对此格式的U盘进行设置权限，并且可以做出FAT32不能实现的功能。在互换性和实用性来说，NTFS远高于FAT32。并且在支持文件上最大可以拓展为256TB。看清楚，是256TB！只要是U盘或者硬盘能放得下的文件几乎可以读写。小编使用的U盘PE中也是使用NTFS格式，存储和读写方便快捷。刷系统分区时建议使用NTFS类型。

### 1-3、**exFAT**
最后这类也可以说是FAT64，从ID上看也是能看出，是FAT32的升级版。主要目的就是为了解决FAT32不能存储单个文件高于4G的问题。最大支持256GB拓展。并且在WIN和MAC均可使用，跨平台能力十分出众，也是微软为了闪存设备特地设计的文件系统。作为U盘等移动设备是最好的选择之一。

### 1-4、**最后总结**
以上三种格式的选择相信大家都已经有了一定的认识。主要是用的就是NTFS和FAT64两种。机械硬盘和固态硬盘使用NTFS较为合适，存储能力强和通用性好。而作为移动端，U盘或者移动硬盘等设备使用FAT64较为合适，读写速度相对较快。

## 2、FAT32详解

### 2-1、简介
FAT是文件分配表(File Allocation table)的缩写，FAT32指的是文件分配表是采用32位二进制数记录管理的磁盘文件管理方式，因FAT类文件系统的核心是文件分配表，命名由此得来。FAT32是从FAT和FAT16发展而来的，优点是稳定性和兼容性好，能充分兼容Win 9X及以前版本，且维护方便。缺点是安全性差，且最大只能支持32GB分区，单个文件也只能支持最大4GB。

FAT32是分区格式的一种。这种格式采用32位的文件分配表，使其对磁盘的管理能力大大增强，突破了FAT16对每一个分区的容量只有2 GB的限制。由于现在的硬盘生产成本下降，其容量越来越大，运用FAT32的分区格式后，我们可以将一个大硬盘定义成一个分区而不必分为几个分区使用，大大方便了对磁盘的管理。但由于FAT32分区内无法存放大于4GB的单个文件，且性能不佳，易产生磁盘碎片。目前已被性能更优异的NTFS分区格式所取代。

2^32B=2^12x2^10x2^10B=2^22KB=2^12MB=2^2GB=4GB
同理FAT16就是2GB。

### 2-2、磁盘结构
当使用FAT32文件系统管理硬盘时，能够支持的每个分区容量最大可达到128TB。对于使用FAT32文件系统的每个逻辑盘内部空间又可划分为三部分，依次是引导区（BOOT区）、文件分配表区（FAT区）、数据区（DATA区）。引导区和文件分配表区又合称为系统区，占据整个逻辑盘前端很小的空间，存放有关管理信息。数据区才是逻辑盘用来存放文件内容的区域，该区域以簇为分配单位来使用。

Windows的文件系统在每个硬盘都使用一个被称为文件分配表（FAT）的专用扇区来储存跟踪全部文件位置所需的数据。
由于微软公司并不对外公开Windows操作系统的内部结构和源代码，人们无法直接了解FAT32文件系统的工作原理和技术特点。

http://t.zoukankan.com/warren-wong-p-3977685.html
FAT32文件系统的布局非常简单。第一个扇区总是卷ID（Volume ID）。在中和卷ID之后总是跟着一些未被使用的保留扇区（reserved sectors）。在保留扇区后面是两个FAT（File Allocation Table，文件分配表）。剩下的区域被文件系统以“簇”为单位分配，在最后的簇后面还可能会出现一些未使用的区域。

### 2-3、分区、扇区和磁道
扇区和磁道的区别，磁道就是磁盘上由磁头所读取的一个个同心圆一样的轨迹，而每个磁道会被分成若干弧段，这些被称为扇区，也就是那些弧，是磁盘读写的基本单位。
以上两个概念主要为物理概念，而分区则基本属于逻辑概念，是指你自己根据硬盘容量所进行的逻辑上的区域划分。

磁道（track）数：磁道是从盘片外圈往内圈编号0磁道，1磁道…，靠近主轴的同心圆用于停靠磁头，不存储数据；
扇区（sector）数：每个磁道都被切分成很多扇形区域，每道的扇区数量相同；
基本磁盘分区：主分区，扩展分区（扩展分区可包含多个逻辑分区）

## 3、U盘
FAT32是一种常见的文件系统格式，用于格式化U盘、SD卡等可移动存储设备。以下是FAT32格式的U盘的一些特征：
兼容性好：FAT32格式的U盘可以在Windows、Mac OS、Linux等多个操作系统上读写，因此具有很好的兼容性。
文件大小限制：FAT32格式的U盘最大支持单个文件大小为4GB，如果需要存储大于4GB的单个文件，需要使用其他文件系统格式。
簇大小：FAT32格式的U盘的簇大小通常为4KB，这意味着即使文件大小只有几KB，也会占用整个簇的空间，导致存储空间的浪费。
文件系统结构：FAT32格式的U盘采用FAT表来记录文件的存储位置和状态，因此在存储大量小文件时，可能会出现FAT表过大的问题，导致U盘读写速度变慢。
兼容性问题：FAT32格式的U盘在存储一些特殊文件时，可能会出现兼容性问题，例如存储超过8个字符的文件名、存储某些系统文件等。

## 4、FATFS文件系统详解:关于SD卡、SD nand、spi nor flash等众多flash
https://mp.weixin.qq.com/s/JoVw8QUxo4kT_PF92tZRtw

## 5、NTFS格式

### 5-1、NTFS格式U盘在只读状态文件资源管理器无法打开
报错：介质受写入保护（发现使用DiskGenius软件是可以打开U盘的并能看见文件内容）

只读状态修改方案：对USB存储的拦截靠一个MINIFILTER驱动，最终方案U盘读写权限其实是在投递scsi command的MODE_SENSE6指令来获取的。只需要我们能解析出
MODE_SENSE6的指令，修改它的返回值 ，即可以产生写保护的功能(U盘只读功能)。DEVICE-SPECIFIC PARAMETER字段即表示其可读写标记，当为0x80表示其受写保护

复现方式：NTFS格式U盘插入Linux物理机后，通过修改SCSI指令让它变成只读U盘接入windows虚拟机就会出现此现象

大体原因：估计跟Linux物理机Write(10)指令写入了大量的数据，导致U盘部分分区数据发生了变化

### 5-2、diskgenius软件
官网：https://www.diskgenius.cn/
尽量下载专业版，能修改分区表数据。

属性中AR表示Read-Only，可读写为A属性或者为空。
一个U盘以一个MBR分区表和多个分区组成，MBR分区表包含了U盘总体属性，名称大体为RD2:KingstonDataTraveler3.0(20GB)
每个分区有一个起始扇区号，因此在跳转扇区的时候，选择跳转范围很重要，如果以子分区跳转，则0扇区则为起始扇区号，如果以MBR分区表跳转，则是整个U盘扇区从0开始

### 5-3、分区表科普知识
检查并修复U盘的文件系统错误：chkdsk X: /f

NTFS-3G 是一个允许 Linux 系统读写 NTFS 文件系统的驱动程序。NTFS（New Technology File System）是 Windows 的主要文件系统，具有较高的性能和安全性。然而，由于 NTFS 的复杂性和专利保护，Linux 系统默认情况下无法完全支持 NTFS 文件系统。NTFS-3G 的出现解决了这一问题，使得 Linux 用户能够方便地读写 NTFS 格式的分区。
[为什么linux内核只能支持ntfs只读?](https://www.zhihu.com/question/21885351)
[NTFS-3G 与 Windows NTFS 文件系统的兼容性分析](https://my.oschina.net/emacs_8660624/blog/16912335)
```
sudo apt-get install ntfs-3g
sudo mount -t ntfs-3g /dev/sdX /mnt/ntfs
sudo mount -t ntfs-3g -o ro /dev/sdX /mnt/ntfs  设置分区为只读
sudo mount -t ntfs-3g -o rw /dev/sdX /mnt/ntfs  设置分区为可写
sudo ntfsfix /dev/sdX   使用 ntfsfix 工具修复分区
sudo ntfsinfo /dev/sdXn
```

wireshark软件抓取的USB数据包：
501	18.512710	host	1.14.2	USBMS	58	SCSI: Write(10) LUN: 0x00 (LBA: 0x005ebcb8, Len: 8)
503	18.512730	host	1.14.2	USBMS	4123	SCSI: Data Out LUN: 0x00 (Write(10) Request Data) 
506	18.537869	1.14.1	host	USBMS	40	SCSI: Response LUN: 0x00 (Write(10)) (Good)
第一条是CBW指令，windows系统驱动告诉U盘设备的1.14.2端口地址0x02(OUT端点)我要下发Write(10)指令了
第二条是DATA数据
第三条是CSW指令，U盘设备的1.14.1端口地址0x81(IN端点)告诉windows系统驱动完成状态

LBA: 0x005ebcb8表示逻辑块，即扇区地址，即U盘的第LBA: 0x005ebcb8个扇区开始向后写入8个扇区数据，U盘扇区大小一般为512字节，即写入4096个字节，URB包装占27字节，总的合起来4123字节。

### 5-3、使用dd命令读取分区数据
读取LBA为0扇区的数据（结合DiskGenius软件验证是否正常读取）：
dd if=/dev/sdb of=output.img bs=512 count=1 skip=0
dd if=/dev/sdb1 of=output.img bs=512 count=1 skip=0

读取LBA为6208696扇区的数据（注意wireshark软件抓取的数据是以MBR分区表计算的LBA地址）：
dd if=/dev/sdb of=output.img bs=512 count=1 skip=6208696

写入到 U 盘的 LBA 为 6208696 的扇区：
dd if=data.bin of=/dev/sdb bs=512 count=2048 seek=6208696

写入数据文件data.bin说明：
写入的数据为ASCII字符，即wireshark最右边翻译成字符的数据，因此data.bin文件内容应为这个数据，使用Notepad++统计字符length为272388，则除以512大约等于532个扇区，因此数据长度不足，即使dd命令指定写入数据为512x2048，但是实际只能写入到6209228扇区。
6208696+2048=6210744
6208696+532=6209228

对于ASCII数据0xFF和0x00在wireshark都表现为.字符，但是通过DiskGenius软件查看0x00表现为.字符，而0xFF则表现为ÿ字符。因此需要在wireshark上面复制数据为as Printable Text即可，发现修改后使用DiskGenius软件查看数据也是不对的，最终还是选择使用dd命令读取512x8个字节数据保存成data.bin数据。
另外0x00读取出现的字符使用vim命令查看是.字符，而0xFF则是空白字符，并不代表读取失败哦！

最终测试发现在6208696扇区开始写入8个扇区数据后U盘使用正常。
备注：如果U盘未正常挂载（fdisk -l命令看不见U盘设备），则写入数据最终是失败的。

探究是否可以写入一个扇区，答案是不行的，U盘还是异常状态，但是报错变成了请将磁盘插入“U 盘（E:）”。

### 5-4、使用c语言读取分区数据
/dev/sg0 是 Linux 系统中的一个设备文件，表示 SCSI 通用设备（SCSI Generic device）。它通常用于与 SCSI 设备（如硬盘、光驱、磁带机等）进行低级别的交互。
备注：当插入一个U盘时，系统中就会增加一个/dev/sg1设备文件。可以使用 sg_map 命令查看系统中所有 SCSI 设备及其对应的 /dev/sg 设备文件。


### 5-5、fdisk -l命令看不见U盘设备
使用dmesg -wT命令能看见U盘插入正常信息，lsusb命令也能正常查看U盘信息，使用ls /dev/sd*也能看见设备文件。

sudo fdisk -l /dev/sdb 确认 U 盘的分区：
```
root@hankin:/home# fdisk -l /dev/sdb
Disk /dev/sdb: 3 GiB, 3178869760 bytes, 6208730 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

root@hankin:/home# fdisk -l /dev/sdb1
Disk /dev/sdb1: 28.9 GiB, 31028412416 bytes, 60602368 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x73736572

Device      Boot      Start        End    Sectors   Size Id Type
/dev/sdb1p1      1920221984 3736432267 1816210284   866G 72 unknown
/dev/sdb1p2      1936028192 3889681299 1953653108 931.6G 6c unknown
/dev/sdb1p3               0          0          0     0B  0 Empty
/dev/sdb1p4        27722122   27722568        447 223.5K  0 Empty

Partition table entries are not in disk order.  # 这意味着分区表中的条目没有按照逻辑顺序排列，这通常是分区表损坏的一个迹象
```
发现跟这个可能无关，我使用另外一个U盘查看/dev/sb1设备文件显示一样的信息，发现异常U盘在Linux系统重启之后是正常挂载的，可能是Linux系统出现了问题。
```
异常状态：
root@hankin:~# ll /dev/sd* -h
brw-rw---- 1 root disk 8,  0 Mar 17 11:40 /dev/sda
brw-rw---- 1 root disk 8,  1 Mar 17 11:40 /dev/sda1
brw-rw---- 1 root disk 8,  2 Mar 17 11:40 /dev/sda2
brw-rw---- 1 root disk 8,  3 Mar 17 11:40 /dev/sda3
-rw-r--r-- 1 root root  3.0G Mar 17 16:15 /dev/sdb
brw-rw---- 1 root disk 8, 17 Mar 17 16:16 /dev/sdb1

root@hankin:~# fdisk -l /dev/sdb
Disk /dev/sdb: 3 GiB, 3178853376 bytes, 6208698 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

正常状态：
root@hankin:~# ll /dev/sd*
brw-rw---- 1 root disk 8,  0 Mar 17  2025 /dev/sda
brw-rw---- 1 root disk 8,  1 Mar 17  2025 /dev/sda1
brw-rw---- 1 root disk 8,  2 Mar 17  2025 /dev/sda2
brw-rw---- 1 root disk 8,  3 Mar 17  2025 /dev/sda3
brw-rw---- 1 root disk 8, 16 Mar 17 16:22 /dev/sdb
brw-rw---- 1 root disk 8, 17 Mar 17 16:22 /dev/sdb1
root@hankin:~# fdisk -l /dev/sdb
Disk /dev/sdb: 28.9 GiB, 31029460992 bytes, 60604416 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x42c9bb0b

Device     Boot Start      End  Sectors  Size Id Type
/dev/sdb1  *     2048 60604415 60602368 28.9G  7 HPFS/NTFS/exFAT
```

另外一个U盘信息：
```
root@hankin:~# fdisk -l /dev/sdb
Disk /dev/sdb: 7.3 GiB, 7801405440 bytes, 15237120 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xe4d62e47

Device     Boot    Start      End  Sectors  Size Id Type
/dev/sdb1  *     1654784 14315519 12660736    6G  7 HPFS/NTFS/exFAT
/dev/sdb2       14315520 15233022   917503  448M 1b Hidden W95 FAT32

root@hankin:~# fdisk -l /dev/sdb1
Disk /dev/sdb1: 6 GiB, 6482296832 bytes, 12660736 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x73736572

Device      Boot      Start        End    Sectors   Size Id Type
/dev/sdb1p1      1920221984 3736432267 1816210284   866G 72 unknown
/dev/sdb1p2      1936028192 3889681299 1953653108 931.6G 6c unknown
/dev/sdb1p3               0          0          0     0B  0 Empty
/dev/sdb1p4        27722122   27722568        447 223.5K  0 Empty

Partition table entries are not in disk order.
```

sudo fdisk /dev/sdb 创建分区
sudo mkfs.ext4 /dev/sdb1 格式化分区
sudo mkfs.vfat /dev/sdb1 格式化为 FAT32 格式

修复分区表：
sudo gdisk /dev/sdb 
sudo parted /dev/sdb
(parted) mklabel msdos

挂载 U 盘：
sudo mkdir /mnt/myusb
sudo mount /dev/sdb1 /mnt/myusb

读取和写入数据：
sudo dd if=input_file of=/dev/sdb1 bs=512 count=1

### 5-7、检查 U 盘的健康状态
使用 smartctl 工具检查 U 盘的健康状态（安装失败因此没有测试）：
```
sudo apt-get install smartmontools
sudo smartctl -a /dev/sdb
```
