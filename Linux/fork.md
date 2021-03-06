# fork函数

本词条由[“科普中国”科学百科词条编写与应用工作项目](https://baike.baidu.com/science) 审核 。

**复刻**（英语：fork，又译作**派生**、**分支**）是UNIX或类UNIX中的分叉函数，fork函数将运行着的程序分成2个（几乎）完全一样的进程，每个进程都启动一个从代码的同一位置开始执行的线程。这两个进程中的线程继续执行，就像是两个用户同时启动了该应用程序的两个副本。

从一个[软件包](https://baike.baidu.com/item/软件包)拷贝了一份[源代码](https://baike.baidu.com/item/源代码)然后在其上进行独立的开发，创建不同的软件。这个术语不只意味着版本控制上的[分支](https://baike.baidu.com/item/分支)，同时也意味着开发者社区的分割，是一种形式的[分裂](https://baike.baidu.com/item/分裂)。

自由及开放源代码软件可以从原有开发团队复刻而不需要事先的许可，这也不会违反任何[著作权](https://baike.baidu.com/item/著作权)法律。授权的专有软件（例如[Unix](https://baike.baidu.com/item/Unix)）的复刻也时有发生。



ork系统调用用于创建一个新进程，称为**子进程**，它与进程（称为系统调用fork的进程）同时运行，此进程称为**父进程**。创建新的子进程后，两个进程将执行fork()系统调用之后的下一条指令。子进程使用相同的pc（程序计数器），相同的CPU寄存器，在父进程中使用的相同打开文件。

它不需要参数并返回一个整数值。下面是fork()返回的不同值。

**负值**：创建子进程失败。
　　**零**：返回到新创建的子进程。
　　**正值**：返回父母或来电者。该值包含新创建的子进程的进程ID。



fork函数一定返回两个值，fork函数的返回值实际只有一个值，看似两个值是因为在不同的进程中返回。

进程的定义：

进程是一个执行中的程序的实例，是系统进行资源分配和调度的一个独立单位。

PCB是进程存在的唯一标识。PCB应常驻内存，不管在linux还是windows中都有专门区域存储每个进程的PCB。

进程的创建：

子进程可以继承父进程所拥有的所有资源，当子进程被撤销时，应将其从父进程那里获得的所有资源归还给父进程，在撤销父进时，也必须同时撤销其所有子进程。
