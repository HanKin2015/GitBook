# USB外部设备

在U盘、移动硬盘、USB HUB和各种USB读卡器的主控芯片板上，都存有设备的出品商（vender）、制造商（producter）、版本号（version）和序列号（SN）信息，前两者一般是英文单词记录的商标品牌名称，如TOSHIBA、SANSUNG等，版本号为简单的十进制数字，如0.15、1.2等，而序列号是一长串十进制或十六进制的编码，通常情况下vender+SN就可以唯一标识一个USB设备了。

## 1、USB官网
https://www.usb.org/documents
https://www.intel.cn/content/www/cn/zh/products/docs/io/universal-serial-bus/ehci-v1-1-addendum.html?wapkw=ehci
https://www.intel.com/content/dam/www/public/us/en/documents/technical-specifications/ehci-specification-for-usb.pdf
居然是intel的资料。
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

## 8、UCX框架
https://learn.microsoft.com/zh-cn/windows-hardware/drivers/usbcon/get-started-with-host-controller-driver-development
可以用来开发虚拟USB控制器。

## 9、USB协议速度
dmesg
lsusb -v
find /dev/bus
lsusb -t
12M 意味着 USB 1.0 / 1.1的速率是 12Mbit/s
480M 意味着 USB 2.0的速率是 480Mbit/s
如果你找到5.0G，那意味这你有USB 3.0类型接口。它有5.0Gbit/s的传输速率。

## 10、系统里面有个Realtek Semiconductor Corp设备
这个是音频驱动程序。

Realtek 瑞昱
Semiconductor 半导体
Corp 公司

## 11、RealTek (瑞昱)驱动程序下载
https://www.realtek.com/zh/
https://www.realtek.com/zh/products/communications-network-ics/item/rtl8812au
https://driverpack.io/zh-cn/devices/wifi/realtek/realtek-8812au-wireless-lan-802-11ac-usb-nic?os=windows-10-x64

## 12、霍尼韦尔
霍尼韦尔国际（Honeywell International）是一家营业额达300多亿美元的多元化高科技和制造企业，在全球，其业务涉及：航空产品和服务、楼宇、家庭和工业控制技术、汽车产品、涡轮增压器以及特殊材料。霍尼韦尔公司总部位于美国新泽西州莫里斯镇。
霍尼韦尔是一家国际性从事自控产品开发及生产的公司，公司成立于1885年，有超过百年历史的国际公司，1996年，被美国"财富"杂志评为最受推崇的20家高科技企业之一。是一家销售额为333.7亿美元(2011年度)，在多元化技术和制造业方面占世界领导地位的跨国公司（500强排名280位）。宗旨是以增加舒适感，提高生产力，节省能源，保护环境，保障使用者生命及财产从而达到互利增长为目的。为全球的楼宇，工业，航天及航空市场的客户服务。
霍尼韦尔国际公司是一个拥有多元化制造技术的领导者，服务于世界各地的客户，包括航天产品及服务、工业和家庭楼宇控制技术、汽车产品、涡轮增压器以及特种材料。霍尼韦尔在全球100多个国家/地区拥有116,000员工，以满足客户，力争成为世界自控先驱，从而实现互利增长的目标。
2017年6月7日，2017年《财富》美国500强排行榜发布，霍尼韦尔排名第73位。

## 13、无线网卡驱动
https://www.asix.com.tw/en/product/USBEthernet/Super-Speed_USB_Ethernet/AX88179
https://www.altobeam.com/

## 14、常见的厂商vendor
USB设备的VID(Vendor ID)是指厂商ID。每一个USB设备都具有VID，通过VID可以获取到该USB设备对应的USB设备厂商。
[List of USB ID](http://www.linux-usb.org/usb.ids)
[USB-IF](https://www.usb.org/developers) 这个使用的十进制显示
https://devicehunt.com/  该网站的USB VID数据是使用的方法二中linux-usb.org的usb.ids。

2109:0815  SuperSpeed集线器
8087:0032  无线蓝牙网卡
2109:2815  通用USB集线器

## 15、tx常用于表示传输，xfer也表示传输
tx 是 transmit 或 transmission 的缩写，通常用于表示数据的发送或传输。
xfer 是 transfer 的缩写，表示数据的转移或传输。这个缩写通常用于描述数据在不同位置之间的移动。

## 16、音频3A算法
音频3A算法是指声学回声消除（AEC）、自动增益控制（AGC）和背景噪声抑制（ANS）三种音频处理技术的统称。这些算法在音视频通话、会议等场景中起着重要作用，旨在提高音频质量，减少回声、噪声和音量波动的影响。

## 17、对拷线
对拷线是一种用于电脑间快速传输数据、共享外设（如键盘鼠标）的专用连接线，主流品牌以绿联、山泽为主，支持USB3.0/Type-C等接口，传输速度快且即插即用。
通过USB对拷线,一套鼠标键盘控制两台电脑,双向图文编辑,两台电脑通过USB对拷线实现工作内容剪切/复制,就像同一部电脑操作一样方便。

## 18、liblzo
liblzo 是一个开源的压缩库，主要用于数据压缩和解压缩。

liblzo是一个开源的压缩库，主要用于数据压缩和解压缩。它支持多种压缩算法，包括LZO1x、LZO2等。liblzo库广泛用于各种应用程序中，以提高数据处理效率。
官网：http://www.oberhumer.com/opensource/lzo/