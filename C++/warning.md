# 编译警告

-Wall，打开gcc的所有警告。
-Werror，它要求gcc将所有的警告当成错误进行处理。
-Wno-error，它要求gcc将所有的警告都忽略

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

## 16、warning: statement with no effect [-Wunused-value]





