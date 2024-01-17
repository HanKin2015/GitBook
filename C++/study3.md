# 学习高阶C++
原子性：指事务的不可分割性，一个事务的所有操作要么不间断地全部被执行，要么一个也没有执行。
资源获取即初始化 - RAII（Resource Acquisition Is Initialization）

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

## 2、高级宏展开
```
//此宏展开后，类似于printf("%d""%d", 1, 2);  
#define TRACE_CMH_2(fmt, ...) \  
    printf("%s(%d)-<%s>: "##fmt, __FILE__, __LINE__, __FUNCTION__, ##__VA_ARGS__) 
```

## 3、warning: function declaration isn’t a prototype（函数声明不是原型）的解决办法
原因是无参函数报的警告，只需要添加void即可。
```
static int hello_init(void)
{
    printk(KERN_EMERG   "hello world!\n");
    return 0;
}
```

## 4、细节决定成败
我的小伙伴还以为是编译器长时间不用凉了么
```
int j = 0;
for (j = 0; j < 10; j++);
{
	printf("j = %d\n", j);
}

输入结果是j = 10只有一行
如果是1的，肯定就是一行，这就会很迷惑。因此要养成良好的代码习惯。
我见过for循环末尾，函数末尾添加分号的，这种情况虽然没有影响，但是个人觉得还是不要有才好。
```

## 5、c++标准发展史
1998年，C++的ANSI/IS0标准被投入使用。
C++ 03
C++ 11
C++ 14
C++ 17
C++ 20

## 6、c++11新特性
https://zhuanlan.zhihu.com/p/650986900
https://m.baidu.com/sf?pd=topone_multi&top=%7B%22sfhs%22%3A1%7D&atn=index&word=c%2B%2B11%E6%96%B0%E7%89%B9%E6%80%A7&lid=16524987177891995353&key=ODjAz5JIKOstxE1s4UBHiW1Rd8Dz4F%2F8%2FVCvqUmSw10p7xL%2FVg1lVWSpvCcpjntjo0LSAunaVLhKqIifyl9fhmAxtz94ezwv9I7NuBdI%2Fos%3D&type=bpage


## 6、c++14新特性

## 6、c++17新特性

## 6、c++20新特性


