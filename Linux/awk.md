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















