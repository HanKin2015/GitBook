# log4c

## 1、理解为啥叫这个名字
从log4j的百度百科中了解到，log4j--log for java(java的日志)，因此4代表的是for这个单词。

## 2、官网

### 2-1、log4c
(log4c)[http://log4c.sourceforge.net/index.html]

Log4c是一个C库，用于灵活地记录文件、系统日志和其他目的地。它是根据Java库的日志建模的(http://jakarta.apache.org/log4j/)，尽可能接近其API。
马克·孟德尔以不同的理念启动了一个平行的log4c项目。该设计是面向宏的，因此更轻、更快，非常适合内核开发。

### 2-2、Log4cpp
Log4cpp是一个开源的C++类库，它提供了在C++程序中使用日志和跟踪调试的功能。
使用log4cpp，可以很便利地将日志或者跟踪调试信息写入字符流、内存字符串队列、文件、回滚文件、调试器、Windows日志、syslog和远程syslog服务器中。
Log4cpp是个基于LGPL的开源项目，移植自Java的日志处理跟踪项目log4j，并保持了API上的一致。其类似的支持库还包括Java(log4j)，C++(log4cpp、log4cplus)，C(log4c)，python(log4p)等。

### 2-3、log4j
Log4j是Apache的一个开源项目，通过使用Log4j，我们可以控制日志信息输送的目的地是控制台、文件、GUI组件，甚至是套接口服务器、NT的事件记录器、UNIX Syslog守护进程等；我们也可以控制每一条日志的输出格式；通过定义每一条日志信息的级别，我们能够更加细致地控制日志的生成过程。最令人感兴趣的就是，这些可以通过一个配置文件来灵活地进行配置，而不需要修改应用的代码。

### 2-4、log4cplus
log4cplus是C++编写的开源的日志系统，前身是java编写的log4j系统，受Apache Software License保护，作者是Tad E. Smith。

log4cplus具有线程安全、灵活、以及多粒度控制的特点，通过将日志划分优先级使其可以面向程序调试、运行、测试、和维护等全生命周期。你可以选择将日志输出到屏幕、文件、NT event log、甚至是远程服务器；通过指定策略对日志进行定期备份等等。

https://github.com/log4cplus/log4cplus
sourceforge.net/projects/log4cplus/

## 3、Log4cplus使用详解

### 3-1、安装
```
tar xvf log4cplus-2.0.7.tar.xz
cd log4cplus-2.0.7/
./configure
make
make install
```
如果需要指定安装路径可使用--prefix参数, 否则将缺省安装到/usr/local目录下。另外，如果需要单线程版本可通过参数-enable-threads=no指定, 否则默认将安装多线程版本。

对于HP-UNIX平台用户, 由于aCC编译器选项兼容性问题，请另外加入参数CXXFLAGS=”-AA -w”(单线程版本)或CXXFLAGS=”-AA –mt -w”(多线程版本)。

安装成功后将在/usr/local目录或指定的目录下创建include和lib两个子目录及相应文件。其中include目录包含头文件，lib目录包含最终打包生成的静态和动态库。在动态连接log4cplus库时请使用-llog4cplus选项。

### 3-2、测试
```
cd tests
mkdir build
cmake ..
make
```
结果是一些列的报错，编译失败。
先进行自己编写demo测试一下，回头再来看看这个问题。

demo程序没有问题，需要c++11，还是没有编译成功，可能是没有添加-llog4cplus选项。
```
cmake -DCMAKE_CXX_STANDARD=11 ..
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus/log4cplus-2.0.7/tests/build] #make
Scanning dependencies of target appender_test
[  3%] Building CXX object appender_test/CMakeFiles/appender_test.dir/main.o
[  6%] Linking CXX executable appender_test
CMakeFiles/appender_test.dir/main.o：在函数‘printAppenderList(std::vector<log4cplus::helpers::SharedObjectPtr<log4cplus::Appender>, std::allocator<log4cplus::helpers::SharedObjectPtr<log4cplus::Appender> > > const&)’中：
main.cxx:(.text+0x2e)：对‘log4cplus::tcout’未定义的引用
main.cxx:(.text+0xcf)：对‘log4cplus::tcout’未定义的引用
CMakeFiles/appender_test.dir/main.o：在函数‘main’中：
```

### 3-3、基本步骤
使用log4cplus有六个基本步骤：
- 实例化一个封装了输出介质的appender对象；
- 实例化一个封装了输出格式的layout对象；
- 将layout对象绑定(attach)到appender对象；如省略此步骤，简单布局器SimpleLayout(参见5.1小节)对象会绑定到logger。
- 实例化一个封装了日志输出logger对象,并调用其静态函数getInstance()获得实例，log4cplus::Logger::getInstance("logger_name")；
- 将appender对象绑定(attach)到logger对象；
- 设置logger的优先级，如省略此步骤，各种有限级的日志都将被输出。

### 3-4、标准使用
```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #g++ standard.cpp -llog4cplus -std=c++11
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
./a.out: error while loading shared libraries: liblog4cplus-2.0.so.3: cannot open shared object file: No such file or directory
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ldd a.out
        linux-vdso.so.1 =>  (0x00007ffd877fc000)
        liblog4cplus-2.0.so.3 => not found
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007ffa4a875000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007ffa4a65f000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007ffa4a295000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007ffa49f8c000)
        /lib64/ld-linux-x86-64.so.2 (0x00007ffa4abf7000)
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #find /usr/local/lib/ -name liblog4cplus-2.0.so.3
/usr/local/lib/liblog4cplus-2.0.so.3
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ln -s /usr/local/lib/liblog4cplus-2.0.so.3 /lib/x86_64-linux-gnu/liblog4cplus-2.0.so.3
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ldd a.out
        linux-vdso.so.1 =>  (0x00007ffc26f7e000)
        liblog4cplus-2.0.so.3 => /lib/x86_64-linux-gnu/liblog4cplus-2.0.so.3 (0x00007fc01bcc9000)
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007fc01b947000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007fc01b731000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fc01b367000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007fc01b05e000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007fc01ae41000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fc01bf55000)
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
07/11/22  03:26:12  - This is the  FIRST log message... [standard.cpp:37]
07/11/22  03:26:13  - This is the  SECOND log message... [standard.cpp:39]
```

## 4、关于日志文件属性问题
使用root程序执行会创建644，使用普通用户创建664，最终想法是创建666。
这该如何去解决呢？？？
```
[root@ubuntu0006:/media/sangfor/vdb/study/log4cplus] #stat log/log
  文件：'log/log'
  大小：330             块：8          IO 块：4096   普通文件
设备：fd10h/64784d      Inode：6443740     硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-07-11 20:07:09.436000000 +0800
最近更改：2022-07-11 20:06:54.600000000 +0800
最近改动：2022-07-11 20:06:54.600000000 +0800
创建时间：-
hejian@ubuntu0006:~/log$ stat log
  文件：'log'
  大小：330             块：8          IO 块：4096   普通文件
设备：fd01h/64769d      Inode：270599      硬链接：1
权限：(0664/-rw-rw-r--)  Uid：( 1001/  hejian)   Gid：( 1001/  hejian)
最近访问：2022-07-12 09:56:41.700000000 +0800
最近更改：2022-07-12 09:56:41.700000000 +0800
最近改动：2022-07-12 09:56:41.700000000 +0800
创建时间：-
```

## 4、log4cpp和log4cplus区别












