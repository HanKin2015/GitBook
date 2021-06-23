# .so .a .pc .o文件区别
编译加速参数-j

查看电脑核数：lscpu  cat/proc/cpuinfo


## windows下obj,lib,dll,exe的关系
lib是和dll对应的。lib是静态链接库的库文件，dll是动态链接库的库文件。 
所谓静态就是link的时候把里面需要的东西抽取出来安排到你的exe文件中，以后运行你的exe的时候不再需要lib。
所谓动态就是exe运行的时候依赖于dll里面提供的功能，没有这个dll，你的exe无法运行。 

lib,dll,exe都算是最终的目标文件，是最终产物。而c/c++属于源代码。源代码和最终目标文件中过渡的就是中间代码obj，实际上之所以需要中间代码，是你不可能一次得到目标文件。比如说一个exe需要很多的cpp文件生成。而编译器一次只能编译一个cpp文件。这样编译器编译好一个cpp以后会将其编译成obj，当所有必须要的cpp都编译成obj以后，再统一link成所需要的exe，应该说缺少任意一个obj都会导致exe的链接失败。

1.obj里存的是编译后的代码跟数据，并且有名称，所以在连接时有时会出现未解决的外部符号的问题。当连成exe后便不存在名称的概念了，只有地址。lib就是一堆obj的组合。
2.理论上可以连接obj文件来引用其他工程(可以认为一个obj文件等价于编译生成它的cpp文件,可以引用obj来替换cpp,也可以添加cpp来替换obj )，但实际中通常用lib来实现工程间相互引用。
3.编译器会默认链接一些常用的库，其它的需要你自己指定。

## linux .o,.a,.so
.o,是目标文件,相当于windows中的.obj文件 
.so 为共享库,是shared object,用于动态连接的,相当于windows下的dll 
.a为静态库,是好多个.o合在一起,用于静态连接
Archive档案文件档案室
中间目标文件打个包，在Windows下这种包叫“库文件”（Library File），也就是 .lib 文件，在UNIX下，是Archive File，也就是 .a 文件。

## linux查看so文件的一些信息命令

查看so文件是32位还是64位

[root@n1 native]# file libhadoop.so.1.0.0

libhadoop.so.1.0.0: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, not stripped



nm用来列出目标文件的符号清单.

ar命令可以用来创建、修改库，也可以从库中提出单个模块。



objdump：显示目标文件中的详细信息
objdump -d <command>，可以查看这些工具究竟如何完成这项任务
ldd  查看可执行文件链接了哪些  系统动态链接库
-d是ldd的缩写

readelf 显示关于 ELF 目标文件的信息
readelf -d libffmpeg.so | grep NEEDED



objdump -V libhadoop.so.1.0.0

## linux编译第三方库未生成so文件
gcc a.c b.c c.c -fPIC -shared -o target.so
添加-shared参数，使用官方提供的config命令默认竟然没有生成 .so，解决办法执行 ./config 时增加参数 shared

## la文件
它是包括库的描述的文本文件。
它允许libtool创建平台独立的名称。

.la为libtool自动生成的一些共享库，vi编辑查看，主要记录了一些配置信息。

## pc文件
经过proc预处理把.pc文件编译成.c文件。


