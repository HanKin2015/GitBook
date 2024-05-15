# 常见问题解答

## 1、Windows 无法加载这个硬件的设备驱动程序。驱动程序可能已损坏或不见了。39代码
参考：https://beikeit.com/post-334.html

问题现象：USB主控器出现感叹号，无法使用，重启物理机无用。

进入注册表计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36fc9e60-c465-11cf-8056-444553540000}
删除Upperfilters和Lowerfilters 两项
重启计算机。搞定

[Windows “设备管理器”中的错误代码](https://zhuanlan.zhihu.com/p/364675188)

## 2、Iris Pro 电脑防蓝光软件 过滤蓝光保护眼睛
如果你有条件，给自己换个护眼显示器，如果配合Iris Pro，效果会更佳；如果你的情况不允许，那么，Iris Pro 也可以保护你的眼睛。
Iris Pro 是一款专业的防蓝光护眼软件，通过调整屏幕蓝光辐射量。Iris Pro比起那些业余的只能单纯让屏幕变黄来控制眼睛舒适度的软件来说，它的功能可以说是能满足你对显示器控制的所有想象。

## 3、windows下杀死关不掉的进程
cmd窗口跑脚本程序，然后跑死掉无法关闭，使用任务管理器的应用程序也不行。

最终：在详细信息中杀死conhost.exe进程解决，或者可以试试杀死cmd.exe试试。

## 4、文件资源管理器卡死
结果也会导致任务栏，桌面全面卡死，一直转圈圈。

打开任务管理器，杀死explorer.exe进程，然后新建任务explorer，结果出现多个explorer进程。
无奈最终还是处于卡死状态，只能重启物理机。

下次可以参考一下网上办法：
https://ask.zol.com.cn/x/5104928.html
https://blog.csdn.net/weixin_33843409/article/details/92609266

## 5、内核错误日志Process did not claim interface 0 before use
I would expect a directory called /usbfs and a file within it called usbfs.ko

You can look in /lib/modules/2.6.32-122/modules.dep
Search for usbfs and you should find what calls it, or is dependent on it if it is present

You could try moving the whole /usbfs sub dir somewhere else, cd ing to /lib/modules/2.6.32-122/ and running depmod -a to reset modules.dep
and then reboot and see if there is a complaint from the touch screen driver and whether it works.

Regards logrotate, this seems a pretty good guide
articles.slicehost.com/2010/6/30/underst...ate-on-ubuntu-part-1

You should be able to set the size not to exceed and a default hourly rotate with only 1 older copy being retained, which will cut down things a lot.
It is not ideal solution however, hopefully the driver removal and re-installation may do something

## 6、Windows系统中PDO是什么
供电数据对象（Power Data Object, PDO）
也可能是属性数据对象（Property Data Object, PDO）
最有可能是属性设备对象（Property Device Object, PDO）

驱动程序通常使用设备对象（PDO，Physical Device Object）来与设备进行交互。设备对象是操作系统内核中表示设备的数据结构，它包含有关设备的信息和操作方法。

在驱动程序中，通常会使用设备对象来执行与设备相关的操作，例如打开、关闭、读取和写入等。通过打开设备对象，驱动程序可以与设备进行通信并执行所需的操作。

因此，在驱动程序中，通常会使用设备对象来打开设备，而不是使用设备路径或设备名称。设备路径或设备名称通常是用户空间应用程序使用的标识符，用于与驱动程序进行通信，而驱动程序则使用设备对象来实际执行与设备的交互操作。

### 6-1、查看驱动程序的设备对象
使用调试工具：可以使用调试工具（如WinDbg、KD等）连接到目标系统，并通过调试工具的命令或脚本来查看驱动程序的设备对象。通过调试工具，可以检查设备对象的地址、属性和状态等信息。

阅读驱动程序源代码：如果有驱动程序的源代码，可以通过阅读源代码来查看驱动程序是如何创建和管理设备对象的。在源代码中，通常会有相关的设备对象创建、初始化和操作的代码。

使用系统工具：在Windows系统中，可以使用一些系统工具来查看设备对象的信息，例如Device Manager、DeviceTree等工具可以显示设备对象的层次结构和属性信息。

需要注意的是，查看驱动程序的设备对象通常需要一定的系统调试和驱动开发知识，同时需要谨慎操作以避免对系统造成不良影响。

实践通过DeviceTree软件确实能看见驱动的Device_Name，然后使用CreateFile(L"\\\\.\\commonUsb"打开对应的驱动设备程序。

## 7、USB3CV
官网：https://www.usb.org/documents?search=&category%5B0%5D=50&items_per_page=50
USB3CV_x64 tool：https://www.usb.org/document-library/usb3cvx64-tool

如果访问 USB 官方 网站，将找到一个名为 USBCV (USB 命令验证器 ) 的软件工具，其中有一部分名为 “ 第 9 章测试 ” 。这些测试可以证明您的枚举代码是否正确。在进行 USB 实验室测试时也要用到 USBCV 。 

USB 3 Command Verifier (USB3CV) is the official tool for USB 3 Hub and Device Framework testing. All USB 3.1 peripherals are required to pass the Device Framework tests in order to gain certification. The USB3CV tool includes the xHCI Compliance Drivers for use with the USB3CV. In order to use USB3CV, User Account Control (UAC) must be turned off. If you are running on 64-bit Windows, you must install the 64-bit CV.

参考：https://blog.csdn.net/weixin_34005042/article/details/92173108
具体使用实战还未尝试过，后续有机会再探究。

## 8、中断设备中的bInterval值
```
root@hankin:~# cat /sys/kernel/debug/usb/devices

T:  Bus=01 Lev=03 Prnt=04 Port=02 Cnt=01 Dev#= 12 Spd=1.5  MxCh= 0
D:  Ver= 1.10 Cls=00(>ifc ) Sub=00 Prot=00 MxPS= 8 #Cfgs=  1
P:  Vendor=1a2c ProdID=2124 Rev= 1.10
S:  Manufacturer=SEM
S:  Product=USB Keyboard
C:* #Ifs= 2 Cfg#= 1 Atr=a0 MxPwr= 98mA
I:* If#= 0 Alt= 0 #EPs= 1 Cls=03(HID  ) Sub=01 Prot=01 Driver=usbfs
E:  Ad=81(I) Atr=03(Int.) MxPS=   8 Ivl=10ms
I:* If#= 1 Alt= 0 #EPs= 1 Cls=03(HID  ) Sub=00 Prot=00 Driver=usbfs
E:  Ad=82(I) Atr=03(Int.) MxPS=   8 Ivl=10ms

root@hankin:~# lsusb -d 1a2c:2124 -v | grep bInterval
        bInterval              10
        bInterval              10
```
这里来看，换算单位就是1毫秒。

对于键盘设备，其换算单位通常与其他蓝牙设备相同。例如，键盘设备的连接间隔（connection interval）和中断包间隔（interrupt packet interval）的单位都是125微秒。此外，键盘设备还可能具有其他参数和特性，例如按键扫描间隔（key scan interval）、按键重复间隔（key repeat interval）等，这些参数的单位也可能是125微秒或其他单位。如果您需要查看具体设备的参数和单位信息，可以参考设备的规格说明书或数据手册，或者联系设备制造商的技术支持部门寻求帮助。

## 9、根据usbmon抓取的usb数据包来分析但是无法确定当前时间
```
ffffffc01552cc00 3842027380 C Zi:1:002:1 0:1:0:0 15 0:0:12 0:2688:12 0:5376:12 0:8064:12
```
根据时间戳无法计算，例如3842027380，USBmon模块抓取的数据包时间戳是以microseconds（微秒）为单位的。它表示了数据包捕获的时间，通常使用相对于系统启动时刻的时间差来表示时间戳。可以通过将时间戳值除以1000000来将其转换为秒数。因此就是3842秒，太小了，并且只能是10位数。

同理dmsg命令获取的时间戳是单位秒，是可以计算的。
dmesg 命令显示的时间戳是内核启动后经过的秒数（seconds since kernel boot）和纳秒数。可以使用以下方式将其转换为人类可读的日期时间格式：
- 获取系统启动时间，例如使用 uptime -s 命令。
- 使用这个启动时间减去 dmesg 中的时间戳中的秒数，得到内核启动前的日期时间。
- 将内核启动前的日期时间加上时间戳中的秒数和纳秒数，即可得到相应的日期时间。
脚本见：D:\Github\Storage\shell\calc_dmsg_time_stamp.sh

## 10、"上电"和"通电"的区别
在电气工程领域，"上电"和"通电"通常是指不同的概念。

"上电"通常指将电源连接到电路或设备上，使其准备好工作。这个过程包括将电源插头插入插座或打开电源开关等步骤。
"通电"则指将电流引入电路或设备中，使其开始工作。这个过程包括将电源开关打开或按下设备的电源按钮等步骤。

因此，"上电"和"通电"虽然有些相似，但它们并不是完全相同的概念。

## 11、这个设备（服务）的驱动程序已被禁用。另一个驱动程序可以提供这个功能。（代码32）
https://blog.csdn.net/weixin_51575203/article/details/130406151

修改注册表：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\USBSTOR
双击Start键值，弹出编辑DWORD（32位）值窗口，修改Start的数值，其中2代表自启动，3代表默认启动，4代表禁止启动，将数值改为2或者3，重启电脑后，插上U盘，可以正常访问U盘。

## 12、由于其配置信息(注册表中的)不完整或已损坏,Windows 无法启动这个硬件设备。 (代码19)
声卡设备：找到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4D36E96C-E325-11CE-BFC1-08002BE10318}UpperFilters里面数据删除 (鼠标双击可打开UpperFilters)
大容量存储设备：找到HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36fc9e60-c465-11cf-8056-444553540000}UpperFilters里面数据删除 (鼠标双击可打开UpperFilters)或者LowerFilters
可以通过设备管理器中的驱动程序详细信息看到加载了什么乱七八糟的驱动，一般就是这个驱动缺失导致的鬼。

