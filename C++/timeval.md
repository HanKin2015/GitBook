# 时间相关函数

timeval: n.微秒（百万分之一秒秒）精度

## 1、Unix时间戳
Unix时间戳(Unix timestamp)，或称Unix时间(Unix time)、POSIX时间(POSIX time)，是一种时间表示方式，定义为从格林威治时间1970年01月01日00时00分00秒起至现在的总秒数。Unix时间戳不仅被使用在Unix 系统、类Unix系统中，也在许多其他操作系统中被广告采用。

目前相当一部分操作系统使用32位二进制数字表示时间。此类系统的Unix时间戳最多可以使用到格林威治时间2038年01月19日03时14分07秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制数字会变为10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为1901年12月13日20时45分52秒。这很可能会引起软件故障，甚至是系统瘫痪。使用64位二进制数字表示时间的系统（最多可以使用到格林威治时间292,277,026,596年12月04日15时30分08秒）则基本不会遇到这类溢出问题。

GPS 系统中有两种时间区分，一为UTC，另一为LT（地方时）两者的区别为时区不同，UTC就是0时区的时间，地方时为本地时间，如北京为早上八点（东八区），UTC时间就为零点，时间比北京时晚八小时，以此计算即可通过上面的了解，我们可以认为格林威治时间就是时间协调时间（GMT=UTC），格林威治时间和UTC时间均用秒数来计算的。

## 2、time_t结构体
time_t 这种类型就是用来存储从1970年到现在经过了多少秒，要想更精确一点，可以用结构struct timeval，它精确到微妙。
在/usr/include/time.h查找即可。
```
x86_64-linux-gnu/bits/typesizes.h:# define __SYSCALL_SLONG_TYPE __SQUAD_TYPE
x86_64-linux-gnu/bits/typesizes.h:#define __TIME_T_TYPE         __SYSCALL_SLONG_TYPE
x86_64-linux-gnu/bits/types.h:__STD_TYPE __TIME_T_TYPE __time_t;        /* Seconds since the Epoch.  */
time.h:typedef __time_t time_t;
```

## 3、tm结构体
需要特别注意的是，年份是从1900年起至今多少年，而不是直接存储如2011年，月份从0开始的，0表示一月，星期也是从0开始的， 0表示星期日，1表示星期一。
```
#ifndef _TM_DEFINED
struct tm {
	int tm_sec; /* 秒 – 取值区间为[0,59] */
	int tm_min; /* 分 - 取值区间为[0,59] */
	int tm_hour; /* 时 - 取值区间为[0,23] */
	int tm_mday; /* 一个月中的日期 - 取值区间为[1,31] */
	int tm_mon; /* 月份（从一月开始，0代表一月） - 取值区间为[0,11] */
	int tm_year; /* 年份，其值等于实际年份减去1900 */
	int tm_wday; /* 星期 – 取值区间为[0,6]，其中0代表星期天，1代表星期一，以此类推 */
	int tm_yday; /* 从每年的1月1日开始的天数 – 取值区间为[0,365]，其中0代表1月1日，1代表1月2日，以此类推 */
	int tm_isdst; /* 夏令时标识符，实行夏令时的时候，tm_isdst为正。不实行夏令时的时候，tm_isdst为0；不了解情况时，tm_isdst()为负。
	long int tm_gmtoff; /*指定了日期变更线东面时区中UTC东部时区正秒数或UTC西部时区的负秒数*/
	const char *tm_zone; /*当前时区的名字(与环境变量TZ有关)*/
};
#define _TM_DEFINED
#endif

__BEGIN_NAMESPACE_STD
/* Used by other time functions.  */
struct tm
{
  int tm_sec;           /* Seconds. [0-60] (1 leap second) */
  int tm_min;           /* Minutes. [0-59] */
  int tm_hour;          /* Hours.   [0-23] */
  int tm_mday;          /* Day.     [1-31] */
  int tm_mon;           /* Month.   [0-11] */
  int tm_year;          /* Year - 1900.  */
  int tm_wday;          /* Day of week. [0-6] */
  int tm_yday;          /* Days in year.[0-365] */
  int tm_isdst;         /* DST.     [-1/0/1]*/

# ifdef __USE_MISC
  long int tm_gmtoff;       /* Seconds east of UTC.  */
  const char *tm_zone;      /* Timezone abbreviation.  */
# else
  long int __tm_gmtoff;     /* Seconds east of UTC.  */
  const char *__tm_zone;    /* Timezone abbreviation.  */
# endif
};
```
代码见：D:\Github\Storage\c++\standard_library\time\struct_tm_example.cpp

