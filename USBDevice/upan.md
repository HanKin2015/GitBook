# U盘那些事儿

## 1、这张磁盘有写保护
起因：家里摄像头的内存卡异常，无法进行格式化以及往里面写内容。
使用笔记本进行格式化报这张磁盘有写保护错误。
离了一个大谱，原来是物理写保护，我的读卡器有一个物理写保护开关。

网上的使用dos命令进行清楚U盘只读属性方法根本行不通，虽然我这个是物理开关导致，但是之前是U盘尝试过。

### 1-1、现象
格式化U盘不成功，告知“这张磁盘有写保护”。

### 1-2、方法1失败
磁盘管理无法进行任何操作，显示只读。

### 1-3、方法2失败
dos窗口输入diskpart
```
lisk disk（显示所有磁盘）
select disk 1（数字表示选择你要操作的盘，如1表示为我的移动硬盘;）
diskpart（显示帮助信息）
att disk clear readonly（清楚只读属性）
attribute disk（显示磁盘属性）
```
结果显示已成功清除磁盘属性，但是还是存在问题。

### 1-4、方法3失败
注册表：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies
根本没有这个选项。

bat脚本：
```
@echo off

reg add HKLM\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies /v WriteProtect /t REG_DWORD /d 00000000
reg add HKLM\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies /v WriteProtect /t REG_DWORD /d 00000001

pause
```

### 1-5、失败
用DiskGenius软件来格式化U盘。

### 1-6、没有试过
建议 进入 PE 格式下 格式化 U 盘 或者 在 安全格式 下 进行格式化 U 盘 里面有错误数据 在运行 就算 你提取 出来的文件 信息 也是 不完整的 数据 时间长 还是一样

### 1-7、未尝试，已把U盘弄坏
https://segmentfault.com/q/1010000007503021
查到可以使用dosfsck -v -a U盘所在位置

umount /media/（U盘被挂在后的名字）
sudo dosfsck -v -a /dev/sde1

### 1-8、金士顿u盘写保护修复工具绿色版(restore)v3.7 中文版
发现真的也只有金士顿有这个问题？？？

http://www.downyi.com/downinfo/145100.html

## 2、Windows无法完成格式化
然后进入U盘能手动删除所有文件，但是还是无法快速格式化。
去掉快速格式化选项后，等待一段时间后还是报错Windows无法完成格式化，并且所有文件都恢复回来了。另外发现把设备拔插一下后所有文件还是会恢复回来。并且文件都是正常的，还可以正常使用。

使用diskpart查看属性，没有只读属性，属性都是正常的。
```
DISKPART> att disk
当前只读状态: 否
只读: 否
启动磁盘: 否
页面文件磁盘: 否
休眠文件磁盘: 否
故障转储磁盘: 否
群集磁盘  : 否
```
往里面添加文件后也会在拔插之后恢复原状，在网上看见一句话说：这是U盘使用期限到了，最后保持这种只读状态是为了客户拷贝里面最终的文件进行备份，不久后就会彻底报废。感觉好像很有道理。

## 3、小米摄像头生成的MP4格式视频无法使用Windows自带的两款视频软件打开
推荐使用potplayer：
https://www.zhihu.com/question/20710497/answers/updated
https://zhuanlan.zhihu.com/p/639279632
Potplayer 官网： https://potplayer.daum.net （尴尬的是，国内打不开，原因你懂的。。。）
Potplayer 另一个官网地址: http://potplayer.tv/

如果只下载potplayer播放器，还是打不开，会报错不支持H265解码，请搜索解码器：https://github.com/Nevcairiel/LAVFilters/releases
解码器安装完成后就能正常打开视频了。

## 4、使用量产工具
ChipGenius_v4_19_0319：下载地址：https://chipgenius.en.softonic.com
ChipGenius4.21.0701：下载地址：https://www.onlinedown.net/soft/559408.htm
是目前的最新版本（20231106），后面应该也不会再进行更新了。

然鹅并不能检测出主控型号，无法进行下一步使用量产工具。放弃，更换另外一款U盘来尝试是否能使用量产工具解决U盘无法使用问题。

量产工具网：https://www.upantool.com/liangchan/
现象一样，U盘为金士顿（0951:1666）。
首先尝试使用rufus软件进行格式化操作，首先第一步也是检测出多分区，继续下一步格式化操作，报错could not be performed。有一个效果是一开始文件资源管理器能看见3个盘符，现在只有一个了。
然后磁盘管理器发现不能进行任何操作。

ChipGenius识别出主控厂商为Innostor(银灿)，型号IS918M_GA。
银灿IS918主控U盘量产工具MPTool_180703A：https://pan.baidu.com/s/1Bybmqld89ZeX2bweQV5iJQ
提取码: 7y5v
还有难点，居然这个网站下载的量产工具无法使用，最终在http://wuyou.net/forum.php?mod=viewthread&tid=436519找到了工具，直接点击开始即可，并且能正常使用。
https://www.bilibili.com/read/cv23056591/
下载网址：https://modou.lanzoul.com/b036ysufc，密码是：点赞
量产后的结果（一般来说多多少少会缩水，并且耗时长）：
耗时未统计，量产过后软件自动退出了。但是缩水严重，原来32G的U盘变成16G了。。。但是总算能使用了。
另外我仔细发现，U盘的vpid变了，并且字符串描述符名称也变了，估计是进行了相关的重写操作，把这个U盘换成了其他品牌U盘，这很合理，但是按道理来说能拿到所有描述符信息，为何还是要变。还好速度还是usb3.0。

