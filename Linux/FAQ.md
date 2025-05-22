# 一些疑难杂症问题

## 1、Ubuntu或者Xubuntu下图形界面卡死解决办法
```查找xorg进程pid
ps -ef | grep tty7

ps -t tty7  <===>  ps -e | grep tty7
```

```fuckXorg.sh
#!/bin/bash

pid=`ps -o pid -t tty7`
pid=`echo $pid | cut -c4-`
echo 'pid is' $pid
kill $pid

exit 5
```

## 2、dmidecode命令
dmidecode命令 可以让你在Linux系统下获取有关硬件方面的信息。dmidecode的作用是将DMI数据库中的信息解码，以可读的文本方式显示。由于DMI信息可以人为修改，因此里面的信息不一定是系统准确的信息。dmidecode遵循SMBIOS/DMI标准，其输出的信息包括BIOS、系统、主板、处理器、内存、缓存等等。

DMI（Desktop Management Interface,DMI）就是帮助收集电脑系统信息的管理系统，DMI信息的收集必须在严格遵照SMBIOS规范的前提下进行。SMBIOS（System Management BIOS）是主板或系统制造者以标准格式显示产品管理信息所需遵循的统一规范。SMBIOS和DMI是由行业指导机构Desktop Management Task Force(DMTF)起草的开放性的技术标准，其中DMI设计适用于任何的平台和操作系统。

DMI充当了管理工具和系统层之间接口的角色。它建立了标准的可管理系统更加方便了电脑厂商和用户对系统的了解。DMI的主要组成部分是Management Information Format(MIF)数据库。这个数据库包括了所有有关电脑系统和配件的信息。通过DMI，用户可以获取序列号、电脑厂商、串口信息以及其它系统配件信息。

### 语法
dmidecode [选项]
### 选项
-d：(default:/dev/mem)从设备文件读取信息，输出内容与不加参数标准输出相同。
-h：显示帮助信息。
-s：只显示指定DMI字符串的信息。(string)
-t：只显示指定条目的信息。(type)
-u：显示未解码的原始条目内容。
--dump-bin file：将DMI数据转储到一个二进制文件中。
--from-dump FILE：从一个二进制文件读取DMI数据。
-V：显示版本信息。

### 实例
查看服务器型号：dmidecode | grep 'Product Name'
查看主板的序列号：dmidecode |grep 'Serial Number'
查看系统序列号：dmidecode -s system-serial-number
查看内存信息：dmidecode -t memory
查看OEM信息：dmidecode -t 11

## 3、O.E.M的主板是什么牌子
OEM是英文Original Equipment Manufacturer的缩写，按照字面意思，应翻译成原始设备制造商，指一家厂家根据另一家厂商的要求，为其生产产品和产品配件，亦称为定牌生产或授权贴牌生产。即可代表外委加工，也可代表转包合同加工。国内习惯称为协作生产、三来加工，俗称加工贸易。
OEM可简称为"代工生产"或贴牌生产，这种经营模式在国际上已运作多年并行之有效。企业为了加大其拥有资源在创新能力方面的配置，尽可能地减少在固定资产方面的投入，企业不直接进行生产，通过让别的企业代为生产的方式来完成产品的生产任务。这样，只需支付材料成本费和加工费，而不必承担设备折旧和自建工厂的负担，可随时根据市场变化灵活的按需下单。由此可促进成品业务形成新的经营优势，培养和壮大企业内在的扩张力，提高经营能力和管理水平，从而为更高层次的资本运营创造条件和积累经验。 AGP8X 不是八乘
OEM不是主板的牌子 有可能你用的是品牌机 也有可能你的主板是杂牌主板。

## 4、程序代码中，怎么区分status和state？
总结一下大家的观点：两者差不太多，state用起来可能更方便一些更通用一点；要区分的话，state表示一个确定的状态集中的某个状态（比如水的三态），status表示一种笼统的情形（比如你的生活状态、工作状态），不存在确定的状态集。

