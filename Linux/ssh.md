# ssh需要知道的那些事儿

## 1、使用ssh的原因
远程管理linux系统基本上都要使用到ssh，原因很简单：

- telnet、FTP等传输方式是以明文传送用户认证信息，本质上是不安全的，存在被网络窃听的危险。
- SSH（Secure Shell）目前较可靠，是专为远程登录会话和其他网络服务提供安全性的协议。利用SSH协议可以有效防止远程管理过程中的信息泄露问题，透过SSH可以对所有传输的数据进行加密，也能够防止DNS欺骗和IP欺骗。

ssh_config和sshd_config都是ssh服务器的配置文件，二者区别在于，前者是针对客户端的配置文件，后者则是针对服务端的配置文件。两个配置文件都允许你通过设置不同的选项来改变客户端程序的运行方式。下面列出来的是两个配置文件中最重要的一些关键词，每一行为“关键词&值”的形式，其中“关键词”是忽略大小写的

## 2、ssh配置文件
ubuntu默认存在：/etc/ssh/ssh_config
但是安装ssh之后会有：/etc/ssh/sshd_config
设置root远程登录：PermitRootLogin yes
需要主机设置root密码：passwd

UOS:(openssh-client)
/etc/ssh/ssh_config

sshd_config 和 ssh_config 是两个不同的配置文件，用于配置 OpenSSH 客户端和服务器的行为。
- sshd_config 文件是 OpenSSH 服务器的配置文件，用于配置 SSH 服务器的行为。这个文件通常位于 /etc/ssh/sshd_config。在这个文件中，你可以配置诸如端口号、认证方式、访问限制等与 SSH 服务器相关的设置。
- ssh_config 文件是 OpenSSH 客户端的配置文件，用于配置 SSH 客户端的行为。这个文件通常位于 ~/.ssh/config（针对单个用户）或 /etc/ssh/ssh_config（全局配置）。在这个文件中，你可以配置诸如主机别名、身份验证方式、连接参数等与 SSH 客户端相关的设置。
因此，sshd_config 用于配置 SSH 服务器，而 ssh_config 用于配置 SSH 客户端。这两个文件分别控制着服务器和客户端的行为，允许用户根据自己的需求进行定制化配置。

## 3、不同Linux系统网络重启
```
if [ "${ID_LIKE}" == "debian" ]; then
	/etc/init.d/networking restart
elif [ "${ID_LIKE}" == "redhat" ]; then
	/etc/init.d/network restart
else
	echo "unknown ID_LIKE"
fi
```

## 3、能ping得通服务器但却ssh不了的原因
我遇到的问题是这样的：
这个星期装服务器，搞了一个集群，服务器是双网卡，一个网卡连外网222开头，一个网卡连内网192开头，在系统等一切都安全成功，网络配置成功之后，奇怪的事情发生了，内网内任意一台主机ssh到这个台服务器上ssh root@222.....,都没有任何问题，但是从外网ssh root@222...就无法连接，报的错误是：

ssh_exchange_identification: read: Connection reset by peer

可能原因及排除过程：
(1)怀疑是网络不通，但从外网ping  222.....是能ping的通的，排除了网络问题；
(2)防火墙问题？，关闭防火墙：systemctl stop firewalld.sercive，没用，同样是这样；
(3)SSh服务没开？也不太可能，因为内网都能ssh到啊，不管，重启一遍 ： service sshd restart

查看22端口： netstat -tunpl | grep 22，端口是监听着的
查看ssh状态： service sshd status， sshd在运行。

(4)sshd权限变高了？查看一下： ll /var/empty/
也没有

(5)秘钥问题？
清除/root/.ssh/known_hosts文件和你所要连接ip或者主机名有关的ssh加密Key？
发现好像还没有这个文件，因为是刚装的系统，服务器还没有ssh别人，所以没有这个文件。这里说一下，这个文件是ssh别的主机的时候和别的主机建立的ssh通信，通常shh同一台主机的时候会在这里，如果ssh一台主机，然后那台主机修改了一些配置，RSA加密更改了等等，会发现连不上的。会出现一下这个错误，说明就是要删除/root/.ssh/known_hosts文件相关的ip和主机名了。
(6)vi /etc/ssh/sshd.conf（有些可能是vi /etc/ssh/sshd.confg）
找到X11Forwarding yes，将其注释掉或者改为no,重启启动ssh服务。
测试不行

