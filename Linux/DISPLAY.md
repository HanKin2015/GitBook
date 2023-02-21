# DISPLAY变量

## 1、查看DISPLAY默认值
在Linux/Unix类操作系统上, DISPLAY用来设置将图形显示到何处. 直接登陆图形界面或者登陆命令行界面后使用startx启动图形, DISPLAY环境变量将自动设置为:0:0, 此时可以打开终端, 输出图形程序的名称(比如xclock)来启动程序, 图形将显示在本地窗口上, 在终端上输入printenv查看当前环境变量, 输出结果中有如下内容:

DISPLAY=:0.0

使用xdpyinfo可以查看到当前显示的更详细的信息.

DISPLAY 环境变量格式如下hostname: displaynumber.screennumber,我们需要知道，在某些机器上，可能有多个显示设备共享使用同一套输入设备，例如在一台PC上连接 两台CRT显示器，但是它们只共享使用一个键盘和一个鼠标。这一组显示设备就拥有一个共同的displaynumber，而这组显示设备中的每个单独的设 备则拥有自己单独的 screennumber。displaynumber和screennumber都是从零开始的数字。这样，对于我们普通用户来说， displaynumber、screennumber就都是0。 hostname指Xserver所在的主机主机名或者ip地址, 图形将显示在这一机器上, 可以是启动了图形界面的Linux/Unix机器, 也可以是安装了Exceed, X-Deep/32等Windows平台运行的Xserver的Windows机器. 如果Host为空, 则表示Xserver运行于本机, 并且图形程序(Xclient)使用unix socket方式连接到Xserver, 而不是TCP方式. 使用TCP方式连接时, displaynumber为连接的端口减去6000的值, 如果displaynumber为0, 则表示连接到6000端口; 使用unix socket方式连接时则表示连接的unix socket的路径, 如果displaynumber为0, 则表示连接到/tmp/.X11-unix/X0 . screennumber则几乎总是0.

使用ssh连接ubuntu默认是不会有DISPLAY变量，但是在ubuntu界面printenv是有的，这样可以确认该值是多少。

一般来说不是0就是1.

echo $DISPLAY

## 2、未安装qxl驱动以及xrandr命令使用
```
cw@Ubuntu18:~$ xrandr
Can't open display
cw@Ubuntu18:~$ xrandr --display :0
No protocol specified
Can't open display :0
cw@Ubuntu18:~$ xrandr --display :1
xrandr: Failed to get size of gamma for output default
Screen 0: minimum 640 x 480, current 640 x 480, maximum 640 x 480
default connected primary 640x480+0+0 0mm x 0mm
   640x480       73.00*
cw@Ubuntu18:~$ echo $DISPLAY
```

通过上面发现该ubuntu没有使用qxl驱动（需要在分辨率前面显示qxl-0字段），使用X -version查看版本。
文件夹/usr/lib/xorg/modules/drivers/缺乏驱动文件。

正常情况：/usr/lib/xorg/modules/drivers/qxl_drv.so

从其他地方拷贝一个相近版本的qxl_drv_1_20.4.so到这个目录下，安装qxl驱动后，killall Xorg即可。

注意Xorg第一个是大写字母，X -version和Xorg -version都能查看版本信息。

```
cw@Ubuntu18:~$ xrandr
Screen 0: minimum 320 x 200, current 1024 x 768, maximum 8192 x 8192
qxl-0 connected primary 1024x768+0+0 0mm x 0mm
   1024x768      60.00*
qxl-1 disconnected
qxl-2 disconnected
qxl-3 disconnected
```

## 3、为什么root用户不能执行xrandr，普通用户可以
ssh环境，自身环境没有这个限制。
```
cw@Ubuntu18:~$ xrandr
Can't open display
cw@Ubuntu18:~$ export DISPLAY=:1
cw@Ubuntu18:~$ xrandr
xrandr: Failed to get size of gamma for output default
Screen 0: minimum 640 x 480, current 640 x 480, maximum 640 x 480
default connected primary 640x480+0+0 0mm x 0mm
   640x480       73.00*
cw@Ubuntu18:~$ sudo -i
root@Ubuntu18:~# xrandr
No protocol specified
Can't open display :1
root@Ubuntu18:~# xrandr --display :1
No protocol specified
Can't open display :1
root@Ubuntu18:~# xrandr --display :0
No protocol specified
Can't open display :0
cw@Ubuntu18:~$ sudo xrandr
No protocol specified
Can't open display :1
cw@Ubuntu18:~$ sudo xrandr --display :1
No protocol specified
Can't open display :1
```

## 4、修改默认值
export DISPLAY=:0

使用xdpyinfo可以查看到当前显示的更详细的信息.


## 5、简介
DISPLAY环境变量格式如下
       host:NumA.NumB
