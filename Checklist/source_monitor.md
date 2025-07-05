# 工具

## 1、度量工具-SourceMonitor

### 1-1、引言
我们提倡编写功能单一、结构清晰、接口简单的函数，因为过于复杂的函数会给我们带来很多问题：加深其他开发人员理解代码的难度；不方便测试人员对其编写测试用例；容易隐藏错误；出现问题难以定位……怎样的函数算是复杂的函数?哪些代码散发着“臭味”?除了依靠经验丰富的程序员的敏锐嗅觉，我们还可以通过工具，对我们的函数和代码进行度量。

不像一位严格苛刻的代码检视人员，代码度量工具并不会板着脸对我们说：“嗯……这段代码糟糕透了！"，它反馈给我们的是一组度量值(Metrics)，怎么看待这些度量值，就因人而异了。对于某个项目组，圈复杂度（度量值中的一项，下文将给出详细解释）超过10的函数需要返工，而对另一个项目组来说，这个标准可能降到15。利用这些度量值，我们可以了解哪些方法应该返工或进行更彻底的测试、了解项目当前的状态，并跟踪软件开发的进度。

下面就来看一个常用的代码度量工具——SourceMonitor。

### 1-2、简介
SourceMonitor是一款免费的软件，运行在Windows平台下。它可对多种语言写就的代码进行度量，包括C、C++、C#、Java、VB、Delphi和HTML，并且针对不同的语言，输出不同的代码度量值。

像其他代码度量工具一样，SourceMonitor只关注代码，并为编码人员提供及时的反馈，它不是一款项目管理工具，不关注项目实施中从功能分析到设计编码，再到测试这整个过程。

### 1-3、C语言度量值(C Metrics)
前面讲了那么多，还没提到代码度量的核心内容——度量值。下面以C语言度量值为例，看看SourceMonitor都给我们反馈了哪些信息。

总行数(Lines)：包括空行在内的代码行数；

语句数目(Statements)：在C语言中，语句是以分号结尾的。分支语句if，循环语句for、while，跳转语句goto都被计算在内，预处理语句#include、#define和#undef也被计算在内，对其他的预处理语句则不作计算，在#else和#endif、#elif和#endif之间的语句将被忽略；

分支语句比例(Percent Branch Statements)：该值表示分支语句占语句数目的比例，这里的“分支语句”指的是使程序不顺序执行的语句，包括if、else、for、while和switch；

注释比例(Percent Lines with Comments)：该值指示注释行（包括/……/和//……形式的注释）占总行数的比例；

函数数目(Functions)：指示函数的数量；

平均每个函数包含的语句数目(Average Statements per Function)：总的函数语句数目除以函数数目得到该值；

函数圈复杂度(Function Complexity)：圈复杂度指示一个函数可执行路径的数目，以下语句为圈复杂度的值贡献1：if/else/for/while语句，三元运算符语句，if/for/while判断条件中的"&&"或“||”，switch语句，后接break/goto/ return/throw/continue语句的case语句，catch/except语句；

函数深度(Block Depth)：函数深度指示函数中分支嵌套的层数。

对其他语言，SourceMonitor输出不同的度量值，例如在C++度量值中包括类的数目(Classes)，在HTML中包括各个标签的数目(HTML Tags)、超链接数目(Hyperlinks)等。

## 2、静态扫描工具-cppcheck
cppcheck是一个代码静态扫描工具，可以检查C/C++代码中的一些常见缺陷。
Cppcheck是一款由Daniel Marjamäki创建并维护的静态代码分析工具，专注于C和C++代码的检查。它能够对源代码执行严格的逻辑检查，发现编译器无法检测到的潜在问题，如内存泄漏、未初始化的变量、数组越界等。Cppcheck以其高度的定制化、跨平台支持以及广泛的兼容性，成为C++开发者提升代码质量和可靠性的重要工具。

Cppcheck的官方网站为http://cppcheck.sourceforge.net，用户可以在此下载最新版本、查看文档和社区支持。此外，Cppcheck还提供了丰富的插件和集成选项，使其能够无缝接入主流IDE和持续集成（CI/CD）流程。

demo：D:\Github\Storage\c++\静态扫描工具\cppcheck_example.c

## 3、静态扫描工具-TscanCode
推荐TscanCode：https://blog.csdn.net/ybhuangfugui/article/details/133758880
https://github.com/Tencent/TscanCode
最新版本的release下已经去掉windows下的可执行文件。可使用V2.14.24版本的TscanCodeV2.14.24.windows.exe（Windows最终版本）。

## 4、静态扫描工具-clang-tidy
Sonar代码质量静态分析工具的安装与使用

## 5、度量工具-CCCC
CCCC是一种分析C++和Java文件并生成有关代码各种指标的报告的工具。支持的度量标准包括代码行，McCabe的 复杂性指标，和Chidamber＆Kemerer以及Henry＆Kafura提出的指标。


