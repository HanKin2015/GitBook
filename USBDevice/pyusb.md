# pyusb

## 1、认识pyusb

### 1-1、usb.core.NoBackendError: No backend available
https://blog.csdn.net/yuanli_best/article/details/85321631
这个错误通常是由于PyUSB库无法找到可用的USB后端驱动程序，导致无法访问USB设备。解决这个问题的方法是安装并配置正确的USB后端驱动程序。

在Windows系统中，PyUSB库默认使用libusb-win32作为USB后端驱动程序。你可以从libusb-win32的官方网站（https://sourceforge.net/projects/libusb-win32/files/libusb-win32-releases/）下载最新版本的驱动程序，并按照安装说明进行安装。安装完成后，PyUSB库应该能够自动识别并使用libusb-win32驱动程序。

如果你使用的是Linux或Mac系统，PyUSB库默认使用系统自带的USB后端驱动程序。你需要确保系统已经正确安装了相应的驱动程序，并且当前用户有访问USB设备的权限。你可以尝试使用sudo命令以管理员权限运行Python程序，或者将当前用户添加到dialout或usb组中，以获取访问USB设备的权限。

另外，你也可以尝试使用其他的USB后端驱动程序，如libusb或OpenUSB。你可以在PyUSB库的官方文档中查找相关的安装和配置说明。

pyusb需要libusb。
已下载：D:\Github\Storage\python\udev\U盘自动拷贝\libusb
示例：D:\Github\Storage\python\udev\U盘自动拷贝\get_udev_info.py

### 1-2、AttributeError: module 'usb' has no attribute 'backend'
```
import usb

backend = usb.backend.libusb0.get_backend()
print(backend)
```
瞎搞，乱试无果。
AttributeError: module 'usb.util' has no attribute 'backend'
AttributeError: module 'usb.core' has no attribute 'backend'

第三方库路径：C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py

发现有个文件夹backend，里面存在libusb0.py文件。

```
import usb.backend.libusb0

backend = usb.backend.libusb0.get_backend()
print(backend)
```

### 1-3、libusb需要指定寻找路径，否则会去系统目录C:/WINDOWS/SYSTEM32 或者 Python27//Scripts 或者 系统环境变量目录底下找

C:\Users\Administrator\Anaconda3\Lib\site-packages\usb\backend\libusb0.py
文件中get_backend()函数写明：如果没有lib库，就调用_load_library()函数。
_load_library()函数需要使用到入参find_library。

所以此处需要一个自定义的find_library()函数作为参数传入,注意，find_library是个函数！返回值是dll的完整路径。

```
def find_library(libname):
    libname += '.dll'
    path = None
    osVersion = platform.machine()
    if osVersion.upper() == 'x86'.upper():
        libname = os.getcwd() + '\\libusb\\x86\\' + libname
    elif osVersion.upper() == 'amd64'.upper():
        libname = os.getcwd() + '\\libusb\\amd64\\' + libname
    elif osVersion.upper() == 'ia64'.upper():
        libname = os.getcwd() + '\\libusb\\ia64\\' + libname
    
    print('libname: ', libname)
    
    if os.path.exists(libname):
        print('find dll:', libname)
        path = libname
    
    return path
```
然后运行结果是：None。

```
这里是回调函数，不使用是不进去的
backend = usb.backend.libusb0.get_backend(find_library=find_library)
print(backend)
usb.core.find(find_all=True, backend=backend)
```
由于没有导入库，程序出错，然后被find函数给捕获异常后，导致我前端看不出错误出现在哪里。。。
直接调用find_library函数就可以看见具体的报错。

python执行成功了，但是编译出来的exe运行失败。

## 2、windows上面使用pyusb有坑
当年踩过坑的路过，反正我是不在windows下用pyusb玩了，我是搞不定了。 我现在的解决方案： 1、在windows下：使用pywinusb库，不过貌似只支持HID设备 2、在Linux（只在ubuntu和raspberry pi 的wheezy）上测试过，使用pyusb。（记得用root）。 其中的USB部分供参考： http://git.oschina.net/jakey.chen/SlaveDebugTool

https://sourceforge.net/projects/libusb/files/libusb-1.0/libusb-1.0.20/libusb-1.0.20.7z/download
https://sourceforge.net/projects/libusb.mirror/files/v1.0.26/v1.0.26_%20libusb%201.0.26.zip/download

