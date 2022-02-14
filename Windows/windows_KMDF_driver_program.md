# windows KWDF驱动编程

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

#### 划重点划重点划重点
将驱动拷贝到system32\\drivers\\目录下，重启电脑。可能出现无法捕捉KdPrint函数，使用另一个注册脚本。
https://bbs.pediy.com/thread-246454.htm
```
Windows Registry Editor Version 5.00
 
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Session Manager\Debug Print Filter]
@=dword:ffffffff
```
似乎还是不行。

这是就需要一个工具来观察驱动运行的结果，工具叫：Dbgview.exe
首先打开Dbgview.exe，然后运行cmd进入命令行，运行 net start hejian（DisplayName值），这时在Dbgview.exe中可以看到helloWorld。(注意管理员运行)

### 4-7、点击Capture中的Log Boot出现could not install debugview driver
https://blog.csdn.net/qq_40353000/article/details/106434758

C:\Windows\System32\drivers\dbgv.sys
重命名即可。


could not extract debugview driver to C:\Windows\System32\drivers\dbgv.sys: 另一个程序正在使用此文件，进程无法访问。
kernel debug output capture will be unavailable.

## 6、用于调试 WDF 驱动程序的注册表值
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/wdf/registry-values-for-debugging-kmdf-drivers

## 7、Windows调试工具
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/debugger/

## 8、官方教程
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/wdf/using-the-framework-to-develop-a-driver

Windows 驱动程序框架 (WDF) 驱动程序由基于框架的驱动程序所使用的Windows 驱动程序框架对象定义的DriverEntry 例程和一组事件回调函数组成。 回调函数调用框架导出的对象方法。 Windows 驱动程序工具包 (WDK) 包含演示如何实现驱动程序的事件回调函数的示例 WDF 驱动程序。 可以从Windows 开发人员中心硬件下载这些示例。

硬件。。。。。

创建 WDF 驱动程序时，通常会执行以下操作：

使用 框架驱动程序对象 来表示您的驱动程序。

驱动程序的 DriverEntry 例程 必须调用 WdfDriverCreate 以创建表示该驱动程序的框架驱动程序对象。 WdfDriverCreate方法还会注册驱动程序的EvtDriverDeviceAdd回调函数即插即用，该函数 (PnP) 管理器报告驱动程序支持的设备是否存在。

使用 框架设备对象 支持驱动程序中的 PnP 和电源管理。

所有驱动程序都必须调用 WdfDeviceCreate ，以便为驱动程序支持的每个设备创建框架设备对象。 设备可以是插入到计算机中的一片硬件，也可以是仅限软件的设备。 框架设备对象支持 PnP 和电源管理操作，驱动程序可以注册事件回调函数，以便在设备进入或离开其工作状态时通知驱动程序。

有关框架设备对象的详细信息，请参阅 在您的驱动程序中支持 PnP 和电源管理。

使用 框架队列对象 和 框架请求对象 来支持驱动程序中的 i/o 操作。

从应用程序或其他驱动程序接收读取、写入或设备 i/o 控制请求的所有驱动程序都必须调用 WdfIoQueueCreate ，以创建表示 i/o 队列的框架队列对象。 通常，驱动程序会为每个 i/o 队列注册一个或多个 请求处理程序 。 当 i/o 管理器向驱动程序发送 i/o 请求时，框架将为请求创建一个框架请求对象，将该请求对象放置在 i/o 队列中，并调用驱动程序的一个请求处理程序来通知驱动程序请求可用。 该驱动程序将获取 i/o 请求，并可以重新排队、完成、取消或转发该请求。

有关使用框架的队列对象和请求对象的详细信息，请参阅 框架队列对象 和 框架请求对象。

使用 框架中断对象 来处理设备中断。

处理设备中断的驱动程序必须调用 WdfInterruptCreate ，以便为每个中断创建框架中断对象并注册回调函数。 这些回调函数启用和禁用中断，并充当中断服务例程 (ISR) ，并为中断 (DPC) 延迟过程调用。

有关框架中断对象的详细信息，请参阅 处理硬件中断。

### WDF 体系结构
基于框架的驱动程序永远不会直接访问框架对象。 相反，驱动程序接收对象句柄，该对象句柄可以传递给对象的方法。

框架定义了多个基于框架的驱动程序使用的对象类型：

框架 驱动程序对象表示 每个驱动程序。

