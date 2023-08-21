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
```
def foo():
  """ This is function foo"""
```
可通过foo.__doc__访问得到' This is function foo'.

## 2、各类docstring风格

### 2-1、Epytext
这是曾经比较流行的一直类似于javadoc的风格。
```
"""
This is a javadoc style.

@param param1: this is a first param
@param param2: this is a second param
@return: this is a description of what is returned
@raise keyError: raises an exception
"""
```

### 2-2、reST
这是现在流行的一种风格，reST风格，Sphinx的御用格式。
```
"""
This is a reST style.

:param param1: this is a first param
:param param2: this is a second param
:returns: this is a description of what is returned
:raises keyError: raises an exception
"""
```

### 2-3、Google风格
```
"""
This is a groups style docs.

Parameters:
  param1 - this is the first param
  param2 - this is a second param

Returns:
  This is a description of what is returned

Raises:
  KeyError - raises an exception
"""
```

### 2-4、Numpydoc (Numpy风格)
```
"""
My numpydoc description of a kind
of very exhautive numpydoc format docstring.

Parameters
----------
first : array_like
  the 1st param name `first`
second :
  the 2nd param
third : {'value', 'other'}, optional
  the 3rd param, by default 'value'

Returns
-------
string
  a value in a string

Raises
------
KeyError
  when a key error
OtherError
  when an other error
"""
```

### 2-5、docstring工具之第三方库pyment
用来创建和转换docstring. 
使用方法就是用pyment生成一个patch，然后打patch。
```
$ pyment test.py      #生成patch
$ patch -p1 < test.py.patch #打patch
```
详情：https://github.com/dadadel/pyment

使用sphinx的autodoc自动从docstring生产api文档，不用再手写一遍

我在代码中已经写过docstring了，写api文档的内容跟这个差不多，难道要一个一个拷贝过去rst吗？当然不用。sphinx有autodoc功能。 
首先编辑conf.py文件， 
1. 要有'sphinx.ext.autodoc'这个extensions 
2. 确保需要自动生成文档的模块可被import，即在路径中。比如可能需要sys.path.insert(0, os.path.abspath(‘../..'))

然后，编写rst文件，
```
xxx_api module
---------------------

.. automodule:: xxx_api
  :members:
  :undoc-members:
  :show-inheritance:
```
敲make html命令，就可以从docstring中生成相关的文档了，不用多手写一遍rst. 