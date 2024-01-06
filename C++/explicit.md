# explict关键字

explicit：明确的;清楚明白的;易于理解的;(说话)清晰的;直言的;坦率的;不隐晦的;不含糊的

## 1、简介
参考：https://blog.csdn.net/guoyunfei123/article/details/89003369

C++提供了关键字explicit，可以阻止不应该允许的经过转换构造函数进行的隐式转换的发生。声明为explicit的构造函数不能在隐式转换中使用。

C++中的explicit关键字只能用于修饰只有一个参数的类构造函数, 它的作用是表明该构造函数是显示的, 而非隐式的, 跟它相对应的另一个关键字是implicit, 意思是隐藏的,类构造函数默认情况下即声明为implicit(隐式)。

那么显示声明的构造函数和隐式声明的有什么区别呢: D:\Github\Storage\c++\advanced\no_explicit_example.cpp

上面的代码中, "CxString string2 = 10;" 这句为什么是可以的呢? 在C++中, 如果的构造函数只有一个参数时, 那么在编译的时候就会有一个缺省的转换操作:将该构造函数对应数据类型的数据转换为该类对象. 也就是说 "CxString string2 = 10;" 这段代码, 编译器自动将整型转换为CxString类对象, 实际上等同于下面的操作:
```
CxString string2(10);  
或  
CxString temp(10);  
CxString string2 = temp; 
```
但是, 上面的代码中的_size代表的是字符串内存分配的大小, 那么调用的第二句 "CxString string2 = 10;" 和第六句 "CxString string6 = 'c';" 就显得不伦不类, 而且容易让人疑惑。有什么办法阻止这种用法呢? 答案就是使用explicit关键字。

demo见：D:\Github\Storage\c++\advanced\explicit_example.cpp

explicit关键字的作用就是防止类构造函数的隐式自动转换。
上面也已经说过了, explicit关键字只对有一个参数的类构造函数有效, 如果类构造函数参数大于或等于两个时, 是不会产生隐式转换的, 所以explicit关键字也就无效了。

但是, 也有一个例外, 就是当除了第一个参数以外的其他参数都有默认值的时候, explicit关键字依然有效, 此时, 当调用构造函数时只传入一个参数, 等效于只有一个参数的类构造函数。

代码见：D:\Github\Storage\c++\advanced\explicit_example2.cpp

## 2、划重点
强烈推荐：https://www.cnblogs.com/gklovexixi/p/5622681.html
在C++中，我们有时可以将构造函数用作自动类型转换函数。但这种自动特性并非总是合乎要求的，有时会导致意外的类型转换，因此，C++新增了关键字explicit，用于关闭这种自动特性。即被explicit关键字修饰的类构造函数，不能进行自动地隐式类型转换，只能显式地进行类型转换。

注意：只有一个参数的构造函数，或者构造函数有n个参数，但有n-1个参数提供了默认值，这样的情况才能进行类型转换。
- 构造函数
- 只有一个没有提供默认值的参数

```
/* 示例代码2 */
class Demo
{
public:
    Demo();                     /* 构造函数1 */
    explicit Demo(double a);    /* 示例代码2 */
    Demo(int a, double b);      /* 示例代码3 */

    ~Demo();
    void Func(void);

private:
    int value1;
    int value2;
};
```
在上述构造函数2中，由于使用了explicit关键字，则无法进行隐式转换。即：Demo test;test = 12.2;是无效的！但是我们可以进行显示类型转换，如：
```
Demo test;
test = Demo(12.2); 或者
test = (Demo)12.2;
```

## 3、explicit只对构造函数生效？？？
explicit 只对构造函数起作用，用来抑制隐式转换。

C++ explicit关键字用来修饰类的构造函数，表明该构造函数是显式的，既然有"显式"那么必然就有"隐式"，那么什么是显示而什么又是隐式的呢？

如果c++类的构造函数有一个参数，那么在编译的时候就会有一个缺省的转换操作：将该构造函数对应数据类型的数据转换为该类对象

如果要避免这种自动转换的功能，我们该怎么做呢？嘿嘿这就是关键字explicit的作用了，将类的构造函数声明为"显式"，也就是在声明构造函数的时候前面添加上explicit即可，这样就可以防止这种自动的转换操作。


