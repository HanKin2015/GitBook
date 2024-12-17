# WinDbg调试

## 1、工具下载

### 1-1、最新版本要求（20241212）
支持的操作系统：
- Windows 11（所有版本）
- Windows 10 周年更新（版本 1607）或更新版本
处理器体系结构：
- x64 和 ARM64

官网：https://learn.microsoft.com/zh-cn/windows-hardware/drivers/debugger/
微软商店：https://apps.microsoft.com/detail/9pgjgd53tn86?hl=zh-cn&gl=CN
发现官网下载的是小exe文件，然后在安装的时候可能出现安装失败问题，因此不得不追求离线版本。

离线版本（msix 格式，可以直接离线用 Microsoft Store 安装，也可以直接把后缀改成 zip 解压即可运行）：https://www.mediafire.com/folder/0bv87669bneja/WinDbg_1.2402.24001.0_%E7%A6%BB%E7%BA%BF%E5%AE%89%E8%A3%85%E5%8C%85
https://www.cnblogs.com/s5689412/p/16596820.html

### 1-2、Microsoft 公共符号服务器
Microsoft 公共符号服务器：https://learn.microsoft.com/zh-cn/windows-hardware/drivers/debugger/microsoft-public-symbols
即添加符号表地址：SRV*https://msdl.microsoft.com/download/symbols
本地符号表默认保存地址：C:\ProgramData\Dbg\sym
将联网电脑下载的符号表拷贝到离线主机上面，然后在符号表设置拷贝位置，最后7: kd> .reload /f即可。
备注：直接拷贝到离线主机的C:\ProgramData\Dbg\sym目录，不手动添加符号表位置是不行的，符号表不生效。并且使用单独导入命令也不行：
```
7: kd> .reload /i  ntkrnlmp.exe C:\ProgramData\dbg\sym\ntkrnlmp.pdb\A3A6EBE530714799985ED058B2F0A0642\ntkrnlmp.pdb
使用lm命令查看符号表链接情况。
```

### 1-3、使用windbg捕获程序崩溃
https://blog.csdn.net/dyzhen/article/details/6402226

注意是：windbg -I（是i不是l）
有可能需要添加注册表：http://www.codeproject.com/KB/debug/automemorydump.aspx
注意：x86编译的程序只能使用x86版本的windbg捕获。

## 2、WinDbg调试内存泄露
执行.reload /f之前!sym noisy很重要。
.ecxr ; kb ;

### 2-1、直接在任务管理器右键创建转储文件
1、首先要安装对版本，即你的程序是32位还是64位，对于的windbg版本也要一致，否则会报错；详情了解：点击这里
2、需要用64位的任务管理器抓32位的dump文件，那不能直接在任务管理器右键“创建转储文件“，需要运行（C:\Windows\SysWOW64\taskmgr.exe）
3、或者直接在windbg上使用命令存储，先附加到进程，然后使用命令：（.dump /ma c:\xxx.dmp）,这样就将快照保存在C盘了；
4、最重要的，要确保你的机器能连接外网；由于windbg的使用需要在线更新符号文件，但是这个地址刚好被国家防火墙屏蔽；

需要用64位的任务管理器抓32位的dump文件，那不能直接在任务管理器右键“创建转储文件“，需要运行（C:\Windows\SysWOW64\taskmgr.exe）

当你在64位Windows系统上抓32位进程的dmup文件时，如果用的是64位任务管理器，那么在用Windbg加载后，要用!wow64exts.sw切换到X86模式下，如果不想做这步切换，就要用32位的任务管理器来生成dmp文件。32位任务管理器在C:\Windows\SysWOW64\Taskmgr.exe。

