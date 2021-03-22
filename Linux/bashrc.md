# linux终端terminal个性化配置
linux打开终端快捷键：
ctrl + alt + t  新窗口中打开
ctrl + shift +t 新标签页中打开

Bash还有一个特殊的“召回”模式，您可以使用它来搜索先前运行的命令，而不是逐个滚动。
Ctrl + R：调用与您提供的字符匹配的最后一个命令。按此快捷方式，然后开始输入以搜索您的bash历史记录以获取命令。
Ctrl + O：运行您使用Ctrl + R找到的命令。
Ctrl + G：保留历史搜索模式，不运行命令。

## 1、别名的设置
alias
unalias

## 2、个性化的显示PS1
在/root/.bashrc文件末尾添加下面：
```
function git_branch {
    branch="`git branch 2>/dev/null | grep "^\*" | sed -e "s/^\*\ //"`"
    if [ "${branch}" != "" ];then
        if [ "${branch}" = "(no branch)" ];then
            branch="(`git rev-parse --short HEAD`...)"
        fi
        echo " ($branch)"
    fi
}
export PS1="\[\033[1m\]\[\033[31m\][\[\033[0m\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\[\033[36m\]\h\[\033[0m\]\[\033[00m\]:\[\033[01;34m\]\w\[\033[00m\]\[\033[1m\]\[\033[31m\]]\[\033[0m\]\[\033[1m\]$(git_branch) \[\033[33m\]\\$\[\033[0m\]"
```

我们可以通过设置PS1变量使提示符成为彩色。在PS1中设置字符序列颜色的格式为：
\e[F;Bm

其中``F''为字体颜色，编号30~37；``B''为背景色，编号40~47。
可通过``\e[0m''关闭颜色输出；特别的，当B为1时，将显示加亮加粗的文字，详细请看下面的颜色表与代码表。

测试发现：
\[\033[1m\]为一组设置，其中的e可省略，0之前加斜杠不是很清楚
\[\033[01;34m\]
颜色设置在变量之前
\\$显示对应的符号


我错了我错了，linux太博大精深了。
/etc/bash_complication
/etc/bash_complication.d/git_promt
```
这样可以
export PS1='[\u@\h: $PWD]\033[01;36m $(__git_ps1) \[\033[00m\] \$ '
``
完全可以使用__git_ps1自带函数代替git_branch函数





## 3、配置文件介绍
/etc/profile:此文件为系统的每个用户设置环境信息,当用户第一次登录时,该文件被执行.并从/etc/profile.d目录的配置文件中搜集shell的设置.此文件默认调用/etc/bash.bashrc文件。

/etc/bashrc:为每一个运行bash shell的用户执行此文件.当bashshell被打开时,该文件被读取.

~/.bash_profile/~/.bash_login/~/.profile:用户登录执行，source立即生效。每个用户都可使用该文件输入专用于自己使用的shell信息,当用户登录时,该文件仅仅执行一次!默认情况下,他设置一些环境变量,执行用户的.bashrc文件.

~/.bashrc:每次打开新窗口时执行。该文件包含专用于你的bashshell的bash信息。与/etc/bashrc冲突则执行前者～。

~/.bash_logout:当每次退出系统(退出bashshell)时,执行该文件. 

可以明白的是：针对于用户的配置，应该将配置信息写入~/.bashrc文件。(只对当前用户有效，重新打开的如果不是当前用户的terminal当然没有效果！所以lz一般设置两次，一个root用户，一个当前普通用户)

## 4、终端terminal 补全设置为大小写不敏感
编辑~/.inputrc（没有的话，就新建一个），在最后加一行： 
set completion-ignore-case on

## 5、alias
```
alias alert='notify-send --urgency=low -i "$([ $? = 0 ] && echo terminal || echo error)" "$(history|tail -n1|sed -e '\''s/^\s*[0-9]\+\s*//;s/[;&|]\s*alert$//'\'')"'
alias branchclear='git branch -r -d $(git branch -r | grep -v HEAD) -q'
alias branchpull='git pull --all -p'
alias du='du -lh --max-depth=1'
alias egrep='egrep --color=auto'
alias fgrep='fgrep --color=auto'
alias grep='grep --color=auto'
alias l='ls -CF'
alias la='ls -A'
alias ll='ls --color=auto -AFlh --group-directories-first'
alias logcat='adb shell logcat'
alias ls='ls --color=auto -F --group-directories-first'
alias setjdk6='setjdk /usr/lib/jvm/jdk1.6.0_45'
alias setjdk7='setjdk /usr/lib/jvm/java-7-openjdk-amd64'
alias setjdk8='setjdk /usr/lib/jvm/java-8-openjdk-amd64'
alias setndk10='test -d /android/android-ndk-r10e && setndk /android/android-ndk-r10e || setndk /ndk/r10e'
alias tree='tree -A'


alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
 
alias vi='vim'
alias ssu='sudo su'
#alias cp='cp -i'
#alias mv='mv -i'
alias rm='rm -i'
#alias ga='git add . ; find . -size +50M ! -path *git* | xargs git reset HEAD'
alias ga='find . -size +100M ! -path *git* | cut -c 3- > .gitignore; git add .'
alias gs='git status'
alias gc='git commit -m 'update''
alias gp='git push'
 
alias activate='. ~/ENV/ubuntu_env/bin/activate'
alias activatepy2='. ~/ENV/py2_env/bin/activate'
#alias orange='activate; python3 -m Orange.canvas &'
alias orange 'python3 -m Orange.canvas &'
 
alias dm='docker-machine'
") >> ~/.bashrc 1> /dev/null
```













