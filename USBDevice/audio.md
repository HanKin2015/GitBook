# 音频设备

## 1、采样频率
采样频率，也称为采样速度或者采样率，定义了单位时间内从连续信号中提取并组成离散信号的采样个数，它用赫兹（Hz）来表示。采样频率的倒数是采样周期或者叫作采样时间，它是采样之间的时间间隔。通俗的讲采样频率是指计算机单位时间内能够采集多少个信号样本。 

连续信号在时间（或空间）上以某种方式变化着，而采样过程则是在时间（或空间）上，以T为单位间隔来测量连续信号的值。T称为采样间隔。在实际中，如果信号是时间的函数，通常他们的采样间隔都很小，一般在毫秒、微秒的量级。采样过程产生一系列的数字，称为样本。样本代表了原来的信号。每一个样本都对应着测量这一样本的特定时间点，而采样间隔的倒数，1/T即为采样频率，fs，其单位为样本/秒，即赫兹(hertz)。

采样频率只能用于周期性采样的采样器，对于非周期性采样的采样器没有规则限制。
采样频率的常用的表示符号是fs。

通俗的讲采样频率是指计算机单位时间内能够采集多少个信号样本，比如对于波形记录而言，此时采样频率可以是描述波形的质量标准。采样频率越高，即采样的间隔时间越短，则在单位时间内计算机得到的样本数据就越多，对信号波形的表示也越精确。采样频率与原始信号频率之间有一定的关系，根据奈奎斯特理论，只有采样频率高于原始信号最高频率的两倍时，才能把数字信号表示的信号还原成为原来信号。


## 2、命令执行
查看录音设备：arecord -l
查看放音设备（即扬声器）：aplay -l
查看支持的采样率：cat /proc/asound/card[012345]/stream0






