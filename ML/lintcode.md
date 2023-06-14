# lintcode人工智能学习
https://www.lintcode.com/learn?dimension_id=103&level_id=104

学习笔记见：D:\Github\Machine_to_DeepingLearning\Note\LintCode

## 1、Windows 系统下的环境安装配置
Anaconda是Python的一个科学计算发行版，内置了Python和数百个Python经常会使用的库，也包括许多我们做机器学习或数据挖掘的库，包括Scikit-learn、NumPy、SciPy、Pandas等，其中可能有一些还是深度学习框架TensorFlow的依赖库。

包含了教程主要使用的编辑器——IPython Jupyter Notebook。

使用 pip 指令依次下载并安装 numpy, pandas, scikit-learn 三个工具库以完成环境配置。

## 2、Pandas 数据结构
pandas 是一个 Python Data Analysis Library（数据分析库），它是基于 NumPy 的一个开源 Python 库，它被广泛用于数据分析，以及数据清洗和准备等工作。数据科学家经常和表格形式的数据（比如.csv、.tsv、.xlsx）打交道。

Pandas Series 类似表格中的一个列（column），类似于一维数组，可以保存任何数据类型。

示例练习见：http://nbviewer.jupyter.org/github/HanKin2015/Machine_to_DeepingLearning/Note/LintCode/pandas.ipynb

简单的向量化操作 Series 与 ndarray 的表现一致。

Series 和 ndarray 不同的地方在于, Series 的操作默认是使用 index 的值进行对齐的,而不是相对位置。

### 2-1、Series 与 Python 的 Dict 类型对比
二者都存在映射关系，字典是一种将任意键映射到一组任意值的数据结构，而 Series 对象其实是一种将类型键映射到一组类型值的数据结构，类型至关重要。

就像 Numpy 数组背后特定类型的经过编译的代码使得它在某些操作上比普通的 Python 列表更加高效一样，Pandas Serise 的类型信息适得它在某些操作上比 Python 的字典更高效。另外，和字典不同，Series 对象还支持数组形式的操作，比如切片。
























