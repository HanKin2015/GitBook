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
















