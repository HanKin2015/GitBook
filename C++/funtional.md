# C++ functional

## 1、简介
类模板std::function是通用多态函数封装器。 std::function的实例能存储、复制及调用任何可调用函数、 lambda表达式、 bind表达式或其他函数对象，还有指向成员函数指针和指向数据成员指针。
若 std::function 不含目标，则称它为空。调用空std::function的目标导致抛出std::bad_function_call异常。

## 2、std::function std::bad_function_call
function是一个类模板，模板声明如下。

- 构造函数支持默认构造（空function，不是一个有效的function）、引用类型、右值引用、拷贝赋值运算符支持的类型也很全。
- 重载了bool()可以用于判断function是否是有效的
支持交互function
重载了()，支持不定参数
支持获取函数类型信息target_type
————————————————
版权声明：本文为CSDN博主「StoneLiu999」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/momo0853/article/details/116738820








