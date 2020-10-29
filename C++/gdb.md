# gdb调试

## 0、常使用指令
b : blockpoint断点
l ：list,l -可以倒着看程序，后面可以接函数名或者行数
c：continue一步一步执行
bt：
q：quit退出
r：run程序运行
t:thread输出当前线程编号
where：感觉跟bt效果一样
h：help没啥用
i：info
p：print
s: set设置变量值
```
r + 程序输入参数
whatis + 变量   //获取变量类型
i + 各种参数
p + 变量        // 输出变量值
s + 变量
```

查看时是可以倒着看，最后是程序最开始出现的地方。
关键词：abort

## 1、调试没有符号表的程序
发行版的程序在编译的时候都是没有加上-g这个选项的，那么若是想调试一个程序，应该怎么办呢？
在加了-g选项时，是可以通过行号、函数名等进行断点的设置的，但是没有符号表的情况下，那么怎么来进行程序的断点的设置并进行调试呢？

gdb a.out
l
disassemble main
b *0x08048474   (地址前面加个*)
info b
r
c

## 2、有符号表的调试

## 3、gdb调试带参数的程序
gdb --args ./a.out 4
也可以在里面运行加参数：r 5


编译过程中需要添加-g选项，这样才会有符号表。
```
root@debian-sangfor:~/hejian/lock# gdb ./a.out
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

# 4、GDB：调试死锁
## 4-1、参考
https://blog.csdn.net/guowenyan001/article/details/46238355

## 4-2、编译运行
编译程序：gcc -g test.c -lpthread -o test
-g：添加调试符号表
-lpthread：解决线程函数定义

两个终端窗口，一个负责程序运行，另一个负责调试。

## 4-3、查看进程号
ps aux|grep test
ps -ef|grep test

## 4-4、查看进程中所有线程(查看线程号)
pstree -p 123

## 4-5、通过线程号调试
gdb
attach 线程号
bt

## 4-6、调试所有线程
gdb
attach 进程号
thread apply all bt

## 4-7、常用调试方法
ps -e|grep test
gdb test 进程号   启动gdb attach 进程
info threads        显示所有线程信息
thread 2              调到第2个线程
bt                        查看第2个线程的堆栈，即可可以看到线程死锁的地方

注意：这种方式需要正确指定test执行文件的路径位置，否则会出现无法找到符号表错误。

# 5、获取程序中的变量值并对其修改重新运行





# 7、总结
gdb调试只是找到程序出现异常的位置，具体问题原因还是需要结合代码查看问题关键所在。
https://developer.aliyun.com/mirror/










