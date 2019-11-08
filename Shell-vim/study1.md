[TOC]

# 1、"$OPTARG"

[linux shell命令行选项与参数用法详解](https://www.jb51.net/article/48691.htm)

问题描述：在linux shell中如何处理tail -n 10 access.log这样的命令行选项？
在bash中，可以用以下三种方式来处理命令行参数，每种方式都有自己的应用场景。
1，直接处理，依次对$1,$2,...,$n进行解析，分别手工处理；
2，getopts来处理，单个字符选项的情况（如：-n 10 -f file.txt等选项）；
3，getopt，可以处理单个字符选项，也可以处理长选项long-option（如：--prefix=/home等）。
总结：小脚本手工处理即可，getopts能处理绝大多数的情况，getopt较复杂、功能也更强大。
1，直接手工处理位置参数
必须要要知道几个变量，

```
$0 ：即命令本身，相当于c/c++中的argv[0]
$1 ：第一个参数.
$2, $3, $4 ... ：第2、3、4个参数，依次类推。
$#  参数的个数，不包括命令本身
$@ ：参数本身的列表，也不包括命令本身
$* ：和$@相同，但"$*" 和 "$@"(加引号)并不同，"$*"将所有的参数解释成一个字符串，而"$@"是一个参数数组。
```

处理命令行参数是一个相似而又复杂的事情，为此，c提供了getopt/getopt_long等函数，c++的boost提供了options库，在shell中，处理此事的是getopts和getopt。
getopts/getopt的区别，getopt是个外部binary文件，而getopts是shell builtin。

```
[root@jbxue ~]$ type getopt
getopt is /usr/bin/getopt
[root@jbxue ~]$ type getopts
getopts is a shell builtin
```

getopts不能直接处理长的选项（如：--prefix=/home等）
关于getopts的使用方法，可以man bash  搜索getopts
getopts有两个参数，第一个参数是一个字符串，包括字符和“：”，每一个字符都是一个有效的选项，如果字符后面带有“：”，表示这个字符有自己的参数。getopts从命令中获取这些参数，并且删去了“-”，并将其赋值在第二个参数中，如果带有自己参数，这个参数赋值在“optarg”中。提供getopts的shell内置了optarg这个变变，getopts修改了这个变量。
这里变量$optarg存储相应选项的参数，而$optind总是存储原始$*中下一个要处理的元素位置。
while getopts ":a:bc" opt  #第一个冒号表示忽略错误；字符后面的冒号表示该选项必须有自己的参数
例子，(getopts.sh)：

```
echo $*
while getopts ":a:bc" opt
do
        case $opt in
                a ) echo $optarg
                    echo $optind;;
                b ) echo "b $optind";;
                c ) echo "c $optind";;
                ? ) echo "error"
                    exit 1;;
        esac
done
echo $optind
shift $(($optind - 1))
#通过shift $(($optind - 1))的处理，$*中就只保留了除去选项内容的参数，可以在其后进行正常的shell编程处理了。
echo $0
echo $*
```

# 2、linux c解析命令行选项getopt、optarg、optind、opterr、optopt

## getopts/getopt

 处理命令行参数是一个相似而又复杂的事情，为此，c提供了getopt/getopt_long等函数，
c++的boost提供了options库，在shell中，处理此事的是getopts和getopt.
getopts和getopt功能相似但又不完全相同，其中getopt是独立的可执行文件，而getopts是由bash内置的。 



- getopts它不支持长选项。 

- 短选项参数-，长短项参数--。

# 3、Shell脚本中$X的含义

$$
Shell本身的PID（ProcessID）
$!
Shell最后运行的后台Process的PID
$?
最后运行的命令的结束代码（返回值）
$-
使用Set命令设定的Flag一览
$*
所有参数列表。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。
$@
所有参数列表。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。
$#
添加到Shell的参数个数
$0
Shell本身的文件名
$1～$n
添加到Shell的各参数值。$1是第1参数、$2是第2参数…。



- lsusb
- 

# 4、大小写转换

 m="abc"
echo $m # 输出为abc
declare -u m
echo $m # 输出为abc,
m="cde"
echo $m # 输出为CDE
declare -l m="HELL"
echo $m # 输出为hell 



echo 'hello' | tr 'a-z' 'A-Z'

echo 'HELLO' | tr 'A-Z' 'a-z'