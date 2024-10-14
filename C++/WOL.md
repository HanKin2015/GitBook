# 网络唤醒（WOL）
参考：https://www.cnblogs.com/zhanggaoxing/p/9657545.html
demo见：D:\Github\Storage\c++\magic_packet
注意：需要同网段才能唤醒。

## 1、什么是网络唤醒
网络唤醒（Wake-on-LAN，WOL）是一种计算机局域网唤醒技术，使局域网内处于关机或休眠状态的计算机，将状态转换成引导（Boot Loader）或运行状态。无线唤醒（Wake-on-Wireless-LAN，WoWLAN）作为 WOL 的补充技术，使用无线网卡去唤醒计算机。网络唤醒在一般的局域网环境里使用有限广播地址（255.255.255.255）即可，由于路由器都不转发目的地址为有限广播地址的数据报，因此在复杂网络情况下通常使用子网定向广播地址。在局域网外唤醒局域网内特定计算机，可以使用路由器的 DDNS 与端口转发。

在1996年10月，英特尔和 IBM 成立了 Advanced Manageability Alliance。1997年4月，联盟提出了 WOL 技术。这是 WOL 技术的起源，随后各大厂商纷纷推出了自己的 WOL 技术标准。本文所讨论的 WOL 技术是由 AMD 公司提出的 Magic Packet（幻数据包，魔术包）唤醒方式，这里给出 AMD 关于此技术的[白皮书](https://www.amd.com/en/search/documentation/hub.html#sortCriteria=%40amd_release_date%20descending&f-amd_archive_status=Active&f-amd_audience=Technical)。

## 2、幻数据包（Magic Packet）
幻数据包是一个广播帧，包含目标计算机的MAC地址。由于 MAC 地址的唯一性，使数据包可以在网络中被唯一的识别。幻数据包发送通常使用无连接的传输协议，如 UDP ，发送端口为 7 或 9 ，这只是通常做法，没有限制。

WOL 技术被提出了将近20年，绝大多数的现代网卡都支持在超低功耗下监听特定的报文，如 ARP。如果设备网卡接收到一个与自己 MAC 地址相同的幻数据包，则网卡会向计算机的电源或主板发出信号以唤醒计算机。大部分的幻数据包在数据链路层（OSI模型第2层）上发送，当发送时，使用广播地址广播到给定的网络上，不使用IP地址（OSI模型第3层）。当然这是绝大部分情况，幻数据包也可以使用特定的 IP 地址进行发送。

幻数据包最简单的构成是6字节的255（FF FF FF FF FF FF），紧接着为目标计算机的48位MAC地址，重复16次，数据包共计102字节。有时数据包内还会紧接着4-6字节的密码信息。这个帧片段可以包含在任何协议中，最常见的是包含在 UDP 中。

FF FF FF FF FF FF	MAC 地址 × 16	4-6字节的密码（可空）

例如 MAC 地址为 11 22 33 44 55 66 的目标计算机，幻数据包的格式为：
```
FFFFFFFFFFFF 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 112233445566 [ABABABABABAB（这里为6个字节的密码）]
```

幻数据包还有一些基本限制条件：
- 需要知道目标计算机 MAC 地址
- 不提供送达确认
- 可能无法在局域网之外工作
- 需要硬件进行支持

## 3、创建幻数据包
项目地址：https://github.com/ZhangGaoxing/wake-on-lan

该项目为 Xamarin 跨平台项目，包含 Xamarin.Android 与 UWP 。支持自动扫描添加局域网设备。

关于 MAC 地址的扫描获取，这里只说一下思路，详细请查阅代码。第一种方式，也是我最开始想到的方式，使用 Ping 来 Ping 整个网段。开了四个线程，1-255大概需要30多秒，稍微有点慢，而且 .NET 的 Ping 类在 Android 上无法限制秒数。第二种方式，百度到的，直接向整个网段发送 UDP 消息，2秒解决战斗。扫描完成后获取 ARP 表就行。

## 4、Linux系统启动WOL功能
```
root@hankin:~# ethtool eth0
Settings for eth0:
        Supported ports: [ TP MII ]
        Supported link modes:   10baseT/Half 10baseT/Full
                                100baseT/Half 100baseT/Full
                                1000baseT/Half 1000baseT/Full
        Supported pause frame use: No
        Supports auto-negotiation: Yes
        Advertised link modes:  10baseT/Half 10baseT/Full
                                100baseT/Half 100baseT/Full
                                1000baseT/Full
        Advertised pause frame use: Symmetric Receive-only
        Advertised auto-negotiation: Yes
        Link partner advertised link modes:  10baseT/Half 10baseT/Full
                                             100baseT/Half 100baseT/Full
                                             1000baseT/Full
        Link partner advertised pause frame use: Symmetric
        Link partner advertised auto-negotiation: Yes
        Speed: 1000Mb/s
        Duplex: Full
        Port: MII
        PHYAD: 0
        Transceiver: internal
        Auto-negotiation: on
        Supports Wake-on: pumbg
        Wake-on: g
        Current message level: 0x00000033 (51)
                               drv probe ifdown ifup
        Link detected: yes
关键字段：Supports Wake-on和Wake-on

root@hankin:~# wakeonlan
No MAC address!
Usage: wakeonlan [-h] [-v] [-i IP_address] [-p port] [-f file] [-m hardware_address]
    -h                 usage
    -m   mac           mac address
         -l   mac#mac#mac   mac address list
    -f   file          uses file as a source of mac addresses
    -p   port          set the destination port
                       default: 9 (the discard port)
    -i   ip_address    set the destination IP address
                       default: 255.255.255.255 (the limited broadcast address)
    -v                 displays the script version
发送WOL魔法包命令：wakeonlan

root@hankin:~# wakeonlan a4:17:91:04:01:87
No MAC address!
Usage: wakeonlan [-h] [-v] [-i IP_address] [-p port] [-f file] [-m hardware_address]
    -h                 usage
    -m   mac           mac address
         -l   mac#mac#mac   mac address list
    -f   file          uses file as a source of mac addresses
    -p   port          set the destination port
                       default: 9 (the discard port)
    -i   ip_address    set the destination IP address
                       default: 255.255.255.255 (the limited broadcast address)
    -v                 displays the script version
root@hankin:~# wakeonlan -m a4:17:91:04:01:87
Send magic packet:
IP addr is 255.255.255.255:9
MAC addr is
A4:17:91:04:01:87
实战测试正常
```

g 代表“magic packet”，即常规的WOL触发机制：ethtool -s eth0 wol g
p 代表“pattern-matching”唤醒，通过物理线路的特定事件唤醒计算机：ethtool -s eth0 wol p
禁用WOL：ethtool -s <interface_name> wol d（注意设置其他无效参数也是禁用WOL）
```
root@hankin:/etc# ethtool -s eth0 wol a
root@hankin:/etc# ethtool eth0
Settings for eth0:
        Supported ports: [ TP MII ]
        Supported link modes:   10baseT/Half 10baseT/Full
                                100baseT/Half 100baseT/Full
                                1000baseT/Half 1000baseT/Full
        Supported pause frame use: No
        Supports auto-negotiation: Yes
        Advertised link modes:  10baseT/Half 10baseT/Full
                                100baseT/Half 100baseT/Full
                                1000baseT/Full
        Advertised pause frame use: Symmetric Receive-only
        Advertised auto-negotiation: Yes
        Link partner advertised link modes:  10baseT/Half 10baseT/Full
                                             100baseT/Half 100baseT/Full
                                             1000baseT/Full
        Link partner advertised pause frame use: Symmetric
        Link partner advertised auto-negotiation: Yes
        Speed: 1000Mb/s
        Duplex: Full
        Port: MII
        PHYAD: 0
        Transceiver: internal
        Auto-negotiation: on
        Supports Wake-on: pumbg
        Wake-on: d
        Current message level: 0x00000033 (51)
                               drv probe ifdown ifup
        Link detected: yes
[root@ubuntu0006:~/cmake] #ethtool ens18
Settings for ens18:
        Supported ports: [ ]
        Supported link modes:   Not reported
        Supported pause frame use: No
        Supports auto-negotiation: No
        Advertised link modes:  Not reported
        Advertised pause frame use: No
        Advertised auto-negotiation: No
        Speed: Unknown!
        Duplex: Unknown! (255)
        Port: Other
        PHYAD: 0
        Transceiver: internal
        Auto-negotiation: off
        Link detected: yes
[root@ubuntu0006:~/cmake] #ethtool -s ens18 wol g
Cannot get current wake-on-lan settings: Operation not supported
  not setting wol
[root@ubuntu0006:~/cmake] #ethtool -s ens18 wol d
Cannot get current wake-on-lan settings: Operation not supported
  not setting wol
```

## 5、Windows系统唤醒
惠普物理机电脑实战：（https://zhuanlan.zhihu.com/p/681656128）
按Esc进入BIOS设置-》Configuration-》S4/S5 Wake on LAN-》Enabled（最终效果应该为关机后网卡灯还亮着。）
然后就可以进行魔术包唤醒了。

网络适配器中网卡属性的电源选项默认勾选了允许计算机关闭此设备以节约电源和允许此设备唤醒计算机，另外高级设置里面《魔术封包唤醒》默认是开启的，网上说的关闭快速启动并没有什么影响。
win11需要在控制面板-》小图标-》电源选项中找到快速启动（此功能测试发现开机很快）
