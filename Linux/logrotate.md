# Linux logrotate命令

## 1、介绍
logrotate: 轮替;管理记录文件
rotate: (使)旋转;(使)转动

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

测试配置是否正确：lograte -d /etc/logrotate.d/usbrecord

强制运行配置文件：lograte -vf /etc/logrotate.d/usbrecord  记住不要添加-d参数
In debug mode, no changes will be made to the logs or to the logrotate state file.


## logrotate配置参数
| **配置参数**                   | **功能说明**                                                 |
| ------------------------------ | ------------------------------------------------------------ |
| compress                       | 通过gzip 压缩转储以后的日志                                  |
| nocompress                     | 不需要压缩时，用这个参数                                     |
| copytruncate                   | 用于还在打开中的日志文件，把当前日志备份并截断；是先拷贝再清空的方式，拷贝和清空之间有一个时间差，可能会丢失部分日志数据。 |
| nocopytruncate                 | 备份日志文件但是不截断                                       |
| create mode owner group        | 转储文件，使用指定的文件模式创建新的日志文件。轮转时指定创建新文件的属性，如create 0777 nobody nobody |
| nocreate                       | 不建立新的日志文件                                           |
| delaycompress                  | 和 compress 一起使用时，转储的日志文件到下一次转储时才压缩   |
| nodelaycompress                | 覆盖 delaycompress 选项，转储同时压缩                        |
| errors address                 | 专储时的错误信息发送到指定的Email 地址                       |
| ifempty                        | 即使是空文件也转储，这个是 logrotate 的缺省选项。            |
| notifempty                     | 如果是空文件的话，不转储                                     |
| mail address                   | 把转储的日志文件发送到指定的E-mail 地址                      |
| nomail                         | 转储时不发送日志文件                                         |
| olddir directory               | 转储后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统 |
| noolddir                       | 转储后的日志文件和当前日志文件放在同一个目录下               |
| prerotate/endscript            | 在logrotate转储之前需要执行的指令，例如修改文件的属性等动作；这两个关键字必须单独成行; |
| postrotate/endscript           | 在logrotate转储之后需要执行的指令，例如重新启动 (kill -HUP) 某个服务！必须独立成行; |
| daily                          | 指定转储周期为每天                                           |
| weekly                         | 指定转储周期为每周                                           |
| monthly                        | 指定转储周期为每月                                           |
| rotate count                   | 指定日志文件删除之前转储的个数，0 指没有备份，5 指保留5个备份 |
| tabootext [+] list 让logrotate | 不转储指定扩展名的文件，缺省的扩展名是：.rpm-orig, .rpmsave, v, 和 ~ |
| size                           | size当日志文件到达指定的大小时才转储，Size 可以指定 bytes (缺省)以及KB (sizek)或者MB (sizem). |
| missingok                      | 如果日志丢失，不报错继续滚动下一个日志                       |
| notifempty                     | 当日志文件为空时，不进行轮转                                 |
| sharedscripts                  | 运行postrotate脚本，作用是在所有日志都轮转后统一执行一次脚本。如果没有配置这个，那么每个日志轮转后都会执行一次脚本 |
| dateext                        | 使用当期日期作为命名格式                                     |
| dateformat .%s                 | 配合dateext使用，紧跟在下一行出现，定义文件切割后的文件名，必须配合dateext使用，只支持 %Y %m %d %s 这四个参数 |
| size(或minsize) log-size       | 当日志文件到达指定的大小时才转储，log-size能指定bytes(缺省)及KB (sizek)或MB(sizem). |





