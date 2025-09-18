# 音频设备

## 1、采样频率
采样频率，也称为采样速度或者采样率，定义了单位时间内从连续信号中提取并组成离散信号的采样个数，它用赫兹（Hz）来表示。采样频率的倒数是采样周期或者叫作采样时间，它是采样之间的时间间隔。通俗的讲采样频率是指计算机单位时间内能够采集多少个信号样本。 

连续信号在时间（或空间）上以某种方式变化着，而采样过程则是在时间（或空间）上，以T为单位间隔来测量连续信号的值。T称为采样间隔。在实际中，如果信号是时间的函数，通常他们的采样间隔都很小，一般在毫秒、微秒的量级。采样过程产生一系列的数字，称为样本。样本代表了原来的信号。每一个样本都对应着测量这一样本的特定时间点，而采样间隔的倒数，1/T即为采样频率，fs，其单位为样本/秒，即赫兹(hertz)。

采样频率只能用于周期性采样的采样器，对于非周期性采样的采样器没有规则限制。
采样频率的常用的表示符号是fs。

通俗的讲采样频率是指计算机单位时间内能够采集多少个信号样本，比如对于波形记录而言，此时采样频率可以是描述波形的质量标准。采样频率越高，即采样的间隔时间越短，则在单位时间内计算机得到的样本数据就越多，对信号波形的表示也越精确。采样频率与原始信号频率之间有一定的关系，根据奈奎斯特理论，只有采样频率高于原始信号最高频率的两倍时，才能把数字信号表示的信号还原成为原来信号。

## 2、命令执行

### 2-1、查看采样率
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

### 2-2、播放音频
打印声卡列表：
alsa_arecord -L
录音：
alsa_arecord -f cd -D default:CARD=Device /sdcard/filename.wav
放音：
alsa_aplay  -f cd -D default:CARD=Device /sdcard/filename.wav
参数说明：
 -D 指定声卡 -f 指定采样率
这里的 -f cd 表示您希望以 CD 音质播放（16-bit, 44.1 kHz, stereo）。但是，USB 音频设备可能不支持这种格式。
```
root@android:/ # alsa_aplay -l
**** List of PLAYBACK Hardware Devices ****
card 0: RKES8316 [RK_ES8316], device 0: ES8316 PCM ES8316 HiFi-0 []
  Subdevices: 1/1
  Subdevice #0: subdevice #0
card 3: Phone [USB Speaker Phone], device 0: USB Audio [USB Audio]
  Subdevices: 1/1
  Subdevice #0: subdevice #0
root@android:/ # alsa_aplay -L
null
    Discard all samples (playback) or generate zero samples (capture)
default:CARD=RKES8316
    RK_ES8316,
    Default Audio Device
default:CARD=Phone
    USB Speaker Phone, USB Audio
    Default Audio Device
root@android:/ # alsa_aplay -f cd -D default:CARD=Phone AudioTest.wav
root@android:/ # alsa_aplay -f cd -d 3 AudioTest.wav
```
参数说明：
-l, --list-devices      list all soundcards and digital audio devices
-L, --list-pcms         list device names

### 2-3、设置音量
```
root@android:/ # alsa_amixer -c 3
Simple mixer control 'PCM',0
  Capabilities: pvolume pvolume-joined pswitch pswitch-joined penum
  Playback channels: Mono
  Limits: Playback 0 - 6400
  Mono: Playback 6400 [60%] [0.00dB] [on]
Simple mixer control 'Mic',0
  Capabilities: cvolume cvolume-joined cswitch cswitch-joined penum
  Capture channels: Mono
  Limits: Capture 0 - 25
  Mono: Capture 25 [100%] [0.00dB] [on]

root@android:/ # alsa_amixer -c 3 sset 'PCM' 100%
Simple mixer control 'PCM',0
  Capabilities: pvolume pvolume-joined pswitch pswitch-joined penum
  Playback channels: Mono
  Limits: Playback 0 - 6400
  Mono: Playback 6400 [100%] [0.00dB] [on]

root@debian:~# alsamixer
使用F6键切换声卡设备，也可以提前指定声卡设备：alsamixer -c 3
```

## 3、物理机插上耳机没有声音
一开始以为是耳机坏了，然后在另外一台电脑发现能正常使用。
后面发现在设备管理器中音频设备中缺少麦克风和扬声器的子设备，在另外一台电脑就有，怀疑是电脑的声卡驱动问题，然后就下载了一个360驱动大师，在安装稳定模式的驱动始终安装不上，然后安装了最新模式的驱动安装上了，然后耳机就正常了。

## 4、PulseAudio
PulseAudio是一个声音服务器，一个后台进程从一个或多个音源（进程或输入设备）接受声音输入 然后重定向声音到一个或多个槽（声卡，远程网络PulseAudio服务，或其他进程）。PulseAudio被几个主要Linux发行版使用，例如Fedora、Ubuntu、Mandriva、Linux Mint、openSUSE和OpenWRT。GNOME项目中还有越来越多的对Pulseaudio的支持。

查看当前pulseaudio信息：pactl info
systemctl --user enable pulseaudio
systemctl --user restart pulseaudio
systemctl --user restart pulseaudio.socket
放音举例：paplay -p -v test.wav
录音举例：paplay -r test.wav
```
root@debian:~# paplay -p -v AudioTest.wav
Opening a playback stream with sample specification 's16le 2ch 44100Hz' and channel map 'front-left,front-right'.
Connection established.
Stream successfully created.
Buffer metrics: maxlength=4194304, tlength=352800, prebuf=349276, minreq=3528
Using sample spec 's16le 2ch 44100Hz', channel map 'front-left,front-right'.
Connected to device alsa_output.usb-Anhui_LISTENAI_CO._LTD._USB_Speaker_Phone-00-Phone.analog-mono (4, not suspended).
Stream started.
Got signal, exiting.ency: 2093756 usec.
root@debian:~# paplay -p AudioTest.wav
root@debian:~#
```

pacmd命令（先执行，然后进行pacmd命令行）：
- 查看放音通道：list-sinks
index后面的数字是通道序号
- 查看录音通道：list-sources
index后面的数字是通道序号
- 设置放音通道：set-default-sink
例如：set-default-sink 1
设置默认的放音通道序号为1
- 设置录音通道：set-default-source
例如：set-default-source 1
设置默认的放音通道序号为1
- 设置pulseaudio日志位置：set-log-target
例如：set-log-target file:/tmp/pulseaudio
设置pulseaudio日志文件位置为/tmp/pulseaudio
- 设置pulseaudio日志界别：set-log-level
例如：set-log-level 4
设置pulseaudio日志级别为debug

## 5、amixer命令
amixer 是一个用于控制和管理 ALSA（Advanced Linux Sound Architecture）音频设备的命令行工具。它允许用户查看和修改音量、音频通道、音频设备的状态等。
查看音量和设备信息：amixer
查看特定设备的音量：amixer get \<control\>
设置音量：amixer set Master 50%
将音量增加 10%：amixer set Master 10%+
将音量减少 10%：amixer set Master 10%-
静音：amixer set Master mute
取消静音：amixer set Master unmute
列出所有控制：amixer controls
提取当前音量值：amixer get Master | grep -o '[0-9]*%'
-D: 指定使用的音频设备：amixer -D pulse get Master
alsamixer 是一个基于终端的音频混音器，用于控制和管理 ALSA（Advanced Linux Sound Architecture）音频设备。它提供了一个用户友好的界面，允许用户调整音量、静音、选择音频通道等。



