# socket通信编程

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

### 2-1、 AF_INET网络通信
长连接还是短连接，个人认为设计应该是短连接，因为消息并不是频繁发送。如果是心跳包那种就需要长连接了。

#### linux中socket编程出现 connect: No route to host
原因是防火墙没有关掉，centos 7使用： systemctl stop firewalld.service 命令关闭防火墙

### 2-2、AF_LOCAL本地通信










































# 加冒号代表全局，不加代表该类
::close(mySocket);


# 关于PF_INET和AF_INET的区别
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
