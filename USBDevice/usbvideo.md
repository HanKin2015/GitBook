# 高拍仪

https://github.com/libuvc/libuvc

## 1、良田高拍仪
官网：https://www.eloam.cn/
官方软件：https://www.eloam.cn/download/list/1
驱动下载：https://www.eloam.cn/download/list/10

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

### 7-1、问题现象1
报错如下：
Windows 无法初始化这个硬件的设备驱动程序。 (代码 37)
对象名已存在。

尝试重启电脑试试，结果重启之后真的解决了。

原因未知：https://www.jb51.net/os/windows/844324.html
可能是由于驱动进行了更新，需要重启生效导致。

### 7-2、问题现象2
win7x64报错如下：
Windows 无法初始化这个硬件的设备驱动程序。 (代码 37)

排查：
该摄像头加载了usb2.sys自定义驱动，但是通过sc命令查询发现usb1.sys驱动正在运行，而usb2.sys驱动则是停止状态。
并且该驱动无法通过sc stop命令关闭usb1.sys，因此usb2.sys也无法通过sc start命令启动。

原因：
usb1.sys驱动服务是开机启动，需要改为按需启动即可。

解决：
修改注册表计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\usb1中Start值为3即可。
另外发现两个驱动都是写的3，但还是有问题，是因为在过滤驱动LowerFilters中都把两个驱动信息填写上去了，两者都按需启动，从而导致usb1先启动，而usb2启动失败。
还需要修改计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36fc9e60-c465-11cf-8056-444553540000}注册表中LowerFilters删除usb1信息。

## 8、YUV和YUY2区别
一开始还真以为是同一个东西，详细了解后才知道不是同一个东西。

YUV和YUY2都是数字视频编码格式，用于将视频信号数字化并压缩以便于存储和传输。它们的主要区别在于它们的色度子采样方式和像素排列方式。

YUV是一种颜色空间，其中Y表示亮度（Luma），U和V表示色度（Chroma）。在YUV格式中，亮度信号（Y）被完全采样，而色度信号（U和V）则被下采样。通常，U和V的采样率为Y的1/4，即4:2:0。这意味着每4个像素中只有一个像素的U和V值被保留，其余的像素则共享相邻像素的U和V值。

YUY2是一种像素排列方式，其中每个像素由两个Y值和一个共享的U和V值组成。这种排列方式被称为“4:2:2”采样，因为每两个像素共享一个U和V值，而每个像素都有自己的亮度值。这种排列方式比YUV的4:2:0采样方式提供更高的色度分辨率，但需要更多的存储空间。

总的来说，YUV和YUY2都是数字视频编码格式，它们的主要区别在于色度子采样方式和像素排列方式。YUV采用4:2:0采样方式，而YUY2采用4:2:2采样方式。

https://baike.baidu.com/item/YUV/3430784?fr=aladdin

https://blog.csdn.net/qq_42820594/article/details/126353005

## 9、vivid驱动
The Virtual Video Test Driver (vivid)

https://www.kernel.org/doc/html/v4.12/media/v4l-drivers/vivid.html

## 10、网络摄像机(IPC)介绍
https://mp.weixin.qq.com/s/RHUSnXLnwc6o2jU9X2gkdw

网络摄像机是一种结合传统摄像机与网络技术所产生的新一代摄像机，它可以将视频影像通过网络传至地球另一端，且远端的浏览者不需用任何专业软件，只要标准的网络浏览器（如“Microsoft IE或Netscape）即可监视其视频影像。网络摄像机一般由镜头、图像传感器、声音传感器、信号处理器、A/D转换器、编码芯片、主控芯片、网络及控制接口等部分组成。

IPC网络摄像机要联网设置IP地址、授权帐户和视频参数等等，按照菜单在浏览器中设置网络摄像机。

## 11、RGB与YUV及YCbCr介绍

### 11-1、RGB
RGB（红绿蓝）是依据人眼识别的颜色定义出的空间，可表示大部分颜色。但在科学研究一般不采用RGB颜色空间，因为它的细节难以进行数字化的调整。它将色调，亮度，饱和度三个量放在一起表示，很难分开。它是最通用的面向硬件的彩色模型。该模型用于彩色监视器和一大类彩色视频摄像。

