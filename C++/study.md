# 每天一点一滴进步
just do it
奥利给

## 20191128

- stringstream
- 字符串转整型
  - atoi
  - strtoul
  - strtoul(value, 0, 16);    颜色实际上就是十六进制
  
  
## 20200305
- sprintf格式化字符串
- switch中case如果不加break语句，则后面的case都一定会执行，不再依据case条件。case仅仅是提供起点，对switch关键字起作用。

  
# sys/time.h 和 time.h
https://blog.csdn.net/kkknd007/article/details/80762666

time.h 是 ISO C99 标准日期时间头文件。
sys/time.h 是 Linux系统 的日期时间头文件。
sys/time.h 通常会包含 #include <time.h> 。
编写的代码如果与平台无关的，则需要在代码里 #include <time.h>，但这样使用 time_t 等数据结构的话需要手动
#define __need_time_t
#define __need_timespec
通常如果代码可以是平台相关的，则只需要 #include <sys/time.h> 。

CentOS 7中，time.h 主要包含了time_t、clock_t、struct tm等一些时间相关的类型定义。

sys/time.h 中虽然包含了 #include <time.h>，但是通过 #define __need_time_t 控制了只使用 time.h 中的 time_t 结构定义。

也就是说，如果单独包含了 sys/time.h，是可以使用 time_t 的，但是不能使用 struct tm 和将 tm 作为参数的时间操作函数，比如strftime()等。

到底是包含 time.h 还是 sys/time.h，还是应该依据代码中使用的数据结构和函数来决定。

# strtok   &    strchr
const char * strchr ( const char * str, int character );
      char * strchr (       char * str, int character );
	  
char *strchr(const char *s, int c) 
功能： 查找字符串s中首次出现c字符的位置

说明： 返回首次出现c的位置的指针，返回的地址是被查找的字符串指针开始的第一个与c相同字符的指针，若s中不存在c则返回NULL。。。。

返回值： 成功返回要查找的字符第一次出现的位置，否则返回NULL。。。。

 

char *strrchr(const char *s, int c)

功能： 查找一个字符c在一个字符串s中最后一次出现的位置（也就是从s的右侧开始查找字符c首次出现的位置），并返回从字符串中的字符c所在的位置开始直到字符串s结束的所有字符。 若没有找到字符c，则返回NULL。

```
#include <iostream>
#include <cstring>
using namespace std;

void fun(const char *str)
{
    cout << "str = " << str << endl;
    cout << *str << endl;
    str++;
    cout << *str << endl;
    return;
}

int main()
{
    fun("abc");

    //strchr
    int i = 'a';
    cout << i << endl;

    char ip[] = "199.200.250.20";
    char *ret = NULL;
    ret = strtok(ip, ".");
    while (ret != NULL) {
        cout << ret << endl;
        ret = strtok(NULL, ".");
    }
    return 0;
}
```

# struct赋值
```
#include <iostream>
#include <cstdio>
using namespace std;

struct st_node {
    int x;
    int y;
};

int main()
{
    //st_node a(1, 2);  错误
    st_node a;
    a.x = 5;
    a.y = 8;
    printf("(%d, %d)\n", a.x, a.y);

    st_node b = {
        .x = 2,
        .y = 5
    };
    printf("(%d, %d)\n", b.x, b.y);

    st_node c = {1, 3};
    printf("(%d, %d)\n", c.x, c.y);
    return 0;
}
```













  