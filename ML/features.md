# 特征工程

## 1、查看是否有缺失值
```
import pandas as pd

train_dataset = pd.read_csv(DATASET_PATH+TRAIN_DATASET_FILENAME)
train_dataset.shape,  test_dataset.shape
train_dataset.isna().any()
```

## 2、apply函数（将时间戳转换）
```
train_dataset['TimeDateStamp'] = train_dataset['TimeDateStamp'].apply(lambda x: time.strftime("%Y-%m-%d %X", time.localtime(x)))
ts_objs = np.array([pd.Timestamp(item) for item in np.array(train_dataset.TimeDateStamp)])
train_dataset['TS_obj'] = ts_objs
ts_objs
```






