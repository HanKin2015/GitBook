# DWC2驱动

## 1、简介
dwc2驱动最早出现在Linux内核版本3.0中，但是在3.0版本中它还不是一个稳定的驱动程序。从Linux内核版本3.3开始，dwc2驱动被认为是稳定的，并且已经被广泛使用。因此，如果您想使用dwc2驱动，建议使用Linux内核版本3.3或更高版本。

需要注意的是，不同的Linux发行版可能会对内核版本进行修改和定制，因此某些发行版可能会在较旧的内核版本中支持dwc2驱动。如果您使用的是定制的内核，请查看您的内核文档以确定是否支持dwc2驱动。

dwc2是Linux内核中的一个USB设备控制器驱动程序，它可以用于连接USB设备，例如USB存储设备、键盘、鼠标等。以下是使用dwc2驱动的一些步骤：

确认内核配置中已启用dwc2驱动。可以通过以下命令检查：
```
zcat /proc/config.gz | grep CONFIG_USB_DWC2
```

如果输出结果为“CONFIG_USB_DWC2=y”，则表示dwc2驱动已启用。
```
modprobe dwc2
```

或者，在系统启动时自动加载，可以将以下行添加到/etc/modules文件中：
```
dwc2
```

## 2、linux系统如何查看使用的是dwc驱动
lsmod | grep dwc
```
ls -l /sys/bus/platform/drivers/dwc*
如果输出中包含您的设备名称，则表示您的设备正在使用dwc驱动。

安卓（设备ff300000.usb）：
hankin:/ # ls -l /sys/bus/usb/devices/
total 0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-0:1.0 -> ../../../devices/platform/ff300000.usb/usb1/1-0:1.0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-1 -> ../../../devices/platform/ff300000.usb/usb1/1-1
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-1:1.0 -> ../../../devices/platform/ff300000.usb/usb1/1-1/1-1:1.0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-1:1.1 -> ../../../devices/platform/ff300000.usb/usb1/1-1/1-1:1.1
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-1:1.2 -> ../../../devices/platform/ff300000.usb/usb1/1-1/1-1:1.2
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 1-1:1.3 -> ../../../devices/platform/ff300000.usb/usb1/1-1/1-1:1.3
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 2-0:1.0 -> ../../../devices/platform/ff340000.usb/usb2/2-0:1.0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 2-1 -> ../../../devices/platform/ff340000.usb/usb2/2-1
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 2-1:1.0 -> ../../../devices/platform/ff340000.usb/usb2/2-1/2-1:1.0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 3-0:1.0 -> ../../../devices/platform/ff350000.usb/usb3/3-0:1.0
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 usb1 -> ../../../devices/platform/ff300000.usb/usb1
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 usb2 -> ../../../devices/platform/ff340000.usb/usb2
lrwxrwxrwx 1 root root 0 2023-04-06 17:00 usb3 -> ../../../devices/platform/ff350000.usb/usb3

hankin:/ # usbiptool list -l
Local USB devices
=================
 - busid 1-1 (0bda:5825)
         1-1:1.0 -> uvcvideo
         1-1:1.1 -> uvcvideo
         1-1:1.2 -> snd-usb-audio
         1-1:1.3 -> snd-usb-audio

 - busid 2-1 (1a40:0201)
         2-1:1.0 -> hub

hankin:/ # lsusb
Bus 001 Device 002: ID 0bda:5825
Bus 002 Device 002: ID 1a40:0201
Bus 001 Device 001: ID 1d6b:0002
Bus 002 Device 001: ID 1d6b:0002
Bus 003 Device 001: ID 1d6b:0001

hankin:/ # ls -l /sys/bus/platform/drivers/dwc*
/sys/bus/platform/drivers/dwc2:
total 0
--w------- 1 root root 4096 2023-04-07 09:56 bind
lrwxrwxrwx 1 root root    0 2023-04-07 09:56 ff300000.usb -> ../../../../devices/platform/ff300000.usb
--w------- 1 root root 4096 2023-04-07 09:56 uevent
--w------- 1 root root 4096 2023-04-07 09:56 unbind

/sys/bus/platform/drivers/dwc3:
total 0
--w------- 1 root root 4096 2023-04-07 09:56 bind
--w------- 1 root root 4096 2023-04-07 09:56 uevent
--w------- 1 root root 4096 2023-04-07 09:56 unbind

/sys/bus/platform/drivers/dwc3-of-simple:
total 0
--w------- 1 root root 4096 2023-04-07 09:56 bind
--w------- 1 root root 4096 2023-04-07 09:56 uevent
--w------- 1 root root 4096 2023-04-07 09:56 unbind

hankin:/ # ls -l /sys/devices/platform/ff300000.usb/                                      <
total 0
lrwxrwxrwx 1 root root    0 2023-04-10 09:58 driver -> ../../../bus/platform/drivers/dwc2
-rw-r--r-- 1 root root 4096 2023-04-10 09:58 driver_override
-r--r--r-- 1 root root 4096 2023-04-10 09:58 modalias
lrwxrwxrwx 1 root root    0 2023-04-10 09:58 of_node -> ../../../firmware/devicetree/base/usb@ff300000
-r--r--r-- 1 root root 4096 2023-04-10 09:58 pools
drwxr-xr-x 2 root root    0 2023-04-06 16:59 power
lrwxrwxrwx 1 root root    0 2023-04-10 09:58 subsystem -> ../../../bus/platform
-rw-r--r-- 1 root root 4096 2023-04-06 16:59 uevent
drwxr-xr-x 6 root root    0 2023-04-06 16:59 usb1
drwxr-xr-x 3 root root    0 2023-04-06 16:59 usbmon

debian（设备）：
root@hankin:~# ls -l /sys/bus/usb/devices/
total 0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-0:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-0:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.3 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.3
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.3:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.3/1-1.3.3:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.3:1.1 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.3/1-1.3.3:1.1
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.4 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.4
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.4:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.4/1-1.3.4:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.3.4:1.1 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.4/1-1.3.4:1.1
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.4 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.4:1.0 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.0
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.4:1.1 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.1
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.4:1.2 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.2
lrwxrwxrwx 1 root root 0 Apr 10 10:27 1-1.4:1.3 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.3
lrwxrwxrwx 1 root root 0 Apr 10 10:27 usb1 -> ../../../devices/pci0000:00/0000:00:1d.0/usb1

root@hankin:~# usbiptool

        [-p] --show the pen of DisplayLink device list
root@hankin:~# lsusb -t
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci-pci/8p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 3: Dev 4, If 0, Class=Hub, Driver=hub/4p, 480M
            |__ Port 3: Dev 12, If 0, Class=Human Interface Device, Driver=usbfs, 1.5M
            |__ Port 3: Dev 12, If 1, Class=Human Interface Device, Driver=usbfs, 1.5M
            |__ Port 4: Dev 6, If 0, Class=Human Interface Device, Driver=usbhid, 12M
            |__ Port 4: Dev 6, If 1, Class=Human Interface Device, Driver=usbhid, 12M
        |__ Port 4: Dev 17, If 0, Class=Video, Driver=uvcvideo, 480M
        |__ Port 4: Dev 17, If 1, Class=Video, Driver=uvcvideo, 480M
        |__ Port 4: Dev 17, If 2, Class=Audio, Driver=snd-usb-audio, 480M
        |__ Port 4: Dev 17, If 3, Class=Audio, Driver=snd-usb-audio, 480M

root@hankin:~# ls -l /sys/bus/platform/devices/
total 0
lrwxrwxrwx 1 root root 0 Apr 10 10:17 alarmtimer -> ../../../devices/platform/alarmtimer
lrwxrwxrwx 1 root root 0 Apr 10 10:17 coretemp.0 -> ../../../devices/platform/coretemp.0
lrwxrwxrwx 1 root root 0 Apr 10 10:17 e820_pmem -> ../../../devices/platform/e820_pmem
lrwxrwxrwx 1 root root 0 Apr 10 10:17 efi-framebuffer.0 -> ../../../devices/platform/efi-framebuffer.0
lrwxrwxrwx 1 root root 0 Apr 10 10:17 INT0800:00 -> ../../../devices/pci0000:00/0000:00:1f.0/INT0800:00
lrwxrwxrwx 1 root root 0 Apr 10 10:17 iTCO_wdt.0.auto -> ../../../devices/pci0000:00/0000:00:1f.0/iTCO_wdt.0.auto
lrwxrwxrwx 1 root root 0 Apr 10 10:17 microcode -> ../../../devices/platform/microcode
lrwxrwxrwx 1 root root 0 Apr 10 10:17 pcspkr -> ../../../devices/platform/pcspkr
lrwxrwxrwx 1 root root 0 Apr 10 10:17 PNP0103:00 -> ../../../devices/platform/PNP0103:00
lrwxrwxrwx 1 root root 0 Apr 10 10:17 PNP0C0C:00 -> ../../../devices/platform/PNP0C0C:00
lrwxrwxrwx 1 root root 0 Apr 10 10:17 PNP0C0E:00 -> ../../../devices/platform/PNP0C0E:00
lrwxrwxrwx 1 root root 0 Apr 10 10:17 serial8250 -> ../../../devices/platform/serial8250

root@hankin:~# ls -l /sys/devices/pci0000\:00/0000\:00\:1d.0/usb1/1-1/1-1.4/1-1.4\:1.3/driver
lrwxrwxrwx 1 root root 0 Apr 10 11:04 /sys/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.3/driver -> ../../../../../../../bus/usb/drivers/snd-usb-audio
root@hankin:~# ls -l /sys/devices/pci0000\:00/0000\:00\:1d.0/usb1/1-1/1-1.4/1-1.4\:1.2/driver
lrwxrwxrwx 1 root root 0 Apr 10 10:14 /sys/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.2/driver -> ../../../../../../../bus/usb/drivers/snd-usb-audio
root@hankin:~# ls -l /sys/devices/pci0000\:00/0000\:00\:1d.0/usb1/1-1/1-1.4/1-1.4\:1.1/driver
lrwxrwxrwx 1 root root 0 Apr 10 11:03 /sys/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.1/driver -> ../../../../../../../bus/usb/drivers/uvcvideo
root@hankin:~# ls -l /sys/devices/pci0000\:00/0000\:00\:1d.0/usb1/1-1/1-1.4/1-1.4\:1.0/driver
lrwxrwxrwx 1 root root 0 Apr 10 10:57 /sys/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.0/driver -> ../../../../../../../bus/usb/drivers/uvcvideo
root@hankin:~# ls -l /sys/devices/pci0000\:00/0000\:00\:1d.0/usb1/1-1/1-1.4/1-1.4\:1.0/driver/
total 0
lrwxrwxrwx 1 root root    0 Apr 10 11:04 1-1.4:1.0 -> ../../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.0
lrwxrwxrwx 1 root root    0 Apr 10 11:04 1-1.4:1.1 -> ../../../../devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.4/1-1.4:1.1
--w------- 1 root root 4096 Apr 10 11:04 bind
lrwxrwxrwx 1 root root    0 Apr 10 11:04 module -> ../../../../module/uvcvideo
-rw-r--r-- 1 root root 4096 Apr 10 11:04 new_id
-rw-r--r-- 1 root root 4096 Apr 10 11:04 remove_id
--w------- 1 root root 4096 Apr 10 11:04 uevent
--w------- 1 root root 4096 Apr 10 11:04 unbind

root@hankin:~# lspci
00:00.0 Host bridge: Intel Corporation Atom Processor Z36xxx/Z37xxx Series SoC Transaction Register (rev 11)
00:02.0 VGA compatible controller: Intel Corporation Atom Processor Z36xxx/Z37xxx Series Graphics & Display (rev 11)
00:13.0 SATA controller: Intel Corporation Device 0f23 (rev 11)
00:1a.0 Encryption controller: Intel Corporation Atom Processor Z36xxx/Z37xxx Series Trusted Execution Engine (rev 11)
00:1b.0 Audio device: Intel Corporation Atom Processor Z36xxx/Z37xxx Series High Definition Audio Controller (rev 11)
00:1c.0 PCI bridge: Intel Corporation Device 0f48 (rev 11)
00:1c.1 PCI bridge: Intel Corporation Device 0f4a (rev 11)
00:1c.2 PCI bridge: Intel Corporation Device 0f4c (rev 11)
00:1c.3 PCI bridge: Intel Corporation Device 0f4e (rev 11)
00:1d.0 USB controller: Intel Corporation Atom Processor Z36xxx/Z37xxx Series USB EHCI (rev 11)
00:1f.0 ISA bridge: Intel Corporation Atom Processor Z36xxx/Z37xxx Series Power Control Unit (rev 11)
00:1f.3 SMBus: Intel Corporation Device 0f12 (rev 11)
04:00.0 Ethernet controller: Realtek Semiconductor Co., Ltd. RTL8111/8168/8411 PCI Express Gigabit Ethernet Controller (rev 15)

root@hankin:~# lsmod | grep dwc
dwc2                  159744  0
udc_core               20480  1 dwc2
usbcore               233472  12 uas,asix,dwc2,snd_usb_audio,uvcvideo,usb_storage,snd_usbmidi_lib,ehci_hcd,ehci_pci,usbhid,usbnet
usb_common             16384  3 dwc2,udc_core,usbcore

```

