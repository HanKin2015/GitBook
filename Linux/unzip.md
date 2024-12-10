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
    解包：tar xzvf FileName.tar
    打包：tar czvf FileName.tar DirName

gz
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

rpm
    解压：rpm2cpio package.rpm | cpio -idmv
          rpm2cpio package.rpm | cpio -id
    压缩较麻烦，属于安装包

lz4
    解压：lz4 -d file.lz4 output_file（解压后的输出文件名。如果不指定输出文件名，默认会生成 file）
    压缩：lz4 myfile.txt myfile.txt.lz4
```

## 3、rpm包
要解压 RPM 包，可以使用 rpm2cpio 工具将 RPM 包转换为 CPIO 格式，然后使用 cpio 命令提取内容。
```
# 解压 RPM 包
rpm2cpio package.rpm | cpio -idmv
```
package.rpm 是您要解压的 RPM 包的文件名。
-i 表示提取文件。
-d 表示创建目录。
-m 表示保留文件的修改时间。
-v 表示显示详细输出。

要创建 RPM 包，您需要使用 rpmbuild 工具。首先，您需要准备一个 SPEC 文件和要打包的文件。略！

## 4、gzip: unknown suffix -- ignored
gunzip file#识别后缀，必须把后缀改为.gz //解压后的文件名，去掉.gz
错误原因：错把zip的压缩包使用gunzip命令解压，正确是unzip命令。

## 5、发现在linux下面tar是万能的
gunzip解压gz文件后，得到一个没有后缀的文件，一脸懵逼。
后面不管三七二十一，就是tar再进行解压。

tar压缩并删除源文件：tar -cvzf a.tar.gz a --remove-files

## 6、pkg文件的解压和压缩
```
xar -xf ../Foo.pkg
xar -cf ../Foo-new.pkg *
```

xar是一种扩展的归档格式(eXtensible ARchive format)，是一种开源的文件格式。xar文件在Mac OS X 10.5里是用于软件安装程序。
```
apt-get install autoconf automake libtool
apt-get install libxml2-dev
apt-get install libssl-dev

https://github.com/mackyle/xar
git clone https://github.com/mackyle/xar
cd xar/xar
./autogen.sh --noconfigure
./configure
make
make install
```

## 7、tar.gz只能在linux系统使用tar命令生成
注意压缩的文件夹路径有什么就会压缩什么进去，并且解压到指定的文件夹`只能提前创建完毕`。
```
[root@ubuntu0006:~/cmake] #tar zxvf hj.tar.gz -C k
tar: k：无法 open: 没有那个文件或目录
tar: Error is not recoverable: exiting now

需要提前mkdir k即可
```
c====create
x====extract





