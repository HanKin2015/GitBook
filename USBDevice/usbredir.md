# usbredir-0.7内容详解

## 1、获取usbredir库
在spice源码中难免会遇到usb重定向的问题，现在最新的usb重定向的版本是：usb重定向协议0.7版本（USB redirection protocol version 0.7），可以点击：usbredir-0.7.tar.bz2, 或者网站https://gitlab.freedesktop.org/spice/usbredir下载就可以了。
官网源码：https://gitlab.freedesktop.org/spice/usbredir

下完解压后里面有个协议说明文档usb-redirection-protocol.txt，主要介绍了版本信息和协议方面的东西，看懂了这个整个协议就差不多了。其他版本的极少就不看了，直接０0.7版本了。

需求：usb_redir_device_connect_header 

## 2、libusb库
https://127.0.0.1:30001

## 3、libusb_device和libusb_device_handle的区别
libusb是一个用户空间的USB设备驱动程序库，它提供了一组API，使得应用程序可以直接访问USB设备，而不需要了解底层的USB协议和硬件细节。在libusb中，libusb_device和libusb_device_handle是两个重要的结构体，它们分别代表了USB设备和USB设备的句柄。

libusb_device结构体表示一个USB设备，它包含了设备的描述符信息、配置信息、接口信息等。libusb_device结构体的创建和初始化是由libusb库自动完成的，应用程序只需要通过libusb_get_device_list()函数获取当前连接的USB设备列表，然后遍历列表中的每一个设备，就可以得到每个设备的libusb_device结构体。

libusb_device_handle结构体则是用来表示一个打开的USB设备句柄，它包含了与设备通信所需的一些信息，如设备的端点地址、传输类型、超时时间等。应用程序需要通过libusb_open()函数打开一个USB设备，这个函数会返回一个libusb_device_handle结构体，应用程序就可以使用这个结构体来进行USB设备的读写操作。

总的来说，libusb_device和libusb_device_handle是libusb库中用来表示USB设备和USB设备句柄的两个重要结构体，它们提供了应用程序与USB设备进行通信的接口。






