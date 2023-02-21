# whereis和whence以及alias命令

## 1、alias命令
命令别名
```
alias显示当前别名列表
unalias取消命令别名

eg:
alias ll='ls -l --color=auto'
unalias ll
```

### 1-1、使用shell脚本执行alias命令未生效
```add_alias.sh
#!/bin/bash

alias cl='cd /home/hankin/log/'
```
执行add_alias.sh脚本后未生效，正确方式是source add_alias.sh这样就可以了。

## 2、whereis命令
whereis 命令只能用于程序名的搜索，而且只搜索二进制文件、man说明文件和源代码文件。该命令是基于数据库文件进行搜索。
```
[root@ubuntu0006:/media] #whereis javac
javac: /opt/jdk-15.0.2/bin/javac
[root@ubuntu0006:/media] #whereis java
java: /bin/java /usr/share/java /opt/jdk-15.0.2/bin/java
[root@ubuntu0006:/media] #whereis javab
javab:
```

## 3、type命令
type 命令用来显示指定命令的类型，判断给出的指令是内部指令还是外部指令。
```
[root@ubuntu0006:/media] #type -t bash
file
[root@ubuntu0006:/media] #type -t ./h.sh
file
[root@ubuntu0006:/media] #type -t ll
alias
[root@ubuntu0006:/media] #type -t cd
builtin
[root@ubuntu0006:/media] #type cd
cd 是 shell 内建
```
https://blog.csdn.net/liaowenxiong/article/details/117337211

## 4、which命令
which 命令的作用是在环境变量 PATH 所指定的路径中，搜索某个系统命令的位置，并且返回第一个搜索结果。
```
[root@ubuntu0006:/media] #which javac
[root@ubuntu0006:/media] #which vim
/usr/bin/vim
```

## 5、whence命令
大部分linux系统不存在这个命令，极为少见，和which命令同理。

## 6、typeset命令
typeset 命令是 bash 的内建命令，是命令 declare 的别名，两者是完全一样的，用来声明 shell 变量，设置变量的属性。

用于申明 shell 变量并设置变量属性，或查看已定义的 shell 变量和函数。若不加上任何参数，则会显示全部的 shell 变量与函数。
```
[root@ubuntu0006:/media] #alias
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
[root@ubuntu0006:/media] #which typeset
[root@ubuntu0006:/media] #whereis typeset
typeset:
[root@ubuntu0006:/media] #type typeset
typeset 是 shell 内建
[root@ubuntu0006:/media] #type declare
declare 是 shell 内建
[root@ubuntu0006:/media] #which declare
[root@ubuntu0006:/media] #whereis declare
declare:
```










