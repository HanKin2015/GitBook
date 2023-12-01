# Linux下查看内存使用情况方法总结

## 1、/proc/meminfo
查看RAM使用情况最简单的方法是通过 /proc/meminfo。这个动态更新的虚拟文件实际上是许多其他内存相关工具(如：free / ps / top)等的组合显示。/proc/meminfo列出了所有你想了解的内存的使用情况。进程的内存使用信息也可以通过 /proc/<pid>/statm 和 /proc/<pid>/status 来查看。

## 2、top
top命令提供了实时的运行中的程序的资源使用统计。你可以根据内存的使用和大小来进行排序。
top -p $(pidof test) -d 1

## 3、atop
atop命令是一个终端环境的监控命令。它显示的是各种系统资源（CPU, memory, network, I/O, kernel）的综合，并且在高负载的情况下进行了彩色标注。

## 4、free
free命令是一个快速查看内存使用情况的方法，它是对 /proc/meminfo 收集到的信息的一个概述。

## 5、GNOME System Monitor（gnome-system-monitor）
GNOME System Monitor 是一个显示最近一段时间内的CPU、内存、交换区及网络的使用情况的视图工具。它还提供了一种查看CPU及内存使用情况的方法。

## 6、htop
htop命令显示了每个进程的内存实时使用率。它提供了所有进程的常驻内存大小、程序总内存大小、共享库大小等的报告。列表可以水平及垂直滚动。

## 7、KDE System Monitor（ksysguard）
功能同 5 中介绍的GENOME版本。

## 8、memstat（memstat -p \<PID>）
memstat是一个有效识别 executable(s), process(es) and shared libraries使用虚拟内存情况的命令。给定一个进程ID，memstat可以列出这个进程相关的可执行文件、数据和共享库。

## 9、nmon
nmon是一个基于ncurses的系统基准测试工具，它可以监控CPU、内存、I/O、文件系统及网络资源等的互动模式。对于内存的使用，它可以实时的显示 总/剩余内存、交换空间等信息。

## 10、ps（ps aux --sort -rss）
ps命令可以实时的显示各个进程的内存使用情况。Reported memory usage information includes %MEM (percent of physical memory used), VSZ (total amount of virtual memory used), and RSS (total amount of physical memory used)。你可以使用 “–sort”选项对进程进行排序，例如按RSS进行排序。

## 11、smem（sudo smem --piename -c "pss"）
smem命令允许你统计基于/proc信息的不同进程和用户的内存使用情况。内存使用情况的分析可以导出图表（如条形图和饼图）。

## 12、vmstat（vmstat -s -SM)
vmstat命令显示实时的和平均的统计，覆盖CPU、内存、I/O等内容。例如内存情况，不仅显示物理内存，也统计虚拟内存。


