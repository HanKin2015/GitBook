# select函数

## 1、exit(EXIT_FAILURE)
EXIT_SUCCESS和EXIT_FAILURE是两个常量。一般EXIT_SUCCESS=0，EXIT_FAILURE=1（已验证）。

exit()函数先处理完上面你列出的许多后事，最后将它的参数返回给操作系统作为exit status。所以从exit函数本身执行来说并没有什么不同。不同的是操作系统对这个exit status的解释。一般0表示程序寿终正寝，1表示死于非命。

## 2、select函数

### 2-1、简介
Select在Socket编程中还是比较重要的，可是对于初学Socket的人来说都不太爱用Select写程序，他们只是习惯写诸如connect、accept、recv或recvfrom这样的阻塞程序（所谓阻塞方式block，顾名思义，就是进程或是线程执行到这些函数时必须等待某个事件的发生，如果事件没有发生，进程或线程就被阻塞，函数不能立即返回）。
可是使用Select就可以完成非阻塞（所谓非阻塞方式non-block，就是进程或线程执行此函数时不必非要等待事件的发生，一旦执行肯定返回，以返回值的不同来反映函数的执行情况，如果事件发生则与阻塞方式相同，若事件没有发生，则返回一个代码来告知事件未发生，而进程或线程继续执行，所以效率较高）方式工作的程序，它能够监视我们需要监视的文件描述符的变化情况——读写或是异常。
返回值：准备就绪的描述符数，若超时则返回0，若出错则返回-1。

https://www.zhihu.com/question/32163005
https://blog.csdn.net/zujipi8736/article/details/86606093

### 2-2、函数定义
linux select函数的第一个参数：待测试的描述集的总个数（**nfds：**是一个整数值， 表示集合中所有文件描述符的范围，即所有文件描述符的最大值+1。在windows中不需要管这个）。 但要注意， 待测试的描述集总是从0， 1， 2， …开始的。 所以， 假如你要检测的描述符为8， 9， 10， 那么系统实际也要监测0， 1， 2， 3， 4， 5， 6, 7， 此时真正待测试的描述符的个数为11个， 也就是max（8， 9， 10） + 1
注意：
​ 1、果你要检测描述符8, 9, 10, 但是你把select的第一个参数定为8， 实际上只检测0到7， 所以select不会感知到8, 9, 10描述符的变化。
​ 2、果你要检测描述符8, 9, 10, 且你把select的第一个参数定为11， 实际上会检测0-10， 但是， 如果你不把描述如0 set到描述符中， 那么select也不会感知到0描述符的变化。
​ 所以， select感知到描述符变化的必要条件是， 第一个参数要合理， 比如定义为fdmax+1, 且把需要检测的描述符set到描述集中。

```
/* According to POSIX.1-2001 */
#include <sys/select.h>

/* According to earlier standards */
#include <sys/time.h>
#include <sys/types.h>
#include <unistd.h>

int select(int nfds, fd_set *readfds, fd_set *writefds,
           fd_set *exceptfds, struct timeval *timeout);

void FD_CLR(int fd, fd_set *set);//清除某一个被监视的文件描述符。
int  FD_ISSET(int fd, fd_set *set);//测试一个文件描述符是否是集合中的一员
void FD_SET(int fd, fd_set *set);//添加一个文件描述符，将set中的某一位设置成1；
void FD_ZERO(fd_set *set);//清空集合中的文件描述符,将每一位都设置为0；

fd_set readfds;
int fd;
FD_ZERO(&readfds)//新定义的变量要清空一下。相当于初始化。
FD_SET(fd,&readfds);//把文件描述符fd加入到readfds中。
//select 返回
if(FD_ISSET(fd,&readset))//判断是否成功监视
{
    //dosomething
}

#include <sys/select.h>

int pselect(int nfds, fd_set *readfds, fd_set *writefds,
           fd_set *exceptfds, const struct timespec *timeout,
           const sigset_t *sigmask);
```

## 3、IO多路复用
linux IO多路复用有epoll，poll, select，其中epoll性能比其他几者要好。

其实“I/O多路复用”这个坑爹翻译可能是这个概念在中文里面如此难理解的原因。所谓的I/O多路复用在英文中其实叫 I/O multiplexing. 

重要的事情再说一遍： I/O multiplexing 这里面的 multiplexing 指的其实是在单个线程通过记录跟踪每一个Sock(I/O流)的状态(对应空管塔里面的Fight progress strip槽)来同时管理多个I/O流. 发明它的原因，是尽量多的提高服务器的吞吐能力。

上面所有这些比较分析，都建立在大并发下面，如果你的并发数太少，用哪个，其实都没有区别。 如果像是在欧朋数据中心里面的转码服务器那种动不动就是几万几十万的并发，不用epoll我可以直接去撞墙了。

