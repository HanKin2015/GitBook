# 学习python容器操作

## 保存数组
```
>>> import numpy as np
>>> arr=np.arange(10)
>>> np.save('some_array',arr)
>>> np.load('some_array,npy')
array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

## 整数转十六进制
```
data1 = 125
data2 = 2
str1 = '0x{:02X}'.format(data1)
str2 = '0x{:02X}'.format(data2)
print(str1, str2)
print(hex(data1), hex(data2))
```

## 列表保存为文件
```
file = open('file_name.txt','w');
file.write(str(list_variable));
file.close();
```
