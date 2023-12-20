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

find / -type d  # 查找目录文件
find / -type f  # 查找普通文件
find / -type l  # 查找链接文件
find / -type f |xargs rm -rf        # 利用管道作为参数删除
find / -type f -exec rm -rf {} ;    # ; 不能少, 前面空格不能少
rm -rf $(find / -type f)            # 查找结果直接以变量 删除
rm -rf `find / -type f`             # 同上做变量 删除
ps aux | grep sleep |grep -v grep |awk ‘{print $2}‘ |xargs kill -9
find -type f -size 1k   # k 是小写
find -size +1k          # 大于1k的文件
find -size -1M          # M是大写, 小于1M的文件
find -size -1G          # G是大写

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

## 5、# xargs命令

### 5-1、简介
xargs命令是一个非常有用的Linux命令，它可以将标准输入数据转换成命令行参数，使得命令可以处理更多的数据。xargs命令通常与其他命令一起使用，例如find、grep和rm等。

xargs命令的基本语法如下：
```
command | xargs [options] [command]
```
其中，command是要执行的命令，options是xargs命令的选项，command是要传递给command命令的参数。

xargs命令的常用选项包括：
```
-n：指定每次传递给command命令的参数个数；
-I：指定替换字符串，用于替换command命令中的参数；
-t：显示xargs命令执行的每个命令。
```

### 5-2、实战
例如，要在当前目录下查找所有扩展名为.txt的文件，并删除它们，可以使用以下命令：
```
find . -name "*.txt" | xargs rm
```
这个命令会将find命令查找到的所有.txt文件传递给xargs命令，然后xargs命令将这些文件名作为参数传递给rm命令，从而删除这些文件。

使用xargs命令会把前面命令的结果添加到后面命令的参数：
```
sudo pidof DisplayLinkManager | xargs sudo lsof -p  | grep -e REG -e CHR
```

## 6、find命令出现大量的错误
```
rk1314_64bit:/ # find / -name core-pattern
find: /proc/2/task/2/exe: No such file or directory
find: /proc/2/exe: No such file or directory
find: /proc/3/task/3/exe: No such file or directory
find: /proc/3/exe: No such file or directory
find: /proc/5/task/5/exe: No such file or directory
find: /proc/5/exe: No such file or directory

解决方法：
rk1314_64bit:/proc # find / -name "kmsg" 2>/dev/null
/sys/devices/virtual/mem/kmsg
/sys/class/mem/kmsg
/proc/kmsg
/dev/kmsg
```

## 7、查找文件后执行其他命令操作文件，如读取文件内容
```
这个命令会在当前目录及其子目录中查找文件名为"product"的文件，并使用cat命令来显示文件的内容。{}表示找到的文件名，\;表示命令的结束。
[root@ubuntu0006:/sys/devices] #find . -name product
./pci0000:00/0000:00:01.2/usb3/3-1/product
./pci0000:00/0000:00:18.0/usb4/product
./pci0000:00/0000:00:18.1/usb5/product
./pci0000:00/0000:00:18.2/usb6/product
./pci0000:00/0000:00:18.3/usb7/product
./pci0000:00/0000:00:18.4/usb8/product
./pci0000:00/0000:00:18.5/usb9/product
./pci0000:00/0000:00:18.7/usb1/product
./pci0000:00/0000:00:19.0/usb11/product
./pci0000:00/0000:00:19.0/usb12/product
./pci0000:00/0000:00:1d.0/usb10/product
./pci0000:00/0000:00:1d.7/usb2/product
./virtual/input/input24/id/product
./platform/i8042/serio0/input/input1/id/product
./platform/i8042/serio1/input/input3/id/product
./platform/i8042/serio1/input/input4/id/product
./LNXSYSTM:00/LNXPWRBN:00/input/input0/id/product
[root@ubuntu0006:/sys/devices] #find . -name product -exec cat {} \;
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
EHCI Host Controller
xHCI Host Controller
xHCI Host Controller
UHCI Host Controller
EHCI Host Controller
0000
0001
0013
0013
0001
[root@ubuntu0006:/sys/devices] #find . -name product | xargs cat
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
UHCI Host Controller
EHCI Host Controller
xHCI Host Controller
xHCI Host Controller
UHCI Host Controller
EHCI Host Controller
0000
0001
0013
0013
0001

如果有多个文件匹配到"product"，则会依次显示每个文件的内容。如果只想查看第一个匹配到的文件内容，可以使用-quit选项来终止find命令的执行
find . -name product -exec cat {} \; -quit

如果找到的文件名包含空格或特殊字符，上述命令可能会出现问题。为了处理这种情况，可以使用-print0选项和-0选项来确保文件名以空字符分隔
find . -name product -print0 | xargs -0 cat
这样，find命令的输出将以空字符分隔，并传递给xargs命令进行处理。xargs命令使用-0选项来解析以空字符分隔的输入，并将每个文件名作为参数传递给cat命令。
```


