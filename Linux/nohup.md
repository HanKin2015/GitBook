# nohup命令

## 1、简介
nohup 命令运行由 Command参数和任何相关的 Arg参数指定的命令，忽略所有挂断（SIGHUP）信号。在注销后使用 nohup 命令运行后台中的程序。要运行后台中的 nohup 命令，添加 & （ 表示“and”的符号）到命令的尾部。
用途：LINUX命令用法，不挂断地运行命令。

如果不将 nohup 命令的输出重定向，输出将附加到当前目录的 nohup.out 文件中。如果当前目录的 nohup.out 文件不可写，输出重定向到 $HOME/nohup.out 文件中。如果没有文件能创建或打开以用于追加，那么 Command 参数指定的命令不可调用。如果标准错误是一个终端，那么把指定的命令写给标准错误的所有输出作为标准输出重定向到相同的文件描述符。

如果你正在运行一个进程，而且你觉得在退出帐户时该进程还不会结束，那么可以使用nohup命令。该命令可以在你退出帐户/关闭终端之后继续运行相应的进程。nohup就是不挂断的意思( no hang up)。

```
[root@ubuntu0006:/home] #whatis nohup
nohup (1)            - run a command immune to hangups, with output to a non-tty
```

## 2、使用方式
该命令的一般形式为：nohup command &

使用nohup命令提交作业：
如果使用nohup命令提交作业，那么在缺省情况下该作业的所有输出都被重定向到一个名为nohup.out的文件中，除非另外指定了输出文件：
```
nohup command > myout.file 2>&1 &
```
在上面的例子中，0 – stdin (standard input)，1 – stdout (standard output)，2 – stderr (standard error) ；
2>&1是将标准错误（2）重定向到标准输出（&1），标准输出（&1）再被重定向输入到myout.file文件中。
使用 jobs 查看任务。
使用 fg %n关闭。
有两个常用的ftp工具ncftpget和ncftpput，可以实现ftp上传和下载，我们可以利用nohup命令在后台实现文件的上传和下载。

执行nohup命令后，会有一个类似日志文件的东西，会把程序的输出到nohup.out文件中，如：
```
[root@ubuntu0006:~/cmake] #nohup ./a.out -p a b c &
[1] 12524
nohup: 忽略输入并把输出追加到'nohup.out'
[1]+  已完成               nohup ./a.out -p a b c
[root@ubuntu0006:~/cmake] #cat nohup.out
Option -p with value a
Extra argument: b
Extra argument: c
[root@ubuntu0006:~/cmake] #nohup ./a.out -p a b c
nohup: 忽略输入并把输出追加到'nohup.out'
[root@ubuntu0006:~/cmake] #cat nohup.out
Option -p with value a
Extra argument: b
Extra argument: c
Option -p with value a
Extra argument: b
Extra argument: c
```

## 3、运行脚本时nohub和&的区别
https://www.jianshu.com/p/93a45927f013 
https://www.cnblogs.com/laoyeye/p/9346330.html 

在应用Unix/Linux时，我们一般想让某个程序在后台运行，于是我们将常会用 & 在程序结尾来让程序自动运行。
比如我们要运行mysql在后台： /usr/local/mysql/bin/mysqld_safe –user=mysql &

可是有很多程序并不像mysqld一样，这样我们就需要nohup命令，怎样使用nohup命令呢？这里讲解nohup命令的一些用法。
```
nohup ./start.sh &
```
&的意思是在后台运行， 什么意思呢？ 意思是说， 当你在执行 ./start.sh & 的时候， 即使你用ctrl C, 那么start.sh照样运行（因为对SIGINT信号免疫）。 但是要注意， 如果你直接关掉shell后， 那么，start.sh进程同样消失。 可见， &的后台并不硬（因为对SIGHUP信号不免疫）。

nohup的意思是忽略SIGHUP信号， 所以当运行nohup ./start.sh的时候， 关闭shell, 那么start.sh进程还是存在的（对SIGHUP信号免疫）。 但是， 要注意， 如果你直接在shell中用Ctrl C, 那么start.sh进程也是会消失的（因为对SIGINT信号不免疫）

所以， &和nohup没有半毛钱的关系， 要让进程真正不受shell中Ctrl C和shell关闭的影响， 那该怎么办呢？ 那就用nohup ./start.sh &吧， 两全其美。
```
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #nohup ./a.out
nohup: 忽略输入并把输出追加到'nohup.out'
^C
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #nohup ./a.out &
[1] 21125
nohup: 忽略输入并把输出追加到'nohup.out'
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #jobs
[1]+  运行中               nohup ./a.out &
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #fg %1
nohup ./a.out
^C
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #jobs
[root@ubuntu0006:/media/hankin/vdb/TransferStation] #fg
-bash: fg: 当前: 无此任务
```
使用 jobs 查看任务。
使用 fg %n关闭。

