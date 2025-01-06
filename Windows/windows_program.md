# Windows编程

非常不错的一个博客：https://lyshark.blog.csdn.net/category_11853117_2.html

## 1、Wndproc
Wndproc是Windows操作系统向应用程序发送一系列消息之一，每个窗口会有一个窗口过程的回调函数，分别是窗口句柄、消息ID、WPARAM、LPARAM。
左键按下和左键抬起，应用程序将通过GetMessage等方法，最终将消息提交到窗口过程（WndProc[英文全称windows process])指向一个应用程序定义的窗口过程的指针。

## 2、WM_USER
为了防止用户定义的消息ID与系统的消息ID冲突，MS（Microsoft）定义了一个宏WM_USER，小于WM_USER的ID被系统使用，大于WM_USER的ID被用户使用。

## 3、DDAPI(Desktop Duplication API)桌面复制API
官方地址：https://docs.microsoft.com/zh-cn/windows/win32/direct3ddxgi/desktop-dup-api

DXGI是windows系统中用户模式下最底层的图形设备接口。不管是Direct 2D 还是 Direct 3D都基于其上。因此，DXGI 直接与硬件驱动打交道。

由于Windows闭源，因此对于DXGI的实现没有更多的公开细节，预留的 API 操作接口也相当少，其主要的作用就是枚举。

IDXGIFactory ：完成枚举的主控工厂；

IDXGIAdapter：Adapter为对硬件设备及其功能的一个抽象，简单理解为一个硬件设备就好了；

IDXGIOutput ：每个硬件设备上可能有多个输出接口，因此每个接口对应一个Output。

https://blog.csdn.net/yibu_refresh/article/details/53219530

Video Memory负责缓存图像，而对于交换链可简单理解为缓存的 buffer 控制。一般交换链有多个缓冲区，一个前缓冲（为正在显示的buffer），一个或者多个后缓冲。（例如：一帧图像在显示的时候，另一帧图像在一个后缓冲buffer中处理并等待显示。)

## 4、#pragma comment(lib, "XXX.lib")学习
#pragma comment(lib, "XXX.lib")是visual studio中使用的，

#pragma comment(lib,"wpcap.lib")
是导入1个库文件，以使程序可以调用相应的动态链接库。
和在工程设置里写上链入wpcap.lib的效果一样，不过这种方法写的 程序别人在使用你的代码的时候就
不用再设置工程settings了。告诉连接器连接的时候要找ws2_32.lib，这样你就不用在linker的lib设置
里指定这个lib了。
#pragma comment(lib, "c:\\1\\autozen\\debug\\mess.lib")
只影响build时link的行为。
#pragma仅仅影响编译器编译的时候，link.lib库的问题。和 运行时没有任何关系。
此时仅仅告诉系统需要静态加载一个.dll文件。
当程序运行时，需要加载这个.dll文件。
此时如何加载这个.dll文件，有自己的加载方式程序发布后，只需向客户提供.exe和.dll，不需要.lib。
dll和exe放在同一个目录、dll放在系统目录、dll放在PATH环境变量中的目录，exe都能正常运行

## 5、c语言的不同
Windows下c语言编程：
ndows下的函数_access与linux下的access函数功能类似，用来判断指定的文件或目录是否仅存在(00)，已存在的文件或目录是否有仅读(04)、仅写(02)、既可读又可写(06)权限。这四种方式通过_access函数中的第二个参数mode指定，如果mode传入的值不是0或2或4或6，调用此函数则会crash。如果指定的方式有效，则此函数返回0，否则返回-1。

linux下c语言编程：
Windows编程：
```
PSFUSB_PDO_LIST hj = NULL;
LONG cnt = 0;

KeAcquireSpinLock(&s_hookEntry.Lock, &oldIrql);
hj = (PSFUSB_PDO_LIST)s_hookEntry.PdoList.Flink;
cnt = 0;
while (hj != &s_hookEntry.PdoList)
{
    cnt++;
    LDBG("test before index: %d ===>>> %04x:%04x, status: %d, IsParseDescSuccess: %d", cnt, hj->idVendor, hj->idProduct, hj->nStatus, hj->IsParseDescSuccess);
    hj = hj->ListEntry.Flink;
}
LDBG("test dd s_hookEntry.lDriverCount: %d, calc count: %d", s_hookEntry.lDriverCount, cnt);
KeReleaseSpinLock(&s_hookEntry.Lock, oldIrql);
```
驱动中，我把cnt弄成int类型输出，虚拟机启动不起来，后面改成LONG后正常。只能解释cnt输出超了，LONG的范围更大，因为我在其他地方输出int类型了。

