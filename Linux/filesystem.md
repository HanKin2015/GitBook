# 文件系统

## 1、stat命令
Linux stat 命令用于显示 inode 内容。
stat 以文字的格式来显示 inode 的内容。

stat [文件或目录]

### 1-1、inode 的内容
inode 包含文件的元信息，具体来说有以下内容：

- 文件的字节数
- 文件拥有者的 User ID
- 文件的 Group ID
- 文件的读、写、执行权限
- 文件的时间戳，共有三个：ctime 指 inode 上一次变动的时间，mtime 指文件内容上一次变动的时间，atime 指文件上一次打开的时间。
- 链接数，即有多少文件名指向这个 inode
- 文件数据 block 的位置

Linux中stat是査看文件详细信息的命令。
-f：査看文件所在文件系统信息，而不是査看文件信息。
```
stat - display file or file system status

 -f, --file-system
              display file system status instead of file status
			  
root@ubuntu180001:~# stat -f test
  文件："test"
    ID：35a7aa1aca3111c9 文件名长度：255     类型：ext2/ext3
块大小：4096       基本块大小：4096
    块：总计：20510822   空闲：18184711   可用：17132065
Inodes: 总计：5242880    空闲：5092294
root@ubuntu180001:~# stat test
  文件：test
  大小：1110            块：8          IO 块：4096   普通文件
设备：fc01h/64513d      Inode：659105      硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-01-13 19:47:29.308000000 +0800
最近更改：2022-01-13 19:44:33.500000000 +0800
最近改动：2022-01-13 19:44:33.504000000 +0800
创建时间：-
```

### 1-2、文件大小和空间大小
从上面可以看出，该文件大小为1110字节，即bytes，磁盘占用空间大小为8*4096=32768比特，即bit，转换为4096字节。
实验看出，某个东西概念以8块组成，不足以8块计算。
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #stat usbredirhost.c -f
  文件："usbredirhost.c"
    ID：25b5b8e9a2105070 文件名长度：255     类型：ext2/ext3
块大小：4096       基本块大小：4096
    块：总计：25770312   空闲：3774267    可用：2459451
Inodes: 总计：6553600    空闲：5469854
[root@ubuntu0006:/media/hankin/vdb/study/udev] #stat usbredirhost.c
  文件：'usbredirhost.c'
  大小：135269          块：272        IO 块：4096   普通文件
设备：fd10h/64784d      Inode：6441883     硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-06-06 19:15:11.548000000 +0800
最近更改：2022-06-07 09:56:09.288000000 +0800
最近改动：2022-06-07 09:56:09.288000000 +0800
创建时间：-
```

1、文件大小指的是该文件实际的文件体积，例如一个文件其本身的大小为6字节，则这6字节称之为该文件的文件大小。
2、占用空间指的是这个文件占用磁盘空间的大小，如下图所示，该文件的大小为“6字节”，但是占用的磁盘空间却为“4096字节”，占用空间比文件体积要大。

同一个文件在不同磁盘分区上所占的空间不一样大小，这是由于不同磁盘簇的大小不一样导致的。 簇的大小主要由磁盘的分区格式和容量大小来决定。
操作系统中的一个簇中只能放置一个文件的内容，因此文件所占用的空间，只能是簇的整数倍，只有在少数情况下，即文件的实际大小恰好是簇的整数倍时，文件的实际大小才会与所占空间完全一致。

文件大小是文件实际大小
而占用空间是文件所占用的硬盘空间...
因为硬盘存储空间是以簇来存储文件的...
簇的大小从2k到128k不等，
可以比喻为一个个箱子，文件放到一个个簇里，并不是都能装满的...
＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
脉脉孤独说的，预分配空间...
那是下载东西的时候才有的概念...
不要混淆概念...
至于数据库之类的东西，更是胡邹...
找你那么说还留地方扩充数据，那么就不会有磁盘碎片生成了...
“一个实际大小不到1M的文件，占用空间可以超过10M ”鬼信...
一个实际大小不到1M的文件夹，占用空间可以超过10M ，我才行...
是文件夹！
当然如果你一个簇设为10M，那没话说...

## 1-3、查看操作系统块大小
```
[root@ubuntu0006:/media] #tune2fs -l /dev/vda1 |grep 'Block size'
Block size:               4096
[root@ubuntu0006:/media] #stat -f
root/    hankin/
[root@ubuntu0006:/media] #stat -f root
  文件："root"
    ID：5daf1520f1d5f8d 文件名长度：255     类型：ext2/ext3
