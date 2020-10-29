[TOC]

# C++/C

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

13、














