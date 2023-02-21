# swig
C 和 C++ 被公认为（理当如此）创建高性能代码的首选平台。对开发人员的一个常见要求是向脚本语言接口公开 C/C++ 代码，这正是 Simplified Wrapper and Interface Generator (SWIG) 的用武之地。SWIG 允许您向广泛的脚本语言公开 C/C++ 代码，包括 Ruby、Perl、Tcl 和 Python。

Simplified Wrapper and Interface Generator简化的包装器和接口生成器

SWIG 是一款不错的工具，可适合多种场景，其中包括：

向 C/C++ 代码提供一个脚本接口，使用户更容易使用
向您的 Ruby 代码添加扩展或将现有的模块替换为高性能的替代模块
提供使用脚本环境对代码执行单元和集成测试的能力
使用 TK 开发一个图形用户接口并将它与 C/C++ 后端集成
此外，与 GNU Debugger 每次都需触发相比，SWIG 要容易调试得多。

## 1、安装swig
linux下载地址：https://sourceforge.net/projects/swig/files/swig/swig-4.0.2/swig-4.0.2.tar.gz/download?use_mirror=udomain
windows下载地址：https://sourceforge.net/projects/swig/

使用tar -zxvf swig-4.0.2.tar.gz解压后configure报错，需要安装pcre。
```
checking whether to enable PCRE support... yes
checking whether to use local PCRE... no
checking for a sed that does not truncate output... /bin/sed
checking for pcre-config... no
configure: error: in `/media/hankin/vdb/swig/swig-4.0.2':
configure: error:
        Cannot find pcre-config script from PCRE (Perl Compatible Regular Expressions)
        library package. This dependency is needed for configure to complete,
        Either:
        - Install the PCRE developer package on your system (preferred approach).
        - Download the PCRE source tarball, build and install on your system
          as you would for any package built from source distribution.
        - Use the Tools/pcre-build.sh script to build PCRE just for SWIG to statically
          link against. Run 'Tools/pcre-build.sh --help' for instructions.
          (quite easy and does not require privileges to install PCRE on your system)
        - Use configure --without-pcre to disable regular expressions support in SWIG
          (not recommended).
See `config.log' for more details
```

## 2、安装pcre2（最终选择放弃，最后选择安装pcre）
下载地址：https://ftp.pcre.org/pub/pcre/
```
./configure
make
make install
```
结果安装swig还是报错了，还是报同样的错误。

尝试执行pcre-config命令发现只有pcre2-config，凭直觉认为可能是版本升级了的原因，跟python2和python3一样的道理。

通过执行ln -s /usr/local/bin/pcre2-config /usr/local/bin/pcre-config创建软连接，然后再configure就成功了。

## 3、安装pcre
不能高兴太早，make的时候报错：
```
mv -f $depbase.Tpo $depbase.Po
Swig/misc.c:1315:18: fatal error: pcre.h: 没有那个文件或目录
compilation terminated.
Makefile:933: recipe for target 'Swig/misc.o' failed
make[2]: *** [Swig/misc.o] Error 1
make[2]: Leaving directory '/media/hankin/vdb/swig/swig-4.0.2/Source'
Makefile:602: recipe for target 'all' failed
make[1]: *** [all] Error 2
make[1]: Leaving directory '/media/hankin/vdb/swig/swig-4.0.2/Source'
Makefile:37: recipe for target 'source' failed
make: *** [source] Error 2
```
再次尝试把/usr/local/include/pcre2.h重命名为pcre.h，结果后面还有一系列的pcre2错误，还是老老实实安装pcre吧。

