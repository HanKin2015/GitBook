# ping命令

## 1、简介
ping命令是一个网络工具，用于测试主机之间的连通性。它发送一个ICMP（Internet控制消息协议）回显请求到目标主机，并等待目标主机返回一个回显应答。ping命令可以用来测试网络连接是否正常，以及测量网络延迟和丢包率等网络性能指标。

## 2、可以用来判断目标系统类型
bytes值：数据包大小，也就是字节。
time值：响应时间，这个时间越小，说明你连接这个地址速度越快。
TTL值：Time To Live,表示DNS记录在DNS服务器上存在的时间，它是IP协议包的一个值，告诉路由器该数据包何时需要被丢弃。可以通过Ping返回的TTL值大小，粗略地判断目标系统类型是Windows系列还是UNIX/Linux系列。

默认情况下，Linux系统的TTL值为64或255，WindowsNT/2000/XP系统的TTL值为128，Windows98系统的TTL值为32，UNIX主机的TTL值为255。
因此一般TTL值：
100~130ms之间，Windows系统 ；
240~255ms之间，UNIX/Linux系统。


实践发现：128是Windows、64是Linux。

## 3、参数
-t：不间断地ping指定计算机，直到管理员中断。
-a：解析计算机名与NetBios名。就是可以通过ping它的IP地址，可以解析出主机名。
-n：在默认情况下，一般都只发送4个数据包，通过这个命令可以自己定义发送的个数，对衡量网络速度都很有帮助，比如我想测试发送10个数据包的返回的平均时间为多少，最快时间为多少，最慢时间为多少。
-l：在默认的情况下Windows的ping发送的数据包大小为32byt，最大能发送65500byt。当一次发送的数据包大于或等于65500byt时，将可能导致接收方计算机宕机。所以微软限制了这一数值；这个参数配合其它参数以后危害非常强大，比如攻击者可以结合-t参数实施DOS攻击。（所以它具有危险性，不要轻易向别人计算机使用）。
比如，ping -l 65500 -t 211.84.7.46
会连续对IP地址执行ping命令，直到被用户以Ctrl+C中断。
-r：在“记录路由”字段中记录传出和返回数据包的路由，探测经过的路由个数，但最多只能跟踪到9个路由。

## 4、批量ping网络
```
for /L %D in (1,1,255) do ping 10.168.1.%D
```

## 5、其他参数
注意windows和linux中ping命令还是有很大的区别。

windows中：
n参数是指发送的回显请求次数
i参数是指TTL生存时间
t参数是指直到对方主机不通为止
对于不通，一个回显超时是5秒，无参数则会花费20秒
```
C:\Users\Administrator>ping -n 6 -i 100 baidu.com

正在 Ping baidu.com [39.156.66.10] 具有 32 字节的数据:
来自 39.156.66.10 的回复: 字节=32 时间=40ms TTL=48
来自 39.156.66.10 的回复: 字节=32 时间=38ms TTL=48
来自 39.156.66.10 的回复: 字节=32 时间=38ms TTL=48
来自 39.156.66.10 的回复: 字节=32 时间=38ms TTL=48
来自 39.156.66.10 的回复: 字节=32 时间=38ms TTL=48
来自 39.156.66.10 的回复: 字节=32 时间=39ms TTL=48

39.156.66.10 的 Ping 统计信息:
    数据包: 已发送 = 6，已接收 = 6，丢失 = 0 (0% 丢失)，
往返行程的估计时间(以毫秒为单位):
    最短 = 38ms，最长 = 40ms，平均 = 38ms

C:\Users\Administrator>ping -n 6 -i 10 baidu.com

正在 Ping baidu.com [39.156.66.10] 具有 32 字节的数据:
来自 221.183.95.169 的回复: TTL 传输中过期。
来自 221.183.95.169 的回复: TTL 传输中过期。
来自 221.183.95.169 的回复: TTL 传输中过期。
来自 221.183.95.169 的回复: TTL 传输中过期。
来自 221.183.95.169 的回复: TTL 传输中过期。
来自 221.183.95.169 的回复: TTL 传输中过期。

39.156.66.10 的 Ping 统计信息:
    数据包: 已发送 = 6，已接收 = 6，丢失 = 0 (0% 丢失)，
```

