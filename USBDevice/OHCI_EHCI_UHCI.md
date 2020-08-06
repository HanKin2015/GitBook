# 主控制器接口


EHCI和OHCI的比较和区别
   什么是 ehci?什么是 ohci?就是host controller 的接口.从硬件上来说,usb 设备要想工作,除了外设本身,必须还有一个咚咚叫做 usb host controller.一般来说,一个电脑里有一个 usb host controller就可以了,她就可以控制很多个设备了,比如 u 盘,比如 usb 键盘,比如 usb 鼠标.所有的外设都把自己的请求提交给usb host controller.然后让 usb host controller 统一来调度.
   现在一般的USB桥接器模块有两种类型，UHCI和OHCI。在决定插入那一个桥接器模块时，可以察看/proc/pci文件来决定。。一般而言，UHCI类型的桥接器它的插入模块是uhci或usb-uhci（由内核版本决定）；而对于OHCI类型的桥接器它的插入模块是ohci或usb-ohci。

    uhci(universal host controller interface): Intel用在自家芯片组上的usb 1.1主控制器(host controller)的硬件实例
    ehci(enhanced host controller interface): usb 2.0的主控制器标准接口。
     ohci(open host controller inferface)：一个不仅仅是usb用的主控制器接口标准。主要是遵循csr (configuration space register)标准。是其他厂商在设计usb host controller时遵循的标准，如via, nec, ali, 包括nvidia等等。
     ehci是满足usb 2.0 specification里面对usb host controller (high speed)的要求的硬件设计。