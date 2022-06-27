# ML

## 1、基本流程
基本概念：通过已知数据，去学习数据中蕴含的规律或者判断规则。
已知数据主要用作学习的素材，而学习的目的是推广，也就是把学到的规则应用到未来新的数据上并做出判断或者预测。
基本流程：1.数据获取；2.数据预处理；3.特征工程；4.机器学习(模型训练)；5.模型评估(效果预测)
1）数据获取：自己采集；公开的数据集；(数据要具有代表性，广泛性)
2）数据预处理：归一化，离散化，去除共线性；(清洗数据，提高算法的效果)
3）特征工程：筛选显著特征，摒弃无用特征；(数据和特征工程决定了机器学习的结果上限，算法只是让模型尽可能逼近上限)
4）机器学习(模型训练)：选模型；调参优化；(不同模型以及不同参数，在同一数据集效果预测差异显著)
5）模型评估(效果预测)：过拟合,欠拟合；精准率(P)，召回率(F)；(高性能的模型对于数据具有较好的泛化性以及精确性)

## 2、混淆矩阵
混淆矩阵也称误差矩阵，是表示精度评价的一种标准格式，用n行n列的矩阵形式来表示。具体评价指标有总体精度、制图精度、用户精度等，这些精度指标从不同的侧面反映了图像分类的精度。在人工智能中，混淆矩阵（confusion matrix）是可视化工具，特别用于监督学习，在无监督学习一般叫做匹配矩阵。在图像精度评价中，主要用于比较分类结果和实际测得值，可以把分类结果的精度显示在一个混淆矩阵里面。混淆矩阵是通过将每个实测像元的位置和分类与分类图像中的相应位置和分类相比较计算的。

混淆矩阵（Confusion Matrix）:
混淆矩阵的每一列代表了预测类别，每一列的总数表示预测为该类别的数据的数目；每一行代表了数据的真实归属类别，每一行的数据总数表示该类别的数据实例的数目。每一列中的数值表示真实数据被预测为该类的数目：第一行第一列中的43表示有43个实际归属第一类的实例被预测为第一类，同理，第一行第二列的2表示有2个实际归属为第一类的实例被错误预测为第二类。

## 3、精确率（precision）、召回率（recall）、准确率（accuracy）
精确率—查准率——precision：你认为的该类（正确）样本，有多少猜对了（猜的准确率如何，相对于误报率）；通俗讲在你认为是正确的样本中有多少是真正正确的样本

召回率—查全率—recall：该类样本有多少被找出来（召回了多少，相对于漏报）；通俗讲在所有真正正确的样本中有多少你猜正确了

准确率—accuracy：正类和负类预测准确的比例。通俗讲在所有样本中你的正确率

首先明确一下几个表示：
- True Positive(真正, TP)：将正类预测为正类数.
- True Negative(真负, TN)：将负类预测为负类数.
- False Positive(假正, FP)：将负类预测为正类数 →→ 误报 (Type I error).
- False Negative(假负, FN)：将正类预测为负类数 →→ 漏报 (Type II error).

精确率：precision = TP / (TP + FP)

召回率：recall = TP / (TP + FN)

准确率：accuracy = (TP + TN) / (TP+ FP + TN + FN)

F1 Score：F1 Score = 2 * precision * recall / (precision + recall)

精确率是针对我们预测结果⽽⾔的，它表⽰的是预测为正的中有多少是真正的正样本。召回率是针对我们原来的样本⽽⾔的，它表⽰的是样本中的正例有多少被预测正确了。其实就是分母不同，⼀个分母是预测为正的，另⼀个是原来样本中所有的正样本数。

例如：假设我们手上有60个正样本，40个负样本，我们要找出所有的正样本，系统查找出50个，其中只有40个是真正的正样本，计算上述各指标。
TP: 将正类预测为正类数 40
FN: 将正类预测为负类数 20
FP: 将负类预测为正类数 10
TN: 将负类预测为负类数 30

准确率(accuracy) = 预测对的/所有 = (TP+TN)/(TP+FN+FP+TN) = 70%
精确率(precision) = TP/(TP+FP) = 80%
召回率(recall) = TP/(TP+FN) = 2/3

