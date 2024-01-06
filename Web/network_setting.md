# linux网络设置

## 1、重启网络服务
```
/etc/init.d/network-manager restart
/etc/init.d/networking restart
```

## 2、DNS设置

### 2-1、ubuntu
vi /etc/systemd/resolved.conf
DNS= 10.0.0.3 10.0.0.4
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
Addresses:  39.156.66.10
          110.242.68.66
(base) D:\Github\Storage\python\study\others>nslookup baidu.com 223.5.5.5
服务器:  public1.alidns.com
Address:  223.5.5.5

非权威应答:
名称:    baidu.com
Addresses:  39.156.66.10
          110.242.68.66
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

## 3、路由设置
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
解决方式：通过能访问的网络，然后ssh到目标主机，然后添加route add -net 172.22.0.0 netmask 255.255.0.0 gw 10.70.255.254 dev eth0就搞定了。

如果要在不同网段直接通讯，需要添加路由。

### 3-1、添加主机路由
如果想192.168.2.10主机 ping通192.168.0.8主机，则需要经过路由器2，就要在192.168.2.10的主机上添加一条到192.168.0.8的路由，添加命令如下：
```
route add -host 192.168.0.8  gw 192.168.2.1 dev eth0
```
这条命令的意思是访问192.168.0.8的主机消息都从192.168.2.1端口转发。
若要删除这条路由只需执行：route del 192.168.0.8 

### 3-2、添加网络路由
第一种添加主机路由的方式只能访问到一台目录主机，如果192.168.2.10要访问0网段的所有主机的话把0网段主机都添加一遍显然很麻烦，通过添加网络路由的方式，只要在192.168.0.10主机上添加一条0网段的网络路由即可，添加命令如下：
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

## 10、Ubuntu23.04

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

### 11-6、查看dhcp地址
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