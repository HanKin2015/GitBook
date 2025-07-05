# shell学习笔记

## 1、shell 没有split函数，但是有split命令。

## 2、awk: line 2: function strtonum never defined
解决办法如下：
>sudo apt-get install gawk

```
#!/bin/bash

echo $0
mac_addr=`cat /sys/class/net/eth0/address`
echo $mac_addr
#mac_addr='fe:fc:fe:ff:ae:34'

awk 'BEGIN {print split('\"$mac_addr\"', a, ":")}'   #注意必须要双引号引起来
awk 'BEGIN {print split("1&2&3&4&5", arr, "&")}'
echo $a
echo ${arr[0]}

awk 'BEGIN {
    n=split('\"$mac_addr\"', a, ":");
    printf("%d\n", n);	#有点不同，不需要地址符&
    for (i = 1; i <= n; i++) {
        num = strtonum("0x"a[i]);
        printf("%s--->%d\n", a[i], num);   #必须要使用换行符\n才能输出值
    }
}'


echo [ 10**2 ]
echo `expr 10**2`

((a=5**3))	#目前只能想到这样求数值
echo $a
```

## 3、shell 中 [-eq] [-ne] [-gt] [-lt] [ge] [le]
这些运算符只适用于整数表达式，字符串表达式使用[ ${str} == "ds" ]。
```
-eq           //等于
-ne           //不等于
-gt            //大于 （greater ）
-lt            //小于  （less）
-ge            //大于等于
-le            //小于等于

命令的逻辑关系：
在linux 中 命令执行状态：0 为真，其他为假

还有一种写法如-a，表示 "和" 或 "并且"。这是在 shell 脚本中常用的逻辑运算符之一。需要注意的是，-a 在新版的 bash 中已经被废弃，建议使用 && 来代替。
```

## 4、判断文件中是否存在指定字符串
```
cat /proc/version | grep -o "3.2.4"
if [ $? -ne 0 ];then
	echo "not found"
else
	echo "found"
fi
```

## 5、readlink命令
读取一个软链接的值

## 6、使用awk

## 7、ll按时间排序
ll -rt
ll -

## 8、ubuntu下修改tab键为4个空格
ubuntu用vi编写python代码，按下tab键，默认的是八个空格，极不舒服
索性就修改一下，改成4个空格，方法很简单，在终端输入命令：

vim /etc/vim/vimrc

再打开的文件末尾添加如下内容：
```
set filetype=python
au BufNewFile,BufRead *.py,*.pyw setf python
set autoindent " same level indent
set smartindent " next level indent
set ts=4
set expandtab
set autoindent
set number

set tabstop=4表示Tab表示4个空格的宽度
set expandtab表示Tab自动转换成空格
set autoindent表示换行后自动缩进
set number 显示行号
```

## 9、条件判断之字符串判断（建议变量要加双引号）
${str1} == ${str2} #字符串是否相等
${str1} != ${str2} #字符串是否不相等
-z "${str}" #字符串长度是否为0 zero
-n "${str}" #字符串长度是否不为0   not zero
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #./test.sh
my name is jack in
my name is not jack in
./test.sh: 第 20 行: [: 参数太多
my name is not jack in
[root@ubuntu0006:/media/hankin/vdb/study/udev] #cat test.sh
#!/bin/bash

myname="jack in"

# 变量加双引号
if [ "$myname" == "jack in" ];then
    echo "my name is jack in"
else
    echo "my name is not jack in"
fi

# 变量加单引号
if [ '$myname' == "jack in" ];then
    echo "my name is jack in"
else
    echo "my name is not jack in"
fi

# 变量不加双引号
if [ $myname == "jack in" ];then
    echo "my name is jack in"
else
    echo "my name is not jack in"
fi
```

## 10、shell脚本参数解析之"$OPTARG"
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

## 11、linux c解析命令行选项getopt、optarg、optind、opterr、optopt

### getopts/getopt
处理命令行参数是一个相似而又复杂的事情，为此，c提供了getopt/getopt_long等函数，
c++的boost提供了options库，在shell中，处理此事的是getopts和getopt.
getopts和getopt功能相似但又不完全相同，其中getopt是独立的可执行文件，而getopts是由bash内置的。 

- getopts它不支持长选项。 
- 短选项参数-，长短项参数--。

## 12、Shell脚本中$X的含义
```
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
```

## 13、大小写转换
```
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
```

## 14、写脚本时的错误
- 中括号的前后需要有空格

## 15、在shell中如何判断一个变量是否为空，字符串是否为空
```
注意将变量用引号引起来。

#!/bin/sh  
para1=  
if [ ! -n "$para1" ]; then  
  echo "IS NULL"  
else  
  echo "NOT NULL"  
fi

if [ -z "$para1" ]; then  
  echo "IS NULL"  
else  
  echo "NOT NULL"  
fi
```

## 16、local

### 作用：一般用于shell内局部变量的定义，多使用在函数内部

关于局部变量和全局变量：
（1）shell 脚本中定义的变量是global的，作用域从被定义的地方开始，一直到shell结束或者被显示删除的地方为止。
（2）shell函数定义的变量也是global的，其作用域从 函数被调用执行变量的地方 开始，到shell或结束或者显示删除为止。函数定义的变量可以是local的，其作用域局限于函数内部。但是函数的参数是local的。
（3）如果局部变量和全局变量名字相同，那么在这个函数内部，会使用局部变量。

## 17、shell多行注释

### 17-1、最简单方法（这前面的冒号加不加都无所谓，另外推荐单词EOF）
```
:<<BLOCK
....注释内容
BLOCK
```
把输入重定义到前面的命令，但是 : 是空命令，所以就相当于注释了。
如果注释中有反引号的命令就会报错，反引号部分不会被注释掉，例如 var=`ls -l` 就不会被注释掉。

BLOCK 为 Here Documents 中的定义符号，名称任意，只要前后匹配就行。

### 17-2、: 指令
: 就是什么也不做（do nothing）即空命令，一般用在 if...then... 条件中，用作什么也不做的命令，如：
```
if [ -d $DIRECTORY ]; then
  :
else
  echo 'the directory do not exit !'
fi
```

### 17-3、Here Documents 的用法
```
cmd<<WORD
any input
file content
WORD
```
意思是将以上的定义符WORD传给某脚本或命令。
WORD的内容为两个WORD间输入任意内容，这样就可以在脚本中用 cmd 来执行输入而不必再重建一文件。

Here Documents 常用在菜单屏幕中，例如：
```
cat <<Menu
1.List
2.Help
3.Exit
Menu
```

## 18、set命令
详情见：https://www.ruanyifeng.com/blog/2017/11/bash-set.html
示例见：D:\Github\Storage\shell\set-e

set -u就用来改变这种行为。脚本在头部加上它，遇到不存在的变量就会报错，并停止执行。
set -x用来在运行结果之前，先输出执行的那一行命令。
set -e从根本上解决了这个问题，它使得脚本只要发生错误，就终止执行。（有一个例外情况，就是不适用于管道命令）
set -o pipefail用来解决这种情况，只要一个子命令失败，整个管道命令就失败，脚本就会终止执行。

set命令的上面这四个参数，一般都放在一起使用。
### 写法一
set -euxo pipefail

### 写法二
set -eux
set -o pipefail

这两种写法建议放在所有 Bash 脚本的头部。

另一种办法是在执行 Bash 脚本的时候，从命令行传入这些参数。
```
$ bash -euxo pipefail script.sh
```

