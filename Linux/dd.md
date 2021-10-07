# dd命令

## 1、Linux 中用 dd 命令来测试硬盘读写速度
dd命令是一个非常强大的命令，对于一些比较底层的问题，使用dd命令往往可以得到出人意料的效果。我们可以用它来测试磁盘的读写性能。
https://blog.csdn.net/menogen/article/details/38059671

dd如何绕开cache
如果要规避掉文件系统cache,直接读写,不使用buffer cache，需做这样的设置
iflag=direct,nonblock
oflag=direct,nonblock
iflag=cio
oflag=cio
direct 模式就是把写入请求直接封装成io 指令发到磁盘
非direct 模式，就把数据写入系统缓存，然后就认为io 成功，并由操作系统决定缓存中的数据什么时候被写入磁盘


1) time有计时作用，dd用于复制，从if读出，写到of；
2) if=/dev/zero（产生字符）不产生IO，因此可以用来测试纯写速度；
3) 同理of=/dev/null（回收站、无底洞）不产生IO，可以用来测试纯读速度；
4) 将/tmp/test拷贝到/var则同时测试了读写速度；
5) bs是每次读或写的大小，即一个块的大小，count是读写块的数量。


命令结尾添加oflag=direct将跳过内存缓存，添加oflag=sync将跳过hdd缓存。

## 2、对于U盘测试
4、测试同时读写能力
time dd if=/dev/sdb of=/testrw.dbf bs=4k
在这个命令下，一个是物理分区，一个是实际的文件，对它们的读写都会产生IO（对/dev/sdb是读，对/testrw.dbf是写），假设它们都在一个磁盘中，这个命令就相当于测试磁盘的同时读写能力。

5、测试纯写入性能
dd if=/dev/zero of=test bs=8k count=10000 oflag=direct

6、测试纯读取性能
dd if=test of=/dev/null bs=8k count=10000 iflag=direct

综上可知：肯定纯读写不切合实际。
https://www.cnblogs.com/sylar5/p/6649009.html

## 3、附上本人实战中代码
```
测试U盘写能力
dd if=/home/write.zip of=/media/mnt/write.zip oflag=direct

测试U盘读能力
dd of=/home/write.zip if=/media/mnt/write.zip iflag=direct

测试纯写入能力
dd if=/dev/zero of=test bs=376M count=1 oflag=direct

测试纯读取能力
dd if=test of=/dev/null bs=376M count=1 iflag=direct

注意需要每次拔插一次U盘
```

cp命令有缓存功能，即使U盘拔插了也无法准确测试。
发现硬盘使用sync，U盘使用direct比较准确。
告知只有测试写能力时才需要oflag参数（未验证）
