### 11-2、YUV
在 YUV 空间中，每一个颜色有一个亮度信号 Y，和两个色度信号 U 和 V。亮度信号是强度的感觉，它和色度信号断开，这样的话强度就可以在不影响颜色的情况下改变。
YUV 使用RGB的信息，但它从全彩色图像中产生一个黑白图像，然后提取出三个主要的颜色变成两个额外的信号来
描述颜色。把这三个信号组合回来就可以产生一个全彩色图像。
Y 通道描述 Luma 信号，它与亮度信号有一点点不同，值的范围介于亮和暗之间。 Luma 是黑白电视可以看到的信号。U (Cb) 和 V (Cr) 通道从红 (U) 和蓝 (V) 中提取亮度值来减少颜色信息量。这些值可以从新组合来决定红，绿和蓝的混合信号。
YUV和RGB的转换:
```
Y = 0.299 R + 0.587 G + 0.114 B
U = ‐0.1687 R ‐ 0.3313 G + 0.5 B + 128
V = 0.5 R ‐ 0.4187 G ‐ 0.0813 B + 128

R = Y + 1.402 (V‐128)
G= Y ‐ 0.34414 (U‐128) ‐ 0.71414 (V‐128)
B= Y + 1.772 (U‐128)
```

### 11-3、YCbCr
YCbCr 是在世界数字组织视频标准研制过程中作为ITU ‐ R BT1601 建议的一部分, 其实是YUV经过缩放和偏移的翻版。其中Y与YUV 中的Y含义一致, Cb , Cr 同样都指色彩, 只是在表示方法上不同而已。在YUV 家族中,YCbCr 是在计算机系统中应用最多的成员, 其应用领域很广泛,JPEG、MPEG均采用此格式。一般人们所讲的YUV大多是指YCbCr。
YCbCr与RGB的相互转换
```
Y=0.299R+0.587G+0.114B
Cb=0.564(B‐Y)
Cr=0.713(R‐Y)

R=Y+1.402Cr
G=Y‐0.344Cb‐0.714Cr
B=Y+1.772Cb
```
YUV（YCbCr）采样格式：
主要的采样格式有YCbCr 4:2:0、YCbCr 4:2:2、YCbCr 4:1:1和 YCbCr 4:4:4。其中YCbCr 4:1:1 比较常用，
其含义为：每个点保存一个 8bit 的亮度值(也就是Y值), 每 2 x 2 个点保存一个 Cr和Cb值, 图像在肉眼中的感
觉不会起太大的变化。所以, 原来用 RGB(R,G,B 都是 8bit unsigned) 模型, 每个点需要 8x3=24 bits， 而
现在仅需要 8+(8/4)+(8/4)=12bits, 平均每个点占12bits。这样就把图像的数据压缩了一半。
上边仅给出了理论上的示例，在实际数据存储中是有可能是不同的，下面给出几种具体的存储形式：
（1） YUV 4:4:4
YUV三个信道的抽样率相同，因此在生成的图像里，每个象素的三个分量信息完整（每个分量通常8比特），经
过8比特量化之后，未经压缩的每个像素占用3个字节。
下面的四个像素为: [Y0 U0 V0] [Y1 U1 V1] [Y2 U2 V2] [Y3 U3 V3]
存放的码流为: Y0 U0 V0 Y1 U1 V1 Y2 U2 V2 Y3 U3 V3
（2） YUV 4:2:2
每个色差信道的抽样率是亮度信道的一半，所以水平方向的色度抽样率只是4:4:4的一半。对非压缩的8比特量
化的图像来说，每个由两个水平方向相邻的像素组成的宏像素需要占用4字节内存(例如下面映射出的前两个像素点
只需要Y0、Y1、U0、V1四个字节)。
下面的四个像素为: [Y0 U0 V0] [Y1 U1 V1] [Y2 U2 V2] [Y3 U3 V3]
存放的码流为: Y0 U0 Y1 V1 Y2 U2 Y3 V3
映射出像素点为：[Y0 U0 V1] [Y1 U0 V1] [Y2 U2 V3] [Y3 U2 V3]
（3） YUV 4:1:1
4:1:1的色度抽样，是在水平方向上对色度进行4:1抽样。对于低端用户和消费类产品这仍然是可以接受的。对
非压缩的8比特量化的视频来说，每个由4个水平方向相邻的像素组成的宏像素需要占用6字节内存
下面的四个像素为: [Y0 U0 V0] [Y1 U1 V1] [Y2 U2 V2] [Y3 U3 V3]
存放的码流为: Y0 U0 Y1 Y2 V2 Y3
映射出像素点为：[Y0 U0 V2] [Y1 U0 V2] [Y2 U0 V2] [Y3 U0 V2]
（4）YUV4:2:0
4:2:0并不意味着只有Y,Cb而没有Cr分量。它指得是对每行扫描线来说，只有一种色度分量以2:1的抽样率存
储。相邻的扫描行存储不同的色度分量，也就是说，如果一行是4:2:0的话，下一行就是4:0:2，再下一行是
4:2:0...以此类推。对每个色度分量来说，水平方向和竖直方向的抽样率都是2:1，所以可以说色度的抽样率是
4:1。对非压缩的8比特量化的视频来说，每个由2x2个2行2列相邻的像素组成的宏像素需要占用6字节内存。
下面八个像素为：
```
[Y0 U0 V0] [Y1 U1 V1] [Y2 U2 V2] [Y3 U3 V3]
[Y5 U5 V5] [Y6 U6 V6] [Y7U7 V7] [Y8 U8 V8]
```
存放的码流为：
```
Y0 U0 Y1 Y2 U2 Y3
Y5 V5 Y6 Y7 V7 Y8
```
映射出的像素点为：
```
[Y0 U0 V5] [Y1 U0 V5] [Y2 U2 V7] [Y3 U2 V7]
[Y5 U0 V5] [Y6 U0 V5] [Y7U2 V7] [Y8 U2 V7]
```

