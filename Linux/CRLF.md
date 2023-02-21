# 回车换行符 

## 1、简介
<回车>：C/C++语言里为 \r； ASCII码为0D；符号表示为CR，Carriage Return
<换行>：C/C++语言里为 \n； ASCII码为0A；符号表示为LF，Line Feed

Feed喂养;饲养
Carriage马车;运输;运费

## 2、回车和换行来源
在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意儿，每秒钟可以打10个字符。但是它有一个问题，就是打完一行换行的时候，要用去0.2秒，正好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。

于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做"回车"，告诉打字机把打印头定位在左边界；另一个叫做"换行"，告诉打字机把纸向下移一行。

这就是"换行"和"回车"的来历，从它们的英语名字上也可以看出一二。

## 3、n 和 r差异
后来，计算机发明了，这两个概念也就被搬到了计算机上。那时，存储器很贵，一些科学家认为在每行结尾加两个字符太浪费了，加一个就可以。于是，就出现了分歧。
'r'是回车，'n'是换行，前者使光标到行首，后者使光标下移一格。通常用的Enter是两个加起来。
有的编辑器只认rn，有的编辑器则两个都认。所以要想通用的话，最好用rn换行。
✪ 在微软的MS-DOS和Windows中，使用“回车CR('r')”和“换行LF('n')”两个字符作为换行符;
✪ Windows系统里面，每行结尾是 回车+换行(CR+LF)，即“rn”；
✪ Unix系统里，每行结尾只有 换行CR，即“n”；
✪ Mac系统里，每行结尾是 回车CR 即'r'；
✪ 所以我们平时编写文件的回车符应该确切来说叫做回车换行符；

##  4、影响
一个直接后果是，Unix/Mac系统下的文件在Windows里打开的话，所有文字会变成一行；而Windows里的文件在Unix/Mac下打开的话，在每行的结尾可能会多出一个^M符号。

Linux保存的文件在windows上用记事本看的话会出现黑点。

## 5、dos2unix和unix2dos命令
在linux下，命令unix2dos 是把linux文件格式转换成windows文件格式，命令dos2unix 是把windows格式转换成linux文件格式。

在不同平台间使用FTP软件传送文件时, 在ascii文本模式传输模式下, 一些FTP客户端程序会自动对换行格式进行转换. 经过这种传输的文件字节数可能会发生变化。

如果你不想ftp修改原文件, 可以使用bin模式(二进制模式)传输文本。一个程序在windows上运行就生成CR/LF换行格式的文本文件，而在Linux上运行就生成LF格式换行的文本文件。

## 6、wb和w的区别

## 7、为啥存在一半windows换行符一半unix换行符

```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #file find_not_pefile.sh
find_not_pefile.sh: Bourne-Again shell script, UTF-8 Unicode text executable, with CRLF, LF line terminators
```











