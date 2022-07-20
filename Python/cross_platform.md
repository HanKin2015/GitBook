# 跨平台编程

## 1、判断当前系统
```
import sys
# 是否为Windows系统
is_windows = False
if sys.platform == 'win32' or sys.platform == 'win64':
    is_windows = True
```

## 2、路径字符串

### 1-1、Windows平台
我们常用'/'来表示相对路径，'\'来表示绝对路径，'\'也可能是转义的意思.

前两个都是相对路径，第三个则是绝对路径。








