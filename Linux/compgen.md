# compgen命令

## 1、简介
compgen一个很棒的命令列出所有Linux命令，compgen是bash内置命令，它将显示所有可用的命令，别名和函数。

## 2、示例

### 2-1、列出可用的所有bash shell别名
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #alias
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
[root@ubuntu0006:/media/hankin/vdb/study/udev] #compgen -a
alert
egrep
fgrep
grep
l
la
ll
ls
```

### 2-2、显示所有bash内置插件
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #compgen -b
.
:
[
alias
bg
bind
break
builtin
caller
cd
```

### 2-3、列出所有可用的命令
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #compgen -c | head
alert
egrep
fgrep
grep
l
la
ll
ls
if
then
```

### 2-4、显示所有bash关键字
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #compgen -k
if
then
else
elif
fi
case
esac
for
select
while
until
do
done
in
function
time
{
}
!
[[
]]
coproc
```

### 2-5、显示所有bash函数
```
[root@ubuntu0006:/media/hankin/vdb/study/udev] #compgen -A
-bash: compgen: -A: 选项需要一个参数
compgen: 用法: compgen [-abcdefgjksuv] [-o 选项]  [-A 动作] [-G 全局模式] [-W 词语列表]  [-F 函数] [-C 命令] [-X 过滤模式] [-P 前缀] [-S 后缀] [词语]
```