## 3、usbiptool命令
usbiptool是一个用于管理USB/IP设备的命令行工具。USB/IP是一种将USB设备通过网络共享的技术，可以让多台计算机共享同一个USB设备，从而实现USB设备的远程访问。

usbiptool可以用于列出当前可用的USB/IP设备、连接到指定的USB/IP设备、断开与USB/IP设备的连接等操作。它还支持将USB/IP设备映射到本地计算机上，使得本地计算机可以像使用本地USB设备一样使用USB/IP设备。

usbiptool是一个开源工具，可以在Linux和Windows等操作系统上使用。它的使用方法比较简单，可以通过命令行参数来指定需要执行的操作和相关的参数。如果您需要使用USB/IP设备进行远程访问，可以考虑使用usbiptool来管理USB/IP设备。

## 4、gzip: /proc/config.gz: No such file or directory
如果在Linux系统中执行 zcat /proc/config.gz 命令时出现 "No such file or directory" 错误，可能是因为您的系统没有启用内核配置文件功能。在某些Linux发行版中，默认情况下不启用内核配置文件功能，因此需要手动启用。

要启用内核配置文件功能，需要重新编译内核驱动开启。

## 5、dwc2编译
a. 下载Linux内核源代码，并解压缩到一个目录中。
b. 进入内核源代码目录，并使用以下命令打开内核配置界面：
```
make menuconfig
```
c. 在内核配置界面中，找到“Device Drivers” -> “USB support” -> “USB Gadget Support” -> “DesignWare USB2 DRD Controller”选项，并将其设置为“M”或“Y”。
d. 保存配置并退出内核配置界面。
e. 使用以下命令编译内核：
```
make
```
f. 安装新内核并重启系统。