## 6、windows GetProcAddress函数
GetProcAddress 是 Windows API 中的一个函数，用于获取动态链接库（DLL）中导出函数的地址。它的函数原型如下：
```
FARPROC GetProcAddress(
  HMODULE hModule,
  LPCSTR lpProcName
);
```
其中，hModule 参数是指向包含导出函数的 DLL 模块的句柄，可以使用 LoadLibrary 函数获取。lpProcName 参数是指向导出函数名称的指针，可以是 ANSI 字符串或 Unicode 字符串。

GetProcAddress 函数返回一个指向导出函数的地址的函数指针，可以将其转换为正确的函数类型并调用该函数。如果函数不存在，则返回 NULL。

使用 GetProcAddress 函数可以实现动态加载 DLL 并调用其中的函数，这在一些需要动态加载插件或扩展的应用程序中非常有用。

```
void CCImportDLL::initDLL()
{
    //char path_DLL[MAX_PATH] = {0};
    //memcpy(path_DLL, h_ThisModleName, strlen(h_ThisModleName));
    //strcat(path_DLL, "\\SS728M05_SDK.dll");
    h_SS728M05_SDK = LoadLibrary("SS728M05_SDK.dll");
    if(h_SS728M05_SDK == NULL)
    {
        printf("LoadLibrary SS728M05_SDK dll失败！错误码：%lu\n", GetLastError());
        return;
    }
    else
    {
        b_LoadLibrary = true;

        //ICC_HID_32
        Test_HIDModel_P=(Test_HIDModel_DEF)GetProcAddress(h_SS728M05_SDK,"Test_HIDModel");
    }
}
```

## 7、注意TRUE和FALSE的值
有点颠覆之前的认知，以为跟函数执行结果返回值匹配。
```
#include <minwindef.h>

#ifndef FALSE
#define FALSE               0
#endif

#ifndef TRUE
#define TRUE                1
#endif
```

## 8、读取注册表时，注意RegOpenKeyExA函数的第四个参数
```
LONG lRes = ::RegOpenKeyExA(
            HKEY_LOCAL_MACHINE,
            lpAppName,
            0,
            KEY_READ | KEY_WOW64_32KEY,
            &hkey
        );
```
如果有KEY_WOW64_32KEY参数时，是读取计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Test目录下，没有就是计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Test目录下。

## 9、Sysnative
https://www.python100.com/html/396BR61CR4GM.html
https://www.idcnote.com/php/biji/69190.html

sysnative是Windows系统的虚拟目录，该目录在64位系统下存在。
sysnative是用来解决在32位程序下访问System32目录被重定向的问题，让32位程序可以访问到本应访问到的System32目录。
sysnative目录是由系统保留的虚拟目录，不会在文件系统中创建，并且不能在File Explorer 中直接打开。

问题背景：想判断C:\\Windows\\System32\\drivers\\ahcache.sys中驱动文件是否存在？
结果判断失败，使用管理员权限也不行。这是因为Windows的文件系统重定向机制。当32位应用程序尝试访问System32目录时，Windows会将其重定向到SysWOW64目录。这是为了保护系统文件并确保与旧的32位应用程序的兼容性。

因此需要使用到Sysnative是一个特殊的别名，它可以让32位应用程序绕过文件系统重定向并访问真正的System32目录。
另外判断驱动文件是否存在不需要管理员权限执行即可。

另外如果你的程序是64位的，直接使用C:\Windows\System32即可，不需要借助sysnative跳过重定向机制。
因此路径应写成：C:\\Windows\\Sysnative\\drivers\\ahcache.sys

## 10、注册表中的LowerFilters和UpperFilters有什么区别
在Windows操作系统的注册表中，LowerFilters和UpperFilters是与设备驱动程序加载顺序相关的键值。它们通常位于HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class这个注册表路径下的某个特定硬件类别键中。这些键值用于指定设备类别的驱动程序筛选器，这些筛选器是在设备的主驱动程序之外加载的额外驱动程序，可以提供额外的功能或处理。

