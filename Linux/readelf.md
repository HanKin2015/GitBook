# readelf命令

## 1、简介
readelf命令，一般用于查看ELF格式的文件信息，常见的文件如在Linux上的可执行文件，动态库(*.so)或者静态库(*.a) 等包含ELF格式的文件。

## 2、ELF格式文件
ELF （文件格式）在计算机科学中，是一种用于二进制文件、可执行文件、目标代码、共享库和核心转储格式文件。
是UNIX系统实验室（USL）作为应用程序二进制接口（Application Binary Interface，ABI）而开发和发布的，也是Linux的主要可执行文件格式。
1999年，被86open项目选为x86架构上的类Unix操作系统的二进制文件标准格式，用来取代COFF。因其可扩展性与灵活性，也可应用在其它处理器、计算机系统架构的操作系统上。

## 3、PE格式文件
PE文件的全称是Portable Executable，意为可移植的可执行的文件，常见的EXE、DLL、OCX、SYS、COM都是PE文件，PE文件是微软Windows操作系统上的程序文件（可能是间接被执行，如DLL）。

## 4、语法(不全，常用)
语法：readelf (选项)(参数:文件),除了-v和-H之外，其它的选项必须有一个被指定参数

1、选项 -h(elf header)，显示elf文件开始的文件头信息。
2、选项 -l(program headers),segments 显示程序头（段头）信息(如果有数据的话)。
3、选项 -S(section headers),sections 显示节头信息(如果有数据的话)。
4、选项 -g(section groups),显示节组信息(如果有数据的话)。
5、选项 -t,section-details 显示节的详细信息(-S的)。
6、选项 -s,symbols 显示符号表段中的项（如果有数据的话）。
7、选项 -e,headers 显示全部头信息，等价于: -h -l -S 。
8、选项 -n,notes 显示note段（内核注释）的信息 。
9、选项 -r,relocs 显示可重定位段的信息。

## 5、实战
可以查看二进制执行文件的系统架构。
```
[root@ubuntu0006:/media/hankin/vdb/study] #g++ -c study_c++filt.cpp -o study_c++filt.o
[root@ubuntu0006:/media/hankin/vdb/study] #readelf -h study_c++filt.o
ELF 头：
  Magic：   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          0
  类型:                              REL (可重定位文件)
  系统架构:                          Advanced Micro Devices X86-64
  版本:                              0x1
  入口点地址：               0x0
  程序头起点：          0 (bytes into file)
  Start of section headers:          3040 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       0 (字节)
  Number of program headers:         0
  节头大小：         64 (字节)
  节头数量：         16
  字符串表索引节头： 13
[root@ubuntu0006:/media/hankin/vdb/study] #readelf -s study_c++filt.o

Symbol table '.symtab' contains 33 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND
     1: 0000000000000000     0 FILE    LOCAL  DEFAULT  ABS study_c++filt.cpp
     2: 0000000000000000     0 SECTION LOCAL  DEFAULT    1
     3: 0000000000000000     0 SECTION LOCAL  DEFAULT    3
     4: 0000000000000000     0 SECTION LOCAL  DEFAULT    4
     5: 0000000000000000     1 OBJECT  LOCAL  DEFAULT    4 _ZStL8__ioinit
     6: 0000000000000000     0 SECTION LOCAL  DEFAULT    5
     7: 0000000000000000     4 OBJECT  LOCAL  DEFAULT    5 _ZL5dTest
     8: 0000000000000000     0 SECTION LOCAL  DEFAULT    6
     9: 00000000000000f2    62 FUNC    LOCAL  DEFAULT    1 _Z41__static_initializati
    10: 0000000000000130    21 FUNC    LOCAL  DEFAULT    1 _GLOBAL__sub_I__Z5printRK
    11: 0000000000000000     0 SECTION LOCAL  DEFAULT    7
    12: 0000000000000000     0 SECTION LOCAL  DEFAULT   10
    13: 000000000
```

## 6、ldd执行结果：不是动态可执行文件
https://blog.csdn.net/lyndon_li/article/details/111397974

readelf 也可以看到依赖的动态库
-d --dynamic           Display the dynamic section (if present)

