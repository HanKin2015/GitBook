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

### 3-1、automake.ac和automake.in的区别
老版本autoconf支持automake.in,不过现在尽量首选使用automake.ac.
如果用automake.in 容易和autoheader 产生的config.h.in产生扩展名冲突,因为.in文件是configure要处理的文件.
并且如果用automake.in  会出现警告：aclocal: warning: autoconf input should be named 'configure.ac', not 'configure.in'

自动生成Makefile的工具来生成Makefile的过程中，需要用autoscan命令来生成configure.scan文件，然后将它改名字为configure.ac或者configure.in,然后就来更改其中的一些相关信息来完成下面需要完成的配置，那么这个configure.ac怎么来写？今天我们就将这个过程分开来和大家共同研究和探讨下。

我们在生成的过程中会用autoconf命令来处理configure.ac/configure.in文件，生成一个configure的脚本。生成后的configure文件是一个可以移植的shell脚本，运行的时候它检查编译环境，来决定哪些库是可以用的，所用到的平台有哪些个特征，那些个头文件和库是已经找到的等等， 然后收集到的这些信息，它修改编译标记，生成一个Makefile文件，同时生成一个包含已定义的预处理符号的config.h文件。configure并不需要运行autoconf，所以我们在发布应用程序之前生成这个文件，如此我们就不必有autoconf的软件包了。
缺少命令请安装：autoconf-2.68.tar.bz2、automake-1.11.1.tar.bz2、m4-1.4.14.tar.bz2
修改c++编译标准只能在makefile里面 gcc -std=c99 -o xx xx.c 

### 3-2、autoconf和automake的区别
autoconf 和 automake 是 GNU 工具链中的两个工具，它们都用于自动化软件包的构建和安装过程，但它们的作用不同。
- 编写 configure.ac 文件：configure.ac 文件是 autoconf 工具使用的输入文件，用于描述如何检测和配置软件包的编译和安装过程。该文件通常包含了检测系统特性和限制的宏定义、检测库和工具的宏定义、定义编译选项和链接选项的宏定义等。
- 编写 Makefile.am 文件：Makefile.am 文件是 automake 工具使用的输入文件，用于描述如何构建和安装软件包。该文件通常包含了软件包的源代码文件、头文件、编译选项、链接选项、可执行文件、静态库、共享库等目标的规则，以及安装目标的规则。
- 生成 configure 脚本：使用 autoconf 工具生成 configure 脚本，该脚本可以根据当前系统的环境和特性，自动检测和配置软件包的编译和安装过程。
- 生成 Makefile.in 文件：使用 automake 工具生成 Makefile.in 文件，该文件包含了编译和安装软件包所需的规则和指令。
- 生成 Makefile 文件：使用 configure 脚本生成 Makefile 文件，该文件包含了编译和安装软件包所需的详细指令。
- 编译和安装软件包：使用 make 命令编译软件包，使用 make install 命令安装软件包。

总的来说，autoconf 和 automake 工具的使用可以大大简化软件包的构建和安装过程，提高软件开发的效率。

### 3-3、autoconf和automake的实战
D:\Github\Storage\c++\makefile\autoconf_automake

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
$(addsuffix .c, foo bar)

返回值为“foo.c bar.c”

## 6、编译so文件并使用