特别说明
建议大家最好使用windbg去收集dmp，因为任务管理器生成的dmp文件信息可能不全，例如：
任务管理器生成的dmp（未发现异常）：
```
Microsoft (R) Windows Debugger Version 6.3.9600.16384 X86
Copyright (c) Microsoft Corporation. All rights reserved.


Loading Dump File [D:\Users\User\Desktop\1MemoryLeak.DMP]
User Mini Dump File with Full Memory: Only application data is available

WARNING: Minidump contains unknown stream type 0x15
WARNING: Minidump contains unknown stream type 0x16

************* Symbol Path validation summary **************
Response                         Time (ms)     Location
OK                                             D:\tmp
Symbol search path is: D:\tmp
Executable search path is: 
Windows 8 Version 16299 MP (4 procs) Free x64
Product: WinNt, suite: SingleUserTS
Built by: 16299.15.amd64fre.rs3_release.170928-1534
Machine Name:
Debug session time: Tue Jan 25 11:24:37.000 2022 (UTC + 8:00)
System Uptime: 0 days 2:23:20.874
Process Uptime: 0 days 0:00:12.000
...........
*** ERROR: Symbol file could not be found.  Defaulted to export symbols for wow64cpu.dll - 
wow64cpu!TurboDispatchJumpAddressEnd+0x544:
00000000`61a51e5c c3              ret
0:000> !heap -s
LFH Key                   : 0x7d816f3420942c2a
Termination on corruption : ENABLED
          Heap     Flags   Reserv  Commit  Virt   Free  List   UCR  Virt  Lock  Fast 
                            (k)     (k)    (k)     (k) length      blocks cont. heap 
-------------------------------------------------------------------------------------
0000000002cc0000 00000002      60     28     60      8     3     1    0      0      
0000000000780000 00008000      64      4     64      2     1     1    0      0      
-------------------------------------------------------------------------------------
```
隔段时间查看的堆栈无变化。

### 2-2、正确的DMP文件1
```
Microsoft (R) Windows Debugger Version 6.3.9600.16384 X86
Copyright (c) Microsoft Corporation. All rights reserved.


Loading Dump File [D:\Users\User\Desktop\dump\1MemoryLeak.DMP]
User Mini Dump File with Full Memory: Only application data is available

WARNING: Minidump contains unknown stream type 0x15
WARNING: Minidump contains unknown stream type 0x16

************* Symbol Path validation summary **************
Response                         Time (ms)     Location
OK                                             D:\tmp
Symbol search path is: D:\tmp
Executable search path is: 
Windows 8 Version 16299 MP (4 procs) Free x86 compatible
Product: WinNt, suite: SingleUserTS
Built by: 16299.15.x86fre.rs3_release.170928-1534
Machine Name:
Debug session time: Tue Jan 25 14:30:02.000 2022 (UTC + 8:00)
System Uptime: 0 days 5:28:45.238
Process Uptime: 0 days 0:00:10.000
......
*** ERROR: Symbol file could not be found.  Defaulted to export symbols for KERNELBASE.dll - 
eax=00000000 ebx=00e9f000 ecx=00000000 edx=00000000 esi=00000000 edi=010ff8fc
eip=77cdeaac esp=010ff798 ebp=010ff7fc iopl=0         nv up ei pl nz na po nc
cs=0023  ss=002b  ds=002b  es=002b  fs=0053  gs=002b             efl=00000202
ntdll!NtDelayExecution+0xc:
77cdeaac c20800          ret     8
0:000> !heap
Index   Address  Name      Debugging options enabled
  1:   033f0000                
0:000> !heap -s
LFH Key                   : 0x23227b77
Termination on corruption : ENABLED
  Heap     Flags   Reserv  Commit  Virt   Free  List   UCR  Virt  Lock  Fast 
                    (k)     (k)    (k)     (k) length      blocks cont. heap 
-----------------------------------------------------------------------------
033f0000 00000002    1076     72   1020      1     9     1   11      1   LFH
-----------------------------------------------------------------------------
```

### 2-3、正确的DMP文件2
```
Microsoft (R) Windows Debugger Version 6.3.9600.16384 X86
Copyright (c) Microsoft Corporation. All rights reserved.


Loading Dump File [D:\Users\User\Desktop\dump\2MemoryLeak.DMP]
User Mini Dump File with Full Memory: Only application data is available

WARNING: Minidump contains unknown stream type 0x15
WARNING: Minidump contains unknown stream type 0x16

