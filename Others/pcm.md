# 深入理解pcm

参考：https://www.cnblogs.com/ricks/p/9522243.html
[多媒体基础知识之PCM数据](https://www.cnblogs.com/CoderTian/p/6657844.html)

# PCM （脉冲编码调制）
脉冲编码调制(Pulse Code Modulation,PCM)，由A.里弗斯于1937年提出的，这一概念为数字通信奠定了基础，60年代它开始应用于市内电话网以扩充容量，使已有音频电缆的大部分芯线的传输容量扩大24～48倍。到70年代中、末期，各国相继把脉码调制成功地应用于同轴电缆通信、微波接力通信、卫星通信和光纤通信等中、大容量传输系统。80年代初，脉冲编码调制已用于市话中继传输和大容量干线传输以及数字程控交换机，并在用户话机中采用。
在光纤通信系统中，光纤中传输的是二进制光脉冲“0”码和“1”码，它由二进制数字信号对光源进行通断调制而产生。而数字信号是对连续变化的模拟信号进行抽样、量化和编码产生的，称为PCM（Pulse-code modulation），即脉冲编码调制。这种电的数字信号称为数字基带信号，由PCM电端机产生。现在的数字传输系统都是采用脉码调制（Pulse-code modulation）体制。PCM最初并非传输计算机数据用的，而是使交换机之间有一条中继线不是只传送一条电话信号。PCM有两个标准（表现形式）即E1和T1。
中国采用的是欧洲的E1标准。T1的速率是1.544Mbit/s，E1的速率是2.048Mbit/s。
脉冲编码调制可以向用户提供多种业务，既可以提供从2M到155M速率的数字数据专线业务，也可以提供话音、图象传送、远程教学等其他业务。特别适用于对数据传输速率要求较高，需要更高带宽的用户使用。


在录音时采用多级或者串联抽选的数字滤波器（减低采样频率），在重放时采用多级的内插的数字滤波器（提高采样频率），为了控制小信号在编码时的失真，两者又都需要加入重复定量噪声。这样就限制了PCM技术在音频还原时的保真度。

[与音频相关的技术知识点总结（Linux方向的开发）](https://yq.aliyun.com/articles/237048?spm=a2c4e.11153940.0.0.166e592dwK3j2C)



- https://www.jianshu.com/p/ca2cb00418a7

- # [PCM音量控制（高级篇）](http://blog.jianchihu.net/pcm-vol-control-advance.html)

# 降噪

**PCM音频处理——使用WebRTC音频降噪模块**】(https://www.meiwen.com.cn/subject/jmfeottx.html)

# linux 下录音alsa介绍

https://blog.csdn.net/u012611644/article/details/84565429

alsamixer、record、aplay



## Mic boost

Mic boost是一款话筒增益的软件，可以增大[麦克风](https://baike.baidu.com/item/麦克风)的音量，不过也有可能会产生比较大的杂音和回声，音质也可能大大下降。



[pcm的表示方法](https://blog.csdn.net/ffmpeg4976/article/details/52198427)

[PCM音频格式的深入理解](https://blog.csdn.net/lifei092/article/details/80990813)

https://blog.csdn.net/lifei092/article/details/80990813
