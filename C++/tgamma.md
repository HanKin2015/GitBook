# tgamma函数

## 1、文档查询
http://www.cplusplus.com/reference/cmath/tgamma/

C99: Header <tgmath.h> provides a type-generic macro version of this function.
C++11: Additional overloads are provided in this header (<cmath>) for the integral types: These overloads effectively cast x to a double before calculations (defined for T being any integral type).

给我整不会了。。。
```
/* tgamma example */
#include <stdio.h>      /* printf */
#include <math.h>       /* tgamma */
#include <tgmath.h>

int main ()
{
  double param, result;
  param = 0.5;
  result = tgamma (param);
  printf ("tgamma(%f) = %f\n", param, result );
  return 0;
}
```
使用gcc怎么都编译不过，使用g++就可以了，可能需要加上-std=c++11。

- 去掉头文件会报错
- 写了一个简单helloworld确实能使用gcc编译

## 2、简介
https://cloud.tencent.com/developer/section/1009525

计算arg的伽马函数。

类型通用宏：如果arg的类型为long double，则调用tgammal。 否则，如果arg具有整数类型或类型double，则调用tgamma。 否则，调用tgammaf。

```
#include <stdio.h>
#include <math.h>
#include <float.h>
#include <errno.h>
#include <fenv.h>
#pragma STDC FENV_ACCESS ON
int main(void)
{
    printf("tgamma(10) = %f, 9!=%f\n", tgamma(10), 2*3*4*5*6*7*8*9.0);
    printf("tgamma(0.5) = %f, sqrt(pi) = %f\n", sqrt(acos(-1)), tgamma(0.5));
    // special values
    printf("tgamma(+Inf) = %f\n", tgamma(INFINITY));
    //error handling
    errno = 0; feclearexcept(FE_ALL_EXCEPT);
    printf("tgamma(-1) = %f\n", tgamma(-1));
    if(errno == ERANGE) perror("    errno == ERANGE");
    else if(errno == EDOM)   perror("    errno == EDOM");
    if(fetestexcept(FE_DIVBYZERO)) puts("    FE_DIVBYZERO raised");
    else if(fetestexcept(FE_INVALID)) puts("    FE_INVALID raised");
}
```

需要数学知识，伽马函数。






