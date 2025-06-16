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

为了提高产品质量保证，正常在软件转测试和预发布前需要对软件的内存使用进行检查，防止有内存泄漏、内存溢出、双重释放等问题，一般通过valgrind、asan等工具来检查。由于valgrind资源消耗比较大，严重影响了软件的正常运行，故一般采用gcc自带的asan来对软件进行内存检测，asan是gcc 4.8版本开始支持，其配置也比较简单。

Sanitizers 是谷歌发起的开源工具集，其功能非常强大，包括了：

AddressSanitizer
检查内存地址相关问题，包括释放后使用、重复释放、堆溢出、栈溢出等等问题。
MemorySanitizer
检查使用未初始化内存问题。
ThreadSanitizer
检查线程数据竞争和死锁问题。
LeakSanitizer
检查内存泄漏问题。
内核Sanitizer包括KASAN和KMSAN

Sanitizers 项目本是 LLVM 项目的一部分，但 GNU 也将该系列工具加入到了自家的GCC编译器中。

GCC从4.8版本开始支持 Address和 Thread Sanitizer
4.9版本开始支持 Leak Sanitizer 和 UB Sanitizer。
gcc 7.2 : Asan中集成了LSan。

## 2、asan使用步骤
1、编译配置：
LDFLAGS +="-fsanitize=address -fsanitize-recover=address,all -fno-omit-frame-pointer -fsanitize=leak"

静态库关联：
LDFLAGS += “-static-libasan”

动态库关联：
LDFLAGS += “-lasan”

-fsanitize=address：开启内存越界检测。

-fsanitize-recover=address：一般后台程序为保证稳定性，不能遇到错误就简单退出，而是继续运行，采用该选项支持内存出错之后程序继续运行，需要叠加设置ASAN_OPTIONS=halt_on_error=0才会生效；若未设置此选项，则内存出错即报错退出，但该配置在gcc 6.2版本才开始支持。

-fno-omit-frame-pointer：去使能栈溢出保护，即不忽略栈指针，栈的可读性更高

2、程序启动参数
ASAN_OPTIONS是Address-Sanitizier的运行选项环境变量。

halt_on_error=0：检测内存错误后继续运行

detect_leaks=1:使能内存泄露检测

malloc_context_size=15：内存错误发生时，显示的调用栈层数为15

log_path=/home/xos/asan.log:内存检查问题日志存放文件路径

suppressions=$SUPP_FILE:屏蔽打印某些内存错误

比如：
export ASAN_OPTIONS=“halt_on_error=1:disable_coredump=0:unmap_shadow_on_exit=1:log_path=/home/test/asan:malloc_context_size=15”

注意事项：
不开-g编译选项，不能定位到具体的代码行号
```
[root@ubuntu0006:~] #/usr/bin/g++-5 k.cpp -Wl,-rpath,/usr/local/gcc-8.1.0/lib64/ -fsanitize=address -fsanitize=leak -g
[root@ubuntu0006:~] #./a.out
x = 0x60200000eff0
xx = 0x60200000efd0
xxx = 0x60400000dfd0
=================================================================
==32668==ERROR: AddressSanitizer: alloc-dealloc-mismatch (operator new [] vs operator delete) on 0x60b00000af90
    #0 0x7f80cc87bb2a in operator delete(void*) (/usr/lib/x86_64-linux-gnu/libasan.so.2+0x99b2a)
    #1 0x400c7a in main /root/k.cpp:15
    #2 0x7f80cc0b483f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x2083f)
    #3 0x400aa8 in _start (/root/a.out+0x400aa8)

0x60b00000af90 is located 0 bytes inside of 100-byte region [0x60b00000af90,0x60b00000aff4)
allocated by thread T0 here:
    #0 0x7f80cc87b6b2 in operator new[](unsigned long) (/usr/lib/x86_64-linux-gnu/libasan.so.2+0x996b2)
    #1 0x400c6a in main /root/k.cpp:14
    #2 0x7f80cc0b483f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x2083f)

SUMMARY: AddressSanitizer: alloc-dealloc-mismatch ??:0 operator delete(void*)
==32668==HINT: if you don't care about these warnings you may set ASAN_OPTIONS=alloc_dealloc_mismatch=0
==32668==ABORTING
[root@ubuntu0006:~] #/usr/bin/g++-5 k.cpp -Wl,-rpath,/usr/local/gcc-8.1.0/lib64/ -fsanitize=address -fsanitize=leak
[root@ubuntu0006:~] #./a.out
x = 0x60200000eff0
xx = 0x60200000efd0
xxx = 0x60400000dfd0
=================================================================
==594==ERROR: AddressSanitizer: alloc-dealloc-mismatch (operator new [] vs operator delete) on 0x60b00000af90
    #0 0x7f52f9a18b2a in operator delete(void*) (/usr/lib/x86_64-linux-gnu/libasan.so.2+0x99b2a)
    #1 0x400c7a in main (/root/a.out+0x400c7a)
    #2 0x7f52f925183f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x2083f)
    #3 0x400aa8 in _start (/root/a.out+0x400aa8)

0x60b00000af90 is located 0 bytes inside of 100-byte region [0x60b00000af90,0x60b00000aff4)
allocated by thread T0 here:
    #0 0x7f52f9a186b2 in operator new[](unsigned long) (/usr/lib/x86_64-linux-gnu/libasan.so.2+0x996b2)
    #1 0x400c6a in main (/root/a.out+0x400c6a)
    #2 0x7f52f925183f in __libc_start_main (/lib/x86_64-linux-gnu/libc.so.6+0x2083f)

SUMMARY: AddressSanitizer: alloc-dealloc-mismatch ??:0 operator delete(void*)
==594==HINT: if you don't care about these warnings you may set ASAN_OPTIONS=alloc_dealloc_mismatch=0
==594==ABORTING
```

