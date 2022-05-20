# Linux expr和exec命令

## 1、expr命令
expr命令是一个手工命令行计数器，用于在UNIX/LINUX下求表达式变量的值，一般用于整数值，也可用于字符串。
```
1、计算字串长度
> expr length “this is a test”
14
 
2、抓取字串
> expr substr “this is a test” 3 5
is is

3、抓取第一个字符数字串出现的位置
> expr index "sarasara"  a
2

4、整数运算(运算符前后需要增加空格)
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
```

### 1-1、shell计算中使用除法，基本默认上都是整除。
比如：
```
num1=2
num2=3
num3=`expr $num1 / $num2`
echo $num3
```
这个时候num3=0 ,是因为是因为expr不支持浮点除法。

解决的方法：
```
num3=`echo "scale=2; $num1/$num2" | bc`
echo $num3
> .67
```
使用bc工具，scale控制小数点后保留几位。
还有一种方法:
```
awk 'BEGIN{printf "%.2f\n",'$num1'/'$num2'}'
> 0.67
```
如果用百分比表示:
```
awk 'BEGIN{printf "%.2f%\n",('$num1'/'$num2')*100}'
> 66.67%
```

### 1-2、expr和echo的区别
```
[root@ubuntu0006:/] #echo "scale=2; $num1/$num2" | bc
.66
[root@ubuntu0006:/] #expr "scale=2; $num1/$num2" | bc
.66
```

## 2、Linux exec命令
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

## 3、Linux下的计算器(bc、expr、dc、echo、awk)知多少？

### 3-1、bc
bc在默认的情况下是个交互式的指令。在bc工作环境下，可以使用以下计算符号：
+ 加法 
- 减法 
* 乘法 
/ 除法 
^ 指数 
% 余数

#### 3-1-1、解决命令行不支持浮点数除法
echo "scale=2; 5/4" | bc

#### 3-1-2、实用Linux命令行 —— 进制的转换
终端输入bc命令，进入bc模式，quit退出

ibase		# 查看当前输入值的进制
obase		# 查看当前输出值的进制
ibase=10	# 设置输入值的进制为十进制
obase=16	# 设置输出值的进制为十六进制

```
[root@ubuntu0006:/] #bc
bc 1.06.95
Copyright 1991-1994, 1997, 1998, 2000, 2004, 2006 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'.
1+2
3
1 + 2
3
3-4
-1
5*4
20
5/2
2
5%2
1
10^3
1000
1+2;4-2;(3+4)*4
3
2
28
1/3
0
scale=3
1/3
.333
```

以上是交互的计算，那到也可以不进行交互而直接计算出结果。
A.用echo和|法，如：
# echo "(6+3)*2" |bc
18
# echo 15/4 |bc
3
# echo "scale=2;15/4" |bc
3.75
# echo "3+4;5*2;5^2;18/4" |bc
7
10
25
4
 
另外，bc除了scale来设定小数位之外，还有ibase和obase来其它进制的运算。
如：
//将16进制的A7输出为10进制, 注意，英文只能大写
# echo "ibase=16;A7" |bc
167
//将2进制的11111111转成10进制
# echo "ibase=2;11111111" |bc
255
//输入为16进制，输出为2进制
# echo "ibase=16;obase=2;B5-A4" |bc
10001
 
对于bc还有补充，在bc --help中还可以发现：bc后可以接文件名。如：
# more calc.txt 
3+2
4+5
8*2
10/4
# bc calc.txt 
5
9
16
2

### 3-2、expr
expr命令可不光能计算加减乘除哦，还有很多表达式，都可以计算出结果，不过有一点需要注意，在计算加减乘除时，不要忘了使用空格和转义。

### 3-3、dc
用dc来进行计算的人可以不多，因为dc与bc相比要复杂，但是在进行简单的计划时，是差不多的，不算难。dc为压栈操作，默认也是交互的，但也可以用echo和|来配合打算。
```
[root@ubuntu0006:/] #dc
3
4+
p
7
5*4
p
4
p
4
p
4
3*
p
12
```

### 3-4、echo
echo用来进行回显，是周知的事。上面也配合bc来进行计算。其实echo也可以单独进行简单的计算，如：
# echo $((3+5))
8
# echo $(((3+5)*2))
16

### 3-5、AWK
awk在处理文件的时，可以进行运算，那当然也可以单单用来计算了，如：
# awk 'BEGIN{a=3+2;print a}'
5
# awk 'BEGIN{a=(3+2)*2;print a}'
10











