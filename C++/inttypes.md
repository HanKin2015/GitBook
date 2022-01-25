# inttypes

## 1、32/64位平台printf uint64的方法
在32位平台 typedef unsigned long long int  uint64_t;
在64位平台 typedef unsigned long int   uint64_t;
不同的typdef，要求在printf中使用不同的length modifier，uint64_t 在32位使用ll，在64位使用l。除了定义数据类型，C99还定义了相应数据类型的打印方式，使用PRIu64打印uint64，举例如下：
 
```
#include <stdio.h>
#include <inttypes.h>

int main(int argc, char *argv[])
{
    uint64_t u64 = 100;
    printf("uint64: %"PRIu64"\n", u64);
    // printf("uint64: %lu\n", u64);   x86_64
    // printf("uint64: %llu\n", u64);  x86
    return 0;
}
```
 

在inttypes.h 定义了: #define PRIu64 "llu"
除了PRIu64外，inttypes.h还定义了其它数据类型对应的宏。另外，如果是c++程序，需要定义__STDC_FORMAT_MACROS宏。
 
## 2、int ,long , long long,int32_t,int64_t 类型表示范围

unsigned   int/unsigned int32_t     0~4294967295   
int/int32_t     -2147483648~2147483647 
unsigned long 0~4294967295
long   -2147483648～2147483647
long long/int64_t  -9223372036854775808~9223372036854775807
unsigned long long/unsigned int64_t   0~18446744073709551615







