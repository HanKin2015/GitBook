# pyusb

## 1、认识pyusb

### 1-1、usb.core.NoBackendError: No backend available
https://blog.csdn.net/yuanli_best/article/details/85321631

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

## 3、使用PyUSB获取字符串描述符usb.util.get_string()
按照网上的教程一直报错：NotImplementedError: Operation not supported or unimplemented on this platform

https://blog.csdn.net/weixin_42967006/article/details/108755972

### 3-1、Error Accessing String
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









