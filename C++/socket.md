# socket通信编程

源代码：https://github.com/HanKin2015/Storage/tree/master/linux/socket

## 1、几个定义
端口号：用来辨别本地通讯进程，一个本地的进程在通讯时均会占用一个端口号，不同的进程端口号不同，因此在通讯前必须要分配一个没有被访问的端口号。

网络中用一个三元组可以在全局唯一标志一个进程：（协议，本地地址，本地端口号）这样一个三元组，叫做一个半相关,它指定连接的每半部分。

（协议，本地地址，本地端口号，远地地址，远地端口号）这样一个五元组，叫做一个相关（association），即两个协议相同的半相关才能组合成一个合适的相关，或完全指定组成一连接。

## 2、socket
在 socket 编程中，socket() 函数是创建套接字（socket）的核心函数，它用于在内核中创建一个套接字描述符，用于后续的网络通信操作。

### 2-1、函数原型（C 语言）
```
#include <sys/socket.h>

int socket(int domain, int type, int protocol);
```

### 2-2、函数参数
1. domain（地址族 / 协议族）
指定套接字使用的网络层协议，决定了数据传输的网络范围和地址格式。常见取值：
- AF_INET：IPv4 协议（最常用），使用 32 位 IP 地址和 16 位端口号。
- AF_INET6：IPv6 协议，使用 128 位 IP 地址，解决 IPv4 地址枯竭问题。
- AF_UNIX（或 AF_LOCAL）：本地进程间通信（Unix 域套接字），不经过网络协议栈，效率高。
- AF_PACKET：链路层协议，用于直接操作网络帧（如抓包工具）。

PF_INET 与 AF_INET 的关系：
PF 是 "Protocol Family"（协议族）的缩写，PF_INET 表示 IPv4 对应的协议族。
AF 是 "Address Family"（地址族）的缩写，AF_INET 表示 IPv4 对应的地址格式（32 位 IP 地址）。

但在实际实现中，大多数系统将 PF_INET 和 AF_INET 定义为相同的值（例如在 Linux 中，两者在头文件中被宏定义为同一个整数），因此在使用时可以互换。

总结来说，PF_INET 是历史上与 AF_INET 并存的协议族标识，虽然在现代系统中两者等价，但实际编程中更推荐使用 AF_INET 以保持语义一致性。

2. type（套接字类型）
指定套接字的通信方式，决定了传输层的特性。常见取值：
- SOCK_STREAM：流式套接字，对应 TCP 协议。
    - 特点：面向连接、可靠传输、字节流无边界、拥塞控制。
    - 适用场景：文件传输、HTTP 通信、登录认证等。
- SOCK_DGRAM：数据报套接字，对应 UDP 协议。
    - 特点：无连接、不可靠、数据报有边界、传输效率高。
    - 适用场景：实时视频、游戏数据、广播通信等。
- SOCK_RAW：原始套接字，允许直接操作底层协议（如 IP 数据包）。
    - 特点：可自定义协议首部，用于协议开发或网络诊断（如 ping、traceroute）。
    - 注意：通常需要 root 权限。

3. protocol（协议）
指定具体使用的传输层协议，通常设为 0 让系统自动选择与 type 匹配的默认协议：
- 当 domain=AF_INET 且 type=SOCK_STREAM 时，默认协议为 IPPROTO_TCP（TCP）。
- 当 domain=AF_INET 且 type=SOCK_DGRAM 时，默认协议为 IPPROTO_UDP（UDP）。
- 特殊场景需显式指定，例如 IPPROTO_SCTP（SCTP 协议）。

### 2-3、返回值
成功：返回一个非负整数（套接字描述符，类似文件描述符），用于后续的 bind()、connect() 等操作。
失败：返回 -1，并设置 errno 表示错误原因（如 EAFNOSUPPORT 表示地址族不支持）。


常见区别不同：AF_INET（网络通信）和AF_LOCAL（本地通信）
AF_INET决定了要用ipv4地址（32位的）与端口号（16位的）的组合、AF_UNIX决定了要用一个绝对路径名作为地址。

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

Unix域对应的是： 
#define UNIX_PATH_MAX    108

struct sockaddr_un { 
    sa_family_t sun_family;               /* AF_UNIX */ 
    char        sun_path[UNIX_PATH_MAX];  /* pathname */ 
};
```

创建套接字的函数是socket()，函数原型为：
```
#include <sys/types.h>
#include <sys/socket.h>

