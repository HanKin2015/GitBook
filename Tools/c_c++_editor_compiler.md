[TOC]

# 1、c-free5
## 1-1、安装
官网：http://www.programarts.com/cfree_ch/
下载有点慢，但是不大还好。
需要配合mingw使用编译。
安装教程（含注册码）：https://blog.csdn.net/a1585570507/article/details/79477732
```
用户名：tianfang
电子邮件：quart@163.com
注册码：2NnUqd3shO2agta0xNjcusfK1LXO
```



## 1-2、配置
字体大小：工具-》编辑器选项


## 1-3、argc argv
ARGc和ARGv中的ARG指的是"参数"（外语：ARGuments, argument counter 和 argument vector ）

```
#include <stdio.h>//#包含<stdio.h>
 
int main(int argc,char* argv[])    //整数类型主函数(整数类型统计参数个数,字符类型指针数组指向字符串参数)
{
    printf("%d\n",argc);           //格式化输出
    while(argc)                    //当(统计参数个数)
        printf("%s\n",argv[--argc]);   //格式化输出
    return 0;                      //返回0;正常退出
}
```

## 1-4、字体选择
个人比较喜欢Consolas字体

c-free配置c++11，呵呵，配置了半天没有配置成功。提示语法错误，-std=c++11。

# 2、dev-cpp
让Dev C++支持C++11](https://blog.csdn.net/u011500062/article/details/44628441)



# 3、codeblocks
https://www.fosshub.com/Code-Blocks.html?dwl=codeblocks-20.03-setup.exe



C语言初学者，在电脑性能足够的情况下，VS2017，codeblocks，devcpp如何选择？
这三个都不是编译器。所以没法在这三个之内选择出编译器。
性能如果不是问题，那首选VS2017。codeblocks的debug能力有所不足。devcpp早已停止正式维护。


# 4、gcc编译器
c++支持foreach语句在c++11，所以必须要有高版本的编译器。

官方地址（太卡）：https://jmeubank.github.io/tdm-gcc/

两大坑点：
安装TDM-GCC，下载了exe安装包后一开始老是在下载，并且网络超级差。然后找了半天安装包都是同一款。
再然后发现在下载的时候取消后，会有下一步，并且建议把勾选的去掉，可以直接安装的。

另外一个当属：

第三个坑点：当你安装好后软件，发现编译运行不弹出运行窗口或者编译按钮是灰色的。这时候你就要想到是不是换了编译器或编辑器引起的。删除编译的结果.exe和.a和.o文件即可。