linux中：
c参数是指发送的回显请求次数
t参数是指TTL生存时间
i参数是指发送回显请求的时间间隔
对于不通，第一个回显超时是10秒，windows没有回显请求时间间隔，linux默认是1秒，无限回显请求次数，因此需要c参数限定回显请求次数
```
#!/bin/sh
ip="10.70.10."
for i in `seq 60 80`
do
        date
        ping -c 1 -i 5 $ip$i | grep -q 'ttl=' && echo "$ip$i OK" || echo "$ip$i NO"
done

[root@ubuntu0006:~] #ping -c 5 -i 3 10.70.10.70
PING 10.70.10.70 (10.70.10.70) 56(84) bytes of data.
64 bytes from 10.70.10.70: icmp_seq=1 ttl=61 time=1.20 ms
64 bytes from 10.70.10.70: icmp_seq=2 ttl=61 time=3.28 ms
64 bytes from 10.70.10.70: icmp_seq=3 ttl=61 time=1.65 ms
64 bytes from 10.70.10.70: icmp_seq=4 ttl=61 time=1.65 ms
64 bytes from 10.70.10.70: icmp_seq=5 ttl=61 time=1.70 ms

--- 10.70.10.70 ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 12009ms
rtt min/avg/max/mdev = 1.209/1.901/3.284/0.716 ms
总共花费3 x 4 = 12秒

[root@ubuntu0006:~] #ping -c 5 -i 3 10.70.10.69
PING 10.70.10.69 (10.70.10.69) 56(84) bytes of data.

--- 10.70.10.69 ping statistics ---
5 packets transmitted, 0 received, 100% packet loss, time 12030ms
这个虽然不明白为何也是写着12秒，但是实际还需要加上第一个回显超时10秒，因此是22秒

TTL时间间隔有范围限制，范围是1到255
[root@ubuntu0006:~] #ping -t 2000 10.70.10.69
ping: ttl 2000 out of range
[root@ubuntu0006:~] #ping -t 66 10.70.10.69
PING 10.70.10.69 (10.70.10.69) 56(84) bytes of data.
^C
--- 10.70.10.69 ping statistics ---
3 packets transmitted, 0 received, 100% packet loss, time 2002ms

[root@ubuntu0006:~] #ping -t 66 10.70.10.70
PING 10.70.10.70 (10.70.10.70) 56(84) bytes of data.
64 bytes from 10.70.10.70: icmp_seq=1 ttl=61 time=1.59 ms
64 bytes from 10.70.10.70: icmp_seq=2 ttl=61 time=1.84 ms
64 bytes from 10.70.10.70: icmp_seq=3 ttl=61 time=1.37 ms
^C
--- 10.70.10.70 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 1.378/1.604/1.844/0.195 ms
```

## 6、TTL
TTL（Time to Live）是IP数据包中的一个字段，用于限制数据包在网络中传输的最大跳数。每经过一个路由器，TTL的值就会减1，当TTL的值减为0时，数据包就会被丢弃。TTL的作用是防止数据包在网络中无限循环，从而保证网络的稳定性和可靠性。

TTL的时间间隔范围是1到255。在Linux系统中，可以使用ping命令来测试网络连通性，并查看TTL的值。
```
ping -c 1 www.baidu.com
64 bytes from 14.215.177.38: icmp_seq=1 ttl=56 time=14.6 ms
```
其中，ttl=56表示TTL的值为56。每经过一个路由器，TTL的值就会减1。

那么TTL值为56，是指经过了199个路由器吗？
不一定。TTL的值并不是直接表示数据包经过的路由器数量，而是表示数据包在网络中可以经过的最大跳数。每经过一个路由器，TTL的值就会减1，当TTL的值减为0时，数据包就会被丢弃。因此，TTL的值越小，数据包经过的路由器数量就越少。

在实际情况中，TTL的值并不是固定的，而是根据网络拓扑和路由算法动态计算得出的。因此，TTL的值并不能准确地反映数据包经过的路由器数量。在上面的例子中，TTL的值为56，并不意味着数据包经过了199个路由器，而只能说明数据包在网络中最多可以经过56个路由器。

也就是说2个路由器也会导致丢包。




