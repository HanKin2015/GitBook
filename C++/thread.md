# 线程学习

## 1、
参考：https://blog.csdn.net/qq_22847457/article/details/89371217

【牢记】：线程默认共享数据段、代码段等地址空间，常用的是全局变量。而进程不共享全局变量，只能借助mmap。

%p是打印地址的, %x是以十六进制形式打印, 完全不同！另外在64位下结果会不一样, 所以打印指针老老实实用%p .

void pthread_exit(void *retval); 参数：retval表示线程退出状态，通常传NULL

思考：使用exit将指定线程退出，可以吗？ 结论：线程中，禁止使用exit函数，会导致进程内所有线程全部退出。
pthread_join函数  阻塞等待线程退出，获取线程退出状态 其作用，对应进程中 waitpid() 函数。
pthread_cancel函数  杀死(取消)线程 其作用，对应进程中 kill() 函数。
pthread_detach函数  实现线程分离

控制原语对比
进程            线程

fork          pthread_create
exit          pthread_exit
wait          pthread_join
kill          pthread_cancel
getpid        pthread_self 命名空间

## 2、c++多线程
学习地址：https://www.lintcode.com/course/99/learn/?chapterId=520&sectionId=3780

对于 C++ 而言，C++ 11 开始有了原生的线程支持，因此我们之后的内容都是通过 多线程的方式来实现并发。
关于多进程并发，C++ 没有原生进程相关的支持，通常都是借助相关平台的 API 去实现。

### 2-1、为什么需要并发
首先我们需要弄清楚的一个问题是，并发不一定会带来性能提升，且可能会导致潜在的错误。 在清楚了这一点之后，可以帮助我们更加理性地去做出我们的选择。

首先是不一定带来性能提升这方面，对于非常简单的模型而言，单线程的效率并不会更低，因为多线程带来了额外的开销，例如维护多个线程带来的线程的切换，线程的通信等问题。

其次是潜在的错误，多线程带来的复杂性是显而易见的，这意味着你需要投入更大的成本，更加小心地处理共享数据。数据的安全性将取决于编码人员的多线程知识储备以及相关编码经验。

### 2-2、hello world
代码见：D:\Github\Storage\c++\standard_library\thread\LintCode

### 2-3、资源获取即初始化 - RAII（Resource Acquisition Is Initialization）
Resource Acquisition Is Initialization 或 RAII，是一种 C++ 编程技巧，它绑定了在使用前必须获取的资源的生命周期（分配的堆内存、执行线程、打开的套接字、打开的文件、锁定的互斥锁、 磁盘空间、数据库连接——供应有限的任何东西）到对象的生命周期。

另一种更为简便的方式是将线程初始化后，直接指定为 detach 运行模式，在 detach 模式下，线程会在后台继续执行（这种线程通常被称为守护线程 - daemon），并且能够安全结束。这种方式相比于 join 模式更加简单，不过分离出的线程将与主线程毫无关联，所以你也不能在主线程中与该线程进行交互。



