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

## 5、陷入瓶颈
Routine Description：例行程序说明
skeleton：骨骼;骨架;骨骼标本;骨瘦如柴的人(或动物);(建筑物等的)骨架，框架;梗概;最少人员，基干人员

插入USB设备没有任何函数调用。

解决：需要在注册表类中添加过滤项，inf文件不靠谱。
路径：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{36fc9e60-c465-11cf-8056-444553540000}
多字符串：UpperFilters：USBPcap

### error C4013: “WdfUsbTargetDeviceGetDeviceDescriptor”未定义；假设外部返回 int
增加头文件<wdfusb.h>

### C:\Program Files (x86)\Windows Kits\10\Include\wdf\kmdf\1.15\wdfusb.h(326): error C2061: 语法错误: 标识符“USBD_STATUS”
以为没有缺失定义，使用管理员权限修改头文件：typedef LONG USBD_STATUS;

结果。。。。继续报其他变量未定义：USBD_VERSION_INFORMATION structure (usb.h)

最后增加<usb.h>头文件搞定。

### 警告被视为错误 - 没有生成“object”文件
```
1>Driver.c(195): error C2220: 警告被视为错误 - 没有生成“object”文件
1>Driver.c(195): warning C4133: “函数”: 从“PDEVICE_OBJECT”到“WDFUSBDEVICE”的类型不兼容
1>Driver.c(204): warning C4133: “函数”: 从“PDEVICE_OBJECT”到“WDFUSBDEVICE”的类型不兼容
1>Driver.c(211): warning C4133: “函数”: 从“PDEVICE_OBJECT”到“WDFUSBDEVICE”的类型不兼容
```
我降低了警告等级，不应该出现这个错误，总不能继续降低吧。通过后面的错误修改可解决。

## 6、蓝屏了，需要调试驱动
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/gettingstarted/writing-a-very-small-kmdf--driver

是真的难上加难。

不是蓝屏就是卡在开机界面，发现不在注册表类中添加过滤项开机就没有问题，然后开机完成后再添加就没有问题，还能进行测试。

发现设备在插入的时候有日志，拔出的时候无法正常卸载，可能出现在卸载函数。

## 7、LNK2001 无法解析的外部符号 SDDL_DEVOBJ_SYS_ALL_ADM_RWX_WORLD_RW_RES_R
使用VS2015+WDK10 在学习windows WDF驱动时候，使用下面链接文章提供的代码编译后，得到错误：
LNK2001无法解析的外部符号 SDDL_DEVOBJ_SYS_ALL_ADM_RWX_WORLD_RW_RES_R
http://blog.csdn.net/zj510/article/details/16983863


解决方法：链接属性设置中增加
$(DDK_LIB_PATH)\wdmsec.lib

## 8、error LNK2019: 无法解析的外部符号 RtlUnicodeStringInitWorker，该符号在函数 RtlUnicodeStringInit 中被引用
百度不到答案，根据上面的方法，从csdn能找到相关函数的介绍。
https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/ntstrsafe/nf-ntstrsafe-rtlunicodestringinit
库：Ntstrsafe.lib

因此增加：$(DDK_LIB_PATH)\ntstrsafe.lib

## 9、无限蓝屏
DEVPKEY_Device_LowerFilters 设备属性表示为设备实例安装的低级筛选器驱动程序的服务名称列表。
"DEVPKEY_Device_UpperFilters"属性表示为设备实例安装的高级别筛选器驱动程序的服务名称列表。

曾经一个日志打印错误导致蓝屏，KdPrint(("%s", __LINE__));

后面将驱动放在win7系统上面也是一直蓝屏，在win10上面使用正常，但是。

后面才明白，驱动对版本要求极高，即单独需要win7x64,win7x86,win10x64,win10x86配置编译，并不通用。

## 10、error : The 'Universal' target platform is not supported by the target OS 'Windows7' (0x0601).
属性->Driver Settings->General->Target OS Version：从win10设置成win7报错。

通过修改Target Platform：从Universal设置成Desktop即可。

## 11、新的接口并不能在win7上面编译
https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/wdfusb/nf-wdfusb-wdfusbtargetdevicecreatewithparameters

先看看配置描述符具体是多少。

































