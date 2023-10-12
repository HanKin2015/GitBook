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







