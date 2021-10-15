# extern用法

## 1、简介
extern "C"的主要作用就是为了能够正确实现C++代码调用其他C语言代码。加上extern "C"后，会指示编译器这部分代码按C语言（而不是C++）的方式进行编译。由于C++支持函数重载，因此编译器编译函数的过程中会将函数的参数类型也加到编译后的代码中，而不仅仅是函数名；而C语言并不支持函数重载，因此编译C语言代码的函数时不会带上函数的参数类型，一般只包括函数名。

这个功能十分有用处，因为在C++出现以前，很多代码都是C语言写的，而且很底层的库也是C语言写的，为了更好的支持原来的C代码和已经写好的C语言库，需要在C++中尽可能的支持C，而extern "C"就是其中的一个策略。

这个功能主要用在下面的情况：

C++代码调用C语言代码
在C++的头文件中使用
在多个人协同开发时，可能有的人比较擅长C语言，而有的人擅长C++，这样的情况下也会有用到

## 2、示例告诉你它的作用
存在文件：interface.c interface.h main.cpp

使用extern c后编译如下：
```
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #gcc -c interface.c interface.h
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #g++ -c main.cpp
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #strings interface.o
GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
interface.c
printf_array
printf
__stack_chk_fail
.symtab
.strtab
.shstrtab
.rela.text
.data
.bss
.rodata
.comment
.note.GNU-stack
.rela.eh_frame
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #strings main.o
GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
main.cpp
_ZStL8__ioinit
_Z41__static_initialization_and_destruction_0ii
_GLOBAL__sub_I_main
printf_array
_ZNSt8ios_base4InitC1Ev
__dso_handle
_ZNSt8ios_base4InitD1Ev
__cxa_atexit
.symtab
.strtab
.shstrtab
.rela.text
.data
.bss
.rela.init_array
.comment
.note.GNU-stack
.rela.eh_frame
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #g++ main.o interface.o
```

不使用extern c编译结果如下：
```
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #gcc -c interface.c interface.h
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #g++ -c main.cpp
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #strings main.o
GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
main.cpp
_ZStL8__ioinit
_Z41__static_initialization_and_destruction_0ii
_GLOBAL__sub_I_main
_Z12printf_arrayv
_ZNSt8ios_base4InitC1Ev
__dso_handle
_ZNSt8ios_base4InitD1Ev
__cxa_atexit
.symtab
.strtab
.shstrtab
.rela.text
.data
.bss
.rela.init_array
.comment
.note.GNU-stack
.rela.eh_frame
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #strings interface.o
GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
interface.c
printf_array
printf
__stack_chk_fail
.symtab
.strtab
.shstrtab
.rela.text
.data
.bss
.rodata
.comment
.note.GNU-stack
.rela.eh_frame
[root@ubuntu0006:/media/hankin/vdb/study/libusb/extern] #g++ interface.o main.cpp
/tmp/ccCistyy.o：在函数‘main’中：
main.cpp:(.text+0x5)：对‘printf_array()’未定义的引用
collect2: error: ld returned 1 exit status
```

其中_Z12printf_arrayv的最后一个v代表函数参数为void。


