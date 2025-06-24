# 编译那些事儿

## 1、经验
- make的时候可能需要在上一层进行编译
- 使用-Wno-error去掉所有警告，或者删除-Werror选项
- CFLAGS

## 2、头文件引入
用include 引用头文件时，双引号和尖括号的区别：

1.双引号：引用非标准库的头文件，编译器首先在程序源文件所在目录查找，如果未找到，则去系统默认目录查找，通常用于引用用户自定义的头文件。
2.尖扩号：只在系统默认目录（在Linux系统中通常为/usr/include目录）或者尖括号内的路径查找，通常用于引用标准库中自带的头文件。
综上，标准库自带的头文件既可以用双引号也可以用尖括号，不过习惯使用尖括号，用户自定义的头文件只能用双引号。


一般情况下 这么用：自己写的用双引号，第三方库或者系统的库的头文件用尖括号。要不然经常会出现乱七八糟的错误。

我习惯用双引号。结果今天在使用mysql的库函数的头文件的时候也用双引号，虽然在附加依赖项里面添加了头文件的路径，最后却被一个找不到头文件的错误搞晕了。

所以切记，只有自己写的用双引号。

## 3、编译文件objs
.d文件是自动生成的makefile类似的。

## 4、编译文件配置
configure
config.mak

## 5、gcc编译的时候添加so文件路径
```
gcc -L/path/to/so/files -o output_file input_file.c -lso_library
```
注意在aarch64环境编译的时候不是使用gcc命令，而是aarch64-linux-gnu-gcc。

## 6、升级gcc
```
原版本：
[root@ubuntu0006:~/cmake] #/usr/bin/gcc-5 --version
gcc-5 (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

新版本（同事已编译好高版本gcc二进制文件）：
tar -xzvf /docker_build/packages/gcc-8.1.0-bin-x86-tar.gz  -C /usr/local/
# 判断/etc/profile文件中是否存在gcc-8.1.0变量字段,g++-8.1.0为特意修改
grep -q "gcc-8.1.0" /etc/profile || \ 
echo 'export PATH="/usr/local/gcc-8.1.0/bin:${PATH}"' >> /etc/profile && \ 
echo 'export CXX="/usr/local/gcc-8.1.0/bin/g++-8.1.0"' >> /etc/profile && \ 
echo 'export CC="/usr/local/gcc-8.1.0/bin/gcc-8.1.0"' >> /etc/profile
source /etc/profile
[root@ubuntu0006:~/cmake] #gcc --version
gcc (GCC) 8.1.0
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

老版本编译无问题：
[root@ubuntu0006:~/cmake] #/usr/bin/gcc-5 c.c

未添加<stdio.h>头文件报错：
[root@ubuntu0006:~/cmake] #gcc c.c
/usr/bin/ld: 找不到 crt1.o: 没有那个文件或目录
/usr/bin/ld: 找不到 crti.o: 没有那个文件或目录
collect2: error: ld returned 1 exit status

添加<stdio.h>头文件报错：
[root@ubuntu0006:~/cmake] #vi c.c
[root@ubuntu0006:~/cmake] #gcc c.c
In file included from /usr/include/stdio.h:27,
                 from c.c:1:
/usr/include/features.h:367:12: fatal error: sys/cdefs.h: 没有那个文件或目录
 #  include <sys/cdefs.h>
            ^~~~~~~~~~~~~
compilation terminated.
[root@ubuntu0006:~/cmake] #cat c.c
#include <stdio.h>

int main()
{
    return 0;
}
```

### 6-1、fatal error: sys/cdefs.h
```
[root@ubuntu0006:~/cmake] #find /usr/ -name "cdefs.h"
/usr/include/x86_64-linux-gnu/sys/cdefs.h
```
本地文件已存在，原因是GCC配置头文件搜索路径未包含/usr/include/x86_64-linux-gnu。
查看 GCC 的搜索路径：gcc -v -E - < /dev/null
在输出中，查找 #include <...> search starts here: 和 End of search list. 之间的路径，确保包含了/usr/include/x86_64-linux-gnu。

