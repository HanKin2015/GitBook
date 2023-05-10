# perf

CPU利用率分析
CPU问题直接上perf工具
执行netstat -antp|grep ssh| wc -l 结果显示当前就绪状态的连接有4120个

## 1、简介
系统级性能优化通常包括两个阶段：性能剖析（performance profiling）和代码优化。性能剖析的目标是寻找性能瓶颈，查找引发性能问题的原因及热点代码。代码优化的目标是针对具体性能问题而优化代码或编译选项，以改善软件性能。

perf是一款Linux性能分析工具。Linux性能计数器是一个新的基于内核的子系统，它提供一个性能分析框架，比如硬件（CPU、PMU(Performance Monitoring Unit)）功能和软件(软件计数器、tracepoint)功能。通过perf，应用程序可以利用PMU、tracepoint和内核中的计数器来进行性能统计。它不但可以分析制定应用程序的性能问题（per thread），也可以用来分析内核的性能问题。

总之perf是一款很牛逼的综合性分析工具，大到系统全局性性能，再小到进程线程级别，甚至到函数及汇编级别。

## 2、安装perf
apt install linux-tools-generic

使用perf时，看不到函数符号信息，可以安装 apt-get install libc6-dbg

## 3、火焰图
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

## 4、实战
perf top可以实时查看当前系统进程函数占用率情况（分析出来CPU时间主要花费在哪里）
```study_flame_graph.cpp
#include <pthread.h>
#include <stdio.h>
#include <errno.h>

void func_d()
{
    int i;
    for(i = 0; i < 50000; i++);
}

void func_a()
{
    int i;
    for(i = 0; i < 100000; i++);
    func_d();
}

void func_b()
{
    int i;
    for(i = 0; i < 200000; i++);
}

void func_c()
{
    int i;
    for(i = 0; i < 300000; i++);
}

void *thread_fun(void *param)
{
    while (1) {
        int i;
        for(i = 0; i < 100000; i++);
        func_a();
        func_b();
        func_c();
    }
}

int main(void)
{
    pthread_t tid1, tid2;
    int ret;
    ret = pthread_create(&tid1, NULL, thread_fun, NULL);
    if (ret == -1) {
        perror("pthread_create");
        return -1;
    }

    ret = pthread_create(&tid2, NULL, thread_fun, NULL);
    if (ret == -1) {
        perror("pthread_create");
        return -1;
    }    

    if (pthread_join(tid1, NULL) != 0) {
        perror("pthread_join");
        return -2;
    }

    if (pthread_join(tid2, NULL) != 0) {
        perror("pthread_join");
        return -2;
    }
    return 0;
}
```
```
$ g++ study_flame_graph.cpp -g -lpthread
$ ./a.out &
$ perf sched record -p <pid> [<options>]（只产生了perf.data文件）
$ perf sched latency  看不懂数据

$ perf record -F 99 -a -g -- sleep 60（生成perf.data文件）
$ perf script > out.perf（读取perf.data文件生成out.perf文件）
$ $ ./stackcollapse-perf.pl out.perf > out.folded
$ ./flamegraph.pl out.folded > out.svg
```




用 perf 抓取 火焰图

解压 FlameGraph.rarFlameGraph.rar (2.8 MB) 到运行环境

先运行 perf record -g -p pidof Xorg 抓取运行帧信息

再运行 perf script | FlameGraph/stackcollapse-perf.pl | FlameGraph/flamegraph.pl > flameGraph.svg 生成火焰图

用谷歌浏览器查看火焰图，分析CPU使用情况



