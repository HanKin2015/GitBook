# ssh需要知道的那些事儿

## 1、使用ssh的原因
远程管理linux系统基本上都要使用到ssh，原因很简单：

- telnet、FTP等传输方式是以明文传送用户认证信息，本质上是不安全的，存在被网络窃听的危险。
- SSH（Secure Shell）目前较可靠，是专为远程登录会话和其他网络服务提供安全性的协议。利用SSH协议可以有效防止远程管理过程中的信息泄露问题，透过SSH可以对所有传输的数据进行加密，也能够防止DNS欺骗和IP欺骗。

ssh_config和sshd_config都是ssh服务器的配置文件，二者区别在于，前者是针对客户端的配置文件，后者则是针对服务端的配置文件。两个配置文件都允许你通过设置不同的选项来改变客户端程序的运行方式。下面列出来的是两个配置文件中最重要的一些关键词，每一行为“关键词&值”的形式，其中“关键词”是忽略大小写的

## 2、ssh配置文件
/etc/ssh/sshd_config

## 3、不同Linux系统网络重启
```
if [ "${ID_LIKE}" == "debian" ]; then
	/etc/init.d/networking restart
elif [ "${ID_LIKE}" == "redhat" ]; then
	/etc/init.d/network restart
else
	echo "unknown ID_LIKE"
fi
```


## 3、能ping得通服务器但却ssh不了的原因

我遇到的问题是这样的：

这个星期装服务器，搞了一个集群，服务器是双网卡，一个网卡连外网222开头，一个网卡连内网192开头，在系统等一切都安全成功，网络配置成功之后，奇怪的事情发生了，内网内任意一台主机ssh到这个台服务器上ssh root@222.....,都没有任务问题，但是从外网ssh root@222...就无法连接，报的错误是：

ssh_exchange_identification: read: Connection reset by peer

可能原因及排除过程：

(1)怀疑是网络不通，但从外网ping  222.....是能ping的通的，排除了网络问题；

(2)防火墙问题？，关闭防火墙：systemctl stop firewalld.sercive，没用，同样是这样；

(3)SSh服务没开？也不太可能，因为内网都能ssh到啊，不管，重启一遍 ： service sshd restart

查看22端口： netstat -tunpl | grep 22，端口是监听着的

查看ssh状态： service sshd status， sshd在运行。

(4)sshd权限变高了？查看一下： ll /var/empty/
也没有

(5)秘钥问题？

清除/root/.ssh/known_hosts文件和你所要连接ip或者主机名有关的ssh加密Key？
发现好像还没有这个文件，因为是刚装的系统，服务器还没有ssh别人，所以没有这个文件。这里说一下，这个文件是ssh别的主机的时候和别的主机建立的ssh通信，通常shh同一台主机的时候会在这里，如果ssh一台主机，然后那台主机修改了一些配置，RSA加密更改了等等，会发现连不上的。会出现一下这个错误，说明就是要删除/root/.ssh/known_hosts文件相关的ip和主机名了。
(6)vi /etc/ssh/sshd.conf（有些可能是vi /etc/ssh/sshd.confg）
找到X11Forwarding yes，将其注释掉或者改为no,重启启动ssh服务。

### 解决办法
我的解决方法就是重新安装ssh。

后来的后来，我终于明白。。。。。

原来是没有装ssh

报错：ssh：connect to host localhost port 22: Connection refused

ps -e|grep sshd，如果出现了sshd，则说明安装了，反之则没安装。

sudo apt-get install openssh-server


## 4、Windows远程操作
右键点击’我的电脑‘进入’属性‘点击左过菜单栏中的’远程设置‘;把远程桌面选项设置成’允许运行任意版本远程桌面的计算机连接‘。
使用mstsc命令

## 5、报错Permission denied, please try again.
非常非常奇怪，能ping通，出现这种情况90%是密码错误，但是我能确认密码100%正确，这又是为什么呢？

折腾了一半天root用户是否存在？密码是否设置正确？不停地试密码。。。。

以为这样能解决：
处理这个问题最好的分析方法就是查看系统登录日志。（举例：centos 系统可以查看 /var/log/secure日志） 
从中可以看到这样的记录：pam_tally2(sshd:auth): user xxxxxx  (500) tally 74, deny 5 （账号登录失败次数过多导致被锁定） 
处理方法： 
pam_tally2 --reset -u xxx 解锁即可

最终才意识到这种情况俺遇到了很多次：
服务端SSH 服务配置了禁止root用户登录策略。

通过 cat 等指令查看 /etc/ssh/sshd_config 中是否包含类似如下配置：
PermitRootLogin no
PermitRootLogin prohibit-password

修改为yes即可。

## 6、ssh配置正常却连接不上
systemctl stop firewalld.service
service firewalld stop

发现ping不通，好办，一般来说是防火墙导致。

银河麒麟中设置公共网络为办公网络。

## 7、重启ssh服务
/etc/init.d/sshd restart
service sshd restart
/etc/init.d/ssh restart

好奇怪，到底哪个是真的？

## 8、ssh反映特别慢，但是网络没有问题的时怎么办
vi sshd_config 找到注释的useDNS yes，修改为如下，并取消注释
useDNS no

完成添加后，保存退出

重启sshd服务

/etc/init.d/sshd restart

退出连接session

重新创建一个，感觉一下，是不是反映速度0.1秒都不到，特别迅速

如果是想让图形化界面连接快的话

还是找到vi sshd_config 

找到#GSSAPIAuthentication  yes

将yes修改为no  并且取消注释

GSSAPIAuthentication  no

重启sshd服务即可






















