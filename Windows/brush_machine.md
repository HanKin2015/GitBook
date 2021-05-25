[TOC]

# 装系统入门

# 1、hp瘦客户机刷机
参考：https://wenku.baidu.com/view/cc573f05a6c30c2259019e54.html


## usbwriter
https://sourceforge.net/projects/usbwriter/

## rufus
http://rufus.ie/

## Ventoy
https://ventoy.net/en/download.html

# 2、刷Windows系统
软碟通UltraISO必备

## 用U盘装系统，进去时只有一个光标
可能是系统文件太大，读取数据慢的表现，多等待一会儿，我等了差不多5分钟成功了。

注：将写入方式选择为“USB-HDD+”，如果不是这个模式，可能导致电脑无法通过U盘正常启动。

## 用软碟通UltraISO刻录Win 10 1909 到U盘，只有1个G左右，安装不了系统
FAT32格式最大支持单个4G的文件文件、但对于文件夹则没有限制（用windows分区FAT32最大只能分32G的分区，使用第三方软件则可以超过32G）。
FAT32是Windows系统硬盘分区格式的一种。这种格式采用32位的文件分配表，由于FAT32分区内无法存放大于4GB的单个文件，且性能不佳，易产生磁盘碎片。目前已被性能更优异的NTFS分区格式所取代。

解决办法：
1、要使用UltraISO9.5.1以上版本。
2、UltraISO界面有格式化选项，先选定NTFS进行格式化（用另外方式格式化成NTFS也可），然后依次选择“启动”--“写入硬盘映像”--“便捷启动”--“便捷写入”，这样可以保持U盘NTFS。


Windows 安装程序有两种模式，BIOS 传统启动和 UEFI 。
UEFI 启动的 Windows 安装程序，系统必须安装在 GPT 上，反则 MBR ，这没什么好说的。
BIOS 传统模式启动需要主引导记录，就是 MBR 硬盘的活动分区。
这个分区上放有启动文件就能被启动。

UEFI 不需要活动分区，只要一个 FAT ~ FAT32 分区上放有启动文件就可以。（因为 NTFS 有专利问题，需要厂商交钱才能支持，所以有部分厂商没交钱的就不支持呗）

安装的时候说磁盘格式不是NTFS格式无法安装，把所有分区删除后新建即可。

## 装系统新方式
直接解压ISO文件就好，然后再拷贝到U盘。

物理机直接打开ISO文件，双击exe文件安装。







