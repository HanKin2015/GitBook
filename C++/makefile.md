# 学习Makefile

注意：头文件.h不需要编译。

cmake是用来生成Makefile文件的工具，生成Makefile文件的工具不止有cmake，还有autotools。Qt环境下还有qmake。

总结：makefile文件只会执行到第一步，如果第一步有准备文件，就去寻找，直到第一步完成。
必须要把格式写到位，不能光写一个g++ main.cpp -o main。

-c和-o都是gcc编译器的可选参数。-c表示只编译(compile)源文件但不链接，会把.c或.cc的c源程序编译成目标文件，一般是.o文件。-o用于指定输出(out)文件名。不用-o的话，一般会在当前文件夹下生成默认的a.out文件作为可执行程序。

## 1、示例
写了一个client.cpp和server.cpp
我想生成两个文件，可以这样写：

```
all: server

server: client server.cpp
        g++ server.cpp -o server

client: client.cpp
        g++ client.cpp -o client

```

如果想生成一个文件，可以这样写：
```
all: main

main: client.o server.o
		g++ client.o server.o -o main
		
server: server.cpp
        g++ server.cpp -o server.o

client: client.cpp
        g++ client.cpp -o client.o
```

## 2、万能模板
```
CC      = gcc
CPP     = g++
TARGET  = handle_udev_info
SRCS    = $(shell find . -maxdepth 1 -name "*.cpp")
SRCS    += $(shell find . -maxdepth 1 -name "*.c")
SRCS    += $(shell find ./third_library/cjson -maxdepth 1 -name "*.c")
SRCS    += $(shell find ./third_library/zlib -maxdepth 1 -name "*.c")
OBJS    = $(addsuffix .o,$(SRCS))
CFLAGS  = -g -Os
CPPFLAGS= -g -Os -std=c++11
LDFLAGS = -lm
INCLUDE = -I./third_library/cjson -I./third_library/zlib -I./third_library/cmdline
LIBS	= -L./third_library/zlib -lz -lpthread

all: clean $(TARGET)
	./$(TARGET)

$(TARGET):$(OBJS)
	$(CPP) $(LDFLAGS) -o $@ $^ $(INCLUDE) $(LIBS) 

%.c.o:%.c
	$(CC) -c $(CFLAGS) -o $@ $< $(INCLUDE) $(LIBS) 

%.cpp.o:%.cpp
	$(CPP) -c $(CPPFLAGS) -o $@ $< $(INCLUDE) $(LIBS) 

clean:
	rm -rf $(TARGET) *.o
```

## 3、自动生成makefile文件

### automake.ac 和automake.in的区别
老版本autoconf支持automake.in,不过现在尽量首选使用automake.ac.
如果用automake.in 容易和autoheader 产生的config.h.in产生扩展名冲突,因为.in文件是configure要处理的文件.
并且如果用automake.in  会出现警告：aclocal: warning: autoconf input should be named 'configure.ac', not 'configure.in'

自动生成Makefile的工具来生成Makefile的过程中，需要用autoscan命令来生成configure.scan文件，然后将它改名字为configure.ac或者configure.in,然后就来更改其中的一些相关信息来完成下面需要完成的配置，那么这个configure.ac怎么来写？今天我们就将这个过程分开来和大家共同研究和探讨下。

我们在生成的过程中会用autoconf命令来处理configure.ac/configure.in文件，生成一个configure的脚本。生成后的configure文件是一个可以移植的shell脚本，运行的时候它检查编译环境，来决定哪些库是可以用的，所用到的平台有哪些个特征，那些个头文件和库是已经找到的等等， 然后收集到的这些信息，它修改编译标记，生成一个Makefile文件，同时生成一个包含已定义的预处理符号的config.h文件。configure并不需要运行autoconf，所以我们在发布应用程序之前生成这个文件，如此我们就不必有autoconf的软件包了。

缺少命令：autoconf-2.68.tar.bz2、automake-1.11.1.tar.bz2、m4-1.4.14.tar.bz2


修改c++编译标准只能在makefile里面 gcc -std=c99 -o xx xx.c 

## 4、大坑
由于修改了vim的tab键转换为4个空格的设置，导致makefile文件无法进行缩进，必须要tab。
去掉/etc/vim/vimrc     expandtab

## 5、Linux之Makefile（addsuffix）
函数名称：加后缀函数—addsuffix。 
函数功能：为“NAMES…”中的每一个文件名添加后缀“SUFFIX”。参数“NAMES…”
为空格分割的文件名序列，将“SUFFIX”追加到此序列的每一个文件名
的末尾。 
返回值：以单空格分割的添加了后缀“SUFFIX”的文件名序列。 
函数说明： 
示例： 
$(addsuffix .c,foo bar) 
 
