# 问答

## 1、columns overlap but no suffix specified: Index([‘data1‘, ‘data2‘], dtype=‘object‘)解决方法
执行最后一句语句时报错columns overlap but no suffix specified: Index(['data1', 'data2'], dtype='object'),然后发现是两个DataFrame 的列名重复了，join不会像merge一样，merge会将重名的列明自动加上_x,_y加以区分，而join直接报错。
所以，我们的解决方法是修改其列名就好了。


