有一点注意，可能已经生成了.config文件，直接修改.config文件即可。


## 6、无法打开内核配置界面
如果您无法打开内核配置界面，也可以尝试使用其他工具来修改内核配置文件。以下是一些常用的工具：

make config：这是最基本的内核配置工具，它会在终端中逐个询问每个选项，并根据您的回答来生成配置文件。这种方法比较繁琐，但是可以确保您了解每个选项的含义和影响。

make oldconfig：这个工具可以使用已有的配置文件来更新新版本的内核配置文件。它会在终端中显示每个新选项的默认值，并根据您的回答来更新配置文件。这种方法比较快捷，但是需要有一个已有的配置文件。

make xconfig或make gconfig：这些工具可以打开图形化的内核配置界面，让您可以方便地浏览和修改各个选项。make xconfig使用X Window系统，而make gconfig使用GTK+图形库。这种方法比较直观和易用，但是需要有图形界面的支持。

make menuconfig：这个工具可以在终端中打开一个类似于文本菜单的界面，让您可以方便地浏览和修改各个选项。这种方法比较直观和易用，而且不需要图形界面的支持。

以上工具都可以通过在Linux内核源代码树的顶层目录中运行相应的命令来启动。例如，要使用make menuconfig工具，可以在终端中输入以下命令：

make menuconfig
需要注意的是，修改内核配置文件需要谨慎操作，因为错误的配置可能会导致系统无法启动或者出现其他问题。在进行修改之前，建议先备份原始的配置文件，并仔细阅读内核文档和相关的配置说明。

## 7、DWC2 Mode Selection
一个USB DWC2控制器的模式选择菜单，用于选择USB DWC2控制器的工作模式。USB DWC2控制器可以工作在三种不同的模式下：

Host only mode (USB_DWC2_HOST)：在此模式下，USB DWC2控制器将作为USB主机来控制连接到系统的USB设备。
Gadget only mode (USB_DWC2_PERIPHERAL)：在此模式下，USB DWC2控制器将作为USB从设备来连接到USB主机。
Dual Role mode (USB_DWC2_DUAL_ROLE)：在此模式下，USB DWC2控制器可以同时作为USB主机和USB从设备来连接到其他USB设备。

在上述菜单中，星号(*)表示当前选择的模式，而箭头(>)表示可以选择的其他模式。如果您想要使用Dual Role模式，则需要启用USB Gadget支持，并选择USB_DWC2_DUAL_ROLE模式。如果您只需要作为USB主机或USB从设备来连接到其他USB设备，则可以选择相应的模式。

