## 4、timeval结构体
```
struct timeval
{
    long tv_sec;  /*秒*/
    long tv_usec; /*微秒*/
};
```

## 5、timespec结构体
```
/* POSIX.1b structure for a time value.  This is like a `struct timeval' but
   has nanoseconds instead of microseconds.  */
struct timespec
{
	__time_t 		  tv_sec;	/* Seconds.  */
	__syscall_slong_t tv_nsec;  /* Nanoseconds.  */
};
```

## 6、下面介绍一下我们常用的时间函数
```
#include <time.h>
char *asctime(const struct tm* timeptr);
将结构中的信息转换为真实世界的时间，以字符串的形式显示

char *ctime(const time_t *timep);
将timep转换为真是世界的时间，以字符串显示，它和asctime不同就在于传入的参数形式不一样

double difftime(time_t time1, time_t time2);
返回两个时间相差的秒数

int gettimeofday(struct timeval *tv, struct timezone *tz);
返回当前距离1970年的秒数和微妙数，后面的tz是时区，一般不用

struct tm* gmtime(const time_t *timep);
将time_t表示的时间转换为没有经过时区转换的UTC时间，是一个struct tm结构指针

stuct tm* localtime(const time_t *timep);
和gmtime类似，但是它是经过时区转换的时间。

time_t mktime(struct tm* timeptr);
将struct tm 结构的时间转换为从1970年至今的秒数

time_t time(time_t *t);
取得从1970年1月1日至今的秒数。
```

## 7、linux时间间隔计算
https://blog.csdn.net/u013427969/article/details/81350322

### 7-1、time()
```
#include <time.h>
time_t time(time_t *t);
```
错误时返回-1
精度：秒级
代码见：D:\Github\Storage\c++\standard_library\time\time_interval.cpp

### 7-2、clock()
```
#include <time.h>
clock_t clock(void);

clock_t begin = clock()
不能使用sleep和usleep函数
clock_t end = clock();
```
真正的时间间隔是它除以CLOCKS_PER_SEC来得出时间秒级，但在linux系统中其受cpu影响太多，对于时间间隔的计算并不准确。 
代码见：D:\Github\Storage\c++\standard_library\time\time_interval.cpp

### 7-3、clock_gettime
```
#include <time.h>
int clock_gettime(clockid_t clk_id, struct timespec *tp);
struct timespec {
    time_t   tv_sec;        /* seconds */
    long     tv_nsec;       /* nanoseconds */
};
```
一般情况下 clk_id设置成CLOCK_REALTIME就足以应付了，这种情况最高精度是纳秒级 但实际情况中毫秒就足够了，tv_sec*1000+tv_nsec/1000000。
CLOCK_REALTIME和CLOCK_MONOTONIC的区别见 7-6、对CLOCK_MONOTONIC的理解。
代码见：D:\Github\Storage\c++\standard_library\time\time_interval.cpp

### 7-4、推荐使用
```
/**
* 获取当前时间
*
* @return 返回ms
*/
uint64_t get_current_time()
{
    struct timespec ts;
    clock_gettime(CLOCK_MONOTONIC, &ts);
    return (ts.tv_sec * (1000ULL) + ts.tv_nsec / (1000000ULL));
}

