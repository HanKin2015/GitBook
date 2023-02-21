# lsof命令

## 1、简介
lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。

在终端下输入lsof即可显示系统打开的文件，因为 lsof 需要访问核心内存和各种文件，所以必须以 root 用户的身份运行它才能够充分地发挥其功能。

## 2、各列解释
每行显示一个打开的文件，若不指定条件默认将显示所有进程打开的所有文件。lsof输出各列信息的意义如下：
COMMAND：进程的名称
PID：进程标识符
USER：进程所有者
FD：文件描述符，应用程序通过文件描述符识别该文件。如cwd、txt等
TYPE：文件类型，如DIR、REG等
DEVICE：指定磁盘的名称
SIZE：文件的大小
NODE：索引节点（文件在磁盘上的标识）
NAME：打开文件的确切名称

## 3、常用参数列表
lsof filename 显示打开指定文件的所有进程
lsof -a 表示两个参数都必须满足时才显示结果
lsof -c string 显示COMMAND列中包含指定字符的进程所有打开的文件
lsof -u username 显示所属user进程打开的文件
lsof -g gid 显示归属gid的进程情况
lsof +d /DIR/ 显示目录下被进程打开的文件
lsof +D /DIR/ 同上，但是会搜索目录下的所有目录，时间相对较长
lsof -d FD 显示指定文件描述符的进程
lsof -n 不将IP转换为hostname，缺省是不加上-n参数
lsof -i 用以显示符合条件的进程情况

## 4、实战
显示打开指定文件的所有进程。
```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #lsof a.out
lsof: WARNING: can't stat() fuse.gvfsd-fuse file system /run/user/108/gvfs
      Output information may be incomplete.
COMMAND   PID USER  FD   TYPE DEVICE SIZE/OFF    NODE NAME
a.out   13077 root txt    REG 253,16     8824 6443719 a.out
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #lsof a.out
lsof: WARNING: can't stat() fuse.gvfsd-fuse file system /run/user/108/gvfs
      Output information may be incomplete.
```

## 5、该命令的使用场景
现在发现这个命令存在的意义了，比如我使用程序在写一个文件usb_data.txt，便可以使用lsof来找到这个进程id。
还有就是在当前环境下，我有一个正式版本文件qemu，还有一个调试文件debugqemu，但是另外一个进程vm在执行过程中我想知道加载的是哪个qemu文件，便可以通过lsof命令在查看进程id是否是ps | grep vm的进程id。
