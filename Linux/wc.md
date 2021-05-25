# wc命令

```
[root@ubuntu0006:/media/hankin/vdb] #ls null/ | wc
      0       0       0
[root@ubuntu0006:/media/hankin/vdb] #ll null/ | wc
      3      20     107
```

到底多了一个什么东西？？？

```
[root@ubuntu0006:/media/hankin/vdb] #cd null
[root@ubuntu0006:/media/hankin/vdb/null] #ll
总用量 8
drwxr-xr-x  2 root root 4096 5月  21 09:25 ./
drwxr-xr-x 11 root root 4096 5月  21 09:25 ../
[root@ubuntu0006:/media/hankin/vdb/null] #ls
[root@ubuntu0006:/media/hankin/vdb/null] #
```

使用ll的时候多了一个总计行、.文件夹、..文件夹，因此通过管道符 | 再进行wc命令计数的时候就会多出来一行了。






