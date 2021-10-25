# htonl和ntohl函数

## 1、简介字节序
主机字节序：
就是自己的主机内部，内存中数据的处理方式，可以分为两种：
大端字节序（big-endian）：按照内存的增长方向，高位数据存储于低位内存中
小端字节序（little-endian）：按照内存的增长方向，高位数据存储于低位内存中

网络字节序：
网络字节序转化为主机字节序时，一定要注意是否需要转换。网络字节序是确定的。
网络字节顺序是TCP/IP中规定好的一种数据表示格式，它与具体的CPU类型、操作系统等无关，从而可以保证数据在不同主机之间传输时能够被正确解释。网络字节顺序采用big-endian（大端）排序方式。

## 2、深入理解字节序
网络字节序与主机字节序是经常导致混淆的两个概念，网络字节序是确定的，而主机字节序的多样性往往是混淆的原因。

我们知道数据在传输的过程中，一定有一个标准化的过程，也就是说：从主机a到主机b进行通信应该是这样的，
a的固有数据存储-------标准化--------转化成b的固有格式

如上而言：a或者b的固有数据存储格式就是自己的主机字节序，上面的标准化就是网络字节序（也就是大端字节序）
a的主机字节序----------网络字节序 ---------b的主机字节序

小结：网络字节序一定是大端，主机字节序不固定


数据：0x12345678
从左往右是内存地址增长的方向
低------------------->>>>高
大端字节序：12 34 56 78
小端字节序：78 56 34 12

验证：
```
#include <stdio.h>
#include <arpa/inet.h>

int main()
{
	unsigned long a = 0x12345678;
	unsigned char *p = (unsigned char *)(&a);

	printf("主机字节序:%0x    %0x   %0x   %0x\n",  p[0], p[1], p[2], p[3]);

	unsigned long b = htonl(a);  //将主机字节序转化成了网络字节序

	p = (unsigned char *)(&b);

	printf("网络字节序:%0x    %0x   %0x   %0x (大端字节序)\n",  p[0], p[1], p[2], p[3]);
	return 0;
}
```

# 3、htonl()函数
```
#include <arpa/inet.h>
uint32_t htonl(uint32_t hostlong);
uint16_t htons(uint16_t hostshort);
uint32_t ntohl(uint32_t netlong);
uint16_t ntohs(uint16_t netshort);
```

将主机数转换成无符号长整型的网络字节顺序。本函数将一个32位数从主机字节顺序转换成网络字节顺序。

h是主机host，n是网络net，l是长整形long，s是短整形short。

## 头文件 
>#include <arpa/inet.h>

有些系统包含的头文件是 <netinet/in.h>

## 定义函数
uint32_t htonl(uint32_t hostlong);

hostlong：主机字节顺序表达的32位数。

# 4、ntohl()函数
ntohl()指的是ntohl函数，是将一个无符号长整形数从网络字节顺序转换为主机字节顺序， ntohl()返回一个以主机字节顺序表达的数。

##  头文件
linux系统 ：#include <arpa/inet.h>
Windows系统 ：#include<Winsock2.h>

## 函数形式
uint32_t ntohl(uint32_t netlong);
netlong：一个以网络字节顺序表达的32位数。

# 5、htons() 不常用吧
将主机的无符号短整形数转换成网络字节顺序。hostshort：主机字节顺序表达的16位数。

## 头文件
#include <winsock.h>

## 定义函数
u_short PASCAL FAR htons( u_short hostshort);

hostshort：主机字节顺序表达的16位数。

# 6、ntohs()函数
ntohs()是一个函数名，作用是将一个16位数由网络字节顺序转换为主机字节顺序。

## 头文件
#include <netinet/in.h>

## 定义函数
uint16_t ntohs(uint16_t netshort);
netshort：一个以网络字节顺序表达的16位数。

linux IP地址转换及网络字节序
文献参考：

http://roclinux.cn/?p=1160



一、IP地址的表示法：

1、ASCII表示法：

210.25.132.181，也就是字符串形式，英语叫做IPv4 numbers-and-dots notation。

2、整型表示法：

3524887733，整数形式的IP地址，。英语叫做binary data。

二、IP地址的转换：

IPv4 :

1、inet_addr函数

#include <arpa/inet.h>

in_addr_t inet_addr(const char* strptr);

将字符串转换为32位二进制网络字节序的IPV4地址，即将一个点间隔地址转换成一个in_addr。

2、inet_ntoa函数

 #include <arpa/inet.h>

char* inet_ntoa(struct in_addr in);

将一个十进制网络字节序转换为点分十进制IP格式的字符串。

3、 inet_ntoa函数
#include <arpa/inet.h>

int inet_aton(const char *string, struct in_addr *addr);

是一个改进的方法来将一个字符串IP地址转换为一个32位的网络序列IP地址。

IPv6 :
1、inet_pton函数

2、inet_ntop函数

程序示例：

#Include <sys/types.h>

#include <sys/socket.h>

#include <arpa/inet.h>

strcut sockaddr_in   src;

src.sin_addr.s_addr   =  inet_addr("*.*.*.*");                 //构建网络地址。

printf("%s\n",inet_ntoa(src.sin_addr));                 //将网络地址转换成字符串。

三、本机字节顺序与网络字节顺序的转换
#include <arpa/inet.h>
htons  ------"host to network short"
htonl   -------"host to network long"
ntohs  -------"network to host short"
ntohl   -------"network to host long"

```
#include <winsock2.h>
#include <iostream>
 
#pragma comment(lib,"ws2_32.lib") 
using namespace std;
int main(){
    int a = 16, b;
    b = htons(a);
    cout << "a=" << a << endl;
    cout << "b=" << b << endl;
    return 0;
}
```
运行的结果如下图
a=16
b=4096

解释一下，数字16的16进制表示为0x0010，数字4096的16进制表示为0x1000。 由于Intel机器是小尾端，存储数字16时实际顺序为1000，存储4096时实际顺序为0010。因此在发送网络包时为了报文中数据为0010，需要经过htons进行字节转换。如果用IBM等大尾机器，则没有这种字节顺序转换，但为了程序的可移植性，也最好用这个函数。

in_addr_in   inet_addr(const char *strptr);

inet_addr的参数是一个：点分十进制字符串，返回的值为一个32位的二进制网络字节序的IPv4地址，不然的话就是：INADDR_NONE

而返回值为：in_addr_t:IPv4,一般为uint32_t

所以也可以定义为：unsigned long


char * inet_ntoa(struct in_addr inaddr);

参数是一个结构体，所以要调用必须先定义一个结构体。












