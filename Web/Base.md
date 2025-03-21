# 基础知识

## 1、心跳包 (Heartbeat Packet)
心跳包：客户端定时向服务端发送心跳包，通知服务端己方状态的命令字。一般用于长连接的客户端，检测连接是否正常而提供的机制。在多路IO模型中，可以选择在超时时发送心跳包。

目的：用于检测连接的活跃性，确保通信双方仍然在线。
工作原理：定期发送小的数据包，以确认对方的状态。如果在一定时间内未收到心跳包，通常会认为连接已断开。
应用场景：常用于长连接的协议，如 WebSocket、TCP 连接等。


## 2、乒乓包 (Ping-Pong Packet)
目的：用于双向通信的延迟测试和连接确认。
工作原理：一方发送一个请求包（Ping），另一方收到后立即回复一个响应包（Pong）。通过测量往返时间来评估网络延迟。
应用场景：常用于网络性能监测和调试。

## 3、Hello 包 (Hello Packet)
目的：用于邻居发现和网络拓扑的建立。
工作原理：在网络中，设备通过发送 Hello 包来发现其他设备，并建立邻接关系。通常包含设备的身份信息和状态。
应用场景：常用于路由协议（如 OSPF、EIGRP）中，以便路由器能够发现和维护与邻居路由器的连接。

# 2、ipc （进程间通信）
进程间通信(IPC,Inter-Process Communication)指至少两个进程或线程间传送数据或信号的一些技术或方法。



[https://wiki.archlinux.org/index.php/Wireless_network_configuration_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)](https://wiki.archlinux.org/index.php/Wireless_network_configuration_(简体中文))

https://blog.csdn.net/u012349696/article/details/52524124

如果您想连接的网络是没有加密的，您可以用下面的命令直接连接：

```
$ sudo iw dev wlan0 connect [网络 SSID]
```

**如果网络是用 WEP 加密的，也非常容易：**

```
$ sudo iw dev wlan0 connect [网络 SSID] key 0:[WEP 密钥]
```

但网络使用的是 WPA 或 WPA2 协议的话，事情就不好办了。这种情况，您就得使用叫做 wpa*supplicant 的工具，它默认是没有的。然后需要修改 /etc/wpa*supplicant/wpa_supplicant.conf 文件，增加如下行：

```
network={    ssid="[网络 ssid]"    psk="[密码]"    priority=1}
```

我建议你在文件的末尾添加它，并确保其他配置都注释掉。要注意 SSID 和密码字串都是大小写敏感的。在技术上您也可以把接入点的名称当做是 SSID，使用 wpa_supplicant 工具的话会有合适的 SSID 来替代这个名字。

一旦配置文件修改完成后，在后台启动此命令：

```
$ sudo wpa_supplicant -i wlan0 -c /etc/wpa_supplicant/wpa_supplicant.conf
```

最后，无论是连到开放的网络还是加密的安全网络，您都得获取 IP 地址。简单地使用如下命令：

```
$ sudo dhcpcd wlan0
```

如果一切顺利的话，您应该已经通过 DHCP 获取到了一个全新的本地 IP，这个过程是在后台自动完成的。如果想确认下是否真正连接上的话，您可以再一次输入如下命令检查：

```
$ iwconfig
```









