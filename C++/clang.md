# clang库

## 1、llvm 与clang介绍
LLVM 是 Low Level Virtual Machine 的简称，这个库提供了与编译器相关的支持，能够进行程序语言的编译期优化、链接优化、在线编译优化、代码生成。目前已经可以作为c、c++、object-c、rust、swift等语言的后端。

Clang 是一个 C++ 编写、基于 LLVM、发布于 LLVM BSD 许可证下的 C/C++/Objective C/Objective C++编译器前端。

Apple 使用 LLVM 在不支持全部 OpenGL 特性的 GPU (Intel 低端显卡) 上生成代码 (JIT)，令程序仍然能够正常运行。之后 LLVM 与 GCC 的集成过程引发了一些不快，GCC 系统庞大而笨重，而 Apple 大量使用的 Objective-C 在 GCC 中优先级很低。此外 GCC 作为一个纯粹的编译系统，与 IDE 配合很差。加之许可证方面的要求，Apple 无法使用修改版的 GCC 而闭源。于是 Apple 决定从零开始写 C family 的前端，也就是基于 LLVM 的 Clang 了。

Clang相对gcc的前端来说设：计清晰简单，容易理解，易于扩展增强。clang基于库的模块化设计，易于 IDE 集成及其他用途的重用。主要工具有clang-format, clang-ast，libclang, libtooling, address sanitizer等。

Clang是一个C语言、C++、Objective-C语言的轻量级编译器。源代码发布于BSD协议下。Clang将支持其普通lambda表达式、返回类型的简化处理以及更好的处理constexpr关键字。
Clang是一个由Apple主导编写，基于LLVM的C/C++/Objective-C编译器
2013年4月，Clang已经全面支持C++11标准，并开始实现C++1y特性（也就是C++14，这是C++的下一个小更新版本）。Clang将支持其普通lambda表达式、返回类型的简化处理以及更好的处理constexpr关键字。
Clang是一个C++编写、基于LLVM、发布于LLVM BSD许可证下的C/C++/Objective-C/Objective-C++编译器。它与GNU C语言规范几乎完全兼容（当然，也有部分不兼容的内容，包括编译命令选项也会有点差异），并在此基础上增加了额外的语法特性，比如C函数重载（通过__attribute__((overloadable))来修饰函数），其目标（之一）就是超越GCC。

下载地址：https://github.com/llvm-mirror/clang

## 2、gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
make编译出现以上问题，可以通过根据建议修改，编译可能会成功，可能会出现其他大量的问题。

这时候可以考虑的是，gcc版本低了，不支持这个参数，还有一个可能是需要通过clang编译环境进行辅助编译，安装clang即可。









