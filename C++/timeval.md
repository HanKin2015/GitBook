# 时间相关函数

## 概述
Unix时间戳(Unix timestamp)，或称Unix时间(Unix time)、POSIX时间(POSIX time)，是一种时间表示方式，定义为从格林威治时间1970年01月01日00时00分00秒起至现在的总秒数。Unix时间戳不仅被使用在Unix 系统、类Unix系统中，也在许多其他操作系统中被广告采用。

目前相当一部分操作系统使用32位二进制数字表示时间。此类系统的Unix时间戳最多可以使用到格林威治时间2038年01月19日03时14分07秒（二进制：01111111 11111111 11111111 11111111）。其后一秒，二进制数字会变为10000000 00000000 00000000 00000000，发生溢出错误，造成系统将时间误解为1901年12月13日20时45分52秒。这很可能会引起软件故障，甚至是系统瘫痪。使用64位二进制数字表示时间的系统（最多可以使用到格林威治时间292,277,026,596年12月04日15时30分08秒）则基本不会遇到这类溢出问题。


GPS 系统中有两种时间区分，一为UTC，另一为LT（地方时）两者的区别为时区不同，UTC就是0时区的时间，地方时为本地时间，如北京为早上八点（东八区），UTC时间就为零点，时间比北京时晚八小时，以此计算即可通过上面的了解，我们可以认为格林威治时间就是时间协调时间（GMT=UTC），格林威治时间和UTC时间均用秒数来计算的。

## 1、time_t结构体
time_t 这种类型就是用来存储从1970年到现在经过了多少秒，要想更精确一点，可以用结构struct timeval，它精确到微妙。
```

```

## 2、tm结构体
需要特别注意的是，年份是从1900年起至今多少年，而不是直接存储如2011年，月份从0开始的，0表示一月，星期也是从0开始的， 0表示星期日，1表示星期一。
```
struct tm
{
    int tm_sec;  /*秒，正常范围0-59， 但允许至61*/
    int tm_min;  /*分钟，0-59*/
    int tm_hour; /*小时， 0-23*/
    int tm_mday; /*日，即一个月中的第几天，1-31*/
    int tm_mon;  /*月， 从一月算起，0-11*/  1+p->tm_mon;
    int tm_year;  /*年， 从1900至今已经多少年*/  1900＋ p->tm_year;
    int tm_wday; /*星期，一周中的第几天， 从星期日算起，0-6*/
    int tm_yday; /*从今年1月1日到目前的天数，范围0-365*/
    int tm_isdst; /*日光节约时间的旗标*/
};
```

## 3、timeval结构体
```
struct timeval
{
    long tv_sec; /*秒*/
    long tv_usec; /*微秒*/
};
```


## 4、timespec结构体
```

```

## 5、下面介绍一下我们常用的时间函数
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


# linux时间间隔计算

## 1、time()

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

## 2、clock()

   #include <time.h>
   clock_t clock(void);

clock_t begin = clock()
usleep(10000);
clock_t end = clock();

 真正的时间间隔是它除以CLOCKS_PER_SEC来得出时间秒级
但是从图可知 在linux系统中其受cpu影响太多 对于时间间隔的计算并不准确
而且从官方的man手册可知 它推荐下面的函数计算时间间隔 

## 3、clock_gettime

 #include <time.h>
 int clock_gettime(clockid_t clk_id, struct timespec *tp);
  struct timespec {
               time_t   tv_sec;        /* seconds */
               long     tv_nsec;       /* nanoseconds */
           };

一般情况下 clk_id设置成CLOCK_REALTIME就足以应付了
这种情况最高精度是纳秒级 但实际情况中毫秒就足够了
tv_sec*1000+tv_nsec/1000000


## 推荐

```
struct timespec now, timestamp;
clock_gettime(CLOCK_MONOTONIC, &now);
timestamp = red_window->get_minimize_timestamp_value();
time_t interval = (now.tv_sec - timestamp.tv_sec) * MICRO_SECONDS + 
(now.tv_nsec - timestamp.tv_nsec) / ONE_SECONDS;    //毫秒级

```

