struct timeval

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

