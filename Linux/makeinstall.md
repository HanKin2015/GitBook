# 库安装包编译安装

编译安装三步走
```
./configure --prefix=/usr/local    一般来说不需要指定安装目录
make
make install
```

## 1、libusb 安装
官网下载后发现无法编译，没有configure，只有configure.ac文件

网上教程：
进入libusb目录，依次执行：→aclocal→autoconf→autoheader。
可能遇到的问题：
1.aclocal: warning: couldn't open directory 'm4': No such file or directory
原因是没有m4目录，创建“m4”   mkdir  m4 
2./configure:cannot find install-sh, install.sh, or shtool in "." "./.." "./../.."  
autoreconf -vif执行后再执行三部曲

aclocal----->automake
autoconf--->autoconf
m4--------->m4

apt install autoconf即可，会自动安装依赖

## 2、关于usr/bin/ld: cannot find -lxxx问题总结
/usr/bin/ld: cannot find -lxxx

意思是编译过程找不到对应库文件。其中，-lxxx表示链接库文件 libxxx.so。


```
find . -type f -delete或find . -type f -exec rm -f {} \;
find . -type f | xargs rm -f
rm-f `find . -type f`
```

