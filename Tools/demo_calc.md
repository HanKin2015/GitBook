# 代码统计工具

## 1、vs-code插件
uctakeoff.vscode-counter-3.0.5.vsix
安装好插件，直接右键Count lines in directory

## 2、cloc简介
cloc是一款用于统计源码信息行数的工具，可以针对许多编程语言中源代码的空白行、注释行和物理行进行计数。给定两个版本的代码库，cloc 可以计算空白行、注释行和源代码行的差异。它完全用 Perl 编写，不依赖于 Perl v5.6 及更高版本的标准发行版（来自一些外部模块的代码嵌入在 cloc 中），因此非常可移植。众所周知，cloc 可在多种 Linux、FreeBSD、NetBSD、OpenBSD、macOS、AIX、HP-UX、Solaris、IRIX、z/OS 和 Windows 上运行。（要在 Windows 上运行 cloc 的 Perl 源版本，需要 ActiveState Perl 5.6.1或更高版本、Strawberry Perl、适用于 Linux 的 Windows 子系统、 Cygwin、 MobaXTerm安装 Perl 插件，或 mingw 环境和终端，例如 Git for Windows提供的。或者，可以使用PAR::Packer生成的 cloc 的 Windows 二进制文件在既没有 Perl 也没有 Cygwin 的 Windows 计算机上运行。）

  cloc包含来自 David Wheeler 的 SLOCCount、 Damian Conway和 Abigail 的 Perl 模块 Regexp::Common、 Sean M. Burke的 Perl 模块 Win32::Autoglob和 Tye McQueen 的 Perl模块Algorithm::Diff的代码。语言比例因子来自 Mayes Consulting, LLC 网站 http://softwareestimator.com/IndustryData2.htm。

```
[root@ubuntu0006:/media/vdb/study/driver] #apt install cloc
[root@ubuntu0006:/media/vdb/study/driver] #cloc .
       8 text files.
       8 unique files.
       6 files ignored.

http://cloc.sourceforge.net v 1.60  T=0.02 s (158.5 files/s, 3540.5 lines/s)
-------------------------------------------------------------------------------
Language                     files          blank        comment           code
-------------------------------------------------------------------------------
C                                2             11              0             44
make                             1              1              0             11
-------------------------------------------------------------------------------
SUM:                             3             12              0             55
-------------------------------------------------------------------------------
```
源代码：https://github.com/AlDanial/cloc/releases/tag/v1.94








