# FAT32

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