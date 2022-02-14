# USB3.0在win7系统上面开发

## 1、win7系统默认不支持USB3.0
因此在枚举USB3.0设备时，现有的微软接口是无法正确识别USB3.0设备的。

可以通过usbview软件查看出，usbview1.0在bus speed中显示unknown，但是usbview2.0能显示super speed。

可以通过微软开源的usbview代码发现增加了V2版本的接口进一步判断USB3.0设备。

## 2、USB3.0配置描述符获取失败

https://docs.microsoft.com/zh-cn/windows-hardware/drivers/usbcon/usb-configuration-descriptors

起初怀疑是BOS描述符未获取的问题，但是通过抓取数据包和查看描述符发现，BOS描述符才5个字节，而SuperSpeed Endpoint Companion Descriptor是两个6字节，并且抓包验证了。同时发现BOS描述符应该USB2.0设备也会有。·

```
[Port4]  :  USB 大容量存储设备


Is Port User Connectable:         yes
Is Port Debug Capable:            no
Companion Port Number:            19
Companion Hub Symbolic Link Name: USB#ROOT_HUB30#4&27e10f2d&0&0#{f18a0e88-c30c-11d0-8815-00a0c906bed8}
Protocols Supported:
 USB 1.1:                         no
 USB 2.0:                         no
 USB 3.0:                         yes

Device Power State:               PowerDeviceD0

       ---===>Device Information<===---
English product name: "STORAGE DEVICE"

ConnectionStatus:                  
Current Config Value:              0x01  -> Device Bus Speed: SuperSpeed
Device Address:                    0x01
Open Pipes:                           2

          ===>Device Descriptor<===
bLength:                           0x12
bDescriptorType:                   0x01
bcdUSB:                          0x0320
bDeviceClass:                      0x00  -> This is an Interface Class Defined Device
bDeviceSubClass:                   0x00
bDeviceProtocol:                   0x00
bMaxPacketSize0:                   0x09 = (9) Bytes
idVendor:                        0x1F75 = Innostor Co., Ltd.
idProduct:                       0x0918
bcdDevice:                       0x0320
iManufacturer:                     0x02
     English (United States)  "Device Storage"
iProduct:                          0x03
     English (United States)  "STORAGE DEVICE"
iSerialNumber:                     0x04
     English (United States)  "210424KT2020100657"
bNumConfigurations:                0x01

          ---===>Open Pipes<===---

          ===>Endpoint Descriptor<===
bLength:                           0x07
bDescriptorType:                   0x05
bEndpointAddress:                  0x81  -> Direction: IN - EndpointID: 1
bmAttributes:                      0x02  -> Bulk Transfer Type
wMaxPacketSize:                  0x0400
bInterval:                         0x00

          ===>Endpoint Descriptor<===
bLength:                           0x07
bDescriptorType:                   0x05
bEndpointAddress:                  0x02  -> Direction: OUT - EndpointID: 2
bmAttributes:                      0x02  -> Bulk Transfer Type
wMaxPacketSize:                  0x0400
bInterval:                         0x00

       ---===>Full Configuration Descriptor<===---

          ===>Configuration Descriptor<===
bLength:                           0x09
bDescriptorType:                   0x02
wTotalLength:                    0x002C  -> Validated
bNumInterfaces:                    0x01
bConfigurationValue:               0x01
iConfiguration:                    0x00
bmAttributes:                      0x80  -> Bus Powered
MaxPower:                          0x26 = 304 mA

          ===>Interface Descriptor<===
bLength:                           0x09
bDescriptorType:                   0x04
bInterfaceNumber:                  0x00
bAlternateSetting:                 0x00
bNumEndpoints:                     0x02
bInterfaceClass:                   0x08  -> This is a Mass Storage USB Device Interface Class
bInterfaceSubClass:                0x06
bInterfaceProtocol:                0x50
iInterface:                        0x00

          ===>Endpoint Descriptor<===
bLength:                           0x07
bDescriptorType:                   0x05
bEndpointAddress:                  0x81  -> Direction: IN - EndpointID: 1
bmAttributes:                      0x02  -> Bulk Transfer Type
wMaxPacketSize:                  0x0400
bInterval:                         0x00

 ===>SuperSpeed Endpoint Companion Descriptor<===
bLength:                           0x06
bDescriptorType:                   0x30
bMaxBurst:                         0x03
bmAttributes:                      0x00The bulk endpoint does not define streams (MaxStreams == 0)
wBytesPerInterval:                 0x0000

          ===>Endpoint Descriptor<===
bLength:                           0x07
bDescriptorType:                   0x05
bEndpointAddress:                  0x02  -> Direction: OUT - EndpointID: 2
bmAttributes:                      0x02  -> Bulk Transfer Type
wMaxPacketSize:                  0x0400
bInterval:                         0x00

 ===>SuperSpeed Endpoint Companion Descriptor<===
bLength:                           0x06
bDescriptorType:                   0x30
bMaxBurst:                         0x03
bmAttributes:                      0x00The bulk endpoint does not define streams (MaxStreams == 0)
wBytesPerInterval:                 0x0000

          ===>BOS Descriptor<===
bLength:                           0x05
bDescriptorType:                   0x0F
wTotalLength:                      0x0016
bNumDeviceCaps:                    0x02

          ===>USB 2.0 Extension Descriptor<===
bLength:                           0x07
bDescriptorType:                   0x10
bDevCapabilityType:                0x02
bmAttributes:                      0x00000006  -> Supports Link Power Management protocol

          ===>SuperSpeed USB Device Capability Descriptor<===
bLength:                           0x0A
bDescriptorType:                   0x10
bDevCapabilityType:                0x03
bmAttributes:                      0x00
wSpeedsSupported:                  0x0E
  -> Supports full-speed operation
  -> Supports high-speed operation
  -> Supports SuperSpeed operation
bFunctionalitySupport:             0x02 -> lowest speed = high-speed
bU1DevExitLat:                     0x0A -> less than 10 micro-seconds
wU2DevExitLat:                     0x07FF -> less than 2047 micro-seconds
```



