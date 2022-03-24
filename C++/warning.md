# 编译警告
编译选项查询1：https://blog.csdn.net/haohao456abc/article/details/80152413
编译选项查询2：https://blog.csdn.net/pengfei240/article/details/55839106

-Wall，打开gcc的所有警告。
-Werror，它要求gcc将所有的警告当成错误进行处理。
-Wno-error，它要求gcc将所有的警告都忽略
-Wshadow：某语句块作用域变量与更大作用域的另一变量同名时发出警告（此警告未包含在-Wall选项中，需单独开启）
-Wno-error  <<====>>  -Wno-error=error
-Wno-error=strict-overflow  <<====>>  -Wno-strict-overflow

注意：Werror需要在Wall参数下才能生效，默认是关闭所有警告的。

## 1、warning: function declaration isn't a prototype [-Wstrict-prototypes]

即使函数括号内没有任何参数，也要加一个void类型，来避免这种warning。

prototype：原型、雏形

## 2、warning: no previous prototype for 'XXXX' [-Wmissing-prototypes]

如果告警函数只在文件内部使用，在函数前面添加static即可消除告警


## 3、warning: statement with no effect [-Wunused-value]
for(j=1;j<m;j+2)
j+2是没有任何效果的语句

这里并不是未使用，而是无意义。

## 4、warning: nested extern declaration of 'XXXX' [-Wnested-externs]
-Wnested-externs	如果某extern声明出现在函数内部,编译器就发出警告

## 5、error: expected declaration specifiers or ‘...’ before numeric constant
我实际解决是在qemu-common.h前面引入了一个头文件#include "qemu/osdep.h"。
```
#include <stdio.h>
 
#define VALUE 1
 
int func(int a)
{
    printf("%d\n",a);
    return 0;
}
 
int main()
{
    int func(VALUE);	// 这里多加了int类型报错
    return 0;
}
```

## 6、implicit declaration of function 警告解决方法 （函数的隐式说明）
是因为函数没有在头文件（.h）定义，这就导致编译的时候没法正确生成.o文件
常常是由于该函数没有定义

## 7、void value not ignored as it ought to be解决方法
编译时出现“void value not ignored as it ought to be”错误，原因是因为，一个函数的返回值为void，但是你又把这个函数的返回值赋值给了一个具体类型的变量。


## 8、error: static declaration of 'cbrt' follows non-static declaration
一般来说是同一个变量或者函数冲突了
。

## 9、Cmake工程报warning: XXX is deprecated [-Wdeprecated-declarations]
简单来说就是在你代码中使用的XXX函数已经被弃用，消除警告就行或者更换函数
-Wno-error=deprecated-declarations -Wno-deprecated-declarations

## 10、GCC警告提示错误“cc1:all warnings being treated as errors”
这句话说明了编译中的所有警告都是错误，可以添加-Wno-error参数关闭。
configure的时候也会出现，应该有在系统里面设置了安全编译参数，需要./configure CPPFLAGS=-Wno-error。

## 11、cp命令覆盖文件需要确认的解决方法
我使用了-f选项，但是拷贝覆盖还是需要确认，最终发现是alias cp='cp -i'这条命令导致。删除即可。

## 12、inline函数未定义的引用
```inline_study.c
#include <stdio.h>

inline void func()
{
    printf("hello world!\n");
}

int main()
{
    func();
    return 0;
}

oot@ubuntu0006:/media/hankin/vdb/perl] #gcc inline_study.c
/tmp/cciZng2D.o：在函数‘main’中：
inline_study.c:(.text+0x81)：对‘func’未定义的引用
collect2: error: ld returned 1 exit status
[root@ubuntu0006:/media/hankin/vdb/perl] #g++ inline_study.c
[root@ubuntu0006:/media/hankin/vdb/perl] #
```

发现使用gcc编译有问题，使用g++就没有这个问题。
解决方法：https://blog.csdn.net/chenxizhan1995/article/details/103004166

## 13、在configure第三方库的时候出现cc1: all warnings being treated as errors
很奇怪，一个环境configure正常，通畅无阻，另外一个环境惨不忍睹。

无缘无故加了很多编译参数，gcc版本不同，结果是一样的。

configure有各种参数可加：
```
./configure CFLAGS="-Wno-error"		//失败
./configure CPPFLAGS="-Wno-error"	//成功
```
可能是g++版本不同，也是一样。

高版本gcc(>=5)对库的链接顺序有依赖，先右后左，如果找不到引用，可以尝试调整一下链接的顺序。

