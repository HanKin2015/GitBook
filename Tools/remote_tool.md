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

## 3、todesk
https://www.todesk.com/
缺点：任务管理器中进程页面错误是真的高
注意：精简版仅支持被控，免安装运行（该版本仅支持主控登录账号为VIP时连接使用）

## 4、VNC
下载地址：https://www.realvnc.com/en/connect/download/viewer/?lai_vid=xAE6MqeLyHGBE&lai_sr=15-19&lai_sl=l

VNC(Virtual Network Console)是虚拟网络控制台的缩写。它 是一款优秀的远程控制工具软件，由著名的 AT&T 的欧洲研究实验室开发的。VNC 是在基于 UNIX 和 Linux 操作系统的免费的开源软件，远程控制能力强大，高效实用，其性能可以和 Windows 和 MAC 中的任何远程控制软件媲美。 在 Linux 中，VNC 包括以下四个命令：vncserver，vncviewer，vncpasswd，和 vncconnect。大多数情况下用户只需要其中的两个命令：vncserver 和 vncviewer。

是一种C/S架构的协议，所以需要客户端和服务端同时执行，在服务端监听5800,5801，5901等多个可能的端口，而客户端只需要想sever端发起连接请求，并输入账号密码（不是linux系统内用户的账号密码，而是VNC自己的密码）即可访问了，但是VNC在网上传输的时候是没有加密的，所以我们的账号密码在网上传输的时候是很容易被“有心之人”捕获到的，这时候我们可以结合sshd来实现加密传送，另外VNC传输的是桌面应用，大家都知道，只要是传输需要绘图的东西计算量都是很大的（尤其是用SSHD加密之后），所以VNC会相当的占用带宽和系统资源，那么我们为什么还要使用它呢?因为有时候我们配置一些软件（比如oracle等）必须使用图形界面同时必须远程连接的时候我们就不得不用VNC了。

### 4-1、RealVNC接入服务端分辨率只有1024x768
直接修改分辨率会报错Cannot currently show the desktop

最终解决办法：通过VNC客户端设置：
- 连接上VNC服务器。
- 打开控制面板，选择调整屏幕分辨率。
- 点击高级设置，列出所有模式。
- 选择合适的分辨率，点击确定并应用。
设置成功后，后面就可以直接修改分辨率生效了。

### 4-2、VNC多个版本之间的区别
VNC（Virtual Network Computing）是一种远程控制软件，允许用户通过网络访问和控制另一台计算机。VNC有多个版本和变种，每个版本都有其独特的功能和特性。以下是一些主要的VNC版本及其区别：

1. RealVNC
RealVNC 是最早的VNC实现之一，由VNC的原始开发者创建。它提供了多种版本，包括免费版和商业版。

免费版：基本的远程控制功能，适用于个人和非商业用途。
专业版：增加了加密、文件传输、聊天和打印等功能。
企业版：提供更高级的安全性、部署和管理工具，适用于企业环境。

2. TightVNC
TightVNC 是一个开源的VNC变种，专注于改进性能和带宽效率。

压缩算法：使用更高效的压缩算法，减少带宽使用。
跨平台：支持Windows和Unix系统。
文件传输：内置文件传输功能。

3. UltraVNC
UltraVNC 是另一个流行的VNC变种，提供了许多增强功能。

文件传输：支持文件传输功能。
加密插件：支持多种加密插件，增强安全性。
聊天功能：内置聊天功能，方便用户沟通。
视频驱动：提供视频驱动，提高屏幕刷新率和性能。

4. TigerVNC
TigerVNC 是一个高性能的VNC实现，专注于提供快速和响应迅速的远程控制体验。

高性能：优化了性能，适用于高分辨率和高带宽环境。
跨平台：支持Windows、Linux和macOS。
安全性：内置TLS加密，增强安全性。

5. x11vnc
x11vnc 是一个专门用于Unix和Linux系统的VNC服务器，允许用户通过VNC访问X11桌面。

X11支持：专为X11系统设计，适用于Linux和Unix环境。
无头模式：支持无头模式，适用于没有物理显示器的服务器。

6. VNC Connect
VNC Connect 是RealVNC的最新产品，结合了云连接和直接连接功能。