```
/** \ingroup libusb_desc
 * Descriptor types as defined by the USB specification. */
enum libusb_descriptor_type {
    /** Device descriptor. See libusb_device_descriptor. */
    LIBUSB_DT_DEVICE = 0x01,

    /** Configuration descriptor. See libusb_config_descriptor. */
    LIBUSB_DT_CONFIG = 0x02,

    /** String descriptor */
    LIBUSB_DT_STRING = 0x03,

    /** Interface descriptor. See libusb_interface_descriptor. */
    LIBUSB_DT_INTERFACE = 0x04,

    /** Endpoint descriptor. See libusb_endpoint_descriptor. */
    LIBUSB_DT_ENDPOINT = 0x05,

    /** BOS descriptor */
    LIBUSB_DT_BOS = 0x0f,

    /** Device Capability descriptor */
    LIBUSB_DT_DEVICE_CAPABILITY = 0x10,

    /** HID descriptor */
    LIBUSB_DT_HID = 0x21,

    /** HID report descriptor */
    LIBUSB_DT_REPORT = 0x22,

    /** Physical descriptor */
    LIBUSB_DT_PHYSICAL = 0x23,

    /** Hub descriptor */
    LIBUSB_DT_HUB = 0x29,

    /** SuperSpeed Hub descriptor */
    LIBUSB_DT_SUPERSPEED_HUB = 0x2a,

    /** SuperSpeed Endpoint Companion descriptor */
    LIBUSB_DT_SS_ENDPOINT_COMPANION = 0x30
};

/* Descriptor sizes per descriptor type */
#define LIBUSB_DT_DEVICE_SIZE           18
#define LIBUSB_DT_CONFIG_SIZE           9
#define LIBUSB_DT_INTERFACE_SIZE        9
#define LIBUSB_DT_ENDPOINT_SIZE         7
#define LIBUSB_DT_ENDPOINT_AUDIO_SIZE       9   /* Audio extension */
#define LIBUSB_DT_HUB_NONVAR_SIZE       7
#define LIBUSB_DT_SS_ENDPOINT_COMPANION_SIZE    6
#define LIBUSB_DT_BOS_SIZE          5
#define LIBUSB_DT_DEVICE_CAPABILITY_SIZE    3

/* BOS descriptor sizes */
#define LIBUSB_BT_USB_2_0_EXTENSION_SIZE    7
#define LIBUSB_BT_SS_USB_DEVICE_CAPABILITY_SIZE 10
#define LIBUSB_BT_CONTAINER_ID_SIZE     20

/* We unwrap the BOS => define its max size */
#define LIBUSB_DT_BOS_MAX_SIZE              \
    (LIBUSB_DT_BOS_SIZE +               \
     LIBUSB_BT_USB_2_0_EXTENSION_SIZE +     \
     LIBUSB_BT_SS_USB_DEVICE_CAPABILITY_SIZE +  \
     LIBUSB_BT_CONTAINER_ID_SIZE)
	 
/** \ingroup libusb_desc
 * A structure representing the Binary Device Object Store (BOS) descriptor.
 * This descriptor is documented in section 9.6.2 of the USB 3.0 specification.
 * All multiple-byte fields are represented in host-endian format.
 */
struct libusb_bos_descriptor {
    /** Size of this descriptor (in bytes) */
    uint8_t  bLength;

    /** Descriptor type. Will have value
     * \ref libusb_descriptor_type::LIBUSB_DT_BOS LIBUSB_DT_BOS
     * in this context. */
    uint8_t  bDescriptorType;

    /** Length of this descriptor and all of its sub descriptors */
    uint16_t wTotalLength;

    /** The number of separate device capability descriptors in
     * the BOS */
    uint8_t  bNumDeviceCaps;

    /** bNumDeviceCap Device Capability Descriptors */
    struct libusb_bos_dev_capability_descriptor *dev_capability[ZERO_SIZED_ARRAY];
};

/** \ingroup libusb_desc
 * A structure representing the superspeed endpoint companion
 * descriptor. This descriptor is documented in section 9.6.7 of
 * the USB 3.0 specification. All multiple-byte fields are represented in
 * host-endian format.
 */
struct libusb_ss_endpoint_companion_descriptor {
    /** Size of this descriptor (in bytes) */
    uint8_t  bLength;

    /** Descriptor type. Will have value
     * \ref libusb_descriptor_type::LIBUSB_DT_SS_ENDPOINT_COMPANION in
     * this context. */
    uint8_t  bDescriptorType;

    /** The maximum number of packets the endpoint can send or
     *  receive as part of a burst. */
    uint8_t  bMaxBurst;

    /** In bulk EP: bits 4:0 represents the maximum number of
     *  streams the EP supports. In isochronous EP: bits 1:0
     *  represents the Mult - a zero based value that determines
     *  the maximum number of packets within a service interval  */
    uint8_t  bmAttributes;

    /** The total number of bytes this EP will transfer every
     *  service interval. Valid only for periodic EPs. */
    uint16_t wBytesPerInterval;
};
```

