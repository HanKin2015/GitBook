# 判断相等的返回值

==返回值为1，而使用函数则是0，如strcmp或者strncmp函数。

为什么字符串数组不用用==""来判断？
它是对象，不同对象的内存地址都是不同的，因此不相等。
https://www.zhihu.com/question/266725009


```
#include <iostream>
#include <string.h>
#include <cstring>
using namespace std;

int main()
{
    const char a[] = "12345", b[] = "12345";
    cout << "a=" << a << ",b=" << b << endl;
    if (a == b) {
        cout << "yes" << endl;
    } else {
        cout << "no" << endl;
    }
    int ret = (a == b);
    cout << ret << endl;
    ret = strncmp(a, b, 5);
    cout << ret << endl;
    ret = (string(a) == string(b));
    cout << ret << endl;
    return 0;
}
```