块大小：4096       基本块大小：4096
    块：总计：20093394   空闲：6324893    可用：5298449
Inodes: 总计：5111808    空闲：3841189
```

查看os系统页的大小
```
[root@ubuntu0006:/media] #getconf PAGESIZE
4096
```

查看某分区的block和inode的数量和大小，通常block比inode多
```
[root@ubuntu0006:/media] #tune2fs -l /dev/vda1 | grep 'Block count'
Block count:              20446976
[root@ubuntu0006:/media] #tune2fs -l /dev/vda1 | grep 'Inode count'
Inode count:              5111808
[root@ubuntu0006:/media] #tune2fs -l /dev/vda1 | grep 'Block size'
Block size:               4096
[root@ubuntu0006:/media] #tune2fs -l /dev/vda1 | grep 'Inode size'
Inode size:               256
```

### 1-4、Linux系统中磁盘block和windos中的簇一个意思
微软操作系统（DOS、WINDOWS等）中磁盘文件存储管理的最小单位叫做“簇”

inode:文件数据都存储在‘块’中，我们还必须找到一个地方存储文件的元信息，比如文件的创建，文件的创建时间，文件的大小等等，这种存储文件元信息的区域就叫做inode,中文译名为‘索引节点’.
inode大小：inode也会消耗硬盘空间，所以硬盘格式化的时候，操作系统自动将硬盘分成两个区域，一个数据区，存放文件数据，另一个是inode区(inode table),存放inode所包含的信息.

总结：每个文件最少有一个inode号，系统用inode号来识别不同的文件。

实例：web服务器中小文件多，导致磁盘有空间，但是无法创建文件。
inode 数被用光了
查看inode是否被用光：df -i
block 设置大：效率高，利用率低。
block 设置小：效率低，利用率高。
一般系统默认就行.
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #df -i usbredirhost.c
文件系统         Inode 已用(I) 可用(I) 已用(I)% 挂载点
/dev/vdb       6553600 1083746 5469854      17% /media/hankin/vdb
[root@ubuntu0006:/media/hankin/vdb/study/udev] #df usbredirhost.c
文件系统           1K-块     已用    可用 已用% 挂载点
/dev/vdb       103081248 87984180 9837804   90% /media/hankin/vdb
[root@ubuntu0006:/media/hankin/vdb/study/udev] #stat -f usbredirhost.c
  文件："usbredirhost.c"
    ID：25b5b8e9a2105070 文件名长度：255     类型：ext2/ext3
块大小：4096       基本块大小：4096
    块：总计：25770312   空闲：3774267    可用：2459451
Inodes: 总计：6553600    空闲：5469854
[root@ubuntu0006:/media/hankin/vdb/study/udev] #ls -i usbredirhost.c
6441883 usbredirhost.c
```


## 2、ext2升级到ext4
ext系列的文件系统是我们在linux中最常用的文件系统。当我们有使用老的ext2文件系统的磁盘，希望升级到ext4。应该怎么做呢。

### 准备工作
在改变文件系统之前，我们需要umount磁盘

>umount -l /dev/your_disk

### ext2 to ext3

> tune2fs –j /dev/your_disk

### ext3 to ext4

> tune2fs –O dir_index,uninit_bg /dev/your_disk
> e2fsck –pf /dev/your_disk
>
> 如果磁盘还有错误不能修复,就需要手动修复
>
> fsck /dev/your_disk

### ext2 to ext4

> tune2fs –O dir_index,uninit_bg,has_journal
> e2fsck –pf /dev/your_disk

### ext2 to ext4(完整点)

