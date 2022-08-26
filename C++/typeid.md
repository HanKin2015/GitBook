# typeid操作符
http://c.biancheng.net/view/2301.html

## 1、简介
typeid 运算符用来获取一个表达式的类型信息。类型信息对于编程语言非常重要，它描述了数据的各种属性：
对于基本类型（int、float 等C++内置类型）的数据，类型信息所包含的内容比较简单，主要是指数据的类型。
对于类类型的数据（也就是对象），类型信息是指对象所属的类、所包含的成员、所在的继承关系等。

类型信息是创建数据的模板，数据占用多大内存、能进行什么样的操作、该如何操作等，这些都由它的类型信息决定。

```
#include <iostream>
#include <typeinfo>
using namespace std;

class Base{ };

struct STU{ };

int main(){
    //获取一个普通变量的类型信息
    int n = 100;
    const type_info &nInfo = typeid(n);
    cout<<nInfo.name()<<" | "<<nInfo.raw_name()<<" | "<<nInfo.hash_code()<<endl;

    //获取一个字面量的类型信息
    const type_info &dInfo = typeid(25.65);
    cout<<dInfo.name()<<" | "<<dInfo.raw_name()<<" | "<<dInfo.hash_code()<<endl;

    //获取一个对象的类型信息
    Base obj;
    const type_info &objInfo = typeid(obj);
    cout<<objInfo.name()<<" | "<<objInfo.raw_name()<<" | "<<objInfo.hash_code()<<endl;

    //获取一个类的类型信息
    const type_info &baseInfo = typeid(Base);
    cout<<baseInfo.name()<<" | "<<baseInfo.raw_name()<<" | "<<baseInfo.hash_code()<<endl;

    //获取一个结构体的类型信息
    const type_info &stuInfo = typeid(struct STU);
    cout<<stuInfo.name()<<" | "<<stuInfo.raw_name()<<" | "<<stuInfo.hash_code()<<endl;

    //获取一个普通类型的类型信息
    const type_info &charInfo = typeid(char);
    cout<<charInfo.name()<<" | "<<charInfo.raw_name()<<" | "<<charInfo.hash_code()<<endl;

    //获取一个表达式的类型信息
    const type_info &expInfo = typeid(20 * 45 / 4.5);
    cout<<expInfo.name()<<" | "<<expInfo.raw_name()<<" | "<<expInfo.hash_code()<<endl;

    return 0;
}
```


```
int | .H | 529034928
double | .N | 667332678
class Base | .?AVBase@@ | 1035034353
class Base | .?AVBase@@ | 1035034353
struct STU | .?AUSTU@@ | 734635517
char | .D | 4140304029
double | .N | 667332678
```

## 2、std :: typeid :: name（）的奇怪输出
解决方法一：
G++使用实现定义的类型命名，但它也提供了实用程序c++filt，使它们具有人类可读性：
```
$ ./test | c++filt -t
unsigned long
A
```
实现的返回name是定义的：甚至不需要实现为不同类型返回不同的字符串。
从g++得到的是修饰的名称，您可以使用c++filt命令或来“分解” __cxa_demangle。

解决方法二：
```
/*
学习typeid函数
*/
static void study_typeid()
{
    int    a;
    char   b;
    short  c;
    string d;
    
    // 只输出一个字符
    cout << typeid(a).name() << endl;
    cout << typeid(b).name() << endl;
    cout << typeid(c).name() << endl;
    cout << typeid(d).name() << endl;
    
    // 解决只输出一个字符问题
    cout << abi::__cxa_demangle(typeid(a).name(), 0, 0, 0) << endl;
    cout << abi::__cxa_demangle(typeid(b).name(), 0, 0, 0) << endl;
    cout << abi::__cxa_demangle(typeid(c).name(), 0, 0, 0) << endl;
    cout << abi::__cxa_demangle(typeid(d).name(), 0, 0, 0) << endl;
    return;
}
```

解决方法三：
如最上面的raw_name()函数

## 3、ABI （应用程序二进制接口）
每个操作系统都会为运行在该系统下的应用程序提供应用程序二进制接口（Application Binary Interface，ABI）。ABI包含了应用程序在这个系统下运行时必须遵守的编程约定。ABI总是包含一系列的系统调用和使用这些系统调用的方法，以及关于程序可以使用的内存地址和使用机器寄存器的规定。从一个应用程序的角度看，ABI既是系统架构的一部分也是硬件体系结构的重点，因此只要违反二者之一的条件约束就会导致程序出现严重错误。在很多情况下，链接器为了遵守ABI的约定需要做一些重要的工作。例如，ABI要求每个应用程序包含一个程序中各例程使用的静态数据的所有地址表，链接器通过收集所有链接到程序中的模块的地址信息来创建地址表。ABI经常影响链接器的是对标准过程调用的定义 [1]  。

https://itanium-cxx-abi.github.io/cxx-abi/

关于cxxabi.h头文件

## 4、补充
在c++中，typeid用于返回指针或引用所指对象的实际类型。

注意：typeid是操作符，不是函数！
操作符好像可以理解为运算符

运行时获知变量类型名称，可以使用 typeid(变量).name()，需要注意不是所有编译器都输出"int"、"float"等之类的名称，对于这类的编译器可以这样使用：float f = 1.1f; if( typeid(f) == typeid(0.0f) ) ……
补充：对非引用类型，typeid是在编译时期识别的，只有引用类型才会在运行时识别。