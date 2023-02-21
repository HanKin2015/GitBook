# socat命令

## 1、简介
apt install socat

socat，是linux下的一个工具，其功能与有“瑞士军刀”之称的netcat类似，不过据说可以看做netcat的加强版。的确如此，它有一些netcat所不具备却又很有需求的功能，例如ssl连接这种。nc可能是因为比较久没有维护，确实显得有些陈旧了。

socat [options] address address
其中这2个address就是关键了，如果要解释的话，address就类似于一个文件描述符，socat所做的工作就是在2个address指定的描述符间建立一个pipe用于发送和接收数据。

那么address的描述就是socat的精髓所在了，几个常用的描述方式如下：

-,STDIN,STDOUT ：表示标准输入输出，可以就用一个横杠代替，这个就不用多说了吧….
/var/log/syslog : 也可以是任意路径，如果是相对路径要使用./，打开一个文件作为数据流。
TCP:: : 建立一个TCP连接作为数据流，TCP也可以替换为UDP
TCP-LISTEN: : 建立TCP监听端口，TCP也可以替换为UDP
EXEC: : 执行一个程序作为数据流。
以上规则中前面的TCP等都可以小写。

## 2、实例
socat当cat
```
直接回显
socat - -

cat文件
socat - /home/user/chuck

写文件
echo “hello” | socat - /home/user/chuck
```

socat当netcat
```
连接远程端口
nc localhost 80
socat - TCP:localhost:80

监听端口
nc -lp localhost 700
socat TCP-LISTEN:700 -

正向shell
nc -lp localhost 700 -e /bin/bash
socat TCP-LISTEN:700 EXEC:/bin/bash

反弹shell
nc localhost 700 -e /bin/bash
socat tcp-connect:localhost:700 exec:‘bash -li’,pty,stderr,setsid,sigint,sane

代理与转发
将本地80端口转发到远程的80端口
socat TCP-LISTEN:80,fork TCP:www.domain.org:80
```
https://blog.csdn.net/wuheshi/article/details/107364998

## 3、本地通信
实战中给套接字发送消息调试：echo '{"method": "dbg_trace_point", "type": 1, "switch": "off"}' | socat - unix-connect:/run/clien/socket.\[965758601552\]


```
[root@ubuntu0006:/media/hankin/vdb/study] #ll copied/null/
总用量 48
drwxr-xr-x  4 root root  4096 10月 26 16:23 ./
drwxr-xr-x 29 root root  4096 10月 26 16:28 ../
drwxr-xr-x  2 root root  4096 7月  14 16:49 a/
-rwxr-xr-x  1 root root 13896 10月 26 16:23 a.out*
drwxr-xr-x  2 root root  4096 7月  14 16:49 b/
-rw-r--r--  1 root root  3828 10月 26 16:23 local_server_and_client.cpp
srwxr-xr-x  1 root root     0 10月 26 16:23 server.sock=
-rwxr-xr-x  1 root root  1333 7月  14 17:32 shellchek.sh*
-rw-r--r--  1 root root   223 7月   9 13:52 study_string.cpp
-rw-r--r--  1 root root   233 7月  16 09:41 study_switch.cpp
```