************* Symbol Path validation summary **************
Response                         Time (ms)     Location
OK                                             D:\tmp
Symbol search path is: D:\tmp
Executable search path is: 
Windows 8 Version 16299 MP (4 procs) Free x86 compatible
Product: WinNt, suite: SingleUserTS
Built by: 16299.15.x86fre.rs3_release.170928-1534
Machine Name:
Debug session time: Tue Jan 25 14:30:34.000 2022 (UTC + 8:00)
System Uptime: 0 days 5:29:17.887
Process Uptime: 0 days 0:00:42.000
......
*** ERROR: Symbol file could not be found.  Defaulted to export symbols for KERNELBASE.dll - 
eax=00000000 ebx=00e9f000 ecx=00000000 edx=00000000 esi=00000000 edi=010ff8fc
eip=77cdeaac esp=010ff798 ebp=010ff7fc iopl=0         nv up ei pl nz na po nc
cs=0023  ss=002b  ds=002b  es=002b  fs=0053  gs=002b             efl=00000202
ntdll!NtDelayExecution+0xc:
77cdeaac c20800          ret     8
0:000> !heap -s
LFH Key                   : 0x23227b77
Termination on corruption : ENABLED
  Heap     Flags   Reserv  Commit  Virt   Free  List   UCR  Virt  Lock  Fast 
                    (k)     (k)    (k)     (k) length      blocks cont. heap 
-----------------------------------------------------------------------------
033f0000 00000002    1076     72   1020      1     9     1   43      1   LFH
-----------------------------------------------------------------------------
```

### 2-4、开始调试
基于正确的DMP文件2。

!heap -s初步看一下泄露的位置和泄露的大小
```
针对泄露的地址段，查看泄露的次数和每次分配的字节数
从图中明显可以看到每次分配0x3e8024字节大小的次数最多
0:004> !heap -stat -h 033c0000
 heap @ 033c0000
group-by: TOTSIZE max-display: 20
    size     #blocks     total     ( %) (percent of total busy bytes)
    3e8024 a - 2710168  (99.88)
    221c 1 - 221c  (0.02)
    1cb4 1 - 1cb4  (0.02)
    1024 1 - 1024  (0.01)
    e24 1 - e24  (0.01)
    cea 1 - cea  (0.01)
    824 1 - 824  (0.01)
    6ec 1 - 6ec  (0.00)
    602 1 - 602  (0.00)
    1cc 3 - 564  (0.00)
    244 2 - 488  (0.00)
    440 1 - 440  (0.00)
    d0 5 - 410  (0.00)
    400 1 - 400  (0.00)
    200 2 - 400  (0.00)
    a8 6 - 3f0  (0.00)
    120 2 - 240  (0.00)
    220 1 - 220  (0.00)
    208 1 - 208  (0.00)
    76 4 - 1d8  (0.00)
0:004> ? 3e8024
Evaluate expression: 4096036 = 003e8024
0:004> !heap -flt s 0x3e8024
    _HEAP @ 33c0000
      HEAP_ENTRY Size Prev Flags    UserPtr UserSize - state
        035cb018 7d200 0000  [00]   035cb020    3e8024 - (busy VirtualAlloc)
        039cb018 7d200 d200  [00]   039cb020    3e8024 - (busy VirtualAlloc)
        03dc2018 7d200 d200  [00]   03dc2020    3e8024 - (busy VirtualAlloc)
        041b8018 7d200 d200  [00]   041b8020    3e8024 - (busy VirtualAlloc)
        045bc018 7d200 d200  [00]   045bc020    3e8024 - (busy VirtualAlloc)
        049be018 7d200 d200  [00]   049be020    3e8024 - (busy VirtualAlloc)
        04dbf018 7d200 d200  [00]   04dbf020    3e8024 - (busy VirtualAlloc)
        051b6018 7d200 d200  [00]   051b6020    3e8024 - (busy VirtualAlloc)
        055a9018 7d200 d200  [00]   055a9020    3e8024 - (busy VirtualAlloc)
        059a2018 7d200 d200  [00]   059a2020    3e8024 - (busy VirtualAlloc)
