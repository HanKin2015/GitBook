# find命令

## 1、模糊匹配需要转义字符
发现一个奇怪的现象，在git bash窗口操作如下：

```
Administrator@WINedr-VDI0027 MINGW64 /d/Github/Storage/linux (master)
$ find . -name *str*.*
./stream
./stream/IO_stream.cpp
./stream/IO_stream.exe
./stream/IO_stream.o
./study/str.cpp
./study/strstr.cpp
./study/struct.cpp
./study/struct_para.c
./study/struct_para.cpp
./study/study_strlen_sizeof.cpp
./study/study_strncat.cpp
./study/test_strcmp.cpp

Administrator@WINedr-VDI0027 MINGW64 /d/Github/Storage/linux (master)
$ find . -name *str*
./stream

Administrator@WINedr-VDI0027 MINGW64 /d/Github/Storage/linux (master)
$ find . -name \*str\*
./stream
./stream/IO_stream.cpp
./stream/IO_stream.exe
./stream/IO_stream.o
./study/str.cpp
./study/strstr.cpp
./study/struct.cpp
./study/struct_para.c
./study/struct_para.cpp
./study/study_strlen_sizeof.cpp
./study/study_strncat.cpp
./study/test_strcmp.cpp

Administrator@WINedr-VDI0027 MINGW64 /d/Github/Storage/linux (master)
$ find . -name "*str*"
./stream
./stream/IO_stream.cpp
./stream/IO_stream.exe
./stream/IO_stream.o
./study/str.cpp
./study/strstr.cpp
./study/struct.cpp
./study/struct_para.c
./study/struct_para.cpp
./study/study_strlen_sizeof.cpp
./study/study_strncat.cpp
./study/test_strcmp.cpp
```

在linux环境才找到了答案：
```
[root@ubuntu0006:/media/hankin/vdb/vdi-linux-client/src/vdi_session/spice-0.12.5/client] (master) #find -name *zlib*
find: 路径必须在表达式之前: zlib_decoder.h
用法: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec|time] [path...] [expression]

然后百度就找到了答案: https://www.cnblogs.com/veins/p/4134450.html
百度“find: 路径必须在表达式之前”就会发现需要转义，一般来说是使用双引号。
```

## 2、高级查找
不递归查找：find . -maxdepth 1 -name "*.txt"

查找大小为0的文件：find . -name "*" -type f -size 0c

将当前目录及其子目录中的所有文件列出：find . -type f

将当前目录及其子目录下所有最近 20 天内更新过的文件列出: # find . -ctime  20

https://www.runoob.com/linux/linux-comm-find.html





