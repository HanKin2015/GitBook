# 鼠标键盘事件

## 1、键盘失效
注意大小写：export DISPLAY=:0

```
  513  xev
  514  xev -h
  515  xev -display :0
  516  xev -display :0
  517  ls
  518  ls /dev/input/
  519  ls /dev/input/by-path/
  520  ls /dev/input/by-path/ -l
  521  lsusb -t
  522  cat /dev/input/by-path/pci-0000:00:14.0-usb-0:4.3:1.0-event-kbd
  523  ls
  524  cd /var
  525  ls
  526  cd log
  527  ls
  528  tail Xorg.0.log
  529* tail Xorg.0.log 1000
  530  tail -f Xorg.0.log -n 1000
  531  lsof
  532  ls /dev/input/event9
  533  ls /dev/input/event9
  534  tail -f Xorg.0.log -n 1000
  535  history
```

键盘有数据，内核能收到，发现是xev有问题。
```
[  6070.660] (**) SEM USB Keyboard: always reports core events
[  6070.660] (**) evdev: SEM USB Keyboard: Device: "/dev/input/event9"
[  6070.660] (WW) evdev: SEM USB Keyboard: device file is duplicate. Ignoring.
[  6070.676] (EE) PreInit returned 8 for "SEM USB Keyboard"
[  6070.676] (II) UnloadModule: "evdev"
[  6070.677] (II) config/udev: Adding input device SEM USB Keyboard (/dev/input/event10)
[  6070.677] (**) SEM USB Keyboard: Applying InputClass "evdev keyboard catchall"
```

call的参数位置也是固定的，位置如下：
ebp+4是返回到
ebp+8是参数1
ebp+c 是参数2
ebp +10 参数3
总结是 ebp+ 8是第一个参数，之后每次+4，按照十六进制表示。

## 2、系统检测命令工具
安卓 : getevent
linux: xev

evtest和evtest_sw不清楚命令的来源，但是能进行键盘输入的监控。但是sw应该是申威架构的版本。
```
[root@ubuntu0006:/media/hankin/vdb/study] #readelf evtest_sw -h
ELF 头：
  Magic：   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          0
  类型:                              EXEC (可执行文件)
  系统架构:                          <unknown>: 0x9906
  版本:                              0x1
  入口点地址：               0x120000f70
  程序头起点：          64 (bytes into file)
  Start of section headers:          44640 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         8
  节头大小：         64 (字节)
  节头数量：         35
  字符串表索引节头： 32
[root@ubuntu0006:/media/hankin/vdb/study] #ldd evtest_sw
        不是动态可执行文件
```
按键监控说明：
如果有键盘按键会有如下打印：
Type为EV_KEY那行， KEY_S， 代表S健，
 value 为0代表按键释放
 value为1代表被按下
 value为2代表按键一直按着没有释放。

## 3、HID用法
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/hid/hid-usages

键鼠一定是：0x01	通用桌面控件	HID_USAGE_PAGE_GENERIC

0x02	鼠标	HID_USAGE_GENERIC_MOUSE
0x07	键盘	HID_USAGE_GENERIC_KEYPAD

虽然大部分鼠标是单个Usage，但是部分鼠标会有多个Usage，因此不能增加判断限制。
```
HIDP_DEVICE_DESC hidp;
for (i = 0; i < hidp.CollectionDescLength; i++) {
    pCollection = hidp.CollectionDesc + i;
    if (NULL != pCollection){
        LINFO("[usbc]collection usagePage:0x%04x usage:0x%04x.",pCollection->UsagePage,pCollection->Usage);
        if (pCollection->UsagePage == HID_USAGE_PAGE_GENERIC){
            //单Usage鼠标，即视为本地设备
            if (pCollection->Usage == HID_USAGE_GENERIC_MOUSE && hidp.CollectionDescLength == 1){
                LINFO("[usbc]device vid:0x%04x pid:0x%04x is local mouse.",pDeviceInfo->idVendor,pDeviceInfo->idProduct);
                pDeviceInfo->IsLocal = TRUE;
                break;
            }
            //Usage含有键盘功能，即视为本地设备
            else if (pCollection->Usage == HID_USAGE_GENERIC_KEYBOARD){
                LINFO("[usbc]device vid:0x%04x pid:0x%04x is local keyboard.",pDeviceInfo->idVendor,pDeviceInfo->idProduct);
                pDeviceInfo->IsLocal = TRUE;
                break;
            }
        }
    }
}
```

