# windows驱动编程

## 1、英语翻译
interact：互动;相互作用;交流;相互影响;沟通;合作
intend：打算;计划;想要;意指
visual: 视力的;视觉的
universal：普遍的;全体的;全世界的;共同的;普遍存在的;广泛适用的
KMDF: Kernel-Mode Driver Framwork
UMDF: User-Mode Driver Framwork

## 2、WdfUsbTargetDeviceRetrieveConfigDescriptor function (wdfusb.h)
The WdfUsbTargetDeviceRetrieveConfigDescriptor method retrieves the USB configuration descriptor for the USB device that is associated with a specified framework USB device object.

Minimum KMDF version	1.11
Minimum UMDF version	2.0

Retrieve：检索;取回;检索操作;重新得到;收回

associated：
adj.
有关联的;相关的;有联系的;(用于联合企业的名称)联合的
v.
联想;联系;交往;(尤指)混在一起;表明支持;表示同意

specify：具体说明;明确规定;详述;详列
special：特殊的

Remarks：
n.
谈论;言论;评述;引人注目;显耀
v.
说起;谈论;评论

## 3、WdfUsbTargetDeviceCreate function (wdfusb.h)
The WdfUsbTargetDeviceCreate method creates a framework USB device object for a specified framework device object and opens the USB device for I/O operations.

Note  If you are building your driver using KMDF 1.11 or UMDF 2.0, or later, we recommend that you call WdfUsbTargetDeviceCreateWithParameters instead of WdfUsbTargetDeviceCreate.

## 4、windows10 驱动开发环境 VS2019+WDK10
https://blog.csdn.net/newnewman80/article/details/90754999

### 4-1、环境准备
SDK可以在vs2019中在线下载，即创建新项目-》安装多个工具和功能-》使用C++的桌面开发 右侧就有Windows 10 SDK下载。
WDK需要单独下载安装：https://docs.microsoft.com/zh-cn/windows-hardware/drivers/download-the-wdk

### 4-2、vs2015实战
创建新项目-》Visual C++-》Windows Driver-》WDF-》KMDF empty
项目属性中：Driver Settings-》General-》可以指定运行平台或操作系统

在source files中新建cpp文件，复制示例代码，编译报错找不到ntddk.h头文件
在vcxproj属性 – > C/C++ – >一般 – >附加包含目录增加：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\

编译找不到excpt.h头文件，使用everything软件查找：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\crt\excpt.h

特别注意一下配置和平台与编译环境相对应，不同项会有不同的结果。

编译找不到ctype.h头文件：
C:\Program Files (x86)\Windows Kits\10\Include\10.0.19041.0\ucrt\
C:\Program Files (x86)\Windows Kits\10\Include\10.0.14393.0\km\crt\ctype.h
写错地方了。。。。，结果报错：

C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\include\vcruntime.h
C:\Program Files (x86)\Windows Kits\10\Include\10.0.19041.0\ucrt\corecrt.h

最终还是败给了一直在依赖一个不存在的lib文件。
查看了所有环境变量，path,set命令，都没有发现依赖。
最终在属性-》链接器-》命令行中找到，链接器中的输入可以进行修改，在依赖附加项，右下角宏中找到了环境变量$(DDK_INC_PATH)和$(DDK_LIB_PATH)。
但是无法怎么百度google都无法进行修改删除。

最终选择了卸载相应版本的SDK，发现果然没有了，然后再安装了相同版本的SDK，结果又出现了，开始的路径不是需要的，后面编译成功后变成了正确的。因此，这个是跟SDK有关。

P.S.：确保将SDK 10与WDK 10一起安装.
P.P.S：没有SDK你将得到无法打开包含文件：’ntdef.h’错误

#### Windows平台的SDK、DDK与WDK
尽管Windows平台的SDK、DDK与WDK都包含了WinDBG工具包，但是用户获取WinDBG工具包的最主要方式还是从微软网站自由下载，因为这样获得的版本最新。

最近尝试去了解WINDOWS下的驱动开发，现在总结一下最近看到的资料。

##### 1、区别
首先，先从基础的东西说起，开发WINDOWS下的驱动程序，需要一个专门的开发包，如：开发JAVA程序，我们可能需要一个JDK，开发WINDOWS应用程序，我们需要WINDOWS的SDK，现在开发WINDOWS下的驱动程序，我们需要一个DDK/WDK。

