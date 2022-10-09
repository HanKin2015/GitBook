# linux网络设置

## 1、重启网络服务
```
/etc/init.d/network-manager restart
/etc/init.d/networking restart
```

## 2、DNS设置
### ubuntu
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

## 3、路由设置
Linux系统的route命令用于显示和操作IP路由表（show / manipulate the IP routing table）。要实现两个不同的子网之间的通信，需要一台连接两个网络的路由器，或者同时位于两个网络的网关来实现。在Linux系统中，设置路由通常是为了解决以下问题：该Linux系统在一个局域网中，局域网中有一个网关，能够让机器访问Internet，那么就需要将这台机器的IP地址设置为Linux机器的默认路由。要注意的是，直接在命令行下执行route命令来添加路由，不会永久保存，当网卡重启或者机器重启之后，该路由就失效了；可以在/etc/rc.local中添加route命令来保证该路由设置永久有效。

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
1. ip route show
2.route -n or netstat -rn
3.traceroute

## 8、聊聊ip冲突那些事儿
这次我们一次看个够。

构造ip冲突场景：
windows：169.22.64.246
ubuntu18:169.22.64.246
xubuntu执行命令验证：
```
arping -a 169.22.64.246
这时候会有两个mac地址，说明是ip冲突了。
如果在其中一个主机上面运行则是没有任何结果就是唯一，有mac地址就是冲突。
```

https://zhuanlan.zhihu.com/p/422812398

## 9、Windows防火墙能组织被其他人ping
很奇怪，不能ping通ip，但是能通过mstsc远程连接。
关闭防火墙之后就能ping通。


