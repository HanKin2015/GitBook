# OutputDebugString

## 1、简介
Win32 开发人员可能对 OutputDebugString()API 函数比较熟悉，它可以使你的程序和调试器进行交谈。它要比创建日志文件容易，而且所有“真正的”调试器都能使用它。应用程序和调试器交谈的机制相当简单，而本文将揭示整件事情是如何工作的。

<windows.h> 文件声明了 OutputDebugString() 函数的两个版本 - 一个用于 ASCII，一个用于 Unicode - 不像绝大多数 Win32 API 一样，原始版本是 ASCII。而大多数的 Win32 API 的原始版本是 Unicode。使用一个 NULL 结尾的字符串缓冲区简单调用 OutputDebugString() 将导致信息出现在调试器中，如果有调试器的话。

OutputDebugString属于windows API的，所以只要是包含了window.h这个头文件后就可以使用了。可以把调试信息输出到编译器的输出窗口，还可以用DbgView（本机或TCP远程）这样的工具查看，这样就可以脱离编译器了。  

## 2、注意事项
OutputDebugString 默认只能输入一个参数，不能像printf那样格式化输出，下面改造成类似printf函数的输出方式。
```
#include <windows.h>
#include <stdio.h>
//#include <stdlib.h>
#include <stdarg.h>
 
#define IS_USE_OUTPUT_DEBUG_PRINT   1
 
#if  IS_USE_OUTPUT_DEBUG_PRINT 
 
#define  OUTPUT_DEBUG_PRINTF(str)  OutputDebugPrintf(str)
void OutputDebugPrintf(const char * strOutputString, ...)
{
#define PUT_PUT_DEBUG_BUF_LEN   1024
	char strBuffer[PUT_PUT_DEBUG_BUF_LEN] = { 0 };
	va_list vlArgs;
	va_start(vlArgs, strOutputString);
	_vsnprintf_s (strBuffer, sizeof(strBuffer) - 1, strOutputString, vlArgs);  //_vsnprintf_s  _vsnprintf
	//vsprintf(strBuffer,strOutputString,vlArgs);
	va_end(vlArgs);
	OutputDebugStringA(strBuffer);  //OutputDebugString    // OutputDebugStringW
 
}
#else 
#define  OUTPUT_DEBUG_PRINTF(str) 
#endif
```
使用实例:

OutputDebugPrintf("DEBUG_INFO | %d %s",600019,"hello");

然后在 DbgView 设置一个过滤：DEBUG_INFO，抓取固定的输出。

Unicode模式下，OutputDebugString要求一个 wchar_t 而不是char，而sprintf则需要char参数，那我们是不是一定要通过字符转换解决问题呢？

答案就是 OutputDebugStringA（）










