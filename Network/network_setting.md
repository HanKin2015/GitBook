# linux网络设置

## 重启网络服务
```
/etc/init.d/network-manager restart
/etc/init.d/networking restart
```

## 1、DNS设置
### ubuntu
vi /etc/systemd/resolved.conf
DNS= 10.0.0.3 10.0.0.4
:wq

这个文件/etc/resolv.conf是可以看见dns信息，并且可以设置。但是发现开头就写着这么一行：
> # This file is managed by man:systemd-resolved(8). Do not edit.

另一种更简单的办法是，我们直接停掉systemd-resolved服务，这样再修改/etc/resolve.conf就可以一直生效了。


修改文件 /etc/resolvconf/resolv.conf.d/base（这个文件默认为空），添加以下内容：

nameserver 8.8.8.8
nameserver 8.8.4.4
:wq 保存退出

执行更新：

resolvconf -u
通过 /etc/resolv.conf 查看 DNS 设置:

可看到多了:

nameserver 8.8.8.8
nameserver  8.8.4.4


通过/etc/network/interfaces，在它的最后增加一句：

dns-nameservers 8.8.8.8 

## 2、路由设置

## 3、











