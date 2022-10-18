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
#export HISTSIZE=
#export HISTFILESIZE=
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