## 13、RJ
RJ是Registered Jack（注册插孔）的英文缩写，是一种工业术语。
RJ是美国EIA（电子工业协会）、TIA（电信工业协会）确立的一种以太网连接器的接口标准。

https://baijiahao.baidu.com/s?id=1770002208323287497&wfr=spider&for=pc
https://baijiahao.baidu.com/s?id=1774263572605493856&wfr=spider&for=pc
RJ45是一种标准的物理连接接口，它代表"Registered Jack 45"。它是用于以太网（Ethernet）局域网连接中最常见的插座类型之一。
RJ45插座通常用于将计算机、交换机、路由器、网络存储设备等网络设备连接到局域网或广域网。它采用8P8C（八位置、八触点连接器）接线方式，具有8个针脚和8个金属联系点，每个针脚都有特定的功能。这些针脚用来传输和接收以太网数据信号，支持各种速率的以太网连接，包括10 Mbps、100 Mbps、1 Gbps和更高速率的千兆以太网（Gigabit Ethernet）。

RJ11代表"Registered Jack 11"，是一种标准的电话线连接接口。它通常用于传输模拟语音信号，包括电话通信、传真机、调制解调器等设备。
RJ11插座采用6P4C（六位置、四触点连接器）接线方式，具有6个针脚和4个金属联系点。其中，只有前两个针脚（2P2C）被广泛使用，用于传输语音信号。这两个针脚主要用于发送和接收电话信号，以及提供电源供应到电话设备中。

