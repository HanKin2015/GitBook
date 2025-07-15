一、监督学习算法
1. 线性回归（Linear Regression）
原理：通过拟合线性方程预测连续值输出。
应用：房价预测、股票价格预测、销售趋势分析。
扩展：多项式回归、岭回归（Ridge）、Lasso 回归。
2. 逻辑回归（Logistic Regression）
原理：使用逻辑函数预测二分类或多分类概率。
应用：垃圾邮件分类、疾病诊断、用户流失预测。
扩展：Softmax 回归（多分类）、正则化逻辑回归。
3. 决策树（Decision Tree）
原理：通过树结构进行决策，每个内部节点是属性上的测试。
应用：贷款审批、医疗诊断、天气预测。
扩展：随机森林（Random Forest）、梯度提升树（GBDT）。
4. 支持向量机（SVM）
原理：寻找最大化分类间隔的超平面，支持线性和非线性分类。
应用：图像分类、文本分类、生物信息学。
扩展：核技巧（Kernel Trick）、SVR（回归）。
5. 朴素贝叶斯（Naive Bayes）
原理：基于贝叶斯定理和特征条件独立假设的分类方法。
应用：垃圾邮件过滤、情感分析、推荐系统。
变体：高斯朴素贝叶斯、多项式朴素贝叶斯。
二、无监督学习算法
1. 聚类算法
K-Means：将数据点划分为 K 个簇，最小化簇内距离。
应用：客户分群、图像分割、文档聚类。
DBSCAN：基于密度的空间聚类，能发现任意形状的簇。
应用：异常检测、地理数据聚类。
层次聚类：构建聚类层次结构，分为凝聚式和分裂式。
2. 降维算法
主成分分析（PCA）：通过线性变换提取数据的主要特征。
应用：数据可视化、特征提取、噪声过滤。
t-SNE：非线性降维技术，擅长高维数据的可视化。
应用：基因表达数据、图像特征降维。
3. 关联规则挖掘
Apriori 算法：发现项集之间的频繁关联规则。
应用：购物篮分析、推荐系统。
FP-Growth 算法：高效挖掘频繁模式，无需生成候选集。
三、强化学习算法
1. Q-Learning
原理：通过 Q 值函数估计状态 - 动作对的长期回报。
应用：机器人导航、游戏（如 Atari）、资源调度。
特性：无模型（Model-Free）、离线学习。
2. SARSA
原理：与 Q-Learning 类似，但采用 on-policy 学习。
应用：实时决策系统、自动驾驶。
3. 深度 Q 网络（DQN）
原理：结合深度学习和 Q-Learning，使用神经网络近似 Q 值函数。
应用：复杂游戏（如 AlphaGo）、机器人控制。
扩展：Double DQN、Dueling DQN。
4. Policy Gradient 方法
A2C/A3C：Actor-Critic 架构，同时学习策略和价值函数。
PPO：近端策略优化，高效稳定的策略梯度算法。
应用：连续控制任务（如机械臂）、自动驾驶。
四、深度学习算法
1. 神经网络基础
多层感知机（MLP）：包含输入层、隐藏层和输出层的全连接网络。
应用：手写数字识别、简单分类任务。
激活函数：Sigmoid、ReLU、Tanh 等，引入非线性。
2. 卷积神经网络（CNN）
原理：通过卷积层自动提取空间特征。
核心组件：卷积核（Filter）、池化层（Pooling）、BatchNorm。
应用：图像识别（如 ResNet）、目标检测（如 YOLO）、语义分割。
3. 循环神经网络（RNN）
原理：处理序列数据，通过隐藏状态传递信息。
问题：梯度消失 / 爆炸。
变体：LSTM（长短期记忆网络）、GRU（门控循环单元）。
应用：自然语言处理（NLP）、语音识别、时间序列预测。
4. 生成对抗网络（GAN）
原理：生成器（Generator）和判别器（Discriminator）对抗训练。
应用：图像生成（如 StyleGAN）、数据增强、超分辨率。
变体：DCGAN、WGAN、CycleGAN。
5. 变压器（Transformer）
原理：基于自注意力机制（Self-Attention）处理序列数据。
核心组件：多头注意力（Multi-Head Attention）、位置编码。
应用：NLP（如 BERT、GPT）、语音识别、图像生成。
五、其他重要算法
1. 集成学习（Ensemble Learning）
Bagging：并行训练多个模型，通过投票或平均集成结果（如随机森林）。
Boosting：串行训练模型，每个模型关注前一个模型的错误（如 AdaBoost、XGBoost、LightGBM）。
Stacking：使用多个基模型的输出作为输入，训练一个元模型。
2. 进化算法
遗传算法（Genetic Algorithm）：模拟自然选择和遗传机制优化问题。
应用：参数优化、组合优化、神经网络架构搜索。
3. 迁移学习（Transfer Learning）
原理：将预训练模型的知识应用到新任务。
应用：计算机视觉（如 ImageNet 预训练模型）、NLP（如 BERT 微调）。
4. 元学习（Meta-Learning）
原理："学习如何学习"，快速适应新任务。
应用：小样本学习（Few-Shot Learning）、强化学习。
六、算法选择指南
任务类型	推荐算法
回归预测	线性回归、决策树、随机森林、深度学习（MLP）
二分类	逻辑回归、SVM、随机森林、深度学习
多分类	随机森林、深度学习、朴素贝叶斯
图像识别 / 生成	CNN、Transformer、GAN
自然语言处理	Transformer（BERT、GPT）、LSTM、预训练模型
序列预测	LSTM、GRU、Transformer
异常检测	孤立森林（Isolation Forest）、DBSCAN、自编码器（Autoencoder）
推荐系统	协同过滤、矩阵分解、深度学习（Wide & Deep）
机器人控制	强化学习（PPO、DQN）
七、开源工具与框架
深度学习：TensorFlow、PyTorch、Keras、MXNet。
传统机器学习：scikit-learn、XGBoost、LightGBM。
强化学习：OpenAI Gym、Stable Baselines3。
自然语言处理：Hugging Face Transformers、spaCy。
计算机视觉：OpenCV、Detectron2。
总结
AI 算法的选择取决于具体任务、数据规模和性能要求。现代应用通常结合多种算法（如预训练模型 + 微调）以达到最佳效果。建议从基础算法入手，逐步深入理解深度学习和强化学习等高级技术。