另外我找了一个U盘，那个量产工具网感觉不好用，推荐使用：
http://www.downcc.com/soft/134178.html
http://www.downcc.com/k/uplcgj/
集成了一些常用工具。

## 5、多分区U盘无法在Windows系统上面挂载
从而导致无法进行格式化操作，在磁盘管理器里面能看见U盘容量，并有一个EFI分区和RAW主分区，并不能增加简单卷让U盘在文件资源管理器里面显示出来。
将U盘插入ubuntu23里面，结果直接导致枚举失败，更换一个ubuntu版本能枚举成功，也是无法在资源管理器中看见U盘内容。
最后想到使用rufus软件进行格式化操作，果然rufus软件能识别到U盘，需要选择一个ISO文件并刷入即可格式化操作，并检测到本盘包含多分区，继续下一步格式化操作。
然后我就成功了，文件资源管理器成功识别U盘。

### 5-1、windows不支持U盘多分区吗？
在传统上，Windows对U盘的多分区支持是有限的。以下是一些关于Windows对U盘多分区支持的详细信息：

历史限制：
在Windows 7及更早版本中，Windows通常只会识别U盘上的第一个分区。这是因为Windows将U盘识别为“可移动设备”，而对可移动设备的多分区支持有限。

Windows 10及更高版本的改进：
- 从Windows 10开始，微软对U盘的多分区支持有所改进。Windows 10可以识别并使用U盘上的多个分区，但前提是U盘被识别为“本地磁盘”而不是“可移动磁盘”。
- 这通常需要U盘的固件支持，或者通过第三方工具将U盘的“可移动”属性更改为“本地”属性。

如何创建多分区：
- 使用Windows内置的磁盘管理工具（Disk Management）或命令行工具（如diskpart）可以在U盘上创建多个分区。
- 需要注意的是，虽然可以创建多个分区，但在某些情况下，Windows可能仍然只会自动挂载第一个分区，其他分区需要手动挂载或使用第三方工具。

第三方工具：
有些第三方工具可以帮助管理和使用U盘上的多个分区。例如，某些分区管理软件可以创建和管理U盘的多个分区，并帮助Windows识别这些分区。

使用场景：
多分区U盘在某些特定场景下非常有用，比如需要在同一个U盘上存储不同类型的数据（如一个分区用于存储文件，另一个分区用于启动镜像）。

## 6、U盘只读编码方案
大容量存储通常是通过Bulk-Only Transport（BOT）协议规范进行通信的，BOT每一个HOST发起的请求，都要设备进行确认，即不支持并发。每一个CBW都需要一个CSW进行确认。
而真正和U盘通讯的是CBW中封装的scsi 命令， 那么在BULK传输这一层，就可以清楚地知道系统到底想做什么，是读取扇区或是写扇区或其他操作。
U盘读写权限其实是在投递scsi command的MODE_SENSE6指令来获取的。只需要我们能解析出MODE_SENSE6的指令，修改它的返回值 ，即可以产生写保护的功能(U盘只读功能)。
经过阅读协议文档可知，DEVICE-SPECIFIC PARAMETER字段即表示其可读写标记，当为0x80表示其受写保护。

## 7、U盘或者硬盘显示无媒体
https://baijiahao.baidu.com/s?id=1781611581811639384&wfr=spider&for=pc
https://www.disktool.cn/content-center/usb-no-media-fix-windows-7-6540.html
现象：当出现U盘无媒体情况时，您可以在磁盘管理工具中看到一个空白的磁盘框，并且在文件资源管理器中不会显示出来。

未解决。
初步怀疑是设备上的MBR或PBR出现故障，拔插后恢复。

## 8、光盘刻录两种模式
- 打开“计算机”窗口，双击光盘驱动器的图标，弹出“刻录光盘”对话框，选择刻录类型；
- 这里有两个选项：一个是“类似于USB闪存驱动器”；另一个是“带有CD/DVD播放器”；

### 8-1、Live File System 模式（类似于 USB 闪存驱动器）
特点：
- 光盘可以像 USB 闪存驱动器一样直接读写。
- 支持多次写入和删除文件。
- 适合需要频繁更新数据的情况。

缺点：
- 无法在所有 CD/DVD 播放器上播放。
- 兼容性较差。

### 8-2、Mastered 模式（带有 CD/DVD 播放器）
特点：
- 光盘是一次性写入的，类似于传统的 CD/DVD。
- 支持在大多数 CD/DVD 播放器上播放。
- 适合制作可播放的音乐 CD、数据 CD/DVD 或备份光盘。

缺点：
- 无法多次写入或删除文件。

### 8-3、总结
可以反复擦除，写入的DVD/EVD光盘，选择，类似于U盘模式，为佳。
不可以反复擦除，写入的DVD/EVD光盘，选择，用于CD/DVD播放机模式，为佳。

### 8-4、原因
刻录模式一旦选择后写入过数据就无法进行切换了。
另外Mastered模式一旦格式化光盘后，也将变成Live File System 模式，也再也变不回去了。另外不可以反复擦除的光盘格式化后内存不会再回来。

### 8-5、光盘种类
国内市场较为常见的有DVD-R、DVD+R、DVD-RW、DVD+RW、DVD-R DL、DVD+R DL、DVD-ROM这几类以及国内市场不太常见的DVD-RAM。