select函数是实现IO多路复用的一种方式。

什么是IO多路复用？

举一个简单地网络服务器的例子，如果你的服务器需要和多个客户端保持连接，处理客户端的请求，属于多进程的并发问题，如果创建很多个进程来处理这些IO流，会导致CPU占有率很高。所以人们提出了I/O多路复用模型：一个线程，通过记录I/O流的状态来同时管理多个I/O。

select只是IO复用的一种方式，其他的还有：poll，epoll等。

### 3-1、IO多路复用简介
IO多路复用是一种高效的I/O操作方式，它允许一个进程同时监视多个文件描述符，当其中任何一个文件描述符就绪时，该进程就可以进行相应的I/O操作。这种方式可以避免使用多线程或多进程的开销，提高系统的并发性能。

在Linux系统中，常用的IO多路复用函数有select、poll和epoll。其中，select和poll的实现方式比较简单，但是在处理大量文件描述符时性能较差；而epoll则采用了更加高效的事件通知机制，可以处理大量文件描述符而不会出现性能瓶颈。

使用IO多路复用可以提高程序的并发性能，减少系统资源的占用，但是需要注意合理使用，避免出现死循环等问题。

### 3-2、不使用IO多路复用可能会导致以下问题
阻塞：在传统的阻塞IO模型中，当一个连接在读写数据时，整个进程会被阻塞，无法处理其他连接的请求，导致服务器的吞吐量下降。
资源浪费：在传统的阻塞IO模型中，为了处理大量的连接，需要创建大量的线程或进程，这样会占用大量的系统资源，导致系统的性能下降。
可扩展性差：在传统的阻塞IO模型中，为了处理大量的连接，需要创建大量的线程或进程，这样会导致系统的可扩展性差，无法满足高并发的需求。

因此，使用IO多路复用可以有效地解决以上问题，提高服务器的性能和可扩展性。

### 3-3、三者对比
select 会修改传入的参数数组，这个对于一个需要调用很多次的函数，是非常不友好的。 select 如果任何一个sock(I/O stream)出现了数据，select 仅仅会返回，但是并不会告诉你是那个sock上有数据，于是你只能自己一个一个的找，10几个sock可能还好，要是几万的sock每次都找一遍，这个无谓的开销就颇有海天盛筵的豪气了。select 只能监视1024个链接， 这个跟草榴没啥关系哦，linux 定义在头文件中的，参见FD_SETSIZE。select 不是线程安全的，如果你把一个sock加入到select, 然后突然另外一个线程发现，尼玛，这个sock不用，要收回。对不起，这个select 不支持的，如果你丧心病狂的竟然关掉这个sock, select的标准行为是。。呃。。不可预测的， 这个可是写在文档中的哦.

poll 去掉了1024个链接的限制，于是要多少链接呢， 主人你开心就好。
poll 从设计上来说，不再修改传入数组，不过这个要看你的平台了，所以行走江湖，还是小心为妙。

epoll 现在是线程安全的。
epoll 现在不仅告诉你sock组里面数据，还会告诉你具体哪个sock有数据，你不用自己去找了。

可是epoll 有个致命的缺点。。只有linux支持。比如BSD上面对应的实现是kqueue。

多路网络连接复用一个io线程。

### 3-4、进一步理解
IO 多路复用（IO Multiplexing） 是一种高效的 IO 编程模型，用于解决单线程 / 进程同时处理多个 IO 请求的问题。它允许程序在单个线程中监听多个 IO 事件（如网络连接、文件读写），避免为每个 IO 操作创建单独的线程，从而减少线程开销和上下文切换成本。

### 3-5、为什么需要 IO 多路复用？
传统的阻塞 IO 模型中，程序在执行 IO 操作时会被阻塞，直到数据就绪。如果需要处理多个 IO 源（如多个客户端连接），就需要为每个 IO 源创建一个线程 / 进程，导致：

- 资源浪费：线程 / 进程的创建和销毁成本高。
- 可扩展性差：大量线程会导致 CPU 调度开销激增，甚至内存溢出。

IO 多路复用的核心优势：用一个线程监控多个 IO 源，当某个 IO 源就绪时（如数据可读 / 可写），通知程序处理，从而实现高效并发。

### 3-6、核心原理：事件驱动的轮询机制
IO 多路复用的本质是通过系统调用（如select、poll、epoll）让操作系统内核代为监控多个 IO 源的状态，程序只需：

- 注册感兴趣的 IO 事件（如 “socket 可读”）到内核。
- 阻塞等待内核通知哪些 IO 事件已就绪。
- 处理就绪的 IO 事件，然后继续等待。

这种模式将原本由程序自己轮询每个 IO 源的操作（效率低），转化为内核高效地批量检查 IO 状态，大大提升了性能。

