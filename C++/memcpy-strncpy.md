[TOC]
# memcpy_s和memcpy


# 1、memcpy_s相比memcpy，安全在哪？

strcpy_s、memcpy_s等具有缓冲区大小检查的函数，可以有效的检测内存溢出，找到出错的代码。但是strcpy、memcpy这样的出错了需要自己扒代码。

memcpy_s strcpy_s 会故意使用特定数据填满未使用缓冲区,   这样程序调试阶段就容易暴露问题, 有助于程序员检查出越界操作代码问题。

那主要就是帮助我们及早的检查出诸如访问越界这样的问题是吧。

int dest[10], src[100];
memcpy(dest, src, 20 * sizeof (int)); 
memcpy_s(dest, sizeof(dest), src, 20 * sizeof (int)); 

memcpy会访问越界，破坏了dest后面的数据，并且可能我们还不知道。而memcpy_s就会弹出一个对话框提醒我们。

## 2、strncpy 

原型：extern char *strncpy(char *dest, char *src, int n);
用法：#include <string.h>
功能：把src所指由NULL结束的字符串的前n个字节复制到dest所指的数组中。
说明：

- 如果src的前n个字节不含NULL字符，则结果不会以NULL字符结束。
- 如果src的长度小于n个字节，则以NULL填充dest直到复制完n个字节。
- src和dest所指内存区域不可以重叠且dest必须有足够的空间来容纳src的字符串。
- 返回指向dest的指针。



## 3、memcpy 
原型：extern void *memcpy(void *dest, void *src, unsigned int count);
用法：#include <string.h>
功能：由src所指内存区域复制count个字节到dest所指内存区域。
说明：src和dest所指内存区域不能重叠，函数返回指向dest的指针。

总结：strncpy遇到NULL会停止拷贝后面的内容，而用NULL来填充。而memcpy只是单纯的内存拷贝，不关心是否是NULL。

## 注意点
- strncpy是char型，而memcpy是void型，无视字符串类型。
- strncpy遇到'\0'就不拷贝了。
- '0'和'\0'是一回事吗？学到了学到了，还真是

strncpy() 最初被设计为用来处理一种现在已经废弃的数据结构——定长， 不必 ’\0’ 结束的 “字符串”。strncpy 的另一个怪癖是它会用多个 ’\0’ 填充短串， 直到达到指定的长度。在其它环境中使用 strncpy() 有些麻烦， 因为必须经常在目的串末尾手工加 ’\0’。
可以用 strncat 代替 strncpy 来绕开这个问题: 如果目的串开始时为空 (就是说， 如果先用 *dest = ’\0’)，strncat() 就可以完成希望 strncpy() 完成的事情。另外一个方法是用 sprintf(dest， "%.*s"， n， source)。
如果需要复制任意字节 (而不是字符串)， memcpy() 是个比 strncpy() 更好的选择。字节字节。

解决memcpy末尾不自动加'\0'的问题：先对字符数组初始化0。

## 各说各的好

今天不小心在该用memcpy的时候，用了strncpy使自己吃了亏，所以写出这个博文。memcpy就是纯字节拷贝，而strncpy就不同了，字符串是以'\0'结尾的。如果一个字符buffer长度为6个字节，内容是

{'a', 'b', '\0', 'c', 'm', 'n'}，当你执行这一句：strncpy(dest, buffer, 4);

dest里的前四个字节内容将为{'a', 'b', '\0', '\0'}，注意第四个字符'c'变成了'\0'，奇怪么，这就是strncpy的行为。

所以如果buffer之间拷贝的话，还是用memcpy为妙。

## 5、字符'0'和'\0',及整数0的区别

字符'0'：char c = '0';   它的ASCII码实际上是48。内存中存放表示：00110000

字符'\0' : ASCII码为0，表示一个字符串结束的标志。这是转义字符。

整数0 ：ASCII码为0，字符表示为空字符，NULL；数值表示为0；内存中表示为：00000000

ASCII码对照表可见如下链接：
![](http://www.asciima.com/img/ascii-Table.jpg)
http://www.asciima.com/

百度知道：字符0和整数0区别
http://zhidao.baidu.com/question/351626505.html


```
#include <bits/stdc++.h>
using namespace std;

int main()
{
	char s1[] = "123045";
	int len = sizeof(s1);
	char s2[10], s3[10];

	strncpy(s2, s1, len);
	memcpy(s3, s1, len);
	cout << "s2 = " << s2 << ' ' << sizeof(s2) << endl;
	cout << "s3 = " << s3 << ' ' << sizeof(s3) << endl;
	return 0;
}
```

