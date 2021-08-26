# 学习mmap

## 1、mmap （一种内存映射文件的方法）
mmap将一个文件或者其它对象映射进内存。文件被映射到多个页上，如果文件的大小不是所有页的大小之和，最后一个页不被使用的空间将会清零。mmap在用户空间映射调用系统中作用很大。

注意头文件： <sys/mman.h>
函数原型：
void* mmap(void* start, size_t length, int prot, int flags, int fd, off_t offset);
int munmap(void* start, size_t length);

## 2、Linux c中使用mmap出现Permission denied
出现create mmap error: Permission denied的原因是大部分的硬件设计都不支持在没有读取权限的情况下执行写操作。(或者你可以理解为mmap把文件的内容读到内存时隐含了一次读取操作)
所以在open中应该使用O_RDWR代替O_WRONLY。

我知道问题处在哪里啦 fd = open("test.txt", O_RDWR | O_CREAT); 的第二个参数O_RDWR | O_CREAT 和 buf = (char *)mmap(NULL, MAX_SIZE, PROT_WRITE, MAP_SHARED, fd, 0); 的第三个参数PROT_WRITE 不对应，应该对应上，不然冲突。

## 3、条件
mmap()必须以PAGE_SIZE为单位进行映射，而内存也只能以页为单位进行映射，若要映射非PAGE_SIZE整数倍的地址范围，要先进行内存对齐，强行以PAGE_SIZE的倍数大小进行映射。

## 4、设备操作
mmap操作提供了一种机制，让用户程序直接访问设备内存，这种机制，相比较在用户空间和内核空间互相拷贝数据，效率更高。在要求高性能的应用中比较常用。mmap映射内存必须是页面大小的整数倍，面向流的设备不能进行mmap，mmap的实现和硬件有关。

## 5、系统调用
mmap()系统调用使得进程之间通过映射同一个普通文件实现共享内存。普通文件被映射到进程地址空间后，进程可以像访问普通内存一样对文件进行访问，不必再调用read()，write（）等操作。
注：实际上，mmap()系统调用并不是完全为了用于共享内存而设计的。它本身提供了不同于一般对普通文件的访问方式，进程可以像读写内存一样对普通文件的操作。而Posix或System V的共享内存IPC则纯粹用于共享目的，当然mmap()实现共享内存也是其主要应用之一。

## 6、示例
https://baike.baidu.com/item/mmap/1322217?fr=aladdin
源码：D:\Github\Storage\linux\mmap

输出结果：
```
[root@ubuntu0006:/media/hankin/vdb/study] #./read data_mmap
总线错误
[root@ubuntu0006:/media/hankin/vdb/study] #./read data_mmap
name:b age20;
name:c age21;
name:d age22;
name:e age23;
name:f age24;
name:g age25;
name:h age26;
name:i age27;
name:j age28;
name:k age29;
[root@ubuntu0006:/media/hankin/vdb/study] #./read data_mmap
name:b age20;
name:c age21;
name:d age22;
name:e age23;
name:f age24;
name: age0;
name: age0;
name: age0;
name: age0;
name: age0;
[root@ubuntu0006:/media/hankin/vdb/study] #cat data_mmap
bcdef[root@ubuntu0006:/media/hankin/vdb/study] #
```

神奇的事情：
- 直接cat读取data_mmap是读取不全的
- vim读取有乱码，file命令查看是data类型
- 但是使用程序读取能读取完整