state所指的状态，一般都是有限的、可列举的你体重属于偏瘦、正常还是偏胖，那就是statereadyState -- 就那么四五种值onreadystatechange -- 那么四五种值之间发生变化往往就是一个实体固有的稳定的状态如（隐藏、显示），（是、否），（可用、不可用）可数的，表达不会轻易变化的状态如ReadyState, Fail这类比较常用，各种状态都可以用它，但是它更着重于一种心理状态或者物理状态说物态变化用state再恰当不过如果说一个物质的四种状态，可以说“solid state”，但如果你说“solid status”，第一，这两个词的组合不像是描述物态，更像是在说“确定的状况（solid产生歧义‘确定的/确凿的’）”；第二，这个说法即使不被误解，也需要事先约定一组物态变化顺序，比如把这个物质从固态开始加热然后电离，可能先后经历固态、液态、气态、等离子态这四个阶段。类似先定义枚举，然后引用的方式status则是不可确定的状态你体重多少公斤，属于statusstatusText -- 描述性的文字，可以任意window.status -- 描述性的文字，可以任意偏向于运行时状态不可数的，随过程不断变化的状态如OrderedStatus, ShippingStatus,ReceiptedStatus用在人的身上一般是其身份和地位，作“状态，情形”讲时，多指政治和商业两者差不多看各类文档里面 status 和 state 是混用的，主要是喜好和习惯问题书面上可能有区分，程序里还好我以前习惯用status后来发现我见过的大部分都习惯用state。而且好像state又好写，又好读，所以我也开始用state了

State 表达的是形态，而 Status 表达的是从一种形态转换成另一种形态的过程中，那些有显著特征的离散中间值。还是说那个旅馆房间的例子，一个房间可以是婚房、普通房、豪华总统房，这些都是用 State 来表达。把一个普通房改造成豪华总统房，这个过程就有设计、材料准备、工人就位、施工、验收等步骤，这个时候就用 Status 来表达。那么，区分点在哪？区分点就在于一个房间当用State 描述时，它是个彼此独立的枚举值，可以没有前后顺序的在婚房、普通房、豪华总统房之间来回转换。而当使用 Status 时，是存在前后状态依赖关系的一个变化量，不能没有做设计就施工，也不能没施工就验收。所以，State 和 Status 的核心区别，就是它们的枚举值之间是否有依赖关系，没有依赖关系的用 State，有依赖关系的用 Status。

## 5、执行systemctl命令失败
```
[root@ubuntu0006:/media/hankin/vdb] #vim /etc/ssh/sshd_config
[root@ubuntu0006:/media/hankin/vdb] #/etc/init.d/ssh restart
[....] Restarting ssh (via systemctl): ssh.serviceJob for ssh.service failed because the control process exited with error code. See "systemctl status ssh.service" and "journalctl -xe" for details.
 failed!
 ```
 "systemctl status ssh.service" and "journalctl -xe"通过这些命令一般来说可以看出一些错误，如配置哪里出错。
 
 ## 6、Linux无法获得锁的解决办法
 - 强制解锁，删除锁文件
 - 使用ps aux找到占锁的进程，关键字apt或者apt-get
 
 ## 7、The system is running in low-graphics mode时解决方法
1. df -h
2. cd /etc/X11
3. sudo cp xorg.conf.failsafe xorg.conf
4. sudo reboot

## 8、chroot: failed to run command `/bin/bash': No such file or directory
缺少依赖，lib和lib64、sbin虽然是软链接，但是chroot后路径会变化
https://www.bbsmax.com/A/pRdBB4vDdn/ 

## 9、linux 上删除所有的无效文件链接

### 9-1、linux删除文件夹软链接
错误：rm dirname/ 
正确：rm dirname --> 只删除链接文件夹，元文件夹不变

## 10、[shell之列表的定义与循环](https://www.cnblogs.com/zyy98877/p/10234527.html)
https://cloud.tencent.com/developer/ask/92780 
 
## 11、Linux 文件不能删除，没有权限问题
第一步：查看文件属性
lsattr xxx 查看文件属性(xxx为文件名)

看到的情况
-----a-------或者-----i-------

第二步：去除属性
chattr -a xxx 或者 chattr -i xxx

第三步：删除文件
rm -rf xxx

