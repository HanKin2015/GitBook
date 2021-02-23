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

## 2、模板

## 3、自动生成makefile文件

### automake.ac 和automake.in的区别
老版本autoconf支持automake.in,不过现在尽量首选使用automake.ac.
如果用automake.in 容易和autoheader 产生的config.h.in产生扩展名冲突,因为.in文件是configure要处理的文件.
并且如果用automake.in  会出现警告：aclocal: warning: autoconf input should be named 'configure.ac', not 'configure.in'

自动生成Makefile的工具来生成Makefile的过程中，需要用autoscan命令来生成configure.scan文件，然后将它改名字为configure.ac或者configure.in,然后就来更改其中的一些相关信息来完成下面需要完成的配置，那么这个configure.ac怎么来写？今天我们就将这个过程分开来和大家共同研究和探讨下。

我们在生成的过程中会用autoconf命令来处理configure.ac/configure.in文件，生成一个configure的脚本。生成后的configure文件是一个可以移植的shell脚本，运行的时候它检查编译环境，来决定哪些库是可以用的，所用到的平台有哪些个特征，那些个头文件和库是已经找到的等等， 然后收集到的这些信息，它修改编译标记，生成一个Makefile文件，同时生成一个包含已定义的预处理符号的config.h文件。configure并不需要运行autoconf，所以我们在发布应用程序之前生成这个文件，如此我们就不必有autoconf的软件包了。

缺少命令：autoconf-2.68.tar.bz2、automake-1.11.1.tar.bz2、m4-1.4.14.tar.bz2


