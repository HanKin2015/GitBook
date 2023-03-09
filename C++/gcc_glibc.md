# 理清gcc、libc、libstdc++的关系

## 1、网上介绍
参考：https://blog.csdn.net/p656456564545/article/details/89184141

从libc说起。
libc是Linux下原来的标准C库，也就是当初写hello world时包含的头文件#include < stdio.h> 定义的地方。

后来逐渐被glibc取代，也就是传说中的GNU C Library,在此之前除了有libc，还有klibc,uclibc。现在只要知道用的最多的是glibc就行了，主流的一些linux操作系统如 Debian, Ubuntu，Redhat等用的都是glibc（或者其变种，下面会说到).

那glibc都做了些什么呢？ glibc是Linux系统中最底层的API，几乎其它任何的运行库都要依赖glibc。 glibc最主要的功能就是对系统调用的封装，你想想看，你怎么能在C代码中直接用fopen函数就能打开文件？ 打开文件最终还是要触发系统中的sys_open系统调用，而这中间的处理过程都是glibc来完成的。这篇文章详细介绍了glibc是如何与上层应用程序和系统调用交互的。除了封装系统调用，glibc自身也提供了一些上层应用函数必要的功能,如string,malloc,stdlib,linuxthreads,locale,signal等等。

好了，那eglibc又是什么？ 这里的e是Embedded的意思，也就是前面说到的变种glibc。eglibc的主要特性是为了更好的支持嵌入式架构，可以支持不同的shell(包括嵌入式)，但它是二进制兼容glibc的，就是说如果你的代码之前依赖eglibc库，那么换成glibc后也不需要重新编译。ubuntu系统用的就是eglibc（而不是glibc）,不信，你执行 ldd –version 或者 /lib/i386-linux-gnu/libc.so.6
(64位系统运行/lib/x86_64-linux-gnu）看看，便会显示你系统中eglibc/glibc的版本信息。 这里提到了libc.so.6,这个文件就是eglibc/glibc编译后的生成库文件。

还有一个glib看起来也很相似，那它又是什么呢？glib也是个c程序库，不过比较轻量级，glib将C语言中的数据类型统一封装成自己的数据类型，提供了C语言常用的数据结构的定义以及处理函数，有趣的宏以及可移植的封装等(注：glib是可移植的，说明你可以在linux下，也可以在windows下使用它）。那它跟glibc有什么关系吗？其实并没有，除非你的程序代码会用到glib库中的数据结构或者函数，glib库在ubuntu系统中并不会默认安装(可以通过apt-get install libglib2.0-dev手动安装)，著名的GTK+和Gnome底层用的都是glib库。想更详细了解glib？

## 2、实战
低版本的libstdc++编译使用正常，高版本的libstdc++编译使用异常，其实代码本身就存在问题，只是低版本编译的在运行中未出现异常。
低版本编译支持在高版本运行，高版本编译不支持在低版本运行
```
# strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBC
GLIBCXX_3.4
GLIBCXX_3.4.1
GLIBCXX_3.4.2
GLIBCXX_3.4.3
GLIBCXX_3.4.4
GLIBCXX_3.4.5
GLIBCXX_3.4.6
GLIBCXX_3.4.7
GLIBCXX_3.4.8
GLIBCXX_3.4.9
GLIBCXX_3.4.10
GLIBCXX_3.4.11
GLIBCXX_3.4.12
GLIBCXX_3.4.13
GLIBCXX_3.4.14
GLIBCXX_3.4.15
GLIBCXX_3.4.16
GLIBCXX_3.4.17
GLIBC_2.2.5
GLIBC_2.3
GLIBC_2.3.2
GLIBCXX_DEBUG_MESSAGE_LENGTH

# ./low_glibc
[info] [1d3a040]hejian|ex_:hello wolrd|data_:401bdd|len_:3039
[info] [1d3a040]hejian|ex_:hello wolrd|data_:401bdd|len_:3039
msg: {[1d3a040]hejian|ex_:hello wolrd|data_:401bdd|len_:3039}

# ./high_glibc
./high_glibc: /usr/lib/x86_64-linux-gnu/libstdc++.so.6: version `GLIBCXX_3.4.21' not found (required by ./high_glibc)
```

```
[root@ubuntu0006:/media/hankin/vdb/study] #strings /usr/lib/x86_64-linux-gnu/libstdc++.so.6 | grep GLIBC
GLIBCXX_3.4
GLIBCXX_3.4.1
GLIBCXX_3.4.2
GLIBCXX_3.4.3
GLIBCXX_3.4.4
GLIBCXX_3.4.5
GLIBCXX_3.4.6
GLIBCXX_3.4.7
GLIBCXX_3.4.8
GLIBCXX_3.4.9
GLIBCXX_3.4.10
GLIBCXX_3.4.11
GLIBCXX_3.4.12
GLIBCXX_3.4.13
GLIBCXX_3.4.14
GLIBCXX_3.4.15
GLIBCXX_3.4.16
GLIBCXX_3.4.17
GLIBCXX_3.4.18
GLIBCXX_3.4.19
GLIBCXX_3.4.20
GLIBCXX_3.4.21
GLIBC_2.3
GLIBC_2.2.5
GLIBC_2.14
GLIBC_2.4
GLIBC_2.18
GLIBC_2.3.4
GLIBC_2.17
GLIBC_2.3.2
GLIBCXX_DEBUG_MESSAGE_LENGTH
[root@ubuntu0006:/media/hankin/vdb/study] #./low_glibc
[info] [73bc50]hejian|ex_:hello wolrd|data_:401bdd|len_:3039
[info] [73bc50]hejian|ex_:hello wolrd|data_:401bdd|len_:3039
msg: {[73bc50]hejian|ex_:hello wolrd|data_:401bdd|len_:3039}

[root@ubuntu0006:/media/hankin/vdb/study] #./high_glibc
[info] [8a2c20]hejian|ex_:hello wolrd|data_:401dd9|len_:3039
[info] [8a2c20]hejian|ex_:hello wolrd|data_:401dd9|len_:3039
msg: ▒0▒

```

gdb调试
打断点 b Object::Dump
运行   r
进入其他函数 s

代码见：D:\Github\Storage\c++\force_conversion

## 3、升级glibc
在 CentOS 系统中，可以使用以下命令来更新 glibc：
```
sudo yum update glibc
```
在 Debian 系统中，可以使用以下命令来更新 glibc：
```
sudo apt-get update
sudo apt-get install libc6
```
如果你想要更新到最新版本的 glibc，可以使用 Debian 的测试版本（testing）或不稳定版本（unstable）。

在 Debian 的测试版本中，可以使用以下命令来更新 glibc：
```
sudo apt-get update
sudo apt-get -t testing install libc6
```
在 Debian 的不稳定版本中，可以使用以下命令来更新 glibc：
```
sudo apt-get update
sudo apt-get -t unstable install libc6
```
更新 glibc 可能会对系统造成不可预知的影响，因此不建议直接更新 glibc。如果你确实需要更新 glibc，建议使用系统包管理器来更新，以确保更新过程正确无误。
在更新 glibc 之前，建议备份系统数据和重要文件，以免出现不可预知的问题。
