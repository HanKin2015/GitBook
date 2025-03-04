# gdb调试

## 0、常使用指令
b(break) x: 打断点,x是行号，表示在对应的行号位置设置断点
l(list): l -可以倒着看程序,后面可以接函数名或者行数,显示源代码，并且可以看到对应的行号
c(continue): 表示继续执行
bt：backtrace
q(quit): 表示退出gdb
r(run): 表示继续执行到断点的位置
t: thread输出当前线程编号
where：感觉跟bt效果一样
h：help没啥用
i：info
p(print) x: x是变量名，表示打印变量x的值
s: set设置变量值
wh: 查看代码位置
n(next): 表示执行下一步
info line: 查看函数对应的行数
```
bt			查看堆栈
info thread 查看线程
thread 5	进入线程5
f 3			进入堆栈3
p val		输出变量val值
```

启动gdb,注意该程序编译需要-g选项进行。
```
r + 程序输入参数
whatis + 变量   //获取变量类型
i + 各种参数
p + 变量        // 输出变量值
s + 变量
```

查看时是可以倒着看，最后是程序最开始出现的地方。
关键词：abort
```
gdb 二进制文件 core文件
```

### 下断点
```
handle SIGPIPE nostop
handle SIGUSR1 nostop
handle SIGSEGV nostop
handle SIGABRT nostop
dir /var/kvm_debug
b hcd-ehci.c:1659
```

### 编译器优化
D:\Github\GitBook\gitbook\C++\compiler_optimization.md
遇到部分变量<optimized out>时，需要重新编译一个二进制文件复现问题。

部分变量被优化，但是看二进制编译的时候是O0，并且直接在运行时下端点调试是能正常打印变量的，难道是生成dump后优化？
没搞懂，内部强制把操作系统崩溃到dump文件一样，gdb发现并没有优化。并且优化参数是去年改的。
后面设备拿到手后再研究这个问题。

## 1、调试没有符号表的程序
发行版的程序在编译的时候都是没有加上-g这个选项的，那么若是想调试一个程序，应该怎么办呢？
在加了-g选项时，是可以通过行号、函数名等进行断点的设置的，但是没有符号表的情况下，那么怎么来进行程序的断点的设置并进行调试呢？
```
gdb test 
gdb -q test //表示不打印gdb版本信息，界面较为干净；

gdb a.out
l
disassemble main
b *0x08048474   (地址前面加个*)
info b
r
c
```

## 2、有符号表的调试

### 设置断点
break(简写 b) ：格式 b 行号，在某行设置断点；
info breakpoints ：显示断点信息
Num： 断点编号
Disp：断点执行一次之后是否有效 kep：有效 dis：无效
Enb： 当前断点是否有效 y：有效 n：无效
Address：内存地址
What：位置

## 3、gdb调试带参数的程序
gdb --args ./a.out 4
也可以在里面运行加参数：r 5


编译过程中需要添加-g选项，这样才会有符号表。
```
root@debian-hankin:~/hejian/lock# gdb ./a.out
GNU gdb (Debian 7.7.1+dfsg-5) 7.7.1
Copyright (C) 2014 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
<http://www.gnu.org/software/gdb/documentation/>.
For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from ./a.out...done.
(gdb) r 3
Starting program: /home/vdi/hejian/lock/a.out 3
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".
[New Thread 0x7ffff6ff3700 (LWP 13754)]
I'm 1th thread, Thread_ID = 140737337308928
[New Thread 0x7ffff67f2700 (LWP 13755)]
[New Thread 0x7ffff5ff1700 (LWP 13756)]
[Thread 0x7ffff6ff3700 (LWP 13754) exited]

Program received signal SIGSEGV, Segmentation fault.
[Switching to Thread 0x7ffff67f2700 (LWP 13755)]
0x0000000000400784 in tfn (arg=0x1) at thread.cpp:12
12              i = *((int *)arg);
(gdb) bt
#0  0x0000000000400784 in tfn (arg=0x1) at thread.cpp:12
#1  0x00007ffff7bc70a4 in start_thread (arg=0x7ffff67f2700) at pthread_create.c:309
#2  0x00007ffff70da04d in clone () at ../sysdeps/unix/sysv/linux/x86_64/clone.S:111
(gdb) quit
```

## 4、GDB：调试死锁
## 4-1、参考
https://blog.csdn.net/guowenyan001/article/details/46238355

### 4-2、编译运行
编译程序：gcc -g test.c -lpthread -o test
-g：添加调试符号表
-lpthread：解决线程函数定义

两个终端窗口，一个负责程序运行，另一个负责调试。

### 4-3、查看进程号
ps aux|grep test
ps -ef|grep test

### 4-4、查看进程中所有线程(查看线程号)
pstree -p 123

### 4-5、通过线程号调试
gdb
attach 线程号
bt

### 4-6、调试所有线程
gdb
attach 进程号
thread apply all bt

### 4-7、常用调试方法
ps -e|grep test
gdb test 进程号   启动gdb attach 进程
info threads        显示所有线程信息
thread 2              调到第2个线程
bt                        查看第2个线程的堆栈，即可可以看到线程死锁的地方

注意：这种方式需要正确指定test执行文件的路径位置，否则会出现无法找到符号表错误。

## 5、获取程序中的变量值并对其修改重新运行
调试demo程序在：D:\Github\Storage\c++\gdb\modify_variable.cpp
```
[root@ubuntu0006:/] #ps aux | grep a.out
root     12901  0.0  0.0  13268  1540 pts/7    S+   11:07   0:00 ./a.out
root     13530  0.0  0.0  17088  1012 pts/4    S+   11:08   0:00 grep --color=auto a.out
[root@ubuntu0006:/] #gdb -p 12901
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word".
Attaching to process 12901
Reading symbols from /media/hankin/vdb/a.out...done.
Reading symbols from /usr/lib/x86_64-linux-gnu/libstdc++.so.6...(no debugging symbols found)...done.
Reading symbols from /lib/x86_64-linux-gnu/libc.so.6...(no debugging symbols found)...done.
Reading symbols from /lib/x86_64-linux-gnu/libm.so.6...(no debugging symbols found)...done.
Reading symbols from /lib64/ld-linux-x86-64.so.2...(no debugging symbols found)...done.
Reading symbols from /lib/x86_64-linux-gnu/libgcc_s.so.1...(no debugging symbols found)...done.
0x00007f42d8973370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
(gdb) bt
#0  0x00007f42d8973370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
#1  0x00007f42d89732da in sleep () from /lib/x86_64-linux-gnu/libc.so.6
#2  0x0000000000400d8f in main (argc=1, argv=0x7ffc7f5d4358) at modify_variable.cpp:73
(gdb) frame 2
#2  0x0000000000400d8f in main (argc=1, argv=0x7ffc7f5d4358) at modify_variable.cpp:73
73              sleep(2);
(gdb) info locals
log_file_path = 0x400eb0 "./hj.log"
__PRETTY_FUNCTION__ = "int main(int, char**)"
index = 0
(gdb) print g_log_fp
$1 = (FILE *) 0x0
(gdb) set g_log_fp=stderr
(gdb) continue
Continuing.
^C
Program received signal SIGINT, Interrupt.
0x00007f42d8973370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
(gdb) set g_log_fp=NULL
No symbol "NULL" in current context.
(gdb) set g_log_fp=0
(gdb) continue
Continuing.
^C
Program received signal SIGINT, Interrupt.
0x00007f42d8973370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
(gdb) print g_log_fp=stderr
$2 = (FILE *) 0x7f42d8c6c540 <_IO_2_1_stderr_>
(gdb) continue
Continuing.
^C
Program received signal SIGINT, Interrupt.
0x00007f42d8973370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
(gdb) q
A debugging session is active.

        Inferior 1 [process 12901] will be detached.

Quit anyway? (y or n) y
Detaching from program: /media/hankin/vdb/a.out, process 12901
[Inferior 1 (process 12901) detached]

另外一个窗口：
[root@ubuntu0006:/media/hankin/vdb] #g++ modify_variable.cpp -g
[root@ubuntu0006:/media/hankin/vdb] #./a.out
stdin 0x7f42d8c6b8e0, stdout 0x7f42d8c6c620, stderr 0x7f42d8c6c540
LOG_TIGGER file is not exist!
g_log_fp is NULL, index = 0
g_log_fp is NULL, index = 0

使用set修改成功：
2023-03-14 11:09:33 index = 0
2023-03-14 11:09:35 index = 1

使用set修改成功：
g_log_fp is NULL, index = 12
g_log_fp is NULL, index = 12

使用print修改成功：
2023-03-14 11:10:52 index = 12
2023-03-14 11:10:54 index = 13
```
gdb调试修改变量后退出，程序依然以修改后的变量值继续执行。

