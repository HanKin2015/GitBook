# journalctl

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

# 查看某次启动后的日志

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

# 查看指定时间段的日志

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

# 通过日志级别进行过滤

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

# 实时更新日志

与 tail -f 类似，journalctl 支持 -f 选项来显示实时的日志：

```
$ sudo journalctl -f
```

如果要查看某个 unit 的实时日志，再加上 -u 选项就可以了：

```
$ sudo journalctl -f -u prometheus.service
```

# 只显示最新的 n 行

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

# 