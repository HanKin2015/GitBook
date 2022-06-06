# Linux双屏之xrandr命令

## 1、简介
官网：https://wiki.archlinux.org/index.php/Xrandr_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)

```
[root@ubuntu0006:/media/hankin/vdb/app] #xrandr
Screen 0: minimum 0 x 0, current 2048 x 1152, maximum 32768 x 32768
default connected primary 2048x1152+0+0 541mm x 304mm
   2048x1152      0.00*
[root@ubuntu0006:/media/hankin/vdb/app] #export "DISPLAY=:0"
[root@ubuntu0006:/media/hankin/vdb/app] #xrandr
Screen 0: minimum 320 x 200, current 2560 x 1440, maximum 8192 x 8192
qxl-0 connected 2560x1440+0+0 0mm x 0mm
   1280x720      60.00
   1920x1080-0    0.06
   1680x1050-0    0.06
   1280x1022-0    0.06
   1440x900-0     0.06
   1024x766-0     0.06
   1400x1050-0    0.06
   1600x900-0     0.06
   2560x1440-0    0.06*
   1600x1200-0    0.06
   1152x864-0     0.06
qxl-1 disconnected
qxl-2 disconnected
qxl-3 disconnected
```

执行之前使用：export DISPLAY=:0

xrandr

## 2、修改分辨率
xrandr -s 1600x900
双屏修改指定屏幕分辨率：

## 3、显示器刷新率
指令用法举例：xrandr -s 1024x768 -r 75

xrandr -q


xrandr --output DFP1 --auto --left-of CRT1

常见的显示屏名称有VGA, DVI, HDMI and LVDS等等


## 4、调整亮度
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

## 竖屏
最近得到一块可以旋转的屏幕，竖屏写代码YYDS。
xrandr --output VGA-0 --rotate left
xrandr --output VGA-0 --rotate normal

有个问题，虚拟机无法自动适应，分辨率变化了，但是屏幕下半截无法使用。

xrandr --output eDP-1 --mode 1920x1080

两个屏幕都会进行旋转
xrandr -o left
xrandr -o right
xrandr -o inverted
xrandr -o normal

看了这篇文章，感觉可以，实际上会有报错：https://zhuanlan.zhihu.com/p/429253586
```
root@hankin:~# xrandr --output HDMI-1 --auto --scale 1x1 --panning 1920x1080+0+0 --output VGA-0 --auto --scale 1x1 --panning 1080x1920+1920+0 --rotate left --right-of HDMI-1
warning: output HDMI-1 not found; ignoring
warning: output VGA-0 not found; ignoring
root@hankin:~# export DISPLAY=:0
root@hankin:~# xrandr --output HDMI-1 --auto --scale 1x1 --panning 1920x1080+0+0 --output VGA-0 --auto --scale 1x1 --panning 1080x1920+1920+0 --rotate left --right-of HDMI-1
X Error of failed request:  BadMatch (invalid parameter attributes)
  Major opcode of failed request:  140 (RANDR)
  Minor opcode of failed request:  29 (RRSetPanning)
  Serial number of failed request:  37
  Current serial number in output stream:  37
```

