# perf

CPU利用率分析
CPU问题直接上perf工具
执行netstat -antp|grep ssh| wc -l 结果显示当前就绪状态的连接有4120个

## 1、简介
Perf，即 Performance 的缩写，是一款集成于 Linux 内核的性能分析工具。

系统级性能优化通常包括两个阶段：性能剖析（performance profiling）和代码优化。性能剖析的目标是寻找性能瓶颈，查找引发性能问题的原因及热点代码。代码优化的目标是针对具体性能问题而优化代码或编译选项，以改善软件性能。

perf是一款Linux性能分析工具。Linux性能计数器是一个新的基于内核的子系统，它提供一个性能分析框架，比如硬件（CPU、PMU(Performance Monitoring Unit)）功能和软件(软件计数器、tracepoint)功能。通过perf，应用程序可以利用PMU、tracepoint和内核中的计数器来进行性能统计。它不但可以分析制定应用程序的性能问题（per thread），也可以用来分析内核的性能问题。

总之perf是一款很牛逼的综合性分析工具，大到系统全局性性能，再小到进程线程级别，甚至到函数及汇编级别。

## 2、安装perf
```
root@hankin:~/opencv# perf --version
WARNING: perf not found for kernel 6.14.0-24

  You may need to install the following packages for this specific kernel:
    linux-tools-6.14.0-24-generic
    linux-cloud-tools-6.14.0-24-generic

  You may also want to install one of the following packages to keep up to date:
    linux-tools-generic
    linux-cloud-tools-generic
root@hankin:~/opencv# uname -r
6.14.0-24-generic
```

在基于 Debian 或 Ubuntu 的系统中，Perf 工具通常包含在linux-tools-common和linux-tools-<kernel-version>包中。安装命令如下：
```
sudo apt-get install linux-tools-common linux-tools-`uname -r`
```

使用perf时，看不到函数符号信息，可以安装 apt-get install libc6-dbg

源码安装：从源码安装 Perf 则是另一种安装方式，适合那些需要定制 Perf 功能或在没有包管理器的环境中安装的情况。首先，需要从 Linux 内核官方网站下载内核源码，下载命令如下：git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git
```
cd linux/tools/perf
make
sudo cp perf /usr/local/bin/
perf --version
```

实战测试发现安装perf失败，但是通过find找到可用的perf工具。
```
ln -sf /usr/lib/linux-tools-6.8.0-71/perf /usr/bin/perf
```

## 3、火焰图
火焰图（Flame Graph）是一种可视化工具，用于分析软件程序的性能瓶颈。它由Brendan Gregg在2011年开发，现已成为性能分析领域的标准工具之一。

火焰图的基本原理是将程序的函数调用栈转换为可视化图形，其中每个矩形代表一个函数，矩形的宽度表示该函数在程序中占用的CPU时间的比例，矩形的高度表示函数调用的深度。通过观察火焰图，可以快速定位程序中的性能瓶颈，找到哪些函数占用了大量的CPU时间，从而进行优化。

火焰图通常使用专门的工具生成，例如Brendan Gregg开发的FlameGraph工具。生成火焰图的过程需要先收集程序的性能数据，例如使用Linux系统中的perf工具或DTrace工具。然后将性能数据转换为火焰图的格式，最后使用FlameGraph工具生成可视化图形。

火焰图已经被广泛应用于各种领域，例如操作系统、数据库、Web应用程序等。它是一种非常有用的工具，可以帮助开发人员快速定位程序中的性能问题，提高程序的性能和可靠性。

Linux性能分析利器——火焰图(FlameGraph)

火焰图（Flame Graph）是由Linux性能优化大师Brendan Gregg发明的，和所有其他的trace和profiling方法不同的是，Flame Graph以一个全局的视野来看待时间分布，它从底部往顶部，列出所有可能的调用栈。其他的呈现方法，一般只能列出单一的调用栈或者非层次化的时间分布。

以典型的分析CPU时间花费到哪个函数的on-cpu火焰图为例来展开。CPU火焰图中的每一个方框是一个函数，方框的长度，代表了它的执行时间，所以越宽的函数，执行越久。火焰图的楼层每高一层，就是更深一级的函数被调用，最顶层的函数，是叶子函数。

