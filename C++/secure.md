# 使用安全函数编程

```
static
__attribute__
#if
#ifdef
#endif
#undef
...
va_list
va_start
va_end
va_copy
vsnprintf

snprintf

fopen
fread
fgets
fscanf
fprintf
fclose

fd：open
无类型void指针参数好处：传进来后方便强制转换成其他格式，常常给struct，可以自动分配位置。
f
side bar：侧边栏

uint8_t

getopt.h
poll.h
fcntl.h
signal.h
socket.h
types.h
time.h
netdb.h
netinet/in.h
对于这些我一般很少遇到的头文件，建议使用一下常用的函数例子



#define debug "abcd" "234"

or

cout << "abc" "123" << endl;
都是正确的语法。

dump：垃圾场、抛弃
```


## 需要理解

### realloc、calloc、malloc
```
realloc：调用形式为(类型*)realloc(*ptr，size)：将ptr内存大小增大到size。(也可以缩小，缩小的内容消失)。
calloc：调用形式为(类型*)calloc(n，size)：在内存的动态存储区中分配n块长度为“size”字节的连续区域，返回首地址。
malloc：调用形式为(类型*)malloc(size)：在内存的动态存储区中分配一块长度为“size”字节的连续区域，返回该区域的首地址。

malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。calloc在动态分配完内存后，自动初始化该内存空间为零。
1.如果 当前连续内存块足够 realloc 的话，只是将p所指向的空间扩大，并返回p的指针地址。 这个时候 q 和 p 指向的地址是一样的。
2.如果 当前连续内存块不够长度，再找一个足够长的地方，分配一块新的内存，q，并将 p指向的内容 copy到 q，返回 q。并将p所指向的内存空间删除。

allocate：分配
博客：https://www.cnblogs.com/zhangyabin---acm/p/3188076.html
```
## 0和NULL

在不同的系统中，NULL并非总是和0等同，NULL仅仅代表空值，也就是指向一个不被使用的地址，在大多数系统中，都将0作为不被使用的地址，所以就有了类似这样的定义
```
#define NULL 0
```
但并非总是如此，也有些系统不将0地址作为NULL，而是用其他的地址，所以说，千万别将NULL和0等价起来，特别是在一些跨平台的代码中，这更是将给你带来灾难。

## MTU
https://yq.aliyun.com/articles/222535

## UEFI  &  EFI  &  BIOS
https://blog.csdn.net/ZhangSong051052/article/details/80670970




