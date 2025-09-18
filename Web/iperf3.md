# iperf3工具

## 1、简介
iperf3是一款网络性能测试工具，用于测量网络带宽、延迟和数据包丢失率等指标。它支持TCP和UDP协议，可以在客户端和服务器之间进行测试。以下是一些常用的iperf3命令：

- 在服务器上启动iperf3服务：iperf3 -s
- 在客户端上连接服务器进行测试：iperf3 -c <server_ip>
- 测试UDP带宽：iperf3 -u -b \<bandwidth\> -c <server_ip>
- 测试指定时间内的带宽：iperf3 -t \<time\> -c <server_ip>
- 测试指定带宽的最大传输单元（MTU）：iperf3 -M \<MTU\> -c <server_ip>
- 测试多个并发连接：iperf3 -P <num_connections> -c <server_ip>
- 输出测试结果到文件：iperf3 -c <server_ip> -i \<interval\> -t \<time\> -J > <output_file>

更多详细的命令和参数可以通过iperf3 --help命令查看。

## 2、安装
官网：https://iperf.fr/
windows直接解压使用：iPerf 3.1.3 (8 jun 2016 - 1.3 MiB for Windows Vista 64bits to Windows 10 64bits)
linux先安装libperf即可：iPerf 3.1.3 - DEB package (8 jun 2016 - 8.6 KiB) + libiperf0 3.1.3 - DEB package (53.9 KiB)

## 3、使用
在一台电脑作为服务端使用：
```
D:\Users\User\Desktop\iperf-3.1.3-win64>iperf3.exe -s
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
Accepted connection from 172.22.18.23, port 43254
[  5] local 172.22.64.246 port 5201 connected to 172.22.18.23 port 43256
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-1.00   sec  83.5 MBytes   700 Mbits/sec
[  5]   1.00-2.00   sec  63.7 MBytes   535 Mbits/sec
[  5]   2.00-3.00   sec  87.4 MBytes   734 Mbits/sec
[  5]   3.00-4.00   sec  87.5 MBytes   734 Mbits/sec
[  5]   4.00-5.00   sec  85.3 MBytes   716 Mbits/sec
[  5]   5.00-6.00   sec  86.4 MBytes   725 Mbits/sec
[  5]   6.00-7.02   sec  71.0 MBytes   584 Mbits/sec
[  5]   7.02-8.00   sec  75.8 MBytes   648 Mbits/sec
[  5]   8.00-9.00   sec  80.3 MBytes   673 Mbits/sec
[  5]   9.00-10.00  sec  84.1 MBytes   705 Mbits/sec
[  5]  10.00-10.03  sec  1.83 MBytes   486 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  5]   0.00-10.03  sec  0.00 Bytes  0.00 bits/sec                  sender
[  5]   0.00-10.03  sec   807 MBytes   675 Mbits/sec                  receiver
-----------------------------------------------------------
Server listening on 5201
-----------------------------------------------------------
```

一台电脑作为客户端使用：
```
D:\Users\User\Desktop\iperf-3.1.3-win64>iperf3.exe -c 172.22.18.23
Connecting to host 172.22.18.23, port 5201
[  4] local 172.22.64.246 port 28255 connected to 172.22.18.23 port 5201
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-1.01   sec  82.4 MBytes   686 Mbits/sec
[  4]   1.01-2.00   sec  77.5 MBytes   653 Mbits/sec
[  4]   2.00-3.00   sec  76.2 MBytes   641 Mbits/sec
[  4]   3.00-4.00   sec  77.5 MBytes   651 Mbits/sec
[  4]   4.00-5.00   sec  84.9 MBytes   712 Mbits/sec
[  4]   5.00-6.00   sec  83.8 MBytes   703 Mbits/sec
[  4]   6.00-7.00   sec  80.6 MBytes   675 Mbits/sec
[  4]   7.00-8.00   sec  81.6 MBytes   684 Mbits/sec
[  4]   8.00-9.00   sec  85.9 MBytes   722 Mbits/sec
[  4]   9.00-10.01  sec  76.2 MBytes   636 Mbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bandwidth
[  4]   0.00-10.01  sec   807 MBytes   676 Mbits/sec                  sender
[  4]   0.00-10.01  sec   807 MBytes   676 Mbits/sec                  receiver

iperf Done.
```

## 4、扩展
更多参数参考：https://blog.csdn.net/meihualing/article/details/112322683

-t, --time n 定义本次发送报文测试要持续的时间，单位为秒iPerf通常工作的模式是：持续-t定义的时间（秒）不停的重复发送一组长度为-l定义的数据包。默认值是10秒。