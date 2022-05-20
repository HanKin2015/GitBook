# C++ functional

## 1、简介
类模板std::function是通用多态函数封装器。 std::function的实例能存储、复制及调用任何可调用函数、 lambda表达式、 bind表达式或其他函数对象，还有指向成员函数指针和指向数据成员指针。
若 std::function 不含目标，则称它为空。调用空std::function的目标导致抛出std::bad_function_call异常。

## 2、std::function std::bad_function_call
function是一个类模板，模板声明如下。

- 构造函数支持默认构造（空function，不是一个有效的function）、引用类型、右值引用、拷贝赋值运算符支持的类型也很全。
- 重载了bool()可以用于判断function是否是有效的
- 支持交互function
- 重载了()，支持不定参数
- 支持获取函数类型信息target_type
```
#include <functional>
#include <iostream>

struct S {
    void operator ()() { std::cout << "S::()" << std::endl; }
};
void f() { std::cout << "f()" << std::endl; }
void ff() { std::cout << "ff()" << std::endl; }

int main(int argc, char *argv[])
{
    std::function<void()> f1(f);
    std::function<void()> f2(f1);
    f1(); // 输出f()
    f2(); // 输出f()
    f2 = ff;
    f2(); // 输出ff()
    f1.swap(f2);
    f1(); // 输出ff()
    f2(); // 输出f()
    std::cout << f1.target_type().name() << ", " << f2.target_type().name() << std::endl; // 可能输出PFvvE, PFvvE
    std::function<void()> f3 = S();
    f3(); // 输出S::()
    std::function<void()> f4;
    std::cout << (f4 ? "valid" : "invalid") << std::endl;  // 输出invalid
    try { f4(); } catch(std::bad_function_call e) { std::cout << e.what(); /*std::exceptionvalid*/ }
    f4 = f2;
    std::cout << (f4 ? "valid" : "invalid") << std::endl; // 输出valid
    auto f5 = [](){std::cout << "lambda" << std::endl;};
    auto f6 = [](int i){std::cout << "lambda with parameter " << i << std::endl;};
    f5(); // 输出lambda
    f6(100); // 输出lambda with parameter 100
    return 0;
}
```

## 3、std::bind
bind是一个函数模块，支持带返回值，它会返回类模板__bind对象，我们可以通过调用__bind中的()调用函数，它会自动填充我们设置的参数。
__bind通过tuple存储我们传入的参数，在我们调用()的时候再依次取出。









