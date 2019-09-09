【重构-机制策略分离】
/*
 *思路：使用hash思路进行存储，使用数组hash分组存储链表指针
 *      数组和链表的结合
 *      查找插入删除时间复杂度O(logn)
 */


相关知识请参考：http://200.200.1.35/designing/decoupling/logical_coupling.html

要求：



1. 重构batch.c，实现机制策略分离，

   1) 令其可以在不同系统上运行，至少支持win/linux，不能依赖具体系统上的命令;

   2) 方便单元测试(比如不依赖文件系统即可单测);

   3) 能灵活拓展功能需求，修改算法不影响现有逻辑;

   4) 方便后续采用更完善的文件类型判定方法，修改算法不影响现有逻辑；

2. 完善batch.c实现中存在问题的地方，比如采用system执行命令有安全性问题；

3. 拓展三个新需求：

  1) 当文件类型为pdf/doc/xls等文档类型时，调用配置文件中指定的程序打开。

  2) 通过配置文件加载文本文件类型/可执行程序类型的文件名后缀列表；

  3) 采用getopt_long解析命令行参数；

  配置文件请采用json或ini格式

4. 符合公司代码规范的要求，代码评级即练习成绩；

5. 完成单元测试，代码行覆盖率超过90%




# shell+gdb实现单元测试和非交互调试



## 说明



1. 把gdfind编译成可执行程序的方法：在gdfind目录运行make



2. 编写脚本，在脚本中调用gdb调试gdfind程序。可利用expect与gdb进行交互，实现非交互的调试流程。

expect的使用方法请参考：

https://www.cnblogs.com/lzrabbit/p/4298794.html

https://linux.die.net/man/1/expect



gdb的用法请参考：

http://www.gnu.org/software/gdb/documentation/

https://sourceware.org/gdb/current/onlinedocs/gdb/



3. gbfind/dbg.sh和gbfind/dbg_ReadLine.sh是示例脚本



在gbfind目录执行./dbg.sh命令，可以观察该脚本的运行结果。



4. 本练习的目的是:



A) 帮助学员掌握gdb的用法（包括一些高级用法）；

B) 帮助学员掌握一种利用expect+gdb进行自动化调试的方法(可以跳过很多不必要的逻辑，大大提升调试效率)；



## 要求



1. 使用expect+gdb的方式(参考gbfind/dbg.sh)对CheckPath，ReadLine_NoSkip，

ReadLine_SkipCppComment，ReadLine，StatFile，StatDirectory这6个函数进行单元测试。



对于ReadLine这类有复杂参数依赖的函数，可以在ReadLine或其调用者上设断点，

然后在执行ReadLine之前修改传递给ReadLine的参数。

通过这种方法，可以让ReadLine执行正常不会跑到的流程。相关做法请参考dbg_ReadLine.sh



2. 每个测试用例一个案例脚本。



3. 完成一个shell脚本(采用bash)，执行上述案例脚本，并遍历上述案例脚本产生的日志文件，输出单测失败的案例脚本文件名称。

说明：在上述案例测试脚本中，如果有异常，可以让expect输出特定日志内容。

shell脚本遍历日志文件时检查是否有特定日志内容，以判断是否有测试案例执行不正常。


下载附件:php0adChk