uint64_t last_time	=	get_current_time();
uint64_t now_time	=	get_current_time();
uint64_t diff_time	=	now_time - last_time;
```

### 7-5、Monolithic time单片时间
Monolithic：单片;单片电路;整体式;整体的;单片集成电路
monotonic：单调的；无变化的

有时间片这种说法，但是没有听说过单片时间。

时间片（timeslice）又称为“量子（quantum）”或“处理器片（processor slice）”是分时操作系统分配给每个正在运行的进程微观上的一段CPU时间（在抢占内核中是：从进程开始运行直到被抢占的时间）。现代操作系统（如：Windows、Linux、Mac OS X等）允许同时运行多个进程 —— 例如，你可以在打开音乐播放器听音乐的同时用浏览器浏览网页并下载文件。事实上，虽然一台计算机通常可能有多个CPU，但是同一个CPU永远不可能真正地同时运行多个任务。在只考虑一个CPU的情况下，这些进程“看起来像”同时运行的，实则是轮番穿插地运行，由于时间片通常很短（在Linux上为5ms－800ms），用户不会感觉到。

但是程序中却有相关：
```
struct timespec time_space;
clock_gettime(CLOCK_MONOTONIC, &time_space);
```

### 7-6、对CLOCK_MONOTONIC的理解
https://blog.csdn.net/qq_34489443/article/details/101010957

CLOCK_MONOTONIC在timerfd_create以及clock_gettime中都有使用，具体函数如下：
```
int timerfd_create(int clockid, int flags);
//创建timerfd描述符
//clockid可以填CLOCK_REALTIME，CLOCK_MONOTONIC
//flags可以填0，O_CLOEXEC，O_NONBLOCK

int clock_gettime(clockid_t clk_id, struct timespec *tp);
//得到当前的时间
//clk_id 设置时间的类型
 
//CLOCK_REALTIME:系统实时时间,随系统实时时间改变而改变,即从UTC1970-1-1 0:0:0开始计时,
                                   //中间时刻如果系统时间被用户改成其他,则对应的时间相应改变