## 12、部分定义
linux-5.13.7/include/uapi/linux/usb/video.h

## 13、工业级摄像头
加载的驱动是miscellaneous device，而不是uvcvideo。

杂项设备
https://blog.csdn.net/zhanghui962623727/article/details/117754604

## 14、uvc_streaming_control 
```
struct uvc_streaming_control { 
    __u16 bmHint; 
    __u8  bFormatIndex; //视频格式索引 
    __u8  bFrameIndex;  //视频帧索引 
    __u32 dwFrameInterval;  //视频帧间隔 
    __u16 wKeyFrameRate;    // 
    __u16 wPFrameRate; 
    __u16 wCompQuality; 
    __u16 wCompWindowSize; 
    __u16 wDelay;   //延时 
    __u32 dwMaxVideoFrameSize;  //最大视频帧大小 
    __u32 dwMaxPayloadTransferSize; 
    __u32 dwClockFrequency; //时钟频率 
    __u8  bmFramingInfo; 
    __u8  bPreferedVersion; 
    __u8  bMinVersion;  //版本 
    __u8  bMaxVersion;  //版本 
} __attribute__((__packed__));
```
看官方文档：https://www.usb.org/documents?search=Video&items_per_page=50

假设代码中有个变量data类型是struct uvc_streaming_control，但是代码中没有struct uvc_streaming_control结构体的声明定义，我们不需要去百度找此结构体的详细信息，可以直接通过gdb将此结构体打印出来：
```
(gdb) f 8
#8  0x00007eff6088e539 in UVCCommToVm::HandleCtrlCbk (this=0x6130003cf1c8, uvc_ctrl=0x604000332a90) at uvc_comm_usr.cpp:488
488     uvc_comm_usr.cpp: No such file or directory.
(gdb) info locals
__PRETTY_FUNCTION__ = "void UVCCommToVm::HandleCtrlCbk(UVCSrvCtrl*)"
rsp = 0x60300134a220
logstr = '\000' <repeats 1023 times>
__FUNCTION__ = "HandleCtrlCbk"
(gdb) print *(struct uvc_streaming_control *)0x60300134a220
$1 = {bmHint = 13, bFormatIndex = 0 '\000', bFrameIndex = 0 '\000', dwFrameInterval = 3200171710, wKeyFrameRate = 17424,
  wPFrameRate = 213, wCompQuality = 24640, wCompWindowSize = 0, wDelay = 48, dwMaxVideoFrameSize = 3200122880,
  dwMaxPayloadTransferSize = 48830, dwClockFrequency = 0, bmFramingInfo = 0 '\000', bPreferedVersion = 0 '\000',
  bMinVersion = 0 '\000', bMaxVersion = 0 '\000'}
(gdb)
```

