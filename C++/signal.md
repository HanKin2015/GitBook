# wait函数和waitpid函数
wait和waitpid出现的原因
SIGCHLD
--当子进程退出的时候，内核会向父进程发送SIGCHLD信号，子进程的退出是个异步事件（子进程可以在父进程运行的任何时刻终止）
--子进程退出时，内核将子进程置为僵尸状态，这个进程成为僵尸进程，它只保留最小的一些内核数据结构，以便父进程查询子进程的退出状态
--父进程查询子进程的退出状态可以用wait/waitpid函数


进程一旦调用了wait，就立即阻塞自己，由wait自动分析是否当前进程的某个子进程已经 退出，如果让它找到了这样一个已经变成僵尸的子进程，wait就会收集这个子进程的信息，并把它彻底销毁后返回；如果没有找到这样一个子进程，wait就 会一直阻塞在这里，直到有一个出现为止。

参数status用来保存被收集进程退出时的一些状态，它是一个指向int类型的指针。但如果我们对这个子进程是如何死掉的毫不在意，只想把这个僵尸进程消灭掉，（事实上绝大多数情况下，我们都会这样想），我们就可以设定这个参数为NULL，就象下面这样

pid = wait(NULL); 
#include <sys/types.h>   
#include <sys/wait.h>
pid_t wait(int *status)
pid_t waitpid(pid_t pid,int *status,int options)

对线程无效。

# 信号量

SIGINT与SIGTERM区别
1）SIGINT关联ctrl+c
2）SIGINT只能结束前台进程
3）通过ctrl+c对当前进程发送结束信号，信号被进程树接收到（即：不仅当前进程，子进程也会收到结束信号）
SIGTERM与SIGKILL
1）SIGTERM可以被阻塞、处理和忽略；因此有的进程不能按预期的结束
2）kill不使用参数：发送SIGTERM信号，只有当前进程收到信号，若当前进程被kill，则子进程的父进程就会更改为init，即pid为1
3）kill命令的默认不带参数发生的信号就是SIGTERM，让程序友好的退出 ，当程序未退出时，可以使用kill -9强制退出
















