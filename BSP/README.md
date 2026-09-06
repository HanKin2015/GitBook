# BSP开发工程师

## 1、介绍


## 2、串口
更多见：D:\Github\GitBook\USBDevice\common.md

## 3、读写寄存器值
```
md.l 0xff8000b4 1   # AO_SEC_SD_CFG15 地址，具体地址因芯片型号而异

store read misc 0x1000000 0x0 0x440
md.b 0x1000000 0x440
```

## 4、logcat执行后dmsg命令才有日志
由于开启日志的方式是：setenv initargs $initargs printk.devkmsg=on;saveenv;reset。
```
console:/ # getprop ro.test.normal

console:/ # getprop -Z ro.test.normal
u:object_r:default_prop:s0
console:/ # getprop | grep ro.test.normal
1|console:/ # setprop ro.test.normal 123
console:/ # setprop ro.test.boottime 1234
console:/ # dmesg -wT
^C
130|console:/ # logcat
console:/ # dmesg -wT
[Tue Dec 31 23:01:16 2019] hejian bootanim * hejian bootanim *
[Tue Dec 31 23:01:33 2019] logd: logdr: UID=0 GID=2000 PID=7194 b tail=0 logMask=99 pid=0 start=0ns timeout=0ns
[Tue Dec 31 23:01:54 2019] hejian bootanim *
[Tue Dec 31 23:02:16 2019] logd: logdr: UID=0 GID=2000 PID=8786 b tail=0 logMask=99 pid=0 start=0ns timeout=0ns
[Tue Dec 31 23:02:47 2019] hejian ro.test.normal hejian ro.test.boottime
[Tue Dec 31 23:03:07 2019] logd: logdr: UID=0 GID=2000 PID=10625 b tail=0 logMask=99 pid=0 start=0ns timeout=0ns

130|console:/ # getprop -Z ro.test.normal
u:object_r:default_prop:s0
console:/ # getprop -Z ro.test.boottime
u:object_r:boottime_prop:s0
console:/ # find / -name "vendor_prop*" 2>/dev/null
/vendor/etc/selinux/vendor_property_contexts
^C
130|console:/ # cat /vendor/etc/selinux/vendor_property_contexts | head
#line 1 "device/amlogic/common/sepolicy/property_contexts"
ro.test.boottime     u:object_r:boottime_prop:s0
ro.test.normal       u:object_r:default_prop:s0
media.                  u:object_r:media_prop:s0
ro.media.               u:object_r:media_prop:s0
```