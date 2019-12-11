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



## 6、memset

像结构体使用地址符号：

```
struct _node {
	int x;
}node;

memset(&node, 0, sizeof(node));

int arr[10];
memset(arr, 0, sizeof(arr));
```



































