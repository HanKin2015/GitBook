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

全TM是高数。

### 3-1、两者概念理解
!()[https://img2020.cnblogs.com/blog/817128/202007/817128-20200730233208013-382607328.png]

### 3-2、单位矩阵
在矩阵的乘法中，有一种矩阵起着特殊的作用，如同数的乘法中的1，这种矩阵被称为单位矩阵。它是个方阵，从左上角到右下角的对角线（称为主对角线）上的元素均为1。除此以外全都为0。
根据单位矩阵的特点，任何矩阵与单位矩阵相乘都等于本身，而且单位矩阵因此独特性在高等数学中也有广泛应用。

### 3-3、主对角线 
在一个n阶方阵(或是n阶行列式)中，从左上角到右下角这一斜线方向上的n 个元素所在的对角线，叫做n 阶方阵(或行列式)的主对角线。

次对角线

### 3-4、矩阵乘法
矩阵相乘最重要的方法是一般矩阵乘积。它只有在第一个矩阵的列数（column）和第二个矩阵的行数（row）相同时才有意义 。一般单指矩阵乘积时，指的便是一般矩阵乘积。一个m×n的矩阵就是m×n个数排成m行n列的一个数阵。由于它把许多数据紧凑地集中到了一起，所以有时候可以简便地表示一些复杂的模型，如电力系统网络模型。

即mxn矩阵乘以nxk矩阵等于mxk矩阵。

详细见：https://baike.baidu.com/item/%E7%9F%A9%E9%98%B5%E4%B9%98%E6%B3%95/5446029?fr=aladdin

### 3-5、转置矩阵
将矩阵的行列互换得到的新矩阵称为转置矩阵，转置矩阵的行列式不变。

如果阶方阵和它的转置相等 ，即，则称矩阵为对称矩阵。
如果，则称矩阵为反对称矩阵。

### 3-6、正交矩阵
如果AAT=E（E为单位矩阵，AT表示“矩阵A的转置矩阵”）或ATA=E，则n阶实矩阵A称为正交矩阵。正交矩阵是实数特殊化的酉矩阵，因此总是属于正规矩阵。尽管我们在这里只考虑实数矩阵，但这个定义可用于其元素来自任何域的矩阵。正交矩阵毕竟是从内积自然引出的，所以对于复数的矩阵这导致了归一要求。正交矩阵不一定是实矩阵。实正交矩阵（即该正交矩阵中所有元都是实数）可以看做是一种特殊的酉矩阵，但也存在一种复正交矩阵，这种复正交矩阵不是酉矩阵。

在矩阵论中，正交矩阵（orthogonal matrix）是一个方块矩阵Q，其元素为实数，而且行与列皆为正交的单位向量，使得该矩阵的转置矩阵为其逆矩阵。

### 3-7、幺正矩阵
幺正矩阵表示的就是厄米共轭矩阵等于逆矩阵。对于实矩阵，厄米共轭就是转置，所以实正交表示就是转置矩阵等于逆矩阵。实正交表示是幺正表示的特例。

酉矩阵又译作幺正矩阵、么正矩阵。

### 3-8、共轭复数
共轭在数学、物理、化学、地理等学科中都有出现。 本意：两头牛背上的架子称为轭，轭使两头牛同步行走。共轭即为按一定的规律相配的一对。通俗点说就是孪生。在数学中有共轭复数、共轭根式、共轭双曲线、共轭矩阵等。

两个实部相等，虚部互为相反数的复数互为共轭复数（conjugate complex number）。（当虚部不等于0时也叫共轭虚数）复数z的共轭复数记作 （z上加一横，英文中可读作Conjugate z,z conjugate or z bar），有时也可表示为 。

### 3-9、厄米特矩阵
厄米特矩阵（Hermitian Matrix，又译作“埃尔米特矩阵”或“厄米矩阵”），指的是自共轭矩阵。矩阵中每一个第i行第j列的元素都与第j行第i列的元素的共轭相等。埃尔米特矩阵主对角线上的元素都是实数的，其特征值也是实数。

### 3-10、正规矩阵
正规矩阵在数学中是指与自己的共轭转置矩阵对应的复系数方块矩阵。任意正规矩阵都可在经过一个酉变换后变为对角矩阵，反过来所有可在经过一个酉变换后变为对角矩阵的矩阵都是正规矩阵。

### 3-11、矩形对角矩阵
对角矩阵(diagonal matrix)是一个主对角线之外的元素皆为0的矩阵，常写为diag（a1，a2,...,an) 。对角矩阵可以认为是矩阵中最简单的一种，值得一提的是：对角线上的元素可以为 0 或其他值，对角线上元素相等的对角矩阵称为数量矩阵；对角线上元素全为1的对角矩阵称为单位矩阵。对角矩阵的运算包括和、差运算、数乘运算、同阶对角阵的乘积运算，且结果仍为对角阵。