## 命令执行过程
```
root@ubuntu0006:/var/log/hankin/hj# logrotate -vf /etc/logrotate.d/usbrecord
reading config file /etc/logrotate.d/usbrecord

Handling 1 logs

rotating pattern: /var/log/hankin/hj/1.json  forced from command line (2 rotations)
empty log files are not rotated, old logs are removed
considering log /var/log/hankin/hj/1.json
  log needs rotating
rotating log /var/log/hankin/hj/1.json, log->rotateCount is 2
dateext suffix '-20210309'
glob pattern '-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
renaming /var/log/hankin/hj/1.json.2.gz to /var/log/hankin/hj/1.json.3.gz (rotatecount 2, logstart 1, i 2),
renaming /var/log/hankin/hj/1.json.1.gz to /var/log/hankin/hj/1.json.2.gz (rotatecount 2, logstart 1, i 1),
renaming /var/log/hankin/hj/1.json.0.gz to /var/log/hankin/hj/1.json.1.gz (rotatecount 2, logstart 1, i 0),
old log /var/log/hankin/hj/1.json.0.gz does not exist
renaming /var/log/hankin/hj/1.json to /var/log/hankin/hj/1.json.1
creating new /var/log/hankin/hj/1.json mode = 0644 uid = 0 gid = 0
compressing log with: /bin/gzip
removing old log /var/log/hankin/hj/1.json.3.gz
```

- 判断是否有notifempty参数，如果是空文件的话，不转储 
- 先将文件夹中的压缩文件重命名，即将1、2变成2、3，0不存在所以不存在1了
- 对每个文件重命名加.1
- 创建空的原始文件
- gzip压缩.1文件为gz文件
- 判断rotete数量是多少，是否需要删除老的压缩文件

## 参数解读
dateext：默认以1累积命名，加了dateext后1.json.1.gz变成1.json-20210309.gz，只能保存一个文件，再压缩失败
compress：是否进行gzip压缩，一般配置
delaycompress：缺少gzip这一步，下一次生效，一般不配置



## 5、crontab命令
crontab -e可以直接进行编辑，和系统的不冲突。
生成的配置文件路径：/var/spool/cron/crontabs/root

logrotate的行为也是受crontab控制，在/etc/cron.daily目录下。
而crontab任务是受anacron控制，在/etc/anacron文件中配置(可能不存在这一层控制)

logrotate是基于crond服务来运行的，其crond服务的脚本是/etc/cron.daily/logrotate，日志转储是系统自动完成的。实际运行时，logrotate会调用主配置文件 /etc/logrotate.conf，可以在 /etc/logrotate.d 目录里放置自定义好的配置文件，用来覆盖logrotate的缺省值。定时执行/etc/cron.daily目录下的文件的设置，则在/etc/anacrontab里定义的,那anacrontab怎么知道上次成功执行脚本的具体时间呢?通过查看/etc/cron.daily/logrotate得知有 /var/lib/logrotate/logrotate.status这样的一个文件,此文件的作用就是记录最近一次成功运行日志分割脚本的具体时间.

所以logrotate执行脚本的命令其实是/usr/sbin/logrotate -s /var/lib/logrotate/logrotate.status /etc/logrotate.conf。


https://blog.csdn.net/qq_36470898/article/details/105978773
https://www.runoob.com/w3cnote/linux-crontab-tasks.html



rsyslog服务和logrotate服务
======================================================================
rsyslog 是一个 syslogd 的多线程增强版。
现在Fedora和Ubuntu, rhel6默认的日志系统都是rsyslog了
rsyslog负责写入日志, logrotate负责备份和删除旧日志, 以及更新日志文件


## 6、如果logrotate 1并且是datetext能不能成功？

如果不限制格式(dateformat)，默认是按照日期命名，如20210325。这样压缩会报错文件已存在。
如果加了格式限制，如dateformat -%Y-%m-%d-%s，按秒命名，文件名不会出现重复，就不会有文件存在错误。
delaycompress延迟压缩，当出现需要压缩的时候，只会把原先的文件重新命名，等到下一次触发压缩的时候再进行压缩。对于只转存一次的脚本来说不需要，也可以需要。
su这个还是很重要的，不然可能会出现报错：error: skipping "/var/log/hj.json" because parent directory has insecure permissions (It's world writable or writable by group which is not "root") Set "su" directive in config file to tell logrotate which user/group should be used for rotation.
配置里面随便写一些东西是不影响脚本运行的，如有人写su root root或者hourly都不是标准的，hourly没有这个配置，root root不需要填写。

```
/var/log/*.json {
    su
    missingok
    rotate 1
    compress
    delaycompress
    notifempty
    noolddir
    copytruncate
    nomail
    dateext
    dateformat -%Y-%m-%d-%s
    size 1M   
}
```








