[TOC]

# 1、size_t

## 用法

size_t strnlen(const char *str, size_t maxlen);

### 说明

计算字符串str的(unsigned int型）长度，不包括结束符NULL，该长度最大为maxlen。

### 所在头文件

<string.h>



size_t等价于unsigned int



# 不小心删除了工作表并保存了，怎么恢复

幸好有自动备份。

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
//Copyright 1990 Software Development Systems, Inc.
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

# 4、

