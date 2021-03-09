# 动态分配内存

内存泄露、踩内存很糟糕



## 1、realloc、calloc、malloc
realloc：调用形式为(类型*)realloc(*ptr，size)：将ptr内存大小增大到size。(也可以缩小，缩小的内容消失)。
calloc：调用形式为(类型*)calloc(n，size)：在内存的动态存储区中分配n块长度为“size”字节的连续区域，返回首地址。
malloc：调用形式为(类型*)malloc(size)：在内存的动态存储区中分配一块长度为“size”字节的连续区域，返回该区域的首地址。

malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。calloc在动态分配完内存后，自动初始化该内存空间为零。
1.如果 当前连续内存块足够 realloc 的话，只是将p所指向的空间扩大，并返回p的指针地址。 这个时候 q 和 p 指向的地址是一样的。
2.如果 当前连续内存块不够长度，再找一个足够长的地方，分配一块新的内存，q，并将 p指向的内容 copy到 q，返回 q。并将p所指向的内存空间删除。


```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
        char s1[100];
        memset(s1, 0, sizeof(s1));
        char *s2 = (char *)malloc(100);
        //memset(s2, 0, sizeof(char *) * 100);
        memset(s2, 0, 100);
        printf("%d %d %d %d %d\n", sizeof(s1), sizeof(s2),  sizeof(char *), strlen(s1), strlen(s2));
        //printf("%lud\n", sizeof(s1));
        return 0;
}
```


