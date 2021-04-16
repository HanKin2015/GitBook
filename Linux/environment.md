# environment环境变量
Windows下path是exe文件的环境变量
linux下PATH也是脚本的环境变量

但是，在linux下还有一种也称为环境变量，全局变量
如使用env命令可查看

## 1、为什么修改LD_LIBRARY_PATH呢
因为运行时动态库的搜索路径的先后顺序是：
1.编译目标代码时指定的动态库搜索路径；
2.环境变量LD_LIBRARY_PATH指定的动态库搜索路径；
3.配置文件/etc/ld.so.conf中指定的动态库搜索路径；
4.默认的动态库搜索路径/lib和/usr/lib；

这个顺序是compile gcc时写在程序内的，通常软件源代码自带的动态库不会太多，而我们的/lib和/usr/lib只有root权限才可以修改，而且配置文件/etc/ld.so.conf也是root的事情，我们只好对LD_LIBRARY_PATH进行操作啦。

永久性添加
每次我使用该软件都需要临时修改库文件，因为上面的方法是临时设置环境变量 LD_LIBRARY_PATH ，重启或打开新的 Shell 之后，一切设置将不复存在。

为了让这种方法更完美一些，可以将该 LD_LIBRARY_PATH 的 export 语句写到系统文件中，例如 /etc/profile、/etc/export、~/.bashrc 或者 ~/.bash_profile 等等，取决于你正在使用的操作系统咯。

linux下修改的所有文件如果要立即生效，请使用命令：source .

## 2、env命令
env 查看当前系统的环境变量
修改了/etc/environment文件后，并不是对所有用户生效，只对root用户生效，因为只有root用户修改
修改/etc/profile  
注意修改时不要直接LOG_LEVEL=123，记得需要export LOG_LEVEL=123
但是还是有问题，并不对terminal重启生效。



C++调用C
func(func, n)???


```
/* study_env.cpp
 *
 * 学习getenv/putenv/setenv/unsetenv函数
 *
 * 头文件：#include <stdlib.h>
 * getenv()用来取得参数name环境变量的内容
 * putenv用来改变或者增加环境变量的内容
 * setenv用来改变或者增加环境变量
 * unset删除name环境变量的定义，即使不存在也不会出错
 *
 * author: hankin
 * time  : 2021.04.15
 *
 * Copyright (c) 2021 HanKin. All rights reserved.
 */

#include <stdio.h>
#include <stdlib.h>

int main()
{
    char *log_level_str;
    int g_debug_level = 0;

    log_level_str = getenv("LOG_LEVEL");
    if (log_level_str) {
        printf("There is $LOG_LEVEL value\n");
        g_debug_level = atoi(log_level_str);
    }
    printf("current OS $LOG_LEVEL = %d\n", g_debug_level);

    //getenv函数
    char *user = getenv("USER");
    printf("current OS $USER = %s\n", user);

    //putenv函数
    putenv((char*)"USER=test");
    user = getenv("USER");
    printf("current OS $USER = %s\n", user);

    //setenv函数
    setenv("USER", "true", true);
    user = getenv("USER");
    printf("current OS $USER = %s\n", user);
    setenv("USER", "false", false);
    user = getenv("USER");
    printf("current OS $USER = %s\n", user);


    //unsetenv函数
    unsetenv("USER");
    user = getenv("USER");
    printf("current OS $USER = %s\n", user);
    return 0;
}
```







