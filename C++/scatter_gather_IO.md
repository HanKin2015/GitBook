# 分散/聚集IO（scatter/gather)及iovec结构体

## 1、什么是用户态和内核态
https://blog.csdn.net/m0_37199770/article/details/113482312
用户态和内核态是操作系统的两种运行状态。

内核态：处于内核态的 CPU 可以访问任意的数据，包括外围设备，比如网卡、硬盘等，处于内核态的 CPU 可以从一个程序切换到另外一个程序，并且占用 CPU 不会发生抢占情况，一般处于特权级 0 的状态我们称之为内核态。

用户态：处于用户态的 CPU 只能受限的访问内存，并且不允许访问外围设备，用户态下的 CPU 不允许独占，也就是说 CPU 能够被其他程序获取。 

用户态与内核态只是不同权限的资源范围。

### 1-1、为什么要有用户态和内核态
这个主要是访问能力的限制的考量，计算机中有一些比较危险的操作，比如设置时钟、内存清理，这些都需要在内核态下完成，如果随意进行危险操作，极容易导致系统崩坏。

### 1-2、CPU指令集
指令集是 CPU 实现软件指挥硬件执行的媒介，具体来说每一条汇编语句都对应了一条 CPU 指令，而非常非常多的 CPU 指令 在一起，可以组成一个、甚至多个集合，指令的集合叫 CPU 指令集。

