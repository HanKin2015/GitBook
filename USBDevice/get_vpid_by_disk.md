# windows系统通过盘符获取U盘的vpid

## 1、背景
同时跑了多个U盘，其中一个U盘出现拷贝中断，但是U盘状态如初。
需要从中找出异常的U盘。

## 1、可以通过磁盘管理
在磁盘1位置右键属性，基本上所有信息都出来了。

## 2、难度在于异常的U盘已无法获取容量大小 
因此在磁盘管理中无法正常打开。

### Windows命令行查看盘符
```
1. 使用diskpart命令查看
diskpart
list volume
list disk
select disk 2
detail disk

2. 使用fsutil查看(行不通)
fsutil volume list

3. 使用wmic命令查看(行不通)
wmic logicaldisk get caption,name
```

## 3、通过注册表
SYSTEM\\CurrentControlSet\\services\\USBSTOR\\Enum（无用）
[HKEY_LOCAL_MACHINE\SYSTEM\MountedDevices]这个导出后通过notepad++对比可以找出volume，但是再也找不到下一层对应关系。

探索无果。
