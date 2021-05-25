# Windows编程

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
