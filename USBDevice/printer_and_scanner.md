# 打印机和扫描仪

## 1、linux环境下运行佳能扫描仪
插上扫描仪后，使用lsusb -t可以发现扫描仪驱动为空，正常来说有usbfs驱动。
去官网下载对应驱动，发现只有Windows版本。

### 1-1、官网有打印机驱动
“Linux 专用 Canon UFR II/UFRII LT 打印机驱动程序”是支持Canon设备的 Linux 操作系统打印机驱动程序。
它使用 Linux 操作系统用的(Common Unix Printing System)打印系统。
下载链接：
https://www.canon.com.cn/supports/download/simsdetail/0100832109.html

应用程序需要libglade2安装包，但不知为何CentOS的yum仓库里没有此包，使用下面一行手动安装需要的软件。
sudo yum install -y http://vault.centos.org/7.6.1810/os/x86_64/Packages/libglade2-2.6.4-11.el7.x86_64.rpm

### 1-2、百度搜索扫描仪驱动
找到一个公司和canon有合作关系，做了很多驱动适配：
http://www.hyrh.com.cn/download-center/qudong.html
这个网站有我需要的驱动，但是解压需要密码。

### 1-3、sane通用扫描仪驱动
https://gitlab.com/sane-project/backends/-/releases
you may need a package called 'libusb-dev', 'libusb-devel' pr similar.

## 2、方正高速文档扫描仪
s8660，居然在官网没有找到驱动，还是只能使用光盘中的驱动才能进行使用。
http://www.foundertech.com/search.html?t=0&k=ks&x=0&y=0

使用驱动精灵：http://www.drivergenius.com/search-printer/result/?keyword=%E4%BD%B3%E8%83%BD&source=2&version=1&pid=5001&trynum=1611&uuid=8524d41e16af1c4d822e90cb42b2da6c
好像只能搜索到打印机，并且相关机器也少之又少。

使用360驱动大师：更全，但是只能在软件上面进行搜索，并且能直接下载下来。

最终想尝试抓包，看是否是由于分包导致了问题，通过手动合包。

## 3、打印机
win11可能不存在打印管理工具。
爱普生：https://www.epson.com.cn/services/guidedrive.html
惠普（Hewlett-Packard，简称HP）
柯达：https://support.alarisworld.com/zh-cn#section%201
得力：https://www.nbdeli.com/products/productinfo/9333.html
斑马打印机：http://www.zebraservice.cn/#/product/64
斑马官网：https://www.zebra.com/cn/zh/support-downloads/printers-cn/zd888ta.html?downloadId=4fd677df-5ae1-4e2f-89ce-f33134dc1e70#Tab-item-83dd8217ea-tab
请认准官网，官网的驱动已经V10，但是盗版的还是V8，可以看出斑马图标区分。

打印机市场上有OKI的也有四通OKI的，机器都是OKI公司的，四通公司只是贴牌，OEM。两家公司是合作关系。
其实都是oki公司生产的。 四通销售做得好 是oki打印机最大的代理 所以可以自己贴牌。

## 4、打印机服务无法启动,错误1068
使用命令sc config spooler depend= RPCSS来恢复Windows默认的依赖关系。

发现出现问题时，其中多了一个依存关系是HTTP Service->MsQuic啥的，通过恢复默认后正常。我自己的虚拟机也是同样情况，但是不报错。
打印机服务：Spooler(Print Spooler)

## 5、打印机USB通讯模式中的API模式和类模式
打印机会根据vpid+iSerialNumber描述符组成实例id，然后来绑定打印机驱动。如果iSerialNumber描述符为空，则会根据vpid+端口路径组成实例id，然后来绑定打印机驱动。当同型号打印机且存在iSerialNumber描述符时，则会按照vpid+端口路径，因此可以提前去掉iSerialNumber描述符。

因此，部分打印机更换了usb端口后并不需要重装打印机驱动。

在打印机的 USB 通讯模式中，API 模式和类模式是两种常见的操作模式，它们定义了计算机与打印机之间如何进行数据传输和通信。以下是对这两种模式的详细解释：

### 5-1、API 模式
定义：API（Application Programming Interface）模式是指通过特定的编程接口与打印机进行通信。在这种模式下，开发者可以使用打印机厂商提供的 API 函数库来控制打印机的功能。

特点：
- 灵活性：API 模式通常提供更高的灵活性，允许开发者直接访问打印机的高级功能。
- 定制化：可以根据需要定制打印任务，例如设置打印质量、纸张类型、颜色管理等。
- 依赖性：需要使用特定厂商提供的驱动程序和库，可能会导致跨平台兼容性问题。

应用场景：适用于需要精细控制打印机功能的应用程序开发，例如专业图形设计软件、定制化打印解决方案等。

### 5-2、类模式
定义：类模式（Class Mode）是指使用标准的 USB 打印类协议进行通信。这种模式遵循 USB 打印类规范，允许操作系统通过标准驱动程序与打印机进行通信。

特点：
- 标准化：遵循 USB 打印类标准，通常不需要额外的驱动程序，操作系统自带的驱动即可支持。
- 易用性：用户只需将打印机连接到计算机，操作系统即可识别并安装打印机。
- 功能限制：由于使用标准协议，可能无法访问打印机的所有高级功能。

应用场景：适用于一般的打印任务，如文档打印、家庭和办公室的日常使用。

### 5-3、选择合适的模式
API 模式：如果需要对打印机进行高级控制或开发特定的打印应用程序，API 模式是更好的选择。
类模式：对于普通用户和一般打印任务，类模式提供了即插即用的便利性。

## 6、打印机多副本