## 3、USB3.0额外的描述符信息
USB_SUPERSPEED_ENDPOINT_COMPANION_DESCRIPTOR structure (usbspec.h)

https://blog.csdn.net/nwpu053883/article/details/101456089
根据usb3协议, 相比usb1, usb2, 有些特殊且必要的描述符信息。
缺少了SuperSpeed Endpoint Companion描述信息, 即超速设备端点伙伴描述符。
usb3.0版本即super speed端点必须含有这个描述符,  且跟随在端点描述符后面。

BOS描述符信息：
什么是BOS... (Binary Device Object Store)
看了内容, 这玩意是扩展设备描述符的, Device Type是0xf。
可以添加设备级的一些能力描述, 即device-level capability extensions。
如usb2/3的LPM能力啥的, 即Link Power Management, 链路电路管理。具体又有相应的协议。

## 4、使用URB获取配置描述符
https://docs.microsoft.com/zh-cn/windows-hardware/drivers/usbcon/usb-configuration-descriptors

但是还是需要高版本才行。

## 5、驱动版本很重要
感觉说了又没说一样：
https://blog.csdn.net/weixin_30485799/article/details/99163518

## 6、
```
 567 /* read the bConfigurationValue for a device */
 568 static int sysfs_get_active_config(struct libusb_device *dev, uint8_t *config)
 569 {
 570     struct linux_device_priv *priv = usbi_get_device_priv(dev);
 571     int ret, tmp;
 572
 573     ret = read_sysfs_attr(DEVICE_CTX(dev), priv->sysfs_dir, "bConfigurationValue",
 574                   UINT8_MAX, &tmp);
 575     if (ret < 0)
 576         return ret;
 577
 578     if (tmp == -1)
 579         tmp = 0;    /* unconfigured */
 580
 581     *config = (uint8_t)tmp;
 582
 583     return 0;
 584 }
 585
:ls
  1 %a   "os/linux_usbfs.c"             第 519 行
```
从这里可以看出，如果usbi_backend存在，则直接会从系统的文件中读取配置信息，而不是通过控制包获取。

