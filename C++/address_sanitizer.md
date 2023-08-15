# AddressSanitizer

## 1、地址消毒
sanitizer：（食物加工设备所用的）消毒杀菌剂
AddressSanitizer：一种快速地址健全性检查器

https://docs.microsoft.com/en-us/cpp/sanitizers/asan?view=msvc-160

内存访问问题，如buffer越界访问，使用已经释放的内存等，一直都是诸如C，C++等编程语言所面对的大问题。目前有很多内存错误检测方法，但可能慢，也可能功能太有限，或者两者都有。
这篇论文论述地址消毒技术，一种新的内存错误检测技术。我们的工具检查对于堆，栈，全局变量的越界访问，以及释放后使用问题。它使用了一种特殊而简单的内存分配器以及代码实现，可以很方便的在任何编译器，二进制转换系统甚至硬件中实现。
地址消毒兼顾运行效率和功能的全面性，它平均仅降低系统73%的运行速度，并且它在错误发生的时刻（而不是之后）精确定位问题。它目前已经发现了chromium浏览器超过300个隐藏问题，以及其他软件的问题。

ASAN ，全称 AddressSanitizer，也即地址消毒技术。可以用来检测内存问题，例如缓冲区溢出或对悬空指针的非法访问等。根据谷歌的工程师介绍 ASAN 已经在 chromium 项目上检测出了300多个潜在的未知bug，而且在使用 ASAN 作为内存错误检测工具对程序性能损耗也是及其可观的。根据检测结果显示可能导致性能降低 2 倍左右，比 Valgrind （官方给的数据大概是降低 10-50 倍）快了一个数量级。而且相比于 Valgrind 只能检查到堆内存的越界访问和悬空指针的访问， ASAN 不仅可以检测到堆内存的越界和悬空指针的访问，还能检测到栈和全局对象的越界访问。这也是 ASAN 在众多内存检测工具的比较上出类拔萃的重要原因，基本上现在 C/C++ 项目都会使用 ASAN 来保证产品质量，尤其是大项目中更为需要。

AddressSanitizer (ASan) 是一种内存错误检测工具，用于检测 C/C++ 程序中的内存错误，例如使用已释放的内存、缓冲区溢出等。它是由 Google 开发的，现在已经被集成到许多编译器中，例如 Clang 和 GCC。

ASan 使用了一种内存隔离技术，它会在程序运行时动态地分配内存，并在内存块之间留下一些空间，这些空间被称为“防护带”。当程序访问这些防护带时，ASan 会检测到这个错误，并输出错误信息，包括错误的位置和类型。

ASan 可以检测到许多常见的内存错误，例如缓冲区溢出、使用已释放的内存、使用未初始化的内存等。它还可以检测到一些难以发现的内存错误，例如使用已经被修改的内存等。

使用 ASan 可以帮助开发人员及时发现和修复内存错误，从而提高程序的稳定性和安全性。

## 2、举例使用
demo见：D:\Github\Storage\c++\内存泄露工具\address_sanitizer
infect vt.传染;使携带病菌;使感染(计算机病毒);使感染（某种感情）
```
[root@ubuntu0006:/media/hankin/vdb/perl] #vim address_deinfect.cpp
[root@ubuntu0006:/media/hankin/vdb/perl] #g++ address_deinfect.cpp
[root@ubuntu0006:/media/hankin/vdb/perl] #./a.out
num[5] = 100
[root@ubuntu0006:/media/hankin/vdb/perl] #cat address_deinfect.cpp
#include <iostream>
#include <stdio.h>
using namespace std;

int main()
{
    // 被测代码：预埋一个栈溢出bug
    int num[5] = {0};
    num[5] = 100;
    printf("num[5] = %d\n", num[5]);
    return 0;
}
```
上述代码居然运行没有一点毛病。。。。。。

这时候如果加入地址消毒编译选项：
```
[root@ubuntu0006:/media/hankin/vdb/perl] #g++ address_deinfect.cpp -fsanitize=address
[root@ubuntu0006:/media/hankin/vdb/perl] #./a.out
=================================================================
==848==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7fffb2f0aa44 at pc 0x000000400bdb bp 0x7fffb2f0aa00 sp 0x7fffb2f0a9f0
WRITE of size 4 at 0x7fffb2f0aa44 thread T0
    #0 0x400bda in main (/media/hankin/vdb/perl/a.out+0x400bda)
    #1 0x7f2bc141c83f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x2083f)
    #2 0x400a38 in _start (/media/hankin/vdb/perl/a.out+0x400a38)

Address 0x7fffb2f0aa44 is located in stack of thread T0 at offset 52 in frame
    #0 0x400b15 in main (/media/hankin/vdb/perl/a.out+0x400b15)

  This frame has 1 object(s):
    [32, 52) 'num' <== Memory access at offset 52 overflows this variable
HINT: this may be a false positive if your program uses some custom stack unwind mechanism or swapcontext
      (longjmp and C++ exceptions *are* supported)
SUMMARY: AddressSanitizer: stack-buffer-overflow ??:0 main
Shadow bytes around the buggy address:
  0x1000765d94f0: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9500: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9510: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9520: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9530: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
=>0x1000765d9540: 00 00 f1 f1 f1 f1 00 00[04]f4 f3 f3 f3 f3 00 00
  0x1000765d9550: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9560: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9570: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9580: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
  0x1000765d9590: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
Shadow byte legend (one shadow byte represents 8 application bytes):
  Addressable:           00
  Partially addressable: 01 02 03 04 05 06 07
  Heap left redzone:       fa
  Heap right redzone:      fb
  Freed heap region:       fd
  Stack left redzone:      f1
  Stack mid redzone:       f2
  Stack right redzone:     f3
  Stack partial redzone:   f4
  Stack after return:      f5
  Stack use after scope:   f8
  Global redzone:          f9
  Global init order:       f6
  Poisoned by user:        f7
  Container overflow:      fc
  Array cookie:            ac
  Intra object redzone:    bb
  ASan internal:           fe
==848==ABORTING
```
-fno-omit-frame-pointer : 保留栈指针，打印有用的堆栈信息，方便asan定位问题时追踪
-fsanitize-recover=address : 在触发asan时，继续运行程序，需要配合环境变量ASAN_OPTIONS=halt_on_error=0:report_path=xxx使用
-O0 ： 不适用编译期优化，避免优化asan效果
-Wall : 显示所有告警信息

## 3、无法检测文件描述符是否关闭
代码见：D:\Github\Storage\c++\standard_library\file\已打开文件可删除\fopen_example.c
D:\Github\Storage\c++\standard_library\file\已打开文件可删除\open_example.c

根据简介可知，那是否可以检测内存是否被释放呢？
答案是可检测，代码见：D:\Github\Storage\c++\内存泄露工具\address_sanitizer\malloc_no_free.cpp