最简单和最常用的方法是使用 -I 选项或设置 CPATH 环境变量：
```
gcc -I/usr/include/x86_64-linux-gnu c.c -o c
export CPATH=/usr/include/x86_64-linux-gnu:$CPATH（推荐）
```
修改 GCC 的配置文件（重新编译gcc）：gcc -dumpspecs
使用 gcc 的配置选项（重新编译gcc）：./configure --with-gxx-include-dir=/usr/include/x86_64-linux-gnu

### 6-2、/usr/bin/ld: 找不到 crt1.o: 没有那个文件或目录
同上，crt1.o 文件位于/usr/lib/x86_64-linux-gnu/crt1.o，这表明该文件确实存在于系统中，但链接器可能没有正确配置以查找该路径。
设置 LIBRARY_PATH 环境变量：export LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LIBRARY_PATH
使用 -L 选项：gcc -L/usr/lib/x86_64-linux-gnu main.c -o main

在/etc/profile文件中添加(解决每次接入出现此问题)：
```
export CPATH=/usr/include/x86_64-linux-gnu:$CPATH
export LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LIBRARY_PATH
```

### 6-3、Could not find OpenSSL.  Install an OpenSSL development package or configure CMake with -DCMAKE_USE_OPENSSL=OFF to build without OpenSSL.
cmake -DCMAKE_USE_OPENSSL=OFF .
检查 OpenSSL 是否已安装以及其版本：openssl version
检查 OpenSSL 是否已安装：dpkg -l | grep openssl
确认 OpenSSL 的开发包（例如 libssl-dev 或 openssl-devel）是否已安装：dpkg -l | grep libssl-dev
OpenSSL 是一个开源的加密库，提供了实现安全通信和数据加密所需的各种功能。它广泛用于网络安全、数据保护和身份验证等领域。以下是 OpenSSL 的一些主要功能和用途：

1. 加密和解密
OpenSSL 提供了多种加密算法，包括对称加密（如 AES、DES）和非对称加密（如 RSA、DSA）。这些算法用于保护数据的机密性。

2. SSL/TLS 协议支持
OpenSSL 实现了 SSL（安全套接层）和 TLS（传输层安全性）协议，这些协议用于在计算机网络中提供安全的通信。它们广泛应用于 HTTPS（安全的 HTTP）和其他安全协议中。

3. 数字证书和公钥基础设施（PKI）
OpenSSL 支持生成和管理数字证书，允许用户验证身份和建立信任关系。它可以创建自签名证书、证书请求（CSR）以及与证书颁发机构（CA）交互。

4. 哈希函数
OpenSSL 提供了多种哈希算法（如 SHA-256、MD5），用于数据完整性验证和数字签名。哈希函数将任意长度的数据映射为固定长度的哈希值，常用于数据校验和密码存储。

5. 随机数生成
OpenSSL 提供了强大的随机数生成器，用于生成加密密钥和其他安全相关的随机数。

6. 兼容性和跨平台支持
OpenSSL 是跨平台的，支持多种操作系统（如 Linux、Windows、macOS），并且可以与多种编程语言（如 C、C++、Python、Java）结合使用。

7. 开发工具
OpenSSL 提供了命令行工具和 API，方便开发者进行加密、解密、证书管理等操作。

## 7、g++: fatal error: Killed signal terminated program cclplus
同一份代码在四种架构编译环境进行编译，只有龙芯架构编译环境出现此问题，并且有低概率会出现编译正常的情况。但是单纯从日志中无法看出问题出现在什么地方。

最终查明原因是：编译使用的核数为满核，并行编译的数量过多导致，导致系统出现瓶颈时随机杀死进程，从而导致此问题。
解决方式：降低核数，即减少龙芯客户端打包环境编译数量。
```
@staticmethod
def cpu_count():
    cnt = multiprocessing.cpu_count()
    if platform.machine().lower() == "loongarch64" and cnt > 1:
        cnt /= 2
    return cnt
```

cmake默认值：如果不指定 -j 后的数字，构建工具会根据系统的 CPU 核心数来决定并行任务的数量。
make默认值：如果不指定 -j 后的数字时，make 将以单线程模式执行构建，可能导致较长的构建时间。

- cc1plus 是 GCC 编译器的一个内部进程，用于处理 C++ 源文件。在编译过程中，cc1plus 进程的数量可能会超过你指定的并行作业数，因为每个编译任务可能会启动多个 cc1plus 进程。专门用于处理 C++ 代码。cc1plus 负责将 C++ 源代码编译成机器码。
- 当你不指定 -j 或者使用 -j 后不加数字时，make 默认会以单线程模式运行，这样每次只会有一个 cc1plus 进程在运行。

