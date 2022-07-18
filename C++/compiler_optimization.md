# 编译器优化



```
[root@ubuntu0006:/media] #file a.out
a.out: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, for GNU/Linux 2.6.32, BuildID[sha1]=71076f0d5a4bcfa6441f4fed3af0439b1720637a, not stripped
```

能看见not stripped字段。

gcc -O0123都没有改变这个值。





