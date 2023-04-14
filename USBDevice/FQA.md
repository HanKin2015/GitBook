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

## 6、PDO是什么
供电数据对象（Power Data Object, PDO）
也可能是属性数据对象（Property Data Object, PDO）
最有可能是属性设备对象（Property Device Object, PDO）

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





