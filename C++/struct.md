# C语言结构体嵌套

## 1、结构体变量作为参数传递，是否会在函数里改变原来的值？？
答案是：不会，必须要参数引用才能改变原来的值。

```
//struct_para.cpp
#include <iostream>
using namespace std;

struct node {
	int x;
};

void func(node &tmp)
{
	tmp.x = 100;
}

int main()
{
    node a;
    a.x = 10;
    cout << a.x << endl;
    func(a);
    cout << a.x << endl;
    return 0;
}
```

注意c语言和c++的区别：c语言没有参数引用符号&，所以必须要使用指针。结构体变量跟普通变量一样使用。

注意：c语言不能直接使用结构体名进行定义，前面必须加上struct。如：

```
struct node {
	int x;
};

node a;	//wrong
struct node b;	//right
```

但是使用了typedef就可以直接使用了。如：

```
typedef struct {
	int x;
} node;

node a;	
```

如果使用[C++编译器](https://www.baidu.com/s?wd=C%2B%2B编译器&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)来编译的话，定义的时候不需要加上struct。 

在C中定义一个结构体类型要用typedef:

```
typedef struct Student
{
	int a;
} Stu;
```

于是在声明变量的时候就可：Stu stu1;(如果没有typedef就必须用struct Student stu1;来声明)
这里的Stu实际上就是struct Student的别名。**Stu==struct Student**
另外这里也可以不写Student（于是也不能struct Student stu1;了，必须是Stu stu1;） 

## 2、结构体嵌套结构体

```

```

里面必须要声明变量，否则会有警告。

## 3、结构体乱序初始化
linux结构体可以采用乱序初始化，即用成员变量前加（.）符号，如定义linux_usbfs_backend 结构体变量时就采用了这种方法：
```
const struct usbi_os_backend linux_usbfs_backend = {
	.name = "Linux usbfs",
	.caps = 
	.init = op_init,
	.exit = op_exit,
	.get_device_list = NULL,
  .....
}
```
乱序初始化是C99标准新加的，比较直观的一种初始化方式。相比顺序初始化而言，乱序初始化就如其名，成员可以不按照顺序初始化，而且可以只初始化部分成员，扩展性较好。linux内核中采用这种方式初始化struct。

C 支持数组或者结构体的乱序初始化，其语法是在数组声明时，用 [INDEX] = value 指定数组某个元素的初始值

C++ 不支持乱序初始化，想要在声明的时候初始化就必须按结构体里的顺序依次初始化（C 支持的特性，C++ 不支持的并不多见）

gcc 处理 .cpp 文件时，默认采用 C++ 编译规则

编译命令	默认编译规则	结果
g++ main.cpp	C++	编译报错
gcc main.cpp	C++	编译报错
g++ main.c	C++	编译报错
gcc main.c	C	OK

因此，只有c语言及文件支持这种全部写法。

注意：extern "C"无法在里面嵌套c语言写法写在c++文件中编译使用。
``
interface.c: In function ‘void printf_array()’:
interface.c:9:5: sorry, unimplemented: non-trivial designated initializers not supported
     };
     ^
interface.c:9:5: sorry, unimplemented: non-trivial designated initializers not supported
interface.c:9:5: sorry, unimplemented: non-trivial designated initializers not supported
```



