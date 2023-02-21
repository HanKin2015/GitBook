# awk命令

## 1、简介
AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。
之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符。

## 2、参数
-F：指定输入文件折分隔符，fs是一个字符串或者是一个正则表达式
-v：赋值一个用户定义变量。
-f：从脚本文件中读取awk命令。

awk不能直接操作变量或者字符串，可以是文件或者通过管道。


## 3、输出指定路径的目录文件夹
```
#!/bin/bash

# 方法一 
dir=$(ls -l /usr/ |awk '/^d/ {print $NF}')
for i in $dir
do
    echo $i
done

echo

# 方法二
for dir in $(ls /usr/)
do
    #cd /usr/
    [ -d /usr/$dir ] && echo $dir
done 

echo

# 方法三
ls -l /usr/ |awk '/^d/ {print $NF}' # 其实同方法一，直接就可以显示不用for循环
```

## 4、awk输出结果的第一行和第一列
输出第一列
ps -ef | awk '{print $1}'

输出第一行
ps -ef | awk 'NR==1'

获取最后一列呢？
可以使用awk -F',' '{print $NF}' 来获取

打印最后一行的第二列就这样：
awk 'END{print $2}' yourfile

打印指定行的指定列（例如第4行第2列）：
awk 'NR==4{print $2}' yourfile

可以连续通道：
awk 'NR==4' | awk {print $2}' 不提倡

## 5、awk命令传入参数
awk命令是使用单引号，所以无法进行变量解析，需要使用-v选项。

```
# 求路径的最后一个文件名或者文件夹名
str='ab/cd/efg'
awk -v arg=${str} 'BEGIN{match(arg, /.*\//);print RLENGTH;}'

echo ${str##*/}
```

## 6、多行值作为返回值使用
```
# 杀死该死的compton进程
# 真是蠢哭了，为啥不使用pidof

#!/bin/bash

function check(){
    local a="$1"
    printf "%d" "$a" &>/dev/null && echo "integer" && return
    printf "%d" "$(echo $a|sed 's/^[+-]\?0\+//')" &>/dev/null && echo "integer" && return
    printf "%f" "$a" &>/dev/null && echo "number" && return
    [ ${#a} -eq 1 ] && echo "char" && return
    echo "string"
}

ps aux | grep compton

ps aux | grep compton | awk '{print $2,$11,$12}'

#pids=`ps aux | grep compton | awk '{print $2}' | sed -n '1,$p'`
pids=`ps aux | grep compton | awk '{print $2}'`

echo ${pids}
echo 'pids type: ' $(check ${pids})

for pid in ${pids}
do
    echo ${pid}
    #kill -9 ${pid}
    #top -p ${pid}
    ps aux | grep ${pid}
done


# 首先其中一个是当前文件执行进程，另外一个是grep进程，还有一个也是当前文件执行进程
#hj=`ps aux | grep kill | awk '{print $2}'`
hj=`ps aux | grep kill`
echo 'lalalala:' ${hj}
```

## 7、awk: not found
```
rk3288:/ # cd /system/
rk3288:/system # find . -name awk
rk3288:/system # find . -name ls
./bin/ls
rk3288:/system # find . -name awk
rk3288:/system # find . -name pwd
./bin/pwd
rk3288:/system # echo $PATH
/sbin:/system/sbin:/system/bin:/system/xbin:/vendor/bin:/vendor/xbin
rk3288:/system # cd /vendor/
rk3288:/vendor # find . -name pwd
./bin/pwd
rk3288:/vendor # find . -name awk
rk3288:/vendor #
rk3288:/vendor # cd /sdcard/test/
rk3288:/sdcard/test # ./et.sh
/system/bin/sh: ./et.sh: No such file or directory
1|rk3288:/sdcard/test # /system/bin/sh et.sh
et.sh[3]: awk: not found

rk3288:/sdcard/test # /sdcard/test/et.sh
/system/bin/sh: /sdcard/test/et.sh: No such file or directory
1|rk3288:/sdcard/test #
```
特别神奇，仔细查看了一遍，果然没有awk这个命令。

