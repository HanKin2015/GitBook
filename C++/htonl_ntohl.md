# htonl和ntohl函数

# 1、htonl()函数
将主机数转换成无符号长整型的网络字节顺序。本函数将一个32位数从主机字节顺序转换成网络字节顺序。

## 头文件 
>#include <arpa/inet.h>

有些系统包含的头文件是 <netinet/in.h>

## 定义函数
uint32_t htonl(uint32_t hostlong);

hostlong：主机字节顺序表达的32位数。

# 2、ntohl()函数
ntohl()指的是ntohl函数，是将一个无符号长整形数从网络字节顺序转换为主机字节顺序， ntohl()返回一个以主机字节顺序表达的数。

##  头文件
linux系统 ：#include <arpa/inet.h>
Windows系统 ：#include<Winsock2.h>

## 函数形式
uint32_t ntohl(uint32_t netlong);
netlong：一个以网络字节顺序表达的32位数。

# 3、htons() 不常用吧
将主机的无符号短整形数转换成网络字节顺序。hostshort：主机字节顺序表达的16位数。

## 头文件
#include <winsock.h>

## 定义函数
u_short PASCAL FAR htons( u_short hostshort);

hostshort：主机字节顺序表达的16位数。

# 4、ntohs()函数
ntohs()是一个函数名，作用是将一个16位数由网络字节顺序转换为主机字节顺序。

## 头文件
#include <netinet/in.h>

## 定义函数
uint16_t ntohs(uint16_t netshort);
netshort：一个以网络字节顺序表达的16位数。

linux IP地址转换及网络字节序

17Pirate 2016-05-06 14:44:16  2938  收藏 1
分类专栏： linux网络编程
版权
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

