# sizeof和strlen的区别

由以下几个例子说明sizeof和strlen之间的区别。
(1)char* ss="0123456789";
sizeof(ss) 结果大小为4，ss是指向字符串常量的字符指针。
sizeof(*ss)结果为1，*ss是第一个字符。
(2)
char ss[]="0123456789";
sizeof(ss)结果为11，ss是数组，计算到"\0"位置，因此是(10+1)。
sizeof(*ss)结果为1，*ss是第一个字符。
(3)
char ss[100]="0123456789";
sizeof(ss)结果为100，ss表示在内存中预分配的大小，100X1
strlen(ss)结果为10，它的内部实现是用一个循环计算字符串的长度，直到"\0"为止。
(4)
int ss[100]="0123456789";
sizeof(ss)结果为400，ss表示在内存中的大小，100X4
strlen(ss)错误，strlen的参数只能是char*,且必须是以"\0"结尾的。


结论：
    (1)sizeof操作符的结果类型是size_t,它在头文件中的typedef为unsigned int 类型。该类型保证能容纳实现所
     建立的最大对象的字节大小。
    (2)sizeof是算符，strlen是函数。
    (3)sizeof可以用类型做参数，strlen只能用char*做参数，且必须是以"\0"结尾的。sizeof还可以用函数做参数，比如：
            short f()    sizeof(f())结果为2，即sizeof(short)
    (4)数组做sizeof的参数不退化，传递给strlen就退化为指针。
    (5)大部分编译程序在编译的时候就把sizeof计算过了，是类型或是变量的长度。
    (6)strlen的结果要再运行的时候才能计算出来，用来计算字符串的长度，而不是类型占内存的大小。
    (7)sizeof后如果是类型必须加括号，如果是变量名可以不加括号。这是因为sizeof是个操作符而不是个函数。
    (8)当使用一个结构类型或变量时，sizeof返回实际大小。当使用一静态的空间数组时，sizeof返回全部数组的尺寸。
       sizeof操作符不能返回被动态分配的数组或外部的数组的尺寸。
    (9)数组作为参数传递给函数时传的是指针而不是数组，传递的是数组的首地址，如：fun(char[])、fun(char[8])
      都等价于fun(char*)。在C++里传递数组永远都是传递指向数组首元素的指针，编译器不知道数组的大小。如果想在
    函数内知道数组的大小，需要这样做，进入函数后用memcpy将数组复制出来，长度由另一个形参传进去。代码如下：
    fun(unsigned char *p1,int len)
    {
        unsigned char* buf=new unsigned char[len+1];
        memcpy(buf, p1,len);
    }

## 实战
```
#include <iostream>
#include <string.h>
#include <stdlib.h>

using namespace std;

int main()
{
    int nums[5] = {0};
    cout << sizeof(nums) << endl;
    // error: cannot convert ‘int*’ to ‘const char*’ for argument ‘1’ to ‘size_t strlen(const char*)’
    //cout << strlen(nums) << endl;

    // 求数组预存大小
    cout << sizeof(nums) / sizeof(nums[0]) << endl; // 注意是无法进行判空的, 判空只能使用指针

    char str0[100];
    cout << sizeof(str0) << ' ' << strlen(str0) << endl;
    char str1[100] = {0};
    cout << sizeof(str1) << ' ' << strlen(str1) << endl;
    char str2[100];
    cout << sizeof(str2) << ' ' << strlen(str2) << endl;
    char str3[100];
    memset(str3, 0, sizeof(str3));
    cout << sizeof(str3) << ' ' << strlen(str3) << endl;
    return 0;
}

结果：
20
5
100 0
100 0
100 0
100 0
```

```
#include <iostream>
#include <string.h>
#include <stdlib.h>

using namespace std;

int main()
{
    int nums[5] = {0};
    cout << sizeof(nums) << endl;
    // error: cannot convert ‘int*’ to ‘const char*’ for argument ‘1’ to ‘size_t strlen(const char*)’
    //cout << strlen(nums) << endl;

    // 求数组预存大小
    cout << sizeof(nums) / sizeof(nums[0]) << endl; // 注意是无法进行判空的, 判空只能使用指针

    char str0[100];
    cout << sizeof(str0) << ' ' << strlen(str0) << endl;
    return 0;
}

神奇的结果：
20
5
100 1
```

结论：初始化为数组或者清空数组使用sizeof，求字符串长度使用strlen。