## 12、Cannot set LC_CTYPE to default locale: No such file or directory解决方法
执行程序时报错：UnicodeEncodeError: 'ascii' codec can't encode charrcters in position
怀疑可能是编码问题，扫描前执行一下这个试试：export LC_ALL=en_US.UTF-8
然后报错bash: waring: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
执行locale命令报错：Cannot set LC_CTYPE to default locale: No such file or directory

locale -a查看系统内安装的locale
发现没有en_US.UTF-8，进行手动安装locale-gen en_US.UTF-8
搞定。

## 13、输出echo的帮助信息
help echo
/bin/echo --help
`which echo` --help

## 14、浮点数计算
```
echo "4 * 0.2" | bc 
#显示两位小数
echo "scale=2;3/8" | bc
#十进制转二进制
echo "obase=2;100" | bc
#二进制转十进制
echo "obase=10,110100110" | bc

# 附整数运算
aa = `expr 3 + 4`

aa = $(expr 3 + 4)

aa = $[ 3 + 4]

aa = $(( 3 + 4 ))

#自加
let i++

#自减
let i--

#简写
let no+=6 等同于 let no = no + 6
```

## 15、使用cp复制文件时如何显示传输进度和速度？
https://qastack.cn/ubuntu/17275/how-to-show-the-transfer-progress-and-speed-when-copying-files-with-cp

最终我选择：
```
date +%s; cp a b; date +%s
手动计算的方法
```

rsync -av --progress t01/demo.zip t02/

## 16、-bash: cannot create temp file for here-document: No space left on device
登陆Linux系统后, cd 到某个指定目录时使用tab键的时候报以下错误:

-bash: cannot create temp file for here-document: No space left on device

原因: 不能创建临时文件文档,设备上没有剩余空间(告诉我们磁盘空间满了)

## 17、XXXX is not in the sudoers file. This incident will be reported解决方法

### 17-1、解决Linux系统下，出现“不在sudoers文件中，此事将被报告”的问题
https://blog.csdn.net/sinat_39589027/article/details/85323996

解决方法:编辑sudoers文件有两种办法，一种是以root帐号执行visudo，另一种是root帐号执行vi /etc/sudoers.其实两者都是修改/etc/sudoers。

注意：在修改 /etc/sudoers时，一定注意该文件是否有写权限，如果没有写权限，则使用 chmod u+w /etc/sudoers使其拥有写权限。写完后注意将写权限去掉，以防止误操作。

假设你的用户名是“minghai”，属于“minghai”用户组。

为了让用户minghai能够执行sudo命令，你可以在sudoers文件中加上下面四行的任意一行。
```
minghai     ALL=（ALL）             ALL 
%minghai    ALL=（ALL）             ALL
minghai     ALL=（ALL）             NOPASSWD：ALL(出于方便，推荐使用此设置) 
%minghai    ALL=（ALL）             NOPASSWD：ALL
```
解释说明：
第一行：允许用户minghai执行sudo命令（需要输入密码）。
第二行：允许用户组minghai里面的用户执行sudo命令（需要输入密码）。
第三行：允许用户minghai执行sudo命令，并且在执行的时候不输入密码。
第四行：允许用户组minghai里面的用户执行sudo命令，并且在执行的时候不输入密码。

当然如果你理解上面的原理后，可以直接输入如下命令解决此问题
```
su echo 'xxx ALL=(ALL) ALL' >> /etc/sudoers  (其中xxx代表用户名) 
```

### 17-2、sudoedit和visudo命令
sudoedit和visudo都是用于编辑sudoers文件的命令，sudoers文件是授权用户使用sudo命令的配置文件。

sudoedit命令是一个简单的文本编辑器，它允许授权用户编辑sudoers文件。使用sudoedit命令编辑sudoers文件时，会将文件副本复制到临时目录中，编辑完成后再将其复制回原始位置。这种方式可以避免在编辑过程中意外破坏sudoers文件。

visudo命令是一个更高级的sudoers文件编辑器，它会检查编辑后的文件是否符合sudoers文件的语法规则。如果文件存在语法错误，visudo会提示用户进行修正。这种方式可以避免由于语法错误导致sudoers文件无法使用的情况。

