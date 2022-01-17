# 不得不说的attribute

## 1、__packed__
不想要字节对齐的时候，有没有办法取消字节对齐？答案是可以，就是在结构体声明当中，加上__attribute__ ((__packed__))关键字，它可以做到让我们的结构体，按照紧凑排列的方式，占用内存。

```
#include <stdio.h>

#define ATTR_PACKED __attribute__ ((__packed__))

struct exam1 {
	char c;
	int  i;
};

struct __attribute__ ((__packed__)) exam2 {
	char c;
	int  i;
};

struct exam3 {
	char c;
	int  i;
} ATTR_PACKED;

int main()
{
	printf("char: %ld, int: %ld\n", sizeof(char), sizeof(int));
	printf("exam1: %ld, exam2: %ld, exam3: %ld\n", sizeof(struct exam1), sizeof(struct exam2), sizeof(struct exam3));
	return 0;
}
/*
char: 1, int: 4
exam1: 8, exam2: 5, exam3: 5
*/
```
可以使用#pragma pack (n)来指定数据结构的对齐值。

## 2、__attribute_unused__和__attribute_used__的作用
在Linux上这样的定义如下：
```
#define __attribute_used__ __attribute__((__used__))
#define __attribute_unused__ __attribute__((__unused__))
```

在gcc手册中找到了有关的解释：
unused：This attribute, attached to a function, means that the function is meant to be
        possibly unused. GCC will not produce a warning for this function.

表示该函数或变量可能不使用，这个属性可以避免编译器产生警告信息。
===============================================================================
used： This attribute, attached to a function, means that code must be emitted for the
       function even if it appears that the function is not referenced. This is useful,
       for example, when the function is referenced only in inline assembly.

向编译器说明这段代码有用，即使在没有用到的情况下编译器也不会警告！

## 3、alias
__attribute__((alias)): 为一个symbol声明一个别名


















