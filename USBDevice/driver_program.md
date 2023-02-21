# linux驱动编程

资料：https://blog.csdn.net/feixiaoxing/article/details/79913476

https://blog.csdn.net/feixiaoxing/article/details/8533822

## 1、linux加载insmod和卸载rmmod驱动
### 加载驱动模块
方法一： 
进入SHT21.ko驱动模块文件所在的目录，然后直接 
insmod SHT21.ko 
即可

方法二： 
将SHT21.ko文件拷贝到/lib/module/#uname -r#/目录下，这里，#uname -r#意思是，在终端中输入 
uname -r后显示的内核版本及名称，例如mini2440中#uname -r#就是2.6.32.2-FriendlyARM。

然后 
depmod（会在/lib/modules/#uname -r#/目录下生成modules.dep和modules.dep.bb文件，表明模块的依赖关系） 
最后 
modprobe SHT21（注意这里无需输入.ko后缀） 
即可

两种方法的区别：

modprobe和insmod类似，都是用来动态加载驱动模块的，区别在于modprobe可以解决load module时的依赖关系，它是通过/lib/modules/#uname -r/modules.dep(.bb)文件来查找依赖关系的；而insmod不能解决依赖问题。

也就是说，如果你确定你要加载的驱动模块不依赖其他驱动模块的话，既可以insmod也可以modprobe，当然insmod可以在任何目录下执行，更方便一些。而如果你要加载的驱动模块还依赖其他ko驱动模块的话，就只能将模块拷贝到上述的特定目录，depmod后再modprobe。

### 1-1、卸载驱动模块
rmmod 模块名称
lsmod显示的模块名称，而不是对应的ko文件名

发现rmmod usbip_core和rmmod usbip-core都能卸载成功，好神奇。

### 1-2、加载驱动失败：insmod error: disagrees about version of symbol module_layout
```
[root@ubuntu0006:/media] #modinfo psmouse
filename:       /lib/modules/4.4.0-210-generic/kernel/drivers/input/mouse/psmouse.ko
license:        GPL
description:    PS/2 mouse driver
author:         Vojtech Pavlik <vojtech@suse.cz>
srcversion:     4A9614D16F58BF8FB9A8468
alias:          serio:ty05pr*id*ex*
alias:          serio:ty01pr*id*ex*
depends:
retpoline:      Y
intree:         Y
vermagic:       4.4.0-210-generic SMP mod_unload modversions
parm:           proto:Highest protocol extension to probe (bare, imps, exps, any). Useful for KVM switches. (proto_abbrev)
parm:           resolution:Resolution, in dpi. (uint)
parm:           rate:Report rate, in reports per second. (uint)
parm:           smartscroll:Logitech Smartscroll autorepeat, 1 = enabled (default), 0 = disabled. (bool)
parm:           resetafter:Reset device after so many bad packets (0 = never). (uint)
parm:           resync_time:How long can mouse stay idle before forcing resync (in seconds, 0 = never). (uint)
```
原来是驱动编译环境与当前系统内核不匹配导致。

网上怀疑是GCC的版本不同导致，可能性不大。

## 2、例如抓取usbvideo驱动数据包
```
insmod /system/lib/modules/usbmon.ko
modprobe usbmon

lsusb
cat /sys/kernel/debug/usb/usbmon/2u | grep "003:"
```

## 3、depmod命令
在linux桌面系统中，当你编译了新的驱动，为了能够用modprobe ***加载模块, 你需要先将模块拷贝到/lib/modules /2.6.31-20-generic目录下，然后运行sudo depmod -a将模块信息写入modules.dep、modules.dep.bin、modules.alias.bin、modules.alias和modules.pcimap文件中。

如，我编译了一个新的wifi驱动r8192se_pci.ko，将其拷贝到/lib/modules/2.6.31-20-generic/wireless下，然后到/lib/modules/2.6.31-20-generic运行depmod -a，之后可以在任意目录运行modprobe r8192se_pci。

https://ywnz.com/linux/depmod/





