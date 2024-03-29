# 信号和信号量

## 1、wait函数和waitpid函数
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

## 2、SIGINT与SIGTERM区别
1）SIGINT关联ctrl+c
2）SIGINT只能结束前台进程
3）通过ctrl+c对当前进程发送结束信号，信号被进程树接收到（即：不仅当前进程，子进程也会收到结束信号）
SIGTERM与SIGKILL
1）SIGTERM可以被阻塞、处理和忽略；因此有的进程不能按预期的结束
2）kill不使用参数：发送SIGTERM信号，只有当前进程收到信号，若当前进程被kill，则子进程的父进程就会更改为init，即pid为1
3）kill命令的默认不带参数发生的信号就是SIGTERM，让程序友好的退出 ，当程序未退出时，可以使用kill -9强制退出


SIGCHLD 子进程状态发生变化产生该信号（子进程运行结束）父进程调用wait函数，回收子进程的进程表项，task_struct结构体。有了这个信号父进程不需要处于阻塞状态，任然可以干其他事情，当子进程结束时发送一个SIGCHLD信号给父进程，父进程调用wait回收子进程，避免僵尸进程的产生，提高了资源利用率。

SIGCHLD，在一个进程终止或者停止时，将SIGCHLD信号发送给其父进程，按系统默认将忽略此信号，如果[父进程](https://baike.baidu.com/item/父进程/614062)希望被告知其子系统的这种状态，则应捕捉此信号。


### SIGINT、SIGQUIT、 SIGTERM、SIGSTOP区别
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


## 3、信号和信号量区别
信号头文件：<signal.h>
信号量头文件：<sys/sem.h>

1.信号：（signal）是一种处理异步事件的方式。信号是比较复杂的通信方式，用于通知接受进程有某种事件发生，除了用于进程外，还可以发送信号给进程本身。
2.信号量：（Semaphore）进程间通信处理同步互斥的机制。是在多线程环境下使用的一种设施, 它负责协调各个线程, 以保证它们能够正确、合理的使用公共资源。
简单地说，信号就是一种异步通信，通知进程某种事件的发生；信号量是进程/线程同步与互斥的一种机制，保证进程/线程间之间的有序执行或对公共资源的有序访问。


## 4、信号量和互斥锁的区别
信号量（semaphore[ˈseməfɔ:(r)]）用在多线程多任务同步的，一个线程完成了某一个动作就通过信号量告诉别的线程，别的线程再进行某些动作。而互斥锁（Mutual exclusion，缩写 Mutex）是用在多线程多任务互斥的，一个线程占用了某一个资源，那么别的线程就无法访问，直到这个线程unlock，其他的线程才开始可以利用这个资源。比如对全局变量的访问，有时要加锁，操作完了，在解锁。尽管两个概念有点类似，但是他们的侧重点不一样，信号量不一定是锁定某一个资源，而是流程上的概念，比如：有A，B两个线程，B线程要等A线程完成某一任务以后再进行自己下面的步骤，这个任务并不一定是锁定某一资源，还可以是进行一些计算或者数据处理之类。而线程互斥量则是“锁住某一资源”的概念，在锁定期间内，其他线程无法对被保护的数据进行操作。不难看出，mutex是semaphore的一种特殊情况（n=1时）。也就是说，完全可以用后者替代前者。

简而言之，锁是服务于共享资源的；而semaphore是服务于多个线程间的执行的逻辑顺序的。

## 5、互斥量和信号量的区别

互斥量基本上就是互斥锁的意思。

1. 互斥量用于线程的互斥，信号量用于线程的同步。

这是互斥量和信号量的根本区别，也就是互斥和同步之间的区别。

互斥：是指某一资源同时只允许一个访问者对其进行访问，具有唯一性和排它性。但互斥无法限制访问者对资源的访问顺序，即访问是无序的。

同步：是指在互斥的基础上（大多数情况），通过其它机制实现访问者对资源的有序访问。在大多数情况下，同步已经实现了互斥，特别是所有写入资源的情况必定是互斥的。少数情况是指可以允许多个访问者同时访问资源

以上区别是主要想记住的。

note:信号量可以用来实现互斥量的功能

2. 互斥量值只能为0/1，信号量值可以为非负整数。

也就是说，一个互斥量只能用于一个资源的互斥访问，它不能实现多个资源的多线程互斥问题。信号量可以实现多个同类资源的多线程互斥和同步。当信号量为单值信号量是，也可以完成一个资源的互斥访问。

3. 互斥量的加锁和解锁必须由同一线程分别对应使用，信号量可以由一个线程释放，另一个线程得到。

## 4、信号
signal.h 头文件定义了一个变量类型 sig_atomic_t、两个函数调用和一些宏来处理程序执行期间报告的不同信号。

sig_atomic_t：这是 int 类型，在信号处理程序中作为变量使用。它是一个对象的整数类型，该对象可以作为一个原子实体访问，即使存在异步信号时，该对象可以作为一个原子实体访问。

## 5、信号量Semaphore
信号量是一种特殊的变量，访问具有原子性。
只允许对它进行两个操作：
1)等待信号量
当信号量值为0时，程序等待；当信号量值大于0时，信号量减1，程序继续运行。
2)发送信号量
将信号量值加1。

