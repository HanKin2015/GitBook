# 通过 SSH 在远程 Linux 系统上执行命令 
参考：https://zhuanlan.zhihu.com/p/584331153

## 1、基本使用方法
```
ssh -p 2200 sk@192.168.225.22 uname -a
ssh sk@192.168.225.22 "uname -r && lsb_release -a"  # 注意一定需要引号
ssh sk@192.168.225.22 "uname -r ; lsb_release -a"
ssh -t sk@192.168.225.22 sudo apt install apache2   # 使用它来强制进行伪终端分配
```

## 2、执行脚本
```
#!/bin/bash
#Name: Display System Details
#Owner: OSTechNIx
#----------------------------
echo /etc/*_ver* /etc/*-rel*; cat /etc/*_ver* /etc/*-rel*

ssh sk@192.168.225.22 'bash -s' < system_information.sh
ssh sk@192.168.225.22 du -ah > diskusage.txt
```

## 3、配置 SSH 密钥认证，避免输入密码
(Linux 系统下如何配置 SSH 密钥认证)[https://link.zhihu.com/?target=https%3A//ostechnix.com/configure-ssh-key-based-authentication-linux/]

## 4、什么是 sshpass?
sshpass 是为使用键盘交互密码身份验证模式运行 ssh 而设计的，但它以非交互的方式。简单来说，sshpass 提供了非交互式的方式来验证 SSH 会话。

SSH 使用直接 TTY 访问来确保密码确实是由交互式键盘用户发出的。sshpass 在一个专用 tty 中运行 SSH，让它误以为从交互用户那里获得了密码。

### 4-1、通过 SSH 和 sshpass 在远程机器上执行命令
sshpass 可以通过参数接受密码，或者通过环境变量读取密码，也可以从文本文件中读取密码。

警告： 所有这些方法都是 高度不安全的。所有系统用户都可以通过 ps 命令看到命令中的密码。不建议在生产中使用这些方法。最好使用基于密钥的身份验证。
```
sshpass -p password ssh ostechnix@192.168.1.30 uname -a
SSHPASS=password sshpass -e ssh ostechnix@192.168.1.30 uname -a
sshpass -f mypassword.txt ssh ostechnix@192.168.1.30 uname -a

[admin@HANKIN bin]$ sshpass -p handsome@888 ssh root@localhost -p 9888 uname -a
Linux kernel 4.2.4 #1 SMP Thu Jul 6 16:28:43 CST 2023 x86_64 GNU/Linux
[admin@HANKIN bin]$ SSHPASS=handsome@888 sshpass -e ssh root@localhost -p 9888 uname -a
Linux kernel 4.2.4 #1 SMP Thu Jul 6 16:28:43 CST 2023 x86_64 GNU/Linux
[admin@HANKIN ~]$ sshpass -f /home/admin/hj.txt ssh root@localhost -p 9888 uname -a
Linux kernel 4.2.4 #1 SMP Thu Jul 6 16:28:43 CST 2023 x86_64 GNU/Linux
[admin@HANKIN ~]$ cat hj.txt
handsome@888
```

### 4-2、OpenSSH配置选项
```
sshpass -p password ssh -o StrictHostKeyChecking=no root@localhost -p 2203
```
-o参数用于指定OpenSSH配置选项。在这个例子中，StrictHostKeyChecking是一个OpenSSH配置选项，它用于控制SSH客户端在连接到主机时如何处理主机密钥检查。StrictHostKeyChecking有几个可能的值：
- yes：表示SSH客户端会拒绝连接到任何未知主机，或者主机密钥发生变化的主机。
- no：表示SSH客户端会自动接受任何主机密钥，即使它们之前没有见过。
- ask：表示SSH客户端会提示用户是否接受新的主机密钥。
在你的命令中，-o StrictHostKeyChecking=no的意思是告诉SSH客户端在连接时自动接受任何主机密钥，而不会提示用户进行确认。

## 5、TTY
TTY是由虚拟控制台，串口以及伪终端设备组成的终端设备。

在Linux中，TTY也许是跟终端有关系的最为混乱的术语。TTY是TeleTYpe的一个老缩写。Teletypes，或者teletypewriters，原来指的是电传打字机，是通过串行线用打印机键盘通过阅读和发送信息的东西，和古老的电报机区别并不是很大。之后，当计算机只能以批处理方式运行时（当时穿孔卡片阅读器是唯一一种使程序载入运行的方式），电传打字机成为唯一能够被使用的“实时”输入/输出设备。最终，电传打字机被键盘和显示器终端所取代，但在终端或TTY接插的地方，操作系统仍然需要一个程序来监视串行端口。一个getty“Get TTY”的处理过程是：一个程序监视物理的TTY/终端接口。对一个虚拟网络控制台（VNC）来说，一个伪装的TTY(Pseudo-TTY，即假冒的TTY，也叫做“PTY”）是等价的终端。当你运行一个xterm(终端仿真程序）或GNOME终端程序时，PTY对虚拟的用户或者如xterm一样的伪终端来说，就像是一个TTY在运行。“Pseudo”的意思是“duplicating in a fake way”（用伪造的方法复制），它相比“virtual”或“emulated”更能真实的说明问题。而在的计算中，它却处于被放弃的阶段。
tty也是一个Unix命令，用来给出当前终端设备的名称。
终端是一种字符型设备，它有多种类型，通常使用tty来简称各种类型的终端设备。
```
[root@ubuntu0006:~] #tty
/dev/pts/3
[root@ubuntu0006:~] #echo "hello" > /dev/tty
hello
```

## 6、SSH_ASKPASS全局变量
SSH_ASKPASS是一个环境变量，用于指定一个可执行程序的路径，该程序用于提供SSH客户端在需要密码时进行交互式输入。当SSH客户端需要密码时，它会调用SSH_ASKPASS指定的程序来获取密码，而不是在终端上直接提示用户输入密码。

这种机制通常用于在脚本或自动化过程中使用SSH时，以便自动提供密码而无需人工干预。通过设置SSH_ASKPASS环境变量，你可以指定一个自定义的程序来提供密码，该程序可以从文件、密钥库或其他安全存储中获取密码，或者通过其他方式自动化密码输入过程。

需要注意的是，为了安全起见，SSH_ASKPASS程序应该是可信的，并且应该采取适当的安全措施来保护密码的存储和传输。
代码见：D:\Github\Storage\shell\ssh\SSH_ASKPASS.sh

使用SSH_ASKPASS变量，一定需要setsid命令，否则还是会需要输入密码：
```
[admin@HANKIN ~]$ export SSH_ASKPASS="/home/admin/hj_psw"
[admin@HANKIN ~]$ echo $SSH_ASKPASS
/home/admin/hj_psw
[admin@HANKIN ~]$ export DISPLAY=YOURDOINGITWRONG
[admin@HANKIN ~]$ ssh -o stricthostkeychecking=no root@localhost -p 9889 uname -a
root@localhost's password:

[admin@HANKIN ~]$ setsid ssh -o stricthostkeychecking=no root@localhost -p 9889 uname -a
[admin@HANKIN ~]$ Linux kernel 4.2.4 #1 SMP Thu Jul 6 16:28:43 CST 2023 x86_64 GNU/Linux

[admin@HANKIN ~]$ 
```



