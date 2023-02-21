# 代码覆盖率

找出无用多余的代码。

## 1、安装
gcov：是随gcc一起发布的，并不需要独立安装；
lcov：其他博客说是随ltp发布的，结果下载下ltp之后编译了10多分钟，最后也没见lcov，最后到sourceforge下载了lcov单独的代码。

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

统计C/C++代码覆盖率的工具很多，比如OpenCppCoverage可以与VS工具配合，获取并展示代码覆盖率简单直观。

使用gcov生成单个文件覆盖率，并去除内核头文件信息

gcov -bnrs /buildroot  xxx

-r, --relative-only             Only show data for relative sources

-s, --source-prefix DIR         Source prefix to elide

rs一起使用，指定只取以xxx路径开头的文件信息



lcov genhtml生成html报告

/usr/bin/lcov --capture --directory . --ignore-errors gcov,source,graph --output-file all.info

/usr/bin/lcov --remove all.info '/usr/include/*' '/usr/lib/*' -o result.info

genhtml result.info -p "/buildroot/" --output-directory coverage_report

-p, --prefix PREFIX               Remove PREFIX from all directory names

-p 去掉指定的路径前缀


## 2、覆盖率
覆盖率是度量测试完整性的一个手段，是测试有效性的一个度量。通过已执行代码表示，用于可靠性、稳定性以及性能的评测。
测试覆盖是对测试完全程度的评测。测试覆盖是由测试需求和测试用例的覆盖或已执行代码的覆盖表示的。建立在对测试结果的评估和对测试过程中确定的变更请求（缺陷）的分析的基础上。

测试覆盖是对测试完全程度的评测。测试覆盖是由测试需求和测试用例的覆盖或已执行代码的覆盖表示的。
质量是对测试对象（系统或测试的应用程序）的可靠性、稳定性以及性能的评测。质量建立在对测试结果的评估和对测试过程中确定的变更请求（缺陷）的分析的基础上。






















