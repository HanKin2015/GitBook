# Linux入门学习

## 1、tweak工具
ubuntu左侧叫做dock，一般有个优化工具叫做tweak。也可以在桌面背景设置-》行为。

## 2、截图

scrot命令
注意：只能在本地进行使用，当远程连接使用时，截出来的图片是全黑色的。
scrot -s截取指定窗口或矩形区域。

gnome-screenshot  -a 

ubuntu和debian下的快速截图。

## 3、开机自动获取ip地址

编辑 /etc/sysconfig/network-scripts/ifcfg-eth0 让系统启动时自动获取IP地址：

## 4、使用root用户登录系统，执行以下命令
$ vi /etc/sysconfig/network-scripts/ifcfg-eth0

将 ONBOOT=no 改为 ONBOOT=yes，保存文件后，执行以下命令重启网卡

$ service network restart

dhclient
ifup
ip addr

## 5、apt-get -y install中的-y是什么意思?
是同意的意思。没有 -y的命令也可以执行，系统会提示你是否安装，输入y，回车，就会安装了
apt-get -y install这个指令则是跳过系统提示，直接安装。

## 6、rm -rf  dir     

- r是递归文件夹
- f 忽略不存在的文件，从不给出提示。 force，如果没有f就会提示是否确认删除，有f就没有提示了。

## 7、dhclient命令而不是dhcp命令
DHCP（动态主机配置协议）是一个局域网的网络协议。指的是由服务器控制一段lP地址范围，客户机登录服务器时就可以自动获得服务器分配的lP地址和子网掩码。默认情况下，DHCP作为Windows Server的一个服务组件不会被系统自动安装，还需要管理员手动安装并进行必要的配置。 

## 8、chroot: failed to run command ‘/bin/bash’: No such file or directory
可以看下需要chroot的文件夹下bash命令的依赖
ldd ./dir/bin/bash

结果发现并不是一个可以chroot的目录。

## 9、linux系统中的i386/i686和x86_64有什么区别

许下诺言 2017-03-25 15:34:16  59258  收藏 9
版权
Linux的的版本众多，包括服务器版本、桌面版本等，在下载安装镜像时候总会有i386/i686和x86_64这样的区别，带着疑问查了一下相关资料：

（1）参考一：http://blog.csdn.net/yandaqijian/article/details/41748759?locationNum=14点击打开链接

（2）参考二：http://blog.csdn.net/yandaqijian/article/details/41748599点击打开链接

总结来说：i386对应的是32位系统、而i686是i386的一个子集,i686仅对应P6及以上级别的CPU，i386则广泛适用于80386以上的各种CPU；x86_64主要是64位系统。

## 10、linux命令之ll按时间和大小排序显示
注意一下S是大写。
```
ll -Sh
ll -Sh | tac
ll -rt
ll -rt | tac
```

pactl命令可以修改伺服器的设置以及配置，但pactl命令仅限于局限的范围
若要完整的功能，就必須要回归到最基本的指令pacmd,通过pacmd指令
才可以完全的控制PulseAudio的服务核心。
fedora24提供下列指令
pulseaudio - The PulseAudio Sound System
pactl - Control a running PulseAudio sound server
pacmd - Reconfigure a PulseAudio sound server during runtime

## 11、head命令
```
head -n 5 /etc/passwd       显示文件前五行，默认显示十行
head -n 2 /et/passwd /etc/shadow    可以同时查看两个文件前两行
tial -n 5 /etc/passwd       显示文件后五行
```








