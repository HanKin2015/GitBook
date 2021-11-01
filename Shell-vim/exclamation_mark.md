# shell中不可不知的感叹号

## 1、简介
shell 中！叫做事件提示符，英文是：Event Designators,可以方便的引用历史命令， 也就是history中记录的命令。

## 2、用法
- ! 当后面跟随的字母不是“空格、换行、回车、=和(”时，做命令替换
- !n 会引用history中的第n个命令，比如输入！100，就是执行history列表中的第100条命令
- !-n 获取history中倒数第N个命令并执行，比如输入!-1,就会执行上一条命令
- !!是!-1的一个alias ，因为执行上一条命令的情况比较多一些，一般如果只是执行上一条命令只按下键盘中的↑即可，有时候如果命令前加点东西执行起来会快一点（当然↑然后ctrl+a也可以跳到命令最面前插入内容）
- !string引用最近的以 string 开始的命令。这条命令在你运行一个命令之后忘记了这个命令的参数是什么，直接!命令既可
- !?string[?] 指向包含这个字符串的命令

## 3、实战1
```
#!/bin/bash

#readonly INFO="My name is LS."
readonly INFO="My name is ls."

readonly STU_ZS="I am zhangshan"
readonly STU_LS="I am lisi"
readonly STU_WMZ="I am wangmazi"

STU_INFO="STU_${INFO:11:-1}"
echo ${STU_INFO}

STU_INFO=${!STU_INFO}

if [[ -z "${STU_INFO}" ]]; then
    exit 1
fi

printf "${STU_INFO}\n"
echo -en "${STU_INFO}\n"
```

## 4、实战2
比如说在编译一个模块，一直在修改修改，修改完毕后需要编译，这时候需要去找编译命令，快捷方式：!./build即可。
可以快速查找并执行。

!$这个命令也是真的好用，如拷贝了一个二进制文件后需要增加执行权限，chmod +x !$。

















