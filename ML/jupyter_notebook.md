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
打开Anaconda Powershell
cd命令到目标文件夹
输入命令“jupyter notebook”





