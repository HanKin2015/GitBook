# strings命令

## 1、简介
打印文件中的可打印字符串（print the strings of printable characters in files）。常用来在二进制文件中查找字符串，与grep配合使用。strings命令输出的字符串长度为4个或4个以上的，长度小于4的字符串将不予打印，我们可以通过-n参数调整，strings -n 2 filename

strings命令是在对象文件或者二进制文件中查找可打印的字符串，有很多的用途，例如一个用法就是在编译的so中定义字符串常量作为动态库的版本号，然后就可以使用strings+grep 组合命令查看当前编译的so的版本号了。

## 2、常用方法
在libc.so.6是c标准库，而这个标准库的制作者为了让库的使用者知道该库兼容哪些版本的标准库，就在这个库中定义了一些字符串常量，比如我的系统是centos6.8-x64,我的c标准库在/lib64/libc.so.6，可以直接运行该标准库文件，或者使用ldd --version查看当前版本，以下显示当前版本为2.12

而使用strings /lib64/libc.so.6 | grep GLIBC,可查看向下兼容的版本


查找ls中包含libc的字符串，不区分大小写：
strings /bin/ls | grep -i libc