## 6、总结
gdb调试只是找到程序出现异常的位置，具体问题原因还是需要结合代码查看问题关键所在。
https://developer.aliyun.com/mirror/
```
#include <iostream>
#include <cassert>
#include <cstdlib>
using namespace std;

bool judge(int n)
{
    assert(n > 0);
    if (n > 5) return true;
    return false;
}

int main(int argc, char *argv[])
{
    if (argc != 2) {
        cout << "argument error!" << endl;
        return -1;
    }
    cout << "is larger than 5?" << endl;
    bool ret = judge(atoi(argv[1]));
    cout << boolalpha << ret << endl;
    long val = 5 / 0;
    return 0;
}
```

## 7、附录一

### 7-1、gdb查看源代码
GDB 可以打印出所调试程序的源代码，当然，在程序编译时一定要加上-g的参数，把源程序信息编译到执行文件中。不然就看不到源程序了。当程序停下来以后，GDB会报告程序停在了那个文件的第几行上。你可以用list命令来打印程序的源代码。还是来看一看查看源代码的GDB命令吧。

list<linenum>   显示程序第linenum行的周围的源程序。
list<function>  显示函数名为function的函数的源程序。
list    显示当前行后面的源程序。
list -  显示当前行前面的源程序。

一般是打印当前行的上5行和下5行，如果显示函数是是上2行下8行，默认是10行，当然，你也可以定制显示的范围，使用下面命令可以设置一次显示源程序的行数。

setlistsize <count> 设置一次显示源代码的行数。
showlistsize        查看当前listsize的设置。

list命令还有下面的用法：
list<first>, <last> 显示从first行到last行之间的源代码。
list ,<last>        显示从当前行到last行之间的源代码。
list +              往后显示源代码。

一般来说在list后面可以跟以下这些参数：
<linenum>   行号。
<+offset>   当前行号的正偏移量。
<-offset>   当前行号的负偏移量。
<filename:linenum>  哪个文件的哪一行。
<function>  函数名。
<filename:function>哪个文件中的哪个函数。
<*address>  程序运行时的语句在内存中的地址。

### 7-2、一些常用signal的含义
SIGABRT：调用abort函数时产生此信号。进程异常终止。
SIGBUS：指示一个实现定义的硬件故障。
SIGEMT：指示一个实现定义的硬件故障。EMT这一名字来自PDP-11的emulator trap 指令。
SIGFPE：此信号表示一个算术运算异常，例如除以0，浮点溢出等。
SIGILL：此信号指示进程已执行一条非法硬件指令。4.3BSD由abort函数产生此信号。SIGABRT现在被用于此。
SIGIOT：这指示一个实现定义的硬件故障。IOT这个名字来自于PDP-11对于输入／输出TRAP(input/outputTRAP)指令的缩写。系统V的早期版本，由abort函数产生此信号。SIGABRT现在被用于此。
SIGQUIT：当用户在终端上按退出键（一般采用Ctrl-/）时，产生此信号，并送至前台进

程组中的所有进程。此信号不仅终止前台进程组（如SIGINT所做的那样），同时产生一个core文件。
SIGSEGV：指示进程进行了一次无效的存储访问。名字SEGV表示“段违例（segmentationviolation）”。
SIGSYS：指示一个无效的系统调用。由于某种未知原因，进程执行了一条系统调用指令，但其指示系统调用类型的参数却是无效的。
SIGTRAP：指示一个实现定义的硬件故障。此信号名来自于PDP-11的TRAP指令。
SIGXCPUSVR4和4.3+BSD支持资源限制的概念。如果进程超过了其软C P U时间限制，则产生此信号。
SIGXFSZ：如果进程超过了其软文件长度限制，则SVR4和4.3+BSD产生此信号。

### 7-3、Core_pattern的格式
可以在core_pattern模板中使用变量还很多，见下面的列表：
%% 单个%字符
%p 所dump进程的进程ID
%u 所dump进程的实际用户ID
%g 所dump进程的实际组ID
%s 导致本次core dump的信号
%t core dump的时间 (由1970年1月1日计起的秒数)
%h 主机名
%e 程序文件名

## 8、gdb基本使用命令
### 8-1、运行命令
run：简记为 r ，其作用是运行程序，当遇到断点后，程序会在断点处停止运行，等待用户输入下一步的命令。
continue （简写c ）：继续执行，到下一个断点处（或运行结束）
next：（简写 n），单步跟踪程序，当遇到函数调用时，也不进入此函数体；此命令同 step 的主要区别是，step 遇到用户自定义的函数，将步进到函数中去运行，而 next 则直接调用函数，不会进入到函数体内。
step （简写s）：单步调试如果有函数调用，则进入函数；与命令n不同，n是不进入调用的函数的
until：当你厌倦了在一个循环体内单步跟踪时，这个命令可以运行程序直到退出循环体。
until+行号： 运行至某行，不仅仅用来跳出循环
finish： 运行程序，直到当前函数完成返回，并打印函数返回时的堆栈地址和返回值及参数值等信息。
call 函数(参数)：调用程序中可见的函数，并传递“参数”，如：call gdb_test(55)
quit：简记为 q ，退出gdb

### 8-2、设置断点
break n （简写b n）:在第n行处设置断点
（可以带上代码路径和代码名称： b OAGUPDATE.cpp:578）
b fn1 if a＞b：条件断点设置
break func（break缩写为b）：在函数func()的入口处设置断点，如：break cb_button
delete 断点号n：删除第n个断点
disable 断点号n：暂停第n个断点
enable 断点号n：开启第n个断点
clear 行号n：清除第n行的断点
info b （info breakpoints） ：显示当前程序的断点设置情况
delete breakpoints：清除所有断点：

