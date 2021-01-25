[TOC]

# IP和MAC地址

进入公司第一次敲代码，仅仅是一个简单练手的，就是向服务端发送客户端版本号、ip地址、mac地址。

请求配置csp文件时，链接也需要发送版本号字段（js代码-猝）。

# 1、查看ip地址、mac地址
## Windows
>ipconfig

只能看见ip地址。但是使用ipconfig/all就可以看见了。

## Linux
>ifconfig

HWaddr和inet addr字段就是。

identification鉴定、身份证


# 2、inet_ntoa() 
将一个32位网络字节序的二进制IP地址转换成相应的点分十进制的IP地址（返回点分十进制的字符串在静态内存中的指针）。
## linux
### 函数声明
char *inet_ntoa(struct in_addr in);

### 头文件
#include<arpa/inet.h>


所需库： winsock.h
即在程序开头写：
#include <WINSOCK2.h>
#pragma comment(lib,"WS2_32.LIB")
函数原型： char FAR* PASCAL FAR inet_ntoa( struct in_addr in);
MSDN上本函数的原型描述为：unsigned long inet_addr( __in const char *cp);
in：一个表示Internet主机地址的结构。

烦：Windows和Linux不同。

# 3、inet_aton 
inet_aton是一个计算机函数，功能是将一个字符串IP地址转换为一个32位的网络序列IP地址。如果这个函数成功，函数的返回值非零，如果输入地址不正确则会返回零。使用这个函数并没有错误码存放在errno中，所以它的值会被忽略。

头文件：#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

完整描述：
>int inet_aton(const char *string, struct in_addr*addr);

```
int inet_aton(const char *cp, struct in_addr *inp);
in_addr_t inet_addr(const char *cp);
in_addr_t inet_network(const char *cp);
```
上面三个都可以将192.168.3.23ip地址转换成32位整数型ip，但是推荐使用inet_aton，因为另外两个无法识别255.255.255.255。http://blog.sina.com.cn/s/blog_698f90230100xwrq.html

