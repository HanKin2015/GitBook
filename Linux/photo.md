# linux上面操作图片

## 1、截图
scrot命令
注意：只能在本地进行使用，当远程连接使用时，截出来的图片是全黑色的。
scrot -s截取指定窗口或矩形区域。

gnome-screenshot  -a 
ubuntu和debian下的快速截图。

## 2、命令查看图片
xdg-open jpg_out_151.jpg

在 Debian 系统中，可以使用以下命令打开图片：
使用 GNOME 图片查看器打开图片：
eog /path/to/image.jpg

使用 ImageMagick 的 display 命令打开图片：
display /path/to/image.jpg

使用 feh 图片查看器打开图片：
feh /path/to/image.jpg










