# 学习高阶C++
原子性：指事务的不可分割性，一个事务的所有操作要么不间断地全部被执行，要么一个也没有执行。
资源获取即初始化 - RAII（Resource Acquisition Is Initialization）

## 1、指向结构体的指针必须初始化
```
#include<stdio.h>
void main()
{
	struct abc{
	int a;};
	struct abc *p;
	p->a=1;
	printf("%d",p->a);
}
```
这个编译没有问题，但是运行是段错误，请问为什么呢
因为你定义了一个结构体指针p，用来指向此类结构体，但是你却没有给他赋值，此时p的值为NULL，你并没有在内存中为p分配任何空间，所以p->a=1这句就会出段错误。

修改方法1:可以给p分配一段内存空间，并使其指向此空间：
p=(struct abc *)malloc(sizeof(struct abc));
p->a = 1;
方法2：可以让p指向一个已存在的内存空间：
struct abc temp;
p=&temp;
p->a = 1; 

## 2、高级宏展开
```
//此宏展开后，类似于printf("%d""%d", 1, 2);  
#define TRACE_CMH_2(fmt, ...) \  
    printf("%s(%d)-<%s>: "##fmt, __FILE__, __LINE__, __FUNCTION__, ##__VA_ARGS__) 
```

## 3、warning: function declaration isn’t a prototype（函数声明不是原型）的解决办法
原因是无参函数报的警告，只需要添加void即可。
```
static int hello_init(void)
{
    printk(KERN_EMERG   "hello world!\n");
    return 0;
}
```

## 4、细节决定成败
我的小伙伴还以为是编译器长时间不用凉了么
```
int j = 0;
for (j = 0; j < 10; j++);
{
	printf("j = %d\n", j);
}

输入结果是j = 10只有一行
如果是1的，肯定就是一行，这就会很迷惑。因此要养成良好的代码习惯。
我见过for循环末尾，函数末尾添加分号的，这种情况虽然没有影响，但是个人觉得还是不要有才好。
```

## 5、c++标准发展史
1998年，C++的ANSI/IS0标准被投入使用。
C++ 03
C++ 11
C++ 14
C++ 17
C++ 20

