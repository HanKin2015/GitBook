[TOC]

# 1、打开和杀死exe文件
```
import os
    
if __name__ == "__main__":
    app_dir = r'G:\yeshen\Nox\bin\Nox.exe'#指定应用程序目录
	os.startfile(app_dir) #os.startfile（）打开外部应该程序，与windows双击相同
	
	
	
```


# 2、线程
Windows下没有fork函数。

# 3、将py文件打包成exe文件

# 4、程序：枚举Windows下运行的程序

# 5、快速进行多个字符替换的方法
要替换的字符数量不多时，可以直接链式replace()方法进行替换，效率非常高；
如果要替换的字符数量较多，则推荐在 for 循环中调用 replace() 进行替换。

# 6、两个列表转换成字典
a = ['x', 'y', 'z']
b = [1, 2, 3]
c = dict(zip(a, b))

# 7、json格式
```
>>> import json
>>> print json.dumps({'a': 'Runoob', 'b': 7}, sort_keys=True, indent=4, separators=(',', ': '))
{
    "a": "Runoob",
    "b": 7
}
```

# 8、rsa加密解密







