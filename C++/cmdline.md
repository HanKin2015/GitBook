# cmdline学习

## 概述
cmdline是一个非常好用的C++命令行解析器，使用模板书写，只有一个文件，很容易集成到自己的程序。使用也非常简单。

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
