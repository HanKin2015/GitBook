# 不得不说的attribute

## 1、__packed__
不想要字节对齐的时候，有没有办法取消字节对齐？答案是可以，就是在结构体声明当中，加上__attribute__ ((__packed__))关键字，它可以做到让我们的结构体，按照紧凑排列的方式，占用内存。

```
#include <stdio.h>

#define ATTR_PACKED __attribute__ ((__packed__))

struct exam1 {
	char c;
	int  i;
};

struct __attribute__ ((__packed__)) exam2 {
	char c;
	int  i;
};

struct exam3 {
	char c;
	int  i;
} ATTR_PACKED;

int main()
{
	printf("char: %ld, int: %ld\n", sizeof(char), sizeof(int));
	printf("exam1: %ld, exam2: %ld, exam3: %ld\n", sizeof(struct exam1), sizeof(struct exam2), sizeof(struct exam3));
	return 0;
}
/*
char: 1, int: 4
exam1: 8, exam2: 5, exam3: 5
*/
```
可以使用#pragma pack (n)来指定数据结构的对齐值。

## 2、__attribute_unused__和__attribute_used__的作用
在Linux上这样的定义如下：
```
#define __attribute_used__ __attribute__((__used__))
#define __attribute_unused__ __attribute__((__unused__))
```

在gcc手册中找到了有关的解释：
unused：This attribute, attached to a function, means that the function is meant to be
        possibly unused. GCC will not produce a warning for this function.

表示该函数或变量可能不使用，这个属性可以避免编译器产生警告信息。
===============================================================================
used： This attribute, attached to a function, means that code must be emitted for the
       function even if it appears that the function is not referenced. This is useful,
       for example, when the function is referenced only in inline assembly.

向编译器说明这段代码有用，即使在没有用到的情况下编译器也不会警告！

## 3、alias
__attribute__((alias)): 为一个symbol声明一个别名

https://www.cnblogs.com/moonflow/archive/2012/08/14/2637874.html
https://www.cnblogs.com/yuxiaoyiyou/p/13518968.html

## 4、gcc_struct和ms_struct
```
#if defined(_WIN32)
# define USB_PACKED __attribute__((gcc_struct, packed))
#else
# define USB_PACKED __attribute__((packed))
#endif

/* binary representation */
typedef struct USBDescriptor {
	uint8_t                   bLength;
	uint8_t                   bDescriptorType;
	union {
		struct {
			uint8_t           bcdUSB_lo;
			uint8_t           bcdUSB_hi;
			uint8_t           bDeviceClass;
			uint8_t           bDeviceSubClass;
			uint8_t           bDeviceProtocol;
			uint8_t           bMaxPacketSize0;
			uint8_t           idVendor_lo;
			uint8_t           idVendor_hi;
			uint8_t           idProduct_lo;
			uint8_t           idProduct_hi;
			uint8_t           bcdDevice_lo;
			uint8_t           bcdDevice_hi;
			uint8_t           iManufacturer;
			uint8_t           iProduct;
			uint8_t           iSerialNumber;
			uint8_t           bNumConfigurations;
		} device;
		struct {
			uint8_t           bcdUSB_lo;
			uint8_t           bcdUSB_hi;
			uint8_t           bDeviceClass;
			uint8_t           bDeviceSubClass;
			uint8_t           bDeviceProtocol;
			uint8_t           bMaxPacketSize0;
			uint8_t           bNumConfigurations;
			uint8_t           bReserved;
		} device_qualifier;
		struct {
			uint8_t           wTotalLength_lo;
			uint8_t           wTotalLength_hi;
			uint8_t           bNumInterfaces;
			uint8_t           bConfigurationValue;
			uint8_t           iConfiguration;
			uint8_t           bmAttributes;
			uint8_t           bMaxPower;
		} config;
		struct {
			uint8_t           bInterfaceNumber;
			uint8_t           bAlternateSetting;
			uint8_t           bNumEndpoints;
			uint8_t           bInterfaceClass;
			uint8_t           bInterfaceSubClass;
			uint8_t           bInterfaceProtocol;
			uint8_t           iInterface;
		} interface;
		struct {
			uint8_t           bEndpointAddress;
			uint8_t           bmAttributes;
			uint8_t           wMaxPacketSize_lo;
			uint8_t           wMaxPacketSize_hi;
			uint8_t           bInterval;
			uint8_t           bRefresh;        /* only audio ep */
			uint8_t           bSynchAddress;   /* only audio ep */
		} endpoint;
		struct {
			uint8_t           bMaxBurst;
			uint8_t           bmAttributes;
			uint8_t           wBytesPerInterval_lo;
			uint8_t           wBytesPerInterval_hi;
		} super_endpoint;
		struct {
			uint8_t           wTotalLength_lo;
			uint8_t           wTotalLength_hi;
			uint8_t           bNumDeviceCaps;
		} bos;
		struct {
			uint8_t           bDevCapabilityType;
			union {
				struct {
					uint8_t   bmAttributes_1;
					uint8_t   bmAttributes_2;
					uint8_t   bmAttributes_3;
					uint8_t   bmAttributes_4;
				} usb2_ext;
				struct {
					uint8_t   bmAttributes;
					uint8_t   wSpeedsSupported_lo;
					uint8_t   wSpeedsSupported_hi;
					uint8_t   bFunctionalitySupport;
					uint8_t   bU1DevExitLat;
					uint8_t   wU2DevExitLat_lo;
					uint8_t   wU2DevExitLat_hi;
				} super;
			} u;
		} cap;
	} u;
}USB_PACKED USBDescriptor;
```
对于gcc_struct资料很少，但是ms_struct相对来说简单些。

