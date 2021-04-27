# 学习和了解core文件

## 1、什么是coredump
我们经常听到大家说到程序core掉了，需要定位解决，这里说的大部分是指对应程序由于各种异常或者bug导致在运行过程中异常退出或者中止，并且在满足一定条件下（这里为什么说需要满足一定的条件呢？下面会分析）会产生一个叫做core的文件。

通常情况下，core文件会包含了程序运行时的内存，寄存器状态，堆栈指针，内存管理信息还有各种函数调用堆栈信息等，我们可以理解为是程序工作当前状态存储生成第一个文件，许多的程序出错的时候都会产生一个core文件，通过工具分析这个文件，我们可以定位到程序异常退出的时候对应的堆栈调用等信息，找出问题所在并进行及时解决。

## 2、coredump文件的存储位置
core文件默认的存储位置与对应的可执行程序在同一目录下，文件名是core，大家可以通过下面的命令看到core文件的存在位置： cat  /proc/sys/kernel/core_pattern

我在系统中输出就一个单词core。。。。。，这时候默认就是生成在本地，最终生成的文件就是core命名的文件
通过修改文件内容，可以指定生成位置及文件名。
```
echo "/tmp/coredump/" > /proc/sys/kernel/core_pattern	    错误，无法生成core文件
echo "/tmp/coredump/core" > /proc/sys/kernel/core_pattern   正确，必须要写文件名字

```


注意：这里是指在进程当前工作目录的下创建。通常与程序在相同的路径下。但如果程序中调用了chdir函数，则有可能改变了当前工作目录。这时core文件创建在chdir指定的路径下。有好多程序崩溃了，我们却找不到core文件放在什么位置。和chdir函数就有关系。当然程序崩溃了不一定都产生core文件。

在一个程序崩溃时，它一般会在指定目录下生成一个 core 文件,core 文件仅仅是一个内存映象 ( 同时加上调试信息 ) ，主要是用来调试的。

## 3、Linux生成core文件
默认可能是关闭生成core文件的，使用：
```
echo "ulimit -c 1024" >> /etc/profile
或者直接执行ulimit -c 1024

ulimit -c  查看是否返回1024，如果是0则关闭
ulimit -c 0 关闭生成core文件
ulimit -c unlimited  文件无限制大小
ulimit -a  查看选项是否打开

unlimit运行之后显示unlimited，但是unlimit -c显示0
只能说很误导人，以ulimit -c为主，会输出0和unlimited情况。
```

## 4、segfault错误




## 5、gdb调试core文件
```
gdb 二进制文件 core文件
bt
f 编号
print 变量名
分析代码
```

## 6、上手项目
```
#include <stdio.h>;
#include <stdlib.h>;
 
int crash()
{
	char *xxx = "crash!!";
	xxx[1] = 'D'; // 写只读存储区!
	return 2;
}

int foo()
{
	return crash();
}

int main()
{
	return foo();
}
```

## 7、GDB 常用操作
有一点需要注意，需要带上参数-g, 这样生成的可执行程序中会带上足够的调试信息。

上边的程序比较简单，不需要另外的操作就能直接找到问题所在。现实却不是这样的，常常需要进行单步跟踪，设置断点之类的操作才能顺利定位问题。下边列出了GDB一些常用的操作。

启动程序：run
设置断点：b 行号|函数名
删除断点：delete 断点编号
禁用断点：disable 断点编号
启用断点：enable 断点编号
单步跟踪：next 也可以简写 n
单步跟踪：step 也可以简写 s
打印变量：print 变量名字
设置变量：set var=value
查看变量类型：ptype var
顺序执行到结束：cont
顺序执行到某一行： util lineno
打印堆栈信息：bt

## 8、个性化配置core文件路径
内核在coredump时所产生的core文件放在与该程序相同的目录中，并且文件名固定为core。很显然，如果有多个程序产生core文件，或者同一个程序多次崩溃，就会重复覆盖同一个core文件，因此我们有必要对不同程序生成的core文件进行分别命名。















