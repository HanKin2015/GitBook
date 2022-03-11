# c++filt命令 

## 1、简介
c++filt 命令可用于解析 C++ 和 Java 中被修饰的符号，比如变量与函数名称。

我们知道， 在 C++ 和 Java 中， 允许函数重载，也就是说我们可以写出多个同名但参数类型不同的函数，其实现依赖于编译器的名字改编（Name Mangling）机制，即编译器会将函数的名称进行修饰，加入参数信息。

## 2、例子说明
使用strings命令能打印出需要的函数名，使用readelf -s也可以。还可以使用nm命令。

```
[root@ubuntu0006:/media/hankin/vdb/study] #cat study_c++filt.cpp
#include <iostream>
#include <string>

using namespace std;

const int dTest=0;

void print(const string& strElfFileName)
{
    std::cout<< "readelf "<<strElfFileName<<std::endl;
    return;
}

int main()
{
    string str = "hello world";
    print(str);
    return 0;
}
[root@ubuntu0006:/media/hankin/vdb/study] #strings study_c++filt.o
readelf
hello world
GCC: (Ubuntu 5.4.0-6ubuntu1~16.04.12) 5.4.0 20160609
zPLR
study_c++filt.cpp
_ZStL8__ioinit
_ZL5dTest
_Z41__static_initialization_and_destruction_0ii
_GLOBAL__sub_I__Z5printRKNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEE
_ZSt4cout
_ZStlsISt11char_traitsIcEERSt13basic_ostreamIcT_ES5_PKc
_ZStlsIcSt11char_traitsIcESaIcEERSt13basic_ostreamIT_T0_ES7_RKNSt7__cxx1112basic_stringIS4_S5_T1_EE
_ZSt4endlIcSt11char_traitsIcEERSt13basic_ostreamIT_T0_ES6_
_ZNSolsEPFRSoS_E
main
__gxx_personality_v0
_ZNSaIcEC1Ev
_ZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEC1EPKcRKS3_
_ZNSaIcED1Ev
_ZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEED1Ev
_Unwind_Resume
__stack_chk_fail
_ZNSt8ios_base4InitC1Ev
__dso_handle
_ZNSt8ios_base4InitD1Ev
__cxa_atexit
.symtab
.strtab
.shstrtab
.rela.text
.data
.bss
.rodata
.gcc_except_table
.rela.init_array
.comment
.note.GNU-stack
.rela.eh_frame
[root@ubuntu0006:/media/hankin/vdb/study] #c++filt _ZL5dTest
dTest
[root@ubuntu0006:/media/hankin/vdb/study] #c++filt _ZSt4cout
std::cout
```

源码文件中的变量名和函数名被修饰后，通过 c++filt 命令可以还原回来，这正是 c++filt 命令的功能。


每个编译器都有一套自己内部的名字，比如对于linux下g++而言。以下是基本的方法：
每个方法都是以_Z开头，对于嵌套的名字（比如名字空间中的名字或者是类中间的名字,比如Class::Func）后面紧跟N ， 然后是各个名字空间和类的名字，每个名字前是名字字符的长度，再以E结尾。(如果不是嵌套名字则不需要以E结尾)。

比如对于_Z3foov 就是函数foo() , v 表示参数类型为void。又如N:C:Func 经过修饰后就是 _ZN1N1C4FuncE，这个函数名后面跟参数类型。 如果跟一个整型，那就是_ZN1N1C4FuncEi。









