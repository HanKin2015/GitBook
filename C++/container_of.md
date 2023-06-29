# container_of函数

问题引入代码：D:\Github\Storage\c++\container_of\do_upcast.c

## 1、源码
在linux 内核编程中，会经常见到一个宏函数container_of(ptr,type,member), 但是当你通过追踪源码时，像我们这样的一般人就会绝望了（这一堆都是什么呀？函数还可以这样定义？？？ 怎么还有0呢？？？  哎，算了，还是放弃吧。。。）。 这就是内核大佬们厉害的地方，随便两行代码就让我们怀疑人生，凡是都需要一个过程，慢慢来吧。

```
#define container_of(ptr, type, member) ({            \
    const typeof(((type *)0)->member) * __mptr = (ptr);    \
    (type *)((char *)__mptr - offsetof(type, member)); })
```
传入参数解析：
ptr   ：结构体成员变量的起始地址
type  ：结构体类型
member：结构体成员变量的名称

官方api解释：
container_of宏的作用是通过结构体内某个成员变量的地址和该变量名，以及结构体类型。找到该结构体变量的地址。这里使用的是一个利用编译器技术的小技巧，即先求得结构成员在结构中的偏移量，然后根据成员变量的地址反过来得出主结构变量的地址。

## 2、原理
参考：
    https://www.cnblogs.com/20180211lijunxin/articles/14591296.html
    https://blog.csdn.net/s2603898260/article/details/79371024
    
![](https://img-blog.csdn.net/20180225200001856)
原理很简单：已知结构体type的成员member的地址ptr，求解结构体type的起始地址。
```
type的起始地址 = ptr - size      (这里需要都转换为char *，因为它为单位字节)。
```
重点在于size如何计算？？？

## 3、offserof函数
原型：
```
#define offsetof(TYPE, MEMBER) ((size_t) &((TYPE *)0)->MEMBER)
```
讲解见第4节。

## 4、0 指针的使用
代码见：D:\Github\Storage\c++\container_of\0_pointer_useable.c
```
[root@ubuntu0006:~/cmake] #./a.out
sizeof(struct test) = 12
&temp = 0x7fff0b351630
&temp.k = 0x7fff0b351638
&((struct test *)0)->k = 8
```
什么意思看到了吧，自定义的结构体有三个变量：i，j，k。 因为有字节对齐要求，所以该结构体大小为4bytes * 3 =12 bytes.   而&（（struct test *）0）->k 的作用就是求 k到结构体temp起始地址的字节数大小（就是我们的size）。在这里0被强制转化为struct test *型， 它的作用就是作为指向该结构体起始地址的指针，就是作为指向该结构体起始地址的指针，就是作为指向该结构体起始地址的指针， 而&（（struct test *）0）->k  的作用便是求k到该起始指针的字节数。。。其实是求相对地址，起始地址为0，则&k的值便是size大小（注：打印时因为需要整型，所以有个int强转）所以我们便可以求我们需要的 size 了  。 好吧，一不小心把 offsetof() 函数的功能给讲完了。

## 5、内核编程的严谨性
```
const typeof( ((type *)0)->member ) *__mptr = (ptr);  
```
它的作用是什么呢？ 其实没什么作用（勿喷勿喷，让我把话说完），但就形式而言 _mptr = ptr,  那为什么要要定义一个一样的变量呢？？？ 其实这正是内核人员的牛逼之处：如果开发者使用时输入的参数有问题：ptr与member类型不匹配，编译时便会有warnning， 但是如果去掉改行，那个就没有了，而这个警告恰恰是必须的（防止出错有不知道错误在哪里）。

## 6、typeof
在C语言中，typeof是一个编译器扩展，用于获取一个表达式的数据类型。它的语法如下：
```
typeof (expression)
```
其中，expression是一个C语言表达式，可以是变量、常量、函数等。
typeof函数返回一个表示expression数据类型的编译器内部类型。例如，如果expression是一个整数变量，typeof将返回int类型。

typeof函数通常用于宏定义中，以便在编译时确定表达式的数据类型。例如，下面的宏定义可以用于计算两个数的最大值：
```
#define max(a, b) \
    ({ typeof (a) _a = (a); \
       typeof (b) _b = (b); \
       _a > _b ? _a : _b; })
```
在这个宏定义中，typeof用于获取变量a和b的数据类型，并将它们存储在_a和_b变量中。然后，宏定义使用这些变量来计算最大值。

## 7、总结
container_of（ptr, type,member）函数的实现包括两部分：
1.  判断ptr 与 member 是否为同意类型
2.  计算size大小，结构体的起始地址 = (type *)((char *)ptr - size)   (注：强转为该结构体指针)

现在我们知道container_of()的作用就是通过一个结构变量中一个成员的地址找到这个结构体变量的首地址。
container_of(ptr,type,member),这里面有ptr,type,member分别代表指针、类型、成员。
