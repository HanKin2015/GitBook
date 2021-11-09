# 正则表达式 
正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、regexp或RE），计算机科学的一个概念。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。
许多程序设计语言都支持利用正则表达式进行字符串操作。例如，在Perl中就内建了一个功能强大的正则表达式引擎。正则表达式这个概念最初是由Unix中的工具软件（例如sed和grep）普及开的。正则表达式通常缩写成“regex”，单数有regexp、regex，复数有regexps、regexes、regexen。

正则表达式（Regular Expression）通常被用来检索、替换那些符合某个模式(规则)的文本。目前多种程序开发语言均支持常规的正则表达式。作为一名系统、运维工程师，正则表达在日常工作中也比较常用。因此，掌握常用的正则表达式显得十分重要。

在目前的Linux系统中，通常搭配三剑客（grep、sed、awk）来使用。目前，正则表达式主要分为三类：基本正则表达式（Basic Regular Expression 又叫Basic RegEx 简称BREs）、扩展正则表达式（Extended Regular Expression 又叫Extended RegEx 简称EREs）、Perl的正则表达式（Perl Regular Expression 又叫Perl RegEx 简称PREs）。
通配符是由shell处理的, 它只会出现在 命令的“参数”里。当shell在“参数”中遇到了通配符时，shell会将其当作路径或文件名去在磁盘上搜寻可能的匹配：若符合要求的匹配存在，则进行代换(路径扩展)；否则就将该通配符作为一个普通字符传递给“命令”，然后再由命令进行处理。总之，通配符 实际上就是一种shell实现的路径扩展功能。在 通配符被处理后, shell会先完成该命令的重组，然后再继续处理重组后的命令，直至执行该命令。平时工作中我们对linux下的通配符和正则表达式模糊不清。

## 1、管道命令

中间的|是管道命令 是指ps命令与grep同时执行

grep全称是Global Regular Expression Print，表示全局正则表达式输出，它的使用权限是所有用户。

## 2、Perl正则表达式
发现prename和rename命令是同一个？？

C版本：rename 原字符串 新字符串 文件名
Perl版本：支持正则表达式
Ubuntu默认是Perl版本
CentOS默认是C版本，Perl版本是 prename命令，需安装


三种形式
匹配：m/<regexp>/  (可以省略m，直接写成/regexp/)
替换：s/<pattern>/<replacement>/
转化：tr/<pattern>/<replacement>/

## 3、正则表达式
```
## 用于处理大量字符串而定义，grep、sed、awk都支持正则表达式。
基础正则：
    字符匹配：
        .：任意单个字符
        *：任意长度/次数的字符
        []：指定范围内的任意单个字符
        [^]: 指定范围外的任意单个字符
    元字符：
        [[:upper:]]:任意大写字母
        [[:lower:]]:任意小写字母
        [[:digit:]]:任意一个数字
        [[:alpha:]]:任意大小写字母
        [[:punct:]]:标点符号
        [[:space:]]:一个空格
        [[:alnum:]]：任意一个字母或数字
    行锚定：
        ^：行首
        $：行尾
        ^$：空行
        ^[[:space:]]$：空白行
扩展正则：
	次数匹配：
		|：扩展正则，用于多个字符匹配
        \+：匹配前面的字符1-任意次
        \?：匹配前面的字符0-1次
        \{n,m\}：匹配前面的字符最少n次，最多m次
        \{,m\}：0-m次
        \{n,\}：最少n次
        \{n\}：匹配n个（次）
	边界符：
        \<：匹配字符串从此开始
        \>：匹配字符串到此结束
        \b或\bString\b：匹配字符串 
        \<PATTERN\>：匹配包含整个单词/字符串的行
    分组匹配（sed常用）：
        \(First\) A \(Second\) \1或者\2
        \(xy\(ab\)\) \1或者\2：1是匹配xy 2是匹配ab
		[root@mod-200 ~]#echo "I wanna you"|sed -r 's/(.*)/\1 Shit/g'
		I wanna you Shit
转义特殊字符（非正则）：
		\\：匹配\
		\s：空格
		\n：回车
		\^,\$,\.：匹配^ $ .
```