### 3-12、奇异值
见：http://t.zoukankan.com/cxq1126-p-13407279.html

## 4、SVD的使用
np.linalg.svd(a, full_matrices=True, compute_uv=True)

参数：
a : 是一个形如(M,N)矩阵
full_matrices：的取值是为0或者1，默认值为1，这时u的大小为(M,M)，v的大小为(N,N) 。否则u的大小为(M,K)，v的大小为(K,N) ，K=min(M,N)。
compute_uv：取值是为0或者1，默认值为1，表示计算u,s,v。为0的时候只计算s。

返回值：
总共有三个返回值u，s，v，其中s是对矩阵a的奇异值分解。s除了对角元素不为0，其他元素都为0，并且对角元素从大到小排列。s中有n个奇异值，一般排在后面的比较接近0，所以仅保留比较大的r个奇异值。

### 4-1、示例
参考：http://t.zoukankan.com/cxq1126-p-13407279.html
demo见：
共现矩阵见：https://blog.csdn.net/qq_35290785/article/details/98231826
主对角线为0，然后每个单词和当前行的单词是否靠近，靠近则加1，然后是个对称矩阵。

## 5、TruncatedSVD的使用
TruncatedSVD 的创建必须指定所需的特征数或所要选择的成分数，比如 2。一旦创建完成，你就可以通过调用 fit() 函数来拟合该变换，然后再通过调用 transform() 函数将其应用于原始矩阵。

使用sklearn中的TruncatedSVD进行文本主题分析的简要demo。通过主题分析，我们可以得到一个语料中的关键主题，即各个词语在主题中的重要程度，各个文章在各个主题上的倾向程度。并且可以根据它们，得到主题对应的关键词以及代表性文本。我前面写的一篇数据分析 一文看评论里的中超风云 就用到了主题分析的一种：

LSI（潜在语义分析），主题模型中较早也较为简单的一种，在sklearn库中以TruncatedSVD的形式实现，使用非常方便。

参考：http://www.manongjc.com/detail/31-hxqcjxxkjuloywt.html
```
class cuml.TruncatedSVD(*, algorithm='full', handle=None, n_components=1, n_iter=15, random_state=None, tol=1e-07, verbose=False, output_type=None)
```
TruncatedSVD 用于计算大矩阵 X 的前 K 个奇异值和向量。当 n_components 较小时，速度要快得多，例如在使用 3 个分量进行 3D 可视化时使用 PCA。

cuML 的 TruncatedSVD 是一个 array-like 对象或 cuDF DataFrame，并提供 2 种算法 Full 和 Jacobi。 Full(默认)使用完整的特征分解，然后选择前 K 个奇异向量。 Jacobi 算法要快得多，因为它迭代地尝试纠正前 K 个奇异向量，但可能不太准确。

参数：
algorithm：‘full’ or ‘jacobi’ 或 ‘auto’(默认 = ‘full’)
Full 使用协方差矩阵的特征分解然后丢弃分量。 Jacobi 在迭代校正时要快得多，但准确性较低。

handle：cuml.Handle
指定 cuml.handle 保存用于此模型中计算的内部 CUDA 状态。最重要的是，这指定了将用于模型计算的 CUDA 流，因此用户可以通过在多个流中创建句柄在不同的流中同时运行不同的模型。如果为 None，则创建一个新的。

n_components：int(默认值 = 1)
您想要的前 K 个奇异向量/值的数量。必须是 <= 数字(列)。

n_iter：int(默认值 = 15)
用于 Jacobi 求解器。迭代次数越多，精度越高，但速度越慢。

random_state：int /无(默认 = 无)
如果您希望重新启动 Python 时结果相同，请选择一个状态。

tol：浮点数(默认 = 1e-7)
如果算法 = “jacobi” 则使用。较小的容差可以提高准确性，但会减慢算法的收敛速度。

verbose：int 或布尔值，默认=False
设置日志记录级别。它必须是 cuml.common.logger.level_* 之一。有关详细信息，请参阅详细级别。

output_type：{‘input’, ‘cudf’, ‘cupy’, ‘numpy’, ‘numba’}，默认=无
用于控制估计器的结果和属性的输出类型的变量。如果为 None，它将继承在模块级别设置的输出类型 cuml.global_settings.output_type 。有关详细信息，请参阅输出数据类型配置。

注意：
TruncatedSVD(随机版本 [Jacobi])在您想要的组件数量远小于函数数量时非常棒。对最大奇异值和向量的逼近非常稳健，但是，当您需要很多很多组件时，这种方法会失去很多准确性。

TruncatedSVD的应用

TruncatedSVD 也称为潜在语义索引 (LSI)，它试图找到字数矩阵的主题。如果 X 以前以均值去除为中心，则 TruncatedSVD 与 TruncatedPCA 相同。TruncatedSVD 也用于信息检索任务、推荐系统和数据压缩。

有关其他文档，请参阅 scikitlearn’s TruncatedSVD docs 。




