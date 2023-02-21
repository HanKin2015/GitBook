# Linux查看程序卡死位置方法|GDB|strace
https://blog.csdn.net/bandaoyu/article/details/114303378

ps auxf
strace -p [进程id]

进程的所有信息路径：/proc/

## ltrace和strace对比分析
strace一共消耗了0.19秒,strace把性能提升了30倍,这主要是strace在跟踪系统调用的时候不需要动态库,而ltrace是根据动态库来分析程序运行的.
所以ltrace也只能跟踪动态库,不能跟踪静态库.
事实上我们用ltrace和strace都可以发现程序在哪个系统调用时发生了性能瓶径.
ltrace用-T,而strace也用-T.
 
 
三)ltrace与strace的相同点
 
ltrace与strace都可以指定PID,即对运行中的程序进行跟踪.
ltrace -p PID与strace -p PID
 
ltrace与strace都可以跟踪程序fork或clone子进程.
ltrace是用-f参数,而strace是用-f(fork/clone)和-F(vfork).
https://www.cnblogs.com/machangwei-8/p/10388938.html




