# 安装gcc-11.1.0
gcc安装包：https://ftp.gnu.org/gnu/gcc/
g++安装包：https://sourceforge.net/projects/mingw-w64/files/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/

## configure（gcc）时缺少GMP库
```
checking for objdir... .libs
checking for the correct version of gmp.h... no
configure: error: Building GCC requires GMP 4.2+, MPFR 3.1.0+ and MPC 0.8.0+.
Try the --with-gmp, --with-mpfr and/or --with-mpc options to specify
their locations.  Source code for these libraries can be found at
their respective hosting sites as well as at
https://gcc.gnu.org/pub/gcc/infrastructure/.  See also
http://gcc.gnu.org/install/prerequisites.html for additional info.  If
you obtained GMP, MPFR and/or MPC from a vendor distribution package,
make sure that you have installed both the libraries and the header
files.  They may be located in separate packages.
```

## 安装GMP
https://gmplib.org/
一切正常。

GMP是开源免费的高精度数学计算库（GNU Multiple Mrecision arithmetic library），它针对各种型号的CPU编写汇编代码、使用复杂算法实现高效率的高精度计算。GMP原生提供C接口，同时也封装了一层C++接口。

使用GMP之前，必须读一读文档的第三章3 GMP Basics。自己安装GMP，阅读2 Installing GMP。
如下我做的笔记。

按官网手册，GMP直接发行的源码，没有预编译安装包。GMP源码原生使用Linux/Unix的autoconfig工具完成编译、安装；不支持CMake。从源码编译安装，Linux平台很方便，Windows平台上可以在Cygwin、DJGPP、MinGW中三种工具中任选一种。
而实际上不少Linux发行版在他们的仓库中提供了预编译安装包：Ubuntu和CentOS可以直接使用apt和yum命令安装；Windows平台可以先安装MSYS，然后pacman -S mingw-w64-x86_64-gmp直接安装。
```
#include <gmpxx.h>
#include <iostream>
#include <stdio.h>
using namespace std;
int main()
{
        mpz_t a,b,c;
        mpz_init(a);
        mpz_init(b);
        mpz_init(c);
        gmp_scanf("%Zd%Zd",a,b);
        mpz_add(c,a,b);
        gmp_printf("c= %Zd\n",c);
        return 0;
}
```

## 安装M4
http://mirrors.kernel.org/gnu/m4/


## configure（gcc）时缺少MPFR库
```
checking for objdir... .libs
checking for the correct version of gmp.h... yes
checking for the correct version of mpfr.h... no
configure: error: Building GCC requires GMP 4.2+, MPFR 3.1.0+ and MPC 0.8.0+.
Try the --with-gmp, --with-mpfr and/or --with-mpc options to specify
their locations.  Source code for these libraries can be found at
their respective hosting sites as well as at
https://gcc.gnu.org/pub/gcc/infrastructure/.  See also
http://gcc.gnu.org/install/prerequisites.html for additional info.  If
you obtained GMP, MPFR and/or MPC from a vendor distribution package,
make sure that you have installed both the libraries and the header
files.  They may be located in separate packages.
```

## 安装MPFR
https://www.mpfr.org/mpfr-current/
一切正常。

## configure（gcc）时缺少MPC库
提示过MPFR版本过低，由于找的网上教程，给了一个当时的最新版本，下载最新版本成功。
```
checking for objdir... .libs
checking for the correct version of gmp.h... yes
checking for the correct version of mpfr.h... yes
checking for the correct version of mpc.h... no
configure: error: Building GCC requires GMP 4.2+, MPFR 3.1.0+ and MPC 0.8.0+.
Try the --with-gmp, --with-mpfr and/or --with-mpc options to specify
their locations.  Source code for these libraries can be found at
their respective hosting sites as well as at
https://gcc.gnu.org/pub/gcc/infrastructure/.  See also
http://gcc.gnu.org/install/prerequisites.html for additional info.  If
you obtained GMP, MPFR and/or MPC from a vendor distribution package,
make sure that you have installed both the libraries and the header
files.  They may be located in separate packages.
```

## 安装MPC
https://mirrors.sjtug.sjtu.edu.cn/gnu/mpc/
一切正常。

## configure（gcc）时ISL版本过低
checking for objdir... .libs
checking for the correct version of gmp.h... yes
checking for the correct version of mpfr.h... yes
checking for the correct version of mpc.h... yes
checking for the correct version of the gmp/mpfr/mpc libraries... yes
checking for isl 0.15 or later... no
required isl version is 0.15 or later
The following languages will be built: c,c++,fortran,lto,objc
*** This configuration is not supported in the following subdirectories:
     gnattools gotools target-libada target-libhsail-rt target-libphobos target-zlib target-libgo target-libffi target-liboffloadmic
    (Any other directories should still work fine.)
