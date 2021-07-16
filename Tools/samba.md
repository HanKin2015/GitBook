# samba （软件）
Samba是在Linux和UNIX系统上实现SMB协议的一个免费软件，由服务器及客户端程序构成。SMB（Server Messages Block，信息服务块）是一种在局域网上共享文件和打印机的一种通信协议，它为局域网内的不同计算机之间提供文件及打印机等资源的共享服务。SMB协议是客户机/服务器型协议，客户机通过该协议可以访问服务器上的共享文件系统、打印机及其他资源。通过设置“NetBIOS over TCP/IP”使得Samba不但能与局域网络主机分享资源，还能与全世界的电脑分享资源。

## 再生龙
再生龙（Clonezilla）是一个免费的灾难恢复、硬盘克隆、硬盘映像档制作的部署和解决方案，由台湾的高速网络与计算中心所开发，以GNU通用公共许可协议（GPL）发布。



Samba的作用是在Linux和windows之间通过网络进行资源共享。
samba是模仿Windows网上邻居的SMB的通讯协议，将Linux操作系统“假装成”Windows操作系统，通过网上邻居的方式来进行文件传输的。

samba有两个主要的进程smbd和nmbd。smbd进程提供了文件和打印服务，而nmbd则提供了NetBIOS名称服务和浏览支持，帮助SMB客户定位服务器，处理所有基于UDP的协议。 

## 1、安装samba软件
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
        comment = office
        path = /media/hankin/vdb/office
        writable = yes 
        browseable = yes
        guest ok = yes 
		file mode = 660
		force file mode = 660
		directory mode = 770
		force directory mode = 770
```

重启服务
/etc/init.d/samba restart

ifconfig









