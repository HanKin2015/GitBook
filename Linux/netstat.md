# netstat命令

注意windows系统和Linux系统中两者命令参数有所不同。

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
# netstat -aon
```

如果只是不想让这三个名称中的一个被显示，使用以下命令
```
# netsat -a --numeric-ports
# netsat -a --numeric-hosts
# netsat -a --numeric-users
```

## 4、关闭某个端口
```
root@kali:~# netstat -anp | grep 3000
tcp     0       0 0.0.0.0:30000.0.0.0:* LISTEN      5632/ruby
root@kali:~# kill 5632
root@kali:~# netstat -anp | grep 3000
root@kali:~#
```

## 5、端口被System pid:4占用的解决方式：修改服务使用的端口，不禁用服务
https://www.cnblogs.com/donglinblog/p/13415028.html

### 5-1、问题描述
端口被系统system，pid[4] 占用的，无法使用两步走的传统常用命令解决，即：
```
netstat -ano|findstr "端口号"
tasklist | findstr [查询的pid]
taskkill /F /PID [查询的pid]
```

### 5-2、解决方案
1：输入  netsh http show servicestate  查询http服务状态快照（在这里面就能看见8001端口被占用着）
2：输入 tasklist|findstr "pid" 查看占用端口号的应用程序
3：输入 taskkill /pid [查询的pid-] -F  或 taskkill /f /t /im ****.exe
前者是根据杀死占用端口的pid来释放端口， 后者则是杀死占用端口的应用程序来释放端口。笔者用的前者。

另外发现存在一个文件夹，名称为inetpub，然后百度https://www.jikegou.net/cjwt/3535.html，https://www.win10h.com/jiaocheng/43424.html。
其实这个就是微软的IIS服务占用了端口导致，通过控制面板关闭服务即可，不用杀死进程这么的暴力：
- 打开桌面左下角的开始按钮。
- 点击“控制面板”。
- 在控制面板窗口，点击打开“管理工具”。
- 在管理工具窗口，双击打开“服务”。
- 弹出服务窗口。
- 在服务列表中找到“World Wide Web Publishing Service”服务，双击该服务，然后点击“停止”。
- 为了防止下次开机自动启动，需要在服务列表中选择“World Wide Web Publishing Service”，然后点击“属性”，在下拉启动类型按钮中选择“禁止”。



