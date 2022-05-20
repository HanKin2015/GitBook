# CPU那些事儿

## 1、CISC & RISC
要了解X86和ARM，就得先了解复杂指令集(CISC,complex instruction set computer)和精简指令集(RISC,Reduced Instruction-Set Computer)。从CPU发明到现在，有非常多种架构，从我们熟悉的X86，ARM，到不太熟悉的MIPS，IA64，它们之间的差距都非常大。但是如果从最基本的逻辑角度来分类的话，它们可以被分为两大类，即所谓的“复杂指令集”与“精简指令集”系统，也就是经常看到的“CISC”与“RISC”。

## 2、Intel和ARM处理器的区别
Intel使用CISC(复杂指令集计算机)
ARM使用CISC(精简指令集计算机)
举一个有趣的例子（没太大营养，可以直接看下一节）：
我们可以继续举个例子，比如说我们要命令一个人吃饭，那么我们应该怎么命令呢？我们可以直接对他下达“吃饭”的命令，也可以命令他“先拿勺子，然后舀起一勺饭，然后张嘴，然后送到嘴里，最后咽下去”。从这里可以看到，对于命令别人做事这样一件事情，不同的人有不同的理解，有人认为，如果我首先给接受命令的人以足够的训练，让他掌握各种复杂技能（即在硬件中实现对应的复杂功能），那么以后就可以用非常简单的命令让他去做很复杂的事情——比如只要说一句“吃饭”，他就会吃饭。但是也有人认为这样会让事情变的太复杂，毕竟接受命令的人要做的事情很复杂，如果你这时候想让他吃菜怎么办？难道继续训练他吃菜的方法？我们为什么不可以把事情分为许多非常基本的步骤，这样只需要接受命令的人懂得很少的基本技能，就可以完成同样的工作，无非是下达命令的人稍微累一点——比如现在我要他吃菜，只需要把刚刚吃饭命令里的“舀起一勺饭”改成“舀起一勺菜”，问题就解决了，多么简单。这就是“复杂指令集”和“精简指令集”的逻辑区别。
RISC和CISC是什么？
RISC 和CISC是目前设计制造微处理器的两种典型技术，虽然它们都是试图在体系结构、操作运行、软件硬件、编译时间和运行时间等诸多因素中做出某种平衡，以求达到高效的目的，但采用的方法不同，因此，在很多方面差异很大，它们主要有：

指令系统：RISC(for ARM)更偏向于处理简单任务，CISC(for Intel)更偏向于处理复杂任务。

ARM和Intel处理器的一大区别是ARM从来只是设计低功耗处理器，Intel的强项是设计超高性能的台式机和服务器处理器。

参考：https://blog.csdn.net/gerwels_ji/article/details/83001611

## 3、alpha （DEC开发微处理器）
DEC Alpha，64位RISC微处理器，支持VMS操作系统、Linux和BSD。

Alpha是目前已知的内存模型最弱的架构。
很弱的内存模型简化了硬件实现，提升了硬件性能。
但这是以软件复杂性的提升为代价的。由于其上的系统编程较难，现在已淡出工业界。
它的学术价值却不容小觑。
https://www.zhihu.com/question/23685068?sort=created

## 4、关键词：intel、arm、amd、x86
Intel, AMD 的 CPU，大多为 CISC 结构的 CPU。
ARM 的只有 RISC CPU。
CISC 是复杂指令集CPU，指令较长，分成几个微指令去执行，开发程序比较容易（指令多的缘故）。通常一个指令需要好几个 Machine Cycle 才能执行。
RISC 是精简指令集CPU，指令较短，如果内部的 pipe line 做得好，可以使得指令的译码与数据的处理较快，使得执行效率高。通常一个指令只要一个 Machine Cycle 就能够执行。
近年来某些 CISC CPU，如 Intel 的 Pentium-Pro、AMD 的K5、K6 实际上是改进了的CISC，也可以做到一个 Machine Cycle 能执行一个指令。
ARM 本身不做CPU，只授权给其他厂商做CPU，其中最大的一家，就是 Intel。
由於 ARM 的结构一开始就以省电为主，所以一般来说，执行速度没有 Intel 或是 AMD 的 CPU 快。但是在手持式装置的世界，ARM 的省电加上以授权而非自制的联合军团方式，打败了所有的人，成为王者，现在进而慢慢的进入其他的领域。


CPU主要有2个生产商Intel、稳定，老牌。AMD超频、性价比高。


Intel和AMD都是公司名
x86是架构名
ARM也是一种架构，一般用于嵌入式设备，也是一个公司。
mips也是一家公司，也是一种cpu架构。

## 5、物理cpu个数、核数、逻辑cpu数的理解
物理cpu数：主板上实际插入的cpu数量，可以数不重复的 physical id 有几个（physical id）
cpu核数：单块CPU上面能处理数据的芯片组的数量，如双核、四核等 （cpu cores）
逻辑cpu数：一般情况下，逻辑cpu=物理CPU个数×每颗核数

```
[root@hlyy ~]# grep 'physical id' /proc/cpuinfo|sort|uniq|wc -l             # 物理cpu数
8
[root@hlyy ~]# grep 'cpu cores' /proc/cpuinfo|uniq|awk -F ':' '{print $2}'  # cpu核数
 2
[root@hlyy ~]# cat /proc/cpuinfo| grep 'processor'|wc -l					# 逻辑cpu数
16

自身实践：
[root@ubuntu0006:/media] ((e16c5d9...)) #grep 'physical id' /proc/cpuinfo|sort|uniq|wc -l
1
[root@ubuntu0006:/media] ((e16c5d9...)) #grep 'cpu cores' /proc/cpuinfo|uniq|awk -F ':' '{print $2}'
 2
[root@ubuntu0006:/media] ((e16c5d9...)) #cat /proc/cpuinfo| grep 'processor'|wc -l
2
root@HanKin2015:~# grep 'physical id' /proc/cpuinfo|sort|uniq|wc -l
1
root@HanKin2015:~# grep 'cpu cores' /proc/cpuinfo|uniq|awk -F ':' '{print $2}'
 4
root@HanKin2015:~# cat /proc/cpuinfo| grep 'processor'|wc -l
4
```











