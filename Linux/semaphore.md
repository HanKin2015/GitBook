[TOC]
# 信号量Semaphore

## 1、原子性
指事务的不可分割性，一个事务的所有操作要么不间断地全部被执行，要么一个也没有执行。






信号变量


SIGTERM是不带参数时kill发送的信号，意思是要进程终止运行，但执行与否还得看进程是否支持。但是SIGKILL信号不同，它可以被捕获和解释（或忽略）的过程。
SIGKILL是发送到处理的信号以使其立即终止。当发送到程序，SIGKILL使其立即终止。在对比SIGTERM和SIGINT，这个信号不能被捕获或忽略，并且在接收过程中不能执行任何清理在接收到该信号。
SIGINT中断信号，终端在用户按下CTRL+C发送到前台进程。默认行为是终止进程，但它可以捕获或忽略。
SIGQUIT是其控制终端发送到进程，当用户请求的过程中执行核心转储的信号。 SIGQUIT通常可以ctrl+/。它可以被捕获和解释（或忽略）。

```
system('kill -9 '.$pid);
```

posix_kill（进程号，信号常量）：表示强制退出

注：当进程号为0时，表示所有进程

# 1、SIGCHLD

SIGCHLD 子进程状态发生变化产生该信号（子进程运行结束）父进程调用wait函数，回收子进程的进程表项，task_struct结构体。有了这个信号父进程不需要处于阻塞状态，任然可以干其他事情，当子进程结束时发送一个SIGCHLD信号给父进程，父进程调用wait回收子进程，避免僵尸进程的产生，提高了资源利用率。



SIGCHLD，在一个进程终止或者停止时，将SIGCHLD信号发送给其父进程，按系统默认将忽略此信号，如果[父进程](https://baike.baidu.com/item/父进程/614062)希望被告知其子系统的这种状态，则应捕捉此信号。

# 2、SIGTERM


## SIGINT、SIGQUIT、 SIGTERM、SIGSTOP区别

SIGINT SIGTERM：前两者可以被捕获、处理，所以不一定会使程序退出
SIGKILL：后者不能被捕获，一定会使程序退出

2) SIGINT
程序终止(interrupt)信号, 在用户键入INTR字符(通常是Ctrl-C)时发出，用于通知前台进程组终止进程。


3) SIGQUIT
和SIGINT类似, 但由QUIT字符(通常是Ctrl-\)来控制. 进程在因收到SIGQUIT退出时会产生core文件, 在这个意义上类似于一个程序错误信号。


15) SIGTERM
程序结束(terminate)信号, 与SIGKILL不同的是该信号可以被阻塞和处理。通常用来要求程序自己正常退出，shell命令kill缺省产生这个信号。如果进程终止不了，我们才会尝试SIGKILL。


19) SIGSTOP
停止(stopped)进程的执行. 注意它和terminate以及interrupt的区别:该进程还未结束, 只是暂停执行. 本信号不能被阻塞, 处理或忽略.









