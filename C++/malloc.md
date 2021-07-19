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

## 2、内存是否可以分段释放
https://bbs.csdn.net/topics/200019746
堆分配其实就是链表管理，每次申请内存产生一个节点，挂在busylist上，如果释放，那么就是把这个块从busylist上脱离，然后挂到freelist上，并且每个节点有头部记录上一节点位置，下一节点位置，以及本节点的大小


如按照你的做法，回收节点的一部分，那么好，下面有2个问题需要确定

1）每次被回收的内存也要被当作块，块就有头，记录了块大小等等消息，那么你这个块的块头是什么数据？不清楚，那么很可能就会破坏freelist

2)假如我再次使用malloc将你回收的内存分配出去了，但是你原先的块并不知道他的大小已经改变了啊...当整个快都被使用的时候，就有可能出现数据覆盖

```
#include <iostream>
#include <string>
#include <memory>
#include <stdlib.h>
#include <stdint.h>
using namespace std;

int main()
{
        uint8_t *data = (uint8_t *) malloc(1000);
        free(data + 100);
        //free(data);
        return 0;
}
```

