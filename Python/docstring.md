# Python中的多行注释文档编写风格汇总

参考：https://blog.csdn.net/sinat_30603081/article/details/80938642

## 1、什么是docstring
在软件工程中，其实编码所占的部分是非常小的，大多是其它的事情，比如写文档。文档是沟通的工具。 
在Python中，比较推崇在代码中写文档，代码即文档，比较方便，容易维护，直观，一致。 
代码写完，文档也出来了。其实Markdown也差不多这种思想，文本写完，排版也完成了。 
看看PEP 0257中对docstring的定义：
```
A docstring is a string literal that occurs as the first statement in 
a module, function, class, or method definition. Such a docstring 
becomes the __doc__ special attribute of that object.
```
简单来说，就是出现在模块、函数、类、方法里第一个语句的，就是docstring。会自动变成属性__doc__。















reST风格


"""
This is a reST style.

:param param1: this is a first param
:param param2: this is a second param
:returns: this is a description of what is returned
:raises keyError: raises an exception
"""

