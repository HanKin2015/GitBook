```
#include <iostream>
#include <stdio.h>
using namespace std;

static union {
    int i;
    char c;
}endian={1};



const char test = 'k';
#if (test == 'k')
#define YES
#else
#define NO
#endif

int main()
{
#ifdef YES
    cout << "YES" << endl;
#endif

#ifdef NO
    cout << "NO" << endl;
#endif

    if (test == 'k') {
        cout << "HEJIAN" << endl;
    }


    cout << "c = " << endian.c << endl;
    printf("%d\n", endian.c);
    if (endian.c == 1) {
        cout << "little endian" << endl;
    }

    const char c = 65; //A
    cout << c << endl;
    printf("%c\n", c);

    endian.i = 66;
    cout << endian.c << endl;
    return 0;
}
```

![img](https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7e8d5d655fda81cb4ee684cb6a5db72b/e850352ac65c103880a07b53bc119313b17e8941.jpg)

 ASCII第一次以规范标准的类型发表是在1967年，最后一次更新则是在1986年，到目前为止共定义了128个字符  。 