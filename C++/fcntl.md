# fcntl函数

## 1、简介
fcntl系统调用可以用来对已打开的文件描述符进行各种控制操作以改变已打开文件的的各种属性。

函数原型：
```
#include<unistd.h>  
#include<fcntl.h>  
int fcntl(int fd, int cmd);  
int fcntl(int fd, int cmd, long arg);  
int fcntl(int fd, int cmd ,struct flock* lock);  
```

fcntl函数功能依据cmd的值的不同而不同。参数对应功能如下：
```
（1）F_DUPFD
与dup函数功能一样，复制由fd指向的文件描述符，调用成功后返回新的文件描述符，与旧的文件描述符共同指向同一个文件。
（2）F_GETFD
读取文件描述符close-on-exec标志
（3）F_SETFD
将文件描述符close-on-exec标志设置为第三个参数arg的最后一位
（4）F_GETFL
获取文件打开方式的标志，标志值含义与open调用一致
（5）F_SETF
设置文件打开方式为arg指定方式
(6)F_SETLK
此时fcntl函数用来设置或释放锁。当short_l_type为F_RDLCK为读锁，F_WDLCK为写锁，F_UNLCK为解锁。
如果锁被其他进程占用，则返回-1;
这种情况设的锁遇到锁被其他进程占用时，会立刻停止进程。
(7)F_SETLKW
此时也是给文件上锁，不同于F_SETLK的是，该上锁是阻塞方式。当希望设置的锁因为其他锁而被阻止设置时，该命令会等待相冲突的锁被释放。
(8)F_GETLK
第3个参数lock指向一个希望设置的锁的属性结构，如果锁能被设置，该命令并不真的设置锁，而是只修改lock的l_type为F_UNLCK,然后返回该结构体。如果存在一个或多个锁与希望设置的锁相互冲突，则fcntl返回其中的一个锁的flock结构。
```

文件记录锁是fcntl函数的主要功能。
记录锁：实现只锁文件的某个部分，并且可以灵活的选择是阻塞方式还是立刻返回方式
当fcntl用于管理文件记录锁的操作时，第三个参数指向一个struct flock *lock的结构体

```
struct flock  
{  
    short_l_type;    /*锁的类型*/  
    short_l_whence;  /*偏移量的起始位置：SEEK_SET,SEEK_CUR,SEEK_END*/  
    off_t_l_start;     /*加锁的起始偏移*/  
    off_t_l_len;    /*上锁字节*/  
    pid_t_l_pid;   /*锁的属主进程ID */  
};   
```

https://www.cnblogs.com/xuyh/p/3273082.html

## 2、fcntl函数的作用及应用场景
在unp书中，关于函数fcntl的参数讲解的比较多，但是这个函数功能只有简单的一句话“fcntl函数可以改变已经打开文件的属性”。
我们知道，在Unix/linux环境下，不管是设备、I/O、socket等等，几乎一切都是文件，所以fcntl的功能就是对于这些设备、文件、I/O的属性进行设定，比如常用的功能：
1、复制一个已有的描述符，类似于dup函数功能。
2、获取/设置文件描述符标志。
3、获取/设置文件状态标志。
4、获取/设置一步I/O所有权。
5、获取/设置记录锁。

fcntl的功能很强大，也很全面，因为它是可以设置所有类型文件的属性，偏偏unix下几乎所有都是文件，关于它的具体用法，参数解释，这里就不赘述了，我们就举一个简单的例子，在前面的文章中，我们分析了“阻塞”和“非阻塞”，一般情况下，我们可以通过open操作时，通过O_NONBLOCK或O_NDELAY直接设置为非阻塞，这个时候是不需要fcntl的，但是如果open时并没有设定非阻塞时，但是设备已经打开了，这个时候就可以通过fcntl进行设置了，而且fcntl设置的结果是最终的结果，比如open函数指定为阻塞，那么后面调用fcntl设置为非阻塞，那么最终这个设备是“非阻塞”模式。
另外还有socket编程，由于没有open函数，在建立连接后，是可以通过fcntl对socket进行设置非阻塞的。

