# 权限

- 777最高权限，即rwx

- s权限

  -  强制位权限，作用在于**设置使文件在执行阶段具有文件所有者的权限，相当于临时拥有文件所有者的身份**. 典型的文件是passwd. 如果一般用户执行该文件, 则在执行过程中, 该文件可以获得root权限, 从而可以更改用户的密码.

- t权限

  - 要删除一个文档，您不一定要有这个文档的写权限，但您一定要有这个文档的上级目录的写权限。也就是说，您即使没有一个文档的写权限，但您有这个文档的上级目录的写权限，您 也能够把这个文档给删除，而假如没有一个目录的写权限，也就不能在这个目录下创建文档。

    怎样才能使一个目录既能够让任何用户写入文档，又不让用户删除这个目录下他人的文档，t权限就是能起到这个作用。t权限一般只用在目录上，用在文档上起不到什么作用。

    在一个目录上设了t权限位后，（如/home，权限为1777)任何的用户都能够在这个目录下创建文档，但只能删除自己创建的文档(root除外)，这就对任何用户能写的目录下的用户文档 启到了保护的作用。



**在这再总结一下**

**s或S（SUID,Set UID）：**

可执行的文件搭配这个权限，便能得到特权，任意存取该文件的所有者能使用的全部系统资源。请注意具备SUID权限的文件，黑客经常利用这种权限，以SUID配上root帐号拥有者，无声无息地在系统中开扇后门，供日后进出使用。

**t或T（Sticky）：**

/tmp和 /var/tmp目录供所有用户暂时存取文件，亦即每位用户皆拥有完整的权限进入该目录，去浏览、删除和移动文件。





用户权限u，群组权限g，其他用户权限o，分别为r(可写)w(可读)x(可执行)rwxrwx ，还有s/t特殊权限，可分为：
rwsrwxrwx 用户权限出现s，替代了x
rwxrwsrwx 群组权限出现s，替代了x
rwxrwxrwt 其他权限出现t，替代了x 

 在改权限过程中，会出现s和S，区别是
S是修改权限之前原权限中没有x的情况下出现
s是修改权限之前原权限中有x的情况下出现
这两种表示不影响权限的修改，可以忽略
g+s这个功能在用途上就是防止其他同组的用户删除自己不想被删除的目录。 



参考： https://www.cnblogs.com/yiyide266/p/10047340.html 

 https://blog.csdn.net/linting0909/article/details/82902196 