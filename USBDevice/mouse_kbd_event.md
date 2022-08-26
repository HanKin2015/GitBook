# 鼠标键盘事件

## 1、键盘失效
```
  513  xev
  514  xev -h
  515  xev -display :0
  516  xev -display :0
  517  ls
  518  ls /dev/input/
  519  ls /dev/input/by-path/
  520  ls /dev/input/by-path/ -l
  521  lsusb -t
  522  cat /dev/input/by-path/pci-0000:00:14.0-usb-0:4.3:1.0-event-kbd
  523  ls
  524  cd /var
  525  ls
  526  cd log
  527  ls
  528  tail Xorg.0.log
  529* tail Xorg.0.log 1000
  530  tail -f Xorg.0.log -n 1000
  531  lsof
  532  ls /dev/input/event9
  533  ls /dev/input/event9
  534  tail -f Xorg.0.log -n 1000
  535  history
```

键盘有数据，内核能收到，发现是xev有问题。
```
[  6070.660] (**) SEM USB Keyboard: always reports core events
[  6070.660] (**) evdev: SEM USB Keyboard: Device: "/dev/input/event9"
[  6070.660] (WW) evdev: SEM USB Keyboard: device file is duplicate. Ignoring.
[  6070.676] (EE) PreInit returned 8 for "SEM USB Keyboard"
[  6070.676] (II) UnloadModule: "evdev"
[  6070.677] (II) config/udev: Adding input device SEM USB Keyboard (/dev/input/event10)
[  6070.677] (**) SEM USB Keyboard: Applying InputClass "evdev keyboard catchall"
```

call的参数位置也是固定的，位置如下：
ebp+4是返回到
ebp+8是参数1
ebp+c 是参数2
ebp +10 参数3
总结是 ebp+ 8是第一个参数，之后每次+4，按照十六进制表示。

## 2、系统检测命令工具
安卓 : getevent
linux: xev

evtest和evtest_sw不清楚命令的来源，但是能进行键盘输入的监控。但是sw应该是申威架构的版本。
```
[root@ubuntu0006:/media/hankin/vdb/study] #readelf evtest_sw -h
ELF 头：
  Magic：   7f 45 4c 46 02 01 01 00 00 00 00 00 00 00 00 00
  类别:                              ELF64
  数据:                              2 补码，小端序 (little endian)
  版本:                              1 (current)
  OS/ABI:                            UNIX - System V
  ABI 版本:                          0
  类型:                              EXEC (可执行文件)
  系统架构:                          <unknown>: 0x9906
  版本:                              0x1
  入口点地址：               0x120000f70
  程序头起点：          64 (bytes into file)
  Start of section headers:          44640 (bytes into file)
  标志：             0x0
  本头的大小：       64 (字节)
  程序头大小：       56 (字节)
  Number of program headers:         8
  节头大小：         64 (字节)
  节头数量：         35
  字符串表索引节头： 32
[root@ubuntu0006:/media/hankin/vdb/study] #ldd evtest_sw
        不是动态可执行文件
```
按键监控说明：
如果有键盘按键会有如下打印：
Type为EV_KEY那行， KEY_S， 代表S健，
 value 为0代表按键释放
 value为1代表被按下
 value为2代表按键一直按着没有释放。








