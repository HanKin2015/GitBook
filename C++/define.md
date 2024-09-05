# 宏定义

## 1、预处理符号
注意：__DATE__ 和__TIME__在C语言中是用来记录编译的系统日期和时间的，用起来简单，但是很有作用。在共同开发时，通过上段代码的打印，可以判断代码是什么时间发布的，便于版本的甄别，有效避免因版本问题引起的错误。
并不能用来表示当前运行到这一步的时间。
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #./a.out
study_define.cpp
1
10
main
Jun 30 2022
09:16:45
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #date
2022年 06月 30日 星期四 09:19:09 CST
```

```
__FILE__：进行编译的源文件名字
__LINE__：文件当前行的行号
__DATE__：文件被编译的日期
__TIME__：文件被编译的时间
__STDC__：如果编译器遵循ANSIC，其值就为1，否则未定义
__FUNCTION__：当前的函数名
```

## 2、示例
```
#include <iostream>
#include <cstring>
using namespace std;

//刚好__FILE__也是类似string的字符串，所以不加双引号的时候相当于赋值
string strs[] = {__FILE__, "__LINE__", "__DATE__", "__TIME__", "__STDC__"};

int main()
{
	for (int i = 0; i < 5; i++) {
		cout << strs[i] << endl;
	}
	cout << __FILE__ << endl;
	return 0;
}
/*
study_define.cpp
__LINE__
__DATE__
__TIME__
__STDC__
study_define.cpp
*/
```

c++的输出有个好处就是不用指定数据的格式
```
#include <iostream>
#include <cstring>
#include <cstdio>
using namespace std;

int main()
{
	printf("%s\n", __FILE__);
	cout << __STDC__ << endl;
	cout << __LINE__ << endl;
	cout << __FUNCTION__ << endl;
	cout << __DATE__ << endl;
	cout << __TIME__ << endl;
	return 0;
}
/*
study_define.cpp
1
10
main
Jun 30 2022
09:16:45
*/
```

## 3、详解
宏的声明方式：
```
#define name(para_list)  stuff
```
注意：name和左括号之间不能有空格；

### 3-1、需要注意的几点
1.所有用于对数值表达式进行求值的宏定义都应该多加括号；
```
以下错误代码：

#define  SQUARE(x)   x*x
SQUARE(5)
SQUARE(a+1)

应该修改为：

#define  SQUARE(x)   ((x)*(x))
SQUARE(5)
SQUARE(a+1)
```

2.如果宏定义中的语句非常长，那么可以写成多行，除了最后一行之外，每行的末尾都要加一个反斜杠 “ \ ”
```
#define  DEBUG_PRINT  printf("FILE %s line %d:"  \
							"x=%d,y=%d,z=%d"\
							 __FILE__,__LINE__,\
							 x,y,z)
```
3.在程序中使用到#define定义的宏时，将被插入到程序中原来文本的位置；

4.参数名将被他们的值所代替；
(1) 邻近字符串自动连接：
```
#include <stdio.h>

#define PRINT(FORMAT, VALUE) printf("The value is " FORMAT "\n", VALUE)
int main(void)
{
    PRINT("%d", 12);
    return 0;
}
/*
The value is 12
*/
```

(2) 预处理器把一个宏参数转换成一个字符串：#argument 这种结构被预处理器翻译为字符串 “argument”
```
#include <stdio.h>

#define PRINTF(FORMAT,VALUE) printf("The value "#VALUE" is " #FORMAT "\n",VALUE)

int main(void)
{
    PRINTF(%d,20);
    return 0;
}
/*
The value 20 is 20
*/
```

(3) 使用##结构，将位于其两边的符号连接成一个符号；
```
#include <stdio.h>

#define ADD_TO_SUM(SUM_NUMBER, VALUE) sum ## SUM_NUMBER += VALUE

int main(void)
{
    int sum5 = 0;
    ADD_TO_SUM(5, 25);		// 相当于是sum5 += 25
    printf("%d.\n", sum5);
    return 0;
}
/*
25.
*/
```

(4) 带副作用的宏参数
当宏参数在宏定义中出现次数超过一次时，那么将可能出现副作用；
```
#include <stdio.h>

#define MAX(a,b) ((a)>(b)?(a):(b))

int main()
{
	int x = 5;
	int y = 8;
	int z = 0;
	z = MAX(x++, y++);     // z = ((x++)>(y++)?(x++):(y++))
	printf("x = %d, y = %d, z = %d\n", x, y, z);	// 6 10 9
	return 0;
}
```

5.宏命名
一般约定使用大写；与函数区分开；

6.#undef
本指令用于移除一个宏定义；
```
#include <stdio.h>

#ifndef MAXN
	#define MAXN 2005
#endif

#undef MINN
#undef MAXN

int main()
{
	printf("MAXN = %d\n", MAXN);
	return 0;
}
/*

pointer_free.cpp: In function ‘int main()’:
pointer_free.cpp:12:24: error: ‘MAXN’ was not declared in this scope
  printf("MAXN = %d\n", MAXN);
                        ^
*/
```
如果现存的名字需要被重新定义，那么旧定义首先必须用#undef移除；

## 4、如何在函数动态运行时获取宏定义的宏的名字
```
//可以输出变量名
#define get_marco_name(x) #x
#define get_name(x) #x
```
详情见：D:\Github\Storage\c++\standard_library\define\define.c

注意：不能直接在程序中使用#号输出变量名。

## 5、#if比较
D:\Github\Storage\c++\standard_library\define\if_instruct_example.c

`#if`只支持常量表达式,不能含有变量。

## 6、判断系统是否是Windows平台
```
#if defined(_WIN32) || defined(__CYGWIN__) || defined(_WIN32_WCE)
#define LIBUSB_CALL WINAPI
#else
#define LIBUSB_CALL
#endif
#endif
```