# samba （软件）

## 1、简介
Samba是在Linux和UNIX系统上实现SMB协议的一个免费软件，由服务器及客户端程序构成。SMB（Server Messages Block，信息服务块）是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。SMB协议是客户机/服务器型协议，客户机通过该协议可以访问服务器上的共享文件系统、打印机及其他资源。通过设置“NetBIOS over TCP/IP”使得Samba不但能与局域网络主机分享资源，还能与全世界的电脑分享资源。

samba是什么？能干什么？什么场合需要用到它？

samba 是基于SMB协议（ServerMessage Block，信息服务块）的开源软件，samba也可以是SMB协议的商标。SMB是一种Linux、UNIX系统上可用于共享文件和打印机等资源的协议，这种协议是基于Client\Server型的协议，Client端可以通过SMB访问到Server（服务器）上的共享资源。当Windows是 Client，CentOS是服务器时，通过Samba就可以实现window访问Linux的资源，实现两个系统间的数据交互。
Linux对于开发来说是一个非常好的系统，但是人机友好不如windows，我就通常在windows上用sourceinsight编辑代码，然后在Linux端编译运行，而且经常需要把音视频从Linux和windows端互相拷贝，这时候Samba就显得很方便了。

Samba的作用是在Linux和windows之间通过网络进行资源共享。
samba是模仿Windows网上邻居的SMB的通讯协议，将Linux操作系统“假装成”Windows操作系统，通过网上邻居的方式来进行文件传输的。

samba有两个主要的进程smbd和nmbd。smbd进程提供了文件和打印服务，而nmbd则提供了NetBIOS名称服务和浏览支持，帮助SMB客户定位服务器，处理所有基于UDP的协议。

## 2、安装samba软件
apt install samba

创建samba登录用户
useradd sambauser

创建密码
smbpasswd -a sambauser

配置文件
```
#1.全局部分参数设置：
[global]
        #与主机名相关的设置
        workgroup = zkhouse  <==工作组名称
        netbios name = zkserver   <==主机名称，跟hostname不是一个概念，在同一个组中，netbios name必须唯一
        serverstring = this is a test samba server <==说明性文字，内容无关紧要
        #与登录文件有关的设置
        log file = /var/log/samba/log.%m   <==日志文件的存储文件名，%m代表的是client端Internet主机名，就是hostname
        max log size = 50      <==日志文件最大的大小为50Kb
        #与密码相关的设置
        security = share       <==表示不需要密码，可设置的值为share、user和server
        passdb backend = tdbsam
        #打印机加载方式
        load printer = no <==不加载打印机
-----------------------------------------------------------
#2.共享资源设置方面：将旧的注释掉，加入新的
#先取消[homes]、[printers]的项目，添加[temp]项目如下
[temp]              <==共享资源名称
        comment = Temporary file space <==简单的解释，内容无关紧要
        path = /tmp     <==实际的共享目录
        writable = yes    <==设置为可写入
        browseable = yes   <==可以被所有用户浏览到资源名称，
        guest ok = yes    <==可以让用户随意登录
```

我测试使用在/etc/samba/smb.conf末尾增加：
```
[share-office]
	comment              = office
	path                 = /media/hankin/vdb/office
	writable             = yes 
	browseable           = yes
	guest ok             = yes 
	file mode            = 660
	force file mode      = 660
	directory mode       = 770
	force directory mode = 770
```

重启服务
/etc/init.d/samba restart

ifconfig查看服务器ip地址

在Windows的运行，输入\\223.3.119.170（Samba对应的IP地址）

这个时候会弹出登录界面，直接输入之前设置的登录账号和密码就行了

## 3、出现一个问题
需要确认新建的文件夹是新建用户有权限访问的。
使用chown命令修改即可。
chown sambauser /media/hankin/vdb/office

有防火墙记得关闭。

## 4、在ubuntu上面配置示例
```
apt install samba
smbpasswd -a hankin(已有账户)
vim /etc/samba/smb.conf

[share-office](在Windows显示的名称)
	comment = office（好像无用）
	path = /media/hankin/vdb/office
	writable = yes 
	browseable = yes
	guest ok = yes 
	file mode = 660
	force file mode = 660
	directory mode = 770
	force directory mode = 770

/etc/init.d/smbd restart
ifconfig
Windows运行\\1.1.2.3
居然没有输入任何密码进去了。。。。
```

### 问题1：无法新建文件夹或文件
给文件夹增加全权限，chmod 777 /media/hankin/vdb/office

### 问题2：ssh无法将ubuntu中的文件拷贝出来
发现有的文件可以，有的文件不可以。
真相只有一个，文件创建的权限问题，发现文件权限是root:root。
使用命令chown hankin:hankin *即可，解决ssh无法拷贝问题。

一定要进行递归，即chown -R hankin dir。

发现使用samba服务器还是有问题。。。

### 问题3：Windows网络驱动器无法拷贝文件出来
通过对比发现，居然是文件的读写权限问题。
使用命令chmod 664 *即可。

### 问题4：文件夹设置成hankin:hankin后还是无法访问
测试chmod 666 dir居然不行
最终测试chmod 777 dir才行。。。。

### 问题5：文件无法进行修改
权限权限权限，重要的事情说三遍。

一定要注意是修改当前修改的文件的权限，并不是文件夹。

## 5、查看SAMBA用户
查看samba服务器中已拥有哪些用户：pdbedit -L

其他操作用法：
删除samba服务中的某个用户：smbpasswd -x   用户名
查看Linux中所有用户：cat  /etc/passwd
查看Linux中添加了多少用户：cat /etc/passwd|grep -v nologin|grep -v halt|grep -v shutdown|awk -F":" '{ print $1"|"$3"|"$4 }'|more
查看Linux中所有组：cat  /etc/group
删除linux某个用户：userdel   用户名
删除linux中某个用户所有信息：userdel   -r  用户名

## 6、密码忘记了怎么办
查看samba服务器中已拥有哪些用户：pdbedit -L
smbpasswd -a sambauser 可以修改密码
smbstatus 可以查看当前连接的用户信息（无连接则空）
vim /etc/samba/smb.conf 可以修改配置
/etc/init.d/samba restart 重启服务
\\10.22.33.44重新连接
连接后：ps aux | grep smb有一个该用户的父进程


