# VIM操作笔记

[TOC]

# 1、tab键

 vim默认是8个字符宽度 ，vim ~/.vimrc一下， 然后添加：

```vbscript
set ts=4
set noexpandtab
```

   设置为4个空格的方法： 把上述的noexpandtab改为expandtab

# 2、grep查找

# 3、vim中查找

:/查找内容

使用n查找下一个 

使用shift+n查找上一个

# 4、[linux shell中"2>&1"含义](https://www.cnblogs.com/zhenghongxin/p/7029173.html)


## 5、VI
当遇到没有安装VIM软件的时候，只有VI，操作起来就会有点困难。没有方向键和退格键。

```
x	删除键
Delete	删除键
hjkl	方向键
i	插入
:wq	退出保存

每次使用的时候需要Esc
```

## 6、进阶

