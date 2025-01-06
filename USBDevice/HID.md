# HID设备

## 1、手写板和手写屏
它们的共同处：都是老师的“黑板”，学生的“答题纸”
不同处，通俗理解，板是一块板子，屏是一个屏幕。
除此，在手写板上书写批注的时候，眼睛得不时的看着电脑屏幕，而手写屏是一块屏幕，电脑屏上的所有内容都会同步投射在手写屏上，书写批注时，手眼合一，更便捷当然手写屏如此便利，其价格比手写板高。

## 2、键盘的虚拟按键
详情见：D:\Github\Storage\windows\README.md

工具：spy++、inputhook、rawinputtool

### 2-1、spy++的使用
https://learn.microsoft.com/zh-cn/visualstudio/debugger/introducing-spy-increment?view=vs-2022
- Find Window->长按拖动选中要捕获的窗口，Show选项框中勾选Messages
- 在消息内容框右键，Logging Options过滤要捕获的消息类型：Keyboard和Pen/IME
- 在菜单栏Messages中Save to File保存内容

## 3、usbkey
注意：usbkey好多组件可能需要依赖微软运行库。
上海华申：http://www.hsic.cn/

## 4、Ukey安全管控系统
NetworkUSB（RPUSI NETUSB Controller）：https://www.remoteusb.com/3

发现此驱动无法在虚拟机内部安装成功，报错：系统资源不够，无法完成API。
IDA逆向分析USBRDCtrl.sys驱动文件，通过错误码C000009A找到代码位置，发现代码中试图申请一个名为\\Device\\USBFDO-X的设备，X的范围是0-9，失败就返回C000009A。而通过DeviceTree或者WinObj软件发现虚拟机内部usbuhci、usbehci、usbxhci已经使用了0-10的\\Device\\USBFDO-X的设备地址，因此该驱动无法正常安装。
DeviceTree：https://www.itmop.com/downinfo/367076.html
WinObj：https://learn.microsoft.com/zh-cn/sysinternals/downloads/winobj

## 5、BitLocker
BitLocker 是 Windows 提供的磁盘加密功能，它可以使用 USB 密钥（UKey）作为解锁密钥的一种方式。


