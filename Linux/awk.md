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













