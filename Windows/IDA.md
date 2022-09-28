# 逆向神器之IDA的使用

## 1、简介
The Interactive Disassembler

Interactive交互式的
Disassembler反汇编程序
expire到期

IDA全称是交互式反汇编器专业版（Interactive Disassembler Professional），人们其简称为IDA，是目前最棒的一个静态反编译软件，为众多0day世界的成员和ShellCode安全分析人士不可缺少的利器！IDA Pro是一款交互式的，可编程的，可扩展的，多处理器的，交叉Windows或Linux WinCE MacOS平台主机来分析程序， 被公认为最好的花钱可以买到的逆向工程利器。IDA Pro已经成为事实上的分析敌意代码的标准并让其自身迅速成为攻击研究领域的重要工具。它支持数十种CPU指令集其中包括Intel x86，x64，MIPS，PowerPC，ARM，Z80，68000，c8051等等。

早期的0day表示在软件发行后的24小时内就出现破解版本，现在我们已经引申了这个含义，只要是在软件或者其他东西发布后，在最短时间内出现相关破解的，都可以叫0day。 0day是一个统称，所有的破解都可以叫0day。
0day是一种自发的网络运动而已，Warez是对破解的泛称。

软件安装包：链接：https://pan.baidu.com/s/1GKAfmtQB6IlclPIfAqHPrQ 提取码：wggb
https://hex-rays.com/ida-free/#download

## 2、示例程序
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

## 3、打开IDA软件
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

左侧窗口为函数列表窗口，右侧窗口为IDA反汇编所得的汇编代码，最下侧窗口为文件在反汇编过程中的信息。
File：用于打开、新建、装载、保存、关闭一个文件或是数据库
Edit：用于编辑反汇编代码
Jump：用于跳转到某个位置、地址或是一个窗口
Search：用于搜索代码段、数据、错误等等
View：用于显示文件内容的显示方式
Debugger：调试器，集成在IDA中
Lumina：对元数据进行各种操作
Options：可以进行一些个性化的设置
Windows
Help


## 4、反汇编常用功能
IDA Pro切换图形或代码模式
1、空白处
2、右键选择Text View/Graph View切换

安装完成后有32位和64位，如果需要反编译出C代码需要对应版本。
- load a new file直接点击ok即可。
- view->open subviews->strings
- ctrl+f搜索相应的字符串
- 双击搜索结果
- 选择db前面的变量右键jump to xref to operand....
- F5一键搞定反编译成C代码。

## 5、以反汇编kvj2534.dll为例
文件路径：D:\Github\Storage\windows\IDA\kvj2534.dll
软件版本：IDA v7.5.201028

- 打开ida64.exe，Load a new file。
出现三个选择题(就选择1吧)：
1.Portable executable for 80386(PE)[pe64.dll]
2.MS-DOS executable(EXE)[dos64.dll]
3.Binary file

- Alt+T搜索strings：ERR_BUFFER_EMPTY（还是打开view->open subviews->strings窗口搜索吧）
- 双击跳转到IDA View-A，选择db字段前面，然后按X
- 选择后按F5，报错请使用ida，而不是ida64。重新来过
- 结果F5无法跳转到代码。。。。

















