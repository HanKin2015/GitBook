# Shell中的2>/dev/null

https://blog.csdn.net/gramdog/article/details/80374119

## 1、文件描述符
Linux系统预留可三个文件描述符：0、1和2，他们的意义如下所示：

0——标准输入（stdin）
1——标准输出（stdout）
2——标准错误（stderr）

### 1-1、标准输出——stdout
假设:在当前目录下，有且只有一个文件名称为123.txt的文件，这时我们运行这个命令【ls 123.txt】,就会获得一个标准输出stdout的输出结果：123.txt
```
[root@ubuntu0006:~/cmake] #touch 123.txt
[root@ubuntu0006:~/cmake] #ll
总用量 8
drwxr-xr-x  2 root root 4096 6月  25 15:16 ./
drwx------ 38 root root 4096 6月  25 11:20 ../
-rw-r--r--  1 root root    0 6月  25 15:16 123.txt
[root@ubuntu0006:~/cmake] #ls 123.txt
123.txt
[root@ubuntu0006:~/cmake] #ls 123.txt 1>/dev/null
[root@ubuntu0006:~/cmake] #
```

### 1-2、错误输出——stderr
按照上面的假设，我们运行另一条命令【ls abc.txt】，这样我们就会获得一个标准错误stderr的输出结果“ls：无法访问abc.txt：没有那个文件或目录”。
```[root@ubuntu0006:~/cmake] #ls abc.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
[root@ubuntu0006:~/cmake] #ls abc.txt 2>/dev/null
[root@ubuntu0006:~/cmake] #
```

## 2、重定向
重定向的符号有两个：>或>>，两者的区别是：前者会先清空文件，然后再写入内容，后者会将重定向的内容追加到现有文件的尾部。举个例子：

### 2-1、重定向标准输出stdout
如上图所示，对比没有添加重定向的操作，这条命令在使用之后并没有将123.txt打印到屏幕。在紧接的cat操作后，可以发现本来应该被输出的内容被记录到stdout.txt中。
```
[root@ubuntu0006:~/cmake] #ls 123.txt 1>/dev/null
[root@ubuntu0006:~/cmake] #ls 123.txt 1>stdout.txt
[root@ubuntu0006:~/cmake] #cat stdout.txt
123.txt
[root@ubuntu0006:~/cmake] #ll
总用量 12
drwxr-xr-x  2 root root 4096 6月  25 15:19 ./
drwx------ 38 root root 4096 6月  25 11:20 ../
-rw-r--r--  1 root root    0 6月  25 15:16 123.txt
-rw-r--r--  1 root root    8 6月  25 15:19 stdout.txt
```

### 2-2、重定向错误输出
同理。

### 2-3、可以将stderr单独定向到一个文件，stdout重定向到另一个文件
```
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
123.txt
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt 2>stderr.txt 1>stdout.txt
[root@ubuntu0006:~/cmake] #cat stderr.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
[root@ubuntu0006:~/cmake] #cat stdout.txt
123.txt
```

### 2-4、也可以将stderr和stdout重定向到同一个文件
```
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt >output.txt 2>&1
[root@ubuntu0006:~/cmake] #cat output.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
123.txt
```

或采用下面的两个方法，两个表达式效果一样的，可以少写几个字，能达到同样的效果
```
[root@ubuntu0006:~/cmake] #rm output.txt
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt &>output.txt
[root@ubuntu0006:~/cmake] #cat output.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
123.txt
[root@ubuntu0006:~/cmake] #rm output.txt
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt >&output.txt
[root@ubuntu0006:~/cmake] #cat output.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
123.txt
```

## 3、Linux特殊文件

### 3-1、null
/dev/null是一个特殊的设备文件，这个文件接收到任何数据都会被丢弃。因此，null这个设备通常也被称为位桶（bit bucket）或黑洞。

所以，2>/dev/null的意思就是将标准错误stderr删掉。

### 3-2、zero
/dev/zero 是一个特殊的设备文件，它在 Unix 和类 Unix 系统中存在。它是一个无限长度的字节流，每个字节都是零。当从 /dev/zero 中读取时，将返回无限数量的零字节。这个设备文件通常用于创建一个指定大小的空文件或清空一个文件的内容。在 Linux 系统中，可以使用 dd 命令将 /dev/zero 的内容写入文件中，以创建一个指定大小的空文件，例如：
```
dd if=/dev/zero of=myfile bs=1M count=10
```
这个命令将创建一个名为 myfile 的文件，大小为 10MB，其中的内容都是零字节。

## 4、>/dev/null 2>&1 和 2>&1 >/dev/null区别
```
>/dev/null 2>&1
```
实际上，应该等同于这样： 1>/dev/null 2>/dev/null ，默认情况下就是1，标准输出，所以一般都省略。 而&符号，后面接的是必须的文件描述符。不能写成2>1，这样就成了标准错误重定向到文件名为1的文件中了，而不是重定向标准错误到标准输出中。所以这里就是：标准输出重定向到了/dev/null，而标准错误又重定向到了标准输出，所以就成了标准输出和标准错误都重定向到了/dev/null

```
2>&1 >/dev/null
```
咋一看，这个跟上面那个有啥区别呢，不也是标准错误重定向到标准输出，而标准输出重定向到/dev/null么？ 最后不应该都重定向/dev/null么？  当产出标准错误的时候，因这个标准错误重定向到了标准输出，而标准输出是输出到屏幕。这个时候标准输出还没有被重定向到/dev/null，于是在屏幕上打印了。当产生标准输出时，那么它就不是标准错误，2>&1无效，于是标准输出重定向dev/null，不打印到屏幕。所以最终结果将是：标准错误打印到屏幕，而标准输出不打印到屏幕。
事实上, 命令行的重定向什么的, 是在执行命令之前就准备好了的. 解释顺序从左至右依次进行, 2&>1 ,而1是屏幕, 所以标准错误重定向到屏幕, 再而 1>/dev/null , 即标准输出重定向到 /dev/null, 上述2>&1 >/dev/null 并不是什么同一时刻要么产生标准输出要么产生标准错误. 而是两个不同的东西.


以下变量的方式做个解释，就很明显了，这两种方式是不同的，前者就像：
```
a=1
b=a

而后者就像：
b=a
a=1
```
&>/dev/null
// 这个就是，不管你是啥玩意儿文件描述符，通通重定向到/dev/null

```
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt
ls: 无法访问'abc.txt': 没有那个文件或目录
123.txt
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt >/dev/null 2>&1
[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt 2>&1 >/dev/null
ls: 无法访问'abc.txt': 没有那个文件或目录

[root@ubuntu0006:~/cmake] #ls 123.txt abc.txt 2&>1 >/dev/null
[root@ubuntu0006:~/cmake] #ll
总用量 24
drwxr-xr-x  2 root root 4096 6月  26 09:09 ./
drwx------ 38 root root 4096 6月  25 11:20 ../
-rw-r--r--  1 root root  104 6月  26 09:09 1
-rw-r--r--  1 root root    0 6月  25 15:16 123.txt
[root@ubuntu0006:~/cmake] #cat 1
ls: 无法访问'abc.txt': 没有那个文件或目录
ls: 无法访问'2': 没有那个文件或目录
```



