[TOC]

# string中的子函数

# 1、size_t
<string.h>
size_t strnlen(const char *str, size_t maxlen);

计算字符串str的(unsigned int型）长度，不包括结束符NULL，该长度最大为maxlen。
即size_t等价于unsigned int

# 2、std::basic_string<char> str = "haha"
std::basic_string[类模板](https://baike.baidu.com/item/类模板)存储且操纵类似char的对象的序列。该对象类型的性质由特性类模板std::char_traits的实例来提供，并作为std::basic_string的第二个模板参数 。

其中string是std::basic_string<T>的简写 。 

# 3、strstr函数
strstr是C语言中的函数，作用是返回字符串中首次出现子串的地址。

## 3-1、描述
包含文件：[string.h](https://baike.baidu.com/item/string.h)
函数名: strstr
函数原型：

```
extern char *strstr(char *str1, const char *str2);
```

语法：

```
* strstr(str1,str2)
```

str1: 被查找目标　string expression to search.
str2: 要查找对象　The string expression to find.

返回值：若str2是str1的子串，则返回str2在str1的首次出现的地址；如果str2不是str1的子串，则返回NULL。
例子：
```
char str[]="1234xyz";
char *str1=strstr(str,"34");
cout << str1 << endl;
```
显示的是: 34xyz

## 3-2、实现方式
```c
char *strstr(const char *s1,const char *s2)
{
　int len2;
　if(!(len2=strlen(s2)))//此种情况下s2不能指向空，否则strlen无法测出长度，这条语句错误
　    return(char*)s1;
　for(;*s1;++s1)
　{
    　if(*s1==*s2 && strncmp(s1,s2,len2)==0)
    　return(char*)s1;
　}
　return NULL;
}

//常用经典实现方法
char *strstr(const char *str1, const char *str2)
{
    char *cp = (char*)str1;
    char *s1, *s2;
 
    if (!*str2)
        return((char *)str1);
 
    while (*cp)
    {
        s1 = cp;
        s2 = (char *)str2;
 
        while (*s1 && *s2 && !(*s1 - *s2))
            s1++, s2++;
 
        if (!*s2)
            return(cp);
 
        cp++;
    }
    return(NULL);
}
```

# 4、判断为空
成员函数empty
```
string str;
if (str.empty()) {
	//do anything
}
```

成员函数size
```
string str;
if (str.size() == 0) {
	//do saomthing
}
```

与空串比较
```
string str;
if (str == "") {
	//do something
}
```
几种方法中，**empty函数**是效率最高也是最常用的一种。

# 5、C语言strncasecmp()函数：比较字符串的前n个字符
表头文件：#include <strings.h>
函数定义：int strncasecmp(const char *s1, const char *s2, size_t n)
函数说明：strncasecmp()用来比较参数s1和s2字符串前n个字符，比较时会自动忽略大小写的差异。
返回值：若参数s1 和s2 字符串相同则返回0。s1 若大于s2 则返回大于0 的值，s1 若小于s2 则返回小于0 的值。

表头文件 #include <strings.h>（不是C/C++的标准头文件，区别于string.h）
定义函数 int strcasecmp (const char *s1, const char *s2);
strcasecmp用忽略大小写比较字符串.，通过strcasecmp函数可以指定每个字符串用于比较的字符数，strcasecmp用来比较参数s1和s2字符串前n个字符，比较时会自动忽略大小写的差异。
strcasecmp函数是二进制且对大小写不敏感。此函数只在Linux中提供，相当于windows平台的 stricmp。

# 6、1、字符串查找
s.find(s1)         //查找s中第一次出现s1的位置，并返回（包括0）
s.rfind(s1)        //查找s中最后次出现s1的位置，并返回（包括0）
s.find_first_of(s1)       //查找在s1中任意一个字符在s中第一次出现的位置，并返回（包括0）
s.find_last_of(s1)       //查找在s1中任意一个字符在s中最后一次出现的位置，并返回（包括0）
s.fin_first_not_of(s1)         //查找s中第一个不属于s1中的字符的位置，并返回（包括0）
s.fin_last_not_of(s1)         //查找s中最后一个不属于s1中的字符的位置，并返回（包括0）

# 7、字符串截取
s.substr(pos, n)    //截取s中从pos开始（包括0）的n个字符的子串，并返回
s.substr(pos)        //截取s中从从pos开始（包括0）到末尾的所有字符的子串，并返回

# 8、字符串替换
s.replace(pos, n, s1)     //用s1替换s中从pos开始（包括0）的n个字符的子串








