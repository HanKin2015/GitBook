# linux环境下利用tc限制两台服务器间的网速延时

## 1、简介
http://www.iplocation.net/tools/traffic-control.php

ts命令功能很强，同时也好难理解和使用，脚本只要设置一下目标ip和需要限制的速率。

ip命令可以进行简写：
ip l  ==  ip link list
ip a  ==  ip address show
ip r  == ip route show

```
#!/bin/bash
#
#  tc uses the following units when passed as a parameter.
#  kbps: Kilobytes per second
#  mbps: Megabytes per second
#  kbit: Kilobits per second
#  mbit: Megabits per second
#  bps: Bytes per second
#       Amounts of data can be specified in:
#       kb or k: Kilobytes
#       mb or m: Megabytes
#       mbit: Megabits
#       kbit: Kilobits
#  To get the byte figure from bits, divide the number by 8 bit
#

#
# Name of the traffic control command.
TC=/sbin/tc

# The network interface we're planning on limiting bandwidth.
IF=eth0             # Interface

# Download limit (in mega bits)
DNLD=1mbit          # DOWNLOAD Limit

# Upload limit (in mega bits)
UPLD=1mbit          # UPLOAD Limit

# IP address of the machine we are controlling
IP=216.3.128.12     # Host IP

# Filter options for limiting the intended interface.
U32="$TC filter add dev $IF protocol ip parent 1:0 prio 1 u32"

start() {

# We'll use Hierarchical Token Bucket (HTB) to shape bandwidth.
# For detailed configuration options, please consult Linux man
# page.

    $TC qdisc add dev $IF root handle 1: htb default 30
    $TC class add dev $IF parent 1: classid 1:1 htb rate $DNLD
    $TC class add dev $IF parent 1: classid 1:2 htb rate $UPLD
    $U32 match ip dst $IP/32 flowid 1:1
    $U32 match ip src $IP/32 flowid 1:2

# The first line creates the root qdisc, and the next two lines
# create two child qdisc that are to be used to shape download
# and upload bandwidth.
#
# The 4th and 5th line creates the filter to match the interface.
# The 'dst' IP address is used to limit download speed, and the
# 'src' IP address is used to limit upload speed.

}

stop() {

# Stop the bandwidth shaping.
    $TC qdisc del dev $IF root

}

restart() {

# Self-explanatory.
    stop
    sleep 1
    start

}

show() {

# Display status of traffic control status.
    $TC -s qdisc ls dev $IF

}

case "$1" in

  start)

    echo -n "Starting bandwidth shaping: "
    start
    echo "done"
    ;;

  stop)

    echo -n "Stopping bandwidth shaping: "
    stop
    echo "done"
    ;;

  restart)

    echo -n "Restarting bandwidth shaping: "
    restart
    echo "done"
    ;;

  show)

    echo "Bandwidth shaping status for $IF:"
    show
    echo ""
    ;;

  *)

    pwd=$(pwd)
    echo "Usage: tc.bash {start|stop|restart|show}"
    ;;

esac

exit 0
```

## 2、当遇到网络存在网络延迟时
（1）首先查看网卡名：ip addr | grep -B2 10.70 | awk '{print $2}' | head -n 1 | sed s/://g
很奇怪，最终居然是yyds的eth0。

（2）查看网卡eth0的流量配置
tc qdisc show dev eth0
```
执行：tc qdisc show dev eth0

qdisc netem 8001: root refcnt 9 limit 1000 delay 100.0ms  10.0ms
```
直接找到原因，存在网络延迟规则。

（3）删除所有规则
tc qdisc del dev eth4 root
执行之后再次查看流量配置
```
执行：tc qdisc show dev eth0

qdisc mq 0: root
qdisc pfifo_fast 0: parent :8 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :7 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :6 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :5 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :4 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :3 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :2 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
qdisc pfifo_fast 0: parent :1 bands 3 priomap  1 2 2 2 1 2 0 0 1 1 1 1 1 1 1 1
```
（4）然鹅又被人增加上了
tc qdisc add dev eth0 root netem delay 100ms 10ms
想使用过滤器进行过滤，居然会失败。

## 3、一次给指定ip增加延迟
把ip修改成指定物理机ip即可，中间可能出现当前主机网口不是eth0。支持多个ip指定。
```
查看网卡 eth0 的流控的配置 (qdisc 表示排队规则 queueing discipline)
tc qdisc show dev eth0

设置指定IP的延迟和丢包
tc qdisc add dev eth0 root handle 1: prio

限制带宽, 延迟, 丢包
tc filter add dev eth0 parent 1: protocol ip prio 16 u32 match ip dst 123.2.3.6 flowid 1:1
tc filter add dev eth0 parent 1: protocol ip prio 16 u32 match ip dst 223.22.23.26 flowid 1:1
tc qdisc add dev eth0 parent 1:1 handle 10: netem delay 50ms loss 1%

修改规则
tc qdisc change dev eth0 parent 1:1 handle 10: netem delay 150ms loss 5%

删除所有规则
tc qdisc del dev eth4 root
```
5%丢包已经很严重了，1%一般即可。

延迟丢包，依赖netem内核驱动。
加载驱动：modprobe sch_netem

## 4、tc命令包装器tcconfig
使其更容易设置到network-interface/Docker-container(veth)的网络带宽/延迟/数据包丢失/数据包损坏等的流量控制。

tcconfig是一个tc命令包装器。轻松设置网络bandwidth/latency/packet-loss/packet-corruption/etc的流量控制。给network-interface/Docker-container(veth）。

Set traffic control（tcset命令）
Delete traffic control（tcdel命令）
显示流量控制配置（tcshow命令）以获取更多信息

- 网络带宽速率[G/M/K bps]
- 网络延迟[microseconds/milliseconds/seconds/minutes]
- 丢包率[%]
- 数据包损坏率[%]
- 数据包重复率[%]
- 数据包重排序率[%]

https://www.5axxw.com/wiki/content/ztvxjf

tc自 linux2.2内核以后逐渐被加在了内核里，成为linux服务器本身就能提供的一种服务。
个人觉得还是学好使用tc吧。










