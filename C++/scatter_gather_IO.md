# 分散/聚集IO（scatter/gather)及iovec结构体

## 1、用户态和内核态区别



## 2、linux文件IO与内存映射：用户空间的IO缓冲区
https://blog.51cto.com/u_13456560/5823251










简介
分散/聚集 I/O是一种可以在单次系统调用中对多个缓冲区输入输出的方法，可以把多个缓冲区的数据写到单个数据流，也可以把单个数据流读到多个缓冲区中。其命名的原因在于数据会被分散到指定缓冲区向量，或者从指定缓冲区向量中聚集数据。这种输入输出方法也称为向量 I/O（vector I/O）。与之不同，标准读写系统调用（read，write）可以称为线性I/O（linear I/O）。

## 2、与线性 I/O 相比，分散/聚集 I/O 有如下几个优势
- 编码模式更自然
如果数据本身是分段的（比如预定义的结构体的变量），向量 I/O 提供了直观的数据处理方式。

- 效率更高
单个向量 I/O 操作可以取代多个线性 I/O 操作。

- 性能更好
除了减少了发起的系统调用次数，通过内部优化，向量 I/O 可以比线性 I/O 提供更好的性能。

- 支持原子性
和多个线性 I/O 操作不同，一个进程可以执行单个向量 I/O 操作，避免了和其他进程交叉操作的风险。

## 3、函数原型
```
#include <sys/uio.h>
ssize_t readv(int fd, const struct iovec *iov, int iovcnt);
ssize_t writev(int fd, const struct iovec *iov, int iovcnt);
ssize_t preadv(int fd, const struct iovec *iov, int iovcnt, off_t offset);
ssize_t pwritev(int fd, const struct iovec *iov, int iovcnt, off_t offset);
```