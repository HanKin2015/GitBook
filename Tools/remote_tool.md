# 远程工具

## 1、TeamViewer
远程的计算机正在使用过时的TeamViewer版本

解决：
TeamViewer->其他->选项->高级->
1、高级网络设置->使用UDP->取消勾选
2、高级->禁用硬件加速->确认勾选

teamviwer收不到短信验证码，坑，居然没有提示错误。问题在于同一个手机号码不能绑定两个账户。

## 2、Windows自带的远程桌面工具
mstsc

scons
autoconfig
so

## 3、todesk
https://www.todesk.com/
缺点：页面错误是真的高

## 4、VNC
VNC(Virtual Network Console)是虚拟网络控制台的缩写。它 是一款优秀的远程控制工具软件，由著名的 AT&T 的欧洲研究实验室开发的。VNC 是在基于 UNIX 和 Linux 操作系统的免费的开源软件，远程控制能力强大，高效实用，其性能可以和 Windows 和 MAC 中的任何远程控制软件媲美。 在 Linux 中，VNC 包括以下四个命令：vncserver，vncviewer，vncpasswd，和 vncconnect。大多数情况下用户只需要其中的两个命令：vncserver 和 vncviewer。

是一种C/S架构的协议，所以需要客户端和服务端同时执行，在服务端监听5800,5801，5901等多个可能的端口，而客户端只需要想sever端发起连接请求，并输入账号密码（不是linux系统内用户的账号密码，而是VNC自己的密码）即可访问了，但是VNC在网上传输的时候是没有加密的，所以我们的账号密码在网上传输的时候是很容易被“有心之人”捕获到的，这时候我们可以结合sshd来实现加密传送，另外VNC传输的是桌面应用，大家都知道，只要是传输需要绘图的东西计算量都是很大的（尤其是用SSHD加密之后），所以VNC会相当的占用带宽和系统资源，那么我们为什么还要使用它呢?因为有时候我们配置一些软件（比如oracle等）必须使用图形界面同时必须远程连接的时候我们就不得不用VNC了。

## 5、anyviewer
https://www.anyviewer.cn/

## 6、向日葵
https://sunlogin.oray.com/

### 4-1、银河麒麟系统中安装x11vnc服务
步骤1 ：更新系统
sudo apt-get update

步骤2 ：安装x11vnc
sudo apt-get install x11vnc -y

步骤3 ：设置VNC连接密码
sudo x11vnc -storepasswd /etc/x11vnc.pwd
根据提示，输入并确认VNC连接的密码，密码保存在/etc/x11vnc.pwd文件中。

步骤4 ：编写服务脚本（设置服务开机自启动）
sudo vim /lib/systemd/system/x11vnc.service
x11vnc.service文件内容如下：
```
[Unit]
Description=Start x11vnc at startup
After=multi-user.target
[Service]
Type=simple
ExecStart=/usr/bin/x11vnc -auth guess -forever -loop -noxdamage -repeat -rfbauth /etc/x11vnc.pwd -rfbport 5900 -shared
[Install]
WantedBy=multi-user.target
```
编辑完成后，保存退出，修改文件权限
sudo chmod 755 /lib/systemd/system/x11vnc.service

修改用户和组
sudo chown root:root /lib/systemd/system/x11vnc.service

步骤5 ：配置启动服务
sudo systemctl enable x11vnc.service
sudo systemctl daemon-reload

步骤6 ：重启生效
sudo reboot

### 4-2、Windows系统中安装客户端
步骤1 ： 下载并安装VNC Viewer
下载地址：https://www.realvnc.com/en/connect/download/viewer/

步骤2 ： 连接银河麒麟系统
运行VNC Viewer
在地址栏中输入银河麒麟系统的IP地址，回车连接。
输入上面步骤3中设置的密码，即可成功连接。

### 4-3、银河麒麟自身含有vncserver命令
启动后无法直接连接

打算以Xubuntu为例，手动安装使用。
apt-get install vnc4server
```
[root@ubuntu0006:/home] #which vncserver
/usr/bin/vncserver
[root@ubuntu0006:/home] #which vnc4server
/usr/bin/vnc4server
[root@ubuntu0006:/home] #apt-file search /usr/bin/vncserver
[root@ubuntu0006:/home] #apt-file search /usr/bin/vnc4server
vnc4server: /usr/bin/vnc4server
[root@ubuntu0006:/home] #dpkg -l | grep vnc
ii  vnc4server                            4.1.1+xorg4.3.0-37.3ubuntu2                     amd64        Virtual network computing server software
```

跟我在银河麒麟上面的结果不同：
```
[root@ubuntu0006:/home] #vncserver

You will require a password to access your desktops.

Password:
Password must be at least 6 characters - try again
Password:
Verify:
Password too long - only the first 8 characters will be used

New 'ubuntu0006:1 (root)' desktop is ubuntu0006:1

Creating default startup script /root/.vnc/xstartup
Starting applications specified in /root/.vnc/xstartup
Log file is /root/.vnc/ubuntu0006:1.log
```
需要重启电脑，后面有机会再研究研究。不过经过上面的安装后能接入了。
指定端口号5901。
https://blog.csdn.net/sinat_24424445/article/details/106757568

## 5、Radmin 
Radmin (Remote Administrator)是一款屡获殊荣的远程控制软件，它将远程控制、外包服务组件、以及网络监控结合到一个系统里，提供最快速、强健而安全的工具包。

## 6、网络人和pcanywhere
http://netman123.cn/cw/lp_11.html