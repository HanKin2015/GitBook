# C语言进阶——likely和unlikely

在学习资料满天飞的大环境下，知识变得非常零散，体系化的知识并不多，这就导致很多人每天都努力学习到感动自己，最终却收效甚微，甚至放弃学习。我的使命就是过滤掉大量的垃圾信息，将知识体系化，以短平快的方式直达问题本质，把大家从大海捞针的痛苦中解脱出来。

摘自：https://blog.csdn.net/weixin_44873133/article/details/107302688

这篇文章分析的很牛逼啊！

## 1、 定义
```
  1 #define likely(x) __builtin_expect(!!(x), 1)
  2 #define unlikely(x) __builtin_expect(!!(x), 0)
```
__builtin_expect是编译器内建函数，原型为long __builtin_expect (long exp, long c)。该函数并不会改变exp的值，但是可以对if-else分支或者if分支结构进行优化。likely代表if分支大概率会发生，unlikely代表if分支大概率不会发生。

Tips: !!是C语言中处理逻辑表达式的一个技巧。因为C语言中没有布尔变量，所以布尔值是用整形来代替的，0为假，非0为真。当x为0时，!(x)为1，!!(x)为0，!!的运算没有什么意义；但当x为非0时（比如100），!(x)为0，!!(x)为1，这样就达到了将非0值（比如100）全部都映射为1的效果。

通过分析发现，unlikely的定义其实是可以不使用!!运算符的。

在文件linux-5.13.7/include/linux/compiler.h找到：
```
 39 /*
 40  * Using __builtin_constant_p(x) to ignore cases where the return
 41  * value is always the same.  This idea is taken from a similar patch
 42  * written by Daniel Walker.
 43  */
 44 # ifndef likely
 45 #  define likely(x) (__branch_check__(x, 1, __builtin_constant_p(x)))
 46 # endif
 47 # ifndef unlikely
 48 #  define unlikely(x)   (__branch_check__(x, 0, __builtin_constant_p(x)))
 49 # endif


 77 # define likely(x)  __builtin_expect(!!(x), 1)
 78 # define unlikely(x)    __builtin_expect(!!(x), 0)
 79 # define likely_notrace(x)  likely(x)
 80 # define unlikely_notrace(x)    unlikely(x)
```

既然程序是我们程序员所写，在一些明确的场景下，我们应该比CPU和编译器更了解哪个分支条件更有可能被满足。我们是否可将这一先验知识告知编译器和CPU, 提高分支预测的准确率，从而减少CPU流水线分支预测错误带来的性能损失呢？答案是可以！它便是likely和unlikely。在Linux内核代码中，这两个宏的应用比比皆是。

## 2、应用场景
总的来说，对代码运行效率有要求的if-else或if分支就应该使用likely或unlikely优化选项。

## 3、注意事项
- likely和unlikely的概率判断务必准确，不要写反了，否则非但不能提升运行效率，反而会起到反作用。
- 选择表达式时要选择编译阶段编译器无法推测出真假的表达式，否则优化不起作用。
- 编译时需要至少使用-O2选项，否则优化不起作用。

## 4、作用机理

### 4.1、理论
使用likely或unlikely为什么会起到提升代码运行效率的优化效果呢？

主要的作用机理有以下2点：

- gcc编译器在编译生成汇编代码时会在编译选项的引导下调整if分支内代码的位置，如果是likely修饰过的就调整到前面，如果是unlikely修饰过的就调整到后面。放到前面的代码可以节省跳转指令带来的时间开销，从而达到提升效率的目的。
- 当代CPU都有ICache和流水线机制，在运行当前这条指令时，ICache会预读取后面的指令，以提升运行效率。但是如果条件分支的结果是跳转到了其他指令，那预取的下一条指令（有的CPU设计是4级流水，也就是4条指令）就没用了，这样就降低了流水线的效率。如果使用likely和unlikely来指导编译器总是将大概率执行的代码放在靠前的位置，就可以大大提高预取值的命中率，从而达到提升效率的目的。

### 4.2、实践
下面通过一个小栗子来感受一下likely和unlikely的行为。

期间使用的工具有gcc和objdump。涉及到的指令如下：
```
# 编译生成a.out，注意使用-O2选项，否则不生效
gcc -O2 test.c
# 根据生成的a.out生成反汇编代码
objdump -CS a.out > objdump.txt
```
Tips: objdump命令是用查看目标文件或者可执行的目标文件的构成的gcc工具

