# linux中的一些判断操作

## 1、判断一个变量类型

无非就是判断一个变量是字符串还是数字。

shell没有封装的函数进行判断。

其实这种情况遇到的时候很少，如果是单纯判断是否为数字，可以使用正则。
如果是判断一个数字变量是否为空，可以用个加双引号将它转换为字符串后再判断即可。
如：
```
# 将文件夹日期转换为秒数
date_second=$(date -d ${folder_name} +%s)
if [ ! -z "${date_second}" ] && [ ${date_second} -lt ${curren_date_second} ]
then
    tar -zcf ${folder_name}.tar.gz ${folder_name} --remove-files
fi
```

### 方法一
```
#!/usr/bin/env bash

function check(){
    local a="$1"
    printf "%d" "$a" &>/dev/null && echo "integer" && return
    printf "%d" "$(echo $a|sed 's/^[+-]\?0\+//')" &>/dev/null && echo "integer" && return
    printf "%f" "$a" &>/dev/null && echo "number" && return
    [ ${#a} -eq 1 ] && echo "char" && return
    echo "string"
}

echo ". is" $(check ".")
echo "1 is" $(check "1")
echo ".1 is" $(check ".1")
echo "1. is" $(check "1.")
echo "1234 is" $(check "1234")
echo "1.234 is" $(check "1.234")
echo "1.2.3.4 is" $(check "1.2.3.4")
echo "a1234 is" $(check "a1234")
echo "abc is" $(check "abc")
echo "a is" $(check "a")
echo "1e+2" $(check "1e+2")
echo "1.e+2" $(check "1e+2")
echo ".1e+2" $(check "1e+2")
echo "-1" $(check "-1")
echo "-1.2" $(check "-1.2")
echo "-a" $(check "-a")
echo "0x1f" $(check "0x1f")
echo "0x1H" $(check "0x1H")
echo "0333" $(check "0333")
echo "0999" $(check "0999")
echo "+003" $(check "+003")
echo "+003.3" $(check "+003.3")
```
输出结果如下：
```
. is char
1 is integer
.1 is number
1. is number
1234 is integer
1.234 is number
1.2.3.4 is string
a1234 is string
abc is string
a is char
1e+2 number
1.e+2 number
.1e+2 number
-1 integer
-1.2 number
-a string
0x1f integer
0x1H string
0333 integer
0999 number
+003 integer
+003.3 number
```
### 方法二
```
#!/bin/bash
#

echo $a|grep [a-zA-Z]>/dev/null
if [ $? -eq 0 ];then
echo "string"
else
echo "data"
fi
```
### 方法三
```
#!/bin/bash
#

if [[ $a != *[^0-9]* ]]&&[[ $a != 0* ]]
then
echo $a is data
else
echo $a is string
fi
```

## 2、Shell判断字符串（变量）是否为空
您可以将 -z 选项传递给 if 命令或条件表达式。如果STRING的长度为0,variable ($var)为空。test命令用于检查文件类型并比较值。












