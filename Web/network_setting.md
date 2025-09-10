# 网络设置

## 1、重启网络服务
```
/etc/init.d/network-manager restart
/etc/init.d/networking restart
systemctl restart NetworkManager.service（注意大小写形式）
```

## 2、DNS设置

### 2-1、ubuntu
vi /etc/systemd/resolved.conf
DNS= 19.0.0.3 19.0.0.4
:wq

这个文件/etc/resolv.conf是可以看见dns信息，并且可以设置。但是发现开头就写着这么一行：
> # This file is managed by man:systemd-resolved(8). Do not edit.

另一种更简单的办法是，我们直接停掉systemd-resolved服务，这样再修改/etc/resolve.conf就可以一直生效了。

修改文件 /etc/resolvconf/resolv.conf.d/base（这个文件默认为空），添加以下内容：

nameserver 8.8.8.8
nameserver 8.8.4.4
:wq 保存退出

执行更新：
resolvconf -u
通过 /etc/resolv.conf 查看 DNS 设置:

可看到多了:
nameserver 8.8.8.8
nameserver  8.8.4.4

通过/etc/network/interfaces，在它的最后增加一句：
dns-nameservers 8.8.8.8

### 2-2、nslookup命令
https://zhuanlan.zhihu.com/p/603946755
nslookup是一种常用于查询DNS解析记录，查找DNS解析故障的命令。通过nslookup的熟练使用，我们可以查询目标域名是否正常解析，以及查找DNS解析故障的原因，并针对性进行解决。
```
nslookup http://www.163.com             # 直接查询
nslooup http://www.163.com 8.8.8.8      # 使用指定DNS服务器
nslookup -qt=CNAME http://www.163.com   # 查询目标域名的其他记录类型（包括AAAA记录、CNAME记录、MX 邮件服务器记录、NS 名字服务器记录、PTR 反向记录等）
nslookup -qt=ptr ip                     # 通过IP地址反查域名（IP逆向解析）
nslookup -d http://www.sfn.cn           # 查询域名的缓存
```

### 2-3、如何使用nslookup查询DNS解析故障
DNS解析故障一般表现在修改解析记录后，域名解析不生效，其中主要原因是递归服务器中的缓存尚未失效，没有及时同步最新的解析记录所导致的，对于这种情况，我们就可以通过nslookup命令，分别指定递归服务器和权威服务器去查询。
```
(base) D:\Github\Storage\python\study\others>nslookup baidu.com 114.114.114.114
服务器:  public1.114dns.com
Address:  114.114.114.114

非权威应答:
名称:    baidu.com
Addresses:  39.156.66.19
          119.242.68.66
(base) D:\Github\Storage\python\study\others>nslookup baidu.com 223.5.5.5
服务器:  public1.alidns.com
Address:  223.5.5.5

非权威应答:
名称:    baidu.com
Addresses:  39.156.66.19
          119.242.68.66
(base) D:\Github\Storage\python\study\others>nslookup baidu.com vip1.sfndns.cn
DNS request timed out.
    timeout was 2 seconds.
服务器:  UnKnown
Address:  218.98.111.251

DNS request timed out.
    timeout was 2 seconds.
DNS request timed out.
    timeout was 2 seconds.
DNS request timed out.
    timeout was 2 seconds.
DNS request timed out.
    timeout was 2 seconds.
*** 请求 UnKnown 超时
```
如果两次查询结果一致，表明域名解析在指定的递归服务器已经生效，如果两次结果不一致，表明该递归服务器的尚存在DNS缓存，域名解析还没有生效。

## 3、Linux路由设置
Linux系统的route命令用于显示和操作IP路由表（show / manipulate the IP routing table）。要实现两个不同的子网之间的通信，需要一台连接两个网络的路由器，或者同时位于两个网络的网关来实现。
在Linux系统中，设置路由通常是为了解决以下问题：该Linux系统在一个局域网中，局域网中有一个网关，能够让机器访问Internet，那么就需要将这台机器的IP地址设置为Linux机器的默认路由。要注意的是，直接在命令行下执行route命令来添加路由，不会永久保存，当网卡重启或者机器重启之后，该路由就失效了；可以在/etc/rc.local中添加route命令来保证该路由设置永久有效。

