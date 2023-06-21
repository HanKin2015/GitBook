# linux终端terminal个性化配置
本文涵盖bashrc文件、alias个性化设置、vimrc配置、ssh配置等等。

## 1、多个配置文件路径
~/.profile
~/.bashrc
~/.viminfo
修改完毕后记得使用source命令是文件生效。

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

或者：
```
export PS1='\[\033[1m\]\[\033[31m\][\[\033[0m\]${debian_chroot:+($debian_chroot)}\[\033[01;32m\]\u@\[\033[36m\]\h\[\033[0m\]\[\033[00m\]:\[\033[01;34m\]\w    \[\033[00m\]\[\033[1m\]\[\033[31m\]]\[\033[0m\]\[\033[1m\]$(__git_ps1) \[\033[33m\]\$\[\033[0m\]'
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
这样就可以了：
export PS1='[\u@\h:$PWD]\033[01;36m$(__git_ps1)\[\033[00m\] \$ '
可能会遇到报错：bash: __git_ps1: command not found...
解决方法：
find / -name git-prompt.sh
curl -L https://raw.github.com/git/git/master/contrib/completion/git-prompt.sh > ~/.bash_git
source xxxx/git-prompt.sh
```

完全可以使用__git_ps1自带函数代替git_branch函数

```/root/.bashrc
export PS1='[\u@\h: $PWD]\033[01;36m $(__git_ps1) \[\033[00m\] \$ '
```

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

linux打开终端快捷键：
ctrl + alt + t  新窗口中打开
ctrl + shift +t 新标签页中打开

Bash还有一个特殊的“召回”模式，您可以使用它来搜索先前运行的命令，而不是逐个滚动。
Ctrl + R：调用与您提供的字符匹配的最后一个命令。按此快捷方式，然后开始输入以搜索您的bash历史记录以获取命令。
Ctrl + O：运行您使用Ctrl + R找到的命令。
Ctrl + G：保留历史搜索模式，不运行命令。

## 5、alias个性化设置
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

## 7、vimrc配置
https://blog.csdn.net/yujia_666/article/details/108153022

```/etc/vimrc

" 显示行号
set number

" 设置高亮行和列(简写cuc cul)
set cursorline
set cursorcolumn

" 高亮行和列样式修改
highlight CursorLine   cterm=NONE ctermbg=black ctermfg=green guibg=NONE guifg=NONE
highlight CursorColumn cterm=NONE ctermbg=black ctermfg=green guibg=NONE guifg=NONE

" 自动缩进和智能缩进
set autoindent
set smartindent

" Tab键的宽度
set tabstop=4

" 统一缩进为4(代码对齐=)
set shiftwidth=4

" 效果是tab键后向左移动变成4个空格
set softtabstop=4

" 將tab键转成space,注意makefile文件的缩进不能开启
set expandtab

" 搜索逐字符高亮
set hlsearch
set incsearch

" 代码补全
set completeopt=preview,menu

" 在处理未保存或只读文件的时候,弹出确认
set confirm

" 可以在buffer的任何地方使用鼠标(类似office中在工作区双击鼠标定位) 打开鼠标功能
set mouse=a

" 关闭鼠标功能(建议关闭或者不设置,否则会出现鼠标右键不能复制问题)
set mouse-=a
set mouse=

set selection=exclusive
set selectmode=mouse,key

" 搜索忽略大小写
set ignorecase

" 在被分割的窗口间显示空白,便于阅读
set fillchars=vert:\ ,stl:\ ,stlnc:\

" 高亮显示匹配的括号
set showmatch

" 匹配括号高亮的时间（单位是十分之一秒）
set matchtime=1

set nocompatible			"去掉有关vi一致性模式，避免以前版本的bug和局限    
set nu!						"显示行号
set guifont=Luxi/ Mono/ 9	"设置字体，字体名称和字号
filetype on					"检测文件的类型     
set history=1000			"记录历史的行数
set background=dark			"背景使用黑色
syntax on					"语法高亮度显示
set autoindent				"vim使用自动对齐，也就是把当前行的对齐格式应用到下一行(自动缩进）
set cindent					"cindent是特别针对C语言语法自动缩进
set smartindent				"依据上面的对齐格式，智能的选择对齐方式，对于类似C语言编写上有用   
set tabstop=4				"设置tab键为4个空格，
set shiftwidth=4			"设置当行之间交错时使用4个空格     
set ai!						"设置自动缩进 
set showmatch				"设置匹配模式，类似当输入一个左括号时会匹配相应的右括号      
set guioptions-=T			"去除vim的GUI版本中得toolbar   
set vb t_vb=				"当vim进行编辑时，如果命令错误，会发出警报，该设置去掉警报       
set ruler					"在编辑过程中，在右下角显示光标位置的状态行     
set nohls					"默认情况下，寻找匹配是高亮度显示，该设置关闭高亮显示     
set incsearch				"在vim中查询一单词，在/后输入第一个字符时自动匹配单词的位置
set backspace=2				"设置退格键可用

"修改一个文件后，自动进行备份，备份的文件名为原文件名加“~”后缀
if has("vms")
set nobackup
else
set backup
endif

" 代码对齐将tab键转换为空格
set ts=4
set expandtab
set autoindent
```