下载安装pcre成功，然后make swig结果还是失败：
```
g++  -g -O2 -Wall -W -ansi -pedantic   -o eswig CParse/cscanner.o CParse/parser.o CParse/templ.o CParse/util.o DOH/base.o DOH/file.o DOH/fio.o DOH/hash.o DOH/list.o DOH/memory.o DOH/string.o DOH/void.o Doxygen/doxyentity.o Doxygen/doxyparser.o Doxygen/doxytranslator.o Doxygen/javadoc.o Doxygen/pydoc.o Modules/allocate.o Modules/browser.o Modules/contract.o Modules/csharp.o Modules/d.o Modules/directors.o Modules/emit.o Modules/go.o Modules/guile.o Modules/interface.o Modules/java.o Modules/javascript.o Modules/lang.o Modules/lua.o Modules/main.o Modules/mzscheme.o Modules/nested.o Modules/ocaml.o Modules/octave.o Modules/overload.o Modules/perl5.o Modules/php.o Modules/python.o Modules/r.o Modules/ruby.o Modules/scilab.o Modules/swigmain.o Modules/tcl8.o Modules/typepass.o Modules/utils.o Modules/xml.o Preprocessor/cpp.o Preprocessor/expr.o Swig/cwrap.o Swig/deprecate.o Swig/error.o Swig/extend.o Swig/fragment.o Swig/getopt.o Swig/include.o Swig/misc.o Swig/naming.o Swig/parms.o Swig/scanner.o Swig/stype.o Swig/symbol.o Swig/tree.o Swig/typemap.o Swig/typeobj.o Swig/typesys.o Swig/wrapfunc.o  -ldl
Swig/misc.o：在函数‘Swig_string_regex’中：
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1480：对‘pcre_free’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1461：对‘pcre_compile’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1468：对‘pcre_exec’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1480：对‘pcre_free’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1480：对‘pcre_free’未定义的引用
Swig/misc.o：在函数‘Swig_pcre_version’中：
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/misc.c:1485：对‘pcre_version’未定义的引用
Swig/naming.o：在函数‘name_regexmatch_value’中：
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/naming.c:1103：对‘pcre_compile’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/naming.c:1111：对‘pcre_exec’未定义的引用
/media/hankin/vdb/swig/swig-4.0.2/Source/Swig/naming.c:1112：对‘pcre_free’未定义的引用
collect2: error: ld returned 1 exit status
Makefile:848: recipe for target 'eswig' failed
make[2]: *** [eswig] Error 1
make[2]: Leaving directory '/media/hankin/vdb/swig/swig-4.0.2/Source'
Makefile:602: recipe for target 'all' failed
make[1]: *** [all] Error 2
make[1]: Leaving directory '/media/hankin/vdb/swig/swig-4.0.2/Source'
Makefile:37: recipe for target 'source' failed
make: *** [source] Error 2
```

对于我这个老江湖，这个错误铭记在心，很明显是pcre缺少共享库so文件。
重新编译安装pcre试试。
看了一下pcre的配置./configure --help
```
  --disable-dependency-tracking
                          speeds up one-time build
  --enable-shared[=PKGS]  build shared libraries [default=yes]
  --enable-static[=PKGS]  build static libraries [default=yes]
  --enable-fast-install[=PKGS]
                          optimize for fast installation [default=yes]
  --disable-libtool-lock  avoid locking (might break parallel builds)
```
默认是开启的，我心态崩了啊。

但是我还是尝试重新编译安装pcre,./configure --enable-shared，然后再重新编译安装swig ./configure，结果安装成功了。
不清楚是重新configure成功，还是--enable-shared成功，我猜测是--enable-shared的原因。

## 4、编写swig文件
作为输入，SWIG 需要一个包含 ANSI C/C++ 声明和 SWIG 指令的文件。我将此输入文件称为 SWIG 接口文件。一定要记住，SWIG 仅需要足够生成包装器代码的信息。该接口文件通常具有 *.i 或 *.swg 扩展名。

编写swig文件test_swig.i:
```test.i
//%module 后面的名字是被封装的模块名称。封装口，python通过这个名称加载程序
//%{  %}之间所添加的内容，一般包含此文件需要的一些函数声明和头文件。
//最后一部分，声明了要封装的函数和变量,直接使用%include 文件模块头文件直接包含即可

%module test_swig
%{
    #define SWIG_WITH_INIT
    #include "test_swig.hpp"
%}
%include "test_swig.hpp"
```

