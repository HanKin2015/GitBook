# 基础知识

# 1、心跳包与乒乓包
心跳包：客户端定时向服务端发送心跳包，通知服务端己方状态的命令字。一般用于长连接的客户端，检测连接是否正常而提供的机制。在多路IO模型中，可以选择在超时时发送心跳包。

乒乓包：
举例：微信朋友圈有人评论，客户端怎么知道有人评论？服务器怎么将评论发给客户端的？

微信客户端每隔一段时间就向服务器询问，是否有人评论？
当服务器检查到有人给评论时，服务器发送一个乒乓包给客户端，该乒乓包中携带的数据是[此时有人评论的标志位]
注：步骤1和2，服务器和客户端不需要建立连接，只是发送简单的乒乓包。
当客户端接收到服务器回复的带有评论标志位的乒乓包后，才真正的去和服务器通过三次握手建立连接；建立连接后，服务器将评论的数据发送给客户端。

注意：乒乓包是携带很简单的数据的包。

# 2、ipc （进程间通信）
进程间通信(IPC,Inter-Process Communication)指至少两个进程或线程间传送数据或信号的一些技术或方法。

# 3、hello数据包 
hello数据包(hello packet)
用于供求关系类似虚拟IP地址、hello时间和保持时间这样的HSRP信息的HSRP协议数据单元。也被称为hello消息(hello message)。
Hello packet address : 224.0.0.5,hello数据包协议可以动态的发现邻居，并维护邻居关系。



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