简单说明：
	SDK 软件开发工具
	DDK 驱动开发工具
	WDK windows驱动开发工具

##### 2、DDK（Driver Developer Kit）和WDK（Windows Driver Kit）的区别：

　　这个要说说驱动相关的一些历史：

　　1).95/98/ME下，驱动模型为：Vxd，相关资料可以看《编程高手箴言》的前几个章节，里面有很详细的介绍，虽然这个东西已经过时，但大概看看还是会增长见识的。

　　2).2000/XP/2003下，Windows采用WDM驱动模型（Windows Driver Model），开发2000/XP/2003的驱动开发包为：DDK。

　　3).Vista及以后版本，采用了WDF驱动模型（Windows Driver Foudation），对应的开发包：WDK。

其实WDK可以看做是DDK的升级版本，现在一般的WDK是包含以前DDK相关的功能，现在XP下也可以用WDK开发驱动，WDK能编译出2000-2008的各种驱动。

##### 3、驱动文件扩展名
Vxd驱动文件扩展名为：.vxd
WDM和WDF驱动文件扩展名为：.sys。

### 4-3、编写第一个驱动程序代码
```
#include <ntddk.h>
#include <wdf.h>
DRIVER_INITIALIZE DriverEntry;
EVT_WDF_DRIVER_DEVICE_ADD KmdfHelloWorldEvtDeviceAdd;
 
NTSTATUS 
DriverEntry(
    _In_ PDRIVER_OBJECT     DriverObject, 
    _In_ PUNICODE_STRING    RegistryPath
)
{
    // NTSTATUS variable to record success or failure
    NTSTATUS status = STATUS_SUCCESS;
 
    // Allocate the driver configuration object
    WDF_DRIVER_CONFIG config;
 
    // Print "Hello World" for DriverEntry
    KdPrintEx(( DPFLTR_IHVDRIVER_ID, DPFLTR_INFO_LEVEL, "KmdfHelloWorld: DriverEntry\n" ));
 
    // Initialize the driver configuration object to register the
    // entry point for the EvtDeviceAdd callback, KmdfHelloWorldEvtDeviceAdd
    WDF_DRIVER_CONFIG_INIT(&config, 
                           KmdfHelloWorldEvtDeviceAdd
                           );
 
    // Finally, create the driver object
    status = WdfDriverCreate(DriverObject, 
                             RegistryPath, 
                             WDF_NO_OBJECT_ATTRIBUTES, 
                             &config, 
                             WDF_NO_HANDLE
                             );
    return status;
}
 
NTSTATUS 
KmdfHelloWorldEvtDeviceAdd(
    _In_    WDFDRIVER       Driver, 
    _Inout_ PWDFDEVICE_INIT DeviceInit
)
{
    // We're not using the driver object,
    // so we need to mark it as unreferenced
    UNREFERENCED_PARAMETER(Driver);
 
    NTSTATUS status;
 
    // Allocate the device object
    WDFDEVICE hDevice;    
 
    // Print "Hello World"
    KdPrintEx(( DPFLTR_IHVDRIVER_ID, DPFLTR_INFO_LEVEL, "KmdfHelloWorld: KmdfHelloWorldEvtDeviceAdd\n" ));
 
    // Create the device object
    status = WdfDeviceCreate(&DeviceInit, 
                             WDF_NO_OBJECT_ATTRIBUTES,
                             &hDevice
                             );
    return status;
}
```

### 4-4、LNK2019 无法解析的外部符号 DriverEntry，该符号在函数 FxDriverEntryWorker 中被引用
原因：驱动函数一般采用__stdcall约定
解决方案：函数定义前加extern “C”说明
```
extern "C" DRIVER_INITIALIZE DriverEntry;
extern "C" EVT_WDF_DRIVER_DEVICE_ADD KmdfHelloWorldEvtDeviceAdd;
```
评论区有说明：源码是.c文件，不然编不过。
我的是cpp文件，因此需要extern "C"说明。

