# 文件系统

## 1、stat命令
Linux stat 命令用于显示 inode 内容。
stat 以文字的格式来显示 inode 的内容。

stat [文件或目录]

### inode 的内容
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
