https://www.cnblogs.com/ITyannic/p/3973489.html

但是，测试发现确实能进行awk命令执行，一定要找到原因：
```
rk3288:/sdcard/test # alias  | grep awk
awk='busybox awk'
rk3288:/sdcard/test # whence awk
'busybox awk'
rk3288:/sdcard/test # which awk
1|rk3288:/sdcard/test #
```

然后就在脚本中增加busybox字样，脚本执行成功。
注释：环境是Android后台。

## 8、实战
来自菜鸟教程：https://www.runoob.com/linux/linux-comm-awk.html
```log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange,apple,mongo
```

### 8-1、用法一：awk '{[pattern] action}' {filenames}   # 行匹配语句 awk '' 只能用单引号
```
# 每行按空格或TAB分割，输出文本中的每行的第1、4项，没有则为空
[root@ubuntu0006:/media/hankin/vdb/study] #awk '{print $1,$4}' log.txt
2 a
3 like
This's
10 orange,apple,mongo

# 格式化输出
[root@ubuntu0006:/media] #awk '{printf "%-8s %-10s\n", $1, $4}' log.txt
2        a
3        like
This's
10       orange,apple,mongo
[root@ubuntu0006:/media] #awk '{printf "%8s %10s\n", $1, $4}' log.txt
       2          a
       3       like
  This's
      10 orange,apple,mongo
[root@ubuntu0006:/media] #awk '{printf "%8-s %10-s\n", $1, $4}' log.txt
2        a
3        like
This's
10       orange,apple,mongo
[root@ubuntu0006:/media] #awk '{printf "%-8-s %-10-s\n", $1, $4}' log.txt
2        a
3        like
This's
10       orange,apple,mongo
```

### 8-2、用法二：awk -F  #-F相当于内置变量FS, 指定分割字符
（见第9节）awk的内建变量：https://www.cnblogs.com/awakenedy/articles/9803919.html
```
# 使用","分割
[root@ubuntu0006:/media/hankin/vdb/study] #awk -F, '{print $1,$2}' log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple
 
# 或者使用内建变量
[root@ubuntu0006:/media/hankin/vdb/study] #awk 'BEGIN{FS=","} {print $1,$2}' log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple

# 使用多个分隔符.先使用空格分割，然后对分割结果再使用","分割
[root@ubuntu0006:/media/hankin/vdb/study] #awk -F '[ ,]'  '{print $1,$2,$5}' log.txt
2 this test
3 Are awk
This's a
10 There apple
```

### 8-3、用法三：awk -v  # 设置变量
如果不是数字类型，则默认为0
```
[root@ubuntu0006:/media/hankin/vdb/study] #awk -v a=1 '{print $1, $1+a}' log.txt
2 3
3 4
This's 1
10 11
[root@ubuntu0006:/media/hankin/vdb/study] #awk -v a=1 -v b=s '{print $1, $1+a, $1b}' log.txt
2 3 2s
3 4 3s
This's 1 This'ss
10 11 10s
```

### 8-4、用法四：awk -f {awk脚本} {文件名}
（见第11节）awk脚本
awk -f cal.awk log.txt

## 9、运算符
```
# 过滤第一列大于2的行（会发现字符串是大于2）
[root@ubuntu0006:/media] #awk '$1>2' log.txt
3 Are you like awk
This's a test
10 There are orange,apple,mongo

# 过滤第一列等于2的行
[root@ubuntu0006:/media] #awk '$1==2 {print $1,$3}' log.txt
2 is

# 过滤第一列大于2并且第二列等于'Are'的行
[root@ubuntu0006:/media/hankin/vdb/study] #awk '$1>2 && $2=="Are" {print $1,$2,$3}' log.txt
3 Are you
```

