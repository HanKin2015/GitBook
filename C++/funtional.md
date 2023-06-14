# C++ functional

## 1、简介
类模板std::function是通用多态函数封装器。 std::function的实例能存储、复制及调用任何可调用函数、 lambda表达式、 bind表达式或其他函数对象，还有指向成员函数指针和指向数据成员指针。
若 std::function 不含目标，则称它为空。调用空std::function的目标导致抛出std::bad_function_call异常。

C++中的functional库提供了一组函数对象，可以用于实现函数式编程。这些函数对象包括函数指针、函数对象、lambda表达式等，可以用于实现各种算法和数据结构。
以下是一些常用的函数对象：
function：可以用于封装任意可调用对象，包括函数指针、函数对象、lambda表达式等。
bind：可以用于将一个可调用对象和其参数绑定，生成一个新的可调用对象。
mem_fn：可以用于将一个成员函数转换为一个函数对象，方便在算法和数据结构中使用。
plus、minus、multiplies、divides等：可以用于实现加、减、乘、除等算术运算。
greater、less、equal_to等：可以用于实现比较运算。

## 2、std::function std::bad_function_call
function是一个类模板，模板声明如下。

- 构造函数支持默认构造（空function，不是一个有效的function）、引用类型、右值引用、拷贝赋值运算符支持的类型也很全。
- 重载了bool()可以用于判断function是否是有效的
- 支持交互function
- 重载了()，支持不定参数
- 支持获取函数类型信息target_type

## 3、std::bind
bind是一个函数模块，支持带返回值，它会返回类模板__bind对象，我们可以通过调用__bind中的()调用函数，它会自动填充我们设置的参数。
__bind通过tuple存储我们传入的参数，在我们调用()的时候再依次取出。

## 4、实战代码
D:\Github\Storage\c++\standard_library\functional

可以里面为给函数重命名。

## 5、和回调函数的区别