我们使用信号量，来解决进程或线程间共享资源引发的同步问题。


### 5-1、原子性
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

### 5-3、信号量API
1)semget函数：新建信号量

int semget(key_t key,int num_sems,int sem_flags);

key:信号量键值，可以理解为信号量的唯一性标记。
num_sems:信号量的数目，一般为1
sem_flags:有两个值，IPC_CREAT和IPC_EXCL，
IPC_CREAT表示若信号量已存在，返回该信号量标识符。
IPC_EXCL表示若信号量已存在，返回错误。

返回值：相应的信号量标识符，失败返回-1

2)semop函数：修改信号量的值

int semop(int sem_id,struct sembuf *sem_opa,size_t num_sem_ops);

sem_id:信号量标识符
sem_opa:结构如下

```
struct sembuf{  
    short sem_num;//除非使用一组信号量，否则它为0  
    short sem_op;//信号量在一次操作中需要改变的数据，通常是两个数，一个是-1，即P（等待）操作，  
                    //一个是+1，即V（发送信号）操作。  
    short sem_flg;//通常为SEM_UNDO,使操作系统跟踪信号，  
                    //并在进程没有释放该信号量而终止时，操作系统释放信号量  
}; 
```

3)semctl函数：用于信号量的初始化和删除

int semctl(int sem_id,int sem_num,int command,[union semun sem_union]);

command:有两个值SETVAL,IPC_RMID，分别表示初始化和删除信号量。
sem_union:可选参数，结构如下：
```
union semun{  
    int val; 
    struct semid_ds *buf;  
    unsigned short *arry;  
}; 
```
一般用到的是val,表示要传给信号量的初始值。

参考：https://www.cnblogs.com/shijingjing07/p/5615084.html

## 6、实例分析信号量和PV操作之间的处理过程
PV操作由P操作原语和V操作原语组成（原语是不可中断的过程），针对信号量进行相应的操作。

