# tac命令

## 1、简介
tac 命令用于按相反顺序逐行连接和打印文件内容。

和 cat 命令一样，将每个文件连接到标准输出，但顺序相反，逐行打印，首先打印最后一行。这对于检查按时间顺序排列的日志文件很有用(例如)，其中文件的最后一行包含最新的信息。

## 2、cat和tac命令的对比
```
[root@ubuntu0006:/media/hankin/vdb] #cat ping.sh
#!/bin/sh
ip="10.70.10."
for i in `seq 60 80`
do
        date
        ping -c 4 $ip$i | grep -q 'ttl=' && echo "$ip$i OK" || echo "$ip$i NO"
done
[root@ubuntu0006:/media/hankin/vdb] #tac ping.sh
done
        ping -c 4 $ip$i | grep -q 'ttl=' && echo "$ip$i OK" || echo "$ip$i NO"
        date
do
for i in `seq 60 80`
ip="10.70.10."
#!/bin/sh
```

## 3、结合ll命令使用
```
[root@ubuntu0006:/media/hankin/vdb/du] #ll -hS
总用量 145M
-rw-r--r--  1 root root  88M 7月  14 09:57 88M
-rw-r--r--  1 root root  44M 7月  14 09:57 44M
-rw-r--r--  1 root root 8.0M 7月  14 09:56 8M
-rw-r--r--  1 root root 4.0M 7月  14 09:57 4M
drwxr-xr-x  2 root root 4.0K 7月  14 09:57 ./
drwxrwxrwx 23 root root 4.0K 7月  14 09:51 ../
[root@ubuntu0006:/media/hankin/vdb/du] #ll -hSr
总用量 145M
drwxrwxrwx 23 root root 4.0K 7月  14 09:51 ../
drwxr-xr-x  2 root root 4.0K 7月  14 09:57 ./
-rw-r--r--  1 root root 4.0M 7月  14 09:57 4M
-rw-r--r--  1 root root 8.0M 7月  14 09:56 8M
-rw-r--r--  1 root root  44M 7月  14 09:57 44M
-rw-r--r--  1 root root  88M 7月  14 09:57 88M
[root@ubuntu0006:/media/hankin/vdb/du] #ll -hS | tac
drwxrwxrwx 23 root root 4.0K 7月  14 09:51 ../
drwxr-xr-x  2 root root 4.0K 7月  14 09:57 ./
-rw-r--r--  1 root root 4.0M 7月  14 09:57 4M
-rw-r--r--  1 root root 8.0M 7月  14 09:56 8M
-rw-r--r--  1 root root  44M 7月  14 09:57 44M
-rw-r--r--  1 root root  88M 7月  14 09:57 88M
总用量 145M
```

## 4、linux命令之ll按时间和大小排序显示
注意一下S是大写。
```
ll -Sh
ll -Sh | tac
ll -rt
ll -rt | tac
```
参数的解释如下:
```
-r, --reverse              reverse order while sorting
-t                         sort by modification time
-S                         sort by file size
-h, --human-readable       with -l, print sizes in human readable format
                               (e.g., 1K 234M 2G)
```
