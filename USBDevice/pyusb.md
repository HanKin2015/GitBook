# pyusb

## 1、认识pyusb

### 1-1、usb.core.NoBackendError: No backend available
https://blog.csdn.net/yuanli_best/article/details/85321631

pyusb需要libusb。

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











