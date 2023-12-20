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

#pragma comment ( lib,"wpcap.lib" ) 
是导入1个库文件，以使程序可以调用相应的动态链接库。
和在工程设置里写上链入wpcap.lib的效果一样，不过这种方法写的 程序别人在使用你的代码的时候就
不用再设置工程settings了。告诉连接器连接的时候要找ws2_32.lib，这样你就不用在linker的lib设置
里指定这个lib了。
#pragma comment(lib, "c:\\1\\autozen\\debug\\mess.lib")
只影响build时link的行为。
#pragma  仅仅影响编译器编译的时候，link .lib 库的问题。和 运行时没有任何关系。
此时仅仅告诉系统需要静态加载一个 .dll 文件。
当程序运行时，需要加载这个 .dll 文件。
此时如何加载这个 .dll 文件，有自己的加载方式程序发布后，只需向客户提供.exe和.dll，不需要.lib。
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

    DWORD rtn = GetLastError();

    if(h_SS728M05_SDK == NULL)
    {
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