### 8-3、查看源码
list ：简记为 l ，其作用就是列出程序的源代码，默认每次显示10行。
list 行号：将显示当前文件以“行号”为中心的前后10行代码，如：list 12
list 函数名：将显示“函数名”所在函数的源代码，如：list main
list ：不带参数，将接着上一次 list 命令的，输出下边的内容。

### 8-4、打印表达式
print 表达式：简记为 p ，其中“表达式”可以是任何当前正在被测试程序的有效表达式，比如当前正在调试C语言的程序，那么“表达式”可以是任何C语言的有效表达式，包括数字，变量甚至是函数调用。
print a：将显示整数 a 的值
print ++a：将把 a 中的值加1,并显示出来
print name：将显示字符串 name 的值
print gdb_test(22)：将以整数22作为参数调用 gdb_test() 函数
print gdb_test(a)：将以变量 a 作为参数调用 gdb_test() 函数
display 表达式：在单步运行时将非常有用，使用display命令设置一个表达式后，它将在每次单步进行指令后，紧接着输出被设置的表达式及值。如： display a
watch 表达式：设置一个监视点，一旦被监视的“表达式”的值改变，gdb将强行终止正在被调试的程序。如： watch a
whatis ：查询变量或函数
info function： 查询函数
扩展info locals： 显示当前堆栈页的所有变量

### 8-5、查看运行信息
where/bt ：当前运行的堆栈列表；
bt backtrace 显示当前调用堆栈
up/down 改变堆栈显示的深度
set args 参数:指定运行时的参数
show args：查看设置好的参数
info program： 来查看程序的是否在运行，进程号，被暂停的原因。

### 8-6、分割窗口
layout：用于分割窗口，可以一边查看代码，一边测试：
layout src：显示源代码窗口
layout asm：显示反汇编窗口
layout regs：显示源代码/反汇编和CPU寄存器窗口
layout split：显示源代码和反汇编窗口
Ctrl + L：刷新窗口

### 8-7、cgdb强大工具
cgdb主要功能是在调试时进行代码的同步显示，这无疑增加了调试的方便性，提高了调试效率。界面类似vi，符合unix/linux下开发人员习惯;如果熟悉gdb和vi，几乎可以立即使用cgdb。

## 9、调试输出指针值
```
(gdb) bt
#0  0x0000000000400e1b in thread_pool_destroy (pool=0x24be010) at thread_pool.c:138
#1  0x0000000000400fe2 in main () at thread_pool.c:199
(gdb) f 0
#0  0x0000000000400e1b in thread_pool_destroy (pool=0x24be010) at thread_pool.c:138
138         for (worker = pool->workers; worker != NULL; worker = pool->workers->next) {
(gdb) p (pool->workers)
$1 = (WORKER *) 0x24be5c0
(gdb) p *(pool->workers)
$2 = {thread = 139871947966208, terminate = true, pool = 0x24be010, pre = 0x0, next = 0x24be470}
(gdb) p $2->next
$3 = (WORKER *) 0x24be470
(gdb) p *($2->next)
$5 = {thread = 139871956358912, terminate = true, pool = 0x24be010, pre = 0x24be5c0, next = 0x24be320}
(gdb) p *((struct WORKER *)0x24be320)
$6 = {thread = 139871964751616, terminate = false, pool = 0x24be010, pre = 0x24be470, next = 0x24be1d0}
(gdb) p 0x24be320
$7 = 38527776
(gdb) p *(0x24be320)
$8 = 2059790080
(gdb)
```

## 10、gdb调试时显示数组
```
p *array@len

int a[] = {1, 2, 3, 4, 5};
p *a@5

display *a@5
取消显示就用undisplay，不过这时候要写显示的号码。
```

## 11、在GDB中达到某个断点时如何执行特定操作？
https://www.itranslater.com/qa/details/2582482268707095552

例如，这是当x为正数时，可以使用断点命令在foo的入口处打印x的值的方法。
```
break foo if x>0
commands
silent
printf "x is %d\n",x
cont
end
```
如果您在命令列表中指定的第一个命令是silent，则不会打印有关在断点处停止的常规消息。 对于要打印特定消息然后继续的断点，这可能是理想的。 如果其余命令均未打印任何内容，则看不到已达到断点的迹象。 只有在断点命令列表的开头，silent才有意义。

一个断点命令应用程序是为了补偿一个错误，因此您可以测试另一个错误。 在错误的代码行之后放置一个断点，为它提供一个条件，以检测出发生了错误的情况，并为它提供命令以将正确的值分配给需要它们的任何变量。 以continue命令结束，以便您的程序不会停止，并以silent命令开始，以便不产生任何输出。 这是一个例子：
```
break 403
commands
silent
set x = y + 4
cont
end
```

## 12、高级用法调试

### 12-1、可以对函数进行下断点
b tc_new
b tc_delete

### 12-2、对文件行数下断点
b test.c:45

### 12-3、踩内存会在gdb挂载时最上面显示出对应的地址
如0x23781673
直接print是打印不出具体的值，需要转换成对应的数据类型才行，如
p *(my_class *)0x23781673

### 12-4、下断点后执行程序
r

### 12-5、删除断点
d 2

### 12-6、查看断点
i break

s命令很重要，可以进入断点

反汇编
disassemble

在gdb里，用handle SIGPIPE nostop去掉SIGPIPE信号。

### 12-7、查看全局和静态变量
info variables 查看全局变量

查看当前stack frame局部变量
info locals

查看当前stack frame参数
info args

在windbg下，kb会显示返回地址和参数列表。

## 13、实操
```
gunzip camera0.core.6.19897.gz
gdb /usr/local/bin/xxx camera0.core.6.19897
bt
f 17
info locals
p var
```
注意一点：
堆栈中如果出现data=0x7eca70f000 <error: Cannot access memory at address 0x7eca70f000这种无法访问内存的情况，可能不是一个问题。

## 14、Python Exception exceptions.NameError Installation error: gdb.execute_unwinders function is missing:
使用的gdb 版本：gdb-7.10.1

使用gdb的时候遇到如标题所示的错误提示信息，其实不影响正常的使用，但是一直输出这个也很烦人。网上看了下，发现有可能是当前gdb版本的bug，或者当前gdb版本安装的问题。

于是换了一个gdb-9.2 版本的gdb来使用，问题消失。

```
[root@ubuntu0006:/media/hankin/vdb/TranhankinerStation] #gdb -version
Python Exception <class 'ImportError'> cannot import name '_remove_dead_weakref':
gdb: warning:
Could not load the Python gdb module from `/usr/share/gdb/python'.
Limited Python support is available from the _gdb module.
Suggest passing --data-directory=/path/to/gdb/data-directory.

