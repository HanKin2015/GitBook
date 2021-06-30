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
p(print)x: x是变量名，表示打印变量x的值
s: set设置变量值
wh: 查看代码位置
n(next): 表示执行下一步



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
print
set



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

### 7-1、gdb的查看源码

显示源代码

GDB 可以打印出所调试程序的源代码，当然，在程序编译时一定要加上-g的参数，把源程序信息编译到执行文件中。不然就看不到源程序了。当程序停下来以后，GDB会报告程序停在了那个文件的第几行上。你可以用list命令来打印程序的源代码。还是来看一看查看源代码的GDB命令吧。

list<linenum>

显示程序第linenum行的周围的源程序。

list<function>

显示函数名为function的函数的源程序。

list

显示当前行后面的源程序。

list -

显示当前行前面的源程序。

一般是打印当前行的上5行和下5行，如果显示函数是是上2行下8行，默认是10行，当然，你也可以定制显示的范围，使用下面命令可以设置一次显示源程序的行数。

setlistsize <count>

设置一次显示源代码的行数。

showlistsize

查看当前listsize的设置。

list命令还有下面的用法：

list<first>, <last>

显示从first行到last行之间的源代码。

list ,<last>

显示从当前行到last行之间的源代码。

list +

往后显示源代码。

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


## 8、附录二
gdb基本使用命令
1、运行命令
run：简记为 r ，其作用是运行程序，当遇到断点后，程序会在断点处停止运行，等待用户输入下一步的命令。
continue （简写c ）：继续执行，到下一个断点处（或运行结束）
next：（简写 n），单步跟踪程序，当遇到函数调用时，也不进入此函数体；此命令同 step 的主要区别是，step 遇到用户自定义的函数，将步进到函数中去运行，而 next 则直接调用函数，不会进入到函数体内。
step （简写s）：单步调试如果有函数调用，则进入函数；与命令n不同，n是不进入调用的函数的
until：当你厌倦了在一个循环体内单步跟踪时，这个命令可以运行程序直到退出循环体。
until+行号： 运行至某行，不仅仅用来跳出循环
finish： 运行程序，直到当前函数完成返回，并打印函数返回时的堆栈地址和返回值及参数值等信息。
call 函数(参数)：调用程序中可见的函数，并传递“参数”，如：call gdb_test(55)
quit：简记为 q ，退出gdb

2、设置断点
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

3、查看源码
list ：简记为 l ，其作用就是列出程序的源代码，默认每次显示10行。
list 行号：将显示当前文件以“行号”为中心的前后10行代码，如：list 12
list 函数名：将显示“函数名”所在函数的源代码，如：list main
list ：不带参数，将接着上一次 list 命令的，输出下边的内容。

4、打印表达式
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

5、查看运行信息
where/bt ：当前运行的堆栈列表；
bt backtrace 显示当前调用堆栈
up/down 改变堆栈显示的深度
set args 参数:指定运行时的参数
show args：查看设置好的参数
info program： 来查看程序的是否在运行，进程号，被暂停的原因。

6、分割窗口
layout：用于分割窗口，可以一边查看代码，一边测试：
layout src：显示源代码窗口
layout asm：显示反汇编窗口
layout regs：显示源代码/反汇编和CPU寄存器窗口
layout split：显示源代码和反汇编窗口
Ctrl + L：刷新窗口

7、cgdb强大工具
cgdb主要功能是在调试时进行代码的同步显示，这无疑增加了调试的方便性，提高了调试效率。界面类似vi，符合unix/linux下开发人员习惯;如果熟悉gdb和vi，几乎可以立即使用cgdb。
————————————————
版权声明：本文为CSDN博主「花开蝶自来-liu」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/niyaozuozuihao/article/details/91802994

