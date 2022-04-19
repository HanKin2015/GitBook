# Linux入门学习

## 1、tweak工具
ubuntu左侧叫做dock，一般有个优化工具叫做tweak。也可以在桌面背景设置-》行为。

topicons plus

## 2、Ubuntu用户都应该安装的4个Linux应用
Synaptic（新立得软件包管理器），卓越的包管理器
Mainline，在 Ubuntu 中始终拥有最新的内核
BleachBit，Ubuntu Ccleaner 的替代品
Kodi：触手可及的多媒体中心

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
参数的解释如下:

-r, --reverse              reverse order while sorting
-t                         sort by modification time
-S                         sort by file size
-h, --human-readable       with -l, print sizes in human readable format
                               (e.g., 1K 234M 2G)


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
xrdb
$TERM

## 12、如何查看linux 文件内容换行符
cat -A 要查看的文件路径
或者使用vim打开你要查看的文件，在末行模式输入 :set list

使用cat -A可以清楚看见换行符是Windows格式还是unix格式，然后就可以使用unix2dos或者dos2unix进行转换。

## 13、查看Linux用的桌面是GNOME、KDE或者其他
推荐使用ll /usr/bin/*session*命令

```
[root@ubuntu0006:/etc/network] #ll /usr/bin/*session*
-rwxr-xr-x 1 root root  10224 6月  12  2020 /usr/bin/dbus-run-session*
-rwxr-xr-x 1 root root   1059 3月  16  2016 /usr/bin/session-installer*
-rwxr-xr-x 1 root root 178448 5月  26  2015 /usr/bin/xfce4-session*
-rwxr-xr-x 1 root root  10672 5月  26  2015 /usr/bin/xfce4-session-logout*
-rwxr-xr-x 1 root root 108808 5月  26  2015 /usr/bin/xfce4-session-settings*
lrwxrwxrwx 1 root root     35 12月  7  2017 /usr/bin/x-session-manager -> /etc/alternatives/x-session-manager*
[root@ubuntu0006:/etc/network] #ps -A | egrep -i "gnome|kde|mate|cinnamon|lxde|xfce|jwm"
   16 ?        00:00:00 kdevtmpfs
 7178 ?        00:00:00 xfce4-terminal
 7198 ?        00:00:00 gnome-pty-helpe
14523 ?        00:00:00 gnome-keyring-d
15094 ?        00:00:00 xfce4-session
15106 ?        00:00:00 xfce4-panel
15113 ?        00:00:00 polkit-gnome-au
15121 ?        00:00:00 xfce4-volumed
15124 ?        00:00:00 xfce4-power-man
[root@ubuntu0006:/etc/network] #pgrep -l "gnome|kde|mate|cinnamon|lxde|xfce|jwm"
16 kdevtmpfs
7178 xfce4-terminal
7198 gnome-pty-helpe
14523 gnome-keyring-d
15094 xfce4-session
15106 xfce4-panel
15113 polkit-gnome-au
15121 xfce4-volumed
15124 xfce4-power-man
```
Xorg是图形界面的基础，任何桌面都需要Xorg的。

gdm是Linux的[图形界面](https://www.baidu.com/s?wd=图形界面&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)
GDM (The GNOME Display Manager)是GNOME显示环境的管理器，并被用来替代原来的X Display Manager。与其竞争者(X3DM,KDM,WDM)不同，GDM是完全重写的，并不包含任何XDM的代码。GDM可以运行并管理本地和[远程登录](https://www.baidu.com/s?wd=远程登录&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)的X服务器(通过XDMCP)。gdm仅仅是一个脚本，实际上是通过他来运行GDM二进制可执行文件。gdm-stop是用来迅速终止当前正在运行的gdm守护进程的一个脚本。gdm-restart脚本将迅速重启当前守护进程。然而gdm-safe-restart会当所有人都注销后再重启。gdmsetup是一种可以很简单的修改多数常用选项的图形化界面工具。GNOM的帮助里有更完整的文档，在“应用程序”/“系统工具”这一章节。 

## 14、后台运行
后台运行符号&
可以使用killall杀死，或者使用kill -9 pid
在运行开始后系统会通知该后台运行进程id

```
[root@ubuntu0006:/media/hankin/vdb] #./run_background.sh  &
[1] 13067
[root@ubuntu0006:/media/hankin/vdb] #
[root@ubuntu0006:/media/hankin/vdb] #
[root@ubuntu0006:/media/hankin/vdb] #ps aux| grep 13067
root     13067  0.0  0.0  15368  2976 pts/2    S    11:37   0:00 /bin/bash ./run_background.sh
root     14780  0.0  0.0  17088   964 pts/2    S+   11:38   0:00 grep --color=auto 13067
[root@ubuntu0006:/media/hankin/vdb] #tailf background
2021年 06月 23日 星期三 11:38:16 CST
2021年 06月 23日 星期三 11:38:17 CST
2021年 06月 23日 星期三 11:38:18 CST
2021年 06月 23日 星期三 11:38:19 CST
2021年 06月 23日 星期三 11:38:20 CST
2021年 06月 23日 星期三 11:38:21 CST
2021年 06月 23日 星期三 11:38:22 CST
2021年 06月 23日 星期三 11:38:23 CST
2021年 06月 23日 星期三 11:38:24 CST
2021年 06月 23日 星期三 11:38:25 CST
2021年 06月 23日 星期三 11:38:26 CST
2021年 06月 23日 星期三 11:38:27 CST
2021年 06月 23日 星期三 11:38:28 CST
2021年 06月 23日 星期三 11:38:29 CST
2021年 06月 23日 星期三 11:38:30 CST
^C
[root@ubuntu0006:/media/hankin/vdb] #killall run_background
run_background：没有发现操作
[root@ubuntu0006:/media/hankin/vdb] #killall run_background.sh
[1]+  已终止               ./run_background.sh
[root@ubuntu0006:/media/hankin/vdb] #tailf background
2021年 06月 23日 星期三 11:38:40 CST
2021年 06月 23日 星期三 11:38:41 CST
2021年 06月 23日 星期三 11:38:42 CST
2021年 06月 23日 星期三 11:38:43 CST
2021年 06月 23日 星期三 11:38:44 CST
2021年 06月 23日 星期三 11:38:45 CST
2021年 06月 23日 星期三 11:38:46 CST
2021年 06月 23日 星期三 11:38:47 CST
2021年 06月 23日 星期三 11:38:48 CST
2021年 06月 23日 星期三 11:38:49 CST
^C
[root@ubuntu0006:/media/hankin/vdb] #ps aux| grep 13067
root     18245  0.0  0.0  17088   928 pts/2    S+   11:38   0:00 grep --color=auto 13067
[root@ubuntu0006:/media/hankin/vdb] #cat run_background.sh
#!/bin/bash

while true; do
        echo `date` >> background
        sleep 1
done
```
## 15、再生龙
再生龙（Clonezilla）是一个免费的灾难恢复、硬盘克隆、硬盘映像档制作的部署和解决方案，由台湾的高速网络与计算中心所开发，以GNU通用公共许可协议（GPL）发布。

## 16、其他
/lib /usr/lib /usr/local/lib 区别

添加/usr/local/lib默认库路径
echo “/usr/local/lib” >>/etc/ld.so.conf
/sbin/ldconfig

## 17、linux 2.6 support
2.6 时代跨度非常大，从2.6.0 (2003年12月发布[36]) 到 2.6.39(2011年5月发布), 跨越了 40 个大版本。
3.0(原计划的 2.6.40, 2011年7月发布) 到 3.19（2015年2月发布）。
4.0（2015年4月发布）到4.2（2015年8月底发布）。

总的来说，从进入2.6之后，每个大版本跨度开发时间大概是 2 - 3 个月。2.6.x , 3.x, 4.x，数字的递进并没有非常根本性，非常非常非常引人注目的大变化，但每个大版本中都有一些或大或小的功能改变。主版本号只是一个数字而已。不过要直接从 2.6.x 升级 到 3.x, 乃至 4.x，随着时间间隔增大，出问题的机率当然大很多。

个人觉得 Linux 真正走入严肃级别的高稳定性，高可用性，高可伸缩性的工业级别内核大概是在 2003 年后吧。一是随着互联网的更迅速普及，更多的人使用、参与开发。二也是社区经过11年发展，已经慢慢摸索出一套很稳定的协同开发模式，一个重要的特点是 社区开始使用版本管理工具进入管理，脱离了之前纯粹手工（或一些辅助的简陋工具）处理代码邮件的方式，大大加快了开发的速度和力度。

## 18、Linux查看BIOS版本/信息详情
命令如下：#dmidecode -t 0


## 19、
/etc/rc.local

/dev/bus/usb/
/sys/bus/usb/

apt install gnome-tweaks  安装完后需要重启物理机才能出现额外的选项。





