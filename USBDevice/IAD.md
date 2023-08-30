# USB组合设备 Interface Association Descriptor (IAD)
https://blog.51cto.com/u_8475449/5630151
https://www.ngui.cc/el/3208308.html?action=onClick
感觉这篇文章写的有问题：https://www.usbzh.com/article/detail-1175.html
Communication Device Class，简称CDC
USB Compound Device，USB复合设备
USB Composite Device，USB组合设备

摘要
USB复合设备 Compound Device内嵌Hub和多个Function，每个Function都相当于一个独立的USB外设，有自己的PID/VID。
USB组合设备Composite Device内只有一个Function，只有一套PID/VID，通过将不同的interface定义为不同的类来实现多个功能的组合。

正文

Compound Device内嵌Hub和多个Function，每个Function都相当于一个独立的USB外设，有自己的PID/VID。
Composite Device内只有一个Function，只有一套PID/VID，通过将不同的interface定义为不同的类来实现多个功能的组合。

很多人认为一个USB接口上实现多个设备，就是指复合设备，其实，这是不确切的，
虽然USB Compound Device和USB Composite Device都会被百度翻译为USB复合设备。

在一个USB接口上实现多个设备有2种方法，
一种是Compound Device，就是复合设备；
另一种是Composite Device，就是组合设备。

在USB2.0的标准协议中，定义如下：
When multiple functions are combined with a hub in a single package, they are referred to as a compound device.
A device that has multiple interfaces controlled independently of each other is referred to as a composite device.

所以，复合设备其实就是几个设备通过一个USB Hub形成的单一设备；
组合设备也就是具有多个接口的设备，每个接口代表一个独立的设备。
显然，如果是想同样的功能的话，组合设备的方法要简单很多(可以去看一下USB2.0协议中，USB2.0 Hub的复杂度)。

参见 USB Descriptors
USB复合设备一般用Interface Association Descriptor（IAD）实现，就是在要合并的接口前加上IAD描述符。

IAD描述符：

```
typedef struct _USBInterfaceAssociationDescriptor {
    BYTE  bLength:                  0x08        //描述符大小
    BYTE  bDescriptorType:          0x0B        //IAD描述符类型
    BYTE  bFirstInterface:          0x00        //起始接口
    BYTE  bInterfaceCount:          0x02        //接口数
    BYTE  bFunctionClass:           0x0E        //类型代码
    BYTE  bFunctionSubClass:        0x03        //子类型代码
    BYTE  bFunctionProtocol:        0x00        //协议代码
    BYTE  iFunction:                0x04        //描述字符串索引
}
```
https://blog.csdn.net/u013256018/article/details/61947232
https://blog.csdn.net/u012028275/article/details/109790166


USB Interface Association Descriptor (IAD) 
IAD是Interface Association Descriptor，功能是把多个接口定义为一个类设备。
Windows下，IAD和Composite设备在设备管理器中没有什么区别，甚至使用的驱动也都是Composite驱动

IAD是Interface Association Descriptor，功能是把多个接口定义为一个类设备。这个描述符是最新更新的，基本在书上是看不到的。

多说无益，自己看http://www.microsoft.com/whdc/archive/IAD.mspx。用起来非常简单的。

Windows下，IAD和Composite设备在设备管理器中没有什么区别，甚至使用的驱动也都是Composite驱动。
Linux下，确实能发现这个设备，不过我用IAD实现的CDC并没有自动装载到ttyACM0，这个就以后研究了。


USB2.0规范(The Universal Serial Bus Specification, revision 2.0)没有支持该描述符，不支持将设备的多个接口分组到单个设备功能中。该描述符是由USB-IF发布工程更改通知Engineering Change Notification (ECN)，《USB ECN : Interface Association Descriptor》定义了该描述符与功能。

Windows系统从Microsoft Windows XP Service Pack 2 (SP2)版本开始支持IAD。





