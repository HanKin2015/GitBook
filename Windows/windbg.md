# WinDbg调试

## 1、运行调试
- 加载











## 2、WinDbg调试内存泄露

### 2-1、直接在任务管理器右键创建转储文件
需要用64位的任务管理器抓32位的dump文件，那不能直接在任务管理器右键“创建转储文件“，需要运行（C:\Windows\SysWOW64\taskmgr.exe）

当你在64位Windows系统上抓32位进程的dmup文件时，如果用的是64位任务管理器，那么在用Windbg加载后，要用!wow64exts.sw切换到X86模式下，如果不想做这步切换，就要用32位的任务管理器来生成dmp文件。32位任务管理器在C:\Windows\SysWOW64\Taskmgr.exe
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