//CLOCK_MONOTONIC:从系统启动这一刻起开始计时,不受 系统时间被用户改变 的影响
//CLOCK_PROCESS_CPUTIME_ID:本进程到当前代码系统CPU花费的时间
//CLOCK_THREAD_CPUTIME_ID:本线程到当前代码系统CPU花费的时间
```

demo程序见：D:\Github\Storage\c++\standard_library\time\CLOCK_MONOTONIC_example.cpp
```
[root@ubuntu0006:/media/hankin/vdb/study] #g++ CLOCK_MONOTONIC_example.cpp
[root@ubuntu0006:/media/hankin/vdb/study] #./a.out
1648089302
20220324 02:35:02.928545
3492966
19700210 10:16:06.665409
19700101 00:00:00.000000
[root@ubuntu0006:/media/hankin/vdb/study] #date
2022年 03月 24日 星期四 10:35:07 CST
[root@ubuntu0006:/media/hankin/vdb/study] #top
top - 10:36:55 up 40 days, 10:17,  5 users,  load average: 0.08, 0.31, 0.71
Tasks: 192 total,   1 running, 191 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.8 us,  4.2 sy,  0.0 ni, 92.9 id,  0.0 wa,  0.0 hi,  0.0 si,  0.2 st
KiB Mem :  8175056 total,   162152 free,   414992 used,  7597912 buff/cache
KiB Swap:  2095100 total,  2087052 free,     8048 used.  7300724 avail Mem
```
所以clock_gettime(CLOCK_MONOTONIC, &tv);就是开机到现在的时间，而gettimeofday则是从1970年开始，到现在的时间，但是这个时间是零时区的事件，也就是评论所说的格林尼治时间。

使用top命令可以看见我这台已经开机40天10:17小时了。跟CLOCK_MONOTONIC计算出来的基本一样。

注意：其实在timerfd这套函数中，CLOCK_MONOTONIC具体代表什么含义并不重要，因为在设置timerfd的到期时间时，使用的函数如下：

int timerfd_settime(int fd, 
                    int flags, 
                    const struct itimerspec *new_value, 
                    struct itimerspec *old_value);
其中flags填写1（TFD_TIMER_ABSTIME）代表绝对时间，0代表相对时间

如果timerfd_settime第二个参数设置为0,new_value.it_value设置为1
如果timerfd_settime第二个参数设置为TFD_TIMER_ABSTIME,new_value.it_value设置为now.tv_sec + 1。

并且timerfd_settime的当前时间可以使用函数clock_gettime来获取，填写的参数要和创建timerfd时的参数一样，也就是clk_id和clockid一样。

## 8、Linux 延时函数 sleep、usleep、nanosleep、select比较
demo见：D:\Github\Storage\c++\standard_library\time\time_sleep_example.cpp

- sleep的精度是秒
- usleep的精度是微妙，不精确
- nanosleep的精度是纳秒，不精确
- select 的精度是微妙，精确

注意：缺少毫秒ms，所以单位是1秒=1000 000微妙=1000 000 000纳秒

### 8-1、说明
usleep()有很大的问题：

- 在一些平台下不是线程安全，如HP-UX以及Linux
- usleep()会影响信号
- 在很多平台，如HP-UX以及某些Linux下，当参数的值必须小于1000，1000也就是1秒，否则该函数会报错，并且立即返回。


大部分平台的帮助文档已经明确说了，该函数是已经被舍弃的函数。还好，POSIX规范中有一个很好用的函数，nanosleep()，该函数没有usleep()的这些缺点，它的精度是纳秒级。在Solaris的多线程环境下编译器会自动把usleep()连接成nanosleep()。

使用nanosleep应注意判断返回值和错误代码，否则容易造成cpu占用率100%。

Linux下短延时推荐使用select函数，因为准确。

使用sleep（）和usleep（）的确可以达到效果，但是使用这类延时可能会导致系统产生未知问题，所以往往使用select函数，而且select的延时作用精度足够高.

几个注意事项：
1、tv_sec的初始化最好在tv_usec的前面
2、select的延时时间等于sec和usec时间之和
3、不知为啥，select的延时时间与设定值有1ms左右的误差
4、select每次运行之后，会将tv的值清零，所以如果要循环使用select，务必把tv.tv_usec的初始化放在循环中！
5、https://www.onitroad.com/jc/linux/man-pages/linux/man2/nanosleep.2.html，纳秒字段的值必须在0到999999999之间。

## 9、sleep() 函数，没想象种那么简单、(sleep 与 clock的碰撞使用)
https://blog.csdn.net/qq_38505858/article/details/124667116

### 9-1、线程sleep
那么我们看一下：线程sleep。
大家应该都对线程的五种状态有所了解，线程的五种状态包括：New、RUNNABLE、RUNNING、BLOCKED、DEAD。
那么一个线程在调用sleep()后，线程的状态就变成了阻塞态。

阻塞(BLOCKED)：阻塞状态是指线程因为某种原因放弃了cpu 使用权，也即让出了cpu timeslice，暂时停止运行。直到线程进入可运行(runnable)状态，才有机会再次获得cpu timeslice 转到运行(running)状态。阻塞的情况分三种：
(一). 等待阻塞：运行(running)的线程执行o.wait()方法，JVM会把该线程放入等待队列(waitting queue)中。
(二). 同步阻塞：运行(running)的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则JVM会把该线程放入锁池(lock pool)中。
(三). 其他阻塞：运行(running)的线程执行Thread.sleep(long ms)或t.join()方法，或者发出了I/O请求时，JVM会把该线程置为阻塞状态。当sleep()状态超时、join()等待线程终止或者超时、或者I/O处理完毕时，线程重新转入可运行(runnable)状态。

线程在阻塞态时放弃了CPU的使用权，让出了cpu timeslice,停止运行。

### 9-2、clock()函数
clock（)函数的返回值是获取CPU使用的时间。

基本上搞清楚了：clock()函数有以下描述：
clock returns the processor time used by program since the beginning of the execution, or -1 if unavailable.
即：clock()函数返回的是程序运行过程中耗掉得process time，也就是CPU time。
那么这样理解就通了，sleep函数将进程挂起，而clock函数是获取CPU执行过程种消耗掉的的时间，由于进行没有执行，所以不存在CPU Time的消耗。即sleep不是表面上那么简单。

### 9-3、测试
代码见：D:\Github\Storage\c++\standard_library\time\time_interval.cpp