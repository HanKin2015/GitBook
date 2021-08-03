# ioctl
在计算机中，ioctl(input/output control)是一个专用于设备输入输出操作的系统调用,该调用传入一个跟设备有关的请求码，系统调用的功能完全取决于请求码。举个例子，CD-ROM驱动程序可以弹出光驱，它就提供了一个对应的Ioctl请求码。设备无关的请求码则提供了内核调用权限。ioctl这名字第一次出现在Unix第七版中，他在很多类unix系统（比如Linux、Mac OSX等）都有提供，不过不同系统的请求码对应的设备有所不同。Microsoft Windows在Win32 API里提供了相似的函数，叫做DeviceIoControl。

ioctl是设备驱动程序中对设备的I/O通道进行管理的函数。所谓对I/O通道进行管理，就是对设备的一些特性进行控制，例如串口的传输波特率、马达的转速等等。它的调用个数如下：int ioctl(int fd, ind cmd, …)；
其中fd是用户程序打开设备时使用open函数返回的文件标示符，cmd是用户程序对设备的控制命令，至于后面的省略号，那是一些补充参数，一般最多一个，这个参数的有无和cmd的意义相关。
ioctl函数是文件结构中的一个属性分量，就是说如果你的驱动程序提供了对ioctl的支持，用户就可以在用户程序中使用ioctl函数来控制设备的I/O通道。


用户空间的程序通常发出一个给内核的请求，该请求称为系统调用，它的实现代码在内核层。

一个Ioctl接口是一个独立的系统调用，通过它用户空间可以跟设备驱动沟通。对设备驱动的请求是一个以设备和请求号码为参数的Ioctl调用，如此内核就允许用户空间访问设备驱动进而访问设备而不需要了解具体的设备细节，同时也不需要一大堆针对不同设备的系统调用。


在驱动程序中实现的ioctl函数体内，实际上是有一个switch{case}结构，每一个case对应一个命令码，做出一些相应的操作。怎么实现这些操作，这是每一个程序员自己的事情。

内核提供了一些宏来帮助定义命令：
```
//nr为序号，datatype为数据类型,如int
_IO(type, nr ) //没有参数的命令
_IOR(type, nr, datatype) //从驱动中读数据
_IOW(type, nr, datatype) //写数据到驱动
_IOWR(type,nr, datatype) //双向传送

定义命令例子:
#define MEM_IOC_MAGIC 'm' //定义类型
#define MEM_IOCSET _IOW(MEM_IOC_MAGIC,0,int)
#define MEM_IOCGQSET _IOR(MEM_IOC_MAGIC, 1, int)
```