总的来说，如果你只需要简单地编辑sudoers文件，可以使用sudoedit命令。如果你需要对sudoers文件进行更复杂的编辑，并且需要确保文件的语法正确，可以使用visudo命令。

## 17-3、不只是跟/etc/sudoers文件有关
我在/etc/group文件中修改了wheel:x:10:admin后的用户名后，然后重新ssh连接服务器后，这时候sudo切换root命令后就会报错admin is not in the sudoers file.  This incident will be reported.

系统中存在其他提供 root 权限的用户组/etc/group可能有：sudo 组、admin 组、wheel 组。
在我的xubuntu中则就是sudo 组。
```
[root@ubuntu0006:~] #su hejian
hejian@ubuntu0006:/root$ sudo -i
[sudo] hejian 的密码：
hejian 不在 sudoers 文件中。此事将被报告。
hejian@ubuntu0006:/root$ su
密码：
[root@ubuntu0006:~] #vi /etc/group
[root@ubuntu0006:~] #su hejian
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

hejian@ubuntu0006:/root$ sudo -i
[sudo] hejian 的密码：
[root@ubuntu0006:~] #
```
另外查看/etc/group文件不需要root权限，但是查看/etc/sudoers则需要。修改那就必须要。

## 18、error: /lib64/libpthread.so.0: symbol h_errno
是真的烦，不要轻易升级glibc，导致整个环境坏了。然后安装gcc后出现这种情况。

未尝试：https://blog.51cto.com/lwm666/2773648
ssh已坏，重启物理机启动不起来，centos7系统。重刷。
```
[root@localhost hj]# ll
ls: relocation error: /lib64/libpthread.so.0: symbol __libc_dl_error_tsd, version GLIBC_PRIVATE not defined in file libc.so.6 with link time reference
[root@localhost hj]# pwd
/home/hd/桌面/glibc-2.25/build/hj
[root@localhost hj]# uname -a
Linux localhost.localdomain 3.10.0-862.el7.x86_64 #1 SMP Fri Apr 20 16:44:24 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
[root@localhost hj]# uname -r
3.10.0-862.el7.x86_64
[root@localhost hj]# export LD_PRELOAD=/lib64/libpthread.so.0 
-bash: export LD_PRELOAD=/lib64/libpthread.so.0 : 没有那个文件或目录
[root@localhost hj]# cd /lib64
[root@localhost lib64]# realpath libpthread.so
libpthread.so    libpthread.so.0
```

## 19、Linux查看程序卡死位置方法|GDB|strace
https://blog.csdn.net/bandaoyu/article/details/114303378

ps auxf
strace -p [进程id]

进程的所有信息路径：/proc/

### ltrace和strace对比分析
strace一共消耗了0.19秒,strace把性能提升了30倍,这主要是strace在跟踪系统调用的时候不需要动态库,而ltrace是根据动态库来分析程序运行的.
所以ltrace也只能跟踪动态库,不能跟踪静态库.
事实上我们用ltrace和strace都可以发现程序在哪个系统调用时发生了性能瓶径.
ltrace用-T,而strace也用-T.
 
 
三)ltrace与strace的相同点
 
ltrace与strace都可以指定PID,即对运行中的程序进行跟踪.
ltrace -p PID与strace -p PID
 
ltrace与strace都可以跟踪程序fork或clone子进程.
ltrace是用-f参数,而strace是用-f(fork/clone)和-F(vfork).
https://www.cnblogs.com/machangwei-8/p/10388938.html

## 20、rm命令失效

### 20-1、现象
使用mobaxterm软件ssh到xubuntu系统使用rm命令执行失败

确认当前登录的是root用户：whoami

创建一个文件：touch xxxxx
删除文件：rm xxxxx
提示如下：
Broadcast message from root@ubuntu0006 (pts/1) (Mon Mar  1 10:28:03 2021):

文件xxxxx未被删除

### 20-2、gdb调试
gdb /bin/rm
进入后: set args xxxxx
r
删除成功

### 20-3、strace命令追踪
strace rm xxxxx
删除成功

### 20-4、怀疑rm命令是不是被人动了手脚
/bin/rm xxxxx
结果：删除成功

which rm
结果：/bin/rm