0:004> !heap -p -a 035cb018
    address 035cb018 found in
    _HEAP @ 33c0000
      HEAP_ENTRY Size Prev Flags    UserPtr UserSize - state
        035cb018 7d200 0000  [00]   035cb020    3e8024 - (busy VirtualAlloc)

 
0:004> !heap -a 035cb018
Index   Address  Name      Debugging options enabled

过滤一下分配大小为0x3e8024字节的地址空间
发现确实被分配了很多次，而且内存都还在占用没有释放

随便找一块分配的地址（就选第一个地址），尝试查看分配这块内存的函数堆栈信息
图里边虽然没有打出来出问题的哪一行，但是函数名字都已经打出来了，接下来分析出问题的函数就可以了。

没有堆栈信息是没有使用gflags。

DBGHELP: MemoryLeak - private symbols & lines 
        d:\tmp\MemoryLeak.pdb
DBGHELP: MemoryLeak - private symbols & lines 
        d:\tmp\MemoryLeak.pdb
        12517ab MemoryLeak!WinDbgGdbMemLeak+0x0000003b
        1251908 MemoryLeak!main+0x00000028
        125207e MemoryLeak!invoke_main+0x0000001e
        1251ee0 MemoryLeak!__scrt_common_main_seh+0x00000150
        1251d7d MemoryLeak!__scrt_common_main+0x0000000d
        1252098 MemoryLeak!mainCRTStartup+0x00000008
        12517ab MemoryLeak!WinDbgGdbMemLeak+0x0000003b
        1251908 MemoryLeak!main+0x00000028
        125207e MemoryLeak!invoke_main+0x0000001e
        1251ee0 MemoryLeak!__scrt_common_main_seh+0x00000150
        1251d7d MemoryLeak!__scrt_common_main+0x0000000d
        1252098 MemoryLeak!mainCRTStartup+0x00000008
```


工具要求里边提到了gflag，但是排查思路没有提到，因为排查思路不牵涉这个工具，但是会发现收集到的dmp能看到泄露信息，但是没有函数堆栈，没有函数堆栈那就又回到了一行一行审查代码了，不过没那么严重，可以通过泄露分配的大小去缩小代码范围，不过这个大小不一定是写死的，有可能是系统函数获取的（如当前的这个例子是通过GetFileVersionInfoSize获取的大小）
不过还是建议大家分析内存泄露的时候把用户堆栈信息捕获打开，由函数堆栈定位代码效率至少翻一倍
gflag位置和windbg文件在一个目录下。

全称：Global Flags。
跟WinDbg一起的。

点击Image File-》输入程序名称（MemoryLeak.exe）-》tab键-》勾选Create user mode stack trace database-》确定

## 3、关于符号表

### Extension commands need mscorwks.dll in order to have something to do.的一种情况
今天开发人员提交同一个程序的两个dump文件，运行环境Windows Server 2008 R2、.NET Framework 2.0。当使用WinDbg分析第二个文件时，加载sos执行命令提示如下：

0:000> .load C:\Windows\Microsoft.NET\Framework64\v2.0.50727\sos.dll
0:000> !clrstack
Failed to find runtime DLL (mscorwks.dll), 0x80004005
Extension commands need mscorwks.dll in order to have something to do.
执行lmvm clr发现CLR为4.0，重新加载4.0版本的sos.dll可以解决该问题。


```
0:003> lm
start    end        module name
01240000 0125f000   MemoryLeak C (private pdb symbols)  d:\tmp\MemoryLeak.pdb
0f700000 0f71c000   VCRUNTIME140D   (deferred)             
0ff80000 100f6000   ucrtbased   (private pdb symbols)  c:\symbols\ucrtbased.pdb\745E71054B86425F13E881A42FE1ABFF2\ucrtbased.pdb
754b0000 75580000   KERNEL32   (pdb symbols)          c:\symbols\wkernel32.pdb\FF9F9F7841DB88F0CDEDA9E1E9BFF3B51\wkernel32.pdb
77570000 77747000   KERNELBASE   (deferred)             
77c70000 77dfd000   ntdll      (pdb symbols)          c:\symbols\wntdll.pdb\2D9B893FB55D6FF9CD33DB170BED48E91\wntdll.pdb

