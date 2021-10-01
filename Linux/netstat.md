# netstat命令

## 1、简介
Netstat 命令用于显示各种网络相关信息，如网络连接，路由表，接口状态 (Interface Statistics)，masquerade 连接，多播成员 (Multicast Memberships) 等等。

## 2、常见参数
-a (all)显示所有选项，默认不显示LISTEN相关
-t (tcp)仅显示tcp相关选项
-u (udp)仅显示udp相关选项
-n 拒绝显示别名，能显示数字的全部转化成数字。
-l 仅列出有在 Listen (监听) 的服務状态

-p 显示建立相关链接的程序名
-r 显示路由信息，路由表
-e 显示扩展信息，例如uid等
-s 按各个协议进行统计
-c 每隔一个固定时间，执行该netstat命令。

提示：LISTEN和LISTENING的状态只有用-a或者-l才能看到

## 3、实用命令实例
列出所有端口（包括监听和未监听的） netstat -a
列出所有 tcp 端口 netstat -at
列出所有 udp 端口 netstat -au
只显示监听端口 netstat -l
只列出所有监听 tcp 端口 netstat -lt
只列出所有监听 udp 端口 netstat -lu
只列出所有监听 UNIX 端口 netstat -lx
显示所有端口的统计信息 netstat -s
显示 TCP 或 UDP 端口的统计信息 netstat -st 或 -su
在 netstat 输出中显示 PID 和进程名称 netstat -p
netstat 将每隔一秒输出网络信息 netstat -c
显示系统不支持的地址族 (Address Families) netstat --verbose
显示核心路由信息 netstat -r
显示网络接口列表 netstat -i
显示详细信息，像是 ifconfig 使用 netstat -ie

在 netstat 输出中不显示主机，端口和用户名 (host, port or user)
当你不想让主机，端口和用户名显示，使用 netstat -n。将会使用数字代替那些名称。

同样可以加速输出，因为不用进行比对查询。
```
# netstat -an
```

如果只是不想让这三个名称中的一个被显示，使用以下命令
```
# netsat -a --numeric-ports
# netsat -a --numeric-hosts
# netsat -a --numeric-users
```



