[TOC]
# 磁盘那些事儿
相关命令：lsblk,fdisk,du,df,lspci,mount

# 1、lspci	
查看Linux主机的硬件配备
选项与参数：
-v  ：显示更多的 PCI 接口装置的详细信息
-vv ：比 -v 还要更详细的信息
-n  ：直接观察 PCI 的 ID 而不是厂商名称 

# 2、lsblk
默认是树形方式显示 ，查看系统的磁盘
lsblk -lp	详细信息
lsblk -dp	只显示磁盘

# 3、df -h
基本步骤：
1确认[内核版本](https://www.baidu.com/s?wd=内核版本&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)和系统环境支持ext4 (推荐升至2.6.28以上，lsmod |grep ext4)
2卸载要升级的分区(在线卸不掉则需要进单用户)
3 tune2fs -O has_journal,extents,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize来给分区加入ext4的特性
4 e2fsck -fDC0 /dev/sdb1 –y修复分区错误
5修改fstab中分区格式为ext4，reboot

关键点：
1tune2fs版本要高于1.41 否则不支持ext4的特性
2官方推荐使用2.6.28以上内核才稳定支持ext4
3对在使用的分区如var，一定要先卸载再操作,并且重启之前一定要挨个执行完tune2fs，e2fsck，和vi /boot/f000000stab的修改，再重启，否则挂载就会出问题

网络资料：
一、测试场景
[操作系统](https://www.baidu.com/s?wd=操作系统&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)：CentOS 5.6 x86 64bit（内核2.6.18）
文件系统：ext3
硬盘：2块（sda1、sdb1），sdb1的挂载点为/Android，专门用来存储编译文件，在编译时报错。

二、升级前状态
查看系统[内核版本](https://www.baidu.com/s?wd=内核版本&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)：
\# uname -r
2.6.18-238.el5
查看文件系统的情况：
\# df -T
文件系统 类型 1K-块 已用 可用 已用% 挂载点
/dev/mapper/VolGroup00-LogVol00
ext3 13077624 3342968 9059636 27% /
/dev/sda1 ext3 101086 15876 79991 17% /boot
tmpfs tmpfs 257452 0 257452 0% /dev/shm
/dev/sdb1 ext3 8254240 149624 7685324 2% /android
查看ext4特征是否激活：
\# tune2fs -l /dev/sdb1 | grep extent
执行上述命令后无任何信息返回，说明/dev/sdb1的ext4特征没有激活，唯一的解决办法就是升级文件系统到ext4了。

三、软件下载及安装
e2fsprogs软件包下载页面：http://ftp.kernel.org/pub/linux/kernel/people/tytso/e2fsprogs/

接下来是源码编译安装过程：
\# wget http://ftp.kernel.org/pub/linux/kernel/people/tytso/e2fsprogs/e2fsprogs-1.41.14.tar.gz
\# tar -zxvf e2fsprogs-1.41.14.tar.gz
\# cd e2fsprogs-1.41.14
\# ./configure
\# make && make install
安装完毕后暂时不需要重启系统。第一次安装完毕时我就重启系统了，结果系统竟然崩溃了，因此e2fsprogs软件包安装完毕后不要立即重启服务器。 

## 4、Linux上怎么判断固态硬盘和机械硬盘

### 4-1、方法一：cat /sys/block/{fs_name}/queue/rotational
是你的硬盘设备名称，例如 vda、vdb、sda 等等。
返回结果：
0  固态硬盘
1  机械硬盘
```
[root@ubuntu0006:/media] #df -h
文件系统        容量  已用  可用 已用% 挂载点
udev            3.9G     0  3.9G    0% /dev
tmpfs           799M  9.5M  789M    2% /run
/dev/vda1        77G   54G   20G   74% /
tmpfs           3.9G  172K  3.9G    1% /dev/shm
tmpfs           5.0M  4.0K  5.0M    1% /run/lock
tmpfs           3.9G     0  3.9G    0% /sys/fs/cgroup
tmpfs           799M  4.0K  799M    1% /run/user/108
tmpfs           799M   36K  799M    1% /run/user/0
/dev/vdb         99G   89G  4.4G   96% /media/sangfor/vdb
[root@ubuntu0006:/media] #cat /sys/block/vd
vda/ vdb/
[root@ubuntu0006:/media] #cat /sys/block/vda/
alignment_offset   dev                holders/           power/             ro                 stat               vda1/
bdi/               device/            inflight           queue/             serial             subsystem/         vda2/
cache_type         discard_alignment  integrity/         range              size               trace/             vda5/
capability         ext_range          mq/                removable          slaves/            uevent
[root@ubuntu0006:/media] #cat /sys/block/vda/queue/rotational
1
```
以根目录为例，注意是vda1，但是需要选择vda目录，而不是vda目录下的vda1目录。

### 4-2、方法二：查看所有磁盘
grep ^ /sys/block/*/queue/rotational
```
[root@ubuntu0006:/media] #grep ^ /sys/block/*/queue/rotational
/sys/block/loop0/queue/rotational:1
/sys/block/loop1/queue/rotational:1
/sys/block/loop2/queue/rotational:1
/sys/block/loop3/queue/rotational:1
/sys/block/loop4/queue/rotational:1
/sys/block/loop5/queue/rotational:1
/sys/block/loop6/queue/rotational:1
/sys/block/loop7/queue/rotational:1
/sys/block/vda/queue/rotational:1
/sys/block/vdb/queue/rotational:1
```

### 4-3、方法三：lsblk命令也可以判断磁盘类型
其中 ROTA 表示 rotational device，1 代表是机械硬盘，0 则就是 ssd 了。
```
[root@ubuntu0006:/media] #lsblk -d -o name,rota
NAME ROTA
vda     1
vdb     1
```

### 4-4、方法四：使用第三方工具 smartctl
apt install smartmontools安装工具
smartctl -a /dev/{fs_name} 
Rotation Rate: Solid State Device出现这种表示为ssd
```
[root@ubuntu0006:/media] #smartctl -a /dev/vda1
smartctl 6.5 2016-01-24 r4214 [x86_64-linux-4.4.0-210-generic] (local build)
Copyright (C) 2002-16, Bruce Allen, Christian Franke, www.smartmontools.org

/dev/vda1: Unable to detect device type
Please specify device type with the -d option.

Use smartctl -h to get a usage summary

[root@ubuntu0006:/media] #smartctl -i /dev/vda1
smartctl 6.5 2016-01-24 r4214 [x86_64-linux-4.4.0-210-generic] (local build)
Copyright (C) 2002-16, Bruce Allen, Christian Franke, www.smartmontools.org

/dev/vda1: Unable to detect device type
Please specify device type with the -d option.

Use smartctl -h to get a usage summary

```
不清楚怎么解决，百度和必应未搜索到结果。





