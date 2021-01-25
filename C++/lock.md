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
```
#include <unistd.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <assert.h>
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>


/**
 *  返回一片共享内存标识符，用于后续获取该共享内存，以及销毁该共享内存
 *  INDEX_OF_KEY —— 自定义的该共享内存序号
 *  LENGTH —— 共享内存大小
 */
const int create_flag(const int INDEX_OF_KEY, const unsigned int LENGTH) {
    // 生成key
    const char* FILE_PATH = "./";
    key_t key = ftok(FILE_PATH, INDEX_OF_KEY);

    // 创建共享内存空间
    const int FLAG = shmget(key, LENGTH, IPC_CREAT | 0666);

    return FLAG;
}


// 定义进程锁结构体
typedef struct MUTEX_PACKAGE {
    // 锁以及状态
    pthread_mutex_t lock;
    pthread_mutexattr_t lock_attr;
    // 在共享内存中的标识符
    int FLAG;
} mutex_package_t;


// 初始化进程锁结构体
const int init(void* pthis) {
    mutex_package_t* mp = (mutex_package_t*)pthis;
    // 初始化锁状态，设置状态状态为——进程共享
    pthread_mutexattr_init(&(mp->lock_attr));
    pthread_mutexattr_setpshared(&(mp->lock_attr), PTHREAD_PROCESS_SHARED);
    // 用锁状态来初始化锁
    pthread_mutex_init(&(mp->lock), &(mp->lock_attr));

    return 0;
}


// 在共享内存上定义进程锁结构体并且返回其位置
mutex_package_t* create_mutex_package(const int INDEX) {
    const int FLAG = create_flag(INDEX, sizeof(mutex_package_t));
    mutex_package_t* mp = (mutex_package_t*)shmat(FLAG, NULL, SHM_R | SHM_W);
    mp->FLAG = FLAG;

    assert(init(mp) == 0);

    return mp;
}


// 销毁进程锁结构体，利用其FLAG变量索引到其占用的共享内存并销毁
const int destory_mutex_package(mutex_package_t* mp) {
    // 销毁锁和锁状态
    pthread_mutex_destroy(&(mp->lock));
    pthread_mutexattr_destroy(&(mp->lock_attr));

    // 释放共享内存
    assert(shmctl(mp->FLAG, IPC_RMID, NULL) == 0);

    return 0;
}


int main() {
    // 创建自定义进程锁
    mutex_package_t* mp = create_mutex_package(111);

    // 获取一片共享内存空间
    const int FLAG = create_flag(222, sizeof(int));
    volatile int* x = (int*)shmat(FLAG, NULL, 0);

    // 创建新进程
    int id = fork();
    assert(id >= 0);

    // 设置循环次数
    const int N = 1000000;

    // 父进程每次加1，子进程每次加2
    int i;
    for (i = 0; i < N; ++i) {

        if (id > 0) {  // 父进程
            // 加锁
            pthread_mutex_lock(&(mp->lock));
            int temp = *x;
            *x = temp+1;
            // 解锁
            pthread_mutex_unlock(&(mp->lock));

        } else {  // 子进程
            // 加锁
            pthread_mutex_lock(&(mp->lock));
            int temp = *x;
            *x = temp+2;
            // 解锁
            pthread_mutex_unlock(&(mp->lock));
        }

    }

    // 等待循环完毕
    sleep(1);

    // 打印
    printf("pid= %d, x_address= %x, x= %d\n", getpid(), x, *x);

    // 等待打印完毕
    sleep(1);

    // 销毁进程锁,释放申请的共享内存
    if (id > 0) {  // 父进程
        destory_mutex_package(mp);
        mp = NULL;
        shmctl(FLAG, IPC_RMID, NULL);
        x = NULL;
        printf("父进程释放资源完毕\n");
    }

    return 0;
}
```
### 1-3、加锁和不加锁的对比
#### mmap （一种内存映射文件的方法）
mmap将一个文件或者其它对象映射进内存。文件被映射到多个页上，如果文件的大小不是所有页的大小之和，最后一个页不被使用的空间将会清零。mmap在用户空间映射调用系统中作用很大。
头文件 <sys/mman.h>
函数原型
void* mmap(void* start,size_t length,int prot,int flags,int fd,off_t offset);
int munmap(void* start,size_t length);

#### 不加锁现象
```
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   168073
----parent--finally------share_var =   169446
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   176043
----child---finally------share_var =   185715
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   200000
----child---finally------share_var =   300000
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   125893
----parent--finally------share_var =   135235
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   153174
----child---finally------share_var =   155752
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   248540
----child---finally------share_var =   253868
```

#### 加锁现象
```
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   288553
----child---finally------share_var =   300000
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   206120
----parent--finally------share_var =   300000
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----child---finally------share_var =   287948
----parent--finally------share_var =   300000
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   295982
----child---finally------share_var =   300000
root@debian-sangfor:~/hejian/lock# ./main
share_var = 0
----parent--finally------share_var =   299717
----child---finally------share_var =   300000
```

### 编译报错：undefined reference to `pthread_mutexattr_destroy'
-lpthread -ldl
编译命令：g++ test.cpp -lpthread -ldl


## 文件的读写锁
参考：https://www.jianshu.com/p/a62bd5ae5d8c

失败了，怎么也锁不住，获取状态永远是解锁状态。

lsof（list open files）是一个列出当前系统打开文件的工具。在linux环境下，任何事物都以文件的形式存在，通过文件不仅仅可以访问常规数据，还可以访问网络连接和硬件。
pause（）使调用进程（或线程）进入休眠状态，直到传递的信号终止进程或导致调用信号捕获函数。

瑞思拜是一个网络流行词，是英语respect的音译，是尊重的意思。该词在在说唱歌手中广泛流行。渐成为了饭圈词汇。

用于Linux进程通信(IPC)共享内存。共享内存函数由shmget、shmat、shmdt、shmctl四个函数组成。