拷贝rm命令到当前目录

alias命令执行后发现：
```
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
alias rm='wall'
```
what???????

### 20-5、alias删除
unalias rm

发现被人写在了/etc/profile中，需要删除对应的行

## 21、dmesg -wT显示的时间和date命令显示的时间不匹配
问题原因：dmesg -T 时间戳不精确
解决方案：重启主机或者更换方式查看系统日志/var/log/messages
查看当前系统的时区设置：date -R 或者 cat /etc/timezone
查看硬件时间：hwclock
同步硬件时间和系统时间：sudo hwclock --systohc
检查NTP服务的配置和状态：timedatectl status

```
[Tue Jun 13 16:13:30 2023] usb 2-3.2: USB disconnect, device number 96
[Tue Jun 13 16:13:30 2023] usb 2-3.2.2: USB disconnect, device number 97
[Tue Jun 13 16:13:31 2023] usb 2-3.2: new high-speed USB device number 98 using xhci_hcd
[Tue Jun 13 16:13:31 2023] usb 2-3.2: New USB device found, idVendor=1a40, idProduct=0101
[Tue Jun 13 16:13:31 2023] usb 2-3.2: New USB device strings: Mfr=0, Product=1, SerialNumber=0
[Tue Jun 13 16:13:31 2023] usb 2-3.2: Product: USB 2.0 Hub
[Tue Jun 13 16:13:31 2023] hub 2-3.2:1.0: USB hub found
[Tue Jun 13 16:13:31 2023] hub 2-3.2:1.0: 4 ports detected
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: new full-speed USB device number 99 using xhci_hcd
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: New USB device found, idVendor=261a, idProduct=000c
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: Product: SDSES Custom HID
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: Manufacturer: SDSESSTM32ctronics
[Tue Jun 13 16:13:32 2023] usb 2-3.2.2: SerialNumber: 6D78F9D00B37
[Tue Jun 13 16:13:32 2023] hid-generic 0003:261A:000C.006B: hiddev0,hidraw0: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input0
[Tue Jun 13 16:13:32 2023] input: SDSESSTM32ctronics SDSES Custom HID as /devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3.2/2-3.2.2/2-3.2.2:1.1/0003:261A:000C.006C/input/input82
[Tue Jun 13 16:13:32 2023] hid-generic 0003:261A:000C.006C: input,hidraw1: USB HID v1.10 Keyboard [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input1
[Tue Jun 13 16:13:32 2023] hid-generic 0003:261A:000C.006D: hiddev0,hidraw2: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input2

root@hankin:~# date
Tue Jun 13 14:59:30 CST 2023

root@hankin:~# journalctl -f
-- Logs begin at Mon 2023-06-12 05:43:53 CST. --
Jun 13 15:00:07 hankin kernel: usb 2-3.2: USB disconnect, device number 98
Jun 13 15:00:07 hankin kernel: usb 2-3.2.2: USB disconnect, device number 99
Jun 13 15:00:08 hankin kernel: usb 2-3.2: new high-speed USB device number 100 using xhci_hcd
Jun 13 15:00:08 hankin kernel: usb 2-3.2: New USB device found, idVendor=1a40, idProduct=0101
Jun 13 15:00:08 hankin kernel: usb 2-3.2: New USB device strings: Mfr=0, Product=1, SerialNumber=0
Jun 13 15:00:08 hankin kernel: usb 2-3.2: Product: USB 2.0 Hub
Jun 13 15:00:08 hankin kernel: hub 2-3.2:1.0: USB hub found
Jun 13 15:00:08 hankin kernel: hub 2-3.2:1.0: 4 ports detected
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: new full-speed USB device number 101 using xhci_hcd
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: New USB device found, idVendor=261a, idProduct=000c
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: Product: SDSES Custom HID
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: Manufacturer: SDSESSTM32ctronics
Jun 13 15:00:09 hankin kernel: usb 2-3.2.2: SerialNumber: 6D78F9D00B37
Jun 13 15:00:09 hankin kernel: hid-generic 0003:261A:000C.006E: hiddev0,hidraw0: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input0
Jun 13 15:00:09 hankin kernel: input: SDSESSTM32ctronics SDSES Custom HID as /devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3.2/2-3.2.2/2-3.2.2:1.1/0003:261A:000C.006F/input/input83
Jun 13 15:00:09 hankin kernel: hid-generic 0003:261A:000C.006F: input,hidraw1: USB HID v1.10 Keyboard [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input1
Jun 13 15:00:09 hankin kernel: hid-generic 0003:261A:000C.0070: hiddev0,hidraw2: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input2
```
这是为什么呢？？？

