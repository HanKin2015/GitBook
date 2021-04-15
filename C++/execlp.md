# execle函数

execlp
从PATH 环境变量中查找文件并执行

定义：
int execlp(const char * file,const char * arg,……);

头文件：
#include<unistd.h>

说明：
execlp()会从PATH 环境变量所指的目录中查找符合参数file的文件名, 找到后便执行该文件, 然后将第二个以后的参数当做该文件的argv[0]、argv[1]……, 最后一个参数必须用空指针(NULL)作结束。

返回值：
如果执行成功则函数不会返回, 执行失败则直接返回-1, 失败原因存于errno 中。

相关函数：
fork, execl, execle, execv, execve, execvp

错误代码：
参考execve()。

示例：
```
#include<unistd.h>

main()
{
 execlp("ls","ls","-al","/zhmc",(char *)0);
}
```

## strerror函数

C 库函数 char *strerror(int errnum) 从内部数组中搜索错误号 errnum，并返回一个指向错误消息字符串的指针。strerror 生成的错误字符串取决于开发平台和编译器。

常用：
```
#include <errno.h>
#include <string.h>

printf("errnum: %d, error: %s\n", errno, strerror(errno));
```
```
