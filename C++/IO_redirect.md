# C++中I/O重定向

## freopen函数
将现有文件指针重定向到另一个流。
FILE * freopen ( const char * filename, const char * mode, FILE * stream );

## 流
C++中的流对象主要有三种类型:
istream : 此类型的流对象只能从流执行输入操作
ostream : 这些对象只能用于输出操作。
iostream : 可以同时用于输入和输出操作

---
所有流对象还具有类streambuf的关联数据成员。简单地说，streambuf对象是流的缓冲区。从流中读取数据时，我们不会直接从源中读取数据，而是从链接到源的缓冲区中读取数据。同样，首先在缓冲区上执行输出操作，然后在需要时刷新缓冲区（将其写入物理设备）。

我们可以使用函数 ios::rdbuf()来执行两次操作。
1) stream_object.rdbuf(): 返回流对象buffer
2) stream_object.rdbuf(streambuf * p): 绑定流对象buffer


