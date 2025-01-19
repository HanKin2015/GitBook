# MTU

## 1、简介
网络接口的MTU（Maximum Transmission Unit）值决定了网络接口可以传输的最大数据包大小。调整MTU值可以帮助优化网络性能，特别是在特定的网络环境中。

## 2、Windows系统修改
查看当前网络：
```
C:\Users\Administrator>ipconfig

Windows IP 配置


以太网适配器 本地连接 4:

   媒体状态  . . . . . . . . . . . . : 媒体已断开
   连接特定的 DNS 后缀 . . . . . . . :

以太网适配器 本地连接 2:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::6935:7ec9:f339:944d%12
   IPv4 地址 . . . . . . . . . . . . : 1.2.12.2
   子网掩码  . . . . . . . . . . . . : 255.255.252.0
   默认网关. . . . . . . . . . . . . : 1.2.15.254

隧道适配器 isatap.{89F18664-7AF8-46AD-B86C-E6AC56F9E197}:

   媒体状态  . . . . . . . . . . . . : 媒体已断开
   连接特定的 DNS 后缀 . . . . . . . :

隧道适配器 isatap.{C74760A1-8BD4-4EFB-ACA6-F9DA29B73B65}:

   媒体状态  . . . . . . . . . . . . : 媒体已断开
   连接特定的 DNS 后缀 . . . . . . . :
```

查看所有网络接口及其当前的MTU值:
```
C:\Users\Administrator>netsh interface ipv4 show subinterfaces

   MTU  MediaSenseState   传入字节  传出字节      接口
------  ---------------  ---------  ---------  -------------
4294967295                1          0      53346  Loopback Pseudo-Interface 1
  1500                1  12656482286  16211415691  本地连接 2
  1400                2  143851773  100189034  本地连接 4
```

修改指定网络接口的MTU值：
```
C:\Users\Administrator>netsh interface ipv4 set subinterface "本地连接 4" mtu=1300 store=persistent
确定。


C:\Users\Administrator>netsh interface ipv4 show subinterfaces

   MTU  MediaSenseState   传入字节  传出字节      接口
------  ---------------  ---------  ---------  -------------
4294967295                1          0      53346  Loopback Pseudo-Interface 1
  1500                1  12657210019  16220323588  本地连接 2
  1300                2  143851773  100189034  本地连接 4
```

注册表修改方式（需要重启生效，可能网络正在使用）：
```
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters\Interfaces
```
需要去找对应网卡，在对应的子项中，查找或新建一个名为 MTU 的DWORD值，一般是通过ip地址，别无他法，或者乱试，请测生效。在对应的子项中，查找或新建一个名为 MTU 的DWORD值

## 3、Linux系统修改
```
sudo ifconfig eth0 mtu 1400
sudo ip link set dev eth0 mtu 1400

[root@ubuntu0006:~] #ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: ens18: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether fe:fc:fe:08:de:d6 brd ff:ff:ff:ff:ff:ff
    inet 1.2.3.4/23 brd 1.2.3.4 scope global ens18
       valid_lft forever preferred_lft forever
    inet6 2001::1510:1510:47f9:56c9/14 scope global
       valid_lft forever preferred_lft forever
    inet6 fe80::2377:9195:37c7:5727/64 scope link
       valid_lft forever preferred_lft forever

[root@ubuntu0006:~] #ifconfig ens18 mtu 1400
[root@ubuntu0006:~] #ifconfig
ens18     Link encap:以太网  硬件地址 fe:fc:fe:08:de:d6
          inet 地址:1.2.3.4  广播:1.2.3.4  掩码:255.255.254.0
          inet6 地址: 2001::1510:1510:47f9:56c9/14 Scope:Global
          inet6 地址: fe80::2377:9195:37c7:5727/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1400  跃点数:1
          接收数据包:163019679 错误:0 丢弃:27 过载:0 帧数:0
          发送数据包:13882750 错误:0 丢弃:0 过载:0 载波:0
          碰撞:0 发送队列长度:1000
          接收字节:17676945970 (17.6 GB)  发送字节:3106186111 (3.1 GB)

[root@ubuntu0006:~] #ip link set ens18 mtu 1500
[root@ubuntu0006:~] #ifconfig
ens18     Link encap:以太网  硬件地址 fe:fc:fe:08:de:d6
          inet 地址:1.2.3.4  广播:1.2.3.4  掩码:255.255.254.0
          inet6 地址: 2001::1510:1510:47f9:56c9/14 Scope:Global
          inet6 地址: fe80::2377:9195:37c7:5727/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  跃点数:1
          接收数据包:163021084 错误:0 丢弃:27 过载:0 帧数:0
          发送数据包:13883077 错误:0 丢弃:0 过载:0 载波:0
          碰撞:0 发送队列长度:1000
          接收字节:17677106893 (17.6 GB)  发送字节:3106253563 (3.1 GB)

lo        Link encap:本地环回
          inet 地址:127.0.0.1  掩码:255.0.0.0
          inet6 地址: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  跃点数:1
          接收数据包:1593574 错误:0 丢弃:0 过载:0 帧数:0
          发送数据包:1593574 错误:0 丢弃:0 过载:0 载波:0
          碰撞:0 发送队列长度:1
          接收字节:286622194 (286.6 MB)  发送字节:286622194 (286.6 MB)
```

