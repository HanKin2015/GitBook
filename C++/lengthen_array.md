# 变长数组

## 1、简单入门
参考：https://www.cnblogs.com/Anker/p/3744127.html

在linux内核中，结构体中经常用到data[0]。这样设计的目的是让数组长度是可变的，根据需要进行分配。方便操作，节省空间。

经常遇到的结构形状如下：

```
struct buffer
{
    int data_len;   //长度
    char data[0];  //起始地址
};
```

 在这个结构中，data是一个数组名；但该数组没有元素；该数组的真实地址紧随结构体buffer之后，而这个地址就是结构体后面数据的地址（如果给这个结构体分配的内容大于这个结构体实际大小，后面多余的部分就是这个data的内容）；这种声明方法可以巧妙的实现C语言里的数组扩展。

**从结果可以看出data[0]和data[]不占用空间，且地址紧跟在结构后面，而char \*data作为指针，占用4个字节，地址不在结构之后。**

采用char *data，需要进行二次分配，操作比较麻烦，很容易造成内存泄漏。而直接采用变长的数组，只需要分配一次，然后进行取值即可以。

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdint.h>

typedef struct
{
    int data_len;
    char data[0];
}buff_st_1;

typedef struct
{
    int data_len;
    char *data;
}buff_st_2;

typedef struct 
{
    uint32_t id;
    uint32_t age;
}student_st;


void print_stu(const student_st *stu)
{
    printf("id:%u,age:%u\n", stu->id, stu->age);
}

int main()
{
    student_st *stu = (student_st *)malloc(sizeof(student_st));
    stu->id = 100;
    stu->age = 23;

    student_st *tmp = NULL;

    buff_st_1 *buff1 = (buff_st_1 *)malloc(sizeof(buff_st_1) + sizeof(student_st));
    buff1->data_len = sizeof(student_st);
    memcpy(buff1->data, stu, buff1->data_len);
    printf("buff1 address:%p,buff1->data_len address:%p,buff1->data address:%p\n",
        buff1, &(buff1->data_len), buff1->data);

    tmp = (student_st*)buff1->data;
    print_stu(tmp);

    buff_st_2 *buff2 = (buff_st_2 *)malloc(sizeof(buff_st_2));
    buff2->data_len = sizeof(student_st);
    buff2->data = (char *)malloc(buff2->data_len);
    memcpy(buff2->data, stu, buff2->data_len);
    printf("buff2 address:%p,buff2->data_len address:%p,buff2->data address:%p\n",
        buff2, &(buff2->data_len), buff2->data);

    tmp = (student_st *)buff2->data;
    print_stu(tmp);

    free(buff1);

    free(buff2->data);
    free(buff2);
    free(stu);
    return 0;
}
```

## 2、进一步了解
前一节无法解决：如果不是char类型的可变数组，怎么进行访问？

参考：https://blog.csdn.net/houzijushi/article/details/80245894

```
#include<stdio.h>
#include<malloc.h>

typedef struct {
    int len;
    int array[];
}SoftArray;

void test1()
{
    int len = 10;
    printf("The struct's size is %lu\n",sizeof(SoftArray));
	return;
}

void test2()
{
    int len = 10;
    SoftArray *p=(SoftArray*)malloc(sizeof(SoftArray) + sizeof(int)*len);
    printf("SoftArray size is %lu\n", sizeof(SoftArray));
    free(p);
	return;
}

void test3()
{
    int len = 10, i = 0;
    SoftArray *p = (SoftArray*)malloc(sizeof(SoftArray)+sizeof(int)*len);
    p->len = len;
    for(i = 0;i < p->len; i++) {
        p->array[i] = i+1;
    }
    for(i = 0;i < p->len; i++) {
        printf("%d\n", p->array[i]);
    }
    free(p);
    return;
}

int main()
{
	printf("sizeof(int): %lu\n", sizeof(int));
	test1();
	test2();
	test3();
    return 0;
}

运行结果：
sizeof(int): 4
The struct's size is 4
SoftArray size is 4
1
2
3
4
5
6
7
8
9
10
```

可以看出结构体的大小在创建时已经确定了，array明确来说不算是结构体成员，只是挂羊头卖狗肉而已。

## 3、什么是变长数组？

变长数组既数组大小待定的数组， C语言中结构体的最后一个元素可以是大小未知的数组，也就是所谓的0长度，所以我们可以用结构体来创建变长数组。

## 4、变长数组有什么用途 ？

它的主要用途是为了满足需要变长度的结构体，为了解决使用数组时内存的冗余和数组的越界问题。

## 5、用法
在一个结构体的最后 ，申明一个长度为空的数组，就可以使得这个结构体是可变长的。对于编译器来说，此时长度为0的数组并不占用空间，因为数组名

本身不占空间，它只是一个偏移量， 数组名这个符号本身代 表了一个不可修改的地址常量 （注意：数组名永远都不会是指针！ ），但对于这个数组的大小，我们

可以进行动态分配,对于编译器而言，数组名仅仅是一个符号，它不会占用任何空间，它在结构体中，只是代表了一个偏移量，代表一个不可修改的地址常量！

对于变长数组的这个特点，很容易构造出变长结构体，如缓冲区，数据包等等

这样的变长数组常用于网络通信中构造不定长数据包，不会浪费空间浪费网络流量，比如我要发送1024字节的数据，如果用定长包，假设定长包的长度为2048，就会浪费1024个字节的空间，也会造成不必要的流量浪费。

## 6、







