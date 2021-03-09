# Linux logrotate命令

## 1、介绍
logrotate: 轮替;管理记录文件
Linux logrotate命令用于管理记录文件。使用logrotate指令，可让你轻松管理系统所产生的记录文件。它提供自动替换，压缩，删除和邮寄记录文件，每个记录文件都可被设置成每日，每周或每月处理，也能在文件太大时立即处理。您必须自行编辑，指定配置文件，预设的配置文件存放在/etc目录下，文件名称为logrotate.conf。

## 2、语法
logrotate [-?dfv][-s <状态文件>][--usage][配置文件]

## 3、参数说明

-?或--help 　在线帮助。
-d或--debug 　详细显示指令执行过程，便于排错或了解程序执行的情况。
-f或--force 　强行启动记录文件维护操作，纵使logrotate指令认为没有需要亦然。
-s<状态文件>或--state=<状态文件> 　使用指定的状态文件。
-v或--version 　显示指令执行过程。
-usage 　显示指令基本用法。


## 4、实战
logrotate的配置文件是/etc/logrotate.conf，通常不需要对它进行修改。日志文件的轮循设置在独立的配置文件中，它（们）放在/etc/logrotate.d/目录下。

```
创建一个日志文件，然后在其中填入一个10MB的随机比特流数据文件：
touch /home/root/file.json
head -c 10M < /dev/urandom > /home/root/file.json



[root@xubuntu ~]# vim /etc/logrotate.d/usbrecord
/var/log/file.json {
    monthly
    rotate 5
    compress
    delaycompress
    missingok
    notifempty
    create 644 root root
    postrotate
        /usr/bin/killall -HUP rsyslogd
    endscript
}





```





即使轮循条件没有满足，我们也可以通过使用‘-f’选项来强制logrotate轮循日志文件，‘-v’参数提供了详细的输出。


