## 4、键鼠失灵2
```
dmesg -wT           有拔插日志
xev -display :0     有键盘消息

内核发现：
[1647182.798795] xhci_hcd 0000:00:14.0: WARN Event TRB for slot 24 ep 8 with no TDs queued?
[1647182.800870] xhci_hcd 0000:00:14.0: WARN Event TRB for slot 24 ep 8 with no TDs queued?
[1647182.802104] xhci_hcd 0000:00:14.0: WARN Event TRB for slot 24 ep 8 with no TDs queued?
[1647182.803005] xhci_hcd 0000:00:14.0: WARN Event TRB for slot 24 ep 8 with no TDs queued?
[1647182.803998] xhci_hcd 0000:00:14.0: WARN Event TRB for slot 24 ep 8 with no TDs queued?

tail -f /var/log/Xorg.0.log -n 1000             原来是wacom设备导致的，手写笔能操作鼠标，但是鼠标无法操作
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
(EE) Wacom Intuos3 6x8 Pen cursor: Error reading wacom device : No such device
```

## 5、python存在多个键鼠库
https://blog.csdn.net/caimengxin/article/details/123307605


搜索了一半天，并没有发现pynput和pyautogui的区别，可能就是pynput多一个热键吗功能，即快捷键。
https://zhuanlan.zhihu.com/p/133096887
https://www.jianshu.com/p/acbd6f25b3ea
https://blog.csdn.net/Fandes_F/article/details/103226341
https://www.cnblogs.com/tobe-goodlearner/p/tutorial-pynput.html


## 6、触摸屏内核不上报触摸事件
只有安卓8.1系统无法使用，使用安卓4.2系统是正常的。但是如果登录虚拟机后屏幕自动映射，然后再退出来触摸也是正常的。
发现cat /sys/kernel/debug/hid/0003\:AAEC\:C021.0010/events存在数据，但是使用getevent却没有数据。

最后通过，首先缩小相关的文件范围hid-multitouch.c，然后对比内核代码提交commit，找到两个版本之间的修改差异，最终：
参考Linux源代码内核修改https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git/commit/drivers/hid/hid-multitouch.c?h=v4.14.316&id=b897f6db3ae2cd9a42377f8b1865450f34ceff0e
```
HID: multitouch: do not retrieve all reports for all devices
We already have in place a quirk for Windows 8 devices, but it looks
like the Surface Cover are not conforming to it.
Given that we are only interested in 3 feature reports (the ones that
the Windows driver retrieves), we should be safe to unconditionally apply
the quirk to everybody.
In case there is an issue with a controller, we can always mark it as such
in the transport driver, and hid-multitouch won't try to retrieve the
feature report.
```

