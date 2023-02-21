# 经验心得

## 1、训练集和测试集一定要一起进行特征工程
比如说一个特征是int类型，需要计算平均数和中位数，两个数据集结合在一起可以统一标准。

## 2、tqdm进度条很好用

## 3、.py文件和.ipynb文件两者的运行效率一样

## 4、使用gc及时清理内存

## 5、exec会降低运行效率

## 6、安装脚本
```
#!/bin/bash
#
# 文 件 名: install_required_library.sh
# 文件描述: 安装必需库
# 作    者: HanKin
# 创建日期: 2022.11.22
# 修改日期：2022.11.22
# 
# Copyright (c) 2022 HanKin. All rights reserved.
#

pip install pandas
pip install scikit-learn
pip install catboost
pip install lightgbm
pip install xgboost
pip install imblearn
pip install gensim
```

## 7、for循环写成一行
```
agg_df[col] = agg_df[col].apply(lambda x: ' '.join([str(i) for i in x]))
result = [1 if i > 0.25 else 0 for i in result] 
```

## 8、可能编码环境运行内存不足，需要改小数据集
sed -n '1,3p' file1 >> file2
用输出重定向符号 >> 就是附加到file2的最后，file2不存在的话会自动新建的。

## 9、缺少一列数据构造默认缺失值
```
if False:
    ip_info['networkTags'] = ['["CSDN"]' for i in range(ip_info.shape[0])]
    ip_info['judgement'] = ['unknown' for i in range(ip_info.shape[0])]
```