## 14、uinte32未定义
#include <stdint.h>里面是包含了uint32_t类型。
```
#include <basetsd.h>

or

#ifndef uinte32
#define uinte32 unsigned int
#endif

or

#ifndef uinte32
#define uinte32 uint32_t
#endif

or

typedef uint32_t uint32;
```

## 15、编译在qemu中自己新加独立的文件可能报大量的错误
```
#include "qemu/osdep.h"  /* Always first... */
#include <...>           /* then system headers... */
#include "..."           /* and finally QEMU headers. */
```

"qemu/osdep.h"包含预处理器宏，这些宏影响核心的系统头文件，比如<stdint.h>。该头文件必须第一个被include，以使被其他函数库所引用的核心系统头文件可以得到正确的qemu依赖的预处理宏。

相当于一个万能头文件。

## 16、arm平台下char默认数据类型与-fsigned-char
在PC上，char类型默认为signed-char,但是在一些嵌入式设备上，比如armi平台，char类型是当作unsigned char处理的，为了保持与PC一致，可以通过指定CFLAG += fsigned-char进行配置。

char变量在不同CPU架构下默认符号不一致，在x86架构下为signed char，在ARM64平台为unsigned char，移植时需要指定char变量为signed char。不然编译器可能会告警：warning: comparison is always false due to limitedrange of data type

## 17、编译参数
编译选项没有使用-g选项生成调试信息。原因：生成调试信息方便出Core后调试，对于附带调试信息后体积过大问题，可以strip去掉调试信息，并保留一份没strip的原始程序
编译选项没有开启-Wall选项开启所有告警。原因：开启后会将warning告警当error处理，需要消除所有warning
编译选项没有开启-fsigned-char参数。原因：X86_64下char默认是有符号的，Arm64下默认参数是无符号的，需要强制添加该参数使不同平台的行为一致
没有设置安全编码要求的编译选项-fPIE（程序）或-fPIC（动态库）

```
-fPIE与-fpie是等价的。这个选项与-fPIC/-fpic大致相同，不同点在于：-fPIC用于生成动态库，-fPIE用与生成可执行文件。再说得直白一点：-fPIE用来生成位置无关的可执行代码。

可以看出，可执行文件属性从executable变成了shared object.
$ gcc  helloworld.c
$ file a.out
a.out: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.9, not stripped
$ gcc -fpie -pie helloworld.c
$ file a.out
a.out: ELF 32-bit LSB shared object, Intel 80386, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.9, not stripped
接下来，我们就能实验了，使用strace命令来查看这两个a.out执行情况了。关于strace命令，可以参考strace命令介绍
在博主电脑上，有PIE时，执行第一个brk(0)系统调用时，返回的地址一直是变化的。而无PIE时，brk(O)系统调用返回地址一直不变。内容太多，不再贴出。

注：
linux系统调用brk()：
linux系统内部分配内存的系统调用，malloc()其实也是调用的brk().直接修改堆的大小，返回新内存区域的结束地址。
————————————————–
说实话，还是看的不是很懂，似懂非懂的感觉。

gcc -fpie -pie helloworld.c
gcc -fPIE -pie helloworld.c
gcc -fPIC helloworld.c
gcc -fpic helloworld.c
```



## 18、执行make出现“Warning: File `xxx.c‘ has modification time 2.6e+04 s in the future“警告的解决方法
原因是宿主机与虚拟机的系统时间没有同步造成的。
由于时钟同步问题，出现 warning:  Clock skew detected.  Your build may be incomplete.这样的警告，

最好的解决办法：
date -s "2021-6-30 14:50:00"
使用date命令同步时间。

解决办法：
```
find . -type f | xargs -n 5 touch
make clean
make
```
-n 5是显示5列的意思，touch命令居然可以做到同步文件时间，大概做了创建新文件但是内容不变操作。

## 19、有趣的事情儿之configure
忽然之间发现两个linux环境编译lzo库出现不同的结果。
使用./configure CPPFLAGS="-Wall -Werror"进行生成Makefile文件，一个环境成功一个环境失败。

两个怀疑的点：
- 成功的环境没有警告，编译一切正常
- 发现两个的gcc版本不同，一个是5.4.0编译失败，一个是4.7.2编译成功

准备安装一个最新的gcc11.1.0试试。

如果configure时不指定CPPFLAGS则会去找全局变量CPPFLAGS

