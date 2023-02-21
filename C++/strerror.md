# strerror函数

## 1、简介
C库函数 char *strerror(int errnum) 从内部数组中搜索错误号 errnum，并返回一个指向错误消息字符串的指针。strerror 生成的错误字符串取决于开发平台和编译器。

常常和errno变量结合一起使用：
```
#include <errno.h>
#include <string.h>
#include <stdio.h>

int main()
{
    printf("errnum: %d, error: %s\n", errno, strerror(errno));
    return 0;
}
/*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
errnum: 0, error: Success
*/
```

## 2、strerror was not declared in this scope
头文件:
```
#include <string.h>
```
strerror这个库必须要添加string.h头文件，少了.h都不行