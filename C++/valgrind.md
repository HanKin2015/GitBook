# valgrind分析内存泄露

## 1、简介
通过valgrind扫描，分析模块是否有内存泄露、内存溢出、双重释放等问题
https://blog.csdn.net/andylauren/article/details/93189740

单词英文并没有找到。

Valgrind查找内存泄露利器：Valgrind是一个GPL的软件，用于Linux（For x86, amd64 and ppc32）程序的内存调试和代码剖析。你可以在它的环境中运行你的程序来监视内存的使用情况，比如C 语言中的malloc和free或者 C++中的new和 delete。使用Valgrind的工具包，你可以自动的检测许多内存管理和线程的bug，避免花费太多的时间在bug寻找上，使得你的程序更加稳固。

Valgrind工具包包含多个工具，如Memcheck,Cachegrind,Helgrind, Callgrind，Massif。

## 2、安装
http://valgrind.org/downloads/current.html
源码下载
http://valgrind.org/docs/manual/manual.html
文档

apt install valgrind

## 2、检测内存泄露
```
valgrind --leak-check=full --show-reachable=yes --trace-children=yes ./a.out
```
其中--leak-check=full指的是完全检查内存泄漏，--show-reachable=yes是显示内存泄漏的地点，--trace-children=yes是跟入子进程。

如果您的程序是会正常退出的程序，那么当程序退出的时候valgrind自然会输出内存泄漏的信息。如果您的程序是个守护进程，那么也不要紧，我们 只要在别的终端下杀死memcheck进程（因为valgrind默认使用memcheck工具，就是默认参数—tools=memcheck）：
```
killall memcheck
```
这样我们的程序（./a.out）就被kill了。

## 3、检查代码覆盖和性能瓶颈
我们调用valgrind的工具执行程序：
```
#valgrind --tool=callgrind ./sec_infod
```
会在当前路径下生成callgrind.out.pid（当前生产的是callgrind.out.19689），如果我们想结束程序，可以：
```
#killall callgrind
```
然后我们看一下结果：
```
#callgrind_annotate --auto=yes callgrind.out.19689 > log
#vim log
```
使用后没有看出什么结论。

## 4、实战
```
#include <iostream>
#include <cstdio>
#include <cstdlib>

int main()
{
    int *p = new int;
    *p = 123;
    printf("*p = %d\n", *p);
    
    //delete p;
    //p = nullptr;
    return 0;
}
```

