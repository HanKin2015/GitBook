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