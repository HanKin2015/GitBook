# 自动生成gitbook目录

随便生成产生时间：
```
#include <sys/types.h>
#include <sys/time.h>
static char * get_abstime_us_str(void)
{
    static char abstime_str[128] = {0};
    struct timeval tv;
    gettimeofday(&tv, NULL);
    // 秒 毫秒 微妙
    snprintf(abstime_str, sizeof(abstime_str) - 1, "%17llu = %10llu %3llu %3llu",
        (long long unsigned int)tv.tv_sec * 1000000LL + (tv.tv_usec),
        (long long unsigned int)tv.tv_sec,
        (long long unsigned int)tv.tv_usec/1000,
        (long long unsigned int)tv.tv_usec%1000);
    return abstime_str;
}
```