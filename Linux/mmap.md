# 学习mmap

Linux c中使用mmap出现Permission denied
出现create mmap error: Permission denied的原因是大部分的硬件设计都不支持在没有读取权限的情况下执行写操作。(或者你可以理解为mmap把文件的内容读到内存时隐含了一次读取操作)
所以在open中应该使用O_RDWR代替O_WRONLY

我知道问题处在哪里啦 fd = open("test.txt", O_RDWR | O_CREAT); 的第二个参数O_RDWR | O_CREAT 和 buf = (char *)mmap(NULL, MAX_SIZE, PROT_WRITE, MAP_SHARED, fd, 0); 的第三个参数PROT_WRITE 不对应，应该对应上，不然冲突 




