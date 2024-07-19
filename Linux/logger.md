# logger命令

## 1、使用FUNCNAME和BASH_LINENO实现shell脚本中定位函数错误在代码中的位置
代码见：D:\Github\Storage\shell\log\custom_log.sh
特点：BASH_LINENO显示函数调用的位置行数

### 日志成型
```
#!/bin/bash

# 日志打印
LOG()
{
    echo "`date` ${FUNCNAME[1]}:${BASH_LINENO[0]} $@"
}

LOG "hello world!"
```

## 2、logger命令
终于明白logger命令使用后为啥什么都没有，原来是日志输出到vim /var/log/syslog文件中去了（/var/log/kern.log文件）。
logger命令用于向系统日志中写入消息。它允许用户将自定义消息添加到系统日志中，这些消息可以用于跟踪系统活动、故障排除和记录重要事件。
logger是一个shell命令接口，可以通过该接口使用Syslog的系统日志模块，还可以从命令行直接向系统日志文件写入一行信息。
```
**options (选项)：**
   -d, --udp 
       使用数据报(UDP)而不是使用默认的流连接(TCP)
   -i, --id  
       逐行记录每一次logger的进程ID
   -f, --file file_name
       记录特定的文件
   -h, --help
       显示帮助文本并退出
   -n， --server
       写入指定的远程syslog服务器，使用UDP代替内装式syslog的例程
   -s， --stderr
       输出标准错误到系统日志。
   -t， --tag tag
       指定标记记录
   -u， --socket socket
       写入指定的socket，而不是到内置系统日志例程。
   -V, --version
        显示版本信息并退出
   -P， --port port_num
       使用指定的UDP端口。默认的端口号是514
   -p， --priority priority_level
       指定输入消息日志级别，优先级可以是数字或者指定为 "facility.level" 的格式。
```

### 实战
```
[root@ubuntu0006:~] #logger -p info -t test "hello world"
[root@ubuntu0006:~] #journalctl -f
-- Logs begin at 三 2023-11-15 13:27:45 CST. --
11月 20 13:49:27 ubuntu0006 systemd-timesyncd[399]: Timed out waiting for reply from 91.189.91.157:123 (ntp.ubuntu.com).
11月 20 13:49:37 ubuntu0006 systemd-timesyncd[399]: Timed out waiting for reply from 185.125.190.56:123 (ntp.ubuntu.com).
11月 20 13:49:47 ubuntu0006 systemd-timesyncd[399]: Timed out waiting for reply from [2620:2d:4000:1::3f]:123 (ntp.ubuntu.com).
11月 20 13:49:57 ubuntu0006 systemd-timesyncd[399]: Timed out waiting for reply from [2620:2d:4000:1::41]:123 (ntp.ubuntu.com).
11月 20 13:50:08 ubuntu0006 systemd-timesyncd[399]: Timed out waiting for reply from [2620:2d:4000:1::40]:123 (ntp.ubuntu.com).
11月 20 13:59:01 ubuntu0006 CRON[1901]: pam_unix(cron:session): session opened for user root by (uid=0)
11月 20 13:59:01 ubuntu0006 CRON[1903]: (root) CMD (/usr/sbin/logrotate -vf /etc/logrotate.d/nginx)
11月 20 13:59:01 ubuntu0006 CRON[1901]: (CRON) info (No MTA installed, discarding output)
11月 20 13:59:01 ubuntu0006 CRON[1901]: pam_unix(cron:session): session closed for user root
11月 20 14:12:00 ubuntu0006 test[18324]: hello world
^C
```

