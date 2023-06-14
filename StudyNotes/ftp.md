# 搭建ftp服务器

## 1、目标
百度和谷歌有一种新颖的搜索模式："index of" linux。

示例1：http://mirrors.aliyun.com/linux-kernel/v2.6/
示例2：http://rpmfind.net/linux/
目的想搭建一个如上面链接的文件下载服务器，无奈看不出使用了什么技术，然后就搜索搜索呀！

## 2、WampServer
WampServer是一款由法国人开发的Apache Web服务器、PHP解释器以及MySQL数据库的整合软件包。免去了开发人员将时间花费在繁琐的配置环境过程，从而腾出更多精力去做开发。
WampServer就是Windows Apache Mysql PHP集成安装环境，即在Windows操作系统下的apache、php和mysql的服务器软件。

Windows下的Apache+Mysql/MariaDB+Perl/PHP/Python，一组常用来搭建动态网站或者服务器的开源软件，本身都是各自独立的程序，但是因为常被放在一起使用，拥有了越来越高的兼容度，共同组成了一个强大的Web应用程序平台。随着开源潮流的蓬勃发展，开放源代码的LAMP已经与J2EE和.Net商业软件形成三足鼎立之势，并且该软件开发的项目在软件方面的投资成本较低，因此受到整个IT界的关注。LAMP是基于Linux，Apache，MySQL/MariaDB和PHP的开放资源网络开发平台，PHP是一种有时候用Perl或Python可代替的编程语言。这个术语来自欧洲，在那里这些程序常用来作为一种标准开发环境。名字来源于每个程序的第一个字母。每个程序在所有权里都符合开放源代码标准：Linux是开放系统；Apache是最通用的网络服务器；mySQL是带有基于网络管理附加工具的关系数据库；PHP是流行的对象脚本语言，它包含了多数其它语言的优秀特征来使得它的网络开发更加有效。开发者在Windows操作系统下使用这些Linux环境里的工具称为使用WAMP。

## 3、XAMPP
XAMPP（Apache+MySQL+PHP+PERL）是一个功能强大的建站集成软件包。这个软件包原来的名字是 LAMPP，但是为了避免误解，最新的几个版本就改名为 XAMPP 了。它可以在Windows、Linux、Solaris、Mac OS X 等多种操作系统下安装使用，支持多语言：英文、简体中文、繁体中文、韩文、俄文、日文等。
许多人通过他们自己的经验认识到安装 Apache 服务器是件不容易的事儿。如果您想添加 MySQL、PHP 和 Perl，那就更难了。XAMPP 是一个易于安装且包含 MySQL、PHP 和 Perl 的 Apache 发行版。XAMPP 的确非常容易安装和使用：只需下载，解压缩，启动即可。

## 4、Epic Games
Epic Games是近十年来最负盛名的游戏制作团队之一，主要是因为旗下最为畅销的《战争机器》系列。团队研发的虚幻3引擎为无数的游戏制作团队所采用。2011年，Epic Games发售的《战争机器3》引来了业界的广泛好评。代表作品另有《子弹风暴》、《堡垒之夜》等。
2020年7月10日，索尼与Epic Games联合宣布，索尼已经投资2.5亿美元收购了Epic的1.4%股权。

## 5、什么是FTP
FTP---文件传输协议（File Transfer Protocol，FTP）是用于在网络上进行文件传输的一套标准协议，它工作在 OSI 模型的第七层， TCP 模型的第四层， 即应用层， 客户在和服务器建立连接前要经过一个“三次握手”的过程， 保证客户与服务器之间的连接是可靠的， 而且是面向连接， 为数据传输提供可靠保证。

## 6、搭建FTP服务器有什么用？
通俗来说就是实现文件共享功能。用户联网的目的大多就是实现信息的传递与共享，文件传输是信息共享非常重要的内容之一。互联网（Internet）是一个非常复杂的计算机环境，连接在Internet上的计算机数不胜数，而这些计算机可能运行不同的操作系统，各种操作系统之间的文件共享问题，需要建立一个统一的文件传输协议，这就是FTP。基于不同的操作系统有不同的FTP应用程序，而所有这些应用程序都遵守同一种协议，这样用户就可以把自己的文件传送给别人，也可以从别人的计算机中获得文件。

## 7、Windows作为服务器搭建教程
https://baijiahao.baidu.com/s?id=1722099433545935770&wfr=spider&for=pc

