# 知识大全

详情还是见libusb.h文件吧。
D:\Github\Storage\udev\library\*

## 1、标准请求
```
/** \ingroup libusb_misc
 * Standard requests, as defined in table 9-5 of the USB 3.0 specifications */
enum libusb_standard_request {
    /** Request status of the specific recipient */
    LIBUSB_REQUEST_GET_STATUS = 0x00,

    /** Clear or disable a specific feature */
    LIBUSB_REQUEST_CLEAR_FEATURE = 0x01,

    /* 0x02 is reserved */

    /** Set or enable a specific feature */
    LIBUSB_REQUEST_SET_FEATURE = 0x03,

    /* 0x04 is reserved */

    /** Set device address for all future accesses */
    LIBUSB_REQUEST_SET_ADDRESS = 0x05,

    /** Get the specified descriptor */
    LIBUSB_REQUEST_GET_DESCRIPTOR = 0x06,

    /** Used to update existing descriptors or add new descriptors */
    LIBUSB_REQUEST_SET_DESCRIPTOR = 0x07,

    /** Get the current device configuration value */
    LIBUSB_REQUEST_GET_CONFIGURATION = 0x08,

    /** Set device configuration */
    LIBUSB_REQUEST_SET_CONFIGURATION = 0x09,

    /** Return the selected alternate setting for the specified interface */
    LIBUSB_REQUEST_GET_INTERFACE = 0x0a,

    /** Select an alternate interface for the specified interface */
    LIBUSB_REQUEST_SET_INTERFACE = 0x0b,

    /** Set then report an endpoint's synchronization frame */
    LIBUSB_REQUEST_SYNCH_FRAME = 0x0c,

    /** Sets both the U1 and U2 Exit Latency */
    LIBUSB_REQUEST_SET_SEL = 0x30,

    /** Delay from the time a host transmits a packet to the time it is
      * received by the device. */
    LIBUSB_SET_ISOCH_DELAY = 0x31
};
```

## 2、速度/速率
```
/** \ingroup libusb_desc
 * Supported speeds (wSpeedSupported) bitfield. Indicates what
 * speeds the device supports.
 */
enum libusb_supported_speed {
    /** Low speed operation supported (1.5MBit/s). */
    LIBUSB_LOW_SPEED_OPERATION = (1 << 0),

    /** Full speed operation supported (12MBit/s). */
    LIBUSB_FULL_SPEED_OPERATION = (1 << 1),

    /** High speed operation supported (480MBit/s). */
    LIBUSB_HIGH_SPEED_OPERATION = (1 << 2),

    /** Superspeed operation supported (5000MBit/s). */
    LIBUSB_SUPER_SPEED_OPERATION = (1 << 3)
};

/** \ingroup libusb_dev
 * Speed codes. Indicates the speed at which the device is operating.
 */
enum libusb_speed {
    /** The OS doesn't report or know the device speed. */
    LIBUSB_SPEED_UNKNOWN = 0,

    /** The device is operating at low speed (1.5MBit/s). */
    LIBUSB_SPEED_LOW = 1,

    /** The device is operating at full speed (12MBit/s). */
    LIBUSB_SPEED_FULL = 2,

    /** The device is operating at high speed (480MBit/s). */
    LIBUSB_SPEED_HIGH = 3,

    /** The device is operating at super speed (5000MBit/s). */
    LIBUSB_SPEED_SUPER = 4,

    /** The device is operating at super speed plus (10000MBit/s). */
    LIBUSB_SPEED_SUPER_PLUS = 5
};
```
