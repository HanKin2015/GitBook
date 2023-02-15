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

## 13、C++ Builder
C++ Builder是由Borland公司推出的一款可视化集成开发工具。C++ Builder具有快速的可视化开发环境：只要简单地把控件（Component）拖到窗体（Form）上，定义一下它的属性，设置一下它的外观，就可以快速地建立应用程序界面；C++ Builder内置了100多个完全封装了Windows公用特性且具有完全可扩展性（包括全面支持ActiveX控件）的可重用控件；C++ Builder具有一个专业C++开发环境所能提供的全部功能：快速、高效、灵活的编译器优化，逐步连接，CPU透视，命令行工具等。它实现了可视化的编程环境和功能强大的编程语言（C++）的完美结合。

## 14、pair头文件
```
#include <utility>
using namespace std;

一般来说
```

## 15、理解一段代码

```
// 使用vscode可以看到展开结果
// qualifier修饰符、修饰词

#define Q_TAILQ_ENTRY(type, qual)                                       \
struct {                                                                \
        qual type *tqe_next;            /* next element */              \
        qual type *qual *tqe_prev;      /* address of previous next element */\
}
#define QTAILQ_ENTRY(type)       Q_TAILQ_ENTRY(struct type,)
#define QTAILQ_ENTRY_CONST(type)       Q_TAILQ_ENTRY(struct type, const)

QTAILQ_ENTRY(int);
/*
Expands to:

struct { struct int *tqe_next; struct int * *tqe_prev; }
*/

QTAILQ_ENTRY_CONST(int);
/*
Expands to:

struct { const struct int *tqe_next; const struct int *const *tqe_prev; }
*/
```





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


## 16、需要理解
博客：https://www.cnblogs.com/zhangyabin---acm/p/3188076.html

```
## 0和NULL
```
在不同的系统中，NULL并非总是和0等同，NULL仅仅代表空值，也就是指向一个不被使用的地址，在大多数系统中，都将0作为不被使用的地址，所以就有了类似这样的定义
```
#define NULL 0
```
但并非总是如此，也有些系统不将0地址作为NULL，而是用其他的地址，所以说，千万别将NULL和0等价起来，特别是在一些跨平台的代码中，这更是将给你带来灾难。

## 17、MTU
https://yq.aliyun.com/articles/222535




## 18、c语言报错-- no previous prototype for function
当我们使用了一个函数，但是没有在头文件中声明时，就会出这个错误。
有时是因为去掉了static。static的函数使用和普通函数还是有区别的。static函数不需要声明。
解决办法，头文件中添加声明即可。

## 19、!! 两次取反
两次取反是将对应的类型转换为boolean。第一次取反将变量转换为了bool值，但结果是相反的，所以第二次取反获得正确的结果。

```
单冒号（:）
    有些信息在存储时，并不需要占用一个完整的字节， 而只需占几个或一个二进制位。例如在存放一个开关量时，只有0和1 两种状态， 用一位二进位即可。为了节省存储空间，并使处理简便，C语言又提供了一种数据结构，称为“位域”或“位段”。所谓“位域”是把一个字节中的二进位划分为几个不同的区域，并说明每个区域的位数。每个域有一个域名，允许在程序中按域名进行操作。这样就可以把几个不同的对象用一个字节的二进制位域来表示。一、位域的定义和位域变量的说明位域定义与结构定义相仿，其形式为： 
    struct 位域结构名 
    { 位域列表 }; 
其中位域列表的形式为： 类型说明符 位域名：位域长度 
例如： 
struct bs 
{ 
  int a:8; 
  int b:2; 
  int c:6; 
}; 
位域变量的说明与结构变量说明的方式相同。 可采用先定义后说明，同时定义说明或者直接说明这三种方式。例如： 
struct bs 
{ 
  int a:8; 
  int b:2; 
  int c:6; 
}data; 
说明data为bs变量，共占两个字节。其中位域a占8位，位域b占2位，位域c占6位。对于位域的定义尚有以下几点说明： 
1. 一个位域必须存储在同一个字节中，不能跨两个字节。如一个字节所剩空间不够存放另一位域时，应从下一单元起存放该位域。也可以有意使某位域从下一单元开始。例如： 
struct bs 
{ 
  unsigned a:4 
  unsigned :0 /*空域*/ 
  unsigned b:4 /*从下一单元开始存放*/ 
  unsigned c:4 
} 


在这个位域定义中，a占第一字节的4位，后4位填0表示不使用，b从第二字节开始，占用4位，c占用4位。 
2. 位域可以无位域名，这时它只用来作填充或调整位置。无名的位域是不能使用的。例如： 
struct k 
{ 
  int a:1 
  int :2 /*该2位不能使用*/ 
  int b:3 
  int c:2 
}; 

从以上分析可以看出，位域在本质上就是一种结构类型， 不过其成员是按二进位分配的。
```

## 20、C程序中的raise和kill两个函数有何不同？
在Linux上执行“man raise”，即可看到两者的区别：
LIBC库函数，raise基于系统调用kill或tgkill（如果内核支持）实现
kill是系统调用，不是LIBC库函数
单线程程序：raise(sig)效果等同kill(getpid(), sig)
多线程程序：raise(sig)效果等同pthread_kill(pthread_self(), sig)

在多线程程序中，进程给自己发SIGTERM信号退出，应当调用“kill(getpid(), SIGTERM)”，而不是“raise(SIGTERM)”

## 21、bool类型
头文件：stdbool.h

bool是C++的关键字，一种数据类型，长度是4！！！
_Bool是C99新增加的关键字，长度是1，
在C++中，又把bool重定义为_Bool ,typedef bool _Bool;

怎么写程序都是1个字节，并不是4个字节。

## 21、JNI
JNI是Java Native Interface的缩写，通过使用 Java本地接口书写程序，可以确保代码在不同的平台上方便移植。从Java1.1开始，JNI标准成为java平台的一部分，它允许Java代码和其他语言写的代码进行交互。JNI一开始是为了本地已编译语言，尤其是C和C++而设计的，但是它并不妨碍你使用其他编程语言，只要调用约定受支持就可以了。使用java与本地已编译的代码交互，通常会丧失平台可移植性。但是，有些情况下这样做是可以接受的，甚至是必须的。例如，使用一些旧的库，与硬件、操作系统进行交互，或者为了提高程序的性能。JNI标准至少要保证本地代码能工作在任何Java 虚拟机环境。
