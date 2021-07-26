# 深入理解描述符请求

# 1、设备描述符解读
```
Device Descriptor:
bcdUSB:             0x0110
bDeviceClass:         0x00
bDeviceSubClass:      0x00
bDeviceProtocol:      0x00
bMaxPacketSize0:      0x40 (64)
idVendor:           0x1483
idProduct:          0xC007
bcdDevice:          0x0100
iManufacturer:        0x01
iProduct:             0x02
iSerialNumber:        0x00
bNumConfigurations:   0x01

ConnectionStatus: DeviceConnected
Current Config Value: 0x01
Device Bus Speed:     Full
Device Address:       0x01
Open Pipes:              1

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0008 (8)
bInterval:            0x0A

Configuration Descriptor:
wTotalLength:       0x0022
bNumInterfaces:       0x01
bConfigurationValue:  0x01
iConfiguration:       0x00
bmAttributes:         0x80 (Bus Powered )
MaxPower:             0x32 (100 mA)

Interface Descriptor:
bInterfaceNumber:     0x00
bAlternateSetting:    0x00
bNumEndpoints:        0x01
bInterfaceClass:      0x03 (HID)
bInterfaceSubClass:   0x00
bInterfaceProtocol:   0x00
iInterface:           0x00

HID Descriptor:
bcdHID:             0x0110
bCountryCode:         0x00
bNumDescriptors:      0x01
bDescriptorType:      0x22
wDescriptorLength:  0x0121

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0008 (8)
bInterval:            0x0A
```

参考资料：《圈圈教你玩USB》

GET_DESCRIPTOR获取描述符请求是在枚举过程中用得最多的一个请求。
请求类型是0x80，获取描述符请求代码是0x06，因此开头为0x80 0x06的是获取描述符请求。


总体来说注意一点，一个双字节的域抓取的数据包显示和usbview是相反的，即大端和小端的区别。

1. 设备描述符
请求数据包：80 06 0100 0000 0012 18
长度为18字节，描述符类型为1，因此开头是0x12,0x01。
后面16个字节可以通过usbview软件看见其值。
bcdUSB：USB协议版本

2. 配置描述符
请求数据包：80 06 0200 0000 0009 9
长度为9字节，描述符类型为2，因此开头是0x09,0x02。
后面7个字节可以通过usbview软件看见其值。

3. 字符串描述符
当索引值为0时，表示获取语言ID。语言ID是一个描述该设备支持的语言种类的数组，每个ID占2个字节。
请求数据包：80 06 0300 0000 00ff 255
回包：4 = 04030904

厂商字符串请求数据包：80 06 0301 0409 00ff 255
产品字符串请求数据包：80 06 0302 0409 00ff 255
产品序列号请求数据包：80 06 0303 0409 00ff 255

可选的，一般来说可能没有。
长度不固定，描述符类型为3，因此开头是0xxx,0x03。
后面x个字节可以通过usbview软件看见其值。

4. 接口描述符
注意在配置描述符+接口描述符+HID描述符+端点描述符中。
假设每个描述符只有一个，则总共长度为34=9+9+9+7。

长度为9字节，描述符类型为4，因此开头是0x09,0x04。
后面7个字节可以通过usbview软件看见其值。

5. 端点描述符
长度为7字节，描述符类型为5，因此开头是0x07,0x05。
后面5个字节可以通过usbview软件看见其值。

6. HID描述符
长度为9字节，描述符类型为0x21，因此开头是0x09,0x21。
后面7个字节可以通过usbview软件看见其值。



# 2、学习分析盒子数据包
抓取的枚举数据包：
```
d891c280 2116911208 S Ci:3:006:0 s 80 06 0100 0000 0012 18 <
d891c280 2116956319 C Ci:3:006:0 0 18 = 12011001 00000040 831407c0 00010102 0001
d891c280 2116956346 S Ci:3:006:0 s 80 06 0200 0000 0009 9 <
d891c280 2116958194 C Ci:3:006:0 0 9 = 09022200 01010080 32
d891c280 2116958214 S Ci:3:006:0 s 80 06 0200 0000 0022 34 <
d891c280 2116960692 C Ci:3:006:0 0 34 = 09022200 01010080 32090400 00010300 00000921 10010001 22210107 05830308
d891c280 2116960740 S Ci:3:006:0 s 80 06 0300 0000 00ff 255 <
d891c280 2116961318 C Ci:3:006:0 0 4 = 04030904
d891c280 2116961333 S Ci:3:006:0 s 80 06 0302 0409 00ff 255 <
d891c280 2116962192 C Ci:3:006:0 0 12 = 0c035400 6f006b00 65006e00
d891c280 2116962208 S Ci:3:006:0 s 80 06 0301 0409 00ff 255 <
d891c280 2116962942 C Ci:3:006:0 0 8 = 08035500 53004200
d891c280 2116963464 S Co:3:006:0 s 00 09 0001 0000 0000 0
d891c280 2116963822 C Co:3:006:0 0 0
d891c280 2116964267 S Co:3:006:0 s 21 0a 0000 0000 0000 0
d891c280 2116964442 C Co:3:006:0 0 0
d891c280 2116964481 S Ci:3:006:0 s 81 06 2200 0000 0121 289 <
d891c280 2116974580 C Ci:3:006:0 0 289 = 06a8ff09 00a10115 0026ff00 75088501 95070901 b1828502 950f0901 b1828503
```



