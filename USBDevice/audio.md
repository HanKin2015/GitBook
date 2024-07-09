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
arecord和aplay其实就是一个文件，只不过执行的时候会根据文件名来判断执行哪种相关操作：
```
if (strstr(argv[0]，"arecord")) {
    stream = SND_PCM_STREAM_CAPTURE;
    file_type = FORMAT_WAVE;
    command = "arecord";
    start_delay =1;
    direction = stdout;
} else if (strstr(argv[0]，"aplay")) {
    stream = SND_PCM_STREAM_PLAYBACK;
    command = "aplay";
    direction = stdin;
} else {
    error(_("command should be named either arecord or aplay"));
    return 1;
}
```

打印声卡列表：
alsa_arecord -L
录音：
alsa_arecord -f cd -D default:CARD=Device /sdcard/filename.wav
放音：
alsa_aplay  -f cd -D default:CARD=Device /sdcard/filename.wav
参数说明：
 -D 指定声卡 -f 指定采样率

## 3、物理机插上耳机没有声音
一开始以为是耳机坏了，然后在另外一台电脑发现能正常使用。
后面发现在设备管理器中音频设备中缺少麦克风和扬声器的子设备，在另外一台电脑就有，怀疑是电脑的声卡驱动问题，然后就下载了一个360驱动大师，在安装稳定模式的驱动始终安装不上，然后安装了最新模式的驱动安装上了，然后耳机就正常了。

## 4、PulseAudio
PulseAudio是一个声音服务器，一个后台进程从一个或多个音源（进程或输入设备）接受声音输入 然后重定向声音到一个或多个槽（声卡，远程网络PulseAudio服务，或其他进程）。PulseAudio被几个主要Linux发行版使用，例如Fedora、Ubuntu、Mandriva、Linux Mint、openSUSE和OpenWRT。GNOME项目中还有越来越多的对Pulseaudio的支持。

pactl info
systemctl --user enable pulseaudio
systemctl --user restart pulseaudio
systemctl --user restart pulseaudio.socket
aplay -Ddefault -f cd AudioTest.wav