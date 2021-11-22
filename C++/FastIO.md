# Fast I/O for Competitive Programming

## 1、竞赛中的读取优化
https://www.geeksforgeeks.org/fast-io-for-competitive-programming/
https://blog.csdn.net/kaixinqi/article/details/102629160

## 2、内存中FastIO
开启该选项后，虚拟机所有磁盘都将使用FastIO磁盘，能够大幅提升虚拟机的磁盘IO性能。只有安装了性能优化工具才能编辑此项。


文件系统除了处理正常的IRP 之外，还要处理所谓的FastIo.FastIo是Cache Manager 调用所引发的一种没有irp 的请求。换句话说，除了正常的Dispatch Functions 之外，你还得为DriverObject 撰写另一组Fast Io Functions.这组函数的指针在driver->FastIoDispatch.

I/O管理起在进行I/O操作时，首先查看该设备是否支持fast io。也就是fast io dispach 的哪张表项是否为空，如果不为空，则调用之，当发现函数返回值为FALSE时，才build a Irp ,然后下传。

首先需要了解的是:FastIo 是独立于普通的处理IRP 的分发函数之外的另一组接口。但是他们的作用是一样的，就是由驱动处理外部给予的请求。而且所处理的请求也基本相同。其次，文件系统的普通分发例程和fastio 例程都随时有可能被调用。做好的过滤驱动显然应该同时过滤这两套接口。

FASTIO 是一套IO MANAGER 与DEVICE DRIVER 沟通的另外一套API. 在进行基于IRP 为基础的接口调用前, IO MANAGER 会尝试使用FAST IO 接口来加速各种IO 操作.






