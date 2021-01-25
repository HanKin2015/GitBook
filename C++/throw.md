
# 分配空间的时候是否需要判空

new是运算符啊，在标准C++中，是不会返回NULL的，如果内存分配失败的话，会抛出系统异常的。虽然CRT中的new可以返回Null，那也是在内存不足的时候。　
Beginning in Visual C++ .NET 2002, the CRT's new function (in libc.lib, libcd.lib, libcmt.lib, libcmtd.lib, msvcrt.lib, and msvcrtd.lib) will continue to return NULL if memory allocation fails. However, the new function in the Standard C++ Library (in libcp.lib, libcpd.lib, libcpmt.lib, libcpmtd.lib, msvcprt.lib, and msvcprtd.lib) will support the behavior specified in the C++ standard, which is to throw a std::bad_alloc exception if the memory allocation fails. 



# 因此

new A()从来就不可能返回NULL，如果在这个过程中用完了内存，那么他就会抛出bad_alloc异常，绝对不会返回NULL，如果你想让他返回null，应该用new(nothrow) A(),而不是new A()。不过从异常的观点来看，这实际上是一种倒退，我们应该尽量回避。Effective C++上也是这么说的！
————————————————
版权声明：本文为CSDN博主「专注客户端技术」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/a20102110080212/article/details/10223665

虽然也会出现低版本vc需要检查。


c++在new空间的时候是不需要判断是否为空NULL，因为如果分配失败会抛出异常。但是malloc则需要。

```
标准 C++ 亦提供了一个方法来抑制 new 抛出异常，而返回空指针：

int* p = new (std::nothrow) int; // 这样如果 new 失败了，就不会抛出异常，而是返回空指针
if ( p == NULL ) // 如此这般，这个判断就有意义了
	return -1;
// 其它代码
```

```
如果你想检查 new 是否成功，应该捕捉异常：

try {
	int* p = new int[SIZE];
	// 其它代码
} catch ( const bad_alloc& e ) {
	return -1;
}
```

至少要检查是否失败，然后写日志，不然程序崩了你连崩在哪里都不知道。

然后，我个人一般不喜欢用会抛异常的new，而是用new (std::nothrow) int，然后检查指针是否为空。









