# awk命令

## 1、输出当前目录文件夹
```
#!/bin/bash
#方法一 
dir=$(ls -l /usr/ |awk '/^d/ {print $NF}')
for i in $dir
do
 echo $i
done 
#######
#方法二
for dir in $(ls /usr/)
do
 [ -d $dir ] && echo $dir
done  
##方法三
 
ls -l /usr/ |awk '/^d/ {print $NF}' ## 其实同方法一，直接就可以显示不用for循环
```

## 2、awk输出结果的第一行和第一列
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

## 3、awk命令传入参数
awk命令是使用单引号，所以无法进行变量解析，需要使用-v选项。

```
# 求路径的最后一个文件名或者文件夹名
str='ab/cd/efg'
awk -v arg=${str} 'BEGIN{match(arg, /.*\//);print RLENGTH;}'

echo ${str##*/}
```

## 4、多行值作为返回值使用
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

## 5、awk: not found
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

## 6、常用参数
AWK 是一种处理文本文件的语言，是一个强大的文本分析工具。

之所以叫 AWK 是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的 Family Name 的首字符。

-F：指定输入文件折分隔符，fs是一个字符串或者是一个正则表达式

## 7、实战
```log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange,apple,mongo
```

用法一：awk '{[pattern] action}' {filenames}   # 行匹配语句 awk '' 只能用单引号

```
# 每行按空格或TAB分割，输出文本中的1、4项
[root@ubuntu0006:/media/hankin/vdb/study] #awk '{print $1,$4}' log.txt
2 a
3 like
This's
10 orange,apple,mongo

# 格式化输出
[root@ubuntu0006:/media/hankin/vdb/study] #awk '{printf "%-8s %-10s\n",$1,$4}' log.txt
2        a
3        like
This's
10       orange,apple,mongo
```

用法二：awk -F  #-F相当于内置变量FS, 指定分割字符
```
# 使用","分割
[root@ubuntu0006:/media/hankin/vdb/study] #awk -F, '{print $1,$2}'   log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple
 
# 或者使用内建变量
[root@ubuntu0006:/media/hankin/vdb/study] #awk 'BEGIN{FS=","} {print $1,$2}'     log.txt
2 this is a test
3 Are you like awk
This's a test
10 There are orange apple

# 使用多个分隔符.先使用空格分割，然后对分割结果再使用","分割
[root@ubuntu0006:/media/hankin/vdb/study] #awk -F '[ ,]'  '{print $1,$2,$5}'   log.txt
2 this test
3 Are awk
This's a
10 There apple
```

用法三：awk -v  # 设置变量
```
[root@ubuntu0006:/media/hankin/vdb/study] #awk -va=1 '{print $1,$1+a}' log.txt
2 3
3 4
This's 1
10 11
[root@ubuntu0006:/media/hankin/vdb/study] #awk -va=1 -vb=s '{print $1,$1+a,$1b}' log.txt
2 3 2s
3 4 3s
This's 1 This'ss
10 11 10s
```

用法四：awk -f {awk脚本} {文件名}

## 8、内建变量
```
# 过滤第一列大于2并且第二列等于'Are'的行
[root@ubuntu0006:/media/hankin/vdb/study] #awk '$1>2 && $2=="Are" {print $1,$2,$3}' log.txt
3 Are you
```
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

## 9、shell脚本抓取特定行
没接触Linux的shell脚本之前处理文本数据大多是采用python，包括批处理、对文本的操作等等。但是在接触了shell脚本后发现shell处理文本数据简直不要太快。

今天在数据处理时遇到了一个问题，就是把文件中某些特定的行抓出来。然后在输出到另一个文件中。代码如下图所示。

awk '{if($2==n) print $1,$2,$3} ' inputFileName > outputFileName 
1
awk是shell脚本中非常有用的命令。上面这个命令中判断第二列是否等于n，如果等于n，就把这一行的第一列、第二列、第三列从inputFile中输出到OutputFile。就完成了抓取。