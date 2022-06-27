# pickle模块

joblib

## 1、什么是pickle模块
持续化模块：就是让数据持久化保存。
pickle模块是Python专用的持久化模块，可以持久化包括自定义类在内的各种数据，比较适合Python本身复杂数据的存贮。
但是持久化后的字串是不可认读的，并且只能用于Python环境，不能用作与其它语言进行数据交换。

## 2、pickle模块的作用
把 Python 对象直接保存到文件里，而不需要先把它们转化为字符串再保存，也不需要用底层的文件访问操作，直接把它们写入到一个二进制文件里。pickle 模块会创建一个 Python 语言专用的二进制格式，不需要使用者考虑任何文件细节，它会帮你完成读写对象操作。用pickle比你打开文件、转换数据格式并写入这样的操作要节省不少代码行。

## 3、主要方法
在pickle中dumps()和loads()操作的是bytes类型，而在使用dump()和load()读写文件时，要使用rb或wb模式，也就是只接收bytes类型的数据。

pickle.dump(obj, file)
将Python数据转换并保存到pickle格式的文件内。

pickle.dumps(obj)
将Python数据转换为pickle格式的bytes字串。

pickle.load(file)
从pickle格式的文件中读取数据并转换为Python的类型。

pickle.loads(bytes_object)
将pickle格式的bytes字串转换为Python的类型。

## 4、缠绕我许久的问题终于解决了
训练了一个图像矩阵模型，保存为model后缀的文件，结果在加载时始终加载不上，报错如下：
_pickle.UnpicklingError: invalid load key, '8'.

在网上找了一圈都没有找到正确，但是其他人遇到这个问题还是挺多的，最终还是找到解决方案了。
https://www.imooc.com/wenda/detail/622081
解决方案：修改后缀model为pkl就可以了。
```
(base) hankin@aifirst-196fa-0:~$ python predict.py 
2022-06-23 16:09:12 predict.py[<module>:109] INFO: ******** starting ********
2022-06-23 16:09:21 predict.py[predict:83] INFO: test dataset shape: (9857, 5001).
Traceback (most recent call last):
  File "predict.py", line 112, in <module>
    main()
  File "predict.py", line 104, in main
    predict(TEST_IMAGE_MATRIX_PATH, IAMGE_MATRIX_RFC_MODEL_SCORE_PATH)
  File "predict.py", line 90, in predict
    model = load_model_(model_path)
  File "predict.py", line 27, in load_model_
    model = pickle.load(fd)
_pickle.UnpicklingError: invalid load key, '8'.
(base) hankin@aifirst-196fa-0:~$ mv model/image_matrix_rfc.model model/image_matrix_rfc.pkl
(base) hankin@aifirst-196fa-0:~$ vim predict.py 
(base) hankin@aifirst-196fa-0:~$ vim predict.py 
(base) hankin@aifirst-196fa-0:~$ python predict.py 
2022-06-23 16:16:08 predict.py[<module>:109] INFO: ******** starting ********
2022-06-23 16:16:17 predict.py[predict:83] INFO: test dataset shape: (9857, 5001).
Traceback (most recent call last):
  File "predict.py", line 112, in <module>
    main()
  File "predict.py", line 104, in main
    predict(TEST_IMAGE_MATRIX_PATH, 'model/image_matrix_rfc.pkl')
  File "predict.py", line 91, in predict
    result = model.predict(X)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/ensemble/_forest.py", line 630, in predict
    proba = self.predict_proba(X)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/ensemble/_forest.py", line 674, in predict_proba
    X = self._validate_X_predict(X)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/ensemble/_forest.py", line 422, in _validate_X_predict
    return self.estimators_[0]._validate_X_predict(X, check_input=True)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/tree/_classes.py", line 402, in _validate_X_predict
    X = self._validate_data(X, dtype=DTYPE, accept_sparse="csr",
  File "/opt/conda/lib/python3.8/site-packages/sklearn/base.py", line 421, in _validate_data
    X = check_array(X, **check_params)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/utils/validation.py", line 63, in inner_f
    return f(*args, **kwargs)
  File "/opt/conda/lib/python3.8/site-packages/sklearn/utils/validation.py", line 663, in check_array
    _assert_all_finite(array,
  File "/opt/conda/lib/python3.8/site-packages/sklearn/utils/validation.py", line 103, in _assert_all_finite
    raise ValueError(
ValueError: Input contains NaN, infinity or a value too large for dtype('float32').
```
后面尝试找找原因，因为我的其他模型使用这种方式没有任何问题。在想是不是模型文件过大导致无法加载成功，写个demo，结果导致文件格式读取失败，报错如第五项问题。

## 5、真正解决Windows下UnicodeDecodeError: ‘gbk‘ codec can‘t decode byte 0xff in position 0错误的方法
参考：https://blog.csdn.net/mighty13/article/details/107132272/

### 问题现象：
在Windows下使用Python读文件时，经常遇到UnicodeDecodeError: 'gbk' codec can't decode byte 0xff in position 0: illegal multibyte sequence错误。
在open函数参数中设置encoding='utf-8'也不能解决问题，会出现UnicodeDecodeError: 'utf-8' codec can't decode byte 0xff in position 0: invalid start byte类似错误。

### 问题原因：
该问题的根源在于Windows中与Unicode的编码方法。

以系统自带的记事本为例:
记事本“另存为”中有4种编码方式，含义为：

ANSI: 对英文系统即ASCII 对中文系统即gbk/big5
Unicode: UTF-16(LE)
Unicode big endian: UTF-16(BE)
UTF-8:UTF-8-SIG
其中Unicode相关编码方式有3种，这3种编码方式的区别不再赘述，我们可以从文件的头部（即Windows中的特色！BOM:byte order mark）来区分一个文件是属于哪种编码。当头部开始的两个字节为 FF FE时，是UTF-16(LE)编码；当头部的两个字节为FEFF时，是UTF-16(BE)编码；当头部两个字节为EF BB时，是UTF-8-sig编码。

因此，错误信息中0xff说明文件的编码为UTF-16！因此，设置UTF-8编码根本不解决问题。

### 解决方法：
在open函数encoding参数中设置正确的文件编码。
推荐使用chardet模块，检测文件编码方式。chardet非标准库模块，需要安装：pip install chardet
示例代码：
```
# coding=utf-8
def check_charset(file_path):
    import chardet
    with open(file_path, "rb") as f:
        data = f.read(4)
        charset = chardet.detect(data)['encoding']
    return charset
 
your_path = 你的文件路径
with open(your_path, encoding=check_charset(your_path)) as f:
    data = f.read()
    print(data)
```




