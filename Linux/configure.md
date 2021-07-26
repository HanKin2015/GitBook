# linux环境开发配置设置

## 1、vimrc配置
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
```










## 2、bashrc
```/root/.bashrc
export PS1='[\u@\h: $PWD]\033[01;36m $(__git_ps1) \[\033[00m\] \$ '
```

## Kconfig
https://zhuanlan.zhihu.com/p/78254770
自从 Linux 内核代码迁移到 Git 以来，Linux 内核配置/构建系统（也称为 Kconfig/kbuild）已存在很长时间了。然而，作为支持基础设施，它很少成为人们关注的焦点；甚至在日常工作中使用它的内核开发人员也从未真正思考过它。

为了探索如何编译 Linux 内核，本文将深入介绍 Kconfig/kbuild 内部的过程，解释如何生成 .config 文件和 vmlinux/bzImage 文件，并介绍一个巧妙的依赖性跟踪技巧。

Kconfig
构建内核的第一步始终是配置。Kconfig 有助于使 Linux 内核高度模块化和可定制。

