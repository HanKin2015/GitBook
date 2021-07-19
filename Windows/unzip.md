# 解压zip压缩包

## 1、使用system函数调用exe软件解压
使用7z.exe软件
```
// 利用7z程序解压缩文件到temp文件夹
string cmd = ".\\tools\\7zx64.exe x -y " + DATA_FILE_PATH + " -o" + TEMP_DIR;
system(cmd.c_str());
```
## 2、使用7z的SDK
教程：https://blog.csdn.net/sz76211822/article/details/78350947

官方最新版下载地址：http://www.7-zip.org/sdk.html
SDK文件名：lzma2102.7z

编译：
- 打开VS2019的Developer Command Prompt
- 进入这个目录D:\Github\Storage\windows\lzma2102\CPP\7zip\Bundles\Format7zR\
- 使用命令nmake（如果出现/OPT:NOWIN98 链接错误 输入nmake NEW_COMPILER=1 MY_STATIC_LINK=1 重新编译即可）
- 在o目录可以找到7zra.dll文件UI/

然后发现使用的时候好像挺复杂的，打开CPP/7zip/UI/Client7z/client7z.cpp文件发现有太多的头文件，并且网上教程比较少，放弃。

### NMake
Microsoft Program Maintenance Utility，外号NMAKE，顾名思义，是用来管理程序的工具。其实说白了，就是一个解释程序。

它处理一种叫做makefile的文件（以mak为后缀），解释里面的语句并执行相应的指令。我们编写makefile文件，按照规定的语法描述文件之间的依赖关系，以及与该依赖关系相关联的一系列操作。然后在调用NMAKE时，它会检查所有相关的文件，如果目标文件（target file，下文简称target，即依赖于其它文件的文件）的time stamp（就是文件最后一次被修改的时间，一个32位数，表示距离1970年以来经过的时间，以2秒为单位）小于依赖文件（dependent file，下文简称dependent，即被依赖的文件）的时间标识（time stamp），NMAKE就执行与该依赖关系相关联的操作。

https://zhuanlan.zhihu.com/p/111110992

## 3、使用广泛认可的zlib库
无详细教程，自研。
官网下载地址：http://www.zlib.net/


### 无法打开 源 文件 "zconf.h"	StudySTL	D:\Github\Storage\windows\StudySTL\zlib.h	34	
因此头文件zconf.h也是必备的。

### LNK2001 无法解析的外部符号 _uncompress
百度了一半天，无果。
_CRT_SECURE_NO_WARNINGS
忽然之间








