# 学习linux内核

## 1、源码下载地址
官网链接：https://www.kernel.org/

HTTP	https://www.kernel.org/pub/
GIT	https://git.kernel.org/

官网下载经常速度太慢，无法下载，提供另一个链接：
http://ftp.sjtu.edu.cn/sites/ftp.kernel.org/pub/linux/kernel/

在线文档：https://www.kernel.org/doc/html/

包名如下：
linux-4.9.249.tar.gz                               29-Dec-2020 12:51           142328958
linux-4.9.249.tar.sign                             29-Dec-2020 12:51                 991
linux-4.9.249.tar.xz                               29-Dec-2020 12:51            93596052

## 2、内核配置文件位置
在/boot文件夹下面config开头

使用uname -a查看当前系统版本，然后对应版本就是。
```
root@ubuntu0001:/home/hankin# cd /boot/
root@ubuntu0001:/boot# ll
总用量 155168
drwxr-xr-x  3 root root     4096 8月   7 06:52 ./
drwxr-xr-x 24 root root     4096 8月   7 10:15 ../
-rw-r--r--  1 root root   224422 9月  13  2019 config-5.0.0-29-generic
-rw-r--r--  1 root root   237757 7月  14 01:52 config-5.4.0-80-generic
drwxr-xr-x  5 root root     4096 8月   6 06:08 grub/
-rw-r--r--  1 root root 64349107 8月   5 07:12 initrd.img-5.0.0-29-generic
-rw-r--r--  1 root root 66451701 8月   5 07:16 initrd.img-5.4.0-80-generic
-rw-r--r--  1 root root   182704 1月  28  2016 memtest86+.bin
-rw-r--r--  1 root root   184380 1月  28  2016 memtest86+.elf
-rw-r--r--  1 root root   184840 1月  28  2016 memtest86+_multiboot.bin
-rw-------  1 root root  4290085 9月  13  2019 System.map-5.0.0-29-generic
-rw-------  1 root root  4587397 7月  14 01:52 System.map-5.4.0-80-generic
-rw-------  1 root root  8707832 9月  13  2019 vmlinuz-5.0.0-29-generic
-rw-------  1 root root  9453824 7月  14 02:28 vmlinuz-5.4.0-80-generic
root@ubuntu0001:/boot# uname -a
Linux ubuntu0001 5.4.0-80-generic #90~18.04.1-Ubuntu SMP Tue Jul 13 19:40:02 UTC 2021 x86_64 x86_64 x86_64 GNU/Linux
root@ubuntu0001:/boot# vim config-5.4.0-80-generic
```

## 3、内核调试
以调试键盘为例（http://bec-systems.com/site/209/linux-input-testing-and-debugging）。
发现在/boot/config-5.4.0-80-generic文件中CONFIG_INPUT_EVBUG=m, 则需要手动加载驱动insmod /lib/modules/5.4.0-80-generic/kernel/drivers/input/evbug.ko

### 3-1、查看系统中的输入设备
cat /proc/bus/input/devices
主要通过Handlers选项来区分键盘鼠标。

### 3-2、调整内核printk的打印级别
有时调试内核模块，打印信息太多了，可以通过修改/proc/sys/kernel/printk文件内容来控制。
默认设置是7   4   1   7
```
# cat /proc/sys/kernel/printk
7       4       1      7
```
上面显示的4个数据分别对应：
控制台日志级别：优先级高于该值的消息将被打印至控制台
默认的消息日志级别：将用该优先级来打印没有优先级的消息
最低的控制台日志级别：控制台日志级别可被设置的最小值(最高优先级)
默认的控制台日志级别：控制台日志级别的缺省值
数值越小，优先级越高(注意)

其实这四个值是在kernel/printk.c 中被定义的，如下：
int console_printk[4] = {
                DEFAULT_CONSOLE_LOGLEVEL,       /* console_loglevel */
                DEFAULT_MESSAGE_LOGLEVEL,       /* default_message_loglevel */
                MINIMUM_CONSOLE_LOGLEVEL,       /* minimum_console_loglevel */
                DEFAULT_CONSOLE_LOGLEVEL,       /* default_console_loglevel */
};

首先，printk有8个loglevel,定义在<linux/kernel.h>中，其中数值范围从0到7，数值越小，优先级越高。
#define    KERN_EMERG      "<0>"      系统崩溃
#define    KERN_ALERT       "<1>"必须紧急处理
#define    KERN_CRIT "<2>"      临界条件，严重的硬软件错误
#define    KERN_ERR    "<3>"      报告错误
#define    KERN_WARNING "<4>"      警告
#define    KERN_NOTICE     "<5>"      普通但还是须注意
#define    KERN_INFO "<6>"      信息
#define    KERN_DEBUG      "<7>"      调试信息
从这里也可以看出他们的优先级是数值越小，其紧急和严重程度就越高。

echo 0 4 0 7 > /proc/sys/kernel/printk	关闭所有内核打印
echo 8 > /proc/sys/kernel/printk		开启调试即所有日志

## 3-3、查看调试日志
dmesg
cat /proc/kmsg