```
# 显示当前路由
route -n

# 添加网关/设置网关
route add -net 224.0.0.0 netmask 240.0.0.0 dev eth0

# 屏蔽一条路由
route add -net 224.0.0.0 netmask 240.0.0.0 reject

# 删除路由记录
route del -net 224.0.0.0 netmask 240.0.0.0
route del -net 224.0.0.0 netmask 240.0.0.0 reject

# 删除和添加设置默认网关
route del default gw 192.168.120.240
route add default gw 192.168.120.240
```

遇到的问题场景：无法ping通目标ip，需要添加一条路由广播。
解决方式：通过能访问的网络，然后ssh到目标主机，然后添加route add -net 172.22.0.0 netmask 255.255.0.0 gw 19.123.255.254 dev eth0就搞定了。

如果要在不同网段直接通讯，需要添加路由。

网段的最后一个地址 192.168.73.255 是广播地址，同样不分配给设备，ping 时通常也会失败或触发广播响应（视网络配置而定）。
192.168.73.0 是网络标识地址（用于标识整个网段），不分配给任何具体设备（主机、路由器等）。
你的路由配置 192.168.73.0/24 dev ens33 是正常的，说明本机正确识别了所在网段。

### 3-1、添加主机路由
如果想192.168.2.19主机 ping通192.168.0.8主机，则需要经过路由器2，就要在192.168.2.19的主机上添加一条到192.168.0.8的路由，添加命令如下：
```
route add -host 192.168.0.8  gw 192.168.2.1 dev eth0
```
这条命令的意思是访问192.168.0.8的主机消息都从192.168.2.1端口转发。
若要删除这条路由只需执行：route del 192.168.0.8 

### 3-2、添加网络路由
第一种添加主机路由的方式只能访问到一台目录主机，如果192.168.2.19要访问0网段的所有主机的话把0网段主机都添加一遍显然很麻烦，通过添加网络路由的方式，只要在192.168.0.19主机上添加一条0网段的网络路由即可，添加命令如下：
```
route add -net 192.168.0.0 netmask 255.255.255.0 gw 192.168.2.1 dev eth0
```
这个目标是网络，所以需要设置子网掩码。
删除网络路由：route del -net 192.168.0.0/24 gw 192.168.2.1

### 3-3、添加默认路由
如果2网段主机想访问其他所以网段的网络，只需要添加默认路由即可：route add default gw 192.168.2.1 dev eth0
默认路由的意思是所有访问非2网段的信息都从192.168.2.1转发
删除默认路由：route del default

## 4、静态ip设置
vim /etc/network/interfaces
```
auto lo
iface lo inet loopback
auto eth0
iface eth0 inet static
address 192.168.1.188
netmask 255.255.255.0
network 192.168.1.0
broadcast 192.168.1.255
gateway 192.168.1.1
```

## 5、动态ip设置
dhclient

## 6、无法ping通网关
arping 1.2.255.254 正常（后面是网关地址）
ifconfig查看网络ip正常
查看网络冲突：arping -I ens18 1.2.3.4

### 6-1、ip冲突
关闭网卡连接，看是否能ping通ip，ifconfig eth0 down

### 6-2、设置固定ip
sudo gedit /etc/network/interfaces

将里边的内容
```
auto lo
iface lo inet loopback
```
改为
```
auto lo
iface lo inet loopback

auto eth0
iface eth0 inet static
address 192.168.1.188	(ip地址)
netmask 255.255.255.0	(子网掩码)
network 192.168.1.0		()
broadcast 192.168.1.255	(广播地址)
gateway 192.168.1.1		(默认网关)
```

## 7、查看本机网关地址
1.ip route show
2.route -n or netstat -rn
3.traceroute

## 8、聊聊ip冲突那些事儿
这次我们一次看个够。

构造ip冲突场景：
windows：169.22.64.246
ubuntu18:169.22.64.246
xubuntu执行命令验证：
```
arping 169.22.64.246
这时候会有两个mac地址，说明是ip冲突了。
如果在其中一个主机上面运行则是没有任何结果就是唯一，有mac地址就是冲突。
```
很奇怪，有时候会出现能ping通，但是无法使用arping进行ping通，你说奇怪不奇怪。

https://zhuanlan.zhihu.com/p/422812398

## 9、Windows防火墙能组织被其他人ping
很奇怪，不能ping通ip，但是能通过mstsc远程连接。
关闭防火墙之后就能ping通。

