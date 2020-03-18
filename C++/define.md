# 宏定义
```
 #include <iostream>
 #include <cstring>
 using namespace std;

 //int num = 250;
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
	cout <<  __STDC__ << endl;
	cout << __LINE__ << endl;
	cout << __FUNCTION__ << endl;
	cout <<  __DATE__ << endl;
	cout << 	__TIME__ << endl;
    return 0;
 }
```


1.预处理器

1.1预处理符号：

　　__FILE__　　：进行编译的源文件名字

　　__LINE__　　：文件当前行的行号

　　__DATE__　　：文件被编译的日期

　　__TIME__　　：文件被编译的时间

　　__STDC__　　：如果编译器遵循ANSIC，其值就为1，否则未定义

	__FUNCTION__：当前的函数名

2.#define宏

　　宏的声明方式：

　　#define name(para_list)  stuff

　　注意：name和左括号之间不能有空格；

2.1需要注意的几点：

　　1.所有用于对数值表达式进行求值的宏定义都应该多加括号；

以下错误代码：

#define  SQUARE(x)   x*x

SQUARE(5)

SQUARE(a+1)
应该修改为：

#define  SQUARE(x)   ((x)*(x))

SQUARE(5)

SQUARE(a+1)
　　2.如果宏定义中的语句非常长，那么可以写成多行，除了最后一行之外，每行的末尾都要加一个反斜杠 “ \ ”


#define  DEBUG_PRINT  printf("FILE %s line %d:"  \
                                                "x=%d,y=%d,z=%d"\
                                                 __FILE__,__LINE__,\
                                                 x,y,z)
2.2#define替换

1.在程序中使用到#define定义的宏时，将被插入到程序中原来文本的位置；

2.参数名将被他们的值所代替；

技巧：

　　1.邻近字符串自动连接：

复制代码
#include <stdio.h>

#define PRINT(FORMAT,VALUE) printf("The value is " FORMAT "\n",VALUE)int main(void)
int main(void)
{
    PRINT("%d",12);
    return 0;
}
复制代码
输出结果：

The value is 12
　　2.预处理器把一个宏参数转换成一个字符串：#argument 这种结构被预处理器翻译为字符串 “argument”

复制代码
#include <stdio.h>

#define PRINTF(FORMAT,VALUE) printf("The value "#VALUE" is " #FORMAT "\n",VALUE)

int main(void)
{
    PRINTF(%d,20);
    
    return 0;
}
复制代码
输出结果：

The value is 20
　　3.使用##结构，将位于其两边的符号连接成一个符号；

复制代码
#include <stdio.h>

#define ADD_TO_SUM(SUM_NUMBER,VALUE) sum ## SUM_NUMBER += VALUE

int main(void)
{
    int sum5 = 0;
    ADD_TO_SUM(5,25);
    printf("%d.\n",sum5);
    return 0;
}
复制代码
输出结果



　　

 2.3.带副作用的宏参数

　　当宏参数在宏定义中出现次数超过一次时，那么将可能出现副作用；

复制代码
#include <stdio.h>

#define MAX(a,b) ((a)>(b)?(a):(b))

int main()
{
    int x=5;
    int y=8;
    int z=0;
    z=MAX(x++,y++);     //z = ((x++)>(y++)?(x++):(y++))
    printf("x = %d,y = %d,z = %d\n",x,y,z);
    return 0;
}
复制代码
输出结果：



3.宏命名

一般约定使用大写；与函数区分开；

4.#undef

　本指令用于移除一个宏定义；

　#undef name;

　如果现存的名字需要被重新定义，那么旧定义首先必须用#undef移除；