### 解决办法
我的解决方法就是重新安装ssh。
后来的后来，我终于明白。。。。。
原来是没有装ssh
报错：ssh：connect to host localhost port 22: Connection refused
ps -ef|grep sshd，如果出现了sshd，则说明安装了，反之则没安装。
sudo apt-get install openssh-server

安装了ssh服务也遇到这种情况，关键是我有台虚拟机能ssh连接上，其余的虚拟机无法进行ssh连接。这种事情打算放弃了，可能真是拥有什么安全软件进行了端口拦截，只允许同网络的虚拟机进行访问。
```
systemctl status ssh
systemctl start ssh
ufw status
ufw allow ssh

SSH配置文件/etc/ssh/sshd_config
Port 22
PermitRootLogin no
PasswordAuthentication yes
systemctl restart ssh
```

## 4、Windows远程操作
右键点击’我的电脑‘进入’属性‘点击左过菜单栏中的’远程设置‘;把远程桌面选项设置成’允许运行任意版本远程桌面的计算机连接‘。
使用mstsc命令

## 5、报错Permission denied, please try again.
非常非常奇怪，能ping通，出现这种情况90%是密码错误，但是我能确认密码100%正确，这又是为什么呢？

折腾了一半天root用户是否存在？密码是否设置正确？不停地试密码。。。。

以为这样能解决：
处理这个问题最好的分析方法就是查看系统登录日志。（举例：centos 系统可以查看 /var/log/secure日志） 
从中可以看到这样的记录：pam_tally2(sshd:auth): user xxxxxx  (500) tally 74, deny 5 （账号登录失败次数过多导致被锁定） 
处理方法： 
pam_tally2 --reset -u xxx 解锁即可

最终才意识到这种情况俺遇到了很多次：
服务端SSH 服务配置了禁止root用户登录策略。

通过 cat 等指令查看 /etc/ssh/sshd_config 中是否包含类似如下配置：
PermitRootLogin no
PermitRootLogin prohibit-password

修改为yes即可。

## 6、ssh配置正常却连接不上
systemctl stop firewalld.service
service firewalld stop

发现ping不通，好办，一般来说是防火墙导致。

银河麒麟中设置公共网络为办公网络。

## 7、重启ssh服务
/etc/init.d/sshd restart
service sshd restart
/etc/init.d/ssh restart

好奇怪，到底哪个是真的？

## 8、ssh反映特别慢，但是网络没有问题的时怎么办
vi sshd_config找到注释的useDNS yes，修改为如下，并取消注释
useDNS no

完成添加后，保存退出

重启sshd服务
/etc/init.d/sshd restart

退出连接session
重新创建一个，感觉一下，是不是反映速度0.1秒都不到，特别迅速

如果是想让图形化界面连接快的话
还是找到vi sshd_config
找到#GSSAPIAuthentication yes
将yes修改为no 并且取消注释
GSSAPIAuthentication no
重启sshd服务即可

## 9、ssh/scp指定端口用法（注意p的大小写）
1、scp指定端口传输，端口需放在scp后面
scp -P 34543 root@1.2.3.4:/home/admin/xx ./

2、ssh指定端口登录：
ssh -p 34543 root@1.2.3.4