### configure时参数使用变量时居然想不到方法解决
后来在shell代码审查中得到了答案。
```
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #echo $CARGS
CPPFLAGS='-Wno-error -fsigned-char' --enable-shared
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure $CARGS
configure: error: unrecognized option: `-fsigned-char''
Try `./configure --help' for more information
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #CARGS=CPPFLAGS="-Wno-error -fsigned-char" --enable-shared
Traceback (most recent call last):
  File "/usr/lib/command-not-found", line 27, in <module>
    from CommandNotFound.util import crash_guard
ModuleNotFoundError: No module named 'CommandNotFound'
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #CARGS='CPPFLAGS="-Wno-error -fsigned-char" --enable-shared'
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #echo $CARGS
CPPFLAGS="-Wno-error -fsigned-char" --enable-shared
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure $CARGS
configure: error: unrecognized option: `-fsigned-char"'
Try `./configure --help' for more information
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #CARGS='CPPFLAGS=-Wno-error -fsigned-char --enable-shared'
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #echo $CARGS
CPPFLAGS=-Wno-error -fsigned-char --enable-shared
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure $CARGS
configure: error: unrecognized option: `-fsigned-char'
Try `./configure --help' for more information
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #CARGS="CPPFLAGS=-Wno-error -fsigned-char --enable-shared"
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure $CARGS
configure: error: unrecognized option: `-fsigned-char'
Try `./configure --help' for more information
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #CARGS="CPPFLAGS='-Wno-error -fsigned-char' '--enable-shared'"
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #echo $CARGS
CPPFLAGS='-Wno-error -fsigned-char' '--enable-shared'
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure $CARGS
configure: error: unrecognized option: `-fsigned-char''
Try `./configure --help' for more information
[root@ubuntu0006:/media/hankin/vdb/lzo/lzo-2.09] #./configure CPPFLAGS='-Wno-error -fsigned-char' --enable-shared
```
CARGS=(CPPFLAGS=-Wno-error -fsigned-char --enable-shared)
./configure CPPFLAGS=${CARGS}	# 编译半成品 -Wno-error
./configure CPPFLAGS="${CARGS}"	# 编译半成品 -Wno-error
CARGS=('CPPFLAGS=-Wno-error -fsigned-char' --enable-shared)
./configure CPPFLAGS=${CARGS}	# 编译报错unrecognized option: `-fsigned-char'
./configure CPPFLAGS="${CARGS}"	# 编译成功 -Wno-error -fsigned-char
CARGS=("CPPFLAGS=-Wno-error -fsigned-char" --enable-shared)
./configure CPPFLAGS=${CARGS}	# 编译报错unrecognized option: `-fsigned-char'
./configure CPPFLAGS="${CARGS}"	# 编译成功 -Wno-error -fsigned-char

代码审查地址：https://github.com/koalaman/shellcheck/wiki/SC2086

## 20、warning: enumeration value ‘XXXX’ not handled in switch [-Wswitch]
switch语句中增加default: break;语句即可。

## 21、warning: deprecated conversion from string constant to ‘char*’ [-Wwrite-strings]
警告语句：char *str = "hello world";
修改语句：const char *str = "hello world";

## 22、error: 'vector' does not name a type
```
#include <vector>
using namespace std;
```
除了头文件，还有可能是域名空间std。

## 23、C++ error: 'string' does not name a type
```
#include <iostream>
#include <string.h>
using namespace std;
```

## 24、‘gettid’ was not declared in this scope
Additional to the solution provided by Glenn Maynard it might be appropriate to check the glibc version and only if it is lower than 2.30 define the suggested macro for gettid().
```
#if __GLIBC__ == 2 && __GLIBC_MINOR__ < 30
#include <sys/syscall.h>
#define gettid() syscall(SYS_gettid)
#endif
```

## 25、-Wold-style-declaration是c文件专属
```
[root@ubuntu0006:/media/hankin/vdb/study/dup] #g++ study_keyword.cpp -o i -Wall -Werror -Wold-style-declaration
cc1plus: error: command line option ‘-Wold-style-declaration’ is valid for C/ObjC but not for C++ [-Werror]
cc1plus: all warnings being treated as errors
[root@ubuntu0006:/media/hankin/vdb/study/dup] #gcc study_keyword.c -o i -Wall -Werror -Wold-style-declaration
study_keyword.c: In function ‘main’:
study_keyword.c:5:2: error: ‘static’ is not at beginning of declaration [-Werror=old-style-declaration]
  const static int a = 12;
  ^
cc1: all warnings being treated as errors
[root@ubuntu0006:/media/hankin/vdb/study/dup] #gcc study_keyword.c -Wall -Werror
[root@ubuntu0006:/media/hankin/vdb/study/dup] #

#include <stdio.h>

int main()
{
        const static int a = 12;
        static const int b = 12;
        printf("%d %d\n", a, b);
        return 0;
}
```
显示所有警告信息
gcc hello.c -o hello -Wall
禁止所有警告信息
gcc hello.c -o hello -w

但是无法显示上面这个警告，很奇怪。