上述方法只是临时修改，重启后会恢复默认值。要永久修改MTU值，你需要编辑网络配置文件。

在基于Debian的系统（如Ubuntu）中
编辑/etc/network/interfaces文件：
```
auto eth0
iface eth0 inet dhcp
    mtu 1400
```
在基于Red Hat的系统（如CentOS）中
编辑对应的网络脚本文件，例如/etc/sysconfig/network-scripts/ifcfg-eth0：
```
DEVICE=eth0
BOOTPROTO=dhcp
ONBOOT=yes
MTU=1400
```

## 4、通过ping大包确认网络链路中mtu的值
注意：MTU值是限制当前主机发送出去的包大小限制，例如本机MTU值为1500，则只能ping出去1472字节的数据包。
通过逐步增加数据包大小，找到最大成功的大小（例如 1472 字节），然后加上 28 字节的 ICMP 头部（IPv4 的 ICMP 头部大小为 8 字节，IPv4 头部大小为 20 字节），可以计算出 MTU。
例如，如果最大成功的大小是 1472 字节，则 MTU 为 1472 + 28 = 1500 字节。

windows通过-f 用于设置“不分片”标志。
linux通过-M do 用于设置“不分片”标志。

windows系统：
```
C:\Users\Default>netsh interface ipv4 show subinterfaces

       MTU  MediaSenseState      输入字节     输出字节  接口
----------  ---------------  ------------  ------------  -------------
4294967295                1             0          3215  Loopback Pseudo-Interface 1
      1500                1   10957538446    1349399113  以太网


C:\Users\Default>ping 114.22.16.1 -l 1473 -f

正在 Ping 114.22.16.1 具有 1473 字节的数据:
需要拆分数据包但是设置 DF。
需要拆分数据包但是设置 DF。

114.22.16.1 的 Ping 统计信息:
    数据包: 已发送 = 2，已接收 = 0，丢失 = 2 (100% 丢失)，
Control-C
^C
C:\Users\Default>ping 114.22.16.1 -l 1472 -f

正在 Ping 114.22.16.1 具有 1472 字节的数据:
来自 114.22.16.1 的回复: 字节=1472 时间=1ms TTL=64
来自 114.22.16.1 的回复: 字节=1472 时间=1ms TTL=64
来自 114.22.16.1 的回复: 字节=1472 时间=1ms TTL=64
来自 114.22.16.1 的回复: 字节=1472 时间=2ms TTL=64

114.22.16.1 的 Ping 统计信息:
    数据包: 已发送 = 4，已接收 = 4，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 1ms，最长 = 2ms，平均 = 1ms
```

debian系统：
```
root@adesk:~# ifconfig eth0
eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1400
        inet 114.22.16.1  netmask 255.255.255.0  broadcast 114.22.16.255
        inet6 fe80::56f6:c5ff:fef9:438c  prefixlen 64  scopeid 0x20<link>
        ether 54:f6:c5:f9:43:8c  txqueuelen 1000  (Ethernet)
        RX packets 5499057679  bytes 788193028726 (734.0 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1167590016  bytes 131873977454 (122.8 GiB)
        TX errors 2  dropped 0 overruns 0  carrier 0  collisions 0

root@adesk:~# ping 114.22.16.37 -s 1373 -M do
PING 114.22.16.37 (114.22.16.37) 1373(1401) bytes of data.
ping: local error: Message too long, mtu=1400
ping: local error: Message too long, mtu=1400
ping: local error: Message too long, mtu=1400

--- 114.22.16.37 ping statistics ---
3 packets transmitted, 0 received, +3 errors, 100% packet loss, time 2028ms

root@adesk:~# ping 114.22.16.37 -s 1372 -M do
PING 114.22.16.37 (114.22.16.37) 1372(1400) bytes of data.
1380 bytes from 114.22.16.37: icmp_seq=1 ttl=128 time=1.62 ms
1380 bytes from 114.22.16.37: icmp_seq=2 ttl=128 time=1.69 ms
1380 bytes from 114.22.16.37: icmp_seq=3 ttl=128 time=1.67 ms

--- 114.22.16.37 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 1.628/1.664/1.692/0.054 ms
root@adesk:~#
```