返回值为“foo.c bar.c”

## 6、编译so文件并使用
https://blog.csdn.net/qq_33832591/article/details/52288255

## 7、“#ifdef __cplusplus extern "C" { #endif”的定义
有意思：https://www.cnblogs.com/nx520zj/p/5920782.html

主要作用：
为了在C++代码中调用用C写成的库文件，就需要用extern"C"来告诉编译器:这是一个用C写成的库文件，请用C的方式来链接它们。

原因：C++支持函数重载，而C是不支持函数重载的，两者语言的编译规则不一样。编译器对函数名的处理方法也不一样。

可能在C++编译之后会产生_func_int_int之类的名字，因为C++支持重载。而C编译之后，可能为_func。

关键字：extern "C" 表示编译生成的内部符号名使用C约定。

```
#ifdef  __cplusplus
extern "C" {
#endif

// 代码

#ifdef  __cplusplus
}
#endif
```

## 8、cc命令
实际上cc和gcc等价，都是指向同一个命令。
使用realpath可以解开真面目。



## 9、编译优化选项
-O0: 无优化。

-O和-O1: 使用能减少目标代码尺寸以及执行时间并且不会使编译时间明显增加的优化。在编译大型程序的时候会显著增加编译时内存的使用。

-O2: 包含-O1的优化并增加了不需要在目标文件大小和执行速度上进行折衷的优化。编译器不执行循环展开以及函数内联。此选项将增加编译时间和目标文件的执行性能。

-Os: 可以看成 -O2.5，专门优化目标文件大小，执行所有的不增加目标文件大小的-O2优化选项，并且执行专门减小目标文件大小的优化选项。适用于磁盘空间紧张时使用。但有可能有未知的问题发生，况且目前硬盘容量很大，常用程序无必要使用。

-O3: 打开所有 -O2 的优化选项外增加 -finline-functions、-funswitch-loops、-fgcse-after-reload 优化选项。相对于 -O2 性能并未有较多提高，编译时间也最长，生成的目标文件也更大更占内存，有时性能不增反而降低，甚至产生不可预知的问题(包括错误)，所以并不被大多数软件安装推荐，除非有绝对把握方可使用此优化级别。

## 10、自动生成Makefile的配置修改
如下文件autogen.sh，调用configure文件生成Makefile。

需求就是需要链接修改的第三方头文件以及生成的so库。
```
#!/bin/sh

PWD_PATH=`pwd`
export LIBUSB_CFLAGS=-I$PWD_PATH/../libusb-1.0.19/libusb/
export LIBUSB_LIBS="-L$PWD_PATH/../libusb-1.0.19/libusb/.libs/ -lusb-1.0"
autoreconf -fi
if [ -z "$NOCONFIGURE" ]; then
        chmod 777 ./configure
    ./configure $@
fi
```

## 11、makefile将相对路径转换为绝对路径
1. realpath 函数获取文件名序列中存在的文件和目录的真实路径，会判断文件和目录是否存在，如果不存在，则返回空。
2. abspath 函数获取文件名序列中存在的文件和目录的真实路径，函数不会检查文件或者目录是否存在。

realpath abspath 都能跨过软链接，获取文件的真实路径。

## 12、二进制文件删除后重新编译会是同一个文件，即md5值不变
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #gcc helloworld.c
[root@ubuntu0006:/media/hankin/vdb/study/udev] #md5sum a.out
e9d9cec2d13a5df0fe30cbe3802b1021  a.out
[root@ubuntu0006:/media/hankin/vdb/study/udev] #rm a.out
[root@ubuntu0006:/media/hankin/vdb/study/udev] #gcc helloworld.c
[root@ubuntu0006:/media/hankin/vdb/study/udev] #md5sum a.out
e9d9cec2d13a5df0fe30cbe3802b1021  a.out
[root@ubuntu0006:/media/hankin/vdb/study/udev] #g++ helloworld.c
[root@ubuntu0006:/media/hankin/vdb/study/udev] #md5sum a.out
e9d9cec2d13a5df0fe30cbe3802b1021  a.out
[root@ubuntu0006:/media/hankin/vdb/study/udev] #g++ helloworld.c -std=c++17
[root@ubuntu0006:/media/hankin/vdb/study/udev] #md5sum a.out
e9d9cec2d13a5df0fe30cbe3802b1021  a.out
```
