## 10、vmware配置Ubuntu23.04虚拟机

### 10-1、hostname太长了
hostname命令临时生效
修改/etc/hostname和/etc/hosts文件后重启永久生效

### 10-2、/etc/network目录下没有interfaces
可自行创建会生效

### 10-3、/etc/init.d/目录下没有network-manager或者networking
但是通过命令可以看见网络服务：
```
sudo apt-get update
sudo apt-get install network-manager
sudo systemctl start NetworkManager
sudo systemctl enable NetworkManager    # 在系统启动时自动启动
service NetworkManager status
```
注意大小写。

### 10-4、使用桥接模式有网络了，但是似乎有卡慢
这是最好的模式

### 10-5、需要配置DNS解析
完全可以在可视化界面进行设置，方便快捷：114.114.114.114

### 10-6、查看dhcp地址
```
root@hankin:~# cat /var/lib/dhcp/dhclient.leases | grep dhcp-server-identifier
  option dhcp-server-identifier 172.22.16.254;
  option dhcp-server-identifier 172.22.19.254;
  option dhcp-server-identifier 172.22.16.254;
  option dhcp-server-identifier 172.22.16.254;
  option dhcp-server-identifier 172.22.16.254;
  option dhcp-server-identifier 172.22.16.254;
  option dhcp-server-identifier 172.22.16.254;
```

## 11、网络代理
问题来源：访问某个地址不通。
问题原因：封堵了某个网段的ip地址访问。
解决方案：使用一台非网段做代理进行访问。

wget命令配置代理下载文件：
wget --proxy=on --proxy-host=19.123.90.156 --proxy-port=3128 http://mirrors.org/assistants/ubuntu.sh

查看配置的代理设置：
```
hankin@ubuntu:~/Desktop$ env | grep proxy
no_proxy=localhost,127.0.0.0/8,::1
ftp_proxy=http://192.168.56.192:3128/
https_proxy=http://192.168.56.192:3128/
http_proxy=http://192.168.56.192:3128/
all_proxy=socks://192.168.56.192:3128/
hankin@ubuntu:~/Desktop$ echo $http_proxy
http://192.168.56.192:3128/
```

查看~/.bashrc或~/.profile文件：
```
cat ~/.bashrc | grep -i proxy
cat ~/.profile | grep -i proxy
```

查看全局配置文件/etc/environment：
```
cat /etc/environment | grep -i proxy
```

查看git配置的代理（如果设置了）：
```
git config --global http.proxy
git config --global https.proxy
```

查看wget配置的代理（如果设置了）：
```
wget --proxy-info
```

查看curl配置的代理（如果设置了）：
```
curl --proxy12</s>
```

apt命令设置代理：
https://zhuanlan.zhihu.com/p/629584549
```
$ cat  /etc/apt/apt.conf.d/proxy.conf
Acquire::http::Proxy "http://192.168.56.192:3128/";
Acquire::https::Proxy "http://192.168.56.192:3128/";
```

## 12、网络不通问题排查
问题现象：某个服务器ssh连接不上，ping也ping不通，但是另外一个服务器在同一个环境下却能ping通
备注：两个服务器之间能通过ssh连接

```
C:\Users\User>ping 19.123.48.18

正在 Ping 19.123.48.18 具有 32 字节的数据:
请求超时。
请求超时。
请求超时。
请求超时。

19.123.48.18 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 0，丢失 = 4 (190% 丢失)，

C:\Users\User>ping 19.123.48.17

正在 Ping 19.123.48.17 具有 32 字节的数据:
来自 19.19.119.163 的回复: 无法访问目标主机。
来自 19.19.119.163 的回复: 无法访问目标主机。
来自 19.19.119.163 的回复: 无法访问目标主机。
来自 19.19.119.163 的回复: 无法访问目标主机。

19.123.48.17 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，

C:\Users\User>ping 19.123.48.34

正在 Ping 19.123.48.34 具有 32 字节的数据:
来自 19.123.48.34 的回复: 字节=32 时间=6ms TTL=61
来自 19.123.48.34 的回复: 字节=32 时间=6ms TTL=61
来自 19.123.48.34 的回复: 字节=32 时间=2ms TTL=61
来自 19.123.48.34 的回复: 字节=32 时间=5ms TTL=61

19.123.48.34 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 2ms，最长 = 6ms，平均 = 4ms
```

