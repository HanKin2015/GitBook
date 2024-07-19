# 精华篇
解惑最深层次的疑难解答，最容易用到但是最容易忘记的东西。

## 1、关于in/out方向
抓取的数据包中S和C代表状态，Send和Complete，Ci代表是Control In，即控制In包（设备到虚拟机），Co代表是Control Out，即控制Out包（虚拟机到设备）。

## 2、Linux常用的操作
```
最简单的命令查看usb设备：lsusb
设备节点来查看(软链接)：ll /sys/bus/usb/devices
更详细的USB设备信息：cat /sys/kernel/debug/usb/devices
在/sys/devices目录：find . -name idVendor | xargs cat
```