## 4、对kill -HUP 234的认识
```
[root@ubuntu0006:/home] #kill -l
 1) SIGHUP       2) SIGINT       3) SIGQUIT      4) SIGILL       5) SIGTRAP
 6) SIGABRT      7) SIGBUS       8) SIGFPE       9) SIGKILL     10) SIGUSR1
11) SIGSEGV     12) SIGUSR2     13) SIGPIPE     14) SIGALRM     15) SIGTERM
16) SIGSTKFLT   17) SIGCHLD     18) SIGCONT     19) SIGSTOP     20) SIGTSTP
21) SIGTTIN     22) SIGTTOU     23) SIGURG      24) SIGXCPU     25) SIGXFSZ
26) SIGVTALRM   27) SIGPROF     28) SIGWINCH    29) SIGIO       30) SIGPWR
31) SIGSYS      34) SIGRTMIN    35) SIGRTMIN+1  36) SIGRTMIN+2  37) SIGRTMIN+3
38) SIGRTMIN+4  39) SIGRTMIN+5  40) SIGRTMIN+6  41) SIGRTMIN+7  42) SIGRTMIN+8
43) SIGRTMIN+9  44) SIGRTMIN+10 45) SIGRTMIN+11 46) SIGRTMIN+12 47) SIGRTMIN+13
48) SIGRTMIN+14 49) SIGRTMIN+15 50) SIGRTMAX-14 51) SIGRTMAX-13 52) SIGRTMAX-12
53) SIGRTMAX-11 54) SIGRTMAX-10 55) SIGRTMAX-9  56) SIGRTMAX-8  57) SIGRTMAX-7
58) SIGRTMAX-6  59) SIGRTMAX-5  60) SIGRTMAX-4  61) SIGRTMAX-3  62) SIGRTMAX-2
63) SIGRTMAX-1  64) SIGRTMAX
```
发现HUP其实是SIGHUP的缩写。
```
[root@ubuntu0006:/home] #kill -ILL 123
-bash: kill: (123) - 没有那个进程
[root@ubuntu0006:/home] #kill -HUP 123
-bash: kill: (123) - 没有那个进程
[root@ubuntu0006:/home] #kill -EHUP 123
-bash: kill: EHUP: 无效的信号声明
[root@ubuntu0006:/home] #kill -UP 123
-bash: kill: UP: 无效的信号声明
[root@ubuntu0006:/home] #kill -SIGHUP 123
-bash: kill: (123) - 没有那个进程
```

## 5、jobs命令

### 5-1、简介
jobs 命令用于列出当前在后台运行的作业。在 Linux 或 Unix 系统中，作业是指在 shell 中启动的进程。当一个进程在后台运行时，它不会占用 shell 的控制台，而是在后台运行。使用 jobs 命令可以查看当前在后台运行的作业的状态和编号，以及它们是否已经完成或停止。以下是一些常用的 jobs 命令选项：
```
jobs -l：显示作业的 PID（进程 ID）和状态。
jobs -n：只显示最近启动的作业。
jobs -p：只显示作业的 PID。
jobs -r：只显示正在运行的作业。
jobs -s：只显示已经停止的作业。
```
要将一个后台作业切换到前台运行，可以使用 fg 命令，后跟作业编号或作业 PID。例如，fg %1 将作业编号为 1 的作业切换到前台运行。

### 5-2、要停止jobs命令中的作业
可以使用以下步骤：
首先，使用jobs命令查看当前正在运行的作业的列表，找到要停止的作业的作业号。
然后，使用kill命令加上作业号来停止该作业。例如，如果要停止作业号为1的作业，可以使用以下命令：
```
kill %1
```
这将向作业号为1的作业发送一个终止信号，使其停止运行。
如果作业无法正常停止，可以使用kill -9命令强制终止该作业。例如，如果要强制终止作业号为1的作业，可以使用以下命令：
```
kill -9 %1
```
这将向作业号为1的作业发送一个强制终止信号，使其立即停止运行。

## 6、发现nohup命令启动的进程会被init进程接管
init 进程是 Unix 和类 Unix 系统中的第一个用户级进程，它是所有其他进程的祖先进程。在启动操作系统时，内核会首先启动 init 进程，然后 init 进程负责启动系统中的其他进程，并在这些进程终止时对它们进行清理。