# 4、大端、小端、网络字节序和主机字节序
[主机字节序与网络字节序](https://blog.csdn.net/hou09tian/article/details/82759758)
[大端、小端与网络字节序](https://www.cnblogs.com/curo0119/p/8361348.html)

- 大端（Big-Endian）就是高字节（MSB）在前，内存存储体现上，数据的高位更加靠近低地址。（低地址存高字节）

- 小端(Little-Endian)就是低字节（LSB）在前，内存存储体现上，数据的低位更加靠近低地址。（低地址存低字节）

- 网络字节序一般是指大端传输。


linux C中有个函数inet_aton可以将IPv4的字符串地址（xxx.xxx.xxx.xxx）转换成网络地址结构体 struct in_addr。 
```
struct in_addr {
    unsigned long int s_addr;
}
```

当通过 inet_aton转化后，返回结果中的 in_addr.s_addr 是网络字节序的。(记得要看具体的结构体)
“1.2.3.4”中的最高位“1”经过inet_aton转换后出现在最低的8bit中。
在mysql中也有inet_aton这个函数，也是将字符串IPv4地址转化成整形。但是经过转换后的4位整形却是主机字节序的。和linux的库函数正好相反。


函数里面 a 代表 ascii n 代表network.第一个函数表示将a.b.c.d的IP转换为32位的IP,存储在 inp指针里面.第二个是将32位IP转换为a.b.c.d的格式.

# 5、uint8_t\uint_16_t\uint32_t\uint64_t
参考：[浅析C语言之uint8_t / uint16_t / uint32_t /uint64_t](https://blog.csdn.net/Mary19920410/article/details/71518130)

1、这些类型的来源：这些数据类型中都带有_t, _t 表示这些数据类型是通过typedef定义的，而不是新的数据类型。也就是说，它们其实是我们已知的类型的别名。

2、使用这些类型的原因：方便代码的维护。比如，在C中没有bool型，于是在一个软件中，一个程序员使用int，一个程序员使用short，会比较混乱。最好用一个typedef来定义一个统一的bool：typedef char bool;

在涉及到跨平台时，不同的平台会有不同的字长，所以利用预编译和typedef可以方便的维护代码。

3、这些类型的定义：
在C99标准中定义了这些数据类型，具体定义在：/usr/include/stdint.h    ISO C99: 7.18 Integer types

4、格式化输出：
```
uint16_t %hu
uint32_t %u
uint64_t %llu
```
5、uint8_t类型的输出：
注意uint8_t的定义为
>typedef unsigned char           uint8_t;

uint8_t实际上是一个char。所以输出uint8_t类型的变量实际上输出其对应的字符，而不是数值。


# 6、无符号整型输出使用%u

# 7、c语言 编译 error: expected ';', ',' or ')' before '&' token
C语言中是不存在引用的，也就是说C语言中&表示的不是引用，仅仅是取地址符。使用指针或者改成c++。



# DHCP 
动态主机设置协议（英语：Dynamic Host Configuration Protocol，DHCP）是一个局域网的网络协议，使用UDP协议工作，主要有两个用途：用于内部网或网络服务供应商自动分配IP地址；给用户用于内部网管理员作为对所有计算机作中央管理的手段。


# [Linux下C获取所有可用网卡信息](https://www.cnblogs.com/fnlingnzb-learner/p/6427388.html)
使用ioctl函数虽然可以获取所有的信息，但是使用起来比较麻烦，如果不需要获取MAC地址，那么使用getifaddrs函数来获取更加方便与简洁。值得一提的是，在MacOS或iOS系统上（如iPhone程序开发），上述iotcl函数没法获得mac地址跟子网掩码，这个使用，使用getifaddrs函数便更有优势了。

http://blog.chinaunix.net/uid-29147497-id-4043423.html好像getifaddrs还可以获取到ipv6地址。

## 示例
https://blog.csdn.net/lyh2529/article/details/25957701
https://www.iteye.com/blog/naso-1815538


```
//必须先获得套接口清单，得到设备名，并导入进入才能获取其他的信息
//设备eth1、lo
//获取信息后保存在--.sa_data存在偏移，暂时没弄懂
#include <stdio.h>
#include <sys/socket.h>
#include <sys/types.h>
#include <netinet/in.h>

#include <sys/ioctl.h>
#include <net/if.h>

#include <unistd.h>
#include <arpa/inet.h>
#include <sys/param.h>
#include <net/if_arp.h>
#include <stdlib.h>
#include <string.h>

#define MAX_PHY_ADDR_LEN 32
 
int get_ip_mac_address(uint32_t &ip_addr, uint8_t mac_addr[MAX_PHY_ADDR_LEN])
{
    const int MAXINTERFACE = 16;
    int i, j;
    char *device = "eth0";
    struct ifreq ifr;
    struct ifconf ifc;
    struct ifreq buf[MAXINTERFACE];
    int sockfd, interface_num, err;

    ifc.ifc_len = sizeof(buf);
    ifc.ifc_buf = (__caddr_t)buf;

    if ((sockfd = socket(AF_INET, SOCK_DGRAM, 0)) < 0)
    {
        return -1;
    }
    err = ioctl(sockfd, SIOCGIFCONF, &ifc); // 获取所有接口信息
    if (0 != err)                               
    {
        return -1;
    }
    interface_num = ifc.ifc_len / sizeof(struct ifreq); // 由此知存在几个设备接口

    for (i = 1; i <= interface_num; i++)
    {
        if (0 == strcmp(device, buf[i].ifr_name)) {
            strcpy(ifr.ifr_name,buf[i].ifr_name); // 必须导入设备名才能正常获取信息
            err = ioctl(sockfd, SIOCGIFHWADDR, &ifr); // mac地址
            if (0 == err)
            {
                for (j = 0; j < 6; j++) 
                {
                    mac_addr[j] = (uint8_t)ifr.ifr_hwaddr.sa_data[j];
                }
            }
			mac_addr[6] = '0'; // 长度固定，末尾填充
			mac_addr[7] = '0';
			
            err = ioctl(sockfd, SIOCGIFADDR, &ifr); // ip地址
            if (0 == err)
            {
                char *ip = inet_ntoa(((struct sockaddr_in*)&(ifr.ifr_addr))->sin_addr);
				printf("%d\n", ((struct sockaddr_in*)&(ifr.ifr_addr))->sin_addr.s_addr);
				ip_addr = ((struct sockaddr_in*)&(ifr.ifr_addr))->sin_addr.s_addr;
            }
			else 
			{
				return -1;
			}
        }      
    }
    close(sockfd);
    return 0;
}
 
     LOG_INFO("hj ip = %d", _local_addr.s_addr);
    LOG_INFO("hj ip = %s", inet_ntoa(_local_addr));
int main()
{
    uint8_t mac_addr[6];
	uint32_t ip_addr;
    get_ip_mac_address(ip_addr, mac_addr);
    printf("ip addr: %d\n", ip_addr);
	
	in_addr ip;
	ip.s_addr = ip_addr;
	printf("sddasd%s:\n", inet_ntoa(ip));
	
    int i;
    for (i = 0; i < 6; i++) printf("%02x:\n", mac_addr[i]);
    return 0; 
}
```











