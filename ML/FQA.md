# 问答

## 1、columns overlap but no suffix specified: Index([‘data1‘, ‘data2‘], dtype=‘object‘)解决方法
执行最后一句语句时报错columns overlap but no suffix specified: Index(['data1', 'data2'], dtype='object'),然后发现是两个DataFrame 的列名重复了，join不会像merge一样，merge会将重名的列明自动加上_x,_y加以区分，而join直接报错。
所以，我们的解决方法是修改其列名就好了。

## 2、发现with...as这种结构无法跳出循环
它本身可能不是一种循环。
```
content = ''
index = 0
with open('./notebook.json', encoding = 'utf-8') as fd:
    ch = fd.read(1)
    print(ch)
	fd.close()
    content += ch
    
    index += 1
    #if index > 55:
    #    fd.close()
```
始终都是输入文件全部内容。

使用方法封装，return跳出是可以的，但是read()还是一次性读取完。

## 3、Python报错：'dict' object has no attribute 'iteritems'（机器学习实战kNN代码）解决方案
原因在于：python3中已经没有 “iteritems” 这个属性了，现在属性是：“ items ” 。

## 4、UnicodeDecodeError: 'utf-8' codec can't decode byte 0x80 in position 0: inva
问题出在函数入参上，因为在前面的函数里把fw = open(filename,'w')改成了fw = open(filename,'wb')，所以在这个函数中也把fr = open(filename)改为fr = open(filename,'rb')，问题解决，事实证明确实是函数入参不同导致的。

mode参数	|可做操作	|若文件不存在	|如何处理原内容
|:---:|:---:|:---:|:---:|
r	|只可读		|报错	|-
r+	|可读可写	|报错	|是
w	|只可写		|创建	|是
w+	|可读可写	|创建	|是
a	|只可写		|创建	|否，追加
a+	|可读可写	|创建	|否，追加
x	|只可写		|创建	|-
x+	|可读可写	|创建	|-

## 5、Module ctypes has no attribute 'windll'
It seems like you're trying to use a Windows module on a non Windows enviroment, if you check the ctype module it has some conditional classes:
```
if _os.name == "nt":

    class WinDLL(CDLL):
        """This class represents a dll exporting functions using the
        Windows stdcall calling convention.
   [...]
```
https://docs.python.org/3/library/ctypes.html

linux的ctypes库没有win32api就是这么简单。

想使用这个获取文件占用空间大小，目前探索只能通过stat命令，然后通过块数量乘以块大小计算所得，没有相应的命令查询。

## 6、Python错误：TypeError: 'int' object is not callable解决办法
看到这个错误我先是一愣，心想：“int对象不可调用？我没有调用Int型数据啊，我调用的是一个函数方法！”。调来调去都没有解决。Google后才发现，这个错误之所以发生，是因为我变量名和函数名写重复了！

我的错误使用是：
print(stat.S_IEXEC(mode))

正确使用方法是：
print(mode & stat.S_IEXEC)

## 7、ValueError: invalid literal for int() with base 10:解决方法
原因：由于python不能直接将包含小数点的字符串转化为整数，而原始数据的格式经常是不一致的，故类型转化时造成ValueError异常。
解决方法：先将字符串转换为浮点数float，在将浮点数转化为整数int。
```
a=int(float('123.456'))
```

## 8、it/s是什么单位？
iterator：迭代器，迭代程序
it/s 每秒迭代次数，如果迭代一次为一行，则表示平均每秒读取的行数
iterator/s， 比如下图如果运行比较快显示 it/s ，如果设置每秒迭代一次则显示1.00s/it
```
from common import *

for i in tqdm(range(1000000)):
    pass

for i in tqdm(range(10)):
    time.sleep(1)

(base) C:\Users\test\Desktop\fastflux_detect_preliminary>python study.py
100%|████████████████████████████████████████████████████████████████████| 1000000/1000000 [00:00<00:00, 4318913.29it/s]
100%|████████████████████████████████████████████████████████████████████| 10/10 [00:10<00:00,  1.01s/it]
```

## 9、发现使用exec来缩减优化代码会带来运行效率降低很多倍
```
%%time
# 初始化列表
for col_dict in col_dicts:
    exec('{}_li = []'.format(col_dict))

for items in tqdm(agg_df['rdatalist'].values):
    # 置空临时列表
    for col_dict in col_dicts:
        exec('{}_tmp = []'.format(col_dict))
    
    for ip in items:
        try:
            for col_dict in col_dicts:
                exec('{}_tmp.append({}_dict[ip])'.format(col_dict, col_dict))
        except:
            logger.error('failed, ip {}'.format(ip))
            pass
    
    # 将临时列表添加到主列表
    for col_dict in col_dicts:
        exec('{}_li.append({}_tmp)'.format(col_dict, col_dict))

这个实测在接近3个小时吧
26%|████████████████                                               | 53922/208211 [31:15<32:14:10, 2.46it/s]
```

驰骋沙场多年的大佬写的代码还是展开，说明展开写还是有它的道理。
```
judgement_li = []
networkTags_li = []
threatTags_li = []
expired_li = []
continent_li = []
country_li = []
province_li = []
city_li = []
district_li = []
timeZone_li = []
organization_li = []
operator_li = []
for items in tqdm(agg_df['rdatalist'].values):
    judgement_tmp = []
    networkTags_tmp = []
    threatTags_tmp = []
    expired_tmp = []
    continent_tmp = []
    country_tmp = []
    province_tmp = []
    city_tmp = []
    district_tmp = []
    timeZone_tmp = []
    organization_tmp = []
    operator_tmp = []
    for ip in items:
        try:
            judgement_tmp.append(judgement_dict[ip])
            networkTags_tmp.append(networkTags_dict[ip])
            threatTags_tmp.append(threatTags_dict[ip])
            expired_tmp.append(expired_dict[ip])
            continent_tmp.append(continent_dict[ip])
            country_tmp.append(country_dict[ip])
            province_tmp.append(province_dict[ip])
            city_tmp.append(city_dict[ip])
            district_tmp.append(district_dict[ip])
            timeZone_tmp.append(timeZone_dict[ip])
            organization_tmp.append(organization_dict[ip])
            operator_tmp.append(operator_dict[ip])
        except:
            pass
    judgement_li.append(judgement_tmp)
    networkTags_li.append(networkTags_tmp)
    threatTags_li.append(threatTags_tmp)
    expired_li.append(expired_tmp)
    continent_li.append(continent_tmp)
    country_li.append(country_tmp)
    province_li.append(province_tmp)
    city_li.append(city_tmp)
    district_li.append(district_tmp)
    timeZone_li.append(timeZone_tmp)
    organization_li.append(organization_tmp)
    operator_li.append(operator_tmp)

100%|████████████████████████████████████████████████████████████████████| 208211/208211 [05:47<00:00, 598.44it/s]
```

## 10、消除警告
```
import warnings
warnings.filterwarnings("ignore")
```




