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

## vi编辑器
x   删除
无法在编辑模式进行上下左右
