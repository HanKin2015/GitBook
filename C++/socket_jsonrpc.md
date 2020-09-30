# socket通信编程
源代码：https://github.com/HanKin2015/Storage/tree/master/linux/socket

目标：学习jsonrpc+socket通信机制

## 1、创建父进程
#include <unistd.h>
获取进程id：pid_t getpid(void);

sleep() 秒级
usleep() 微秒级

## 2、创建子进程
fork函数调用一次，会返回两个函数值，对于父进程而言，返回的是子进程的PID（因为一个父进程可能有多个子进程，并且没有一个函数可以使父进程获取其所有的子进程ID），对于子进程返回值是0（这样就能区分父子进程，子进程是可以通过getppid来获取父进程的ID），如果进程创建失败，那么返回给父进程-1。
```
#include <iostream>
#include <cstdio>
#include <unistd.h>
using namespace std;

int main()
{
    //for(int i = 0; i < 60; i++) {
    //    sleep(2);
    //    printf("pid = %d : %d\n", getpid(), i);
    //}
    int num = 3;
    pid_t pid = 0;
    pid = fork();
    if (0 < pid) {       //父进程得到的pid大于0,这段代码是父进程中执行的
        for(int i = 0; i < 60; i++) {
            sleep(2);
            printf("parent pid = %d : %d\n", getpid(), i);
        }
    } else if(0 == pid) {   //子进程得到的返回值是0，这段代码在子进程中执行
        for(int i = 0; i < 60; i++) {
            sleep(2);
            printf("son pid = %d : %d\n", getpid(), i);
        }
    } else {                 //创建进程失败
        //有两种情况会失败：
        //1.进程数目达到OS的最大值
        //2.进程创建时内存不够了。
        printf("fork error!\n");
    }
    return 0;
}
```

通过ps -ef|grep a.out可以看见有两个进程存在。

## 3、socket通信
参考：https://blog.csdn.net/qq_31918961/article/details/80546537
"一切皆Socket！"
进程间通信（IPC）
网络层的“ip地址”可以唯一标识网络中的主机，而传输层的“协议+端口”可以唯一标识主机中的应用程序（进程）。这样利用三元组（ip地址，协议，端口）就可以标识网络的进程。

socket起源于Unix，而Unix/Linux基本哲学之一就是“一切皆文件”，都可以用“打开open –> 读写write/read –> 关闭close”模式来操作。我的理解就是Socket就是该模式的一个实现，socket即是一种特殊的文件，一些socket函数就是对其进行的操作（读/写IO、打开、关闭）。
```
domain：即协议域，又称为协议族（family）。常用的协议族有，AF_INET、AF_INET6、AF_LOCAL（或称AF_UNIX，Unix域socket）、AF_ROUTE等等。协议族决定了socket的地址类型，在通信中必须采用对应的地址，如AF_INET决定了要用ipv4地址（32位的）与端口号（16位的）的组合、AF_UNIX决定了要用一个绝对路径名作为地址。
type：指定socket类型。常用的socket类型有，SOCK_STREAM、SOCK_DGRAM、SOCK_RAW、SOCK_PACKET、SOCK_SEQPACKET等等。
protocol：故名思意，就是指定协议。常用的协议有，IPPROTO_TCP、IPPTOTO_UDP、IPPROTO_SCTP、IPPROTO_TIPC等，它们分别对应TCP传输协议、UDP传输协议、STCP传输协议、TIPC传输协议。
```

a) Little-Endian就是低位字节排放在内存的低地址端，高位字节排放在内存的高地址端。
b) Big-Endian就是高位字节排放在内存的低地址端，低位字节排放在内存的高地址端。


```
ipv4对应的是： 
struct sockaddr_in {
    sa_family_t    sin_family; /* address family: AF_INET */
    in_port_t      sin_port;   /* port in network byte order */
    struct in_addr sin_addr;   /* internet address */
};

/* Internet address. */
struct in_addr {
    uint32_t       s_addr;     /* address in network byte order */
};


ipv6对应的是： 
struct sockaddr_in6 { 
    sa_family_t     sin6_family;   /* AF_INET6 */ 
    in_port_t       sin6_port;     /* port number */ 
    uint32_t        sin6_flowinfo; /* IPv6 flow information */ 
    struct in6_addr sin6_addr;     /* IPv6 address */ 
    uint32_t        sin6_scope_id; /* Scope ID (new in 2.4) */ 
};

struct in6_addr { 
    unsigned char   s6_addr[16];   /* IPv6 address */ 
};


Unix域对应的是： 
#define UNIX_PATH_MAX    108

struct sockaddr_un { 
    sa_family_t sun_family;               /* AF_UNIX */ 
    char        sun_path[UNIX_PATH_MAX];  /* pathname */ 
};
```

sockaddr_in结构体：对应了网络中唯一的主机地址（ip地址sin_addr+协议sin_family+端口port）

### 服务端

### 客户端

### 测试

















