# checksec工具

## 1、
通过checksec工具可以查看程序开启的安全编译选项	

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
NX无额外的编译与运行时消耗，建议开启

## 3、
