# windows相关知识

## 脑裂计算机术语
英文称为“Split-Brain”。
脑裂是因为cluster分裂导致的，cluster集群中节点因为处理器忙或者其他原因暂时停止响应时，其他节点可能误认为该节点“已死”，从而夺取共享磁盘（即资源）的访问权，此时极有可能假死节点重新对共享文件系统产生读写操作,从而导致共享磁盘文件系统损坏。


## win10恢复照片查看程序
https://jingyan.baidu.com/article/455a9950bb20bda166277824.html

## 如何查看一个exe程序的位数
使用linux的file命令

Magic 域是一个幻数值，在 WinNT.h 里定义了一些常量值：
```
#define IMAGE_NT_OPTIONAL_HDR32_MAGIC      0x10b
#define IMAGE_NT_OPTIONAL_HDR64_MAGIC      0x20b
#define IMAGE_ROM_OPTIONAL_HDR_MAGIC       0x107
```
值 0x10b 说明这个 image 是 32 位的，PE 文件格式是 PE32
值 0x20b 说明这个 image 是 64 位的，PE 文件格式是 PE32+
PE32+ 代表的扩展的 PE 文件格式，扩展为 64 位。在 PE 文件规范中并没有 PE64 这种文件格式，Microsoft 官方的判断 image 文件是 32 位还是 64 位的方法就是通过Magic 的值来确定。

最简单的方法，用记事本或者notepad++打开exe文件，在第二段中找到PE两个字母，在其后的不远出会出现d? 或者L。若是d，则证明该程序是64位；若是L，则证明是32位。