## 10、chroot环境无法使用scp命令发送文件，报错PRNG is not seeded
```
[root@chroot <vtcompile> ]#ssh-keygen -t rsa
PRNG is not seeded
[root@chroot <vtcompile> ]#ps aux | grep sshd
Error, do this: mount -t proc proc /proc
[root@chroot <vtcompile> ]#ps aux
Error, do this: mount -t proc proc /proc
[root@chroot <vtcompile> ]#top
Error, do this: mount -t proc proc /proc
[root@chroot <vtcompile> ]#ls /proc/
[root@chroot <vtcompile> ]#mount -t proc proc /proc
[root@chroot <vtcompile> ]#ls /proc/
1    12     13011  1624  20     23896  24729  24858  25184  28026  36   404  421   667  78    8     buddyinfo  crypto       fb           irq        kpagecount  modules       sched_debug  sys            uptime
10   12837  141    17    20523  23898  24731  24873  25185  29     37   411  5     669  7880  80    bus        devices      filesystems  kallsyms   kpageflags  mounts        self         sysrq-trigger  version
[root@chroot <vtcompile> ]#scp a.out root@1.2.3.4:/usr/bin/
PRNG is not seeded
lost connection
[root@chroot <vtcompile> ]#ps aux | grep sshd
root       416  0.0  0.1  55164  4688 ?        Ss    2021 105:11 /usr/sbin/sshd -D
sshd       683  0.0  0.0  53236  1964 ?        Ss    2021   0:02 /usr/sbin/exim4 -bd -q30m
root      7880  0.0  0.1  80628  6628 ?        Ss   Jan11   0:00 sshd: vtcompile@pts/2
root      7882  0.0  0.1  80628  5796 ?        Ss   Jan11   0:00 sshd: vtcompile@notty
root     12837  0.0  0.1  80632  6156 ?        Ss   Jan10   0:01 sshd: vtcompile@pts/1
root     12842  0.0  0.1  80628  5796 ?        Ss   Jan10   0:00 sshd: vtcompile@notty
root     23894  0.0  0.1  80628  6644 ?        Ss   Jan11   0:00 sshd: vtcompile@pts/0
root     23896  0.0  0.1  80628  5916 ?        Ss   Jan11   0:00 sshd: vtcompile@notty
root     24727  0.0  0.1  80628  6172 ?        Ss   03:16   0:00 sshd: vtcompile@pts/5
root     24729  0.0  0.1  80628  5928 ?        Ss   03:16   0:00 sshd: vtcompile@notty
root     24854  0.0  0.1  80640  6336 ?        Ss   Jan11   0:00 sshd: vtcompile@pts/3
root     24856  0.0  0.1  80628  5772 ?        Ss   Jan11   0:00 sshd: vtcompile@notty
root     25216  1.0  0.1  79280  5688 ?        Ss   03:23   0:00 sshd: root [priv]
saned    25217  0.0  0.0  56508  3104 ?        S    03:23   0:00 sshd: root [net]
root     25219  0.0  0.0   7840   516 ?        R+   03:23   0:00 grep sshd
root     27980  0.0  0.1  80628  6620 ?        Ss   Jan11   0:00 sshd: vtcompile@pts/4
root     27982  0.0  0.1  80628  5964 ?        Ss   Jan11   0:00 sshd: vtcompile@notty
[root@chroot <vtcompile> ]#ssh-keygen -t rsa
PRNG is not seeded 
[root@chroot <vtcompile> ]#ls /dev/
null
```
发现dev文件夹是空的，chroot环境。

```
[root@chroot <vtcompile> / ]#mount
proc on /proc type proc (rw,relatime)
[root@chroot <vtcompile> / ]#fdisk -l
[root@chroot <vtcompile> / ]#df
df: `/dev/pts': No such file or directory
df: `/sys/kernel/security': No such file or directory
df: `/dev/shm': No such file or directory
df: `/sys/fs/cgroup': No such file or directory
df: `/sys/fs/cgroup/systemd': No such file or directory
df: `/sys/fs/pstore': No such file or directory
df: `/sys/fs/cgroup/cpuset': No such file or directory
df: `/sys/fs/cgroup/cpu,cpuacct': No such file or directory
df: `/sys/fs/cgroup/devices': No such file or directory
df: `/sys/fs/cgroup/freezer': No such file or directory
df: `/sys/fs/cgroup/net_cls,net_prio': No such file or directory
df: `/sys/fs/cgroup/blkio': No such file or directory
df: `/sys/fs/cgroup/perf_event': No such file or directory
df: `/dev/mqueue': No such file or directory
df: `/sys/kernel/debug': No such file or directory
df: `/dev/hugepages': No such file or directory
df: `/home/envbaseroot/envbase_vt/run/lock': No such file or directory
df: `/home/envbaseroot/envbase_vt/run/shm': No such file or directory
df: `/home/envbaseroot/envbase_vt/dev': No such file or directory
df: `/home/envbaseroot/envbase_vt/dev/pts': No such file or directory
df: `/run/rpc_pipefs': No such file or directory
df: `/home/envbaseroot/envbase_vt/home': No such file or directory
df: `/home/envbaseroot/envbase_vt/part1': No such file or directory
df: `/home/envbaseroot/envbase_vt/home/envbaseroot/envbase_vt/part1': No such file or directory
df: `/home/envbaseroot/envbase_vt/part1/VMP5.5.1/dev': No such file or directory
df: `/home/envbaseroot/envbase_vt/home/envbaseroot/envbase_vt/part1/VMP5.5.1/dev': No such file or directory
df: `/home/envbaseroot/envbase_vt/part1/VMP5.4.14/dev': No such file or directory
df: `/home/envbaseroot/envbase_vt/home/envbaseroot/envbase_vt/part1/VMP5.4.14/dev': No such file or directory
df: `/home/envbaseroot/envbase_vt/home/envbaseroot/envbase_vt/part1/VMP5.4.14/dev': No such file or directory
Filesystem     1K-blocks      Used Available Use% Mounted on
rootfs         515930552 408669560  81030208  84% /
sysfs          515930552 408669560  81030208  84% /sys
udev           515930552 408669560  81030208  84% /dev
tmpfs          515930552 408669560  81030208  84% /run
/dev/vda1      515930552 408669560  81030208  84% /
tmpfs          515930552 408669560  81030208  84% /run/lock
[root@chroot <vtcompile> / ]#mount -t dev dev /dev
mount: unknown filesystem type 'dev'
[root@chroot <vtcompile> / ]#
```
无奈，百度也没有找到合适的方法，然后我从其他环境的dev目录拷贝到当前环境，然后就成功可用了。
另外一种方法是退出chroot环境，可能是这个chroot环境没有拷贝/dev/目录下面的文件导致的。

```
[root@chroot <vtcompile> / ]#fdisk -l

