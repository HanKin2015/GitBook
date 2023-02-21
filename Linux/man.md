# man命令

## 1、简介
大家都知道在Unix/Linux中有个man命令，可以查询常用的命令，函数。可是对于我们这样只知道用"man 函数名"来查询的人来说，会遇到很多问题，比如：
man read，我想看的是ANSI C中stdio的read函数原型和说明，没想到出来的确是BASH命令的说明，这是怎么回事呢？

原来read本身是man命令的一个参数，这样输入man就会以为你要使用read的功能，而不是查看read函数，那么要怎样查看read函数呢?

答案是使用：    man 2 read 或者是man 3 read
中间的数字是什么意思呢？是man的分卷号，原来man分成很多部分，分别是：
 
```
1 用户命令， 可由任何人启动的。
2 系统调用， 即由内核提供的函数。
3 例程， 即库函数，比如标准C库libc。
4 设备， 即/dev目录下的特殊文件。
5 文件格式描述， 例如/etc/passwd。
6 游戏， 不用解释啦！
7 杂项， 例如宏命令包、惯例等。
8 系统管理员工具， 只能由root启动。
9 其他（Linux特定的）， 用来存放内核例行程序的文档。
n 新文档， 可能要移到更适合的领域。
o 老文档， 可能会在一段期限内保留。
l 本地文档， 与本特定系统有关的。
```
 
要查属于哪一部分的，就用哪一部分的编号在命令之前。

## 2、在线手册
https://www.shouce.ren/api/view/a/8862
http://linux.51yip.com/
https://www.linuxcool.com/ls
https://www.debian.org/doc/manuals/debian-reference/index.zh-cn.html
https://manpages.ubuntu.com/manpages/impish/zh_CN/
https://man7.org/linux/man-pages/man3/shm_open.3.html









