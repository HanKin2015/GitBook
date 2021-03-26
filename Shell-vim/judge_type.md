# 判断一个变量类型

无非就是判断一个变量是字符串还是数字。

shell没有封装的函数进行判断。

其实这种情况遇到的时候很少，如果是单纯判断是否为数字，可以使用正则。
如果是判断一个数字变量是否为空，可以用个加双引号将它转换为字符串后再判断即可。
如：
```
#!/bin/bash
#
# 功能：管理USB外设运营记录文件大小
# 时间: 2021/3/10
#

folder_path="/sf/log/usb_record_info/"
if [ ! -d ${folder_path} ]; then
    exit 1
fi
cd ${folder_path}

# 自UTC时间，当前所经过的秒数
curren_date_second=$(date -d `date +%Y%m%d` +%s)

# 压缩文件夹
folders_name=`ls -l ${folder_path} | awk '/^d/ {print $NF}'`
for folder_name in ${folders_name}
do
    # 将文件夹日期转换为秒数
    date_second=$(date -d ${folder_name} +%s)
    if [ ! -z "${date_second}" ] && [ ${date_second} -lt ${curren_date_second} ]
    then
        tar -zcf ${folder_name}.tar.gz ${folder_name} --remove-files
    fi
done

# 判断文件夹大小是否超过200M
current_size=`du -s ${folder_path} | awk '{print $1}'`
max_size=$((200*1024))
while [ ${current_size} -gt ${max_size} ]
do
    oldest_file_name=`ls -rt | awk 'NR==1'`

    if [ ! -z ${oldest_file_name} ]; then
        rm -rf ${folder_path}${oldest_file_name}
    fi
    current_size=`du -s ${folder_path} | awk '{print $1}'`
done

exit 0
```


方法一

脚本如下
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
方法二
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
方法三
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