```
[root@ubuntu0006:/media/hankin/vdb/study] #valgrind --leak-check=full --show-leak-kinds=all ./a.out
==17860== Memcheck, a memory error detector
==17860== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==17860== Using Valgrind-3.11.0 and LibVEX; rerun with -h for copyright info
==17860== Command: ./a.out
==17860==
*p = 123
==17860==
==17860== HEAP SUMMARY:
==17860==     in use at exit: 72,704 bytes in 1 blocks
==17860==   total heap usage: 3 allocs, 2 frees, 73,732 bytes allocated
==17860==
==17860== 72,704 bytes in 1 blocks are still reachable in loss record 1 of 1
==17860==    at 0x4C2DB8F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==17860==    by 0x4EC3EFF: ??? (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.21)
==17860==    by 0x40106F9: call_init.part.0 (dl-init.c:72)
==17860==    by 0x401080A: call_init (dl-init.c:30)
==17860==    by 0x401080A: _dl_init (dl-init.c:120)
==17860==    by 0x4000C69: ??? (in /lib/x86_64-linux-gnu/ld-2.23.so)
==17860==
==17860== LEAK SUMMARY:
==17860==    definitely lost: 0 bytes in 0 blocks
==17860==    indirectly lost: 0 bytes in 0 blocks
==17860==      possibly lost: 0 bytes in 0 blocks
==17860==    still reachable: 72,704 bytes in 1 blocks
==17860==         suppressed: 0 bytes in 0 blocks
==17860==
==17860== For counts of detected and suppressed errors, rerun with: -v
==17860== ERROR SUMMARY: 0 errors from 0 contexts (suppressed: 0 from 0)
[root@ubuntu0006:/media/hankin/vdb/study] #g++ study_valgrind.cpp  -std=c++11                                  [root@ubuntu0006:/media/hankin/vdb/study] #valgrind --leak-check=full --show-leak-kinds=all ./a.out
==18330== Memcheck, a memory error detector
==18330== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==18330== Using Valgrind-3.11.0 and LibVEX; rerun with -h for copyright info
==18330== Command: ./a.out
==18330==
*p = 123
==18330==
==18330== HEAP SUMMARY:
==18330==     in use at exit: 72,708 bytes in 2 blocks
==18330==   total heap usage: 3 allocs, 1 frees, 73,732 bytes allocated
==18330==
==18330== 4 bytes in 1 blocks are definitely lost in loss record 1 of 2
==18330==    at 0x4C2E0EF: operator new(unsigned long) (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==18330==    by 0x400757: main (in /media/hankin/vdb/study/a.out)
==18330==
==18330== 72,704 bytes in 1 blocks are still reachable in loss record 2 of 2
==18330==    at 0x4C2DB8F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==18330==    by 0x4EC3EFF: ??? (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.21)
==18330==    by 0x40106F9: call_init.part.0 (dl-init.c:72)
==18330==    by 0x401080A: call_init (dl-init.c:30)
==18330==    by 0x401080A: _dl_init (dl-init.c:120)
==18330==    by 0x4000C69: ??? (in /lib/x86_64-linux-gnu/ld-2.23.so)
==18330==
==18330== LEAK SUMMARY:
==18330==    definitely lost: 4 bytes in 1 blocks
==18330==    indirectly lost: 0 bytes in 0 blocks
==18330==      possibly lost: 0 bytes in 0 blocks
==18330==    still reachable: 72,704 bytes in 1 blocks
==18330==         suppressed: 0 bytes in 0 blocks
==18330==
==18330== For counts of detected and suppressed errors, rerun with: -v
==18330== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
[root@ubuntu0006:/media/hankin/vdb/study] #g++ study_valgrind.cpp  -std=c++11 -g
[root@ubuntu0006:/media/hankin/vdb/study] #valgrind --leak-check=full --show-leak-kinds=all ./a.out
==19134== Memcheck, a memory error detector
==19134== Copyright (C) 2002-2015, and GNU GPL'd, by Julian Seward et al.
==19134== Using Valgrind-3.11.0 and LibVEX; rerun with -h for copyright info
==19134== Command: ./a.out
==19134==
*p = 123
==19134==
==19134== HEAP SUMMARY:
==19134==     in use at exit: 72,708 bytes in 2 blocks
==19134==   total heap usage: 3 allocs, 1 frees, 73,732 bytes allocated
==19134==
==19134== 4 bytes in 1 blocks are definitely lost in loss record 1 of 2
==19134==    at 0x4C2E0EF: operator new(unsigned long) (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==19134==    by 0x400757: main (study_valgrind.cpp:7)
==19134==
==19134== 72,704 bytes in 1 blocks are still reachable in loss record 2 of 2
==19134==    at 0x4C2DB8F: malloc (in /usr/lib/valgrind/vgpreload_memcheck-amd64-linux.so)
==19134==    by 0x4EC3EFF: ??? (in /usr/lib/x86_64-linux-gnu/libstdc++.so.6.0.21)
==19134==    by 0x40106F9: call_init.part.0 (dl-init.c:72)
==19134==    by 0x401080A: call_init (dl-init.c:30)
==19134==    by 0x401080A: _dl_init (dl-init.c:120)
==19134==    by 0x4000C69: ??? (in /lib/x86_64-linux-gnu/ld-2.23.so)
==19134==
==19134== LEAK SUMMARY:
==19134==    definitely lost: 4 bytes in 1 blocks
==19134==    indirectly lost: 0 bytes in 0 blocks
==19134==      possibly lost: 0 bytes in 0 blocks
==19134==    still reachable: 72,704 bytes in 1 blocks
==19134==         suppressed: 0 bytes in 0 blocks
==19134==
==19134== For counts of detected and suppressed errors, rerun with: -v
==19134== ERROR SUMMARY: 1 errors from 1 contexts (suppressed: 0 from 0)
```

总结：
1. 如果要找到具体在文件里面的位置，需要在编译时增加-g参数
2. 4 bytes in 1 blocks are definitely lost in loss record 1 of 2表示总共有两处可能存在内存泄露，这里明确地有内存泄露。
definitely：明确地
reachable：可获得的

## 5、命令
```
valgrind --trace-children=yes --track-origins=yes --tool=memcheck --leak-check=full  --show-leak-kinds=all --error-limit=no --log-file=test.log ./a.out

valgrind --leak-check=full --show-leak-kinds=all ./a.out
```
## 6、生成可视图
实在是没有看懂。

## 7、pthread_create内存泄露
发现只有调用pthread_join函数后才会消除，pthread_detach无效。