## 7、鼠标出现像6节那样的问题
- 更换其他鼠标是使用正常的
- 键盘能正常使用
- 鼠标灯是亮着的，内核也正常显示鼠标插入
- 现象是鼠标无法使用
- 使用xev命令没有任何鼠标信息
- 抓取usb数据包也没有任何数据包
```
root@hankin:/sys/kernel/debug/hid# cat /proc/bus/input/devices
I: Bus=0003 Vendor=093a Product=2532 Version=0111
N: Name="PixArt Gaming Mouse"
P: Phys=usb-0000:00:1d.0-1.3.2/input0
S: Sysfs=/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.2/1-1.3.2:1.0/0003:093A:2532.002F/input/input62
U: Uniq=
H: Handlers=mouse0 event12
B: PROP=0
B: EV=17
B: KEY=1f0000 0 0 0 0
B: REL=103
B: MSC=10

I: Bus=0003 Vendor=093a Product=2532 Version=0111
N: Name="PixArt Gaming Mouse"
P: Phys=usb-0000:00:1d.0-1.3.2/input1
S: Sysfs=/devices/pci0000:00/0000:00:1d.0/usb1/1-1/1-1.3/1-1.3.2/1-1.3.2:1.1/0003:093A:2532.0030/input/input63
U: Uniq=
H: Handlers=kbd event13
B: PROP=0
B: EV=10001f
B: KEY=3007f 0 0 483ffff17aff32d bf54444600000000 1 130f938b17c007 ffff7bfad9415fff febeffdfffefffff fffffffffffffffe
B: REL=40
B: ABS=100000000
B: MSC=10
鼠标和键盘都会看见两个input设备，一般选择第一个input即可，第一个input才会存在事件消息。

root@hankin:/sys/kernel/debug/hid# ls
0003:093A:2532.002F  0003:093A:2532.0030  0003:1A2C:2124.002D  0003:1A2C:2124.002E
root@hankin:/sys/kernel/debug/hid# cat 0003\:093A\:2532.002F/events

root@hankin:/sys/kernel/debug/hid# cat 0003\:1A2C\:2124.002D/events

report (size 8) (unnumbered) =  00 00 62 00 00 00 00 00
Keyboard.00e0 = 0
Keyboard.00e1 = 0
Keyboard.00e2 = 0
Keyboard.00e3 = 0
Keyboard.00e4 = 0
Keyboard.00e5 = 0
Keyboard.00e6 = 0
Keyboard.00e7 = 0
Keyboard.0062 = 1

report (size 8) (unnumbered) =  00 00 00 00 00 00 00 00
Keyboard.00e0 = 0
Keyboard.00e1 = 0
Keyboard.00e2 = 0
Keyboard.00e3 = 0
Keyboard.00e4 = 0
Keyboard.00e5 = 0
Keyboard.00e6 = 0
Keyboard.00e7 = 0
Keyboard.0062 = 0

root@hankin:/sys/kernel/debug/hid# cat /dev/input/event10
▒1e▒▒▒1e▒▒%▒1e▒▒▒1eo▒▒1eo▒%▒1eo▒
root@hankin:/sys/kernel/debug/hid# cat /dev/input/event12
▒1etM
        ▒1etM
▒1etM
▒1e▒
        ▒1e▒
▒1e▒

root@hankin:~# export DISPLAY=:0
root@hankin:~# xinput list
⎡ Virtual core pointer                          id=2    [master pointer  (3)]
⎜   ↳ Virtual core XTEST pointer                id=4    [slave  pointer  (2)]
⎜   ↳ SEM USB Keyboard                          id=11   [slave  pointer  (2)]
⎜   ↳ PixArt Gaming Mouse                       id=12   [slave  pointer  (2)]
⎜   ↳ PixArt Gaming Mouse                       id=13   [slave  pointer  (2)]
⎣ Virtual core keyboard                         id=3    [master keyboard (2)]
    ↳ Virtual core XTEST keyboard               id=5    [slave  keyboard (3)]
    ↳ Power Button                              id=6    [slave  keyboard (3)]
    ↳ Video Bus                                 id=7    [slave  keyboard (3)]
    ↳ Power Button                              id=8    [slave  keyboard (3)]
    ↳ Sleep Button                              id=9    [slave  keyboard (3)]
    ↳ SEM USB Keyboard                          id=10   [slave  keyboard (3)]
```
测试发现/sys/kernel/debug/hid下没有任何事件，但是在/dev/input/event下是存在事件消息的。

