# 数据对齐

## 1、字节
字节（Byte）是计算机信息技术用于计量存储容量的一种计量单位，也表示一些计算机编程语言中的数据类型和语言字符。Byte是从0-255的无符号类型，所以不能表示负数。

字节通常简写为“B”，而位通常简写为小写“b”，计算机存储器的大小通常用字节来表示。

一个英文字母（不分大小写）占一个字节的空间，一个中文汉字占两个字节的空间。英文标点占一个字节，中文标点占两个字节。
```
1字节(Byte)=8位(bit) 
1KB( Kilobyte，千字节)=1024B
1MB( Megabyte，兆字节)=1024KB 
1GB( Gigabyte，吉字节，千兆)=1024MB  
1TB( Trillionbyte，万亿字节，太字节)=1024GB
1PB( Petabyte，千万亿字节，拍字节)=1024TB 
1EB( Exabyte，百亿亿字节，艾字节)=1024PB 
1ZB(Zettabyte，十万亿亿字节，泽字节)=1024EB
1YB( Yottabyte，一亿亿亿字节，尧字节)=1024ZB
1BB( Brontobyte，千亿亿亿字节)=1024YB
```

## 2、字节顺序
应该注意到，多字节字段中的值是按照大末尾（big- endian）顺序规定的，具体来说就是最高位的字节出现在高位，而低位的字节出现在低位。这会引起工作在Intel平台上的程序员的迷感，因为在 Intel的平台上。数据是按照小末尾（little-endian）顺序存储的，高位的字节出现在低位。

## 3、#pragma pack
在所有的预处理指令中，#Pragma 指令可能是最复杂的了，它的作用是设定编译器的状态或者是指示编译器完成一些特定的动作。

常会遇到#pragma pack(n)，#pragma pack()，#pragma pack(pack,n)，#pragma pack(pop,n)等，其中n是可以省略的，并且这些语句一般出现在结构体前面。

#pragma pack 的主要作用就是改变编译器的内存对齐方式，这个指令在网络报文的处理中有着重要的作用，#pragma pack(n)是他最基本的用法，其作用是改变编译器的对齐方式， 不使用这条指令的情况下，编译器默认采取#pragma pack(8)也就是8字节的默认对齐方式，n值可以取（1， 2， 4， 8， 16） 中任意一值。


## 4、#pragma pack(show)
#pragma pack(show)显示当前内存对齐的字节数。也就是packing aligment。

使用VS软件编译时会给出当前对齐字节数警告。
>D:\Github\Storage\windows\StudySTL\study_program_pack.h(5,9): warning C4810: pragma pack(show) 的值 == 16

## 5、规则
每个特定平台上的编译器都有自己的默认“对齐系数”(也叫对齐模数)。程序员可以通过预编译命令#pragma pack(n)，n=1,2,4,8,16来改变这一系数，其中的n就是你要指定的“对齐系数”。

　　规则：

　　1、数据成员对齐规则：结构(struct)(或联合(union))的数据成员，第一个数据成员放在offset为0的地方，以后每个数据成员的对齐按照#pragma pack指定的数值和这个数据成员自身长度中，比较小的那个进行。(意思就是默认可能为2,但是数据成员有个是int类型为4,则此次按照2进行)

　　2、结构(或联合)的整体对齐规则：在数据成员完成各自对齐之后，结构(或联合)本身也要进行对齐，对齐将按照#pragma pack指定的数值和结构(或联合)最大数据成员长度中，比较小的那个进行。(和上面的意思同样)

n 字节的对齐方式 VC 对结构的存储的特殊处理确实提高 CPU 存储变量的速度，但是有时候也带来 了一些麻烦，我们也屏蔽掉变量默认的对齐方式，自己可以设定变量的对齐方式。 VC 中提供了#pragma pack(n)来设定变量以 n 字节对齐方式。n 字节对齐就是说 变量存放的起始地址的偏移量有两种情况：

第一、如果 n 大于等于该变量所占用的字节数，那么偏移量必须满足默认的对齐方式。(这里默认对齐方式指的是该变量的实际字节数)

