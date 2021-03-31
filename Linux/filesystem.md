# 文件系统

Linux中stat是査看文件详细信息的命令。
-f：査看文件所在文件系统信息，而不是査看文件信息。


ext系列的文件系统是我们在linux中最常用的文件系统。当我们有使用老的ext2文件系统的磁盘，希望升级到ext4。应该怎么做呢。

## 准备工作
在改变文件系统之前，我们需要umount磁盘

>umount -l /dev/your_disk

## ext2 to ext3

> tune2fs –j /dev/your_disk

## ext3 to ext4

> tune2fs –O dir_index,uninit_bg /dev/your_disk
> e2fsck –pf /dev/your_disk
>
> 如果磁盘还有错误不能修复,就需要手动修复
>
> fsck /dev/your_disk

## ext2 to ext4

> tune2fs –O dir_index,uninit_bg,has_journal
> e2fsck –pf /dev/your_disk



## ext2 to ext4(完整点)

基本步骤：
1确认[内核版本](https://www.baidu.com/s?wd=内核版本&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)和系统环境支持ext4 (推荐升至2.6.28以上，lsmod |grep ext4)
2卸载要升级的分区(在线卸不掉则需要进单用户)
3 tune2fs -O has_journal,extents,huge_file,flex_bg,uninit_bg,dir_nlink,extra_isize /dev/your_disk 来给分区加入ext4的特性
4 e2fsck -fDC0 /dev/sdb1 –y修复分区错误（一定要进行修复）
5修改fstab中分区格式为ext4，reboot





 查看Linux支持的文件系统：`ls -l /lib/modules/$(uname -r)/kernel/fs` 

发现并没有什么卵用，没有ext2，但是支持ext2.



 查看Linux支持的文件系统(已载入到内存中)：`cat /proc/filesystems` 

#### 查看系统各个文件系统的inode使用情况

```
df -i
```

## free -m:看内存占用

## fdisk -l 



mv能用文件把文件夹给覆盖了？？？ https://apple.stackexchange.com/questions/280451/erased-usr-local-bin-directory-by-mistake?noredirect=1&lq=1 



 Linux mkfs命令用于在特定的分区上建立 linux 文件系统 



元月本指农历一月（正月），今天也常用于指阳历（公历）一月。