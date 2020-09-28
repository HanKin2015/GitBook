# 学习Makefile

注意：头文件.h不需要编译。

cmake是用来生成Makefile文件的工具，生成Makefile文件的工具不止有cmake，还有autotools。Qt环境下还有qmake。

总结：makefile文件只会执行到第一步，如果第一步有准备文件，就去寻找，直到第一步完成。
必须要把格式写到位，不能光写一个g++ main.cpp -o main。

## 示例
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

## 模板
