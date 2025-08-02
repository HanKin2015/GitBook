# 头文件

## 0、结论
建议使用#ifndef，移植性更好
```
#ifndef STUDY_HEADER_H
#define STUDY_HEADER_H

#endif /* STUDY_HEADER_H */
```

## 1、#pragma once和#ifndef
为了避免同一个头文件被包含（include）多次，C/C++中有两种宏实现方式：一种是#ifndef方式；另一种是#pragma once方式。
在能够支持这两种方式的编译器上，二者并没有太大的区别。但两者仍然有一些细微的区别。
```
方式一：

#ifndef  __SOMEFILE_H__
#define  __SOMEFILE_H__
... ... // 声明、定义语句
#endif

方式二：

#pragmaonce
... ... // 声明、定义语句
```

`#pragma once`是一个比较常用的C/C++预处理指令，只要在头文件的最开始加入这条预处理指令，就能够保证头文件只被编译一次。

（1）#ifndef
#ifndef的方式受C/C++语言标准支持。它不仅可以保证同一个文件不会被包含多次，也能保证内容完全相同的两个文件（或者代码片段）不会被不小心同时包含。
当然，缺点就是如果不同头文件中的宏名不小心“撞车”，可能就会导致你看到头文件明明存在，但编译器却硬说找不到声明的状况——这种情况有时非常让人郁闷。
由于编译器每次都需要打开头文件才能判定是否有重复定义，因此在编译大型项目时，ifndef会使得编译时间相对较长，因此一些编译器逐渐开始支持#pragma once的方式。

（2）#pragma once
#pragma once 一般由编译器提供保证：同一个文件不会被包含多次。注意这里所说的“同一个文件”是指物理上的一个文件，而不是指内容相同的两个文件。
你无法对一个头文件中的一段代码作pragma once声明，而只能针对文件。
其好处是，你不必再担心宏名冲突了，当然也就不会出现宏名冲突引发的奇怪问题。大型项目的编译速度也因此提高了一些。
对应的缺点就是如果某个头文件有多份拷贝，本方法不能保证他们不被重复包含。当然，相比宏名冲突引发的“找不到声明”的问题，这种重复包含很容易被发现并修正。
另外，这种方式不支持跨平台！

https://www.cnblogs.com/qiang-upc/p/11407364.html
https://en.jinzhao.wiki/wiki/Pragma_once

#pragma once是编译相关，就是说这个编译系统上能用，但在其他编译系统不一定可以，也就是说移植性差，不过现在基本上已经是每个编译器都有这个定义了。

## 2、头文件不规范导致重复定义问题
头文件里只能有函数声明，不能有函数定义，除非增加static修饰
头文件里不能有变量声明或定义，除非增加static修饰，或者extern修饰声明

## 3、C和C++中include 搜索路径的一般形式以及gcc搜索头文件的路径
https://www.cnblogs.com/qiumingcheng/p/6273918.html


在UNIX系统中,尖括号告诉编译器在一个或者多个标准系统目录中找到文件 /usr/include /usr/local/include；即系统头文件所在的目录。

看看这些文件夹下是否有该头文件；如果没有，也不会检索当前文件所在路径，并将报错。

使用双引号,编译器先到当前目录查找头文件或文件名中指定的其他目录，如果没找到再到标准系统目录查找。

即，首先搜索本地目录，但是具体哪个目录依赖于编译器。有些编译器搜索源代码所在目录，有些则搜索当前目录，还有些搜索工程文件所在目录。当出现此类问题时，我们最好注意自己所用的编译器是如何操作的。在下面说明了gcc是如何操作的。

同时，include也可以采用相对路径。比如，a.c需要/usr/local/include/Tleap/leap.h，而/usr/local/include是系统的默认搜索路径，所以在a.c中可以用相对路径包含，

#include<Tleap/leap.h>。

用include 引用头文件时，双引号和尖括号的区别：

1.双引号：引用非标准库的头文件，编译器首先在程序源文件所在目录查找，如果未找到，则去系统默认目录查找，通常用于引用用户自定义的头文件。

2.尖扩号：只在系统默认目录（在Linux系统中通常为/usr/include目录）或者尖括号内的路径查找，通常用于引用标准库中自带的头文件。

综上，标准库自带的头文件既可以用双引号也可以用尖括号，不过习惯使用尖括号，用户自定义的头文件只能用双引号。

 

一般情况下 这么用：自己写的用双引号，第三方库或者系统的库的头文件用尖括号。要不然经常会出现乱七八糟的错误。

## 4、头文件的包含顺序
在 C++ 项目中，头文件的包含顺序通常遵循特定规范，主要目的是提高代码可读性、避免隐藏依赖以及尽早暴露潜在问题。

```
// MyClass.cpp

// 1. 自身头文件（强制检查自包含性）
#include "MyClass.h"

// 2. 系统头文件（按字母序）
#include <algorithm>
#include <iostream>
#include <memory>
#include <vector>

// 3. 第三方库头文件（按库的重要性或字母序）
#include <glog/logging.h>
#include <gtest/gtest.h>

// 4. 项目内其他模块头文件（按模块层级或字母序）
#include "core/base.h"      // 核心模块
#include "utils/string.h"   // 工具模块
#include "api/interface.h"  // 接口模块
```

许多代码格式化工具（如clang-format）支持自动排序头文件：
```
# .clang-format 配置示例
IncludeCategories:
  - Regex:           '^"(llvm|clang)/'
    Priority:        2
  - Regex:           '^(<|"(gtest|gmock|isl|json)/)'
    Priority:        3
  - Regex:           '.*'
    Priority:        1
SortIncludes:      true  # 自动排序头文件
```