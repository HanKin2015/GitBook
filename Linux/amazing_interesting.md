# 惊讶有趣的事情

## 1、gdb调试无任何有用信息

### 1-1、CMake添加-g编译选项/CMake编译Debug版本
在文件 CMakeLists.txt添加下面一条语句
```
add_definitions("-Wall -g")
```

命令行配置
```
cmake  -DCMAKE_BUILD_TYPE=Debug ..
```

### 1-2、coredump文件配置
```
cat /proc/sys/kernel/core_pattern

| /usr/local/bin/gzip_core_dump.sh /other/core/%e.core.%s.%p

gzip_core_dump.sh

#!/bin/bash
/bin/cat > "$1"
#/bin/gzip > "$1"
```

### 1-3、gdb调试无任何有用信息
```
gdb example example.core.7.30798
or
gdb example & r
```

正常的情况：
```
root@adesk:~# ldd example
        linux-vdso.so.1 (0x00007fff8350d000)
        libuvc.so.0 => /usr/lib/libuvc.so.0 (0x00007fc28893a000)
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007fc28871d000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fc28837e000)
        libusb-1.0.so.0 => /usr/local/lib/libusb-1.0.so.0 (0x00007fc288167000)
        libjpeg.so.62 => /usr/local/lib/libjpeg.so.62 (0x00007fc287eff000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fc288b4e000)
        libudev.so.1 => /lib/x86_64-linux-gnu/libudev.so.1 (0x00007fc288d38000)
        librt.so.1 => /lib/x86_64-linux-gnu/librt.so.1 (0x00007fc287cf7000)
root@adesk:~# rm /usr/lib/libuvc.so.0
root@adesk:~# ldd example
        linux-vdso.so.1 (0x00007ffcc776f000)
        libuvc.so.0 => not found
        libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f8e1ffbd000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f8e1fc1e000)
        /lib64/ld-linux-x86-64.so.2 (0x00007f8e201da000)
```

异常的情况：
```
root@adesk:~# ldd libuvc.so.0
ldd: exited with unknown exit code (135)
root@adesk:~# file libuvc.so.0
libuvc.so.0: ELF 64-bit LSB shared object, x86-64, version 1 (SYSV), dynamically linked, missing section headers
root@adesk:~# readelf libuvc.so.0 -h
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              DYN (Shared object file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x4a60
  Start of program headers:          64 (bytes into file)
  Start of section headers:          91504 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         6
  Size of section headers:           64 (bytes)
  Number of section headers:         29
  Section header string table index: 26
readelf: Error: Reading 0x740 bytes extends past end of file for section headers
readelf: Error: the dynamic segment offset + size exceeds the size of the file

root@adesk:~# ldd example
root@adesk:~# nm libuvc.so.0
nm: libuvc.so.0: File truncated
root@adesk:~# ./example
Bus error (core dumped)

(gdb) bt
#0  0x00007ffff7df4d41 in ?? () from /lib64/ld-linux-x86-64.so.2
#1  0x00007ffff7ddf406 in ?? () from /lib64/ld-linux-x86-64.so.2
#2  0x00007ffff7de180c in ?? () from /lib64/ld-linux-x86-64.so.2
#3  0x00007ffff7de6080 in ?? () from /lib64/ld-linux-x86-64.so.2
#4  0x00007ffff7de8704 in ?? () from /lib64/ld-linux-x86-64.so.2
#5  0x00007ffff7de62ef in ?? () from /lib64/ld-linux-x86-64.so.2
#6  0x00007ffff7ddc6c2 in ?? () from /lib64/ld-linux-x86-64.so.2
#7  0x00007ffff7df085e in ?? () from /lib64/ld-linux-x86-64.so.2
#8  0x00007ffff7ddaae8 in ?? () from /lib64/ld-linux-x86-64.so.2
#9  0x00007ffff7dd9c28 in ?? () from /lib64/ld-linux-x86-64.so.2
#10 0x0000000000000001 in ?? ()
#11 0x00007fffffffedcb in ?? ()
#12 0x0000000000000000 in ?? ()
```

结论：损坏的ELF库文件，程序链接到损坏的so文件后，自身也会发生莫名其妙的化学反应。
https://blog.csdn.net/epubit17/article/details/121138474

## 2、微软程序匹配很迷糊
```
D:\Github\Storage\batch>devcon find "USB*4*"
USB\ROOT_HUB\4&F9F7C6&0                                     : USB Root Hub
USB\ROOT_HUB\4&2002FA77&0                                   : USB Root Hub
2 matching device(s) found.

D:\Github\Storage\batch>devcon find "USB*"
USB\ROOT_HUB\4&32218256&0                                   : USB Root Hub
USB\ROOT_HUB\4&36880E1&0                                    : USB Root Hub
USB\ROOT_HUB\4&F9F7C6&0                                     : USB Root Hub
USB\ROOT_HUB20\4&2ACC3A04&0                                 : USB Root Hub
USB\ROOT_HUB20\4&326BD9DE&0                                 : USB Root Hub
USB\ROOT_HUB\4&17BD5F01&0                                   : USB Root Hub
USB\ROOT_HUB\4&192D568&0                                    : USB Root Hub
USB\ROOT_HUB\4&1CB239E3&0                                   : USB Root Hub
USB\ROOT_HUB\4&2002FA77&0                                   : USB Root Hub
9 matching device(s) found.
```















