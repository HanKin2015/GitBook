# ##的用法

```
#include <stdio.h>

// 打印数字
void printf_number(int num)
{
    printf("number is %d\n", num);
    return ;
}

// 打印字符串
void printf_string(char *str)
{
    printf("string is %s\n", str);
    return ;
}

// 工厂模式打印
#define PRINT(type, value) {    \
    printf_##type(value);       \
}

int main()
{
    PRINT(number, 123);
    PRINT(string, "yes");
    return 0;
}
```

https://www.cnblogs.com/caosiyang/archive/2012/08/21/2648870.html
从下面函数中需要注意，宏定义也是需要进行可变参数，而不是像普通传递函数那样。
```
#define IS_USE_OUTPUT_DEBUG_PRINT   1

#if  IS_USE_OUTPUT_DEBUG_PRINT 

#define  OUTPUT_DEBUG_PRINTF(str, ...)  OutputDebugPrintf(str, ##__VA_ARGS__)
void OutputDebugPrintf(const char * strOutputString, ...)
{
#define PUT_PUT_DEBUG_BUF_LEN   4096
	char strBuffer[PUT_PUT_DEBUG_BUF_LEN] = { 0 };
	va_list vlArgs;
	va_start(vlArgs, strOutputString);
	_vsnprintf_s(strBuffer, sizeof(strBuffer) - 1, strOutputString, vlArgs);  //_vsnprintf_s  _vsnprintf
																			  //vsprintf(strBuffer,strOutputString,vlArgs);
	va_end(vlArgs);
	OutputDebugStringA(strBuffer);  //OutputDebugString    // OutputDebugStringW

}
#else 
#define  OUTPUT_DEBUG_PRINTF(str) 
#endif

#define TRACE_HEADER "[keyboard]"
void DbgPrint(const char* format, ...)
{
	char line[4096 + sizeof(TRACE_HEADER)] = { 0 };
	char* buf = line + sizeof(TRACE_HEADER);
	va_list ap;
	strcpy(line, TRACE_HEADER);
	line[sizeof(TRACE_HEADER) - 1] = ' ';
	va_start(ap, format);
	_vsnprintf(buf, 4095, format, ap);
	va_end(ap);
	OutputDebugStringA(line);
}
```