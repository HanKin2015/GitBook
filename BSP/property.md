# 系统属性

## 1、监听逻辑
软链接说明等价：
```
lrwxrwxrwx root   root        11 1969-12-31 23:00 bin -> /system/bin
```

语法测试：
```
on property:persist.vendor.bt_name=*
    exec -- /bin/sh -c "echo 'hejian hello world1' > /dev/kmsg"（可以）
    exec /bin/sh -c "echo 'hejian hello world2' > /dev/kmsg"（可以）
    exec /bin/sh -c "echo 'hejian hello world2' > /dev/kmsg"（可以）
    write /dev/kmsg "hejian hello world5"（可以）
    write /dev/kmsg 'hejian hello world6'（不可以，单引号）
    write /data/hj.txt "hejian hello world5"（可以）
    exec -- /bin/sh -c 'echo "hejian hello world3" > /dev/kmsg'（不可以，单引号）
    exec_background -- /bin/sh -c 'echo "hejian hello world4" > /dev/kmsg'（不可以，单引号）
```

对比测试（放在/system/bin目录可能没有remount导致无法修改权限）：
```
property:sys.boot_completed=1
    chmod 0777 /data/hj.sh
    exec -- /bin/sh -c "echo 'hejian hello world1' > /dev/kmsg"
    exec_background -- /bin/sh -c "/data/hj.sh 111"
    exec_background -- /bin/sh -c "echo 'hejian hello world2' > /dev/kmsg"
    exec -- /bin/sh -c "/data/hj.sh 222"
    exec -- /bin/sh -c "echo 'hejian hello world3' > /dev/kmsg"

[    3.934011] hejian hello world1
[    3.992171] hejian hello world2
[    9.077099] hejian hello world 9 222（同步执行）
[    9.094342] hejian hello world 9 111（没有阻止world2的打印说明异步执行）
[    9.110284] hejian hello world3

#!/bin/sh

sleep 5
echo "hejian hello world 9 $1" > /dev/kmsg
```

换行符（write不支持）：
```
on property:persist.vendor.bt_name=*
    write /dev/kmsg "hejian hello world5"（无换行）
    write /dev/kmsg "hejian hello world5\n"（无换行\x5cn）
    write /dev/kmsg "hejian hello world6\\n"（无换行\x5c\x5cn）
    write /dev/kmsg "hejian hello world7\r\n"（无换行\x5cr\x5cn）
    
    exec -- /bin/sh -c "echo 'hejian hello world3' > /dev/kmsg"（有换行）
    exec_background -- /bin/sh -c "echo 'hejian hello world4' > /dev/kmsg"（有换行）
```

写文件（覆盖写，write换行符无效）：
```
on property:persist.vendor.bt_name=*
    write /data/hj.txt "hejian hello world6\\n"
    write /data/hj.txt "hejian hello world7\r\n"
    write /data/hj.txt "hejian hello world5\n"   
```


## 2、系统属性未监听到
背景：发现一个盒子新增的系统属性未监听到，但是另外一个盒子无此问题。
原因：系统属性监听机制有限制逻辑，文件在stable_properties.h中。

从两个盒子代码来看基本上一样，问题出现在context中，能监听所有属性的原因传递的context为nullptr，当我把判断条件改为不等于nullptr验证成功。后面发现persist.vendor.bt_name监听成功，原因是满足了后面的条件，自定义persist.vendor前缀的属性也被监听成功。

第一次启动或者恢复出厂设置有个属性是ro.firstboot=1。

## 3、测试代码
```
on property:init.svc.bootanim=*
    write /dev/kmsg "hejian init.svc.bootanim=${init.svc.bootanim}"

on property:ro.boottime.bootanim=*
    write /dev/kmsg "hejian ro.boottime.bootanim=${ro.boottime.bootanim}"
    touch /data/hj.boottime

on property:persist.vendor.bt_name=*
    write /dev/kmsg "hejian persist.vendor.bt_name=${persist.vendor.bt_name}"
    touch /data/hj.bt_name
```

## 4、属性不存在错误
```
einit: using deprecated syntax for specifying property '(getprop ro.boottime.bootanim) > /dev/kmsg', use ${name} instead
[    2.038484] init: property '(getprop ro.boottime.bootanim) > /dev/kmsg' doesn't exist while expanding 'echo hejian_boottime=$(getprop ro.boottime.bootanim) > /dev/kmsg'
```
为何部分盒子不会打印，原因是日志级别没有放开。

## 5、属性类型定义
查看类型：
```
getprop -Z ro.test.one
```

/vender/etc/selinux/property_contexts:
```
ro.boottime.*    u:object_r:boottime_prop:s0
```