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
这样就可以了：
export PS1='[\u@\h: $PWD]\033[01;36m $(__git_ps1) \[\033[00m\] \$ '
```

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

" 自动缩进和对齐
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
```










## 8、bashrc
```/root/.bashrc
export PS1='[\u@\h: $PWD]\033[01;36m $(__git_ps1) \[\033[00m\] \$ '
```

## Kconfig
https://zhuanlan.zhihu.com/p/78254770
自从 Linux 内核代码迁移到 Git 以来，Linux 内核配置/构建系统（也称为 Kconfig/kbuild）已存在很长时间了。然而，作为支持基础设施，它很少成为人们关注的焦点；甚至在日常工作中使用它的内核开发人员也从未真正思考过它。

为了探索如何编译 Linux 内核，本文将深入介绍 Kconfig/kbuild 内部的过程，解释如何生成 .config 文件和 vmlinux/bzImage 文件，并介绍一个巧妙的依赖性跟踪技巧。

Kconfig
构建内核的第一步始终是配置。Kconfig 有助于使 Linux 内核高度模块化和可定制。




