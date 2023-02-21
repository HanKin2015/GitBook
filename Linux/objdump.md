# objdump

## 1、objdump反汇编常用参数
objdump -d <file(s)>: 将代码段反汇编；
objdump -S <file(s)>: 将代码段反汇编的同时，将反汇编代码与源代码交替显示，编译时需要使用-g参数，即需要调试信息，不需要再包含-d；
objdump -C <file(s)>: 将C++符号名逆向解析
objdump -l <file(s)>: 反汇编代码中插入文件名和行号
objdump -j section <file(s)>: 仅反汇编指定的section


objdump -f test
显示test的文件头信息

objdump -d test
反汇编test中的需要执行指令的那些section

objdump -D test
与-d类似，但反汇编test中的所有section

objdump -h test
显示test的Section Header信息

objdump -x test
显示test的全部Header信息

objdump -s test
除了显示test的全部Header信息，还显示他们对应的十六进制文件代码

## 2、常用指令
objdump -CS a.out

## 3、汇编指令查询
https://baike.baidu.com/item/%E6%B1%87%E7%BC%96%E6%8C%87%E4%BB%A4/9979890?fr=aladdin

