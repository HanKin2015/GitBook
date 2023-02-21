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

## 7、linux 共享内存 shm_open ，mmap的正确使用
参考：https://blog.csdn.net/ababab12345/article/details/102931841

在linux系统开发当中，时常需要在多个进程之间交换数据，在多个进程之间交换数据，有很多方法，但最高效的方法莫过于共享内存。

linux共享内存是通过tmpfs这个文件系统来实现的，tmpfs文件系的目录为/dev/shm，/dev/shm是驻留在内存 RAM 当中的，因此读写速度与读写内存速度一样，/dev/shm的容量默认尺寸为系统内存大小的一半大小，使用df -h命令可以看到。但实际上它并不会真正的占用这块内存，如果/dev/shm/下没有任何文件，它占用的内存实际上就是0字节，仅在使用shm_open文件时，/dev/shm才会真正占用内存。

### 7-1、int shm_open(const char *name, int oflag, mode_t mode);
功能说明：shm_open　用于创建或者打开共享内存文件。笔者认为shm_open 也许仅仅是系统函数open的一个包装，不同之处就是shm_open操作的文件一定是位于tmpfs文件系统里的，常见的Linux发布版的tmpfs文件系统的存放目录就是/dev/shm。

返回值:成功返回fd>0，  失败返回fd<0

参数说明：
name：要打开或创建的共享内存文件名，由于shm_open　打开或操作的文件都是位于/dev/shm目录的，因此name不能带路径，例如：/var/myshare 这样的名称是错误的，
      而myshare是正确的，因为 myshare 不带任何路径。如果你一定要在name添加路径，那么，请在/dev/shm目录里创建一个目录，例如，如果你想创建一个        bill/myshare 的共享内存文件，那么请先在/dev/shm目录里创建 bill这个子目录，由于不同厂家发布的linux系统的tmpfs的位置也许不是/dev/shm，因此带路径的名称也许在别的环境下打开不成功。
oflag：打开的文件操作属性：O_CREAT、O_RDWR、O_EXCL的按位或运算组合
mode：文件共享模式，例如 0777

### 7-2、void *mmap(void *addr, size_t length, int prot, int flags,int fd, off_t offset);
功能说明: 将打开的文件映射到内存，一般是将shm_open打开的文件映射到内存，当然也可以将硬盘上的用open函数打开的文件映射到内存。这个函数只是将文件映射到内存中，使得我们用操作内存指针的方式来操作文件数据。

参数说明：
addr：要将文件映射到的内存地址，一般应该传递NULL来由Linux内核指定。
length：要映射的文件数据长度。
prot：映射的内存区域的操作权限（保护属性），包括PROT_READ、PROT_WRITE、PROT_READ|PROT_WRITE
flags：标志位参数，包括：MAP_SHARED、MAP_PRIVATE与MAP_ANONYMOUS。
            MAP_SHARED:  建立共享，用于进程间通信，如果没有这个标志，则别的进程即使能打开文件，也看不到数据。
            MAP_PRIVATE: 只有进程自己用的内存区域
            MAP_ANONYMOUS:匿名映射区
fd：   用来建立映射区的文件描述符，用 shm_open打开或者open打开的文件。
offset：映射文件相对于文件头的偏移位置，应该按4096字节对齐。
返回值: 成功返回映射的内存地址指针，可以用这个地址指针对映射的文件内容进行读写操作，读写文件数据如同操作内存一样；如果 失败则返回NULL。

### 7-3、int munmap(void *addr, size_t length);
功能说明: 取消内存映射，addr是由mmap成功返回的地址，length是要取消的内存长度，munmap 只是将映射的内存从进程的地址空间撤销，如果不调用这个函数，则在进程终止前，该片区域将得不到释放。

### 7-4、int shm_unlink(const char *name);
功能说明：删除/dev/shm目录的文件，shm_unlink 删除的文件是由shm_open函数创建于/dev/shm目录的。可以用系统函数unlink来达到同样的效果，用/dev/shm + name 组成完整的路径即可，但一般不要这么做，因为系统的tmpfs的位置也许不是/dev/shm。用shm_open创建的文件，如果不调用此函数删除，会一直存在于/dev/shm目录里，直到操作系统重启或者调用linux命令rm来删除为止。

### 7-5、int ftruncate(int fd, off_t length);
功能说明：重置文件大小。任何open打开的文件都可以用这个函数，不限于shm_open打开的文件。




