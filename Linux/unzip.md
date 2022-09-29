# linux压缩包相关

unzip *.zip -d 解压到的文件夹

## 1、如何将一个超大文件分割成等大的多个文件
当u盘容量太小，又需要拷贝大文件时，使用等大分割压缩。
解压时，只需要解压其中任何一个即可。

## 2、压缩命令示例
创建tar.xz文件：先 tar cvf xxx.tar xxx/ 这样创建xxx.tar文件，然后使用 xz -z xxx.tar 来将 xxx.tar压缩成为 xxx.tar.xz

解压tar.xz文件：先 xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar 然后，再用 tar xvf xxx.tar来解包。

附录：
```
tar

　　解包：tar zxvf FileName.tar
　　打包：tar czvf FileName.tar DirName

gz

　　解压1：gunzip FileName.gz
　　解压2：gzip -d FileName.gz
　　压缩： gzip FileName

.tar.gz 和 .tgz

　　解压：tar zxvf FileName.tar.gz
　　压缩：tar zcvf FileName.tar.gz DirName
　　压缩多个文件：tar zcvf FileName.tar.gz DirName1 DirName2 DirName3 ...

bz2

　　解压1：bzip2 -d FileName.bz2
　　解压2：bunzip2 FileName.bz2
　　压缩： bzip2 -z FileName

.tar.bz2

　　解压：tar jxvf FileName.tar.bz2（tar -xf FileName.tar.bz2）
　　压缩：tar jcvf FileName.tar.bz2 DirName

bz

　　解压1：bzip2 -d FileName.bz
　　解压2：bunzip2 FileName.bz
　　压缩：未知

.tar.bz

　　解压：tar jxvf FileName.tar.bz

Z

　　解压：uncompress FileName.Z
　　压缩：compress FileName

.tar.Z

　　解压：tar Zxvf FileName.tar.Z
　　压缩：tar Zcvf FileName.tar.Z DirName

zip

　　解压：unzip FileName.zip
　　压缩文件：zip FileName.zip FileName1 FileName2
	压缩文件夹：zip -r FileName.zip DirName 

rar

　　rar a all *.jpg
　　unrar e all.rar
```

## 3、tar 压缩并删除源文件
tar -cvzf  a.tar.gz a --remove-files

## 4、gzip: unknown suffix -- ignored
gunzip file#识别后缀，必须把后缀改为.gz //解压后的文件名，去掉.gz
错误原因：错把zip的压缩包使用gunzip命令解压，正确是unzip命令。

## 5、发现在linux下面tar是万能的
gunzip解压gz文件后，得到一个没有后缀的文件，一脸懵逼。
后面不管三七二十一，就是tar再进行解压。

## 6、pkg文件





