# 学习libusb

## 1、libusb学习网站
website：http://libusb.info/
API：http://libusb.sourceforge.net/api-1.0/
download：https://github.com/libusb/libusb
mailing list：http://mailing-list.libusb.info
libusb test demo：https://github.com/crazybaoli/libusb-test

## 2、安装
提示：configure: error: “udev support requested but libudev not installed”
解决：sudo apt-get install libudev-dev

一般来说可能没有问题，直接configure 、 make 、make install三部曲即可。