```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #ldd client
        不是动态可执行文件
[root@ubuntu0006:/media/hankin/vdb/study/read_write] #ldd a.out
        linux-vdso.so.1 =>  (0x00007ffce8d9c000)
        libstdc++.so.6 => /usr/lib/x86_64-linux-gnu/libstdc++.so.6 (0x00007fbb05bda000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fbb05810000)
        libm.so.6 => /lib/x86_64-linux-gnu/libm.so.6 (0x00007fbb05507000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fbb05f5c000)
        libgcc_s.so.1 => /lib/x86_64-linux-gnu/libgcc_s.so.1 (0x00007fbb052f1000)
[root@ubuntu0006:/media/hankin/vdb/study/read_write] #readelf -d a.out

Dynamic section at offset 0x1e18 contains 25 entries:
  标记        类型                         名称/值
 0x0000000000000001 (NEEDED)             共享库：[libstdc++.so.6]
 0x0000000000000001 (NEEDED)             共享库：[libc.so.6]
 0x000000000000000c (INIT)               0x400a10
 0x000000000000000d (FINI)               0x401564
 0x0000000000000019 (INIT_ARRAY)         0x601df8
 0x000000000000001b (INIT_ARRAYSZ)       16 (bytes)
 0x000000000000001a (FINI_ARRAY)         0x601e08
 0x000000000000001c (FINI_ARRAYSZ)       8 (bytes)
 0x000000006ffffef5 (GNU_HASH)           0x400298
 0x0000000000000005 (STRTAB)             0x400598
 0x0000000000000006 (SYMTAB)             0x4002c8
 0x000000000000000a (STRSZ)              375 (bytes)
 0x000000000000000b (SYMENT)             24 (bytes)
 0x0000000000000015 (DEBUG)              0x0
 0x0000000000000003 (PLTGOT)             0x602000
 0x0000000000000002 (PLTRELSZ)           552 (bytes)
 0x0000000000000014 (PLTREL)             RELA
 0x0000000000000017 (JMPREL)             0x4007e8
 0x0000000000000007 (RELA)               0x4007a0
 0x0000000000000008 (RELASZ)             72 (bytes)
 0x0000000000000009 (RELAENT)            24 (bytes)
 0x000000006ffffffe (VERNEED)            0x400750
 0x000000006fffffff (VERNEEDNUM)         2
 0x000000006ffffff0 (VERSYM)             0x400710
 0x0000000000000000 (NULL)               0x0
[root@ubuntu0006:/media/hankin/vdb/study/read_write] #readelf -d a.out | grep NEEDED
 0x0000000000000001 (NEEDED)             共享库：[libstdc++.so.6]
 0x0000000000000001 (NEEDED)             共享库：[libc.so.6]
```

## 7、二进制文件无法执行
原因可能是二进制文件是为32位系统构建的，但是您正在64位系统上进行检查。
原因也可能是二进制文件是AArch64系统架构的，但是您正在x86结构上进行检查。
还有一种可能就是两个系统内核版本不同导致，如在UOS1032版本编译，然后二进制文件在UOS1050版本运行。。
```
[hankin]# ldd a.out
/usr/bin/ldd: line 94: lddlibc4: command not found
        not a dynamic executable
[hankin]# ./a.out
-bash: ./a.out: cannot execute binary file
[hankin]# uname -a
Linux KERNAL 2.4.32-hello123-bic #149 SMP Fri Dec 12 11:35:24 CST 2014 i686 i686 i386 GNU/Linux

[compile]# ldd a.out
        linux-vdso.so.1 =>  (0x00007ffd2d91b000)
        libc.so.6 => /lib64/libc.so.6 (0x00007fde867bf000)
        /lib64/ld-linux-x86-64.so.2 (0x00005595475c2000)
[compile]# readelf a.out -h
ELF Header:
  Magic:   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  Class:                             ELF64
  Data:                              2's complement, little endian
  Version:                           1 (current)
  OS/ABI:                            UNIX - System V
  ABI Version:                       0
  Type:                              EXEC (Executable file)
  Machine:                           Advanced Micro Devices X86-64
  Version:                           0x1
  Entry point address:               0x400440
  Start of program headers:          64 (bytes into file)
  Start of section headers:          6432 (bytes into file)
  Flags:                             0x0
  Size of this header:               64 (bytes)
  Size of program headers:           56 (bytes)
  Number of program headers:         9
  Size of section headers:           64 (bytes)
  Number of section headers:         30
  Section header string table index: 29
```
i686 是 Intel 32 位处理器架构的一种变体，通常用于较旧的计算机或者嵌入式系统。
i386 是 Intel 32 位处理器架构的一种变体，常用于早期的个人计算机和一些嵌入式系统。