# 学习Makefile

注意：头文件.h不需要编译。

cmake是用来生成Makefile文件的工具，生成Makefile文件的工具不止有cmake，还有autotools。Qt环境下还有qmake。

总结：makefile文件只会执行到第一步，如果第一步有准备文件，就去寻找，直到第一步完成。
必须要把格式写到位，不能光写一个g++ main.cpp -o main。

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
TARGET  = jsonttt
SRCS    = $(shell find -name "*.cpp")
SRCS    += $(shell find -name "*.c")
OBJS    = $(addsuffix .o,$(SRCS))
CFLAGS  = -g -Os
LDFLAGS = -lm

all: clean $(TARGET)
        ./$(TARGET)

$(TARGET):$(OBJS)
        $(CC) $(LDFLAGS) -o $@ $^ $(LIBS)

%.c.o:%.c
        $(CC) -c $(CFLAGS) -o $@ $<

%.cpp.o:%.cpp
        $(CC) -c $(CFLAGS) -o $@ $<

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

## 4、关于程序的编译和链接
https://seisman.github.io/how-to-write-makefile/overview.html

一般来说，无论是C还是C++，首先要把源文件编译成中间代码文件，在Windows下也就是 .obj 文件，UNIX下是 .o 文件，即Object File，这个动作叫做编译（compile）。然后再把大量的Object File合成执行文件，这个动作叫作链接（link）。

编译时，编译器需要的是语法的正确，函数与变量的声明的正确。对于后者，通常是你需要告诉编译器头文件的所在位置（头文件中应该只是声明，而定义应该放在C/C++文件中），只要所有的语法正确，编译器就可以编译出中间目标文件。一般来说，每个源文件都应该对应于一个中间目标文件（ .o 文件或 .obj 文件）。

链接时，主要是链接函数和全局变量。所以，我们可以使用这些中间目标文件（ .o 文件或 .obj 文件）来链接我们的应用程序。链接器并不管函数所在的源文件，只管函数的中间目标文件（Object File），在大多数时候，由于源文件太多，编译生成的中间目标文件太多，而在链接时需要明显地指出中间目标文件名，这对于编译很不方便。所以，我们要给中间目标文件打个包，在Windows下这种包叫“库文件”（Library File），也就是 .lib 文件，在UNIX下，是Archive File，也就是 .a 文件。

总结一下，源文件首先会生成中间目标文件，再由中间目标文件生成执行文件。在编译时，编译器只检测程序语法和函数、变量是否被声明。如果函数未被声明，编译器会给出一个警告，但可以生成Object File。而在链接程序时，链接器会在所有的Object File中找寻函数的实现，如果找不到，那到就会报链接错误码（Linker Error），在VC下，这种错误一般是： Link 2001错误 ，意思说是说，链接器未能找到函数的实现。你需要指定函数的Object File。

## 5、智能的编译规则
如果这个工程没有编译过，那么我们的所有c文件都要编译并被链接。
如果这个工程的某几个c文件被修改，那么我们只编译被修改的c文件，并链接目标程序。
如果这个工程的头文件被改变了，那么我们需要编译引用了这几个头文件的c文件，并链接目标程序。

## 6、大坑
由于修改了vim的tab键转换为4个空格的设置，导致makefile文件无法进行缩进，必须要tab。
去掉/etc/vim/vimrc     expandtab

## 7、Linux之Makefile（addsuffix）
函数名称：加后缀函数—addsuffix。 
函数功能：为“NAMES…”中的每一个文件名添加后缀“SUFFIX”。参数“NAMES…”
为空格分割的文件名序列，将“SUFFIX”追加到此序列的每一个文件名
的末尾。 
返回值：以单空格分割的添加了后缀“SUFFIX”的文件名序列。 
函数说明： 
示例： 
$(addsuffix .c,foo bar) 
 
返回值为“foo.c bar.c”

## 8、make工作流程
在默认的方式下，也就是我们只输入 make 命令。那么，

- make会在当前目录下找名字叫“Makefile”或“makefile”的文件。
- 如果找到，它会找文件中的第一个目标文件（target），在上面的例子中，他会找到“edit”这个文件，并把这个文件作为最终的目标文件。
- 如果edit文件不存在，或是edit所依赖的后面的 .o 文件的文件修改时间要比 edit 这个文件新，那么，他就会执行后面所定义的命令来生成 edit 这个文件。
- 如果 edit 所依赖的 .o 文件也不存在，那么make会在当前文件中找目标为 .o 文件的依赖性，如果找到则再根据那一个规则生成 .o 文件。（这有点像一个堆栈的过程）
- 当然，你的C文件和H文件是存在的啦，于是make会生成 .o 文件，然后再用 .o 文件生成make的终极任务，也就是执行文件 edit 了。

## 9、编译so文件并使用
https://blog.csdn.net/qq_33832591/article/details/52288255

## 10、“#ifdef __cplusplus extern "C" { #endif”的定义
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


















































