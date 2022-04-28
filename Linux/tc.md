# linux环境下利用tc限制两台服务器间的网速延时

## 1、简介
http://www.iplocation.net/tools/traffic-control.php

ts命令功能很强，同时也好难理解和使用，经常浪费了好半天还是搞不定。
这里分享一个简单好用的脚本，只要设置一下目标ip和需要限制的速率。

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

## 2、当遇到网络时延时
（1）首先查看网卡名：ip addr | grep -B2 10.70 | awk '{print $2}' | head -n 1 | sed s/://g
很奇怪，最终居然是yyds的eth0。

（2）查看网卡eth0的流量配置
tc qdisc show dev eth0
```
执行：tc qdisc show dev eth0

qdisc netem 8001: root refcnt 9 limit 1000 delay 100.0ms  10.0ms
```
直接找到原因。

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