UpperFilters: 这个键值包含的筛选器驱动程序在设备的主驱动程序之上加载。这意味着操作系统在调用主设备驱动程序之前，会先调用UpperFilters中列出的筛选器驱动程序。UpperFilters通常用于执行如数据加密、访问控制或其他类型的数据处理等任务。

LowerFilters: 这个键值包含的筛选器驱动程序在设备的主驱动程序之下加载。这意味着操作系统在调用主设备驱动程序之后，会调用LowerFilters中列出的筛选器驱动程序。LowerFilters通常用于执行如硬件辅助或特殊的设备管理功能等任务。

筛选器驱动程序可以修改或影响设备的操作，因此在处理注册表中的LowerFilters和UpperFilters时应当谨慎，错误的修改可能导致系统不稳定或设备无法正常工作。如果需要解决与筛选器驱动程序相关的问题，通常的做法是一次只删除一个筛选器条目，然后重启系统以检查问题是否解决。如果问题解决，那么被删除的筛选器可能是造成问题的原因。如果问题依旧，可以尝试恢复该筛选器并继续排查其他筛选器。

## 11、是不是一个设备只有一个主设备驱动程序
是的，通常情况下，一个设备只有一个主设备驱动程序（也称为功能驱动程序或设备驱动程序），它是与硬件设备直接通信的核心驱动程序，负责实现操作系统与硬件设备之间的基本交互和控制。主设备驱动程序提供了设备的基本功能，并确保设备能够按照预期工作。

然而，除了主设备驱动程序之外，还可以有多个筛选器驱动程序（如前述的UpperFilters和LowerFilters），它们在主驱动程序的基础上提供额外的功能或处理。筛选器驱动程序可以是：

类筛选器（Class Filter）：适用于某个设备类别的所有设备，例如所有USB存储设备。
设备筛选器（Device Filter）：仅适用于特定的设备实例。
筛选器驱动程序不是必需的，它们通常由硬件制造商或第三方软件提供，用于增强或修改设备的功能。例如，一个防病毒软件可能会安装一个筛选器驱动程序来监控文件系统的活动，而一个性能监控工具可能会安装一个筛选器来收集硬盘的性能数据。

总之，一个设备有一个主设备驱动程序负责基本的硬件交互，而筛选器驱动程序则是可选的，用于提供额外的功能或数据处理。

## 12、驱动里面的FDO和PDO关系
在操作系统中，特别是在Windows操作系统的驱动模型中，FDO（Function Driver Object）和PDO（Physical Device Object）是与设备管理和驱动程序架构相关的两种对象。它们在设备的驱动程序堆栈中扮演不同的角色。

PDO (Physical Device Object)：物理设备对象是由总线驱动程序为每个检测到的硬件设备创建的。它代表了硬件设备的最底层的抽象，并且通常包含了与硬件直接交互所需的信息和功能。PDO负责响应来自PnP（即插即用）管理器和电源管理器的基本命令，如启动设备、停止设备、移除设备等。

FDO (Function Driver Object)：功能驱动对象是由特定设备的功能驱动程序创建的。功能驱动程序是与设备进行直接交互的主要驱动程序，它提供了设备的核心功能性。FDO附加在PDO之上，处理来自操作系统的I/O请求，并将其转换为设备可以理解的硬件操作。

在驱动程序堆栈中，可能还会有其他类型的驱动对象，如过滤驱动对象（Filter Driver Object），它们可以附加在FDO或PDO之间，或者在它们之上，以提供额外的功能或修改I/O请求。

FDO和PDO之间的关系可以这样理解：PDO是硬件设备在操作系统中的物理表示，而FDO是提供设备功能的软件接口。在处理I/O请求时，请求通常会从设备堆栈的顶部开始，经过可能存在的过滤驱动，然后到达FDO，最后由FDO将请求传递给PDO，由PDO与硬件进行交互。

在某些情况下，还可能存在称为“低级别的功能驱动对象”（Lower-Level Function Driver Object）的对象，它们位于FDO和PDO之间，为FDO提供硬件访问的额外抽象层。这种分层的驱动模型允许更灵活的驱动程序设计和更好的代码重用。

## 13、windows编程有时候头文件导入顺序不同会导致编译失败
就很神奇，导入的还是Windows系统头文件。
