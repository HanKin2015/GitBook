# WinDbg调试

## 1、运行调试
- 加载

查找关键字：STACK_COMMAND:  .ecxr ; kb ; ** Pseudo Context ** ; kb
或者使用kb命令查看堆栈信息。

ctrl+break中断下载操作，只发现右上角有个pause break键。
正确方式是ctrl+c。



### 使用windbg捕获程序崩溃
https://blog.csdn.net/dyzhen/article/details/6402226

注意是：windbg -I（是i不是l）

有可能需要添加注册表：http://www.codeproject.com/KB/debug/automemorydump.aspx

注意：x86编译的程序只能使用x86版本的windbg捕获。

## 2、WinDbg调试内存泄露

执行.reload /f之前!sym noisy很重要。

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

~                简洁地显示当前进程的所有线程，
~.                表示当前线程
~#                表示异常或者产生调试事件的线程
~*                表示所有线程
~1                表示一号线程
~2 s            表示选择2号线程作为当前线程
~3 f            冻结三号线程
~3 u            解冻三号线程
~2 n            挂起二号线程
~2 m            恢复二线程
~*e    !clrstack   遍历每个线程, 依次输出它们的托管调用栈.
!threads        查看所有的托管线程
```