## 15、笔记本摄像头帧率问题
ThinkPad-E14笔记本摄像头（04f2:b78e）加载了RsEyeContactCorrection_Assets.dll、RsDMFT64.dll、RsDMFT_Assets.dll三个文件后1280x720分辨率从10帧率提高到30帧率，很神奇。

该摄像头伴随着一个camera DFU device设备，在虚拟机内部驱动是异常的，未安装驱动，物理机上面看它加载了卡巴斯基驱动和winusb.sys驱动，但是虚拟机里面是存在winusb.sys驱动的。

该文件驱动：https://www.mypcrun.com/file-info-driver/rsdmft-cat-driver-file-download/

## 16、联想笔记本摄像头含有两种驱动
Thinkbook-5986:212a
SunplusIT驱动，另外有些笔记本只含有RsDMFT64.dll、RsDMFT_Assets.dll这两个文件，如果强制安装RsEyeContactCorrection_Assets.dll三个文件的驱动，物理机没有问题，但是虚拟机会有问题。

## 17、隐私相机
部分操作系统会把隐私-》摄像头-》允许应用访问你的相机给关了，从而打开摄像头是黑屏状态。

如Windows 10 神州网信政府版 V0-G、 Windows 10 神州网信政府版 V0-H、 Windows 10 神州网信政府版 V2020-L、 Windows 10 神州网信政府版 V2022-L等系统还会将该设置置灰，让用户无法手动配置。
工具：https://support.cmgos.com/cmgetools/cmge_mic_camera_tool
https://support.cmgos.com/updatedownload/cmgetools/cmge-net-3-5-framework#more-19591

通过组策略编辑器开启：
1.按下`Win + R`键打开运行对话框。
2.输入`gpedit.msc`并回车，以打开本地组策略编辑器。
3.在组策略管理器中，依次导航到`计算机配置` -> `管理模板` -> `Windows组件` -> `应用隐私`。
4.找到`允许Windows应用访问麦克风`和`允许Windows应用访问相机`的设置，双击它们并设置为`启用`，然后在下方选择“由用户控制”。
5.完成后，退出组策略编辑器并重启电脑使设置生效。

## 18、硬件设计 之摄像头分类（IR摄像头、mono摄像头、RGB摄像头、RGB-D摄像头、鱼眼摄像头）
https://blog.csdn.net/weixin_41808082/article/details/129383789

###  18-1、IR镜头
IR镜头即红外镜头，它采用了特殊的光学玻璃材料，并用最新的光学设计方法，消除了可见光和红外光的焦面偏移，因此从可见光到红外光区的光线都可以在同一个焦面成像，使图像都能清晰。此外，IR红外镜头还采用了特殊的多层镀膜技术，以增加对红外光线的透过率，所以用IR镜头的摄像机比用普通镜头的摄像机夜晚监控的距离远，效果好。

IR=infra red=红外线
红外摄像头工作原理是红外灯发出红外线照射物体，红外线漫反射，被监控摄像头接收，形成视频图像。

### 18-2、mono摄像头
黑白相机模组：提升暗光成像效果，具体原理是，由于黑白相机模组没有Bayer（拜尔滤色镜）滤光片，所以在暗光条件下，可以获得更多的进光量，进而保存了更多的图像细节。由于黑白相机的细节更丰富、信噪比更高等优势，以黑白图像作为基准和彩色图像进行融合后，图像的整体效果会有比较明显的提升（尤其是在暗光环境下）。

