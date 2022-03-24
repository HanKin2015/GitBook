# 时间相关函数

## 1、Unix时间戳
Unix时间戳(Unix timestamp)，或称Unix时间(Unix time)、POSIX时间(POSIX time)，是一种时间表示方式，定义为从格林威治时间1970年01月01日00时00分00秒起至现在的总秒数。Unix时间戳不仅被使用在Unix 系统、类Unix系统中，也在许多其他操作系统中被广告采用。

目前相当一部分操作系统使用32位二进制数字表示时间。此类系统的Unix时间戳最多可以使用到格林威治时间2038年01月19日03时14分07秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制数字会变为10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为1901年12月13日20时45分52秒。这很可能会引起软件故障，甚至是系统瘫痪。使用64位二进制数字表示时间的系统（最多可以使用到格林威治时间292,277,026,596年12月04日15时30分08秒）则基本不会遇到这类溢出问题。


GPS 系统中有两种时间区分，一为UTC，另一为LT（地方时）两者的区别为时区不同，UTC就是0时区的时间，地方时为本地时间，如北京为早上八点（东八区），UTC时间就为零点，时间比北京时晚八小时，以此计算即可通过上面的了解，我们可以认为格林威治时间就是时间协调时间（GMT=UTC），格林威治时间和UTC时间均用秒数来计算的。

## 2、time_t结构体
time_t 这种类型就是用来存储从1970年到现在经过了多少秒，要想更精确一点，可以用结构struct timeval，它精确到微妙。
```

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
```

## 4、timeval结构体
```
struct timeval
{
    long tv_sec; /*秒*/
    long tv_usec; /*微秒*/
};
```


## 5、timespec结构体
```

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

## 8、time()

   #include <time.h>
   time_t time(time_t *t);

主要的用法是两种
time_t begin = time(NULL)
或者
time_t end;
time(&end)
返回当前时间到 Epoch, 1970-01-01 00:00:00 +0000 (UTC)的秒数
错误时返回-1
精度：秒级

## 9、clock()
```
#include <time.h>
clock_t clock(void);

clock_t begin = clock()
usleep(10000);
clock_t end = clock();
```
 真正的时间间隔是它除以CLOCKS_PER_SEC来得出时间秒级
但是从图可知 在linux系统中其受cpu影响太多 对于时间间隔的计算并不准确
而且从官方的man手册可知 它推荐下面的函数计算时间间隔 

## 10、clock_gettime
```
#include <time.h>
int clock_gettime(clockid_t clk_id, struct timespec *tp);
struct timespec {
    time_t   tv_sec;        /* seconds */
    long     tv_nsec;       /* nanoseconds */
};
```
一般情况下 clk_id设置成CLOCK_REALTIME就足以应付了
这种情况最高精度是纳秒级 但实际情况中毫秒就足够了
tv_sec*1000+tv_nsec/1000000


## 10、推荐
```
struct timespec now, timestamp;
clock_gettime(CLOCK_MONOTONIC, &now);
timestamp = red_window->get_minimize_timestamp_value();
time_t interval = (now.tv_sec - timestamp.tv_sec) * MICRO_SECONDS + 
(now.tv_nsec - timestamp.tv_nsec) / ONE_SECONDS;    //毫秒级
```

```
#include <time.h>
#include <stdio.h>
#include <stdint.h>
#include <limits.h>

int main()
{
    //struct tm tm_obj = {0, 0, 8, 1, 1-1, 1970-1900};
    struct tm tm_obj = {0, 0, 7, 14, 4, 2021-1900};
    //1970年之前计算出来的是负值
    //注意不要使用lu，虽然减的是1900，但是计算的却是从1970开始的
	//date [-u] -d "20210414 7:00:00" +%s可能时区不同，可加参数-u
    printf("from 1970.01.01 total seconds: %ld\n", mktime(&tm_obj));
    printf("%d %d %d %d %d %d %d %d %d %ld %s\n", tm_obj.tm_sec,
        tm_obj.tm_min, tm_obj.tm_hour, tm_obj.tm_mday,
        tm_obj.tm_mon, tm_obj.tm_year, tm_obj.tm_wday,
        tm_obj.tm_yday, tm_obj.tm_isdst, tm_obj.tm_gmtoff,
        tm_obj.tm_zone);
    printf("%ld\n", LONG_MAX);
    return 0;
}
```

## 11、Monolithic time单片时间
Monolithic：单片;单片电路;整体式;整体的;单片集成电路
monotonic：单调的；无变化的

有时间片这种说法，但是没有听说过单片时间。

时间片（timeslice）又称为“量子（quantum）”或“处理器片（processor slice）”是分时操作系统分配给每个正在运行的进程微观上的一段CPU时间（在抢占内核中是：从进程开始运行直到被抢占的时间）。现代操作系统（如：Windows、Linux、Mac OS X等）允许同时运行多个进程 —— 例如，你可以在打开音乐播放器听音乐的同时用浏览器浏览网页并下载文件。事实上，虽然一台计算机通常可能有多个CPU，但是同一个CPU永远不可能真正地同时运行多个任务。在只考虑一个CPU的情况下，这些进程“看起来像”同时运行的，实则是轮番穿插地运行，由于时间片通常很短（在Linux上为5ms－800ms），用户不会感觉到。

但是程序中却有相关：
```
struct timespec time_space;
clock_gettime(CLOCK_MONOTONIC, &time_space);
```

### 11-1、对CLOCK_MONOTONIC的理解
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
//CLOCK_MONOTONIC:从系统启动这一刻起开始计时,不受系统时间被用户改变的影响
//CLOCK_PROCESS_CPUTIME_ID:本进程到当前代码系统CPU花费的时间
//CLOCK_THREAD_CPUTIME_ID:本线程到当前代码系统CPU花费的时间
```

demo程序见：D:\Github\Storage\c++\standard_library\time\study_time2.cpp
```
[root@ubuntu0006:/media/hankin/vdb/study] #g++ study_time2.cpp
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










