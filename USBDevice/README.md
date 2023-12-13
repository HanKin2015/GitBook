# USB外部设备

在U盘、移动硬盘、USB HUB和各种USB读卡器的主控芯片板上，都存有设备的出品商（vender）、制造商（producter）、版本号（version）和序列号（SN）信息，前两者一般是英文单词记录的商标品牌名称，如TOSHIBA、SANSUNG等，版本号为简单的十进制数字，如0.15、1.2等，而序列号是一长串十进制或十六进制的编码，通常情况下vender+SN就可以唯一标识一个USB设备了。

## 1、USB官网
https://www.usb.org/documents
https://www.intel.cn/content/www/cn/zh/products/docs/io/universal-serial-bus/ehci-v1-1-addendum.html?wapkw=ehci
https://www.intel.com/content/dam/www/public/us/en/documents/technical-specifications/ehci-specification-for-usb.pdf
居然是intel的资料。

[List of USB ID](http://www.linux-usb.org/usb.ids)

peripheral：外围设备

## 2、USB协议
USB基础知识概论: https://www.crifan.com/files/doc/docbook/usb_basic/release/webhelp/index.html
USB2.0官方协议：https://www.usb.org/sites/default/files/usb_20_20211008.zip
USB3.0官方协议：https://www.usb.org/sites/default/files/usb_32_202206.zip
USB4.0官方协议：https://www.usb.org/sites/default/files/USB4%20Specification%20October%202022_0.zip

分类（CATEGORY）搜索规范（SPECIFICATION）

## 3、libusb源代码
https://github.com/libusb/libusb

## 4、EDN China电子设计技术
EDN China 是第一家关注中国电子设计领域的媒体，开创性地引入了电子设计的概念。在过去的16年，我们针对中国设计经理人和工程师的特殊需要，不断提供最先进和有深度的设计技术和应用。

官网：https://www.ednchina.com/

## 5、USB中文网
https://www.usbzh.com/article/detail-627.html

## 6、瞎折腾
https://www.usbzh.com/article/detail-621.html

## 7、抗干扰磁环-数据线上的小疙瘩
在许多键盘、鼠标或游戏外设数据线的末端，我们可以看到一个黑色的注塑疙瘩，其实这个黑疙瘩里有一个黑色的铁氧体环，学名叫磁环，也有人叫EMI滤波器、屏蔽磁环等，具体用于屏蔽信号传输过程中的高频干扰，降低高频噪声，从而保证信号质量。

事实上，磁环的材料非常简单和常见。设备线束上使用的磁环一般由铁氧体材料组成。铁氧体是一种陶瓷材料。其主要成分是氧化铁、氧化镍、氧化锌、氧化铜等。一般不导电，可用于制造永久磁铁、变压器铁芯和磁环。

在键盘、鼠标和外设中，几乎所有的电线都是以直接通过磁环的形式安装的。基本上，外设不使用多圈缠绕，一般选择安装USB接口附近。

铁氧体磁环是一种能形成被动低通滤波器的电感器，可以衰减高频干扰，可以从设备本身或外部进入，铁氧体磁芯吸收并转化高频信号的能量并散发。

键盘鼠标使用磁环USB数据线是为了屏蔽无用的高频信号，USB数据线通常会靠近电脑机箱，USB数据线会像天线一样吸收机箱内周围环境或硬件产生的高频信号，从而影响实际传输。添加磁环是一种更经济的解决方案。

对于1-2米的USB在数据线，磁环更多的是为了防止外部高频信号干扰，屏蔽层也可以达到屏蔽高频信号干扰的效果，因此选择USB数据线简单判断是否有加磁环太一概而论，不太合理。如果前期设计好USB数据线可满足日常使用，无需配备磁环。当然，不同材料、不同厂家生产的磁环对屏蔽滤波有不同的效果。反正记住质量决定价格吧。



