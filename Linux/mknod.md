# mknod命令

## 1、linux系统中设备管理的基本知识
linux操作系统跟外部设备（如磁盘、光盘等）的通信都是通过设备文件进行的，应用程序可以打开、关闭、读写这些设备文件，从而对设备进行读写，这种操作就像读写普通的文件一样easy。linux为不同种类的设备文件提供了相同的接口，比如read(),write(),open(),close()。

所以在系统与设备通信之前，系统首先要建立一个设备文件，这个设备文件存放在/dev目录下。其实系统默认情况下就已经生成了很多设备文件，但有时候我们需要自己手动新建一些设备文件，这个时候就会用到像mkdir, mknod这样的命令。

## 2、简介
创建块设备或者字符设备文件。此命令的适用范围：RedHat、RHEL、Ubuntu、CentOS、SUSE、openSUSE、Fedora。

mknod 命令建立一个目录项和一个特殊文件的对应索引节点。第一个参数是 Name 项设备的名称。选择一个描述性的设备名称。mknod 命令有两种形式，它们有不同的标志。

mknod 命令的作用是make block or character special files，即创建块设备或者字符设备文件。

## 3、用法
只能由 root 用户或系统组成员运行
创建 FIFO（已命名的管道）：mknod Name { p }

mknod 的标准形式为: mknod DEVNAME {b | c}  MAJOR  MINOR

1，DEVNAME是要创建的设备文件名，如果想将设备文件放在一个特定的文件夹下，就需要先用mkdir在dev目录下新建一个目录；
2， b和c 分别表示块设备和字符设备：
    b表示系统从块设备中读取数据的时候，直接从内存的buffer中读取数据，而不经过磁盘；
    c表示字符设备文件与设备传送数据的时候是以字符的形式传送，一次传送一个字符，比如打印机、终端都是以字符的形式传送数据；
3，MAJOR和MINOR分别表示主设备号和次设备号：
为了管理设备，系统为每个设备分配一个编号，一个设备号由主设备号和次设备号组成。主设备号标示某一种类的设备，次设备号用来区分同一类型的设备。linux操作系统中为设备文件编号分配了32位无符号整数，其中前12位是主设备号，后20位为次设备号，所以在向系统申请设备文件时主设备号不好超过4095，次设备号不好超过2^20 -1。

一般来说主设备号用来区分设备的种类；次设备号则是为了作唯一性区分，标明不同属性——注意，在unix系统中是把设备也当作文件来对待的。

## 4、实践
某个网友利用mknod成功解决找不到swap分区的问题：https://baike.baidu.com/item/mknod/3561210?fr=aladdin

```
crw-------  1 root root    248,   1 10月  3 00:52 vport0p1
crw-------  1 root root    247,   1 10月  3 00:52 vport2p1
crw-------  1 root root    246,   1 10月  3 00:52 vport3p1
crw-rw-rw-  1 root root      1,   5 10月  3 00:52 zero
[root@ubuntu0006:/dev] #mkdir -p /dev/hankin
[root@ubuntu0006:/dev] #mknod /dev/hankin/mydev c 128 512
[root@ubuntu0006:/dev] #ll hankin/
总用量 0
drwxr-xr-x  2 root root       60 2月  23 14:38 ./
drwxr-xr-x 18 root root     4060 2月  23 14:38 ../
crw-r--r--  1 root root 128, 512 2月  23 14:38 mydev
```

惭愧，没有找到这个命令的具体实际作用。


