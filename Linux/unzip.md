# 压缩包相关

unzip *.zip -d 解压到的文件夹

## 如何将一个超大文件分割成等大的多个文件
当u盘容量太小，有需要拷贝大文件时，使用等大分割压缩。

解压时，只需要解压其中任何一个即可。


创建tar.xz文件：先 tar cvf xxx.tar xxx/ 这样创建xxx.tar文件，然后使用 xz -z xxx.tar 来将 xxx.tar压缩成为 xxx.tar.xz

解压tar.xz文件：先 xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar 然后，再用 tar xvf xxx.tar来解包。

附录：

tar

　　解包：tar zxvf FileName.tar

　　打包：tar czvf FileName.tar DirName

gz

　　解压1：gunzip FileName.gz

　　解压2：gzip -d FileName.gz

　　压缩：gzip FileName

.tar.gz 和 .tgz

　　解压：tar zxvf FileName.tar.gz

　　压缩：tar zcvf FileName.tar.gz DirName

　　压缩多个文件：tar zcvf FileName.tar.gz DirName1 DirName2 DirName3 ...

bz2

　　解压1：bzip2 -d FileName.bz2

　　解压2：bunzip2 FileName.bz2

　　压缩： bzip2 -z FileName

.tar.bz2

　　解压：tar jxvf FileName.tar.bz2

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

　　压缩：zip FileName.zip DirName

rar

　　rar a all *.jpg

　　unrar e all.rar


