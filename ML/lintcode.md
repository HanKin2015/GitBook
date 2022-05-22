# lintcode人工智能学习

## 1、Windows 系统下的环境安装配置
Anaconda是Python的一个科学计算发行版，内置了Python和数百个Python经常会使用的库，也包括许多我们做机器学习或数据挖掘的库，包括Scikit-learn、NumPy、SciPy、Pandas等，其中可能有一些还是深度学习框架TensorFlow的依赖库。

包含了教程主要使用的编辑器——IPython Jupyter Notebook。

使用 pip 指令依次下载并安装 numpy, pandas, scikit-learn 三个工具库以完成环境配置。

## 2、Pandas 数据结构
pandas 是一个 Python Data Analysis Library（数据分析库），它是基于 NumPy 的一个开源 Python 库，它被广泛用于数据分析，以及数据清洗和准备等工作。数据科学家经常和表格形式的数据（比如.csv、.tsv、.xlsx）打交道。

Pandas Series 类似表格中的一个列（column），类似于一维数组，可以保存任何数据类型。

```
原型：pandas.Series(data, index, dtype, name, copy)
# 带索引的一列数据
[in]: s1 = pd.Series([1, 2, 3, 4, 5])
[in]: print(s1)
# 索引为 a b c d e
[in]: s2 = pd.Series(np.arange(5), index=['a', 'b', 'c', 'd', 'e'])
[in]: print(s2)
# 创建一个字典,用key来构成表的索引
[in]: temp_dict = {"name": "zhangsan", "age": 27, "tel": 10086}
      # 字典数据直接传入data
[in]: s3 = pd.Series(temp_dict)
[in]: print(s3)
# data 是标量时,指定索引 index,得到一个值为 data 等长的 Series
[in]: s4 = pd.Series(1., index=list("abcde"))
[in]: print(s4)
```
























