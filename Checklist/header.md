# 认识头文件

unix standard header -> unistd.h
standard input output header -> stdio.h
standard library header -> stdlib.h
文件控制 -> fcntl.h

## 1、stdio.h
标准输入输出。
```
int getchar()//从标准输入设备写入一个字符
int putchar()//向标准输出设备读出一个字符
int scanf(char*format[,argument…])//从标准输入设备读入格式化后的数据
int printf(char*format[,argument…])//向标准输出设备输出格式化字符串
char* gets(char*string)//从标准输入设备读入一个字符串
int puts(char*string)//向标准输出设备输出一个字符串
int sprintf(char*string,char*format[,…])//把格式化的数据写入某个字符串缓冲区
```

## 2、stdlib.h
standard library标准库头文件。
```
stdlib.h里面定义了五种类型、一些宏和通用工具函数。 类型例如size_t、wchar_t、div_t、ldiv_t和lldiv_t； 宏例如EXIT_FAILURE、EXIT_SUCCESS、RAND_MAX和MB_CUR_MAX等等； 常用的函数如malloc()、calloc()、realloc()、free()、system()、atoi()、atol()、rand()、srand()、exit()等等。
```


## 3、stdarg.h
让函数能够接收可变参数，可变参数函数的参数数量是可变动的，它使用省略号来忽略之后的参数。
```
POSIX定义所遗留下的头文件varargs.h，它早在C标准化前就已经开始使用了且提供类似stdarg.h的功能。MSDN明确指出这一头文件已经过时，完全被stdarg.h取代。这个头文件不属于ISO C的一部分。文件定义在单一UNIX规范的第二个版本中。

stdarg.h数据类型
va_list 用来保存宏va_arg与宏va_end所需信息

stdarg.h宏
va_start 使va_list指向起始的参数
va_arg 检索参数
va_end 释放va_list
va_copy 拷贝va_list的内容
```
```
#include <stdio.h>
#include <stdarg.h>

/* 输出所有int类型的参数，直到-1结束，结束可以自己指定 */
void printargs(int arg1, ...)
{
    va_list ap;
    int i;
    va_start(ap, arg1);
    for (i = arg1; i != -1; i = va_arg(ap, int)) {
        printf("%d ", i);
    }
    va_end(ap);
    putchar('\n');
}

int main(void)
{
    printargs(5, 2, 14, 84, 97, 15, 24, 48, -1);
    printargs(84, 51, -1);
    printargs(-1);
    printargs(1, -1);
    return 0;
}
```

## 4、libusb.h
源文件：http://libusb.sourceforge.net/api-1.0/libusb_8h_source.html
驱动开发向来是内核开发中工作量最多的一块，Linux 平台上的usb驱动开发，主要有内核驱动的开发和基于libusb的无驱设计。

## 5、errno.h
定义了通过错误码来回报错误资讯的宏

## 6、unistd.h
该头文件由 POSIX.1 标准（可移植系统接口）提出，故所有遵循该标准的操作系统和编译器均应提供该头文件（如 Unix 的所有官方版本，包括 Mac OS X、Linux 等）。对于类 Unix 系统，unistd.h 中所定义的接口通常都是大量针对系统调用的封装（英语：wrapper functions），如 fork、pipe 以及各种 I/O 原语（read、write、close 等等）。

### 可移植操作系统接口
可移植操作系统接口（英语：Portable Operating System Interface，缩写为POSIX）是IEEE为要在各种UNIX操作系统上运行软件，而定义API的一系列互相关联的标准的总称，其正式称呼为IEEE Std 1003，而国际标准名称为ISO/IEC 9945。此标准源于一个大约开始于1985年的项目。POSIX这个名称是由理查德·斯托曼（RMS）应IEEE的要求而提议的一个易于记忆的名称。它基本上是Portable Operating System Interface（可移植操作系统接口）的缩写，而X则表明其对Unix API的传承。

注意：这个是unix系统专有。

## 7、inttypes.h
提供整数输入的各种转换宏
举个例子，PRIi8、PRIu8、PRIo8以及PRIx8，其中i为有符号，u为无符号，o为8进制以及x为16进制。
提供各种进制的转换宏
```
#include <stdio.h>
#include <inttypes.h>
 
int main() {
    int a = 5;
    printf("a=%"PRIu64"\n", a);
    return 0;
}
```