控制面板-》程序-》打开或关闭Windows功能-》Internet 信息服务-》FTP服务器和Web 管理工具下面全选 后确定进行安装
创建一个ftp用户账号：计算机管理-》本地用户和组-》右键用户文件夹-》新用户-》ftpuser/ftpuser 去掉下次更改密码
配置ftp服务器：计算机管理-》服务和应用程序-》Internet 信息服务 （IIS）管理器-》中间连接-》右键电脑名-》添加FTP站点

这个好像跟网上邻居是同样的东西，网上邻居共享一个文件夹。跟这个有啥区别？？？？

在浏览器输入：http://127.0.0.1/
居然有everything搜索引擎，太不可思议了。但是，我的服务器只有D盘的FTP服务器文件夹，但是这个确实本地全部硬盘空间。

浏览器访问：ftp://1.2.3.4
最好是IE浏览器。

## 8、浏览器打开ftp服务器
发现谷歌浏览器并不可以，我还以为是我的配置问题。

https://blog.51cto.com/u_14630355/5102422
https://blog.csdn.net/qq_37598092/article/details/124409868
https://www.jiaxu.net/archives/2590.html

网上有人说过新版的谷歌浏览器不支持，果然，使用ie浏览器就能正常访问了。

那也就是说发布到公网上面的可能不是ftp服务器，但是不能排除，因为是使用http进行访问。

## 9、网上邻居共享文件和文件夹
https://www.pc-daily.com/xitong/77994.html

- 创建文件共享目录
- 右键属性-》共享-》共享-》下拉框添加用户
- 注意需要给账户增加用户名和密码
- 关闭防火墙
- 打开网络和共享中心-》更改高级共享设置-》启用网络共享文件

这种方法：不稳定，可能由于什么原因

## 10、什么是SFTP
SFTP是Secure File Transfer Protocol的缩写，安全文件传送协议。可以为传输文件提供一种安全的网络的加密方法。SFTP与FTP有着几乎一样的语法和功能。SFTP为SSH的其中一部分，是一种传输档案至Blogger伺服器的安全方式。其实在SSH软件包中，已经包含了一个叫作SFTP(Secure File Transfer Protocol)的安全文件信息传输子系统，SFTP本身没有单独的守护进程，它必须使用sshd守护进程（端口号默认是22）来完成相应的连接和答复操作，所以从某种意义上来说，SFTP并不像一个服务器程序，而更像是一个客户端程序。SFTP同样是使用加密传输认证信息和传输的数据，所以，使用SFTP是非常安全的。但是，由于这种传输方式使用了加密/解密技术，所以传输效率比普通的FTP要低得多，如果您对网络安全性要求更高时，可以使用SFTP代替FTP。

SFTP协议是在FTP的基础上，对数据采取了加密/解密技术，使数据传输更安全。SFTP的传输效率比FTP的低很多。

SFTP要求客户端用户必须由服务器进行身份验证，并且数据传输必须通过安全通道（SSH）进行，即不传输明文密码或文件数据。
它允许对远程文件执行各种操作，有点像远程文件系统协议。SFTP允许从暂停传输，目录列表和远程文件删除等操作中恢复。

### 10-1、SFTP和FTP之间的区别
SFTP 和 FTP非常相似，都支持批量传输（一次传输多个文件），文件夹/目录导航，文件移动，文件夹/目录创建，文件删除等。

1、安全通道
FTP 不提供任何安全通道来在主机之间传输文件；
而，SFTP协议提供了一个安全通道，用于在网络上的主机之间传输文件。

2、使用的协议
FTP使用 TCP/IP协议。
而，SFTP是SSH协议的一部分，它是一种远程登录信息。

3、链接方式
FTP使用TCP端口21上的控制连接建立连接。
而，SFTP是在客户端和服务器之间通过SSH协议（TCP端口22）建立的安全连接来传输文件。

4、安全性
FTP密码和数据以纯文本格式发送，大多数情况下是不加密的，安全性不高。
而，SFTP会在发送之前加密数据，二进制的形式传递，是无法 "按原样" 阅读的，安全性较高。

