# python知识示例

使用简明的方式进行查询使用相关模块。

主要两大类：DataFrame和数据结构

## 1、DataFrame

### 1-1、修改列名
```
# rename：需要一一对应
test.rename(columns={'原列名1':'现列名1', '原列名2':'现列名2'}, inplace=True)

# 推荐：直接赋值
test.columns = ['c','b']
```

### 1-2、初始化
```
# 行初始化
df = pd.DataFrame([['a1', 1], ['a2', 4]], columns=['uid', 'score'])

# 列初始化
df = pd.DataFrame({'col1': [1, 2, 3, 4], 'col2': ['a', 'b', 'c', 'd']})
```

### 1-3、列名和行名
```
dfname._stat_axis.values.tolist() # 行名称
dfname.columns.values.tolist()    # 列名称
```

### 1-4、删除某一行或者某一列
```
# inplace表示在原dataframe上面操作
df.drop([0,4,行索引], axis=0)
df.drop(['列名']axis=1, inplace=True)
```

### 1-5、获取某一个元素
```
df.iloc[2, 3]
df.loc['列名'].loc['行名']

df[['列名1', '列名2']]
```

## 1-6、拷贝
```
df2 = df1.copy()
df2 = df1
```

---

## 2、数据结构

### 2-1、返回两个list列表相同元素个数
```
a = [1,0,2]
b = [0,0,0]
x = [k for k in b if k in a]
```

### 2-2、list列表中删除指定元素
```
# 如果没有这个元素会报错，因此建议抛异常或者使用for循环
try:
	my_list = my_list.remove('1')
except:
	pass
```

### 2-3、list列表中删除所有指定元素
```
# 缺点：filter好像不能匹配数字
my_list = list(filter(lambda x: x != 1, my_list)))

# 推荐
my_list = [my_list[i] for i in range(0,len(my_list)) if my_list[i] != '1']
```

### 2-4、list列表能使用下标遍历吗


### 2-5、字符串转数字
```
str_number = '012'
number = int(str_number)
```

### 2-5、python不支持数字前缀为0
```
# 错误
my_number_list = [012, 02, 04]
```

### 2-5、异常机制
```
assert(number)
raise Exception('密码长度不够')

try:
    num = int(input('请输入一个整数:'))
    result = 8 /num
    print(result)
# except ZeroDivisionError:
#     print('0不能做除数')
except ValueError:
    print('输入的值不是合法的整数')
except Exception as r:
    print('未知错误 %s' %(r))
# 没有预先判断到的错误怎么办?
# ZeroDivisionError
finally:
    # 无论是否有异常，都会执行的代码
    print('%%%%%%%%%%%%%%%')
```

### 2-5、ndarray中删除某个元素
```
import numpy as np
 
a = np.array([5,4,3,2,1])
b = list(a)
a = np.delete(a, b.index(2))
```

### 2-5、

## 3、其他

### 3-1、获取指定日期是周几
```
from datetime import datetime
date =datetime.date(datetime(year=2020,month=7,day=26))
# 第一种，使用strftime("%w"), %w表示时，1-6表示周一到周六，0表示周日
print(date.strftime("%w"))
# 第二种，使用isoweekday()函数 1-7表示周一到周日
print(date.isoweekday())
# 第三种，使用weekday()函数，这里是从0开始计数的，0-6表示周一到周日
print(date.weekday()+1)
```

### 3-2、类型互换
```
# list转numpy.array
temp = np.array(list) 

# numpy.array转list
arr = temp.tolist() 
```

### 3-3、0矩阵
```
numpy.zeros((4,)，dtype=int，order = 'C')

C行F列
```

### 3-4、排序
```
list1 = [3,2,4,1, 1]
list2 = ['three', 'two', 'four', 'one', 'zero']
list1, list2 = zip(*sorted(zip(list1, list2), reverse=True))
print(list1)
print(list2)
```

### 3-5、保存数组
```
>>> import numpy as np
>>> arr=np.arange(10)
>>> np.save('some_array',arr)
>>> np.load('some_array,npy')
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

### 3-6、整数转十六进制
```
data1 = 125
data2 = 2
str1 = '0x{:02X}'.format(data1)
str2 = '0x{:02X}'.format(data2)
print(str1, str2)
print(hex(data1), hex(data2))
```

### 3-9、十六进制字符串转整数
```
hex_str = '0xABCD'
dec = int(hex_str, 16)
print(dec)
```

### 3-8、列表保存为文件
```
file = open('file_name.txt','w');
file.write(str(list_variable));
file.close();
```














