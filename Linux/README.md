# Linux

# 截图

scrot命令

注意：只能在本地进行使用，当远程连接使用时，截出来的图片是全黑色的。

scrot -s截取指定窗口或矩形区域。



 gnome-screenshot  -a 

ubuntu和debian下的快速截图。

# 开机自动获取ip地址

编辑 /etc/sysconfig/network-scripts/ifcfg-eth0 让系统启动时自动获取IP地址：

# 使用root用户登录系统，执行以下命令
$ vi /etc/sysconfig/network-scripts/ifcfg-eth0

将 ONBOOT=no 改为 ONBOOT=yes，保存文件后，执行以下命令重启网卡

$ service network restart

dhclient

ifup

ip addr





unzip *.zip -d 解压到的文件夹