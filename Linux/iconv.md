# 使用vi或vim命令查看文件出现乱码问题

## 1、iconv命令
文件内容转码的工具(常用于中文内容转码)
Windows 中默认的文件格式是 GBK(gb2312)，而 Linux 一般都是 UTF-8。
```
iconv -f gbk -t utf8 oldFile > newFile

-f  原编码
-t  目标编码
-c 忽略无法转换的字符
```

## 2、enca命令
enca（Extremely Naive Charset Analyser）是一个用于检测和转换编码的命令行工具。

enca相比于iconv的优势在于它可以获得文件的编码格式，这样就可以在不必知道文件格式的情况下将文件转换为想要的格式。enca不是系统自带的，需要安装。
```
enca -L zh_CN file    # 查看file的编码格式
enca -L zh_CN -x UTF-8 file   # 将file转换成utf8的编码格式，覆盖原来的文件
enca -L zh_CN -x UTF-8 < file1 > file2   # 转换之后存成file2文件，不覆盖原来的文件
```

## 3、iconv转换失败
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
总结：当一个文件没有中文时，是无法进行转换的。

## 4、vi中文乱码
:set encoding显示utf-8
:set fileencoding显示utf-8 
:e ++enc=gbk还是乱码，没有一个中文
:e ++enc=cp936还是乱码，没有一个中文

## 5、进一步尝试
```
[root@ubuntu0006:~] #file *
Android.mk:            UTF-8 Unicode text
camera_conf_file.c:    C source, Non-ISO extended-ASCII text, with LF, NEL line terminators
camera_conf_file.h:    Non-ISO extended-ASCII text, with LF, NEL line terminators
camera_log.c:          C source, ISO-8859 text

[root@ubuntu0006:~] #enca --list languages
belarussian: CP1251 IBM866 ISO-8859-5 KOI8-UNI maccyr IBM855 KOI8-U
  bulgarian: CP1251 ISO-8859-5 IBM855 maccyr ECMA-113
      czech: ISO-8859-2 CP1250 IBM852 KEYBCS2 macce KOI-8_CS_2 CORK
   estonian: ISO-8859-4 CP1257 IBM775 ISO-8859-13 macce baltic
   croatian: CP1250 ISO-8859-2 IBM852 macce CORK
  hungarian: ISO-8859-2 CP1250 IBM852 macce CORK
 lithuanian: CP1257 ISO-8859-4 IBM775 ISO-8859-13 macce baltic
    latvian: CP1257 ISO-8859-4 IBM775 ISO-8859-13 macce baltic
     polish: ISO-8859-2 CP1250 IBM852 macce ISO-8859-13 ISO-8859-16 baltic CORK
    russian: KOI8-R CP1251 ISO-8859-5 IBM866 maccyr
     slovak: CP1250 ISO-8859-2 IBM852 KEYBCS2 macce KOI-8_CS_2 CORK
    slovene: ISO-8859-2 CP1250 IBM852 macce CORK
  ukrainian: CP1251 IBM855 ISO-8859-5 CP1125 KOI8-U maccyr
    chinese: GBK BIG5 HZ
       none:
[root@ubuntu0006:~] #enca -L chinese libcam.h
enca: Cannot determine (or understand) your language preferences.
Please use `-L language', or `-L none' if your language is not supported
(only a few multibyte encodings can be recognized then).
Run `enca --list languages' to get a list of supported languages.
[root@ubuntu0006:~] #enca -L none libcam.c
Universal transformation format 8 bits; UTF-8
[root@ubuntu0006:~] #enca -L none libcam.h
Unrecognized encoding
[root@ubuntu0006:~] #enca -L zh_CN camera_device.c
Unrecognized encoding
[root@ubuntu0006:~] #enca -L zh_CN libcam.c
Universal transformation format 8 bits; UTF-8
[root@ubuntu0006:~] #enca -L zh_CN libcam.h
Simplified Chinese National Standard; GB2312
```
很奇怪，反正没有怎么搞懂为何这样，发现使用zh_CN是万能的。
使用 file 命令检查文件并得到了 "Non-ISO extended-ASCII text" 的结果，这意味着文件可能包含了多种不同的编码或者一些非标准的字符，这会使得确定正确的编码变得更加困难。

```
重新加载文件命令:e
:e ++enc=utf-8
:e ++enc=iso-8859-1
:e ++enc=windows-1252
```