```
[ 3000.689529] evbug: Event. Dev: input6, Type: 3, Code: 0, Value: 988
[ 3000.689533] evbug: Event. Dev: input6, Type: 3, Code: 1, Value: 500
[ 3000.689534] evbug: Event. Dev: input6, Type: 0, Code: 0, Value: 0
[ 3000.703628] evbug: Event. Dev: input6, Type: 3, Code: 0, Value: 989
[ 3000.703631] evbug: Event. Dev: input6, Type: 3, Code: 1, Value: 497
[ 3000.703632] evbug: Event. Dev: input6, Type: 0, Code: 0, Value: 0
[ 3000.737842] evbug: Event. Dev: input6, Type: 3, Code: 0, Value: 990
[ 3000.737846] evbug: Event. Dev: input6, Type: 0, Code: 0, Value: 0
root@ubuntu0001:/boot#
root@ubuntu0001:/boot#
root@ubuntu0001:/boot# cat /proc/bus/input/devices
I: Bus=0019 Vendor=0000 Product=0001 Version=0000
N: Name="Power Button"
P: Phys=LNXPWRBN/button/input0
S: Sysfs=/devices/LNXSYSTM:00/LNXPWRBN:00/input/input0
U: Uniq=
H: Handlers=kbd event0 evbug
B: PROP=0
B: EV=3
B: KEY=10000000000000 0

I: Bus=0000 Vendor=0000 Product=0000 Version=0000
N: Name="spice vdagent tablet"
P: Phys=
S: Sysfs=/devices/virtual/input/input6
U: Uniq=
H: Handlers=mouse0 event3 js0 evbug
B: PROP=0
B: EV=f
B: KEY=70000 0 0 0 0
B: REL=100
B: ABS=3
```
可以看见input6是鼠标，在/dev/input/event3位置。

## 4、evtest工具
```
apt install evtest
root@ubuntu0001:/boot# evtest /dev/input/event3
Input driver version is 1.0.1
Input device ID: bus 0x0 vendor 0x0 product 0x0 version 0x0
Input device name: "spice vdagent tablet"
Supported events:
  Event type 0 (EV_SYN)
  Event type 1 (EV_KEY)
    Event code 272 (BTN_LEFT)
    Event code 273 (BTN_RIGHT)
    Event code 274 (BTN_MIDDLE)
  Event type 2 (EV_REL)
    Event code 8 (REL_WHEEL)
  Event type 3 (EV_ABS)
    Event code 0 (ABS_X)
      Value    990
      Min        0
      Max     1919
    Event code 1 (ABS_Y)
      Value    497
      Min        0
      Max     1079
Properties:
Testing ... (interrupt to exit)
Event: time 1628307061.099840, type 1 (EV_KEY), code 272 (BTN_LEFT), value 1
Event: time 1628307061.099840, -------------- SYN_REPORT ------------
Event: time 1628307061.317494, type 1 (EV_KEY), code 272 (BTN_LEFT), value 0
Event: time 1628307061.317494, -------------- SYN_REPORT ------------
Event: time 1628307062.581531, type 1 (EV_KEY), code 273 (BTN_RIGHT), value 1
```

## 5、键盘无法使用，鼠标能使用
- 更换usb口同样
- 键盘按灯键有反应
发现内核日志报错：i8042: No controller found
```
[    3.357558] uhci_hcd 0000:00:1a.0: irq 10, io base 0x0000c220
[    3.357649] usb usb10: New USB device found, idVendor=1d6b, idProduct=0001, bcdDevice= 5.04
[    3.357650] usb usb10: New USB device strings: Mfr=3, Product=2, SerialNumber=1
[    3.357651] usb usb10: Product: UHCI Host Controller
[    3.357653] usb usb10: Manufacturer: Linux 5.4.0-80-generic uhci_hcd
[    3.357653] usb usb10: SerialNumber: 0000:00:1a.0
[    3.357816] hub 10-0:1.0: USB hub found
[    3.357824] hub 10-0:1.0: 2 ports detected
[    3.358042] i8042: PNP: PS/2 Controller [PNP0303:KBD,PNP0f13:MOU] at 0x60,0x64 irq 1,12
[    3.358988] i8042: No controller found
[    3.359079] mousedev: PS/2 mouse device common for all mice
[    3.359201] rtc_cmos 00:00: RTC can wake from S4
[    3.359578] rtc_cmos 00:00: registered as rtc0
[    3.359598] rtc_cmos 00:00: alarms up to one day, 114 bytes nvram
[    3.359605] i2c /dev entries driver
[    3.359682] device-mapper: uevent: version 1.0.3
[    3.359760] device-mapper: ioctl: 4.41.0-ioctl (2019-09-16) initialised: dm-devel@redhat.com
```

尝试删除配置文件/etc/selinux/config。
先前创建了/etc/selinux/config文件，并增加内容：SELINUX=disabled。

搞定。

后来没有config文件又出现了一次现象，但是重启一下虚拟机就好了。

## 6、xdotool 模拟输入事件
xdotool 可以模拟鼠标键盘事件，模拟的输入事件只在 X11 层面产生效果，并不会在实际驱动中注入实际事件。
```
# 操作之前先设置 DISPLAY 变量
export DISPLAY=:0
可以使用xrandr命令来确认是0还是1

# 移动鼠标到 (1, 1) 坐标
xdotool mousemove 1 1
xdotool click 1
点击鼠标左键，1表示左键，2表示中键，3表示右键。
xdotool key ctrl+l
同时按下ctrl和l键
```
注意：鼠标光标可能是隐藏的服务端光标，需要移动鼠标到图标上面才能发现移动。

## 7、xev ‐ print contents of X events
Xev creates a window and then asks the X server to send it events whenever anything
happens to the window (such as it being moved, resized, typed in, clicked in, etc.). You
can also attach it to an existing window. It is useful for seeing what causes events to
occur and to display the information that they contain; it is essentially a debugging and
development tool, and should not be needed in normal usage.

## 8、xinput ‐ print contents of X events
xinput is a utility to list available input devices, query information about a device and
change input device settings.




