# journalctl

## 1、简介
https://www.cnblogs.com/sparkdev/p/8795141.html

**journalctl 用来查询 systemd-journald 服务收集到的日志。**systemd-journald 服务是 systemd init 系统提供的收集系统日志的服务。

```
journalctl  所有日志记录
man journalctl
journalctl -h
日志信息的定义也类似一个实体类型，具体的信息被保存在各个对应的字段中，比如 MESSAGE、MESSAGE_ID、_PID、_UID、_HOSTNAME、_SYSTEMD_UNIT 等等(通过 man 7 systemd.journal-fields 可以查看所有可用的 match 字段)
journalctl _SYSTEMD_UNIT=cron.service
```

**可以同时添加多个字段进行匹配，它们之间是与的关系**，就是同时符合多个条件的记录才会被匹配，比如添加 PRIORITY 字段的匹配条件：

```
$ journalctl _SYSTEMD_UNIT=cron.service PRIORITY=6
```

注意各个字段的取值，比如为 PRIORITY 设置 debug、info 是不工作的，必须设置为对应的数字。可以通过 -F 选项来查看某个字段的可选值：

```
$ journal -F PRIORITY
```

## 2、查看某次启动后的日志
默认情况下 systemd-journald 服务只保存本次启动后的日志(重新启动后丢掉以前的日志)。此时 -b 选项是没啥用的。当我们把 systemd-journald 服务收集到的日志保存到文件中之后，就可以通过下面的命令查看系统的重启记录：
```
$ journalctl --list-boots 
```

