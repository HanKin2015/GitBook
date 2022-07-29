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






