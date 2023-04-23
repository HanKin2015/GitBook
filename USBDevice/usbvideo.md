# 高拍仪

https://github.com/libuvc/libuvc

## 1、良田高拍仪
官网：https://www.eloam.cn/
官方软件：https://www.eloam.cn/download/list/1

## 2、USB video class
官网：https://www.usb.org/documents?search=&type%5B0%5D=55&items_per_page=50
linux源代码：https://elixir.bootlin.com/linux/v5.14-rc2/source/drivers/usb/gadget/function/uvc_video.c#L134

找了一圈，基本上都是英文，好不容易找到中文文档，居然需要积分下载，差点拼死去弄积分了。
积分下载地址：https://download.csdn.net/download/weixin_42314225/10775806
CSDN积分下载攻略：https://mp.weixin.qq.com/s/jfJemxybmeaHSQiXxRpMOA

后来找到了USB中文网，哎，皇天不负有心人。

早应该想想是不是有中国人早就翻译好了。
还有应该找找qq群。

## 3、linux使用摄像头
cheese是Ubuntu自带摄像软件，中文名称茄子。
```
sudo apt-get install cheese
cheese
# 或
cheese /dev/video0

#不支持ssh远程显示
```

### 3-1、使用应用程序camorama
```
sudo apt-get install camorama
camorama
#如果使用Xshell进行ssh远程访问，会提醒安装Xmanager软件显示视频流
```
Xmanager是一个运行于MS Windows平台上的高性能的X window服务器。可以在本地PC上同时运行Unix/Linux和Windows图形应用程序。

Xmanager可以将PC变成X Windows工作站，它可以无缝拼接到UNIX 应用程序中。在UNIX/Linux和Windows网络环境中，Xmanager 是最好的连通解决方案。

### 3-2、其他
xawtv可以只使用apt install xawtv安装
webcam使用apt安装后打开摄像头一闪一闪的，无法正常使用
wxcam不错，推荐使用，详情见v4l2.md文件
看到一个kamoso的安装包，安装后各种qt错误，无果
（Qt: Session management error: None of the authentication protocols specified are supported这个问题的根源是当前是以root身份进行登录的，而运行程序需要更换一种角色。退出root 运行应用程序就OK了)

### 3-3、luvcview（目前发现的能切换分辨率的摄像头软件）
好像非常不错，安装包地址：https://launchpad.net/ubuntu/precise/amd64/luvcview/1:0.2.6-5

```
参考：https://www.freesion.com/article/664167059/
apt install make
apt install libv4l-dev(make: sdl-config: Command not found)
ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h(fatal error: linux/videodev.h: 没有那个文件或目录)

搞定：
./luvcview -d /dev/video0 -f yuv -s 640x480
./luvcview -d /dev/video0 -f mjpg -s 640x480
```


直接make，报错SDL/SDL.h，安装libsdl1.2-dev，安装libsdl2-dev不行
uvcvideo.h:5:10: fatal error: linux/videodev.h: No such file or directory
#include <linux/videodev.h>

解决办法（参考https://blog.csdn.net/shunrenwang/article/details/80549182）

sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h
luvcview -d /dev/video1 -f yuv -s 640x480
luvcview -d /dev/video1 -f mjpg -s 640x480
luvcview -d /dev/video0 -L

### 3-4、yavtv
基于 Linux V4L2 子系统进行图像采集，需要遵循一定的流程规范，操作起来也不算简单。如果只是作为测试、调试使用，yavta 工具就很好使了。它支持很多常规的操作选项，可以按需配置使用。

其源代码也是挺简洁紧凑的，以后再找时间好好阅读学习下。这里主要是讲解这个工具基于创龙 TL570x-EVM 的编译与使用。

工具项目地址：http://git.ideasonboard.org/yavta.git

下载源码：git clone git://git.ideasonboard.org/yavta.git然后make即可。

./yavta /dev/video1 -c1 -n4 -s1920x1080 -fSRGGB10 -Fvideo.raw
./yavta -f help可以查看所有格式
raw可以修改为jpeg，是直接查看的。

### 3-5、VLC
apt install vlc
VLC多媒体播放器是一款多媒体播放器。VLC播放器支持数十种音频、视频格式的解码，让用户不用再辛苦转码才能观看罕见格式。并且VLC播放器使用简单的命令行功能。

### 3-6、教程
哎，我发现linux找不到一款可以切换分辨率和格式的软件。
todo，有时间可以自己写一个linux版本的摄像头软件，可以切换分辨率和格式。
https://www.jianshu.com/p/20d4b81f8d14

## 4、内核中高拍仪位置
https://hceng.cn/

```
[root@ubuntu0006:/media/hankin/vdb/kernel/extract/usr/src/linux-source-4.2/drivers/media] #pwd
/media/hankin/vdb/kernel/extract/usr/src/linux-source-4.2/drivers/media
[root@ubuntu0006:/media/hankin/vdb/kernel/extract/usr/src/linux-source-4.2/drivers/media] #find ./* -name *o.ko
./i2c/tvaudio.ko
./mmc/siano/smssdio.ko
./radio/radio-raremono.ko
./radio/radio-maxiradio.ko
./rc/keymaps/rc-tivo.ko
./rc/keymaps/rc-reddo.ko
./rc/keymaps/rc-flyvideo.ko
./rc/keymaps/rc-dntv-live-dvbt-pro.ko
./usb/gspca/gspca_topro.ko
./usb/dvb-usb/dvb-usb-friio.ko
./usb/uvc/uvcvideo.ko
```

