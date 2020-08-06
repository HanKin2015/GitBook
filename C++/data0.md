# 变长数组

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

