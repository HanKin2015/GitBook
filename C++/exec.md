# exec系列函数
exec 系列函数用于在当前进程中执行一个新的程序，替换当前进程的地址空间。它们之间的区别主要在于参数的传递方式和环境变量的处理方式。

函数名技巧：
l（list） 表示参数以可变参数列表的形式传递。
v（vector） 表示参数以数组（向量）的形式传递。
p （path）表示函数会在环境变量 PATH 指定的目录中搜索可执行文件。

## 1、execl
```
int execl(const char *path, const char *arg, ..., (char *) NULL);
```
参数：
- path：要执行的程序的路径。
- arg：程序的第一个参数（通常是程序名），后面可以跟多个参数，最后一个参数必须是 NULL。

特点：参数以可变参数列表的形式传递，不包括环境变量。

## 2、execle
```
int execle(const char *path, const char *arg, ..., (char *) NULL, char *const envp[]);
```
参数：
- path：要执行的程序的路径。
- arg：程序的第一个参数（通常是程序名），后面可以跟多个参数，最后一个参数必须是 NULL。
- envp：一个指向环境变量字符串数组的指针，数组以 NULL 结尾。

特点：参数以可变参数列表的形式传递，并且可以指定环境变量。

## 3、execv
```
int execv(const char *path, char *const argv[]);
```
参数：
- path：要执行的程序的路径。
- argv：一个指向参数字符串数组的指针，数组以 NULL 结尾。

特点：参数以数组的形式传递，不包括环境变量。

## 4、execve
```
int execve(const char *path, char *const argv[], char *const envp[]);
```
参数：
- path：要执行的程序的路径。
- argv：一个指向参数字符串数组的指针，数组以 NULL 结尾。
- envp：一个指向环境变量字符串数组的指针，数组以 NULL 结尾。

特点：参数和环境变量都以数组的形式传递。execve 是 exec 系列函数中唯一一个直接调用内核的系统调用，其他 exec 函数都是基于它实现的。

## 5、execvp
```
int execvp(const char *file, char *const argv[]);
```

参数：
- file：要执行的程序的文件名（可以是相对路径或绝对路径）。
- argv：一个指向参数字符串数组的指针，数组以 NULL 结尾。

特点：参数以数组的形式传递，不包括环境变量。execvp 会在环境变量 PATH 指定的目录中搜索可执行文件。

## 6、execlp
```
int execlp(const char *file, const char *arg, ..., (char *) NULL);
```
参数：
- file：要执行的程序的文件名（可以是相对路径或绝对路径）。
- arg：程序的第一个参数（通常是程序名），后面可以跟多个参数，最后一个参数必须是 NULL。

特点：参数以可变参数列表的形式传递，不包括环境变量。execlp 会在环境变量 PATH 指定的目录中搜索可执行文件。

## 




简介
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


