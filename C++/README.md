[TOC]

# C++/C

学习和膜拜：https://codechina.csdn.net/mirrors/fengbingchun/messy_test


## 1、isspace
用于检查参数c是否为空格字符。
头文件：ctype.h

## 2、std::string::npos
std::string::npos是一个常数，它等于size_type类型可以表示的最大值，用来表示一个不存在的位置,类型一般是std::container_type::size_type。
```
#include <iostream>

int main(int argc, char *argv[]) {
    size_t a = -1;
    std::cout << "a : " << a << std::endl;
    std::cout << "npos : " << std::string::npos << std::endl;
    std::cout << "size_type max : " << std::numeric_limits<std::string::size_type>::max() << std::endl;
    std::cout << "size_t max : " << std::numeric_limits<size_t>::max() << std::endl;
    std::cout << "uint64_t max : " << std::numeric_limits<uint64_t>::max() << std::endl;
    return 0;
}


结果都是：18446744073709551615
```
## 3、replace
c里面的string也有replace函数。

## 4、字符串太长怎么办
```
#include <iostream>
#include <string>
using namespace std;
 
int main()
{
    //错误示例下一行前不能有空格
    char chstr[] = "abcabc\
                   abcabc";
    //错误示例'\'要紧挨着换行处的字符
    char chstr1[] = "abcabc \
abcabc";
    //方法1
    char chstr2[] = "abcabc\
abcabc";
    //方法2
    char chstr3[] = "abcabc"
        "abcabc";
	return 0;
}
```

## 5、作用域运算符

 ::是运算符中等级最高的，它分为三种：全局作用域符，类作用域符，命名空间作用域符 。

### 全局作用

全局作用域符号：当全局变量在局部函数中与其中某个变量重名，那么就可以用::来区分如：

```
char ch; //全局变量
void sleep（）
{
    char ch; //局部变量
    ch(局部变量) = ch(局部变量) *ch(局部变量) ;
    ::ch(全局变量) =::ch(全局变量) *ch(局部变量);
}
```



## 6、结构体使用memset初始化

像结构体使用地址符号：

```
struct _node {
	int x;
}node;

memset(&node, 0, sizeof(node));

int arr[10];
memset(arr, 0, sizeof(arr));
```

## 7、或运算不支持和等号简写

```
#include <iostream>
using namespace std;

int main()
{
    int ret = 0;
    int x = 1;
    //ret ||= x;  //错误expected primary-expression before ‘=’ token
    ret = ret || x;
    cout << ret << endl;
    return 0;
}
```

## 8、错误： 程序中有游离的‘\xxx’
这个错误一般是由于你程序（a.c）中使用了中文的标点符号，比如；，｝，＋。改成英文的就行了。甚至有时候空格也会出现类似错误，删掉该空格 重新输入。如果找不出来，解决的办法就是关闭中文输入法然后把有错这一行重新敲一遍。 

我的原因是：#define MAX_CNT 8   最大数量
错误提示地方是MAX_CNT使用的地方，实际是宏定义注释未//
宏定义必须换行定义

## 9、switch里面的参数只能是整型变量
```
switch(expression){
    case constant-expression  :
       statement(s);
       break; // 可选的
    case constant-expression  :
       statement(s);
       break; // 可选的
  
    // 您可以有任意数量的 case 语句
    default : // 可选的
       statement(s);
}
```

 **switch** 语句中的 **expression** 必须是一个整型或枚举类型，或者是一个 class 类型，其中 class 有一个单一的转换函数将其转换为整型或枚举类型。 

## 10、error: cast from 'void*' to 'int' loses precision



## 11、去掉warning：cast to pointer from integer of different size（从不同大小的整数转化为指针）
如何去掉warning呢,
(void*)(long)virt_to_bus(yuv_frames)
这样warning就去掉


## 12、没有包含头文件unistd.h
```
close’ was not declared in this scope
‘read’ was not declared in this scope
‘sysconf’ was not declared in this scope
```
没有包含头文件 unistd.h 造成的。

加上
> #include <unistd.h>

13、C++ Builder
C++ Builder是由Borland公司推出的一款可视化集成开发工具。C++ Builder具有快速的可视化开发环境：只要简单地把控件（Component）拖到窗体（Form）上，定义一下它的属性，设置一下它的外观，就可以快速地建立应用程序界面；C++ Builder内置了100多个完全封装了Windows公用特性且具有完全可扩展性（包括全面支持ActiveX控件）的可重用控件；C++ Builder具有一个专业C++开发环境所能提供的全部功能：快速、高效、灵活的编译器优化，逐步连接，CPU透视，命令行工具等。它实现了可视化的编程环境和功能强大的编程语言（C++）的完美结合。




```
static
__attribute__
#if
#ifdef
#endif
#undef
...
va_list
va_start
va_end
va_copy
vsnprintf

snprintf

fopen
fread
fgets
fscanf
fprintf
fclose

fd：open
无类型void指针参数好处：传进来后方便强制转换成其他格式，常常给struct，可以自动分配位置。
f
side bar：侧边栏

uint8_t

getopt.h
poll.h
fcntl.h
signal.h
socket.h
types.h
time.h
netdb.h
netinet/in.h
对于这些我一般很少遇到的头文件，建议使用一下常用的函数例子



#define debug "abcd" "234"

or

cout << "abc" "123" << endl;
都是正确的语法。


```


## 需要理解



博客：https://www.cnblogs.com/zhangyabin---acm/p/3188076.html
```
## 0和NULL

在不同的系统中，NULL并非总是和0等同，NULL仅仅代表空值，也就是指向一个不被使用的地址，在大多数系统中，都将0作为不被使用的地址，所以就有了类似这样的定义
```
#define NULL 0
```
但并非总是如此，也有些系统不将0地址作为NULL，而是用其他的地址，所以说，千万别将NULL和0等价起来，特别是在一些跨平台的代码中，这更是将给你带来灾难。

## MTU
https://yq.aliyun.com/articles/222535

## UEFI  &  EFI  &  BIOS
https://blog.csdn.net/ZhangSong051052/article/details/80670970




## c语言报错-- no previous prototype for function
当我们使用了一个函数，但是没有在头文件中声明时，就会出这个错误。
有时是因为去掉了static。static的函数使用和普通函数还是有区别的。static函数不需要声明。
解决办法，头文件中添加声明即可。

## !! 两次取反
两次取反是将对应的类型转换为boolean。第一次取反将变量转换为了bool值，但结果是相反的，所以第二次取反获得正确的结果。