Disk /dev/vda: 214.7 GB, 214748364800 bytes
255 heads, 63 sectors/track, 26108 cylinders, total 419430400 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x99b00d77

   Device Boot      Start         End      Blocks   Id  System
/dev/vda1   *        2048   402372607   201185280   83  Linux
/dev/vda2       402374654   419428351     8526849    5  Extended
/dev/vda5       402374656   419428351     8526848   82  Linux swap / Solaris

Disk /dev/vdb: 536.9 GB, 536870912000 bytes
16 heads, 63 sectors/track, 1040253 cylinders, total 1048576000 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x00000000

Disk /dev/vdb doesn't contain a valid partition table
[root@chroot <vtcompile> / ]#df
Filesystem     1K-blocks      Used Available Use% Mounted on
rootfs         515930552 408669664  81030104  84% /
sysfs          515930552 408669664  81030104  84% /sys
udev           515930552 408669664  81030104  84% /dev
devpts         515930552 408669664  81030104  84% /dev/pts
tmpfs          515930552 408669664  81030104  84% /run
/dev/vda1      515930552 408669664  81030104  84% /
tmpfs          515930552 408669664  81030104  84% /dev/shm
tmpfs          515930552 408669664  81030104  84% /run/lock
mqueue         515930552 408669664  81030104  84% /dev/mqueue
hugetlbfs      515930552 408669664  81030104  84% /dev/hugepages
[root@chroot <vtcompile> / ]#ssh-keygen -t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa): ^C
[root@chroot <vtcompile> / ]#
```

## 11、奇怪的现象无法root用户连接登录
已修改可以使用root用户连接登录：/etc/ssh/sshd_config中PermitRootLogin yes
然后重启服务：/etc/init.d/ssh restart
然鹅密码输入正确还是报错：Permission denied (publickey,password).

然后我使用普通用户登录，使用su命令切换都是正常，然后退出后使用root用户登录也正常
猜测可能是ssh服务重启时间长？？？还是由于我先连接的原因？？？

## 12、ssh连接不上
报错：
```
13/09/2022 16:57.31 /home/mobaxterm # ssh root@172.22.16.73
ssh: connect to host 172.22.16.73 port 22: Connection refused
```
但是修改服务器的/etc/ssh/sshd_config文件即可：
```
ListenAddress 127.0.0.1
改为
ListenAddress 0.0.0.0
```

有时候发现还是连接不上，修改之后报错依然是这样。或者是ssh: connect to host 172.22.16.73 port 22: Connection timed out。
ping的通，但是22端口不通，其他一台主机能22端口通。主要区别在于网段不同。

想不通，实在是想不通。

### 12-1、扩展：22端口是否能ping通
Ping命令使用的是ICMP协议，不是端口号。ICMP不像http、https、FTP……等有对应的端口，ping也属于一个通信协议，是TCP/IP协议的一部分。利用“ping”命令可以检查网络是否连通，可以很好地帮助我们分析和判断网络故障，ping只有在安装了TCP/IP协议以后才可以使用，往往系统安装好就已经集成了。

Ping不使用端口，而是使用协议。Ping通过将Internet控制消息协议（ICMP）回显请求数据包发送到目标主机并等待ICMP回显应答来进行操作。但是，出于安全考虑，通常你可以禁用ping功能。

ping命令不支持端口检测，使用telnet命令即可。下载tcping.exe也可以。

用于探测对比百度的延时和抖动情况
如下方法：
tcping.exe -d -t --tee ./baidu.txt www.baidu.com

```
C:\Users\User\Downloads>tcping.exe 172.22.65.15

