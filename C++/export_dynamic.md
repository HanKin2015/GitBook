# -Wl,-export-dynamic参数
https://blog.csdn.net/zhensansan/article/details/104590688



## 示例实战
```
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #make
gcc -fPIC -c main.c -o main.o
gcc -fPIC -c lib_so1.c -o lib_so1.o
gcc -shared -o lib_so1.so lib_so1.o
gcc -o main main.o -ldl
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #./main
lib_so1.c[6]:fun_so
./main: symbol lookup error: ./lib_so1.so: undefined symbol: fun
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #ldd main
        linux-vdso.so.1 =>  (0x00007fffed3df000)
        libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007fa3b0d85000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007fa3b09bb000)
        /lib64/ld-linux-x86-64.so.2 (0x00007fa3b0f89000)
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #readelf -sD main
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #gcc -o main main.o -ldl -Wl,-export-dynamic
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #./main
lib_so1.c[6]:fun_so
main.c[8]:fun
in main
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #readelf -sD main

Symbol table of `.gnu.hash' for image:
  Num Buc:    Value          Size   Type   Bind Vis      Ndx Name
   11   0: 0000000000601058     0 NOTYPE  GLOBAL DEFAULT  25 _edata
   12   0: 0000000000601048     0 NOTYPE  GLOBAL DEFAULT  25 __data_start
   13   0: 0000000000601060     0 NOTYPE  GLOBAL DEFAULT  26 _end
   14   1: 0000000000601048     0 NOTYPE  WEAK   DEFAULT  25 data_start
   15   1: 0000000000400a20     4 OBJECT  GLOBAL DEFAULT  16 _IO_stdin_used
   16   1: 00000000004009a0   101 FUNC    GLOBAL DEFAULT  14 __libc_csu_init
   17   1: 0000000000400800    42 FUNC    GLOBAL DEFAULT  14 _start
   18   1: 0000000000601058     0 NOTYPE  GLOBAL DEFAULT  26 __bss_start
   19   1: 0000000000400931   108 FUNC    GLOBAL DEFAULT  14 main
   20   1: 0000000000400758     0 FUNC    GLOBAL DEFAULT  11 _init
   21   2: 0000000000400a10     2 FUNC    GLOBAL DEFAULT  14 __libc_csu_fini
   22   2: 0000000000400a14     0 FUNC    GLOBAL DEFAULT  15 _fini
   23   2: 00000000004008f6    59 FUNC    GLOBAL DEFAULT  14 fun
[root@ubuntu0006:/media/hankin/vdb/study/dynamic] #
```