```
root@hankin:/sys/kernel/debug/hid# lsusb -t
/:  Bus 01.Port 1: Dev 1, Class=root_hub, Driver=ehci-pci/8p, 480M
    |__ Port 1: Dev 2, If 0, Class=Hub, Driver=hub/4p, 480M
        |__ Port 3: Dev 4, If 0, Class=Hub, Driver=hub/4p, 480M
            |__ Port 1: Dev 17, If 0, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 1: Dev 17, If 1, Class=Human Interface Device, Driver=usbhid, 1.5M
            |__ Port 2: Dev 16, If 0, Class=Human Interface Device, Driver=usbhid, 12M
            |__ Port 2: Dev 16, If 1, Class=Human Interface Device, Driver=usbhid, 12M
root@hankin:/sys/kernel/debug/hid# lsusb
Bus 001 Device 016: ID 093a:2532 Pixart Imaging, Inc.
Bus 001 Device 017: ID 1a2c:2124 China Resource Semico Co., Ltd
Bus 001 Device 004: ID 0bda:5411 Realtek Semiconductor Corp.
Bus 001 Device 002: ID 8087:07e6 Intel Corp.
Bus 001 Device 001: ID 1d6b:0002 Linux Foundation 2.0 root hub
```
最新结论，多次测试发现跟我使用了同品牌的键鼠有关，当前终端由于是一个主控，因此只要同时插入这同品牌的键鼠，第二个插入的设备就会使用不了，鼠标是灯亮，但是没有usb数据包，键盘灯不亮，但是有usb数据包。
再拿了一个同品牌的鼠标测试是相同效果，如果插两个同品牌的鼠标，两者现象一样，要么都能用，要么都不能用。
使用其他品牌的鼠标，插入当前品牌的键盘，也是都能使用。
鼠标和U盘同时插入，都能使用。
现象很奇怪，终端并没有做任何重启操作，前一天正常使用，第二天一来使用就出现了这个问题。重启终端即可恢复。

## 8、dumpkeys命令
dumpkeys 是一个 Linux 命令，用于显示当前系统上键盘映射的信息。它可以显示键盘的按键和功能键的映射关系，以及其他与键盘相关的设置。

以下是 dumpkeys 命令的基本用法：

dumpkeys [选项]
常用的选项包括：

-f <文件> 或 --file=<文件>：指定要使用的键盘映射文件，默认为 /dev/tty。
-1 或 --one-column：以单列模式显示键盘映射。
-2 或 --two-columns：以双列模式显示键盘映射。
-3 或 --three-columns：以三列模式显示键盘映射。
-k 或 --keys-only：仅显示按键的映射，不显示注释和其他信息。
例如，要显示当前系统上键盘映射的详细信息，可以运行以下命令：

dumpkeys
如果你只想查看按键的映射，可以使用 -k 选项：

dumpkeys -l
请注意，dumpkeys 命令通常需要以 root 或者具有适当权限的用户身份运行，以便访问键盘映射文件。具体的命令和输出可能因你使用的 Linux 发行版和键盘配置而有所不同。

## 9、dumpsys命令
dumpsys 是一个 Android 平台上的命令，用于获取系统服务的信息和状态。它可以提供有关各种系统组件和应用程序的详细信息，包括进程、内存、网络、传感器、电池、窗口管理等。

以下是 dumpsys 命令的基本用法：

adb shell dumpsys [选项] [服务名]
其中，adb shell 是用于在连接的 Android 设备上执行命令的前缀。[选项] 是可选的，用于指定不同的输出格式或过滤条件。[服务名] 是可选的，用于指定要获取信息的特定系统服务。

一些常用的选项包括：

-l：列出所有可用的系统服务。
-c：清除缓存并强制重新获取最新的信息。
-a：获取所有可用服务的信息。
-s：按服务名进行过滤，只获取指定服务的信息。
例如，要获取所有可用系统服务的信息，可以运行以下命令：

adb shell dumpsys -a
如果你只想获取特定服务的信息，可以指定服务名，例如：

adb shell dumpsys activity
请注意，dumpsys 命令通常需要在开发者模式下或者具有适当权限的用户身份运行。具体的命令和输出可能因你使用的 Android 设备和系统版本而有所不同。

可以通过dumpsys input查看输入设备。