这些进程的数量并不直接等于 CPU 核心的数量，而是与正在进行的编译任务数量有关。
使用 cmake --build build -j14 时，最多会有 14 个 cc1plus 进程同时运行，前提是有足够的编译任务可供并行处理。
实际的 cc1plus 进程数量可能会因为依赖关系和系统资源的限制而有所不同，但通常不会超过你指定的并行作业数。

一般情况下，-j 后面的数字设置为 CPU 核心数是为了最大化资源利用和避免过载。
虽然可以设置更多的并行作业数，但这可能会导致性能下降，特别是在 I/O 和内存受限的情况下。因此，最佳的并行作业数通常需要根据具体项目和系统资源进行调整。

结论：一般设置为当前核心数来分配并行任务数量，当使用cmake命令时不限定数量时会极大的分配并行任务数量可能会导致编译失败的问题。
cmake -j4就会最多只有4个cc1plus进程。

### 7-1、cc1plus
cc1plus 是 GCC（GNU Compiler Collection）编译器中的一个内部程序，专门用于处理 C++ 源代码。其名称的由来可以分解为以下几个部分：

1. cc
cc 是 "C Compiler" 的缩写，最初用于表示 C 语言编译器。GCC 的早期版本主要是一个 C 编译器，因此这个前缀反映了其起源。

2. 1
数字 1 表示这是编译器的第一个阶段。在 GCC 中，编译过程通常分为多个阶段，例如预处理、编译、汇编和链接。cc1 是 GCC 的第一个编译阶段的程序，负责将源代码转换为中间表示（IR）。

3. plus
plus 表示这是处理 C++ 语言的版本。由于 C++ 是 C 语言的扩展，因此 GCC 为 C++ 编译器创建了一个单独的程序来处理 C++ 代码，这就是 cc1plus。

## 8、fPIC

### 8-1、查看文件编译的时候是否带有-fPIC编译参数
在编译 C/C++ 程序时，-fPIC（Position Independent Code）参数用于生成位置无关代码，这种代码可以在内存中的任何位置加载，通常用于创建共享库（动态链接库）。

在编译和链接过程中，编译器会检查目标文件的重定位信息。如果目标文件没有使用 -fPIC 编译，链接器会发出错误，通常是类似于以下的消息：
```
relocation R_X86_64_32 against `.text' can not be used when making a shared object; recompile with -fPIC
```

未加printf语句的代码无法检测fPIC参数：
```
[root@ubuntu0006:~/cmake] #cat i.c
#include <stdio.h>

int main()
{
    return 0;
}
[root@ubuntu0006:~/cmake] #gcc -c i.c -o a
[root@ubuntu0006:~/cmake] #gcc -c i.c -fPIC -o b
[root@ubuntu0006:~/cmake] #file a
a: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
[root@ubuntu0006:~/cmake] #file b
b: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
[root@ubuntu0006:~/cmake] #readelf -r a

重定位节 '.rela.eh_frame' 位于偏移量 0x170 含有 1 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000020  000200000002 R_X86_64_PC32     0000000000000000 .text + 0
[root@ubuntu0006:~/cmake] #readelf -r b

重定位节 '.rela.eh_frame' 位于偏移量 0x170 含有 1 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000020  000200000002 R_X86_64_PC32     0000000000000000 .text + 0
[root@ubuntu0006:~/cmake] #ldd a
        不是动态可执行文件
[root@ubuntu0006:~/cmake] #ldd b
        不是动态可执行文件
[root@ubuntu0006:~/cmake] #readelf -d a
[root@ubuntu0006:~/cmake] #readelf -d b
[root@ubuntu0006:~/cmake] #nm a
0000000000000000 T main
[root@ubuntu0006:~/cmake] #nm b
0000000000000000 T main
[root@ubuntu0006:~/cmake] #readelf --relocs a | egrep '(GOT|PLT|JUMP_SLOT)'
[root@ubuntu0006:~/cmake] #readelf --relocs b | egrep '(GOT|PLT|JUMP_SLOT)'
[root@ubuntu0006:~/cmake] #objdump -d a