框架 设备对象 表示驱动程序支持的每个设备。

框架队列 对象表示接收设备的 I/O 请求的 I/O 队列。

框架请求 对象表示每个 I/O 队列接收的 I/O 请求。

### 编写简单的 WDF 驱动程序
在创建新的 KMDF 或 UMDF 驱动程序时，必须选择一个不多于 32 个字符的驱动程序名称。

WDF 驱动程序例程的 DriverEntry

entry：进入(指权利等);进入(指行动);参与，加入(指权利、机会);参赛作品;参赛;参赛人数;（词典等的）条目;登记;大门

DriverEntry 是加载驱动程序后调用的第一个驱动程序提供的例程。 它负责初始化驱动程序。


有示例：
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/wdf/driverentry-for-kmdf-drivers


### 例程
例程的作用类似于函数，但含义更为丰富一些。例程是某个系统对外提供的功能接口或服务的集合。比如操作系统的API、服务等就是例程；Delphi或C++Builder提供的标准函数和库函数等也是例程。我们编写一个DLL的时候，里面的输出函数就是这个DLL的例程。

可以这么简单地来理解：把一段相对独立的代码写成单独的一个模块就是函数的概念。我们可以在自己的程序中编写很多个函数，从而实现模块化编程。但这些模块或者说函数并不一定向外输出（即提供给别的程序使用），只用于当前这个程序里面。此时这些函数就仅仅具有独立函数的意义，但不是例程。

但如果我们把这些函数编写为DLL动态库的输出函数的话，此时虽然对于编写这个DLL的程序员来讲，仍然可以用函数的概念来理解这些DLL提供的功能，但对于以后调用这个DLL的程序来说，DLL里面提供的输出函数（或者说服务）就是例程了。因此“例程”的基本概念就包含了“例行事务性子程序”的含义，既然是例行的事务子程序，则必然通用性和相对独立性都比较强，所以很适合通过DLL、静态库（各种编程语言里面的库函数）、API、操作系统服务等方式来实现了。

## 9、WDF驱动开发（1）- 一个简单的WDF驱动(non-pnp)
https://blog.csdn.net/zj510/article/details/16983863

什么是pnp？？？即插即用 (PnP) 设备

WDF驱动其实是微软公司提供的一套驱动开发的框架。有了这个框架之后，开发驱动会简单一些。WDF本身是从WDM基础上封装而成的。WDF里面封装了很多对象，如WDFDRIVER等。如果要学习使用WDF来开发驱动，个人感觉还是需要WDM的一些基础，不然很多东西挺难理解的。

### 错误提示：error C2220: 警告被视为错误 - 没有生成“object”文件
错误原因：原因是该文件的代码页为英文，而我们系统中的代码页为中文。
或者把cpp文件重新保存为BGK编码格式。

属性-》c/c++-》常规-》警告等级-》从4改为3

注意配置选项要匹配，搞了半天以为vs出故障了。

### error LNK2001: unresolved external symbol _SDDL_DEVOBJ_SYS_ALL_ADM_RWX_WORLD_RW_RES_R
Right click on the project > Properties > Linker > All Options > Additional Dependencies

modify the default dependency:

>%(AdditionalDependencies);
to
>%(AdditionalDependencies);$(DDK_LIB_PATH)\wdmsec.lib

vs2015编译成功，但是使用DDK并没有编译成功，直接build报错。

### 安装调试运行
安装是重点，居然博主没有说。直接右键安装inf是不行的。（并且需要签名）
打开设备管理器-》操作-》添加过时硬件-》安装我手动从列表选择-》所有设备-》从磁盘安装-》复制驱动文件夹路径
报错：试图将驱动程序添加到存储区时遇到问题，需要签名cat文件才行。（本人使用company签名工具签名，签名之前需要命名cat后缀为cat.sys，签完名后还原）

https://blog.csdn.net/u012308586/article/details/91869023
这篇文章解决了我大部分问题：
- 运行exe文件时报缺少vcruntime140d.dll和ucrtbased.dll
	设置运行时库 - 将运行时库的版本从 DLL 版本更改为非 DLL 版本。如果没有此设置，则必须将 MSVC 运行时单独安装到目标计算机。
	属性-》c/c++-》代码生成-》运行库-》多线程调试Mtd
