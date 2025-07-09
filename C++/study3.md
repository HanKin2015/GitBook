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