## 4、、实战深入了解三者区别
https://zhuanlan.zhihu.com/p/129089001

代码见：D:\Github\Storage\linux\IO_multiplexing

[Linux网络编程-readn函数、writen函数、readline函数实现](https://www.cnblogs.com/yongqiang/p/6145498.html)

select、poll需要线性扫描而epoll不需要。

文中多次提到客户端，客户端代码见：D:\Github\Storage\c++\IO_multiplexing\client.c

### 4-1、未使用select函数
《UNIX 网络编程 卷1》5.2、5.3 节的 TCP 回射服务器程序的简化版本，没有使用 fork 产生多进程，也没有处理 EINTR 错误。
代码见：D:\Github\Storage\c++\IO_multiplexing\normal_server.c
运行结果：
```
pid: 22424
socket_fd: 3
监听消息中...

打开新的控制台，进入 root 用户：
[root@ubuntu0006:~] #ll /proc/22424/fd
总用量 0
dr-x------ 2 root root  0 2月  14 14:28 ./
dr-xr-xr-x 9 root root  0 2月  14 14:26 ../
lrwx------ 1 root root 64 2月  14 14:28 0 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 14:28 1 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 14:28 2 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 14:28 3 -> socket:[1054079230]
```
/proc/22424/fd/3 是一个类型为 socket 的文件。（准确来说，它是一个符号链接，链接到一个类型为 socket 的文件。）可在 root 权限下运行以下程序来测试。
代码见：D:\Github\Storage\c++\IO_multiplexing\is_socket_file.c

本文写的整个程序运行在单进程、单线程下。当 TCP 服务器接收到连接并产生 connection_fd 时，它将“全力”处理当前的这个连接，对 socket_fd 则“不闻不问”。直至当前连接关闭，服务器才会继续监听 socket_fd 是否有新的连接。这个弊端是很大的。一个自然的想法是，使用 <unistd.h> 里的 fork 函数，让子进程处理 connection_fd（关闭 socket_fd），让父进程处理 socket_fd（关闭 connection_fd）。这也是《UNIX 网络编程 卷1》从 2.10 节开始介绍，到第 5 章都在讲解的办法。

### 4-2、使用select函数
进入《UNIX 网络编程 卷1》第 6 章的 I/O 复用。

直观来说，I/O 复用的作用就是：让程序能够在单进程、单线程的模式下，同时处理 socket_fd 和 connection_fd 这两个文件。select 函数为这个想法提供了支持：当 socket_fd 和 connection_fd 中有一个已经“准备好”时，就会返回。进程首先检查 socket_fd 和 connection_fd 中的哪个已经准备好，对已经准备好的文件描述符再执行相应的操作。如果 connection_fd 准备好，就处理数据；如果 socket_fd 准备好，就接受连接并产生新的 connection_fd。

显然，从上面的描述可以看到，仅有一个 connection_fd 是不够的，所以有必要把它改造为数组：
```
#define MAXCLIENT (1024)
int client_fd[MAXCLIENT];
```
代码见：D:\Github\Storage\c++\IO_multiplexing\select_server.c

服务器就可以在单进程、单线程的模型下同时处理多个连接了。使用两个客户端连接到服务器之后，使用 ls -l 命令查看 /proc/28227/fd/ ，如下：
```
[root@ubuntu0006:~] #ll /proc/28227/fd
总用量 0
dr-x------ 2 root root  0 2月  14 16:50 ./
dr-xr-xr-x 9 root root  0 2月  14 16:47 ../
lrwx------ 1 root root 64 2月  14 16:50 0 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 16:50 1 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 16:50 2 -> /dev/pts/4
lrwx------ 1 root root 64 2月  14 16:50 3 -> socket:[1054847860]
lrwx------ 1 root root 64 2月  14 16:50 4 -> socket:[1054851740]
lrwx------ 1 root root 64 2月  14 16:51 5 -> socket:[1054868409]
```

#### fd_set
select()的机制中提供一个fd_set的数据结构，实际上是一个long类型的数组， 每一个数组元素都能与一打开的文件句柄（不管是Socket句柄，还是其他 文件或命名管道或设备句柄）建立联系，建立联系的工作由程序员完成， 当调用select()时，由内核根据IO状态修改fd_set的内容，由此来通知执 行了select()的进程哪一个Socket或文件可读或可写。主要用于Socket通信当中!
```
typedef struct
{
/*XPG4.2requiresthismembername.Otherwiseavoidthename
fromtheglobalnamespace.*/
#ifdef__USE_XOPEN
    __fd_maskfds_bits[__FD_SETSIZE/__NFDBITS];
    #define__FDS_BITS(set)((set)->fds_bits)
#else
    __fd_mask__fds_bits[__FD_SETSIZE/__NFDBITS];
    #define__FDS_BITS(set)((set)->__fds_bits)
#endif
} fd_set;
```

常见用法:
```
fd_set set;
FD_ZERO(&set);      /*将set清零使集合中不含任何fd*/
FD_SET(fd, &set);   /*将fd加入set集合*/
FD_CLR(fd, &set);   /*将fd从set集合中清除*/
FD_ISSET(fd, &set); /*在调用select()函数后，用FD_ISSET来检测fd是否在set集合中，当检测到fd在set中则返回真，否则，返回假（0）*/
```
以上式子中的fd为socket句柄。

代码见：D:\Github\Storage\c++\IO_multiplexing\fd_set_example.cpp

#### 有时候出现客户端连接失败问题
```
[root@ubuntu0006:/media/vdb] #./client 172.22.65.15
connect error: Connection refused(errno: 111)
[root@ubuntu0006:/media/vdb] #./client 172.22.65.15
connect error: Connection refused(errno: 111)
[root@ubuntu0006:/media/vdb] #./client 172.22.65.15
connect error: Connection refused(errno: 111)
```
很玄学，不开启server的话，客户端就是报这个错误，说明客户端未检测到服务端开启，有时候运行服务端后立即客户端连接，时而成功时而失败。
服务端一直开启，等待很长时间后再连接也是失败的。

### 4-3、使用poll函数
与 select 函数使用 fd_set 相比，poll 函数则使用 pollfd 数组作为参数。与 select 函数编写方法类似：D:\Github\Storage\c++\IO_multiplexing\poll_server.c

select 和 poll 都有一个缺点，就是只知道有多少个文件描述符已准备好，却不知道具体是哪些，因此需要使用线性扫描来确定，效率较低。试想：有没有别的函数，能不仅仅返回数量，并且一并返回已经准备好的文件描述符呢？
代码见：D:\Github\Storage\c++\IO_multiplexing\poll_server.c

### 4-4、使用epoll函数
Linux 的 epoll 函数解决了这个问题。epoll 的用法和 select、poll 是类似的：将 socket_fd 加入监视，将新生成的连接加入监视，将已完成的连接退出监视。参考 Linux 控制台命令 man epoll，可继续将上述服务器的代码“改造”如下：
D:\Github\Storage\c++\IO_multiplexing\epoll_server.c

#### epoll的使用方法
- 首先调用int epoll_create(int size);创建一个 epoll
- 调用int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);为 epoll 注册事件（如果是新建的 epoll 一般 op 选项是EPOLL_CTL_ADD添加事件）
- 调用int epoll_wait(int epfd, struct epoll_event *events, int maxevents, int timeout);等待事件的到来，得到的结果存储在 event 中
- 完全处理完毕后，再次调用int epoll_ctl(int epfd, int op, int fd, struct epoll_event *event);删除已经注册的事件（op 选项是EPOLL_CTL_DEL）
- 值得注意的是epoll_wait函数只能获取是否有注册事件发生，至于这个事件到底是什么、从哪个 socket 来、发送的时间、包的大小等等信息，统统不知道。这就好比一个人在黑黢黢的山洞里，只能听到声响，至于这个声音是谁发出的根本不知道。因此我们就需要struct epoll_event来帮助我们读取信息。