![img](https://images2018.cnblogs.com/blog/952033/201804/952033-20180411131112897-554008128.png)

此时我们就可以通过 -b 选项来选择查看某次运行过程中的日志：

```
$ sudo journalctl -b -1
或
$ sudo journalctl -b 9eaabbc25fe343999ef1024e6a16fb58
```

下面的命令都会输出最后一次启动后的日志信息：

```
$ sudo journalctl -b
$ sudo journalctl -b  0
```

## 2、查看指定时间段的日志

利用 --since 与 --until 选项设定时间段，二者分别负责指定给定时间之前与之后的日志记录。时间值可以使用多种格式，比如下面的格式：

```
YYYY-MM-DD HH:MM:SS
```

如果我们要查询 2018 年 3 月 26 日下午 8:20 之后的日志：

```
$ journalctl --since "2018-03-26 20:20:00"
```

如果以上格式中的某些组成部分未进行填写，系统会直接进行默认填充。例如，如果日期部分未填写，则会直接显示当前日期。如果时间部分未填写，则缺省使用 "00:00:00"(午夜)。秒字段亦可留空，默认值为 "00"，比如下面的命令：

```
$ journalctl --since "2018-03-26" --until "2018-03-26 03:00"
```

另外，journalctl 还能够理解部分相对值及命名简写。例如，大家可以使用 "yesterday"、"today"、"tomorrow" 或者 "now" 等。
比如获取昨天的日志数据可以使用下面的命令：

```
$ journalctl --since yesterday
```

要获得早上 9:00 到一小时前这段时间内的日志，可以使用下面的命令：

```
$ journalctl --since 09:00 --until "1 hour ago"
```

## 3、通过日志级别进行过滤

除了通过 PRIORITY= 的方式，还可以通过 -p 选项来过滤日志的级别。 可以指定的优先级如下：
\# 0: emerg
\# 1: alert
\# 2: crit
\# 3: err
\# 4: warning
\# 5: notice
\# 6: info
\# 7: debug

```
$ sudo journalctl -p err
```

注意，这里指定的是优先级的名称。

## 4、实时更新日志

与 tail -f 类似，journalctl 支持 -f 选项来显示实时的日志：

```
$ sudo journalctl -f
```

如果要查看某个 unit 的实时日志，再加上 -u 选项就可以了：

```
$ sudo journalctl -f -u prometheus.service
```

## 5、只显示最新的 n 行

命令行选项 -n 用来控制只显示最新的 n 行日志，默认是显示尾部的最新 10 行日志：

```
$ sudo journalctl -n
```

也可以显示尾部指定行数的日志：

```
$ sudo journalctl -n 20
```

下面则是显示 cron.service 服务最新的三行日志：

```
$ journalctl -u cron.service -n 3
```

## 6、journalctl 使用方法
.查看所有日志
默认情况下，只保存本次启动的日志
journalctl

.查看内核日志（不显示应用日志）
journalctl -k

.查看系统本次启动的日志
journalctl   -b
journalctl  -b  -0

.查看上一次启动的日志
需更改设置,如上次系统崩溃，需要查看日志时，就要看上一次的启动日志。
journalctl  -b -1

.查看指定时间的日志

journalctl --since="2012-10-3018:17:16"

journalctl --since "20 minago"

journalctl --since yesterday

journalctl --since"2015-01-10" --until "2015-01-11 03:00"

journalctl --since 09:00 --until"1 hour ago"

journalctl --since"15:15" --until now

.显示尾部的最新10行日志

journalctl  -n

.显示尾部指定行数的日志

查看的是/var/log/messages的日志，但是格式上有所调整，如主机名格式不一样而已

journalctl -n 20

.实时滚动显示最新日志

journalctl   -f

.查看指定服务的日志

journalctl  /usr/lib/systemd/systemd

.查看指定进程的日志

journalctl   _PID=1

.查看某个路径的脚本的日志

journalctl    /usr/bin/bash

.查看指定用户的日志

journalctl _UID=33  --since today

.查看某个Unit的日志

journalctl  -u nginx.service

journalctl  -u nginx.service  --since  today

.实时滚动显示某个Unit的最新日志

journalctl  -u nginx.service  -f

.合并显示多个Unit的日志

journalctl  -u nginx.service  -u php-fpm.service  --since today

​查看指定优先级（及其以上级别）的日志

日志优先级共有8级

0: emerg

1: alert

2: crit

3: err

4: warning

5: notice

6: info

7: debug

journalctl  -p err  -b

.不分页标准输出

日志默认分页输出--no-pager改为正常的标准输出

journalctl  --no-pager

.以JSON格式（单行）输出

JSON(JavaScript Object Notation)是一种轻量级的数据交换格式。易于人阅读和编写。同时也易于机器解析和生成。它基于JavaScriptProgramming Language, Standard ECMA-262 3rd Edition - December 1999的一个子集。JSON采用完全独立于语言的文本格式，但是也使用了类似于C语言家族的习惯（包括C, C++, C#, Java,JavaScript, Perl, Python等）。这些特性使JSON成为理想的数据交换语言。

JSON建构于两种结构：

“名称/值”对的集合（A collection ofname/value pairs）：不同的语言中，它被理解为对象（object），纪录（record），结构（struct），字典（dictionary），哈希表（hash table），有键列表（keyed list），或者关联数组（associativearray）。

值的有序列表（An ordered list of values）：在大部分语言中，它被理解为数组（array）。

这些都是常见的数据结构。事实上大部分现代计算机语言都以某种形式支持它们。这使得一种数据格式在同样基于这些结构的编程语言之间交换成为可能。

例子

以JSON格式（单行）输出

journalctl  -b -u httpd.service  -o json

.以JSON格式（多行）输出，可读性更好，建议选择多行输出

journalctl  -b -u httpd.service  -o json-pretty

.显示日志占据的硬盘空间

journalctl  --disk-usage

.指定日志文件占据的最大空间

journalctl   --vacuum-size=1G

.指定日志文件保存多久

journalctl   --vacuum-time=1years

## 7、分析linux关机记录
last -x shutdown
last -x 

## 8、出现一个尴尬的场景
https://qastack.cn/ubuntu/864722/where-is-journalctl-data-stored
man systemd-journald

journalctl -f无法滚动日志，无日志出现

发现最后一条日志是明天的时间，导致今天的日志无法出现在末尾，这个应该是按照时间进行了排序。

解决方法：使用date命令修改时间，如date -s "20220418 17:58"

了解journalctl -f的日志存储地址：
Ubuntu默认不使用持久日志日志文件。仅易失性/run/log/journal/<machine-id>/*.journal[~]会保留到下一次引导。每次重新启动时，所有内容都会丢失。

您可能会在日志中看到带有以下内容的引导列表：

journalctl --list-boot
/var/log除非您通过创建/var/log/journal目录激活了使用持久日志日志的日志，否则日志仍将保存在文本文件下。

通常，存储目录为/var/log/journal或/run/log/journal，但它不一定必须存在于系统中。
如果只想检查日志当前在磁盘上所占用的空间量，只需键入：
$ journalctl --disk-usage


除了Muru关于数据存储位置的答案外，还有其他相关答案。

如何增加journalctl查找以前的启动日志
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
如何journalctl减小文件大小
$ journalctl --vacuum-size=200M
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system@00056515dbdd9a4e-a6fe2ec77e516045.journal~ (56.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-65534@00056515dbfe731d-b7bab56cb4efcbf6.journal~ (8.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-1000@1bbb77599cf14c65a18af51646751696-000000000000064f-00056444d58433e1.journal (112.0M).
Vacuuming done, freed 176.0M of archived journals on disk.

```
root@hankin:/var/log/journal/eb4ec36f6ab94e6f99921968634e719e# ls -lt
total 106652
-rw-r-----+ 1 root systemd-journal 8388608 Apr 21 12:01 system.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 20 17:32 system@0005dcf19bc7accf-66cd06ffe699963d.journal~
-rw-r-----+ 1 root systemd-journal 8388608 Apr 20 17:28 system@c0a785b5e3a9419e994757a215e6598f-0000000000001187-0005dcea223c3555.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 19 09:14 system@31aaa31501694608816a1a4ba2c91064-000000000000048f-0005dcea55664cea.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 19 01:25 system@0005dcf10a3c89ae-9aa2cf89422ade90.journal~
-rw-r-----+ 1 root systemd-journal 8388608 Apr 19 01:16 system@0005dcf0ea957619-1fc691d9abf4f7b3.journal~
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 23:55 system@0005dcefcb660dc8-163f73a5b4bc2e15.journal~
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 17:24 system@31aaa31501694608816a1a4ba2c91064-0000000000000001-0005dcf19bbd82ee.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 17:10 system@c0a785b5e3a9419e994757a215e6598f-000000000000058b-0005dce9cc632b8f.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 16:46 system@c0a785b5e3a9419e994757a215e6598f-0000000000000486-0005dce9c3cc46d9.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 16:44 system@c0a785b5e3a9419e994757a215e6598f-0000000000000001-0005dcf10a30c7be.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 16:42 system@647658ebab6b43d48e1065290739b1d2-0000000000000001-0005dcf0ea8a1967.journal
-rw-r-----+ 1 root systemd-journal 8388608 Apr 18 16:35 system@647658ebab6b43d48e1065290739b1d2-0000000000000487-0005dce9bdd7aa57.journal
root@hankin:/var/log/journal/eb4ec36f6ab94e6f99921968634e719e# journalctl --list-boot
-3 c2aa7b49f73f44f7a431af6bcb13a2b3 Mon 2022-04-18 16:15:24 CST—Mon 2022-04-18 16:18:04 CST
-2 f507c47d34954e2192493e86bc412d96 Mon 2022-04-18 16:44:13 CST—Mon 2022-04-18 17:10:09 CST
-1 2aa8b1d01c354d82a5992728d36d5cc4 Tue 2022-04-19 01:51:25 CST—Wed 2022-04-20 17:32:39 CST
 0 658ad685a1ee43a9a34e65f8bf5c2d56 Thu 2022-04-21 12:01:51 CST—Thu 2022-04-21 12:02:03 CST
root@adesk:/var/log/journal/eb4ec36f6ab94e6f99921968634e719e# journalctl --disk-usage
Archived and active journals take up 104.1M in the file system.

```