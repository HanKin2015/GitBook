# vprintf函数


## 1、输出函数
printf：写入标准输出
fprintf：写入指定的流
dprintf：写入指定的文件描述符
sprintf：存入指定的数组buf内，会自动在结尾追加null字节。此外，因为sprintf可能会溢出，所以调用者要确保buf的尺寸
snprintf：相对于sprintf明确指定了尺寸，防止溢出问题。

vprintf、vfprintf、vsprintf、vsnprintf：相对于参数的（…）替换成了va_list ap。

## 2、作用
重写输出函数printf。
vprintf对应printf。
vfprintf对应fprintf。

```
#include<stdio.h>
//#include<stdlib.h>
#include<stdarg.h>//ANSI C可变参数的头文件

int print(char* format, ...) {
    va_list ap;
    int n;
    va_start(ap, format);
    n = vprintf(format, ap);
    va_end(ap);
    return 0;
}

int error(char *fmt, ...)
{
    int result;
    va_list args;
    va_start(args, fmt);
    fputs("Error: ", stderr);
    result = vfprintf(stderr, fmt, args);
    va_end(args);
    return result;
}

int info(char *fmt, ...)
{
    int result;
    va_list args;
    va_start(args, fmt);
    FILE *fp = fopen("log.txt", "a");
    fputs("Error: ", fp);
    result = vfprintf(fp, fmt, args);
    fclose(fp);
    va_end(args);
    return result;
}

int main() {
    int ch1 = 10, ch2 = 20;
    print("%d\t%d\n", ch1, ch2);
    error("%d\t%d\n", ch1, ch2);
    info("%d\t%d\n", ch1, ch2);
    return 0;
}
```


