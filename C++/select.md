# select函数

## 1、exit(EXIT_FAILURE)
EXIT_SUCCESS和EXIT_FAILURE是两个常量。一般EXIT_SUCCESS=0，EXIT_FAILURE=1。

exit()函数先处理完上面你列出的许多后事，最后将它的参数返回给操作系统作为exit status。所以从exit函数本身执行来说并没有什么不同。不同的是操作系统对这个exit status的解释。一般0表示程序寿终正寝，1表示死于非命。

## 2、select函数
select()的机制中提供一fd_set的数据结构，实际上是一long类型的数组， 每一个数组元素都能与一打开的文件句柄（不管是Socket句柄，还是其他 文件或命名管道或设备句柄）建立联系，建立联系的工作由程序员完成， 当调用select()时，由内核根据IO状态修改fd_set的内容，由此来通知执 行了select()的进程哪一Socket或文件可读或可写。主要用于Socket通信当中!

Select在Socket编程中还是比较重要的，可是对于初学Socket的人来说都不太爱用Select写程序，他们只是习惯写诸如connect、accept、recv或recvfrom这样的阻塞程序（所谓阻塞方式block，顾名思义，就是进程或是线程执行到这些函数时必须等待某个事件的发生，如果事件没有发生，进程或线程就被阻塞，函数不能立即返回）。
可是使用Select就可以完成非阻塞（所谓非阻塞方式non-block，就是进程或线程执行此函数时不必非要等待事件的发生，一旦执行肯定返回，以返回值的不同来反映函数的执行情况，如果事件发生则与阻塞方式相同，若事件没有发生，则返回一个代码来告知事件未发生，而进程或线程继续执行，所以效率较高）方式工作的程序，它能够监视我们需要监视的文件描述符的变化情况——读写或是异常。
返回值：准备就绪的描述符数，若超时则返回0，若出错则返回-1。


https://www.zhihu.com/question/32163005
https://blog.csdn.net/zujipi8736/article/details/86606093

## 3、IO多路复用
linux IO多路复用有epoll， poll, select，其中epoll性能比其他几者要好。

其实“I/O多路复用”这个坑爹翻译可能是这个概念在中文里面如此难理解的原因。所谓的I/O多路复用在英文中其实叫 I/O multiplexing. 

重要的事情再说一遍： I/O multiplexing 这里面的 multiplexing 指的其实是在单个线程通过记录跟踪每一个Sock(I/O流)的状态(对应空管塔里面的Fight progress strip槽)来同时管理多个I/O流. 发明它的原因，是尽量多的提高服务器的吞吐能力。

上面所有这些比较分析，都建立在大并发下面，如果你的并发数太少，用哪个，其实都没有区别。 如果像是在欧朋数据中心里面的转码服务器那种动不动就是几万几十万的并发，不用epoll我可以直接去撞墙了。

select函数是实现IO多路复用的一种方式。

什么是IO多路复用？

举一个简单地网络服务器的例子，如果你的服务器需要和多个客户端保持连接，处理客户端的请求，属于多进程的并发问题，如果创建很多个进程来处理这些IO流，会导致CPU占有率很高。所以人们提出了I/O多路复用模型：一个线程，通过记录I/O流的状态来同时管理多个I/O。

select只是IO复用的一种方式，其他的还有：poll，epoll等。

### 3-1、三者对比
select 会修改传入的参数数组，这个对于一个需要调用很多次的函数，是非常不友好的。 select 如果任何一个sock(I/O stream)出现了数据，select 仅仅会返回，但是并不会告诉你是那个sock上有数据，于是你只能自己一个一个的找，10几个sock可能还好，要是几万的sock每次都找一遍，这个无谓的开销就颇有海天盛筵的豪气了。select 只能监视1024个链接， 这个跟草榴没啥关系哦，linux 定义在头文件中的，参见FD_SETSIZE。select 不是线程安全的，如果你把一个sock加入到select, 然后突然另外一个线程发现，尼玛，这个sock不用，要收回。对不起，这个select 不支持的，如果你丧心病狂的竟然关掉这个sock, select的标准行为是。。呃。。不可预测的， 这个可是写在文档中的哦.

poll 去掉了1024个链接的限制，于是要多少链接呢， 主人你开心就好。
poll 从设计上来说，不再修改传入数组，不过这个要看你的平台了，所以行走江湖，还是小心为妙。

epoll 现在是线程安全的。
epoll 现在不仅告诉你sock组里面数据，还会告诉你具体哪个sock有数据，你不用自己去找了。

可是epoll 有个致命的缺点。。只有linux支持。比如BSD上面对应的实现是kqueue。

多路网络连接复用一个io线程。

## 4、学习select函数
**nfds：**是一个整数值， 表示集合中所有文件描述符的范围，即所有文件描述符的最大值+1。在windows中不需要管这个。

linux select第一个参数的函数： 待测试的描述集的总个数。 但要注意， 待测试的描述集总是从0， 1， 2， …开始的。 所以， 假如你要检测的描述符为8， 9， 10， 那么系统实际也要监测0， 1， 2， 3， 4， 5， 6, 7， 此时真正待测试的描述符的个数为11个， 也就是max（8， 9， 10） + 1
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

## 5、socat命令
apt install socat

socat，是linux下的一个工具，其功能与有“瑞士军刀”之称的netcat类似，不过据说可以看做netcat的加强版。的确如此，它有一些netcat所不具备却又很有需求的功能，例如ssl连接这种。nc可能是因为比较久没有维护，确实显得有些陈旧了。

socat [options] address address
其中这2个address就是关键了，如果要解释的话，address就类似于一个文件描述符，socat所做的工作就是在2个address指定的描述符间建立一个pipe用于发送和接收数据。

那么address的描述就是socat的精髓所在了，几个常用的描述方式如下：

-,STDIN,STDOUT ：表示标准输入输出，可以就用一个横杠代替，这个就不用多说了吧….
/var/log/syslog : 也可以是任意路径，如果是相对路径要使用./，打开一个文件作为数据流。
TCP:: : 建立一个TCP连接作为数据流，TCP也可以替换为UDP
TCP-LISTEN: : 建立TCP监听端口，TCP也可以替换为UDP
EXEC: : 执行一个程序作为数据流。
以上规则中前面的TCP等都可以小写。

### 5-1、实例
socat当cat
```
直接回显
socat - -

cat文件
socat - /home/user/chuck

写文件
echo “hello” | socat - /home/user/chuck
```

socat当netcat
```
连接远程端口
nc localhost 80
socat - TCP:localhost:80

监听端口
nc -lp localhost 700
socat TCP-LISTEN:700 -

正向shell
nc -lp localhost 700 -e /bin/bash
socat TCP-LISTEN:700 EXEC:/bin/bash

反弹shell
nc localhost 700 -e /bin/bash
socat tcp-connect:localhost:700 exec:‘bash -li’,pty,stderr,setsid,sigint,sane

代理与转发
将本地80端口转发到远程的80端口
socat TCP-LISTEN:80,fork TCP:www.domain.org:80
```
https://blog.csdn.net/wuheshi/article/details/107364998

## 6、实战深入了解三者区别
https://zhuanlan.zhihu.com/p/129089001

代码见IO_multiplexing文件夹

[Linux网络编程-readn函数、writen函数、readline函数实现](https://www.cnblogs.com/yongqiang/p/6145498.html)
