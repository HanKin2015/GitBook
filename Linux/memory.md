# Linux下查看内存使用情况方法总结

## 1、/proc/meminfo
查看RAM使用情况最简单的方法是通过 /proc/meminfo。这个动态更新的虚拟文件实际上是许多其他内存相关工具(如：free / ps / top)等的组合显示。/proc/meminfo列出了所有你想了解的内存的使用情况。进程的内存使用信息也可以通过 /proc/<pid>/statm 和 /proc/<pid>/status 来查看。

## 2、top
top命令提供了实时的运行中的程序的资源使用统计。你可以根据内存的使用和大小来进行排序。
```
top -p $(pidof test) -d 1
```
它是Linux系统下常用的性能分析工具，能够实时显示系统中各个进程的资源占用状况。TOP命令的显示分为两部分：
顶部显示系统的整体性能信息，包括系统当前时间、系统运行时间、负载均衡（1分钟、5分钟、15分钟）、空闲CPU等

底部显示系统中所有进程的资源占用信息，包括进程ID、进程的属主、进程优先级、进程的nice值、使用的内存情况、进程状态S等

但它也存在一些不足之处，如不支持鼠标、不支持滚动、没有颜色来突出显示事物等。由于这些原因，并非每个人都能轻松使用TOP命令。

## 3、atop
atop命令是一个终端环境的监控命令。它显示的是各种系统资源（CPU, memory, network, I/O, kernel）的综合，并且在高负载的情况下进行了彩色标注。

atop命令可以看作是top命令的增强版，它可以显示更详细的进程信息，如进程的CPU使用率、进程的内存使用率、进程的I/O使用率、网络使用率等；提供更丰富的统计信息及更灵活的配置，可以通过参数来控制显示内容和行为。

## 4、free
free命令是一个快速查看内存使用情况的方法，它是对 /proc/meminfo 收集到的信息的一个概述。

## 5、GNOME System Monitor（gnome-system-monitor）
GNOME System Monitor 是一个显示最近一段时间内的CPU、内存、交换区及网络的使用情况的视图工具。它还提供了一种查看CPU及内存使用情况的方法。

## 6、htop
htop命令显示了每个进程的内存实时使用率。它提供了所有进程的常驻内存大小、程序总内存大小、共享库大小等的报告。列表可以水平及垂直滚动。

htop 是一种交互式系统监视器，还支持滚动和鼠标交互。使用 htop 来监控系统资源和进程，还可以让你杀死进程、过滤进程、提供进程树视图（按 F5 键）以及其他一些功能。

## 7、KDE System Monitor（ksysguard）
功能同 5 中介绍的GENOME版本。

## 8、memstat（memstat -p \<PID>）
memstat是一个有效识别 executable(s), process(es) and shared libraries使用虚拟内存情况的命令。给定一个进程ID，memstat可以列出这个进程相关的可执行文件、数据和共享库。

## 9、nmon
nmon是一个基于ncurses的系统基准测试工具，它可以监控CPU、内存、I/O、文件系统及网络资源等的互动模式。对于内存的使用，它可以实时的显示 总/剩余内存、交换空间等信息。
nmon是IBM提供的一款免费的Linux和AIX操作系统监控和分析工具，它可以实时捕捉系统资源的使用情况。nmon的优势如下：
- 功能强大，可以监控系统的各项资源
- 灵活性高，可通过参数控制显示内容和行为
- 兼容性好，支持Linux和AIX操作系统

## 10、ps（ps aux --sort -rss）
ps命令可以实时的显示各个进程的内存使用情况。Reported memory usage information includes %MEM (percent of physical memory used), VSZ (total amount of virtual memory used), and RSS (total amount of physical memory used)。你可以使用 “–sort”选项对进程进行排序，例如按RSS进行排序。

## 11、smem（sudo smem --piename -c "pss"）
smem命令允许你统计基于/proc信息的不同进程和用户的内存使用情况。内存使用情况的分析可以导出图表（如条形图和饼图）。

## 12、vmstat（vmstat -s -SM)
vmstat命令显示实时的和平均的统计，覆盖CPU、内存、I/O等内容。例如内存情况，不仅显示物理内存，也统计虚拟内存。

## 13、vtop
vtop 是一款有趣的工具，既能监控系统资源，又能管理资源。与其他工具不同，它使用 node.js 编写。因此，你需要安装 node.js 和 npm 软件包。它提供鼠标支持，看起来就像终端中的图形用户界面。因此，你更容易理解和监控。此外，你还可以轻松定制 vtop 主题。

## 14、bashtop
这是另一个令人印象深刻的替代工具，虽然运行时可能需要更多资源，但它更易于使用，而且看起来很棒。除了默认提供的信息外，如果你还想使用 bashtop 获得 CPU 温度和其他统计数据，只需要添加更多的模块即可。

## 15、 gtop
gtop是Linux下的一款性能分析工具，可以实时显示系统中各个进程的资源占用状况。它是top命令的图形化版本，提供了更直观的显示效果。与 vtop 有些相似，也需要安装 nodejs。

## 16、Glances 
Glances 是一款系统监控工具，它能将所有工具整合在一起。只要你愿意，你能看到包括磁盘 I/O、网络、内核版本、传感器和其他信息等所有基本统计信息，你还可以将统计信息导出到外部数据库，并使用网络接口进行远程监控。这对于制作自定义网络仪表盘的系统管理员来说尤其有用。