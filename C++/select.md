# select函数

## 1、exit(EXIT_FAILURE)
EXIT_SUCCESS和EXIT_FAILURE是两个常量。一般EXIT_SUCCESS=0，EXIT_FAILURE=1。

exit()函数先处理完上面你列出的许多后事，最后将它的参数返回给操作系统作为exit status。所以从exit函数本身执行来说并没有什么不同。不同的是操作系统对这个exit status的解释。一般0表示程序寿终正寝，1表示死于非命。

## 2、select函数 语音 编辑 讨论 上传视频
select()的机制中提供一fd_set的数据结构，实际上是一long类型的数组， 每一个数组元素都能与一打开的文件句柄（不管是Socket句柄，还是其他 文件或命名管道或设备句柄）建立联系，建立联系的工作由程序员完成， 当调用select()时，由内核根据IO状态修改fd_set的内容，由此来通知执 行了select()的进程哪一Socket或文件可读或可写。主要用于Socket通信当中!











