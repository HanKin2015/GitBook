# 奇妙的玄学

## 1、有符号数和无符号数条件判断时的坑

有点意思，5居然不大于-5，是编译器傻了吗？不，这是因为，当有符号数与无符号数进行条件判断时，编译器会自动将有符号数隐式转化为无符号数，这时，-5就会变成一个极大的无符号整数，所以造成了逻辑判断上的错误。
当然，如果直接取两者的运算结果的话，结果还是正确的。
所以，当进行条件判断时，一定要注意条件运算符两端的数值的数据类型，以免造成判断上导致的流程错误，这错误可能是致命的。


```
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char ch[0x20] = "";
    //printf("%d %d\n", sizeof(ch), strlen(ch));

    char *p = (char *)malloc(-1);
    printf("%p %lu\n", p, sizeof(p));

    int a = -5;
    unsigned int b = 5;
    printf("int a = -5, uint b = 5\n");
    if (a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a不大于b\r\n");
    }

    // 这个判断不应该有问题吧
    if (a > 0 && a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a不大于b\r\n");
    }

    if (a <= 0) {
        printf("a不大于b\r\n");
    } else if (a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a小于b\r\n");
    }

	char c = 'G';
    char str[] = "hankin";
    printf("%c\n", str[-1]);
    return 0;
}


(nil) 8
int a = -5, uint b = 5
a大于b
a不大于b
a不大于b
空
```

## 2、代码中malloc分配-1时未崩溃
返回NULL，即0。

## 3、代码中发现是可以访问数组下标为-1不崩溃
并不是返回上一个地址的值。

## 4、地址消毒
AddressSanitizer：一种快速地址健全性检查器

内存访问问题，如buffer越界访问，使用已经释放的内存等，一直都是诸如C，C++等编程语言所面对的大问题。目前有很多内存错误检测方法，但可能慢，也可能功能太有限，或者两者都有。
这篇论文论述地址消毒技术，一种新的内存错误检测技术。我们的工具检查对于堆，栈，全局变量的越界访问，以及释放后使用问题。它使用了一种特殊而简单的内存分配器以及代码实现，可以很方便的在任何编译器，二进制转换系统甚至硬件中实现。
地址消毒兼顾运行效率和功能的全面性，它平均仅降低系统73%的运行速度，并且它在错误发生的时刻（而不是之后）精确定位问题。它目前已经发现了吃肉么浏览器超过300个隐藏问题，以及其他软件的问题。

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

作者：miaorry
链接：https://www.jianshu.com/p/f4d6d44683e1
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。





