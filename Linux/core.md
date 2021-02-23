# 学习和了解core文件
在一个程序崩溃时，它一般会在指定目录下生成一个 core 文件,一般在/tmp目录下。 core 文件仅仅是一个内存映象 ( 同时加上调试信息 ) ，主要是用来调试的。

文件位置配置：在/etc目录中的sysctl.conf文件中最后添加如下内容：
kernel.core_pattern=xxxxxxx

## 1、Linux生成core文件、core文件路径设置
默认可能是关闭生成core文件的，使用：
```
echo "ulimit -c 1024" >> /etc/profile
或者直接执行ulimit -c 1024

ulimit -c  查看是否返回1024，如果是0则关闭
ulimit -c 0 关闭生成core文件
ulimit -c unlimited  文件无限制大小
ulimit -a  查看选项是否打开
```

## 2、segfault错误




## 3、gdb调试core文件
```
gdb 二进制文件 core文件
bt
f 编号
print 变量名
分析代码
```

## 4、上手项目
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

## 5、GDB 常用操作
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

