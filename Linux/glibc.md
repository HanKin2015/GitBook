# glibc

http://ftp.gnu.org/gnu/glibc/

## 1、/lib64/libc.so.6: version `GLIBC_2.14’ not found

### 解决方案是升级
使用命令查看是否存在GLIBC_2.14
strings /lib64/libc.so.6 | grep GLIBC
如果没有运行以下命令
```
wget http://ftp.gnu.org/gnu/glibc/glibc-2.17.tar.gz
tar -xf glibc-2.17.tar.gz
cd glibc-2.17
mkdir build
cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make -j 8
make install
strings /lib64/libc.so.6 | grep GLIBC
```

## 2、运行python生成的二进制文件无法运行
```
[root@localhost 桌面]# ./upan_auto_copy_read
[4245] Error loading Python lib '/tmp/_MEIfYRqsz/libpython3.6m.so.1.0': dlopen: /lib64/libc.so.6: version `GLIBC_2.25' not found (required by /tmp/_MEIfYRqsz/libpython3.6m.so.1.0)
[root@localhost 桌面]# strings upan_auto_copy_read | grep GLIBC
GLIBC_2.2.5
GLIBC_2.3
GLIBC_2.4
GLIBC_2.3.4
[root@localhost 桌面]# strings /lib64/libc.so.6 | grep -i "^GLIBC"
GLIBC_2.2.5
GLIBC_2.2.6
GLIBC_2.3
GLIBC_2.3.2
GLIBC_2.3.3
GLIBC_2.3.4
GLIBC_2.4
GLIBC_2.5
GLIBC_2.6
GLIBC_2.7
GLIBC_2.8
GLIBC_2.9
GLIBC_2.10
GLIBC_2.11
GLIBC_2.12
GLIBC_2.13
GLIBC_2.14
GLIBC_2.15
GLIBC_2.16
GLIBC_2.17
```

### 解决方案是升级
```
wget http://ftp.gnu.org/gnu/glibc/glibc-2.25.tar.gz
tar -xf glibc-2.25.tar.gz
cd glibc-2.25
mkdir build
cd build
../configure --prefix=/usr --disable-profile --enable-add-ons --with-headers=/usr/include --with-binutils=/usr/bin
make -j 8
make install
strings /lib64/libc.so.6 | grep GLIBC
```
