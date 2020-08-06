# socket通信编程

AF_INET域与AF_UNIX域socket通信原理对比


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
