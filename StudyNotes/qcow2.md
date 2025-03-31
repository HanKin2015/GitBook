# qcow2镜像

QCOW2镜像格式是Qemu支持的磁盘镜像格式之一。它可以使用一个文件来表示一个固定大小的块设备。与Raw镜像格式相比，QCOW2具有如下优点：

1. 更小的文件大小，即便不支持holes（稀疏文件）的文件系统同样适用
2. 支持写时拷贝(COW, Copy-on-write)，QCOW2镜像只反映底层磁盘镜像所做的修改
3. 支持快照，QCOW2镜像可以包含镜像历史的多重快照
4. 支持基于zlib的数据压缩
5. 支持AES加密

qemu-img是管理镜像文件文件最常用的命令，使用方法如下：

\# 创建一个名为test.qcow2，大小为4G的qcow2镜像

$ qemu-img create -f qcow2 test.qcow2 4G

\# 将QCOW2格式的test.qcow2文件转换成raw格式的test.img文件

$ qemu-img convert test.qcow2 -O raw test.img



KVM虚拟机镜像对于物理机的操作系统来讲是一个文件，这个文件最主要的两种格式，一种是raw，也即原始格式，还有一种是qcow2，顾名思义cow是copy on write。

**qcow2是动态的**

即便文件系统不支持sparse file，文件大小也很小

qcow2功能一：copy on write