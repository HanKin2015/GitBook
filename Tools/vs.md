# Visual Studio

## 1、轻松搞定VS生成sdf和ipch文件太大占用空间问题
https://blog.csdn.net/songyi160/article/details/51612716

目前的暴力行为删除大文件。

## 2、神奇的事情
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


## 3、vs安全编码检查
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

## 4、error: template with C linkage
不要在extern "C"的中引用C++ STL库的头文件，如<map>, <vector>等具有template的头文件。
需要检查extern "C"后面为函数；extern "C" { }的定义是否完整。

## 5、错误	C7555 使用指定的初始值设定项至少需要“/std:c++latest”
属性-》C/C++-》命令行增加/std:c++latest即可。

编码问题增加：-utf-8。

## 6、warning C4828 文件包含在偏移 0x13 处开始的字符,该字符在当前源字符集中无效(代码页 65001)
https://blog.csdn.net/u014779536/article/details/107022492/
高级保存选项-》修改编码为UTF-8（带签名）即可。

## 7、clock函数报警告算术溢出
警告	C26451	算术溢出: 使用 4 字节值上的运算符 - ，然后将结果转换到 8 字节值。在调用运算符 - 之前将值强制转换为宽类型可避免溢出(io.2)。
```
clock_t start_time = clock();
clock_t spent_time = clock() - start_time;
printf("exec time is %lf s.\n", (double)spent_time / CLOCKS_PER_SEC);	
```
减法时先clock_t类型然后再转换。

## 8、关于sleep函数
标准库中无sleep函数，但在某些编译系统中是有的，在有些系统库中也有，要根据环境而定。
如:

linux中有，unsigned int sleep(unsigned intseconds)，传入挂起时间，成功返回0，不成功则返回余下的秒数（这里sleep（1），暂停1s）。
windows系统中有Sleep函数（注意大写），void Sleep(DWORD dwMilliseconds);提供挂起的毫秒数,并且需包含windows.h。







