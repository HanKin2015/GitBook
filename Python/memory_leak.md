# 内存泄露

## 1、背景
服务端使用flask框架写的python程序，出现内存泄露问题，最终会导致服务端无法处理客户端请求。
使用top命令看，VIRT达到了10.2g，并且CPU达到100%。
日志中查看是出现Too many open files导致。

我的python脚本后台执行命令：
```
nohup python ./run.py > ./logs/logs.out 2>&1 &
```

## 2、排查过程

### 2-1、系统限制文件句柄数量：ulimit -n
```
[root@ubuntu0006:~/cmake] #ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 31760
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 31760
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

修改方案：
```
sudo vim /etc/security/limits.conf
```
在这个文件的最后添加两行代码
```
* soft nofile 10240
* hard nofile 10240
```

- 管理员可以通过使用“lsof | wc -l”命令来查看系统中当前打开的句柄数量。还可以通过“lsof -p [PID]”命令来查看指定进程的句柄信息。
- 管理员可以通过读取其中的文件来获取系统和进程的相关信息。在/proc/[PID]/目录下，有一个句柄目录（fd），管理员可以通过查看这个目录下的文件来获取进程的句柄信息。
- ss命令是一个用来查看Socket统计信息的工具。管理员可以通过使用“ss -s”命令来查看系统中的套接字数量，从而间接地了解系统中句柄的使用情况。另外，通过“ss -p”命令，管理员还可以查看套接字对应的进程信息，方便排查问题进程。
```
[root@ubuntu0006:~/cmake] #ss -s
Total: 677 (kernel 705)
TCP:   59 (estab 29, closed 15, orphaned 0, synrecv 0, timewait 15/0), ports 0

Transport Total     IP        IPv6
*         705       -         -
RAW       0         0         0
UDP       19        16        3
TCP       44        40        4
INET      63        56        7
FRAG      0         0         0

