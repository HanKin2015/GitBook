# du命令和df命令

## 1、du命令
全称：Disk Usage（磁盘使用情况）
功能：用于查看文件和目录的磁盘使用情况。

显示当前目录下每个文件和目录的磁盘使用空间。
统计文件夹(或文件)所占磁盘空间的大小。

命令参数：
-a #显示目录中文件的大小，单位 KB 。
-b #显示目录中文件的大小，以字节byte为单位。
-c #显示目录中文件的大小，同时也显示总和；单位KB。
-k 、 -m 、#显示目录中文件的大小，-k 单位KB，-m 单位MB.
-s #仅显示总计，不列出每个子目录的大小，单位KB。
-H或--si                 #与-h参数相同，但是K，M，G是以1000为换算单位。   
-h #以人类可读的格式显示（例如，KB、MB、GB）。

推荐：du -h[a]
注意：
- du -h是查看当前文件夹的大小，及当前目录大小
- du -h 指定文件夹或文件

## 2、du命令的-s参数
```
-S, --separate-dirs   for directories do not include size of subdirectories
      --si              like -h, but use powers of 1000 not 1024
-s, --summarize       display only a total for each argument
-s或–summarize 仅显示总计，即当前文件夹的大小。
-S或–separate-dirs 显示每一个文件夹的大小时，并不含其子文件夹的大小。

[root@ubuntu0006:/media/hankin/vdb] #du -sh ./*
301M    ./bdscan
3.2M    ./deb
4.0G    ./debians
145M    ./du
[root@ubuntu0006:/media/hankin/vdb/du] #du -S
4       ./a
4       ./b
147460  .
```

## 3、某个文件夹下的文件按大小排序
```
[root@ubuntu0006:/media/hankin/vdb/du] #du -sh ./* | sort -n
4.0M    ./4M
8.0M    ./8M
44M     ./44M
88M     ./88M
[root@ubuntu0006:/media/hankin/vdb/du] #du -sh ./* | sort -rn
88M     ./88M
44M     ./44M
8.0M    ./8M
4.0M    ./4M
```

## 4、df命令
全称：Disk Free（磁盘可用空间）
功能：用于查看文件系统的磁盘空间使用情况，包括已用空间、可用空间和总空间。
常用选项：
    -h：以人类可读的格式显示。
    -T：显示文件系统的类型。
    -i：显示 inode 使用情况。
