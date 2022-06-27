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

## 3、找到指定格式文件然后删除
find . -name *.pyc | xargs rm -rf

## 4、一个容易遗漏的操作细节
软连接指向文件夹时，使用find命令需要增加/符号。
```
[root@ubuntu0006:/home] #find /home/link -name test.log
[root@ubuntu0006:/home] #find /home/link/ -name test.log
/home/link/test.log
[root@ubuntu0006:/home] #ll
总用量 7332
drwxr-xr-x  5 root      root         4096 6月  20 14:54 ./
drwxr-xr-x 25 root      root         4096 6月   7 11:20 ../
-rw-r--r--  1 root      root       125983 6月  13 16:55 config.json
-rw-r--r--  1 root      root           17 6月  18 19:55 debug.log
-rw-r--r--  1 root      root       778240 6月  14 10:25 ff83de8c766fc0daa15e45bcbf961f64
lrwxrwxrwx  1 root      root           11 6月  20 14:54 link -> /home/test//
drwxr-xr-x  4 root      root         4096 5月   9  2018 network/
-rw-r-----  1 root      root       304976 6月  14 20:00 syslog
drwxr-xr-x  2 root      root         4096 6月  20 14:54 test/
[root@ubuntu0006:/home] #ll /home/test/
总用量 8
drwxr-xr-x 2 root root 4096 6月  20 14:54 ./
drwxr-xr-x 5 root root 4096 6月  20 14:54 ../
-rw-r--r-- 1 root root    0 6月  20 14:54 test.log
```

