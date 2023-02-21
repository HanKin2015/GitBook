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
使用 fg %n　关闭。
有两个常用的ftp工具ncftpget和ncftpput，可以实现ftp上传和下载，我们可以利用nohup命令在后台实现文件的上传和下载。

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
使用 fg %n　关闭。

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
jobs是Linux命令。jobs命令显示了当前shell环境中已启动的作业状态。如果JobID参数没有指定特定作业，就显示所有的活动的作业的状态信息。如果报告了一个作业的终止，shell从当前的shell环境已知的列表中删除作业的进程标识。

要显示当前环境下的作业的状态，请输入：jobs -l




