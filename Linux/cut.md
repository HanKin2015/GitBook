# cut命令

cut最常用的选项是-d和-f的组合。它基本上会根据特定的分隔符和列出的字段提取内容。
cut -d ':' -f 1,3 /etc/passwd

除了/etc/passwd文件中的第二个字段:grep '/bin/bash' /etc/passwd|cut -d ':' --complement -f 2


```
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' ' -f1
快乐大本营
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' ' -f2
2014
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' ' -f3
第1集
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' ' -f4

[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' '
cut: 您必须指定一组字节、字符或域的列表
Try 'cut --help' for more information.
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集'|cut -d' ' -f2
2014
[root@ubuntu0006:/media/hankin/vdb/study] #echo '快乐大本营 2014 第1集' > data.txt
[root@ubuntu0006:/media/hankin/vdb/study] #cat data.txt | cut -d' ' -f2
2014
```