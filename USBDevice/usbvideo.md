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

## 4、