脚本获取：git clone https://github.com/brendangregg/FlameGraph
```
1). 采集数据的设备上（使用perf工具采集指定进程的调用栈，并生成unfold数据）

perf record -F 99 -p 1155 -g -o dash-border-revised.data -- sleep 10
perf script -i dash-border-revised.data > dash-border-revised.unfold
2). 安装了火焰图工具的设备上

stackcollapse-perf.pl dash-border-revised.unfold > dash-border-revised.folded
flamegraph.pl dash-border-revised.folded > dash-border-revised.svg
注：工具路径 ( https://github.com/brendangregg/FlameGraph/tree/v1.0 ) ，下载即可（依赖 perl 脚本工具）

生成的火焰图 svg 图片，使用浏览器打开即可，就可以查看各调用栈的比例等。
```

## 4、Perf的基本使用
参考：https://mp.weixin.qq.com/s/eV7OPXHYNtzol5D2qHi2jg

CPU周期(cpu-cycles)是默认的性能事件，所谓的CPU周期是指CPU所能识别的最小时间单元，通常为亿分之几秒，是CPU执行最简单的指令时所需要的时间，例如读取寄存器中的内容，也叫做clock tick。

perf COMMAND [-e event ...] PROGRAM, perf 是采用的这么一个命令格式, COMMAND一般常用的就是 top, stat, record, report等. 然后用 -e 参数来统计需要关注的事件. 多个事件就用多个 -e 连接。

Perf是一个包含22种子工具的工具集，以下是最常用的5种：
perf list用来查看perf所支持的性能事件，有软件的也有硬件的。
perf stat
perf-top
perf-record
perf-report
perf-trace

## 5、实战1
perf top可以实时查看当前系统进程函数占用率情况（分析出来CPU时间主要花费在哪里）
测试demo：D:\interview\Storage\c++\内存泄露工具\perf\study_flame_graph.c

```
$ g++ study_flame_graph.c -g -lpthread
$ ./a.out &
$ perf sched record -p <pid> [<options>]（只产生了perf.data文件）
$ perf sched latency  看不懂数据

$ perf record -F 99 -a -g -- sleep 60（生成perf.data文件）
$ perf script > out.perf（读取perf.data文件生成out.perf文件）
$ $ ./stackcollapse-perf.pl out.perf > out.folded
$ ./flamegraph.pl out.folded > out.svg
```
20250804今日测试发现根本执行不下去，感觉之前也没有运行成功。

## 6、实战2
测试demo：D:\interview\Storage\c++\内存泄露工具\perf\t1.c
```
root@hankin:~/opencv# g++ main.cpp 
root@hankin:~/opencv# ./a.out 
root@hankin:~/opencv# perf stat ./a.out 
 Performance counter stats for './a.out':

            264.41 msec task-clock                       #    0.982 CPUs utilized             
                25      context-switches                 #   94.548 /sec                      
                 0      cpu-migrations                   #    0.000 /sec                      
                55      page-faults                      #  208.007 /sec                      
   <not supported>      cycles                                                                
   <not supported>      instructions                                                          
   <not supported>      branches                                                              
   <not supported>      branch-misses                                                         

       0.269230744 seconds time elapsed

       0.261941000 seconds user
       0.002965000 seconds sys
```

程序 t1 是一个 CPU bound 型，因为 task-clock-msecs 接近 1。

Task-clock-msecs：CPU 利用率，该值高，说明程序的多数时间花费在 CPU 计算上而非 IO。Context-switches：进程切换次数，记录了程序运行过程中发生了多少次进程切换，频繁的进程切换是应该避免的。Cache-misses：程序运行过程中总体的 cache 利用情况，如果该值过高，说明程序的 cache 利用不好CPU-migrations：表示进程 t1 运行过程中发生了多少次 CPU 迁移，即被调度器从一个 CPU 转移到另外一个 CPU 上运行。Cycles：处理器时钟，一条机器指令可能需要多个 cycles，Instructions: 机器指令数目。IPC：是 Instructions/Cycles 的比值，该值越大越好，说明程序充分利用了处理器的特性。Cache-references: cache 命中的次数，Cache-misses: cache 失效的次数。

## 7、实战3
测试demo：D:\interview\Storage\c++\内存泄露工具\perf\t2.c

使用perf top命令可以看见a.out会在首行。

```
perf record -e cpu-clock ./t1
perf report
```