int socket(int domain, int type, int protocol);
```
其中 “int domain”参数表示套接字要使用的协议簇，协议簇的在“linux/socket.h”里有详细定义，常用的协议簇：

AF_UNIX（本机通信）
AF_INET（TCP/IP – IPv4）
AF_INET6（TCP/IP – IPv6）
其中 “type”参数指的是套接字类型，常用的类型有：
SOCK_STREAM（TCP流）
SOCK_DGRAM（UDP数据报）
SOCK_RAW（原始套接字）
最后一个 “protocol”一般设置为“0”，也就是当确定套接字使用的协议簇和类型时，这个参数的值就为0，但是有时候创建原始套接字时，并不知道要使用的协议簇和类型，也就是domain参数未知情况下，这时protocol这个参数就起作用了，它可以确定协议的种类。
socket是一个函数，那么它也有返回值，当套接字创建成功时，返回套接字，失败返回“-1”，错误代码则写入“errno”中。

### 2-1、 AF_INET网络通信
长连接还是短连接，个人认为设计应该是短连接，因为消息并不是频繁发送。如果是心跳包那种就需要长连接了。

#### linux中socket编程出现 connect: No route to host
原因是防火墙没有关掉，centos 7使用： systemctl stop firewalld.service 命令关闭防火墙

### 2-2、AF_LOCAL本地通信




## 3、文件描述符
内核(kernel)利用文件描述符(file descriptor)来访问文件。

1.系统为每一个进程维护了一个文件描述符表，该表的值都是从0开始的，所以在不同的进程中你会看到相同的文件描述符，这种情况下相同文件描述符有可能指向同一个文件，也有可能指向不同的文件

2.每一个文件描述符会与一个打开文件相对应，同时，不同的文件描述符也会指向同一个文件。相同的文件可以被不同的进程打开也可以在同一个进程中被多次打开。

3.习惯上，标准输入(standard input)的文件描述符是 0，标准输出(standard output)是 1，标准错误(standard error)是 2






## 4、加冒号代表全局，不加代表该类
::close(mySocket);
其实就是全局函数罢了。

有网友碰到过这样的C++中调用函数前，加两个冒号::和不加两个冒号，作用一样吗？,问题详细内容为:C++中调用函数前，加两个冒号::和不加两个冒号，作用一样吗？
当然不一样，不加冒号的一定是当前作用域可见的所有的函数或者变量，否则报错，加冒号的可以一用冒号前的那个类或者命名空间里的函数或变量，否则一般是不能用的(双冒号前不加东西是全局变量或函数的意思)


## 5、关于PF_INET和AF_INET的区别
其实是TCP/IP的设计者一开始想多了。
PF是protocol family，AF是address family，作者一开始以为可能某个协议族有多种形式的地址，所以在API上把它们分开了，创建socket用PF，bind/connect用AF。
结果一个PF只有一个AF，从来没有过例外，所以就混用了。

另外：https://blog.csdn.net/jin13277480598/article/details/53842378
```
ssize_t send_data(int fd, const void * buf1, size_t len)
{
	size_t 	nleft = len;
    ssize_t nwrite = -1;
    const char *buf = (const char*)buf1;
    
    while (nleft > 0)
    {
        if ((nwrite = write(fd, buf, nleft)) < 0)
        {
            if (errno == EINTR)
            {
                continue;
            }
			else if ((errno == EWOULDBLOCK) || (errno == EAGAIN))
			{
				return -2;
			}
            return -1;
        }
		else if (nwrite == 0)
		{
			break;	/* EOF */
		}
        nleft -= nwrite;
		buf += nwrite;
    }

	return (len - nleft);	/* return >= 0 */
}
```
inet_addr

read & write

TimeQryService* TimeQryService::GetInstance()
{
    //RcService单例
    static TimeQryService s_instance;    
    return &s_instance;
}

## 6、struct sockaddr和struct sockaddr_in这两个结构体用来处理网络通信的地址

### 6-1、sockaddr
sockaddr在头文件#include <sys/socket.h>中定义，sockaddr的缺陷是：sa_data把目标地址和端口信息混在一起了，如下：
```
struct sockaddr {  
	sa_family_t sin_family;//地址族
	char sa_data[14]; //14字节，包含套接字中的目标地址和端口信息               
}; 
```

### 6-2、sockaddr_in
sockaddr_in在头文件#include<netinet/in.h>或#include <arpa/inet.h>中定义，该结构体解决了sockaddr的缺陷，把port和addr 分开储存在两个变量中，如下：
```
struct sockaddr_in {
	sa_family_t 	sin_family;
	uint16_t 		sin_port;
	struct in_addr 	sin_addr;
	char			sin_aero[8];
};

struct in_addr {
	in_addr_t		s_addr;
};
```
sin_port和sin_addr都必须是网络字节序（NBO），一般可视化的数字都是主机字节序（HBO）。

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
