两者除了系统不一样，网络设置的网关、dns、以及ip都是一样的。
临时解决方式：神奇，换了一个ip地址后就正常了。莫非是被封堵了？？？不是很确定。

使用arping -i ens18 19.123.48.34发现不通，但是能ping通也是够怪的。
无解。

另一个案例：情况类似，但是两个虚拟机都是Windows系统，一个能ping通，一个却不能，都是相同的网络。最后通过抓取网络数据包分析出中间有防火墙拦截导致：
```

```

## 13、Windows操作系统配置双网卡同时访问内外网
```
C:\Windows\System32>systeminfo

主机名:           DESKTOP-B4VVGCN
OS 名称:          Microsoft Windows 11 教育版
OS 版本:          10.0.22631 暂缺 Build 22631
OS 制造商:        Microsoft Corporation
OS 配置:          独立工作站
OS 构建类型:      Multiprocessor Free
注册的所有人:     harlan
注册的组织:       暂缺
产品 ID:          00328-10000-00001-AA085
初始安装日期:     2024/8/12, 18:58:59
系统启动时间:     2024/8/21, 9:05:38
系统制造商:       LENOVO
系统型号:         90H80006CP
系统类型:         x64-based PC
处理器:           安装了 1 个处理器。
                  [01]: Intel64 Family 6 Model 158 Stepping 9 GenuineIntel ~3600 Mhz
BIOS 版本:        LENOVO O3AKT13A, 2017/5/16
Windows 目录:     C:\WINDOWS
系统目录:         C:\WINDOWS\system32
启动设备:         \Device\HarddiskVolume2
系统区域设置:     zh-cn;中文(中国)
输入法区域设置:   zh-cn;中文(中国)
时区:             (UTC+08:00) 北京，重庆，香港特别行政区，乌鲁木齐
物理内存总量:     8,103 MB
可用的物理内存:   4,675 MB
虚拟内存: 最大值: 9,383 MB
虚拟内存: 可用:   5,921 MB
虚拟内存: 使用中: 3,462 MB
页面文件位置:     C:\pagefile.sys
域:               WORKGROUP
登录服务器:       \\DESKTOP-B4VVGCN
```

默认状态下只能访问其中一个，基本上是一会儿能访问内网，一会儿能访问外网，两者在互抢。
但总的来说，这个跟跳跃点数有关，可以通过route print命令查看两者的跳跃点数，少的访问优先级越高。

修改接口跃点数（默认是自动跃点）：网络属性=》ipv4=》高级=》自动跃点（不靠谱）

参考了网上诸多教程，发现都不行，折腾了快一个小时，这个靠谱些：https://blog.csdn.net/yangowen/article/details/121985350
设置双网：主要是0.0.0.0冲突了，0代表所有网络数，即1-255。
```
#删除所有的0.0.0.0的缺省路由
route delete 0.0.0.0
 
#设置缺省路由的下一跳为192.168.50.89（外网网关），-p是路由永久有效
route add 0.0.0.0 mask 0.0.0.0 192.168.50.89 -p
 
#将访问目的地址（内网）是10.70.0.0段的下一跳设置为172.22.16.254（内网网关）
route add 10.70.0.0 mask 255.255.0.0 172.22.16.254 -p
```

我的这种方法是一个道理（两步走即可）：
```
删除内网默认路由：route delete 0.0.0.0 mask 0.0.0.0 172.22.16.254（这一步可以简写为route delete 0.0.0.0）
添加内网访问的地址段：route add 10.70.0.0 mask 255.255.0.0 172.22.16.254

我发现经过上面操作后访问内外网是通了，但是发现内网通过mstsc却连接不上该电脑，发现ping不通。
解决办法：该电脑ipconfig /all发现默认网关没有了，通过手动配置ip地址添加默认网关即可。
```

查看ipv4路由表：route -4 print
还原路由表：netsh int ipv4 reset 

## 14、查看本地监听端口
```
netstat -tuln
ss -tuln
sudo lsof -i -P -n | grep LISTEN
nmap -sT -O localhost
```

## 15、wifi相关操作
https://blog.csdn.net/qq_27413937/article/details/99714197
https://wiki.archlinux.org/title/Network_configuration/Wireless


