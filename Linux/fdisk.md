# 磁盘满的处理方式

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