发现lmv可以看见详细信息

lmvm ntdll可以看某个组件详细信息

导入ntdll.pdb文件和wntdll.pdb文件即可。主要还是微软的一些dll文件的符号表没有导入导致。

srv*c:\Symbols*http://1.7.8.4/symbols;srv*c:\Symbols*http://1.7.4.7/symbols;D:\tmp
需要在c盘创建文件夹，然后执行.reload /f会加载符号表并下载到本地c:\Symbols文件夹。
```
补充一下，由于.NET Framework 4.5的安装实际替换了4.0目录下对应的文件，所以4.0以上版本的更新调试存在3个版本，调试时分别需要相应版本的clr.dll、mscordacwks.dll、sos.dl（v4.0.30319.1、v4.0.30319.17929、v4.0.30319.18010）。

### Symbol file could not be found. Defaulted to export symbols for ntkrnlpa.exe
我的系统是win10的
1：设置系统环境变量
windbg符号文件路径搜索的两个位置：环境变量中的_NT_SYMBOL_PATH设置及windbg中的"symblos file path";
_NT_SYMBOL_PATHE E:\Windows\Symbols 这了直接设置成本地的文件 微软好像不提供下载了。

sp3符号表完整版下载地址：
链接：https://pan.baidu.com/s/188-KkQCLoQ2kCOVfpyRo1w
提取码：h3e7

## 4、WinDbg挂载
可以执行exe文件、可以挂载到进程、可以打开dump文件

万变不离其宗-》需要符号表

```
0:004> .load C:\Windows\Microsoft.NET\Framework\v4.0.30319\SOS.dll
0:004> !dumpheap -stat
Failed to find runtime DLL (clr.dll), 0x80004005
Extension commands need clr.dll in order to have something to do.
```

https://www.cnblogs.com/lanxiaoke/p/12997032.html

## 5、可视化界面调式
View->call stack
locals
processes and threads

有些dump文件可能不是在最后的地方崩溃，可以在之前已经出现内存访问错误，从而后面是随机地方出现崩溃。

```
线程命令是以~开始，后面跟线程id（一个windbg从0开始的一个编号），或者.,#,*等，可和其他命令混合使用。

