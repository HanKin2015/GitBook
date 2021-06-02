# 编译警告

## 1、warning: function declaration isn't a prototype [-Wstrict-prototypes]

即使函数括号内没有任何参数，也要加一个void类型，来避免这种warning。

prototype：原型、雏形

## 2、warning: no previous prototype for 'XXXX' [-Wmissing-prototypes]

如果告警函数只在文件内部使用，在函数前面添加static即可消除告警


## 3、warning: statement with no effect [-Wunused-value]

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
这句话说明了编译中的所有警告都是错误，可以添加wno-error参数关闭。

## 11、cp命令覆盖文件需要确认的解决方法
我使用了-f选项，但是拷贝覆盖还是需要确认，最终发现是alias cp='cp -i'这条命令导致。删除即可。















