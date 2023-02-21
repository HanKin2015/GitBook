# clang库

## 1、llvm 与clang介绍
LLVM 是 Low Level Virtual Machine 的简称，这个库提供了与编译器相关的支持，能够进行程序语言的编译期优化、链接优化、在线编译优化、代码生成。目前已经可以作为c、c++、object-c、rust、swift等语言的后端。

Clang 是一个 C++ 编写、基于 LLVM、发布于 LLVM BSD 许可证下的 C/C++/Objective C/Objective C++编译器前端。

Apple 使用 LLVM 在不支持全部 OpenGL 特性的 GPU (Intel 低端显卡) 上生成代码 (JIT)，令程序仍然能够正常运行。之后 LLVM 与 GCC 的集成过程引发了一些不快，GCC 系统庞大而笨重，而 Apple 大量使用的 Objective-C 在 GCC 中优先级很低。此外 GCC 作为一个纯粹的编译系统，与 IDE 配合很差。加之许可证方面的要求，Apple 无法使用修改版的 GCC 而闭源。于是 Apple 决定从零开始写 C family 的前端，也就是基于 LLVM 的 Clang 了。

Clang相对gcc的前端来说设：计清晰简单，容易理解，易于扩展增强。clang基于库的模块化设计，易于 IDE 集成及其他用途的重用。主要工具有clang-format, clang-ast，libclang, libtooling, address sanitizer等。




## 2、gcc: error: unrecognized command line option ‘-mlvz’; did you mean ‘-mlra’?
make编译出现以上问题，可以通过根据建议修改，编译可能会成功，可能会出现其他大量的问题。

这时候可以考虑的是，gcc版本低了，不支持这个参数，还有一个可能是需要通过clang编译环境进行辅助编译，安装clang即可。









