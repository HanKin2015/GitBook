# C语言strchr()函数：查找某字符在字符串中首次出现的位置
头文件：#include <string.h>

strchr() 用来查找某字符在字符串中首次出现的位置，其原型为：
    char * strchr (const char *str, int c);

【参数】str 为要查找的字符串，c 为要查找的字符。

strchr() 将会找出 str 字符串中第一次出现的字符 c 的地址，然后将该地址返回。

注意：字符串 str 的结束标志 NUL 也会被纳入检索范围，所以 str 的组后一个字符也可以被定位。

【返回值】如果找到指定的字符则返回该字符所在地址，否则返回 NULL。

返回的地址是字符串在内存中随机分配的地址再加上你所搜索的字符在字符串位置。设字符在字符串中首次出现的位置为 i，那么返回的地址可以理解为 str + i。

提示：如果希望查找某字符在字符串中最后一次出现的位置，可以使用 strrchr() 函数。

【实例】查找字符5首次出现的位置。
纯文本复制
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int main(){
    char *s = "0123456789012345678901234567890";
    char *p;
    p = strchr(s, '5');
    printf("%ld\n", s);
    printf("%ld\n", p);
    system("pause");
    return 0;
}