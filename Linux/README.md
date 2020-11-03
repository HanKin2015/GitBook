# Linux入门学习

ubuntu左侧叫做dock，一般有个优化工具叫做tweak。也可以在桌面背景设置-》行为。

# 截图

scrot命令

注意：只能在本地进行使用，当远程连接使用时，截出来的图片是全黑色的。

scrot -s截取指定窗口或矩形区域。



 gnome-screenshot  -a 

ubuntu和debian下的快速截图。

# 开机自动获取ip地址

编辑 /etc/sysconfig/network-scripts/ifcfg-eth0 让系统启动时自动获取IP地址：

# 使用root用户登录系统，执行以下命令
$ vi /etc/sysconfig/network-scripts/ifcfg-eth0

将 ONBOOT=no 改为 ONBOOT=yes，保存文件后，执行以下命令重启网卡

$ service network restart

dhclient

ifup

ip addr











# apt-get -y install中的-y是什么意思?

是同意的意思。没有 -y的命令也可以执行，系统会提示你是否安装，输入y，回车，就会安装了

apt-get -y install这个指令则是跳过系统提示，直接安装。



# rm -rf  dir     

- r是递归文件夹
- f 忽略不存在的文件，从不给出提示。 force，如果没有f就会提示是否确认删除，有f就没有提示了。



# dhclient命令而不是dhcp命令

 DHCP（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段lP地址范围，客户机登录服务器时就可以自动获得服务器分配的lP地址和子网掩码。默认情况下，DHCP作为Windows Server的一个服务组件不会被系统自动安装，还需要管理员手动安装并进行必要的配置。 

# chroot: failed to run command ‘/bin/bash’: No such file or directory
可以看下需要chroot的文件夹下bash命令的依赖
ldd ./dir/bin/bash

结果发现并不是一个可以chroot的目录。





