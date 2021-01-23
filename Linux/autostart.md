# linux系统启动之后执行某个命令
需求：Linux系统启动之后执行xset r rate 666 22命令

例如:/lib/systemd/system/networking.service

service命令

systemctl命令

xset命令

```
[Unit]
Description=Raise network interfaces
Documentation=man:interfaces(5)
DefaultDependencies=no
Wants=network.target
After=local-fs.target network-pre.target apparmor.service systemd-sysctl.service systemd-modules-load.service
Before=network.target shutdown.target network-online.target
Conflicts=shutdown.target

[Install]
WantedBy=multi-user.target
WantedBy=network-online.target

[Service]
Type=oneshot
EnvironmentFile=-/etc/default/networking
ExecStartPre=-/bin/sh -c '[ "$CONFIGURE_INTERFACES" != "no" ] && [ -n "$(ifquery --read-environment --list --exclude=lo)" ] && udevadm settle'
ExecStart=/sbin/ifup -a --read-environment
ExecStop=/sbin/ifdown -a --read-environment --exclude=lo
RemainAfterExit=true
TimeoutStartSec=5min
```

## 查看服务状态
正确：service networking status
错误：service networking.service status
正确：systemctl status networking
正确：systemctl status networking.service

注意下status在两个命令之间位置的不同。

服务重启，关闭等等。。。。。


自建服务，根据参考动手修改。
ExecStartPre：服务启动前执行
ExecStart：服务启动执行

发现，始终解决不了，报unable open display ""错误。
位置和命令确认没有错误，因为在其中添加了rm命令测试正常。


## Ubuntu下查看已安装软件/卸载已安装软件
dpkg -l

## Linux 命令行关闭开启显示器及xset: unable to open display ""解决方法
在远程连接Linux等时，基本用不到显示器，所以希望能远程将显示屏关闭
xset -display :0.0 dpms force off这个命令让显示屏进入休眠状态
xset -display :0.0 dpms force on开启显示屏

sleep 1 && xset dpms force off这个命令关闭屏幕
出现了报错：xset: unable to open display “”
解决方法：输入如下命令

export DISPLAY=:0
xset q

之后再输入sleep 1 && xset dpms force off不再报错