- 右键安装inf报错，驱动需要签名
	属性-》Dirver signing-》Test sign。之所以必须这样做，是因为 Windows 要求对驱动程序进行签名。（这个无法解决）
	bcdedit /set testsigning off
	bcdedit /set testsigning on
	需要开启和关闭win10系统的测试模式（重启电脑生效）
	
```
inf文件生成cat文件，提示inf文件不存在，难道是版本不对？？？
"C:\Program Files (x86)\Windows Kits\10\bin\x86\Inf2Cat.exe" /driver:"D:\Users\User\My Document\Visual Studio 2015\Projects\MyKMDF\x64\Debug\MyKMDF\MyKMDF.inf" /OS:xp_x86,7_x86,7_x64

并不是，后来仔细一想，会不会是文件夹名，改成文件夹名成功了。
"C:\WinDDK\7600.16385.0\bin\selfsign\Inf2Cat.exe" /driver:"D:\Users\User\My Document\Visual Studio 2015\Projects\MyKMDF\x64\Debug\MyKMDF" /OS:xp_x86,7_x86,7_x64
```

### 驱动程序签名工具
Microsoft Windows 驱动程序工具包 (WDK) 包括以下工具，可用于创建代码签名证书、对驱动程序包的目录文件进行签名，以及将签名嵌入驱动程序文件中：

CertMgr
Inf2Cat
MakeCat
MakeCert
Pvk2Pfx
SignTool

这些工具位于以下目录中：
Inf2Cat 工具位于 %WindowsSdkDir%\bin\x86 目录中。
其他工具位于 32 位 Windows 平台的目录中 (%WindowsSdkDir%\bin\x86) 和 64 位 Windows 平台 (%WindowsSdkDir%\bin\x64) 。
注意Visual Studio 环境变量 %WindowsSdkDir% 表示安装此版本 WDK 的 Windows kits 目录的路径，例如 C：\Program Files (x86) \Windows Kits\10。

```
"C:\Program Files (x86)\Windows Kits\10\bin\x64\signtool.exe" sign /v /ac "D:\Users\User\My Document\Visual Studio 2015\Projects\MyKMDF\x64\Debug\MyKMDF.cer" /s My /n "HanKin Inc." /t http://timestamp.digicert.com mykmdf.cat

"C:\Program Files (x86)\Windows Kits\10\bin\10.0.19041.0\x64\signtool.exe" sign /v /ac MSCV-VSClass3.cer /s My /n "MyCompany Inc." /t http://timestamp.digicert.com toaster.cat
```

指定时间戳服务器的 URL。 如果此选项不存在，则不会对签名的文件进行时间戳。 对于时间戳，签署的驱动程序包会无限期地保持有效，直到出于其他原因吊销 SPC 签名证书。

必须按照上述说明正确执行每个签名步骤，否则将无法对驱动程序进行签名。 可能会出现如下错误。
SignTool Error: No certificates were found that met all the given criteria

我太难了。没结果，还是老老实实使用测试签名吧。

### 测试模式
https://blog.csdn.net/Zhu_Zhu_2009/article/details/80040471?utm_source=blogxgwz9
```
win7
开启
bcdedit.exe -set TESTSIGNING ON
关闭
bcdedit -set TESTSIGNING OFF

win10（实践发现跟win7那样操作也可以）
开启
bcdedit -set loadoptions DDISABLE_INTEGRITY_CHECKS
bcdedit -set TESTSIGNING ON

关闭
bcdedit -set loadoptions ENABLE_INTEGRITY_CHECKS
bcdedit -set TESTSIGNING OFF
```
开启后桌面右下角会显示测试模式字样。
右键inf居然成功了一次，但也只是昙花一现，还是老老实实添加过时硬件。

### 测试运行
https://docs.microsoft.com/zh-cn/sysinternals/downloads/winobj
WinObj能看见设备，设备管理器也能Samples中看见设备。
打开debugview.exe，再使用test.exe程序就会调用并打印出日志。

### 证书安装
在驱动文件的上一层文件夹下有一个.cer后缀的文件，即证书，双击安装即可。
certmgr.msc在证书管理器查看，可能在个人下面，也可能在中间证书颁发机构。

但是没有什么作用。

