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