Probing 172.22.65.15:80/tcp - No response - time=2026.356ms
Probing 172.22.65.15:80/tcp - No response - time=2004.114ms
Control-C
Probing 172.22.65.15:80/tcp - No response - time=869.342ms

Ping statistics for 172.22.65.15:80
     3 probes sent.
     0 successful, 3 failed.  (100.00% fail)
Was unable to connect, cannot provide trip statistics.

C:\Users\User\Downloads>tcping.exe 172.22.65.15 22

Probing 172.22.65.15:22/tcp - Port is open - time=15.560ms
Probing 172.22.65.15:22/tcp - Port is open - time=0.860ms
Probing 172.22.65.15:22/tcp - Port is open - time=1.135ms
Probing 172.22.65.15:22/tcp - Port is open - time=1.153ms

Ping statistics for 172.22.65.15:22
     4 probes sent.
     4 successful, 0 failed.  (0.00% fail)
Approximate trip times in milli-seconds:
     Minimum = 0.860ms, Maximum = 15.560ms, Average = 4.677ms
```

windows10默认不支持，需要安装telnet客户端：
1、右键单击电脑桌面上的“我的电脑”图标，在展开的菜单中单击“属性”按钮打开属性窗口。
2、点击弹出窗口上的“控制面板”按钮，点击“程序”按钮。
3、进入程序界面后，点击窗口的“windows激活或禁用功能”按钮来设置界面。
4、在弹出窗口中选择“telnet客户端”，点击“OK”按钮telnet启动客户端：
5、此时cmd使用telnet命令，将ip和端口号写在后面，确认端口是否打开。
```
C:\Users\User\Downloads>telnet
‘telnet’不是内部或外部命令，也不是可运行的程序或批处理文件。

欢迎使用 Microsoft Telnet Client

Escape 字符为 'CTRL+]'

Microsoft Telnet>

C:\Users\User\Downloads>telnet 172.22.65.15
正在连接172.22.65.15...无法打开到主机的连接。 在端口 23: 连接失败

C:\Users\User\Downloads>telnet 172.22.65.15 22
SSH-2.0-OpenSSH_7.2p2 Ubuntu-4ubuntu2.10

Protocol mismatch.

遗失对主机的连接。
```

### 12-2、能ping通，但是22端口不通
```
C:\Users\User\Downloads>ping 172.22.16.73

正在 Ping 172.22.16.73 具有 32 字节的数据:
来自 172.22.16.73 的回复: 字节=32 时间<1ms TTL=61
来自 172.22.16.73 的回复: 字节=32 时间<1ms TTL=61
来自 172.22.16.73 的回复: 字节=32 时间<1ms TTL=61
来自 172.22.16.73 的回复: 字节=32 时间=1ms TTL=61

172.22.16.73 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 0ms，最长 = 1ms，平均 = 0ms

C:\Users\User\Downloads>tcping 172.22.16.73 22

Probing 172.22.16.73:22/tcp - No response - time=2027.149ms
Probing 172.22.16.73:22/tcp - No response - time=2014.705ms
Probing 172.22.16.73:22/tcp - No response - time=2009.826ms
Probing 172.22.16.73:22/tcp - No response - time=2007.349ms

Ping statistics for 172.22.16.73:22
     4 probes sent.
     0 successful, 4 failed.  (100.00% fail)
Was unable to connect, cannot provide trip statistics.