#### struct epoll_event 结构分析
```
typedef union epoll_data {
    void *ptr;
    int fd;
    __uint32_t u32;
    __uint64_t u64;
} epoll_data_t;

struct epoll_event {
    __uint32_t events; /* Epoll events /
    epoll_data_t data; /* User data variable */
};
```
epoll_event 结构体的定义如上所示，分为 events 和 data 两个部分。
events 是 epoll 注册的事件，比如EPOLLIN、EPOLLOUT等等，这个参数在epoll_ctl注册事件时，可以明确告知注册事件的类型。

第二个参数 data 是一个联合体，很多人搞不清除 data 拿来干嘛，网上给的解释一般是传递参数，至于怎么传？有什么用？都不清不楚。

根据demo看：D:\Github\Storage\c++\IO_multiplexing\epoll_server.c

整个程序仅仅设置并注册了一个 socket 来连接所有 IP 地址htonl(INADDR_ANY);，因此 wait 收到的消息必然来自于这个唯一的 socket，所以这句判断根本是多此一举。

应用场景一：我们可以建立三个 socket 管理不同的字段。
可以看看深入：https://blog.csdn.net/tjcwt2011/article/details/121911168

#### 最后
学习之后，就可以去补充文件：D:\Github\Storage\udev\v4l2\验证VIDIOC_QBUF和VIDIOC_DQBUF\v4l2_tool.cpp。
并且可以将client.c文件弄过去进行发送消息。






