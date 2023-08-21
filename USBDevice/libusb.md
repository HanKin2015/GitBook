# 学习libusb

## 1、libusb学习网站
website：http://libusb.info/
API：http://libusb.sourceforge.net/api-1.0/libusb_api.html 
download：https://github.com/libusb/libusb
mailing list：http://mailing-list.libusb.info
libusb test demo：https://github.com/crazybaoli/libusb-test
https://github.com/libusb/libusb/blob/master/examples/xusb.c

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

## 5、简介
官网：http://libusb.info/

开发文档：https://libusb.sourceforge.io/api-1.0/

libusb是一个跨平台的用户空间USB库，它允许应用程序访问USB设备。它提供了一组API，使开发人员能够在不需要内核驱动程序的情况下与USB设备进行通信。

## 6、源码整体理解
https://mp.weixin.qq.com/s/KrxiqmJu35ZcrAsnvaFgPQ

io.c: 实现了libusb库中的异步I/O操作，包括异步读写、取消异步操作等功能。

hotplug.c: 实现了libusb库中的热插拔功能，包括注册和注销热插拔事件、处理热插拔事件等功能。

core.c: 实现了libusb库的核心功能，包括设备枚举、设备打开和关闭、控制传输、批量传输、中断传输等功能。

strerror.c：实现了libusb库中的错误处理功能，包括将错误码转换为错误信息字符串等功能。

sync.c: 实现了libusb库中的同步传输功能，包括同步控制传输、同步批量传输、同步中断传输等功能。

descriptor.c：实现了libusb库中的设备描述符解析功能，包括解析设备描述符、配置描述符、接口描述符、端点描述符等信息。这些信息对于访问和控制USB设备非常重要，因为它们描述了USB设备的各种属性和特性。

os文件夹：包含了针对不同操作系统的底层实现代码。由于不同操作系统的USB驱动实现方式不同，因此需要针对不同的操作系统编写不同的底层实现代码。在os文件夹中，可以找到针对Windows、Linux、macOS等操作系统的实现代码。这些代码实现了USB设备的枚举、打开、读写等基本操作，为上层的应用程序提供了方便的接口。在使用libusb库时，需要根据所使用的操作系统选择相应的实现代码进行编译和链接。

libusbi.h: 定义了libusb库的内部数据结构和函数接口，包括libusb_context、libusb_device、libusb_device_handle等结构体和函数。这些数据结构和函数接口是libusb库的核心部分，它们提供了访问和控制USB设备的基本框架。

libusb.h: 定义了libusb库的外部API函数接口，包括libusb_init、libusb_open、libusb_control_transfer等函数。这些函数接口是开发者使用libusb库的主要入口，通过这些函数可以访问和控制USB设备。

## 7、常用接口介绍
alternate settings <==> altsetting
superspeed <==> ss
BOS是USB设备的一个标准描述符，全称为"Binary Object Store"。BOS Device Capability descriptor是BOS描述符中的一个子描述符，用于描述USB设备的特定功能和能力。BOS Device Capability descriptor包含了一个Capability Type字段和一些特定于该类型的数据字段。Capability Type字段指定了该描述符所描述的功能类型，例如Wireless USB、USB 3.0等。BOS Device Capability descriptor可以帮助USB主机了解USB设备的特定功能和能力，从而更好地管理和控制USB设备。
```
/** \ingroup dev
 * USB capability types
 */
enum libusb_bos_type {
    /** Wireless USB device capability */
    LIBUSB_BT_WIRELESS_USB_DEVICE_CAPABILITY    = 1,

    /** USB 2.0 extensions */
    LIBUSB_BT_USB_2_0_EXTENSION         = 2,

    /** SuperSpeed USB device capability */
    LIBUSB_BT_SS_USB_DEVICE_CAPABILITY      = 3,

    /** Container ID type */
    LIBUSB_BT_CONTAINER_ID              = 4,
};
```

libusb.h：
    libusb_class_code：设备接口类别
    libusb_descriptor_type：描述符类型
    libusb_endpoint_direction：端点方向
    libusb_transfer_type：传输类型（内含第五种传输类型BULK STREAM）
    libusb_standard_request：标准请求
    libusb_xxxxx_descriptor：描述符结构体
    libusb_speed：速度
    libusb_error：错误码
    libusb_transfer_status：传输状态
    
### 7-1.初始化与反初始化
libusb_init：初始化
libusb_exit：反初始化

### 7-2.枚举设备
libusb_get_device_list：获取设备列表
libusb_free_device_list：释放设备列表
libusb_get_device：获取设备信息
libusb_get_configuration：获取配置信息
libusb_set_configuration：设备配置

### 7-3.设备控制
libusb_open：打开设备
libusb_close：关闭设备
libusb_open_device_with_vid_pid：打开设备
libusb_reset_device：复位设备

