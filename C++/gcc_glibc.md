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

## 4、奇怪的打印输出

### 4-1、背景
我在一个编译环境编译了一个二进制文件（输出hello mips），结果在工作环境运行输出两边hello mips，并且末尾存在乱码：
```
test@test-PC:/tmp$ ./out
hello mips
hello mips
▒test@test-PC:/tmp$
```
使用std::out输出同样存在问题，但是输出到文件没有问题fprintf函数。
禁用优化不行g++ -O0 t.cpp -o test。
至于ABI版本不同，确实也可能有这个原因，感觉可能性不大。

### 4-2、没有gdb、strace、ltrace命令查看文件依赖
无法使用ldd命令，报错：
```
test@test-PC:/tmp$ ldd out
        不是动态可执行文件
test@test-PC:/tmp$ readelf -h out
ELF 头：
  Magic：  7f 45 4c 46 02 01 01 00 05 00 00 00 00 00 00 00
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          5
  类型:                              DYN (共享目标文件)
  系统架构:                          MIPS R3000
  版本:                              0x1
  入口点地址：              0xbf0
  程序头起点：              64 (bytes into file)
  Start of section headers:          4736 (bytes into file)
  标志：             0x80000007, noreorder, pic, cpic, mips64r2
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         10
  节头大小：         64 (字节)
  节头数量：         34
  字符串表索引节头： 32
test@test-PC:/tmp$ file out
out: ELF 64-bit LSB pie executable, MIPS, MIPS64 rel2 version 1 (SYSV), dynamically linked, interpreter /lib64/ld.so.1, BuildID[sha1]=81ba39cd4eeba939a448f79111690c64724f01a4, for GNU/Linux 3.2.0, not stripped
```
通过对比工作环境编译出文件，编译的时候通过设置成g++ -o your_program your_source_code.cpp -no-pie后就完全变成一样的文件了，结果运行还是异常，并且还是无法使用ldd命令，同样的报错。

```
readelf -d f
objdump -x f
```

### 4-3、工作环境只有gcc无g++
在工作环境编译了一个hello world文件后，进行打包到deb文件中并安装，运行无问题。并且可以使用ldd命令。
```
test@test-PC:/tmp$ strings ccc | grep LIB
GLIBC_2.0
GLIBC_2.2
__cxa_finalize@@GLIBC_2.2
puts@@GLIBC_2.0
__libc_start_main@@GLIBC_2.0
test@test-PC:/tmp$ ./ccc
hello
hello
▒9test@test-PC:/tmp$ ./hello
hello world!
test@test-PC:/tmp$ strings hello | grep LIB
GLIBC_2.0
puts@@GLIBC_2.0
__libc_start_main@@GLIBC_2.0
```

### 4-4、编译成静态文件正常运行
问题就是文件变大了，也说明了就可能是环境中的一些依赖库版本不同导致了这个问题。
真相了，后面使用了docker环境就没有这个问题了，啥子问题都没有了。
```
test@test-PC:/tmp$ file ss
ss: ELF 64-bit LSB executable, MIPS, MIPS64 rel2 version 1 (SYSV), statically linked, BuildID[sha1]=5d9e0449a849c77dda8e101bfd1d8de41942f05d, for GNU/Linux 3.2.0, not stripped
test@test-PC:/tmp$ ./ss
hello static
test@test-PC:/tmp$ ll -h ss
-rwxr-xr-x 1 root root 2.3M 1月  16 10:01 ss
test@test-PC:/tmp$ ll -h hello
-rwxr-xr-x 1 root root 17K 1月  16 10:01 hello
```

### 4-5、看汇编
```
gcc -S xxx.c    会生成一个xxx.s文件
objdump -d hello
objdump -d hello > assembly_code.asm
readelf -a hello
```

### 4-6、文件类型为DYN和EXEC区别
在 ELF（Executable and Linkable Format）文件格式中，DYN（动态库）和 EXEC（可执行文件）是两种不同类型的文件。它们的主要区别在于它们的用途和加载方式。

EXEC（可执行文件）：
- 文件类型 EXEC 表示这是一个可执行文件。
- 可执行文件包含了程序运行所需的所有代码和数据，以及程序入口点的信息。
- 当你运行一个程序时，操作系统会加载这个可执行文件到内存中，并从定义的入口点开始执行。
- 可执行文件通常是独立的，它们可能链接了静态库（编译时直接包含在文件中）或动态库（运行时加载）。