同时 CPU 指令集 有权限分级，大家试想，CPU 指令集 可以直接操作硬件的，要是因为指令操作的不规范`，造成的错误会影响整个计算机系统的。好比你写程序，因为对硬件操作不熟悉，导致操作系统内核、及其他所有正在运行的程序，都可能会因为操作失误而受到不可挽回的错误，最后只能重启计算机才行。

而对于硬件的操作是非常复杂的，参数众多，出问题的几率相当大，必须谨慎的进行操作，对开发人员来说是个艰巨的任务，还会增加负担，同时开发人员在这方面也不被信任，所以操作系统内核直接屏蔽开发人员对硬件操作的可能，都不让你碰到这些 CPU 指令集。

### 1-3、CPU指令集操作权限
针对上面的需求，硬件设备商直接提供硬件级别的支持，做法就是对 C P U 指令集设置了权限，不同级别权限能使用的 C P U 指令集 是有限的，以 Inter C P U 为例，Inter把 C P U 指令集 操作的权限由高到低划为4级：
- ring 0
- ring 1
- ring 2
- ring 3
其中 ring 0 权限最高，可以使用所有 CPU 指令集，ring 3 权限最低，仅能使用常规 CPU 指令集，不能使用操作硬件资源的 CPU 指令集，比如 IO 读写、网卡访问、申请内存都不行，Linux系统仅采用ring 0 和 ring 3 这2个权限，即用户态和内核态。

### 1-4、高情商
ring 0被叫做内核态，完全在操作系统内核中运行
ring 3被叫做用户态，在应用程序中运行

### 1-5、低情商
执行内核空间的代码，具有ring 0保护级别，有对硬件的所有操作权限，可以执行所有C P U 指令集，访问任意地址的内存，在内核模式下的任何异常都是灾难性的，将会导致整台机器停机

在用户模式下，具有ring 3保护级别，代码没有对硬件的直接控制权限，也不能直接访问地址的内存，程序是通过调用系统接口(System Call APIs)来达到访问硬件和内存，在这种保护模式下，即时程序发生崩溃也是可以恢复的，在电脑上大部分程序都是在，用户模式下运行的

### 1-6、用户态与内核态的空间
每个进程都有两个栈，分别是用户栈与内核栈，对应用户态与内核态的使用。
通过指令集权限区分用户态和内核态，还限制了内存资源的使用，操作系统为用户态与内核态划分了两块内存空间，给它们对应的指令集使用。

### 1-7、用户态与内核态的切换
相信大家都听过这样的话「用户态和内核态切换的开销大」，但是它的开销大在那里呢？简单点来说有下面几点：
- 保留用户态现场（上下文、寄存器、用户栈等）
- 复制用户态参数，用户栈切到内核栈，进入内核态
- 额外的检查（因为内核代码对用户不信任）
- 执行内核态代码
- 复制内核态代码执行结果，回到用户态
- 恢复用户态现场（上下文、寄存器、用户栈等）

Shell顾名思义，就是外壳的意思，就好像把内核包裹起来的外壳，它是一种特殊的应用程序，俗称命令行。Shell也是可编程的，它有标准的Shell 语法，符合其语法的文本叫Shell脚本，很多人都会用Shell脚本实现一些常用的功能，可以提高工作效率。

### 1-8、什么情况会导致用户态到内核态切换
系统调用：用户态进程主动切换到内核态的方式，用户态进程通过系统调用向操作系统申请资源完成工作，例如 fork（）就是一个创建新进程的系统调用，系统调用的机制核心使用了操作系统为用户特别开放的一个中断来实现，如Linux 的 int 80h 中断，也可以称为软中断

异常：当 C P U 在执行用户态的进程时，发生了一些没有预知的异常，这时当前运行进程会切换到处理此异常的内核相关进程中，也就是切换到了内核态，如缺页异常

中断：当 C P U 在执行用户态的进程时，外围设备完成用户请求的操作后，会向 C P U 发出相应的中断信号，这时 C P U 会暂停执行下一条即将要执行的指令，转到与中断信号对应的处理程序去执行，也就是切换到了内核态。如硬盘读写操作完成，系统会切换到硬盘读写的中断处理程序中执行后边的操作等。

## 2、linux文件IO与内存映射：用户空间的IO缓冲区
https://blog.51cto.com/u_13456560/5823251

### 2-1、用户空间IO缓冲区产生
系统调用过程中会产生的开销如下：
- 切换CPU到内核态
- 进行数据内容的拷贝，从用户态到内核态或者从内核态到用户态
- 切换CPU到用户态

以上为普通到系统调用过程中操作系统需要产生的额外开销，为了提升系统调用的性能，这里推出用户空间的IO缓冲区，即文件读写在用户空间时写入IO缓冲区，后续的写入或者读出page cache则直接由IO缓冲区进行读写。

### 2-2、自定义IO缓冲区
demo见：D:\Github\Storage\c++\IO_buffer\IO_buffer.cpp

## 3、简介
https://blog.csdn.net/u012432778/article/details/47323805

分散/聚集 I/O是一种可以在单次系统调用中对多个缓冲区输入输出的方法，可以把多个缓冲区的数据写到单个数据流，也可以把单个数据流读到多个缓冲区中。其命名的原因在于数据会被分散到指定缓冲区向量，或者从指定缓冲区向量中聚集数据。这种输入输出方法也称为向量 I/O（vector I/O）。与之不同，标准读写系统调用（read，write）可以称为线性I/O（linear I/O）。

## 4、与线性 I/O 相比，分散/聚集 I/O 有如下几个优势
- 编码模式更自然
如果数据本身是分段的（比如预定义的结构体的变量），向量 I/O 提供了直观的数据处理方式。

- 效率更高
单个向量 I/O 操作可以取代多个线性 I/O 操作。

- 性能更好
除了减少了发起的系统调用次数，通过内部优化，向量 I/O 可以比线性 I/O 提供更好的性能。

- 支持原子性
和多个线性 I/O 操作不同，一个进程可以执行单个向量 I/O 操作，避免了和其他进程交叉操作的风险。

## 5、函数原型
Linux实现了POSIX 1003.1-2001中定义的一组实现分散/聚集 I/O机制的系统调用。该实现满足了上面所述的所有特性。
```
#include <sys/uio.h>
ssize_t readv(int fd, const struct iovec *iov, int iovcnt);
readv() 函数从文件描述符 fd 中读取 count 个段 (segment) (一个段即一个 iovec 结构体）到参数 iov 所指定的缓冲区中。

ssize_t writev(int fd, const struct iovec *iov, int iovcnt);
writev() 函数从参数 iov 指定的缓冲区中读取 count 个段的数据，并写入 fd 中

ssize_t preadv(int fd, const struct iovec *iov, int iovcnt, off_t offset);
ssize_t pwritev(int fd, const struct iovec *iov, int iovcnt, off_t offset);
```

除了同时操作多个缓冲区外，readv() 函数和 writev() 函数的功能分别和 read()，write() 的功能一致。
每个 iovec 结构体描述一个独立的，物理不连续的缓冲区，我们称其为段(segment)：
```
#include <sys/uio.h>

struct iovec {
    void      *iov_base;/* pointer to start of buffer */
    size_t   iov_len;/* size of buffer in bytes */
};
```
一组段的集合称为向量(vector)。每个段描述了内存中所要读写的缓冲区的地址和长度。readv() 函数在处理下个缓冲区之前，会填满当前缓冲区的 iov_len 个字节。write() 函数在处理下个缓冲区之前，会把当前缓冲区所有 iov_len 个字节数据输出，这两个函数都会顺序处理向量中的段，从 iov[0] 开始，接着是 iov[1]，一直到 iov[count - 1] 。

## 6、返回值
操作成功时，readv() 函数和 writev() 函数分别返回读写的字节数。该返回值应该等于所有 count 个 iov_len 的和。出错时，返回-1，并相应设置errno值。这些系统调用可能会返回任何 read() 和 write() 可能返回的错误，而且出错时，设置的 errno 值也与 read(), write() 相同。此外，标准还定义了另外两种错误场景。

第一种场景，由于返回值类型是 ssize_t , 如果所有 count 个iov_len 的和超出SSIZE_MAX, 则不会处理任何数据，返回-1，并把errno值设置为EINVAL。

第二种场景，POSIX指出count值必须大于0，且小于等于IOV_MAX(IOV_MAX在文件<limits.h>定义。在Linux中，当前IOV_MAX的值是1024。如果count为0，该系统调用会返回0。如果count大于IOV_MAX,不会处理任何数据，返回-1，并把errno值设置为EINVAL。

## 7、优化count值
在向量 I/O 操作中，Linux内核必须分配内部数据结构来表示每个段(segment)。一般来说，是基于count的大小动态分配进行的。然而，为了优化，如果count值足够小，内核会在栈上创建一个很小的段数组，通过避免动态分配段内存，从而获得性能上的一些提升。count 的阀值一般设置为8，，因此如果count值小于或等于8时，向量I/O操作会以一种高效的方式，在进程的内核栈中运行。

大多数情况下，无法选择在指定的向量I/O操作中一次同时传递多少个段。当你认为可以调试一个较小值时，选择8或更小的值肯定会得到性能的提升。

Linux内核把readv() 和writev() 作为系统调用实现，在内部使用分散/聚集 I/O模式。实际上，Linux内核中的所有I/O都是向量I/O，read() 和 write() 是作为向量 I/O来实现的，且向量中只有一个段。

## 8、栗子
demo见：