## 10、awk的内建变量
ARGC	命令行参数的数目
ERRNO	最后一个系统错误的描述
FILENAME	当前文件名
FNR	各文件分别计数的行号
FS	字段分隔符(默认是任何空格)
NF	一条记录的字段的数目
NR	已经读出的记录数，就是行号，从1开始
OFS	输出字段分隔符，默认值与输入字段分隔符一致。
ORS	输出记录分隔符(默认值是一个换行符)
RS	记录分隔符(默认是一个换行符)

```
[root@ubuntu0006:/media/hankin/vdb/study] #awk -F\' 'BEGIN{printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n","FILENAME","ARGC","FNR","FS","NF","NR","OFS","ORS","RS";printf "---------------------------------------------\n"} {printf "%4s %4s %4s %4s %4s %4s %4s %4s %4s\n",FILENAME,ARGC,FNR,FS,NF,NR,OFS,ORS,RS}'  log.txt
FILENAME ARGC  FNR   FS   NF   NR  OFS  ORS   RS
---------------------------------------------
log.txt    2    1    '    1    1
log.txt    2    2    '    1    2
log.txt    2    3    '    2    3
log.txt    2    4    '    1    4

# 输出顺序号 NR, 匹配文本行号
[root@ubuntu0006:/media/hankin/vdb/study] #awk '{print NR,FNR,$1,$2,$3}' log.txt
1 1 2 this is
2 2 3 Are you
3 3 This's a test
4 4 10 There are

# 指定输出分割符
[root@ubuntu0006:/media/hankin/vdb/study] #awk '{print $1,$2,$5}' OFS=" $ "  log.txt
2 $ this $ test
3 $ Are $ awk
This's $ a $
10 $ There $

```

## 11、使用正则，字符串匹配
```
# 输出第二列包含 "er"，并打印第二列与第四列
[root@ubuntu0006:/media] #awk '$2 ~ /er/ {print $2,$4}' log.txt
There orange,apple,mongo
```
~ 表示模式开始。// 中是模式。

```
# 输出包含 "re" 的行
[root@ubuntu0006:/media] #awk '/re/' log.txt
3 Are you like awk
10 There are orange,apple,mongo
```

## 12、忽略大小写
```
[root@ubuntu0006:/media] #awk 'BEGIN{IGNORECASE=1} /this/' log.txt
2 this is a test
This's a test
[root@ubuntu0006:/media] #awk '/this/' log.txt
2 this is a test
```

## 13、模式取反
```
[root@ubuntu0006:/media] #awk '$2 !~ /th/ {print $2,$4}' log.txt
Are like
a
There orange,apple,mongo
[root@ubuntu0006:/media] #awk '!/th/ {print $2,$4}' log.txt
Are like
a
There orange,apple,mongo
```

## 14、shell脚本抓取特定行
没接触Linux的shell脚本之前处理文本数据大多是采用python，包括批处理、对文本的操作等等。但是在接触了shell脚本后发现shell处理文本数据简直不要太快。

今天在数据处理时遇到了一个问题，就是把文件中某些特定的行抓出来。然后在输出到另一个文件中。代码如下图所示。

awk '{if($2==n) print $1,$2,$3} ' inputFileName > outputFileName 
1
awk是shell脚本中非常有用的命令。上面这个命令中判断第二列是否等于n，如果等于n，就把这一行的第一列、第二列、第三列从inputFile中输出到OutputFile。就完成了抓取。

## 15、awk脚本

### 15-1、awk脚本定义格式
```
格式1：
BEGIN{} pattern{} END{}

格式2：
#！/bin/awk -f
#add 'x' right 
BEGIN{} pattern{} END{}
```
关于awk 脚本，需要注意两个关键词BEGIN和END
BEGIN{ 这里面放的是执行前的语句 }
END {这里面放的是处理完所有的行后要执行的语句}
{这里面放的是处理每一行时要执行的语句}
格式1假设为f1.awk文件，格式2假设为f2.awk文件
```
awk [-v var=value] f1.awk [file]
f2.awk [-v var=value] [var1=value1] [file]
```
awk [-v var=value] f1.awk [file]，把处理阶段放到一个文件而已，展开后就是普通的awk语句
f2.awk [-v var=value] [var1=value1] [file]中[-v var=value]是在BEGIN之前设置的变量值，[var1=value1]是在BEGIN过程之后进行的，也就是说直到首行输入完成后，这个变量才可用。

