# 编译FFmpeg库

FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。采用LGPL或GPL许可证。它提供了录制、转换以及流化音视频的完整解决方案。它包含了非常先进的音频/视频编解码库libavcodec，为了保证高可移植性和编解码质量，libavcodec里很多code都是从头开发的。
FFmpeg在Linux平台下开发，但它同样也可以在其它操作系统环境中编译运行，包括Windows、Mac OS X等。这个项目最早由Fabrice Bellard发起，2004年至2015年间由Michael Niedermayer主要负责维护。许多FFmpeg的开发人员都来自MPlayer项目，而且当前FFmpeg也是放在MPlayer项目组的服务器上。项目的名称来自MPEG视频编码标准，前面的"FF"代表"Fast Forward"。FFmpeg编码库可以使用GPU加速。

起因：将x86架构的代码合入到arch架构上面，编译模块发现依赖的FFmpeg库有问题。

## 1、报错
```
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libavfilter.so when searching for -lavfilter
/usr/bin/ld: cannot find -lavfilter
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libavcodec.so when searching for -lavcodec
/usr/bin/ld: cannot find -lavcodec
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libavdevice.so when searching for -lavdevice
/usr/bin/ld: cannot find -lavdevice
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libavformat.so when searching for -lavformat
/usr/bin/ld: cannot find -lavformat
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libavutil.so when searching for -lavutil
/usr/bin/ld: cannot find -lavutil
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libswresample.so when searching for -lswresample
/usr/bin/ld: cannot find -lswresample
/usr/bin/ld: skipping incompatible ../../FFmpeg-release-3.4/lib/libswscale.so when searching for -lswscale
/usr/bin/ld: cannot find -lswscale
collect2: error: ld returned 1 exit status
make[1]: *** [libredirect2.so] Error 1
make[1]: Leaving directory `/src/lib/libuvcsrv/srv'
make: *** [all] Error 2
```
通过这篇文章才发现：https://www.cnblogs.com/agostop/archive/2012/12/13/2816747.html

大部分都是说没有这个依赖库，但是我有啊，
会发生这样的原因有以下三种情形：

1 系统没有安装相对应的lib
2 相对应的lib版本不对
3 lib(.so档)的symbolic link 不正确，没有连结到正确的函式库文件(.so)

发现可能是对应的lib版本不对，因为我换架构了。

## 2、原因
```
/src/lib/FFmpeg-release-3.4# make
cp -f lib/libavcodec.so         /include/../build/pkg/root/hankin/lib/libavcodec.so.57
cp -f lib/libavformat.so        /include/../build/pkg/root/hankin/lib/libavformat.so.57
cp -f lib/libavutil.so          /include/../build/pkg/root/hankin/lib/libavutil.so.55
cp -f lib/libswscale.so         /include/../build/pkg/root/hankin/lib/libswscale.so.4
cp -f lib/libswresample.so      /include/../build/pkg/root/hankin/lib/libswresample.so.2
cp -f lib/libavdevice.so        /include/../build/pkg/root/hankin/lib/libavdevice.so.57
cp -f lib/libavfilter.so        /include/../build/pkg/root/hankin/lib/libavfilter.so.6
/src/lib/FFmpeg-release-3.4# file lib/libavcodec.so
lib/libavcodec.so: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, BuildID[sha1]=0x5119fa54af9025019b8aa1effd4269b8bee26f52, stripped
/src/lib/FFmpeg-release-3.4# uname -a
Linux fbdb48543be7 4.4.131-20190905.kylin.desktop-generic #kylin SMP Thu Sep 5 20:11:20 CST 2019 aarch64 GNU/Linux
```


## 3、编译FFmpeg库
**错误1**：note: previous declaration of 'XXXX' was here

```
./configure
make

./libavutil/libm.h:54:32: error: static declaration of 'cbrt' follows non-static declaration
 static av_always_inline double cbrt(double x)
                                ^
In file included from /usr/include/features.h:367:0,
                 from /usr/include/errno.h:28,
                 from ./libavutil/common.h:33,
                 from ./libavutil/avutil.h:296,
                 from ./libavutil/log.h:25,
                 from libavdevice/avdevice.h:48,
                 from libavdevice/alldevices.c:23:
/usr/include/aarch64-linux-gnu/bits/mathcalls.h:169:1: note: previous declaration of 'cbrt' was here
 __MATHCALL (cbrt,, (_Mdouble_ __x));
