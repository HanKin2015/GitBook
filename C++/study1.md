# 20190729入门学习1

假设有结构体 addr;

memset(&addr,0,sizeof(addr));



memset()方法是在某个内存块内填充某一特定的值

指向结构体的指针必须初始化https://blog.csdn.net/hk121/article/details/80839813

静态函数 glib    snprintf    openssl
# 回写缓存
回写缓存，一种缓存技术，在回写缓存技术中，一旦数据写到缓存中，就会发送写请求已完成信号，而把数据写到非易失性存储介质上的实际操作将会延迟进行。
中文名回写缓存类    型缓存技术缓存实现系统失效期间介    质非易失性存储
回写缓存存在有一个与生俱来的潜在问题，即应用程序在接到写完成信号之后可能会进行一些其他操作，而在数据被真正写入非易失性介质之前系统失效。此时就会导致介质上的数据与后续操作不一致性。由于这个问题，良好的回写缓存实现时要有在系统失效期间（包括电源失效）保护缓存内容，当系统重启时再写入介质的机制。

		dpdk   dhcp   debian   序列化
C中int8_t、int16_t、int32_t、int64_t、uint8_t、size_t、ssize_t区别

callocmallocrelooc


http://www.lovean.com/view-151-304641-0.html

[apt 和 apt-get的区别（建议使用apt）](https://blog.csdn.net/a3192048/article/details/86618314)



中标麒麟操作系统(NeoKylin)


# 第二周练习
[数据结构---哈希表的C语言实现](https://blog.csdn.net/weixin_40331034/article/details/79461705)






# struct和class的区别

hash树，跳表




ps x | grep gas | grep -v grep | awk '{print $1}' | xargs kill -9

https://blog.csdn.net/qq_34068668/article/details/81744244





# getppid 
getppid（取得父进程的进程识别码）
```
#include<unistd.h>
main()
{
printf(“My parent ‘pid =%d\n”,getppid());
}
```


# gcc/g++ 编译时报错原因分析之expected type-specifier before
因为没有引入相应的头文件，找到对应的头文件，加入相应的cpp中即可解决。



1、语法区别：

id对应css是用样式选择符“#”（井号）。

class对应css是用样式选择符“.”(英文半角输入句号)。

2、使用次数区别：

id属性，只能被一个元素调用（以“#”选择符命名CSS样式在一个页面只能使用调用一次）。在同一个页面，只可以被调用一次，在CSS里用“#”表示。

class类标记，可以用于被多个元素调用(以“.”选择符命名样式可以一个页面使用多次)是类标签，在同一个页面可以调用无数次（没限制的），在CSS里用“.”表示。

ID就像一个人的身份证，用于识别这个DIV的，Class就像人身上穿的衣服，用于定义这个DIV的样式。一般一个网页不设二个或二个以上同ID的div，但Class可以多个DIV用同一个Class。



#  pthread_t
中文名 pthread_t 类型定义 typedef unsigned  用    途 用于声明线程ID。 sizeof  4;(不同环境大小不一）x86_64=8
类型定义：
typedef unsigned long int pthread_t;
//come from /usr/include/bits/pthreadtypes.h
用途：pthread_t用于声明线程ID。
sizeof(pthread_t) =8
pthread_t，在使用printf打印时，应转换为u类型。



Beyond Compare 编辑
Beyond Compare是一套由Scooter Software推出的文件比较工具。主要用途是对比两个文件夹或者文件，并将差异以颜色标示。比较范围包括目录，文档内容等。

[Windows] win10任务栏透明以及实时显示网速，CPU和内存占有率     [复制链接]
伍_六_七

 发表于 2019-3-19 21:30

 

本帖最后由 伍_六_七 于 2019-4-2 13:11 编辑


第一款Aero（大小：26.5 KB (27,136 字节)）
单文件，不用安装没有花里胡哨的操作，双击就可以直接让任务栏透明

第二款TrafficMonitor(大小：4.41 MB (4,624,811 字节))
也是单文件，双击TrafficMonitor.exe即可显示

两款软件win10亲测可用

刚注册到账号的新人，有什么做的不对的地方还请多多指教
https://github.com/zhongyang219/TrafficMonitor/releases

CLOCKS_PER_SEC 编辑 讨论
CLOCKS_PER_SEC是标准c的time.h头函数中宏定义的一个常数，表示一秒钟内CPU运行的时钟周期数，用于将clock()函数的结果转化为以秒为单位的量，但是这个量的具体值是与操作系统相关的。


#define CLOCKS_PER_SEC 1000

C 库函数 - clock()
C 标准库 - <time.h> C 标准库 - <time.h>

描述
C 库函数 clock_t clock(void) 返回程序执行起（一般为程序的开头），处理器时钟所使用的时间。为了获取 CPU 所使用的秒数，您需要除以 CLOCKS_PER_SEC。

在 32 位系统中，CLOCKS_PER_SEC 等于 1000000，该函数大约每 72 分钟会返回相同的值。

声明
下面是 clock() 函数的声明。

clock_t clock(void)


# 使用ip命令配置IP地址和静态路由
ip addr add 199.199.199.199/24 dev eth0
ip addr del 199.199.199.199/24 dev eth0
ip route

[linux ip命令和ifconfig命令](https://www.cnblogs.com/0to9/p/9591315.html)

# 函数定义
```
#include <stdio.h>
FILE * popen(const char *command , const char *type );
int pclose(FILE *stream);
```
# 函数说明
popen()函数通过创建一个管道，调用fork()产生一个子进程，执行一个shell以运行命令来开启一个进程。这个管道必须由pclose()函数关闭，而不是fclose()函数。pclose()函数关闭标准I/O流，等待命令执行结束，然后返回shell的终止状态。如果shell不能被执行，则pclose()返回的终止状态与shell已执行exit一样。

https://www.jb51.net/article/140783.htm