参考：https://blog.csdn.net/s_alted/article/details/129936086
```
root@hankin:~# cat /var/log/kern.log
Jun 13 15:00:07 kernel: [2349004.967206] usb 2-3.2: USB disconnect, device number 98
Jun 13 15:00:07 kernel: [2349004.967215] usb 2-3.2.2: USB disconnect, device number 99
Jun 13 15:00:08 kernel: [2349006.278438] usb 2-3.2: new high-speed USB device number 100 using xhci_hcd
Jun 13 15:00:08 kernel: [2349006.366803] usb 2-3.2: New USB device found, idVendor=1a40, idProduct=0101
Jun 13 15:00:08 kernel: [2349006.366808] usb 2-3.2: New USB device strings: Mfr=0, Product=1, SerialNumber=0
Jun 13 15:00:08 kernel: [2349006.366811] usb 2-3.2: Product: USB 2.0 Hub
Jun 13 15:00:08 kernel: [2349006.367456] hub 2-3.2:1.0: USB hub found
Jun 13 15:00:08 kernel: [2349006.367483] hub 2-3.2:1.0: 4 ports detected
Jun 13 15:00:09 kernel: [2349006.655186] usb 2-3.2.2: new full-speed USB device number 101 using xhci_hcd
Jun 13 15:00:09 kernel: [2349006.760692] usb 2-3.2.2: New USB device found, idVendor=261a, idProduct=000c
Jun 13 15:00:09 kernel: [2349006.760698] usb 2-3.2.2: New USB device strings: Mfr=1, Product=2, SerialNumber=3
Jun 13 15:00:09 kernel: [2349006.760702] usb 2-3.2.2: Product: SDSES Custom HID
Jun 13 15:00:09 kernel: [2349006.760705] usb 2-3.2.2: Manufacturer: SDSESSTM32ctronics
Jun 13 15:00:09 kernel: [2349006.760707] usb 2-3.2.2: SerialNumber: 6D78F9D00B37
Jun 13 15:00:09 kernel: [2349006.762022] hid-generic 0003:261A:000C.006E: hiddev0,hidraw0: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input0
Jun 13 15:00:09 kernel: [2349006.762903] input: SDSESSTM32ctronics SDSES Custom HID as /devices/pci0000:00/0000:00:14.0/usb2/2-3/2-3.2/2-3.2.2/2-3.2.2:1.1/0003:261A:000C.006F/input/input83
Jun 13 15:00:09 kernel: [2349006.815795] hid-generic 0003:261A:000C.006F: input,hidraw1: USB HID v1.10 Keyboard [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input1
Jun 13 15:00:09 kernel: [2349006.816631] hid-generic 0003:261A:000C.0070: hiddev0,hidraw2: USB HID v1.10 Device [SDSESSTM32ctronics SDSES Custom HID] on usb-0000:00:14.0-3.2.2/input2
```
发现文件上面时间是对的上的。

这个 -T 参数可以直接转换为人类可读时间（即年月日小时分钟秒），但是不一定精确，如果系统挂起或者恢复之后，日志使用的时间源是不会更新的
关于dmesg -T 时间戳不精确的情况，我查了好多资料都说没有解决方法。
https://www.cnblogs.com/hugetong/p/12222470.html
https://www.jb51.cc/linux/400861.html

chatgpt回答：
dmesg 命令显示的是内核日志，而 date 命令显示的是系统时间。这两个时间戳可能会有一些微小的差异，因为它们是由不同的系统组件维护的。
内核日志中的时间戳是由内核维护的，它记录了内核中发生的事件的时间。而系统时间是由系统时钟维护的，它是用户空间程序使用的时间。
如果您发现 dmesg 命令和 date 命令显示的时间戳之间存在较大的差异，那么可能是因为系统时钟出现了问题。您可以尝试重新同步系统时钟，例如使用 ntpdate 命令或者手动设置时间。

