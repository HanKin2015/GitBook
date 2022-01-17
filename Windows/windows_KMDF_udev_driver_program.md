# Windows KWDF USB设备驱动编程

## 1、《WDF_USB驱动开发指南》下载
http://www.elecfans.com/soft/interface/2010/2010103093779.html

## 2、相关博客
https://blog.csdn.net/blog_index/article/details/5317798

个人感觉只能参考，不能跟着学习。

## 3、使用vs2015创建项目
新建项目-》Kernel Mode Driver, USB(KMDF)-》项目右键-》生成

### KMDFUSBDriver.inf(49-49): error 1285: Cannot specify [ClassInstall32] section for Microsoft-defined class.
https://stackoverflow.com/questions/35266426/umdf-cannot-specify-classinstall32-section-for-microsoft-defined-class

删除该文件中的定义编译通过。
```
[ClassInstall32]
AddReg = ClassInstall_AddReg
```

### WPP软件跟踪
默认模板使用WPP软件跟踪，但不是很清楚这个怎么使用。

软件跟踪预处理器 (WPP) 

https://docs.microsoft.com/zh-cn/windows-hardware/drivers/devtest/wpp-software-tracing

使用 WPP 软件跟踪记录消息类似于使用Windows日志记录服务。 驱动程序在日志文件中记录消息 ID 和未格式化的二进制数据。 随后，后处理器将日志文件中的信息转换为可读形式。 但是，WPP 软件跟踪支持的消息格式比事件日志记录服务支持的消息格式更灵活。 例如，WPP 软件跟踪内置了对 IP 地址、GUID、系统 ID、时间戳和其他有用数据类型的支持。 此外，用户可以添加与应用程序相关的自定义数据类型。

### 无法创建测试文件来调试
只能使用绑定服务的方式来安装，编写注册表脚本。
sys是否需要签名呢？？？确认不需要
```
REGEDIT4

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\KMDFUSBDriver]

# 这里不一定要可扩展字符串
"ImagePath"="system32\\drivers\\KMDFUSBDriver.sys"
#"ImagePath"=hex(2):73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,64,00,72,00,\
  69,00,76,00,65,00,72,00,73,00,5c,00,53,00,74,00,75,00,64,00,79,00,4b,00,4d,\
  00,44,00,46,00,2e,00,73,00,79,00,73,00,00,00

"DisplayName"="TestKMDFUSBDriver"

"ErrorControl"=dword:00000001

#
# When to start the driver:
# At boot: Start=1
# Manually: Start=3
#
"Start"=dword:00000003

"Type"=dword:00000001

```
重启电脑后执行启动服务：net start KMDFUSBDriver。
debugview打印驱动函数，其余地方没有打印，并且插入USB设备也没有任何日志。

想不出如何挂载到USB设备上面。看书？

## 4、尝试修改inf文件
修改完后无法安装，提示文件被修改，需要重新生成cat文件。
```
"C:\Program Files (x86)\Windows Kits\10\bin\x86\Inf2Cat.exe" /driver:"D:\Users\User\My Document\Visual Studio 2015\Projects\KMDFUSBDriver\x64\Debug\KMDFUSBDriver" /OS:xp_x86,7_x86,7_x64
```
重新生成后能安装。

## 5、


