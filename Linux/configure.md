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
set softtabstop=4

" 
set expandtab

" 搜索逐字符高亮
set hlsearch
set incsearch

" 代码补全
set completeopt=preview,menu

" 在处理未保存或只读文件的时候,弹出确认
set confirm

 " 可以在buffer的任何地方使用鼠标(类似office中在工作区双击鼠标定位)
set mouse=a
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