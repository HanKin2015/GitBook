# 查看linux系统相关信息

## 1、查看架构
arch
uname -a
cat /proc/version
lscpu

## 2、查看pci地址
lspci

## 3、查看cpu信息
lscpu
cat /proc/cpuinfo

## 4、查看磁盘信息
fdisk -l
df -h

## 5、查看系统位数
getconf LONG_BIT
arch
uname -a
lscpu
cat /proc/version


## 8、获取系统位数


命令1：getconf LONG_BIT
结果：64

命令2：uname -a
结果：Linux Test004MUJUP 2.6.32-431.23.3.el6.x86_64 #1 SMP Wed Jul 16 06:12:23 EDT 2014 x86_64 x86_64 x86_64 GNU/Linux

命令3：uname -r
结果：2.6.32-431.23.3.el6.x86_64

命令4：cat /proc/version
结果：Linux version 2.6.32-431.23.3.el6.x86_64 (mockbuild@x86-027.build.eng.bos.redhat.com) (gcc version 4.4.7 20120313 (Red Hat 4.4.7-4) (GCC) ) #1 SMP Wed Jul 16 06:12:23 EDT 2014

命令5：arch
结果：x86_64

命令6：lscpu
结果：（不能看CPU 运行模式，32位系统同样结果，可以看Architecture）
lscpu
Architecture:          x86_64
CPU 运行模式：    32-bit, 64-bit
Byte Order:            Little Endian
CPU(s):                2
On-line CPU(s) list:   0,1
每个核的线程数：1
每个座的核数：  2
Socket(s):             1
NUMA 节点：         1
厂商 ID：           GenuineIntel
CPU 系列：          6
型号：              15
Model name:            Intel(R) Core(TM)2 Duo CPU     T7700  @ 2.40GHz
步进：              11
CPU MHz：             2893.202
BogoMIPS:              5786.40
超管理器厂商：  KVM
虚拟化类型：     完全
L1d 缓存：          32K
L1i 缓存：          32K
L2 缓存：           4096K
NUMA node0 CPU(s):     0,1
Flags:                 fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx lm constant_tsc rep_good nopl tsc_known_freq pni ssse3 cx16 pcid sse4_2 x2apic hypervisor lahf_lm kaiser

## 14、获取开机时间
who -b 查看最后一次系统启动的时间。
who -r 查看当前系统运行时间
last reboot可以看到Linux系统历史启动的时间
top命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
w命令显示up后表示系统到目前运行了多久时间。反过来推算系统重启时间。
cat /proc/uptime
date -d "$(awk -F. '{print $1}' /proc/uptime) second ago" +"%Y-%m-%d %H:%M:%S"
cat /proc/driver/rtc