GNU gdb (Ubuntu 7.11.1-0ubuntu1~16.5) 7.11.1
Copyright (C) 2016 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Type "show copying"
and "show warranty" for details.
This GDB was configured as "x86_64-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
<http://www.gnu.org/software/gdb/documentation/>.
For help, type "help".
Type "apropos word" to search for commands related to "word".
```

最终解决方案是重装gdb。
官网下载源码编译：https://ftp.gnu.org/gnu/gdb/

## 15、gdb命令运行失败
```
hankin:hankin/host-083a88c60e6e(HOST-OS) /hankin/data/local/hj # gdb
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
ImportError: No module named site
hankin:hankin/host-083a88c60e6e(HOST-OS) /hankin/data/local/hj # which gdb
/usr/bin/gdb
hankin:hankin/host-083a88c60e6e(HOST-OS) /hankin/data/local/hj # ldd /usr/bin/gdb
        linux-vdso.so.1 =>  (0x00007ffca4b50000)
        /hankin/lib/libvt_hook_libc.so (0x00007fe2311f7000)
        /hankin/lib/libvt_hook_kill.so (0x00007fe230ff4000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007fe230df0000)
        libncurses.so.5 => /lib/x86_64-linux-gnu/libncurses.so.5 (0x00007fe230bce000)
        libtinfo.so.5 => /lib/x86_64-linux-gnu/libtinfo.so.5 (0x00007fe2309a5000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007fe230788000)
        libutil.so.1 => /lib/x86_64-linux-gnu/libutil.so.1 (0x00007fe230585000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007fe23027c000)
        libexpat.so.1 => /lib/x86_64-linux-gnu/libexpat.so.1 (0x00007fe230052000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fe22fc88000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fe2313fa000)
```
没有python依赖，但是执行却报错有关python。

## 16、Could not find platform independent libraries Could not find platform dependent librarie
是因为gdb命令依赖python环境，需要安装python。
```
Could not find platform independent libraries <prefix>
Could not find platform dependent libraries <exec_prefix>
Consider setting $PYTHONHOME to <prefix>[:<exec_prefix>]
ImportError: No module named site
```

## 17、gdb调试秒崩溃的闪退程序
没有core文件生成，在/proc/sys/kernel/core_pattern发现生成在/tmp/目录下，但是是0大小的文件。
然后使用ulimit -c发现结果就是0，但是此时是超级管理员执行，在非管理员执行时发现是unlimited，这是一个大坑啊。

调试脚本见：D:\Github\Storage\shell\gdb_instantaneous_process.sh

## 18、下断点实战
示例demo见：D:\Github\Storage\c++\gdb\breakpoint.cpp

```
# 取消中断信号
handle SIGPIPE nostop
handle SIGUSR1 nostop
handle SIGSEGV nostop
dir /var/kvm_debug
b hcd-ehci.c:1659
```

注意一点：使用run命令的话是调试未执行的二进制文件，即通过run执行，如果是正在执行的程序你执行run的话会告诉你：
```
The program being debugged has been started already.
Start it from the beginning? (y or n) y
```

一般我们的实际场景是程序在运行，然后动态调整，即没有dump文件，以及不是一个独立程序。
```
[root@ubuntu0006:/media] #g++ test.cpp -g
[root@ubuntu0006:/media] #./a.out
2022-12-09 11:42:39: index = 0
2022-12-09 11:42:41: index = 1
2022-12-09 11:42:43: index = 2
2022-12-09 11:42:45: index = 3
2022-12-09 11:42:47: index = 4
2022-12-09 11:42:49: index = 5
2022-12-09 11:42:51: index = 6
已杀死

[root@ubuntu0006:/media] #ps aux | grep a.out
root      4883  0.0  0.0  13264  1532 pts/8    S+   11:42   0:00 ./a.out
root      5054  0.0  0.0  17088   984 pts/4    S+   11:42   0:00 grep --color=auto a.out
[root@ubuntu0006:/media] #gdb a.out -p 4883
GNU gdb (GDB) 8.2.1
.....
(gdb) bt
#0  0x00007f06769d4370 in nanosleep () from /lib/x86_64-linux-gnu/libc.so.6
#1  0x00007f06769d42da in sleep () from /lib/x86_64-linux-gnu/libc.so.6
#2  0x00000000004008df in main (argc=1, argv=0x7ffd9af00158) at test.cpp:32
(gdb) break test.cpp:33
Breakpoint 1 at 0x4008df: file test.cpp, line 33.
(gdb) info break
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x00000000004008df in main(int, char**) at test.cpp:33
(gdb) run   错误的演示，导致进程被杀死，应该是continue
The program being debugged has been started already.
Start it from the beginning? (y or n) y
Starting program: /media/Hankin/vdb/TransferStation/a.out
2022-12-09 11:45:25: index = 0

