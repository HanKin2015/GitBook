# 防火墙

## 1、iptables
iptables命令是Linux上常用的防火墙软件，是netfilter项目的一部分。可以直接配置，也可以通过许多前端和图形界面配置。

参考：http://lnmp.ailinux.net/iptables

### 1-1、选项
-t<表>：指定要操纵的表；
-A：向规则链中添加条目；
-D：从规则链中删除条目；
-i：向规则链中插入条目；
-R：替换规则链中的条目；
-L：显示规则链中已有的条目；
-F：清除规则链中已有的条目；
-Z：清空规则链中的数据包计算器和字节计数器；
-N：创建新的用户自定义规则链；
-P：定义规则链中的默认目标；
-h：显示帮助信息；
-p：指定要匹配的数据包协议类型；
-s：指定要匹配的数据包源ip地址；
-j<目标>：指定要跳转的目标；
-i<网络接口>：指定数据包进入本机的网络接口；
-o<网络接口>：指定数据包要离开本机所使用的网络接口。

### 1-2、清除已有iptables规则
iptables -F
iptables -X
iptables -Z

### 1-3、开放指定的端口
iptables -A INPUT -s 127.0.0.1 -d 127.0.0.1 -j ACCEPT               #允许本地回环接口(即运行本机访问本机)
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT    #允许已建立的或相关连的通行
iptables -A OUTPUT -j ACCEPT         #允许所有本机向外的访问
iptables -A INPUT -p tcp --dport 22 -j ACCEPT    #允许访问22端口
iptables -A INPUT -p tcp --dport 80 -j ACCEPT    #允许访问80端口
iptables -A INPUT -p tcp --dport 21 -j ACCEPT    #允许ftp服务的21端口
iptables -A INPUT -p tcp --dport 20 -j ACCEPT    #允许FTP服务的20端口
iptables -A INPUT -j reject       #禁止其他未允许的规则访问
iptables -A FORWARD -j REJECT     #禁止其他未允许的规则访问

### 1-4、屏蔽IP
iptables -I INPUT -s 123.45.6.7 -j DROP       #屏蔽单个IP的命令
iptables -I INPUT -s 123.0.0.0/8 -j DROP      #封整个段即从123.0.0.1到123.255.255.254的命令
iptables -I INPUT -s 124.45.0.0/16 -j DROP    #封IP段即从123.45.0.1到123.45.255.254的命令
iptables -I INPUT -s 123.45.6.0/24 -j DROP    #封IP段即从123.45.6.1到123.45.6.254的命令是

## 2、ufw
有命令，但是执行报错：
```
[root@ubuntu0006:~] #ufw
Traceback (most recent call last):
  File "/usr/sbin/ufw", line 26, in <module>
    import ufw.frontend
ImportError: No module named 'ufw'
```
https://segmentfault.com/q/1010000018217049
https://gitlab.alpinelinux.org/alpine/aports/-/issues/10319
说是python版本导致，高版本已修复。

根本研究不完，后面有时间再研究吧：https://askubuntu.com/questions/1191070/unable-to-use-ufw-after-reinstalling-python
去官网下载ufw.deb包安装：结果也报错：https://ubuntu.pkgs.org/18.04/ubuntu-main-amd64/ufw_0.35-5_all.deb.html
执行pyclean命令各种报错：
```
ImportError: No module named site
export PYTHONPATH=$PYTHONPATH:/usr/local/lib/python3.5
export PYTHONHOME=$PYTHONHOME:/usr/bin
ln -sf /usr/local/bin/python3.5 python
```
未解决。


## 3、firewalld
我身边只有ubuntu系统，因此没有这个命令

关闭防火墙：
systemctl stop firewalld
systemctl disable firewalld
systemctl status firewalld

1. 开放80端口
[root@localhost ~]# firewall-cmd --add-port=80/tcp --permanent
success

2. reload防火墙
[root@localhost ~]# firewall-cmd --reload

3.查看开放的所有端口

[root@localhost ~]# firewall-cmd --zone=public --list-ports 80/tcp
