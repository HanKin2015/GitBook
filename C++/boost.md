# Boost库

## 1、简介
Boost是为C++语言标准库提供扩展的一些C++程序库的总称。Boost库是一个可移植、提供源代码的C++库，作为标准库的后备，是C++标准化进程的开发引擎之一，是为C++语言标准库提供扩展的一些C++程序库的总称。
Boost库由C++标准委员会库工作组成员发起，其中有些内容有望成为下一代C++标准库内容。在C++社区中影响甚大，是不折不扣的“准”标准库。
Boost由于其对跨平台的强调，对标准C++的强调，与编写平台无关。但Boost中也有很多是实验性质的东西，在实际的开发中使用需要谨慎。

Boost 是一个高效的 C++ 开源库集合，提供了丰富的模板类和函数接口，涵盖智能指针、容器、算法等功能。Boost 的设计目标是提高开发效率，减少错误，并与 C++ 标准库无缝集成。许多 Boost 库已成为 C++ 标准的一部分。

## 2、hpp文件
Boost的独特之处：它把C++类的声明和实现放在了一个文件中，而不是分成两个文件，即.h+.cpp，故文件的后缀是.hpp。

HPP，计算机术语，指用C/C++语言编写的头文件，通常用来定义数据类型，声明变量、函数、结构和类。

实质将.cpp实现代码混入.h头文件当中。
特点是定义与实现都包含在同一文件。

hpp,其实质就是将.cpp的实现代码混入.h头文件当中，定义与实现都包含在同一文件，则该类的调用者只需要include该hpp文件即可，无需再 将cpp加入到project中进行编译。而实现代码将直接编译到调用者的obj文件中，不再生成单独的obj,采用hpp将大幅度减少调用 project中的cpp文件数与编译次数，也不用再发布烦人的lib与dll,因此非常适合用来编写公用的开源库。

1、是Header Plus Plus 的简写。
2、与\*.h类似，hpp是C++程序头文件 。
3、是VCL 专用的头文件,已预编译。
4、是一般模板类的头文件。
5、一般来说，\*.h里面只有声明，没有实现，而\*.hpp里声明实现都有，后者可以减少.cpp的数量。

这里以前存在对hpp文件的误解，以为hpp不过是h文件的替代品，并没有什么区别，是我草率了，肤浅了。

\*.hpp要注意的问题有：
a)不可包含全局对象和全局函数
由于hpp本质上是作为.h被调用者include，所以当hpp文件中存在全局对象或者全局函数，而该hpp被多个
调用者include时，将在链接时导致符号重定义错误。要避免这种情况，需要去除全局对象，将全局函数封
装为类的静态方法。
b)类之间不可循环调用
c)不可使用静态成员

## 3、安装boost库
解压后主要目录结构说明如下：
--boost：最重要的目录 , 90 % 以上的 Boost 程序库源码都在这里
--doc：HTMI 格式的文档 , 也可以生成 PDF 格式的文档
--libs：所有组件的示例、测试、编译代码和说明文档
--more：库作者的相关文档
--status：可用于测试 Boost 库的各个组件
--tools：用于编译boost的工具的源代码等

官网：https://www.boost.org/
boost_1_88_0.tar.gz 161MB
127.9MB

tar xvf boost_1_79_0.tar.gz
cd boost_1_79_0/
./bootstrap.sh
./b2
./b2 install

其他参数见：https://zhuanlan.zhihu.com/p/85806857

## 4、demo测试
```
#include <iostream>
#include "boost/version.hpp"

int main()
{
    std::cout << BOOST_LIB_VERSION << std::endl;
    std::cout << BOOST_VERSION << std::endl;
}
/*
[root@ubuntu0006:/media/hankin/vdb/boost] #./a.out
1_79
107900
*/
```

## 5、Boost 的核心功能
Boost 提供了超过 165 个库，以下是一些常用库的功能：
Boost.Asio：支持异步网络编程。
Boost.Regex：提供正则表达式支持。
Boost.Thread：用于多线程开发。
Boost.SmartPointer：简化动态内存管理。
Boost.DateTime：灵活处理日期和时间。
Boost.Serialization：支持对象序列化和反序列化。

系统学习：http://zh.highscore.de/cpp/boost/frontpage.html

没必要花时间去学习，多花时间在STL上更好，知道怎么使用boost库即可，用到的时候再学习。
取决于你用的C++版本。真正的工业界能用到14就烧香了，17已经是奢望了。用20那是疯了。
另外，boost还有不少专用的库，总比手撸好，我认为比到处找没谱的库也好
原因：复杂，难以理解。








