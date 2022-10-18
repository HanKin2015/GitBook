# container_of函数

## 1、源码
在linux 内核编程中，会经常见到一个宏函数container_of(ptr,type,member), 但是当你通过追踪源码时，像我们这样的一般人就会绝望了（这一堆都是什么呀？ 函数还可以这样定义？？？ 怎么还有0呢？？？  哎，算了，还是放弃吧。。。）。 这就是内核大佬们厉害的地方，随便两行代码就让我们怀疑人生，凡是都需要一个过程，慢慢来吧。
```
#define container_of(ptr, type, member) ({            \
    const typeof(((type *)0)->member) * __mptr = (ptr);    \
    (type *)((char *)__mptr - offsetof(type, member)); })
```
传入参数解析：
　　　　ptr：结构体成员变量的起始地址
　　　　type：结构体类型
　　　　member：结构体成员变量的名称　　　　

官方api解释：
　　　　container_of宏的作用是通过结构体内某个成员变量的地址和该变量名，以及结构体类型。找到该结构体变量的地址。这里使用的是一个利用编译器技术的小技巧，即先求得结构成员在结构中的偏移量，然后根据成员变量的地址反过来得出主结构变量的地址。

## 2、原理
参考：
    https://www.cnblogs.com/20180211lijunxin/articles/14591296.html
    https://blog.csdn.net/s2603898260/article/details/79371024
    
![](https://img-blog.csdn.net/20180225200001856)
原理很简单：  已知结构体type的成员member的地址ptr，求解结构体type的起始地址。
type的起始地址 = ptr - size      (这里需要都转换为char *，因为它为单位字节)。

重点在于size如何计算？？？

## 3、offserof函数

原型：
#define offsetof(TYPE, MEMBER) ((size_t) &((TYPE *)0)->MEMBER)



