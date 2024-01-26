# history命令

## 1、配置文件位置
/etc/profile
/etc/profile.d/
/etc/bash.bashrc

## 2、个性化设置
在/etc/profile文件中找到配置项HISTSIZE，默认值为1000

可以通过修改/etc/profile的HISTTIMEFORMAT变量来改造输出结果
```
export HISTTIMEFORMAT="%F %T `who am i` "
source /etc/profile

history只显示一条，并将其他的日志保存到文件
IP=`who -u am i 2>/dev/null| awk '{print $NF}'|sed -e 's/[()]//g'`
export HISTORY_FILE=$(date +%Y%m%d%H%M)_${IP}.log
export PROMPT_COMMAND='HISTTIMEFORMAT="[%F %T] " history 1 >> $HISTORY_FILE'
```

export HISTSIZE=1 立竿见影，临时生效

```
#export HISTSIZE=       # 使用history命令显示的条数
#export HISTFILESIZE=   # 文件~/.bash_history中保存的条数
USER_IP=`who -u am i 2>/dev/null| awk '{print $NF}'|sed -e 's/[()]//g'`
export HISTORY_FILE=$LROOT/log/today/${LOGNAME}/$(date +%Y%m%d%H%M)_${USER_IP}.log
dir=`dirname $HISTORY_FILE`
if [ ! -d "$dir" ]
then
mkdir -p $dir
chmod 300 $dir
fi
> /${LOGNAME}/.bash_history
export PROMPT_COMMAND='HISTTIMEFORMAT="[%F %T] " history 1 >> $HISTORY_FILE'
```

## 3、文件中条数会被超过HISTFILESIZE的大小，但是exit退出后重新进入又会被截断在HISTFILESIZE中
需要注意的是，命令历史通常在shell会话结束时写入到这个文件中。如果你想立即将当前会话的命令历史写入文件，可以使用history -a命令。此外，环境变量HISTFILE可以用来指定历史命令存储的文件路径，如果这个变量被设置了，那么命令历史会被写入到该变量指定的文件中。
```
[root@ubuntu0006:~] #history | wc
   1000    3137   28584
[root@ubuntu0006:~] #echo $HISTSIZE
1000
[root@ubuntu0006:~] #echo $HISTFILESIZE
2000
[root@ubuntu0006:~] #echo $HISTFILE
/root/.bash_history
[root@ubuntu0006:~] #cat /root/.bash_history | wc
   2000    4257   34353
```