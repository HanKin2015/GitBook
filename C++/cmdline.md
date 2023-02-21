# cmdline学习

## 1、简介
cmdline是一个非常好用的C++命令行解析器，使用模板书写，只有一个文件，很容易集成到自己的程序。使用也非常简单。

## 2、使用
```
#include "cmdline.h"
int main(int argc, char *argv[])
{
	//1、首先创建一个命令行解析器
	cmdline::parser a;
	
	//2、制定输入参数和限制条件
	//有几种用法我们一一介绍
	
	//第一个参数：长名字
	//第二个参数：短名字
	//第三个参数：参数描述
	//第四个参数：bool值，该参数是否必须存在
	//第五个参数：默认值
	a.add<string>("host", ‘h‘, "host name", true, "");
	
	//第六个参数：用来对参数加入额外的限制
	//这里端口号被限制为必须是1到65535区间的值，通过cmdline::range(1,65535)进行限制
	a.add<int>("port",'p',"port number",false,80,cmdline::range(1,65535));
	
	//cmdline::oneof()能够用来限制参数的可选项
	a.add<string>("type",'t', "protocol type", false, "http", cmdline::oneof<string>("http", "https", "ssh", "ftp"));
	
	//调用不带类型的add方法，相当于一个bool值
	a.add("gzip",'\0',"gzip .....");
	
	//3、传入命令行，进行分析，不符合时输出信息，退出程序。
	a.parse_check(argc,argv);
	//只有全部的参数符合上面制定的标准才可往下执行
	//假设输入--help 或者 -? 这种程序也会退出，但是输出的是帮助信息

	//4、获取输入的参数值
	auto type = a.get<string>("type");
	auto host = a.get<string>("host");
	auto port = a.get<int>("port");
	//bool 值通过调用exsit()方法来判断
	bool isexist =  a.exist("gzip");
}
```

## 3、错误1 cxxabi.h提示错误
参考：https://blog.csdn.net/chyuanrufeng/article/details/108847886

我在使用cmdline的时候，在gcc下编译都正常，但在MSVC环境下，是不能编译的，因为缺少头文件cxxabi.h,这个头文件MSVC是没有的。

### 原因分析
C/C++语言在编译以后，函数和数据类型的名字会被编译器修改，改成编译器内部的名字，这个名字会在链接的时候用到。如果用backtrace之类的函数打印堆栈时，显示的就是被编译器修改过的名字，比如说_Z3foov ， 
数据类型名称也是一样，比如在gcc下double的类型内部名字就变成了’d’,

gcc下调用typeid(double).name()返回的结果是’d’ 。

那么这个函数或类型真实的名字是什么呢？ 
如何在运行时获取类型或函数真实的名称呢？ 
上面这个demangle函数中调用的abi::__cxa_demangle的作用就是将编译器内部使用的名字反向转换(demangle)为源代码中定义的名字。 
MSVC为什么没有提供abi::__cxa_demangle类似的功能呢？因为MSVC编译器编译的代码typeid返回的是demangle后的结果。 
也就是说，在MSVC下typeid(double).name()返回的就是”double”。所以不需要类似的功能。

### 解决办法
找到原因就好办了，只需要用宏定义改造代码就好了，只需要修改两处代码:

1.修改#include部分
```
#ifdef __GNUC__
#include <cxxabi.h>
#endif
```

2.修改demangle函数，当编译器为MSVC时直接将输入参数返回
```
static inline std::string demangle(const std::string &name)
{
#ifdef _MSC_VER
    return name;    // 为MSVC编译器时直接返回name
#elif defined(__GNUC__) 
    int status=0;
    char *p=abi::__cxa_demangle(name.c_str(), 0, 0, &status);
    std::string ret(p);
    free(p);
    return ret;
#else               // 其他不支持的编译器需要自己实现这个方法
    #error unexpected c complier (msc/gcc), Need to implement this method for demangle
#endif
}
```

## 4、错误2 std::max使用的位置错误
error C2589: '(' : illegal token on right side of '::'
error C2143: syntax error : missing ';' before '::'

解决方式(两种)修改如下面

max_width = (std::max)(max_width, (ordered[i]->name().length()));
max_width=std::max< size_t>(max_width, ordered[i]->name().length());

