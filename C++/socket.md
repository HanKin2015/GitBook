# socket通信编程

源代码：https://github.com/HanKin2015/Storage/tree/master/linux/socket

## 1、几个定义
端口号：用来辨别本地通讯进程，一个本地的进程在通讯时均会占用一个端口号，不同的进程端口号不同，因此在通讯前必须要分配一个没有被访问的端口号。
网络中用一个三元组可以在全局唯一标志一个进程：（协议，本地地址，本地端口号）这样一个三元组，叫做一个半相关,它指定连接的每半部分。
（协议，本地地址，本地端口号，远地地址，远地端口号）这样一个五元组，叫做一个相关（association），即两个协议相同的半相关才能组合成一个合适的相关，或完全指定组成一连接。


## 2、分类
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
