### 6-1、# 动态调用链接
[-Wl,-export-dynamic参数](https://blog.csdn.net/zhensansan/article/details/104590688)

### 6-2、示例实战
代码地址：D:\Github\Storage\c++\dynamic
```
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #make
gcc -fPIC -c main.c -o main.o
gcc -fPIC -c lib_so1.c -o lib_so1.o
gcc -shared -o lib_so1.so lib_so1.o
gcc -o main main.o -ldl
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #./main
lib_so1.c[6]:fun_so
./main: symbol lookup error: ./lib_so1.so: undefined symbol: fun
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #ldd main
        linux-vdso.so.1 =>  (0x00007fffed3df000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007fa3b0d85000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fa3b09bb000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fa3b0f89000)
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #readelf -sD main
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #gcc -o main main.o -ldl -Wl,-export-dynamic
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #./main
lib_so1.c[6]:fun_so
main.c[8]:fun
in main
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #readelf -sD main

Symbol table of `.gnu.hash' for image:
  Num Buc:    Value          Size   Type   Bind Vis      Ndx Name
   11   0: 0000000000601058     0 NOTYPE  GLOBAL DEFAULT  25 _edata
   12   0: 0000000000601048     0 NOTYPE  GLOBAL DEFAULT  25 __data_start
   13   0: 0000000000601060     0 NOTYPE  GLOBAL DEFAULT  26 _end
   14   1: 0000000000601048     0 NOTYPE  WEAK   DEFAULT  25 data_start
   15   1: 0000000000400a20     4 OBJECT  GLOBAL DEFAULT  16 _IO_stdin_used
   16   1: 00000000004009a0   101 FUNC    GLOBAL DEFAULT  14 __libc_csu_init
   17   1: 0000000000400800    42 FUNC    GLOBAL DEFAULT  14 _start
   18   1: 0000000000601058     0 NOTYPE  GLOBAL DEFAULT  26 __bss_start
   19   1: 0000000000400931   108 FUNC    GLOBAL DEFAULT  14 main
   20   1: 0000000000400758     0 FUNC    GLOBAL DEFAULT  11 _init
   21   2: 0000000000400a10     2 FUNC    GLOBAL DEFAULT  14 __libc_csu_fini
   22   2: 0000000000400a14     0 FUNC    GLOBAL DEFAULT  15 _fini
   23   2: 00000000004008f6    59 FUNC    GLOBAL DEFAULT  14 fun
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #
```

### 6-3、SO文件的编写，编译，使用方法
https://blog.csdn.net/qq_33832591/article/details/52288255

- linux下的.so文件为共享库，相当于windows下的dll文件。在系统目录/usr/lib/下，我们可以看到很多应用程序库文件（常用的动态链接库和软件包的配置文件）
- SO文件没有main
- 编译时gcc后加-fPIC，这可以使gcc产生于位置无关的代码
- 连接时，使用-shared，指示生成一个共享库文件
- 共享库文件一lib开头+扩展名.so

实战见：D:\Github\Storage\c++\dynamic\SO文件的编写编译使用
```
[root@ubuntu0006:~/hh] #make
gcc -Wall -g -fPIC -o libtest.o -c libtest.c
gcc -shared -o  libtest.so libtest.o
[root@ubuntu0006:~/hh] #readelf -a libtest.so | grep SONAME
[root@ubuntu0006:~/hh] #make
g++ -o main main.o -L../SO文件编译 -ltest
[root@ubuntu0006:~/hh] #./main
max=5
add=9
```
可以执行export LD_LIBRARY_PATH=LDLIBRARYPATH:.是为了，调用.so文件时候于.so文件位置无关。

## 7、“#ifdef __cplusplus extern "C" { #endif”的定义
有意思：https://www.cnblogs.com/nx520zj/p/5920782.html

主要作用：为了在C++代码中调用用C写成的库文件，就需要用extern"C"来告诉编译器:这是一个用C写成的库文件，请用C的方式来链接它们。
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

## 13、系统学习Makefile

学习网站：https://seisman.github.io/how-to-write-makefile/overview.html

### 13-1、关于程序的编译和链接
一般来说，无论是C还是C++，首先要把源文件编译成中间代码文件，在Windows下也就是 .obj 文件，UNIX下是 .o 文件，即Object File，这个动作叫做编译（compile）。然后再把大量的Object File合成执行文件，这个动作叫作链接（link）。

编译时，编译器需要的是语法的正确，函数与变量的声明的正确。对于后者，通常是你需要告诉编译器头文件的所在位置（头文件中应该只是声明，而定义应该放在C/C++文件中），只要所有的语法正确，编译器就可以编译出中间目标文件。一般来说，每个源文件都应该对应于一个中间目标文件（ .o 文件或 .obj 文件）。

链接时，主要是链接函数和全局变量。所以，我们可以使用这些中间目标文件（ .o 文件或 .obj 文件）来链接我们的应用程序。链接器并不管函数所在的源文件，只管函数的中间目标文件（Object File），在大多数时候，由于源文件太多，编译生成的中间目标文件太多，而在链接时需要明显地指出中间目标文件名，这对于编译很不方便。所以，我们要给中间目标文件打个包，在Windows下这种包叫“库文件”（Library File），也就是 .lib 文件，在UNIX下，是Archive File，也就是 .a 文件。

总结一下，源文件首先会生成中间目标文件，再由中间目标文件生成执行文件。在编译时，编译器只检测程序语法和函数、变量是否被声明。如果函数未被声明，编译器会给出一个警告，但可以生成Object File。而在链接程序时，链接器会在所有的Object File中找寻函数的实现，如果找不到，那到就会报链接错误码（Linker Error），在VC下，这种错误一般是： Link 2001错误 ，意思说是说，链接器未能找到函数的实现。你需要指定函数的Object File。

### 13-2、智能的编译规则
如果这个工程没有编译过，那么我们的所有c文件都要编译并被链接。
如果这个工程的某几个c文件被修改，那么我们只编译被修改的c文件，并链接目标程序。
如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的c文件，并链接目标程序。

### 13-3、make工作流程
在默认的方式下，也就是我们只输入 make 命令。那么，

- make会在当前目录下找名字叫“Makefile”或“makefile”的文件。
- 如果找到，它会找文件中的第一个目标文件（target），在上面的例子中，他会找到“edit”这个文件，并把这个文件作为最终的目标文件。
- 如果edit文件不存在，或是edit所依赖的后面的 .o 文件的文件修改时间要比 edit 这个文件新，那么，他就会执行后面所定义的命令来生成 edit 这个文件。
- 如果 edit 所依赖的 .o 文件也不存在，那么make会在当前文件中找目标为 .o 文件的依赖性，如果找到则再根据那一个规则生成 .o 文件。（这有点像一个堆栈的过程）
- 当然，你的C文件和H文件是存在的啦，于是make会生成 .o 文件，然后再用 .o 文件生成make的终极任务，也就是执行文件 edit 了。

### 13-4、让make自动推导
GNU的make很强大，它可以自动推导文件以及文件依赖关系后面的命令，于是我们就没必要去在每一个 .o 文件后都写上类似的命令，因为，我们的make会自动识别，并自己推导命令。

只要make看到一个 .o 文件，它就会自动的把 .c 文件加在依赖关系中，如果make找到一个 whatever.o ，那么 whatever.c 就会是 whatever.o 的依赖文件。并且 cc -c whatever.c 也会被推导出来，于是，我们的makefile再也不用写得这么复杂。我们的新makefile又出炉了。
```
objects = main.o kbd.o command.o display.o \
    insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

main.o : defs.h
kbd.o : defs.h command.h
command.o : defs.h command.h
display.o : defs.h buffer.h
insert.o : defs.h buffer.h
search.o : defs.h buffer.h
files.o : defs.h buffer.h command.h
utils.o : defs.h

.PHONY : clean
clean :
    rm edit $(objects)
```
这种方法，也就是make的“隐晦规则”。上面文件内容中， .PHONY 表示 clean 是个伪目标文件。

```
不喜欢这种风格的，一是文件的依赖关系看不清楚，二是如果文件一多，要加入几个新的 .o 文件，那就理不清楚了。
objects = main.o kbd.o command.o display.o \
    insert.o search.o files.o utils.o

edit : $(objects)
    cc -o edit $(objects)

$(objects) : defs.h
kbd.o command.o files.o : command.h
display.o insert.o search.o files.o : buffer.h

.PHONY : clean
clean :
    rm edit $(objects)
	
	
	
clean:
    rm edit $(objects)
更为稳健的做法是：

.PHONY : clean
clean :
    -rm edit $(objects)
前面说过， .PHONY 表示 clean 是一个“伪目标”。而在 rm 命令前面加了一个小减号的意思就是，也许某些文件出现问题，但不要管，继续做后面的事。
```
Makefile中只有行注释，和UNIX的Shell脚本一样，其注释是用 # 字符。

### 13-5、Makefile的文件名
默认的情况下，make命令会在当前目录下按顺序找寻文件名为“GNUmakefile”、“makefile”、“Makefile”的文件，找到了解释这个文件。在这三个文件名中，最好使用“Makefile”这个文件名，因为，这个文件名第一个字符为大写，这样有一种显目的感觉。最好不要用“GNUmakefile”，这个文件是GNU的make识别的。有另外一些make只对全小写的“makefile”文件名敏感，但是基本上来说，大多数的make都支持“makefile”和“Makefile”这两种默认文件名。

当然，你可以使用别的文件名来书写Makefile，比如：“Make.Linux”，“Make.Solaris”，“Make.AIX”等，如果要指定特定的Makefile，你可以使用make的 -f 和 --file 参数，如： make -f Make.Linux 或 make --file Make.AIX 。

如果你的当前环境中定义了环境变量 MAKEFILES ，那么，make会把这个变量中的值做一个类似于 include 的动作。有时候你的Makefile出现了怪事，那么你可以看看当前环境中有没有定义这个变量。

### 13-6、书写规则
规则包含两个部分，一个是依赖关系，一个是生成目标的方法。

在Makefile中，规则的顺序是很重要的，因为，Makefile中只应该有一个最终目标，其它的目标都是被这个目标所连带出来的，所以一定要让make知道你的最终目标是什么。一般来说，定义在Makefile中的目标可能会有很多，但是第一条规则中的目标将被确立为最终的目标。如果第一条规则中的目标有很多个，那么，第一个目标会成为最终的目标。make所完成的也就是这个目标。
```
targets : prerequisites ; command
    command
    ...
```
command是命令行，如果其不与“target:prerequisites”在一行，那么，必须以 Tab 键开头，如果和prerequisites在一行，那么可以用分号做为分隔。

### 13-7、在规则中使用通配符
如果我们想定义一系列比较类似的文件，我们很自然地就想起使用通配符。make支持三个通配符： ```* ， ? 和 ~ 。这是和Unix的B-Shell是相同的。```

波浪号（ ~ ）字符在文件名中也有比较特殊的用途。如果是 ~/test ，这就表示当前用户的 $HOME 目录下的test目录。而 ~hchen/test 则表示用户hchen的宿主目录下的test 目录。（这些都是Unix下的小知识了，make也支持）而在Windows或是 MS-DOS下，用户没有宿主目录，那么波浪号所指的目录则根据环境变量“HOME”而定。

有时间继续学习：https://seisman.github.io/how-to-write-makefile/rules.html

## 14、一些通用的Makefile文件模板
https://mp.weixin.qq.com/s/1nXoEcdURd5EUWo4fb_Umg