https://gcc.gnu.org/onlinedocs/gcc/x86-Type-Attributes.html
https://gcc.gnu.org/onlinedocs/gcc-4.0.2/gcc/Type-Attributes.html

```
6.35.7 x86 Type Attributes
Two attributes are currently defined for x86 configurations: ms_struct and gcc_struct.

ms_struct
gcc_struct
If packed is used on a structure, or if bit-fields are used it may be that the Microsoft ABI packs them differently than GCC normally packs them. Particularly when moving packed data between functions compiled with GCC and the native Microsoft compiler (either via function call or as data in a file), it may be necessary to access either format.

The ms_struct and gcc_struct attributes correspond to the -mms-bitfields and -mno-ms-bitfields command-line options, respectively; see x86 Options, for details of how structure layout is affected. See x86 Variable Attributes, for information about the corresponding attributes on variables.
```


### 4-1、位域对齐
3.7版本之后GCC都默认使用了-mms-bitfields，此选项意义为使用Microsoft的方式进行对齐操作，其对齐策略为将对所有类型相同的位域合并到一起。与之相对的是GCC对齐方式，其对齐策略为将所有位域合并到一起，并不区分位域类型。

```
[root@ubuntu0006:/media/hankin/vdb/study] #./a.out
ms_struct: 16
gcc_struct: 8
[root@ubuntu0006:/media/hankin/vdb/study] #cat study_gcc_struct.cpp
#include <iostream>
#include <cstdio>

struct ms_struct {
    unsigned long long c :1;
    unsigned int a :1;
    unsigned int b :1;
}__attribute__ ((__ms_struct__)); //用于测试Microsoft对齐方式。得到sizeof(fields)结果为16。

struct gcc_struct {
    unsigned long long c :1;
    unsigned int a :1;
    unsigned int b :1;
}__attribute__ ((__gcc_struct__));//用于测试GCC对齐方式。得到sizeof(fields)结果为8。

int main()
{
    printf("ms_struct: %lu\n", sizeof(ms_struct));
    printf("gcc_struct: %lu\n", sizeof(gcc_struct));
    return 0;
}
```
Mircrosoft对齐方式将合并类型相同的a、b，为之分配8个字节，而对于c，则单独分配8个字节，所以上述结构体在此对齐方式下大小为16.
GCC对齐方式将不区分类型合并所有的位域，并根据原类型中最大尺寸分配位域保存所需的字节数。譬如对于上述结构，最大尺寸为long long，所以上述结构体大小为8.

从gcc与ms（Microsoft）的对齐策略可见，gcc的对齐方式相对更加节约存储空间。


https://blog.csdn.net/djzhao/article/details/22751713

```
#if defined(_WIN32)
	#define USB_PACKED __attribute__((gcc_struct, packed))  微软中取消对齐
#else
	#define USB_PACKED __attribute__((packed))				取消对齐
#endif
```

https://blog.csdn.net/kuwater/article/details/22400929
只能根据上面的帖子猜测是取消对齐，文中有些文字错误。


vs上面运行，由于没有找到对应的标识符，因此在项目中跑数据，可能本身有关闭优化啥的，导致所有情况一样。

```
struct exam1 {
	char  c;
	int  i;
	int  j;
}__attribute__ ((__ms_struct__, __packed__));

struct exam2 {
	char  c;
	int  i;
	int  j;
}__attribute__ ((__gcc_struct__, __packed__));

struct exam3 {
	char  c;
	int  i;
	int  j;
};

struct exam4 {
	char  c;
	int  i;
	int  j;
}__attribute__ ((ms_struct, packed));

struct exam5 {
	char  c;
	int  i;
	int  j;
}__attribute__ ((gcc_struct, packed));

8 8 8 8 8

struct exam1 {
	uint32_t  c:1;
	uint64_t  i:1;
	uint64_t  j:1;
}__attribute__ ((__ms_struct__, __packed__));

struct exam2 {
	uint32_t  c:1;
	uint64_t  i:1;
	uint64_t  j:1;
}__attribute__ ((__gcc_struct__, __packed__));

struct exam3 {
	uint32_t  c:1;
	uint64_t  i:1;
	uint64_t  j:1;
};

struct exam4 {
	uint32_t  c:1;
	uint64_t  i:1;
	uint64_t  j:1;
}__attribute__ ((ms_struct, packed));

struct exam5 {
	uint32_t  c:1;
	uint64_t  i:1;
	uint64_t  j:1;
}__attribute__ ((gcc_struct, packed));

16 16 16 16 16

struct exam1 {
	uint32_t  c;
	uint64_t  i;
	uint64_t  j;
}__attribute__ ((__ms_struct__, __packed__));

struct exam2 {
	uint32_t  c;
	uint64_t  i;
	uint64_t  j;
}__attribute__ ((__gcc_struct__, __packed__));

struct exam3 {
	uint32_t  c;
	uint64_t  i;
	uint64_t  j;
};

struct exam4 {
	uint32_t  c;
	uint64_t  i;
	uint64_t  j;
}__attribute__ ((ms_struct, packed));

struct exam5 {
	uint32_t  c;
	uint64_t  i;
	uint64_t  j;
}__attribute__ ((gcc_struct, packed));

24 24 24 24 24
```

## 5、stdcall
### __stdcall
被这个关键字修饰的函数，其参数都是从右向左通过堆栈传递的(__fastcall 的前面部分由ecx,edx传)， 函数调用在返回前要由被调用者清理堆栈。
这个关键字主要见于Microsoft Visual C、C++。GNU的C、C++是另外一种修饰方式：__attribute__((stdcall))。