#### __stdcall
被这个关键字修饰的函数，其参数都是从右向左通过堆栈传递的(__fastcall 的前面部分由ecx,edx传)， 函数调用在返回前要由被调用者清理堆栈。
这个关键字主要见于Microsoft Visual C、C++。GNU的C、C++是另外一种修饰方式：__attribute__((stdcall))

### 4-5、编译成功
Successfully signed: d:\users\user\my document\visual studio 2015\Projects\StudyKMDF\Debug\StudyKMDF\studykmdf.cat

KmdfHelloWorld.sys - 内核模式驱动程序文件
KmdfHelloWorld.inf - 在安装驱动程序时 Windows 使用的信息文件
KmdfHelloWorld.cat - 安装程序验证驱动程序的测试签名所使用的目录文件

右键点击inf进行安装驱动。

安装错误：试图将驱动程序添加到存储区时遇到问题。（可能是版本不对，编译了一个x86版本，系统是x64版本）
Successfully signed: d:\users\user\my document\visual studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\studykmdf.cat
还是不行。。。。


然后我给sys和cat文件都进行了签名，然后然后就能正常安装了。（但是还是不会调试）

### 4-6、运行驱动
https://blog.csdn.net/appleisred/article/details/4334026?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-5.pc_relevant_paycolumn_v2&spm=1001.2101.3001.4242.4&utm_relevant_index=8

我们需要把这个驱动程序加载到操作系统中。最简单的加载办法是通过写注册表。这里有个.reg的文件，帮助修改注册表，也可以手动来修改。hello.reg如下：
``` 
REGEDIT4
[HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/hello]

"ErrorControl"=dword:00000001

#
# When to start the driver:
# At boot: Start=1
# Manually: Start=3
#
"Start"=dword:00000001

"Type"=dword:00000001
```
把我们编译好的hello.sys拷贝到系统的驱动程序目录下C:/WINDOWS/system32/drivers，然后重新启动操作系统，这个驱动就可以在启动的时候被加载了。要看到Hello World!可以按照debugview这个软件，这是简单好用的驱动调试工具，它可以显示DbgPrint打印出来的log。要选择debugview的capture菜单里面的log boot，可以buffer操作系统boot的时候的log。

重启之后可以从debugview里面看到log。

另一个方法：
https://blog.csdn.net/qinmi/article/details/1656536
```
REGEDIT4

[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\hello]

#"ImagePath"="system32\\drivers\\StudyKMDF.sys"
"ImagePath"=hex(2):73,00,79,00,73,00,74,00,65,00,6d,00,33,00,32,00,5c,00,64,00,72,00,\
  69,00,76,00,65,00,72,00,73,00,5c,00,53,00,74,00,75,00,64,00,79,00,4b,00,4d,\
  00,44,00,46,00,2e,00,73,00,79,00,73,00,00,00

"DisplayName"="hejian"

"ErrorControl"=dword:00000001

#
# When to start the driver:
# At boot: Start=1
# Manually: Start=3
#
"Start"=dword:00000003

"Type"=dword:00000001

```
将驱动拷贝到system32\\drivers\\目录下，重启电脑。可能出现无法捕捉KdPrint函数，使用另一个注册脚本。
https://bbs.pediy.com/thread-246454.htm
```
Windows Registry Editor Version 5.00
 
[HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Control/Session Manager/Debug Print Filter] 
DEFAULT=dword:ffffffff

```
这是就需要一个工具来观察驱动运行的结果，工具叫：Dbgview.exe
首先打开Dbgview.exe，然后运行cmd进入命令行，运行 net start hello，这时在Dbgview.exe中可以看到helloWorld。(注意管理员运行)

### 4-7、点击Capture中的Log Boot出现could not install debugview driver
https://blog.csdn.net/qq_40353000/article/details/106434758

C:\Windows\System32\drivers\dbgv.sys
重命名即可。

## 5、WDF驱动开发（1）- 一个简单的WDF驱动(non-pnp)
https://blog.csdn.net/zj510/article/details/16983863

什么是pnp？？？

WDF驱动其实是微软公司提供的一套驱动开发的框架。有了这个框架之后，开发驱动会简单一些。WDF本身是从WDM基础上封装而成的。WDF里面封装了很多对象，如WDFDRIVER等。如果要学习使用WDF来开发驱动，个人感觉还是需要WDM的一些基础，不然很多东西挺难理解的。

### 













