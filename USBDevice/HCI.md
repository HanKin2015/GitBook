# HCI

## 1、人机交互 （工业设计专业术语）
人机交互、人机互动（英文：Human–Computer Interaction或Human–Machine Interaction，简称HCI或HMI），是一门研究系统与用户之间的交互关系的学问。系统可以是各种各样的机器，也可以是计算机化的系统和软件。人机交互界面通常是指用户可见的部分。用户通过人机交互界面与系统交流，并进行操作。小如收音机的播放按键，大至飞机上的仪表板，或发电厂的控制室。人机交互界面的设计要包含用户对系统的理解（即心智模型），那是为了系统的可用性或者用户友好性。

## 2、HCI （主机控制接口(Host Controller Interface)）
HCI，即主机控制接口，属于蓝牙协议栈的一部分。

## 3、xHCI host controller not responding, assume dead
```
[四 3月 10 15:04:39 2022] usb 3-2: USB disconnect, device number 2
[四 3月 10 20:21:49 2022] usb 4-1: Disable of device-initiated U1 failed.
[四 3月 10 20:21:54 2022] usb 4-1: Disable of device-initiated U2 failed.
[四 3月 10 20:22:04 2022] xhci_hcd 0000:00:14.0: Abort failed to stop command ring: -110
[四 3月 10 20:22:04 2022] xhci_hcd 0000:00:14.0: xHCI host controller not responding, assume dead
[四 3月 10 20:22:04 2022] xhci_hcd 0000:00:14.0: HC died; cleaning up
[四 3月 10 20:22:04 2022] xhci_hcd 0000:00:14.0: Timeout while waiting for setup device command
[四 3月 10 20:22:04 2022] usb 4-1: USB disconnect, device number 0
[四 3月 10 20:22:05 2022] usb 4-1: device not accepting address 2, error -22

卸载主控日志：
[五 3月 11 10:00:03 2022] xhci_hcd 0000:00:14.0: remove, state 1
[五 3月 11 10:00:03 2022] usb usb4: USB disconnect, device number 1
[五 3月 11 10:00:03 2022] xhci_hcd 0000:00:14.0: USB bus 4 deregistered
[五 3月 11 10:00:03 2022] xhci_hcd 0000:00:14.0: remove, state 4
[五 3月 11 10:00:03 2022] usb usb3: USB disconnect, device number 1
[五 3月 11 10:00:03 2022] xhci_hcd 0000:00:14.0: USB bus 3 deregistered

挂载主控日志：
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: xHCI Host Controller
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus number 3
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: hcc params 0x200077c1 hci version 0x100 quirks 0x0000000000009810
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: cache line size of 64 is not supported
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: xHCI Host Controller
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: new USB bus registered, assigned bus number 4
[五 3月 11 10:01:05 2022] xhci_hcd 0000:00:14.0: Host supports USB 3.0 SuperSpeed
[五 3月 11 10:01:05 2022] usb usb3: New USB device found, idVendor=1d6b, idProduct=0002, bcdDevice= 5.04
[五 3月 11 10:01:05 2022] usb usb3: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[五 3月 11 10:01:05 2022] usb usb3: Product: xHCI Host Controller
[五 3月 11 10:01:05 2022] usb usb3: Manufacturer: Linux 5.4.0-96-generic xhci-hcd
[五 3月 11 10:01:05 2022] usb usb3: SerialNumber: 0000:00:14.0
[五 3月 11 10:01:05 2022] hub 3-0:1.0: USB hub found
[五 3月 11 10:01:05 2022] hub 3-0:1.0: 10 ports detected
[五 3月 11 10:01:05 2022] usb usb4: New USB device found, idVendor=1d6b, idProduct=0003, bcdDevice= 5.04
[五 3月 11 10:01:05 2022] usb usb4: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[五 3月 11 10:01:05 2022] usb usb4: Product: xHCI Host Controller
[五 3月 11 10:01:05 2022] usb usb4: Manufacturer: Linux 5.4.0-96-generic xhci-hcd
[五 3月 11 10:01:05 2022] usb usb4: SerialNumber: 0000:00:14.0
[五 3月 11 10:01:05 2022] hub 4-0:1.0: USB hub found
[五 3月 11 10:01:05 2022] hub 4-0:1.0: 2 ports detected
```


ubuntu的xhci主控挂掉恢复方式：
```
echo -n "0000:00:14.0" | tee /sys/bus/pci/drivers/xhci_hcd/unbind
sleep 5
echo -n "0000:00:14.0" | tee /sys/bus/pci/drivers/xhci_hcd/bind
```
这个文件unbind和bind，并且其中所有的文件看出只有写入权限，无读取权限。
将pci地址写入unbind就是卸载，写入bind就是挂载。

pci地址可以：lspci
还可以：/sys/bus/pci/devices
还可以：/sys/devices/pci0000:00
还可以：/sys/bus/usb/devices/
```
[root@ubuntu0006:/sys/bus/pci/drivers/ehci-pci] #ll
总用量 0
drwxr-xr-x  2 root root    0 4月  28 15:53 ./
drwxr-xr-x 24 root root    0 4月  28 15:53 ../
lrwxrwxrwx  1 root root    0 4月  28 17:28 0000:00:19.7 -> ../../../../devices/pci0000:00/0000:00:19.7/
lrwxrwxrwx  1 root root    0 4月  28 17:28 0000:00:1a.7 -> ../../../../devices/pci0000:00/0000:00:1a.7/
--w-------  1 root root 4096 4月  28 17:28 bind
--w-------  1 root root 4096 4月  28 17:28 new_id
--w-------  1 root root 4096 4月  28 17:28 remove_id
--w-------  1 root root 4096 4月   9 09:05 uevent
--w-------  1 root root 4096 4月  28 17:28 unbind
```
可以看见上面文件夹中是有pci地址对应的文件夹，这种方法靠谱。

有些硬件不是pci，而是Platform，相对应地址是/sys/bus/pci/drivers/ehci-pci

## 4、一次查询USB设备无法使用的经历
dmesg命令查看日志基本上为空，都是一些无用的日志
vi /var/log/dmesg能看见正常的日志，但是确实没有USB的映射日志
cat /sys/kernel/debug/usb/devices | grep Vendor但是能看见USB设备，很奇怪
ll /sys/bus/pci/devices/看USB设备路径
ll /sys/bus/usb/devices/看USB设备路径
关键一点是lsusb不能使用
journalctl终于看见完整的日志内容，刚刚dmesg的内容就是journalctl命令尾部内容。看见USB加载的内核日志。
基本确认有USB设备，由于是U盘，就可以看容量大小，是否挂载。
mount
fdisk -l
果然看见U盘，但是没有挂载，手动挂载一下搞定。mount /dev/loop /media/xx。









