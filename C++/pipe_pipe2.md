# Linux进程通信 - 无名管道与有名管道

https://www.cnblogs.com/fortunely/p/14648146.html
无名管道（PIPE）和有名管道（FIFO）都是UNIX进程间通信（InterProcess Communication，简称IPC）的手段。

## 1、无名管道PIPE

### 1-1、简介
pipe函数可用于创建一个管道，以实现进程间的通信。
```
NAME
       pipe, pipe2 - create pipe

SYNOPSIS
       #include <unistd.h>

       int pipe(int pipefd[2]);

       #define _GNU_SOURCE             /* See feature_test_macros(7) */
       #include <fcntl.h>              /* Obtain O_* constant definitions */
       #include <unistd.h>

       int pipe2(int pipefd[2], int flags);
```

通过pipe函数创建的这两个文件描述符 fd[0] 和 fd[1] 分别构成管道的两端，往 fd[1] 写入的数据可以从 fd[0] 读出。并且 fd[1] 一端只能进行写操作，fd[0] 一端只能进行读操作，不能反过来使用。要实现双向数据传输，可以使用两个管道。
管道两端可分别用描述字fd[0]以及fd[1]来描述，需要注意的是，管道的两端是固定了任务的。即一端只能用于读，由描述字fd[0]表示，称其为管道读端；另一端则只能用于写，由描述字fd[1]来表示，称其为管道写端。

### 1-2、管道特点
管道是半双工的，数据只能向一个方向流动；需要双方通信时，需要建立起两个管道； 只能用于父子进程或者兄弟进程之间（具有亲缘关系的进程）； 单独构成一种独立的文件系统：管道对于管道两端的进程而言，就是一个文件，但它不是普通的文件，它不属于某种文件系统，而是自立门户，单独构成一种文件系统，并且只存在于内存中。数据的读出和写入：一个进程向管道中写的内容被管道另一端的进程读出。写入的内容每次都添加在管道缓冲区的末尾，并且每次都是从缓冲区的头部读出数据。

管道通常指无名管道，是IPC最古老的形式。管道有何特点？
- 半双工通信，具有固定的读端、写端（单向传输数据）；
- 管道只能在具有公共祖先的2个进程间使用，通常是父子进程；

同一个进程使用管道没有意义，因为管道专门用于进程间通信。进程内的通信使用全局变量即可。要实现父子进程的通信，创建管道后，需要关闭一个读端，一个写端。比如一个从父进程到子进程的管道，父进程关闭fd[0]，子进程关闭fd[1]。

### 1-3、管道的创建
int pipe(int fd[2])
该函数创建的管道的两端处于一个中间进程，在实际应用中并没有太大意义，一般在pipe()创建管道后，再fork()一个子进程，然后通过管道实现父子进程之间的通信。

管道由pipe函数创建，见pipe(2) — Linux manual page
```
#include <unistd.h>
/* fd返回2个文件描述符：fd[0]为读而打开；fd[1]为写而打开。fd[1]的输出是fd[0]的输入 */
int pipe(int fd[2]);

/* 提供位元选项可设置。flags=0时，pipe2同pipe。
 * 常用选项：O_NONBLOCK，linux特有的。
 */
int pipe2(int fd[2], int flags);
```

通过fd[0]调用read()读取数据的一端，叫读端；通过fd[1]调用write()写数据的一端进程，叫写端。

通常的创建模型：
```
int pipefd[2];
ret = pipe(pipefd);
fork();
```

### 1-4、管道的状态
管道用于进程间通信，也可以用于同一个进程多线程通信。
1）多进程：要实现父子进程的通信，创建管道后，需要关闭一个读端，一个写端。比如一个从父进程到子进程的管道，父进程关闭fd[0]，子进程关闭fd[1]。
2）多线程：同一进程内的通信，使用全局变量即可。原理同多进程场景，需要设置一个读端、一个写端。