a：     文件格式 elf64-x86-64


Disassembly of section .text:

0000000000000000 <main>:
   0:   b8 00 00 00 00          mov    $0x0,%eax
   5:   c3                      retq
[root@ubuntu0006:~/cmake] #objdump -d b

b：     文件格式 elf64-x86-64


Disassembly of section .text:

0000000000000000 <main>:
   0:   b8 00 00 00 00          mov    $0x0,%eax
   5:   c3                      retq
```

在i.c文件中增加一句printf语句后再编译成a和b文件：
```
[root@ubuntu0006:~/cmake] #cat i.c
#include <stdio.h>

int main()
{
    printf("hejian\n");
    return 0;
}
[root@ubuntu0006:~/cmake] #file a
a: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
[root@ubuntu0006:~/cmake] #file b
b: ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped
[root@ubuntu0006:~/cmake] #nm a
0000000000000000 T main
                 U puts
[root@ubuntu0006:~/cmake] #nm b
                 U _GLOBAL_OFFSET_TABLE_
0000000000000000 T main
                 U puts
[root@ubuntu0006:~/cmake] #objdump -d a

a：     文件格式 elf64-x86-64


Disassembly of section .text:

0000000000000000 <main>:
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   bf 00 00 00 00          mov    $0x0,%edi
   9:   e8 00 00 00 00          callq  e <main+0xe>
   e:   b8 00 00 00 00          mov    $0x0,%eax
  13:   5d                      pop    %rbp
  14:   c3                      retq
[root@ubuntu0006:~/cmake] #objdump -d b

b：     文件格式 elf64-x86-64


Disassembly of section .text:

0000000000000000 <main>:
   0:   55                      push   %rbp
   1:   48 89 e5                mov    %rsp,%rbp
   4:   48 8d 3d 00 00 00 00    lea    0x0(%rip),%rdi        # b <main+0xb>
   b:   e8 00 00 00 00          callq  10 <main+0x10>
  10:   b8 00 00 00 00          mov    $0x0,%eax
  15:   5d                      pop    %rbp
  16:   c3                      retq
[root@ubuntu0006:~/cmake] #readelf -r a

重定位节 '.rela.text' 位于偏移量 0x1c0 含有 2 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000005  00050000000a R_X86_64_32       0000000000000000 .rodata + 0
00000000000a  000a00000002 R_X86_64_PC32     0000000000000000 puts - 4

重定位节 '.rela.eh_frame' 位于偏移量 0x1f0 含有 1 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000020  000200000002 R_X86_64_PC32     0000000000000000 .text + 0
[root@ubuntu0006:~/cmake] #readelf -r b

重定位节 '.rela.text' 位于偏移量 0x1f0 含有 2 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000007  000500000002 R_X86_64_PC32     0000000000000000 .rodata - 4
00000000000c  000b00000004 R_X86_64_PLT32    0000000000000000 puts - 4

重定位节 '.rela.eh_frame' 位于偏移量 0x220 含有 1 个条目：
  偏移量          信息           类型           符号值        符号名称 + 加数
000000000020  000200000002 R_X86_64_PC32     0000000000000000 .text + 0
[root@ubuntu0006:~/cmake] #readelf --relocs a | egrep '(GOT|PLT|JUMP_SLOT)'
[root@ubuntu0006:~/cmake] #readelf --relocs b | egrep '(GOT|PLT|JUMP_SLOT)'
00000000000c  000b00000004 R_X86_64_PLT32    0000000000000000 puts - 4
```

注意文件不能是二进制文件：
```
[root@ubuntu0006:~/cmake] #gcc i.c -fPIC -o a
[root@ubuntu0006:~/cmake] #ldd a
        linux-vdso.so.1 =>  (0x00007ffd849b4000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f635dfcd000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f635e397000)
[root@ubuntu0006:~/cmake] #readelf --relocs a | egrep '(GOT|PLT|JUMP_SLOT)'
[root@ubuntu0006:~/cmake] #gcc -c i.c -fPIC -o a
[root@ubuntu0006:~/cmake] #readelf --relocs a | egrep '(GOT|PLT|JUMP_SLOT)'
00000000000c  000b00000004 R_X86_64_PLT32    0000000000000000 puts - 4
[root@ubuntu0006:~/cmake] #ldd a
        不是动态可执行文件
