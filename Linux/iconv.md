# iconv命令

文件内容转码的工具(常用于中文内容转码)

Windows 中默认的文件格式是 GBK(gb2312)，而 Linux 一般都是 UTF-8。

iconv -f gbk -t utf8 oldFile > newFile

## enca命令
enca相比于iconv的优势在于它可以获得文件的编码格式，这样就可以在不必知道文件格式的情况下将文件转换为想要的格式。enca不是系统自带的，需要安装。

enca -L zh_CN file    #查看file的编码格式
enca -L zh_CN -x UTF-8 file   #将file转换成utf8的编码格式，覆盖原来的文件
enca -L zh_CN -x UTF-8 < file1 > file2   #转换之后存成file2文件，不覆盖原来的文件



