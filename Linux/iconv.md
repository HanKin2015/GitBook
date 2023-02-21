# iconv命令

文件内容转码的工具(常用于中文内容转码)

Windows 中默认的文件格式是 GBK(gb2312)，而 Linux 一般都是 UTF-8。

iconv -f gbk -t utf8 oldFile > newFile

-f  原编码
-t  目标编码
-c 忽略无法转换的字符

## enca命令
enca相比于iconv的优势在于它可以获得文件的编码格式，这样就可以在不必知道文件格式的情况下将文件转换为想要的格式。enca不是系统自带的，需要安装。

enca -L zh_CN file    #查看file的编码格式
enca -L zh_CN -x UTF-8 file   #将file转换成utf8的编码格式，覆盖原来的文件
enca -L zh_CN -x UTF-8 < file1 > file2   #转换之后存成file2文件，不覆盖原来的文件

## iconv转换失败
在Vim中可以直接查看文件编码:set fileencoding
set encoding=utf-8 fileencodings=ucs-bom,utf-8,cp936


```
加了中文就会使得ASCII文件变成UTF-8格式
[root@ubuntu0006:/media/hankin/vdb/tmp] #file hj
hj: ASCII text
[root@ubuntu0006:/media/hankin/vdb/tmp] #cat hj
12345
[root@ubuntu0006:/media/hankin/vdb/tmp] #vim hj
[root@ubuntu0006:/media/hankin/vdb/tmp] #cat hj
12345
中文
[root@ubuntu0006:/media/hankin/vdb/tmp] #file hj
hj: UTF-8 Unicode text
[root@ubuntu0006:/media/hankin/vdb/tmp] #enca hj
Universal transformation format 8 bits; UTF-8
[root@ubuntu0006:/media/hankin/vdb/tmp] #vim hj
[root@ubuntu0006:/media/hankin/vdb/tmp] #enca hj
7bit ASCII characters
[root@ubuntu0006:/media/hankin/vdb/tmp] #cat hj
12345

有了中文才能进行转换
[root@ubuntu0006:/media/hankin/vdb/tmp] #iconv -t gbk hj
12345
[root@ubuntu0006:/media/hankin/vdb/tmp] #file hj
hj: ASCII text
[root@ubuntu0006:/media/hankin/vdb/tmp] #vim hj
[root@ubuntu0006:/media/hankin/vdb/tmp] #iconv -t gbk hj -o jh
12345

▒▒▒▒
[root@ubuntu0006:/media/hankin/vdb/tmp] #file hj
hj: UTF-8 Unicode text
[root@ubuntu0006:/media/hankin/vdb/tmp] #file jh
jh: ISO-8859 text

vim模式下set encoding一直是utf-8，但是set fileencoding却是lantin1，修改为gbk还是乱码
正确的解决乱码方式:e ++enc=gbk或者cp936，发现这两种格式是同一种。
```

总结：当一个文件没有中文时，是无法

## vi中文乱码
:set encoding显示utf-8
:set fileencoding显示utf-8 
:e ++enc=gbk还是乱码，没有一个中文
:e ++enc=cp936还是乱码，没有一个中文