基本步骤：
1确认[内核版本](https://www.baidu.com/s?wd=内核版本&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)和系统环境支持ext4 (推荐升至2.6.28以上，lsmod |grep ext4)
2卸载要升级的分区(在线卸不掉则需要进单用户)
3 tune2fs -O has_journal,extents,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize /dev/your_disk 来给分区加入ext4的特性
4 e2fsck -fDC0 /dev/sdb1 –y修复分区错误（一定要进行修复）
5修改fstab中分区格式为ext4，reboot

## 3、查看系统支持的文件系统
查看Linux支持的文件系统：`ls -l /lib/modules/$(uname -r)/kernel/fs` 

发现并没有什么卵用，没有ext2，但是支持ext2.

查看Linux支持的文件系统(已载入到内存中)：`cat /proc/filesystems` 

## 4、查看系统各个文件系统的inode使用情况

```
df -i
```

## 5、free -m:看内存占用

## 6、fdisk命令
fdisk -l

mv能用文件把文件夹给覆盖了？？？ https://apple.stackexchange.com/questions/280451/erased-usr-local-bin-directory-by-mistake?noredirect=1&lq=1 

Linux mkfs命令用于在特定的分区上建立 linux 文件系统 

元月本指农历一月（正月），今天也常用于指阳历（公历）一月。

## 7、磁盘满的处理方式

安装命令：apt install jq出现如下，

E: 您在 /var/cache/apt/archives/ 上没有足够的可用空间。

df -h
发现/dev/vda1磁盘已经100%，挂载在根目录，需要去寻找是哪些文件夹占用磁盘存储空间大。

du -d 1 -h
在根目录执行上面命令，-d参数是指定搜索深度，如果不指定就会无限延伸。
很快就找到占用磁盘高的文件夹，解决。

fdisk命令
fdisk -l
查看当前系统总共的磁盘情况，可以找到未挂载的磁盘，执行df -h可以看是否有未挂载的磁盘

挂载命令
mount /dev/vdb /myroot/

卸载命令
umount /dev/vdb

## 8、格式化U盘
```
fdisk -l
umount /dev/sdb
mkfs -V -t ntfs /dev/sdb4
```

## 9、mkfs命令
mkfs：
mkfs.bfs     mkfs.cramfs  mkfs.ext2    mkfs.ext3    
mkfs.ext4：可以在磁盘分区创建ext4文件系统。该命令是mke2fs命令的符号链接，使用方法和mke2fs命令一样。
mkfs.fat     mkfs.minix   mkfs.msdos   mkfs.ntfs    mkfs.vfat


```
lrwxrwxrwx  1 root root         8 9月  21  2020 mkdosfs -> mkfs.fat*
-rwxr-xr-x  1 root root    129344 1月  22  2020 mke2fs*
-rwxr-xr-x  1 root root     10312 1月   9  2020 mkfs*
-rwxr-xr-x  1 root root     30800 1月   9  2020 mkfs.bfs*
-rwxr-xr-x  1 root root     34824 1月   9  2020 mkfs.cramfs*
lrwxrwxrwx  1 root root         6 9月  21  2020 mkfs.ext2 -> mke2fs*
lrwxrwxrwx  1 root root         6 9月  21  2020 mkfs.ext3 -> mke2fs*
lrwxrwxrwx  1 root root         6 9月  21  2020 mkfs.ext4 -> mke2fs*
-rwxr-xr-x  1 root root     35328 1月  25  2017 mkfs.fat*
-rwxr-xr-x  1 root root     79960 1月   9  2020 mkfs.minix*
lrwxrwxrwx  1 root root         8 9月  21  2020 mkfs.msdos -> mkfs.fat*
lrwxrwxrwx  1 root root         6 9月  21  2020 mkfs.ntfs -> mkntfs*
lrwxrwxrwx  1 root root         8 9月  21  2020 mkfs.vfat -> mkfs.fat*
-rwxr-xr-x  1 root root     79984 3月  22  2019 mkntfs*
-rwxr-xr-x  1 root root     79952 1月   9  2020 mkswap*
```

用磁盘映射的方式写入数据，数据都是在系统缓存里，没有写入到U盘。这个是非常危险的，如果在写入过程中，拔掉U盘，就会导致数据丢失，甚至U盘文件系统损坏，

如果一定要进行速度对比测试，磁盘映射在U盘mount的时候需要加上sync参数，这样每次写入U盘时都会把缓存刷新到U盘内。

例如
mount /dev/sdb1 -o sync /mnt

### 9-1、mkfs.ext4 命令 – 创建ext4文件系统
mkfs.ext4命令可以磁盘分区创建ext4文件系统。该命令是mke2fs命令的符号链接，使用方法和mke2fs命令一样。

-c	格式化前检查分区是否有坏块
-q	执行时不显示任何信息
-b block-size	指定block size大小，默认配置文件在/etc/mke2fs.conf，blocksize = 4096
-F	强制格式化

格式化前检查分区是否有坏块：

[root@linuxcool ~]# mkfs.ext4 -c /dev/sdb
将/dev/sdb分区格式化成ext4文件系统：

[root@linuxcool ~]# mkfs.ext4 /dev/sdb
将硬盘格式化为ext4文件系统，并添加卷标‘root’，块大小为2048，文件系统预留5%给管理员：

[root@linuxcool ~]# mkfs.ext4 -L 'root' -b 2048 /dev/sdb -m 5

## 10、NTFS不是linux独有的吗
centos报错：Error mounting /dev/sdd1 at /run/media/hankin/U盘: Filesystem type ntfs not configured in kernel.

安装NTFS相关的包。

## 11、uos不支持win7下刻录的UDF文件格式光盘
https://knowledge.ipason.com/ipKnowledge/knowledgedetail.html/1324
UDF是统一光盘格式 (Universal Disc Format)的英文缩写 ，由国际标准化组织于1996 年制定的通用光盘文件系统。它采用标准的包刻录技术 (PW ，Packet Writing)来简化刻录机的使用。在Windows Vista及更高版本的系统中，U盘和硬盘等非光学存储媒体也可以直接通过Format命令将其格式化为UDF文件系统使用。

通用磁盘格式（UDF，Universal Disk Format）是一种CD-ROM和DVD文件系统标准，作为一种确保写入到不同的光学媒介上的数据一致性的方式开发，通过促进数据互交换和ISO/IEC13346标准的实现。

## 12、DVD刻录光盘文件系统CDFS与UDF有什么不同
UDF格式和CDFS格式是两种不同的光盘文件系统格式。

UDF（Universal Disk Format）是一种通用的光盘文件系统格式，最初由光盘行业协会（OSTA）开发。UDF格式支持多种存储介质，包括CD、DVD、蓝光光盘等。它具有跨平台兼容性，可以在不同操作系统上读取和写入数据。UDF格式支持大容量存储，文件大小可以超过2GB，并且可以使用长文件名和目录结构。此外，UDF格式还支持文件权限和元数据的存储，可以实现更高级的文件管理功能。

CDFS（Compact Disc File System）是一种用于CD光盘的文件系统格式。它是最早用于CD-ROM的文件系统之一，支持在CD光盘上存储和读取数据。CDFS格式具有较低的复杂性和较高的兼容性，可以在几乎所有操作系统上读取CD光盘。然而，CDFS格式有一些限制，例如文件名长度限制为8个字符加3个扩展名，不支持长文件名和目录结构，也不支持文件权限和元数据的存储。

综上所述，UDF格式是一种通用的光盘文件系统格式，支持多种存储介质和高级文件管理功能，而CDFS格式是一种用于CD光盘的简单文件系统格式，具有较高的兼容性但功能相对有限。

udf 是统一光盘格式 (universal disc format)的英文缩写 ，由国际标准化组织于1996 年制定的通用光盘文件系统。它采用标准的包刻录技术 (pw ，packet writing)来简化刻录机的使用。udf文件系统使用户可以如同操作硬盘那样来使用cd- rw刻录机
也就是说udf是刻录格式，与数据无关。nero里就可以选择刻udf格式。主要是udf可以随时写入，比较方便。
cdfs文件系统兼容性好，但不支持4g以上的文件。

采用UDF文件系统的光盘只能在具有 MulitRead 功能光驱上读取。对不支持 MulitRead 功能的光驱来说，需要相关软件的支持才能读取UDF文件系统
CDFS是指专门的CD格式的文件系统，只是针对CD唱片的，也就是我们平时说的音轨。不能直接打开，可以用软件进行抓音轨。用系统 Windows Media Player 或 格式工厂都可以。

ISO 9660，也被一些硬件和软件供应商称作CDFS（光盘文件系统）或ECMA-119，是一个为光盘媒介发布的文件系统，其被国际标准化组织（ISO）作为国际技术标准出售。其目标是能够在不同的操作系统上交换数据。

我内部实践了一下，使用无线网卡打开的是CDFS格式，暂无光驱。