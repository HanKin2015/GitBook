# 不平衡样本数据处理
[不平衡数据的处理方法与代码分享](https://blog.csdn.net/Pysamlam/article/details/122852580)



[单分类算法：One Class SVM](https://blog.csdn.net/qq_19446965/article/details/118742147)

这里分析出了很多看似很有用的方法：https://blog.csdn.net/AaronPaul/article/details/113994474
https://zhuanlan.zhihu.com/p/523227820

不平学习库pipeline代码：https://zhuanlan.zhihu.com/p/159080497

## 2、在特征选择之前或之后采样？
SMOTE论文描述了在采样之前应该执行特征选择。

不平衡数据集，欠采样和特征工程的先后顺序?
就这一问题而言，我认为二者应该是没有严格的先后关系的。因为，特征选择→不均衡处理的理由在于，这样可以保证选出来的特征对原始数据是有现实意义的，不均衡处理有可能会改变特征的分布情况，导致有的特征从不重要变得重要了。另一方面，不均衡处理→特征选择，在处理后的均衡数据集上进行特征选择，可以进一步提升当前数据集的拟合能力，整体的performance应该是会有进一步提升。但是像之前说的，可能不均衡处理导致特征的分布变了，从而与现实脱离。