## 4、通配符
```
一般用来匹配文件名的。
匹配文件名：
    *：代表任意字符
    ?：代表任意单个字符
    [ ]：匹配指定范围内的任意单个字符
其他通配符：
    ;：两个命令之间的分隔符
    #：在配置文件里，注释效果
    |：管道
    $：变量前需要加的符号
    /：路径分隔符，也是根
    >或1>：输出重定向，覆盖原有数据
    >>：追加输出重定向，追加在文件内容的尾部
    <：输入重定向（xargs，tr）
    <<：追加输入重定向（cat）
    ' '：单引号，不具备变量置换功能，引号内所见即所得
    " "：双引号，具备变量置换功能，解析变量后输出，不加引号相当于双引号
    ` `：反引号，两个``中间为命令，会先执行，等价$()
    { }：中间为命令去块组合或内容系列
    ! ：逻辑运算中的“非”（not）
    &&：and并且，当前一个指令执行成功时，执行后一个指令
    ||：or或者，当前一个指令执行失败时，执行后一个指令
    ..：代表上级目录
    . ：代表当前目录
    ~：当前用户的家目录
    -：上一次的所在目录
```

## 5、通配符教程
```
touch file[1-3].txt		错误
touch file{1,2,3}.txt	正确
ll file[1-3].txt		正确
ll file{1,3}.txt		正确
```

http://www.ruanyifeng.com/blog/2018/09/bash-wildcards.html

wildcards

通配符又叫做 globbing patterns。因为 Unix 早期有一个/etc/glob文件保存通配符模板，后来 Bash 内置了这个功能，但是这个名字被保留了下来。
通配符早于正则表达式出现，可以看作是原始的正则表达式。它的功能没有正则那么强大灵活，但是胜在简单和方便。

### 5-1、?
```
[root@ubuntu0006:/media/hankin/vdb/study] #ll ????.txt
-rw-r--r-- 1 root root     29 10月 22 17:44 data.txt
-rw-r--r-- 1 root root 145796 11月  4 09:33 xhci.txt
[root@ubuntu0006:/media/hankin/vdb/study] #ll ???.txt
ls: 无法访问'???.txt': 没有那个文件或目录
```

### 5-2、*
### 5-3、[...]
```
[root@ubuntu0006:/media/hankin/vdb/study] #ll file[1234567].txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file1.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file2.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file3.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file5.txt
[root@ubuntu0006:/media/hankin/vdb/study] #ll file[1-7].txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file1.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file2.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file3.txt
-rw-r--r-- 1 root root 0 11月  3 10:55 file5.txt
[root@ubuntu0006:/media/hankin/vdb/study] #ll fil[e1-7].txt
ls: 无法访问'fil[e1-7].txt': 没有那个文件或目录
[root@ubuntu0006:/media/hankin/vdb/study] #ll fil[e127].txt
```

### 5-4、[^...] 和 [!...]
### 5-5、{...}
发现并没有括号中随机组合的方式。

{...}与[...]有一个很重要的区别。如果匹配的文件不存在，[...]会失去模式的功能，变成一个单纯的字符串，而{...}依然可以展开。

```
[root@ubuntu0006:/media/hankin/vdb/study] #echo {cat,d*}
cat data.txt driver
```

### 5-6、{start..end} 模式
{start..end}会匹配连续范围的字符。
```
$ echo d{a..d}g
dag dbg dcg ddg

$ echo {11..15}
11 12 13 14 15

[root@ubuntu0006:/media/sangfor/vdb/study] #echo {11..15}
11 12 13 14 15
[root@ubuntu0006:/media/sangfor/vdb/study] #echo {11.15}
{11.15}
[root@ubuntu0006:/media/sangfor/vdb/study] #echo {11...15}
{11...15}
[root@ubuntu0006:/media/sangfor/vdb/study] #echo {11....15}
{11....15}
```
注意一定是两个句号。

### 5-7、注意点
（1）通配符是先解释，再执行。
（2）通配符不匹配，会原样输出。
（3）只适用于单层路径。
（4）可用于文件名。

## 6、正则表达式教程
https://www.linuxprobe.com/linux-regular-expression.html

正则表达式是一种字符模式，用于在查找过程中匹配指定的字符。
元字符通常在Linux中分为两类：Shell元字符，由Linux Shell进行解析；
正则表达式元字符，由vi/grep/sed/awk等文本处理工具进行解析；
正则表达式一般以文本行进行处理，在进行下面实例之前，先为grep命令设置--color参数：
> class="">$ alias grep='grep --color=auto'

这样每次过滤出来的字符串都会带色彩了。

在开始之前还需要做一件事情，就是创建一个测试用的两个文件，内容如下：
```re-file
I had a lovely time on our little picnic.
Lovers were all around us. It is springtime. Oh
love, how much I adore you. Do you know
the extent of my love? Oh, by the way, I think
I lost my gloves somewhere out in that field of
clover. Did you see them?  I can only hope love.
is forever. I live for you. It's hard to get back in the
groove.
```
```linux.txt
Linux is a good 
god assdxw bcvnbvbjk
greatttttt  wexcvxc
operaaaating  dhfghfvx
gooodfs awrerdxxhkl
gdsystem awxxxx
glad
good
```

### 6-1、














