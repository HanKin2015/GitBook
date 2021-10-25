# 学习libevent

## 1、介绍
Libevent 是一个用C语言编写的、轻量级的开源高性能事件通知库，主要有以下几个亮点：事件驱动（ event-driven），高性能;轻量级，专注于网络，不如 ACE 那么臃肿庞大；源代码相当精炼、易读；跨平台，支持 Windows、 Linux、 *BSD 和 Mac Os；支持多种 I/O 多路复用技术， epoll、 poll、 dev/poll、 select 和 kqueue 等；支持 I/O，定时器和信号等事件；注册事件优先级。
Libevent 已经被广泛的应用，作为底层的网络库；比如 memcached、 Vomit、 Nylon、 Netchat等等。

## 2、安装
验证是否已经安装
ls -al /usr/lib | grep libevent
ls -al /usr/local/lib | grep libevent

官网：https://libevent.org/
tar xvf libevent-2.1.12-stable.tar.gz
ll
cd libevent-2.1.12-stable/
ll
./configure
make install
ls -al /usr/lib | grep libevent
ls -al /usr/local/lib | grep libevent

## 3、测试环境
```
#include <stdio.h>
#include <event.h>
#include <time.h>

struct event ev;
struct timeval tv;
void time_cb(int fd, short event, void *argc)
{
	printf("timer wakeup\n");
	event_add(&ev, &tv); // reschedule timer
}

int main()
{
	struct event_base *base = event_init();
	tv.tv_sec = 10; // 10s period
	tv.tv_usec = 0;
	evtimer_set(&ev, time_cb, NULL);
	event_add(&ev, &tv);
	event_base_dispatch(base);
	return 0;
}


[root@ubuntu0006:/media/hankin/vdb/study/libevent] #gcc set_timer.cpp
/tmp/cc3vMcDq.o：在函数‘time_cb(int, short, void*)’中：
set_timer.cpp:(.text+0x2a)：对‘event_add’未定义的引用
/tmp/cc3vMcDq.o：在函数‘main’中：
set_timer.cpp:(.text+0x3a)：对‘event_init’未定义的引用
set_timer.cpp:(.text+0x73)：对‘event_set’未定义的引用
set_timer.cpp:(.text+0x82)：对‘event_add’未定义的引用
set_timer.cpp:(.text+0x8e)：对‘event_base_dispatch’未定义的引用
collect2: error: ld returned 1 exit status
[root@ubuntu0006:/media/hankin/vdb/study/libevent] #gcc set_timer.cpp -levent
[root@ubuntu0006:/media/hankin/vdb/study/libevent] #./a.out
./a.out: error while loading shared libraries: libevent-2.1.so.7: cannot open shared object file: No such file or directory
```

解决办法：export LD_LIBRARY_PATH=/usr/local/lib/

## 4、libevent案例
API及调用顺序为：

event_base()初始化event_base
event_set()初始化event
event_base_set()将event绑定到指定的event_base上
event_add()将event添加到事件链表上，注册事件
event_base_dispatch()循环、检测、分发事件

```
#include <stdio.h>
#include <event.h>
#include <time.h>

struct event ev;
struct timeval tv;

void timer_cb(int fd, short event, void *arg)	//回调函数
{
	printf("timer_cb\n");
	event_add(&ev, &tv);    					//重新注册
}

int main()
{
	struct event_base *base = event_init();  //初始化libevent库
	tv.tv_sec = 1;
	tv.tv_usec = 0;

	event_set(&ev, -1, 0, timer_cb, NULL);  //初始化event结构中成员
	event_base_set(base, &ev);
	event_add(&ev, &tv);  					//将event添加到events事件链表，注册事件
	event_base_dispatch(base);  			//循环、分发事件

	return 0;
}
```

## 5、入门
https://www.jianshu.com/p/8ea60a8d3abb

基本的socket编程是阻塞/同步的，每个操作除非已经完成，出错，或者超时才会返回，这样对于每一个请求，要使用一个线程或者单独的进程去处理，系统资源没有办法支撑大量的请求。posix定义了可以使用异步的select系统调用，但是因为它采用了轮询的方式来判断某个fd是否变成active，效率不高。于是各系统就分别提出了基于异步的系统调用，例如Linux的epoll，由于在内核层面做了支持，所以可以用O(1)的效率查找到active的fd。基本上，libevent就是对这些高效IO的封装，提供统一的API，简化开发。

## 6、原理简介
libevent默认情况下是单线程的，可以配置成多线程，每个线程有且只有一个event_base，对应一个struct event_base结构体以及附于其上的事件管理器，用来调度托管给它的一系列event，可以和操作系统的进程管理类比。当一个事件发生后，event_base会在合适的时间，不一定是立即去调用绑定在这个事件上的函数，直到这个函数执行完，再去调度其他的事件。

## 7、evutil_socket_t
在头文件<event2/util.h>中定义了许多有用的函数和类型来帮助实现可移植的程序。Libevent在内部使用这些类型和函数。
一：基本类型
evutil_socket_t

         除了Windows之外的大多数系统，socket就是一个整数，而且操作系统按照数值顺序对它们进行处理。而在Windows socket API中，socket是SOCKET类型，该类型是一个类似于指针的OS句柄，而且得到它们的顺序也是未定义的。Libevent定义evutil_socket_t类型为一个整数，该整数可以表示socket或者accept函数的返回值，并且可以在Windows上避免指针截断的风险。
```
#ifdef WIN32
#define evutil_socket_t  intptr_t
#else
#define evutil_socket_t  int
#endif
```

[socket编程与libevent2的一些归纳总结](https://segmentfault.com/a/1190000003780387)