### 18-3、RGB摄像头
RGB色彩模式是工业界的一种颜色标准，是通过对红®、绿(G)、蓝(B)三个颜色通道的变化以及它们相互之间的叠加来得到各式各样的颜色的，RGB即是代表红、绿、蓝三个通道的颜色，这个标准几乎包括了人类视力所能感知的所有颜色，是目前运用最广的颜色系统之一。

### 18-4、RGB-D摄像头
RGBD = RGB + Depth Map，包含左红外相机+红外点阵投射器+右红外相机+RGB相机。主流的深度相机分为：飞行时间法（ToF），结构光法、双目立体视觉法。
在3D计算机图形中，Depth Map（深度图）是包含与视点的场景对象的表面的距离有关的信息的图像或图像通道。其中，Depth Map 类似于灰度图像，只是它的每个像素值是传感器距离物体的实际距离。通常RGB图像和Depth图像是配准的，因而像素点之间具有一对一的对应关系。通过近红外激光器，将具有一定结构特征的光线投射到被拍摄物体上，再由专门的红外摄像头进行采集。

### 18-5、鱼眼摄像头
鱼眼摄像机是可以独立实现大范围无死角监控的全景摄像机，是一种焦距极短并且视角接近或等于180°的镜头，为使镜头达到最大的摄影视角，这种摄影镜头的前镜片直径且呈抛物状向镜头前部凸出，与鱼的眼睛颇为相似，“鱼眼镜头”因此而得名。鱼眼镜头属于超广角镜头中的一种特殊镜头，它的视角力求达到或超出人眼所能看到的范围。因此，鱼眼镜头与人们眼中的真实世界的景象存在很大的差别，因为我们在实际生活中看见的景物是有规则的固定形态，而通过鱼眼镜头产生的画面效果则超出了这一范畴。
鱼眼镜头的原理：众所周知，焦距越短，视角越大，因光学原理产生的变形也就越强烈。

### 18-6、摄像头中的NIR（近红外）和COL（彩色）模式
- NIR（近红外）：NIR摄像头能够捕捉近红外光谱（通常在700nm到1000nm之间）的图像。这种光谱范围超出了人眼可见光的范围，因此NIR摄像头可以在低光或无光环境下工作，常用于夜视和某些工业应用。生成的图像通常是黑白或灰度的，因为近红外光谱不包含可见颜色信息。NIR图像可以揭示一些在可见光下不明显的细节。

- COL（彩色）：彩色摄像头捕捉的是可见光谱（大约400nm到700nm）内的图像，能够呈现出人眼可见的颜色。这种摄像头在正常光照条件下使用，适合日常监控和拍摄。

## 19、通过PDO查找设备失败
设备：HD Pro Webcam C920（046d:0892）

原因：设备更新驱动后，会从照相机栏跑到图像设备栏，并且图标更换（可能跟系统有关）。驱动程序提供商变成Logitech，并且日期也变成较新的。但是文件却少了一个WdmCompanionFilter.sys，其他三个文件都是微软的，很奇怪。回退驱动程序后正常，驱动程序提供商变成Microsoft。

根因：可能在于WdmCompanionFilter.sys文件，WDM Filter是一类驱动的总称，它把自己挂载到功能设备(FDO)之下或者之上，拦截所有的IRP，对这些IRP分析处理，从而达到过滤的目的。
它跟 NT式过滤驱动都是一样的目的，比如前面文章讲到的TDI Filter驱动就是个标准的NT式过滤驱动，
但是处理方式上稍微有些不同，主要区别在 WDM需要处理即插即用和电源上。

WDM支持即插即用，简单的说，一个设备可以随时插入电脑使用，也可以随时拔出来。
WDM要能达到这种效果，处理方式就与NT式驱动有些不同，

WDM不在 DriverEntry里创建设备，而是注册 DriverObject->DriverExtension->AddDevice 回调函数，然后在 AddDevice函数里创建设备。

## 20、摄像头免驱的，但是在win7系统上面显示为未知设备，错误是没有为该设备安装的驱动程序
查看驱动程序详细信息，没有异常的第三方软件驱动。
但是解决方案：卸载驱动后正常。




