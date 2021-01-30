# 一些疑难杂症问题

## 1、Ubuntu或者Xubuntu下图形界面卡死解决办法
```查找xorg进程pid
ps -ef | grep tty7

ps -t tty7  <===>  ps -e | grep tty7
```

```fuckXorg.sh
#!/bin/bash

pid=`ps -o pid -t tty7`
pid=`echo $pid | cut -c4-`
echo 'pid is' $pid
kill $pid

exit 5
```

















