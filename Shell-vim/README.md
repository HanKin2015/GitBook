[TOC]
# shell脚本与vim编辑器

## 1、ctrl+s冻结

使用Xshell的时候在vim下按ctrl + s 之后就把终端锁定了。

解决方法是ctrl + q（如果登录微信，ctrl + q 被占用为截屏，那就按ctrl + z）。
查看相关组合键可以输入：stty -a



## 2、最强vim配置文件

## 3、vim操作常用

设置关键字高亮：set hlsearch
一般来说，关闭在第二个单词加上no即可
如：set nohlsearch

set cul
e ++enc=cp936

## 4、readonly用来定义只读变量，一旦使用readonly定义的变量在脚本中就不能更改
```
root@hankin:/usr/local/bin# echo $(printf "%d" "0xc")
12
root@hankin:/usr/local/bin# echo $(printf "%d" "0xcc")
204
```

## 5、终端单行函数需注意
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







