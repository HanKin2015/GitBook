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

## 2、百度搜索扫描仪驱动
找到一个公司和canon有合作关系，做了很多驱动适配：
http://www.hyrh.com.cn/download-center/qudong.html
这个网站有我需要的驱动，但是解压需要密码。

## 3、sane通用扫描仪驱动
https://gitlab.com/sane-project/backends/-/releases
you may need a package called 'libusb-dev', 'libusb-devel' pr similar.

## 4、方正高速文档扫描仪
s8660，居然在官网没有找到驱动，还是只能使用光盘中的驱动才能进行使用。
http://www.foundertech.com/search.html?t=0&k=ks&x=0&y=0

使用驱动精灵：http://www.drivergenius.com/search-printer/result/?keyword=%E4%BD%B3%E8%83%BD&source=2&version=1&pid=5001&trynum=1611&uuid=8524d41e16af1c4d822e90cb42b2da6c
好像只能搜索到打印机，并且相关机器也少之又少。

使用360驱动大师：更全，但是只能在软件上面进行搜索，并且能直接下载下来。

最终想尝试抓包，看是否是由于分包导致了问题，通过手动合包。

## 5、打印机
win11可能不存在打印管理工具。
惠普（Hewlett-Packard，简称HP）

柯达：https://support.alarisworld.com/zh-cn#section%201
得力：https://www.nbdeli.com/products/productinfo/9333.html

打印机会根据vpid+iSerialNumber描述符组成实例id，然后来绑定打印机驱动。如果iSerialNumber描述符为空，则会根据vpid+端口路径组成实例id，然后来绑定打印机驱动。当同型号打印机且存在iSerialNumber描述符时，则会按照vpid+端口路径，因此可以提前去掉iSerialNumber描述符。

因此，部分打印机更换了usb端口后并不需要重装打印机驱动。

斑马打印机：http://www.zebraservice.cn/#/product/64
斑马官网：https://www.zebra.com/cn/zh/support-downloads/printers-cn/zd888ta.html?downloadId=4fd677df-5ae1-4e2f-89ce-f33134dc1e70#Tab-item-83dd8217ea-tab
请认准官网，官网的驱动已经V10，但是盗版的还是V8，可以看出斑马图标区分。

## 6、打印机服务无法启动,错误1068
使用命令sc config spooler depend= RPCSS来恢复Windows默认的依赖关系。

发现出现问题时，其中多了一个依存关系是HTTP Service->MsQuic啥的，通过恢复默认后正常。我自己的虚拟机也是同样情况，但是不报错。
打印机服务：Spooler(Print Spooler)



