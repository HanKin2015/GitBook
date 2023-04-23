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
$ sudo journalctl -fu prometheus.service
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

## 8、出现一个尴尬的场景（journalctl -f 无法滚动日志，无日志出现）
https://qastack.cn/ubuntu/864722/where-is-journalctl-data-stored
man systemd-journald

最后发现原因：
发现最后一条日志是明天的时间，导致今天的日志无法出现在末尾，这个应该是按照时间进行了排序。
解决方法：使用date命令修改时间，如date -s "20220418 17:58"

## 9、journalctl日志存储位置
了解journalctl -f的日志存储地址：
Ubuntu默认不使用持久日志日志文件。仅易失性/run/log/journal/<machine-id>/*.journal[~]会保留到下一次引导。每次重新启动时，所有内容都会丢失。

您可能会在日志中看到带有以下内容的引导列表：
```
[root@ubuntu0006:/run/log/journal/54396d7ed3f740ee8deaced3f66377e9] #ll
总用量 8192
drwxr-s---+ 2 root systemd-journal      60 7月   6 13:36 ./
drwxr-sr-x  3 root systemd-journal      60 7月   4 15:25 ../
-rwxr-x---+ 1 root systemd-journal 8388608 7月   6 14:23 system.journal*
hankin@hankin-KaiTianM630Z:/var/log/journal/72342e70085e4b7b81da1eeb168baf19$ ll
总用量 458868
drwxr-sr-x+ 2 root systemd-journal     4096 7月   6 14:18  ./
drwxr-sr-x+ 3 root systemd-journal     4096 3月  30 09:52  ../
-rw-r-----+ 1 root systemd-journal 16777216 7月   3 15:23 'system@0005e2e17e4707d0-47db0b1efbc0bd52.journal~'
-rw-r-----+ 1 root systemd-journal  8388608 7月   4 10:24 'system@0005e2f16fb48ef0-23c30508037cc608.journal~'
-rw-r-----+ 1 root systemd-journal  8388608 7月   5 14:23 'system@0005e308e2ba2c5d-90220add0bd0cead.journal~'
-rw-r-----+ 1 root systemd-journal 58720256 5月   5 09:56 'system@2e26ff4404574d58a2e5da7978e7f2c9-0000000000000001-0005db65cc7194e2.journal'
-rw-r-----+ 1 root systemd-journal 67108864 6月   4 20:17 'system@2e26ff4404574d58a2e5da7978e7f2c9-0000000000015911-0005de3a0cfbbaa8.journal'
-rw-r-----+ 1 root systemd-journal 83886080 7月   6 13:23 'system@8b6d7916f3444678aebc2d287b13022b-0000000000000001-0005e308e2b7f85d.journal'
-rw-r-----+ 1 root systemd-journal 83886080 7月   6 14:18 'system@8b6d7916f3444678aebc2d287b13022b-000000000001247d-0005e31c2b745b19.journal'
-rw-r-----+ 1 root systemd-journal  8388608 7月   6 14:19  system.journal
-rw-r-----+ 1 root systemd-journal 16777216 7月   3 15:23 'user-1000@0005e2e1800db464-0a8f4862732e19cc.journal~'
-rw-r-----+ 1 root systemd-journal  8388608 7月   4 10:25 'user-1000@0005e2f173b21d41-a03941d4e45dde71.journal~'
-rw-r-----+ 1 root systemd-journal  8388608 7月   5 14:23 'user-1000@0005e308e43b0e7b-c328c878bbc94a12.journal~'
-rw-r-----+ 1 root systemd-journal  8388608 7月   6 13:23 'user-1000@77b76c299ae34860bce8bcbe8d28eee9-0000000000000734-0005e308e43afb61.journal'
-rw-r-----+ 1 root systemd-journal  8388608 7月   6 14:18 'user-1000@77b76c299ae34860bce8bcbe8d28eee9-0000000000012e71-0005e31c33887211.journal'
-rw-r-----+ 1 root systemd-journal 33554432 6月   4 20:29 'user-1000@8e102face7074f0aaea0e7bbc8a4fe24-0000000000015b61-0005de3a10a3ce6d.journal'
-rw-r-----+ 1 root systemd-journal 41943040 5月   5 09:56 'user-1000@fd270e0d577b41b090f7aab51e3db7e8-0000000000000683-0005db65de38a5dc.journal'
-rw-r-----+ 1 root systemd-journal  8388608 7月   6 14:18  user-1000.journal
hankin@hankin-KaiTianM630Z:/var/log/journal/72342e70085e4b7b81da1eeb168baf19$ journalctl --list-boot
-49 48966d5cf47e48bf9116f2b5054413e4 Wed 2022-03-30 09:52:31 CST—Wed 2022-03-30 09:58:40 CST
-48 fe373aa3746446958cad836a573411f5 Wed 2022-03-30 10:14:05 CST—Wed 2022-03-30 11:41:56 CST
-47 e0a6642acf1649c881f7d7e0bde94802 Wed 2022-03-30 11:42:27 CST—Wed 2022-03-30 14:51:14 CST
-46 5a3325d7270e4e2d9e374bd0e5182bea Thu 2022-03-31 11:17:51 CST—Thu 2022-03-31 11:35:22 CST
-45 99aa645eeed147f995459fc16ac6ff22 Thu 2022-03-31 18:55:39 CST—Fri 2022-04-01 10:40:13 CST
........
hankin@hankin-KaiTianM630Z:/var/log/journal/72342e70085e4b7b81da1eeb168baf19$ grep -R fe373aa3746446958cad836a573411f5
匹配到二进制文件 user-1000@fd270e0d577b41b090f7aab51e3db7e8-0000000000000683-0005db65de38a5dc.journal
匹配到二进制文件 system@2e26ff4404574d58a2e5da7978e7f2c9-0000000000000001-0005db65cc7194e2.journal
```

除非您通过创建/var/log/journal目录激活了使用持久日志日志的日志，否则日志仍将保存在文本文件下。

通常，存储目录为/var/log/journal或/run/log/journal，但它不一定必须存在于系统中。
如果只想检查日志当前在磁盘上所占用的空间量，只需键入：
```
root@hankin:/var/log/journal/eb4ec36f6ab94e6f99921968634e719e# journalctl --disk-usage
Archived and active journals take up 104.1M in the file system.
```

如何查找journalctl查找以前的启动日志
$ sudo mkdir -p /var/log/journal
$ sudo systemd-tmpfiles --create --prefix /var/log/journal
如何journalctl减小文件大小
$ journalctl --vacuum-size=200M
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/system@00056515dbdd9a4e-a6fe2ec77e516045.journal~ (56.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-65534@00056515dbfe731d-b7bab56cb4efcbf6.journal~ (8.0M).
Deleted archived journal /var/log/journal/d7b25a27fe064cadb75a2f2f6ca7764e/user-1000@1bbb77599cf14c65a18af51646751696-000000000000064f-00056444d58433e1.journal (112.0M).
Vacuuming done, freed 176.0M of archived journals on disk.

## 10、查看journal二进制文件内容
```
hankin@hankin-KaiTianM630Z:/var/log/journal/72342e70085e4b7b81da1eeb168baf19$ journalctl --file=user-1000.journal
-- Logs begin at Wed 2022-07-06 14:21:41 CST, end at Wed 2022-07-06 14:21:41 CST. --
7月 06 14:21:41 hankin-KaiTianM630Z systemd[1604]: Started Kylin Cloud Service.
7月 06 14:21:41 hankin-KaiTianM630Z systemd[1604]: kylincloud.service: Succeeded.
hankin@hankin-KaiTianM630Z:/var/log/journal/72342e70085e4b7b81da1eeb168baf19$ journalctl --file=system.journal
-- Logs begin at Wed 2022-07-06 14:18:47 CST, end at Wed 2022-07-06 14:25:17 CST. --
7月 06 14:18:47 hankin-KaiTianM630Z smbd[44167]: pam_unix(samba:session): session closed for user nobody
7月 06 14:18:47 hankin-KaiTianM630Z audit[44167]: USER_END pid=44167 uid=0 auid=4294967295 ses=4294967295 msg='op=PAM:session_close grantors=pam_permit,pam_>
7月 06 14:18:47 hankin-KaiTianM630Z audit[498]: KYSEC_MODIFY { modify /498/task/498/attr/display } for pid=498 comm='systemd-journal' ssid=0x01 osid=0x00 lo>
7月 06 14:18:47 hankin-KaiTianM630Z audit[44217]: CRED_DISP pid=44217 uid=0 auid=4294967295 ses=4294967295 msg='op=PAM:setcred grantors=pam_kysec,pam_permit>
7月 06 14:18:47 hankin-KaiTianM630Z smbd[44217]: pam_unix(samba:session): session closed for user nobody
```










