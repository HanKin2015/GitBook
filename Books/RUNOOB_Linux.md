[TOC]


runoob = run noob奔跑吧菜鸟

# RUNOOB之Linux


## 1、Linux简介与安装
Linux 英文解释为 Linux is not Unix。
Linux 内核最初只是由芬兰人林纳斯·托瓦兹（Linus Torvalds）在赫尔辛基大学上学时出于个人爱好而编写的。

类 Unix 操作系统，是一个基于 POSIX 和 UNIX 的多用户、多任务、支持多线程和多 CPU 的操作系统。
Linux 继承了 Unix 以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。
Linux 的发行版说简单点就是将 Linux 内核与应用软件做一个打包。
通常服务器使用 LAMP（Linux + Apache + MySQL + PHP）或 LNMP（Linux + Nginx+ MySQL + PHP）组合。

```
CentOS-7.0-x86_64-DVD-1503-01.iso : 标准安装版，一般下载这个就可以了（推荐）
CentOS-7.0-x86_64-NetInstall-1503-01.iso : 网络安装镜像（从网络安装或者救援系统）
CentOS-7.0-x86_64-Everything-1503-01.iso: 对完整版安装盘的软件进行补充，集成所有软件。（包含centos7的一套完整的软件包，可以用来安装系统或者填充本地镜像）
CentOS-7.0-x86_64-GnomeLive-1503-01.iso: GNOME桌面版
CentOS-7.0-x86_64-KdeLive-1503-01.iso: KDE桌面版
CentOS-7.0-x86_64-livecd-1503-01.iso : 光盘上运行的系统，类拟于winpe
CentOS-7.0-x86_64-minimal-1503-01.iso : 精简版，自带的软件最少
```

# 2、启动
许多程序需要开机启动。它们在Windows叫做"服务"（service），在Linux就叫做"守护进程"（daemon）。
- 内核的引导。
- 运行 init。
- 系统初始化。
- 建立终端 。
- 用户登录系统。

默认我们登录的就是第一个窗口，也就是tty1，这个六个窗口分别为tty1,tty2 … tty6，你可以按下Ctrl + Alt + F1 ~ F6 来切换它们。
如果你安装了图形界面，默认情况下是进入图形界面的，此时你就可以按Ctrl + Alt + F1 ~ F6来进入其中一个命令窗口界面。
当你进入命令窗口界面后再返回图形界面只要按下Ctrl + Alt + F7 就回来了。
如果你用的vmware 虚拟机，命令窗口切换的快捷键为 Alt + Space + F1~F6. 如果你在图形界面下请按Alt + Shift + Ctrl + F1~F6 切换至命令窗口。

最后总结一下，不管是重启系统还是关闭系统，首先要运行 sync 命令，把内存中的数据写到磁盘中。
关机的命令有 shutdown –h now halt poweroff 和 init 0 , 重启系统的命令有 shutdown –r now reboot init 6。
shutdown -c  取消即将进行的关机
```
halt 命令通知硬件来停止所有的 CPU 功能，但是仍然保持通电。你可以用它使系统处于低层维护状态。注意在有些情况会它会完全关闭系统。

# halt             ### 停止机器
# halt -p          ### 关闭机器、关闭电源
# halt --reboot    ### 重启机器
poweroff 会发送一个 ACPI 信号来通知系统关机。

# poweroff           ### 关闭机器、关闭电源
# poweroff --halt    ### 停止机器
# poweroff --reboot  ### 重启机器
reboot 命令 reboot 通知系统重启。

# reboot           ### 重启机器
# reboot --halt    ### 停止机器
# reboot -p        ### 关闭机器
```
若安装 bash-completion 软件，则在某些指令后面使用 [tab] 按键时，可以进行『选项/参数的补齐』功能！

停止所有命令运行：ctrl+c,ctrl+d,ctrl+z,ctrl+\




# 3、Linux 系统目录结构
https://www.runoob.com/linux/linux-system-contents.html
etc这个目录用来存放所有的系统管理所需要的配置文件和子目录。
var这个目录中存放着在不断扩充着的东西，我们习惯将那些经常被修改的目录放在这个目录下。包括各种日志文件。
lost+found这个目录一般情况下是空的，当系统非法关机后，这里就存放了一些文件。
opt 这是给主机额外安装软件所摆放的目录
usr这是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于windows下的program files目录。

# 4、Linux忘记root密码
- 重启机器
- 回车
- e键，第二行按e进入编辑模式
- b键启动
- 使用passwd命令修改

yum install ssh
service sshd start
ssh -p 50022 my@127.0.0.1