```
1544 int API_EXPORTED libusb_get_configuration(libusb_device_handle *dev_handle,
1545     int *config)
1546 {
1547     int r = LIBUSB_ERROR_NOT_SUPPORTED;
1548     uint8_t tmp = 0;
1549
1550     usbi_dbg(" ");
1551     if (usbi_backend.get_configuration)
1552         r = usbi_backend.get_configuration(dev_handle, &tmp);
1553
1554     if (r == LIBUSB_ERROR_NOT_SUPPORTED) {
1555         usbi_dbg("falling back to control message");
1556         r = libusb_control_transfer(dev_handle, LIBUSB_ENDPOINT_IN,
1557             LIBUSB_REQUEST_GET_CONFIGURATION, 0, 0, &tmp, 1, 1000);
1558         if (r == 1) {
1559             r = 0;
1560         } else if (r == 0) {
1561             usbi_err(HANDLE_CTX(dev_handle), "zero bytes returned in ctrl transfer?");
1562             r = LIBUSB_ERROR_IO;
1563         } else {
1564             usbi_dbg("control failed, error %d", r);
1565         }
1566     }
1567
1568     if (r == 0) {
1569         usbi_dbg("active config %u", tmp);
1570         *config = (int)tmp;
1571     }
1572
1573     return r;
1574 }


 345 /** \ingroup libusb_misc
 346  * Standard requests, as defined in table 9-5 of the USB 3.0 specifications */
 347 enum libusb_standard_request {
 348     /** Request status of the specific recipient */
 349     LIBUSB_REQUEST_GET_STATUS = 0x00,
 350
 351     /** Clear or disable a specific feature */
 352     LIBUSB_REQUEST_CLEAR_FEATURE = 0x01,
 353
 354     /* 0x02 is reserved */
 355
 356     /** Set or enable a specific feature */
 357     LIBUSB_REQUEST_SET_FEATURE = 0x03,
 358
 359     /* 0x04 is reserved */
 360
 361     /** Set device address for all future accesses */
 362     LIBUSB_REQUEST_SET_ADDRESS = 0x05,
 363
 364     /** Get the specified descriptor */
 365     LIBUSB_REQUEST_GET_DESCRIPTOR = 0x06,
 366
 367     /** Used to update existing descriptors or add new descriptors */
 368     LIBUSB_REQUEST_SET_DESCRIPTOR = 0x07,
 369
 370     /** Get the current device configuration value */
 371     LIBUSB_REQUEST_GET_CONFIGURATION = 0x08,
 372
 373     /** Set device configuration */
 374     LIBUSB_REQUEST_SET_CONFIGURATION = 0x09,
 375
 376     /** Return the selected alternate setting for the specified interface */
 377     LIBUSB_REQUEST_GET_INTERFACE = 0x0a,
 378
 379     /** Select an alternate interface for the specified interface */
 380     LIBUSB_REQUEST_SET_INTERFACE = 0x0b,
 381
 382     /** Set then report an endpoint's synchronization frame */
 383     LIBUSB_REQUEST_SYNCH_FRAME = 0x0c,
 384
 385     /** Sets both the U1 and U2 Exit Latency */
 386     LIBUSB_REQUEST_SET_SEL = 0x30,
 387
 388     /** Delay from the time a host transmits a packet to the time it is
 389       * received by the device. */
 390     LIBUSB_SET_ISOCH_DELAY = 0x31
 391 };
```

可以看出LIBUSB_REQUEST_GET_CONFIGURATION这个是获取当前配置的索引值，而不是配置描述符。















