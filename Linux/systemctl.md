# linux中systemctl详细理解及常用命令

## 1、systemctl理解
Linux 服务管理两种方式service和systemctl
systemd是Linux系统最新的初始化系统(init),作用是提高系统的启动速度，尽可能启动较少的进程，尽可能更多进程并发启动。
systemd对应的进程管理命令是systemctl

## 2、 systemctl命令兼容了service
即systemctl也会去/etc/init.d目录下，查看，执行相关程序

```
systemctl redis start
systemctl redis stop

# 开机自启动
systemctl enable redis
```

## 3、管理服务(unit)
systemctl 提供了一组子命令来管理单个的 unit，其命令格式为：
systemctl [command] [unit]

command 主要有：
start：立刻启动后面接的 unit。
stop：立刻关闭后面接的 unit。
restart：立刻关闭后启动后面接的 unit，亦即执行 stop 再 start 的意思。
reload：不关闭 unit 的情况下，重新载入配置文件，让设置生效。
enable：设置下次开机时，后面接的 unit 会被启动。
disable：设置下次开机时，后面接的 unit 不会被启动。
status：目前后面接的这个 unit 的状态，会列出有没有正在执行、开机时是否启动等信息。
is-active：目前有没有正在运行中。
is-enable：开机时有没有默认要启用这个 unit。
kill ：不要被 kill 这个名字吓着了，它其实是向运行 unit 的进程发送信号。
show：列出 unit 的配置。
mask：注销 unit，注销后你就无法启动这个 unit 了。
unmask：取消对 unit 的注销。

## 4、systemctl mask用法介绍
systemctl是Linux系统中管理服务的命令，可以用来启动、停止、重启、开机自启等各种操作。而mask是systemctl中的一个参数，用来屏蔽（mask）一个服务的启动，让其无法被启动。

屏蔽服务的意义在于，保护系统不受某些不必要的或者潜在危险的服务的影响。有些服务在默认情况下会启动，并连接到网络，这给系统安全带来了风险。如果某些服务不需要运行，则可以使用systemctl mask命令关闭服务，这可以将系统暴露在潜在的攻击中的风险降至最低。

例如，假设我们的服务器上安装了一个名为httpd的服务，但是这个服务在某些情况下会因为某些漏洞导致黑客攻击成功。为了避免这种危险，可以屏蔽httpd服务。
```
systemctl mask httpd.service
systemctl unmask servicename.service
```













