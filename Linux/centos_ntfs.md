# centos默认不支持ntfs文件系统

## 1、不支持ntfs
centOS默认源里没有ntfs3g，想要添加ntfs支持，无非是自己下载编译安装或者加源yum安装。

1、加源

wget -O /etc/yum.repos.d/epel.repo http://mirrors.aliyun.com/repo/epel-7.repo

2、安装

yum update;
sudo yum install ntfs-3g

## 2、不支持exfat
1、Install the nux repo for CentOS 7
yum install -y http://li.nux.ro/download/nux/dextop/el7/x86_64/nux-dextop-release-0-5.el7.nux.noarch.rpm

2、yum install exfat-utils fuse-exfat
装这两包
3.lsblk 查看硬盘位置

4.挂载
mkdir sdb
mount -t exfat /dev/sdb1 sdb

## 3、FAT16格式
U盘上面格式化一般会有NTFS、FAT、FAT32、EXFAT。

FAT16即FAT，最大只能支持2G的U盘，但是部分会有2G-4G。

FAT(File Allocation Table)是“文件分配表”的意思。顾名思义，就是用来记录文件所在位置的表格，它对于硬盘的使用是非常重要的，假若丢失文件分配表，那么硬盘上的数据就会因无法定位而不能使用了。不同的操作系统所使用的文件系统不尽相同，在个人计算机上常用的操作系统中，MS-DOS 6.x及以下版本使用FAT16。操作系统根据表现整个磁盘空间所需要的簇数量来确定使用多大的FAT。所谓簇就是磁盘空间的配置单位，就象图书馆内一格一格的书架一样。FAT16使用了16位的空间来表示每个扇区(Sector)配置文件的情形，故称之为FAT16。

https://baike.baidu.com/item/FAT16/5136658?fr=aladdin

注意：Microsoft Windows NT 也支持 FAT 驱动器。Windows NT 3.51支持最大 4 GB 大小的 FAT 驱动器。MS-DOS 或 Windows 不支持 2 GB 至 4 GB 大小的 FAT 驱动器。换句话说，如果希望从 MS-DOS 或 Windows 95/98 以及 Windows NT 都能访问 FAT 驱动器，那么 FAT 驱动器不能够大于 2 GB。如果只从 Windows NT 上访问 FAT 驱动器，则驱动器大小可以在 2 GB 到 4 GB 之间。

## 4、Centos 安装后没有图形化操作界面 解决方案
```
在命令行执行以下命令;（注意配置yum源）

1.yum groupinstall "X Window System" -y
2.yum groupinstall "Desktop" -y
3.启动图形化程序startx
```

这个的前提是需要安装图形化界面：
输入“vi /etc/inittab”编辑此文件
输入“systemctl get-default”可查看当前启动界面，本例中显示“graphical.target”（图形界面）
输入“systemctl set-default multi-user.target”并按回车键即可设置为默认以文本界面启动

最终的原因是：在安装过程中未安装图形化界面。
在一个叫做SOFTWARE选项中。


