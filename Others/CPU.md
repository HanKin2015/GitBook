# CPU那些事儿

## 1、CISC & RISC
(ARM与x86：有何区别？)[https://mp.weixin.qq.com/s/X2syU5xDH93BJdtUGnKHyg]
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

## 6、arm64和aarch64之间的区别
直接给出结论：arm64已经与aarch64合并，因为aarch64和arm64指的是同一件事。

AArch64是ARMv8 架构的一种执行状态。为了更广泛地向企业领域推进，需要引入 64 位构架。同时也需要在 ARMv8 架构中引入新的 AArch64 执行状态。AArch64 不是一个单纯的 32 位 ARM 构架扩展，而是 ARMv8 内全新的构架，完全使用全新的 A64 指令集。这些都源自于多年对现代构架设计的深入研究。更重要的是， AArch64 作为一个分离出的执行状态，意味着一些未来的处理器可能不支持旧的 AArch32 执行状态。 虽然最初的 64 位 ARM 处理器将会完全向后兼容，但我们大胆且前瞻性地将 AArch64 作为在 ARMv8 处理器中唯一的执行状态。我们在这些系统中将不支持 32 位执行状态， 这将使许多有益的实现得到权衡，如默认情况下，使用一个较大的 64K 大小的页面，并会使得纯净的 64 位 ARM 服务器系统不受遗留代码的影响。立即进行这种划分是很重要的，因为有可能在未来几年内将出现仅支持 64 位的服务器系统。没有必要在新的 64 位架构中去实现一个完整的 32 位流水线，这将会提高未来 ARM 服务器系统的能效。这样回想起来， AArch64 作为在 Fedora ARM 项目中被支持的 ARM 构架是一个很自然的过程： armv5tel、armv7hl、aarch64。新的架构被命名为：aarch64，这同 ARM 自己选择的主线命名方式保持一致，同时也考虑到了 ARM 架构名与 ARM 商标分开的期望。

ARM64是由Apple创建的，而AARCH64是由其他人（最著名的是GNU / GCC的）创建的。
经过一番谷歌搜索后，我发现LLVM 64位ARM64 / AArch64后端已合并，用于aarch64的Apple后端称为arm64，而LLVM 编译器社区开发的后端称为aarch64（因为它是64位ISA的规范名称），后来将arm64和 aarch64 两者合并，现在的后端称为aarch64。

https://blog.csdn.net/qq_24433609/article/details/125991550

可以这么理解，我们所说的arm架构就是aarch架构。

## 7、L123缓存
一级缓存即L1 Cache。集成在CPU内部中，用于CPU在处理数据过程中数据的暂时保存。由于缓存指令和数据与CPU同频工作，L1级高速缓存缓存的容量越大，存储信息越多，可减少CPU与内存之间的数据交换次数，提高CPU的运算效率。但因高速缓冲存储器均由静态RAM组成，结构较复杂，在有限的CPU芯片面积上，L1级高速缓存的容量不可能做得太大。

L2缓存位于CPU与内存之间的临时存储器，容量比内存小但交换速度快，二级缓存容量大小决定了cpu的性能。

简单地说，二级缓存就是一级缓存的缓冲器：一级缓存制造成本很高因此它的容量有限，二级缓存的作用就是存储那些CPU处理时需要用到、一级缓存又无法存储的数据。同样道理，三级缓存和内存可以看作是二级缓存的缓冲器，它们的容量递增，但单位制造成本却递减。需要注意的是，无论是二级缓存、三级缓存还是内存都不能存储处理器操作的原始指令，这些指令只能存储在CPU的一级指令缓存中，而余下的二级缓存、三级缓存和内存仅用于存储CPU所需数据。

## 8、C86处理器
海光信息技术股份有限公司成立于2014年，是天津市高新技术企业，国产服务器CPU芯片的龙头，主要从事高端处理器、加速器等计算芯片产品和系统的研究、开发，公司最大股东中科曙光（603019.SH）为沪市主板上市公司，其实际控制人为中国科学院计算技术研究所。

通过与AMD合作拿到了后者先进的Zen架构、代码IP的授权（Dhyana），二次开发了属于自己的海光C86处理器，基本就是AMD一代霄龙的翻版，GF 14nm工艺制造，最多32核心64线程。

很多人对于国内芯片团队能否消化吸收如此先进的x86架构感到担心，也忧虑其中是否会有“后门”的存在，毕竟x86 CPU里往往都会有“冗余”模块，斯诺登也证实了一些不可告人的秘密。

据称海光C86处理器中唯一不是来自AMD原始设计、中国方面原创加入的恰恰就是加解密部分。在信息安全越来越核心的当下，这无疑是最令人振奋的突破。在加解密测试项目中，这颗海光C86赫然拿下了全球第一名，加密、解密、哈希带宽均达到了101GB/s，非常恐怖的数字。

## 9、Zen
“Zen”是AMD开发的全新x86处理器核心，与AMD现有的x86处理器核心相比，每个时钟周期的指令集可提高40%。 定制化64位ARM核心—“K12”核心为提高能效设计，适用于服务器和嵌入式工作负载。

Zen架构将以四个核心为一个群组，AMD将其称为“CPU Complex”(CCX)，也就是“CPU复合体”的意思。
每一个CPU复合体内包含四个Zen CPU核心，但它们是彼此完全独立的，不像推土机架构那样，彼此不会共享任何单元。

推土机（Bulldozer）是AMD的微处理器架构。“推土机”将采用32nm SOI工艺，采用了“模块化（Module）”的设计，每个“模块”包含两个处理器核心。

## 10、显卡
如：NVIDIA Tesla M10

详细参数：https://www.xincanshu.com/gpu/NVIDIA_Tesla_M10/index.html
参考价：https://detail.zol.com.cn/1264/1263784/param.shtml

## 11、似乎HUAWEI Kirin 9006C套壳cortex-A55
我在一台华为笔记本上面使用lscpu命令显示cortex-A55，但是cat /proc/cpuinfo显示硬件为HUAWEI Kirin 9006C，另外一款同型号笔记本lscpu显示HUAWEI Kirin 9006C。
两者装的系统不同，可能是系统识别错误导致。曾经我在一个盒子上面刷机时发现cpu为FT-2000，结果我刷到其他系统后变成FT-D2000，后面我没有刷回去进一步验证。

