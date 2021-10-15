# top命令

## 1、查看多核CPU命令
mpstat -P ALL  和  sar -P ALL 
说明：sar -P ALL > aaa.txt   重定向输出内容到文件 aaa.txt

## 2、详解
```
top - 14:35:23 up 16 days,  5:29,  1 user,  load average: 0.11, 0.11, 0.09
Tasks: 168 total,   1 running, 167 sleeping,   0 stopped,   0 zombie
%Cpu(s):  2.7 us,  3.2 sy,  0.0 ni, 94.2 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem :  8175056 total,  4722520 free,   318240 used,  3134296 buff/cache
KiB Swap:  2095100 total,  2095100 free,        0 used.  7410892 avail Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND
 1318 avahi     20   0   45176   3952   3336 S   0.3  0.0  28:24.32 avahi-daemon
20127 root      20   0   44656   3828   3172 R   0.3  0.0   0:00.04 top
    1 root      20   0  119724   5744   3848 S   0.0  0.1   0:05.36 systemd
```

 第一行：
    10:08:45 — 当前系统时间
    10 days, 3:05 — 系统已经运行了10天3小时5分钟（在这期间没有重启过）
    1 users — 当前有1个用户登录系统
    load average: 0.00, 0.00, 0.00 — load average后面的三个数分别是1分钟、5分钟、15分钟的负载情况。

load average数据是每隔5秒钟检查一次活跃的进程数，然后按特定算法计算出的数值。如果这个数除以逻辑CPU的数量，结果高于5的时候就表明系统在超负荷运转了。

    第二行：
    Tasks — 任务（进程），系统现在共有135个进程，其中处于运行中的有1个，134个在休眠（sleep），stoped状态的有0个，zombie状态（僵尸）的有0个。

    第三行：cpu状态
    0.3% us — 用户空间占用CPU的百分比。
    0.0% sy — 内核空间占用CPU的百分比。
    0.0% ni — 改变过优先级的进程占用CPU的百分比
    99.7% id — 空闲CPU百分比
    0.0% wa — IO等待占用CPU的百分比
    0.0% hi — 硬中断（Hardware IRQ）占用CPU的百分比
    0.0% si — 软中断（Software Interrupts）占用CPU的百分比

在这里CPU的使用比率和windows概念不同，如果你不理解用户空间和内核空间，需要充充电了。

    第四行：内存状态
    3808060k total — 物理内存总量（4GB）
    3660048k used — 使用中的内存总量（3.6GB）
    148012k free — 空闲内存总量（148M）
    359760k buffers — 缓存的内存量 （359M）

    第五行：swap交换分区
    4184924k total — 交换区总量（4G）
    0k used — 使用的交换区总量（0M）
    4184924k free — 空闲交换区总量（4G）
    2483956k cached — 缓冲的交换区总量（2483M）

第四行中使用中的内存总量（used）指的是现在系统内核控制的内存数，空闲内存总量（free）是内核还未纳入其管控范围的数量。纳入内核管理的内存不见得都在使用中，还包括过去使用过的现在可以被重复利用的内存，内核并不把这些可被重新使用的内存交还到free中去，因此在linux上free内存会越来越少，但不用为此担心。

如果出于习惯去计算可用内存数，这里有个近似的计算公式：第四行的free + 第四行的buffers + 第五行的cached，按这个公式此台服务器的可用内存：148M+259M+2483M = 2990M。

对于内存监控，在top里我们要时刻监控第五行swap交换分区的used，如果这个数值在不断的变化，说明内核在不断进行内存和swap的数据交换，这是真正的内存不够用了。

 第六行是空行

    第七行以下：各进程（任务）的状态监控
    PID — 进程id
    USER — 进程所有者
    PR — 进程优先级
    NI — nice值。负值表示高优先级，正值表示低优先级
    VIRT — 进程使用的虚拟内存总量，单位kb。VIRT=SWAP+RES
    RES — 进程使用的、未被换出的物理内存大小，单位kb。RES=CODE+DATA
    SHR — 共享内存大小，单位kb
    S — 进程状态。D=不可中断的睡眠状态 R=运行 S=睡眠 T=跟踪/停止 Z=僵尸进程
    %CPU — 上次更新到现在的CPU时间占用百分比
    %MEM — 进程使用的物理内存百分比
    TIME+ — 进程使用的CPU时间总计，单位1/100秒
    COMMAND — 进程名称（命令名/命令行）



在top基本视图中，按键盘数字“1”，可监控每个逻辑CPU的状况
如果不按1，则在top视图里面显示的是所有cpu的平均值。



