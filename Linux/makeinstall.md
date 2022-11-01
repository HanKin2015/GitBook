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

## 3、找不到kernel/define.h头文件
参考：https://blog.csdn.net/Rolandxxx/article/details/126804780

头文件搜索顺序：
①先搜索当前目录
②然后搜索-I指定的目录
③再搜索gcc的环境变量CPLUS_INCLUDE_PATH（C程序使用的是C_INCLUDE_PATH）
④最后搜索gcc的内定目录
```
/usr/include
/usr/local/include
/usr/lib/gcc/x86_64-redhat-Linux/4.1.1/include
```

库文件搜索顺序：
编译的时候：
①gcc会去找-L
②再找gcc的环境变量LIBRARY_PATH
③再找内定目录 /lib /usr/lib /usr/local/lib

include路径添加:
除了默认的/usr/include, /usr/local/include等include路径外，还可以通过设置环境变量来添加系统include的路径：
C
export C_INCLUDE_PATH=XXXX:$C_INCLUDE_PATH

CPP
export CPLUS_INCLUDE_PATH=XXX:$CPLUS_INCLUDE_PATH 以上修改可以直接命令行输入（一次性），可以在/etc/profile中完成（对所有用户生效），也可以在用户home目录下的.bashrc或.bash_profile中添加（针对某个用户生效），修改完后重新登录即生效。

注意直接声明变量值是无法生效的，需要使用export声明变量才行。

