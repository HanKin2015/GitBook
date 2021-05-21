# 代码覆盖率

找出无用多余的代码

## 安装
gcov：是随gcc一起发布的，并不需要独立安装；
lcov：其他博客说是随ltp发布的，结果下载下ltp之后编译了10多分钟，最后也没见lcov，最后到sourceforge下载了lcov单独的代码

```
#include<stdio.h>

int main(int argc,char* argv[])
{
    if(argc>1)
       printf("AAAA\n");
    else
       printf("BBB\n");
    return 0;
}
```

统计C/C++代码覆盖率的工具很多，比如OpenCppCoverage可以与VS工具配合，获取并展示代码覆盖率简单直观.