## 4、易错知识点
机器学习较为适用的场景：特征多，确定性低。
深度学习的繁荣，最关键的两项因素：算力+数据
基于人工智能的反病毒引擎，相较于基于传统特征库(规则匹配)的反病毒引擎，主要有点包括：
具有泛化能力，能够查杀病毒变种
杀毒能力强，能力退化慢，短期不更新也能应对大部分，不依赖于云端能力
模型更新周期慢，每次更新量小，节约带宽成本，不会产生更新带来的网络风暴
内存占用小，一般AI模型占用在100M以内

深度学习与传统机器学习相比，主要有点包括：
模型效果上限高
专家知识依赖少

## 5、ModuleNotFoundError: No module named 'sklearn.cross_validation'
后面几个错误完美对应：https://www.cnblogs.com/broccoli919/p/14031935.html

sklearn已经将cross_validation合并到model_selection
```
from sklearn.cross_validation import KFold
from sklearn.cross_validation import train_test_split
```
修改为：
```
from sklearn.model_selection import KFold
from sklearn.model_selection import train_test_split
````

KFold用于分层采样，k折交叉切分。
cross_validation的库被取消后，KFold的函数被放在了model_selection的库函数中。
而库更新后，不能按照原本的传入三个参数，
```
KFold(list，n_splits =kflod, shuffle=True)
```
上述代码将会报“init() got multiple values for argument ‘n_splits’”。
现在的版本要改成
```
f = KFold(n_splits =kflod, shuffle=True)  
f.get_n_splits(list)
```

## 6、TypeError: shuffle must be True or False; got 2
删掉第一个参数位的值
```
for train, test in KFold(len(X),2,shuffle=True):
```
修改为：
```
for train, test in KFold(2,shuffle=True):
```

## 7、TypeError: 'KFold' object is not iterable
```
for k, (train, test) in enumerate(KFold(10,shuffle=True, random_state=1).split(y), start=1):
```

## 8、Note: NumExpr detected 32 cores but "NUMEXPR_MAX_THREADS" not set, so enforcing safe limit of 8.
解决思路
没有设置NUMEXPR_MAX_THREADS而出现的警告，最后会NumExpr defaulting to 8 threads

解决方法
import os
os.environ[‘NUMEXPR_MAX_THREADS’] = ‘16’
注意：'16’是str格式的

## 9、训练集、验证集、测试集（附：分割方法+交叉验证）

## 10、AttributeError: 'StackingClassifier' object has no attribute 'final_estimato
Did you call fit()?

试了一下fit，结果还是报这个错误。

## 11、python3 报错： AttributeError: 'dict' object has no attribute 'iteritems'--解决方法
Python3.x中不再支持iteritems()，所以将iteritems()改成items()，即dict.items()

## 12、ImportError: cannot import name 'StackingClassifier' from 'sklearn.ensemble' 
只需在Anaconda或cmd中运行以下命令，因为在以前的版本中没有该命令。

pip install --upgrade scikit-learn
pip install --upgrade scikit-learn --user

## 13、文件属性选择库
pip install --user pywin32
pip install pypiwin32
Python调用一些win32接口，如剪贴板什么的，还能否在Linux下跑
Pywin32能在所有windows 32,64位上运行,除了windows其他都不行.
不要胡思乱想了，只有能WIN下面用
老铁都说了Win32~怎么能在LINUX上跑呢~
linux不支持pywin32，可以安装vine或者虚拟机，再使用pywin32

## 14、local variable referenced before assignment 原因及解决办法
一句话，在函数内部更改全局变量就会出现此错误。

```
a= 3
def temp():
    global a #声明我们在函数内部使用的是在函数外部定义的全局变量a
    print(a)
    a+=1
temp() #调用temp函数，不会再报错了
a #此时就会发现a的值确实变成4
```

```
a= 3 #全局变量
def temp():
	a= 4 #局部变量
	print(a)
temp() #返回4，因为在函数内部a=4
print(a)#返回3，因为在函数外部a被赋值为3
```

%%time

## 15、_pickle.UnpicklingError: invalid load key, '8'.
```
with open(cached_path, "rb") as reader:
   features = pickle.load(reader)
```
修改为：
```
with open(cached_path, "rb") as reader:
    features = pickle.loads(reader)
```
.load和loads的区别：
load将序列化字符串从文件读取并反序列化
loads将序列化字符串反序列化








