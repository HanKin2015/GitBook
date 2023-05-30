# Jupyter Notebook

## 1、常用的快捷键
Ctrl-Enter : 运行本单元
Alt-Enter : 运行本单元并插入新单元
A : 在上方插入新单元
B : 在下方插入新单元
DD : 删除选中的单元

1 : 设定 1 级标题
2 : 设定 2 级标题
3 : 设定 3 级标题
4 : 设定 4 级标题
5 : 设定 5 级标题
6 : 设定 6 级标题

## 2、修改字体
C:\Users\Administrator\Anaconda3\Lib\site-packages\notebook\static\components\codemirror\lib\codemirror.css
```
/* BASICS */

.CodeMirror {
  /* Set height, width, borders, and global font properties here */
  font-family: Consolas, monospace;
  height: 300px;
  color: black;
  direction: ltr;
}
div.output_area pre {
  font-family: Consolas, monospace;
}
```

## 3、修改主题背景
pip install jupyterthemes
pip install --upgrade jupyterthemes
jt -l
jt -t onedork -f fira -fs 13 -cellw 90% -ofs 11 -dfs 11 -T -N
```
  -h             显示此帮助信息并退出
  -l             列出可用主题
  -t             配置需要安装的主题
  -f             代码的字体
  -fs            代码字体大小
  -nf            notebook 字体
  -nfs           notebook 字体大小
  -tf            文本的字体
  -tfs           文本的字体大小
  -dfs           pandas类型的字体大小
  -ofs           输出区域字体大小
  -mathfs        (in %) 数学公式字体大小
  -m MARGINS, --margins MARGINS    fix margins of main intro page
  -cursw         设置光标宽度
  -cursc         (r, b, g, p) 设置光标颜色
  -cellw         (px or %) 单元的宽度
  -lineh         (%) 行高
  -altp, --altprompt     alt input prompt style
  -altmd, --altmarkdown  alt markdown cell style
  -altout, --altoutput   set output bg color to notebook bg
  -P, --hideprompt       hide cell input prompt
  -T, --toolbar          make toolbar visible（工具栏可见）
  -N, --nbname           nb name/logo visible
  -vim, --vimext         toggle styles for vim
  -r, --reset            reset to default theme（设置成默认主题）
  -dfonts         设置成浏览器默认字体
```
恢复默认主题：jt -r

## 4、显示行号
view->toggle line numbers

## 5、自动换行
C:\Users\Administrator\.jupyter\nbconfig\notebook.json
```
{
  "load_extensions": {
    "nbextensions_configurator/config_menu/main": true,
    "contrib_nbextensions_help_item/main": true,
    "jupyter-js-widgets/extension": true,
    "codefolding/main": true,
    "code_font_size/code_font_size": false,
    "toc2/main": true,
    "scratchpad/main": false,
    "code_prettify/code_prettify": false,
    "autoscroll/main": false,
    "python-markdown/main": false,
    "scroll_down/main": false,
    "snippets/main": false,
    "ruler/main": false,
    "notify/notify": false,
    "hide_input/main": false,
    "freeze/main": false,
    "hide_input_all/main": false,
    "qtconsole/qtconsole": false,
    "code_prettify/autopep8": false
  },
  "MarkdownCell": {
    "cm_config": {
      "lineWrapping": true
    }
  },
  "CodeCell": {
    "cm_config": {
      "lineWrapping": true
    }
  },
  "Cell": {
    "cm_config": {
      "lineNumbers": true
    }
  },
  "Notebook": {
    "Header": true,
    "Toolbar": true
  },
  "toc2": {
    "number_sections": false,
    "skip_h1_title": true,
    "collapse_to_match_collapsible_headings": false
  }
}
```

## 6、Jupyter notebook更换工作目录
默认是使用c盘，打开后无法更换磁盘。
因此，使用ananconda prompt窗口使用命令打开（cmd窗口不行，powershell窗口自然也不行），jupyter notebook或者jupyter lab。

打开Anaconda Powershell
cd命令到目标文件夹
输入命令“jupyter notebook”

## 7、jupyter lab
https://zhuanlan.zhihu.com/p/92495340
JupyterLab作为一种基于web的集成开发环境，你可以使用它编写notebook、操作终端、编辑markdown文本、打开交互模式、查看csv文件及图片等功能。
注意安装的时候是jupyterlab，使用命令打开的时候却是jupyter lab。

### 7-1、安装
注意conda的安装。
```
pip install jupyterlab
conda install -c conda-forge jupyterlab
```

- 界面变得更加美观，使用F11全屏达到更好的效果
- 和jupyter notebook是有区别的，和之前的比赛提供的环境居然是一样的，强烈推荐

### 7-2、快捷键
参考：https://blog.csdn.net/u013250861/article/details/122987372

