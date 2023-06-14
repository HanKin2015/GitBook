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

## 4、解析config descriptor
```
static void parse_descriptor(const void *source, const char *descriptor, void *dest)
```
此函数无非是在处理大小端的问题，将部分多字节数据进行调整端位。

其中const char *descriptor参数则是判断解析多少位，如bbw，即解析到wTotalLength成员变量，如果想解析到bConfigurationValue成员变量，则需要使用bbwbb。
```
/** \ingroup libusb_desc
 * A structure representing the standard USB configuration descriptor. This
 * descriptor is documented in section 9.6.3 of the USB 3.0 specification.
 * All multiple-byte fields are represented in host-endian format.
 */
struct libusb_config_descriptor {
    /** Size of this descriptor (in bytes) */
    uint8_t  bLength;

    /** Descriptor type. Will have value
     * \ref libusb_descriptor_type::LIBUSB_DT_CONFIG LIBUSB_DT_CONFIG
     * in this context. */
    uint8_t  bDescriptorType;

    /** Total length of data returned for this configuration */
    uint16_t wTotalLength;

    /** Number of interfaces supported by this configuration */
    uint8_t  bNumInterfaces;

    /** Identifier value for this configuration */
    uint8_t  bConfigurationValue;

    /** Index of string descriptor describing this configuration */
    uint8_t  iConfiguration;

    /** Configuration characteristics */
    uint8_t  bmAttributes;

    /** Maximum power consumption of the USB device from this bus in this
     * configuration when the device is fully operation. Expressed in units
     * of 2 mA when the device is operating in high-speed mode and in units
     * of 8 mA when the device is operating in super-speed mode. */
    uint8_t  MaxPower;

    /** Array of interfaces supported by this configuration. The length of
     * this array is determined by the bNumInterfaces field. */
    const struct libusb_interface *interface;

    /** Extra descriptors. If libusb encounters unknown configuration
     * descriptors, it will store them here, should you wish to parse them. */
    const unsigned char *extra;

    /** Length of the extra descriptors, in bytes. Must be non-negative. */
    int extra_length;
};
```

另外说明，如果是多个configuration时，即bNumConfigurations不为1。而其中bConfigurationValue并不一定是按照1开始往上递增，因此需要匹配时最好是通过这个值进行匹配，官方也是通过这种死办法，一个一个的遍历获取描述符，然后比较bConfigurationValue值，如在libusb库descriptor.c文件中：
```
int API_EXPORTED libusb_get_config_descriptor_by_value(libusb_device *dev,
     uint8_t bConfigurationValue, struct libusb_config_descriptor **config)
```




