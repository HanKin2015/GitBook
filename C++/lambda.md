# C++之Lambda表达式
https://www.cnblogs.com/jimodetiantang/p/9016826.html

## 1、概述
C++ 11 中的 Lambda 表达式用于定义并创建匿名的函数对象，以简化编程工作。
Lambda 的语法形式如下：
```
主要分为五个部分
[函数对象参数] (操作符重载函数参数) mutable 或 exception 声明 -> 返回值类型 {函数体}
```

## 2. Lambda 语法分析

### 2.1 [函数对象参数]
标识一个 Lambda 表达式的开始，这部分必须存在，不能省略。

函数对象参数是传递给编译器自动生成的函数对象类的构造
函数的。函数对象参数只能使用那些到定义 Lambda 为止时 Lambda 所在作用范围内可见的局部变量(包括 Lambda 所在类
的 this)。函数对象参数有以下形式：
```
空。没有任何函数对象参数。
=。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是值传递方式（相
当于编译器自动为我们按值传递了所有局部变量）。
&。函数体内可以使用 Lambda 所在范围内所有可见的局部变量（包括 Lambda 所在类的 this），并且是引用传递方式
（相当于是编译器自动为我们按引用传递了所有局部变量）。
this。函数体内可以使用 Lambda 所在类中的成员变量。
a。将 a 按值进行传递。按值进行传递时，函数体内不能修改传递进来的 a 的拷贝，因为默认情况下函数是 const 的，要
修改传递进来的拷贝，可以添加 mutable 修饰符。
&a。将 a 按引用进行传递。
a，&b。将 a 按值传递，b 按引用进行传递。
=，&a，&b。除 a 和 b 按引用进行传递外，其他参数都按值进行传递。
&，a，b。除 a 和 b 按值进行传递外，其他参数都按引用进行传递。
````

### 2.2 (操作符重载函数参数)
标识重载的 () 操作符的参数，没有参数时，这部分可以省略。参数可以通过按值（如: (a, b)）和按引用 (如: (&a, &b)) 两种
方式进行传递。

### 2.3 mutable 或 exception 声明
这部分可以省略。按值传递函数对象参数时，加上 mutable 修饰符后，可以修改传递进来的拷贝（注意是能修改拷贝，而不是
值本身）。exception 声明用于指定函数抛出的异常，如抛出整数类型的异常，可以使用 throw(int)。

### 2.4 -> 返回值类型
标识函数返回值的类型，当返回值为 void，或者函数体中只有一处 return 的地方（此时编译器可以自动推断出返回值类型）
时，这部分可以省略。

### 2.5 {函数体}
标识函数的实现，这部分不能省略，但函数体可以为空。

## 3、示例
标准的lambda表达式格式：\[\](函数入参)->返回值类型{函数体}

```
[] (int x, int y) { return x + y; } // 隐式返回类型
[] (int& x) { ++x;  }               // 没有 return 语句 -> Lambda 函数的返回类型是 'void'
[] () { ++global_x;  }              // 没有参数，仅访问某个全局变量
[] { ++global_x; }                  // 与上一个相同，省略了 (操作符重载函数参数)
```

可以像下面这样显示指定返回类型：
```
[] (int x, int y) -> int { int z = x + y; return z; }
```
在这个例子中创建了一个临时变量 z 来存储中间值。和普通函数一样，这个中间值不会保存到下次调用。什么也不返回的
Lambda 函数可以省略返回类型，而不需要使用 -> void 形式。

## 4、闭包
Lambda 函数可以引用在它之外声明的变量. 这些变量的集合叫做一个闭包. 闭包被定义在 Lambda 表达式声明中的方括
号 [] 内。这个机制允许这些变量被按值或按引用捕获。如下图的例子：
```
[]			//未定义变量.试图在Lambda内使用任何外部变量都是错误的.
[x，&y]		//x按值捕获，y按引用捕获.
[&]			//用到的任何外部变量都隐式按引用捕获
[=]			//用到的任何外部变量都隐式按值捕获
[&，x]		//x显式地按值捕获。其它变量按引用捕获
[=, &z]		//z按引用捕获.其它变量按值捕获
```

&和=的区别：D:\Github\Storage\c++\study\advanced\lambda\lambda_example.cpp
\[x\](int x)的区别：D:\Github\Storage\c++\study\advanced\lambda\lambda_example.cpp
总结：
- []这里面的变量是`当前函数体内`的全局变量传递到lambda函数体内，而()则是lambda函数`参数，只能声明`
- &是当前函数体内的全局变量`全部`共享到lambda函数体内，可以进行修改
- =是当前函数体内的全局变量`全部`共享到lambda函数体内，不可以进行修改，即只读变量

## 5、示例
```
#include <iostream>
#include <vector>
#include <algorithm>
#include <cstdio>
using namespace std;

int main()
{
    std::vector<int> some_list;
    int total = 0;
    for (int i = 0; i < 5; ++i) some_list.push_back(i);

	// 此例计算 list 中所有元素的总和。变量 total 被存为 Lambda 函数闭包的一部分。因为它是栈变量（局部变量）total 引用，所以可以改变它的值。
    std::for_each(begin(some_list), end(some_list), [&total](int x)
    {
        total += x;
    });
    printf("total: %d\n", total);
    return 0;
}

#include <algorithm>
#include <cmath>
void abssort (float *x, unsigned n) {
    std::sort (x, x + n,
        //Lambda 表达式
        [](float a, float b) {
            return (std::abs(a) <std::abs(b));
        }
    );
}
```

使用 auto 关键字可以帮助存储 lambda 函数:
```
auto my_lambda_func = [&](int x) { /* ... */ };
auto my_onheap_lambda_func = new auto([=](int x) { /* ... */ });
```

