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









