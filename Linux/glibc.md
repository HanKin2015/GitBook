# glibc

http://ftp.gnu.org/gnu/glibc/

## 错误
/lib64/libc.so.6: version `GLIBC_2.14’ not found

## 解决
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
