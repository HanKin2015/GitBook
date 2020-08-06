[TOC]

# 安装包命令

# 1、deb
dbkg -i **.deb




# 扩展屏关于使用xinput支持x86盒子鼠标校准的问题
目前只有xinput_1.6.1-1_amd64.deb这个版本的xinput在x86盒子上面正常使用，新版本的如xinput_1.6.2-1+b1_amd64.deb可能会有问题。
首先dpkg -i xinput_1.6.1-1_amd64.deb安装软件
输入xinput查看是否检测到了VGA和HDMI屏
xrandr -d :0查看有哪些屏
export DISPLAY=:0 在用xinput查看
xinput map-to-output 10 VGA1 把鼠标定位到VGA屏
xinput map-to-output 10 HDMI1 把鼠标定位HDMI屏

https://my.oschina.net/u/174445/blog/33329














