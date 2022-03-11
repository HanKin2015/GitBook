# readelf命令

## 1、简介
readelf命令，一般用于查看ELF格式的文件信息，常见的文件如在Linux上的可执行文件，动态库(*.so)或者静态库(*.a) 等包含ELF格式的文件。

## 2、ELF格式文件
ELF （文件格式）在计算机科学中，是一种用于二进制文件、可执行文件、目标代码、共享库和核心转储格式文件。
是UNIX系统实验室（USL）作为应用程序二进制接口（Application Binary Interface，ABI）而开发和发布的，也是Linux的主要可执行文件格式。
1999年，被86open项目选为x86架构上的类Unix操作系统的二进制文件标准格式，用来取代COFF。因其可扩展性与灵活性，也可应用在其它处理器、计算机系统架构的操作系统上。

## 3、语法
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

## 4、实战
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








