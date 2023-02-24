# strace命令

https://www.cnblogs.com/bangerlee/archive/2012/02/20/2356818.html
oops：int.	(做了令人尴尬的事、说了无理的话或泄露了秘密等时说)哎哟;

## 1、简介
在Linux中，strace就是这样一款工具。通过它，我们可以跟踪程序执行过程中产生的系统调用及接收到的信号，帮助我们分析程序或命令执行中遇到的异常情况。

## 2、栗子
代码见：D:\Github\Storage\linux\strace\strace_example.c

```
[root@ubuntu0006:/media] #strace -o strace_example.strace ./strace_example
[root@ubuntu0006:/media] #./strace_example
[root@ubuntu0006:/media] #cat strace_example.strace
execve("./strace_example", ["./strace_example"], [/* 36 vars */]) = 0
brk(NULL)                               = 0x1f47000
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
access("/etc/ld.so.preload", R_OK)      = -1 ENOENT (No such file or directory)
open("tls/x86_64/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("tls/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("x86_64/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("libc.so.6", O_RDONLY|O_CLOEXEC)   = -1 ENOENT (No such file or directory)
open("libtest/tls/x86_64/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("libtest/tls/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("libtest/x86_64/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("libtest/libc.so.6", O_RDONLY|O_CLOEXEC) = -1 ENOENT (No such file or directory)
open("/etc/ld.so.cache", O_RDONLY|O_CLOEXEC) = 3
fstat(3, {st_mode=S_IFREG|0644, st_size=93546, ...}) = 0
mmap(NULL, 93546, PROT_READ, MAP_PRIVATE, 3, 0) = 0x7f1e95baf000
close(3)                                = 0
access("/etc/ld.so.nohwcap", F_OK)      = -1 ENOENT (No such file or directory)
open("/lib/x86_64-linux-gnu/libc.so.6", O_RDONLY|O_CLOEXEC) = 3
read(3, "\177ELF\2\1\1\3\0\0\0\0\0\0\0\0\3\0>\0\1\0\0\0`\t\2\0\0\0\0\0"..., 832) = 832
fstat(3, {st_mode=S_IFREG|0755, st_size=1868984, ...}) = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1e95bae000
mmap(NULL, 3971488, PROT_READ|PROT_EXEC, MAP_PRIVATE|MAP_DENYWRITE, 3, 0) = 0x7f1e955d7000
mprotect(0x7f1e95797000, 2097152, PROT_NONE) = 0
mmap(0x7f1e95997000, 24576, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_DENYWRITE, 3, 0x1c0000) = 0x7f1e95997000
mmap(0x7f1e9599d000, 14752, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_FIXED|MAP_ANONYMOUS, -1, 0) = 0x7f1e9599d000
close(3)                                = 0
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1e95bad000
mmap(NULL, 4096, PROT_READ|PROT_WRITE, MAP_PRIVATE|MAP_ANONYMOUS, -1, 0) = 0x7f1e95bac000
arch_prctl(ARCH_SET_FS, 0x7f1e95bad700) = 0
mprotect(0x7f1e95997000, 16384, PROT_READ) = 0
mprotect(0x600000, 4096, PROT_READ)     = 0
mprotect(0x7f1e95bc6000, 4096, PROT_READ) = 0
munmap(0x7f1e95baf000, 93546)           = 0
open("/tmp/foo", O_RDONLY)              = -1 ENOENT (No such file or directory)
exit_group(5)                           = ?
+++ exited with 5 +++
[root@ubuntu0006:/media] #
```

## 3、strace常用选项

### 3-1、跟踪子进程
默认情况下，strace只跟踪指定的进程，而不对指定进程中新建的子进程进行跟踪。使用-f选项，可对进程中新建的子进程进行跟踪，并在输出结果中打印相应进程PID。

### 3-2、记录系统调用时间
strace还可以记录程序与系统交互时，各个系统调用发生时的时间信息，有r、t、tt、ttt、T等几个选项，它们记录时间的方式为：

-T:   记录各个系统调用花费的时间，精确到微秒
-r:   以第一个系统调用(通常为execve)计时，精确到微秒
-t:   时：分：秒
-tt:  时：分：秒 . 微秒
-ttt: 计算机纪元以来的秒数 . 微秒

比较常用的为T选项，因为其提供了每个系统调用花费时间。而其他选项的时间记录既包含系统调用时间，又算上用户级代码执行用时，参考意义就小一些。对部分时间选项我们可以组合起来使用。

### 3-3、跟踪正在运行的进程
使用strace对运行中的程序进行跟踪，使用命令“strace -p PID”即可，命令执行之后，被跟踪的进程照常执行，strace的其他选项也适用于运行中的进程跟踪。

## 4、使用strace处理程序挂死
代码见：D:\Github\Storage\linux\strace\strace_deal_with_program_die.c

### 4-1、strace跟踪输出
用户态挂死跟踪输出：
```
[root@ubuntu0006:/media] #gcc strace_deal_with_program_die.c
[root@ubuntu0006:/media] #./a.out
hang (user|system)
[root@ubuntu0006:/media] #strace ./a.out user
.......
mprotect(0x7f95683e5000, 16384, PROT_READ) = 0
mprotect(0x600000, 4096, PROT_READ)     = 0
mprotect(0x7f9568614000, 4096, PROT_READ) = 0
munmap(0x7f95685fd000, 93546)           = 0
getpid()                                = 21790
^C--- SIGINT {si_signo=SIGINT, si_code=SI_KERNEL} ---
strace: Process 21790 detached
```

内核态挂死跟踪输出：
```
[root@ubuntu0006:/media] #strace ./a.out system
......
mprotect(0x7f545f378000, 16384, PROT_READ) = 0
mprotect(0x600000, 4096, PROT_READ)     = 0
mprotect(0x7f545f5a7000, 4096, PROT_READ) = 0
munmap(0x7f545f590000, 93546)           = 0
getpid()                                = 24274
nanosleep({500, 0}, ^Cstrace: Process 24274 detached
 <detached ...>
```

内核态正常等待5秒结束跟踪输出：
```
[root@ubuntu0006:/media] #strace ./a.out system
......
mprotect(0x7fe3f8c05000, 16384, PROT_READ) = 0
mprotect(0x600000, 4096, PROT_READ)     = 0
mprotect(0x7fe3f8e34000, 4096, PROT_READ) = 0
munmap(0x7fe3f8e1d000, 93546)           = 0
getpid()                                = 2309
nanosleep({5, 0}, 0x7ffec9b791b0)       = 0
exit_group(0)                           = ?
+++ exited with 0 +++
```

### 4-2、输出分析
用户态挂死情况下，strace在getpid()一行输出之后没有其他系统调用输出；进程在内核态挂死，最后一行的系统调用nanosleep不能完整显示，这里nanosleep没有返回值表示该调用尚未完成。

因而我们可以得出以下结论：使用strace跟踪挂死程序，如果最后一行系统调用显示完整，程序在逻辑代码处挂死；如果最后一行系统调用显示不完整，程序在该系统调用处挂死。

当程序挂死在系统调用处，我们可以查看相应系统调用的man手册，了解在什么情况下该系统调用会出现挂死情况。另外，系统调用的参数也为我们提供了一些信息，例如挂死在如下系统调用：
```
read(16,
```
那我们可以知道read函数正在对文件描述符为16的文件或socket进行读取，进一步地，我们可以使用lsof工具，获取对应于文件描述符为16的文件名、该文件被哪些进程占用等信息。


