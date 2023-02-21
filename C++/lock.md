# 锁

源代码：https://github.com/HanKin2015/Storage/tree/master/linux/lock

## 1、Linux进程间互斥锁（共享内存实现）

### 1-1、进程间的互斥锁和线程间互斥锁的区别
函数pthread_mutex_init(互斥锁地址， 属性对象地址)在定义一把线程锁的时候第二个参数通常传为NULL，这样该锁默认只能被统一进程下的线程持有。
如果要将其定义为进程之间可以持有的互斥锁，则需要传入属性对象地址。

```
// 锁
pthread_mutex_t lock;
// 状态对象
pthread_mutexattr_t lock_attr;

// 初始化锁状态，设置状态状态为——进程共享
pthread_mutexattr_init(&lock_attr);
pthread_mutexattr_setpshared(&lock_attr, PTHREAD_PROCESS_SHARED);
// 用锁状态来初始化锁
pthread_mutex_init(&lock, &lock_attr);

// 使用时不牵扯状态对象，但状态对象在锁销毁时也要销毁
pthread_mutex_lock(&lock);
pthread_mutex_unlock(&lock);

// 销毁锁和锁状态
pthread_mutex_destroy(&lock);
pthread_mutexattr_destroy(&lock_attr);
```

### 1-2、示例
参考：
https://blog.csdn.net/qq_35396127/article/details/78942245
https://blog.csdn.net/weixin_44344462/article/details/97180648

父进程每次将共享内存上的变量加1，子进程每次将其加2。
代码见：D:\Github\Storage\c++\standard_library\lock\lock_example.cpp

### 1-3、加锁和不加锁的对比
#### mmap （一种内存映射文件的方法）
mmap将一个文件或者其它对象映射进内存。文件被映射到多个页上，如果文件的大小不是所有页的大小之和，最后一个页不被使用的空间将会清零。mmap在用户空间映射调用系统中作用很大。
头文件 <sys/mman.h>
函数原型
void* mmap(void* start,size_t length,int prot,int flags,int fd,off_t offset);
int munmap(void* start,size_t length);

#### 不加锁现象
```
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   168073
----parent--finally------share_var =   169446
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   176043
----child---finally------share_var =   185715
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   200000
----child---finally------share_var =   300000
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   125893
----parent--finally------share_var =   135235
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   153174
----child---finally------share_var =   155752
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   248540
----child---finally------share_var =   253868
```

#### 加锁现象
```
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   288553
----child---finally------share_var =   300000
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   206120
----parent--finally------share_var =   300000
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   287948
----parent--finally------share_var =   300000
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   295982
----child---finally------share_var =   300000
root@debian-hankin:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   299717
----child---finally------share_var =   300000
```

### 编译报错：undefined reference to `pthread_mutexattr_destroy'
-lpthread -ldl
编译命令：g++ test.cpp -lpthread -ldl


## 2、文件的读写锁
参考：https://www.jianshu.com/p/a62bd5ae5d8c

失败了，怎么也锁不住，获取状态永远是解锁状态。

lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。
pause（）使调用进程（或线程）进入休眠状态，直到传递的信号终止进程或导致调用信号捕获函数。

瑞思拜是一个网络流行词，是英语respect的音译，是尊重的意思。该词在在说唱歌手中广泛流行。渐成为了饭圈词汇。

用于Linux进程通信(IPC)共享内存。共享内存函数由shmget、shmat、shmdt、shmctl四个函数组成。

## 3、自旋锁
何谓自旋锁？它是为实现保护共享资源而提出一种锁机制。其实，自旋锁与互斥锁比较类似，它们都是为了解决对某项资源的互斥使用。无论是互斥锁，还是自旋锁，在任何时刻，最多只能有一个保持者，也就说，在任何时刻最多只能有一个执行单元获得锁。但是两者在调度机制上略有不同。对于互斥锁，如果资源已经被占用，资源申请者只能进入睡眠状态。但是自旋锁不会引起调用者睡眠，如果自旋锁已经被别的执行单元保持，调用者就一直循环在那里看是否该自旋锁的保持者已经释放了锁，"自旋"一词就是因此而得名。

不需要被唤醒。

## 4、银行家算法

### 4-1、算法介绍
银行家算法（Banker’s Algorithm）是一个避免死锁（Deadlock）的著名算法，是由艾兹格·迪杰斯特拉在1965年为T.H.E系统设计的一种避免死锁产生的算法。它以银行借贷系统的分配策略为基础，判断并保证系统的安全运行。

​多个进程动态地共享系统的资源可能会产生死锁现象。死锁的产生，必须同时满足四个条件，第一个是互斥条件，即一个资源每次只能由一个进程占用；第二个为请求和保持条件，即一个进程请求资源不能满足时，它必须等待，但它仍继续保持已得到的所有其它资源；第三个是不剥夺条件，任何一个进程不能抢占另一个进程已经获得且未释放的资源；第四个为循环等待条件，系统中存在若干个循环等待的进程，即其中每一个进程分别等待它前一个进程所持有的资源，防止死锁的机构只须确保上述四个条件之一不出现，则系统就不会发生死锁。在实验中假定系统中任一资源在每一时刻只能由一个进程使用，任何进程不能抢占其它进程正在使用的资源，当进程得不到资源时必须等待。因此只要资源分配策略能保证进程不出现循环等待，则系统就不会发生死锁。

### 4-2、算法背景简介
​在银行中，客户申请贷款的数量是有限的，每个客户在第一次申请贷款时要声明完成该项目所需的最大资金量，在满足所有贷款要求时，客户应及时归还。银行家在客户申请的贷款数量不超过自己拥有的最大值时，都应尽量满足客户的需要。在这样的描述中，银行家就好比操作系统，资金就是资源，客户就相当于要申请资源的进程。

​银行家算法是一种最有代表性的避免死锁的算法。在避免死锁方法中允许进程动态地申请资源，但系统在进行资源分配之前，应先计算此次分配资源的安全性，若分配不会导致系统进入不安全状态，则分配，否则等待。为实现银行家算法，系统必须设置若干数据结构。

​要解释银行家算法，必须先解释操作系统安全状态和不安全状态。

​安全序列是指一个进程序列{P1，…，Pn}是安全的，即对于每一个进程Pi(1≤i≤n），它以后尚需要的资源量不超过系统当前剩余资源量与所有进程Pj (j < i )当前占有资源量之和。

### 4-3、测试数据
假定系统中有4个进程{P0、P1、P2、P3}和4种类型资源{A、B、C、D}，T0时刻各进程已分配的资源数和最大需求数、资源可用数目如下所示:
    Allocstion   Max     Available
    A B C D    A B C D   A B C D
P0  0 0 1 2    0 0 1 2
P1  1 0 0 0    1 7 5 0   1 5 2 0
P2  1 3 5 4    2 3 5 6
P3  0 0 1 4    0 6 5 6

使用银行家算法回答如下问题(60分) :
(1)求Need矩阵:
(2) TO时刻是否处于安全状态?若安全，请给出一 个安全序列。
(3) 若从进程P1发来个请求(0,4,2,0)， 这个请求能否立刻被满足?
如安全，请给出一个安全序列。
CSDN @Carmelo 7









