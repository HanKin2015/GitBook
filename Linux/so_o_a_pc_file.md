# .so .a .pc .o文件区别
编译加速参数-j
查看电脑核数：lscpu  cat/proc/cpuinfo

## 1、windows下obj,lib,dll,exe的关系
lib是和dll对应的。lib是静态链接库的库文件，dll是动态链接库的库文件。 
所谓静态就是link的时候把里面需要的东西抽取出来安排到你的exe文件中，以后运行你的exe的时候不再需要lib。
所谓动态就是exe运行的时候依赖于dll里面提供的功能，没有这个dll，你的exe无法运行。 

lib,dll,exe都算是最终的目标文件，是最终产物。而c/c++属于源代码。源代码和最终目标文件中过渡的就是中间代码obj，实际上之所以需要中间代码，是你不可能一次得到目标文件。比如说一个exe需要很多的cpp文件生成。而编译器一次只能编译一个cpp文件。这样编译器编译好一个cpp以后会将其编译成obj，当所有必须要的cpp都编译成obj以后，再统一link成所需要的exe，应该说缺少任意一个obj都会导致exe的链接失败。

1.obj里存的是编译后的代码跟数据，并且有名称，所以在连接时有时会出现未解决的外部符号的问题。当连成exe后便不存在名称的概念了，只有地址。lib就是一堆obj的组合。
2.理论上可以连接obj文件来引用其他工程(可以认为一个obj文件等价于编译生成它的cpp文件,可以引用obj来替换cpp,也可以添加cpp来替换obj )，但实际中通常用lib来实现工程间相互引用。
3.编译器会默认链接一些常用的库，其它的需要你自己指定。

## 2、linux .o,.a,.so
.o,是目标文件,相当于windows中的.obj文件 
.so 为共享库,是shared object,用于动态连接的,相当于windows下的dll 
.a为静态库,是好多个.o合在一起,用于静态连接
Archive档案文件档案室
中间目标文件打个包，在Windows下这种包叫“库文件”（Library File），也就是 .lib 文件，在UNIX下，是Archive File，也就是 .a 文件。

### 2-1、ldconfig命令
在/usr/local/lib目录下移入缺失的so文件后，执行文件依赖还是报错not found，原因默认情况下，动态链接器可能不会搜索/usr/local/lib。可以通过ldconfig命令手动更新库缓存。
```
root@3WQ3290329:/usr/local/bin# ll /usr/local/lib/libusbmagic_common.so
-rw-r--r-- 1 root root 8866120  4月 27 17:25 /usr/local/lib/libusbmagic_common.so
root@3WQ3290329:/usr/local/bin# ldd usbmagicd
        linux-vdso.so.1 (0x00007ffc4114e000)
        libusbmagic_common.so => not found
        liblog4cplus.so.0 => not found
```

## 3、linux查看so文件的一些信息命令
查看so文件是32位还是64位
```
[root@n1 native]# file libhadoop.so.1.0.0
libhadoop.so.1.0.0: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, not stripped
```

nm用来列出目标文件的符号清单.
ar命令可以用来创建、修改库，也可以从库中提出单个模块。
objdump：显示目标文件中的详细信息
objdump -d <command>，可以查看这些工具究竟如何完成这项任务
ldd 查看可执行文件链接了哪些系统动态链接库
-d是ldd的缩写

readelf 显示关于 ELF 目标文件的信息
readelf -d libffmpeg.so | grep NEEDED
objdump -V libhadoop.so.1.0.0

## 4、linux编译第三方库未生成so文件
gcc a.c b.c c.c -fPIC -shared -o target.so
添加-shared参数，使用官方提供的config命令默认竟然没有生成 .so，解决办法执行 ./config 时增加参数 shared

## 5、la文件
它是包括库的描述的文本文件。
它允许libtool创建平台独立的名称。

.la为libtool自动生成的一些共享库，vi编辑查看，主要记录了一些配置信息。

## 6、pc文件
经过proc预处理把.pc文件编译成.c文件。

## 7、删除so文件和覆盖so文件表现不一样
在Linux系统中，当一个程序运行时，它会打开并读取所需的共享库（.so文件）。这些文件在文件系统中有相应的inode（索引节点），它是文件系统中的一个数据结构，用于存储文件的元数据以及文件实际数据的位置信息。

当你覆盖一个.so文件时，如果有程序正在运行并且已经打开了这个文件，那么这个文件的inode仍然被这个程序持有，程序继续从原来的inode指向的位置读取数据。但是，文件系统中的目录项会更新为新的inode，这意味着新写入的.so文件实际上是一个全新的文件，有一个新的inode。这种情况下，如果覆盖的.so文件与原来的文件在ABI（应用程序二进制接口）上不兼容，那么正在运行的程序可能会因为无法找到预期的符号或者执行了错误的代码而崩溃。

而当你删除一个.so文件时，如果有程序正在运行并且已经打开了这个文件，那么这个文件的inode不会立即从文件系统中删除，因为它仍然被一个进程所引用。文件系统会等到最后一个引用这个inode的文件描述符被关闭后，才会释放这个inode，并且真正地删除文件数据。因此，删除文件并不会影响到已经加载该共享库的运行中的程序。

总结一下，覆盖.so文件可能会导致运行中的程序崩溃，因为它可能会导致ABI不兼容的问题，而删除.so文件通常不会立即影响到运行中的程序，因为它们仍然持有原来的inode和文件数据，直到程序关闭或者重新加载库文件。

为了安全地更新共享库，通常的做法是：

安装新版本的共享库到一个新的文件名。
删除旧版本的共享库文件。
重命名新版本的共享库文件为原来的文件名。
重启依赖这个共享库的所有服务和应用程序。
这样可以确保运行中的程序不会因为共享库的变动而受到影响。

## 8、查看符号表
```
# 使用 nm -D 选项可以查看动态符号表
nm -D libexample.so

# 使用 readelf
readelf -s libexample.so

# 使用 objdump -T 选项可以查看动态符号表
objdump -T libexample.so

strings your_library.so | grep 'function_name'
```

objdump -t显示目标文件的符号表，包括静态符号和全局符号。
objdump -T显示动态符号表，主要用于共享库（.so 文件）。