~               简洁地显示当前进程的所有线程，
~.              表示当前线程
~#              表示异常或者产生调试事件的线程
~*              表示所有线程
~1              表示一号线程
~2 s            表示选择2号线程作为当前线程
~3 f            冻结三号线程
~3 u            解冻三号线程
~2 n            挂起二号线程
~2 m            恢复二线程
~*e !clrstack   遍历每个线程, 依次输出它们的托管调用栈.
!threads        查看所有的托管线程
```

## 6、实战之打印运行进程中的变量值
在Windbg中，!sym noisy命令用于控制符号加载的详细程度。符号是用于调试和分析二进制文件的重要元素，它们包含了函数、变量和类型的信息。
当使用!sym noisy命令时，Windbg会显示符号加载的详细信息，包括正在加载的符号文件的名称、路径和加载状态。这对于调试复杂的程序或分析崩溃时的堆栈信息非常有用。
通过使用!sym noisy命令，您可以获得更多关于符号加载过程的信息，以便更好地理解和分析调试会话。

0n19920972是一个十进制数字，表示19920972。在Windbg中，数字前面的0n前缀表示这是一个十进制数字，而不是一个十六进制数字（没有前缀）或一个八进制数字（前缀为0）。这种表示方法可以避免数字被错误地解释为十六进制或八进制数字。

WinDbg软件尽量使用新版的，当前我使用的是6.x版本，就存在一些不足。
- bool变量显示ffffffff0，实际为true（可能是命令问题，使用dx）
- 不能直接跳转到代码文件
- 十进制表示为0n

（1）修改环境变量配置符号表地址：系统变量=》新建_NT_SYMBOL_PATH-》srv*c:\Symbols*http://1.2.48.40/symbols;srv*c:\Symbols*http://1.2.47.47/symbols;d:/symbols
（2）打开WinDbgx86软件
（3）Symbol File Path 手动加载符号表，注意勾选reload
（4）Source File Path 手动加载代码文件夹
（5）Attach to a Process 挂载进程
（6）!sym noisy
（7）执行.reload /f 加载符号表（这个可能会很久很久）
（8）lm 命令查看当前加载的模块列表
（9）bp session!class:function 下断点，session为模块名，然后是类名函数名
（10）g 继续运行程序
（11）k 查看堆栈信息
（12）.frame 0 进入捕获位置
（13）dv 打印局部变量
（14）dt this 打印类的全部变量（低版本dt class 0x12344）

## 7、实战之分析dmp文件
（1）生成dmp文件：以管理员打开procexp.exe软件，找到进程，右键=》Create Dump
（2）打开WinDbgx86软件
（3）Symbol File Path 手动加载符号表，注意勾选reload
（4）Source File Path 手动加载代码文件夹
（5）Open Crash Dump 加载dmp文件
（6）!sym noisy
（7）执行.reload /f 加载符号表
（8）k 查看堆栈信息
（9）.frame 0 进入捕获位置
（10）dv 打印局部变量
（11）dt this 打印类的全部变量
（12）.symfix; .reload修复和重新加载符号表

## 8、其他命令
bd * 删除所有断点
bl 显示断点
dv /x myVar 以十六进制格式输出变量的值
!analyze -v
可以直接用鼠标点击this指针，直接运行命令dx -r1 ((session!class *)0x12ff5f8)

## 9、分析窗口被关闭了怎么复原
分析窗口为Command窗口，在工具栏一只手的右边有个Command按钮。

## 10、Procexp.exe软件下载dump文件尽量下载全量
简单的dump文件看不见部分内存内容：
```
0:000> dv
           this = <Memory access error>
              x = 0n741
              y = 0n502
  buttons_state = 0n0
     display_id = 0n0
           lock = class Lock