#### 7-2-1、命令模式 (按键 Esc 开启)
```
Enter : 转入编辑模式
Shift-Enter : 运行本单元，选中下个单元
Ctrl-Enter : 运行本单元
Alt-Enter : 运行本单元，在其下插入新单元
Y : 单元转入代码状态
M :单元转入markdown状态
R : 单元转入raw状态
1 : 设定 1 级标题
2 : 设定 2 级标题
3 : 设定 3 级标题
4 : 设定 4 级标题
5 : 设定 5 级标题
6 : 设定 6 级标题
Up : 选中上方单元
K : 选中上方单元
Down : 选中下方单元
J : 选中下方单元
Shift-K : 扩大选中上方单元
Shift-J : 扩大选中下方单元
A : 在上方插入新单元
B : 在下方插入新单元    (注意是命令模式，单独的b键)
X : 剪切选中的单元
C : 复制选中的单元
Shift-V : 粘贴到上方单元
V : 粘贴到下方单元
Z : 恢复删除的最后一个单元
D,D : 删除选中的单元
Shift-M : 合并选中的单元
Ctrl-S : 文件存盘
S : 文件存盘
L : 转换行号
O : 转换输出
Shift-O : 转换输出滚动
Esc : 关闭页面
Q : 关闭页面
H : 显示快捷键帮助
I,I : 中断Notebook内核
0,0 : 重启Notebook内核
Shift : 忽略
Shift-Space : 向上滚动
Space : 向下滚动
```

#### 7-2-2、编辑模式 ( Enter 键启动)
```
Tab : 代码补全或缩进
Shift-Tab : 提示
Ctrl-] : 缩进
Ctrl-[ : 解除缩进
Ctrl-A : 全选
Ctrl-Z : 复原
Ctrl-Shift-Z : 再做
Ctrl-Y : 再做
Ctrl-Home : 跳到单元开头
Ctrl-Up : 跳到单元开头
Ctrl-End : 跳到单元末尾
Ctrl-Down : 跳到单元末尾
Ctrl-Left : 跳到左边一个字首
Ctrl-Right : 跳到右边一个字首
Ctrl-Backspace : 删除前面一个字
Ctrl-Delete : 删除后面一个字
Esc : 进入命令模式
Ctrl-M : 进入命令模式
Shift-Enter : 运行本单元，选中下一单元
Ctrl-Enter : 运行本单元
Alt-Enter : 运行本单元，在下面插入一单元
Ctrl-Shift-- : 分割单元
Ctrl-Shift-Subtract : 分割单元
Ctrl-S : 文件存盘
Shift : 忽略
Up : 光标上移或转入上一单元
Down :光标下移或转入下一单元
```

## 8、Grid studio
一个界面上同时展示可视化表格与代码，而且同时通过表格与代码修改数据，这不就是 Python 与 Excel 的结合吗？

### 8-1、安装
```
git clone https://github.com/ricklamers/gridstudio
cd gridstudio && ./run.sh
```

## 9、IPython

### 9-1、魔术命令
IPython是一个交互式的Python解释器，它提供了许多有用的魔术命令来增强交互式编程体验。以下是一些常用的IPython魔术命令：
```
%run: 运行Python脚本文件
%load: 加载外部Python脚本文件
%timeit: 测试代码的执行时间
%debug: 进入调试模式
%reset: 重置命名空间
%who: 列出当前命名空间中的变量
%whos: 显示当前命名空间中的变量的详细信息
%history: 显示历史命令
%matplotlib: 配置Matplotlib图形库
%pwd: 显示当前工作目录
%cd: 更改当前工作目录
%ls: 列出当前工作目录中的文件和文件夹
%mkdir: 创建新的文件夹
%rm: 删除文件或文件夹
%cp: 复制文件或文件夹
%mv: 移动文件或文件夹
%paste 粘贴文本
%pdb 调试工具
%%writefile：将代码写入文件
使用%lsmagic命令列出所有可用的魔术命令
```
这些魔术命令可以通过在IPython中输入%符号后跟命令名称来调用。例如，要运行Python脚本文件，可以使用%run命令，如下所示：
```
%run my_script.py
```
IPython是一个交互式的Python解释器，可以提供更好的交互式编程体验。如果你使用的是Anaconda发行版，IPython已经包含在其中，无需额外安装。

### 9-2、在anaconda执行ipython报错TypeError: __init__() got an unexpected keyword argument 'inputhook'
在另外一台电脑执行命令正常，猜测可能需要升级一下ipython。
conda update ipython  卡住
pip install --upgrade ipython
将版本从7.8.0升级到7.34.0后正常。
```
In [2]: pwd
Out[2]: 'D:\\Github\\Storage\\python\\windows_hook'

In [3]: cd ..
D:\Github\Storage\python

In [4]: mkdir ipython

In [5]: cd ipython/
D:\Github\Storage\python\ipython

In [6]: ls
 驱动器 D 中的卷是 新加卷
 卷的序列号是 641B-9BCA

 D:\Github\Storage\python\ipython 的目录

2023/04/20  16:58    <DIR>          .
2023/04/20  16:58    <DIR>          ..
               0 个文件              0 字节
               2 个目录  3,970,531,328 可用字节

In [7]: %run helloworld.py
******** starting ********
hello python
process spend 0.002 s.
```
这好像就是Spyder软件的Terminal。