第二、如果 n 小于该变量的类型所占用的字节数，那么偏移量为 n 的倍数，不用满足默认的对齐方式。结构的总大小也有个约束条件，分下面两种情况：如果 n 大于所有成员变量类型所占用的字节数，那么结构的总大小必须为占用空间最大的变量占用的空间数的倍数；否则必须为 n 的倍数。

## 6、划重点
其实之所以有内存字节对齐机制，就是为了最大限度的减少内存读取次数。我们知道CPU读取速度比内存读取速度快至少一个数量级，所以为了节省运算花费时间，只能以牺牲空间来换取时间了。
这里强制按照1字节进行对齐，可以理解成所有的内容都是按照1字节进行读取（暂且这样理解，因为这样可以很好的理解内存对齐机制），其他所有的数据成员都是1字节的整数倍，所以也就不用进行内存对其，各个成员在内存中就按照实际顺序进行排列。

## 7、总结
```
/*
* 默认的对齐系数大于等于整个struct的对齐系数情况：（不再看默认系统眼神行事）
* 1、首先找出整个struct的对齐系数
* 2、然后再根据对齐系数来进行补位
* 规则：只要多个连续的类型拼接在一起不超过对齐系数就不换行，超过就换行，缺省就补位
* 
* 默认的对齐系数小于整个struct的对齐系数情况：（成员系数是默认对齐系数的倍数则不需要补位）
* 1、成员系数小于默认对齐系数，则补位达到默认对齐系数
* 2、成员系数大于默认对齐系数，如果是它的倍数则不需要补位，否则需要补位到它的倍数
*/
```
详细例子见：D:\Github\Storage\windows\StudySTL\study_program_pack.h

## 8、字节对齐
硬件结构体中常常会定义各种各样的宏。如：
```
typedef struct EHCIqtd {
    uint32_t next;                    /* Standard next link pointer */
    uint32_t altnext;                 /* Standard next link pointer */
    uint32_t token;
#define QTD_TOKEN_DTOGGLE             (1 << 31)
#define QTD_TOKEN_TBYTES_MASK         0x7fff0000
#define QTD_TOKEN_TBYTES_SH           16
#define QTD_TOKEN_IOC                 (1 << 15)
#define QTD_TOKEN_CPAGE_MASK          0x00007000
#define QTD_TOKEN_CPAGE_SH            12
#define QTD_TOKEN_CERR_MASK           0x00000c00
#define QTD_TOKEN_CERR_SH             10
#define QTD_TOKEN_PID_MASK            0x00000300
#define QTD_TOKEN_PID_SH              8
#define QTD_TOKEN_ACTIVE              (1 << 7)
#define QTD_TOKEN_HALT                (1 << 6)
#define QTD_TOKEN_DBERR               (1 << 5)
#define QTD_TOKEN_BABBLE              (1 << 4)
#define QTD_TOKEN_XACTERR             (1 << 3)
#define QTD_TOKEN_MISSEDUF            (1 << 2)
#define QTD_TOKEN_SPLITXSTATE         (1 << 1)
#define QTD_TOKEN_PING                (1 << 0)

    uint32_t bufptr[5];               /* Standard buffer pointer */
#define QTD_BUFPTR_MASK               0xfffff000
#define QTD_BUFPTR_SH                 12
} EHCIqtd;
```

这时候地址如何计算，即：
```
addr = NLPTR_GET(q->qtdaddr);
if (get_dwords(q->ehci, addr +  8, &qtd.token,   1) < 0) {
    return 0;
}
barrier();
if (get_dwords(q->ehci, addr +  0, &qtd.next,    1) < 0 ||
    get_dwords(q->ehci, addr +  4, &qtd.altnext, 1) < 0 ||
    get_dwords(q->ehci, addr + 12, qtd.bufptr,
               ARRAY_SIZE(qtd.bufptr)) < 0) {
    return 0;
}
```

获取结构体地址，获取成员地址，内容拷贝，测试demo见：







