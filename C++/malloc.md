# 动态分配内存

内存泄露、踩内存很糟糕。

## 1、realloc、calloc、malloc区别
realloc：调用形式为(类型*)realloc(*ptr，size)：将ptr内存大小增大到size。(也可以缩小，缩小的内容消失)。
calloc ：调用形式为(类型*)calloc(n，size)：在内存的动态存储区中分配n块长度为“size”字节的连续区域，返回首地址。
malloc ：调用形式为(类型*)malloc(size)：在内存的动态存储区中分配一块长度为“size”字节的连续区域，返回该区域的首地址。

malloc 只管分配内存，并不能对所得的内存进行初始化，所以得到的一片新内存中，其值将是随机的。calloc在动态分配完内存后，自动初始化该内存空间为零。
1.如果 当前连续内存块足够realloc的话，只是将p所指向的空间扩大，并返回p的指针地址。这个时候q和p指向的地址是一样的。
2.如果 当前连续内存块不够长度，再找一个足够长的地方，分配一块新的内存q，并将p指向的内容copy到q，返回q。并将p所指向的内存空间删除。

```
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
    char s1[100];
    memset(s1, 0, sizeof(s1));
    char *s2 = (char *)malloc(sizeof(char) * 100);
	printf("uninit malloc s2[55]: %d\n", s2[55]);
    memset(s2, 0, sizeof(char) * 100);
    printf("init: %lu %lu %lu %lu %lu\n", sizeof(s1), sizeof(s2),  sizeof(char *), strlen(s1), strlen(s2));
    
	const char *str = "12345";
	memcpy(s1, str, sizeof(s1));
	strncpy(s2, str, sizeof(char)*100-1);
	printf("assign: %lu %lu %lu %lu %lu\n", sizeof(s1), sizeof(s2),  sizeof(char *), strlen(s1), strlen(s2));
	
	char *s3 = (char *)calloc(100, sizeof(char));
	printf("uninit calloc s3[55]: %d\n", s3[55]);
	
	s3 = (char *)realloc(s3, sizeof(char) * 200);
	printf("uninit realloc s3[155]: %d\n", s3[155]);
	return 0;
}
```

## 2、内存是否可以分段释放
https://bbs.csdn.net/topics/200019746
堆分配其实就是链表管理，每次申请内存产生一个节点，挂在busylist上，如果释放，那么就是把这个块从busylist上脱离，然后挂到freelist上，并且每个节点有头部记录上一节点位置，下一节点位置，以及本节点的大小


如按照你的做法，回收节点的一部分，那么好，下面有2个问题需要确定

1）每次被回收的内存也要被当作块，块就有头，记录了块大小等等消息，那么你这个块的块头是什么数据？不清楚，那么很可能就会破坏freelist

2)假如我再次使用malloc将你回收的内存分配出去了，但是你原先的块并不知道他的大小已经改变了啊...当整个快都被使用的时候，就有可能出现数据覆盖

```
#include <iostream>
#include <string>
#include <memory>
#include <stdlib.h>
#include <stdint.h>
using namespace std;

int main()
{
        uint8_t *data = (uint8_t *) malloc(1000);
        free(data + 100);
        //free(data);
        return 0;
}
```

## 3、tcmalloc

### 3-1、记一次 TCMalloc Debug 经历
https://zhuanlan.zhihu.com/p/37696341
在版本2.9.1没有复现该任何例子，仅仅能看看。

最后决定使用对应版本试试看：
```
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ cp libtcmalloc_debug.so.4.4.5 /usr/lib/libtcmalloc_debug.so.4
cp: cannot create regular file '/usr/lib/libtcmalloc_debug.so.4': Permission denied
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ sudo cp libtcmalloc_debug.so.4.4.5 /usr/lib/libtcmalloc_debug.so.4
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ sudo cp libtcmalloc.so.4.4.5 /usr/lib/libtcmalloc.so.4
[ubuntu@hj_arm_debain10:~/hj/gperftools-2.6.1/.libs] $ cd ../..
[ubuntu@hj_arm_debain10:~/hj] $ ./a.out
src/tcmalloc.cc:284] Attempt to free invalid pointer 0x5555e0508040
Aborted (core dumped)
```
最后的demo能复现，其余两个无法实现。


https://zhuanlan.zhihu.com/p/51432385

### 3-2、起因
修改代码测试的过程中偶现core在tcmalloc free，core出现的地方五花八门，有core在智能指针生命周期结束的时候，有的直接core在右值临时变量析构的时候。
排查过程
查看gperftools的issue，发现有很多人core在相同的地方，谷歌官方回复说这种错误的根因是因为程序的内存管理出了问题，比如访问已经被free的地址，double free等等。
顺着这个思路，一开始先入为主的认为是多线程竞态问题，改了好多代码，也用valgrind等方式查看内存错误。但是问题一直得不到解决。
最后把之前的改动bisect，找了好久，终于找到是某个字符串被double free了。

## 4、gperftools检查内存泄露/越界等问题的简易说明
https://www.shangmayuan.com/a/5e114526e02a4e7e9ee215e3.html


大名鼎鼎的Google的内存检查工具

