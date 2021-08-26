# 线程退出函数pthread_cancel() 采坑点


因为pthread_cancel()函数不是直接使得线程退出，而是在系统调用中设置一个cancelpoint，当有系统调用函数的时候就会检查是有设置了这个cancelpoint，如果设置了那么就退出线程，相反不退出。而sleep()就属于系统调用，在使用sleep的时候系统会检查cancelpoint那么这个时候pthread_cancel()就会直接退出线程。但是在pthread_func2()函数中没有系统调用函数全是C代码，所以不会设置这个cancelpoint，故不会退出线程。

同一进程的线程间，pthread_cancel向另一线程发终止信号。系统并不会马上关闭被取消线程，只有在被取消线程下次系统调用时，才会真正结束线程。或调用pthread_testcancel，让内核去检测是否需要取消当前线程。被取消的线程，退出值，定义在Linux的pthread库中常数PTHREAD_CANCELED的值是-1。


在线程内部退出,使用pthread_exit(),这个特点就是不会释放一些共享内存(e.g., mutexes,
condition variables, semaphores, and file descriptors)

只有在进程exit()之后才会释放










