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







