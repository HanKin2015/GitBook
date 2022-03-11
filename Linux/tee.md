# tee命令

## 1、简介
Linux tee命令用于读取标准输入的数据，并将其内容输出成文件。
tee指令会从标准输入设备读取数据，将其内容输出到标准输出设备，同时保存成文件。

## 2、实战
使用指令"tee"将用户输入的数据同时保存到文件"file1"和"file2"中，输入如下命令：
```
$ tee file1 file2                   #在两个文件中复制内容 

$ tee file							#在一个文件中复制内容
```

在终端进行输入数据，并将内容保存到文件。

目前并没有发现其太大的用处。

```
[root@ubuntu0006:/media/hankin/vdb/study] #echo "ds"
ds
[root@ubuntu0006:/media/hankin/vdb/study] #echo -n "ds"
ds[root@ubuntu0006:/media/hankin/vdb/study] #tee hj
dsadl
dsadl
dsalkdk
dsalkdk
dsad
dsad
sdasda
sdasda
^C
[root@ubuntu0006:/media/hankin/vdb/study] #cat hj
dsadl
dsalkdk
dsad
sdasda
[root@ubuntu0006:/media/hankin/vdb/study] #echo -n "this is word" | tee hj
this is word[root@ubuntu0006:/media/hankin/vdb/study] #cat hj
this is word[root@ubuntu0006:/media/hankin/vdb/study] #
```


