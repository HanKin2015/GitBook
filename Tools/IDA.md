# 逆向神器之IDA的使用

## 0、简介
The Interactive Disassembler

Interactive交互式的
Disassembler反汇编程序
expire到期

交互式反汇编器专业版（Interactive Disassembler Professional），人们常称其为IDA Pro，或简称为IDA。是目前最棒的一个静态反编译软件，为众多0day世界的成员和ShellCode安全分析人士不可缺少的利器！

早期的0day表示在软件发行后的24小时内就出现破解版本，现在我们已经引申了这个含义，只要是在软件或者其他东西发布后，在最短时间内出现相关破解的，都可以叫0day。 0day是一个统称，所有的破解都可以叫0day。
0day是一种自发的网络运动而已，Warez是对破解的泛称。

软件安装包：链接：https://pan.baidu.com/s/1GKAfmtQB6IlclPIfAqHPrQ 提取码：wggb

## 1、示例程序
https://www.cnblogs.com/endv/p/6847843.html
```test.cpp
#include <stdio.h>

int main()
{
    int n;
    scanf ("%d", &n);
    if (n > 0) {
       printf("a > 0");  //后面会用IDA Pro把'a'改成'n'
	} else {
       printf("n < 0");
	}
	return 0;
}
```

编译成exe执行文件：g++.exe test.cpp -o test.exe

### 2、打开IDA软件
load a new file直接点击ok即可。

上面的颜色表示的是对不同代码块使用不同的颜色进行区分，我们可以直接点击相应的颜色块进行不同代码块的定位。
下面一行有对颜色的说明。
蓝色：表示代码段。
棕色：表示数据段。
红色：表示内核。

左边是该程序的函数表，一般默认选择_main函数。



Open exports window:打开导出窗口 
Open import window:打开导入窗口 
Open names window:函数和参数的命名列表 
Open functions window:程序调用的所有函数窗口 
Open strings window: 打开字符串显示窗口，会列出程序中的所有字符串，该窗口有助于你通过程序的运行输出逆向找出对应的代码片断。



### 3、反汇编常用功能
IDA Pro切换图形或代码模式
1、空格
2、右键选择Text View/Graph View切换


安装完成后有32位和64位，如果需要反编译出C代码需要对应版本。
- load a new file直接点击ok即可。
- view->open subviews->strubgs
- ctrl+f搜索相应的字符串
- 双击搜索结果
- 选择db前面的变量右键jump to xref to operand....
- F5一键搞定反编译成C代码。





















