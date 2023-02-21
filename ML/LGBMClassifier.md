1.boosting_type=‘gbdt’# 提升树的类型 gbdt,dart,goss,rf
2.num_leavel=32#树的最大叶子数，对比xgboost一般为2^(max_depth)
3.max_depth=-1#最大树的深度
4.learning_rate#学习率
5.n_estimators=10: 拟合的树的棵树，相当于训练轮数
6.subsample=1.0: 训练样本采样率 行
7.colsample_bytree=1.0: 训练特征采样率 列
8.subsample_freq=1: 子样本频率
9.reg_alpha=0.0: L1正则化系数
10.reg_lambda=0.0: L2正则化系数
11.random_state=None: 随机种子数
12.n_jobs=-1: 并行运行多线程核心数
13.silent=True: 训练过程是否打印日志信息
14.min_split_gain=0.0: 最小分割增益
15.min_child_weight=0.001: 分支结点的最小权重



https://www.jianshu.com/p/a1c229a2a622
LGBMClassifier经验参数







