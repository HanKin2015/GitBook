[TOC]

# 进程知识

## 1、僵尸进程 
僵尸进程是当子进程比父进程先结束，而父进程又没有回收子进程，释放子进程占用的资源，此时子进程将成为一个僵尸进程。如果父进程先退出 ，子进程被init接管，子进程退出后init会回收其占用的相关资源
我们都知道进程的工作原理。我们启动一个程序，开始我们的任务，然后等任务结束了，我们就停止这个进程。 进程停止后， 该进程就会从进程表中移除。
你可以通过 System-Monitor 查看当前进程。
In UNIX System terminology, a process that has terminated,but whose parent has not yet waited for it, is called a zombie. 在UNIX 系统中，一个进程结束了，但是他的父进程没有等待(调用wait / waitpid)他， 那么他将变成一个僵尸进程。 但是如果该进程的父进程已经先结束了，那么该进程就不会变成僵尸进程， 因为每个进程结束的时候，系统都会扫描当前系统中所运行的所有进程， 看有没有哪个进程是刚刚结束的这个进程的子进程，如果是的话，就由Init 来接管他，成为他的父进程。

### 1-1、杀死僵尸进程
top命令会查看到僵尸进程，不占用内存cpu，zombie就是僵尸进程
ps aux | grep python 找到僵尸进程的父进程
kill -9 父进程ID

### 1-2、确定杀不掉进程的原因
- 这个进程是僵尸进程
- 此进程是"核心态"进程。

## 2、LINUX下PS -EF和PS AUX的区别
Linux下显示系统进程的命令ps，最常用的有ps -ef 和ps aux。这两个到底有什么区别呢？两者没太大差别，讨论这个问题，要追溯到Unix系统中的两种风格，System Ｖ风格和BSD 风格，ps aux最初用到Unix Style中，而ps -ef被用在System V Style中，两者输出略有不同。现在的大部分Linux系统都是可以同时使用这两种方式的。

ps -ef 是用标准的格式显示进程的。
```
UID    //用户ID、但输出的是用户名 
PID    //进程的ID 
PPID    //父进程ID 
C      //进程占用CPU的百分比 
STIME  //进程启动到现在的时间 
TTY    //该进程在那个终端上运行，若与终端无关，则显示? 若为pts/0等，则表示由网络连接主机进程。 
CMD    //命令的名称和参数
```

ps aux 是用BSD的格式来显示。
```
USER      //用户名 
%CPU      //进程占用的CPU百分比 
%MEM      //占用内存的百分比 
VSZ      //该进程使用的虚拟內存量（KB） 
RSS      //该进程占用的固定內存量（KB）（驻留中页的数量） 
STAT      //进程的状态 
START    //该进程被触发启动时间 
TIME      //该进程实际使用CPU运行的时间

其中STAT状态位常见的状态字符有
D      //无法中断的休眠状态（通常 IO 的进程）； 
R      //正在运行可中在队列中可过行的； 
S      //处于休眠状态； 
T      //停止或被追踪； 
W      //进入内存交换 （从内核2.6开始无效）； 
X      //死掉的进程 （基本很少见）； 
Z      //僵尸进程； 
<      //优先级高的进程 
N      //优先级较低的进程 
L      //有些页被锁进内存； 
s      //进程的领导者（在它之下有子进程）； 
l      //多线程，克隆线程（使用 CLONE_THREAD, 类似 NPTL pthreads）； 
+      //位于后台的进程组；
```

注意一点，ps -l和ps l两者使用起来的结果是不同的，类似的有很多。注意还需要区分大小写ps -L。
```
[root@ubuntu0006:~] #ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
4 S     0 12399 12006  0  80   0 -  6468 wait   pts/4    00:00:00 bash
0 S     0 16599 12399  0  80   0 -  3853 wait   pts/4    00:00:00 bash
0 S     0 16670 16599  0  80   0 -  2533 hrtime pts/4    00:00:00 sleep
0 R     0 17098 12399  0  80   0 -  7940 -      pts/4    00:00:00 ps
[root@ubuntu0006:~] #ps l
F   UID   PID  PPID PRI  NI    VSZ   RSS WCHAN  STAT TTY        TIME COMMAND
4     0  1226  1086  20   0 553504 61192 poll_s Ssl+ tty7       2:43 /usr/lib/xorg/Xorg -core :0 -seat seat0 -auth /var/run/lightdm/root/:0 -nolisten tcp vt7
4     0  2695     1  20   0  18780  1776 poll_s Ss+  tty1       0:00 /sbin/agetty --noclear tty1 linux
4     0 12399 12006  20   0  25872  5668 wait   Ss   pts/4      0:00 -bash
0     0 16599 12399  20   0  15412  3048 wait   S    pts/4      0:00 bash test.sh
0     0 17150 16599  20   0  10132   696 hrtime S    pts/4      0:00 sleep 2
0     0 17162 12399  20   0  31760  1452 -      R+   pts/4      0:00 ps l
4     0 31812     1  20   0  25792  5376 wait_w Ss+  tty2       0:00 /bin/bash

[root@ubuntu0006:/proc/23416/task/23417] #ps -l -p 23416
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S     0 23416 12399 99  80   0 - 20062 futex_ pts/4    00:10:10 a.out
[root@ubuntu0006:/proc/23416/task/23417] #ps -L -p 23416
  PID   LWP TTY          TIME CMD
23416 23416 pts/4    00:00:00 a.out
23416 23417 pts/4    00:10:25 wangzherongyao
```

使用man ps官方解答：
```
l      Display BSD long format.
-l     Long format.  The -y option is often useful with this.
-L     Show threads, possibly with LWP and NLWP columns.
```

## 3、PS命令
PS，是Linux系统命令之一，是在Linux中是查看进程的命令。ps查看正处于Running的进程，ps aux查看所有的进程。

### 3-1、进程状态
- 运行状态(正在运行或在运行队列中等待[就绪队列])
- 中断状态(休眠中, 受阻, 在等待某个条件的形成或接受到信号)
- 不可中断状态(收到信号不唤醒和不可运行, 进程必须等待直到有中断发生)
- 僵死状态(进程已终止, 但进程描述符存在, 直到父进程调用wait4()系统调用后释放)
- 停止状态(进程收到SIGSTOP, SIGSTP, SIGTIN, SIGTOU信号后停止运行运行)

### 3-2、PS工具标识进程的5种状态码
- D 不可中断 uninterruptible sleep (usually IO)
- R 运行 runnable (on run queue)
- S 中断 sleeping
- T 停止 traced or stopped
- Z 僵死 a defunct (”zombie”) process

### 3-3、相关参数
-e 显示所有进程。
-f 全格式。
-h 不显示标题。
-l 长格式。
-w 宽输出。
a 显示终端上的所有进程，包括其他用户的进程。
r 只显示正在运行的进程。
x 显示没有控制终端的进程。
O[+|-] k1 [，[+|-] k2 [，…]] 根据SHORT KEYS、k1、k2中快捷键指定的多级排序顺序显示进程列表。
--sort X[+|-] key [，[+|-] key [，…]] 从SORT KEYS段中选一个多字母键。“+”字符是可选的，因为默认的方向就是按数字升序或者词典顺序。比如： ps -jax -sort=uid，-ppid，+pid。
--help 显示帮助信息。
--version 显示该命令的版本信息。

详细见man ps，有非常非常的多。