## 5、执行swig文件
```
[root@ubuntu0006:/media/hankin/vdb/swig/test] #g++ test_swig_main.cpp
test_swig.hpp:1:9: warning: #pragma once in main file
 #pragma once
         ^
/tmp/ccjItqEm.o：在函数‘main’中：
test_swig_main.cpp:(.text+0x38)：对‘add(int, int)’未定义的引用
test_swig_main.cpp:(.text+0x58)：对‘sub(int, int)’未定义的引用
collect2: error: ld returned 1 exit status
[root@ubuntu0006:/media/hankin/vdb/swig/test] #g++ test_swig_main.cpp test_swig.cpp
[root@ubuntu0006:/media/hankin/vdb/swig/test] #./a.out
x = 10, y = 8
x + y = 18
x - y = 2
[root@ubuntu0006:/media/hankin/vdb/swig/test] #vim test_swig.i
[root@ubuntu0006:/media/hankin/vdb/swig/test] #swig -python -c++ test_swig.i
swig: error while loading shared libraries: libpcre.so.1: cannot open shared object file: No such file or directory
[root@ubuntu0006:/media/hankin/vdb/swig/test] #find /usr/local/lib -name libpcre.so.1
/usr/local/lib/libpcre.so.1
[root@ubuntu0006:/media/hankin/vdb/swig/test] #which swig
/usr/local/bin/swig
[root@ubuntu0006:/media/hankin/vdb/swig/test] #ldd /usr/local/bin/swig
        linux-vdso.so.1 =>  (0x00007ffe37fc9000)
        libpcre.so.1 => not found
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007fbac4853000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007fbac463d000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fbac4273000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007fbac3f6a000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fbac4bd5000)
[root@ubuntu0006:/media/hankin/vdb/swig/test] #cp  /usr/local/lib/libpcre.so.1 /usr/lib/
[root@ubuntu0006:/media/hankin/vdb/swig/test] #ldd /usr/local/bin/swig
        linux-vdso.so.1 =>  (0x00007ffd465ad000)
        libpcre.so.1 => /usr/lib/libpcre.so.1 (0x00007f80ab7e5000)
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007f80ab463000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007f80ab24d000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f80aae83000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007f80aab7a000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f80aba03000)
```

## 6、编写setup.py文件
参考：https://blog.csdn.net/qq_26105397/article/details/83153606

网站没有给出import头文件，发现Extension和setup在distutils和setuptools中。

### distutils和setuptools的联系与区别
distutils仍然是使用python打包的标准工具，它包含在标准库中，它对于简单的python发型版很有用，但缺少功能。
setuptools是为克服Distutils的局限性而开发的，它不包含在标准库中，它引入了一个名为easy_install的命令行实用程序。

建议：
除非你的要求非常基本并且需要distuitils，建议使用setuptools。

最终选择distutils，setiptools可能需要单独安装。
```setup.py
#!/usr/bin/python
# -*- coding: UTF-8 -*-

# 利用python提供的自动化编译模块进行编译。编写一个编译文件setup.py
# 内容如下：(仅供参考,具体详细了解python自动化编译动态链接库文档)

from distutils.core import setup, Extension

# 生成一个扩展模块
test_swig_module = Extension('_test_swig',                  # 模块名称，必须要有下划线
                            sources=['test_swig_wrap.cxx',  # 封装后的接口cxx文件
                                    'test_swig.cpp'],
                            )

setup(name = 'test_swig',    # 打包后的名称
        version = '0.1',
        author = 'SWIG Docs',
        description = 'Simple swig pht from docs',
        ext_modules = [test_swig_module],   # 与上面的扩展模块名称一致
        py_modules = ['test_swig'],         # 需要打包的模块列表
    )
```


```
python3 setup.py build

[root@ubuntu0006:/media/hankin/vdb/swig/test/build] #ll
总用量 24
drwxr-xr-x 6 root root 4096 7月  27 15:59 ./
drwxr-xr-x 3 root root 4096 7月  27 15:58 ../
drwxr-xr-x 2 root root 4096 7月  27 15:56 lib.linux-x86_64-2.7/
drwxr-xr-x 2 root root 4096 7月  27 15:59 lib.linux-x86_64-3.6/
drwxr-xr-x 2 root root 4096 7月  27 15:56 temp.linux-x86_64-2.7/
drwxr-xr-x 2 root root 4096 7月  27 15:59 temp.linux-x86_64-3.6/
[root@ubuntu0006:/media/hankin/vdb/swig/test/build/lib.linux-x86_64-3.6] #ll
总用量 120
drwxr-xr-x 2 root root   4096 7月  27 15:59 ./
drwxr-xr-x 6 root root   4096 7月  27 15:59 ../
-rwxr-xr-x 1 root root 110400 7月  27 15:59 _test_swig.cpython-36m-x86_64-linux-gnu.so*
-rw-r--r-- 1 root root   2176 7月  27 10:24 test_swig.py
[root@ubuntu0006:/media/hankin/vdb/swig/test/build/lib.linux-x86_64-3.6] #python3
Python 3.6.5 (default, Feb 27 2021, 16:40:34)
[GCC 5.4.0 20160609] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import test_swig
>>> test_swig.add(3, 5)
8
>>> test_swig.sub(4, 3)
1
```

示例源代码见：D:\Github\Storage\others\swig。



