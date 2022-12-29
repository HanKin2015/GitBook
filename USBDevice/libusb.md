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

## 3、libusbi.h和libusb.h
libusbi.h: Internal header for libusb
libusb.h:  Public libusb header file
但是还有一个libusb和libusbx，很是让人捉摸不透。
libusb是一个跨平台的usb驱动框架。libusb原始项目在2010年后基本没有更新，曾有libusbx项目2012年从libusb分出来，2014年1月26日又合并回libusb了。当时的libusbx-1.0.18和libusb-1.0.18其实完全一样，相当于libusbx替换了libusb的代码！后续的版本其实都是基于libusbx的代码了！
参考：https://blog.csdn.net/qq_43248127/article/details/113746403

发现http://libusbx.org网站已空空如也，正版网页是http://libusb.info。

```
struct libusb_device {
    /* lock protects refcnt, everything else is finalized at initialization
     * time */
    usbi_mutex_t lock;
    int refcnt;

    struct libusb_context *ctx;

    uint8_t bus_number;
    uint8_t port_number;
    struct libusb_device* parent_dev;
    uint8_t device_address;
    uint8_t num_configurations;
    enum libusb_speed speed;

    struct list_head list;
    unsigned long session_data;

    struct libusb_device_descriptor device_descriptor;
    int attached;

    unsigned char os_priv
#if defined(__STDC_VERSION__) && (__STDC_VERSION__ >= 199901L)
    [] /* valid C99 code */
#else
    [0] /* non-standard, but usually working code */
#endif
    ;
};

struct libusb_device_descriptor {
    /** Size of this descriptor (in bytes) */
    uint8_t  bLength;

    /** Descriptor type. Will have value
     * \ref libusb_descriptor_type::LIBUSB_DT_DEVICE LIBUSB_DT_DEVICE in this
     * context. */
    uint8_t  bDescriptorType;

    /** USB specification release number in binary-coded decimal. A value of
     * 0x0200 indicates USB 2.0, 0x0110 indicates USB 1.1, etc. */
    uint16_t bcdUSB;

    /** USB-IF class code for the device. See \ref libusb_class_code. */
    uint8_t  bDeviceClass;

    /** USB-IF subclass code for the device, qualified by the bDeviceClass
     * value */
    uint8_t  bDeviceSubClass;

    /** USB-IF protocol code for the device, qualified by the bDeviceClass and
     * bDeviceSubClass values */
    uint8_t  bDeviceProtocol;

    /** Maximum packet size for endpoint 0 */
    uint8_t  bMaxPacketSize0;

    /** USB-IF vendor ID */
    uint16_t idVendor;

    /** USB-IF product ID */
    uint16_t idProduct;

    /** Device release number in binary-coded decimal */
    uint16_t bcdDevice;

    /** Index of string descriptor describing manufacturer */
    uint8_t  iManufacturer;

    /** Index of string descriptor describing product */
    uint8_t  iProduct;

    /** Index of string descriptor containing device serial number */
    uint8_t  iSerialNumber;

    /** Number of possible configurations */
    uint8_t  bNumConfigurations;
};
```
