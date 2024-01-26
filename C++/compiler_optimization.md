# 编译器优化

参考资料：
https://blog.csdn.net/pyt1234567890/article/details/122907715
https://www.zhihu.com/question/443340911/answer/1720297063
https://zhuanlan.zhihu.com/p/381490718

## 1、简介
编译优化，会使编译器尝试以牺牲编译时间和调试程序的能力为代价，来提高性能或代码大小;
合理的优化级别,能够在代码体积、执行性能、RAM占有率上获得均衡！
https://gcc.gnu.org/onlinedocs/gcc/Optimize-Options.html

## 2、编译器优化选项
具体介绍见：https://www.zhihu.com/question/443340911/answer/1720297063

- O0（默认选项）：不开启优化，方便功能调试
- Og：方便调试的优化选项（比O1更保守）
- O1：保守的优化选项，打开了四十多个优化选项
- O2：常用的发布优化选项，在O1的基础上额外打开了四十多个优化选项，包括自动内联等规则
- Os：产生较小代码体积的优化选项（比O2更保守）
- O3：较为激进的优化选项（对错误编码容忍度最低），在O2的基础上额外打开了十多个优化选项
- Ofast：打开可导致不符合IEEE浮点数等标准的性能优化选项。

打开后编译会有各种警告信息。

## 3、怀疑stripped字段与编译器优化选项有关
```
[root@ubuntu0006:/media/hankin/vdb/boost] #g++ hello_boost.cpp
[root@ubuntu0006:/media/hankin/vdb/boost] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=d8269ba20e19f1a9739a3c2518e22ba6161e2051, not stripped
[root@ubuntu0006:/media/hankin/vdb/boost] #g++ hello_boost.cpp -g
[root@ubuntu0006:/media/hankin/vdb/boost] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=ca512680f25cc529401f876d923a72628426a1e2, not stripped
```
能看见not stripped字段。gcc -O0123都没有改变这个值。

上面例子可以看出是否能调试跟not stripped无关？？？但是实际项目中如果是stripped就不包含符号表信息。

## 4、Debug模式和Release模式区别
编译器有这么多优化级别，Debug版本和Release版本其实就是优化级别的区别，Debug称为调试版本，编译的结果通常包含有调试信息，没有做任何优化，方便开发人员进行调试，Release称为发布版本，不会携带调试信息，同时编译器对代码进行了很多优化，使代码更小，速度更快，发布给用户使用，给用户使用以更好的体验。但Release模式编译比Debug模式花的时间也会更多。Debug模式下在内存分配上有所区别，在我们申请内存时，Debug模式会多申请一部分空间，分布在内存块的前后，用于存放调试信息。对于未初始化的变量，Debug模式下会默认对其进行初始化，而Release模式则不会，所以就有个常见的问题，局部变量未初始化时，Debug模式和Release模式表现有所不同。

## 5、如何编译出stripped二进制文件
在网上看见网友关于gccbuild参数的说明：
1、去掉-g，等于程序做了--strip-debug
2、strip程序，等于程序做了--strip-debug和--strip-symbol

在linux中， strip也有脱衣服的含义， 具体就是从特定文件中剥掉一些符号信息和调试信息。

因此， 通常的做法是： strip前的库用来调试， strip后的库用来实际发布， 他们两者有对应关系。 一旦发布的strip后的库出了问题， 就可以找对应的未strip的库来定位。

补充： 后来发现， 在调试过程中， 经常涉及到传库， 库太大时， 很耗费传输时间， 所以还是用strip来搞一下吧。
```
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc DEBUG_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=42e77c0cde59380434656f53efdfaef3eb7d42bd, not stripped
[root@ubuntu0006:/media/hankin/vdb/debug] #nm a.out
0000000000601038 B __bss_start
0000000000601038 b completed.7594
0000000000601028 D __data_start
.......
[root@ubuntu0006:/media/hankin/vdb/debug] #ll a.out
-rwxr-xr-x 1 root root 8616 7月  28 15:28 a.out*
[root@ubuntu0006:/media/hankin/vdb/debug] #strip a.out
[root@ubuntu0006:/media/hankin/vdb/debug] #ll a.out
-rwxr-xr-x 1 root root 6320 7月  28 15:36 a.out*
[root@ubuntu0006:/media/hankin/vdb/debug] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=42e77c0cde59380434656f53efdfaef3eb7d42bd, stripped
[root@ubuntu0006:/media/hankin/vdb/debug] #nm a.out
nm: a.out：无符号
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
DEBUG is not definded
```
- 文件大小减小
- file命令中stripped显示
- 无符号表信息

## 6、gcc和g++如何编译debug和release二进制文件
https://blog.csdn.net/feisy/article/details/125062425
结论：Gcc中并没有Release和debug版本之分，只有编译选项的组合
大学时候使用VS开发，VS编译的程序是可以选debug或者release的，搞得我一直误以为使用gcc编译，也有这种区分。

