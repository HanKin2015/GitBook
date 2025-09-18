# C++ functional
实战代码: D:\Github\Storage\c++\standard_library\functional

## 1、简介
C++中的functional库提供了一组函数对象，可以用于实现函数式编程。这些函数对象包括函数指针、函数对象、lambda表达式、bind表达式等，可以用于实现各种算法和数据结构。
C++ 的 \<functional\> 库提供了一组通用的函数对象、绑定器和其他工具，用于处理函数和函数对象。这个库在 C++11 标准中引入，并在后续的标准中不断扩展。

以下是一些常用的函数对象：
function：可以用于封装任意可调用对象，包括函数指针、函数对象、lambda表达式等。
bind：可以用于将一个可调用对象和其参数绑定，生成一个新的可调用对象。
mem_fn：可以用于将一个成员函数转换为一个函数对象，方便在算法和数据结构中使用。
plus、minus、multiplies、divides等：可以用于实现加、减、乘、除等算术运算。
greater、less、equal_to等：可以用于实现比较运算。

## 2、std::function std::bad_function_call
std::function 是一个通用的、多态的函数包装器，可以存储、复制和调用任何可调用的目标（如函数、lambda 表达式、绑定表达式或其他函数对象）。

## 3、std::bind
std::bind 用于创建一个新的函数对象，将某些参数绑定到一个可调用对象上。

## 4、std::placeholders
std::placeholders 是一组占位符，用于在 std::bind 中表示未绑定的参数。

using std::placeholders::_1; 的作用是将占位符 _1 引入当前作用域，以便在后续的代码中直接使用 _1 来表示第一个占位符。
在比较复杂的情况下，可以使用多个占位符来表示多个参数的位置，例如 std::placeholders::_1、std::placeholders::_2、std::placeholders::_3 等，依次表示第一个、第二个、第三个参数位置。

## 5、std::mem_fn
std::mem_fn 用于生成一个调用成员函数的函数对象。

## 6、std::reference_wrapper
std::reference_wrapper 用于存储对象的引用，而不是对象本身。它在需要传递引用而不是拷贝的情况下非常有用。

## 7、std::hash
std::hash 是一个模板类，用于生成对象的哈希值。它在实现哈希表（如 std::unordered_map 和 std::unordered_set）时非常有用。

## 8、仿函数
C++ 的 \<functional\> 库还提供了一组预定义的函数对象（也称为仿函数），用于实现常见的算术运算和比较运算。这些仿函数可以用于标准算法和其他需要函数对象的地方。

### 8-1、算术运算仿函数
这些仿函数用于实现加、减、乘、除等算术运算：
- std::plus\<T\>：加法
- std::minus\<T\>：减法
- std::multiplies\<T\>：乘法
- std::divides\<T\>：除法
- std::modulus\<T\>：取模
- std::negate\<T\>：取负

### 8-2、比较运算仿函数
这些仿函数用于实现比较运算：
- std::greater\<T\>：大于
- std::less\<T\>：小于
- std::greater_equal\<T\>：大于等于
- std::less_equal\<T\>：小于等于
- std::equal_to\<T\>：等于
- std::not_equal_to\<T\>：不等于

## 9、std::bad_function_call
std::bad_function_call 是一个异常类，当调用一个空的 std::function 对象时会抛出这个异常。