checking for default BUILD_CONFIG... bootstrap-debug
checking for --enable-vtable-verify... no
/usr/bin/ld: cannot find crt1.o: No such file or directory
/usr/bin/ld: cannot find crti.o: No such file or directory
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc_s.so when searching for -lgcc_s
/usr/bin/ld: cannot find -lgcc_s
/usr/bin/ld: cannot find -lc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc_s.so when searching for -lgcc_s
/usr/bin/ld: cannot find -lgcc_s
/usr/bin/ld: cannot find crtn.o: No such file or directory
collect2: error: ld returned 1 exit status
configure: error: I suspect your system does not have 32-bit development libraries (libc and headers). If you have them, rerun configure with --enable-multilib. If you do not have them, and want to build a 64-bit-only compiler, rerun configure with --disable-multilib.

## 安装ISL
http://isl.gforge.inria.fr/
一切正常。

## configure（gcc）时报错
```
checking for objdir... .libs
checking for the correct version of gmp.h... yes
checking for the correct version of mpfr.h... yes
checking for the correct version of mpc.h... yes
checking for the correct version of the gmp/mpfr/mpc libraries... yes
checking for isl 0.15 or later... yes
The following languages will be built: c,c++,fortran,lto,objc
*** This configuration is not supported in the following subdirectories:
     gnattools gotools target-libada target-libhsail-rt target-libphobos target-zlib target-libgo target-libffi target-liboffloadmic
    (Any other directories should still work fine.)
checking for default BUILD_CONFIG... bootstrap-debug
checking for --enable-vtable-verify... no
/usr/bin/ld: cannot find crt1.o: No such file or directory
/usr/bin/ld: cannot find crti.o: No such file or directory
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc_s.so when searching for -lgcc_s
/usr/bin/ld: cannot find -lgcc_s
/usr/bin/ld: cannot find -lc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc.a when searching for -lgcc
/usr/bin/ld: cannot find -lgcc
/usr/bin/ld: skipping incompatible /usr/lib/gcc/x86_64-linux-gnu/4.7/libgcc_s.so when searching for -lgcc_s
/usr/bin/ld: cannot find -lgcc_s
/usr/bin/ld: cannot find crtn.o: No such file or directory
collect2: error: ld returned 1 exit status
configure: error: I suspect your system does not have 32-bit development libraries (libc and headers). If you have them, rerun configure with --enable-multilib. If you do not have them, and want to build a 64-bit-only compiler, rerun configure with --disable-multilib.
```

./configure --disable-multilib搞定

## 安装gcc-11.1.0
不能直接make install，需要先make。
然后就GG了。

```
../.././libcpp/lex.c: In function ‘const uchar* search_line_sse2(const uchar*, const uchar*)’:
../.././libcpp/lex.c:394:19: error: invalid operands of types ‘v16qi {aka __vector(16) char}’ and ‘const v16qi {aka const __vector(16) char}’ to binary ‘operator==’
../.././libcpp/lex.c:395:20: error: invalid operands of types ‘v16qi {aka __vector(16) char}’ and ‘const v16qi {aka const __vector(16) char}’ to binary ‘operator==’
../.././libcpp/lex.c:396:20: error: invalid operands of types ‘v16qi {aka __vector(16) char}’ and ‘const v16qi {aka const __vector(16) char}’ to binary ‘operator==’
../.././libcpp/lex.c:397:20: error: invalid operands of types ‘v16qi {aka __vector(16) char}’ and ‘const v16qi {aka const __vector(16) char}’ to binary ‘operator==’
make[3]: *** [lex.o] Error 1
make[3]: Leaving directory `/home/vtcompile/gcc-11.1.0/build-x86_64-pc-linux-gnu/libcpp'
make[2]: *** [all-build-libcpp] Error 2
make[2]: Leaving directory `/home/vtcompile/gcc-11.1.0'
make[1]: *** [stage1-bubble] Error 2
make[1]: Leaving directory `/home/vtcompile/gcc-11.1.0'
make: *** [all] Error 2
```

## ./configure --enable-multilib报错
```
configure: creating cache ./config.cache
In file included from ../.././libcody/buffer.cc:6:0:
../.././libcody/internal.hh:75:12: error: ‘noreturn’ was not declared in this scope
../.././libcody/internal.hh: In lambda function:
../.././libcody/internal.hh:75:21: error: expected ‘{’ before ‘]’ token
../.././libcody/internal.hh: At global scope:
../.././libcody/internal.hh:79:19: error: default arguments are only permitted for function parameters
../.././libcody/internal.hh:84:4: error: declaration of ‘HCF’ as array of functions
../.././libcody/internal.hh:87:21: error: ‘noreturn’ was not declared in this scope
../.././libcody/internal.hh: In lambda function:
../.././libcody/internal.hh:87:30: error: expected ‘{’ before ‘]’ token
../.././libcody/internal.hh: At global scope:
../.././libcody/internal.hh:87:46: error: default arguments are only permitted for function parameters
../.././libcody/internal.hh:87:61: error: declaration of ‘AssertFailed’ as array of functions
../.././libcody/internal.hh:88:20: error: ‘noreturn’ was not declared in this scope
../.././libcody/internal.hh: In lambda function:
../.././libcody/internal.hh:88:29: error: expected ‘{’ before ‘]’ token
../.././libcody/internal.hh: At global scope:
../.././libcody/internal.hh:88:45: error: default arguments are only permitted for function parameters
../.././libcody/internal.hh:88:60: error: declaration of ‘Unreachable’ as array of functions
../.././libcody/buffer.cc: In member function ‘int Cody::Detail::MessageBuffer::Lex(std::vector<std::basic_string<char> >&)’:
../.././libcody/buffer.cc:236:141: error: ‘AssertFailed’ was not declared in this scope
make[3]: *** [buffer.o] Error 1
make[3]: Leaving directory `/home/vtcompile/gcc-11.1.0/host-x86_64-pc-linux-gnu/libcody'
make[2]: *** [all-stage1-libcody] Error 2
make[2]: *** Waiting for unfinished jobs....
3458764513820540925
```

