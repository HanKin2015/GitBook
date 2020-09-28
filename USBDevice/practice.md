[TOC]


# Bus Hound
phase：阶段、时期

人体学输入设备可以理解为HID设备吗？？？但可以肯定的是HID设备属于人体学输入设备。


udevadm monitor

# tcpdump抓包工具+wireshark
tcpdump -D
tcpdump -i usbmon2 > xxxx.pcap

低版本无法使用tcpdump抓usb数据包
`0` 代表所有的USB总线，`1，2` 代表不同USB总线，`t` 代表 `text api`，`u`代表 `binary api`。如果不需要完整的数据，可以通过cat这些文件获得；


## strace命令
https://www.cnblogs.com/bangerlee/archive/2012/02/20/2356818.html

## mknod
创建块设备或者字符设备文件。此命令的适用范围：RedHat、RHEL、Ubuntu、CentOS、SUSE、openSUSE、Fedora。


