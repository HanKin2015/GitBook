# 学习dll

# Thunk
thunk:PC计算机中典型的形实转换程序。在电脑里，为了执行指令，需要在内存段地址和平坦地址之间进行转换。当16位应用程序在32位地址空间进行运行的时候，应用程序的16位段地址必须转化成32位平坦地址，这时候thunk是很容易见到的。另外，如果一个32位程序呼叫一个16位DLL，那么thunk就存在于相反的方向：从32位转变成16位。

# __declspec用法总结(Microsoft c++)
“__declspec”是Microsoft c++中专用的关键字，它配合着一些属性可以对标准C++进行扩充。这些属性有：align、allocate、deprecated、 dllexport、dllimport、 naked、noinline、noreturn、nothrow、novtable、selectany、thread、property和uuid。
指定的存储类的信息扩展属性语法使用 __declspec 关键字，指定特定类型的实例将存储在下面列出的某个 Microsoft 存储特定类的属性。 其他存储类修饰符的示例包括 static 和 extern 关键字。 但是，这些关键字是 C 和 C++ 语言的 ANSI 规范的一部分，并且，，因为这样不受扩展特性语法中。 扩展属性语法简化和标准化特定于 Microsoft 的扩展到 C 和 C++ 语言。

# 微软开发者网络
 MSDN一般指微软开发者网络，《Microsoft Developer Network》是微软一个期刊产品，专门介绍各种编程技巧。

# DllMain
跟exe有个main或者WinMain入口函数一样，DLL也有一个入口函数，就是DllMain。以“DllMain”为关键字，来看看MSDN帮助文档怎么介绍这个函数的。
The DllMain function is an optional method of entry into a dynamic-link library (DLL)。（简要翻译：对于动态链接库，DllMain是一个可选的入口函数。）这句话很重要，很多初学者可能都认为一个动态链接库肯定要有DllMain函数。其实不然，像很多仅仅包含资源信息的DLL是没有DllMain函数的。
```
函数定义：
BOOL WINAPI DllMain(
  _In_ HINSTANCE hinstDLL, // 指向自身的句柄
  _In_ DWORD fdwReason, // 调用原因
  _In_ LPVOID lpvReserved // 隐式加载和显式加载
);
// 以上内容来自MSDN
```
系统是在什么时候调用DllMain函数的呢？静态链接时，或动态链接时调用LoadLibrary和FreeLibrary都会调用DllMain函数。DllMain的第二个参数fdwReason指明了系统调用Dll的原因，它可能是:：
DLL_PROCESS_ATTACH、进程映射
DLL_PROCESS_DETACH、进程卸载
DLL_THREAD_ATTACH、线程映射
DLL_THREAD_DETACH。线程卸载
DllMain函数是DLL模块的默认入口点。当Windows加载DLL模块时调用这一函数。系统首先调用全局对象的构造函数，然后调用全局函数DLLMain。DLLMain函数不仅在将DLL链接加载到进程时被调用，在DLL模块与进程分离时（以及其它时候）也被调用。


https://www.cnblogs.com/smart-zihan/p/10855079.html
https://www.cnblogs.com/depend-wind/articles/11126333.html
https://blog.csdn.net/huangyimo/article/details/81749340

动态链接库的使用可分为：

　　显式调用：使用LoadLibrary载入动态链接库-GetProcAddress获取某函数地址。

　　隐式调用：使用#pragma comment(lib, “XX.lib”)的方式，也可以直接将XX.lib加入到工程中。　　

一、定义及基本用法
　　按C++标准，class 与className 中间不可以存在任何实质性的东西的。但dllimport / dllexport只是修饰符，Windows平台下为了dll的兼容性的特有关键字，他们都是DLL内的关键字，即导出与导入。他们是将DLL内部的类与函数以及数据导出与导入时使用的，看它的具体定义是什么。一般类的修饰符有导入或导出即：

__declspec(dllexport) 
extern __declspec(dllimport) 
       dllexport是在这些类、函数以及数据声明的时候使用。用他表明这些东西可以被外部函数使用，即（dllexport）是把 DLL中的相关代码（类，函数，数据）暴露出来为其他应用程序使用。使用了（dllexport）关键字，相当于声明了紧接在（dllexport）关键字后面的相关内容是可以为其他程序使用的。

       dllimport是在外部程序需要使用DLL内相关内容时使用的关键字。当一个外部程序要使用DLL 内部代码（类，函数，全局变量）时，只需要在程序内部使用（dllimport）关键字声明需要使用的代码就可以了，即（dllimport）关键字是在外部程序需要使用DLL内部相关内容的时候才使用。（dllimport）作用是把DLL中的相关代码插入到应用程序中。

      　_declspec(dllexport)与_declspec(dllimport)是相互呼应，只有在DLL内部用dllexport作了声明，才能在外部函数中用dllimport导入相关代码。但MSDN文档里面，对于 __declspec(dllimport)的说明让人感觉有点奇怪，先来看看MSDN里面是怎么说的：

         不使用 __declspec(dllimport)也能正确编译代码，但使用 __declspec(dllimport) 使编译器可以生成更好的代码。编译器之所以能够生成更好的代码，是因为它可以确定函数是否存在于 DLL 中，这使得编译器可以生成跳过间接寻址级别的代码，而这些代码通常会出现在跨DLL 边界的函数调用中。但是，必须使用 __declspec(dllimport) 才能导入 DLL 中使用的变量。

      使用__declspec(dllimport)可以生成更好的代码，这点好理解，但必须使用它才能导出dll中的变量，对于动态库本身必须使用关键字__declspec(dllexport)，对于应用程序，如果不使用动态库导出的变量，不使用关键字__declspec(dllimport)也可以保证动态库的正常使用，但实际使用中，还是建议应用程序使用关键字__declspec(dllimport)，具体原因，还是上面MSDN的那段话。