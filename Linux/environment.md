# environment环境变量

Windows下 path是exe文件的环境变量。
linux下   PATH也是脚本的环境变量。

但是，在linux下还有一种也称为环境变量，全局变量。
如使用env命令可查看。

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

## 2、环境变量必知的规则
- 环境变量遵循<NAME>=<VALUE>格式。
- 等号=两边没有空格
- 可以通过使用冒号分隔单个变量来指定多个值：``=::`
- 环境变量区分大小写。
- 习惯上，环境变量名称设置为大写。
- Shell 变量与环境变量不同。Shell 变量仅适用于当前 shell，不适用于任何子进程。

## 3、打印环境变量
[我偷偷学了这五个命令，打印Linux环境变量那叫一个“丝滑”](https://www.51cto.com/article/722093.html)
env 查看当前系统的环境变量
printenv是最常用的显示环境变量的命令，如果变量的名称作为参数提供给命令，则仅显示变量的值，printenv如果没有给出参数，则打印所有环境变量的列表，每行一个变量
declare命令显示的是已经声明的环境变量
set命令看字面像是设置变量的，不过它确实可以显示出系统的环境变量，注意set显示当前 shell 中所有 shell 变量的名称和值
echo命令后加$符号再加上变量也可以直接打印出环境变量

## 4、c语言操作linux系统环境变量
修改了/etc/environment文件后，并不是对所有用户生效，只对root用户生效，因为只有root用户修改
修改/etc/profile  
注意修改时不要直接LOG_LEVEL=123，记得需要export LOG_LEVEL=123
但是还是有问题，并不对terminal重启生效。
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

## 5、添加系统环境变量
1、Ubuntu专有方式
编辑 /etc/ld.so.conf 文件，如果以下语句不存在，则加入：
include /etc/ld.so.conf.d/*.conf
然后在/etc/ld.so.conf.d下边新建一个以 .conf 结尾的文件。
在新建的 .conf 文件中写入需要设置的 path，例如：
~/mypath/bin

2、用户目录下的 .bashrc 文件
在用户主目录下，有一个 .bashrc 文件，编辑该文件：
$gedit ~/.bashrc 
在最后边加入需要设置变量的shell语句，例如：
export PATH=~/mypath/bin:$PATH
该文件编辑保存后，可立即在新打开的终端窗口内生效。
该方式添加的变量只能当前用户使用。

3、系统目录下的 profile 文件
在系统的 etc 目录下，有一个 profile 文件，编辑该文件：
$gedit /etc/profile
在最后边加入需要设置变量的shell语句，例如：
export PATH=~/mypath/bin:$PATH
该文件编辑保存后，重启系统，变量生效。
该方式添加的变量对所有的用户都有效。

4、系统目录下的 environment 文件（这种方法也不错）
在系统的 etc 目录下，有一个 environment 文件，编辑该文件：
$gedit /etc/environment
找到以下的 PATH 变量：
PATH="<......>"
修改该 PATH 变量，在其中加入自己的path即可，例如：
PATH="~/mypath/bin:<......>"
各个path之间用冒号分割。该文件也是重启生效，影响所有用户。





