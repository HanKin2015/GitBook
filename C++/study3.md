# 学习高阶C++

## 1、指向结构体的指针必须初始化
```
#include<stdio.h>
void main()
{
	struct abc{
	int a;};
	struct abc *p;
	p->a=1;
	printf("%d",p->a);
}
```
这个编译没有问题，但是运行是段错误，请问为什么呢
因为你定义了一个结构体指针p，用来指向此类结构体，但是你却没有给他赋值，此时p的值为NULL，你并没有在内存中为p分配任何空间，所以p->a=1这句就会出段错误。

修改方法1:可以给p分配一段内存空间，并使其指向此空间：
p=(struct abc *)malloc(sizeof(struct abc));
p->a = 1;
方法2：可以让p指向一个已存在的内存空间：
struct abc temp;
p=&temp;
p->a = 1; 

## 2、
```
//此宏展开后，类似于printf("%d""%d", 1, 2);  
#define TRACE_CMH_2(fmt,...) \  
    printf("%s(%d)-<%s>: "##fmt, __FILE__, __LINE__, __FUNCTION__, ##__VA_ARGS__) 
```































