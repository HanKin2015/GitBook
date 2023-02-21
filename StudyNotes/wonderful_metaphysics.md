# 奇妙的玄学

## 1、有符号数和无符号数条件判断时的坑

有点意思，5居然不大于-5，是编译器傻了吗？不，这是因为，当有符号数与无符号数进行条件判断时，编译器会自动将有符号数隐式转化为无符号数，这时，-5就会变成一个极大的无符号整数，所以造成了逻辑判断上的错误。
当然，如果直接取两者的运算结果的话，结果还是正确的。
所以，当进行条件判断时，一定要注意条件运算符两端的数值的数据类型，以免造成判断上导致的流程错误，这错误可能是致命的。
```
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char ch[0x20] = "";
    //printf("%d %d\n", sizeof(ch), strlen(ch));

    char *p = (char *)malloc(-1);
    printf("%p %lu\n", p, sizeof(p));

    int a = -5;
    unsigned int b = 5;
    printf("int a = -5, uint b = 5\n");
    if (a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a不大于b\r\n");
    }

    // 这个判断不应该有问题吧
    if (a > 0 && a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a不大于b\r\n");
    }

    if (a <= 0) {
        printf("a不大于b\r\n");
    } else if (a > b) {
        printf("a大于b\r\n");
    } else {
        printf("a小于b\r\n");
    }

	char c = 'G';
    char str[] = "hankin";
    printf("%c\n", str[-1]);
    return 0;
}


(nil) 8
int a = -5, uint b = 5
a大于b
a不大于b
a不大于b
空
```

## 2、代码中malloc分配-1时未崩溃
返回NULL，即0。

## 3、代码中发现是可以访问数组下标为-1不崩溃
并不是返回上一个地址的值。