### 10-2、用法
安装SSH软件包就包含了sftp命令。
```
[root@ubuntu0006:~] #sftp
usage: sftp [-1246aCfpqrv] [-B buffer_size] [-b batchfile] [-c cipher]
          [-D sftp_server_path] [-F ssh_config] [-i identity_file] [-l limit]
          [-o ssh_option] [-P port] [-R num_requests] [-S program]
          [-s subsystem | sftp_server] host
       sftp [user@]host[:file ...]
       sftp [user@]host[:dir[/]]
       sftp -b batchfile [user@]host
[root@ubuntu0006:~] #apt-file search sftp   # 错误，这样搜索太多太多结果了
[root@ubuntu0006:~] #whereis sftp
sftp: /usr/bin/sftp /usr/share/man/man1/sftp.1.gz
[root@ubuntu0006:~] #apt-file search /usr/bin/sftp
mysecureshell: /usr/bin/sftp-admin
mysecureshell: /usr/bin/sftp-kill
mysecureshell: /usr/bin/sftp-state
mysecureshell: /usr/bin/sftp-user
mysecureshell: /usr/bin/sftp-verif
mysecureshell: /usr/bin/sftp-who
openssh-client: /usr/bin/sftp
sftpcloudfs: /usr/bin/sftpcloudfs
```

lpwd：显示本地路径，pwd：显示远程路径。
lcd：进入本地路径，cd：进入远程路径。
```
[root@ubuntu0006:~] #sftp root@172.22.65.15
Warning: Permanently added '172.22.65.15' (RSA) to the list of known hosts.
Connected to 172.22.65.15.
sftp> pwd
Remote working directory: /root
sftp> lpwd
Local working directory: /home/mobaxterm

sftp> put D:\Tools\upan_auto_copy\upan_auto_copy.exe /media/
Invalid command.
sftp> lcd D:/Tools/upan_auto_copy
sftp> lpwd
Local working directory: /drives/d/Tools/upan_auto_copy
sftp> put upan_auto_copy.exe
Uploading upan_auto_copy.exe to /root/upan_auto_copy.exe
upan_auto_copy.exe                                                                            100% 6770KB  16.9MB/s   00:00
sftp> lpwd
Invalid command.
sftp> lpwd
Local working directory: /drives/d/Tools/upan_auto_copy
sftp> put upan_auto_copy.exe /media/r
Uploading upan_auto_copy.exe to /media/r
upan_auto_copy.exe                                                                            100% 6770KB  17.6MB/s   00:00
```
不是很懂，为啥put命令有时候使用失败了。
上传：put 本地路径/文件名 远程路径
下载：get 远程路径/文件名 本地路径
      get -r  远程路径/文件夹名 本地路径

### 10-3、常用命令
get --下载
put --上传
clear --清屏
exit、quit --断开连接
help --帮助

远程端服务器的操作指令：
ls --显示目录
rm --删除
cd --切换路径
mkdir --创建目录
pwd --显示当前路径

本地端服务器的操作指令（在远程指令前加l(local)即可）： 
lls --显示目录
lrm --删除
lcd --切换路径
lmkdir --创建目录
lpwd --显示当前路径

### 10-4、注意说明
Windows环境路径和Linux环境路径的写法要注意区分，不然可能get和put时无法获取正常路径导致失败；还有登录服务器的用户权限也有要求，无正常读写权限的文件及文件目录，可能无法操作（需要通过命令开通相应权限）从来导致失败。

### 10-5、如何在命令行方式运行sftp时携带密码
sftp不同于ftp，没有提供选项如 -i 可以将密码直接编码进程序。使用sftp指令，会自动请求用户输入密码。

LFTP是一款非常著名的字符界面的文件传输工具。支持FTP、HTTP、FISH、SFTP、HTTPS和FTPS协议。

https://www.bbsmax.com/A/MAzAoZqo59/
https://wenku.baidu.com/view/0ce565f1cd2f0066f5335a8102d276a201296041.html

### 10-6、使用freessh在dwindows 上搭建 sftp 服务器
https://blog.csdn.net/m0_43584016/article/details/104985031

## 11、windows开启远程桌面连接
打开计算机属性-》远程控制设置-》允许远程协助-》允许任意版本
注意该电脑需要有账号和密码才能连接。

## 12、上传失败
报错：FTP文件夹错误 将文件复制到FTP服务器发生错误。请检查是否有权限将文件放到该服务器上。

很奇怪，磁盘肯定没有满。
源文件名为 升级前.PNG 更改为 通过.PNG 后正常，改成其他名字也是正常，然后改回 升级前.PNG 还是报同样的错误。
