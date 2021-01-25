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
