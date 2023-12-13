# checksec工具

## 1、简介
checksec 是一个用于检查二进制文件安全特性的工具。它可以用来检查可执行文件、共享库和内核模块的安全属性，例如堆栈保护、ASLR（地址空间布局随机化）、NX（不可执行堆栈）等。这个工具可以帮助安全研究人员和开发人员评估他们的程序的安全性。checksec 工具通常用于评估二进制文件的安全性，以确保它们受到适当的保护，从而减少受到攻击的风险。

通过checksec工具可以查看程序开启的安全编译选项。

checksec可以从pwntools工具中获取。
也可以从github下载，推荐github下载（https://github.com/slimm609/checksec.sh/）

## 2、NX
NX(No Execute)字面意思就是不可执行，二进制的问题很多都是因为程序无法判断哪个是数据，哪个是代码，然后错误的把数据当做代码来执行。（因为数据区基本是可写的，攻击者可控）
NX的基本原理就是将数据所在内存页标识为不可执行。（包括堆、栈、数据段等）

软件方面：
gcc默认开启NX
```
gcc -z execstack -o test test.c 	// 禁用NX保护
gcc -z noexecstack -o test test.c 	// 开启NX保护
```
NX无额外的编译与运行时消耗，建议开启。

硬件方面：需要CPU支持此功能才可以，通过cat /proc/cpuinfo查看flags中是否有nx。
```
[root@ubuntu0006:~/cmake] #cat /proc/cpuinfo | grep flags | grep nx
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx lm constant_tsc rep_good nopl tsc_known_freq pni ssse3 cx16 pcid sse4_2 x2apic hypervisor lahf_lm kaiser
```
## 3、
