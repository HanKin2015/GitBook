# 1、Linux expr命令

expr命令是一个手工命令行计数器，用于在UNIX/LINUX下求表达式变量的值，一般用于整数值，也可用于字符串。

## 实例
1、计算字串长度
> expr length “this is a test”
 14
 
2、抓取字串

> expr substr “this is a test” 3 5
is is

3、抓取第一个字符数字串出现的位置

> expr index "sarasara"  a
 2
 
4、整数运算

 > expr 14 % 9
 5
 > expr 10 + 10
 20
 > expr 1000 + 900
 1900
 > expr 30 / 3 / 2
 5
 > expr 30 \* 3 (使用乘号时，必须用反斜线屏蔽其特定含义。因为shell可能会误解显示星号的意义)
 90
 > expr 30 * 3
 expr: Syntax error

# 2、Linux exec命令
https://blog.csdn.net/qq_31186123/article/details/82190776

shell 中的 exec 两种用法：
1.exec 命令 ;命令代替shell程序，命令退出，shell 退出；比如 exec ls
2.exec 文件重定向，可以将文件的重定向就看为是shell程序的文件重定向 比如 exec 5</dev/null;exec 5<&-

写一个脚本
      1.设定变量file的值为/etc/passwd
      2.使用循环读取文件/etc/passwd的第2,4,6,10,13,15行，并显示其内容
      3.把这些行保存至/tmp/mypasswd文件中#!/bin/bash
```
file="/etc/passwd"
for I in 2 4 6 10 13 15;do
exec 3>/tmp/mypasswd
line=`head -$I $file | tail -1`
echo "$line"
echo "$line" >&3
exec 3>&-
done
```


shell 中的 exec 两种用法：

1.exec 命令 ;命令代替shell程序，命令退出，shell 退出；比如 exec ls

2.exec 文件重定向，可以将文件的重定向就看为是shell程序的文件重定向 比如 exec 5</dev/null;exec 5<&-

=============================

shell的内建命令exec将并不启动新的shell，而是用要被执行命令替换当前的shell进程，并且将老进程的环境清理掉，而且exec命令后的其它命令将不再执行。 
因此，如果你在一个shell里面，执行exec ls那么，当列出了当前目录后，这个shell就自己退出了，因为这个shell进程已被替换为仅仅执行ls命令的一个进程，执行结束自然也就退出了。为了避免这个影响我们的使用，一般将exec命令放到一个shell脚本里面，用主脚本调用这个脚本，调用点处可以用bash a.sh，（a.sh就是存放该命令的脚本），这样会为a.sh建立一个sub shell去执行，当执行到exec后，该子脚本进程就被替换成了相应的exec的命令。 
source命令或者"."，不会为脚本新建shell，而只是将脚本包含的命令在当前shell执行。 
不过，要注意一个例外，当exec命令来对文件描述符操作的时候，就不会替换shell，而且操作完成后，还会继续执行接下来的命令。 
    exec 3<&0:这个命令就是将操作符3也指向标准输入。 


另外,这个命令还可以作为find命令的一个选项,如下所示: 
(1)在当前目录下(包含子目录)，查找所有txt文件并找出含有字符串"bin"的行 
find ./ -name "*.txt" -exec grep "bin" {} \; 
(2)在当前目录下(包含子目录)，删除所有txt文件 
find ./ -name "*.txt" -exec rm {} \; 




先总结一个表：


exec命令                  作用
 
exec ls          在shell中执行ls，ls结束后不返回原来的shell中了
 
exec <file       将file中的内容作为exec的标准输入
 
exec >file       将file中的内容作为标准写出
 
exec 3<file      将file读入到fd3中
 
sort <&3         fd3中读入的内容被分类
 
exec 4>file      将写入fd4中的内容写入file中
 
ls >&4           Ls将不会有显示，直接写入fd4中了，即上面的file中
 
exec 5<&4         创建fd4的拷贝fd5
 
exec 3<&-         关闭fd3