# 线程学习
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

fork             pthread_create

exit             pthread_exit

wait            pthread_join

kill              pthread_cancel

getpid        pthread_self 命名空间