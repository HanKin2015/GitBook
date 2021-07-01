# windows相关知识

## 脑裂计算机术语
英文称为“Split-Brain”。
脑裂是因为cluster分裂导致的，cluster集群中节点因为处理器忙或者其他原因暂时停止响应时，其他节点可能误认为该节点“已死”，从而夺取共享磁盘（即资源）的访问权，此时极有可能假死节点重新对共享文件系统产生读写操作,从而导致共享磁盘文件系统损坏。


## 神奇的事情
```
string cmd1 = "rd /s /q " + TEMP_DIR;
const char* cmd2 = "cls";
string cmd3 = "cls";

system(cmd1.data());	// g++正常,vs不正常(错误	C2065	“cmd1”: 未声明的标识符)
system(cmd2.data());	// 正常
system(cmd3.data());	// 正常
```
很奇怪！！！
真相原来是这个：
warning C4819: 该文件包含不能在当前代码页(936)中表示的字符。请将该文件保存为 Unicode 格式以防止数据丢失
在属性-》C/C++-》命令行添加：
/std:c++latest -utf-8 

原来是文件格式文件，文件是UTF-8格式，需要增加编译选项来支持UTF-8格式。


## vs安全编码检查
错误	C4996	'strcpy': This function or variable may be unsafe. Consider using strcpy_s instead. To disable deprecation, use _CRT_SECURE_NO_WARNINGS. See online help for details.

根据开源的cJSON.c的操作，它解决了这个问题，我却没有。
```
/* disable warnings about old C89 functions in MSVC */
#if !defined(_CRT_SECURE_NO_DEPRECATE) && defined(_MSC_VER)
#define _CRT_SECURE_NO_DEPRECATE
#endif
#if !defined(_CRT_SECURE_NO_WARNINGS) && defined(_MSC_VER)
#define _CRT_SECURE_NO_WARNINGS
#endif
#ifdef __GNUC__
#pragma GCC visibility push(default)
#endif
#if defined(_MSC_VER)
#pragma warning (push)
/* disable warning about single line comments in system headers */
#pragma warning (disable : 4001)
#endif
```
最终解决方法：_CRT_SECURE_NO_WARNINGS