发现好像真的没有解决办法，唯有重启大法：
如果您的系统上没有 ntpdate 命令，您可以尝试使用 timedatectl 命令来同步系统时间。以下是使用 timedatectl 命令同步系统时间的步骤：
检查当前系统时间和时区：
```
timedatectl
```
如果时区不正确，可以使用以下命令设置正确的时区：
```
timedatectl set-timezone <timezone>
```

其中 <timezone> 是您所在的时区，例如 Asia/Shanghai。

启用网络时间协议（NTP）：
```
timedatectl set-ntp true
```

手动同步系统时间：
```
timedatectl set-time "YYYY-MM-DD HH:MM:SS"
```
其中 "YYYY-MM-DD HH:MM:SS" 是您想要设置的时间。

检查系统时间是否已经同步：
```
timedatectl
```
如果输出中的 System clock synchronized 字段为 yes，则表示系统时间已经同步。

## 22、认证失败
```
[admin@HANKIN device_helper]$ echo "hello@999" | sudo -S /tmp/device_helper_info/sshpass -p "world@123" ssh -o StrictHostKeyChecking=no root@localhost -p 9284
[sudo] password for admin: Pseudo-terminal will not be allocated because stdin is not a terminal.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:kCa8N5BYjc6PsoyXlRO4o5zF66nJRprrGIOGkh/rA3M.
Please contact your system administrator.
Add correct host key in /root/.ssh/known_hosts to get rid of this message.
Offending ED25519 key in /root/.ssh/known_hosts:38
Password authentication is disabled to avoid man-in-the-middle attacks.
Keyboard-interactive authentication is disabled to avoid man-in-the-middle attacks.
UpdateHostkeys is disabled because the host key is not trusted.
root@localhost: Permission denied (publickey,password).
```
然后发现/root/.ssh/known_hosts文件有好多信息存储，删除指定那一行即可。但是其他端口可能在其他那一行，删除整个文件即可。
很奇怪，我自己重新创建的known_hosts内容居然也通过了，我更换远程主机试试，我通过来回主机切换以及手动创建多个端口的known_hosts内容终于复现了问题。
因此可能就是ssh连接建立太多，端口序号占满，或者是服务器重启后端口序号重新开始。

发现是sudo -S语句导致出现这种情况，如果单纯ssh root@localhost -p 9292没有问题。但是sudo -S ssh root@localhost -p 9292则就会出现这种情况。
```
-S, --stdin                   read password from standard input
```
又想原始问题，无奈文件被我给删除了，里面的内容还没有来得及看，其他服务器根本没有这么多内容，回不去了。但是我想到一个方法，那就是使用python脚本频繁连接，然后就会创建很多个内容，然后我再重启服务器，连接另外一个客户端不就行了。

## 23、密码不正确，Sorry，try again
结果出现大问题了，sudo -i密码不对，导致sudo -S执行输入密码也不对。
然后又莫名其妙的自己好了。。。。。密码还是原来的密码，怀疑可能是某个服务没有起来，导致密码未生效。
放弃了，关键文件被我直接删除了，另外客户问题找到原因了，是密码不准确导致，但是为何出现这种情况不清楚，内部重启服务器没有出现。
AI说种情况可能与系统中的密码缓存有关。当您使用sudo -i命令时，系统会要求您输入密码以进行特权提升。如果密码一开始被拒绝，但随后又被接受，这可能是因为密码缓存导致的。
密码缓存是一种机制，用于在一段时间内记住您输入的密码，以便在短时间内不必重复输入。这种缓存机制可以导致在一段时间内即使输入了正确的密码也被拒绝，然后在一段时间后又被接受，因为系统在缓存中找到了正确的密码。
如果您遇到这种情况，可以尝试等待一段时间后再次尝试，或者在密码被拒绝后清除密码缓存，然后再次输入密码。您可以使用sudo -k命令来清除密码缓存，然后再次尝试使用sudo -i命令并输入密码。