Breakpoint 1, main (argc=1, argv=0x7fffffffe3f8) at test.cpp:33
33                                                                              if (index == 20) {
```

## 19、高级用法之x命令
examine：检查;审查;考察;考查;调查;(仔细地)检验;测验(某人);（尤指在法庭上）审问，查问

可以使用examine命令（简写是x）来查看内存地址中的值。x命令的语法如下所示：
```
x /<n/f/u> <addr>

x /32xw 0xf5dd1550
```
n、f、u是可选的参数。
n 是一个正整数，表示显示内存的长度，也就是说从当前地址向后显示几个地址的内容。
f 表示显示的格式，参见上面。如果地址所指的是字符串，那么格式可以是s，如果是指令地址，那么格式可以是：
x 按十六进制格式显示变量。
d 按十进制格式显示变量。
u 按十六进制格式显示无符号整型。
o 按八进制格式显示变量。
t 按二进制格式显示变量。
a 按十六进制格式显示变量。
c 按字符格式显示变量。
f 按浮点数格式显示变量。
u表示从当前地址往后请求的字节数，如果不指定的话，GDB默认是4个bytes。u参数可以用下面的字符来代替，b表示单字节，h表示双字节，w表示四字节，g表示八字节。当我们指定了字节长度后，GDB会从指内存定的内存地址开始，读写指定字节，并把其当作一个值取出来。

## 20、dir命令
dir命令用来指定源文件目录。

比如file.c，cache.c和inode.c是三个源文件，已经编译为库lib

(gdb) dir /home/xxx/linux-2.6.30/fs/fat/file.c
这样在调试时就能链接到源文件

注意：
（1）目录分割符要用 / 或 \，不能用
（2）gdb只会在你指定的目录下找源代码，不会搜索子目录，

以上只是添加一个源文件，如果源文件较多，可以将目录列表写成一个文件srcdir.cmd，在GDB里面一次指定：
srcdir.cmd //这是只是文件名
dir /home/xxx/linux-2.6.30/fs/fat/file.c
dir /home/xxx/linux-2.6.30/fs/fat/cache.c
dir /home/xxx/linux-2.6.30/fs/fat/inode.c
…

然后在GDB里面使用source命令
Source srcdir.cmd

小技巧：
使用脚本生成srcdir.cmd
```
#!/bin/sh
find /home/xxx/linux-2.6.30/fs/fat/ -name "*" > srcdir.cmd
```

## 21、奇怪的现象
gdb打印出来的long占的字节长度和gcc或者g++编译处理的程序打印出来的不同。
更神奇的是：
```
[root@ubuntu0006:/media] #gdb
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word".
(gdb) print sizeof(long)
$1 = 4
(gdb) q
[root@ubuntu0006:/media] #gdb a.out
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from a.out...done.
(gdb) print sizeof(long)
$1 = 8
```
不抛弃不放弃，同事帮忙的google下查到gdb的一个bug讨论：
https://gcc.gnu.org/bugzilla/show_bug.cgi?id=80777
https://bugzilla.redhat.com/show_bug.cgi?id=518712

Fedora GDB is built in biarch mode to properly support both 32-bit and 64-bit programs.  For some reason the default is 32-bit.  I do not find such choice to be important enough to need a fix, please provide more reasons if you think so.

```
(gdb) print sizeof(long)
$1 = 4
(gdb) show architecture
The target architecture is set automatically (currently i386)
(gdb) set architecture i386:x86-64
The target architecture is assumed to be i386:x86-64
(gdb) print sizeof(long)
$2 = 8
(gdb) show architecture
The target architecture is assumed to be i386:x86-64
```

https://en.wikipedia.org/wiki/C_data_types
维基百科说数据类型只有最低位数要求，并没有确定的范围。

## 22、gdb调试中打印宏
其实这个问题有点愚蠢，宏需要打印出来检查吗。。。值又无法改变，但还是有方法打印的。

编译时添加添加-g3 -gdwarf-2参数即可。

demo见：D:\Github\Storage\c++\gdb\print_define.cpp
PS:闹了一个乌龙，一开始我gdb进去直接打印宏，能打出来就神奇了，需要挂载到程序中，运行起来，就需要用到下断点了。
```
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #g++ -g -g3 -gdwarf-2 test.cpp
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #gdb a.out
(gdb) print LOG_TIGGER
No symbol "LOG_TIGGER" in current context.
(gdb) break main
Breakpoint 1 at 0x400715: file test.cpp, line 18.
(gdb) r
Starting program: /media/Hankin/vdb/TransferStation/a.out

Breakpoint 1, main (argc=1, argv=0x7fffffffe3f8) at test.cpp:18
18          int x = LOG_TIGGER;
(gdb) print x
$1 = 0
(gdb) print LOG_TIGGER
$2 = 111

没有添加参数是这样：
(gdb) print LOG_TIGGER
No symbol "LOG_TIGGER" in current context.
```

## 23、内存竟被”无意“破坏，真相究竟如何？
内存是C/C++程序员的好帮手，我们通常说C/C++程序性能更高其原因之一就在于可以自己来管理内存，然而计算机科学中没有任何一项技术可以包治百病，内存问题也给C/C++程序员带来无尽的烦恼。

野指针、数组越界、错误的内存分配或者释放、多线程读写导致内存被破坏等等，这些都会导致某段内存中的数据被”无意“的破坏掉，这类bug通常很难定位，因为当程序开始表现异常时通常已经距离真正出问题的地方很远了，常用的程序调试方法往往很难排查此类问题。

既然这类问题通常是由于内存的读写造成，那么如果要是某一段内存被修改或者读取时我们能观察到此事件就好了，幸运的是这类技术已经实现了。

在GDB中你可以通过添加watchpoint来观察一段内存，这段内存被修改时程序将会停止，此时我们就能知道到底是哪行代码对该内存进行了修改，这功能是不是很强大。

感觉此翻操作落地不了实际场景中。。。。。。

demo见：D:\Github\Storage\c++\gdb\watchpoint_example.cpp
```
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #g++ watchpoint_example.cpp -g -lpthread -std=c++11
[root@ubuntu0006:/media/Hankin/vdb/TransferStation] #gdb a.out
(gdb) break watchpoint_example.cpp:31
Breakpoint 1 at 0x400f82: file watchpoint_example.cpp, line 31.
(gdb) run
Starting program: /media/Hankin/vdb/TransferStation/a.out
[Thread debugging using libthread_db enabled]
Using host libthread_db library "/lib/x86_64-linux-gnu/libthread_db.so.1".

Breakpoint 1, main () at watchpoint_example.cpp:31
31          cout << a << endl;
(gdb) print &a
$1 = (int *) 0x7fffffffe2d8
(gdb) watch *(int*)0x7fffffffe2d8
Hardware watchpoint 2: *(int*)0x7fffffffe2d8
(gdb) continue
Continuing.
4960
[New Thread 0x7ffff6f4e700 (LWP 28301)]
[Switching to Thread 0x7ffff6f4e700 (LWP 28301)]

Thread 2 "a.out" hit Hardware watchpoint 2: *(int*)0x7fffffffe2d8

Old value = 4960
New value = 1
memory_write (value=0x7fffffffe2d8) at watchpoint_example.cpp:19
19      }
(gdb) show can-use-hw-watchpoints
Debugger's willingness to use watchpoint hardware is 1.
(gdb) set can-use-hw-watchpoints 0
(gdb) show can-use-hw-watchpoints
Debugger's willingness to use watchpoint hardware is 0.
(gdb) info break
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400f82 in main() at watchpoint_example.cpp:31
        breakpoint already hit 1 time
2       hw watchpoint  keep y                      *(int*)0x7fffffffe2d8
        breakpoint already hit 1 time
(gdb) delete 2
(gdb) watch *(int*)0x7fffffffe2d8
Watchpoint 4: *(int*)0x7fffffffe2d8
(gdb) continue
Continuing.
4960
[New Thread 0x7ffff6f4e700 (LWP 2984)]
[Thread 0x7ffff6f4e700 (LWP 2984) exited]

Thread 1 "a.out" hit Watchpoint 4: *(int*)0x7fffffffe2d8

Old value = 4960
New value = 1
0x0000000000401269 in std::__shared_count<(__gnu_cxx::_Lock_policy)2>::~__shared_count (this=0x7fffffffe278,
    __in_chrg=<optimized out>) at /usr/include/c++/5/bits/shared_ptr_base.h:658
658             if (_M_pi != nullptr)
(gdb) info break
Num     Type           Disp Enb Address            What
1       breakpoint     keep y   0x0000000000400f82 in main() at watchpoint_example.cpp:31
        breakpoint already hit 1 time
3       watchpoint     keep y                      *(int*)0x7fffffffe2d8
        breakpoint already hit 1 time
