# 安全函数

## 1、拷贝函数
snprintf函数
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

### 长度准则
```
char *strncpy(char *dest, const char *src, size_t size) 的size为缓冲区长度-1，并且需要外部保证缓存区最后一位置0，对于字符数组，建议使用 sizeof(数组)-1 计算长度。注意size是dest的长度。

注意：windows下strncpy为不安全函数，需要使用strncpy_s代替！

int snprintf(char *str, size_t size, const char *format, ...) 的size为缓冲区长度，无需-1，snprintf会自动将最后一位置0，对于字符数组，建议使用 sizeof(数组) 计算长度

char * strncat(char *dest, const char *src, size_t n) 的n为缓冲区长度，无需-1，-1后会少拷贝内容
```

### 示例
```
const char *log_file_prefix = "/var/log/today/camera_";
char file_name[256];
memset(file_name, 0, sizeof(file_name));	// 为了末尾补充'\0'
strncpy(file_name, log_file_prefix, sizeof(file_name) - 1);

/*
 * 数型描述符数组转换为一个字符串,以空格间隔拼接
 * @param [in]desc_data  数型描述符数组
 * @param [in]desc_len   数组长度
 * @param [out]desc_str  描述符字符串
 * @param [in]str_len   字符串长度
 * @return true转换成功, false转换失败
 */
static bool desc_to_string(uint8_t *desc_data, uint16_t desc_len, char *desc_str, uint16_t str_len)
{
    assert(desc_data);
    assert(desc_str);

    if (desc_len * 3 > str_len) {
        lerror("[usb record] descriptor length is wrong");
        return false;
    }

    memset(desc_str, 0, str_len);
    char tmp[MAX_BUF_LEN];
    int i = 0;
    for (; i < desc_len; i++) {
        memset(tmp, 0, MAX_BUF_LEN);
        snprintf(tmp, MAX_BUF_LEN, "%02x", desc_data[i]);
        strncat(desc_str, tmp, 2);
        strncat(desc_str, " ", 1);
    }
    desc_str[strlen(desc_str) - 1] = '\0';    // 去掉末尾多余的空格
    return true;
}
```

## 2、字符串数值转换
### 不安全函数
itoa，推荐使用atoi，

