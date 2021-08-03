# Linux中Readlink命令
readlink是linux系统中一个常用工具，主要用来找出符号链接所指向的位置。

输出符号链接值或者权威文件名

英文为：

print value of a symbolic link or canonical file name

-f 选项：

-f 选项可以递归跟随给出文件名的所有符号链接以标准化，除最后一个外所有组件必须存在。

简单地说，就是一直跟随符号链接，直到直到非符号链接的文件位置，限制是最后必须存在一个非符号链接的文件。


## 常用方法
```
$ readlink -f /usr/bin/awk  
/usr/bin/gawk 

Mac下的readlink没有-f参数
```