host指Xserver所在的主机主机名或者ip地址, 图形将显示在这一机器上, 可以是启动了图形界面的Linux/Unix机器, 也可以是安装了Exceed, X-Deep/32等Windows平台运行的Xserver的Windows机器. 如果Host为空, 则表示Xserver运行于本机, 并且图形程序(Xclient)使用unix socket方式连接到Xserver, 而不是TCP方式. 使用TCP方式连接时, NumA为连接的端口减去6000的值, 如果NumA为0, 则表示连接到6000端口; 使用unix socket方式连接时则表示连接的unix socket的路径, 如果为0, 则表示连接到/tmp/.X11-unix/X0 . NumB则几乎总是0.

http://blog.sina.com.cn/s/blog_75acbe0b010199p7.html

在Linux/Unix类操作系统上的GUI应用程序使用X Window系统（X Window System），它旨在允许多个用户使用窗口化的应用程序通过网络访问计算机。 DISPLAY环境变量用来设置将图形显示到何处。直接登录图形界面或者登录命令行界面后使用startx启动图形，DISPLAY环境变量自动设置为:0:0，此时可以打开终端，输入图形程序的名称(比如xclock)来启动程序, 图形将显示在本地窗口上。
```
cw@ubuntu180001:~$ xhost +
access control disabled, clients can connect from any host
```

## 6、示例
Windows系统使用mobaxterm的ssh连接后，查看DISPLAY值为localhost:10.0，然后运行xclock命令时钟窗口会显示在当前Windows界面上。
```
cw@ubuntu180001:~$ echo $DISPLAY
localhost:10.0
cw@ubuntu180001:~$ export DISPLAY=:0.0
cw@ubuntu180001:~$ echo $DISPLAY
:0.0
cw@ubuntu180001:~$ xclock
No protocol specified
Error: Can't open display: :0.0
cw@ubuntu180001:~$ export DISPLAY=:1.0
cw@ubuntu180001:~$ xclock
Warning: Missing charsets in String to FontSet conversion
```

一定要注意不能使用root权限，否则无法显示在Windows系统上面：
```
root@ubuntu180001:~# export DISPLAY=localhost:10.0
root@ubuntu180001:~# xclock
X11 connection rejected because of wrong authentication.
Error: Can't open display: localhost:10.0
root@ubuntu180001:~# exit
注销
cw@ubuntu180001:~$ xclock
Warning: Missing charsets in String to FontSet conversion

cw@ubuntu180001:~$ export DISPLAY=localhost:10.0
cw@ubuntu180001:~$ xclock
Warning: Missing charsets in String to FontSet conversion
```

将时钟显示在原主机上面，执行下面命令可能出错：
```
cw@ubuntu180001:~$ export DISPLAY=:1
cw@ubuntu180001:~$ xclock
Warning: Missing charsets in String to FontSet conversion

Xlib: connection to ":0.0" refused by server
Xlib: No protocol specified

Error: Can't open display: :0.0
```
这是因为Xserver默认情况下不允许别的用户的图形程序的图形显示在当前屏幕上. 如果需要别的用户的图形显示在当前屏幕上, 则应以当前登陆的用户, 也就是切换身份前的用户执行如下命令

xhost +

这个命令将允许别的用户启动的图形程序将图形显示在当前屏幕上.

网上还会有则从客户端ssh到服务器端后会自动设置DISPLAY环境变量, 允许在服务器端执行的图形程序将图形显示在客户端上. 在服务器上查看环境变量显示如下(这个结果不同的时候并不相同)。

## 7、直接使用root登录的，看这是可以root显示的
```
[root@ubuntu0006:~] #whoami
root
[root@ubuntu0006:~] #xrandr
Screen 0: minimum 0 x 0, current 2048 x 1152, maximum 32768 x 32768
default connected primary 2048x1152+0+0 541mm x 304mm
   2048x1152      0.00*
[root@ubuntu0006:~] #echo $DISPLAY
localhost:10.0
[root@ubuntu0006:~] #export DISPLAY=:0
[root@ubuntu0006:~] #xrandr
Screen 0: minimum 320 x 200, current 2560 x 1440, maximum 8192 x 8192
qxl-0 connected 2560x1440+0+0 0mm x 0mm
   1280x720      60.00
   2560x1440-0    0.06*
   1920x1200-0    0.06
   1920x1080-0    0.06
   1680x1050-0    0.06
   1600x900-0     0.06
   1280x1022-0    0.06
   1440x900-0     0.06
   1152x864-0     0.06
   1024x766-0     0.06
qxl-1 disconnected
qxl-2 disconnected
qxl-3 disconnected
```

## 8、在mobaxterm中执行firefox未拉起浏览器
查看DISPLAY值为11，发现0和1都没有，发现10有。但是修改过来修改过去后又正常了。