## 8、不错的ssh配置
```
# /.profile : env for login

. /.PATH
PS1="\[\033[01;31m\]hankin:aSV/\h \[\033[01;32m\]\w \[\033[01;31m\]# \[\033[00m\]"
alias ls="ls -F --color=auto"
alias l="ls"
alias ll="ls -l"
alias la="ls -A"
alias lsd="ls -d */"
alias lh="ls -lAh"
alias s="cd .."
alias p="cd -"
alias md="mkdir"
alias rd="rmdir"
alias rm="rm -i"
alias cp="cp -i"
alias mv="mv -i"
alias x="exit"
alias h="history"
alias du="du -h"
alias df="df -h"
which () { type -p "$@" ;}
USER=`whoami`
HOSTNAME=`hostname`
HISTSIZE=1
#HISTFILESIZE=1000
#HISTFILE="/$LROOT/log/today/.$(date +%y%m%d.%H%M%S)-$(who am i | sed 's/ .* //g').hist"
#date >> "${HISTFILE}"
INPUTRC=/etc/inputrc
export PATH PS1 USER HOSTNAME HISTSIZE HOME INPUTRC
cd $LROOT
#cat /etc/issue
# 给SSH 用，客户端连接服务端，等保要求空闲10min就超时
# 允许通过外部指定TMOUT超时值
test -n "${TMOUT}" || export TMOUT=600
```

