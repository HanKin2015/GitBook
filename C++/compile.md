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
[root@ubuntu0006:~/cmake] #vi c.c
添加<stdio.h>头文件报错：
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
在输出中，查找 #include <...> search starts here: 和 End of search list. 之间的路径，确保包含了 /usr/include/x86_64-linux-gnu。

最简单和最常用的方法是使用 -I 选项或设置 CPATH 环境变量：
export CPATH=/usr/include/x86_64-linux-gnu:$CPATH
export LIBRARY_PATH=/usr/lib/x86_64-linux-gnu:$LIBRARY_PATH


## Could not find OpenSSL.  Install an OpenSSL development package or configure CMake with -DCMAKE_USE_OPENSSL=OFF to build without OpenSSL.
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