在实际工程的Makefile中添加LIB库依赖.
通常来讲 -ltcmalloc就能够了
若是须要使用Profiler的功能，那么用 -ltcmalloc_and_profiler
若是须要检查数组越界等，那么须要用 -ltcmalloc_debug（会大大下降处理速度）

## 5、内存池
(Memory Pool)是一种内存分配方式，又被称为固定大小区块规划（fixed-size-blocks allocation）。通常我们习惯直接使用new、malloc等API申请分配内存，这样做的缺点在于：由于所申请内存块的大小不定，当频繁使用时会造成大量的内存碎片并进而降低性能。

```
内存池的实现有很多，性能和适用性也不相同，以下是一种较简单的C++实现 -- GenericMP模板类。（本例取材于《Online game server programming》一书）
在这个例子中，使用了模板以适应不同对象的内存需求，内存池中的内存块则是以基于链表的结构进行组织。
GenericMP模板类定义

template <class T, int BLOCK_NUM= 50>
class GenericMP
{
public:
    static VOID *operator new(size_t allocLen)
    {
        assert(sizeof(T) == allocLen);
        if(!m_NewPointer)
            MyAlloc();
        UCHAR *rp = m_NewPointer;
        m_NewPointer = *reinterpret_cast<UCHAR**>(rp); //由于头4个字节被“强行”解释为指向下一内存块的指针，这里m_NewPointer就指向了下一个内存块，以备下次分配使用。
        return rp;
    }
    
    static VOID operator delete(VOID *dp)
    {
        *reinterpret_cast<UCHAR**>(dp) = m_NewPointer;
        m_NewPointer = static_cast<UCHAR*>(dp);
    }
    
private:
    static VOID MyAlloc()
    {
        m_NewPointer = new UCHAR[sizeof(T) * BLOCK_NUM];
        UCHAR **cur = reinterpret_cast<UCHAR**>(m_NewPointer); //强制转型为双指针，这将改变每个内存块头4个字节的含义。
        UCHAR *next = m_NewPointer;
        for(INT i = 0; i < BLOCK_NUM-1; i++)
        {
            next += sizeof(T);
            *cur = next;
            cur = reinterpret_cast<UCHAR**>(next); //这样，所分配的每个内存块的头4个字节就被“强行“解释为指向下一个内存块的指针， 即形成了内存块的链表结构。
        }
        *cur = 0;
    }
    
    static UCHAR *m_NewPointer;

protected:
    ~GenericMP()
    {
    }
};

template<class T, int BLOCK_NUM >
UCHAR *GenericMP<T, BLOCK_NUM >::m_NewPointer;
GenericMP模板类应用
class ExpMP : public GenericMP<ExpMP>
{
    BYTE a[1024];
};

int _tmain(int argc, _TCHAR* argv[])
{
    ExpMP *aMP = new ExpMP();
    delete aMP;
}
```

## 6、pk
```
这样的一个测试程序，如果用jemalloc/tcmalloc链接运行，cpu的消耗在36%左右，而用glibc的malloc实现链接运行，cpu的消耗只有5.7%左右。
这个程序每10ms分配8M数据，写入数据后，再释放。

#include <stdio.h>
#include <stdint.h>
#include <time.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

uint8_t src_buf[1920*1080*4];

int main()
{
    int i = 0;
    uint8_t * dst_buf;
    int count;
    time_t record = 0;
    time_t new = 0;


    for(i = 0;i<10000;i++) {
        dst_buf = malloc(sizeof(src_buf));
        memcpy(dst_buf,src_buf,sizeof(src_buf));
        free(dst_buf);
        usleep(10000);
        count++;
        new = time(NULL);
        if(new != record) {
            printf("count %d per second\n",count);
            count = 0;
            record = new;
        }
    }

    return 0;
}
```

# calloc和malloc的区别
calloc和malloc都是C语言中用于动态分配内存的函数，但它们有一些不同之处。

malloc函数用于分配指定大小的内存块，返回一个指向该内存块的指针。这个内存块中的内容是未定义的，可能包含任意值。如果分配失败，malloc函数返回NULL指针。

calloc函数也用于分配内存块，但它需要两个参数：所需内存块的数量和每个内存块的大小。calloc函数会分配一个大小为“数量*大小”的内存块，并将其所有位初始化为0。如果分配失败，calloc函数也会返回NULL指针。

因此，calloc函数相对于malloc函数的优点是可以确保分配的内存块中的所有位都被初始化为0，而malloc函数则不提供这个保证。但是，由于calloc函数需要初始化内存块中的所有位，因此它可能比malloc函数稍微慢一些。

realloc 函数在重新分配内存时，会保留原有内存块中的数据，并将其复制到新的内存块中。如果新的内存块比原有内存块大，那么新增的内存空间将不会被初始化，其值是未定义的。如果新的内存块比原有内存块小，那么超出新内存块大小的部分将被截断，数据也会丢失。

因此，realloc 函数不会自动将新分配的内存初始化为0。如果需要将新分配的内存初始化为0，可以使用 calloc 函数来分配内存，它会将分配的内存初始化为0。

代码见：D:\Github\Storage\c++\standard_library\malloc\xalloc.c



