# 常用的Linux命令（超级简洁版）
匹配串---
文件---text.txt
文件夹


```
# file
find / -name hj.sh
grep -Rn 
df -h
sed -i 's///g' text.txt
tail -f

# other
alas
. hj.sh
ls -l
git clone xxx.git --branch 分支名

# memory
du -h -d 1 .
df -h
free -g
cat /proc/meminfo

# process
pidof


# internet
iftop
ifconfig
ipconfig
ip addr
ifstat


wget
lsusb
usbiptool
iftop
insmod
ethtool eth0
ip addr


adb shell
adb disconnect
adb devices
tail -f
ps -ef|grep vdi
killall
ldd

[Linux 问题故障定位的技巧大全](https://mp.weixin.qq.com/s/LCOE58rOkxQrTx2PBuLNgg)
//查看系统cpu使用情况
top

//查看所有cpu核信息
mpstat -P ALL 1

//查看cpu使用情况以及平均负载
vmstat 1

//进程cpu的统计信息
pidstat -u 1 -p pid

//跟踪进程内部函数级cpu使用情况
perf top -p pid -e cpu-clock

//查看系统内存使用情况
free -m

//虚拟内存统计信息
vmstat 1

//查看系统内存情况
top

//1s采集周期，获取内存的统计信息
pidstat -p pid -r 1

//查看进程的内存映像信息
pmap -d pid

//检测程序内存问题
valgrind --tool=memcheck --leak-check=full --log-file=./log.txt  ./程序名

//查看系统io信息
iotop

//统计io详细信息
iostat -d -x -k 1 10

//查看进程级io的信息
pidstat -d 1 -p  pid

//查看系统IO的请求，比如可以在发现系统IO异常时，可以使用该命令进行调查，就能指定到底是什么原因导致的IO异常
perf record -e block:block_rq_issue -ag
^C
perf report

//显示网络统计信息
netstat -s

//显示当前UDP连接状况
netstat -nu

//显示UDP端口号的使用情况
netstat -apu

//统计机器中网络连接各个状态个数
netstat -a | awk '/^tcp/ {++S[$NF]} END {for(a in S) print a, S[a]}'

//显示TCP连接
ss -t -a

//显示sockets摘要信息
ss -s

//显示所有udp sockets
ss -u -a

//tcp,etcp状态
sar -n TCP,ETCP 1

//查看网络IO
sar -n DEV 1

//抓包以包为单位进行输出
tcpdump -i eth1 host 192.168.1.1 and port 80 

//抓包以流为单位显示数据内容
tcpflow -cp host 192.168.1.1
```

# 偶尔使用cat命令无法正常退出
ctrl + c
ctrl + z
ctrl + j
reset followed by ctrl-j
 pkill -9 -f cat

Linux reset命令其实和 tset 是一同个命令，它的用途是设定终端机的状态。一般而言，这个命令会自动的从环境变数、命令列或是其它的组态档决定目前终端机的型态。如果指定型态是 '?' 的话，这个程序会要求使用者输入终端机的型别。

由于这个程序会将终端机设回原始的状态，除了在 login 时使用外，当系统终端机因为程序不正常执行而进入一些奇怪的状态时，你也可以用它来重设终端机o 例如不小心把二进位档用 cat 指令进到终端机，常会有终端机不再回应键盘输入，或是回应一些奇怪字元的问题。此时就可以用 reset 将终端机回复至原始状态。


# Linux 网络wifi操作常用命令，查看WiFi密码
https://blog.csdn.net/qq_27413937/article/details/99714197

source是一个Shell内置命令，用以在当前上下文中执行某文件中的一组命令。
“当前的上下文”一般指的是在交互式会话中，用户当前敲入命令的那个终端。source命令可简写为一个点（.） 。
一些bash脚本应该使用source 脚本名式的语法运行，而不是直接作为一个可执行脚本运行。例如，如果用户希望通过执行一个包含的cd命令的脚本文件来改变工作目录，或者用户希望执行一个没有执行权限的脚本文件。通过文件名直接运行的脚本会运行在子Shell中，而不是当前的上下文中。