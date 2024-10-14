# htonl和ntohl函数

示例：D:\Github\Storage\c++\study\endian\htonl_example.c

## 1、什么是字节序
主机字节序：
就是自己的主机内部，内存中数据的处理方式，可以分为两种：
大端字节序（big-endian）：按照内存的增长方向，高位数据存储于低位内存中
小端字节序（little-endian）：按照内存的增长方向，高位数据存储于高位内存中

网络字节序：
网络字节序转化为主机字节序时，一定要注意是否需要转换。网络字节序是确定的。
网络字节顺序是TCP/IP中规定好的一种数据表示格式，它与具体的CPU类型、操作系统等无关，从而可以保证数据在不同主机之间传输时能够被正确解释。**网络字节顺序采用big-endian（大端）排序方式。**

## 2、深入理解字节序
网络字节序与主机字节序是经常导致混淆的两个概念，网络字节序是确定的，而主机字节序的多样性往往是混淆的原因。

我们知道数据在传输的过程中，一定有一个标准化的过程，也就是说：从主机a到主机b进行通信应该是这样的，
a的固有数据存储-------标准化--------转化成b的固有格式

如上而言：a或者b的固有数据存储格式就是自己的主机字节序，上面的标准化就是网络字节序（也就是大端字节序）
a的主机字节序----------网络字节序 ---------b的主机字节序

小结：网络字节序一定是大端，主机字节序不固定

大端字节序（big-endian）   ：按照内存的增长方向，高位数据存储于低位内存中
小端字节序（little-endian）：按照内存的增长方向，高位数据存储于高位内存中

数据：0x12345678
从左往右是内存地址增长的方向（可以理解为USB数据包，后面来的数据需要往高位内存中存储）
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

[root@ubuntu0006:~] #./a.out
主机字节序:78    56   34   12
网络字节序:12    34   56   78 (大端字节序)
[root@ubuntu0006:~] #lscpu | grep Byte
Byte Order:            Little Endian
```

## 3、所有相关函数
```
网络和主机字节序之间转换
#include <arpa/inet.h>
uint32_t htonl(uint32_t hostlong);      "host to network long"
uint16_t htons(uint16_t hostshort);     "host to network short"
uint32_t ntohl(uint32_t netlong);       "network to host long"
uint16_t ntohs(uint16_t netshort);      "network to host short"

大小端和主机字节序之间转换
#include <endian.h>
uint16_t htobe16(uint16_t host_16bits);
uint16_t htole16(uint16_t host_16bits);
uint16_t be16toh(uint16_t big_endian_16bits);
uint16_t le16toh(uint16_t little_endian_16bits);

uint32_t htobe32(uint32_t host_32bits);
uint32_t htole32(uint32_t host_32bits);
uint32_t be32toh(uint32_t big_endian_32bits);
uint32_t le32toh(uint32_t little_endian_32bits);

uint64_t htobe64(uint64_t host_64bits);
uint64_t htole64(uint64_t host_64bits);
uint64_t be64toh(uint64_t big_endian_64bits);
uint64_t le64toh(uint64_t little_endian_64bits);
```
将主机数转换成无符号长整型的网络字节顺序。本函数将一个32位数从主机字节顺序转换成网络字节顺序。

h是主机host，n是网络net，l是长整形long，s是短整形short。
一定是无符号的。

### 3-1、头文件 
```
#include <arpa/inet.h>
```
有些系统包含的头文件是 <netinet/in.h>

### 3-2、定义函数
```
uint32_t htonl(uint32_t hostlong);
```

hostlong：主机字节顺序表达的32位数。

## 4、ntohl()函数
将一个无符号长整型数从网络字节顺序转换为主机字节顺序， ntohl()返回一个以主机字节顺序表达的数。

### 4-1、头文件
linux系统 ：#include <arpa/inet.h>
Windows系统 ：#include<Winsock2.h>

### 4-2、函数形式
uint32_t ntohl(uint32_t netlong);
netlong：一个以网络字节顺序表达的32位数。

## 5、htons() 不常用吧
将主机的无符号短整型数转换成网络字节顺序。hostshort：主机字节顺序表达的16位数。

### 5-1、头文件
#include <winsock.h>

### 5-2、定义函数
u_short PASCAL FAR htons( u_short hostshort);
hostshort：主机字节顺序表达的16位数。

### 5-3、示例
```
#include <winsock2.h>
#include <iostream>

// 注意需要引入lib文件
#pragma comment(lib,"ws2_32.lib") 
using namespace std;

int main()
{
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

## 6、ntohs()函数
ntohs()是一个函数名，作用是将一个16位数由网络字节顺序转换为主机字节顺序。

### 6-1、头文件
#include <netinet/in.h>

### 6-2、定义函数
uint16_t ntohs(uint16_t netshort);
netshort：一个以网络字节顺序表达的16位数。

linux IP地址转换及网络字节序
文献参考：

http://roclinux.cn/?p=1160

## 7、htole32函数
htole32函数是一个用于将32位整数从主机字节序转换为小端字节序的函数。在大多数计算机系统中，整数的字节序是按照主机字节序存储的，即高位字节在前，低位字节在后。而在一些网络协议和文件格式中，要求使用小端字节序存储数据，即低位字节在前，高位字节在后。htole32函数可以将主机字节序的32位整数转换为小端字节序的32位整数，以便在网络传输或文件读写时使用。

在C语言中，htole32函数通常定义在头文件<endian.h>中，函数原型如下：
```
#include <endian.h>
uint32_t htole32(uint32_t hostlong);
```
其中，hostlong参数是主机字节序的32位整数，返回值是小端字节序的32位整数。

使用本文第2节的代码进行修改，并且第2节有小白版本解释，这节详细代码见：D:\Github\Storage\c++\study\endian\htole32_example.c

因为网络字节序一定是大端字节序，那么也就是说htonl函数就是转换为大端字节序函数。


