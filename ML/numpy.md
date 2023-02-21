# numpy

## 1、创建
```
>>> import numpy as np
>>> a = np.array([[1,2],[3,4],[5,6]])#创建3行2列二维数组。
>>> a
array([[1, 2],
       [3, 4],
       [5, 6]])
>>> a = np.zeros(6)#创建长度为6的，元素都是0一维数组
>>> a = np.zeros((2,3))#创建2行3列，元素都是0的二维数组
>>> a = np.ones((2,3))#创建2行3列，元素都是1的二维数组
>>> a = np.empty((2,3)) #创建2行3列,未初始化的二维数组
>>> a = np.arange(6)#创建长度为6的，元素都是0一维数组array([0, 1, 2, 3, 4, 5])
>>> a = np.arange(1,7,1)#结果与np.arange(6)一样。第一，二个参数意思是数值从1〜6,不包括7.第三个参数表步长为1.
a = np.linspace(0,10,7) # 生成首位是0，末位是10，含7个数的等差数列[  0.           1.66666667   3.33333333   5.         6.66666667  8.33333333  10.        ]
a = np.logspace(0,4,5)#用于生成首位是10**0，末位是10**4，含5个数的等比数列。[  1.00000000e+00   1.00000000e+01   1.00000000e+02   1.00000000e+03 1.00000000e+04]
```

## 2、增
```
>>> a = np.array([[1,2],[3,4],[5,6]])
>>> b = np.array([[10,20],[30,40],[50,60]])
>>> np.vstack((a,b))
array([[ 1,  2],
       [ 3,  4],
       [ 5,  6],
       [10, 20],
       [30, 40],
       [50, 60]])
>>> np.hstack((a,b))
array([[ 1,  2, 10, 20],
       [ 3,  4, 30, 40],
       [ 5,  6, 50, 60]])
```

## 3、numpy中数组的拼接


## 3、array、narray和ndarray

### ndarray的基本用法

#### 1、基本属性
维度（dimensions）称为轴（axis）， 轴的个数成为秩（rank）
axis = 0, 对列操作
axis = 1, 对行操作
```
ndarray.ndim(秩)
ndarray.shape(维度)
ndarray.size(元素总个数)
ndarray.dtype(元素类型)
ndarray.itemsize(元素字节大小)
```

#### 2、ndarray的创建
```
import numpy as np
aArray = np.array([1, 2, 3])#创建一维数组
aArray = np.array([(1, 2, 3),(4, 5, 6)])#创建二维数组
bArray = np.arange(1, 5, 0.5)#生成浮点数
cArray = np.random.random((2, 2))#生成随机数
dArray = np.linspace(1, 2, 10, endpoint = False)#创建一个在(起始点，终点，个数，终止点是否包含在内)条件下的等差数组
eArray = np.ones([2,3])#2行3列的值为1的特殊矩阵
fArray = np.zeros((2,2))#2行2列的零矩阵
gArray = np.fromfunction(lambda i,j : (i+1)*(j+i), (9,9))#生成9*9的乘法口诀表
```

#### 3、ndarray的切片操作
```
aArray = np.array([(1, 2, 3),(4, 5, 6)])
print(aArray[1])  #[4 5 6]
print(aArray[0:2])  #[[1 2 3] [4 5 6]]
print(aArray[;,[0,1]]) #[[1 2] [4 5]]
print(aArray[1,[0,1]])  #[4 5]
print(aArray[::-1])  #交换行([(4, 5, 6),(1, 2, 3)])
print(aArray[:,::-1])  #交换列([(4, 5, 6),(1, 2, 3)])
```

#### 4、ndarray的行列变换
```
aArray.reshape(2,-1) #转化为2行，不明确列
aArray.reshape(-1,1) #转为1列
np.vstack((bArray,cArray))#垂直方面拼接
np.hstack((bArray,cArray))#水平方向拼接
```

#### 5、ndarray的基本运算
```
a = np.array([(1, 2, 3),(4, 5, 6)])
b = np.array([(2, 2, 2),(2, 2, 2)])
c = a * b #([(2,4,6),(8,10,12)])
d = np.array([1,2,3])
e = a + d #注意不同维度的加法运算 ([[2,4,6],[5,7,9]])
print(a.sum(axis = 0)) #纵轴求和([5,7,9])
print(a.sum(axis = 1)) #横轴求和([6,15])
print(a.min()) #return min value
print(a.argmax()) #返回最大值的索引 5
print(a.mean()) #平均值
print(a.var()) #方差
print(a.std()) #标准差
print(np.dot(a,a)) #内积
print(np.linalg.det(a)) #行列式
print(np.linalg.inv(a)) #逆矩阵
```

###




