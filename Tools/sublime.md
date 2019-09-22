# sublime显示制表符(tab和空格符)
不同文件可能按tab键显示的一条线或者4个空格，会有不一样的显示，需要注意一下。

>"draw_white_space": "all"

## 修改tab键为缩进为四个空格
// The number of spaces a tab is considered equal to
"tab_size": 4,
// Set to true to insert spaces when tab is pressed
"translate_tabs_to_spaces": true,
//设置保存时自动转换
"expand_tabs_on_save": true




# 没有包含头文件unistd.h
```
close’ was not declared in this scope
‘read’ was not declared in this scope
‘sysconf’ was not declared in this scope
```
没有包含头文件 unistd.h 造成的。

加上
#include <unistd.h>