```

- 使用 readelf 或 objdump 等工具查看二进制文件的重定位信息
- 使用 nm 命令查看符号表，检查是否有与位置无关的符号

### 8-2、了解fPIC
https://blog.csdn.net/weixin_43679037/article/details/128057444

在生成动态库时，常常习惯性的加上 fPIC 选项。fPIC 的全称是 Position Independent Code， 用于生成位置无关代码。什么是位置无关代码，个人理解是代码无绝对跳转，跳转都为相对跳转。

### 8-3、不加 fPIC 选项
不加也能编译动态库
即使不加 fPIC 也可以生成 .so 文件，但是对于源文件有要求，例如因为不加 fPIC 编译的 so 必须要在加载到用户程序的地址空间时重定向所有表目，所以在它里面不能引用其它地方的代码，
```
[root@ubuntu0006:~/cmake] #gcc -shared -o libb3.so c.c
/usr/bin/ld: /tmp/ccuPWHzC.o: relocation R_X86_64_32 against `.rodata' can not be used when making a shared object; recompile with -fPIC
/tmp/ccuPWHzC.o: 无法添加符号: 错误的值
collect2: error: ld returned 1 exit status
[root@ubuntu0006:~/cmake] #vi c.c
[root@ubuntu0006:~/cmake] #gcc -shared -o libb3.so c.c
[root@ubuntu0006:~/cmake] #cat c.c

#include <stdio.h>

int func1(int a)
{
    //printf("haha a=%d\n", 2);
    a++;
    return a;
}
```
原因
对于不加 -fPIC 生成的动态库，“ 生成动态库时假定它被加载在地址 0 处。加载时它会被加载到一个地址（base），这时要进行一次重定位（relocation），把代码、数据段中所有的地址加上这个 base 的值。这样代码运行时就能使用正确的地址了。”

### 8-4、加 fPIC 选项
原因
加上 fPIC 选项生成的动态库，显然是位置无关的，这样的代码本身就能被放到线性地址空间的任意位置，无需修改就能正确执行。通常的方法是获取指令指针的值，加上一个偏移得到全局变量 / 函数的地址。

好处
加 fPIC 选项的源文件对于它引用的函数头文件编写有很宽松的尺度。比如只需要包含个声明的函数的头文件，即使没有相应的 C 文件来实现，编译成 so 库照样可以通过。

### 8-5、在内存引用上，加不加 fPIC 的异同
fpic作用
①加了 fPIC 实现真正意义上的多个进程共享 so 文件。
多个进程引用同一个 PIC 动态库时，可以共用内存。这一个库在不同进程中的虚拟地址不同，但操作系统显然会把它们映射到同一块物理内存上。
不加fpic作用
对于不加 fPIC，则加载 so 文件时，需要对代码段引用的数据对象需要重定位，重定位会修改代码段的内容，这就造成每个使用这个 .so 文件代码段的进程在内核里都会生成这个 .so 文件代码段的 copy。每个 copy 都不一样，取决于这个 .so 文件代码段和数据段内存映射的位置。
不加fpic的缺点
可见，这种方式更消耗内存。
不加fpic的优点
但是不加 fPIC 编译的 so 文件的优点是加载速度比较快。

### 8-6、添加-fPIC参数
```
# 启用位置无关代码
set(CMAKE_POSITION_INDEPENDENT_CODE ON)

or

add_library(your_library_name STATIC your_source_files)
target_compile_options(your_library_name PRIVATE -fPIC)

or

CFLAGS="-fPIC" CXXFLAGS="-fPIC" ./configure

or

打开 configure.ac 文件:
CFLAGS="$CFLAGS -fPIC"
CXXFLAGS="$CXXFLAGS -fPIC"

or

cd three-part-depends/libjpeg-turbo-1.4.1 && \
CFLAGS="-fPIC" CXXFLAGS="-fPIC" sh configure \
    $(JPEG_CONFIG_HOST) \
    CC=$(GCC_PREFIX)gcc \
    --prefix=$(JPEG_INSTALL_PATH) \
    JPEG_LIB_VERSION=62
```

## 9、触发重新编译
```
make clean

or

make -B

or

touch i.c

or

rm *.o  # 删除所有目标文件
```