[root@ubuntu0006:~/cmake] #ss -p | head
Netid  State      Recv-Q Send-Q Local Address:Port                 Peer Address:Port
u_str  ESTAB      0      0      /run/systemd/journal/stdout 3588855               * 3589563               users:(("systemd-journal",pid=214,fd=61),("systemd",pid=1,fd=89))
u_str  ESTAB      0      0      @/tmp/dbus-1A5bkCHDpI 3589373               * 3588777               users:(("dbus-daemon",pid=8734,fd=47))
u_str  ESTAB      0      0      @/tmp/dbus-LFpUlrTQPP 3589318               * 3589317               users:(("dbus-daemon",pid=8815,fd=13))
u_str  ESTAB      0      0      @/tmp/dbus-LFpUlrTQPP 3588106               * 3588105               users:(("dbus-daemon",pid=8815,fd=10))
u_str  ESTAB      0      0      /run/systemd/journal/stdout 18888                 * 18413                 users:(("systemd-journal",pid=214,fd=49),("systemd",pid=1,fd=85))
u_str  ESTAB      0      0      /run/systemd/journal/stdout 9894                  * 10730                 users:(("systemd-journal",pid=214,fd=18),("systemd",pid=1,fd=37))
```

lsof -n |awk '{print $2}'|sort|uniq -c |sort -nr|more 
Linux有硬性限制和软性限制。可以通过ulimit来设定这两个参数：ulimit -HSn 4096 
```
系统总限制
[root@ubuntu0006:~/cmake] #cat /proc/sys/fs/file-max
810923
系统只读
[root@ubuntu0006:~/cmake] #cat /proc/sys/fs/file-nr
6400    0       810923
```

### 2-2、gdb调试
使用gdb命令是不可能的，因为是使用python命令运行的程序，这个看的是编译器的进程情况。
但是不用灰心，有py-bt命令可以使用，

使用lsof命令查看打开的句柄，注意系统安装了两个lsof命令，其中有一个有异常，需要绝对路径进行使用：/usr/bin/lsof；/usr/sbin/lsof。
```
查看句柄：/usr/sbin/lsof -np 8426 |wc -l
查看线程：top -H -p 8426
```
见本文第5节。

### 2-3、最终原因
之前猜测到是句柄数量导致的问题，但是一直在看代码中的open文件是否未关闭，另外测试客户端访问是否未关闭socket。然后都没有复现问题。
后面还是同事见多识广，通过telnet命令可以进行构建，最终复现出了问题，VIRT达到了10.1g后CPU飙高至99%：
D:\Github\Storage\python\web\memory_leak\telnet_example.py

然后就分析lsof或者通过netstat查看的长连接ip地址发现，好多ip地址是国外的，并且存在同一个ip多个长连接问题。
另外./logs/logs.out日志文件里面记录了每个ip地址的具体行为，最终发现：
```
172.22.192.25 - - [04/Jul/2024 20:14:09] "[35m[1mGET /hello_world HTTP/1.1[0m" 500 -
172.22.192.25 - - [04/Jul/2024 20:14:29] "[37mPOST /hello_flask HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:14:29] "[37mGET /hello_world?name=hejian HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:16:01] "[37mPOST /hello_flask HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:16:01] "[37mGET /hello_world?name=hejian HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:16:01] "[33mGET /login HTTP/1.1[0m" 404 -
172.22.192.25 - - [04/Jul/2024 20:43:52] "[37mPOST /hello_flask HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:43:52] "[37mGET /hello_world?name=hejian HTTP/1.1[0m" 200 -
172.22.192.25 - - [04/Jul/2024 20:43:52] "[33mGET /login HTTP/1.1[0m" 404 -
172.22.192.25 - - [04/Jul/2024 20:43:52] "[33mGET /admin/ HTTP/1.1[0m" 404 -
172.22.192.25 - - [04/Jul/2024 20:48:52] code 400, message Bad request syntax ('123')
172.22.192.25 - - [04/Jul/2024 20:48:52] "[35m[1m123[0m" HTTPStatus.BAD_REQUEST -
172.22.192.25 - - [04/Jul/2024 20:49:14] code 400, message Bad request syntax ('ccc')
172.22.192.25 - - [04/Jul/2024 20:49:14] "[35m[1mccc[0m" HTTPStatus.BAD_REQUEST -
```
异常的ip存在爆破行为，有使用get请求尝试爆破登录的，有使用telnet命令进行端口爆破的，为何它们都不结束程序呢，一直保存连接，从而导致服务器句柄达到系统限制。

### 2-4、解决方案
- 放开系统句柄限制
- 屏蔽get请求并加入黑名单
- 屏蔽telnet请求并加入黑名单
有点难研究，毕竟不属于自己擅长的领域，有个简单方式就是写shell脚本让程序定时重启即可。

## 3、模拟构建长连接复现问题
使用requests请求无法创建长连接：
```
requests.post(url="http://1.4.10.4:8001/totals", json=data, timeout=1)
```

使用telnet命令则可以：
```
tn = telnetlib.Telnet('1.4.10.4', port=8001, timeout=10)
os.system("C:\\Users\\Administrator\\AppData\\Roaming\\MobaXterm\\slash\\bin\\telnet.exe 1.4.10.4 8001")
```

但是不能单纯的使用for循环进行创建，需要使用多线程创建，并且需要睡眠保持，否则程序退出后就不存在了。这也是很奇怪服务端是为何会保持长连接遗留的。

## 4、实存(RES) 与 虚存(VIRT)区别
https://blog.csdn.net/leacock1991/article/details/111086130/
VIRT: 进程“需要的”虚拟内存大小，包括进程使用的库、代码、数据，以及malloc、new分配的堆空间和分配的栈空间等；
RES: 进程当前使用的内存大小，包括使用中的malloc、new分配的堆空间和分配的栈空间，但不包括swap out量；

## 5、使用GDB调试Python代码
https://blog.csdn.net/Once_day/article/details/129721541

如果Python程序挂住了，想查看Python代码的栈，但是用GDB看到的是C栈，本文介绍使用gdb的python扩展来查看python代码栈。
安装gdb时都会自带装上python的扩展工具：find /usr/ -name "gdb"

(1)加载libpython文件（注意需要加载python对应版本的文件）：
https://github.com/python/cpython/blob/3.9/Tools/gdb/libpython.py
wget https://github.com/python/cpython/raw/3.8/Tools/gdb/libpython.py

下载到本地文件夹中。可以放到系统路径去，这样后面不需要额外添加系统路径了。

(2)gdb调试python程序：gdb /usr/sbin/python3 8426
bt
bt full打印更详细

(3)手动加在python扩展，部分发行版Linux的GDB集成了python扩展功能，那就无需手动导入了
```
(gdb) python
>import sys
>sys.path.insert(0,"/home/ubuntu/py-code")
>import libpython
>end
(gdb) py
py-bt               py-down             py-locals           py-up               python-interactive
py-bt-full          py-list             py-print            python        
```
sys.path.insert是把下载的libpython.py文件所在的文件夹加入系统路径中，如果已经放入系统路径，这一步就是多余的了。

(4)这时候就可以使用py-bt命令打印python堆栈了，py-bt-full打印栈的详细信息
py-up和py-down上下移动栈的位置，py-list显示当前附近的源码
py-locals打印当前栈的局部变量信息
py-print可以打印指定的变量信息

https://www.sohu.com/a/158676758_446710
https://blog.51cto.com/u_16213702/7536058
https://zhuanlan.zhihu.com/p/436577356