我正在尝试从USB设备读取数据。为此，我使用的是PyUSB，它引发了多个问题。
### 2-1、错误
使用libusb-win32，找不到设备。在发现它的支持有限之后，我切换到了libusb1
使用libusb1，可以找到一些设备，但是会引发错误 NotImplementedError: Operation not supported or unimplemented on this platform

### 2-2、建立
```
import usb.core
import usb.util

# find the USB device
for device in usb.core.find(find_all=True):
    print(device)
```
使用lbusb0.dll找不到设备，使用libusb-1.0.dll找到设备，但是打印设备会报错：
```
Traceback (most recent call last):
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 758, in __str__
    for configuration in self:
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 1140, in __iter__
    yield Configuration(self, i)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 607, in __init__
    configuration
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\backend\libusb1.py", line 775, in get_configurati
    config, byref(cfg)))
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\backend\libusb1.py", line 604, in _check
    raise USBError(_strerror(ret), ret, _libusb_errno[ret])
usb.core.USBError: [Errno 2] Entity not found

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "get_udev_mount_time.py", line 118, in <module>
    debug()
  File "get_udev_mount_time.py", line 95, in debug
    print(dev)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 762, in __str__
    configuration = self.get_active_configuration()
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 921, in get_active_configuration
    return self._ctx.get_active_configuration(self)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 113, in wrapper
    return f(self, *args, **kwargs)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 249, in get_active_configuration
    self.managed_open()
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 113, in wrapper
    return f(self, *args, **kwargs)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\core.py", line 131, in managed_open
    self.handle = self.backend.open_device(self.dev)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\backend\libusb1.py", line 804, in open_device
    return _DeviceHandle(dev)
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\backend\libusb1.py", line 652, in __init__
    _check(_lib.libusb_open(self.devid, byref(self.handle)))
  File "C:\Users\Administrator\Anaconda3\lib\site-packages\usb\backend\libusb1.py", line 600, in _check
    raise NotImplementedError(_strerror(ret))
NotImplementedError: Operation not supported or unimplemented on this platform
```
测试发现，就算使用inf-wizard.exe程序安装了指定设备驱动后还是这样。后来发现，主控是没法打印的，后面修改成U盘设备后正常打印出USB设备信息。
解决方案：去掉8086的vid设备。

### 2-3、难道在Windows+python+libusb-win32不能进行获取usb设备吗？
Python可以获取USB设备描述符信息。可以使用PyUSB库来实现这个功能。
在PyUSB库中，可以使用usb.core.find()方法来查找USB设备，并使用usb.util.find_descriptor()方法来查找设备的配置信息。
PyUSB库可以识别USB 3.0设备。PyUSB库支持使用libusb 1.0作为USB后端驱动程序，而libusb 1.0已经支持USB 3.0设备。

在使用PyUSB库时，你需要确保安装了支持USB 3.0设备的libusb 1.0驱动程序，并且使用正确的USB后端驱动程序来初始化PyUSB库。你可以在PyUSB库的官方文档中查找相关的安装和配置说明。

另外，需要注意的是，USB 3.0设备通常需要使用USB 3.0接口才能发挥其最大的传输速度。如果你的计算机没有USB 3.0接口，你可以考虑使用USB 3.0扩展卡或其他外部设备来扩展USB 3.0接口。

libusb-win32驱动程序可以识别USB 3.0设备。libusb-win32是一个开源的USB后端驱动程序，它支持USB 1.1、USB 2.0和USB 3.0设备，并且可以在Windows系统中使用。

在使用libusb-win32驱动程序时，你需要确保安装了最新版本的驱动程序，并且使用正确的驱动程序来初始化PyUSB库。你可以从libusb-win32的官方网站（https://sourceforge.net/projects/libusb-win32/files/libusb-win32-releases/）下载最新版本的驱动程序，并按照安装说明进行安装。

需要注意的是，USB 3.0设备通常需要使用USB 3.0接口才能发挥其最大的传输速度。如果你的计算机没有USB 3.0接口，你可以考虑使用USB 3.0扩展卡或其他外部设备来扩展USB 3.0接口。

讨论：https://stackoverflow.com/questions/13773132/pyusb-on-windows-no-backend-available

发现libusb-win32可能还需要借助libusbK-inf-wizard.exe软件，太麻烦，还是pip install libusb吧，安装生成libusb-1.0.dll文件。