在linux中查找：find / -name uvcvideo.ko
一般来说在内核位置：
/lib/modules/5.4.0-104-generic/kernel/drivers/media/usb/uvc/uvcvideo.ko
/lib/modules/5.4.0-100-generic/kernel/drivers/media/usb/uvc/uvcvideo.ko

加载：
rmmod uvcvideo
insmod uvcvideo.ko

## 5、编译内核

### 5-1、内核打包
```
/usr/src/linux-source-4.2.tar.xz //内核源码
假如debian8系统内核路径：D:\Demo\debians\kernel\linux-source-4.2_4.2.5-1~bpo8+1_all.deb

- 将文件拷贝到编译环境
- 解压缩：dpkg -X linux-source-4.2_4.2.5-1~bpo8+1_all.deb extract
- 进入文件夹：cd extract/usr/src/
- 再次解压缩：tar xJf linux-source-4.2.tar.xz
- 拷贝文件出来：cp ./linux-config-4.2/config.amd64_none_amd64.xz ./
- 解压：xz -d config.amd64_none_amd64.xz  得到config.amd64_none_amd64

$ cd linux-source-4.2
cp ../config.amd64_none_amd64 ./.config

非常重要的一步，因为解压的内核文件是开源，没有任何我们的修改，因此需要先将修改的文件拷贝进去：
D:\Demo\debians\kernel\src\linux-source-4.2

修改内核代码，如：
linux-source-4.2/drivers/usb/host/ehci-sched.c

当前目录：linux-source-4.2
不要这一步$ make menuconfig
$ scripts/config --disable DEBUG_INFO
$ make clean
修改最后4个数字：$ fakeroot make deb-pkg LOCALVERSION=-amd64 KDEB_PKGVERSION=4.2.5-1~bpo8+1+hj2023 // 基础版本与linux-source-4.2的保持一致，并添加自己的版本
```

### 5-2、单独编译
https://blog.csdn.net/bingyu9875/article/details/95972059

实测通过：
```
make CONFIG_BRIDGE_IGMP_SNOOPING=m -C  /media/hankin/vdb/debians-kernel/debian9/extract/usr/src/linux-source-4.9 M=/media/hankin/vdb/debians-kernel/debian9/extract/usr/src/linux-source-4.9/drivers/media/usb/uvc  modules

或者

cd /media/hankin/vdb/debians-kernel/debian9/extract/usr/src/linux-source-4.9/drivers/media/usb/uvc
make CONFIG_BRIDGE_IGMP_SNOOPING=m -C  /media/hankin/vdb/debians-kernel/debian9/extract/usr/src/linux-source-4.9 M=`pwd` modules


make CONFIG_BRIDGE_IGMP_SNOOPING=m -C  /media/hankin/vdb/debians-kernel/debian8/extract/usr/src/linux-4.2 M=`pwd` modules
```

## 6、FPS
FPS是图像领域中的定义，是指画面每秒传输帧数，通俗来讲就是指动画或视频的画面数。FPS是测量用于保存、显示动态视频的信息数量。每秒钟帧数越多，所显示的动作就会越流畅。通常，要避免动作不流畅的最低是30。某些计算机视频格式，每秒只能提供15帧。
FPS也可以理解为我们常说的“刷新率（单位为Hz）”，例如我们常在游戏里说的“FPS值”。我们在装机选购显卡和显示器的时候，都会注意到“刷新率”。一般我们设置缺省刷新率都在75Hz（即75帧/秒）以上。例如：75Hz的刷新率刷也就是指屏幕一秒内只扫描75次，即75帧/秒。而当刷新率太低时我们肉眼都能感觉到屏幕的闪烁，不连贯，对图像显示效果和视觉感观产生不好的影响。
电影以每秒24张画面的速度播放，也就是一秒钟内在屏幕上连续投射出24张静止画面。有关动画播放速度的单位是fps，其中的f就是英文单词Frame（画面、帧），p就是Per（每），s就是Second（秒）。用中文表达就是多少帧每秒，或每秒多少帧。电影是24fps，通常简称为24帧。

在协商分辨率时，提交（commit）了0x0a2c2a的帧间隔，转化为十进制为666666，计算成fps为15帧。那就意味着虚拟机想要设备以15帧每秒的速度进行图像传输。

工业级相机，机器视觉：https://blog.csdn.net/cugyzy/article/details/120974745
https://www.irayple.com/cn/productDetail/122

## 7、设备管理器显示摄像头驱动异常
报错如下：
Windows 无法初始化这个硬件的设备驱动程序。 (代码 37)
对象名已存在。

尝试重启电脑试试，结果重启之后真的解决了。

原因未知：https://www.jb51.net/os/windows/844324.html
可能是由于驱动进行了更新，需要重启生效导致。