```

## 11、使用VS工具进行代码编程程序崩溃问题排查
最终结论：使用WinDbg软件进行程序崩溃调试，发现定位根本不准，原因是踩内存的崩溃就会有这个问题，它会在不同的地方报错，这时候只能通过看代码，注释代码一步一步的手动调式定位问题的根本所在。
调试demo：D:\Github\Storage\windows\WinDbgExample
原问题demo（问题已解决，原因在于CharLowerBuff函数，去掉注释可复现，非必现）：D:\Github\Storage\windows\GetVideoDesciptor

### 11-1、方式一：使用procexp.exe生成dump排查
- 以管理员打开procexp
- 找到程序右键Create Dump=>Create Full Dump

但是我遇到一个问题，生成的时候要么为0Kb文件要么报错Error writing dump file:拒绝访问。
原来是必须要在程序的根目录进行操作，如果在程序子文件进行Create Minidump和Create Full Dump都只会有0Kb大小的文件，并且一旦操作过后再在根目录操作就会报错Error writing dump file:拒绝访问。这时候只能重启procexp.exe软件再在根目录操作即可。

### 11-2、方式二：将WinDbg设置为默认调试工具
- 找到WinDbg程序目录
- 以管理员打开cmd
- WinDbg.exe -I执行点击确定按钮即可

关闭此配置花了我2天时间，怎么百度都没有搜索到，反正最终都没有搜索到命令实现，最可能的答案是修改注册表：https://blog.csdn.net/lxhuster_csdn/article/details/53153855，然后跟着做了却无法生效。
最终还是靠自己，在我想要放弃的时候灵机一动，使用Process Monitor.exe软件监控WinDbg -I命令生效的时候做了什么事情，由于操作事件过多，重点关注过滤path值的AeDebug是否存在，果然让我找到了蛛丝马迹：
根据链接修改计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows NT\CurrentVersion\AeDebug注册表即可，即将Auto值从1修改为0即可。

### 11-3、注册表设置WinDbg为默认调试工具
不同的电脑可能有不同的路径，选其一：
路径1：计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\GetVideoDesciptor.exe
创建一个字符串值REG_SZ的debugger，并设置值为"C:\program files (x86)\Windows Kits\10\Debuggers\x86\windbg.exe"。

路径2：计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\GetVideoDesciptor.exe
创建一个字符串值REG_SZ的debugger，并设置值为"C:\program files (x86)\Windows Kits\10\Debuggers\x86\windbg.exe"。

## 12、Windbg的gflags.exe调试堆栈溢出，访问越界等问题
https://blog.csdn.net/bao_bei/article/details/73840674
gflags.exe是Windbg下的一个小工具，非常好用，对于调试程序隐藏的bug很有帮助。

加载方法：
1、下载Debugging Tools for Windows，使用其中的gflags.exe。
2、双击打开gflags.exe，选择Image File标签。前两个标签是对所有程序进行跟踪。
3、在Image栏里输入你希望调试的程序名。比如，mytest.exe。（按Tab刷新）。
4、勾选Debugger并输入vsjitdebugger.exe。（"C:\program files (x86)\Windows Kits\10\Debuggers\x64\windbg.exe"）
5、点击OK或者Apply。

卸载方法：
HKEY_LOCAL_MACHINE/SOFTWARE/Microsoft/WindowsNT/CurrentVersion/Image File Execution Options/mytest.exe
网上看到是取消Debugger的勾选，但是无效，最后清除注册表后程序恢复原有速度。（确实可以关闭windbg的挂载调试。

## 13、配置windbg网络双机内核调试
使用windows网络双机调试，相比串口双机调试，优势在于调试速度，提升调试效率。

双机调试依赖网卡硬件实现，仅支持指定范围的网卡。virtio网卡不支持该功能。
物理机配置网络双机调试一样，配置调试机和被调试虚拟机。（调试机称为host机， 被调试机被称为target机）
虚拟机需要配置启动参数。增加hv_vendor_id=KVMKVMKVM。 解决网络双机调试默认在qemu环境无法使用的问题。（参考OSR上的一篇文章：https://www.osr.com/blog/2021/10/05/using-windbg-over-kdnet-on-qemu-kvm/） 

### 13-1、配置调试和被调试机双机调试
被调试机配置
（1）管理员权限启动cmd
（2）执行命令：bcdedit /debug on
（3）执行命令：bcdedit /dbgsettings net hostip:{调试机IP} port:{调试机的端口} key:{认证用的key}
例如：bcdedit /dbgsettings net hostip:172.22.64.246 port:55555 key:kvm.kvm.kvm.kvm

认证的key格式就是X.X.X.X 。X是一个或多个字母或数字。

调试机配置
（1）启动windbg
（2）点击菜单"File"，"Kernel Debug"

等待被调试机接入（正常两台物理机双机调试时，后面只需要重启被调试机，就会自动连接上来，但是被调试机是虚拟机时还需要额外的配置并重启，看接下来的步骤）

## 14、pdb符号表
当应用程序崩溃并生成 dump 文件时，dump 文件中可能会包含有关 PDB 文件的路径信息。这些信息是在编译时由编译器嵌入到可执行文件中的。具体来说，编译器在生成可执行文件（如 .exe 或 .dll）时，会将 PDB 文件的完整路径嵌入到可执行文件的调试信息中。
```
D:\Demo\windows\x86\Release>"C:\Program Files (x86)\Microsoft Visual Studio 14.0\VC\bin\dumpbin.exe" /headers Session.exe
Microsoft (R) COFF/PE Dumper Version 14.00.24210.0
Copyright (C) Microsoft Corporation.  All rights reserved.


Dump of file Session.exe

  Debug Directories

        Time Type        Size      RVA  Pointer
    -------- ------- -------- -------- --------
    671A16E5 cv            6E 007E9B8C   7E838C    Format: RSDS, {7F55C1EC-845E-4F8E-9B61-1DC6DE28344B}, 54, D:\Demo\windows\x86\Release\Session.pdb
```
在输出中查找 .debug 部分，可能会看到 PDB 文件的路径信息。
使用 WinDbg：在 WinDbg 中加载可执行文件或 dump 文件后，可以使用 lm 命令列出加载的模块及其符号信息，其中可能包含 PDB 路径。


