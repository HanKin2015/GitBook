[TOC]
官网：https://wiki.archlinux.org/index.php/Xrandr_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

# Linux双屏之xrandr

执行之前使用：export DISPLAY=:0

xrandr

# 修改分辨率
xrandr -s 1600x900

# 显示器刷新率
指令用法举例：xrandr -s 1024x768 -r 75

xrandr -q


xrandr --output DFP1 --auto --left-of CRT1

常见的显示屏名称有VGA, DVI, HDMI and LVDS等等


# 调整亮度
xrandr --output LVDS --brightness 0.5


# 复制屏幕
xrandr --output HDMI-1-1 --same-as eDP-1-1 --auto

# 右扩展屏幕（HDMI为eDP的右扩展屏）
xrandr --output HDMI-1-1 --right-of eDP-1-1 --auto 

# 只显示副屏
xrandr --output HDMI-1-1 --auto --output eDP-1-1 --off 

# 设置主副屏
我这里设置外扩屏为主屏幕，我把笔记本电脑放在了左边侧着，扩展屏当主屏幕
xrandr --output HDMI-1-1 --primary

# 设置笔记本为左扩展屏
xrandr --output eDP-1-1 --left-of HDMI-1-1

```
//关闭显示器VGA1
xrandr --output VGA1 --off

//开启显示器VGA1
xrandr --output VGA1 --auto

//关闭显示器LVDS1
xrandr --output LVDS1 --off

//开启显示器LVDS1
xrandr --output LVDS1 --auto

//打开VGA1,同时关闭LVDS1
xrandr --output VGA1 --auto --output LVDS1 --off

//关闭VGA1,同时打开LVDS1
xrandr --output VGA1 --off --output LVDS1 --auto

//扩展模式时,将LVDS1显示在VGA1的左侧
xrandr --output LVDS1 --left-of VGA1 --auto

//扩展模式时,将LVDS1显示在VGA1右侧.
xrandr --output LVDS1 --right-of VGA1 --auto

//从扩展模式变成复制模式.

xrandr --output LVDS1 --same-as VGA1 --auto

//设定主显示器.
xrandr --output HDMI1 --auto --primary
```

# 使用xinput+xrandr命令矫正触摸屏光标焦点







