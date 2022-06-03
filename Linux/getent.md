# getent命令

## 1、命令介绍
getent 命令用来查看系统的数据库中的相关记录。即使这些数据库不是在本地，比如 ldap 或者 nis 中的数据库，也可以使用 getent 查看。

支持的数据库：
ahosts，ahostsv4 ，ahostsv6， aliases ，ethers ，group， gshadow， hosts， netgroup， networks， passwd， protocols， rpc ，services， shadow

## 2、参考示例
### 查看文件 /etc/protocols 中的所有记录
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent protocols
ip                    0 IP
hopopt                0 HOPOPT
icmp                  1 ICMP
igmp                  2 IGMP
ggp                   3 GGP
```

### 查看指定用户组是否存在，若不存在则创建指定的用户组
````
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent group test
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent group hejian
hejian:x:1001:
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent group
root:x:0:
daemon:x:1:
hejian:x:1001:
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent group test
```
在文件 /etc/group 中查看用户组 test 是否存在，如果不存在则创建，如果存在则退出。
但是并没有创建。

### 根据主机名称，查看对应的IP地址；根据域名查找对应的IP
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent hosts
127.0.0.1       localhost
127.0.1.1       ubuntu0006
200.200.1.241   mirrors.hankin.org
127.0.0.1       ip6-localhost ip6-loopback
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent hosts localhost
::1             localhost
```

### 根据用户名查找对应的UID；根据UID查找用户名
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent passwd sambauser
sambauser:x:1000:1000::/home/sambauser:
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent passwd 1000
sambauser:x:1000:1000::/home/sambauser:
```

### 查找那个服务在使用特定端口
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent services 21
ftp                   21/tcp
[root@ubuntu0006:/media/hankin/vdb/study/udev] #getent services 25
smtp                  25/tcp mail
```






















