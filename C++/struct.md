# C语言结构体嵌套

结构体变量作为参数传递，是否会在函数里改变原来的值？？

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

## 结构体嵌套结构体

```

```

里面必须要声明变量，否则会有警告。