实例：现在有三个进程分别是A,B,C，它们三者都是需要信号量S的临界资源，而信号量的初值为1（所以，当它们三者进行申请资源的时候，也就只会让一个进程得到资源进行执行）
第一步：很幸运，A首先进入临界资源中，那么它就需要执行P操作之后，所以，此时信号量就变成S = 0；
第二步：而后B也进入临界资源，但是A还没有将资源释放，B执行了P操作进行申请资源，所以，此时信号量就变成S = -1；
第三步：同理，而后C也进入临界资源，但是A还没有将资源释放，C执行了P操作进行申请资源，所以，此时信号量就变成S = -2；
（通过前面三步，这时候的情况就是，A在正常执行，但是还没执行完成并没有释放资源，而B和C都是出于阻塞队列，因为没有足够的资源呀，所以，这里是不是很好理解呢？那么，很好，我们继续！）
第四步：哇塞，A终于执行完成了，那么由于PV操作必须是成对出现的，所以，A肯定是要执行V操作的，所以此时，A将资源释放出来，那么信号量就变成了 S = -1 （因为第三步的时候S=-2，而执行V操作就是相当于释放一个资源，所以这里就变成-1，这个理解不难吧）
第五步：因为A执行了V操作，那么就会唤醒阻塞队列中第一个进行等待的进程，那么从前面可以得到，是B先等待的，所以自然而然的就将B进行唤醒，所以，这时候，B就开始进入临界区进行相应的执行处理；（我觉得，有可能有朋友会问，那现在B进行临界区操作了，那么不应该要先执行P操作获取资源才可以吗？大家，请注意一下，并不是的，因为B我们知道，它其实是从阻塞队列中被唤醒出来的，而它之所以进入到阻塞队列，就是因为之前执行了P操作，导致那时候没有足够的信号量让其能够进行执行，所以，现在只是相当于唤醒操作，就不需要再一次进行P操作，就类似我们进程中的从就绪状态变成执行状态了。因为A执行了V操作，B就从阻塞到就绪，当有资源的时候，那么B自然就可以进入到运行状态了，这样理解是不是就比较好了呢？---注意：这是打个比方来帮助大家理解）
第六步：B执行完成之后，同样，再进行V操作，所以，此时，信号量 S = 0
第七步：由于B执行了V操作，那么唤醒了阻塞队列中的第一个等待进程，即是C，所以这时候，C就获得了临界区的资源，那么就可以开始执行了；
第八步：C执行完成之后，同样，再进行V操作，所以，此时，信号量 S = 1
第九步：三个进程都执行完成了，并且阻塞队列也没有等待进程，这样是不是就实现了进程之间的通信呢？并且，有没有发现，从开始到结束的时候，信号量的值是没有改变的，都是S = 1。这样，是不是就很好理解了？有说到的内容，信号量的值其实是不会发生改变的。。到这里，基本上，进程的通信就可以完成了，PV操作也都结束了。
我想，有可能有些朋友会问，如果现在又有进程D到来了并且它也是需要ABC一样的临界资源，此时又是如何的呢?
第十步：很简单，因为这时候S = 1 ，而 S > 0，那么这时候D来了的话，就可以直接执行啦，即执行P操作，这样 S = 0，然后D执行它需要的操作，执行完成之后再进行V操作，即释放资源，这时候 S = 1，所以，又回来这样的情况啦。
第十一步：针对第十步的情况，如果此时，又有一个进程E来了（哇塞，这么多，很可恶~~），又会发生什么呢？其实，只要我们明白了工作原理，很容易就理解的了，那么由于这时候 S = 0 ，无法让E继续执行，所以E先执行P操作，S = -1，然后就被放入到阻塞队列去了，而当D使用资源之执行完成之后，由于D执行了V操作，所以S = 0 ，这时候唤醒等待队列的第一个，所以E就获得了执行的机会，那么E就开始执行，执行完成之后进行V操作，所以，S = 1 ,很明显，又是到最初的状态啦。

## 7、经典的问题
（1）生产者和消费者

（2）读者和写者

（3）哲学家进餐

（4）睡着的理发师

（5）食堂就餐座位问题
描述：现在有一个食堂，里面有50个座位，然后下课了，学生要进行食堂就餐，而只有当有学生就餐吃完之后，就让开座位，那么其他的同学才可以进行就坐。所以，利用PV操作来实现这样的一种处理。

（6）食堂阿姨和学生的“融洽关系”
描述：食堂一个阿姨负责帮学生打饭，而学生不能自己主动打饭，只能等待阿姨给打饭之后才能拿饭走，而阿姨在打饭时间是不能够进行吃饭，而只负责给学生打饭。