C:\Users\User\Downloads>telnet 172.22.16.73 22
正在连接172.22.16.73...无法打开到主机的连接。 在端口 22: 连接失败
```
查看ssh服务是否启动: systemctl status sshd
其中一种场景居然是服务没有启动，启动之后就能通22端口了，并且能ssh了。

查看端口是否打开: netstat -lnput |grep :22
```
[root@ubuntu0006:~] #netstat -lnput |grep :22
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      927/sshd
[root@ubuntu0006:~] #netstat -anp | grep :22
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      927/sshd
tcp        0      0 172.22.65.15:22         172.22.64.246:26504     ESTABLISHED 5348/sshd: root@not
tcp        0     48 172.22.65.15:22         172.22.64.246:26503     ESTABLISHED 5331/2

root@hankin:~# netstat -lnput |grep :22
tcp        0      0 127.0.0.1:22            0.0.0.0:*               LISTEN      5300/sshd
root@hankin:~# netstat -anp | grep :22
tcp        0      0 127.0.0.1:22            0.0.0.0:*               LISTEN      5300/sshd
tcp        0      0 172.22.16.73:22         172.22.64.246:25762     ESTABLISHED 4943/sshd: root@not
tcp        0     36 172.22.16.73:22         172.22.64.246:25756     ESTABLISHED 4937/sshd: root@pts
```

最终解决：
0.0.0.0表示监听所有的IPv4地址，出于安全考虑，设置成主机的ip地址即可访问。
```
root@hankin:~# netstat -anp | grep :22
tcp        0      0 172.22.16.73:22         0.0.0.0:*               LISTEN      28357/sshd
tcp        0      0 172.22.16.73:22         172.22.64.246:22000     TIME_WAIT   -
tcp        0      0 172.22.16.73:22         172.22.64.246:25762     ESTABLISHED 4943/sshd: root@not
tcp        0     36 172.22.16.73:22         172.22.64.246:25756     ESTABLISHED 4937/sshd: root@pts
root@hankin:~# netstat -lnput |grep :22
tcp        0      0 172.22.16.73:22         0.0.0.0:*               LISTEN      28357/sshd

C:\Users\User\Downloads>telnet 172.22.16.73 22
SSH-2.0-OpenSSH_7.4p1 Debian-10+deb9u6
Protocol mismatch.
遗失对主机的连接。
```

## 13、报错No route to host问题解决
起初使用scp -P port root@1.2.3.4:/home/gf .拷贝报错，后面发现ssh命令也是同样报错。（注意是大写字母P，小写字母-p 已经被rcp 使用）

解决思路：
ssh端口设置是否正确
网络是否可达
防火墙策略是否合理

既然ssh都不通，那就另想版本，使用跳板进行拷贝，即使用第三台机器进行中转拷贝。

## 14、永久开启ssh调试
```
/home/mobaxterm: ssh root@172.22.16.81
ssh: connect to host 172.22.16.81 port 22: Connection refused
```
修改 /etc/ssh/sshd_config 文件，将 ListenAddress 修改为 ListenAddress 0.0.0.0
重启 ssh 服务, /etc/init.d/ssh restart

## 15、连接不上服务器
```
[root@HANKIN etc]# ssh root@localhost -p 9370
kex_exchange_identification: read: Connection reset by peer
Connection reset by 127.0.0.1 port 9370
```
网上有这样说的，https://blog.csdn.net/saynaihe/article/details/131609562但是也得先进入服务器，因此估计只能重新刷服务器的方法了。

但是搜索了大量资料都没有一个好的办法，只能重刷。

## 16、使用git bash窗口连接不上服务器
但是使用mobaxterm是可以的，原因是密码太短，设置成1了，设置成长一些的密码则能登录成功。
但是这个时候使用xface的ui界面还是无法登录root用户，其他用户也不行，密码是正确的。
后来在界面上面乱点，如查看当前是什么ui桌面后，奇迹般的好了，也能直接使用短密码了，也能登录进入UI界面了。

## 17、SSH反向隧道
反向连接通常指的是由目标主机主动连接到客户端，而不是客户端连接到目标主机。在SSH中，反向连接通常是指使用SSH反向隧道（SSH reverse tunneling）来建立从目标主机到客户端的连接，这种连接方式可以用于一些特定的网络配置和安全需求。

SSH服务默认使用的端口是TCP Port 22
```
[root@HANKIN ~]# ssh 172.22.16.184
ssh: connect to host 172.22.16.184 port 22: Connection refused
```
因此使用反向连接则需要把22端口关闭掉，通过修改ssh配置文件/etc/ssh/sshd_config，把最后一行ListenAddress 0.0.0.0改成其他地址，如ListenAddress 127.0.0.1。

```
# 打印syslog日志专用
LOG="logger -t hankin-debug-ssh-start.sh[$$]"