下一步步骤：
1、查看/etc/group文件，看admin用户是否在wheel组里面：存在
2、查看密码输入正确后报错信息：Sorry, try again
3、PAM 配置：检查 PAM 的配置文件，通常位于 /etc/pam.d/ 目录下，特别是 su 和 sudo 相关的文件，看看是否在这些文件中进行了特殊的配置：跟正常的没有什么区别
4、/etc/security/access.conf文件：全注释掉

查看系统认证日志：/var/log/secure
记录表明系统中启用了pam_tally2模块来限制用户的登录尝试次数，并且用户admin的sudo认证失败次数已经达到了限制，导致了拒绝登录。
```
pam_tally2 --user admin         # 查看用户admin的登录失败次数
pam_tally2 --user admin --reset # 重置用户admin的登录失败次数
```

最终真相大白：原来是密码中存在$符号，在linux系统中属于转义字符，需要添加斜杠或者使用单引号，通过单引号彻底解决了这个问题。
```
[root@ubuntu0006:~/cmake] #echo "password@123$hj"
password@123
[root@ubuntu0006:~/cmake] #echo "password@123\$hj"
password@123$hj
[root@ubuntu0006:~/cmake] #echo 'password@123$hj'
password@123$hj
[root@ubuntu0006:~/cmake] #echo password@123$hj
password@123
```
也能解释为何ssh正常，直接echo密码错误，另外复制粘贴密码时而成功时而失败就是因此保护机制，当出现过多错误时，拒绝登录。这时候exit后也会ssh连接不上。

## 24、Linux-使用cat查看文件后出现乱码，整个终端显示包括shell提示符都是乱码
问题描述：在bash下用cat显示二进制文件后会出现乱码，整个终端显示包括shell提示符都是乱码，这个跟语言环境无关。

解决办法：
恢复的话，大致有以下几种方法：
方法一(解决问题)：盲打输入echo -e '\xf'并回车。与这个命令相对的是echo -e '\xe'，在正常状态下输入此命令会把终端搞出乱码来。这两个命令的具体含义，尤其是十六进制的f和e分别代表什么还真不知道。
方法二：按Ctrl+V之后接着按Ctrl+O回车。
方法三：如果是xterm终端窗口，还可以可以盲打输入reset后回车，把终端重新初始化。这种方法在使用SecureCRT等工具telnet到服务器端的情况下不适用。

格式：hexdump -C binfile
一般文件都不是太小，最好用less来配合一下。
格式：hexdump -C binfile | less

## 25、Linux终端粘贴出现0~与1~字符解决办法
方法一(实测有效)：
```
shell终端输入命令    printf "\e[?2004l"
```

方法二：
关闭当前终端，重新打开；

## 26、引号的影响
```
root@665c3f2b3af1:/usr/local/lib# ll *avcodec*
-rw-r--r-- 1 root staff 412825310 Apr 20 12:56 libavcodec.a
lrwxrwxrwx 1 root staff        23 Apr 20 12:56 libavcodec.so -> libavcodec.so.59.37.100
lrwxrwxrwx 1 root staff        24 Apr 10 20:48 libavcodec.so.57 -> libavcodec.so.57.107.100
-rwxr-xr-x 1 root staff  12555152 Apr 10 20:48 libavcodec.so.57.107.100
lrwxrwxrwx 1 root staff        23 Apr 20 12:56 libavcodec.so.59 -> libavcodec.so.59.37.100
-rwxr-xr-x 1 root staff  13669224 Apr 20 12:56 libavcodec.so.59.37.100
root@665c3f2b3af1:/usr/local/lib# ll '*avcodec*'
ls: cannot access '*avcodec*': No such file or directory
root@665c3f2b3af1:/usr/local/lib# ll "*avcodec*"
ls: cannot access '*avcodec*': No such file or directory
```
ll *avcodec* 成功列出了以 avcodec 结尾的文件和符号链接，但在后续的命令中，使用 ll '*avcodec*' 和 ll "*avcodec*" 时却出现了 "No such file or directory" 的错误。这是因为在这两种情况下，使用了引号，导致 shell 将 *avcodec* 视为一个普通字符串，而不是通配符。
