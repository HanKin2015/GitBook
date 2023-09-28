# shell学习笔记

# shell笔记之20201216

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

 vim /etc/vim/vimrc

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

set tabstop=4表示Tab表示4个空格的宽带 
set expandtab 表示Tab自动转换成空格 
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

# 7、local

# 作用：一般用于shell内局部变量的定义，多使用在函数内部

关于局部变量和全局变量：
（1）shell 脚本中定义的变量是global的，作用域从被定义的地方开始，一直到shell结束或者被显示删除的地方为止。
（2）shell函数定义的变量也是global的，其作用域从 函数被调用执行变量的地方 开始，到shell或结束或者显示删除为止。函数定义的变量可以是local的，其作用域局限于函数内部。但是函数的参数是local的。
（3）如果局部变量和全局变量名字相同，那么在这个函数内部，会使用局部变量。

# 8、shell多行注释
1、最简单方法
```
:<<BLOCK
....注释内容
BLOCK
```

把输入重定义到前面的命令，但是 : 是空命令，所以就相当于注释了。
如果注释中有反引号的命令就会报错，反引号部分不会被注释掉，例如 var=`ls -l` 就不会被注释掉。

2、解决注释中有反引号的问题

A、方法一



复制代码代码如下:


:<<BLOCK'
....注释内容
'BLOCK



B、方法二
```
:<<'BLOCK
....注释内容
BLOCK'
```


C、方法三



复制代码代码如下:


:<<'
....注释内容
'



BLOCK 为 Here Documents 中的定义符号，名称任意，只要前后匹配就行。

3、: 指令和 Here Documents
: 就是什么也不做（do nothing）即空命令，一般用在 if...then... 条件中，用作什么也不做的命令，如：



复制代码代码如下:


if [ -d $DIRECTORY ]; then
  :
else
  echo 'the directory do not exit !'
fi



下面的例子：



复制代码代码如下:


cmd<<WORD
any input
file content
WORD



是 Here Documents 的用法，意思是将以上的定义符WORD传给某脚本或命令。
WORD的内容为两个WORD间输入任意内容，这样就可以在脚本中用 cmd 来执行输入而不必再重建一文件。

Here Documents 常用在菜单屏幕中，例如：



复制代码代码如下:


cat <<Menu
1.List
2.Help
3.Exit
Menu



至于



复制代码代码如下:


:<<WORD
....注释内容
WORD



就类似于建一本地文件，然后对它执行空命令，什么也不做，亦即是相当于注释了。

补充：

代码如下：



复制代码代码如下:


for ((i=0; i<10; i++))
do
:<<_a_  
  if [ ]; then
    ...
  fi
_a_
  echo ""
done



上面的 :<<_a_ 和 _a_ 代表段注释，可以把中间的代码注释掉
 
_a_ 为 Here Documents 中的定义符号，名称任意，只要前后匹配就行
 
： 为空命令，相当于什么都不做（do nothing）即空命令，一般用在 if...then... 条件中，用作什么也不做的命令，如：



复制代码代码如下:


if [ -d $DIRECTORY ]; then
  :
else
  echo 'the directory do not exit !'
fi


 如果注释中有反引号的命令就会报错，反引号部分不会被注释掉，例如 var=`ls -l` 就不会被注释掉。   解决注释中有反引号的问题



复制代码代码如下:


:<<_a_'
....注释内容
'_a_



单行的就不说了,井号#可以搞定.下面说多行的.

一. 通过Here Documents实现:

1)
:<<EOF
注释的代码...
EOF
冒号:表示什么都不做.
说明: 这种方法当注释代码里出现变量引用或者是反引号时,bash会去尝试解析他们,会提示错误信息. 解决方法有下面几种:

1.

复制代码代码如下:


:<<\EOF
注释的代码...
EOF



2.

复制代码代码如下:


:<<'EOF'
注释的代码...
EOF


3.
复制代码代码如下:
:<<'EOF
注释的代码...
EOF'


4.
复制代码代码如下:
:<<EOF'
注释的代码...
'EOF

5.
复制代码代码如下:
:<<'
注释的代码...
'


# 7、其他
set -x与set +x指令用于脚本调试
set是把它下面的命令打印到屏幕
set -x 开启 
set +x关闭
set -o 查看

set命令的-e参数，linux自带的说明如下：
"Exit immediately if a simple command exits with a non-zero status."
也就是说，在"set -e"之后出现的代码，一旦出现了返回值非零，整个脚本就会立即退出。有的人喜欢使用这个参数，是出于保证代码安全性的考虑。但有的时候，这种美好的初衷，也会导致严重的问题。

真实案例：
脚本a.sh开头使用了"set -e"，且能正常运行。在几个月或更久以后，因需求升级，在脚本中增加了3行hadoop操作：
```
#!/bin/bash
set -e
...
/home/work/.../hadoop dfs -rmr /app/.../dir
/home/work/.../hadoop dfs -mkdir /app/.../dir
/home/work/.../hadoop dfs -put file_1 /app/.../dir/
...
```
这几行hadoop命令逻辑很简单：在hdfs上清除并新建一个目录，并将一份本地文件推送至这个目录，供后续使用。将这几行单拎出来，在命令行下执行，除了提示待删除的目录不存在，并没有什么问题，文件还是会被推送到指定的地方。

但第一次执行这个脚本的时候，却失败退出了，且导致调用该脚本的程序整体退出，造成了严重的后果。原因是hdfs上还没有这个目录，rmr这一行会返回255，这个值被脚本前方的"set -e"捕捉到，直接导致了脚本退出。

新增的代码本身并没有问题，先删除再新建目录，反而是保证数据安全的比较规范的操作，删除命令本身的容错性，可以保证后续命令正常执行。事实是这个脚本有好几百行，且逻辑比较复杂，在增加这几行代码的时候，开发人员已经不记得这个脚本里还有个"set -e"埋伏着了。

可见设置"set -e"，在脚本开发过程中可能很有帮助，而在开发完成后，特别是对于后期可能有升级的脚本，则可能是埋下了安全隐患。




