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




