```
通过上面操作可以发现show can-use-hw-watchpoints可以查看当前是硬件监测还是软件检测。通过set命令可以进行修改。

这一切都是CPU的功劳。
现代处理器中具有特殊的debug寄存器，x86处理器中是DR0到DR7寄存器，利用这些寄存器硬件可以持续检测处理器发出的用于读写内存的地址，更强大的是，不但硬件watchpoint可以检查内存地址，而且还是可以监测到底是在读内存还是在写内存。
利用gdb中的rwatch命令你可以来监测是否有代码读取了某段内存；利用gdb中的awatch命令你可以来检查是否有代码修改了某段内存；利用gdb中的watch命令你可以检查对某段内存是否有读或者写这两种情况。
一旦硬件监测到相应事件，就会暂停程序的运行并把控制权交给debugger，也就是这里的gdb，此时我们就可以对程序的状态进行详细的查看了，这种硬件本身支持的调试能力就是刚才提到的Hardware watchpoint。
有hardware watchpoint就会有software watchpoint，当硬件不支持hardware watchpoint时gdb会自动切换到software watchpoint，此时你的程序每被执行一条机器指令gdb就会查看相应的事件是否发生，因此software watchpoint要远比hardware watchpoint慢，你可以利用gdb中的”set can-use-hw-watchpoints“命令来控制gdb该使用哪类watchpoint。
值得注意的是，在多线程程序中software watchpoint作用有限，因为如果被检测的一段内存被其它线程修改(就像本文中的示例)那么gdb可能捕捉不到该事件。

## 24、程序闪退起不来
（1）怀疑可能是产生了core dump，但是在/other/core目录下未看到dump文件（程序强制退出或被杀死不产生dump，可以使用脚本gdb挂进去，脚本见 17、gdb调试秒崩溃的闪退程序）
（2）日志未看出任何异常
（3）使用journalctl -f命令查看，发现报错symbol lookup error: hankin-spicec: undefined symbol: usbredirhost_init_same_model_printer_list\n"。
查看依赖情况：
```
root@hankin:~# readelf -d /usr/local/bin/hankin-spicec | grep host
 0x0000000000000001 (NEEDED)             Shared library: [libusbredirhost.so.1]
root@hankin:~# ldd /usr/local/bin/hankin-spicec | grep host
        libusbredirhost.so.1 => /usr/local/lib/libusbredirhost.so.1 (0x00007f45d7cec000)
root@hankin:~# ls -l /usr/local/lib/libusbredirhost.so.1*
lrwxrwxrwx 1 root staff     28 Feb 13 20:29 /usr/local/lib/libusbredirhost.so.1 -> libusbredirhost.so.1.0.0.bak
-rwxr-xr-x 1 root root  304096 Feb 13 03:09 /usr/local/lib/libusbredirhost.so.1.0.0
-rwxr-xr-x 1 user user  302680 Dec 16 01:04 /usr/local/lib/libusbredirhost.so.1.0.0.bak
```
找到问题原因，软链接链接的文件有问题，链接到了备份文件，而不是正确的文件。
真有毛病，以为发现一个bug问题，打算去上报，遇到问题自己要先排查排查，可能是我操作问题或者是环境问题，不要找人解决找到问题原因后很尴尬。

## 25、gdb调试出现value optimized out解决方法
现象：
gdb调试 出现value optimized out解决方法

原因：
由于gcc在编译过程中默认使用-O2优化选项，希望进行单步跟踪调试时，应使用-O0选项。

解决办法：
使用-O0选项

附录（优化等级的说明）：
这个选项控制所有的优化等级。使用优化选项会使编译过程耗费更多的时间，并且占用更多的内存，尤其是在提高优化等级的时候。 -O设置一共有五种：-O0、-O1、-O2、-O3和-Os。除了-O0以外，每一个-O设置都会多启用几个选项，请查阅gcc手册的优化选项章节

```
-O0：这个等级（字母“O”后面跟个零）关闭所有优化选项，也是CFLAGS或CXXFLAGS中没有设置-O等级时的默认等级。这样就不会优化代码，这通常不是我们想要的。
-O1：这是最基本的优化等级。编译器会在不花费太多编译时间的同时试图生成更快更小的代码。这些优化是非常基础的，但一般这些任务肯定能顺利完成。
-O2：-O1的进阶。这是推荐的优化等级，除非你有特殊的需求。-O2会比-O1启用多一些标记。设置了-O2后，编译器会试图提高代码性能而不会增大体积和大量占用的编译时间。
-O3：这是最高最危险的优化等级。用这个选项会延长编译代码的时间，并且在使用gcc4.x的系统里不应全局启用。自从3.x版本以来gcc的行为已经有了极大地改变。在3.x，-O3生成的代码也只是比-O2快一点点而已，而gcc4.x中还未必更快。用-O3来编译所有的软件包将产生更大体积更耗内存的二进制文件，大大增加编译失败的机会或不可预知的程序行为（包括错误）。这样做将得不偿失，记住过犹不及。在gcc 4.x.中使用-O3是不推荐的。
-Os：这个等级用来优化代码尺寸。其中启用了-O2中不会增加磁盘空间占用的代码生成选项。这对于磁盘空间极其紧张或者CPU缓存较小的机器非常有用。但也可能产生些许问题，因此软件树中的大部分ebuild都过滤掉这个等级的优化。使用-Os是不推荐的。
正如前面所提到的，-O2是推荐的优化等级。如果编译软件出现错误，请先检查是否启用了-O3。再试试把CFLAGS和CXXFLAGS倒回到较低的等级，如-O1甚或-O0 -g2 -ggdb（用来报告错误和检查可能存在的问题），再重新编译。
-O0 不进行优化处理。
-O 或 -O1 优化生成代码。
-O2 进一步优化。
-O3 比 -O2 更进一步优化，包括 inline 函数。
```

## 26、囧事：gdb调试把系统调卡住了
写了一个demo，需要传入一个数字参数，但是出现段错误，因此使用gdb调试，结果：
```
[root@ubuntu0006:~/cmake] #gdb ./a.out 1
GNU gdb (GDB) 8.2.1
Copyright (C) 2018 Free Software Foundation, Inc.
License GPLv3+: GNU GPL version 3 or later <http://gnu.org/licenses/gpl.html>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
Type "show copying" and "show warranty" for details.
This GDB was configured as "x86_64-pc-linux-gnu".
Type "show configuration" for configuration details.
For bug reporting instructions, please see:
<http://www.gnu.org/software/gdb/bugs/>.
Find the GDB manual and other documentation resources online at:
    <http://www.gnu.org/software/gdb/documentation/>.

For help, type "help".
Type "apropos word" to search for commands related to "word"...
Reading symbols from ./a.out...done.
Attaching to program: /root/cmake/a.out, process 1
Reading symbols from /lib64/ld-linux-x86-64.so.2...(no debugging symbols found)...done.
0x00007f50e0d73b13 in ?? ()
(gdb) r
The program being debugged has been started already.
Start it from the beginning? (y or n) y

Network error: Software caused connection abort
```

原因是忘记了gdb命令的使用方法：
```
[root@ubuntu0006:~/cmake] #gdb --help
This is the GNU debugger.  Usage:

    gdb [options] [executable-file [core-file or process-id]]
    gdb [options] --args executable-file [inferior-arguments ...]
```
调试core文件，则gdb xxx.exe xxx.core；调试进程gdb xxx.exe -p process-id。但是这个-p参数原来是可以省略的。
然后可以查看process-id为1的程序是什么，系统不卡才怪，由于gdb挂起超时重新恢复：
```
[root@ubuntu0006:~/cmake] #top
top - 21:03:56 up 11:28,  3 users,  load average: 0.04, 0.07, 0.08
Tasks: 199 total,   1 running, 198 sleeping,   0 stopped,   0 zombie
%Cpu(s):  1.4 us,  1.6 sy,  0.0 ni, 95.5 id,  0.5 wa,  0.0 hi,  0.0 si,  0.9 st
KiB Mem :  8174988 total,  6365976 free,   488148 used,  1320864 buff/cache
KiB Swap:  2095100 total,  2095100 free,        0 used.  7340056 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
  587 avahi     20   0   45304   3960   3320 S   6.2  0.0   2:13.78 avahi-daemon
    1 root      20   0  119340   5380   3860 S   0.0  0.1   0:02.25 systemd