DYN（动态库，也称为共享对象）：
- 文件类型 DYN 表示这是一个动态库（在 Windows 上称为 DLL，动态链接库）。
- 动态库包含了可以被多个程序共享的代码和数据。
- 动态库不是独立运行的程序，它们没有定义程序入口点。
- 当一个或多个程序运行时，它们可以共享同一个动态库的副本，节省内存并减少冗余。
- 动态库在程序运行时被加载，操作系统或运行时链接器（如 Linux 上的 ld.so）负责解析程序对动态库函数和数据的引用。

ELF 64-bit LSB pie executable：
- PIE 表示这个可执行文件是位置无关的，它在编译时使用了 -fPIE 或 -fPIC 选项（对于 GCC 或 Clang 编译器）。
- 位置无关的可执行文件可以在内存中的任意位置加载和运行，这是通过在运行时对程序内部引用进行重定位来实现的。
- 启用 PIE 的主要好处是提高了安全性，特别是与地址空间布局随机化（ASLR）技术结合使用时，可以有效防止某些类型的安全攻击，如缓冲区溢出攻击。
- LSB 表示“最低有效字节优先”（Little-Endian），这是一种字节序，指的是在内存中，较低有效字节在较低的地址。

### 4-7、生成静态文件
```
g++ -shared -fPIC source_file.cpp -o libname.so
g++ -static source_file.cpp -o executable_name
gcc -fPIC -c your_source_code.c
gcc -o your_program your_source_code.o -L/path/to/library -lshared_library_name
gcc -o your_program your_source_code.c -Wl,-Bdynamic
gcc -o your_program your_source_code.c -no-pie
echo $CFLAGS
echo $CXXFLAGS
echo $LDFLAGS
```

### 4-8、最佳解决方案
静态文件增大不可取，另外将日志写入文件中更利于后面的排查。
因此选择打印到文件中，可以选择使用动态调整选择打印到窗口还是文件中，还是同时。

老规矩使用文件进行判断打印到窗口还是文件（默认文件）
使用文件判断是否删除日志文件（默认每次运行后就删除）

结果改成日志文件输出后存在其他问题，段错误了，跟踪到是libusb_init(&m_context);代码问题，以为是libusb库问题，然后使用工作环境的库编译还是存在问题，说明其他依赖库也是一个问题。
然后捉摸着，为何我生成的文件无法使用ldd命令查询依赖，把file命令查询的属性都弄成一致了：
```
a.out: ELF 64-bit LSB pie executable, MIPS, MIPS64 rel2 version 1 (SYSV), dynamically linked, interpreter /lib64/ld.so.1, BuildID[sha1]=470c6cfbb2e6bae0ac8d1abcac740192cd6d4c04, for GNU/Linux 3.2.0, with debug_info, not stripped

a.out: setuid ELF 64-bit LSB executable, MIPS, MIPS64 rel2 version 1 (SYSV), dynamically linked, interpreter /lib64/ld.so.1, BuildID[sha1]=470c6cfbb2e6bae0ac8d1abcac740192cd6d4c04, for GNU/Linux 3.2.0, stripped

strip a.out
chmod u+s a.out
gcc -g -no-pie l.c
```
结果都跟这些无关，还是无法使用ldd命令，最终发现docker环境，编译出来的文件就可以使用ldd命令查看依赖了，就是编译环境的问题，无语。那个printf函数打印两遍并存在乱码的问题也不存在了。

后面下载了gdb.deb安装包，gdb无法调试出这种问题，乱码属于正常执行，段错误提示是libc库问题。

感觉还是跟gcc版本有关吧：
```
docker环境：
root@d771cec23daf:/# gcc --version
gcc (Ubuntu 5.4.0-6kord1~16.04.4k2) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

编译环境：
root@hankin-pc:~/mips64# gcc --version
gcc (Debian 8.3.0-8.lnd.4) 8.3.0
Copyright © 2018 Free Software Foundation, Inc.
本程序是自由软件；请参看源代码的版权声明。本软件没有任何担保；
包括没有适销性和某一专用目的下的适用性担保。

工作环境：
test@test-PC:/tmp$ gcc --version
gcc (Uos 8.3.0.7-1+dde) 8.3.0
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```
只能版本低的编译适应高版本的运行环境。