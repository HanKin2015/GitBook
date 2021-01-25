# spice
SPICE（独立计算环境的简单协议）- Simple Protocol for independent Computing Environment

Spice 是一个开放的远程计算解决方案，使得客户端可以访问远程机器桌面和设备（比如键盘，鼠标，audio和USB）。通过Spice我们可以像使用本地计算机一样访问远程机器，这样可以把CPU GPU密集工作从客户端移交给远程高性能机器。Spice适用于LAN和WAN，并且不会损害用户体验

Spice项目提供了和虚拟桌面进行交互的解决方案，并且是完全开源的。Spice项目可以处理虚拟设备（后端back-end）和前端 front-end。在前端和后端间通过VDI(Virtual Device Interfaces)进行交互。

spice是由Qumranet开发的开源网络协议，2008年红帽收购了Qumranet获得了这个协议。SPICE是红帽在虚拟化领域除了KVM的又一“新兴技术”，它提供与虚拟桌面设备的远程交互实现,主要应用在桌面虚拟化,支持图像,2D传输,720P视频播放

目前,spice主要目标是为qemu虚拟机提供高质量的远程桌面访问,它致力于克服传统虚拟桌面的一些弊端,并且强调用户体验。

## spice包含有3个组件：

SPICE Driver：SPICE驱动器 存在于每个虚拟桌面内的组件

SPICE server：SPICE服务器 存在于红帽企业虚拟化Hypervisor内的组件

SPICE Client： SPICE客户端 存在于终端设备上的组件，可以是瘦客户机或专用的PC，用于接入每个虚拟桌面。

参考：https://www.cnblogs.com/jython/p/4301944.html



# qxl驱动
QXL实现的功能主要包含两块：Display Driver 和 Video Miniport。

1.  Display Driver

Display Driver以动态链接库qxldd.dll的形式提供，处于内核态，主要是提供绘图API给GDI，这样当最上层的应用需要绘图的时候，通过调用GDI API(gdi32.dll)，GDI 调用QXL的绘图API（qxldd.dll）达到绘图目的。












