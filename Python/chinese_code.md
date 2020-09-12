# 中文编码问题

使用过unix2dos进行转换并没有什么卵用。
但是发现可以使用dos2unix去掉末尾的换行符^M。

## 方法1
在Linux下偶尔打开txt会出现中文乱码问题。
场景：在vim编辑下使用:set fileencoding命令查看编码格式为cp936
快速解决方式： iconv -f gbk -t utf8 PythonStudy.txt > Python.txt.utf8

## 方法2
优缺点：vim打开正常，但是使用cat等打开仍然乱码。

切换至root用户，用vim打开vimrc文件。

```
vim /etc/vim/vimrc
vim /etc/vimrc
在文件的末尾加入以下内容：

set fileencodings=utf-8,gb2312,gbk,gb18030,cp936
set termencoding=utf-8
set fileformats=unix
set encoding=prc

注意第一行参数末尾有s
```

# 方法3
用记事本打开文件，点击另存为，在下方的编码方式中选择utf-8方式。
drect


