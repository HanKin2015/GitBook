# glob库
python标准库之glob介绍
glob 文件名模式匹配，不用遍历整个目录判断每个文件是不是符合。
```
import glob
for name in glob.glob('dir/*'):
    print (name)
```








