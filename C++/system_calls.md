# Unix/Linux系统调用

代码见：D:\Github\Storage\c++\system_calls

https://www.yiibai.com/unix_system_calls
https://baike.baidu.com/item/%E7%B3%BB%E7%BB%9F%E8%B0%83%E7%94%A8/861110?fr=aladdin

## 1、简介
由操作系统实现提供的所有系统调用所构成的集合即程序接口或应用编程接口(Application Programming Interface，API)。是应用程序同系统之间的接口。

## 2、chmod函数（修改文件权限）
所需头文件：#include <sys/stat.h> 
函数原型：int chmod(const char *filename, int mode) 
          int fchmod(int fd, mode_t mode);
chmod是对指定的文件进行操作，而fchmod则是对已经打开的文件进行操作。
参数： filename为文件名，mode为文件权限，八进制数。 
返回值：成功返回0，失败返回-1，同时errno会被设置为合适值。

注意到文件的时间并没有改变，这是因为chmod函数更新的是i节点最近一次被更改的时间，而ls命令列出的是最后一次修改文件内容的时间。
```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll a.txt
-rw-r--r-- 1 root root 55 7月  12 19:32 a.txt
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
chmod success!
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll a.txt
-rwxrwxrwx 1 root root 55 7月  12 19:32 a.txt*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #stat b.txt
  文件：'b.txt'
  大小：0               块：0          IO 块：4096   普通空文件
设备：fd10h/64784d      Inode：6443745     硬链接：1
权限：(0644/-rw-r--r--)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-07-12 20:25:25.004000000 +0800
最近更改：2022-07-12 20:25:25.004000000 +0800
最近改动：2022-07-12 20:25:25.004000000 +0800
创建时间：-
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll b.txt
-rw-r--r-- 1 root root 0 7月  12 20:25 b.txt
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
chmod success!
fchmod success!
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #stat b.txt
  文件：'b.txt'
  大小：0               块：0          IO 块：4096   普通空文件
设备：fd10h/64784d      Inode：6443745     硬链接：1
权限：(0777/-rwxrwxrwx)  Uid：(    0/    root)   Gid：(    0/    root)
最近访问：2022-07-12 20:25:25.004000000 +0800
最近更改：2022-07-12 20:25:25.004000000 +0800
最近改动：2022-07-12 20:29:06.244000000 +0800
创建时间：-
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #date
2022年 07月 12日 星期二 20:29:17 CST
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll b.txt
-rwxrwxrwx 1 root root 0 7月  12 20:25 b.txt*
```

## 3、chown函数（修改文件所有者和所属组）
所需头文件：#include <unistd.h> 
函数原型：int chown(const char *path, uid_t owner, gid_t group) 
参数： path为文件路径，相对路径和绝对路径均可。 owner（无符号整型），用户ID。group（无符号整型）组ID。 
返回值：成功返回0，失败返回-1，同时errno会被设置为一个合适的值。

注意：可以通过 /etc/passwd访问用户ID，通过/etc/group访问组ID。 
使用man文档查看passwd的组成，man 5 passwd。

```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #cat /etc/passwd | grep hejian
hejian:x:1001:1001::/home/hejian:
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #cat /etc/group | grep hejian
hejian:x:1001:
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
chown success!
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll a.txt
-rwxrwxrwx 1 hejian hejian 55 7月  12 19:32 a.txt*
```

## 4、truncate函数（修改文件大小） 
所需头文件：
```
#include<unistd.h>
#include<sys/types.h>
```
函数原型： int truncate(const char *path,off_t length) 
参数： path为文件名，length为为文件的最终大小。off_t为长整型，long int。 
（1）最终大小比原来大，向后扩展。 
（2）最终大小比原来小，删除后边的部分。

应用实例： 
    现在在当前目录文件下创建名为a.txt的文件，再没行数如10个字符，且行为都有一个换行符。
```
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #cat a.txt
1111111111
2222222222
3333333333
4444444444
5555555555
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #gcc truncate.c
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
truncate success!
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #cat a.txt
1111111111
2222222222
3333333333
4444444444
5555555555

会在末尾增加控制符之类的东西
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll a.txt
-rwxrwxrwx 1 hejian hejian 100 7月  12 20:16 a.txt*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #vim a.txt

[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #vim truncate.c
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #gcc truncate.c
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #./a.out
truncate success!
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #ll a.txt
-rwxrwxrwx 1 hejian hejian 25 7月  12 20:18 a.txt*
[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #cat a.txt
1111111111
2222222222
333[root@ubuntu0006:/media/hankin/vdb/study/log4cplus] #
```



