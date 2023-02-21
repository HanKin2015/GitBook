# tree命令

## 1、简介
Linux tree命令用于以树状图列出目录的内容。

执行tree指令，它会列出指定目录下的所有文件，包括子目录里的文件。

windows和linux都有tree命令，主要功能是创建文件列表，将所有文件以树的形式列出来

windows下的tree比较垃圾，只有两个参数，/F 是递归显示每个文件夹的名称；/A 是使用ASCII字符而不是扩展字符，感觉还不如不加/A 参数好。

linux下的tree就比较强大了，但一般系统并不自带这个命令，需要手动下载安装：sudo apt-get install tree 。文件很小，只有31K，但功能可强大了！

tree -L N 显示到第N级目录信息

## 2、安装
sudo apt-get install tree

## 3、实践
```
[root@ubuntu0006:/media/hankin/vdb/study/tdtool] (master) #tree
.
├── chkmem.sh
├── hejian.test
├── libs
│   ├── vdi_log.sh
│   └── vdi_util.sh
├── netping_bat.sh
├── netping.sh
└── readme.md

1 directory, 7 files
[root@ubuntu0006:/media/hankin/vdb/study/tdtool] (master) #tree ./
./
├── chkmem.sh
├── hejian.test
├── libs
│   ├── vdi_log.sh
│   └── vdi_util.sh
├── netping_bat.sh
├── netping.sh
└── readme.md

1 directory, 7 files
[root@ubuntu0006:/media/hankin/vdb/study/tdtool] (master) #
```
