

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

# 5、文件基本属性
chown (change ownerp) ： 修改所属用户与组。
chmod (change mode) ： 修改用户的权限。
文件类型+所有者权限+同组用户+其他用户
![](https://www.runoob.com/wp-content/uploads/2014/06/file-llls22.jpg)
chgrp：更改文件属组
chown：更改文件属主，也可以同时更改文件属组

[s]：当一个具有执行权限的文件设置 \[s\](SetUID) 权限后，用户执行这个文件时将以文件所有者的身份执行。
[t]: 任何用户均可以往此目录写入文件，可以删除自己所创建的文件，root 自然有权限删除.


rmdir（英文全拼：remove directory）：删除一个空的目录

ls命令：ls -ld dir_name这样可以看文件夹详细信息，而不是文件夹里面的文件
-d ：仅列出目录本身，而不是列出目录内的文件数据(常用)

---
- cat  由第一行开始显示文件内容
- tac  从最后一行开始显示，可以看出 tac 是 cat 的倒着写！
- nl   显示的时候，顺道输出行号！
- more 一页一页的显示文件内容
- less 与 more 类似，但是比 more 更好的是，他可以往前翻页！
- head 只看头几行
- tail 只看尾巴几行


符号连接（Symbolic Link），也叫软连接
ln -s 原文件 软链接文件
 1).删除符号连接f3,对f1,f2无影响；
 2).删除硬连接f2，对f1,f3也无影响；
 3).删除原文件f1，对硬连接f2没有影响，导致符号连接f3失效；
 4).同时删除原文件f1,硬连接f2，整个文件会真正的被删除。

useradd –d  /home/sam -m sam
usermod
userdel
groupadd
groupdel
groupmod
如果一个用户同时属于多个用户组，那么用户可以在用户组之间切换，以便具有其他用户组的权限:newgrp
cat /etc/passwd
cat /etc/shadow
newusers
pwunconv
chpasswd
pwconv

# 6、磁盘管理
df：列出文件系统的整体磁盘使用量
du：检查磁盘空间使用量
fdisk：用于磁盘分区
磁盘格式化：mkfs（mkfs -t ext3 /dev/hdc6）
fsck（file system check）用来检查和维护不一致的文件系统。
Linux 的磁盘挂载使用 mount 命令，卸载使用 umount 命令。
在 Linux 中，可以使用 stat 命令查看某个文件的 inode 信息
磁盘顺序读取时是从一个磁头换到另一个磁头（磁头不用移动位置），而不是由一个磁柱换到另一个磁柱。

# 7、vi/vim
所有的 Unix Like 系统都会内建 vi 文书编辑器，其他的文书编辑器则不一定会存在。
因此，学好vi命令的重要性。

如向下移动 30 行，可以使用 "30j" 或 "30↓" 的组合按键
[Ctrl] + [f]	屏幕『向下』移动一页，相当于 [Page Down]按键 (常用)
[Ctrl] + [b]	屏幕『向上』移动一页，相当于 [Page Up] 按键 (常用)
n\<space\>	按下数字后再按空格键，光标会向右移动这一行的 n 个字符。
0 或功能键[Home]	这是数字『 0 』：移动到这一行的最前面字符处 (常用)
$ 或功能键[End]	移动到这一行的最后面字符处(常用)
G	移动到这个档案的最后一行(常用)
nG	n 为数字。移动到这个档案的第 n 行。例如 20G 则会移动到这个档案的第 20 行(可配合 :set nu)
gg	移动到这个档案的第一行，相当于 1G 啊！ (常用)
n\<Enter\>	n 为数字。光标向下移动 n 行(常用)

搜索关键字：/和？

vim 是一个程序开发工具而不是文字处理软件
~表示没有任何东西

:1,$s/word1/word2/gc 或 :%s/word1/word2/gc	从第一行到最后一行寻找 word1 字符串，并将该字符串取代为 word2 ！且在取代前显示提示字符给用户确认 (confirm) 是否需要取代！(常用)

p 为将已复制的数据在光标下一行贴上，P 则为贴在游标上一行
u	复原前一个动作。(常用)
[Ctrl]+r	重做上一个动作。(常用）
想要重复删除、重复贴上等等动作，按下小数点『.』就好了！ (常用)

ZZ	这是大写的 Z 喔！如果修改过，保存当前文件，然后退出！效果等同于(保存并退出)
ZQ	不保存，强制退出。效果等同于 :q!。


## 8、vim 中批量添加注释

方法一 ：块选择模式

批量注释：

Ctrl + v 进入块选择模式，然后移动光标选中你要注释的行，再按大写的 I 进入行首插入模式输入注释符号如 // 或 #，输入完毕之后，按两下 ESC，Vim 会自动将你选中的所有行首都加上注释，保存退出完成注释。

取消注释：

Ctrl + v 进入块选择模式，选中你要删除的行首的注释符号，注意 // 要选中两个，选好之后按 d 即可删除注释，ESC 保存退出。

方法二: 替换命令

批量注释。

使用下面命令在指定的行首添加注释。

使用名命令格式： :起始行号,结束行号s/^/注释符/g（注意冒号）。

取消注释：

使用名命令格式： :起始行号,结束行号s/^注释符//g（注意冒号）。

例子：

1、在 10 - 20 行添加 // 注释

:10,20s#^#//#g
2、在 10 - 20 行删除 // 注释

:10,20s#^//##g
3、在 10 - 20 行添加 # 注释

:10,20s/^/#/g
4、在 10 - 20 行删除 # 注释

:10,20s/#//g

## 9、yum
yum（ Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 SUSE 中的 Shell 前端软件包管理器。基于 RPM 包管理

网易（163）yum源是国内最好的yum源之一 
http://mirrors.163.com
中科大的 yum 源，安装方法查看：https://lug.ustc.edu.cn/wiki/mirrors/help/centos

sohu 的 yum 源安装方法查看: http://mirrors.sohu.com/help/centos.html


对于 Linux 软件安装时提示缺失库的，可以使用 yum 的 provides 参数查看 libstdc++.so.6 的库文件包含在那个安装包中只需要执行：

yum provides libstdc++.so.6

## 10、apt
apt（Advanced Packaging Tool）是一个在 Debian 和 Ubuntu 中的 Shell 前端软件包管理器。

安装 mplayer 如果存在则不要升级：
sudo apt install mplayer --no-upgrade

查看 pinta 包的相关信息：
apt show pinta

清理不再使用的依赖和库文件：
sudo apt autoremove






