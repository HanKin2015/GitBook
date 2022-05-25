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
jt -l
jt -t onedork -f fira -fs 13 -cellw 90% -ofs 11 -dfs 11 -T -N

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






