[TOC]

# 1、string和char*

```
//string == char*   so   string* == char**
#include <stdio.h>
#include <iostream>
using namespace std;

int fun(string *s1, char **s2)
{
    *s1 = "a";
    *s2 = (char *)"a";
    return 0;
}

int main()
{
    string s1 = "";
    char *s2 = (char *)"";
    fun(&s1, &s2);
    cout << s1 << endl;
    cout << s2 << endl;
    return 0;
}
```
# 2、warning：deprecated conversion from string constant to 'char *'
```
char *str = "ok";   //会报警告

const char *str = "ok";  //正确
```

# 3、深入浅出mongoose
mongoose是nodeJS提供连接 mongodb的一个库. 此外还有mongoskin, mongodb(mongodb官方出品). 本人,还是比较青睐mongoose的, 因为他遵循的是一种, 模板式方法, 能够对你输入的数据进行自动处理. 有兴趣的同学可以去Mongoose官网看看.

# 4、古老的代码
```
#include <stdio.h>
#define SYSTEM(cmd) \
do { \
    a = 1024; \
    printf("hello!\n"); \
} while(0)

int
func(a, b)
    int a;
    int b;
{
    return a + b;
}

int main()
{
    int c = func(3, 6);
    printf("%d\n", c);

    int a;
    SYSTEM(1);
    return 0;
}
```
## define的新认识
宏定义仅仅是直接替换到调用的地方，所以即使在宏定义时没有声明的变量也能编译通过，但是必须要在调用的函数里有这个变量的声明。
宏定义时换行需要加反斜杠，在函数代码中则可以不要。

## 函数参数定义在括号外
这是老式函数定义,叫做 K&C 式样的函数定义。具体做法是函数参数表里只写参数名，参数在参数表的小括号后面定义（声明）；参数声明语句(若干个)，有语句结束符分号；然后才是函数体。

PS：话说新的编译器大都不支持这种写法了说。
使用gcc编译c文件能通过，使用cpp文件或者使用g++编译都无法编译通过。

# 5、clear与clean的区别：意思不同、用法不同、侧重点不同

一、意思不同

1.clear意思：adj. 清楚的；明确的；明白(某事)的；清晰的；清澈的；晴朗的

2.clean意思：adj. 干净的；纯洁的；完全的；空白的；正当的；精准的


进制就是system
二进制binary system
八进制 octonary/octal number system
十六进制 hexadecimal/sexadecimal
十进制decimal system/decimal base/decimalism
base指基数的意思，比如十进制的基数是10，二进制的基数是2


notepad++三步配置markdown环境
HTTP长连接、短连接究竟是什么？
细说HTTP和HTTPS和TCP,三种协议
一次读懂 Select、Poll、Epoll IO复用技术


彻底理解cookie，session，token
Unix domain socket和IP(tcp/ip) socket的区别




发现display命令，可以打开图片

rnd随机函数

int socket(int domain, int type, int protocol);domain指明所使用的协议族，通常为PF_INET，表示互联网协议族（TCP/IP协议族）；type参数指定socket的类型：SOCK_STREAM 或SOCK_DGRAM，Socket接口还定义了原始Socket（SOCK_RAW），允许程序使用低层协议；protocol通常赋值"0"。Socket()调用返回一个整型socket描述符，你可以在后面的调用使用它。 Socket描述符是一个指向内部数据结构的指针，它指向描述符表入口。调用Socket函数时，socket执行体将建立一个Socket，实际上"建立一个Socket"意味着为一个Socket数据结构分配存储空间。 Socket执行体为你管理描述符表。两个网络程序之间的一个网络连接包括五种信息：通信协议、本地协议地址、本地主机端口、远端主机地址和远端协议端口。
该函数如果调用成功就返回新创建的套接字的描述符，如果失败就返回INVALID_SOCKET。套接字描述符是一个整数类型的值。每个进程的进程空间里都有一个套接字描述符表，该表中存放着套接字描述符和套接字数据结构的对应关系。该表中有一个字段存放新创建的套接字的描述符，另一个字段存放套接字数据结构的地址，因此根据套接字描述符就可以找到其对应的套接字数据结构。每个进程在自己的进程空间里都有一个套接字描述符表但是套接字数据结构都是在操作系统的内核缓冲里。

# 6、C++中new和std::nothrow的使用避免抛异常
http://www.cplusplus.com
在操作符new 和new [ ]内存分配失败的时候抛出的异常，在分配异常的情况下这时的指针myarray不为NULL；

没法用进行Test-for-NULL检查，同时记住Test-for-NULL这是个好习惯。
"new(std::nothrow)"在分配内存失败时会返回一个空指针。

# 7、execlp 
本词条缺少概述图，补充相关内容使词条更完整，还能快速升级，赶紧来编辑吧！
execlp()函数属于exec()函数族（exec()族函数用一个新的进程映像替换当前进程映像）它是execve(2)函数的前端。
execlp()会从PATH 环境变量所指的目录中查找符合参数file的文件名，找到后便执行该文件，然后将第二个以后的参数当做该文件的argv[0]、argv[1]……，最后一个参数必须用空指针(NULL)作结束。如果用常数0来表示一个空指针，则必须将它强制转换为一个字符指针，否则它将解释为整形参数，如果一个整形数的长度与char * 的长度不同，那么exec函数的实际参数就将出错。如果函数调用成功,进程自己的执行代码就会变成加载程序的代码,execlp()后边的代码也就不会执行了.



（linux system函数详解)[https://www.cnblogs.com/leijiangtao/p/4051387.html]

https://www.zhihu.com/question/346302613



# 8、error: kex protocol error: type 30 seq 1 [preauth]

git clone时出现这个错误，参考： https://blog.csdn.net/luozhonghua2014/article/details/80960187 

但是没有去实践，因为没有影响。

在/etc/ssh/sshd_config文件中添加：

> KexAlgorithms curve25519-sha256@libssh.org,ecdh-sha2-nistp256,ecdh-sha2-nistp384,ecdh-sha2-nistp521,diffie-hellman-group14-sha1 

重启ssd



















