

# Linux挂载u盘


用FDISK-l 来找，一bai般U盘会被LINUX认为SCSI设备du,如果有SCSI设备那么U盘一般是最zhi后一个SCSI设备.如果没有SCSI设备,一般sda就是U盘。  

若第dao一个插入的u盘一般是sda，但第二个插入的不同牌子的u盘有可能是sdb，而且下次插入时还是如此。

具体步骤：

1.查看所有的设备文件.

在linux的文件系统中, /dev中存放着所有的设备文件.

cd /dev 　　#进入dev文件夹

ls　　　　 #查看所有的文件

其中名为sda的系类是磁盘设备, sdb系列是U盘设备.

2.外部设备挂载点

在linux中, 外部设备需要挂载在/mnt文件夹中.

cd /mnt　　#进入/mnt文件夹

ls　　　　　#列出所有文件, 发现一个也没有

mkdir usb #创建一个名为usb的文件夹, 今后将usb设备挂载在此文件夹上.

3.使用mount命令挂载设备.

先查看/dev文件夹中的U盘设备具体名称(以sdb开头, 我的U盘名称是sdb4, 如果有多个, 请一个一个尝试, 我的有两个(sdb, sdb4)).
sudo mount -t vfat /dev/sdb4 /mnt/usb　　#将外部名为sdb4的U盘设备挂载到/mnt/usb文件夹上.

cd /mnt/usb

ls　　　　　　　#查看U盘中所有文件

请用后卸载设备 umount /dev/sdb4.