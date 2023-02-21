# execlp函数

## 1、简介
execlp从PATH环境变量中查找文件并执行

定义：
int execlp(const char *file, const char *arg, ……);

头文件：
#include<unistd.h>

说明：
execlp()会从PATH环境变量所指的目录中查找符合参数file的文件名, 找到后便执行该文件, 然后将第二个以后的参数当做该文件的argv[0]、argv[1]……, 最后一个参数必须用空指针(NULL)作结束。

返回值：
如果执行成功则函数不会返回, 执行失败则直接返回-1, 失败原因存于errno 中。

相关函数：
fork, execl, execle, execv, execve, execvp

错误代码：
参考execve()。

## 2、示例
后面的printf函数没有执行。
```
#include <errno.h>
#include <string.h>
#include <stdio.h>
#include <unistd.h>

int main()
{
    execlp("ls", "ls", "-al", "/home/hejian/", NULL);
    printf("errnum: %d, error: %s\n", errno, strerror(errno));
    return 0;
}
/*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
总用量 36
drwxr-xr-x 3 hejian hejian  4096 7月  12 09:56 .
drwxr-xr-x 7 root   root    4096 7月  12 09:55 ..
drwxrwxr-x 2 hejian hejian  4096 7月  12 09:56 log
-rw-r--r-- 1 hejian hejian   744 7月  12 09:56 log.config
-rw-r--r-- 1 hejian hejian  1592 7月  12 09:56 log.cpp
-rwxrwxr-x 1 hejian hejian 15752 7月  12 09:56 main

奇怪，去掉了一个ls后变成这样
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
log  log.config  log.cpp  main
*/
```