```

## 27、gdb调试输出map变量
https://www.cnblogs.com/silentNight/p/5466418.html
调试记录见：D:\Github\Storage\c++\gdb\print_map
```
(gdb) b 27
Breakpoint 1 at 0x40177f: file a.cpp, line 27.
(gdb) bt
No stack.
(gdb) r
Starting program: /root/cmake/a.out

Breakpoint 1, main () at a.cpp:27
27          map<string, int*>::iterator it;
(gdb) bt
#0  main () at a.cpp:27
(gdb) p *this
No symbol "this" in current context.
(gdb) info local
map_ = {_M_t = {
    _M_impl = {<std::allocator<std::_Rb_tree_node<std::pair<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const, int*> > >> = {<__gnu_cxx::new_allocator<std::_Rb_tree_node<std::pair<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const, int*> > >> = {<No data fields>}, <No data fields>},
      _M_key_compare = {<std::binary_function<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, bool>> = {<No data fields>}, <No data fields>}, _M_header = {_M_color = std::_S_red,
        _M_parent = 0x6182d0, _M_left = 0x617c40, _M_right = 0x618030}, _M_node_count = 28}}}
it = {_M_node = 0x7ffff7dd3340}
(gdb) p *map_
No symbol "operator*" in current context.
(gdb) source gdb.gdb
(gdb) help pmap
    Prints std::map<TLeft and TRight> or std::multimap<TLeft and TRight> information. Works for std::multimap as well.
    Syntax: pmap <map> <TtypeLeft> <TypeRight> <valLeft> <valRight>: Prints map size, if T defined all elements or just element(s) with val(s)
    Examples:
    pmap m - prints map size and definition
    pmap m int int - prints all elements and map size
    pmap m int int 20 - prints the element(s) with left-value = 20 (if any) and map size
    pmap m int int 20 200 - prints the element(s) with left-value = 20 and right-value = 200 (if any) and map size
(gdb) pmap map_
Map type = std::map<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >, int*, std::less<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > >, std::allocator<std::pair<std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> > const, int*> > >
Use pmap <variable_name> <left_element_type> <right_element_type> to see the elements in the map.
Map size = 28
(gdb) pmap map_ int int
elem[0].left: $2 = 6388848
elem[0].right: $3 = 0
elem[1].left: $4 = 6388960
elem[1].right: $5 = 0
elem[2].left: $6 = 6389968
elem[2].right: $7 = 0
elem[3].left: $8 = 6390080
elem[3].right: $9 = 0
elem[4].left: $10 = 6390192
elem[4].right: $11 = 0
elem[5].left: $12 = 6390304
elem[5].right: $13 = 0
elem[6].left: $14 = 6390416
elem[6].right: $15 = 0
elem[7].left: $16 = 6390528
elem[7].right: $17 = 0
elem[8].left: $18 = 6390640
```

## 28、汇编指令调试
测试文件：D:\Github\Storage\c++\gdb\example.c
注意：对于pdb文件如果重新编译生成的符号是对不上的。

有符号表：
```
(gdb) bt
#0  0x00007ffff7a42438 in raise () from /lib/x86_64-linux-gnu/libc.so.6
#1  0x00007ffff7a4403a in abort () from /lib/x86_64-linux-gnu/libc.so.6
#2  0x00007ffff7a847fa in ?? () from /lib/x86_64-linux-gnu/libc.so.6
#3  0x00007ffff7a8d38a in ?? () from /lib/x86_64-linux-gnu/libc.so.6
#4  0x00007ffff7a9158c in free () from /lib/x86_64-linux-gnu/libc.so.6
#5  0x000000000040075e in example1 () at l.c:40
#6  0x00000000004007d3 in main (argc=1, argv=0x7fffffffe468) at l.c:62
```

没有符号表的调试技巧。
```
(gdb) bt
#0  0x00007ffff7a42438 in raise () from /lib/x86_64-linux-gnu/libc.so.6
#1  0x00007ffff7a4403a in abort () from /lib/x86_64-linux-gnu/libc.so.6
#2  0x00007ffff7a847fa in ?? () from /lib/x86_64-linux-gnu/libc.so.6
#3  0x00007ffff7a8d38a in ?? () from /lib/x86_64-linux-gnu/libc.so.6
#4  0x00007ffff7a9158c in free () from /lib/x86_64-linux-gnu/libc.so.6
#5  0x000000000040075e in example1 ()
#6  0x00000000004007d3 in main ()
```

跳转到崩溃那一帧：f 5
```
(gdb) f 5
#5  0x000000000040075e in example1 ()
```

使用diplay /20i $pc查看崩溃时在执行的汇编命令：
- display 是调试器中的一个命令，用于显示特定变量或表达式的值。
- /20i 是 display 命令的选项之一，表示显示当前指令指针 ($pc) 所指向的汇编指令及其周围的 20 条指令。
- $pc 是一个特殊的调试器变量，代表当前指令指针寄存器的值，即正在执行的指令的地址。
```
(gdb) display /20i $pc
1: x/20i $pc
=> 0x40075e <example1+81>:      movq   $0x0,-0x8(%rbp)
   0x400766 <example1+89>:      nop
   0x400767 <example1+90>:      leaveq
   0x400768 <example1+91>:      retq
   0x400769 <example2>: push   %rbp
   0x40076a <example2+1>:       mov    %rsp,%rbp
   0x40076d <example2+4>:       sub    $0x10,%rsp
   0x400771 <example2+8>:       mov    $0x4,%edi
   0x400776 <example2+13>:      callq  0x400550 <malloc@plt>
   0x40077b <example2+18>:      mov    %rax,-0x8(%rbp)
   0x40077f <example2+22>:      mov    -0x8(%rbp),%rax
   0x400783 <example2+26>:      mov    %rax,%rdi
   0x400786 <example2+29>:      callq  0x400500 <free@plt>
   0x40078b <example2+34>:      mov    -0x8(%rbp),%rax
   0x40078f <example2+38>:      movl   $0x14,(%rax)
   0x400795 <example2+44>:      nop
   0x400796 <example2+45>:      leaveq
   0x400797 <example2+46>:      retq
   0x400798 <main>:     push   %rbp
   0x400799 <main+1>:   mov    %rsp,%rbp
