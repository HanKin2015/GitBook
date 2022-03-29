# U盘写保护

## 1、现象
格式化U盘不成功，告知“这张磁盘有写保护”。

## 2、方法1失败
磁盘管理无法进行任何操作，显示只读。

## 3、方法2失败
dos窗口输入diskpart
```
lisk disk（显示所有磁盘）
select disk 1（数字表示选择你要操作的盘，如1表示为我的移动硬盘;）
diskpart（显示帮助信息）
att disk clear readonly（清楚只读属性）
attribute disk（显示磁盘属性）
```
结果显示已成功清除磁盘属性。

## 4、方法3失败
注册表：计算机\HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies
根本没有这个选项。

bat脚本：
```
@echo off

reg add HKLM\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies /v WriteProtect /t REG_DWORD /d 00000000
reg add HKLM\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies /v WriteProtect /t REG_DWORD /d 00000001

pause
```


## 5、失败
用DiskGenius软件来格式化U盘。

## 6、没有试过
建议 进入 PE 格式下 格式化 U 盘 或者 在 安全格式 下 进行格式化 U 盘 里面有错误数据 在运行 就算 你提取 出来的文件 信息 也是 不完整的 数据 时间长 还是一样

## 7、未尝试，已把U盘弄坏
https://segmentfault.com/q/1010000007503021
查到可以使用dosfsck -v -a U盘所在位置

umount /media/（U盘被挂在后的名字）
sudo dosfsck -v -a /dev/sde1

## 8、金士顿u盘写保护修复工具绿色版(restore)v3.7 中文版
发现真的也只有金士顿有这个问题？？？

http://www.downyi.com/downinfo/145100.html