```
各种声明冲突，各种非静态声明在静态函数中使用报错。

更换虚拟机编译FFmpeg库发现同样出现问题，然后再更换一个虚拟机编译正常。

然后百度发现需要修改config.h文件，这个文件是由configure生成的，把报错的地方如：
#define HAVE_CBRT 0  修改为   #define HAVE_CBRT 1即可。

发现正常编译的虚拟机的config.h就是正常的1值。

https://blog.csdn.net/tttyd/article/details/8825181

**错误2**： ./libavutil/libm.h:340:0: error: "isnan" redefined [-Werror]
同理，将define的地方值修改为1

**错误3**：libavdevice/fbdev_common.c:57:35: error: comparison between signed and unsigned integer expressions [-Werror=sign-compare]

发现ffbuild/config.mak文件里面有-Wsign-compare字样，修改为-Wno-error=sign-compare或者删除。

**错误4**：libavdevice/lavfi.c:406:13: error: declaration of 'ret' shadows a previous local [-Werror=shadow]
同理，ffbuild/config.mak文件里删除即可。

**错误5**：warning: XXX is deprecated [-Wdeprecated-declarations]  cc1:all warnings being treated as errors

发现ffbuild/config.mak文件里有CFLAGS_HEADERS= -Wno-deprecated-declarations -Wno-unused-variable，但是在CPPFLAGS中没有，加上-Wno-error=deprecated-declarations -Wno-deprecated-declarations后编译通过。

**错误6**：libavformat/network.h:101:8: error: redefinition of 'struct sockaddr_storage'
/usr/include/aarch64-linux-gnu/bits/socket.h:166:8: note: originally defined here

在config.h文件中将值修改为1.




还有各种各样的结构体重复定义。。。。。。。。。都是在config.h中修改值为1.

**然后还有各种各样警告，cc1: all warnings being treated as errors，懒得再一一修改，直接关闭所有警告错误。将-Werror选项修改为-Wno-error。**

## 4、未生成so文件


Yasm是一个完全重写的NASM汇编。目前，它支持x86和AMD64指令集，接受NASM和气体汇编语法，产出二进制， ELF32 ， ELF64 ， COFF ， Mach - O的（ 32和64 ） ， RDOFF2 ，的Win32和Win64对象的格式，并生成STABS 调试信息的来源，DWARF 2 ，CodeView 8格式。YASM 继承了NASM ，扩展了支持的语法和平台，支持INTEL 格式语法和 GNU AS 语法。

NASM全称The Netwide Assembler，是一款基于80x86和x86-64平台的汇编语言编译程序，其设计初衷是为了实现编译器程序跨平台和模块化的特性。NASM支持大量的文件格式，包括Linux，*BSD，a.out，ELF，COFF，Mach−O，Microsoft 16−bit OBJ，Win32以及Win64，同时也支持简单的二进制文件生成。它的语法被设计的简单易懂，相较Intel的语法更为简单，支持目前已知的所有x86架构之上的扩展语法，同时也拥有对宏命令的良好支持。

```
cong@msi:/work/ffmpeg-2.1.7$ sudo apt-get install yasm    //这儿需要先安装yasm,否则configure会报错
cong@msi:/work/ffmpeg-2.1.7$ mkdir install                //创建一个Install目录，存放编译好之后的东东
cong@msi:/work/ffmpeg-2.1.7$ ./configure --prefix=./install //安装到install目录
Creating config.mak, config.h, and doc/config.texi...     //这儿说明configure成功，可以编译了

cong@msi:/work/ffmpeg-2.1.7$ make -j16
```

编译好东西：-j参数


根据前面的编译，只会产生静态库.a文件，要想生成动态库,需要在configure时加入--enable-shared。


通过./configure --help可以看见默认值是多少，某些值会显示[no]字样。


果然并没有一帆风顺，出现如下错误
```
/usr/bin/ld: libavcodec/mqc.o: relocation R_X86_64_32 against `.rodata' can not be used when making a shared object; recompile with -fPIC
libavcodec/mqc.o: error adding symbols: Bad value
collect2: error: ld returned 1 exit status
```

解决方法是:
```
http://blog.chinaunix.net/uid-26009923-id-4857964.html
ffbuild/config.mak L75加入 -fPIC，然后重新编译(注意这里，重新编译，如果直接make会一直报错需要添加-fPIC参数，但是已经加好了，需要make clean一下)
HOSTCFLAGS=-O3 -g -std=c99 -Wall -fPIC
```

等待一段时间后：
```
[root@ubuntu0006:/media/hankin/vdb/FFmpeg/FFmpeg-release-3.4] #find ./ -name *so
./libavdevice/libavdevice.so
./libavfilter/libavfilter.so
./libavutil/libavutil.so
./libavcodec/libavcodec.so
./libswresample/libswresample.so
./tests/ref/lavf/rso
./libavformat/libavformat.so
./libswscale/libswscale.so
```

结果后续又遇到问题：
```
root@famliy:/src/lib/FFmpeg-release-3.4# make
cp -f lib/libavcodec.so         /../build/pkg/root/hankin/lib/libavcodec.so.57
cp: cannot create regular file `/../build/pkg/root/hankin/lib/libavcodec.so.57': No such file or directory
make: *** [install] Error 1

Makefile
install:

        cp -f lib/libavcodec.so         ${INCDIR}/../build/pkg/root/hankin/lib/libavcodec.so.57
        cp -f lib/libavformat.so        ${INCDIR}/../build/pkg/root/hankin/lib/libavformat.so.57
```
原来是没有添加source加载环境变量，source中一般来说会增加一些全局变量。





















