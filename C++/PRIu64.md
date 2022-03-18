# 认识PRIu64

## 1、PRIu64
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
        printf("uint64: %"PRIu64, u64);
        // printf("uint64: %lu\n", u64);   x86_64
        // printf("uint64: %llu\n", u64);  x86
        return 0;
}
```
除了PRIu64外，inttypes.h还定义了其它数据类型对应的宏。另外，如果是c++程序，需要定义__STDC_FORMAT_MACROS宏。

## 2、printf()
https://baike.baidu.com/item/printf%28%29/402521?fr=aladdin

规定符
%d 十进制有符号整数
%u 十进制无符号整数
%f 浮点数
%s 字符串
%c 单个字符
%p 指针的值
%e 指数形式的浮点数
%x, %X 无符号以十六进制表示的整数
%o 无符号以八进制表示的整数
%g 把输出的值按照%e或者%f类型中输出长度较小的方式输出
%p 输出地址符
%lu 32位无符号整数
%llu 64位无符号整数

(1).可以在“%”和字母之间插进数字表示最大场宽。
(2).可以在“%”和字母之间加小写字母l，表示输出的是长型数。
(3).可以控制输出左对齐或右对齐，即在"%"和字母之间加入一个"-"号可说明输出为左对齐, 否则为右对齐。

主要是注意%u和%lu的区别。

## 3、PRIu64和llu的区别
 其中以 int32_ t 为例其代表一个有符号的整数，在标准库stdint.h中，宏PRId32和PRIu64在inttypes.h中，其内部包括与整数有关的宏，详情请查看下方连接

intyypes.h: https://pubs.opengroup.org/onlinepubs/009695399/basedefs/inttypes.h.html

  当编译为64位程序时，宏 PRId32 展示形成字符串 “d” 宏PRIu64展示形成字符串 “lu”。

  因此示例中printf的调用就转化为

printf("x = %d, y = %lu\n", x, y);
  因此使用宏能保证：无论代码是如何被编译的，都能生成正确的格式字符串。


```
#include <inttypes.h>  
printf("%" PRId64 "\n", value);  
```
这是一种跨平台的书写方式，主要是为了同时支持32位和64位操作系统。PRId64表示64位整数，在32位系统中表示long long int，在64位系统中表示long int。相当于：
```
printf("%" "ld" "\n", value);  //64bit OS
printf("%" "lld" "\n", value);  //32bit OS
```
或者
```
printf("%ld", value); // 64bit OS  
printf("%lld", value); // 32bit OS
```