```
/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc/cc1: error while loading shared libraries: libisl.so.23: cannot open shared object file: No such file or directory
../.././gcc/c/Make-lang.in:127: recipe for target 's-selftest-c' failed
make[3]: *** [s-selftest-c] Error 1
make[3]: *** 正在等待未完成的任务....
/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc/cc1plus: error while loading shared libraries: libisl.so.23: cannot open shared object file: No such file or directory
../.././gcc/cp/Make-lang.in:196: recipe for target 's-selftest-c++' failed
make[3]: *** [s-selftest-c++] Error 1
rm gcc.pod
make[3]: Leaving directory '/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc'
Makefile:4779: recipe for target 'all-stage1-gcc' failed
make[2]: *** [all-stage1-gcc] Error 2
make[2]: Leaving directory '/media/sangfor/vdb/test/gcc-11.1.0'
Makefile:25860: recipe for target 'stage1-bubble' failed
make[1]: *** [stage1-bubble] Error 2
make[1]: Leaving directory '/media/sangfor/vdb/test/gcc-11.1.0'
Makefile:1000: recipe for target 'all' failed
make: *** [all] Error 2
```

准备放弃了，可能是版本跨度太大导致的吧，安装一个低版本的吧。

## 安装gcc-5.4.0
同样是安装失败。。。。。

/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc/cc1: error while loading shared libraries: libisl.so.23: cannot open shared object file: No such file or directory

发现这样根本没用：
./configure --enable-languages=c,c++ --enable-multilib --enable-obsolete --disable-threads --without-headers --disable-multilib --disable-decimal-float --disable-libgomp --disable-libmudflap --disable-nls --disable-shared --disable-libssp --with-newlib --with-isl=/usr/local/lib

找到文件libisl.so.23在/usr/local/lib目录下，添加：
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib

```
brary.dep -c ../.././libgcc/../libdecnumber/decLibrary.c
../.././libgcc/../libdecnumber/decLibrary.c:27:10: fatal error: decimal128.h: 没有那个文件或目录
   27 | #include "decimal128.h"
      |          ^~~~~~~~~~~~~~
compilation terminated.
```
发现../.././libgcc/../libdecnumber/目录下确实没有，百度decimal128.h文件也找不到，然后在bing下找到了decimal128.h文件原来在这个目录的dpd文件夹下面，修改头文件引入位置。


```
/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc/xgcc -B/media/sangfor/vdb/test/gcc-11.1.0/host-x86_64-pc-linux-gnu/gcc/ -B/usr/local/x86_64-pc-linux-gnu/bin/ -B/usr/local/x86_64-pc-linux-gnu/lib/ -isystem /usr/local/x86_64-pc-linux-gnu/include -isystem /usr/local/x86_64-pc-linux-gnu/sys-include   -fno-checking -g -O2 -O2  -g -O2 -DIN_GCC    -W -Wall -Wno-narrowing -Wwrite-strings -Wcast-qual -Wno-format -Wstrict-prototypes -Wmissing-prototypes -Wold-style-definition  -isystem ./include   -fpic -mlong-double-80 -DUSE_ELF_SYMVER  -g -DIN_LIBGCC2 -fbuilding-libgcc -fno-stack-protector   -fpic -mlong-double-80 -DUSE_ELF_SYMVER  -I. -I. -I../../host-x86_64-pc-linux-gnu/gcc -I../.././libgcc -I../.././libgcc/. -I../.././libgcc/../gcc -I../.././libgcc/../include -I../.././libgcc/../libdecnumber/no -I../.././libgcc/../libdecnumber -DHAVE_CC_TLS  -DUSE_TLS -o decSingle.o -MT decSingle.o -MD -MP -MF decSingle.dep -c ../.././libgcc/../libdecnumber/decSingle.c
make: *** No rule to make target '../.././libgcc/../libdecnumber/no/decimal32.c', needed by 'decimal32.o'。 停止。
```

## 结论
我选择放弃，实在找不到怎么解决。应该是版本跨度太大，依赖太多。
男上加男。
还是使用apt install方便吧。
