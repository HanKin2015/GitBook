# shell教程
Bourne Again Shell，由于易用和免费，Bash 在日常工作中被广泛使用。同时，Bash 也是大多数Linux 系统默认的 Shell。
在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 #!/bin/sh，它同样也可以改为 #!/bin/bash。
#! 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。

## 1、两种运行方式
chmod +x test.sh
./test.sh
直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的

/bin/bash test.sh
这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

## 2、变量
- 注意，变量名和等号之间不能有空格
- 使用一个定义过的变量，只要在变量名前面加美元符号即可
- 推荐给所有变量加上花括号，这是个好的编程习惯。即：echo ${your_name}
- 注意，第二次赋值的时候不能写$your_name="alibaba"，使用变量的时候才加美元符（$）
- 只读变量：变量定义后换行readonly your_name
- 使用 unset 命令可以删除变量， 不能删除只读变量

## 3、bash上一步参数
!^
!$
!:1

强大如斯的：ctrl + r

## 4、

