```
崩溃点在<example1+81>地址。

使用info r命令打印寄存器的值:
```
(gdb) info r
rax            0x0                 0
rbx            0x0                 0
rcx            0x7ffff7a42438      140737348117560
rdx            0x6                 6
rsi            0x194               404
rdi            0x194               404
rbp            0x7fffffffe350      0x7fffffffe350
rsp            0x7fffffffe340      0x7fffffffe340
r8             0x4                 4
r9             0x0                 0
r10            0x8                 8
r11            0x246               582
r12            0x400570            4195696
r13            0x7fffffffe460      140737488348256
r14            0x0                 0
r15            0x0                 0
rip            0x40075e            0x40075e <example1+81>
eflags         0x246               [ PF ZF IF ]
cs             0x33                51
ss             0x2b                43
ds             0x0                 0
es             0x0                 0
fs             0x0                 0
gs             0x0                 0
```

使用64位ida软件打开a.out文件，以ELF64 for x86-64 (Executable) [elf64.dll]打开：
- 找好example1函数
- 右键从Graph view切换到Text view
- 找到public example1位置000000000040070D，计算000000000040070D+0x51(81)=0x40075E，即跳到<example1+81>地址
- 按F5分析当前崩溃点前后的伪代码

```
和gdb命令中对的上
.text:0000000000400756                 mov     rdi, rax        ; ptr
.text:0000000000400759                 call    _free
.text:000000000040075E                 mov     [rbp+s], 0
.text:0000000000400766                 nop
.text:0000000000400767                 leave
.text:0000000000400768                 retn

代码比较简单，直接被ida软件分析出大概的代码内容了
void example1()
{
  size_t v0; // rax
  char *s; // [rsp+8h] [rbp-8h]

  s = (char *)malloc(0x28uLL);
  v0 = strlen(s);
  printf("strlen = %ld, sizeof = %ld\n", v0, 8LL);
  free(s);
  free(s);
}
```

### IDA软件中的 "ELF64 for x86-64 (Executable) [elf64.dll]" 和 "Binary file" 是两种不同的文件类型。
"ELF64 for x86-64 (Executable) [elf64.dll]":
这是一种特定的文件类型，用于表示可执行的 ELF64 格式的文件。
ELF（Executable and Linkable Format）是一种常见的可执行文件格式，广泛用于许多操作系统，包括 Linux 和 Unix 系统。
"ELF64 for x86-64" 表示这是一个 64 位的 ELF 文件，用于 x86-64 架构的处理器。
这种文件类型通常包含可执行代码、数据段、符号表、重定位信息等。

"Binary file":
这是一个通用的术语，用于表示任何二进制文件，无论其具体的文件格式或类型。
二进制文件是一种以二进制形式存储的文件，其中包含机器可执行的指令、数据或其他二进制数据。
"Binary file" 可以是任何类型的二进制文件，例如可执行文件、库文件、目标文件等。
因此，"ELF64 for x86-64 (Executable) [elf64.dll]" 是一种特定的文件类型，表示可执行的 ELF64 格式文件，而 "Binary file" 是一个通用的术语，表示任何类型的二进制文件。

## 29、实战中下断点调试
```
break function_name
continue
bt
启用core文件生成（可能不需要这一步）：ulimit -c unlimited
generate-core-file core文件名（绝对路径，不绝对估计也行吧）
```

## 30、gdb重定向stdout和stderr
调试的时候需要一个存在堆栈的程序，如除0崩溃。

call命令：调用程序中可见的函数，并传递“参数”，如：call gdb_test(55)

但运行中的进程可能启动方式不一致，导致gdb中调用call xxxx时无法输出在gdb调试内容中

解决方式：
尝试调用call查看gdb是否可以输出对应信息（stdout、stderr）
```
(gdb) call (void)printf("\n hello world \n")
```
如果看不到输出，关闭stdout和stderr的描述符
```
(gdb) call (int)close(1)
(gdb) call (int)close(2)
```

获取到gdb窗口所在的虚拟终端
```
(gdb) shell tty
/dev/pts/4
```

重新打开stdout和stderr，并且把他们关联到gdb窗口所在的虚拟终端
```
(gdb) p (int)open("/dev/pts/1", 2) 
$1 = 1 
(gdb) p (int)open("/dev/pts/1", 2) 
$2 = 2
```
注意，如果执行结果不是以上的1、2，则需要重新close和open

## 31、使用info line查看函数对应的行数
```
(gdb) disassemble main
Dump of assembler code for function main:
   0x0000000000400646 <+0>:     push   %rbp
   0x0000000000400647 <+1>:     mov    %rsp,%rbp
   0x000000000040064a <+4>:     sub    $0x20,%rsp
   0x000000000040064e <+8>:     movq   $0x400768,-0x18(%rbp)
   0x0000000000400656 <+16>:    movq   $0x4,-0x10(%rbp)
   0x000000000040065e <+24>:    mov    $0x400776,%esi
   0x0000000000400663 <+29>:    mov    $0x400778,%edi
   0x0000000000400668 <+34>:    callq  0x400520 <fopen@plt>
   0x000000000040066d <+39>:    mov    %rax,-0x8(%rbp)
   0x0000000000400671 <+43>:    cmpq   $0x0,-0x8(%rbp)
   0x0000000000400676 <+48>:    jne    0x400689 <main+67>
   0x0000000000400678 <+50>:    mov    $0x400783,%edi
   0x000000000040067d <+55>:    callq  0x400530 <perror@plt>
   0x0000000000400682 <+60>:    mov    $0x1,%eax
   0x0000000000400687 <+65>:    jmp    0x4006d5 <main+143>
   0x0000000000400689 <+67>:    mov    -0x10(%rbp),%rax
   0x000000000040068d <+71>:    mov    %eax,%esi
   0x000000000040068f <+73>:    mov    -0x18(%rbp),%rdx
   0x0000000000400693 <+77>:    mov    -0x8(%rbp),%rax
   0x0000000000400697 <+81>:    mov    %rdx,%rcx
   0x000000000040069a <+84>:    mov    %esi,%edx
   0x000000000040069c <+86>:    mov    $0x400796,%esi
   0x00000000004006a1 <+91>:    mov    %rax,%rdi
   0x00000000004006a4 <+94>:    mov    $0x0,%eax
   0x00000000004006a9 <+99>:    callq  0x400510 <fprintf@plt>
   0x00000000004006ae <+104>:   mov    -0x8(%rbp),%rax
   0x00000000004006b2 <+108>:   mov    %rax,%rdi
   0x00000000004006b5 <+111>:   callq  0x4004e0 <fclose@plt>
   0x00000000004006ba <+116>:   mov    -0x10(%rbp),%rax
   0x00000000004006be <+120>:   mov    %rax,%rsi
   0x00000000004006c1 <+123>:   mov    $0x4007a0,%edi
   0x00000000004006c6 <+128>:   mov    $0x0,%eax
   0x00000000004006cb <+133>:   callq  0x4004f0 <printf@plt>
   0x00000000004006d0 <+138>:   mov    $0x0,%eax
   0x00000000004006d5 <+143>:   leaveq
   0x00000000004006d6 <+144>:   retq
End of assembler dump.
(gdb) info line fopen
No line number information available for address 0x400520 <fopen@plt>
(gdb) info line main
Line 3 of "i.c" starts at address 0x400646 <main> and ends at 0x40064e <main+8>.
(gdb) info line 0x400689
Function "0x400689" not defined.
(gdb) q
```