# DataFrame

## 1、不保留索引和列名
index表示设置是否保存索引（就是行号）,header表示设置是否保存表头（就是列名）
df.to_csv('./result.csv', index=False, header=False)

## 2、A value is trying to be set on a copy of a slice from a DataFrame
```
index = 0
for i in range(result.shape[0]):
    if pd.isna(result.loc[i]['md5']):
        #print(result.loc[i]['md5'])
		#result.loc[i]['md5'] = hj[index]	# 这样写会报错
        result.loc[i, 'md5'] = hj[index]
        index += 1
result.isna().any()
```

## 3、Python判断Nan值的五种方法
```
# 1、numpy判断
import numpy as np
nan = float('nan')
print(np.isnan(nan))

# 2、Math判断
import math
nan = float('nan')
print(math.isnan(nan))

# 3、Pandas判断
import pandas as pd
nan = float('nan')
print(pd.isna(nan))

# 4、利用Nan值不等于其自身判断
def is_nan(nan):
    return nan != nan
nan = float('nan')
print(is_nan(nan))

# 5、只能输入数值型参数，Nan不属于任何取值区间
def is_nan(nan):
    return not float('-inf') < nan < float('inf')
nan = float('nan')
print(is_nan(nan))
```

## 4、NumPy ndarray合并数组
```
import numpy as np
a =np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = np.append(a, b)
print(c)
# [1 2 3 4 5 6]
```

## 5、Numpy之ndarray的创建
```
arr = np.array([1,2,3,4,5])
arr1 = np.arange(1,6,1)
arr3 = np.zeros(3,dtype=int)
arr5 = np.ones(3,dtype=int)
arr7 = np.zeros_like(arr4)
arr8 = np.ones_like(arr7)
```

## 6、求解两个list列表的交集
```
if __name__ == '__main__':
    # 主要有两种方法求解两个列表的交集
    list1 = [1, 2, 3, 4]
    list2 = [2, 3, 4, 5]
    # 第一种方法: 遍历第一个列表的元素看是否存在于第二个列表中
    res = [v for v in list1 if v in list2]
    print(res)
 
    # 第二种方法: 将列表转换为集合并且使用集合操作符得到两个集合的交集, 然后再转换为列表类型
    list1 = [1, 2, 3, 4]
    list2 = [2, 3, 4, 5]
    # &求解两个集合的交集
    res = list(set(list1) & set(list2))
    print(res)
```

## 7、dataframe转list
```
import pandas as pd

# 1.dataframe转list
a = pd.DataFrame([[1,2,3],[4,5,6]],columns=['one', 'two', 'three'],index=['a','b'])

#b是数组，c是列表
b = a.values
c = b.tolist()
print(a)
print('-------分割线------')
print(c)
```

## 8、list转dataframe
```
import pandas as pd

# 2.list转dataframe
a2 = [[1,2,3],[4,5,6]]
b2 = pd.DataFrame(a2)
print('-------分割线------')
print(a2)
print(b2)
```

## 9、删除指定列值的行





