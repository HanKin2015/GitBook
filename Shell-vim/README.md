# shell脚本与vim编辑器

## 1、ctrl+s冻结
使用Xshell的时候在vim下按ctrl + s 之后就把终端锁定了。

解决方法是ctrl + q（如果登录微信，ctrl + q 被占用为截屏，那就按ctrl + z）。
查看相关组合键可以输入：stty -a

## 2、readonly用来定义只读变量，一旦使用readonly定义的变量在脚本中就不能更改
```
root@hankin:/usr/local/bin# echo $(printf "%d" "0xc")
12
root@hankin:/usr/local/bin# echo $(printf "%d" "0xcc")
204
```

## 3、终端单行函数需注意
文件：
```
#!/bin/bash

demoFun()
{
    echo "这是我的第一个 shell 函数!"
}

demoFun
```

终端：
demoFun() { echo "这是我的第一个 shell 函数!"; }; demoFun

注意多了一个分号。

## 4、nano编辑器
ctrl+o  保存，后面需要按一下回车键确认
ctrl+x  退出

## 5、vi编辑器
x   删除
无法在编辑模式进行上下左右

## 6、cat "${conf}" | grep -v ^\# | grep "^${key}=" | awk 'BEGIN{FS="="} {print $2}'详解
这是一个用于从配置文件中获取特定键值的命令。让我逐步解释每个部分的含义：

（1）cat "${conf}"：cat 命令用于将文件的内容输出到标准输出。${conf} 是一个变量，表示配置文件的路径。这个命令将配置文件的内容输出到下一个命令的标准输入。

（2）grep -v ^\#：grep 命令用于在输入中搜索匹配的文本行。-v 选项表示反向匹配，即只输出不匹配的行。^\# 是一个正则表达式，表示以 # 开头的行，即注释行。这个命令将过滤掉所有的注释行。

（3）grep "^${key}="：这是第二个 grep 命令，用于匹配以 ${key}= 开头的行。${key} 是一个变量，表示要搜索的键。这个命令将过滤掉不匹配键的行。

（4）awk 'BEGIN{FS="="} {print $2}'：awk 是一种文本处理工具，用于按照指定的规则处理文本行。BEGIN{FS="="} 是一个 awk 的特殊语法，用于设置字段分隔符为 =。{print $2} 表示打印每行的第二个字段，即键对应的值。

综上所述，该命令的作用是从配置文件中获取指定键的值，并将其输出到标准输出。

## 7、grep了多行只取其中一行
grep [匹配条件] [文件名] | head -n 1
在Bash中，-eq是用于数值比较的运算符，而${driver_type}是一个字符串。因此，应该使用=运算符进行字符串比较，而不是-eq运算符。

## 8、shell 去掉字符串首尾空格
echo "  hello world  " | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
echo "  hello world  " | awk '{$1=$1};1'

## 9、shell 去掉字符串首尾非数字字符
```
#!/bin/bash

str="abc123def456ghi"
echo "原始字符串：$str"

# 去掉首部非数字字符
str=${str##[^0-9]}
echo "去掉首部非数字字符后的字符串：$str"

# 去掉尾部非数字字符
str=${str%%[^0-9]}
echo "去掉首尾非数字字符后的字符串：$str"
```