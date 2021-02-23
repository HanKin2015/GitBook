# 学习libevent

## 1、介绍
Libevent 是一个用C语言编写的、轻量级的开源高性能事件通知库，主要有以下几个亮点：事件驱动（ event-driven），高性能;轻量级，专注于网络，不如 ACE 那么臃肿庞大；源代码相当精炼、易读；跨平台，支持 Windows、 Linux、 *BSD 和 Mac Os；支持多种 I/O 多路复用技术， epoll、 poll、 dev/poll、 select 和 kqueue 等；支持 I/O，定时器和信号等事件；注册事件优先级。
Libevent 已经被广泛的应用，作为底层的网络库；比如 memcached、 Vomit、 Nylon、 Netchat等等。

## 2、libevent案例
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

void timer_cb(int fd, short event, void *arg)    //回调函数
{
        printf("timer_cb\n");
        event_add(&ev, &tv);    //重新注册
}

int main()
{
        struct event_base *base = event_init();  //初始化libevent库
        tv.tv_sec = 1;
        tv.tv_usec = 0;

        event_set(&ev, -1, 0, timer_cb, NULL);  //初始化event结构中成员
        event_base_set(base, &ev);
        event_add(&ev, &tv);  //将event添加到events事件链表，注册事件
        event_base_dispatch(base);  //循环、分发事件

        return 0;
}
```