# 3、usbview查看usb设备信息
```
Device Descriptor:
bcdUSB:             0x0210
bDeviceClass:         0x00
bDeviceSubClass:      0x00
bDeviceProtocol:      0x00
bMaxPacketSize0:      0x40 (64)
idVendor:           0x0BDA (Realtek Semiconductor Corp.)
idProduct:          0x8152
bcdDevice:          0x2000
iManufacturer:        0x01
0x0409: "Realtek"
iProduct:             0x02
0x0409: "USB 10/100 LAN"
iSerialNumber:        0x03
0x0409: "00E04C36006B"
bNumConfigurations:   0x02

ConnectionStatus: DeviceConnected
Current Config Value: 0x01
Device Bus Speed:     High
Device Address:       0x05
Open Pipes:              3

Endpoint Descriptor:
bEndpointAddress:     0x81  IN
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x02  OUT
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0002 (2)
bInterval:            0x08

Configuration Descriptor:
wTotalLength:       0x0027
bNumInterfaces:       0x01
bConfigurationValue:  0x01
iConfiguration:       0x00
bmAttributes:         0xA0 (Bus Powered Remote Wakeup)
MaxPower:             0x32 (100 mA)

Interface Descriptor:
bInterfaceNumber:     0x00
bAlternateSetting:    0x00
bNumEndpoints:        0x03
bInterfaceClass:      0xFF
bInterfaceSubClass:   0xFF
bInterfaceProtocol:   0x00
iInterface:           0x00

Endpoint Descriptor:
bEndpointAddress:     0x81  IN
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x02  OUT
Transfer Type:        Bulk
wMaxPacketSize:     0x0200 (512)
bInterval:            0x00

Endpoint Descriptor:
bEndpointAddress:     0x83  IN
Transfer Type:   Interrupt
wMaxPacketSize:     0x0002 (2)
bInterval:            0x08
```

# 4、两次配置描述符
```
d87ae880 2886323691 S Ci:2:041:0 s 80 06 0100 0000 0012 18 <
d87ae880 2886324348 C Ci:2:041:0 0 18 = 12010002 ef020140 164b0c28 00010102 0301
d87ae880 2886324374 S Ci:2:041:0 s 80 06 0200 0000 0009 9 <
d87ae880 2886324535 C Ci:2:041:0 0 9 = 09028b04 030100c0 32
d87ae880 2886324554 S Ci:2:041:0 s 80 06 0200 0000 048b 1163 <
d87ae880 2886325173 C Ci:2:041:0 0 1163 = 09028b04 030100c0 32080b00 030e0300 00090400 00010e01 00000e24 0100015a
d87ae880 2886325203 S Ci:2:041:0 s 80 06 0300 0000 00ff 255 <
d87ae880 2886325404 C Ci:2:041:0 0 4 = 04030904
d87ae880 2886325421 S Ci:2:041:0 s 80 06 0302 0409 00ff 255 <
d87ae880 2886325656 C Ci:2:041:0 0 14 = 0e034800 57002d00 32003800 4600
d87ae880 2886325672 S Ci:2:041:0 s 80 06 0301 0409 00ff 255 <
d87ae880 2886325906 C Ci:2:041:0 0 28 = 1c034c00 74006900 61006e00 20004300 6f002000 4c007400 64002000
d87ae880 2886325922 S Ci:2:041:0 s 80 06 0303 0409 00ff 255 <
d87ae880 2886326162 C Ci:2:041:0 0 18 = 12033000 31002e00 30003000 2e003000 3000
d87ae880 2886326685 S Co:2:041:0 s 00 09 0001 0000 0000 0
d87ae880 2886326836 C Co:2:041:0 0 0
d87ae880 2886327571 S Co:2:041:0 s 01 0b 0000 0001 0000 0
d87ae880 2886327718 C Co:2:041:0 0 0
d87ae880 2886327792 S Ci:2:041:0 s a1 87 0100 0001 001a 26 <
d87ae880 2886340179 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340202 S Co:2:041:0 s 21 01 0100 0001 001a 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340423 C Co:2:041:0 0 26 >
d87ae880 2886340491 S Ci:2:041:0 s a1 81 0100 0001 001a 26 <
d87ae880 2886340669 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 000000fc 0300f807 0000
d87ae880 2886340928 S Co:2:041:0 s 01 0b 0000 0002 0000 0
d87ae880 2886341080 C Co:2:041:0 0 0
d87ae880 2886341116 S Ci:2:041:0 s a1 87 0100 0002 001a 26 <
d87ae880 2886347479 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2886347497 S Co:2:041:0 s 21 01 0100 0002 001a 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2886347652 C Co:2:041:0 0 26 >
d87ae880 2886347747 S Ci:2:041:0 s a1 81 0100 0002 001a 26 <
d87ae880 2886347922 C Ci:2:041:0 0 26 = 00000101 80969800 00000000 3d000000 00000058 0200f807 0000
d87ae880 2887583522 S Ii:2:041:7 -115:1 16 <
d87ae880 2887590621 C Ii:2:041:7 -2:1 0
d87ae880 2887593960 S Ii:2:041:7 -115:1 16 <
d87ae880 2887601025 C Ii:2:041:7 -2:1 0
d87ae880 2887601422 S Ii:2:041:7 -115:1 16 <
d87ae880 2887601710 C Ii:2:041:7 -2:1 0
d87ae880 2887601904 S Ii:2:041:7 -115:1 16 <
```
比较可疑的地方是两次配置描述符请求，第二次居然有1163字节大小的配置数据包。

看了一下书，每个USB设备至少都要有一个配置描述符，在设备描述符中规定了该设备有多少种配置，每种配置都有一个描述符。真是少见多怪。



















