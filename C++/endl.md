# C++中如何区分std::endl、std::ends、std::flush的差异性

## 1、简介
头文件：#include <iostream>
更准确的说，其实是位于头文件：#include <ostream>

功能介绍：

类型	描述
endl	Insert newline and flush (刷新缓存区并插入换行符)
ends	Insert null character    (插入空字符)
flush	Flush stream buffer      (刷新流缓存区)

## 2、示例讲解
```
#include "stdafx.h"
#include <iostream>
using namespace std;

int main(int *argc, char* argv)
{

	std::cout << "1";
	std::cout << "2" << std::endl;
	std::cout << "3" << std::ends;
	std::cout << "4" << std::flush;
	std::cout << "5";

	system("pause");
	return 0;
}

12
3 45
```

打印 “1” 时，因为没有操作，所以紧接着就开始打印 “2”，但是在 “2”的后面有 std::endl ，所以缓存被刷新，并增加了换行符； “3” 是在第二行输出的，并且在 “3” 的后面紧接着输出了一个空字符 [’\0’] （std::ends控制的），然后才打印 “4”（只是刷新了缓存） 和 “5”。

line
space