开启-O编译优化选项，会导致asan无法定位：D:\Users\Administrator\Desktop\asan_O0123.cpp
``

## 3、ASAN_OPTIONS所有的配置项及其含义
ASAN_OPTIONS是用于配置ASAN的选项的环境变量，可以用来控制ASAN的行为。ASAN_OPTIONS的值是一个用冒号分隔的字符串，每个部分都是一个配置项。下面列出了ASAN_OPTIONS所有的配置项及其含义：

halt_on_error=1 ：当ASAN检测到内存错误时，立即终止程序。
allow_user_segv_handler=1 ：允许用户自定义SIGSEGV信号的处理程序。
allocator_may_return_null=1 ：分配内存失败时，返回NULL而不是崩溃。
alloc_dealloc_mismatch=0 ：禁用分配和释放不匹配的检测。
alloc_dealloc_mismatch=1 ：开启分配和释放不匹配的检测，但是不会导致程序终止。
alloc_dealloc_mismatch=2 ：开启分配和释放不匹配的检测，同时会导致程序终止。
check_initialization_order=1 ：检测全局变量的初始化顺序。
check_malloc_usable_size=0 ：禁用malloc_usable_size函数的检测。
detect_container_overflow=1 ：检测容器类的溢出，例如vector、map等。
detect_leaks=1 ：检测内存泄漏，ASAN会在程序结束时输出内存泄漏的信息。
detect_odr_violation=1 ：检测ODR（One Definition Rule）违规，例如同一符号在不同编译单元中的定义不一致等。
detect_stack_use_after_return=1 ：检测函数返回后使用栈上的变量。
detect_invalid_pointer_pairs=2 ：检测指针对的无效组合，例如使用已经释放的指针等。
detect_invalid_pointer_derference=1 ：检测无效的指针解引用。
handle_abort=1 ：当程序调用abort函数时，ASAN会输出错误信息并终止程序。
handle_sigbus=1 ：当程序收到SIGBUS信号时，ASAN会输出错误信息并终止程序。
handle_sigfpe=1 ：当程序收到SIGFPE信号时，ASAN会输出错误信息并终止程序。
handle_sigill=1 ：当程序收到SIGILL信号时，ASAN会输出错误信息并终止程序。
handle_sigsegv=1 ：当程序收到SIGSEGV信号时，ASAN会输出错误信息并终止程序。
handle_sigtrap=1 ：当程序收到SIGTRAP信号时，ASAN会输出错误信息并终止程序。
max_redzone=2048 ：设置红区的最大大小。
new_delete_type_mismatch=0 ：禁用new和delete类型不匹配的检测。
new_delete_type_mismatch=1 ：开启new和delete类型不匹配的检测，但是不会导致程序终止。
new_delete_type_mismatch=2 ：开启new和delete类型不匹配的检测，同时会导致程序终止。
print_stats=1 ：打印内存使用统计信息。
quarantine_size_mb=256 ：设置quarantine（隔离区）的大小。
redzone=16 ：设置红区的大小。
replace_intrin=1 ：替换内置函数，例如memcpy、memset等，以便检测内存错误。
replace_str=1 ：替换字符串相关函数，例如strcpy、strcat等，以便检测内存错误。
strict_memcmp=1 ：开启memcmp函数的严格模式，以便检测内存错误。
symbolize=1 ：打印可读的堆栈信息，需要配合LLVM的llvm-symbolizer工具使用。
verbosity=1 ：设置ASAN的输出级别，值越大输出的信息越详细。

以上是ASAN_OPTIONS的所有配置项及其含义，可以根据需要进行配置。

## 4、举例使用
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

https://www.coder.work/article/3236742

## 5、无法检测文件描述符是否关闭
代码见：D:\Github\Storage\c++\standard_library\file\已打开文件可删除\fopen_example.c
D:\Github\Storage\c++\standard_library\file\已打开文件可删除\open_example.c

根据简介可知，那是否可以检测内存是否被释放呢？
答案是可检测，代码见：D:\Github\Storage\c++\内存泄露工具\address_sanitizer\malloc_no_free.cpp

AddressSanitizer (ASan) 是一种内存错误检测工具，它主要用于检测内存相关的错误，例如缓冲区溢出、使用已释放的内存等。ASan 并不是一个完整的静态分析工具，它无法检测所有类型的错误，包括文件描述符未关闭的问题。