### 7-4.接口激活与绑定
libusb_kernel_driver_active：接口驱动激活
libusb_detach_kernel_driver：从接口中分离内核驱动程序
libusb_attach_kernel_driver：重新附加接口的内核驱动程序
libusb_set_auto_detach_kernel_driver：启用/禁用 libusb 的自动内核驱动程序分离

### 7-5.接口声明和配置
libusb_claim_interface：声明一个接口
libusb_release_interface：释放声明的接口
libusb_set_interface_alt_setting ：激活接口的备用设置。该接口必须先前已使用libusb_claim_interface()声明

### 7-6.端点
libusb_clear_halt: 清除端点的停止/停止条件

### 7-7.描述符
libusb_get_device_descriptor：获取设备描述符
libusb_get_active_config_descriptor：获取当前活动配置的配置描述符
libusb_get_config_descriptor：根据索引获取 USB 配置描述符
libusb_get_config_descriptor_by_value：获取具有特定 bConfigurationValue 的 USB 配置描述符
libusb_free_config_descriptor：释放配置描述符

### 7-8.其他描述符
libusb_get_bos_descriptor：获取bos描述符
libusb_free_bos_descriptor ：释放bos描述符
libusb_get_usb_2_0_extension_descriptor：获取usb 2.0 扩展
libusb_free_usb_2_0_extension_descriptor ：释放usb 2.0 扩展
libusb_get_string_descriptor_ascii ：字符串描述符

### 7-9.热插拔事件
libusb_hotplug_register_callback：注册一个热插拔回调函数
libusb_hotplug_deregister_callback ：注销一个热插拔回调函数
libusb_hotplug_get_user_data：获取与热插拔回调关联的 user_data

### 7-10.同步IO之控制传输
libusb_control_transfer：控制传输
 
## 8、常规使用流程
- 初始化libusb usb库(libusb_init、libusb_set_debug)
- 打开指定设备(libusb_open/libusb_open_device_with_vid_pid)
- 获取某个接口的in和out端点地址(libusb_get_config_descriptor、libusb_endpoint_descriptor)
- 设备驱动分离(libusb_set_auto_detach_kernel_driver/libusb_detach_kernel_driver)
- 获取接口权限(libusb_claim_interface)
- 读写设备(如根据端口地址libusb_bulk_transfer)
- 关闭设备(libusb_close)
- 关闭库(libusb_exit)

## 9、libusb_device_handle和libusb_device区别和转换
libusb_device和libusb_device_handle都是libusb库中的结构体，但它们的作用不同。

libusb_device结构体代表一个USB设备，它包含了设备的描述信息，如设备的厂商ID、产品ID、设备地址等。通过调用libusb_get_device_list()函数可以获取系统中所有已连接的USB设备的libusb_device结构体列表。

libusb_device_handle结构体代表一个已打开的USB设备句柄，它可以用于与设备进行通信。通过调用libusb_open()函数可以打开一个USB设备，并返回一个libusb_device_handle结构体。使用libusb_device_handle结构体可以进行USB设备的读写操作，如发送控制命令、读取设备描述符、读写端点等。

因此，libusb_device结构体用于描述USB设备的信息，而libusb_device_handle结构体用于与USB设备进行通信。

libusb_device转换成libusb_device_handle：
libusb_open(libusb_device, libusb_device_handle)

libusb_device_handle转换成libusb_device：
libusb_device = libusb_get_device(libusb_device_handle)

## 10、libusb_context上下文的作用
libusb_context是libusb库的上下文环境，它是libusb库的核心数据结构，用于管理USB设备的连接和通信。在使用libusb库时，需要先创建一个libusb_context对象，然后通过该对象进行USB设备的操作。

libusb_context对象包含了libusb库的全局状态信息，例如USB设备的列表、设备的状态等。在创建libusb_context对象时，libusb库会初始化USB子系统，并且在程序退出时自动释放资源。

虽然在某些情况下可以将libusb_context参数设置为NULL，但这并不是推荐的做法。如果不传入libusb_context参数，libusb库会自动创建一个默认的libusb_context对象，但这可能会导致一些问题，例如在多线程环境下可能会出现竞争条件。因此，建议在使用libusb库时，显式地创建和销毁libusb_context对象。

libusb_context在调用libusb_init函数后会进行赋值，正如上面所说置为NULL也是能获取信息，但是不推荐。
代码见:D:\Github\Storage\c++\udev\libusb\libusb入门\libusb_context.c

# 获取描述符
libusb_control_transfer
libusb_get_descriptor
libusb_get_device_descriptor ===>只是做一个拷贝操作
    
# libusb_hankin_get_active_config_descriptor为何做封装










    
    
    