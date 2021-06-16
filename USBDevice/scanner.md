# linux环境下运行佳能扫描仪

插上扫描仪后，使用lsusb -t可以发现扫描仪驱动为空，正常来说有usbfs驱动。

去官网下载对应驱动，发现只有Windows版本。

## 1、官网有打印机驱动
“Linux 专用 Canon UFR II/UFRII LT 打印机驱动程序”是支持Canon设备的 Linux 操作系统打印机驱动程序。
它使用 Linux 操作系统用的(Common Unix Printing System)打印系统。
下载链接：
https://www.canon.com.cn/supports/download/simsdetail/0100832109.html

应用程序需要libglade2安装包，但不知为何CentOS的yum仓库里没有此包，使用下面一行手动安装需要的软件。
sudo yum install -y http://vault.centos.org/7.6.1810/os/x86_64/Packages/libglade2-2.6.4-11.el7.x86_64.rpm

## 3、百度搜索扫描仪驱动
找到一个公司和canon有合作关系，做了很多驱动适配：
http://www.hyrh.com.cn/download-center/qudong.html
这个网站有我需要的驱动，但是解压需要密码。

## 4、sane通用扫描仪驱动
https://gitlab.com/sane-project/backends/-/releases
you may need a package called 'libusb-dev', 'libusb-devel' pr similar.















