# 进程间通信IPC之共享内存

https://blog.csdn.net/weixin_41019383/article/details/99186586
文章写的真的好，楷模模范。

进程间通信(IPC)的方式包括:管道pipe；消息队列；共享内存；信号量；信号；套接字Socket。
共享内存是进程间通信最快的一种方式。

共享内存是在物理内存上开辟一块内存空间，然后将这个空间映射到虚拟地址空间上，如果存在多个进程都映射到了该区域的虚拟地址空间，就会发生一个进程写入共享内存的信息，也可以被其它使用这个共享内存的进程通过简单的内存读取读出信息，从而实现了进程间的通信。

## 1、共享内存相关API
Linux允许不同进程访问同一个逻辑内存，提供一组API，头文件在sys/shm.h和sys/ipc.h中。

## 2、共享内存的操作步骤
1. 创建共享内存
2. 将共享内存映射到虚拟地址空间上
3. 通过虚拟地址操作共享内存
4. 解除共享内存在虚拟地址空间上的映射关系
5. 控制删除共享内存

## 3、相关API函数

新建共享内存
```
int shmget(key_t key,size_t size,int shmflg);
//参数列表
key:共享内存键值，可以理解为共享内存的唯一性标识
size: 共享内存大小
shmflg: 创建进程和其它进程的读写权限标识
return: 相应的共享内存标识符，失败返回-1
```

将共享内存映射到虚拟地址空间上
```
void* shmat(int shm_id,const void* shm_addr,int shmflg);
//参数列表
shm_id:共享内存标识符
shm_addr:指定共享内存连接到当前进程的地址，通常为0，表示由系统来选择
shmflg: 标志位 
返回值: 指定共享内存第一个字节的指针，失败返回-1
```

通过虚拟地址空间操作共享内存
```
strcpy(shmat返回值,"data");//也可以利用memcpy对共享内存进行操作
```

解除共享内存在虚拟地址空间上的映射关系
```
int shmdt(const void* shmaddr);
//参数列表：
shmaddr:指定连接处地址
```

控制并删除共享内存
```
int shmctl(int shm_id,int command,struct shmid_ds* buf);
//参数列表：
shm_id:共享内存标识符
command:有三个值
/*
IPC_STAT:获取共享内存的状态，把共享内存的shmid_ds结构复制到buf中
IPC_SET:设置共享内存的状态，把buf复制到共享内存的shmid_ds结构
IPC_RMID:删除共享内存
*/
buf:共享内存管理结构体
```

## 示例
```
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <error.h>
#define SIZE 1024
int main()
{
    int shmid ;
    char *shmaddr ;
    struct shmid_ds buf ;
    int flag = 0 ;
    int pid ;
    shmid = shmget(IPC_PRIVATE, SIZE, IPC_CREAT|0600 ) ;
    if ( shmid < 0 )
    {
            perror("get shm  ipc_id error") ;
            return -1 ;
    }
    pid = fork() ;
    if ( pid == 0 )
    {
        shmaddr = (char *)shmat( shmid, NULL, 0 ) ;
        if ( (int)shmaddr == -1 )
        {
            perror("shmat addr error") ;
            return -1 ;
        }
        strcpy( shmaddr, "Hi, I am child process!\n") ;
        shmdt( shmaddr ) ;
        return  0;
    } else if ( pid > 0) {
        sleep(3 ) ;
        flag = shmctl( shmid, IPC_STAT, &buf) ;
        if ( flag == -1 )
        {
            perror("shmctl shm error") ;
            return -1 ;
        }
        printf("shm_segsz =%d bytes\n", buf.shm_segsz ) ;
        printf("parent pid=%d, shm_cpid = %d \n", getpid(), buf.shm_cpid ) ;
        printf("chlid pid=%d, shm_lpid = %d \n",pid , buf.shm_lpid ) ;
        shmaddr = (char *) shmat(shmid, NULL, 0 ) ;
        if ( (int)shmaddr == -1 )
        {
            perror("shmat addr error") ;
            return -1 ;
        }
        printf("%s", shmaddr); 
        shmdt( shmaddr );
        shmctl(shmid, IPC_RMID, NULL) ;
    }else{
        perror("fork error") ;
        shmctl(shmid, IPC_RMID, NULL) ;
    }
    return 0 ;
}
```





