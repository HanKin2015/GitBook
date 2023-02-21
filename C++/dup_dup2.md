# 认识dup和dup2

## 1、简介
两个函数都可以来复制一个现有的文件描述符，他们的声明如下：
```
#include <unistd.h>
int dup(int fd);
int dup2(int oldfd, int oldfd);
```

- dup会返回一个新的描述符，这个描述一定是当前可用文件描述符中的最小值。
- 以用fd2指定新描述符的值，如果fd2本身已经打开了，则会先将其关闭。如果fd等于fd2，则返回fd2，并不关闭它。
- 这两个函数返回的描述符与fd描述符所指向的文件共享同一文件表项。

## 2、注意点
复制的是文件描述符，并不会使两个描述符值相等，如3和4都是指向同一个文件，文件描述符值唯一。

## 3、使用场景解析
需求：一个程序中，希望debug时能把printf函数输出到文件中。
```
#ifndef DEBUG
#define DEBUG  1
#endif

#if DEBUG
#define DPRINTF printf
#else
#define DPRINTF(...)
#endif
```