单进程半双工管道（无意义状态）
![](https://img2020.cnblogs.com/blog/741401/202104/741401-20210412135408909-1929001474.png)
fork子进程后的半双工管道（创建后的初始状态）
![](https://img2020.cnblogs.com/blog/741401/202104/741401-20210412135503106-2047238477.png)
父进程到子进程的管道（理想状态）
![](https://img2020.cnblogs.com/blog/741401/202104/741401-20210412135539153-1751194645.png)

思考：为啥需要关闭通道呢？？？答案见管道的使用规则。

### 1-5、管道的使用规则
当管道的一端被关闭后，下面的规则起作用：
- 读端和写端都可以对应多个进程，但通常一个管道只有一个读进程和一个写进程；
- 当读一个写端已关闭的管道时，在所有数据都被读取后，read返回0，表示文件结束（只要还有一个写端还有进程，就不会产生文件的结束）；
- 如果写一个读端已关闭的管道，会产生信号SIGPIPE。如果忽略该信号，或者捕捉该信号从并从其处理程序返回，则write返回-1，errnor=EPIPE。

### 1-6、查看打开的管道文件
管道是文件的一种，/proc/PID/fd（这里PID是打开管道的进程id）下可以查看进程打开的管道文件：
```
[root@ubuntu0006:/media/hankin/vdb] #ps aux | grep a.out
root     13997  0.0  0.0   4348   720 pts/4    S+   17:01   0:00 ./a.out
root     15379  0.0  0.0  17088  1088 pts/7    S+   17:01   0:00 grep --color=auto a.out
[root@ubuntu0006:/media/hankin/vdb] #ll /proc/13997/fd
总用量 0
dr-x------ 2 root root  0 3月  14 17:01 ./
dr-xr-xr-x 9 root root  0 3月  14 17:01 ../
lrwx------ 1 root root 64 3月  14 17:01 0 -> /dev/pts/4
lrwx------ 1 root root 64 3月  14 17:01 1 -> /dev/pts/4
lrwx------ 1 root root 64 3月  14 17:01 2 -> /dev/pts/4
lr-x------ 1 root root 64 3月  14 17:01 3 -> pipe:[1273104966]
l-wx------ 1 root root 64 3月  14 17:01 4 -> pipe:[1273104966]
```
代码见：D:\Github\Storage\c++\pipe\read_PIPE_BUF_value.cpp

### 1-7、管道的内存区域大小
管道内部传输的是字节流，同TCP字节流的概念。应用层程序能往TCP写入多少byte数据，取决于接收方通告的接收窗口大小和本端的拥塞窗口大小（取2者小值）。
而管道，有一个容量限制，write写管道时，最多能写的字节数 <= PIPE_BUF （内核的管道缓冲区大小）。多个进程同时写一个管道，可能造成写的字节数超过PIPE_BUF，所写数据可能会与其他进程所写数据相互交叉。
调用fcntl，pathconf或fpathconf函数，可确定PIPE_BUF的值。

代码见：D:\Github\Storage\c++\pipe\read_PIPE_BUF_value.cpp

管道内存区域的大小必须在页面大小（PAGE）和上限值之间。上限值记录在/proc/sys/fs/pipe-max-size，特权用户可修改该上限值
```
$ cat /proc/sys/fs/pipe-max-size
1048576
```
发现代码设置可以超过这个值，但是真实情况不得而知。
```
[root@ubuntu0006:/media/hankin/vdb] #./a.out
BUFSIZ: 8192
Pipe buffer size: 65536
new Pipe buffer size: 2097152
[root@ubuntu0006:/media/hankin/vdb] #cat /proc/sys/fs/pipe-max-size
1048576
```

### 1-8、示例
代码见：D:\Github\Storage\c++\pipe\pipe_example2.cpp

## 2、有名管道FIFO

### 2-1、有名管道特点
有名管道也叫命名管道，可以解决无名管道只能适用于两个有共同祖先的进程的问题，即使两个不相关的进程也能通过FIFO交换数据。有名管道是一种文件类型，存在于文件系统中，通过stat结构的st_mode成员的编码。
有名管道和无名管道本质是一样的，最大的区别是：有名管道有关联的实体文件，而无名管道没有。正因为有关联实体文件，没有亲缘关系的任意两个进程之间，可以通过有名管道进行通信。

### 2-2、创建FIFO文件
使用有名管道前，需要创建FIFO文件，调用mkfifo（C程序）或mkfifo命令（shell环境）
```
#include <sys/types.h>
#include <sys/stat.h>

/* 创建fifo文件
 * pathname 指定文件名（路径）
 * mode 类似于open，指定FIFO文件的读写执行权利
 */
int mkfifo(const char *pathname, mode_t mode);
```
第二个参数指定FIFO文件读写执行权利，但真实的权限还需要按当前进程umask掩码得到：
```
real_mode = (mode & ~umask);  // 当前进程的umask掩码，可调用umask()获取
```

### 2-3、打开FIFO文件
通过调用open打开文件，close关闭文件。
不能以O_RDWR（读、写）模式打开FIFO文件，O_RDWR模式打开FIFO文件行为未定义。

使用FIFO文件的方法是：一个进程以只读模式（O_RDONLY）打开FIFO文件，另一个进程以只写模式（O_WRONLY）打开FIFO文件。负责写入FIFO的进程的写入内容，就可以被负责读出FIFO的进程读取到，从而实现通信的目的。

### 2-4、O_NONBLOCK
没有指定O_NONBLOCK模式时，以O_RDONLY只读打开FIFO文件不能返回（处于阻塞状态），等写打开；同样以O_WRONLY只写打开FIFO文件也不能返回，等读打开。O_RDONLY和O_WRONLY请求同时达到FIFO文件时，两个进程的打开请求就都能返回了。
如果指定了O_NONBLOCK，读打开请求在没有写进程的时候，可以成功返回；但是没有读进程的写打开请求，返回-1（失败），errno = ENXIO。
原因：FIFO只有读取端，没有写入端，没有明显的危害，尝试读取FIFO数据的操作不会返回任何数据。相反，如果允许只存在写入端不存在读取端，那么open之后，所有向FIFO文件的写入操作，都会导致产生SIGPIPE信号，以及调用write返回EPIPE的错误。因此，在源头上堵住（open返回失败）该问题反而合理。

添加O_NONBLOCK选项标志
对于无名管道，可以通过pipe2(fd, O_NONBLOCK);来指定O_NONBLOCK选项。
如果忘记为FIFO文件设置O_NONBLOCK标志位，可以通过fcntl：
```
// 添加O_NONBLOCK标志位
int flags = fcntl(fd, F_GETFL);
flags |= O_NONBLOCK;
fcntl(fd, F_SETFL, flags);

// 清除O_NONBLOCK标志位
int flags = fcntl(fd, F_GETFL);
flags &= ~O_NONBLOCK;
fcntl(fd, F_SETFL, flags);
```