## 14、h264和h265区别
https://zhuanlan.zhihu.com/p/71270595

## 15、usbhid can't find input interrupt endpoint
https://unix.stackexchange.com/questions/116615/usbhid-cant-find-input-interrupt-endpoint
https://blog.51cto.com/u_15127533/4326262

最终发现这个错误并不影响设备的使用，无需关注。


USB中断传输是一种USB设备和主机之间的数据传输方式，用于传输具有时间敏感性的小型数据包。USB中断传输通常用于传输输入设备（如鼠标、键盘）的数据，以及需要定期更新的传感器数据等。

USB中断传输是双向的，既包括IN方向（设备到主机）也包括OUT方向（主机到设备）。在USB规范中，IN方向的中断传输通常用于设备向主机传输数据，例如鼠标的移动信息、键盘的按键信息等。OUT方向的中断传输则用于主机向设备发送控制命令或配置信息。

因此，USB中断传输是双向的，同时支持设备到主机和主机到设备的数据传输。这种特性使得USB中断传输非常适合于需要及时传输小型数据包的应用场景。

## 16、嵌入式设备Xilinx
https://blog.csdn.net/weixin_42837669/article/details/117000008

Xilinx Platform Cable USB II Driver dlc10_win7.7z
链接：https://pan.baidu.com/s/1HHuzZcSBgyDsukbrq-Httw
提取码：z2jl