killall ssh
# 打开ssh通道, 不加-f的话，会阻塞
ssh -NfR "$remote_forward_port:localhost:22" "admin@10.70.10.70" -F "/etc/ssh/sshd_config" -i "/etc/ssh/ssh_host_rsa_key"
if [ $? != 0 ];then
    $LOG "start ssh debug tunnel fail"
    exit 4
fi
$LOG "Establish hankin debug ssh tunnel ok"
```

### 17-1、实战
（1）关闭22端口，监听127.0.0.1地址(修改/etc/ssh/sshd_config配置文件)：
```
[root@ubuntu0006:~] #ssh root@172.22.65.15
Warning: Permanently added '172.22.65.15' (RSA) to the list of known hosts.
root@172.22.65.15's password:

[root@ubuntu0006:~] #ssh root@172.22.65.15
ssh: connect to host 172.22.65.15 port 22: Connection refused
```

（2）在目标服务端创建反向隧道
```
开放1979端口，客户端需要开通22端口，172.22.16.1是客户端ip，而服务端ip是无需告知的
ssh -NfR "1979:localhost:22" "root@172.22.16.1"
root@172.22.16.1's password:    # 输入客户端密码
```

（3）客户端连接
```
root@hankin:~# ping 172.22.16.184           # 能ping通服务端ip地址
PING 172.22.16.184 (172.22.16.184) 56(84) bytes of data.
64 bytes from 172.22.16.184: icmp_seq=1 ttl=64 time=0.144 ms
64 bytes from 172.22.16.184: icmp_seq=2 ttl=64 time=0.171 ms

--- 172.22.16.184 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1028ms
rtt min/avg/max/mdev = 0.144/0.157/0.171/0.018 ms
root@hankin:~# telnet 172.22.16.184 22      # 但是22端口不通
Trying 172.22.16.184...
telnet: Unable to connect to remote host: Connection refused
root@hankin:~# telnet 172.22.16.184 1979    # 但是1979端口不通
Trying 172.22.16.184...
telnet: Unable to connect to remote host: Connection refused
root@hankin:~# ssh root@localhost -p 1979   # 直接连接127.0.0.1的ip地址的1979端口成功连接到服务端
root@localhost's password:

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Mon Nov 20 14:41:38 2023 from localhost
sh: 1: gcc: not found
dpkg-architecture: warning: couldn't determine gcc system type, falling back to default (native compilation)
root@hankin:~# ifconfig
eth0      Link encap:Ethernet  HWaddr a4:17:91:04:01:87
          inet addr:172.22.16.184  Bcast:172.22.16.255  Mask:255.255.255.0
          inet6 addr: fe80::a617:91ff:fe04:187/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:360402 errors:0 dropped:0 overruns:0 frame:0
          TX packets:10852 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:47220346 (45.0 MiB)  TX bytes:1061084 (1.0 MiB)

lo        Link encap:Local Loopback
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:4903 errors:0 dropped:0 overruns:0 frame:0
          TX packets:4903 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:484028 (472.6 KiB)  TX bytes:484028 (472.6 KiB)

root@hankin:~#
```

### 17-2、ping有指定端口吗
ping命令通常用于测试主机之间的连通性，它并不涉及端口。ping命令发送ICMP（Internet Control Message Protocol）数据包到目标主机，并等待目标主机的响应，以检测目标主机是否可达。

与ping不同，telnet是一种用于远程登录到目标主机的协议，它需要指定目标主机的IP地址和端口号。因此，ping和telnet是两种不同的网络工具，用途和功能也不同。

如果您需要测试目标主机的特定端口是否可达，可以使用telnet命令或者其他端口扫描工具，而不是ping命令。

因此常常会有能ping通，但是ssh连接不上，很大概率是端口被防火墙限制了。

## 18、安全加固指南：如何更改 SSH 服务器的默认端口号
```
sudo vim /etc/ssh/sshd_config
其中有个Port参数，后面改成对应的端口即可
sudo systemctl restart sshd.service
```

## 19、查看当前ssh服务器的端口号