文件描述符未关闭的问题是一种资源泄漏问题，它会导致程序占用过多的系统资源，最终可能导致程序崩溃或者系统崩溃。ASan 并不会直接检测文件描述符未关闭的问题，因为这个问题不是一个内存相关的错误。

不过，ASan 可以通过检测内存泄漏来间接地发现文件描述符未关闭的问题。当程序使用 malloc 或 new 等函数分配内存时，ASan 会跟踪这些内存块，并在程序结束时检查是否有未释放的内存块。如果有未释放的内存块，ASan 就会报告内存泄漏的错误，这可能是由于文件描述符未关闭导致的。

因此，虽然 ASan 不能直接检测文件描述符未关闭的问题，但它可以通过检测内存泄漏来间接地发现这个问题。开发人员可以结合其他工具和技术，例如静态分析工具和代码审查，来更全面地检测和修复文件描述符未关闭的问题。

## 6、可以使用什么工具能检测文件描述符未关闭
可以使用一些静态分析工具来检测文件描述符未关闭的问题，例如：

Coverity：Coverity 是一种商业静态分析工具，它可以检测 C/C++ 代码中的各种错误，包括文件描述符未关闭的问题。

Clang Static Analyzer：Clang Static Analyzer 是一个开源的静态分析工具，它可以检测 C/C++ 代码中的各种错误，包括文件描述符未关闭的问题。

PVS-Studio：PVS-Studio 是一种商业静态分析工具，它可以检测 C/C++ 代码中的各种错误，包括文件描述符未关闭的问题。

这些工具都可以在编译时对代码进行静态分析，检测出潜在的文件描述符未关闭的问题，并给出相应的警告或错误信息。开发人员可以根据这些信息及时修复代码中的问题，从而提高程序的稳定性和安全性。

测试发现clang这个工具并不能，也只能检测出内存泄露，代码见：D:\Github\Storage\c++\内存泄露工具\address_sanitizer\clang_example.c
还得是cppcheck工具好用，小巧才1.4MB左右，并且执行简单。代码见：D:\Github\Storage\c++\内存泄露工具\address_sanitizer\cppcheck_example.c

结论：暂时没有工具可以检测open函数打开的文件描述符未关闭问题。
动态和静态都不行。
自己猜测的原因：首先它仅仅是一个数字，在程序关闭后会自动回收。如果在程序中打开同一个文件多次，文件描述符数字会自动增加，也应该没有办法判断后面会不会关闭。总的来说，个人感觉静态工具应该能检测出来的，但是搜索了大量资料也没有一个明确的工具可以对齐进行检测。
https://blog.csdn.net/weixin_38331755/article/details/124545159

## 7、-fsanitize=address和-lasan区别
在大多数情况下，只需使用 -fsanitize=address 即可，编译器会自动处理所需的库链接。
-fsanitize=address 是编译器选项，用于启用 AddressSanitizer 功能，插入检测内存错误的代码。
-lasan 是链接器选项，用于链接 AddressSanitizer 的库，通常在使用 -fsanitize=address 时不需要显式指定。

## 8、asan报告分析
D:\Users\Administrator\Desktop\testmemleak.cpp
```
问题原因：
char *y = new char[100];
delete y;

列出出错的地方：delete y;
==26613==ERROR: AddressSanitizer: alloc-dealloc-mismatch (operator new [] vs operator delete) on 0x60b000003c10

列出内存分配的地方：char *y = new char[100];
0x60b000003c10 is located 0 bytes inside of 100-byte region [0x60b000003c10,0x60b000003c74)
allocated by thread T0 (event_base) here:

总结：
SUMMARY: AddressSanitizer: alloc-dealloc-mismatch (/lib/x86_64-linux-gnu/libasan.so.5+0xec128) in operator delete(void*, unsigned long)
==26613==HINT: if you don't care about these errors you may set ASAN_OPTIONS=alloc_dealloc_mismatch=0

错误之间以这个隔开：
===========

同一个地方出现两种类型错误：
SUMMARY: AddressSanitizer: new-delete-type-mismatch (/lib/x86_64-linux-gnu/libasan.so.5+0xec128) in operator delete(void*, unsigned long)
==26613==HINT: if you don't care about these errors you may set ASAN_OPTIONS=new_delete_type_mismatch=0
```

### 8-1、gcc5和gcc8版本差异带来不同的结果
gcc5版本AddressSanitizer在每次运行时只报告一个内存错误。这是因为在检测到一个错误后，程序的状态可能已经被破坏，导致后续的内存操作变得不可预测。因此，ASan 可能无法继续检测到其他错误。
但是gcc8版本可以一次性出所有内存地址错误。
gcc5版本内存泄露错误是可以一次性出，前提是不存在内存地址错误。

仔细发现会有AddressSanitizer和LeakSanitizer两种不同的检测，AddressSanitizer是致命错误，地址访问错误。

gcc5和gcc8链接的libasan.so版本不同，

### 8-2、