### 2-4、这里给了一个合理的解释
如果您可以通过 libusb-1.0.dll 获取到 USB 设备，但是无法通过 libusb0.dll 获取到 USB 设备，可能是因为您的 USB 设备需要使用 libusb-1.0.dll 或其他驱动程序来正常工作，而不是 libusb0.dll。
libusb0.dll 和 libusb-1.0.dll 都是用于 USB 设备通信的库文件，但它们之间存在一些区别。例如，libusb0.dll 是基于 Windows usbser.sys 驱动程序的，而 libusb-1.0.dll 则是独立的跨平台实现。因此，某些 USB 设备可能需要使用 libusb-1.0.dll 或其他驱动程序来正常工作，而不是 libusb0.dll。

## 3、使用PyUSB获取字符串描述符usb.util.get_string()

### 3-1、平台不支持
按照网上的教程一直报错：NotImplementedError: Operation not supported or unimplemented on this platform

https://blog.csdn.net/weixin_42967006/article/details/108755972

这个问题需要为设备安装WinUSB驱动，点击下面的链接下载Zadig，这是一个Windows平台上专门用于安装USB相关驱动的小软件，下载后可直接运行。
https://udomain.dl.sourceforge.net/project/libusb-win32/libusb-win32-releases/1.2.6.0/libusb-win32-bin-1.2.6.0.zip

软件界面如下图所示，如果当前插入的USB设备都已经安装了驱动（我们常用的键鼠、U盘等都是自动安装了驱动的），这里的设备选择栏里就会没有设备，因为现在显示的是没有安装驱动的USB设备。

点击Option，勾选List All Devices，就可以看到当前所有USB设备，选择想要操作的设备，驱动选择栏选择WinUSB，点击Install Driver即可安装驱动。
！！！注意：更改设备驱动将会导致该设备原来的功能不能使用，所以这里请谨慎操作，最好选择没用的设备或自己开发的USB设备进行测试。

我这边使用这个软件把U盘替换成WinUSB驱动之后，字符串描述符显示正常了。

### 3-2、usb.util.get_string()获取失败，显示乱码
后来发现，是网上的版本低了，这个函数只需要使用2个参数，而不是3个，即可获取正确的字符串描述符。

## 4、使用usb.busses获取设备
报错：USBError: [Errno 2] Entity not found

使用 libusb0 驱动程序 (Windows 10)，我们在Stack Overflow上找到一个类似的问题： https://stackoverflow.com/questions/46458303/。
尴尬的地方在于是不报错了，但是干脆连设备都获取不到了。

结论：行不通，不能使用这种方法获取。

## 5、向设备写数据
https://blog.csdn.net/u011011827/article/details/119208668

### 5-1、usb.core.USBTimeoutError: [Errno 10060] Operation timed out
换一个USB口看看是否能解决，我遇到这个问题的时候USB设备插在一个USB扩展器上，直接插到电脑的USB口上就不会报错了。

## 6、dev.set_configuration()函数
usb.core.USBError: [Errno 19] No such device (it may have been disconnected)
原因可能是：https://github.com/pyusb/pyusb/issues/348

这不重要。

## 7、pyusb和pyudev区别
pyusb 和 pyudev 都是 Python 中用于操作 USB 设备的库，但它们的功能和使用方式有所不同。

pyusb 是一个纯 Python 实现的 USB 库，可以用于在 Python 中访问 USB 设备。它提供了一组简单的 API，用于枚举 USB 设备、发送和接收 USB 控制传输请求、读写 USB 端点等操作。pyusb 支持 Python 2.x 和 Python 3.x 版本，并且可以在 Windows、Linux、Mac OS X 等操作系统上运行。

pyudev 是一个基于 libudev 的 Python 库，用于监控和管理 Linux 系统中的设备。它提供了一组 API，用于枚举系统中的设备、获取设备的属性、监控设备的插拔事件等操作。pyudev 只能在 Linux 系统上运行，并且需要安装 libudev 库。

虽然 pyusb 和 pyudev 的功能有所重叠，但它们的使用场景和目的不同。如果你需要在 Python 中访问 USB 设备的底层信息，例如设备描述符、端点描述符等，可以使用 pyusb 库。如果你需要在 Linux 系统中监控和管理设备，例如自动挂载 USB 存储设备、自动配置网络接口等，可以使用 pyudev 库。







