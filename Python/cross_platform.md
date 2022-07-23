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

### 2-1、相对路径和绝对路径
Absolute path
Relative path

我们常用'/'来表示相对路径，'\'来表示绝对路径，'\'也可能是转义的意思。

获得当前文件夹的绝对路径，如下：
```
import os
path1 = os.path.abspath('.')   #表示当前所处的文件夹的绝对路径
path2 = os.path.abspath('..')  #表示当前所处的文件夹上一级文件夹的绝对路径

>>> os.path.abspath('.')
'/media/hankin/vdb/client'
```
所以我们常设置一个path1的全局变量来表示当前的绝对路径，再加上相对路径来打开需要打开的文件，这么做是为了在不同的平台上不冲突，因为不同平台在相对路径上的表示上存在区别。

### 2-2、Windows平台
直接使用python代码打开路径没有什么问题，关键是执行dos命令就会有问题了。

在新建文件夹下创建了1.txt 2.txt 3.txt 4.txt 5.txt等五个文件。
```
D:\Users\User\Desktop\新建文件夹>del .\a.txt
找不到 D:\Users\User\Desktop\新建文件夹\a.txt

D:\Users\User\Desktop\新建文件夹>del ./1.txt
无效开关 - "1.txt"。

D:\Users\User\Desktop\新建文件夹>del .\1.txt

D:\Users\User\Desktop\新建文件夹>del .\\2.txt

D:\Users\User\Desktop\新建文件夹>del 3.txt

D:\Users\User\Desktop\新建文件夹>del /4.txt
无效开关 - "4.txt"。

D:\Users\User\Desktop\新建文件夹>del .//4.txt
无效开关 - "/"。

D:\Users\User\Desktop\新建文件夹>D:\Users\User\Desktop\新建文件夹/4.txt

D:\Users\User\Desktop\新建文件夹>del D:\Users\User\Desktop\新建文件夹/4.txt
无效开关 - "4.txt"。

D:\Users\User\Desktop\新建文件夹>del "D:\Users\User\Desktop\新建文件夹/4.txt"
系统找不到指定的路径。

D:\Users\User\Desktop\新建文件夹>del “D:\Users\User\Desktop\新建文件夹/4.txt”
无效开关 - "4.txt”"。

D:\Users\User\Desktop\新建文件夹>del "./4.txt"

D:\Users\User\Desktop\新建文件夹>del "D:\Users\User\Desktop\新建文件夹/5.txt"
系统找不到指定的路径。

D:\Users\User\Desktop\新建文件夹>del "D:\Users\User\Desktop\新建文件夹\5.txt"
```

前两个都是相对路径，第三个则是绝对路径。
```
open('aaa.txt')
open('/data/bbb.txt')
open('D:\\user\\ccc.txt')

#D:\user\aaa.txt
#D:\user\data\bbb.txt
#D:\user\ccc.txt
```

### 3、Linux平台
只能/设置路径。\怎么写都不行，就很统一。








