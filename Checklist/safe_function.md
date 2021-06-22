# 安全函数

## 1、snprintf
```
[root@ubuntu0006:/media/hankin/vdb] #cat safe_function.cpp
#include <stdio.h>
#include <string.h>

int main()
{
    char buffer[50];
    char* s = "runoobcom";

    // 读取字符串并存储在 buffer 中
    int j = snprintf(buffer, 6, "%s", s);

    // 输出 buffer及字符数
    printf("string: %s\ncharacter count = %d\n", buffer, j);

    printf("%lu %lu\n", sizeof(buffer), strlen(buffer));
    memset(buffer, 0, sizeof(buffer));
    int i = snprintf(buffer, 50, "%s", s);
    printf("string: %s\ncharacter count = %d\n", buffer, i);

    char str[5] = {0};
    snprintf(str, 5, "%s", s);
    printf("%s\n", str);

    printf("%lu\n", strlen(s));
    char c[9] = {0};
    snprintf(c, strlen(s), "%s", s);
    printf("%s\n", c);
    return 0;
}
[root@ubuntu0006:/media/hankin/vdb] #g++ safe_function.cpp -Wno-write-strings -fsanitize=address
[root@ubuntu0006:/media/hankin/vdb] #./a.out
string: runoo
character count = 9
50 5
string: runoobcom
character count = 9
runo
9
runoobco
```

*char *strncpy(char *dest, const char *src, size_t size) 的size为缓冲区长度-1，并且需要外部保证缓存区最后一位置0，对于字符数组，建议使用 sizeof(数组)-1 计算长度*
|     *注意：windows下strncpy为不安全函数，需要使用strncpy_s代替！*
|     *int snprintf(char *str, size_t size, const char *format, ...) 的size为缓冲区长度，无需-1，snprintf会自动将最后一位置0，对于字符数组，建议使用 sizeof(数组) 计算长度*

