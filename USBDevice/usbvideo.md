# 高拍仪

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

### 使用应用程序camorama
```
sudo apt-get install camorama
camorama
#如果使用Xshell进行ssh远程访问，会提醒安装Xmanager软件显示视频流
```
Xmanager是一个运行于MS Windows平台上的高性能的X window服务器。可以在本地PC上同时运行Unix/Linux和Windows图形应用程序。

Xmanager可以将PC变成X Windows工作站，它可以无缝拼接到UNIX 应用程序中。在UNIX/Linux和Windows网络环境中，Xmanager 是最好的连通解决方案。

### 其他
xawtv可以只使用apt install xawtv安装
webcam使用apt安装后打开摄像头一闪一闪的，无法正常使用
wxcam不错，推荐使用，详情见v4l2.md文件
看到一个kamoso的安装包，安装后各种qt错误，无果
（Qt: Session management error: None of the authentication protocols specified are supported这个问题的根源是当前是以root身份进行登录的，而运行程序需要更换一种角色。退出root 运行应用程序就OK了)

### luvcview
好像非常不错，安装包地址：https://launchpad.net/ubuntu/precise/amd64/luvcview/1:0.2.6-5
直接make，报错SDL/SDL.h，安装libsdl1.2-dev，安装libsdl2-dev不行
uvcvideo.h:5:10: fatal error: linux/videodev.h: No such file or directory
#include <linux/videodev.h>

解决办法（参考https://blog.csdn.net/shunrenwang/article/details/80549182）

sudo ln -s /usr/include/linux/videodev2.h /usr/include/linux/videodev.h
luvcview -d /dev/video1 -f yuv -s 640x480
luvcview -d /dev/video1 -f mjpg -s 640x480
luvcview -d /dev/video0 -L

### yavtv
基于 Linux V4L2 子系统进行图像采集，需要遵循一定的流程规范，操作起来也不算简单。如果只是作为测试、调试使用，yavta 工具就很好使了。它支持很多常规的操作选项，可以按需配置使用。

其源代码也是挺简洁紧凑的，以后再找时间好好阅读学习下。这里主要是讲解这个工具基于创龙 TL570x-EVM 的编译与使用。

工具项目地址：http://git.ideasonboard.org/yavta.git

下载源码：git clone git://git.ideasonboard.org/yavta.git然后make即可。

./yavta /dev/video1 -c1 -n4 -s1920x1080 -fSRGGB10 -Fvideo.raw
./yavta -f help可以查看所有格式
raw可以修改为jpeg，是直接查看的。

## 4、

https://hceng.cn/