## 26、warning: invalid suffix on literal; C++11 requires a space between literal and string macro [-Wliteral-suffix]
```
[root@ubuntu0006:/media/hankin/vdb/study/between_c++_c] #gcc test1.c -Wall -Werror -Wliteral-suffix
cc1: error: command line option ‘-Wliteral-suffix’ is valid for C++/ObjC++ but not for C [-Werror]
cc1: all warnings being treated as errors
[root@ubuntu0006:/media/hankin/vdb/study/between_c++_c] #g++ test2.cpp -std=c++11
test2.cpp:7:31: warning: invalid suffix on literal; C++11 requires a space between literal and string macro [-Wliteral-suffix]
 #define pri2(fmt, ...) printf("["__FILE__"] [%s] %d ",__FUNCTION__,__LINE__ );\
                               ^
test2.cpp:12:9: warning: invalid suffix on literal; C++11 requires a space between literal and string macro [-Wliteral-suffix]
  printf("["__FILE__"] [%s] %d\n", __FUNCTION__, __LINE__);
```

## 27、undefined reference to `pthread_mutex_trylock'
LOCAL_LDLIBS := -lpthread   -ldl

## 28、64位系统下连接静态库报错：“could not read symbols: Bad value”的解决办法
引用了一个静态库：“libjasgreen.a”，在连接该库的时候出错了，提示“can not be used when making a shared object”。
解决办法为：“recompile with -fPIC”。很简单：使用 -fPIC选项重新编译一下libjasgreen.a即可。

## 29、undefined reference to `clock_gettime'
链接选项里漏了-lrt

## 30、automake-1.14: command not found
主编译系统automake-1.11，肯定找不到automake-1.14 。

打开生成的makefile：

ACLOCAL = ${SHELL} /xxx/strongswan/strongswan-5.3.2/missing aclocal-1.14
ACLOCAL_AMFLAGS = -I m4/config

提示错误的地方应该在这里：

$(ACLOCAL_M4): $(am__aclocal_m4_deps)
$(am__cd) $(srcdir) && $(ACLOCAL) $(ACLOCAL_AMFLAGS)

如果能把Makefile中的1.14改成1.11，问题解决。

后面操作：automake aclocal automake

## 31、undefined reference to `itoa'
itoa不是c标准库的，有的编译环境有，有的则没有。

itoa是广泛使用的非标准C语言和C++语言扩展功能。但因为它是一个非标准的C / C++语言功能,因此不能好好的被所有编译器使用。在大多数Windows下的编译器通常在<cstdlib>头文件包含非标准函数。itoa()函数把整数转换成字符串，并返回指向转换后的字符串的指针。

## 32、C++ 遇到error: invalid use of incomplete type 'class '
缺失头文件，在文件开头添加#include <>就正常了。所以遇到这类问题首先检查是否头文件缺失。

## 33、sorry, unimplemented: non-trivial designated initializers not supported
这是因为C和C++结构体初始化不同造成的。

无法通过extern "C"来解决。

## 34、error C2653: “xxxxxxx”: 不是类或命名空间名称
一开始以为是类没有设置friend，后来才发现是没有导入类所在的头文件。

## 35、error: expected expression before ‘uint64_t’
```
uint64_t get_monolithic_time()
{
#ifdef HAVE_CLOCK_GETTIME
    struct timespec time_space;
    clock_gettime(CLOCK_MONOTONIC, &time_space);
    return uint64_t(time_space.tv_sec) * 1000 * 1000 * 1000 + uint64_t(time_space.tv_nsec);
#else
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return uint64_t(tv.tv_sec) * 1000 * 1000 * 1000 + uint64_t(tv.tv_usec) * 1000;
#endif
}

[root@ubuntu0006:/media/hankin/vdb/study] #g++ study_time1.c
[root@ubuntu0006:/media/hankin/vdb/study] #./a.out
mm_time: 3493622625308375
[root@ubuntu0006:/media/hankin/vdb/study] #gcc study_time1.c
study_time1.c: In function ‘get_monolithic_time’:
study_time1.c:22:12: error: expected expression before ‘uint64_t’
     return uint64_t(time_space.tv_sec) * 1000 * 1000 * 1000 + uint64_t(time_space.tv_nsec);
            ^
```
是不是很惊喜很意外？？？

修改成这样也是同样报错：
```
uint64_t ret = uint64_t(time_space.tv_sec);

[root@ubuntu0006:/media/hankin/vdb/study] #gcc study_time1.c
study_time1.c: In function ‘get_monolithic_time’:
study_time1.c:22:20: error: expected expression before ‘uint64_t’
     uint64_t ret = uint64_t(time_space.tv_sec);
                    ^
```