Win7、Linux等系统下的驱动安装
参考UG344 - USB Cable Installation Guide
https://china.xilinx.com/search/site-keyword-search.html#q=UG344

## 17、海康威视摄像头中有个CDC serial设备在win7虚拟机上面异常
https://blog.csdn.net/zoomdy/article/details/102877153/
在设备管理器上面安装驱动程序文件usbser.inf即可。
```
;/*++
;
;Copyright (c) Microsoft Corporation.  All rights reserved.
;
;Module Name:
;    usbser.inf
;
;Abstract:
;    INF file for installing the USB Serial driver
;
;--*/

;*****************************************
; Version section
;*****************************************
[Version]
Signature   = "$WINDOWS NT$"
Class       = Ports
ClassGUID   = {4D36E978-E325-11CE-BFC1-08002BE10318}
Provider    = %MSFT%
PnpLockdown = 1
DriverVer = 06/21/2006,10.0.18362.1

[DestinationDirs]
DefaultDestDir = 12
UsbSerial_CopyFiles = 12

;[SourceDisksNames]
;3426 = windows cd

;[SourceDisksFiles]
;usbser.sys = 3426

[ControlFlags]
ExcludeFromSelect = *

;*****************************************
; Install Section
;*****************************************

[Manufacturer]
%MSFT% = Standard, NTamd64

[Standard.NTamd64]
%UsbSerial.DeviceDesc% = UsbSerial_Install, USB\Class_02&SubClass_02&Prot_01
%UsbSerial.DeviceDesc% = UsbSerial_Install, USB\Class_02&SubClass_02

; USB modem filter driver for use with Include/Needs only
%UsbSerialModem.DeviceDesc% = UsbSerial_ModemFilter_Install

[UsbSerial_Install.NT]
CopyFiles   = UsbSerial_CopyFiles
AddReg      = UsbSerial_AddReg
AddProperty = UsbSerial_AddProperty

; intentionally blank so that in future if we ever put anything in here
; it will get get picked up via Include/Needs
[UsbSerial_Install.NT.Hw]

[UsbSerial_CopyFiles]
usbser.sys,,,0x100

[UsbSerial_AddReg]
HKR,,PortSubClass,%REG_BINARY%,02
HKR,,EnumPropPages32,,"MsPorts.dll,SerialPortPropPageProvider"

[UsbSerial_AddProperty]
GenericDriverInstalled,,,,1

;*****************************************
; Service installation section
;*****************************************

[UsbSerial_Install.NT.Services]
AddService = usbser,0x00000002,UsbSerial_Service_Install, UsbSerial_EventLog_Install

[UsbSerial_Service_Install]
DisplayName   = %UsbSerial.DriverDesc%
ServiceType   = 1           ; SERVICE_KERNEL_DRIVER
StartType     = 3           ; SERVICE_DEMAND_START
ErrorControl  = 1           ; SERVICE_ERROR_NORMAL
ServiceBinary = %12%\usbser.sys

[UsbSerial_EventLog_Install]
AddReg=UsbSerial_EventLog_AddReg

[UsbSerial_EventLog_AddReg]
HKR,,EventMessageFile,0x00020000,"%%SystemRoot%%\System32\IoLogMsg.dll;%%SystemRoot%%\System32\Drivers\usbser.sys"
HKR,,TypesSupported,0x00010001,7

;***********************************************************
; Modem install section to install usbser as a lower filter
; (Include/Needs from modem INFs)
;***********************************************************

[UsbSerial_ModemFilter_Install]
CopyFiles=UsbSerial_CopyFiles 

[UsbSerial_ModemFilter_Install.Hw]
AddReg=UsbSerial_ModemFilter_AddReg

[UsbSerial_ModemFilter_AddReg]
HKR,,LowerFilters,%REG_MULTI_SZ%,"usbser"

[UsbSerial_ModemFilter_Install.Services]
AddService=usbser,,UsbSerial_Service_Install,UsbSerial_EventLog_Install

;*****************************************
; Strings section
;*****************************************

[Strings]
; localizable
MSFT                      = "Microsoft"
UsbSerial.DeviceDesc      = "USB Serial Device"
UsbSerialModem.DeviceDesc = "USB Serial Modem Device"
UsbSerial.DriverDesc      = "Microsoft USB Serial Driver"

; non-localizable
REG_BINARY   = 0x00000001
REG_MULTI_SZ = 0x00010000
```