(1）-d：反汇编目标文件中包含的可执行指令。
(2）-S：混合显示源码和汇编代码，前提是在编译目标文件时加上-g，否则相当于-d。
(3）-C：一般针对C++语言，用来更友好地显示符号名。

### 4.2.1 不使用likely或unlikely选项
通过实践发现，如果按照博主代码来做，会很难发现if-else语句在哪里，根本无法进行判断，我在这里花费了大半天的时间来研究。
最终终于明白：这个自增和自减在O2优化中被优化掉了。

两种方法可以解决：
- 如果把变量变成全局变量就不会被优化。
- 使用其他函数可以区分，如puts和fprintf。

```
/* 未使用likely或unlikely选项 */
int main(int argc, char *argv[])
{
	// 下面这句注释根本不可靠，明明GCC能优化掉
	int i = atoi(argv[1]); /* init i with the value that GCC can't optimize */
	if (i > 0) {
		i--;
	} else {
		i++;
	}
	return i;
}
```

```
0000000000400430 <main>:
  400430:       48 83 ec 08             sub    $0x8,%rsp
  400434:       48 8b 7e 08             mov    0x8(%rsi),%rdi
  400438:       31 c0                   xor    %eax,%eax
  40043a:       e8 d1 ff ff ff          callq  400410 <atoi@plt>
  40043f:       8d 48 ff                lea    -0x1(%rax),%ecx
  400442:       8d 50 01                lea    0x1(%rax),%edx
  400445:       85 c0                   test   %eax,%eax
  400447:       89 c8                   mov    %ecx,%eax
  400449:       0f 4e c2                cmovle %edx,%eax
  40044c:       48 83 c4 08             add    $0x8,%rsp
  400450:       c3                      retq
  400451:       66 2e 0f 1f 84 00 00    nopw   %cs:0x0(%rax,%rax,1)
  400458:       00 00 00
  40045b:       0f 1f 44 00 00          nopl   0x0(%rax,%rax,1)
```

使用全局变量：
```
/* 未使用likely或unlikely选项 */
int i;
int main(int argc, char *argv[])
{
	i = atoi(argv[1]); /* init i with the value that GCC can't optimize */

	if (i > 0) {
		i--;
	} else {
		i++;
	}
	return i;
}
```

```
0000000000400430 <main>:
  400430:       48 83 ec 08             sub    $0x8,%rsp
  400434:       48 8b 7e 08             mov    0x8(%rsi),%rdi
  400438:       31 c0                   xor    %eax,%eax
  40043a:       e8 d1 ff ff ff          callq  400410 <atoi@plt>
  40043f:       85 c0                   test   %eax,%eax
  400441:       7e 14                   jle    400457 <main+0x27>
  400443:       83 e8 01                sub    $0x1,%eax                  注意到if分支内容在前
  400446:       89 05 f0 0b 20 00       mov    %eax,0x200bf0(%rip)        # 60103c <i>
  40044c:       8b 05 ea 0b 20 00       mov    0x200bea(%rip),%eax        # 60103c <i>
  400452:       48 83 c4 08             add    $0x8,%rsp
  400456:       c3                      retq
  400457:       83 c0 01                add    $0x1,%eax                  注意到else分支内容在后
  40045a:       89 05 dc 0b 20 00       mov    %eax,0x200bdc(%rip)        # 60103c <i>
  400460:       eb ea                   jmp    40044c <main+0x1c>
  400462:       66 2e 0f 1f 84 00 00    nopw   %cs:0x0(%rax,%rax,1)
  400469:       00 00 00
  40046c:       0f 1f 40 00             nopl   0x0(%rax)
```
JLE/JNG： 小于或等于转移。  

### 4.2.2 使用likely选项
```
#define likely(x) __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

int i;
int main(int argc, char *argv[])
{  
	i = atoi(argv[1]); /* init i with the value that GCC can't optimize */

	if (likely(i > 0)) {
		i--;
	} else {
		i++;
	}
	return i;
}
```

```
0000000000400430 <main>:
  400430:       48 83 ec 08             sub    $0x8,%rsp
  400434:       48 8b 7e 08             mov    0x8(%rsi),%rdi
  400438:       31 c0                   xor    %eax,%eax
  40043a:       e8 d1 ff ff ff          callq  400410 <atoi@plt>
  40043f:       85 c0                   test   %eax,%eax
  400441:       7e 0e                   jle    400451 <main+0x21>
  400443:       83 e8 01                sub    $0x1,%eax                  注意到if分支内容在前
  400446:       89 05 f0 0b 20 00       mov    %eax,0x200bf0(%rip)        # 60103c <i>
  40044c:       48 83 c4 08             add    $0x8,%rsp
  400450:       c3                      retq
  400451:       83 c0 01                add    $0x1,%eax                  注意到else分支内容在后
  400454:       89 05 e2 0b 20 00       mov    %eax,0x200be2(%rip)        # 60103c <i>
  40045a:       eb f0                   jmp    40044c <main+0x1c>
  40045c:       0f 1f 40 00             nopl   0x0(%rax)
```

### 4.2.3 使用unlikely选项
```
#define likely(x) __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

int i;
int main(int argc, char *argv[])
{  
	i = atoi(argv[1]); /* init i with the value that GCC can't optimize */

	if (unlikely(i > 0)) {
		i--;
	} else {
		i++;
	}
	return i;
}
```

```
0000000000400430 <main>:
  400430:       48 83 ec 08             sub    $0x8,%rsp
  400434:       48 8b 7e 08             mov    0x8(%rsi),%rdi
  400438:       31 c0                   xor    %eax,%eax
  40043a:       e8 d1 ff ff ff          callq  400410 <atoi@plt>
  40043f:       85 c0                   test   %eax,%eax
  400441:       7f 0e                   jg     400451 <main+0x21>
  400443:       83 c0 01                add    $0x1,%eax                  注意到else分支内容被提前了
  400446:       89 05 f0 0b 20 00       mov    %eax,0x200bf0(%rip)        # 60103c <i>
  40044c:       48 83 c4 08             add    $0x8,%rsp
  400450:       c3                      retq
  400451:       83 e8 01                sub    $0x1,%eax                  注意到if分支内容被后移了
  400454:       89 05 e2 0b 20 00       mov    %eax,0x200be2(%rip)        # 60103c <i>
  40045a:       eb f0                   jmp    40044c <main+0x1c>
  40045c:       0f 1f 40 00             nopl   0x0(%rax)
```
JG/JNLE： 大于转移。

## 5、汇编指令查询
https://baike.baidu.com/item/%E6%B1%87%E7%BC%96%E6%8C%87%E4%BB%A4/9979890?fr=aladdin














