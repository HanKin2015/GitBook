# CountVectorizer和TfidfVectorizer学习笔记

## 1、CountVectorizer()函数
CountVectorizer()函数只考虑每个单词出现的频率；然后构成一个特征矩阵，每一行表示一个训练文本的词频统计结果。其思想是，先根据所有训练文本，不考虑其出现顺序，只将训练文本中每个出现过的词汇单独视为一列特征，构成一个词汇表(vocabulary list)，该方法又称为词袋法(Bag of Words)。

### 1-1、导入和调用
```
from sklearn.feature_extraction.text import CountVectorizer,TfidfVectorizer

# 实例化（只列出常用的参数）
contv = CountVectorizer(encoding=u'utf-8', decode_error=u'strict', lowercase=True, stop_words=None,token_pattern=u'(?u)\b\w\w+\b',
                        ngram_range=(1, 1), analyzer=u'word', max_df=1.0, min_df=1,max_features=None, vocabulary=None, binary=False,
                        dtype=<type 'numpy.int64'>)

# 训练-传入数据
texts: 文档集合
cv_fit=contv.fit_transform(texts)

# 调用结果
print(cv_fit)   
print(cv_fit.toarray())    # 文档-词频 矩阵
print(contv.vocabulary_)   # 词库
```

### 1-2、参数解释
- lowercase : boolean,True by default：统计 词频(tf) 前，先将所有单词 转化为 小写。这个参数一般为True。
- stop_words : string {‘english’}, list, or None (default)：如果是‘english’, 则使用默认的内置英语停用词库。如果是 list，那么最后形成的 词库 将不包含 list 中的所有的stop word。如果是None, 则不处理停顿词。
- token_pattern : string：正则表达式'(?u)\\b\\w\\w+\\b'，默认筛选长度大于等于 2 的字母和数字混合字符，参数analyzer 设置为 word 时才有效。
如果想保留一个字符，可以将 pattern 改为 '(?u)\\b\\w*\\w*\\b'
- ngram_range : tuple (min_n, max_n)：默认是ngram_range=(1, 1)，该范围之内的 n 元 feature 都会被提取出来！这个参数要根据自己的需求调整
- analyzer : string, {‘word’, ‘char’, ‘char_wb’} or callable：特征基于 wordn-grams 还是character n-grams 
- min_df : float in range [0.0, 1.0] or int, default=1 设置最小 词频阈值， 小这个词频 的 词 都不会包含在 词库 中，小数表示占所有词数的百分比。该参数只适用于 自己没有指定词库的情况下
- max_df : float in range [0.0, 1.0] or int, default=1.0 设置最大 词频阈值， 大于这个词频 的 词 都不会包含在 词库 中，小数表示占所有词数的百分比。该参数只适用于 自己没有指定词库的情况下
- max_features : int or None, default=None：选择 词频 最大的 max_features个特征（单词）。有效的前提是参数vocabulary设置成Node，即自己没有指定 词库。
- vocabulary : 字典 or iterable, optional：自定义的词库，如果不是None，则只计算自定义 词库中的词的词频。
- binary : boolean, default=False：如果是True，词频 的值只有0和1，表示单词 出现和不出现 在词库中
- dtype, default=np.int64 : Type of the matrix returned by fit_transform() or transform()

### 1-3、例子
demo见：

## 2、TfidfVectorizer()函数
TfidfVectorizer()基于TF-IDF算法。此算法包括两部分TF和IDF，两者相乘得到TF-IDF算法。
TF算法统计某训练文本中，某个词的出现次数。

词频(TF) = 某词在文章中出现的次数 / 文章的总词数
IDF(x) = log[(N+1)/(N(x)+1)] + 1
N=训练集文本总数, N(x)=包含词x的文本数

TF-IDF算法=TF算法 * IDF算法

公式见：https://blog.csdn.net/weixin_46425692/article/details/108531027

### 2-1、导入和调用
```
from sklearn.feature_extraction.text import TfidfVectorizer

# 实例化
tfidf = TfidfVectorizer()

# 训练-导入数据
tf_fit=tfidf.fit_transform(texts)

# 调用结果
print(tfidf.vocabulary_)  #词库
print(tfidf.idf_)   # 词库中单词的 idf 值
print(tfidf_fit.toarray())  # tf-idf文档-词频 矩阵
print(tf_fit)
```
### 2-2、参数解释
这里面很多参数与 CountVectorizer()是相似的，这里只说道常用的几个参数。

- norm：'l1', 'l2', or None,optional， 默认为 l2， 表示对 TF-IDF文档-词频矩阵 的 每一行进行归一化
- use_idf：boolean， optional，当为 True 时，计算 TF-IDF文档-词频矩阵， 当为 False 时 计算
文档-词频矩阵，相当于 CountVectorizer()
- smooth_idf：boolean，optional，当为 True 时 就是：平滑参数=True之后的公式，默认是 True
- sublinear_tf：boolean， optional, 当为 True 时, tf(d,w) 变成 1 + log[tf(d,w)]

## 3、奇异值分解（SVD和TruncatedSVD）

### 3-1、两者概念理解
!()[https://img2020.cnblogs.com/blog/817128/202007/817128-20200730233208013-382607328.png]

### 3-2、单位矩阵
在矩阵的乘法中，有一种矩阵起着特殊的作用，如同数的乘法中的1，这种矩阵被称为单位矩阵。它是个方阵，从左上角到右下角的对角线（称为主对角线）上的元素均为1。除此以外全都为0。
根据单位矩阵的特点，任何矩阵与单位矩阵相乘都等于本身，而且单位矩阵因此独特性在高等数学中也有广泛应用。

### 3-3、主对角线 
在一个n阶方阵(或是n阶行列式)中，从左上角到右下角这一斜线方向上的n 个元素所在的对角线，叫做n 阶方阵(或行列式)的主对角线。

次对角线




