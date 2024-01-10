# linux上面操作图片

## 1、截图
scrot命令，不加任何参数截图全屏
注意：只能在本地进行使用，当远程连接使用时，截出来的图片是全黑色的。（但是我却成功了，执行export DISPLAY=:0后）
scrot -s截取指定窗口或矩形区域。

gnome-screenshot  -a 
ubuntu和debian下的快速截图。

ubuntu 中截图命令是gnome-screenshot
应用程序选项：
    -w， –window 抓取窗口，而不是整个屏幕
    -a， –area 抓取屏幕的一个区域，而不是整个屏幕-b， –include-border 抓图中包含窗口边框
    -B， –remove-border 去除屏幕截图的窗口边框-d， –delay=秒 在指定延迟后抓图[以秒计]
    -e， –border-effect=效果 添加到边框的特效(阴影、边框或无特效)-i， –interactive 交互式设定选项
    –display=显示 要使用的 X 显示

安卓系统：
screenshot /sdcard/hh.png
screencap -p /sdcard/jj.png
但是有个神奇的事情，使用screenshot命令截出来的图片变色了，蓝色变成了橙色，screencap没有这个问题。

## 2、命令查看图片
xdg-open jpg_out_151.jpg

在 Debian 系统中，可以使用以下命令打开图片：
使用 GNOME 图片查看器打开图片：
eog /path/to/image.jpg

使用 ImageMagick 的 display 命令打开图片：
display /path/to/image.jpg

使用 feh 图片查看器打开图片：（可行）
feh /path/to/image.jpg