```
[root@ubuntu0006:~/cmake] #g++ a.cpp -std=c++17
[root@ubuntu0006:~/cmake] #g++ a.cpp -std=c++19
g++: error: unrecognized command line option ‘-std=c++19’
[root@ubuntu0006:~/cmake] #g++ a.cpp -std=c++20
g++: error: unrecognized command line option ‘-std=c++20’
[root@ubuntu0006:~/cmake] #g++ --version
g++ (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
虽然编译的时候能识别-std=c++17，但是由于编译器版本过旧，实际上是不支持的。编译器版本过旧：确保你的编译器版本足够新，以支持 C++17 中的结构化绑定。例如，GCC 需要至少是 7.1 版本，Clang 需要至少是 4.0 版本。

## 6、c++11新特性
https://zhuanlan.zhihu.com/p/650986900
https://m.baidu.com/sf?pd=topone_multi&top=%7B%22sfhs%22%3A1%7D&atn=index&word=c%2B%2B11%E6%96%B0%E7%89%B9%E6%80%A7&lid=16524987177891995353&key=ODjAz5JIKOstxE1s4UBHiW1Rd8Dz4F%2F8%2FVCvqUmSw10p7xL%2FVg1lVWSpvCcpjntjo0LSAunaVLhKqIifyl9fhmAxtz94ezwv9I7NuBdI%2Fos%3D&type=bpage

c++11关于继承新增了两个关键字，final用于修饰一个类，表示禁止该类进一步派生和虚函数的进一步重载，override用于修饰派生类中的成员函数，标明该函数重写了基类函数，如果一个函数声明了override但父类却没有这个虚函数，编译报错，使用override关键字可以避免开发者在重写基类函数时无意产生的错误。

## 7、c++14新特性
c++14并没有太大的改动，就连官方说明中也指出，c++14相对于c++11来说是一个比较小的改动，但是在很大程度上完善了c++11，所以可以说c++14就是在c++11标准上的查漏补缺。
```
C++14 is a minor but important upgrade over C++11, and largely “completes C++11.”
```

## 8、c++17新特性

## 9、c++20新特性

## 10、左值表达式和右值表达式
左值：有名字、能取地址、可以被赋值。
右值：没有名字、不能取地址、不能被赋值，又可进一步分为纯右值和将亡值。
在 C++11 及以后的版本中，右值又细分为纯右值（prvalue）和将亡值（xvalue）。将亡值通常是通过 std::move() 或者返回对象的右值引用（T&&）得到的，它表示资源可以被转移的对象。

## 11、右值引用（Rvalue References）
右值引用是 C++11 引入的一种新引用类型，用于绑定到右值（临时对象）。它的主要目的是实现移动语义和完美转发。
```
int&& rref = 42;       // 绑定到整数字面量（右值）
std::string&& sref = std::string("temp");  // 绑定到临时字符串
```

只能绑定到右值：不能直接绑定到左值（变量）。
延长生命周期：通过右值引用绑定临时对象后，其生命周期会延长到引用的作用域结束。
移动语义：右值引用是实现移动构造函数和移动赋值运算符的基础。

## 12、什么是完美转发
完美转发指的是在函数模板中，将参数以原始的值类别（左值或右值）传递给其他函数，避免不必要的拷贝或移动操作。
std::forward 是 C++ 中用于实现完美转发的关键工具，它能在函数模板中保持参数的原始值类别（左值或右值）。

关键场景：
- 转发构造函数参数（如智能指针、工厂函数）。
- 实现通用的包装器或代理函数。

正确使用 std::forward 的三个核心条件
- 使用转发引用（Universal Reference）
函数模板的参数必须是 T&& 形式，其中 T 是通过模板类型推导得出的。
- 使用 std::forward\<T\>(arg)
转发时必须显式指定模板参数 T，即 std::forward\<T\>(arg)，其中 T 是函数模板的类型参数。
- 仅在需要保持值类别时使用
不要在不需要转发的地方使用 std::forward（如普通函数、已知值类别的场景）。

## 13、CPU 的 CAS 操作
CAS（Compare-And-Swap）是一种硬件级别的原子操作，用于实现无锁（lock-free）算法。它允许程序在不使用锁的情况下原子地更新共享数据，从而显著提高多线程程序的性能。

基本概念
- 核心思想：“先比较内存中的值是否等于期望值，如果相等则更新为新值，否则返回失败”。
- 原子性保证：整个操作由 CPU 硬件直接支持，不可被中断。
- 常见实现：C++：std::atomic\<T\>::compare_exchange_weak/strong

## 14、自旋锁（Spinlock）
自旋锁（Spinlock）是一种用于多线程同步的锁机制，它通过让线程持续循环（自旋）检查锁的状态，而不是进入睡眠状态来避免锁竞争。自旋锁适用于锁持有时间短、线程不希望在获取锁失败时被挂起的场景。

## 15、SFINAE技术
SFINAE（Substitution Failure Is Not An Error）是 C++ 模板编程中的一种重要技术，允许编译器在模板实例化时自动忽略不匹配的模板，而不是产生编译错误。这使得我们可以根据不同条件选择不同的实现，是现代 C++ 元编程的基石之一。

核心思想
当模板参数替换导致无效的类型或表达式时，编译器不会报错，而是选择其他更匹配的模板（如果存在）。

## 16、仅了解
std::enable_if、std::true_type 和 std::false_type 是 C++ 模板元编程中的核心工具，用于在编译时进行条件判断和类型选择。它们通常与 SFINAE（Substitution Failure Is Not An Error）技术结合使用，实现模板的条件编译。

## 17、语法糖
在编程语言中，语法糖（Syntactic Sugar） 是指那些为了让代码更易读、更简洁而设计的语法特性。它们不会增加语言的功能，但可以让代码书写更加优雅、直观。C++ 中有许多语法糖，理解它们有助于写出更高效的代码。

- 范围 for 循环（C++11）
- 自动类型推导（C++11）
- Lambda 表达式（C++11）
- 折叠表达式（C++17） 是典型的语法糖。它解决了可变参数模板展开的繁琐问题
- 初始化列表（C++11）
- 智能指针（C++11）
- 结构化绑定（C++17）

语法糖的优缺点
优点
代码简洁：减少样板代码，提高可读性
减少错误：自动化常见操作（如内存管理）
表达力强：更直观地表达编程意图

缺点
学习成本：新语法需要时间理解
编译复杂性：某些语法糖可能增加编译时间
隐藏细节：过度使用可能导致开发者忽略底层原理

## 18、副作用
在编程中，副作用（Side Effect） 指的是函数或表达式在计算结果之外，对程序的外部状态产生的可观察的影响。这些影响可能包括修改全局变量、更新文件系统、打印输出、发送网络请求等。副作用是程序与外部环境交互的重要方式，但过度使用可能导致代码难以理解和调试。

纯函数（Pure Function） 是指没有副作用的函数：
- 相同输入始终返回相同输出
- 不修改外部状态
- 不依赖外部状态

## 19、仿函数
在 C++ 中，仿函数（Functor）也被称为函数对象（Function Object），是一种能够像函数一样被调用的对象。它的本质是一个类或结构体，通过重载operator()（函数调用运算符）来实现函数调用的语法。这种设计模式使得对象可以表现得如同普通函数一样，并且可以携带额外的状态。

核心特点
- 可调用性：通过重载operator()，仿函数可以像普通函数一样被调用。
- 状态存储：仿函数可以包含成员变量，从而在多次调用之间保持状态。
- 类型安全：与普通函数指针相比，仿函数是类型安全的，因为编译器可以检查其参数和返回值类型。
- 内联优化：由于仿函数是编译时确定的，编译器更容易对其进行内联优化，提高性能。