既然题主问的是Debug和Release的区别，那应该就是用的msvc吧，你前面说这么多gcc的编译选项估计他是看不懂的。

-g只是说要不要导出符号表到程序里面，它可以跟 -0s组合使用，比如：-O2 -g,即优化代码又导出符号表。

有时候我们使用了-g,使用gdb调试的时候，会出现“No symbol xxx in current context”这样的问题。
这是因为比较新的gcc版本导出的符号格式默认是DWARF4,比较老的gdb版本无法识别这种格式。
这种问题可以通过加 -gdwarf-2或者-gdwarf-3告诉gcc，产生老版本的符号信息，这样老版本的gdb就能识别。

gcc给工程师提供了编译参数来控制这些。添加-g参数可以使得编译的程序包含更多调试信息，达到debug版本软件的需求，方便工程师调试。strip 命令可以将编译的包含调试信息的文件中的调试信息去除掉。

在程序的发布过程中分两种模式：debug模式和release模式
调试器在调试时只能读取debug模式下的信息.

Linux gcc/g++出来的二进制程序默认是release模式
gcc编译时使用-g选项
```
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc DEBUG_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
DEBUG is not definded
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc DEBUG_define_example.c -g
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
DEBUG is not definded
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc DEBUG_define_example.c -DDEBUG
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
DEBUG is definded
```

32位版：加上 -m32 参数，生成32位的代码。(64位编译32位程序需要安装32位的glibc库文件。https://blog.csdn.net/gezhiwu1213/article/details/78564455)
64位版：加上 -m64 参数，生成64位的代码。
debug版：加上 -g 参数，生成调试信息。
release版：加上 -static 参数，进行静态链接，使程序不再依赖动态库。加上 -O3 参数，进行最快速度优化。加上-DNDEBUG参数，定义NDEBUG宏，屏蔽断言。

当没有-m32或-m64参数时，一般情况下会生成跟操作系统位数一致的代码，但某些编译器存在例外，例如——
32位Linux下的GCC，默认是编译为32位代码。
64位Linux下的GCC，默认是编译为64位代码。
Window系统下的MinGW，总是编译为32位代码。因为MinGW只支持32位代码。
Window系统下的MinGW-w64(例如安装了TDM-GCC，选择MinGW-w64)，默认是编译为64位代码，包括在32位的Windows系统下。

## 7、64位系统编译32位程序
centos64位编译32位代码，出现/usr/include/gnu/stubs.h:7:27: 致命错误：gnu/stubs-32.h：没有那个文件或目录，需要安装32位的glibc库文件。

安装32位glibc库文件命令：
sudo yum install glibc-devel.i686(安装C库文件)
sudo dnf install glibc-devel.i686(fedora命令)

安装32位glibc++库文件命令
sudo  yum install libstdc++-devel.i686
sudo dnf install libstdc++-devel.i686（fedora命令）

Ubuntu解决命令：
sudo apt-get install g++-multilib

## 8、理解-DDEBUG参数
-D 定义宏
在使用gcc/g++ 编译的时候定义宏
-DDEBUG 定义DEBUG宏，可能文件中又DEBUG宏部分的相关信息，用个DDEBUG来选择开启或者关闭DEBUG
```
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc CUSTOMHJ_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
CUSTOMHJ is not definded
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc -DDEBUG CUSTOMHJ_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
CUSTOMHJ is not definded
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc -DCUSTOMHJ CUSTOMHJ_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
CUSTOMHJ is definded
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc -D(CUSTOMHJ) CUSTOMHJ_define_example.c
-bash: 未预期的符号 `(' 附近有语法错误
[root@ubuntu0006:/media/hankin/vdb/debug] #gcc -D CUSTOMHJ CUSTOMHJ_define_example.c
[root@ubuntu0006:/media/hankin/vdb/debug] #./a.out
CUSTOMHJ is definded
```

-DNDEBUG可以忽略assert函数。

Debug模式下可以使用assert，运行过程中有异常现象会及时crash，Release模式下模式下不会编译assert，遇到不期望的情况不会及时crash，稀里糊涂继续运行，到后期可能会产生奇奇怪怪的错误，不易调试，殊不知其实在很早之前就出现了问题。编译器在Debug模式下定义_DEBUG宏，Release模式下定义NDEBUG宏，预处理器就是根据对应宏来判断是否开启assert的。

## 9、Heisenbug
有一种bug被国外程序员戏称为Heisenbug，取量子力学巨匠海森堡（Heisenberg）的姓氏的谐音。Heisenbug指的是那种生产上会出现，但是一旦打了断点debug就不会出现或换一种样子出现的bug，和量子力学里的“测不准原理”挺像的，观察改变了被观察对象的行为。导致Heisenbug的原因之一是编译优化。Debug模式通常不优化，所以不出问题。Release模式会有各种优化，如果优化本身有问题就有可能会崩。你可以尝试把优化项一个一个去掉试试。另一个可能导致Heisenbug的因素是多线程，这个就更难调了，我只会用自己的脑袋分析哪里可能出现静态条件。