## 9、Bash与Dash的概念及区别
![](https://img-blog.csdn.net/20180717114409303?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zOTIxMjc3Ng==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

Shell的多样性下的bash与dash

我们可能会问：既然shell是解释命令的工具，那么这个工具可不可以多样化呢？不同的解释工具可不可以遵从不同的规则呢？
这是必然的咯，何况是像Linux这种开源的好东西，怎么会缺乏多样性呢？！
所以，我们不难就理解Linux中的shell有多种类型了吧，这其中最常用的几种是Bourne shell（sh）、C shell（csh）和Korn shell（ksh）。其中三种shell各有优缺点：

Bourne shell是UNIX最初使用的shell，并且在每种UNIX上都可以使用。Bourne shell在shell编程方面相当优秀，但在处理与用户的交互方面做得不如其他几种shell。

Bourne Again shell，它是Linux操作系统缺省的shell，是Bourne shell的扩展，简称Bash，与Bourne shell完全向后兼容，并且在Bourne shell的基础上增加、增强了很多特性。Bash放在/bin/bash中，它有许多特色，可以提供如命令补全、命令编辑和命令历史表等功能，它还包含了很多C shell和Korn shell中的优点，有灵活和强大的编程接口，同时又有很友好的用户界面。
所以在GNU/Linux 操作系统中的 /bin/sh 是 bash（Bourne-Again Shell）的符号链接（但是这只是比较原始的做法，现在开始有了新的做法了），也就是若脚本第一行为“#!/bin/bash”，我们使用命令：”sh script_name.sh“时是调用的bash去解释脚本；

下面我们接着来看看所谓的新的改变
Dash，GNU/Linux操作系统中的/bin/sh本是bash (Bourne-Again Shell) 的符号链接，但鉴于bash过于复杂，有人把bash从NetBSD移植到Linux并更名为dash (Debian Almquist Shell)，并建议将/bin/sh指向它，以获得更快的脚本执行速度。Dash Shell 比Bash Shell小的多，符合POSIX标准。也就是若脚本第一行为“#!/bin/sh”，我们使用命令：”sh script_name.sh“时是调用的dash去解释脚本；

Ubuntu继承了Debian，所以从Ubuntu 6.10开始默认是Dash Shell。

### 9-1、实战
为什么把参数-e都输出了呢？这不是我们想要的啊！

原来是我的Ubuntu 默认的sh命令调用dash去解释一个改用bash去解释的shell script，因为dash 对echo命令的解释标准中不支持 -e 参数，故出错！

```
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #dash bash_dash.sh
-e he   jian
hello   world
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #bash bash_dash.sh
he      jian
hello\tworld
[root@ubuntu0006:/media/hankin/vdb/study/log/shell] #cat bash_dash.sh
#/bin/sh

echo -e "he\tjian"
echo "hello\tworld"
```

## 10、zsh
想知道你的系统有几种 shell：cat /etc/shells

Zsh 是一个 Linux 下强大的 shell, 由于大多数 Linux 产品安装，以及默认使用bash shell, 但是丝毫不影响极客们对 zsh 的热衷, 几乎每一款 Linux 产品都包含有 zsh，通常可以用 apt-get、urpmi 或 yum 等包管理器进行安装

Zsh 具有以下主要功能
- 开箱即用、可编程的命令行补全功能可以帮助用户输入各种参数以及选项
- 在用户启动的所有 shell 中共享命令历史
- 通过扩展的文件通配符，可以不利用外部命令达到 find 命令一般展开文件名
- 改进的变量与数组处理
- 在缓冲区中编辑多行命令
- 多种兼容模式，例如使用 / bin/sh 运行时可以伪装成 Bourne shell
- 可以定制呈现形式的提示符；包括在屏幕右端显示信息，并在键入长命令时自动隐藏
- 可加载的模块，提供其他各种支持：完整的 TCP 与 Unix 域套接字控制，FTP 客户端与扩充过的数学函数
- 完全可定制化

之前是因为看到这篇文章：终极 Shell——Zsh 才选择使用 zsh，被它的自动完成、补全功能吸引了。官网：www.zsh.org
选择 oh-my-zsh, oh-my-zsh 是基于 zsh 的功能做了一个扩展，方便的插件管理、主题自定义，以及漂亮的自动完成效果。
在 Github 上找关于 zsh 的项目时发现的，试用了一下觉得很方便，不用像上面文章里面提到的那么复杂，配置一些插件的名称即可使用相应的功能。
官网：https://github.com/robbyrussell/oh-my-zsh

更详细配置见：https://zhuanlan.zhihu.com/p/514153374

## 11、修改linux命令行提示符路径显示

修改环境变量PS1（命令行提示符）

vi编辑~/.bashrc文件（个人的配置文件）

root权限 vi编辑/etc/profile文件在最后加上一行语句

> export PS1=’[\u@\h $PWD]\\$ ‘

修改完成后，执行: source /etc/profile 使配置生效即可。 

- 最后的地方需要留有一个空格，使用符号和命令中间有隔开
- 最后的$和\\$有区别，最好\\$，\\$会根据root用户和普通用户转换
- $PWD和\\W区别：前者显示完整路径，后者只显示当前的路径，及文件夹名。注意使用\\w可以显示当前完整的工作路径
- 其中\u显示当前用户账号，\h显示当前主机名，\w显示当前完整工作路径（**\W显示当前工作路径**），\\$显示对应的符号。