云连接：通过RealVNC的云服务进行连接，简化防火墙和路由器配置。
直接连接：支持传统的直接IP连接。
多平台支持：支持Windows、Linux、macOS、iOS和Android。
高级功能：提供加密、文件传输、聊天和打印等高级功能。

总结
不同版本的VNC在功能、性能和安全性上有所不同，适用于不同的使用场景。以下是一个简要的对比：

版本	主要特点	适用场景
RealVNC	多种版本（免费、专业、企业），适用于不同需求	个人和企业用户
TightVNC	高效压缩，跨平台，文件传输	带宽有限的环境
UltraVNC	文件传输、加密插件、聊天功能	需要额外功能的用户
TigerVNC	高性能，跨平台，内置TLS加密	高分辨率和高带宽环境
x11vnc	专为X11系统设计，支持无头模式	Linux和Unix环境
VNC Connect	云连接和直接连接，多平台支持，丰富的高级功能	需要灵活连接选项的用户

### 4-3、为什么VNC Viewer记住密码后每次还需要输入密码
下面是官网提供的解决方法:
In VNC Viewer > Preferences > Privacy please tick 'Protect VNC Viewer with a master password', set a password and then click Apply, OK.
Once you have done this, re-open your Preferences and untick 'Protect VNC Viewer with a master password' and retry your connection.

翻译过来就是：
在 VNC 查看器 > 首选项 > 隐私中，请勾选“使用主密码保护 VNC 查看器”，设置密码，然后单击应用，确定。
完成此操作后，重新打开首选项并取消选中“使用主密码保护 VNC 查看器”并重试连接。

注意把时间设置成尽可能的长。

### 4-4、以后台方式启动RealVNC
直接双击exe文件会弹出一个cmd窗口，关闭后RealVNC就退出了，看左下角显示的是User Mode。通过命令才能切换成Server Mode。

运行以下命令离线注册。
"C:\Program Files\RealVNC\VNC Server\vnclicensewiz.exe"。

以Service模式启动（后台服务的方式）
"C:\Program Files\RealVNC\VNC Server\vncserver.exe" -service -start

改变VNC鉴权方式：
运行 regedit 命令打开注册表，导航到 Computer\HKEY_LOCAL_MACHINE\SOFTWARE\RealVNC\vncserver 下 ，新建 Authentication为 VncAuth 的键值对。

修改VNC密码：
"C:\Program Files\RealVNC\VNC Server\vncpasswd.exe" -service

重载配置：
"C:\Program Files\RealVNC\VNC Server\vncserver.exe" -service -reload

### 4-5、mstsc与VNC冲突
如果之前使用mstsc连接未断开，这时候使用VNC连接，虽然连接成功，但是是黑屏状态。这时候只能把VNC完全关闭后再连接才能解决问题。

### 4-6、银河麒麟系统中安装x11vnc服务
https://faq.uniontech.com/desktop/app/45ee

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
Requires=display-manager.service
#After=display-manager.service

[Service]
Type=simple
ExecStart=/usr/bin/x11vnc -auth guess -forever -loop -noxdamage -repeat -rfbauth /etc/x11vnc.pwd -rfbport 5900 -shared
ExecStop=/usr/bin/killall x11vnc

[Install]
WantedBy=multi-user.target
```
编辑完成后，保存退出，修改文件权限
sudo chmod 755 /lib/systemd/system/x11vnc.service

修改用户和组
sudo chown root:root /lib/systemd/system/x11vnc.service

步骤5 ：配置启动服务
sudo systemctl daemon-reload
sudo systemctl enable x11vnc.service
sudo systemctl start x11vnc.service

步骤6 ：重启生效
sudo reboot

### 4-7、Windows系统中安装客户端
步骤1 ： 下载并安装VNC Viewer
下载地址：https://www.realvnc.com/en/connect/download/viewer/

步骤2 ： 连接银河麒麟系统
运行VNC Viewer
在地址栏中输入银河麒麟系统的IP地址，回车连接。
输入上面步骤3中设置的密码，即可成功连接。

### 4-8、银河麒麟自身含有vncserver命令
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

## 7、anydesk
https://anydesk.com.cn/zhs

## 8、anyviewer
https://www.anyviewer.cn/

## 9、向日葵
https://sunlogin.oray.com/