### 11-2、awk脚本练习
见：D:\Github\Storage\shell\awk
```
[root@ubuntu0006:/media] #awk -F: -f f1.awk /etc/passwd
nobody 65534
sambauser 1000
hejian 1001
[root@ubuntu0006:/media] #chmod +x f2.awk
[root@ubuntu0006:/media] #f2.awk -F: /etc/passwd
-bash: f2.awk: 未找到命令
[root@ubuntu0006:/media] #./f2.awk -F: /etc/passwd
-bash: ./f2.awk: /bin/awk: 解释器错误: 没有那个文件或目录
[root@ubuntu0006:/media] #which awk
/usr/bin/awk
[root@ubuntu0006:/media] #vim f2.awk
[root@ubuntu0006:/media] #./f2.awk -F: /etc/passwd
nobody 65534
sambauser 1000
hejian 1001
[root@ubuntu0006:/media] #./test.awk -F: min=100 max=200 /etc/passwd/
awk: 致命错误: 无法以读模式打开文件“/etc/passwd/”(不是目录)
[root@ubuntu0006:/media] #./test.awk -F: min=100 max=200 /etc/passwd
systemd-timesync 100
systemd-network 101
systemd-resolve 102
```

## 13、另外一些实例
AWK 的 hello world 程序为：
```
BEGIN { print "Hello, world!" }
```

```
# 计算文件大小
[root@ubuntu0006:/media] #ls -l *.txt | awk '{sum+=$5} END {print sum}'
195

# 从文件中找出长度大于 15 的行
[root@ubuntu0006:/media] #awk 'length>15' log.txt
2 this is a test
3 Are you like awk
10 There are orange,apple,mongo

# 打印九九乘法表
[root@ubuntu0006:/media] #seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
1x1=1
1x2=2   2x2=4
1x3=3   2x3=6   3x3=9
1x4=4   2x4=8   3x4=12  4x4=16
1x5=5   2x5=10  3x5=15  4x5=20  5x5=25
1x6=6   2x6=12  3x6=18  4x6=24  5x6=30  6x6=36
1x7=7   2x7=14  3x7=21  4x7=28  5x7=35  6x7=42  7x7=49
1x8=8   2x8=16  3x8=24  4x8=32  5x8=40  6x8=48  7x8=56  8x8=64
1x9=9   2x9=18  3x9=27  4x9=36  5x9=45  6x9=54  7x9=63  8x9=72  9x9=81
```

## 14、awk、sed、grep更适合的方向
grep 更适合单纯的查找或匹配文本
sed 更适合编辑匹配到的文本
awk 更适合格式化文本，对文本进行较复杂格式处理
 
关于awk内建变量个人见解，简单易懂
解释一下变量：
变量：分为内置变量和自定义变量;输入分隔符FS和输出分隔符OFS都属于内置变量。

内置变量就是awk预定义好的、内置在awk内部的变量，而自定义变量就是用户定义的变量。
 FS(Field Separator)：输入字段分隔符， 默认为空白字符
 OFS(Out of Field Separator)：输出字段分隔符， 默认为空白字符
 RS(Record Separator)：输入记录分隔符(输入换行符)， 指定输入时的换行符
 ORS(Output Record Separate)：输出记录分隔符（输出换行符），输出时用指定符号代替换行符
 NF(Number for Field)：当前行的字段的个数(即当前行被分割成了几列)
 NR(Number of Record)：行号，当前处理的文本行的行号。
 FNR：各文件分别计数的行号
 ARGC：命令行参数的个数
 ARGV：数组，保存的是命令行所给定的各参数
 
自定义变量的方法
 方法一：-v varname=value ，变量名区分字符大小写。
 方法二：在program中直接定义。







