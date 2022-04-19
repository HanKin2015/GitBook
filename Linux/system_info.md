# 查看linux系统相关信息

cat /etc/issue
file /bin/bash
file /bin/cat

## 1、查看架构
arch
uname -a
cat /proc/version
lscpu

## 2、查看pci地址
lspci

## 3、查看cpu信息
lscpu
cat /proc/cpuinfo

## 4、查看磁盘信息
fdisk -l
df -h

## 5、查看系统位数
x86_64则说明你是64位内核, 跑的是64位的系统.
i386, i686说明你是32位的内核, 跑的是32位的系统

命令1：getconf LONG_BIT
结果：64

命令2：uname -a
结果：Linux Test004MUJUP 2.6.32-431.23.3.el6.x86_64 #1 SMP Wed Jul 16 06:12:23 EDT 2014 x86_64 x86_64 x86_64 GNU/Linux

命令3：uname -r
结果：2.6.32-431.23.3.el6.x86_64

命令4：cat /proc/version
结果：Linux version 2.6.32-431.23.3.el6.x86_64 (mockbuild@x86-027.build.eng.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-4) (GCC) ) #1 SMP Wed Jul 16 06:12:23 EDT 2014

命令5：arch
结果：x86_64

命令6：lscpu
结果：（不能看CPU 运行模式，32位系统同样结果，可以看Architecture）
lscpu
Architecture:          x86_64
CPU 运行模式：    32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                2
On-line CPU(s) list:   0,1
每个核的线程数：1
每个座的核数：  2
Socket(s):             1
NUMA 节点：         1
厂商 ID：           GenuineIntel
CPU 系列：          6
型号：              15
Model name:            Intel(R) Core(TM)2 Duo CPU     T7700  @ 2.40GHz
步进：              11
CPU MHz：             2893.202
BogoMIPS:              5786.40
超管理器厂商：  KVM
虚拟化类型：     完全
L1d 缓存：          32K
L1i 缓存：          32K
L2 缓存：           4096K
NUMA node0 CPU(s):     0,1
Flags:                 fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx lm constant_tsc rep_good nopl tsc_known_freq pni ssse3 cx16 pcid sse4_2 x2apic hypervisor lahf_lm kaiser

## 6、获取开机时间
who -b 查看最后一次系统启动的时间。
who -r 查看当前系统运行时间
last reboot可以看到Linux系统历史启动的时间
top命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
w命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
cat /proc/uptime
date -d "$(awk -F. '{print $1}' /proc/uptime) second ago" +"%Y-%m-%d %H:%M:%S"
cat /proc/driver/rtc

## 7、x86、x86_64、AMD64
x86是指intel的开发的一种32位指令集，从386开始时代开始的，一直沿用至今，是一种cisc指令集，所有intel早期的cpu，amd早期的cpu都支持这种指令集，intel官方文档里面称为“IA-32”

x84_64是x86 CPU开始迈向64位的时候，有2选择：1、向下兼容x86。2、完全重新设计指令集，不兼容x86。AMD抢跑了，比Intel率先制造出了商用的兼容x86的CPU，AMD称之为AMD64，抢了64位PC的第一桶金，得到了用户的认同。而Intel选择了设计一种不兼容x86的全新64为指令集，称之为IA-64（这玩意似乎就是安腾），但是比amd晚了一步，而且IA-64也挺惨淡的，因为是全新设计的CPU，没有编译器，也不支持windows（微软把intel给忽悠了，承诺了会出安腾版windows server版，但是迟迟拿不出东西）。。。后来不得不在时机落后的情况下也开始支持AMD64的指令集，但是换了个名字，叫x86_64，表示是x86指令集的64扩展，大概是不愿意承认这玩意是AMD设计出来的。

也就是说实际上，x86_64,x64,AMD64基本上是同一个东西，我们现在用的intel/amd的桌面级CPU基本上都是x86_64，与之相对的arm,ppc等都不是x86_64。

x86、x86_64主要的区别就是32位和64位的问题，x86中只有8个32位通用寄存器，eax,ebx,ecx，edx, ebp, esp, esi, edi。x86_64把这8个通用寄存器扩展成了64位的，并且比x86增加了若干个寄存器（好像增加了8个，变成了总共16个通用寄存器）。同样的MMX的寄存器的位数和数量也进行了扩展。此外cpu扩展到64位后也能支持更多的内存了，等等许多好处。

对于普通程序来说，CPU位数的扩展、寄存器数量的增加不会带来明显的性能提升，比如IE浏览器、Office办公这类的软件。特定的程序很能够充分利用64位CPU、更多的寄存器带来的优势，比如MMX除了能提升多媒体程序的性能，对矩阵、多项式、向量计算都能带来提升，更多的MMX寄存器、更大的寄存器字长都有利于SIMD指令的执行，能够提升CPU对数据的吞吐量（RISC指令集的CPU动不动就有数百个寄存器，可以有效的缓存中间计算结果，不需要把中间结果写入内存，从而减少内存访问次数，显著提升性能）

## 8、x86和i686的cpu的区别：
x86是一个intel通用计算机系列的标准编号缩写,也标识一套通用的计算机指令集合,X与处理器没有任何关系，它是一个对所有*86系统的简单的通配符定义；

例如：i386, 586,奔腾(pentium)。由于早期intel的CPU编号都是如8086,80286来编号,由于这整个系列的CPU都是指令兼容的,所以都用X86来标识所使用的指令集合。

而i686 是在 pentun II 之后Intel推出的一个CPU系列；

Pentium 就是586，PentiumPro (P6) 之后的统称为i686，包含了PentiumPro, PentiumⅡ,PentiumⅢ和P4。

i686的解释：

i代表intel系列的cpu 。

386 几乎适用于所有的 x86 平台，不论是旧的 pentum 或者是新的 pentum-IV 与 K7 系列的 CPU等等，都可以正常的工作！那个 i 指的是 Intel 兼容的 CPU 的意思，至于 386 不用说，就是 CPU 的等级啦！

i586 就是 586 等级的计算机，那是哪些呢？包括 pentum 第一代 MMX CPU， AMD 的 K5, K6 系列 CPU ( socket 7 插脚 ) 等等的 CPU 都算是这个等级；

i686 在 pentun II 以后的 Intel 系列 CPU ，及 K7 以后等级的 CPU 都属于这个 686 等级！

x86_64的解释：

而x86_64就是64位的x(代表不确定。可以是3、4、5、6、）86，是个统称，如果是i686_64也是属于x86_64的。