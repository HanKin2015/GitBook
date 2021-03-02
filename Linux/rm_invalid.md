# rm命令失效

## 1、现象
使用mobaxterm软件ssh到xubuntu系统使用rm命令执行失败

确认当前登录的是root用户：whoami

创建一个文件：touch xxxxx
删除文件：rm xxxxx
提示如下：
Broadcast message from root@ubuntu0006 (pts/1) (Mon Mar  1 10:28:03 2021):

文件xxxxx未被删除

## 2、gdb调试
gdb /bin/rm
进入后: set args xxxxx
r
删除成功

## 3、strace命令追踪
strace rm xxxxx
删除成功

## 怀疑rm命令是不是被人动了手脚
/bin/rm xxxxx
结果：删除成功

which rm
结果：/bin/rm

拷贝rm命令到当前目录

alias命令执行后发现：
```
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls -alF'
alias ls='ls --color=auto'
alias rm='wall'
```
what???????