## 10、驱动示例源码（最简介没有测试过）
```
#include<ntddk.h>
 
// 驱动卸载
VOID DDK_Unload(IN PDRIVER_OBJECT pDriverObject)
 {
 
    DbgPrint("驱动成功卸载...OK！");
 }
 
// 驱动入口
NTSTATUS DriverEntry(PDRIVER_OBJECT pDriverObject, PUNICODE_STRING reg_panth)
 {
    DbgPrint("驱动加载成功...Success！");
    pDriverObject->DriverUnload = DDK_Unload;
 
    return STATUS_SUCCESS;
}
```

## 11、WDF- 用户模式程序和驱动的数据交互
通常用户模式程序和驱动的数据交互有3种办法：buffer方式，direct方式和其他方式。

给WDF驱动增加一个功能：将WRITE请求的数据写入设备对象上下文，然后当READ请求过来的时候，将设备对象上下文里面的数据读出来并且返回给用户模式程序。

WdfRequestRetrieveInputBuffer和WdfRequestRetrieveOutputBuffer函数

WDF提供了2个函数，这2个函数可以获得请求的输入输出缓冲。READ请求只有OutputBuffer，WRITE请求只有InputBuffer. IO control请求同时拥有输入输出缓冲。

比如

char* in_buf = NULL;
WdfRequestRetrieveInputBuffer(Request, 10, &in_buf, NULL);
通过上面的代码，可以获得Request的输入请求，in_buf是一个指针，如果函数调用成功的话，那么in_buf将指向一个输入缓冲。in_buf指向一个内核模式下的地址。我们可以直接使用这个指针，比如读取或者写入数据。

如果是READ请求的话，上面的函数会失败，因为READ请求是没有输入缓冲的。如果是WRITE请求的话，那么就可以成功获取输入缓冲。

## 12、devcon.exe工具
```
D:\>"C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe" install "D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\StudyKMDF.inf" root\StudyKMDF
Device node created. Install is complete when drivers are installed...
Updating drivers for root\StudyKMDF from D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\StudyKMDF.inf.
devcon.exe failed.

D:\>"C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe" install "D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\StudyKMDF.inf" root\STUDYKMDF
Device node created. Install is complete when drivers are installed...
Updating drivers for root\STUDYKMDF from D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\StudyKMDF.inf.
devcon.exe failed.

D:\>"C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe" install "D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF" root\STUDYKMDF
devcon.exe failed.

D:\>"C:\Program Files (x86)\Windows Kits\10\Tools\x64\devcon.exe" install "D:\Users\User\My Document\Visual Studio 2015\Projects\StudyKMDF\x64\Debug\StudyKMDF\" root\STUDYKMDF
devcon.exe: Invalid use of install.
For more information, type: devcon.exe help install
```
## 13、WDF驱动开发（2）- CONTEXT和IO QUEUE
https://blog.csdn.net/zj510/article/details/16987349

有待开发，但言归正传，还是需要去写高拍仪驱动了。

## 14、过了一个年假后，驱动居然无法调试了
更换了机器，win10和win7物理机都试过，无法调试。
重命名为高拍仪驱动无法走到相应的逻辑，还是使用先前的demo进行测试。

测试发现无法测试，猜测到可能是win10系统需要签微软名，但是win7也不行啊。
进行测试模式调试再看看：不行

很奇怪，排除了LowerFilters和UpperFilters其他选项，还是不行。

Capture菜单下的Log Boot选择已经勾选。所有都已经勾选。

后面实在没有办法，使用手动启动服务，net start testKMDFUSBDriver，发现报错此驱动程序被阻止加载。
忽然之间才明白，我这个是64位系统，怎么能加载x86驱动呢。。。。。，关键是没有蓝屏，真是奇怪到家了。

为啥还犯这样的错，主要还是没有蓝屏，足足花了接近两个多小时。

教训：凡事需要考虑周全，就算亲自测试了，也是会有一些意外，不要抱侥幸心理。

使用x64进行编译后，debugview能正常显示日志了。

## 15、KdPrint和DbgPrint区别
```
KdPrint(("hejian [%s:%s:%d]\n", __FILE__, __FUNCTION__, __LINE__));
DbgPrint("hejian [%s:%s:%d]\n", __FILE__, __FUNCTION__, __LINE__);
DbgPrint(("hejian [%s:%s:%d]\n", __FILE__, __FUNCTION__, __LINE__));
KdPrint(("hejian\n"));
DbgPrint(("hejian\n"));
DbgPrint("hejian\n");
```
第三行未打印出来，其余都在debugview中显示出来。

















