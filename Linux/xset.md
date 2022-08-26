# xset命令

## 1、简介
xset命令是设置X-Window系统中的用户爱好的实用工具。 xset是上层应用程序，主要用于在X-Window启动之后，对X-Window进行一些设置。

运行xset命令时要求启动本地X-Windows的图形界面后，在图形界面下的命令行中输入，否则将出现错误提示。

## 2、键盘粘连
查看当前设置：xset -q  或者 xset q

配置键盘输入粘连：xset r rate 666 25

export DISPLAY=:0
echo $DISPLAY

可以适当的进行这个命令修改，666可以调低一些，25可以调高一些，这样使用起来体验好些。666指的是两个输入键之间的间隔时间，这个时间间隔越小越会出现键盘粘连，25表示的是每秒钟系统捕获键盘事件的频率，频率越高越顺畅。如果还有键盘粘连问题就把666调高些。

## 3、参数选项
```
b	蜂鸣器开关设置
c	键盘按键声响设置
s	屏幕保护程序设置
q	显示相关信息
```

开启蜂鸣器和键盘按键声: xset b on c on         或者 xset b
关闭蜂鸣器和键盘按键声: xset b off c off       或者 xset -b

## 4、蜂鸣器
蜂鸣器是一种一体化结构的电子讯响器，采用直流电压供电，广泛应用于计算机、打印机、复印机、报警器、电子玩具、汽车电子设备、电话机、定时器等电子产品中作发声器件。蜂鸣器主要分为压电式蜂鸣器和电磁式蜂鸣器两种类型。蜂鸣器在电路中用字母“H”或“HA”（旧标准用“FM”、“ZZG”、“LB”、“JD”等）表示。

## 5、Linux 命令行关闭开启显示器及xset: unable to open display ""解决方法
在远程连接Linux等时，基本用不到显示器，所以希望能远程将显示屏关闭
xset -display :0.0 dpms force off这个命令让显示屏进入休眠状态
xset -display :0.0 dpms force on开启显示屏

sleep 1 && xset dpms force off这个命令关闭屏幕
出现了报错：xset: unable to open display “”
解决方法：输入如下命令

export DISPLAY=:0
xset q

之后再输入sleep 1 && xset dpms force off不再报错

## 6、屏保
用xset q 可以查看当前屏保的设置情况，黑屏方式的屏保有两种状态：
1.xset 的s参数后面可接两个数字参数，前一个即是进入屏保的秒数，如果想立刻进入屏保：
    xset s 2 600  这样，两秒种后进入屏保。
    如果想恢复默认值，即比较长的时间进入屏保：xset s 0 600
    取消屏保：xset s off
2.dpms 是屏保的另一种状态，将其断电，与关机后的显示器同样的效果：
    开启：xset dpms 1 1 2
    取消：xset -dpms

正因为X的屏幕保护由两部分控制, 单纯的关闭DPMS或者BlankTime都不行, 必须都关掉. 所以我在.xinitrc中加入了下面的命令, 具体解释和其它xset命令参数见Manual.

xset s off
xset dpms 0 0 0

但是这样暴力关闭显得不大环保, 尤其是整宿不关机下载的情况, 可以选择把DPMS和BlankTime的超时时间设置得久一点, 或者加一条alias用来手动关闭显示器电源(笔记本没显示器开关).