在传统的 SysV init 系统中，init 进程的进程号通常为 1。init 进程负责读取系统的初始化文件（如 /etc/inittab），并根据其中的配置启动系统中的各种服务和进程。在现代的 Linux 系统中，init 进程通常被替代为 systemd 或其他类似的初始化系统，但概念上仍然存在一个类似 init 的进程作为所有进程的祖先。
```
[root@ubuntu0006:~/cmake] #nohup ./a.out &
[1] 15633
nohup: 忽略输入并把输出追加到'nohup.out'
[root@ubuntu0006:~] #ps -ef | grep a.out
root     15633 16406 99 09:11 ?        00:00:26 ./a.out
root     16504 16406  0 09:12 pts/0    00:00:00 grep --color=auto a.out
[root@ubuntu0006:~] #ps aux | grep 16406
root     16406  0.0  0.0  25772  5500 pts/0    Ss   09:12   0:00 -bash
root     17978  0.0  0.0  17088   988 pts/0    S+   09:12   0:00 grep --color=auto 16406
[root@ubuntu0006:~] #ps -ef | grep 16406
root     16406 16346  0 09:12 pts/0    00:00:00 -bash
root     18161 16406  0 09:13 pts/0    00:00:00 ps -ef
root     18162 16406  0 09:13 pts/0    00:00:00 grep --color=auto 16406
[root@ubuntu0006:~] #ps -ef | grep 16346
root     16346  6371  0 09:12 ?        00:00:00 sshd: root@pts/0
root     16406 16346  0 09:12 pts/0    00:00:00 -bash
root     16440 16346  0 09:12 ?        00:00:00 bash -c while [ -d /proc/$PPID ]; do sleep 1;head -v -n 8 /proc/meminfo; head -v -n 2 /proc/stat /proc/version /proc/uptime /proc/loadavg /proc/sys/fs/file-nr /proc/sys/kernel/hostname; tail -v -n 16 /proc/net/dev;echo '==> /proc/df <==';df;echo '==> /proc/who <==';who;echo '==> /proc/end <==';echo '##Moba##'; done
root     18895 16406  0 09:13 pts/0    00:00:00 grep --color=auto 16346
[root@ubuntu0006:~] #ps -ef | grep 6371
root      6371     1  0 2月27 ?       00:00:00 /usr/sbin/sshd -D
root     16346  6371  0 09:12 ?        00:00:00 sshd: root@pts/0
root     16374  6371  0 09:12 ?        00:00:00 sshd: root@notty
root     19098 16406  0 09:13 pts/0    00:00:00 grep --color=auto 6371


关闭shell终端再重新打开后查看：
[root@ubuntu0006:~] #ps -ef | grep a.out
root     15633     1 99 09:11 ?        00:00:26 ./a.out
root     16504 16406  0 09:12 pts/0    00:00:00 grep --color=auto a.out
```

nohup 命令启动的进程在某些情况下会被托管给父进程为 1（init 进程）。这通常发生在以下情况下：

当使用 nohup 启动的进程的父进程退出时，这个进程会被 init 进程接管。
在某些系统中，当使用 nohup 启动的进程在后台运行时，会被重新分配给 init 进程。
因此，你的实际观察结果是正确的，nohup 命令拉起的进程在某些情况下最终会托管给父进程为 1。

## 7、nohup和&的区别
使用nohup命令：
```
[root@ubuntu0006:~] #ps -ef | grep a.out
root     22964 22375  0 09:16 pts/0    00:00:00 grep --color=auto a.out
[root@ubuntu0006:~] #cd cmake/
[root@ubuntu0006:~/cmake] #nohup ./a.out
nohup: 忽略输入并把输出追加到'nohup.out'


此时我关闭shell终端，然后再重新打开终端查看就会出现一个a.out进程在运行
[root@ubuntu0006:~] #ps -ef | grep a.out
root     23228     1 99 09:16 ?        00:00:42 ./a.out
root     24451 24207  0 09:16 pts/0    00:00:00 grep --color=auto a.out
```

使用&命令：
```
[root@ubuntu0006:~/cmake] #ps -ef | grep a.out
root     26604 24207  0 09:18 pts/0    00:00:00 grep --color=auto a.out
[root@ubuntu0006:~/cmake] #./a.out &
[1] 26684
目录存在
目录存在
目录存在
19
8
[root@ubuntu0006:~/cmake] #ps -ef | grep a.out
root     26684 24207 90 09:18 pts/0    00:00:05 ./a.out
root     26888 24207  0 09:18 pts/0    00:00:00 grep --color=auto a.out


此时我关闭shell终端，然后再重新打开终端查看就不会有a.out进程运行
[root@ubuntu0006:~] #ps -ef | grep a.out
root     27676 27535  0 09:18 pts/0    00:00:00 grep --color=auto a.out
```